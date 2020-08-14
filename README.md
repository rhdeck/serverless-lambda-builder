
<a name="__climd"></a>

# Usage
```bash
npx @raydeck/serverless-lambda-builder [options] [command]
```
# Options
* -w --workingpath \<`path`> Working directory for project (default: .
# Commands
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

[@raydeck/serverless-lambda-builder - v2.0.0](README.md)

# @raydeck/serverless-lambda-builder - v2.0.0

## Index

### Interfaces

* [LambdaArgs](#interfaceslambdaargsmd)
* [LambdaOptions](#interfaceslambdaoptionsmd)
* [LambdaOutput](#interfaceslambdaoutputmd)

### Type aliases

* [CognitoTriggerType](#cognitotriggertype)

### Variables

* [_defaults](#let-_defaults)
* [_wrapper](#let-_wrapper)

### Functions

* [buildServerlessFunctionsObj](#buildserverlessfunctionsobj)
* [getLambdaExports](#getlambdaexports)
* [makeAPIGatewayLambda](#makeapigatewaylambda)
* [makeCognitoLambda](#makecognitolambda)
* [makeDDBLambda](#makeddblambda)
* [makeS3Lambda](#makes3lambda)
* [makeSQSLambda](#makesqslambda)
* [setDefaults](#setdefaults)
* [setWrapper](#setwrapper)

## Type aliases

###  CognitoTriggerType

Ƭ **CognitoTriggerType**: *"CreateAuthChallenge" | "CustomMessage" | "DefineAuthChallenge" | "PostAuthentication" | "PostConfirmation" | "PreAuthentication" | "PreSignUp" | "TokenGeneration" | "UserMigration" | "VerifyAuthChallengeResponse"*

*Defined in [index.ts:90](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L90)*

## Variables

### `Let` _defaults

• **_defaults**: *[LambdaArgs](#interfaceslambdaargsmd)*

*Defined in [index.ts:33](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L33)*

___

### `Let` _wrapper

• **_wrapper**: *function*

*Defined in [index.ts:29](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L29)*

#### Type declaration:

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

## Functions

###  buildServerlessFunctionsObj

▸ **buildServerlessFunctionsObj**(`exportsObj`: object): *object*

*Defined in [index.ts:131](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L131)*

**Parameters:**

Name | Type |
------ | ------ |
`exportsObj` | object |

**Returns:** *object*

* \[ **key**: *string*\]: any

___

###  getLambdaExports

▸ **getLambdaExports**(`exports`: object): *[string, [LambdaOutput](#interfaceslambdaoutputmd)][]*

*Defined in [index.ts:113](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`exports` | object |

**Returns:** *[string, [LambdaOutput](#interfaceslambdaoutputmd)][]*

___

###  makeAPIGatewayLambda

▸ **makeAPIGatewayLambda**(`args`: object & [LambdaOptions](#interfaceslambdaoptionsmd)): *object*

*Defined in [index.ts:46](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L46)*

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

*Defined in [index.ts:101](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L101)*

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

*Defined in [index.ts:68](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | object & [LambdaOptions](#interfaceslambdaoptionsmd) |

**Returns:** *object*

* **lambdaType**: *string* = "ddb"

___

###  makeS3Lambda

▸ **makeS3Lambda**(`args`: object & [LambdaOptions](#interfaceslambdaoptionsmd)): *object*

*Defined in [index.ts:37](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | object & [LambdaOptions](#interfaceslambdaoptionsmd) |

**Returns:** *object*

* **lambdaType**: *string* = "s3"

___

###  makeSQSLambda

▸ **makeSQSLambda**(`args`: object): *object*

*Defined in [index.ts:82](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L82)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`func` | SQSHandler |
`queue` | string |

**Returns:** *object*

* **lambdaType**: *string* = "sqs"

___

###  setDefaults

▸ **setDefaults**(`defaults`: [LambdaArgs](#interfaceslambdaargsmd)): *void*

*Defined in [index.ts:34](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`defaults` | [LambdaArgs](#interfaceslambdaargsmd) |

**Returns:** *void*

___

###  setWrapper

▸ **setWrapper**(`wrapper`: typeof _wrapper): *void*

*Defined in [index.ts:30](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`wrapper` | typeof _wrapper |

**Returns:** *void*


<a name="interfaceslambdaargsmd"></a>

[@raydeck/serverless-lambda-builder - v2.0.0](../README.md) › [LambdaArgs](#interfaceslambdaargsmd)

# Interface: LambdaArgs

## Hierarchy

* **LambdaArgs**

  ↳ [LambdaOptions](#interfaceslambdaoptionsmd)

## Index

### Properties

* [description](#optional-description)
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

*Defined in [index.ts:18](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L18)*

___

### `Optional` layers

• **layers**? : *string[]*

*Defined in [index.ts:20](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L20)*

___

### `Optional` memorySize

• **memorySize**? : *undefined | string*

*Defined in [index.ts:19](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L19)*

___

### `Optional` name

• **name**? : *undefined | string*

*Defined in [index.ts:17](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L17)*

___

### `Optional` reservedConcurrency

• **reservedConcurrency**? : *undefined | number*

*Defined in [index.ts:15](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L15)*

___

### `Optional` role

• **role**? : *undefined | string*

*Defined in [index.ts:13](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L13)*

___

### `Optional` runtime

• **runtime**? : *"node10.x" | "node12.x"*

*Defined in [index.ts:16](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L16)*

___

### `Optional` timeout

• **timeout**? : *undefined | number*

*Defined in [index.ts:12](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L12)*

___

### `Optional` tracing

• **tracing**? : *undefined | false | true*

*Defined in [index.ts:14](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L14)*

___

### `Optional` warmup

• **warmup**? : *undefined | false | true*

*Defined in [index.ts:11](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L11)*


<a name="interfaceslambdaoptionsmd"></a>

[@raydeck/serverless-lambda-builder - v2.0.0](../README.md) › [LambdaOptions](#interfaceslambdaoptionsmd)

# Interface: LambdaOptions

## Hierarchy

* [LambdaArgs](#interfaceslambdaargsmd)

  ↳ **LambdaOptions**

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

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[description](#optional-description)*

*Defined in [index.ts:18](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L18)*

___

###  func

• **func**: *Handler‹any, any›*

*Defined in [index.ts:23](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L23)*

___

### `Optional` layers

• **layers**? : *string[]*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[layers](#optional-layers)*

*Defined in [index.ts:20](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L20)*

___

### `Optional` memorySize

• **memorySize**? : *undefined | string*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[memorySize](#optional-memorysize)*

*Defined in [index.ts:19](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L19)*

___

### `Optional` name

• **name**? : *undefined | string*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[name](#optional-name)*

*Defined in [index.ts:17](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L17)*

___

### `Optional` reservedConcurrency

• **reservedConcurrency**? : *undefined | number*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[reservedConcurrency](#optional-reservedconcurrency)*

*Defined in [index.ts:15](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L15)*

___

### `Optional` role

• **role**? : *undefined | string*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[role](#optional-role)*

*Defined in [index.ts:13](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L13)*

___

### `Optional` runtime

• **runtime**? : *"node10.x" | "node12.x"*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[runtime](#optional-runtime)*

*Defined in [index.ts:16](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L16)*

___

### `Optional` timeout

• **timeout**? : *undefined | number*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[timeout](#optional-timeout)*

*Defined in [index.ts:12](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L12)*

___

### `Optional` tracing

• **tracing**? : *undefined | false | true*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[tracing](#optional-tracing)*

*Defined in [index.ts:14](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L14)*

___

### `Optional` warmup

• **warmup**? : *undefined | false | true*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[warmup](#optional-warmup)*

*Defined in [index.ts:11](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L11)*


<a name="interfaceslambdaoutputmd"></a>

[@raydeck/serverless-lambda-builder - v2.0.0](../README.md) › [LambdaOutput](#interfaceslambdaoutputmd)

# Interface: LambdaOutput

## Hierarchy

  ↳ [LambdaOptions](#interfaceslambdaoptionsmd)

  ↳ **LambdaOutput**

## Callable

▸ (): *Handler‹any, any›*

*Defined in [index.ts:25](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L25)*

**Returns:** *Handler‹any, any›*

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

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[description](#optional-description)*

*Defined in [index.ts:18](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L18)*

___

###  func

• **func**: *Handler‹any, any›*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[func](#func)*

*Defined in [index.ts:23](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L23)*

___

###  lambdaType

• **lambdaType**: *string*

*Defined in [index.ts:27](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L27)*

___

### `Optional` layers

• **layers**? : *string[]*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[layers](#optional-layers)*

*Defined in [index.ts:20](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L20)*

___

### `Optional` memorySize

• **memorySize**? : *undefined | string*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[memorySize](#optional-memorysize)*

*Defined in [index.ts:19](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L19)*

___

### `Optional` name

• **name**? : *undefined | string*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[name](#optional-name)*

*Defined in [index.ts:17](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L17)*

___

### `Optional` reservedConcurrency

• **reservedConcurrency**? : *undefined | number*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[reservedConcurrency](#optional-reservedconcurrency)*

*Defined in [index.ts:15](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L15)*

___

### `Optional` role

• **role**? : *undefined | string*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[role](#optional-role)*

*Defined in [index.ts:13](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L13)*

___

### `Optional` runtime

• **runtime**? : *"node10.x" | "node12.x"*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[runtime](#optional-runtime)*

*Defined in [index.ts:16](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L16)*

___

### `Optional` timeout

• **timeout**? : *undefined | number*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[timeout](#optional-timeout)*

*Defined in [index.ts:12](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L12)*

___

### `Optional` tracing

• **tracing**? : *undefined | false | true*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[tracing](#optional-tracing)*

*Defined in [index.ts:14](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L14)*

___

### `Optional` warmup

• **warmup**? : *undefined | false | true*

*Inherited from [LambdaArgs](#interfaceslambdaargsmd).[warmup](#optional-warmup)*

*Defined in [index.ts:11](https://github.com/rhdeck/serverless-lambda-builder/blob/fe44cd6/src/index.ts#L11)*
