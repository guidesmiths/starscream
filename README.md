# Deprecated in favour of [AC/DC](https://github.com/guidesmiths/starscream)

# starscream
Asynchronous JSON transformation

![starscream](https://upload.wikimedia.org/wikipedia/en/2/2d/Armada_Starscream.PNG)

## Installation

```
npm install starscream --save
```

## Usage

```js
var starscream = require('starscream')
var original = {
  source: {
     path: "robots in disguise"
  }
}
var options = {
  mapping: [{
    reader: {
      type: "jsonPointer",
      path: "/source/path"
    },
    transformer: {
      type: "uppercase"
    },
    writer: {
      type: "jsonPointer",
      path: "destination/path"
    }
  }]
}
starscream(options, original, function(err, transformed) {
   assert.equal(transformed.destination.path, 'ROBOTS IN DISGUISE')
})
```

#### Mapping Shorthand (Array Based)

```js
var options = {
  mapping: [
    "/source/path/a",
    "/source/path/b",
  ]
}
```
Reads the value at  ```/source/path/a``` in the original document, and writes it to ```/source/path/a``` in the transformed document


```js
var options = {
  mapping: [{
    "/source/path/a": "/destination/path/a"
  }]
}
```
Reads the value at ```/source/path/a``` in the original document, and writes it to ```/destination/path/a``` in the transformed document


```js
var options = {
  mapping: [{
    reader: "/source/path/a",
    transformer: "uppercase",
    writer: "/destination/path/a"
  }, {
    reader: "/source/path/b",
    transformer: "uppercase",
    writer: "/destination/path/b"
  }
}]
```
Reads the value at  ```/source/path/a``` in the original document, transforms it to uppercase, and writes it to ```/destination/path/a``` in the transformed document


#### Mapping Shorthand (Object Based)

```js
var options = {
  mapping: {
    "/source/path/a": "/destination/path/a",
    "/source/path/b": "/destination/path/b"
  }
}
```
Reads the value at ```/source/path/a``` in the original document, and writes it to ```/destination/path/a``` in the transformed document

```js
var options = {
  mapping: {
    "/source/path/a": {
      transformer: "uppercase"
    },
    "/source/path/b": {
      transformer: "lowercase"
    }
  }
}
```
Reads the value at  ```/source/path/a``` in the original document, transforms it to uppercase, and writes it to ```/source/path/a``` in the transformed document

```js
var options = {
  mapping: {
    "/source/path/a": {
      transformer: "uppercase",
      writer: "/destination/path/a"
    },
    "/source/path/b": {
      transformer: "lowercase",
      writer: "/destination/path/b"
    },
  }
}
```
Reads the value at  ```/source/path/a``` in the original document, transforms it to uppercase, and writes it to ```/destination/path/b``` in the transformed document


## Using multiple sources for a single mapping
```js
var options = {
  mapping: [{
    reader: {
      type: "serial",
      reader": [{
        type: "jsonPointer",
        path: "/source/path/a"
      }, {
        type: "jsonPointer",
        path: "/source/path/b"
      }],
    },
    writer": {
      type: "jsonPointer",
      path: "/destination/path"
    }
  }]
}
```
Reads the values at ```/source/path/a``` and ```/source/path/b``` in the original document, and inserts them as an array into the transformed document at '/desination/path'

#### Shorthand
```js
var options = {
  mapping: [{
    reade": {
      type: "serial",
      reader: [
        "/source/path/a",
        "/source/path/b"
      }]
    },
    writer: {
      type: "jsonPointer",
      path: "/destination/path"
    }
  }]
}
```
The same shorthand rules apply

## Aggregating Transformers
```js
var options = {
  mapping: [{
    reader: {
      type: "serial",
      readers: [{
        type: "jsonPointer",
        path: "/source/path/a"
      }, {
        type: "jsonPointer",
        path: "/source/path/b"
      }],
    },
    transformer: {
      type: "concatenate",
      separator: "_"
    },
    writer: {
      type: "jsonPointer",
      path: "/destination/path"
    }
  }]
}
```
Reads the values at ```/source/path/a``` and ```/source/path/b``` from the original document, combines them with a underscore (```_```) and writes them to ```/destination/path``` in the transformed document

## Chaining Transformers
```js
var options = {
  mapping: [{
    reader: "/source/path"
    transformer: {
      type: "serial",
      transformers: [{
        type: "uppercase"
      }, {
        type: "prefix",
        text: "foo-"
      }]
    },
    writer": {
      type: "jsonPointer",
      path: "/destination/path"
    }
  }]
}
```
Reads the values at ```/source/path```in the original document, transforms it to uppercase, adds the ```foo-``` prefix and writes it to ```/destination/path``` in the transformed document


## Iteration

You can iterate over arrays using the ```mapSeries``` transformer

```js
    [
        {
            "reader": "/source/path",
            "transformer": {
                "type": "mapSeries",
                "transformer": "uppercase"
            },
            "writer": "/destination/path"
        }
    ]
```
Reads the array at ```/source/path``` and transforms each element to upper case before writing the array to ```/destination/path```

## Out of the box readers

#### jsonPointer (default)

```js
var options = {
  mapping: [{
    reader: {
      "path": "/source/path"
      "ignoreMissing": "true"
    }
    writer: "/destination/path"
  }]
}
```
Reads the value at ```/source/path```. If the path is missing and ignoreMissing is false (the defult) return undefined instead of erroring


#### property

```js
var options = {
  mapping: [{
    reader: {
      "type": "property",
      "path": "source.path",
      "ignoreMissing": "true"
    }
    writer: "/destination/path"
  }]
}
```
Reads the value at ```source.path```. If the path is missing and ignoreMissing is false (the defult) return undefined instead of erroring

## Writers of the box readers

#### jsonPointer

```js
var options = {
  mapping: [{
    reader: {
      "/source/path"
    writer: {
      "path": "/destination/path",
      "ignoreMissing": "true"
    }
  }]
}
```
Writes the value to ```/destination/path```. If the value is undefined and ignoreMissing is true (the default) will not write anything, otherwise writes the value as undefined

#### property

```js
var options = {
  mapping: [{
    reader: "/source/path"
    writer: {
      "type": "property",
      "path": "destination.path",
      "ignoreMissing": "true"
    }
  }]
}
```
Writes the value to ```/destination/path```. If the value is undefined and ignoreMissing is true (the default) will not write anything, otherwise writes the value as undefined

## Out of the box transformers

#### mapSeries

```js
var options = {
  mapping: [{
    reader: "/source/path"
    transformer: {
      "type": "mapSeries",
      "transformer": "uppercase"
    }
    "toggle",
    writer: "/destination/path"
  }]
}
```

#### toggle

```js
var options = {
  mapping: [{
    reader: "/source/path"
    transformer: "toggle",
    writer: "/destination/path"
  }]
}
```

#### uppercase

```js
var options = {
  mapping: [{
    reader: "/source/path"
    transformer: "uppercase",
    writer: "/destination/path"
  }]
}
```

#### lowercase
```js
var options = {
  mapping: [{
    reader: "/source/path"
    transformer: "lowercase",
    writer: "/destination/path"
  }]
}
```

#### mutualExclusion
```js
var options = {
  mapping: [{
    readers: [
      "/source/path/a",
      "/source/path/b"
    ],
    transformer: "mutualExclusion",
    writer: "/destination/path"
  }]
}
```
Writes either ```/source/path/a``` or ```/source/path/b``` (with preference for a)

#### conditional
```js
var options = {
  mapping: [{
    readers: [
      "/source/path/a",
      "/source/path/b"
    ],
    transformer: "mutualExclusion",
    writer: "/destination/path"
  }]
}
```
Writes ```/source/path/b``` if ```/source/path/a``` is truthy

#### guard
```js
var options = {
  mapping: [{
    readers: [
      "/source/path/a",
      "/source/path/b"
    ],
    transformer: "mutualExclusion",
    writer: "/destination/path"
  }]
}
```
Writes ```/source/path/b``` if ```/source/path/a``` is falsey

## Custom Transformers
```js
var options = {
  mapping: [{
    reader: "/source/path"
    transformer: {
      type: "dbLookup",
      collection: "refdata"
    },
    writer: {
      type: "jsonPointer",
      path: "/destination/path"
    }
  }],
  transformers: {
    dbLookup: function(config, value, cb) {
      db.collections(config.collection).findOne({ code: value }, cb)
    })
  }
}
```
Reads the value at ```/source/path``` in the original document, and cross references it an item of refdata. The same mechanism can be used for writing your own readers and writers too.
