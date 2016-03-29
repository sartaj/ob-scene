#!/bin/sh

':' //; exec node --harmony "$0" "$@";

//  Imports

const fs = require('fs')
const path = require('path')
const args = process.argv.slice(2)

const watch = require('watch')
var colors = require('colors/safe')
const colorsConfig = {
  info: 'cyan',
  data: 'grey',
  debug: 'blue',
  error: 'red',
}
colors.setTheme(colorsConfig)


const sceneCompiler = require('./scene-compiler.js')

const processedPath = process.cwd() + '/scenes/'

//  Compile

function compile() {
  console.log(colors.info('compiling...'))
  const compiled = sceneCompiler.compile(processedPath)
  fs.writeFileSync('./scenes-compiled.js', `var obscene_compiled = ${JSON.stringify(compiled)}`)
}

const watchOpts = {
  ignoreDotFiles: true,
}

watch.createMonitor(processedPath, watchOpts, (monitor) => {
  monitor.on('created', (f) => {
    console.log(colors.data(`created ${f}`))
      // Handle new files
    compile()
  })
  monitor.on('changed', (f) => {
    console.log(colors.data(`changed: ${f}`))
      // Handle file changes
    compile()
  })
  monitor.on('removed', (f) => {
    console.log(colors.data(`removed: ${f}`))
      // Handle removed files
    compile()
  })
})

//  Init

compile()
