
<a name="readmemd"></a>

[@raydeck/dependency-tree-resolver - v1.0.7](#readmemd) › [Globals](#globalsmd)

# @raydeck/dependency-tree-resolver - v1.0.7

# dependency-resolver
If you have a dependency tree, and you'd like to know in which order to initialize each node, this library is for you.

## How to use

### Node
In CLI, execute 
```
npm i dependency-tree-resolver --save-dev
```
and then 
```javascript
var DepResolver =  require('dependency-tree-resolver');
```

### Browser
Get a local copy of [dep-res.js](src/dep-res.js), or consume it via [RawGit's CDN](https://cdn.rawgit.com/shaylh/dependency-resolver/master/src/dep-res.js),
and add to your HTML:
```html
<script type="text/javascript" src="dep-res.js"></script>
```
and then you'll have ```DepResolver``` on the  ```window``` scope.

## API
Once you include the script in your project you'll have a function ```DepResolver``` which accepts two arguments:
```javascript
DepResolver(
    tree = {
        string: [...string],
        ...
    }, 
    options = {
        exclude: [...string]
    }
)
```
## Arguments
*  ```tree```: each key in the map represents a node in the tree, and each value in the array represents a single dependency of that node.
* ```options```:
    * ```exclude```: allows you to specify which dependencies are special and allowed to not have a node for themselves (usefull when depending on external resources)

## Examples
```javascript
//valid tree
var tree = {a: [], b: ['c', 'd'], c: ['d'], d: ['a']};
var resolved = DepResolver(tree);
console.log(resolved);//['a','d','c','b' ]

//invalid tree w/ excluded external resource
var tree = {a: ['b'], b: ['d']};
var options = {exclude: ['d']};
var resolved = DepResolver(tree, options);
console.log(resolved);//['b','a']

//invalid tree w/o excluded external resource
var tree = {a: ['b'], b: ['d']};
var resolved = DepResolver(tree);//throw error: "b" has an unknown dependency "d"

//invalid tree with cyclic dependency
var tree = {a: ['b'], b: ['c'], c: ['a'], d: ['e'], e: ['d']};
var resolved = DepResolver(tree);//throw error: circular dependency found: a > b > c > a
```
## License
This library is provided under the [MIT license](http://choosealicense.com/licenses/mit/).


<a name="classesdepresolvererrormd"></a>

[@raydeck/dependency-tree-resolver - v1.0.7](#readmemd) › [Globals](#globalsmd) › [DepResolverError](#classesdepresolvererrormd)

# Class: DepResolverError

## Hierarchy

* [Error](#static-error)

  ↳ **DepResolverError**

## Index

### Constructors

* [constructor](#constructor)

### Properties

* [message](#message)
* [name](#name)
* [stack](#optional-stack)
* [Error](#static-error)

## Constructors

###  constructor

\+ **new DepResolverError**(`message`: string): *[DepResolverError](#classesdepresolvererrormd)*

*Defined in [src/index.ts:1](https://github.com/rhdeck/dependency-resolver/blob/0674e37/src/index.ts#L1)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *[DepResolverError](#classesdepresolvererrormd)*

## Properties

###  message

• **message**: *string*

*Inherited from [DepResolverError](#classesdepresolvererrormd).[message](#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [DepResolverError](#classesdepresolvererrormd).[name](#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [DepResolverError](#classesdepresolvererrormd).[stack](#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984


<a name="globalsmd"></a>

[@raydeck/dependency-tree-resolver - v1.0.7](#readmemd) › [Globals](#globalsmd)

# @raydeck/dependency-tree-resolver - v1.0.7

## Index

### Classes

* [DepResolverError](#classesdepresolvererrormd)

### Functions

* [removeExcluded](#removeexcluded)
* [resolve](#resolve)
* [resolveSpecific](#resolvespecific)
* [validateDep](#validatedep)
* [validateDepMap](#validatedepmap)

## Functions

###  removeExcluded

▸ **removeExcluded**(`depMap`: object, `node`: string, `excludeItems`: string[]): *void*

*Defined in [src/index.ts:6](https://github.com/rhdeck/dependency-resolver/blob/0674e37/src/index.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`depMap` | object |
`node` | string |
`excludeItems` | string[] |

**Returns:** *void*

___

###  resolve

▸ **resolve**(`depMap`: object, `options?`: undefined | object): *string[]*

*Defined in [src/index.ts:67](https://github.com/rhdeck/dependency-resolver/blob/0674e37/src/index.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`depMap` | object |
`options?` | undefined &#124; object |

**Returns:** *string[]*

___

###  resolveSpecific

▸ **resolveSpecific**(`depMap`: object, `result`: string[], `dependant`: string, `path`: string[]): *void*

*Defined in [src/index.ts:43](https://github.com/rhdeck/dependency-resolver/blob/0674e37/src/index.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`depMap` | object |
`result` | string[] |
`dependant` | string |
`path` | string[] |

**Returns:** *void*

___

###  validateDep

▸ **validateDep**(`depMap`: object, `node`: string, `dependency`: string): *void*

*Defined in [src/index.ts:16](https://github.com/rhdeck/dependency-resolver/blob/0674e37/src/index.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`depMap` | object |
`node` | string |
`dependency` | string |

**Returns:** *void*

___

###  validateDepMap

▸ **validateDepMap**(`depMap`: object, `options?`: undefined | object): *void*

*Defined in [src/index.ts:28](https://github.com/rhdeck/dependency-resolver/blob/0674e37/src/index.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`depMap` | object |
`options?` | undefined &#124; object |

**Returns:** *void*
