Indx
----

Require a folder of files or other folders, instead of doing them one at a time.

### Why should you care?

So let's say you are setting up a node project, and using the [adapter pattern](http://en.wikipedia.org/wiki/Adapter_pattern), which is a great and useful pattern. You may have a folder full of adapters, and you want to require all of them into an object, rather than going through each one individually. Kind of like [require_tree in sprockets](it 'should not include non-js files', -> should.not.exist(@res.foo)). That's exactly what indx does for you.

It's a very small script, but it's something I found myself writing and re-writing, so I figured why not wrap it up and give it to the world to make life a couple lines of code shorter.

### Installation

`npm install indx --save`

### Usage

In the folder you want to require, put an `index.js` file at the root. Inside that file, write this:

```js
module.exports = require('indx')(__dirname);
```

...that's it.

Indx supports javascript and coffeescript. If you have folders inside your folder, make sure each of those folders has an `index.js` or `index.coffee` file in it, or it won't be required. If you have files in your folder that are not `.js` or `.coffee`, they will not be required. If there are other languages I'm not aware of you'd like to add support for, feel free to submit a pull request - it's easy to extend the supported extensions.

### Contributing

This entire project is one file, pretty easy to figure out how it's working. If you want to add something or fix a bug, please add a test for it. You can run tests with `mocha` in the root of the project.
