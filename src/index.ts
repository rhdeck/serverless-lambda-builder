import type {
  S3Handler,
  APIGatewayProxyHandlerV2,
  DynamoDBStreamHandler,
  SQSHandler,
} from "aws-lambda";
import type { Handler } from "aws-lambda/handler";
import { stringify } from "querystring";
import { isArray } from "util";
import mustache from "mustache";
import prettier from "prettier";
interface LambdaOptions {
  warmup?: boolean;
  timeout?: number;
  role?: string;
  tracing?: boolean;
  reservedConcurrency?: number;
  runtime?: "node10.x" | "node12.x";
  name?: string;
  description?: string;
  memorySize?: string;
  layers?: string[];
  func: Handler<any, any>;
}
export interface LambdaOutput extends LambdaOptions {
  lambdaType: string;
}

export function makeS3Lambda(
  args: {
    bucket: string | string[];
    func: S3Handler;
  } & LambdaOptions
) {
  return {
    lambdaType: "s3",
    ...args,
  };
}
export function makeAPIGatewayLambda(
  args: {
    path: string;
    method?: string;
    cors?: boolean;
    private?: boolean;
    func: APIGatewayProxyHandlerV2;
  } & LambdaOptions
) {
  if (typeof args.method === "undefined") {
    args.method = "post";
  }
  return {
    lambdaType: "apigateway",
    ...args,
    method: typeof args.method !== "undefined" ? args.method : "post",
    cors: typeof args.cors !== "undefined" ? args.cors : true,
    private: typeof args.private !== "undefined" ? args.private : false,
  };
}
export function makeDDBLambda(
  args: {
    arn: string;
    func: DynamoDBStreamHandler;
    batchSize?: number;
  } & LambdaOptions
) {
  return {
    lambdaType: "ddb",
    ...args,
  };
}
export function makeSQSLambda(args: { queue: string; func: SQSHandler }) {
  return {
    lambdaType: "sqs",
    ...args,
  };
}
const lambdaExports: {
  [path: string]: [string, LambdaOutput][];
} = {};
export function getLambdaExports(path: string) {
  if (!lambdaExports[path]) {
    try {
      const exports = <{ [key: string]: LambdaOutput | undefined }>(
        require(path)
      );
      const x = <[string, LambdaOutput][]>Object.entries(exports).filter(
        ([key, x]) => {
          try {
            if (!x) return false;
            return !!x.lambdaType;
          } catch (e) {
            return false;
          }
        }
      );
      lambdaExports[path] = x;
    } catch (e) {
      lambdaExports[path] = [];
    }
  }
  return lambdaExports[path];
}
export function buildWrapperText(exportsObj: {
  [path: string]: [string, LambdaOutput][];
}) {
  const imports: string[] = [];
  const wraps: string[] = [];
  Object.entries(exportsObj).map(([path, lambdaExports]) => {
    lambdaExports.forEach(([key, obj]) => {
      const newKey = path.replace("/", "_") + "__" + key;
      imports.push(`import {${key} as ${newKey}} from "${path}";`);
      wraps.push(
        ` ${newKey}: wrapperFunction ? wrapperFunction<typeof ${newKey}.func>(${newKey}.func, ${newKey}) : ${newKey}.func,`
      );
    });
  });
  const getLambdasText = mustache.render(getLambdasWrapper, { wraps });
  const wrapper = prettier.format([...imports, getLambdasText].join("\n"), {
    parser: "typescript",
  });
  return wrapper;
}
const getLambdasWrapper = `
export default function getLambdas(
  wrapperFunction?: (
    arg: (...args: any) => (...args: any) => any
  ) => (...args: any) => any
) {
    return { 
{{{wraps}}}
    };
}
`;
export function buildServerlessFunctionsObj(
  exportsObj: {
    [path: string]: [string, LambdaOutput][];
  },
  defaults: Omit<LambdaOptions, "func"> = {},
  base: string = "handler_wrapper.getLambdas"
) {
  const funcArr = Object.entries(exportsObj).flatMap(
    ([path, lambdaExports]) => {
      //   const lambdaExports = getLambdaExports(path);
      return <[string, { [key: string]: any }][]>lambdaExports.map(
        ([key, obj]) => {
          const lambdaObj = <LambdaOutput>obj;
          const funcobj: { [key: string]: any } = {
            name: lambdaObj.name || key,
            handler: base + key,
            ...defaults,
          };
          //#region merge optional values from lambdaObj into the output function object
          if (typeof lambdaObj.warmup !== "undefined")
            funcobj.warmup = lambdaObj.warmup;
          if (
            typeof lambdaObj.timeout !== "undefined" &&
            lambdaObj.timeout > 0 &&
            lambdaObj.timeout < 900
          )
            funcobj.timeout = lambdaObj.timeout;
          if (typeof lambdaObj.role !== "undefined")
            funcobj.role = lambdaObj.role;
          if (typeof lambdaObj.tracing !== "undefined")
            funcobj.tracing = lambdaObj.tracing;
          if (typeof lambdaObj.tracing !== "undefined")
            funcobj.reservedConcurrency = lambdaObj.reservedConcurrency;
          //#endregion
          switch (lambdaObj.lambdaType) {
            case "s3":
              (() => {
                const o = <ReturnType<typeof makeS3Lambda>>lambdaObj;
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({ s3: o.bucket });
              })();
              break;
            case "apigateway":
              (() => {
                const o = <ReturnType<typeof makeAPIGatewayLambda>>lambdaObj;
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({
                  http: {
                    path: o.path,
                    method: o.method,
                    cors: o.cors,
                    private: o.private,
                  },
                });
              })();
              break;
            case "ddb":
              (() => {
                const o = <ReturnType<typeof makeDDBLambda>>lambdaObj;
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({
                  stream: {
                    type: "dynamodb",
                    batchSize: funcobj.batchSize,
                    arn: funcobj.arn,
                  },
                });
              })();
              break;
            case "sqs":
              (() => {
                const o = <ReturnType<typeof makeSQSLambda>>lambdaObj;
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({ sqs: o.queue });
              })();
              break;
            case "lambda":
              //No-op - generic options only
              break;
            default:
              throw new Error(
                "Do not know how to handle type of " + lambdaObj.lambdaType
              );
          }
          return [key, funcobj];
        }
      );
    }
  );
  //convert the array of [key, value] into an object { key: value}
  return funcArr.reduce(
    (o, [key, value]) => ({ ...o, [key]: value }),
    <{ [key: string]: any }>{}
  );
}
