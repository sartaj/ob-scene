/*
 *  Dependencies
*/

  import {
          scrollTopChanged$,
          focusChanged$,
          dimensionsCalculated$,
          calculatedCurrentState$,
          wrapperChanged$,
          readyToParse$,
          touchDeviceDetected$,
          } from '../ob-scene.js'

  import * as pageUtils from '../utils/page-utils.js'
  import { $window, $body } from '../constants.js'

  import Kefir from 'kefir'

  import mainLoop from 'main-loop'
  import h from 'virtual-dom/h'

  // import audioplayer from './render/audioplayer.js'
  // audioplayer.config(sceneAudioConfig)

/*
 *  Child Renders
*/

  const renderWrapper = require('./wrapper.js')
  const renderScrollbar = require('./scrollbar.js')
  const renderAudioPlayer = require('./audioplayer.js')
  const renderVideoPlayer = require('./videoplayer.js')
  const renderError = require('./error.js')

/*
 *  Render
*/

  // Hack to force resize once. For some
  // reason this prevents the animations from blinking on Chrome
  scrollTopChanged$.take(1).delay(500).onValue(() => {
    $window.trigger('resize')
  })

  // Render Dimensions
  dimensionsCalculated$.onValue(state => {
    $body.height(state.bodyHeight)
    renderScrollBarFocusBars(state)
  })

    function renderScrollBarFocusBars(state) {
      state.frameFocus
        .map((focus) => (focus / state.bodyHeight).toFixed(2) * 100) // Convert to percent
        .map((focusPercent) => focusPercent + "vh") // Convert to vh
        .map((focusVh) => {
          $("#experience-progress")
            .append('<div class="center-marker" style="top:' + focusVh + '"></div>')
        })
    }

  // Render Wrapper
  wrapperChanged$.onValue((currentWrapper) => {
    // console.log("WRAPPER CHANGED");
    window.requestAnimationFrame(() => {
      $(currentWrapper[0]).hide()
      $(currentWrapper[1]).show()

      window.location.hash = currentWrapper[1]
      // ga('send', 'scene_accessed', currentWrapper[1]) // Google Analytics
      renderVideo(currentWrapper)
      renderAudio(currentWrapper)
    })
  })

    function showCurrentWrappers(prev, next) {
      if (prev.currentWrapper === next.currentWrapper) { return false }
      // console.log('previous', prev, next)
      $(prev.currentWrapper).hide()
      $(next.currentWrapper).show()
    }

    function renderVideo(state) {

        $('video', state[0]).animate({
          volume: 0
        }, 300, 'swing', function() {
          // really stop the video
          $(this).get(0).pause()
        })

        let $newVideo = $('video', state[1])

        if ($newVideo[0]) {
          $newVideo[0].play()
          $newVideo.animate({
            volume: $newVideo.attr('max-volume') || 1
          }, 300, 'swing')
          renderVideoPlayer.start($newVideo)
        } else {
          renderVideoPlayer.stop($newVideo)
        }

    }
    function renderAudio(state) {
      renderAudioPlayer.next(state[1].substr(1));
    }

  // Render Keyframes

  scrollTopChanged$.onValue((statediff) => {

    window.requestAnimationFrame(() => {
        let prev = statediff[0]
        let next = statediff[1]

        animateElements(next)
        animateScrollBar(next)
        // renderMusic(next)
    })

  })

  focusChanged$.onValue(renderScroll)

    function renderScroll(scroll) {
      // console.log('RENDER', scroll, Math.floor($window.scrollTop()))
      $body.animate({
        scrollTop: scroll,
      }, 1500, 'linear')
    }

    function renderMusic(wrapperId) {
      audioplayer.next(wrapperId.substr(1))
    }

    function animateScrollBar(state) {
      var percent = (state.scrollTop / state.bodyHeight).toFixed(2) * 100
      $('#experience-progress .progress').css({
        'transform': 'translateY(' + percent + '%)'
      })
    }

    function animateElements(state) {
      var animation, translateY, translateX, scale, rotate, opacity
      for (let i = 0; i < state.keyframes[state.currentKeyframe].animations.length; i++) {
        animation = state.keyframes[state.currentKeyframe].animations[i]
        translateY = calcPropValue(animation, 'translateY', state)
        translateX = calcPropValue(animation, 'translateX', state)
        scale = calcPropValue(animation, 'scale', state)
        rotate = calcPropValue(animation, 'rotate', state)
        opacity = calcPropValue(animation, 'opacity', state)
        $(animation.selector, state.currentWrapper).css({
          'transform': 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ') rotate(' + rotate + 'deg)',
          'opacity': opacity.toFixed(2)
        })

      }
    }

      function calcPropValue(animation, property, state) {
        let value = animation[property]
        if (value) {
          value = easeInOutQuad(state.relativeScrollTop, value[0], (value[1] - value[0]), state.keyframes[state.currentKeyframe].duration)
        } else {
          value = pageUtils.getDefaultPropertyValue(property)
        }
        // value = +value.toFixed(2)
        // TEMPORARILY REMOVED CAUSE SCALE DOESN'T WORK WITHA AGRESSIVE ROUNDING LIKE THIS
        return value
      }

      function getDefaultPropertyValue(property) {
        switch (property) {
          case 'translateX':
            return 0
          case 'translateY':
            return 0
          case 'scale':
            return 1
          case 'rotate':
            return 0
          case 'opacity':
            return 1
          default:
            return null
        }
      }

      function easeInOutQuad(t, b, c, d) {
        //sinusoadial in and out
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b
      }

      /*
       *  Helpers
      */

        // function throwError() {
        //   $body.addClass('page-error')
        // }

        function renderable(state) {
          return h('div', { style: { position: 'fixed' } }, [
            h('div', [
              h('span', 'Hello World'),
              h('span', state.currentWrapper),
              h('span', state.scrollTop.toString() ? state.scrollTop.toString() : null),
            ]),
          ])
        }


  app(document.querySelector('body'), calculatedCurrentState$, renderable)

  function app(elem, observable, render) {
    let loop
    return observable.onValue((value) => {
      // console.log(nextVal)
      if (loop) {
        loop.update(value)
      } else {
        loop = mainLoop(value, render, {
          diff: require('virtual-dom/diff'),
          create: require('virtual-dom/create-element'),
          patch: require('virtual-dom/patch'),
        })
        elem.appendChild(loop.target)
      }
    })
  }

  module.exports.app = app


  import MAIN_UI_TEMPLATE from './template.js'

  // Add the core template, inluding ui elements,
  // from `./template.js` to the body
  // @returns stream when template is added
  function addCoreUI() {
    const DOM_ID_TO_LOOK_FOR = 'experience-progress'
    const OBSCENE_WRAPPER_ID = 'ob-scene-wrapper'

    // Add UI html
    const $mainUI = document.createElement('div')
    $mainUI.setAttribute('id', OBSCENE_WRAPPER_ID)
    $mainUI.innerHTML = MAIN_UI_TEMPLATE
    document.querySelector('body').appendChild($mainUI)

    return Kefir.stream((emitter) => {
      // source: http://stackoverflow.com/a/35211286

      // set up the mutation observer
      const observer = new MutationObserver((mutations, self) => {
        // `mutations` is an array of mutations that occurred
        // `self` is the MutationObserver instance
        const obsceneWrapper = document.getElementById(DOM_ID_TO_LOOK_FOR)
        if (obsceneWrapper) {
          emitter.emit(obsceneWrapper)
          emitter.end()
        }
        return () => {
          self.disconnect() // stop observing
        }
      })

      // start observing
      observer.observe(document, {
        childList: true,
        subtree: true,
      })
    })
  }

  module.exports.init = () => {
    const coreUIAdded$ = addCoreUI()
    return coreUIAdded$
  }

  readyToParse$.onValue((config) => {
    $('.container-inner').html(config.sceneHtmlString)
    $('.loading').delay(300).fadeOut()
    // audioplayer.next('intro');
    // audioplayer.play();
  })

  touchDeviceDetected$
    .onValue(() => {
      $('#unsupported').show()
      $('.container').hide()
      $('.loading').hide()
    })
