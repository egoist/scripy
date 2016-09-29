# scripy [![NPM version](https://img.shields.io/npm/v/scripy.svg)](https://npmjs.com/package/scripy) [![NPM downloads](https://img.shields.io/npm/dm/scripy.svg)](https://npmjs.com/package/scripy) [![Build Status](https://img.shields.io/circleci/project/egoist/scripy/master.svg)](https://circleci.com/gh/egoist/scripy)

> Run scripts in child process.

![preview](https://ooo.0o0.ooo/2016/07/21/5790f46c54910.gif)

## Install

```bash
$ npm install --save scripy
```

## Usage

```js
const scripy = require('scripy')

const build = scripy('npm run build')
const start = scripy('npm start')

// if you want to kill each other
build.on('close', () => start.kill())
start.on('close', () => build.kill())
```

## API

### scripy(command, [options])

#### command

Type: `string`

The command to excute, it's passed as args to `child_process.spawn`.

#### options

##### displayName

Type: `string`

The name to display while loggin messages into the console, default is the parsed script name from `command`. eg: `npm run build`'s scriptName and displayName both are `npm`.

### scripy.sync(command, [options])

Same as `scripy()` but using `spawn.sync`.

## License

MIT © [EGOIST](https://github.com/egoist)
