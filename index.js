'use strict'
const spawn = require('child_process').spawn
const chalk = require('chalk')
const spawnArgs = require('spawn-args')

function parseCommand(str) {
  const parsed = str.match(/([^\s]+)\s+([^$]+)/)
  return {
    scriptName: parsed[1],
    args: spawnArgs(parsed[2])
  }
}

module.exports = function (string, options) {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string')
  }

  const command = parseCommand(string)

  options = options || {}
  const displayName = options.displayName || command.scriptName
  delete options.displayName

  const cmd = spawn(command.scriptName, command.args, options)

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

  return cmd
}
