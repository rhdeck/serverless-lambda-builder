import type {
  S3Handler,
  APIGatewayProxyHandlerV2,
  DynamoDBStreamHandler,
  SQSHandler,
  CognitoUserPoolTriggerHandler,
} from "aws-lambda";
import type { Handler } from "aws-lambda/handler";
import { basename } from "path";
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
type LambdaArgs = Omit<LambdaOptions, "func">;
export interface LambdaOutput extends LambdaOptions {
  lambdaType: string;
}
let _wrapper: (...args: any[]) => any;
export function setWrapper(wrapper: typeof _wrapper) {
  _wrapper = wrapper;
}
let _defaults: LambdaArgs = {};
export function setDefaults(defaults: LambdaArgs) {
  _defaults = defaults;
}
export function makeS3Lambda(
  args: {
    bucket: string | string[];
    func: S3Handler;
  } & LambdaOptions
) {
  if (_wrapper) args.func = _wrapper(args.func);
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
  if (_wrapper) args.func = _wrapper(args.func);
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
  if (_wrapper) args.func = _wrapper(args.func);
  return {
    lambdaType: "ddb",
    ...args,
  };
}
export function makeSQSLambda(args: { queue: string; func: SQSHandler }) {
  if (_wrapper) args.func = _wrapper(args.func);
  return {
    lambdaType: "sqs",
    ...args,
  };
}
export type CognitoTriggerType =
  | "CreateAuthChallenge"
  | "CustomMessage"
  | "DefineAuthChallenge"
  | "PostAuthentication"
  | "PostConfirmation"
  | "PreAuthentication"
  | "PreSignUp"
  | "TokenGeneration"
  | "UserMigration"
  | "VerifyAuthChallengeResponse";
export function makeCognitoLambda(args: {
  pool: string;
  triggerOrTriggers: CognitoTriggerType | CognitoTriggerType[];
  func: CognitoUserPoolTriggerHandler;
}) {
  if (_wrapper) args.func = _wrapper(args.func);
  return {
    lambdaType: "cognito",
    ...args,
  };
}

export function getLambdaExports(exports: { [key: string]: LambdaOutput }) {
  try {
    console.log(exports);
    return <[string, LambdaOutput][]>Object.entries(exports).filter(
      ([key, x]) => {
        try {
          if (!x) return false;
          return !!x.lambdaType;
        } catch (e) {
          return false;
        }
      }
    );
  } catch (e) {
    console.log("hit an error", e);
    return [];
  }
}
export function buildServerlessFunctionsObj(exportsObj: {
  [path: string]: [string, LambdaOutput][];
}) {
  const funcArr = Object.entries(exportsObj).flatMap(
    ([path, lambdaExports]) => {
      //   const lambdaExports = getLambdaExports(path);
      return <[string, { [key: string]: any }][]>lambdaExports.map(
        ([key, obj]) => {
          const lambdaObj = <LambdaOutput>obj;
          const funcobj: { [key: string]: any } = {
            name: lambdaObj.name || key,
            handler: [basename(path, ".ts"), key, "func"].join("."),
            ...(_defaults || {}),
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
          if (typeof funcobj.role === "string") {
            funcobj.role = { "Fn:GetAtt": [funcobj.role, "arn"] };
          }
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
                    batchSize: o.batchSize || undefined,
                    arn: o.arn,
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
            case "cognito":
              () => {
                const o = <ReturnType<typeof makeCognitoLambda>>lambdaObj;
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({
                  cognitoUserPool: {
                    pool: o.pool,
                    trigger: o.triggerOrTriggers,
                  },
                });
              };
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
