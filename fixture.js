#!/usr/bin/env node
'use strict'

const args = process.argv.slice(2)
console.log('hello')

setTimeout(() => {
  console.error(`${args[0]} world`)
  process.exitCode = 1
}, 600)
