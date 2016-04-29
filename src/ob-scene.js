/*
 *  Dependencies
*/

  import * as Kefir from 'kefir'
  import { buildPage, convertAllPropsToPx } from './utils/page-utils.js'

/*
 *  Globals
*/

  import { ANIMATION_TIME, $window, INIT_STATE } from './constants.js'

/*
 *  Initialize
*/

  const initState = Kefir.stream(emitter => {
    emitter.emit(INIT_STATE)
  })

  import Pace from 'pace'
  const readyToParse$ = Kefir.pool()

  module.exports.init = (config, coreUIAdded$) => {
    // const sceneHtmlString = config.sceneHtmlString
    // const sceneConfig = config.sceneConfig

    // Pace requires a .start to show the loading screen
    const loadingComplete$ = Kefir.fromEvents(Pace, 'done')
    Pace.start()

    const initLoadingComplete$ = Kefir.zip([loadingComplete$, coreUIAdded$])
      .filter(checkReadyState)

    const initReady$ = initLoadingComplete$
      .filter(() => !(isTouchDevice()))
      .map(() => config)

    readyToParse$.plug(initReady$)
  }

  const touchDeviceDetected$ = readyToParse$
    .filter(isTouchDevice)

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

  const keyFramesRetreived$ = readyToParse$
    .flatMap((config) => Kefir.stream(emitter => {
      emitter.emit(config.sceneConfig)
    })
  )

  const stateInitialized$ = keyFramesRetreived$
    .flatMap(keyframes => initState.map(state => {
      const s = state
      s.keyframes = keyframes
      return s
    }))
    .map(state => {
      const s = state
      s.currentWrapper = s.wrappers[0]
      s.scrollTop = 0
      return s
    })

  module.exports.readyToParse$ = readyToParse$

  module.exports.touchDeviceDetected$ = touchDeviceDetected$

/*
 *  Build Page
*/

  const windowResized$ = stateInitialized$
    .flatMap((state) => Kefir.fromEvents($window, 'resize', () => state))
    .throttle(ANIMATION_TIME)

  const dimensionsCalculated$ = Kefir.merge([stateInitialized$, windowResized$])
    .map(calculateDimensions)
    .map(convertKeyFrames)
    .map(calculateKeyFramesAndFocus)
    .map(setInitWrapper)

  function calculateDimensions(state) {
    const s = state
    s.scrollTop = Math.floor($window.scrollTop())
    s.windowHeight = $window.height()
    s.windowWidth = $window.width()
    return s
  }

  function convertKeyFrames(state) {
    const s = state
    s.keyframes = convertAllPropsToPx(s.keyframes, s.windowWidth, s.windowHeight)
    return s
  }

  function calculateKeyFramesAndFocus(state) {
    const s = state
    const pageInfo = buildPage(state.keyframes, state.wrappers)

    s.bodyHeight = pageInfo.bodyHeight
    s.wrappers = pageInfo.wrappers

    s.frameFocus = pageInfo.frameFocus
      .map(i => Math.floor(i))
      .reduce((a, b) => {
         // clears any frame duplicates. TODO: find bug that makes frame duplicates
        if (a.indexOf(b) < 0) a.push(b)
        return a
      }, [])

    return state
  }

  function setInitWrapper(state) {
    const s = state
    s.currentWrapper = s.wrappers[0]
    return s
  }

  module.exports.dimensionsCalculated$ = dimensionsCalculated$

/*
 *  Position moved
*/

  const windowScrolled$ = Kefir.fromEvents($window, 'scroll')
    .throttle(ANIMATION_TIME)

  const somethingMoved$ = Kefir.fromEvents(window, 'POSITION_CHANGED')

  const windowsOrPositionChanged$ = dimensionsCalculated$
    .flatMap(state => Kefir.merge([windowScrolled$, somethingMoved$])
      .map(e => {
        const s = state
        s.changed = e
        return s
      })
    )

  const positionChanged$ = Kefir
    .merge([dimensionsCalculated$, windowsOrPositionChanged$])

/*
 *  State Changed
*/

  // Calculate current state
  const calculatedCurrentState$ = Kefir
    .merge([dimensionsCalculated$, positionChanged$])
    .map(setTops)
    .map(setKeyframe)
    .map(getSlideLocation)
    .map(state => {
      const s = state
      s.currentWrapper = s.keyframes[s.currentKeyframe].wrapper
      return s
    })

  function setTops(state) {
    const s = state
    s.scrollTop = Math.floor($window.scrollTop())
    s.relativeScrollTop = s.scrollTop - s.prevKeyframesDurations
    return s
  }

  function setKeyframe(state) {
    const s = state
    if (s.scrollTop > (s.keyframes[s.currentKeyframe].duration + s.prevKeyframesDurations)) {
      s.prevKeyframesDurations += s.keyframes[s.currentKeyframe].duration
      s.currentKeyframe++
    } else if (s.scrollTop < s.prevKeyframesDurations) {
      s.currentKeyframe--
      s.prevKeyframesDurations -= s.keyframes[s.currentKeyframe].duration
    }
    return s
  }

  function getSlideLocation(state) {
    function numberIsBetween(a, b) {
      const min = Math.min.apply(Math, [a, b])
      const max = Math.max.apply(Math, [a, b])
      return this > min && this < max
    }

    const s = state

    for (let x = 1; x <= s.frameFocus.length; x++) {
      if (s.frameFocus[x] === s.scrollTop) {
        s.currentFrame = [x]
      }
      if (numberIsBetween.call(s.scroll, s.frameFocus[x - 1], s.frameFocus[x])) {
        s.currentFrame = [x - 1, x]
      }
    }
    return s
  }

  const wrapperChanged$ = calculatedCurrentState$
    .map(state => state.currentWrapper)
    .diff(null, '')
    .filter(currentWrapper => currentWrapper[0] !== currentWrapper[1])
    // .delay(ANIMATION_TIME*2) // To wait for first animation frame to start before switching

  module.exports.wrapperChanged$ = wrapperChanged$

  const scrollTopChanged$ = calculatedCurrentState$
    .diff(null, { // Hack, for some reason INIT_STATE isn't coming in properly
      wrappers: [],
      currentWrapper: undefined,

      scrollTop: 0,
      relativeScrollTop: 0,

      keyframes: undefined,
      prevKeyframesDurations: 0,
      currentKeyframe: 0,

      frameFocus: [],
      currentFocus: 0,
      currentInterval: 0,

      scrollTimeoutID: 0,

      bodyHeight: 0,
      windowHeight: 0,
      windowWidth: 0,
    })

  module.exports.calculatedCurrentState$ = calculatedCurrentState$
  module.exports.scrollTopChanged$ = scrollTopChanged$
  // scrollTopChanged$.log()

/*
 *  Actions
*/

  // module.exports.get = () => state
  //   return state
  // }

  module.exports.action = (action) => {
    switch (action) {
      case 'next':
        $window.trigger('FOCUS_NEXT')
        break
      case 'previous':
        $window.trigger('FOCUS_PREVIOUS')
        break
      default:
        break
    }
  }

  const actionFocusNext = scrollTopChanged$
    .flatMapFirst((state) => Kefir.fromEvents($window, 'FOCUS_NEXT', () => state))
    .map(state => state[1])
    .map(nextFocus)

  const actionFocusPrevious = scrollTopChanged$
    .flatMapFirst((state) => Kefir.fromEvents($window, 'FOCUS_PREVIOUS', () => state))
    .map(state => state[1])
    .map(previousFocus)

  function nextFocus(state) {
    switch (state.currentFrame.length) {
      case 1:
        return state.frameFocus[state.currentFrame[0] + 1]
      case 2:
        return state.frameFocus[state.currentFrame[1]]
      default:
        return false
    }
  }

  function previousFocus(state) {
    switch (state.currentFrame.length) {
      case 1:
        return state.frameFocus[state.currentFrame[0] - 1]
      case 2:
        return state.frameFocus[state.currentFrame[0]]
      default:
        return false
    }
  }

  const focusChanged$ = Kefir.merge([actionFocusPrevious, actionFocusNext])

  module.exports.focusChanged$ = focusChanged$
