// globals obscene_compiled

// The focus of the library is to be reactive throughout.
// The primary reactive library used in our app. Most knowledge gaps will be attributed to
import Kefir from 'kefir'

import Pace from 'pace'

import obscene from './ob-scene.js'
import controls from './user/controls.js'
import CONSTANTS from './constants.js'
// import sceneCompiler from './scene-compiler.js'

import render from './render/index.js'
import audioplayer from './render/audioplayer.js'
import mainUI from './template.js'

// audioplayer.config(sceneAudioConfig)


module.exports.init = (config) => {
    // obscene_compiled should be a global variable exposed by the obscene compiler
  let conf = config || obscene_compiled

  // Initialize Obscene
  // try {
    init(conf)
  // } catch (e) {
    // console.error("ob-scene initalization failed. did you add the compiled ob-scene files?", e)
  // }
}

function init(config) {
  // Pace requires a .start to show the loading screen
  Pace.start()

  const sceneHtmlString = config.sceneHtmlString
  const sceneConfig = config.sceneConfig

  const coreUIAdded$ = addCoreUI()
  const loadingComplete$ = Kefir.fromEvents(Pace, 'done')

  const initLoadingComplete$ = Kefir.zip([loadingComplete$, coreUIAdded$])
    .filter(checkReadyState)

  const touchDeviceDetected$ = initLoadingComplete$
    .filter(isTouchDevice)

  touchDeviceDetected$
    .onValue(() => {
      $('#unsupported').show()
      $(".container").hide()
      $(".loading").hide()
    })

  const readyToParse$ = initLoadingComplete$
    .filter(() => !(isTouchDevice()))

  readyToParse$.onValue(() => {
    obscene.init(sceneConfig)
    controls.init()
  })

  readyToParse$.onValue(() => {
      $('.container-inner').html(sceneHtmlString)
      $('.loading').delay(300).fadeOut()
      // audioplayer.next('intro');
      // audioplayer.play();
  })
}

function checkReadyState() {
  return (document.readyState === 'complete' // most browsers
         || document.readyState === 'loaded' // older safari
         || document.readyState === 'interactive' // at least inital doc loaded
         )
}

function isTouchDevice() {
  return 'ontouchstart' in window // works on most browsers
    || 'onmsgesturechange' in window // works on ie10
}

function addCoreUI() {

  // Add UI html
  const $mainUI = document.createElement('div')
  $mainUI.setAttribute('id', 'ob-scene-wrapper')
  $mainUI.innerHTML = mainUI
  document.querySelector('body').appendChild($mainUI)

  return Kefir.stream((emitter) => {
    // http://stackoverflow.com/a/35211286

    // set up the mutation observer
    const observer = new MutationObserver((mutations, me) => {
      // `mutations` is an array of mutations that occurred
      // `me` is the MutationObserver instance
      const obsceneWrapper = document.getElementById('experience-progress')
      if (obsceneWrapper) {
        emitter.emit(obsceneWrapper)
        me.disconnect() // stop observing
        return
      }
    })

    // start observing
    observer.observe(document, {
      childList: true,
      subtree: true,
    })
  })

}
