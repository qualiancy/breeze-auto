# breeze-auto [![Build Status](https://secure.travis-ci.org/qualiancy/breeze-auto.png?branch=master)](https://travis-ci.org/qualiancy/breeze-auto)

> Invoke async functions concurrently based on prerequisites.

## Installation

### Node.js

`breeze-auto` is available on [npm](http://npmjs.org).

    $ npm install breeze-auto

### Component

`breeze-auto` is available as a [component](https://github.com/component/component).

    $ component install qualiancy/breeze-auto

## Usage

### auto (tasks[, concurreny], callback)

* **@param** _{Object}_ tasks 
* **@param** _{Number}_ concurrency 
* **@param** _{Function}_ callback 

Determines a best-fit concurrency path of execution
for a set of interdependant named tasks.

```js
var auto = require('breeze-auto');

auto({
    one: function (next) {
      setTimeout(next, 10);
    }
  , two: function (next) {
      setTimeout(next, 15);
    }
  , three: [ 'one', 'two', function (next) {
      setTimeout(next, 20);
    }]
}, 2, function (err) {
  should.not.exist(err);
});
```

## License

(The MIT License)

Copyright (c) 2012 Jake Luer <jake@qualiancy.com> (http://qualiancy.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
