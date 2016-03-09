const PROPERTIES = ['translateX', 'translateY', 'opacity', 'rotate', 'scale']
const ANIMATION_TIME = 41

const $window = $(window)
const $bodyhtml = $('body,html')

const INIT_STATE = {

  // Wrappers are the container scenes, kind of like sections.
  // They are defined by the folder structure.
  // They help sharing multiple focus points between integrated animations.

    wrappers: [],
    currentWrapper: null,

  // Know scroll location is critical to the scan experience.

    scrollTop: $window.scrollTop(),
    relativeScrollTop: 0,

  // Keyframes are the actual animation frames, defined in scene.json with
  // selectors and associated animations.
  // One wrapper can have multiple keyframes.

    keyframes: undefined,

  // Sum of all previous keyframes (to know relative position)

    prevKeyframesDurations: 0,

  // Current keyframe array number

    currentKeyframe: 0,

  // Keyframes can be defined as points of focus.
  // These focus points help give the user focus where they may want it, like with
  // The slide experience and the scrollbar legend.

  // Array of objects {time: , scroll: }
    frameFocus: [],

  // Id of current focus

    currentFocus: 0,

  // TODO
    currentFrame: [0],

  // TODO

    scrollTimeoutID: 0,

  // Defining dimensions for the experience

    bodyHeight: 0,
    windowHeight: 0,
    windowWidth: 0

}


module.exports.INIT_STATE = INIT_STATE
module.exports.PROPERTIES = PROPERTIES
module.exports.ANIMATION_TIME = ANIMATION_TIME
module.exports.WINDOW = $window
module.exports.BODYHTML = $bodyhtml
