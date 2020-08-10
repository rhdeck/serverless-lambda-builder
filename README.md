
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

<a name="_librarymd"></a>

[@raydeck/serverless-lambda-builder - v1.0.0](README.md)

# @raydeck/serverless-lambda-builder - v1.0.0

## Index

### Interfaces

* [LambdaOptions](#interfaceslambdaoptionsmd)
* [LambdaOutput](#interfaceslambdaoutputmd)

### Variables

* [getLambdasWrapper](#const-getlambdaswrapper)
* [lambdaExports](#const-lambdaexports)

### Functions

* [buildServerlessFunctionsObj](#buildserverlessfunctionsobj)
* [buildWrapperText](#buildwrappertext)
* [dependencyPath](#dependencypath)
* [extractLambdas](#extractlambdas)
* [getLambdaExports](#getlambdaexports)
* [makeAPIGatewayLambda](#makeapigatewaylambda)
* [makeDDBLambda](#makeddblambda)
* [makeS3Lambda](#makes3lambda)
* [makeSQSLambda](#makesqslambda)

## Variables

### `Const` getLambdasWrapper

• **getLambdasWrapper**: *"
export default function getLambdas(
  wrapperFunction?: (
    arg: (...args: any) => (...args: any) => any
  ) => (...args: any) => any
) {
    return { 
{{{wraps}}}
    };
}
"* = `
export default function getLambdas(
  wrapperFunction?: (
    arg: (...args: any) => (...args: any) => any
  ) => (...args: any) => any
) {
    return { 
{{{wraps}}}
    };
}
`

*Defined in [index.ts:124](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L124)*

___

### `Const` lambdaExports

• **lambdaExports**: *object*

*Defined in [index.ts:78](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L78)*

#### Type declaration:

* \[ **path**: *string*\]: [string, [LambdaOutput](#interfaceslambdaoutputmd)][]

## Functions

###  buildServerlessFunctionsObj

▸ **buildServerlessFunctionsObj**(`exportsObj`: object, `defaults`: Omit‹[LambdaOptions](#interfaceslambdaoptionsmd), "func"›, `base`: string): *object*

*Defined in [index.ts:135](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L135)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`exportsObj` | object | - |
`defaults` | Omit‹[LambdaOptions](#interfaceslambdaoptionsmd), "func"› | {} |
`base` | string | "handler_wrapper.getLambdas" |

**Returns:** *object*

* \[ **key**: *string*\]: any

___

###  buildWrapperText

▸ **buildWrapperText**(`exportsObj`: object): *string*

*Defined in [index.ts:104](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`exportsObj` | object |

**Returns:** *string*

___

###  dependencyPath

▸ **dependencyPath**(`key`: string, `cwd`: string): *string*

*Defined in [bin.ts:18](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/bin.ts#L18)*

Get the path to a node dependency, traversing up the tree as expected

**`internal`** 

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`key` | string | - | Identifier of the node package to find |
`cwd` | string | process.cwd() | Context for working directory (changes with recursive calls)  |

**Returns:** *string*

___

###  extractLambdas

▸ **extractLambdas**(`workingPath`: string): *object*

*Defined in [bin.ts:30](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/bin.ts#L30)*

Extract all lambda object candidates from descendant trees

**`internal`** 

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`workingPath` | string | process.cwd() | Context from which to evaluate current paths  |

**Returns:** *object*

* \[ **path**: *string*\]: [string, [LambdaOutput](#interfaceslambdaoutputmd)][]

___

###  getLambdaExports

▸ **getLambdaExports**(`path`: string): *[string, [LambdaOutput](#interfaceslambdaoutputmd)][]*

*Defined in [index.ts:81](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[string, [LambdaOutput](#interfaceslambdaoutputmd)][]*

___

###  makeAPIGatewayLambda

▸ **makeAPIGatewayLambda**(`args`: object & [LambdaOptions](#interfaceslambdaoptionsmd)): *object*

*Defined in [index.ts:40](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L40)*

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

###  makeDDBLambda

▸ **makeDDBLambda**(`args`: object & [LambdaOptions](#interfaceslambdaoptionsmd)): *object*

*Defined in [index.ts:60](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | object & [LambdaOptions](#interfaceslambdaoptionsmd) |

**Returns:** *object*

* **lambdaType**: *string* = "ddb"

___

###  makeS3Lambda

▸ **makeS3Lambda**(`args`: object & [LambdaOptions](#interfaceslambdaoptionsmd)): *object*

*Defined in [index.ts:29](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`args` | object & [LambdaOptions](#interfaceslambdaoptionsmd) |

**Returns:** *object*

* **lambdaType**: *string* = "s3"

___

###  makeSQSLambda

▸ **makeSQSLambda**(`args`: object): *object*

*Defined in [index.ts:72](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L72)*

**Parameters:**

▪ **args**: *object*

Name | Type |
------ | ------ |
`func` | SQSHandler |
`queue` | string |

**Returns:** *object*

* **lambdaType**: *string* = "sqs"


<a name="interfaceslambdaoptionsmd"></a>

[@raydeck/serverless-lambda-builder - v1.0.0](../README.md) › [LambdaOptions](#interfaceslambdaoptionsmd)

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

*Defined in [index.ts:20](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L20)*

___

###  func

• **func**: *Handler‹any, any›*

*Defined in [index.ts:23](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L23)*

___

### `Optional` layers

• **layers**? : *string[]*

*Defined in [index.ts:22](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L22)*

___

### `Optional` memorySize

• **memorySize**? : *undefined | string*

*Defined in [index.ts:21](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L21)*

___

### `Optional` name

• **name**? : *undefined | string*

*Defined in [index.ts:19](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L19)*

___

### `Optional` reservedConcurrency

• **reservedConcurrency**? : *undefined | number*

*Defined in [index.ts:17](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L17)*

___

### `Optional` role

• **role**? : *undefined | string*

*Defined in [index.ts:15](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L15)*

___

### `Optional` runtime

• **runtime**? : *"node10.x" | "node12.x"*

*Defined in [index.ts:18](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L18)*

___

### `Optional` timeout

• **timeout**? : *undefined | number*

*Defined in [index.ts:14](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L14)*

___

### `Optional` tracing

• **tracing**? : *undefined | false | true*

*Defined in [index.ts:16](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L16)*

___

### `Optional` warmup

• **warmup**? : *undefined | false | true*

*Defined in [index.ts:13](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L13)*


<a name="interfaceslambdaoutputmd"></a>

[@raydeck/serverless-lambda-builder - v1.0.0](../README.md) › [LambdaOutput](#interfaceslambdaoutputmd)

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

*Defined in [index.ts:20](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L20)*

___

###  func

• **func**: *Handler‹any, any›*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[func](#func)*

*Defined in [index.ts:23](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L23)*

___

###  lambdaType

• **lambdaType**: *string*

*Defined in [index.ts:26](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L26)*

___

### `Optional` layers

• **layers**? : *string[]*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[layers](#optional-layers)*

*Defined in [index.ts:22](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L22)*

___

### `Optional` memorySize

• **memorySize**? : *undefined | string*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[memorySize](#optional-memorysize)*

*Defined in [index.ts:21](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L21)*

___

### `Optional` name

• **name**? : *undefined | string*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[name](#optional-name)*

*Defined in [index.ts:19](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L19)*

___

### `Optional` reservedConcurrency

• **reservedConcurrency**? : *undefined | number*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[reservedConcurrency](#optional-reservedconcurrency)*

*Defined in [index.ts:17](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L17)*

___

### `Optional` role

• **role**? : *undefined | string*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[role](#optional-role)*

*Defined in [index.ts:15](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L15)*

___

### `Optional` runtime

• **runtime**? : *"node10.x" | "node12.x"*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[runtime](#optional-runtime)*

*Defined in [index.ts:18](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L18)*

___

### `Optional` timeout

• **timeout**? : *undefined | number*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[timeout](#optional-timeout)*

*Defined in [index.ts:14](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L14)*

___

### `Optional` tracing

• **tracing**? : *undefined | false | true*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[tracing](#optional-tracing)*

*Defined in [index.ts:16](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L16)*

___

### `Optional` warmup

• **warmup**? : *undefined | false | true*

*Inherited from [LambdaOptions](#interfaceslambdaoptionsmd).[warmup](#optional-warmup)*

*Defined in [index.ts:13](https://github.com/rhdeck/serverless-lambda-builder/blob/1556bc1/src/index.ts#L13)*
