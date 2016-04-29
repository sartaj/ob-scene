#!/bin/sh

':' //; exec node --harmony "$0" "$@";

//  Imports

const fs = require('fs')
// const path = require('path')
// const args = process.argv.slice(2)

const watch = require('watch')
const colors = require('colors/safe')
const colorsConfig = {
  info: 'cyan',
  success: 'green',
  data: 'grey',
  debug: 'blue',
  error: 'red',
}
colors.setTheme(colorsConfig)


const sceneCompiler = require('./scene-compiler.js')

const processedPath = `${process.cwd()}/scenes/`

//  Compile

function compile() {
  console.log(colors.data('compiling...'))
  console.time(colors.info('compiled...'))
  const compiled = sceneCompiler.compile(processedPath)
  const jsCompiled = `var obscene_compiled = ${JSON.stringify(compiled)}`
  fs.writeFileSync('./scenes-compiled.js', jsCompiled)
  console.timeEnd(colors.info('compiled...'));
}

const watchOpts = {
  ignoreDotFiles: true,
}

//  Init

function init() {
  console.log(colors.success(`compiling ${processedPath} \nto ${process.cwd()}/scenes-compiled.js`))

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

  compile()
}

init()
