// globals webpack json-loader + html-loader
// NOTE: This file relies heavily on webpack for requires of html and json config files.

// Constants

  // const SCENE_INDEX = require('json!../../scenes/index.json')
  const SCENE_CONTAINER_CSS_CLASS = 'wrapper'
  const fs = require('fs')
/*
 * Generates an HTML string from scene.html files the scenes folder.
 * Creates a wrapper div that provides feedback.
 */
  module.exports.compile = compile
  function compile(path) {
    const sceneIndex = getSceneIndex(path)
    const sceneHtmlString = renderHTML(path, sceneIndex)
    const sceneConfig = getSceneConfigs(path, sceneIndex)
    const sceneAudioConfig = getAudioConfig(sceneIndex)
    const output = {
      sceneHtmlString,
      sceneConfig,
    }
    return output
  }

  module.exports.getSceneIndex = getSceneIndex

  function getSceneIndex(path) {
    return require(`${path}/index.json`)
  }

  module.exports.renderHTML = renderHTML

  function renderHTML(path, sceneIndex) {
    return sceneIndex
      // Get scene ID
        .map(scene => scene.id)
      // Get HTML files
        .map((sceneName) => {
          const html = fs.readFileSync(`${path}${sceneName}/scene.html`)
          const name = sceneName
          return {
            html,
            name,
          }
        })
      // Create wrapper div for html
        .map((sceneObject) => {
          const str = `
          <div id="${sceneObject.name}" class="${SCENE_CONTAINER_CSS_CLASS}">
            ${sceneObject.html}
          </div>
          `
          return str
        })
      // Concat to 1 html string
        .reduce((prev, next) => prev + next, '')
  }

  module.exports.getScenes = getSceneConfigs

  function getSceneConfigs(path, sceneIndex) {
    return sceneIndex
      // Get scene ID
        .map(scene => scene.id)
      // get the scenes(which are in arrays)
        .map((sceneName) => require(`${path}${sceneName}/scene.json`))
      // flatten arrays by concating into a new array
        .reduce((prev, current) => prev.concat(current), [])
  }

  module.exports.getAudioConfig = getAudioConfig

  function getAudioConfig(sceneIndex) {
    // Pass sceneIndex
    return sceneIndex
      .map(scene => scene)
  }
