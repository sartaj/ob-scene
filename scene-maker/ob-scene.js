/*
 *  Dependencies
*/

  import * as Kefir from 'kefir'
  import { buildPage, convertAllPropsToPx } from './utils/page-utils.js'

/*
 *  Globals
*/

  const CONSTANTS = require('./constants.js')

  // const PROPERTIES = CONSTANTS.PROPERTIES
  const ANIMATION_TIME = CONSTANTS.ANIMATION_TIME

  const $window = CONSTANTS.WINDOW
  const $bodyhtml = CONSTANTS.BODYHTML

  const INIT_STATE = CONSTANTS.INIT_STATE

/*
 *  Initialize
*/

  const stateInitialized$ = Kefir.pool()

  const initState = Kefir.stream(emitter => {
    emitter.emit(INIT_STATE)
  })

  module.exports.init = (retreivedKeyFrames) => {
    const keyFramesRetreived$ = Kefir.stream(emitter => {
      emitter.emit(retreivedKeyFrames)
    })

    const keyFramesMappedToState$ = keyFramesRetreived$
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

    stateInitialized$.plug(keyFramesMappedToState$)
  }

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
    .onValue(renderScroll)

  // TODO: Remove log
  focusChanged$.log()

  // TODO: Abstract Render to renderer
  function renderScroll(scroll) {
    // console.log("RENDER", scroll, Math.floor($window.scrollTop()))
    $bodyhtml.animate({
      scrollTop: scroll,
    }, 1500, 'linear')
  }

/*
 *  Helpers
*/

  // function throwError() {
  //   $bodyhtml.addClass('page-error')
  // }
