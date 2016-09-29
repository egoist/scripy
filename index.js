'use strict'
const spawn = require('cross-spawn')
const chalk = require('chalk')
const spawnArgs = require('spawn-args')

function parseCommand(str) {
  const parsed = str.match(/([^\s]+)\s+([^$]+)/)
  return {
    scriptName: parsed[1],
    args: spawnArgs(parsed[2])
  }
}

function scripy(string, options) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string')
  }

  const command = parseCommand(string)

  options = options || {}
  const displayName = options.displayName || command.scriptName
  const sync = options.sync
  delete options.displayName
  delete options.sync

  const action = sync ? spawn.sync : spawn

  const cmd = action(command.scriptName, command.args, options)

  if (!sync) {
    cmd.stdout.on('data', data => {
      console.log(chalk.green(`[${displayName}] `) + data)
    })

    cmd.stderr.on('data', data => {
      console.log(chalk.red(`[${displayName}] `) + data)
    })

    cmd.on('close', code => {
      const color = code === 0 ? 'cyan' : 'red'
      console.log(`${chalk[color](`[${displayName}] script ${command.scriptName} exited with code ${code}`)}`)
    })
  }

  return cmd
}

scripy.sync = function sync(string, options) {
  options = Object.assign({sync: true}, options)
  return scripy(string, options)
}

module.exports = scripy
