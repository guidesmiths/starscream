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
    reade: {
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

#### Shorthand

```js
var options = {
  mapping: [ 
    "/source/path"
  ]
}
```
Reads the value at  ```/source/path``` in the original document, and writes it to ```/source/path``` in the transformed document

```js
var options = {
  mapping: {
    "/source/path": /destination/path
  }
}
```
Copies a value from the ```/source/path``` in the original document to ```/destination/path``` in the transformed document

```js
var options = {
  mapping: {
    "/source/path": {
      transformer: "uppercase"
    }
  }
}
```
Reads the value at  ```/source/path``` in the original document, transforms it to uppercase, and writes it to ```/source/path``` in the transformed document

```js
var options = {
  mapping: {
    "/source/path": {
      transformer: "uppercase",
      writer: "/destination/path"
    }
  }
}
```
Reads the value at  ```/source/path``` in the original document, transforms it to uppercase, and writes it to ```/destination/path``` in the transformed document


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
