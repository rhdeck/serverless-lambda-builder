
<a name="__climd"></a>

# Usage
```bash
npx @raydeck/serverless-lambda-builder [options] [command]
```
# Options
* -w --workingpath \<`path`> Working directory for project (default: .
# Commands
## wrapper
Build wrapper ts file for lambdas
### Usage
```bash
npx @raydeck/serverless-lambda-builder wrapper [options]
```
### Options
* -o --output \<`outputfile`> Output to write to (default: ./lambdas_wrapper.ts
## serverless
Update serverless.yml with functions
### Usage
```bash
npx @raydeck/serverless-lambda-builder serverless [options]
```
### Options
* -y --yamlfile Path to serverless.yml file 
* -h --handler-file File containing getLambdas export 
* -l --lambdas-export Name of the lambdas export (result of getLambdas) 

<a name="_librarymd"></a>

[@raydeck/serverless-lambda-builder - v1.0.1](README.md)

# @raydeck/serverless-lambda-builder - v1.0.1

## Index

### Interfaces

* [LambdaOptions](#interfaceslambdaoptionsmd)
* [LambdaOutput](#interfaceslambdaoutputmd)

### Type aliases

* [CognitoTriggerType](#cognitotriggertype)
* [LambdaArgs](#lambdaargs)

### Variables

* [_defaults](#let-_defaults)
* [getLambdasWrapper](#const-getlambdaswrapper)

### Functions

* [buildServerlessFunctionsObj](#buildserverlessfunctionsobj)
* [buildWrapperText](#buildwrappertext)
* [getLambdaExports](#getlambdaexports)
* [makeAPIGatewayLambda](#makeapigatewaylambda)
* [makeCognitoLambda](#makecognitolambda)
* [makeDDBLambda](#makeddblambda)
* [makeS3Lambda](#makes3lambda)
* [makeSQSLambda](#makesqslambda)
* [setDefaultArguments](#setdefaultarguments)

## Type aliases

###  CognitoTriggerType

Ƭ **CognitoTriggerType**: *"PreSignUp" | "PostConfirmation" | "PreAuthentication" | "PostAuthentication" | "CustomMessage" | "DefineAuthChallenge" | "CreateAuthChallenge" | "VerifyAuthChallengeResponse" | "TokenGeneration" | "UserMigration"*

*Defined in [index.ts:85](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L85)*

___

###  LambdaArgs

Ƭ **LambdaArgs**: *Omit‹[LambdaOptions](#interfaceslambdaoptionsmd), "func"›*

*Defined in [index.ts:28](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L28)*

## Variables

### `Let` _defaults

• **_defaults**: *[LambdaArgs](#lambdaargs)*

*Defined in [index.ts:32](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L32)*

___

### `Const` getLambdasWrapper

• **getLambdasWrapper**: *"
export default function getLambdas(
  wrapperFunction?: (
    arg: (...args: any) => any, context?: any
  ) => (...args: any) => any
) {
    return { 
{{{wraps}}}
    };
}
"* = `
export default function getLambdas(
  wrapperFunction?: (
    arg: (...args: any) => any, context?: any
  ) => (...args: any) => any
) {
    return { 
{{{wraps}}}
    };
}
`

*Defined in [index.ts:150](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L150)*

## Functions

###  buildServerlessFunctionsObj

▸ **buildServerlessFunctionsObj**(`exportsObj`: object): *object*

*Defined in [index.ts:161](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L161)*

**Parameters:**

Name | Type |
------ | ------ |
`exportsObj` | object |

**Returns:** *object*

* \[ **key**: *string*\]: any

___

###  buildWrapperText

▸ **buildWrapperText**(`exportsObj`: object): *string*

*Defined in [index.ts:125](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L125)*

**Parameters:**

Name | Type |
------ | ------ |
`exportsObj` | object |

**Returns:** *string*

___

###  getLambdaExports

▸ **getLambdaExports**(`exports`: object): *[string, [LambdaOutput](#interfaceslambdaoutputmd)][]*

*Defined in [index.ts:107](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`exports` | object |

**Returns:** *[string, [LambdaOutput](#interfaceslambdaoutputmd)][]*

___

###  makeAPIGatewayLambda

▸ **makeAPIGatewayLambda**(`args`: object & [LambdaOptions](#interfaceslambdaoptionsmd)): *object*

*Defined in [index.ts:47](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | object & [LambdaOptions](#interfaceslambdaoptionsmd) |

**Returns:** *object*

* **cors**: *boolean* = typeof args.cors !== "undefined" ? args.cors : true

* **lambdaType**: *string* = "apigateway"

* **method**: *string* = typeof args.method !== "undefined" ? args.method : "post"

* **private**: *boolean* = typeof args.private !== "undefined" ? args.private : false

___

###  makeCognitoLambda

▸ **makeCognitoLambda**(`args`: object): *object*

*Defined in [index.ts:96](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L96)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`func` | CognitoUserPoolTriggerHandler |
`pool` | string |
`triggerOrTriggers` | [CognitoTriggerType](#cognitotriggertype) &#124; [CognitoTriggerType](#cognitotriggertype)[] |

**Returns:** *object*

* **lambdaType**: *string* = "cognito"

___

###  makeDDBLambda

▸ **makeDDBLambda**(`args`: object & [LambdaOptions](#interfaceslambdaoptionsmd)): *object*

*Defined in [index.ts:67](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | object & [LambdaOptions](#interfaceslambdaoptionsmd) |

**Returns:** *object*

* **lambdaType**: *string* = "ddb"

___

###  makeS3Lambda

▸ **makeS3Lambda**(`args`: object & [LambdaOptions](#interfaceslambdaoptionsmd)): *object*

*Defined in [index.ts:36](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | object & [LambdaOptions](#interfaceslambdaoptionsmd) |

**Returns:** *object*

* **lambdaType**: *string* = "s3"

___

###  makeSQSLambda

▸ **makeSQSLambda**(`args`: object): *object*

*Defined in [index.ts:79](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L79)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`func` | SQSHandler |
`queue` | string |

**Returns:** *object*

* **lambdaType**: *string* = "sqs"

___

###  setDefaultArguments

▸ **setDefaultArguments**(`defaults`: [LambdaArgs](#lambdaargs)): *void*

*Defined in [index.ts:33](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`defaults` | [LambdaArgs](#lambdaargs) |

**Returns:** *void*


<a name="interfaceslambdaoptionsmd"></a>

[@raydeck/serverless-lambda-builder - v1.0.1](../README.md) › [LambdaOptions](#interfaceslambdaoptionsmd)

# Interface: LambdaOptions

## Hierarchy

* **LambdaOptions**

  ↳ [LambdaOutput](#interfaceslambdaoutputmd)

## Index

### Properties

* [description](#optional-description)
* [func](#func)
* [layers](#optional-layers)
* [memorySize](#optional-memorysize)
* [name](#optional-name)
* [reservedConcurrency](#optional-reservedconcurrency)
* [role](#optional-role)
* [runtime](#optional-runtime)
* [timeout](#optional-timeout)
* [tracing](#optional-tracing)
* [warmup](#optional-warmup)

## Properties

### `Optional` description

• **description**? : *undefined | string*

*Defined in [index.ts:23](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L23)*

___

###  func

• **func**: *Handler‹any, any›*

*Defined in [index.ts:26](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L26)*

___

### `Optional` layers

• **layers**? : *string[]*

*Defined in [index.ts:25](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L25)*

___

### `Optional` memorySize

• **memorySize**? : *undefined | string*

*Defined in [index.ts:24](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L24)*

___

### `Optional` name

• **name**? : *undefined | string*

*Defined in [index.ts:22](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L22)*

___

### `Optional` reservedConcurrency

• **reservedConcurrency**? : *undefined | number*

*Defined in [index.ts:20](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L20)*

___

### `Optional` role

• **role**? : *undefined | string*

*Defined in [index.ts:18](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L18)*

___

### `Optional` runtime

• **runtime**? : *"node10.x" | "node12.x"*

*Defined in [index.ts:21](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L21)*

___

### `Optional` timeout

• **timeout**? : *undefined | number*

*Defined in [index.ts:17](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L17)*

___

### `Optional` tracing

• **tracing**? : *undefined | false | true*

*Defined in [index.ts:19](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L19)*

___

### `Optional` warmup

• **warmup**? : *undefined | false | true*

*Defined in [index.ts:16](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L16)*


<a name="interfaceslambdaoutputmd"></a>

[@raydeck/serverless-lambda-builder - v1.0.1](../README.md) › [LambdaOutput](#interfaceslambdaoutputmd)

# Interface: LambdaOutput

## Hierarchy

* [LambdaOptions](#interfaceslambdaoptionsmd)

  ↳ **LambdaOutput**

## Index

### Properties

* [description](#optional-description)
* [func](#func)
* [lambdaType](#lambdatype)
* [layers](#optional-layers)
* [memorySize](#optional-memorysize)
* [name](#optional-name)
* [reservedConcurrency](#optional-reservedconcurrency)
* [role](#optional-role)
* [runtime](#optional-runtime)
* [timeout](#optional-timeout)
* [tracing](#optional-tracing)
* [warmup](#optional-warmup)

## Properties

### `Optional` description

• **description**? : *undefined | string*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[description](#optional-description)*

*Defined in [index.ts:23](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L23)*

___

###  func

• **func**: *Handler‹any, any›*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[func](#func)*

*Defined in [index.ts:26](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L26)*

___

###  lambdaType

• **lambdaType**: *string*

*Defined in [index.ts:30](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L30)*

___

### `Optional` layers

• **layers**? : *string[]*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[layers](#optional-layers)*

*Defined in [index.ts:25](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L25)*

___

### `Optional` memorySize

• **memorySize**? : *undefined | string*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[memorySize](#optional-memorysize)*

*Defined in [index.ts:24](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L24)*

___

### `Optional` name

• **name**? : *undefined | string*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[name](#optional-name)*

*Defined in [index.ts:22](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L22)*

___

### `Optional` reservedConcurrency

• **reservedConcurrency**? : *undefined | number*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[reservedConcurrency](#optional-reservedconcurrency)*

*Defined in [index.ts:20](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L20)*

___

### `Optional` role

• **role**? : *undefined | string*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[role](#optional-role)*

*Defined in [index.ts:18](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L18)*

___

### `Optional` runtime

• **runtime**? : *"node10.x" | "node12.x"*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[runtime](#optional-runtime)*

*Defined in [index.ts:21](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L21)*

___

### `Optional` timeout

• **timeout**? : *undefined | number*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[timeout](#optional-timeout)*

*Defined in [index.ts:17](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L17)*

___

### `Optional` tracing

• **tracing**? : *undefined | false | true*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[tracing](#optional-tracing)*

*Defined in [index.ts:19](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L19)*

___

### `Optional` warmup

• **warmup**? : *undefined | false | true*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[warmup](#optional-warmup)*

*Defined in [index.ts:16](https://github.com/rhdeck/serverless-lambda-builder/blob/a4bbf69/src/index.ts#L16)*
