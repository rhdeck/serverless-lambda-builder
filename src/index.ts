import type {
  S3Handler,
  APIGatewayProxyHandler,
  DynamoDBStreamHandler,
  SQSHandler,
  CognitoUserPoolTriggerEvent,
  EventBridgeHandler,
} from "aws-lambda";
import type { Handler } from "aws-lambda/handler";
import { basename } from "path";
interface LambdaArgs {
  warmup?: boolean;
  timeout?: number;
  role?: string;
  tracing?: boolean;
  reservedConcurrency?: number;
  runtime?: "node10.x" | "node12.x";
  name?: string;
  description?: string;
  memorySize?: number;
  layers?: string[];
}
interface LambdaOptions extends LambdaArgs {
  func: Handler<any, any>;
}
export interface LambdaOutput extends LambdaOptions {
  (): Handler<any, any>;
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
export function makeLambda(args: LambdaOptions) {
  if (_wrapper) args.func = _wrapper(args.func);
  return Object.assign(args.func, { ...args, lambdaType: "lambda" });
}
export function makeS3Lambda(
  args: {
    bucket: string | string[];
    func: S3Handler;
  } & LambdaOptions
) {
  if (_wrapper) args.func = _wrapper(args.func);
  return Object.assign(args.func, {
    ...args,
    lambdaType: "s3",
  });
}
export function makeAPIGatewayLambda(
  args: {
    path: string;
    method?: "get" | "post" | "delete" | "put";
    cors?: boolean;
    private?: boolean;
    func: APIGatewayProxyHandler;
  } & LambdaOptions
) {
  if (typeof args.method === "undefined") {
    args.method = "post";
  }
  if (_wrapper) args.func = _wrapper(args.func);
  return Object.assign(args.func, {
    ...args,
    method: typeof args.method !== "undefined" ? args.method : "post",
    cors: typeof args.cors !== "undefined" ? args.cors : true,
    private: typeof args.private !== "undefined" ? args.private : false,
    lambdaType: "apigateway",
  });
}
export function makeDDBLambda(
  args: {
    arn: string;
    func: DynamoDBStreamHandler;
    batchSize?: number;
  } & LambdaOptions
) {
  if (_wrapper) args.func = _wrapper(args.func);
  return Object.assign(args.func, {
    ...args,
    lambdaType: "ddb",
  });
}
export function makeSQSLambda(args: { queue: string; func: SQSHandler }) {
  if (_wrapper) args.func = _wrapper(args.func);
  return Object.assign(args.func, {
    ...args,
    lambdaType: "sqs",
  });
}
export function makeEventBridgeLambda<TDetail>(args: {
  detailType: string;
  func: EventBridgeHandler<string, TDetail, void>;
  source: string;
  detail: { [key: string]: any };
}) {
  if (_wrapper) args.func = _wrapper(args.func);
  return Object.assign(args.func, { ...args, lambdaType: "eventbridge" });
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
export function makeCognitoLambda<
  TEvent = CognitoUserPoolTriggerEvent,
  TResult = TEvent
>(args: {
  pool: string;
  triggerOrTriggers: CognitoTriggerType | CognitoTriggerType[];
  func: Handler<TEvent, TResult>;
}) {
  if (_wrapper) args.func = _wrapper(args.func);
  return Object.assign(args.func, {
    ...args,
    lambdaType: "cognito",
  });
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
          console.log("loking at lambda object", key, obj);
          const lambdaObj = <LambdaOutput>obj;
          const funcobj: { [key: string]: any } = {
            // name: lambdaObj.name || key,
            handler: [basename(path, ".ts"), key].join("."),
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
          if (typeof lambdaObj.role === "string") {
            funcobj.role = { "Fn::GetAtt": [funcobj.role, "Arn"] };
          }
          if (typeof lambdaObj.description === "string") {
            funcobj.description = lambdaObj.description;
          }
          if (Array.isArray(lambdaObj.layers)) {
            funcobj.layers = [...lambdaObj.layers];
          }
          if (typeof lambdaObj.memorySize === "number") {
            funcobj.memorySize = lambdaObj.memorySize;
          }
          //#endregion
          switch (lambdaObj.lambdaType) {
            case "s3":
              (() => {
                const o = <ReturnType<typeof makeS3Lambda>>(<unknown>lambdaObj);
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({ s3: o.bucket });
              })();
              break;
            case "apigateway":
              (() => {
                const o = <ReturnType<typeof makeAPIGatewayLambda>>(
                  (<unknown>lambdaObj)
                );
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
                const o = <ReturnType<typeof makeDDBLambda>>(
                  (<unknown>lambdaObj)
                );
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
                const o = <ReturnType<typeof makeSQSLambda>>(
                  (<unknown>lambdaObj)
                );
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({ sqs: o.queue });
              })();
              break;
            case "cognito":
              (() => {
                const o = <ReturnType<typeof makeCognitoLambda>>(
                  (<unknown>lambdaObj)
                );
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({
                  cognitoUserPool: {
                    pool: o.pool,
                    trigger: o.triggerOrTriggers,
                  },
                });
              })();
              break;
            case "lambda":
              //No-op - generic options only
              break;
            case "eventbridge":
              (() => {
                const o = <ReturnType<typeof makeEventBridgeLambda>>(
                  (<unknown>lambdaObj)
                );
                if (!funcobj.events) funcobj.events = [];
                funcobj.events.push({
                  eventBridge: {
                    pattern: {
                      source: [o.source],
                      "detail-type": [o.detailType],
                      detail: o.detail,
                    },
                  },
                });
              })();
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
export function sendHttpResult(
  statusCode: number,
  body: string,
  headers?: { [key: string]: any }
) {
  var response = {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods": "OPTIONS,POST, GET",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "X-Requested-With": "*",
      ...(headers ? headers : {}),
    },
    body,
  };
  return response;
}
export function httpSuccess(body: any) {
  const bodyString = JSON.stringify(body);
  return sendHttpResult(200, bodyString);
}
