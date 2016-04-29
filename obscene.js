var obscene =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _obScene = __webpack_require__(1);
	
	var _obScene2 = _interopRequireDefault(_obScene);
	
	var _controls = __webpack_require__(6);
	
	var _controls2 = _interopRequireDefault(_controls);
	
	var _index = __webpack_require__(7);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports.init = function (config) {
	  // obscene_compiled should be a global variable exposed by the obscene compiler
	  var conf = config || obscene_compiled;
	
	  if (!conf) throw new Error('Please include an obscene-compiled js file before the init');
	  var coreUIAdded$ = _index2.default.init();
	  _obScene2.default.init(conf, coreUIAdded$);
	  _controls2.default.init();
	}; // globals obscene_compiled

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _kefir = __webpack_require__(2);
	
	var Kefir = _interopRequireWildcard(_kefir);
	
	var _pageUtils = __webpack_require__(3);
	
	var _constants = __webpack_require__(4);
	
	var _pace = __webpack_require__(5);
	
	var _pace2 = _interopRequireDefault(_pace);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*
	 *  Initialize
	*/
	
	var initState = Kefir.stream(function (emitter) {
	  emitter.emit(_constants.INIT_STATE);
	});
	
	/*
	 *  Globals
	*/
	
	/*
	 *  Dependencies
	*/
	
	var readyToParse$ = Kefir.pool();
	
	module.exports.init = function (config, coreUIAdded$) {
	  // const sceneHtmlString = config.sceneHtmlString
	  // const sceneConfig = config.sceneConfig
	
	  // Pace requires a .start to show the loading screen
	  var loadingComplete$ = Kefir.fromEvents(_pace2.default, 'done');
	  _pace2.default.start();
	
	  var initLoadingComplete$ = Kefir.zip([loadingComplete$, coreUIAdded$]).filter(checkReadyState);
	
	  var initReady$ = initLoadingComplete$.filter(function () {
	    return !isTouchDevice();
	  }).map(function () {
	    return config;
	  });
	
	  readyToParse$.plug(initReady$);
	};
	
	var touchDeviceDetected$ = readyToParse$.filter(isTouchDevice);
	
	function checkReadyState() {
	  return document.readyState === 'complete' // most browsers
	   || document.readyState === 'loaded' // older safari
	   || document.readyState === 'interactive' // at least inital doc loaded
	  ;
	}
	
	function isTouchDevice() {
	  return 'ontouchstart' in window // works on most browsers
	   || 'onmsgesturechange' in window; // works on ie10
	}
	
	var keyFramesRetreived$ = readyToParse$.flatMap(function (config) {
	  return Kefir.stream(function (emitter) {
	    emitter.emit(config.sceneConfig);
	  });
	});
	
	var stateInitialized$ = keyFramesRetreived$.flatMap(function (keyframes) {
	  return initState.map(function (state) {
	    var s = state;
	    s.keyframes = keyframes;
	    return s;
	  });
	}).map(function (state) {
	  var s = state;
	  s.currentWrapper = s.wrappers[0];
	  s.scrollTop = 0;
	  return s;
	});
	
	module.exports.readyToParse$ = readyToParse$;
	
	module.exports.touchDeviceDetected$ = touchDeviceDetected$;
	
	/*
	 *  Build Page
	*/
	
	var windowResized$ = stateInitialized$.flatMap(function (state) {
	  return Kefir.fromEvents(_constants.$window, 'resize', function () {
	    return state;
	  });
	}).throttle(_constants.ANIMATION_TIME);
	
	var dimensionsCalculated$ = Kefir.merge([stateInitialized$, windowResized$]).map(calculateDimensions).map(convertKeyFrames).map(calculateKeyFramesAndFocus).map(setInitWrapper);
	
	function calculateDimensions(state) {
	  var s = state;
	  s.scrollTop = Math.floor(_constants.$window.scrollTop());
	  s.windowHeight = _constants.$window.height();
	  s.windowWidth = _constants.$window.width();
	  return s;
	}
	
	function convertKeyFrames(state) {
	  var s = state;
	  s.keyframes = (0, _pageUtils.convertAllPropsToPx)(s.keyframes, s.windowWidth, s.windowHeight);
	  return s;
	}
	
	function calculateKeyFramesAndFocus(state) {
	  var s = state;
	  var pageInfo = (0, _pageUtils.buildPage)(state.keyframes, state.wrappers);
	
	  s.bodyHeight = pageInfo.bodyHeight;
	  s.wrappers = pageInfo.wrappers;
	
	  s.frameFocus = pageInfo.frameFocus.map(function (i) {
	    return Math.floor(i);
	  }).reduce(function (a, b) {
	    // clears any frame duplicates. TODO: find bug that makes frame duplicates
	    if (a.indexOf(b) < 0) a.push(b);
	    return a;
	  }, []);
	
	  return state;
	}
	
	function setInitWrapper(state) {
	  var s = state;
	  s.currentWrapper = s.wrappers[0];
	  return s;
	}
	
	module.exports.dimensionsCalculated$ = dimensionsCalculated$;
	
	/*
	 *  Position moved
	*/
	
	var windowScrolled$ = Kefir.fromEvents(_constants.$window, 'scroll').throttle(_constants.ANIMATION_TIME);
	
	var somethingMoved$ = Kefir.fromEvents(window, 'POSITION_CHANGED');
	
	var windowsOrPositionChanged$ = dimensionsCalculated$.flatMap(function (state) {
	  return Kefir.merge([windowScrolled$, somethingMoved$]).map(function (e) {
	    var s = state;
	    s.changed = e;
	    return s;
	  });
	});
	
	var positionChanged$ = Kefir.merge([dimensionsCalculated$, windowsOrPositionChanged$]);
	
	/*
	 *  State Changed
	*/
	
	// Calculate current state
	var calculatedCurrentState$ = Kefir.merge([dimensionsCalculated$, positionChanged$]).map(setTops).map(setKeyframe).map(getSlideLocation).map(function (state) {
	  var s = state;
	  s.currentWrapper = s.keyframes[s.currentKeyframe].wrapper;
	  return s;
	});
	
	function setTops(state) {
	  var s = state;
	  s.scrollTop = Math.floor(_constants.$window.scrollTop());
	  s.relativeScrollTop = s.scrollTop - s.prevKeyframesDurations;
	  return s;
	}
	
	function setKeyframe(state) {
	  var s = state;
	  if (s.scrollTop > s.keyframes[s.currentKeyframe].duration + s.prevKeyframesDurations) {
	    s.prevKeyframesDurations += s.keyframes[s.currentKeyframe].duration;
	    s.currentKeyframe++;
	  } else if (s.scrollTop < s.prevKeyframesDurations) {
	    s.currentKeyframe--;
	    s.prevKeyframesDurations -= s.keyframes[s.currentKeyframe].duration;
	  }
	  return s;
	}
	
	function getSlideLocation(state) {
	  function numberIsBetween(a, b) {
	    var min = Math.min.apply(Math, [a, b]);
	    var max = Math.max.apply(Math, [a, b]);
	    return this > min && this < max;
	  }
	
	  var s = state;
	
	  for (var x = 1; x <= s.frameFocus.length; x++) {
	    if (s.frameFocus[x] === s.scrollTop) {
	      s.currentFrame = [x];
	    }
	    if (numberIsBetween.call(s.scroll, s.frameFocus[x - 1], s.frameFocus[x])) {
	      s.currentFrame = [x - 1, x];
	    }
	  }
	  return s;
	}
	
	var wrapperChanged$ = calculatedCurrentState$.map(function (state) {
	  return state.currentWrapper;
	}).diff(null, '').filter(function (currentWrapper) {
	  return currentWrapper[0] !== currentWrapper[1];
	});
	// .delay(ANIMATION_TIME*2) // To wait for first animation frame to start before switching
	
	module.exports.wrapperChanged$ = wrapperChanged$;
	
	var scrollTopChanged$ = calculatedCurrentState$.diff(null, { // Hack, for some reason INIT_STATE isn't coming in properly
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
	  windowWidth: 0
	});
	
	module.exports.calculatedCurrentState$ = calculatedCurrentState$;
	module.exports.scrollTopChanged$ = scrollTopChanged$;
	// scrollTopChanged$.log()
	
	/*
	 *  Actions
	*/
	
	// module.exports.get = () => state
	//   return state
	// }
	
	module.exports.action = function (action) {
	  switch (action) {
	    case 'next':
	      _constants.$window.trigger('FOCUS_NEXT');
	      break;
	    case 'previous':
	      _constants.$window.trigger('FOCUS_PREVIOUS');
	      break;
	    default:
	      break;
	  }
	};
	
	var actionFocusNext = scrollTopChanged$.flatMapFirst(function (state) {
	  return Kefir.fromEvents(_constants.$window, 'FOCUS_NEXT', function () {
	    return state;
	  });
	}).map(function (state) {
	  return state[1];
	}).map(nextFocus);
	
	var actionFocusPrevious = scrollTopChanged$.flatMapFirst(function (state) {
	  return Kefir.fromEvents(_constants.$window, 'FOCUS_PREVIOUS', function () {
	    return state;
	  });
	}).map(function (state) {
	  return state[1];
	}).map(previousFocus);
	
	function nextFocus(state) {
	  switch (state.currentFrame.length) {
	    case 1:
	      return state.frameFocus[state.currentFrame[0] + 1];
	    case 2:
	      return state.frameFocus[state.currentFrame[1]];
	    default:
	      return false;
	  }
	}
	
	function previousFocus(state) {
	  switch (state.currentFrame.length) {
	    case 1:
	      return state.frameFocus[state.currentFrame[0] - 1];
	    case 2:
	      return state.frameFocus[state.currentFrame[0]];
	    default:
	      return false;
	  }
	}
	
	var focusChanged$ = Kefir.merge([actionFocusPrevious, actionFocusNext]);
	
	module.exports.focusChanged$ = focusChanged$;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*! Kefir.js v3.2.0
	 *  https://github.com/rpominov/kefir
	 */
	
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Kefir"] = factory();
		else
			root["Kefir"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Kefir = module.exports = {};
		Kefir.Kefir = Kefir;
	
		var Observable = Kefir.Observable = __webpack_require__(1);
		Kefir.Stream = __webpack_require__(6);
		Kefir.Property = __webpack_require__(7);
	
		// Create a stream
		// -----------------------------------------------------------------------------
	
		// () -> Stream
		Kefir.never = __webpack_require__(8);
	
		// (number, any) -> Stream
		Kefir.later = __webpack_require__(9);
	
		// (number, any) -> Stream
		Kefir.interval = __webpack_require__(11);
	
		// (number, Array<any>) -> Stream
		Kefir.sequentially = __webpack_require__(12);
	
		// (number, Function) -> Stream
		Kefir.fromPoll = __webpack_require__(13);
	
		// (number, Function) -> Stream
		Kefir.withInterval = __webpack_require__(14);
	
		// (Function) -> Stream
		Kefir.fromCallback = __webpack_require__(16);
	
		// (Function) -> Stream
		Kefir.fromNodeCallback = __webpack_require__(18);
	
		// Target = {addEventListener, removeEventListener}|{addListener, removeListener}|{on, off}
		// (Target, string, Function|undefined) -> Stream
		Kefir.fromEvents = __webpack_require__(19);
	
		// (Function) -> Stream
		Kefir.stream = __webpack_require__(17);
	
		// Create a property
		// -----------------------------------------------------------------------------
	
		// (any) -> Property
		Kefir.constant = __webpack_require__(22);
	
		// (any) -> Property
		Kefir.constantError = __webpack_require__(23);
	
		// Convert observables
		// -----------------------------------------------------------------------------
	
		// (Stream|Property, Function|undefined) -> Property
		var toProperty = __webpack_require__(24);
		Observable.prototype.toProperty = function (fn) {
		  return toProperty(this, fn);
		};
	
		// (Stream|Property) -> Stream
		var changes = __webpack_require__(26);
		Observable.prototype.changes = function () {
		  return changes(this);
		};
	
		// Interoperation with other implimentations
		// -----------------------------------------------------------------------------
	
		// (Promise) -> Property
		Kefir.fromPromise = __webpack_require__(27);
	
		// (Stream|Property, Function|undefined) -> Promise
		var toPromise = __webpack_require__(28);
		Observable.prototype.toPromise = function (Promise) {
		  return toPromise(this, Promise);
		};
	
		// (ESObservable) -> Stream
		Kefir.fromESObservable = __webpack_require__(29);
	
		// (Stream|Property) -> ES7 Observable
		var toESObservable = __webpack_require__(31);
		Observable.prototype.toESObservable = toESObservable;
		Observable.prototype[__webpack_require__(30)('observable')] = toESObservable;
	
		// Modify an observable
		// -----------------------------------------------------------------------------
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var map = __webpack_require__(32);
		Observable.prototype.map = function (fn) {
		  return map(this, fn);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var filter = __webpack_require__(33);
		Observable.prototype.filter = function (fn) {
		  return filter(this, fn);
		};
	
		// (Stream, number) -> Stream
		// (Property, number) -> Property
		var take = __webpack_require__(34);
		Observable.prototype.take = function (n) {
		  return take(this, n);
		};
	
		// (Stream, number) -> Stream
		// (Property, number) -> Property
		var takeErrors = __webpack_require__(35);
		Observable.prototype.takeErrors = function (n) {
		  return takeErrors(this, n);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var takeWhile = __webpack_require__(36);
		Observable.prototype.takeWhile = function (fn) {
		  return takeWhile(this, fn);
		};
	
		// (Stream) -> Stream
		// (Property) -> Property
		var last = __webpack_require__(37);
		Observable.prototype.last = function () {
		  return last(this);
		};
	
		// (Stream, number) -> Stream
		// (Property, number) -> Property
		var skip = __webpack_require__(38);
		Observable.prototype.skip = function (n) {
		  return skip(this, n);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var skipWhile = __webpack_require__(39);
		Observable.prototype.skipWhile = function (fn) {
		  return skipWhile(this, fn);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var skipDuplicates = __webpack_require__(40);
		Observable.prototype.skipDuplicates = function (fn) {
		  return skipDuplicates(this, fn);
		};
	
		// (Stream, Function|falsey, any|undefined) -> Stream
		// (Property, Function|falsey, any|undefined) -> Property
		var diff = __webpack_require__(41);
		Observable.prototype.diff = function (fn, seed) {
		  return diff(this, fn, seed);
		};
	
		// (Stream|Property, Function, any|undefined) -> Property
		var scan = __webpack_require__(42);
		Observable.prototype.scan = function (fn, seed) {
		  return scan(this, fn, seed);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var flatten = __webpack_require__(43);
		Observable.prototype.flatten = function (fn) {
		  return flatten(this, fn);
		};
	
		// (Stream, number) -> Stream
		// (Property, number) -> Property
		var delay = __webpack_require__(44);
		Observable.prototype.delay = function (wait) {
		  return delay(this, wait);
		};
	
		// Options = {leading: boolean|undefined, trailing: boolean|undefined}
		// (Stream, number, Options|undefined) -> Stream
		// (Property, number, Options|undefined) -> Property
		var throttle = __webpack_require__(45);
		Observable.prototype.throttle = function (wait, options) {
		  return throttle(this, wait, options);
		};
	
		// Options = {immediate: boolean|undefined}
		// (Stream, number, Options|undefined) -> Stream
		// (Property, number, Options|undefined) -> Property
		var debounce = __webpack_require__(47);
		Observable.prototype.debounce = function (wait, options) {
		  return debounce(this, wait, options);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var mapErrors = __webpack_require__(48);
		Observable.prototype.mapErrors = function (fn) {
		  return mapErrors(this, fn);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var filterErrors = __webpack_require__(49);
		Observable.prototype.filterErrors = function (fn) {
		  return filterErrors(this, fn);
		};
	
		// (Stream) -> Stream
		// (Property) -> Property
		var ignoreValues = __webpack_require__(50);
		Observable.prototype.ignoreValues = function () {
		  return ignoreValues(this);
		};
	
		// (Stream) -> Stream
		// (Property) -> Property
		var ignoreErrors = __webpack_require__(51);
		Observable.prototype.ignoreErrors = function () {
		  return ignoreErrors(this);
		};
	
		// (Stream) -> Stream
		// (Property) -> Property
		var ignoreEnd = __webpack_require__(52);
		Observable.prototype.ignoreEnd = function () {
		  return ignoreEnd(this);
		};
	
		// (Stream, Function) -> Stream
		// (Property, Function) -> Property
		var beforeEnd = __webpack_require__(53);
		Observable.prototype.beforeEnd = function (fn) {
		  return beforeEnd(this, fn);
		};
	
		// (Stream, number, number|undefined) -> Stream
		// (Property, number, number|undefined) -> Property
		var slidingWindow = __webpack_require__(54);
		Observable.prototype.slidingWindow = function (max, min) {
		  return slidingWindow(this, max, min);
		};
	
		// Options = {flushOnEnd: boolean|undefined}
		// (Stream, Function|falsey, Options|undefined) -> Stream
		// (Property, Function|falsey, Options|undefined) -> Property
		var bufferWhile = __webpack_require__(55);
		Observable.prototype.bufferWhile = function (fn, options) {
		  return bufferWhile(this, fn, options);
		};
	
		// (Stream, number) -> Stream
		// (Property, number) -> Property
		var bufferWithCount = __webpack_require__(56);
		Observable.prototype.bufferWithCount = function (count, options) {
		  return bufferWithCount(this, count, options);
		};
	
		// Options = {flushOnEnd: boolean|undefined}
		// (Stream, number, number, Options|undefined) -> Stream
		// (Property, number, number, Options|undefined) -> Property
		var bufferWithTimeOrCount = __webpack_require__(57);
		Observable.prototype.bufferWithTimeOrCount = function (wait, count, options) {
		  return bufferWithTimeOrCount(this, wait, count, options);
		};
	
		// (Stream, Function) -> Stream
		// (Property, Function) -> Property
		var transduce = __webpack_require__(58);
		Observable.prototype.transduce = function (transducer) {
		  return transduce(this, transducer);
		};
	
		// (Stream, Function) -> Stream
		// (Property, Function) -> Property
		var withHandler = __webpack_require__(59);
		Observable.prototype.withHandler = function (fn) {
		  return withHandler(this, fn);
		};
	
		// Combine observables
		// -----------------------------------------------------------------------------
	
		// (Array<Stream|Property>, Function|undefiend) -> Stream
		// (Array<Stream|Property>, Array<Stream|Property>, Function|undefiend) -> Stream
		var combine = Kefir.combine = __webpack_require__(60);
		Observable.prototype.combine = function (other, combinator) {
		  return combine([this, other], combinator);
		};
	
		// (Array<Stream|Property>, Function|undefiend) -> Stream
		var zip = Kefir.zip = __webpack_require__(61);
		Observable.prototype.zip = function (other, combinator) {
		  return zip([this, other], combinator);
		};
	
		// (Array<Stream|Property>) -> Stream
		var merge = Kefir.merge = __webpack_require__(62);
		Observable.prototype.merge = function (other) {
		  return merge([this, other]);
		};
	
		// (Array<Stream|Property>) -> Stream
		var concat = Kefir.concat = __webpack_require__(64);
		Observable.prototype.concat = function (other) {
		  return concat([this, other]);
		};
	
		// () -> Pool
		var Pool = Kefir.Pool = __webpack_require__(66);
		Kefir.pool = function () {
		  return new Pool();
		};
	
		// (Function) -> Stream
		Kefir.repeat = __webpack_require__(65);
	
		// Options = {concurLim: number|undefined, queueLim: number|undefined, drop: 'old'|'new'|undefiend}
		// (Stream|Property, Function|falsey, Options|undefined) -> Stream
		var FlatMap = __webpack_require__(67);
		Observable.prototype.flatMap = function (fn) {
		  return new FlatMap(this, fn).setName(this, 'flatMap');
		};
		Observable.prototype.flatMapLatest = function (fn) {
		  return new FlatMap(this, fn, { concurLim: 1, drop: 'old' }).setName(this, 'flatMapLatest');
		};
		Observable.prototype.flatMapFirst = function (fn) {
		  return new FlatMap(this, fn, { concurLim: 1 }).setName(this, 'flatMapFirst');
		};
		Observable.prototype.flatMapConcat = function (fn) {
		  return new FlatMap(this, fn, { queueLim: -1, concurLim: 1 }).setName(this, 'flatMapConcat');
		};
		Observable.prototype.flatMapConcurLimit = function (fn, limit) {
		  return new FlatMap(this, fn, { queueLim: -1, concurLim: limit }).setName(this, 'flatMapConcurLimit');
		};
	
		// (Stream|Property, Function|falsey) -> Stream
		var FlatMapErrors = __webpack_require__(68);
		Observable.prototype.flatMapErrors = function (fn) {
		  return new FlatMapErrors(this, fn).setName(this, 'flatMapErrors');
		};
	
		// Combine two observables
		// -----------------------------------------------------------------------------
	
		// (Stream, Stream|Property) -> Stream
		// (Property, Stream|Property) -> Property
		var filterBy = __webpack_require__(69);
		Observable.prototype.filterBy = function (other) {
		  return filterBy(this, other);
		};
	
		// (Stream, Stream|Property, Function|undefiend) -> Stream
		// (Property, Stream|Property, Function|undefiend) -> Property
		var sampledBy2items = __webpack_require__(71);
		Observable.prototype.sampledBy = function (other, combinator) {
		  return sampledBy2items(this, other, combinator);
		};
	
		// (Stream, Stream|Property) -> Stream
		// (Property, Stream|Property) -> Property
		var skipUntilBy = __webpack_require__(72);
		Observable.prototype.skipUntilBy = function (other) {
		  return skipUntilBy(this, other);
		};
	
		// (Stream, Stream|Property) -> Stream
		// (Property, Stream|Property) -> Property
		var takeUntilBy = __webpack_require__(73);
		Observable.prototype.takeUntilBy = function (other) {
		  return takeUntilBy(this, other);
		};
	
		// Options = {flushOnEnd: boolean|undefined}
		// (Stream, Stream|Property, Options|undefined) -> Stream
		// (Property, Stream|Property, Options|undefined) -> Property
		var bufferBy = __webpack_require__(74);
		Observable.prototype.bufferBy = function (other, options) {
		  return bufferBy(this, other, options);
		};
	
		// Options = {flushOnEnd: boolean|undefined}
		// (Stream, Stream|Property, Options|undefined) -> Stream
		// (Property, Stream|Property, Options|undefined) -> Property
		var bufferWhileBy = __webpack_require__(75);
		Observable.prototype.bufferWhileBy = function (other, options) {
		  return bufferWhileBy(this, other, options);
		};
	
		// Deprecated
		// -----------------------------------------------------------------------------
	
		function warn(msg) {
		  if (Kefir.DEPRECATION_WARNINGS !== false && console && typeof console.warn === 'function') {
		    var msg2 = '\nHere is an Error object for you containing the call stack:';
		    console.warn(msg, msg2, new Error());
		  }
		}
	
		// (Stream|Property, Stream|Property) -> Property
		var awaiting = __webpack_require__(76);
		Observable.prototype.awaiting = function (other) {
		  warn('You are using deprecated .awaiting() method, see https://github.com/rpominov/kefir/issues/145');
		  return awaiting(this, other);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var valuesToErrors = __webpack_require__(77);
		Observable.prototype.valuesToErrors = function (fn) {
		  warn('You are using deprecated .valuesToErrors() method, see https://github.com/rpominov/kefir/issues/149');
		  return valuesToErrors(this, fn);
		};
	
		// (Stream, Function|undefined) -> Stream
		// (Property, Function|undefined) -> Property
		var errorsToValues = __webpack_require__(78);
		Observable.prototype.errorsToValues = function (fn) {
		  warn('You are using deprecated .errorsToValues() method, see https://github.com/rpominov/kefir/issues/149');
		  return errorsToValues(this, fn);
		};
	
		// (Stream) -> Stream
		// (Property) -> Property
		var endOnError = __webpack_require__(79);
		Observable.prototype.endOnError = function () {
		  warn('You are using deprecated .endOnError() method, see https://github.com/rpominov/kefir/issues/150');
		  return endOnError(this);
		};
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var extend = _require.extend;
	
		var _require2 = __webpack_require__(3);
	
		var VALUE = _require2.VALUE;
		var ERROR = _require2.ERROR;
		var ANY = _require2.ANY;
		var END = _require2.END;
	
		var _require3 = __webpack_require__(4);
	
		var Dispatcher = _require3.Dispatcher;
		var callSubscriber = _require3.callSubscriber;
	
		var _require4 = __webpack_require__(5);
	
		var findByPred = _require4.findByPred;
	
		function Observable() {
		  this._dispatcher = new Dispatcher();
		  this._active = false;
		  this._alive = true;
		  this._activating = false;
		  this._logHandlers = null;
		}
	
		extend(Observable.prototype, {
	
		  _name: 'observable',
	
		  _onActivation: function _onActivation() {},
		  _onDeactivation: function _onDeactivation() {},
	
		  _setActive: function _setActive(active) {
		    if (this._active !== active) {
		      this._active = active;
		      if (active) {
		        this._activating = true;
		        this._onActivation();
		        this._activating = false;
		      } else {
		        this._onDeactivation();
		      }
		    }
		  },
	
		  _clear: function _clear() {
		    this._setActive(false);
		    this._dispatcher.cleanup();
		    this._dispatcher = null;
		    this._logHandlers = null;
		  },
	
		  _emit: function _emit(type, x) {
		    switch (type) {
		      case VALUE:
		        return this._emitValue(x);
		      case ERROR:
		        return this._emitError(x);
		      case END:
		        return this._emitEnd();
		    }
		  },
	
		  _emitValue: function _emitValue(value) {
		    if (this._alive) {
		      this._dispatcher.dispatch({ type: VALUE, value: value });
		    }
		  },
	
		  _emitError: function _emitError(value) {
		    if (this._alive) {
		      this._dispatcher.dispatch({ type: ERROR, value: value });
		    }
		  },
	
		  _emitEnd: function _emitEnd() {
		    if (this._alive) {
		      this._alive = false;
		      this._dispatcher.dispatch({ type: END });
		      this._clear();
		    }
		  },
	
		  _on: function _on(type, fn) {
		    if (this._alive) {
		      this._dispatcher.add(type, fn);
		      this._setActive(true);
		    } else {
		      callSubscriber(type, fn, { type: END });
		    }
		    return this;
		  },
	
		  _off: function _off(type, fn) {
		    if (this._alive) {
		      var count = this._dispatcher.remove(type, fn);
		      if (count === 0) {
		        this._setActive(false);
		      }
		    }
		    return this;
		  },
	
		  onValue: function onValue(fn) {
		    return this._on(VALUE, fn);
		  },
		  onError: function onError(fn) {
		    return this._on(ERROR, fn);
		  },
		  onEnd: function onEnd(fn) {
		    return this._on(END, fn);
		  },
		  onAny: function onAny(fn) {
		    return this._on(ANY, fn);
		  },
	
		  offValue: function offValue(fn) {
		    return this._off(VALUE, fn);
		  },
		  offError: function offError(fn) {
		    return this._off(ERROR, fn);
		  },
		  offEnd: function offEnd(fn) {
		    return this._off(END, fn);
		  },
		  offAny: function offAny(fn) {
		    return this._off(ANY, fn);
		  },
	
		  // A and B must be subclasses of Stream and Property (order doesn't matter)
		  _ofSameType: function _ofSameType(A, B) {
		    return A.prototype.getType() === this.getType() ? A : B;
		  },
	
		  setName: function setName(sourceObs, /* optional */selfName) {
		    this._name = selfName ? sourceObs._name + '.' + selfName : sourceObs;
		    return this;
		  },
	
		  log: function log() {
		    var name = arguments.length <= 0 || arguments[0] === undefined ? this.toString() : arguments[0];
	
		    var isCurrent = undefined;
		    var handler = function handler(event) {
		      var type = '<' + event.type + (isCurrent ? ':current' : '') + '>';
		      if (event.type === END) {
		        console.log(name, type);
		      } else {
		        console.log(name, type, event.value);
		      }
		    };
	
		    if (this._alive) {
		      if (!this._logHandlers) {
		        this._logHandlers = [];
		      }
		      this._logHandlers.push({ name: name, handler: handler });
		    }
	
		    isCurrent = true;
		    this.onAny(handler);
		    isCurrent = false;
	
		    return this;
		  },
	
		  offLog: function offLog() {
		    var name = arguments.length <= 0 || arguments[0] === undefined ? this.toString() : arguments[0];
	
		    if (this._logHandlers) {
		      var handlerIndex = findByPred(this._logHandlers, function (obj) {
		        return obj.name === name;
		      });
		      if (handlerIndex !== -1) {
		        this.offAny(this._logHandlers[handlerIndex].handler);
		        this._logHandlers.splice(handlerIndex, 1);
		      }
		    }
	
		    return this;
		  }
		});
	
		// extend() can't handle `toString` in IE8
		Observable.prototype.toString = function () {
		  return '[' + this._name + ']';
		};
	
		module.exports = Observable;
	
	/***/ },
	/* 2 */
	/***/ function(module, exports) {
	
		"use strict";
	
		function createObj(proto) {
		  var F = function F() {};
		  F.prototype = proto;
		  return new F();
		}
	
		function extend(target /*, mixin1, mixin2...*/) {
		  var length = arguments.length,
		      i = undefined,
		      prop = undefined;
		  for (i = 1; i < length; i++) {
		    for (prop in arguments[i]) {
		      target[prop] = arguments[i][prop];
		    }
		  }
		  return target;
		}
	
		function inherit(Child, Parent /*, mixin1, mixin2...*/) {
		  var length = arguments.length,
		      i = undefined;
		  Child.prototype = createObj(Parent.prototype);
		  Child.prototype.constructor = Child;
		  for (i = 2; i < length; i++) {
		    extend(Child.prototype, arguments[i]);
		  }
		  return Child;
		}
	
		module.exports = { extend: extend, inherit: inherit };
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		'use strict';
	
		exports.NOTHING = ['<nothing>'];
		exports.END = 'end';
		exports.VALUE = 'value';
		exports.ERROR = 'error';
		exports.ANY = 'any';
	
	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var extend = _require.extend;
	
		var _require2 = __webpack_require__(3);
	
		var VALUE = _require2.VALUE;
		var ERROR = _require2.ERROR;
		var ANY = _require2.ANY;
	
		var _require3 = __webpack_require__(5);
	
		var concat = _require3.concat;
		var findByPred = _require3.findByPred;
		var _remove = _require3.remove;
		var contains = _require3.contains;
	
		function callSubscriber(type, fn, event) {
		  if (type === ANY) {
		    fn(event);
		  } else if (type === event.type) {
		    if (type === VALUE || type === ERROR) {
		      fn(event.value);
		    } else {
		      fn();
		    }
		  }
		}
	
		function Dispatcher() {
		  this._items = [];
		  this._inLoop = 0;
		  this._removedItems = null;
		}
	
		extend(Dispatcher.prototype, {
	
		  add: function add(type, fn) {
		    this._items = concat(this._items, [{ type: type, fn: fn }]);
		    return this._items.length;
		  },
	
		  remove: function remove(type, fn) {
		    var index = findByPred(this._items, function (x) {
		      return x.type === type && x.fn === fn;
		    });
	
		    // if we're currently in a notification loop,
		    // remember this subscriber was removed
		    if (this._inLoop !== 0 && index !== -1) {
		      if (this._removedItems === null) {
		        this._removedItems = [];
		      }
		      this._removedItems.push(this._items[index]);
		    }
	
		    this._items = _remove(this._items, index);
		    return this._items.length;
		  },
	
		  dispatch: function dispatch(event) {
		    this._inLoop++;
		    for (var i = 0, items = this._items; i < items.length; i++) {
	
		      // cleanup was called
		      if (this._items === null) {
		        break;
		      }
	
		      // this subscriber was removed
		      if (this._removedItems !== null && contains(this._removedItems, items[i])) {
		        continue;
		      }
	
		      callSubscriber(items[i].type, items[i].fn, event);
		    }
		    this._inLoop--;
		    if (this._inLoop === 0) {
		      this._removedItems = null;
		    }
		  },
	
		  cleanup: function cleanup() {
		    this._items = null;
		  }
	
		});
	
		module.exports = { callSubscriber: callSubscriber, Dispatcher: Dispatcher };
	
	/***/ },
	/* 5 */
	/***/ function(module, exports) {
	
		"use strict";
	
		function concat(a, b) {
		  var result = undefined,
		      length = undefined,
		      i = undefined,
		      j = undefined;
		  if (a.length === 0) {
		    return b;
		  }
		  if (b.length === 0) {
		    return a;
		  }
		  j = 0;
		  result = new Array(a.length + b.length);
		  length = a.length;
		  for (i = 0; i < length; i++, j++) {
		    result[j] = a[i];
		  }
		  length = b.length;
		  for (i = 0; i < length; i++, j++) {
		    result[j] = b[i];
		  }
		  return result;
		}
	
		function circleShift(arr, distance) {
		  var length = arr.length,
		      result = new Array(length),
		      i = undefined;
		  for (i = 0; i < length; i++) {
		    result[(i + distance) % length] = arr[i];
		  }
		  return result;
		}
	
		function find(arr, value) {
		  var length = arr.length,
		      i = undefined;
		  for (i = 0; i < length; i++) {
		    if (arr[i] === value) {
		      return i;
		    }
		  }
		  return -1;
		}
	
		function findByPred(arr, pred) {
		  var length = arr.length,
		      i = undefined;
		  for (i = 0; i < length; i++) {
		    if (pred(arr[i])) {
		      return i;
		    }
		  }
		  return -1;
		}
	
		function cloneArray(input) {
		  var length = input.length,
		      result = new Array(length),
		      i = undefined;
		  for (i = 0; i < length; i++) {
		    result[i] = input[i];
		  }
		  return result;
		}
	
		function remove(input, index) {
		  var length = input.length,
		      result = undefined,
		      i = undefined,
		      j = undefined;
		  if (index >= 0 && index < length) {
		    if (length === 1) {
		      return [];
		    } else {
		      result = new Array(length - 1);
		      for (i = 0, j = 0; i < length; i++) {
		        if (i !== index) {
		          result[j] = input[i];
		          j++;
		        }
		      }
		      return result;
		    }
		  } else {
		    return input;
		  }
		}
	
		function removeByPred(input, pred) {
		  return remove(input, findByPred(input, pred));
		}
	
		function map(input, fn) {
		  var length = input.length,
		      result = new Array(length),
		      i = undefined;
		  for (i = 0; i < length; i++) {
		    result[i] = fn(input[i]);
		  }
		  return result;
		}
	
		function forEach(arr, fn) {
		  var length = arr.length,
		      i = undefined;
		  for (i = 0; i < length; i++) {
		    fn(arr[i]);
		  }
		}
	
		function fillArray(arr, value) {
		  var length = arr.length,
		      i = undefined;
		  for (i = 0; i < length; i++) {
		    arr[i] = value;
		  }
		}
	
		function contains(arr, value) {
		  return find(arr, value) !== -1;
		}
	
		function slide(cur, next, max) {
		  var length = Math.min(max, cur.length + 1),
		      offset = cur.length - length + 1,
		      result = new Array(length),
		      i = undefined;
		  for (i = offset; i < length; i++) {
		    result[i - offset] = cur[i];
		  }
		  result[length - 1] = next;
		  return result;
		}
	
		module.exports = {
		  concat: concat,
		  circleShift: circleShift,
		  find: find,
		  findByPred: findByPred,
		  cloneArray: cloneArray,
		  remove: remove,
		  removeByPred: removeByPred,
		  map: map,
		  forEach: forEach,
		  fillArray: fillArray,
		  contains: contains,
		  slide: slide
		};
	
	/***/ },
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var Observable = __webpack_require__(1);
	
		function Stream() {
		  Observable.call(this);
		}
	
		inherit(Stream, Observable, {
	
		  _name: 'stream',
	
		  getType: function getType() {
		    return 'stream';
		  }
	
		});
	
		module.exports = Stream;
	
	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var _require2 = __webpack_require__(3);
	
		var VALUE = _require2.VALUE;
		var ERROR = _require2.ERROR;
		var END = _require2.END;
	
		var _require3 = __webpack_require__(4);
	
		var callSubscriber = _require3.callSubscriber;
	
		var Observable = __webpack_require__(1);
	
		function Property() {
		  Observable.call(this);
		  this._currentEvent = null;
		}
	
		inherit(Property, Observable, {
	
		  _name: 'property',
	
		  _emitValue: function _emitValue(value) {
		    if (this._alive) {
		      this._currentEvent = { type: VALUE, value: value };
		      if (!this._activating) {
		        this._dispatcher.dispatch({ type: VALUE, value: value });
		      }
		    }
		  },
	
		  _emitError: function _emitError(value) {
		    if (this._alive) {
		      this._currentEvent = { type: ERROR, value: value };
		      if (!this._activating) {
		        this._dispatcher.dispatch({ type: ERROR, value: value });
		      }
		    }
		  },
	
		  _emitEnd: function _emitEnd() {
		    if (this._alive) {
		      this._alive = false;
		      if (!this._activating) {
		        this._dispatcher.dispatch({ type: END });
		      }
		      this._clear();
		    }
		  },
	
		  _on: function _on(type, fn) {
		    if (this._alive) {
		      this._dispatcher.add(type, fn);
		      this._setActive(true);
		    }
		    if (this._currentEvent !== null) {
		      callSubscriber(type, fn, this._currentEvent);
		    }
		    if (!this._alive) {
		      callSubscriber(type, fn, { type: END });
		    }
		    return this;
		  },
	
		  getType: function getType() {
		    return 'property';
		  }
	
		});
	
		module.exports = Property;
	
	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Stream = __webpack_require__(6);
	
		var neverS = new Stream();
		neverS._emitEnd();
		neverS._name = 'never';
	
		module.exports = function never() {
		  return neverS;
		};
	
	/***/ },
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var timeBased = __webpack_require__(10);
	
		var S = timeBased({
	
		  _name: 'later',
	
		  _init: function _init(_ref) {
		    var x = _ref.x;
	
		    this._x = x;
		  },
	
		  _free: function _free() {
		    this._x = null;
		  },
	
		  _onTick: function _onTick() {
		    this._emitValue(this._x);
		    this._emitEnd();
		  }
	
		});
	
		module.exports = function later(wait, x) {
		  return new S(wait, { x: x });
		};
	
	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var Stream = __webpack_require__(6);
	
		module.exports = function timeBased(mixin) {
	
		  function AnonymousStream(wait, options) {
		    var _this = this;
	
		    Stream.call(this);
		    this._wait = wait;
		    this._intervalId = null;
		    this._$onTick = function () {
		      return _this._onTick();
		    };
		    this._init(options);
		  }
	
		  inherit(AnonymousStream, Stream, {
	
		    _init: function _init() {},
		    _free: function _free() {},
	
		    _onTick: function _onTick() {},
	
		    _onActivation: function _onActivation() {
		      this._intervalId = setInterval(this._$onTick, this._wait);
		    },
	
		    _onDeactivation: function _onDeactivation() {
		      if (this._intervalId !== null) {
		        clearInterval(this._intervalId);
		        this._intervalId = null;
		      }
		    },
	
		    _clear: function _clear() {
		      Stream.prototype._clear.call(this);
		      this._$onTick = null;
		      this._free();
		    }
	
		  }, mixin);
	
		  return AnonymousStream;
		};
	
	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var timeBased = __webpack_require__(10);
	
		var S = timeBased({
	
		  _name: 'interval',
	
		  _init: function _init(_ref) {
		    var x = _ref.x;
	
		    this._x = x;
		  },
	
		  _free: function _free() {
		    this._x = null;
		  },
	
		  _onTick: function _onTick() {
		    this._emitValue(this._x);
		  }
	
		});
	
		module.exports = function interval(wait, x) {
		  return new S(wait, { x: x });
		};
	
	/***/ },
	/* 12 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var timeBased = __webpack_require__(10);
	
		var _require = __webpack_require__(5);
	
		var cloneArray = _require.cloneArray;
	
		var never = __webpack_require__(8);
	
		var S = timeBased({
	
		  _name: 'sequentially',
	
		  _init: function _init(_ref) {
		    var xs = _ref.xs;
	
		    this._xs = cloneArray(xs);
		  },
	
		  _free: function _free() {
		    this._xs = null;
		  },
	
		  _onTick: function _onTick() {
		    if (this._xs.length === 1) {
		      this._emitValue(this._xs[0]);
		      this._emitEnd();
		    } else {
		      this._emitValue(this._xs.shift());
		    }
		  }
	
		});
	
		module.exports = function sequentially(wait, xs) {
		  return xs.length === 0 ? never() : new S(wait, { xs: xs });
		};
	
	/***/ },
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var timeBased = __webpack_require__(10);
	
		var S = timeBased({
	
		  _name: 'fromPoll',
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _onTick: function _onTick() {
		    var fn = this._fn;
		    this._emitValue(fn());
		  }
	
		});
	
		module.exports = function fromPoll(wait, fn) {
		  return new S(wait, { fn: fn });
		};
	
	/***/ },
	/* 14 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var timeBased = __webpack_require__(10);
		var emitter = __webpack_require__(15);
	
		var S = timeBased({
	
		  _name: 'withInterval',
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		    this._emitter = emitter(this);
		  },
	
		  _free: function _free() {
		    this._fn = null;
		    this._emitter = null;
		  },
	
		  _onTick: function _onTick() {
		    var fn = this._fn;
		    fn(this._emitter);
		  }
	
		});
	
		module.exports = function withInterval(wait, fn) {
		  return new S(wait, { fn: fn });
		};
	
	/***/ },
	/* 15 */
	/***/ function(module, exports) {
	
		"use strict";
	
		module.exports = function emitter(obs) {
	
		  function value(x) {
		    obs._emitValue(x);
		    return obs._active;
		  }
	
		  function error(x) {
		    obs._emitError(x);
		    return obs._active;
		  }
	
		  function end() {
		    obs._emitEnd();
		    return obs._active;
		  }
	
		  function event(e) {
		    obs._emit(e.type, e.value);
		    return obs._active;
		  }
	
		  return { value: value, error: error, end: end, event: event, emit: value, emitEvent: event };
		};
	
	/***/ },
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var stream = __webpack_require__(17);
	
		module.exports = function fromCallback(callbackConsumer) {
	
		  var called = false;
	
		  return stream(function (emitter) {
	
		    if (!called) {
		      callbackConsumer(function (x) {
		        emitter.emit(x);
		        emitter.end();
		      });
		      called = true;
		    }
		  }).setName('fromCallback');
		};
	
	/***/ },
	/* 17 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var Stream = __webpack_require__(6);
		var emitter = __webpack_require__(15);
	
		function S(fn) {
		  Stream.call(this);
		  this._fn = fn;
		  this._unsubscribe = null;
		}
	
		inherit(S, Stream, {
	
		  _name: 'stream',
	
		  _onActivation: function _onActivation() {
		    var fn = this._fn;
		    var unsubscribe = fn(emitter(this));
		    this._unsubscribe = typeof unsubscribe === 'function' ? unsubscribe : null;
	
		    // fix https://github.com/rpominov/kefir/issues/35
		    if (!this._active) {
		      this._callUnsubscribe();
		    }
		  },
	
		  _callUnsubscribe: function _callUnsubscribe() {
		    if (this._unsubscribe !== null) {
		      this._unsubscribe();
		      this._unsubscribe = null;
		    }
		  },
	
		  _onDeactivation: function _onDeactivation() {
		    this._callUnsubscribe();
		  },
	
		  _clear: function _clear() {
		    Stream.prototype._clear.call(this);
		    this._fn = null;
		  }
	
		});
	
		module.exports = function stream(fn) {
		  return new S(fn);
		};
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var stream = __webpack_require__(17);
	
		module.exports = function fromNodeCallback(callbackConsumer) {
	
		  var called = false;
	
		  return stream(function (emitter) {
	
		    if (!called) {
		      callbackConsumer(function (error, x) {
		        if (error) {
		          emitter.error(error);
		        } else {
		          emitter.emit(x);
		        }
		        emitter.end();
		      });
		      called = true;
		    }
		  }).setName('fromNodeCallback');
		};
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var fromSubUnsub = __webpack_require__(20);
	
		var pairs = [['addEventListener', 'removeEventListener'], ['addListener', 'removeListener'], ['on', 'off']];
	
		module.exports = function fromEvents(target, eventName, transformer) {
		  var sub = undefined,
		      unsub = undefined;
	
		  for (var i = 0; i < pairs.length; i++) {
		    if (typeof target[pairs[i][0]] === 'function' && typeof target[pairs[i][1]] === 'function') {
		      sub = pairs[i][0];
		      unsub = pairs[i][1];
		      break;
		    }
		  }
	
		  if (sub === undefined) {
		    throw new Error('target don\'t support any of ' + 'addEventListener/removeEventListener, addListener/removeListener, on/off method pair');
		  }
	
		  return fromSubUnsub(function (handler) {
		    return target[sub](eventName, handler);
		  }, function (handler) {
		    return target[unsub](eventName, handler);
		  }, transformer).setName('fromEvents');
		};
	
	/***/ },
	/* 20 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var stream = __webpack_require__(17);
	
		var _require = __webpack_require__(21);
	
		var apply = _require.apply;
	
		module.exports = function fromSubUnsub(sub, unsub, transformer /* Function | falsey */) {
		  return stream(function (emitter) {
	
		    var handler = transformer ? function () {
		      emitter.emit(apply(transformer, this, arguments));
		    } : function (x) {
		      emitter.emit(x);
		    };
	
		    sub(handler);
		    return function () {
		      return unsub(handler);
		    };
		  }).setName('fromSubUnsub');
		};
	
	/***/ },
	/* 21 */
	/***/ function(module, exports) {
	
		"use strict";
	
		function spread(fn, length) {
		  switch (length) {
		    case 0:
		      return function () {
		        return fn();
		      };
		    case 1:
		      return function (a) {
		        return fn(a[0]);
		      };
		    case 2:
		      return function (a) {
		        return fn(a[0], a[1]);
		      };
		    case 3:
		      return function (a) {
		        return fn(a[0], a[1], a[2]);
		      };
		    case 4:
		      return function (a) {
		        return fn(a[0], a[1], a[2], a[3]);
		      };
		    default:
		      return function (a) {
		        return fn.apply(null, a);
		      };
		  }
		}
	
		function apply(fn, c, a) {
		  var aLength = a ? a.length : 0;
		  if (c == null) {
		    switch (aLength) {
		      case 0:
		        return fn();
		      case 1:
		        return fn(a[0]);
		      case 2:
		        return fn(a[0], a[1]);
		      case 3:
		        return fn(a[0], a[1], a[2]);
		      case 4:
		        return fn(a[0], a[1], a[2], a[3]);
		      default:
		        return fn.apply(null, a);
		    }
		  } else {
		    switch (aLength) {
		      case 0:
		        return fn.call(c);
		      default:
		        return fn.apply(c, a);
		    }
		  }
		}
	
		module.exports = { spread: spread, apply: apply };
	
	/***/ },
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var Property = __webpack_require__(7);
	
		// HACK:
		//   We don't call parent Class constructor, but instead putting all necessary
		//   properties into prototype to simulate ended Property
		//   (see Propperty and Observable classes).
	
		function P(value) {
		  this._currentEvent = { type: 'value', value: value, current: true };
		}
	
		inherit(P, Property, {
		  _name: 'constant',
		  _active: false,
		  _activating: false,
		  _alive: false,
		  _dispatcher: null,
		  _logHandlers: null
		});
	
		module.exports = function constant(x) {
		  return new P(x);
		};
	
	/***/ },
	/* 23 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var Property = __webpack_require__(7);
	
		// HACK:
		//   We don't call parent Class constructor, but instead putting all necessary
		//   properties into prototype to simulate ended Property
		//   (see Propperty and Observable classes).
	
		function P(value) {
		  this._currentEvent = { type: 'error', value: value, current: true };
		}
	
		inherit(P, Property, {
		  _name: 'constantError',
		  _active: false,
		  _activating: false,
		  _alive: false,
		  _dispatcher: null,
		  _logHandlers: null
		});
	
		module.exports = function constantError(x) {
		  return new P(x);
		};
	
	/***/ },
	/* 24 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createProperty = _require.createProperty;
	
		var P = createProperty('toProperty', {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._getInitialCurrent = fn;
		  },
	
		  _onActivation: function _onActivation() {
		    if (this._getInitialCurrent !== null) {
		      var getInitial = this._getInitialCurrent;
		      this._emitValue(getInitial());
		    }
		    this._source.onAny(this._$handleAny); // copied from patterns/one-source
		  }
	
		});
	
		module.exports = function toProperty(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
		  if (fn !== null && typeof fn !== 'function') {
		    throw new Error('You should call toProperty() with a function or no arguments.');
		  }
		  return new P(obs, { fn: fn });
		};
	
	/***/ },
	/* 25 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Stream = __webpack_require__(6);
		var Property = __webpack_require__(7);
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var _require2 = __webpack_require__(3);
	
		var VALUE = _require2.VALUE;
		var ERROR = _require2.ERROR;
		var END = _require2.END;
	
		function createConstructor(BaseClass, name) {
		  return function AnonymousObservable(source, options) {
		    var _this = this;
	
		    BaseClass.call(this);
		    this._source = source;
		    this._name = source._name + '.' + name;
		    this._init(options);
		    this._$handleAny = function (event) {
		      return _this._handleAny(event);
		    };
		  };
		}
	
		function createClassMethods(BaseClass) {
		  return {
	
		    _init: function _init() {},
		    _free: function _free() {},
	
		    _handleValue: function _handleValue(x) {
		      this._emitValue(x);
		    },
		    _handleError: function _handleError(x) {
		      this._emitError(x);
		    },
		    _handleEnd: function _handleEnd() {
		      this._emitEnd();
		    },
	
		    _handleAny: function _handleAny(event) {
		      switch (event.type) {
		        case VALUE:
		          return this._handleValue(event.value);
		        case ERROR:
		          return this._handleError(event.value);
		        case END:
		          return this._handleEnd();
		      }
		    },
	
		    _onActivation: function _onActivation() {
		      this._source.onAny(this._$handleAny);
		    },
		    _onDeactivation: function _onDeactivation() {
		      this._source.offAny(this._$handleAny);
		    },
	
		    _clear: function _clear() {
		      BaseClass.prototype._clear.call(this);
		      this._source = null;
		      this._$handleAny = null;
		      this._free();
		    }
	
		  };
		}
	
		function createStream(name, mixin) {
		  var S = createConstructor(Stream, name);
		  inherit(S, Stream, createClassMethods(Stream), mixin);
		  return S;
		}
	
		function createProperty(name, mixin) {
		  var P = createConstructor(Property, name);
		  inherit(P, Property, createClassMethods(Property), mixin);
		  return P;
		}
	
		module.exports = { createStream: createStream, createProperty: createProperty };
	
	/***/ },
	/* 26 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
	
		var S = createStream('changes', {
	
		  _handleValue: function _handleValue(x) {
		    if (!this._activating) {
		      this._emitValue(x);
		    }
		  },
	
		  _handleError: function _handleError(x) {
		    if (!this._activating) {
		      this._emitError(x);
		    }
		  }
	
		});
	
		module.exports = function changes(obs) {
		  return new S(obs);
		};
	
	/***/ },
	/* 27 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var stream = __webpack_require__(17);
		var toProperty = __webpack_require__(24);
	
		module.exports = function fromPromise(promise) {
	
		  var called = false;
	
		  var result = stream(function (emitter) {
		    if (!called) {
		      var onValue = function onValue(x) {
		        emitter.emit(x);
		        emitter.end();
		      };
		      var onError = function onError(x) {
		        emitter.error(x);
		        emitter.end();
		      };
		      var _promise = promise.then(onValue, onError);
	
		      // prevent libraries like 'Q' or 'when' from swallowing exceptions
		      if (_promise && typeof _promise.done === 'function') {
		        _promise.done();
		      }
	
		      called = true;
		    }
		  });
	
		  return toProperty(result, null).setName('fromPromise');
		};
	
	/***/ },
	/* 28 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(3);
	
		var VALUE = _require.VALUE;
		var END = _require.END;
	
		function getGlodalPromise() {
		  if (typeof Promise === 'function') {
		    return Promise;
		  } else {
		    throw new Error('There isn\'t default Promise, use shim or parameter');
		  }
		}
	
		module.exports = function (obs) {
		  var Promise = arguments.length <= 1 || arguments[1] === undefined ? getGlodalPromise() : arguments[1];
	
		  var last = null;
		  return new Promise(function (resolve, reject) {
		    obs.onAny(function (event) {
		      if (event.type === END && last !== null) {
		        (last.type === VALUE ? resolve : reject)(last.value);
		        last = null;
		      } else {
		        last = event;
		      }
		    });
		  });
		};
	
	/***/ },
	/* 29 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var stream = __webpack_require__(17);
		var symbol = __webpack_require__(30)('observable');
	
		module.exports = function fromESObservable(_observable) {
		  var observable = _observable[symbol] ? _observable[symbol]() : _observable;
		  return stream(function (emitter) {
		    var unsub = observable.subscribe({
		      error: function error(_error) {
		        emitter.error(_error);
		        emitter.end();
		      },
		      next: function next(value) {
		        emitter.emit(value);
		      },
		      complete: function complete() {
		        emitter.end();
		      }
		    });
	
		    if (unsub.unsubscribe) {
		      return function () {
		        unsub.unsubscribe();
		      };
		    } else {
		      return unsub;
		    }
		  }).setName('fromESObservable');
		};
	
	/***/ },
	/* 30 */
	/***/ function(module, exports) {
	
		'use strict';
	
		module.exports = function (key) {
		  if (typeof Symbol !== 'undefined' && Symbol[key]) {
		    return Symbol[key];
		  } else if (typeof Symbol !== 'undefined' && typeof Symbol['for'] === 'function') {
		    return Symbol['for'](key);
		  } else {
		    return '@@' + key;
		  }
		};
	
	/***/ },
	/* 31 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var extend = _require.extend;
	
		var _require2 = __webpack_require__(3);
	
		var VALUE = _require2.VALUE;
		var ERROR = _require2.ERROR;
		var END = _require2.END;
	
		function ESObservable(observable) {
		  this._observable = observable.takeErrors(1);
		}
	
		extend(ESObservable.prototype, {
		  subscribe: function subscribe(observer) {
		    var _this = this;
	
		    var fn = function fn(event) {
		      if (event.type === VALUE && observer.next) {
		        observer.next(event.value);
		      } else if (event.type === ERROR && observer.error) {
		        observer.error(event.value);
		      } else if (event.type === END && observer.complete) {
		        observer.complete(event.value);
		      }
		    };
	
		    this._observable.onAny(fn);
		    return function () {
		      return _this._observable.offAny(fn);
		    };
		  }
		});
	
		module.exports = function toESObservable() {
		  return new ESObservable(this);
		};
	
	/***/ },
	/* 32 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    var fn = this._fn;
		    this._emitValue(fn(x));
		  }
	
		};
	
		var S = createStream('map', mixin);
		var P = createProperty('map', mixin);
	
		var id = function id(x) {
		  return x;
		};
	
		module.exports = function map(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 33 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    var fn = this._fn;
		    if (fn(x)) {
		      this._emitValue(x);
		    }
		  }
	
		};
	
		var S = createStream('filter', mixin);
		var P = createProperty('filter', mixin);
	
		var id = function id(x) {
		  return x;
		};
	
		module.exports = function filter(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var n = _ref.n;
	
		    this._n = n;
		    if (n <= 0) {
		      this._emitEnd();
		    }
		  },
	
		  _handleValue: function _handleValue(x) {
		    this._n--;
		    this._emitValue(x);
		    if (this._n === 0) {
		      this._emitEnd();
		    }
		  }
	
		};
	
		var S = createStream('take', mixin);
		var P = createProperty('take', mixin);
	
		module.exports = function take(obs, n) {
		  return new (obs._ofSameType(S, P))(obs, { n: n });
		};
	
	/***/ },
	/* 35 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var n = _ref.n;
	
		    this._n = n;
		    if (n <= 0) {
		      this._emitEnd();
		    }
		  },
	
		  _handleError: function _handleError(x) {
		    this._n--;
		    this._emitError(x);
		    if (this._n === 0) {
		      this._emitEnd();
		    }
		  }
	
		};
	
		var S = createStream('takeErrors', mixin);
		var P = createProperty('takeErrors', mixin);
	
		module.exports = function takeErrors(obs, n) {
		  return new (obs._ofSameType(S, P))(obs, { n: n });
		};
	
	/***/ },
	/* 36 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    var fn = this._fn;
		    if (fn(x)) {
		      this._emitValue(x);
		    } else {
		      this._emitEnd();
		    }
		  }
	
		};
	
		var S = createStream('takeWhile', mixin);
		var P = createProperty('takeWhile', mixin);
	
		var id = function id(x) {
		  return x;
		};
	
		module.exports = function takeWhile(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 37 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var _require2 = __webpack_require__(3);
	
		var NOTHING = _require2.NOTHING;
	
		var mixin = {
	
		  _init: function _init() {
		    this._lastValue = NOTHING;
		  },
	
		  _free: function _free() {
		    this._lastValue = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    this._lastValue = x;
		  },
	
		  _handleEnd: function _handleEnd() {
		    if (this._lastValue !== NOTHING) {
		      this._emitValue(this._lastValue);
		    }
		    this._emitEnd();
		  }
	
		};
	
		var S = createStream('last', mixin);
		var P = createProperty('last', mixin);
	
		module.exports = function last(obs) {
		  return new (obs._ofSameType(S, P))(obs);
		};
	
	/***/ },
	/* 38 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var n = _ref.n;
	
		    this._n = Math.max(0, n);
		  },
	
		  _handleValue: function _handleValue(x) {
		    if (this._n === 0) {
		      this._emitValue(x);
		    } else {
		      this._n--;
		    }
		  }
	
		};
	
		var S = createStream('skip', mixin);
		var P = createProperty('skip', mixin);
	
		module.exports = function skip(obs, n) {
		  return new (obs._ofSameType(S, P))(obs, { n: n });
		};
	
	/***/ },
	/* 39 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    var fn = this._fn;
		    if (this._fn !== null && !fn(x)) {
		      this._fn = null;
		    }
		    if (this._fn === null) {
		      this._emitValue(x);
		    }
		  }
	
		};
	
		var S = createStream('skipWhile', mixin);
		var P = createProperty('skipWhile', mixin);
	
		var id = function id(x) {
		  return x;
		};
	
		module.exports = function skipWhile(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 40 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var _require2 = __webpack_require__(3);
	
		var NOTHING = _require2.NOTHING;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		    this._prev = NOTHING;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		    this._prev = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    var fn = this._fn;
		    if (this._prev === NOTHING || !fn(this._prev, x)) {
		      this._prev = x;
		      this._emitValue(x);
		    }
		  }
	
		};
	
		var S = createStream('skipDuplicates', mixin);
		var P = createProperty('skipDuplicates', mixin);
	
		var eq = function eq(a, b) {
		  return a === b;
		};
	
		module.exports = function skipDuplicates(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? eq : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 41 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var _require2 = __webpack_require__(3);
	
		var NOTHING = _require2.NOTHING;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
		    var seed = _ref.seed;
	
		    this._fn = fn;
		    this._prev = seed;
		  },
	
		  _free: function _free() {
		    this._prev = null;
		    this._fn = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    if (this._prev !== NOTHING) {
		      var fn = this._fn;
		      this._emitValue(fn(this._prev, x));
		    }
		    this._prev = x;
		  }
	
		};
	
		var S = createStream('diff', mixin);
		var P = createProperty('diff', mixin);
	
		function defaultFn(a, b) {
		  return [a, b];
		}
	
		module.exports = function diff(obs, fn) {
		  var seed = arguments.length <= 2 || arguments[2] === undefined ? NOTHING : arguments[2];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn || defaultFn, seed: seed });
		};
	
	/***/ },
	/* 42 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createProperty = _require.createProperty;
	
		var _require2 = __webpack_require__(3);
	
		var ERROR = _require2.ERROR;
		var NOTHING = _require2.NOTHING;
	
		var P = createProperty('scan', {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
		    var seed = _ref.seed;
	
		    this._fn = fn;
		    this._seed = seed;
		    if (seed !== NOTHING) {
		      this._emitValue(seed);
		    }
		  },
	
		  _free: function _free() {
		    this._fn = null;
		    this._seed = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    var fn = this._fn;
		    if (this._currentEvent === null || this._currentEvent.type === ERROR) {
		      this._emitValue(this._seed === NOTHING ? x : fn(this._seed, x));
		    } else {
		      this._emitValue(fn(this._currentEvent.value, x));
		    }
		  }
	
		});
	
		module.exports = function scan(obs, fn) {
		  var seed = arguments.length <= 2 || arguments[2] === undefined ? NOTHING : arguments[2];
	
		  return new P(obs, { fn: fn, seed: seed });
		};
	
	/***/ },
	/* 43 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    var fn = this._fn;
		    var xs = fn(x);
		    for (var i = 0; i < xs.length; i++) {
		      this._emitValue(xs[i]);
		    }
		  }
	
		};
	
		var S = createStream('flatten', mixin);
	
		var id = function id(x) {
		  return x;
		};
	
		module.exports = function flatten(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
		  return new S(obs, { fn: fn });
		};
	
	/***/ },
	/* 44 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var END_MARKER = {};
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var _this = this;
	
		    var wait = _ref.wait;
	
		    this._wait = Math.max(0, wait);
		    this._buff = [];
		    this._$shiftBuff = function () {
		      var value = _this._buff.shift();
		      if (value === END_MARKER) {
		        _this._emitEnd();
		      } else {
		        _this._emitValue(value);
		      }
		    };
		  },
	
		  _free: function _free() {
		    this._buff = null;
		    this._$shiftBuff = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    if (this._activating) {
		      this._emitValue(x);
		    } else {
		      this._buff.push(x);
		      setTimeout(this._$shiftBuff, this._wait);
		    }
		  },
	
		  _handleEnd: function _handleEnd() {
		    if (this._activating) {
		      this._emitEnd();
		    } else {
		      this._buff.push(END_MARKER);
		      setTimeout(this._$shiftBuff, this._wait);
		    }
		  }
	
		};
	
		var S = createStream('delay', mixin);
		var P = createProperty('delay', mixin);
	
		module.exports = function delay(obs, wait) {
		  return new (obs._ofSameType(S, P))(obs, { wait: wait });
		};
	
	/***/ },
	/* 45 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var now = __webpack_require__(46);
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var _this = this;
	
		    var wait = _ref.wait;
		    var leading = _ref.leading;
		    var trailing = _ref.trailing;
	
		    this._wait = Math.max(0, wait);
		    this._leading = leading;
		    this._trailing = trailing;
		    this._trailingValue = null;
		    this._timeoutId = null;
		    this._endLater = false;
		    this._lastCallTime = 0;
		    this._$trailingCall = function () {
		      return _this._trailingCall();
		    };
		  },
	
		  _free: function _free() {
		    this._trailingValue = null;
		    this._$trailingCall = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    if (this._activating) {
		      this._emitValue(x);
		    } else {
		      var curTime = now();
		      if (this._lastCallTime === 0 && !this._leading) {
		        this._lastCallTime = curTime;
		      }
		      var remaining = this._wait - (curTime - this._lastCallTime);
		      if (remaining <= 0) {
		        this._cancelTrailing();
		        this._lastCallTime = curTime;
		        this._emitValue(x);
		      } else if (this._trailing) {
		        this._cancelTrailing();
		        this._trailingValue = x;
		        this._timeoutId = setTimeout(this._$trailingCall, remaining);
		      }
		    }
		  },
	
		  _handleEnd: function _handleEnd() {
		    if (this._activating) {
		      this._emitEnd();
		    } else {
		      if (this._timeoutId) {
		        this._endLater = true;
		      } else {
		        this._emitEnd();
		      }
		    }
		  },
	
		  _cancelTrailing: function _cancelTrailing() {
		    if (this._timeoutId !== null) {
		      clearTimeout(this._timeoutId);
		      this._timeoutId = null;
		    }
		  },
	
		  _trailingCall: function _trailingCall() {
		    this._emitValue(this._trailingValue);
		    this._timeoutId = null;
		    this._trailingValue = null;
		    this._lastCallTime = !this._leading ? 0 : now();
		    if (this._endLater) {
		      this._emitEnd();
		    }
		  }
	
		};
	
		var S = createStream('throttle', mixin);
		var P = createProperty('throttle', mixin);
	
		module.exports = function throttle(obs, wait) {
		  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		  var _ref2$leading = _ref2.leading;
		  var leading = _ref2$leading === undefined ? true : _ref2$leading;
		  var _ref2$trailing = _ref2.trailing;
		  var trailing = _ref2$trailing === undefined ? true : _ref2$trailing;
	
		  return new (obs._ofSameType(S, P))(obs, { wait: wait, leading: leading, trailing: trailing });
		};
	
	/***/ },
	/* 46 */
	/***/ function(module, exports) {
	
		"use strict";
	
		module.exports = Date.now ? function () {
		  return Date.now();
		} : function () {
		  return new Date().getTime();
		};
	
	/***/ },
	/* 47 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var now = __webpack_require__(46);
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var _this = this;
	
		    var wait = _ref.wait;
		    var immediate = _ref.immediate;
	
		    this._wait = Math.max(0, wait);
		    this._immediate = immediate;
		    this._lastAttempt = 0;
		    this._timeoutId = null;
		    this._laterValue = null;
		    this._endLater = false;
		    this._$later = function () {
		      return _this._later();
		    };
		  },
	
		  _free: function _free() {
		    this._laterValue = null;
		    this._$later = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    if (this._activating) {
		      this._emitValue(x);
		    } else {
		      this._lastAttempt = now();
		      if (this._immediate && !this._timeoutId) {
		        this._emitValue(x);
		      }
		      if (!this._timeoutId) {
		        this._timeoutId = setTimeout(this._$later, this._wait);
		      }
		      if (!this._immediate) {
		        this._laterValue = x;
		      }
		    }
		  },
	
		  _handleEnd: function _handleEnd() {
		    if (this._activating) {
		      this._emitEnd();
		    } else {
		      if (this._timeoutId && !this._immediate) {
		        this._endLater = true;
		      } else {
		        this._emitEnd();
		      }
		    }
		  },
	
		  _later: function _later() {
		    var last = now() - this._lastAttempt;
		    if (last < this._wait && last >= 0) {
		      this._timeoutId = setTimeout(this._$later, this._wait - last);
		    } else {
		      this._timeoutId = null;
		      if (!this._immediate) {
		        this._emitValue(this._laterValue);
		        this._laterValue = null;
		      }
		      if (this._endLater) {
		        this._emitEnd();
		      }
		    }
		  }
	
		};
	
		var S = createStream('debounce', mixin);
		var P = createProperty('debounce', mixin);
	
		module.exports = function debounce(obs, wait) {
		  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		  var _ref2$immediate = _ref2.immediate;
		  var immediate = _ref2$immediate === undefined ? false : _ref2$immediate;
	
		  return new (obs._ofSameType(S, P))(obs, { wait: wait, immediate: immediate });
		};
	
	/***/ },
	/* 48 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleError: function _handleError(x) {
		    var fn = this._fn;
		    this._emitError(fn(x));
		  }
	
		};
	
		var S = createStream('mapErrors', mixin);
		var P = createProperty('mapErrors', mixin);
	
		var id = function id(x) {
		  return x;
		};
	
		module.exports = function mapErrors(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 49 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleError: function _handleError(x) {
		    var fn = this._fn;
		    if (fn(x)) {
		      this._emitError(x);
		    }
		  }
	
		};
	
		var S = createStream('filterErrors', mixin);
		var P = createProperty('filterErrors', mixin);
	
		var id = function id(x) {
		  return x;
		};
	
		module.exports = function filterErrors(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? id : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 50 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
		  _handleValue: function _handleValue() {}
		};
	
		var S = createStream('ignoreValues', mixin);
		var P = createProperty('ignoreValues', mixin);
	
		module.exports = function ignoreValues(obs) {
		  return new (obs._ofSameType(S, P))(obs);
		};
	
	/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
		  _handleError: function _handleError() {}
		};
	
		var S = createStream('ignoreErrors', mixin);
		var P = createProperty('ignoreErrors', mixin);
	
		module.exports = function ignoreErrors(obs) {
		  return new (obs._ofSameType(S, P))(obs);
		};
	
	/***/ },
	/* 52 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
		  _handleEnd: function _handleEnd() {}
		};
	
		var S = createStream('ignoreEnd', mixin);
		var P = createProperty('ignoreEnd', mixin);
	
		module.exports = function ignoreEnd(obs) {
		  return new (obs._ofSameType(S, P))(obs);
		};
	
	/***/ },
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleEnd: function _handleEnd() {
		    var fn = this._fn;
		    this._emitValue(fn());
		    this._emitEnd();
		  }
	
		};
	
		var S = createStream('beforeEnd', mixin);
		var P = createProperty('beforeEnd', mixin);
	
		module.exports = function beforeEnd(obs, fn) {
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 54 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var _require2 = __webpack_require__(5);
	
		var slide = _require2.slide;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var min = _ref.min;
		    var max = _ref.max;
	
		    this._max = max;
		    this._min = min;
		    this._buff = [];
		  },
	
		  _free: function _free() {
		    this._buff = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    this._buff = slide(this._buff, x, this._max);
		    if (this._buff.length >= this._min) {
		      this._emitValue(this._buff);
		    }
		  }
	
		};
	
		var S = createStream('slidingWindow', mixin);
		var P = createProperty('slidingWindow', mixin);
	
		module.exports = function slidingWindow(obs, max) {
		  var min = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	
		  return new (obs._ofSameType(S, P))(obs, { min: min, max: max });
		};
	
	/***/ },
	/* 55 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
		    var flushOnEnd = _ref.flushOnEnd;
	
		    this._fn = fn;
		    this._flushOnEnd = flushOnEnd;
		    this._buff = [];
		  },
	
		  _free: function _free() {
		    this._buff = null;
		  },
	
		  _flush: function _flush() {
		    if (this._buff !== null && this._buff.length !== 0) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
	
		  _handleValue: function _handleValue(x) {
		    this._buff.push(x);
		    var fn = this._fn;
		    if (!fn(x)) {
		      this._flush();
		    }
		  },
	
		  _handleEnd: function _handleEnd() {
		    if (this._flushOnEnd) {
		      this._flush();
		    }
		    this._emitEnd();
		  }
	
		};
	
		var S = createStream('bufferWhile', mixin);
		var P = createProperty('bufferWhile', mixin);
	
		var id = function id(x) {
		  return x;
		};
	
		module.exports = function bufferWhile(obs, fn) {
		  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		  var _ref2$flushOnEnd = _ref2.flushOnEnd;
		  var flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn || id, flushOnEnd: flushOnEnd });
		};
	
	/***/ },
	/* 56 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var count = _ref.count;
		    var flushOnEnd = _ref.flushOnEnd;
	
		    this._count = count;
		    this._flushOnEnd = flushOnEnd;
		    this._buff = [];
		  },
	
		  _free: function _free() {
		    this._buff = null;
		  },
	
		  _flush: function _flush() {
		    if (this._buff !== null && this._buff.length !== 0) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
	
		  _handleValue: function _handleValue(x) {
		    this._buff.push(x);
		    if (this._buff.length >= this._count) {
		      this._flush();
		    }
		  },
	
		  _handleEnd: function _handleEnd() {
		    if (this._flushOnEnd) {
		      this._flush();
		    }
		    this._emitEnd();
		  }
	
		};
	
		var S = createStream('bufferWithCount', mixin);
		var P = createProperty('bufferWithCount', mixin);
	
		module.exports = function bufferWhile(obs, count) {
		  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
		  var _ref2$flushOnEnd = _ref2.flushOnEnd;
		  var flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;
	
		  return new (obs._ofSameType(S, P))(obs, { count: count, flushOnEnd: flushOnEnd });
		};
	
	/***/ },
	/* 57 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var _this = this;
	
		    var wait = _ref.wait;
		    var count = _ref.count;
		    var flushOnEnd = _ref.flushOnEnd;
	
		    this._wait = wait;
		    this._count = count;
		    this._flushOnEnd = flushOnEnd;
		    this._intervalId = null;
		    this._$onTick = function () {
		      return _this._flush();
		    };
		    this._buff = [];
		  },
	
		  _free: function _free() {
		    this._$onTick = null;
		    this._buff = null;
		  },
	
		  _flush: function _flush() {
		    if (this._buff !== null) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
	
		  _handleValue: function _handleValue(x) {
		    this._buff.push(x);
		    if (this._buff.length >= this._count) {
		      clearInterval(this._intervalId);
		      this._flush();
		      this._intervalId = setInterval(this._$onTick, this._wait);
		    }
		  },
	
		  _handleEnd: function _handleEnd() {
		    if (this._flushOnEnd && this._buff.length !== 0) {
		      this._flush();
		    }
		    this._emitEnd();
		  },
	
		  _onActivation: function _onActivation() {
		    this._source.onAny(this._$handleAny); // copied from patterns/one-source
		    this._intervalId = setInterval(this._$onTick, this._wait);
		  },
	
		  _onDeactivation: function _onDeactivation() {
		    if (this._intervalId !== null) {
		      clearInterval(this._intervalId);
		      this._intervalId = null;
		    }
		    this._source.offAny(this._$handleAny); // copied from patterns/one-source
		  }
	
		};
	
		var S = createStream('bufferWithTimeOrCount', mixin);
		var P = createProperty('bufferWithTimeOrCount', mixin);
	
		module.exports = function bufferWithTimeOrCount(obs, wait, count) {
		  var _ref2 = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
		  var _ref2$flushOnEnd = _ref2.flushOnEnd;
		  var flushOnEnd = _ref2$flushOnEnd === undefined ? true : _ref2$flushOnEnd;
	
		  return new (obs._ofSameType(S, P))(obs, { wait: wait, count: count, flushOnEnd: flushOnEnd });
		};
	
	/***/ },
	/* 58 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		function xformForObs(obs) {
		  return {
	
		    '@@transducer/step': function transducerStep(res, input) {
		      obs._emitValue(input);
		      return null;
		    },
	
		    '@@transducer/result': function transducerResult() {
		      obs._emitEnd();
		      return null;
		    }
	
		  };
		}
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var transducer = _ref.transducer;
	
		    this._xform = transducer(xformForObs(this));
		  },
	
		  _free: function _free() {
		    this._xform = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    if (this._xform['@@transducer/step'](null, x) !== null) {
		      this._xform['@@transducer/result'](null);
		    }
		  },
	
		  _handleEnd: function _handleEnd() {
		    this._xform['@@transducer/result'](null);
		  }
	
		};
	
		var S = createStream('transduce', mixin);
		var P = createProperty('transduce', mixin);
	
		module.exports = function transduce(obs, transducer) {
		  return new (obs._ofSameType(S, P))(obs, { transducer: transducer });
		};
	
	/***/ },
	/* 59 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var emitter = __webpack_require__(15);
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._handler = fn;
		    this._emitter = emitter(this);
		  },
	
		  _free: function _free() {
		    this._handler = null;
		    this._emitter = null;
		  },
	
		  _handleAny: function _handleAny(event) {
		    this._handler(this._emitter, event);
		  }
	
		};
	
		var S = createStream('withHandler', mixin);
		var P = createProperty('withHandler', mixin);
	
		module.exports = function withHandler(obs, fn) {
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 60 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Stream = __webpack_require__(6);
	
		var _require = __webpack_require__(3);
	
		var VALUE = _require.VALUE;
		var ERROR = _require.ERROR;
		var NOTHING = _require.NOTHING;
	
		var _require2 = __webpack_require__(2);
	
		var inherit = _require2.inherit;
	
		var _require3 = __webpack_require__(5);
	
		var concat = _require3.concat;
		var fillArray = _require3.fillArray;
	
		var _require4 = __webpack_require__(21);
	
		var spread = _require4.spread;
	
		var never = __webpack_require__(8);
	
		function defaultErrorsCombinator(errors) {
		  var latestError = undefined;
		  for (var i = 0; i < errors.length; i++) {
		    if (errors[i] !== undefined) {
		      if (latestError === undefined || latestError.index < errors[i].index) {
		        latestError = errors[i];
		      }
		    }
		  }
		  return latestError.error;
		}
	
		function Combine(active, passive, combinator) {
		  var _this = this;
	
		  Stream.call(this);
		  this._activeCount = active.length;
		  this._sources = concat(active, passive);
		  this._combinator = combinator ? spread(combinator, this._sources.length) : function (x) {
		    return x;
		  };
		  this._aliveCount = 0;
		  this._latestValues = new Array(this._sources.length);
		  this._latestErrors = new Array(this._sources.length);
		  fillArray(this._latestValues, NOTHING);
		  this._emitAfterActivation = false;
		  this._endAfterActivation = false;
		  this._latestErrorIndex = 0;
	
		  this._$handlers = [];
	
		  var _loop = function (i) {
		    _this._$handlers.push(function (event) {
		      return _this._handleAny(i, event);
		    });
		  };
	
		  for (var i = 0; i < this._sources.length; i++) {
		    _loop(i);
		  }
		}
	
		inherit(Combine, Stream, {
	
		  _name: 'combine',
	
		  _onActivation: function _onActivation() {
		    this._aliveCount = this._activeCount;
	
		    // we need to suscribe to _passive_ sources before _active_
		    // (see https://github.com/rpominov/kefir/issues/98)
		    for (var i = this._activeCount; i < this._sources.length; i++) {
		      this._sources[i].onAny(this._$handlers[i]);
		    }
		    for (var i = 0; i < this._activeCount; i++) {
		      this._sources[i].onAny(this._$handlers[i]);
		    }
	
		    if (this._emitAfterActivation) {
		      this._emitAfterActivation = false;
		      this._emitIfFull();
		    }
		    if (this._endAfterActivation) {
		      this._emitEnd();
		    }
		  },
	
		  _onDeactivation: function _onDeactivation() {
		    var length = this._sources.length,
		        i = undefined;
		    for (i = 0; i < length; i++) {
		      this._sources[i].offAny(this._$handlers[i]);
		    }
		  },
	
		  _emitIfFull: function _emitIfFull() {
		    var hasAllValues = true;
		    var hasErrors = false;
		    var length = this._latestValues.length;
		    var valuesCopy = new Array(length);
		    var errorsCopy = new Array(length);
	
		    for (var i = 0; i < length; i++) {
		      valuesCopy[i] = this._latestValues[i];
		      errorsCopy[i] = this._latestErrors[i];
	
		      if (valuesCopy[i] === NOTHING) {
		        hasAllValues = false;
		      }
	
		      if (errorsCopy[i] !== undefined) {
		        hasErrors = true;
		      }
		    }
	
		    if (hasAllValues) {
		      var combinator = this._combinator;
		      this._emitValue(combinator(valuesCopy));
		    }
		    if (hasErrors) {
		      this._emitError(defaultErrorsCombinator(errorsCopy));
		    }
		  },
	
		  _handleAny: function _handleAny(i, event) {
	
		    if (event.type === VALUE || event.type === ERROR) {
	
		      if (event.type === VALUE) {
		        this._latestValues[i] = event.value;
		        this._latestErrors[i] = undefined;
		      }
		      if (event.type === ERROR) {
		        this._latestValues[i] = NOTHING;
		        this._latestErrors[i] = {
		          index: this._latestErrorIndex++,
		          error: event.value
		        };
		      }
	
		      if (i < this._activeCount) {
		        if (this._activating) {
		          this._emitAfterActivation = true;
		        } else {
		          this._emitIfFull();
		        }
		      }
		    } else {
		      // END
	
		      if (i < this._activeCount) {
		        this._aliveCount--;
		        if (this._aliveCount === 0) {
		          if (this._activating) {
		            this._endAfterActivation = true;
		          } else {
		            this._emitEnd();
		          }
		        }
		      }
		    }
		  },
	
		  _clear: function _clear() {
		    Stream.prototype._clear.call(this);
		    this._sources = null;
		    this._latestValues = null;
		    this._latestErrors = null;
		    this._combinator = null;
		    this._$handlers = null;
		  }
	
		});
	
		module.exports = function combine(active, passive, combinator) {
		  if (passive === undefined) passive = [];
	
		  if (typeof passive === 'function') {
		    combinator = passive;
		    passive = [];
		  }
		  return active.length === 0 ? never() : new Combine(active, passive, combinator);
		};
	
	/***/ },
	/* 61 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Stream = __webpack_require__(6);
	
		var _require = __webpack_require__(3);
	
		var VALUE = _require.VALUE;
		var ERROR = _require.ERROR;
		var END = _require.END;
	
		var _require2 = __webpack_require__(2);
	
		var inherit = _require2.inherit;
	
		var _require3 = __webpack_require__(5);
	
		var map = _require3.map;
		var cloneArray = _require3.cloneArray;
	
		var _require4 = __webpack_require__(21);
	
		var spread = _require4.spread;
	
		var never = __webpack_require__(8);
	
		var isArray = Array.isArray || function (xs) {
		  return Object.prototype.toString.call(xs) === '[object Array]';
		};
	
		function Zip(sources, combinator) {
		  var _this = this;
	
		  Stream.call(this);
	
		  this._buffers = map(sources, function (source) {
		    return isArray(source) ? cloneArray(source) : [];
		  });
		  this._sources = map(sources, function (source) {
		    return isArray(source) ? never() : source;
		  });
	
		  this._combinator = combinator ? spread(combinator, this._sources.length) : function (x) {
		    return x;
		  };
		  this._aliveCount = 0;
	
		  this._$handlers = [];
	
		  var _loop = function (i) {
		    _this._$handlers.push(function (event) {
		      return _this._handleAny(i, event);
		    });
		  };
	
		  for (var i = 0; i < this._sources.length; i++) {
		    _loop(i);
		  }
		}
	
		inherit(Zip, Stream, {
	
		  _name: 'zip',
	
		  _onActivation: function _onActivation() {
	
		    // if all sources are arrays
		    while (this._isFull()) {
		      this._emit();
		    }
	
		    var length = this._sources.length;
		    this._aliveCount = length;
		    for (var i = 0; i < length && this._active; i++) {
		      this._sources[i].onAny(this._$handlers[i]);
		    }
		  },
	
		  _onDeactivation: function _onDeactivation() {
		    for (var i = 0; i < this._sources.length; i++) {
		      this._sources[i].offAny(this._$handlers[i]);
		    }
		  },
	
		  _emit: function _emit() {
		    var values = new Array(this._buffers.length);
		    for (var i = 0; i < this._buffers.length; i++) {
		      values[i] = this._buffers[i].shift();
		    }
		    var combinator = this._combinator;
		    this._emitValue(combinator(values));
		  },
	
		  _isFull: function _isFull() {
		    for (var i = 0; i < this._buffers.length; i++) {
		      if (this._buffers[i].length === 0) {
		        return false;
		      }
		    }
		    return true;
		  },
	
		  _handleAny: function _handleAny(i, event) {
		    if (event.type === VALUE) {
		      this._buffers[i].push(event.value);
		      if (this._isFull()) {
		        this._emit();
		      }
		    }
		    if (event.type === ERROR) {
		      this._emitError(event.value);
		    }
		    if (event.type === END) {
		      this._aliveCount--;
		      if (this._aliveCount === 0) {
		        this._emitEnd();
		      }
		    }
		  },
	
		  _clear: function _clear() {
		    Stream.prototype._clear.call(this);
		    this._sources = null;
		    this._buffers = null;
		    this._combinator = null;
		    this._$handlers = null;
		  }
	
		});
	
		module.exports = function zip(observables, combinator /* Function | falsey */) {
		  return observables.length === 0 ? never() : new Zip(observables, combinator);
		};
	
	/***/ },
	/* 62 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var AbstractPool = __webpack_require__(63);
		var never = __webpack_require__(8);
	
		function Merge(sources) {
		  AbstractPool.call(this);
		  this._addAll(sources);
		  this._initialised = true;
		}
	
		inherit(Merge, AbstractPool, {
	
		  _name: 'merge',
	
		  _onEmpty: function _onEmpty() {
		    if (this._initialised) {
		      this._emitEnd();
		    }
		  }
	
		});
	
		module.exports = function merge(observables) {
		  return observables.length === 0 ? never() : new Merge(observables);
		};
	
	/***/ },
	/* 63 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Stream = __webpack_require__(6);
	
		var _require = __webpack_require__(3);
	
		var VALUE = _require.VALUE;
		var ERROR = _require.ERROR;
	
		var _require2 = __webpack_require__(2);
	
		var inherit = _require2.inherit;
	
		var _require3 = __webpack_require__(5);
	
		var concat = _require3.concat;
		var forEach = _require3.forEach;
		var findByPred = _require3.findByPred;
		var find = _require3.find;
		var remove = _require3.remove;
		var cloneArray = _require3.cloneArray;
	
		var id = function id(x) {
		  return x;
		};
	
		function AbstractPool() {
		  var _this = this;
	
		  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		  var _ref$queueLim = _ref.queueLim;
		  var queueLim = _ref$queueLim === undefined ? 0 : _ref$queueLim;
		  var _ref$concurLim = _ref.concurLim;
		  var concurLim = _ref$concurLim === undefined ? -1 : _ref$concurLim;
		  var _ref$drop = _ref.drop;
		  var drop = _ref$drop === undefined ? 'new' : _ref$drop;
	
		  Stream.call(this);
	
		  this._queueLim = queueLim < 0 ? -1 : queueLim;
		  this._concurLim = concurLim < 0 ? -1 : concurLim;
		  this._drop = drop;
		  this._queue = [];
		  this._curSources = [];
		  this._$handleSubAny = function (event) {
		    return _this._handleSubAny(event);
		  };
		  this._$endHandlers = [];
		  this._currentlyAdding = null;
	
		  if (this._concurLim === 0) {
		    this._emitEnd();
		  }
		}
	
		inherit(AbstractPool, Stream, {
	
		  _name: 'abstractPool',
	
		  _add: function _add(obj, toObs /* Function | falsey */) {
		    toObs = toObs || id;
		    if (this._concurLim === -1 || this._curSources.length < this._concurLim) {
		      this._addToCur(toObs(obj));
		    } else {
		      if (this._queueLim === -1 || this._queue.length < this._queueLim) {
		        this._addToQueue(toObs(obj));
		      } else if (this._drop === 'old') {
		        this._removeOldest();
		        this._add(obj, toObs);
		      }
		    }
		  },
	
		  _addAll: function _addAll(obss) {
		    var _this2 = this;
	
		    forEach(obss, function (obs) {
		      return _this2._add(obs);
		    });
		  },
	
		  _remove: function _remove(obs) {
		    if (this._removeCur(obs) === -1) {
		      this._removeQueue(obs);
		    }
		  },
	
		  _addToQueue: function _addToQueue(obs) {
		    this._queue = concat(this._queue, [obs]);
		  },
	
		  _addToCur: function _addToCur(obs) {
		    if (this._active) {
	
		      // HACK:
		      //
		      // We have two optimizations for cases when `obs` is ended. We don't want
		      // to add such observable to the list, but only want to emit events
		      // from it (if it has some).
		      //
		      // Instead of this hacks, we could just did following,
		      // but it would be 5-8 times slower:
		      //
		      //     this._curSources = concat(this._curSources, [obs]);
		      //     this._subscribe(obs);
		      //
	
		      // #1
		      // This one for cases when `obs` already ended
		      // e.g., Kefir.constant() or Kefir.never()
		      if (!obs._alive) {
		        if (obs._currentEvent) {
		          this._emit(obs._currentEvent.type, obs._currentEvent.value);
		        }
		        return;
		      }
	
		      // #2
		      // This one is for cases when `obs` going to end synchronously on
		      // first subscriber e.g., Kefir.stream(em => {em.emit(1); em.end()})
		      this._currentlyAdding = obs;
		      obs.onAny(this._$handleSubAny);
		      this._currentlyAdding = null;
		      if (obs._alive) {
		        this._curSources = concat(this._curSources, [obs]);
		        if (this._active) {
		          this._subToEnd(obs);
		        }
		      }
		    } else {
		      this._curSources = concat(this._curSources, [obs]);
		    }
		  },
	
		  _subToEnd: function _subToEnd(obs) {
		    var _this3 = this;
	
		    var onEnd = function onEnd() {
		      return _this3._removeCur(obs);
		    };
		    this._$endHandlers.push({ obs: obs, handler: onEnd });
		    obs.onEnd(onEnd);
		  },
	
		  _subscribe: function _subscribe(obs) {
		    obs.onAny(this._$handleSubAny);
	
		    // it can become inactive in responce of subscribing to `obs.onAny` above
		    if (this._active) {
		      this._subToEnd(obs);
		    }
		  },
	
		  _unsubscribe: function _unsubscribe(obs) {
		    obs.offAny(this._$handleSubAny);
	
		    var onEndI = findByPred(this._$endHandlers, function (obj) {
		      return obj.obs === obs;
		    });
		    if (onEndI !== -1) {
		      obs.offEnd(this._$endHandlers[onEndI].handler);
		      this._$endHandlers.splice(onEndI, 1);
		    }
		  },
	
		  _handleSubAny: function _handleSubAny(event) {
		    if (event.type === VALUE) {
		      this._emitValue(event.value);
		    } else if (event.type === ERROR) {
		      this._emitError(event.value);
		    }
		  },
	
		  _removeQueue: function _removeQueue(obs) {
		    var index = find(this._queue, obs);
		    this._queue = remove(this._queue, index);
		    return index;
		  },
	
		  _removeCur: function _removeCur(obs) {
		    if (this._active) {
		      this._unsubscribe(obs);
		    }
		    var index = find(this._curSources, obs);
		    this._curSources = remove(this._curSources, index);
		    if (index !== -1) {
		      if (this._queue.length !== 0) {
		        this._pullQueue();
		      } else if (this._curSources.length === 0) {
		        this._onEmpty();
		      }
		    }
		    return index;
		  },
	
		  _removeOldest: function _removeOldest() {
		    this._removeCur(this._curSources[0]);
		  },
	
		  _pullQueue: function _pullQueue() {
		    if (this._queue.length !== 0) {
		      this._queue = cloneArray(this._queue);
		      this._addToCur(this._queue.shift());
		    }
		  },
	
		  _onActivation: function _onActivation() {
		    for (var i = 0, sources = this._curSources; i < sources.length && this._active; i++) {
		      this._subscribe(sources[i]);
		    }
		  },
	
		  _onDeactivation: function _onDeactivation() {
		    for (var i = 0, sources = this._curSources; i < sources.length; i++) {
		      this._unsubscribe(sources[i]);
		    }
		    if (this._currentlyAdding !== null) {
		      this._unsubscribe(this._currentlyAdding);
		    }
		  },
	
		  _isEmpty: function _isEmpty() {
		    return this._curSources.length === 0;
		  },
	
		  _onEmpty: function _onEmpty() {},
	
		  _clear: function _clear() {
		    Stream.prototype._clear.call(this);
		    this._queue = null;
		    this._curSources = null;
		    this._$handleSubAny = null;
		    this._$endHandlers = null;
		  }
	
		});
	
		module.exports = AbstractPool;
	
	/***/ },
	/* 64 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var repeat = __webpack_require__(65);
	
		module.exports = function concat(observables) {
		  return repeat(function (index) {
		    return observables.length > index ? observables[index] : false;
		  }).setName('concat');
		};
	
	/***/ },
	/* 65 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var Stream = __webpack_require__(6);
	
		var _require2 = __webpack_require__(3);
	
		var END = _require2.END;
	
		function S(generator) {
		  var _this = this;
	
		  Stream.call(this);
		  this._generator = generator;
		  this._source = null;
		  this._inLoop = false;
		  this._iteration = 0;
		  this._$handleAny = function (event) {
		    return _this._handleAny(event);
		  };
		}
	
		inherit(S, Stream, {
	
		  _name: 'repeat',
	
		  _handleAny: function _handleAny(event) {
		    if (event.type === END) {
		      this._source = null;
		      this._getSource();
		    } else {
		      this._emit(event.type, event.value);
		    }
		  },
	
		  _getSource: function _getSource() {
		    if (!this._inLoop) {
		      this._inLoop = true;
		      var generator = this._generator;
		      while (this._source === null && this._alive && this._active) {
		        this._source = generator(this._iteration++);
		        if (this._source) {
		          this._source.onAny(this._$handleAny);
		        } else {
		          this._emitEnd();
		        }
		      }
		      this._inLoop = false;
		    }
		  },
	
		  _onActivation: function _onActivation() {
		    if (this._source) {
		      this._source.onAny(this._$handleAny);
		    } else {
		      this._getSource();
		    }
		  },
	
		  _onDeactivation: function _onDeactivation() {
		    if (this._source) {
		      this._source.offAny(this._$handleAny);
		    }
		  },
	
		  _clear: function _clear() {
		    Stream.prototype._clear.call(this);
		    this._generator = null;
		    this._source = null;
		    this._$handleAny = null;
		  }
	
		});
	
		module.exports = function (generator) {
		  return new S(generator);
		};
	
	/***/ },
	/* 66 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var AbstractPool = __webpack_require__(63);
	
		function Pool() {
		  AbstractPool.call(this);
		}
	
		inherit(Pool, AbstractPool, {
	
		  _name: 'pool',
	
		  plug: function plug(obs) {
		    this._add(obs);
		    return this;
		  },
	
		  unplug: function unplug(obs) {
		    this._remove(obs);
		    return this;
		  }
	
		});
	
		module.exports = Pool;
	
	/***/ },
	/* 67 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(3);
	
		var VALUE = _require.VALUE;
		var ERROR = _require.ERROR;
		var END = _require.END;
	
		var _require2 = __webpack_require__(2);
	
		var inherit = _require2.inherit;
	
		var AbstractPool = __webpack_require__(63);
	
		function FlatMap(source, fn, options) {
		  var _this = this;
	
		  AbstractPool.call(this, options);
		  this._source = source;
		  this._fn = fn;
		  this._mainEnded = false;
		  this._lastCurrent = null;
		  this._$handleMain = function (event) {
		    return _this._handleMain(event);
		  };
		}
	
		inherit(FlatMap, AbstractPool, {
	
		  _onActivation: function _onActivation() {
		    AbstractPool.prototype._onActivation.call(this);
		    if (this._active) {
		      this._source.onAny(this._$handleMain);
		    }
		  },
	
		  _onDeactivation: function _onDeactivation() {
		    AbstractPool.prototype._onDeactivation.call(this);
		    this._source.offAny(this._$handleMain);
		    this._hadNoEvSinceDeact = true;
		  },
	
		  _handleMain: function _handleMain(event) {
	
		    if (event.type === VALUE) {
		      // Is latest value before deactivation survived, and now is 'current' on this activation?
		      // We don't want to handle such values, to prevent to constantly add
		      // same observale on each activation/deactivation when our main source
		      // is a `Kefir.conatant()` for example.
		      var sameCurr = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === event.value;
		      if (!sameCurr) {
		        this._add(event.value, this._fn);
		      }
		      this._lastCurrent = event.value;
		      this._hadNoEvSinceDeact = false;
		    }
	
		    if (event.type === ERROR) {
		      this._emitError(event.value);
		    }
	
		    if (event.type === END) {
		      if (this._isEmpty()) {
		        this._emitEnd();
		      } else {
		        this._mainEnded = true;
		      }
		    }
		  },
	
		  _onEmpty: function _onEmpty() {
		    if (this._mainEnded) {
		      this._emitEnd();
		    }
		  },
	
		  _clear: function _clear() {
		    AbstractPool.prototype._clear.call(this);
		    this._source = null;
		    this._lastCurrent = null;
		    this._$handleMain = null;
		  }
	
		});
	
		module.exports = FlatMap;
	
	/***/ },
	/* 68 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(3);
	
		var VALUE = _require.VALUE;
		var ERROR = _require.ERROR;
		var END = _require.END;
	
		var _require2 = __webpack_require__(2);
	
		var inherit = _require2.inherit;
	
		var FlatMap = __webpack_require__(67);
	
		function FlatMapErrors(source, fn) {
		  FlatMap.call(this, source, fn);
		}
	
		inherit(FlatMapErrors, FlatMap, {
	
		  // Same as in FlatMap, only VALUE/ERROR flipped
		  _handleMain: function _handleMain(event) {
	
		    if (event.type === ERROR) {
		      var sameCurr = this._activating && this._hadNoEvSinceDeact && this._lastCurrent === event.value;
		      if (!sameCurr) {
		        this._add(event.value, this._fn);
		      }
		      this._lastCurrent = event.value;
		      this._hadNoEvSinceDeact = false;
		    }
	
		    if (event.type === VALUE) {
		      this._emitValue(event.value);
		    }
	
		    if (event.type === END) {
		      if (this._isEmpty()) {
		        this._emitEnd();
		      } else {
		        this._mainEnded = true;
		      }
		    }
		  }
	
		});
	
		module.exports = FlatMapErrors;
	
	/***/ },
	/* 69 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(70);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var _require2 = __webpack_require__(3);
	
		var NOTHING = _require2.NOTHING;
	
		var mixin = {
	
		  _handlePrimaryValue: function _handlePrimaryValue(x) {
		    if (this._lastSecondary !== NOTHING && this._lastSecondary) {
		      this._emitValue(x);
		    }
		  },
	
		  _handleSecondaryEnd: function _handleSecondaryEnd() {
		    if (this._lastSecondary === NOTHING || !this._lastSecondary) {
		      this._emitEnd();
		    }
		  }
	
		};
	
		var S = createStream('filterBy', mixin);
		var P = createProperty('filterBy', mixin);
	
		module.exports = function filterBy(primary, secondary) {
		  return new (primary._ofSameType(S, P))(primary, secondary);
		};
	
	/***/ },
	/* 70 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var Stream = __webpack_require__(6);
		var Property = __webpack_require__(7);
	
		var _require = __webpack_require__(2);
	
		var inherit = _require.inherit;
	
		var _require2 = __webpack_require__(3);
	
		var VALUE = _require2.VALUE;
		var ERROR = _require2.ERROR;
		var END = _require2.END;
		var NOTHING = _require2.NOTHING;
	
		function createConstructor(BaseClass, name) {
		  return function AnonymousObservable(primary, secondary, options) {
		    var _this = this;
	
		    BaseClass.call(this);
		    this._primary = primary;
		    this._secondary = secondary;
		    this._name = primary._name + '.' + name;
		    this._lastSecondary = NOTHING;
		    this._$handleSecondaryAny = function (event) {
		      return _this._handleSecondaryAny(event);
		    };
		    this._$handlePrimaryAny = function (event) {
		      return _this._handlePrimaryAny(event);
		    };
		    this._init(options);
		  };
		}
	
		function createClassMethods(BaseClass) {
		  return {
		    _init: function _init() {},
		    _free: function _free() {},
	
		    _handlePrimaryValue: function _handlePrimaryValue(x) {
		      this._emitValue(x);
		    },
		    _handlePrimaryError: function _handlePrimaryError(x) {
		      this._emitError(x);
		    },
		    _handlePrimaryEnd: function _handlePrimaryEnd() {
		      this._emitEnd();
		    },
	
		    _handleSecondaryValue: function _handleSecondaryValue(x) {
		      this._lastSecondary = x;
		    },
		    _handleSecondaryError: function _handleSecondaryError(x) {
		      this._emitError(x);
		    },
		    _handleSecondaryEnd: function _handleSecondaryEnd() {},
	
		    _handlePrimaryAny: function _handlePrimaryAny(event) {
		      switch (event.type) {
		        case VALUE:
		          return this._handlePrimaryValue(event.value);
		        case ERROR:
		          return this._handlePrimaryError(event.value);
		        case END:
		          return this._handlePrimaryEnd(event.value);
		      }
		    },
		    _handleSecondaryAny: function _handleSecondaryAny(event) {
		      switch (event.type) {
		        case VALUE:
		          return this._handleSecondaryValue(event.value);
		        case ERROR:
		          return this._handleSecondaryError(event.value);
		        case END:
		          this._handleSecondaryEnd(event.value);
		          this._removeSecondary();
		      }
		    },
	
		    _removeSecondary: function _removeSecondary() {
		      if (this._secondary !== null) {
		        this._secondary.offAny(this._$handleSecondaryAny);
		        this._$handleSecondaryAny = null;
		        this._secondary = null;
		      }
		    },
	
		    _onActivation: function _onActivation() {
		      if (this._secondary !== null) {
		        this._secondary.onAny(this._$handleSecondaryAny);
		      }
		      if (this._active) {
		        this._primary.onAny(this._$handlePrimaryAny);
		      }
		    },
		    _onDeactivation: function _onDeactivation() {
		      if (this._secondary !== null) {
		        this._secondary.offAny(this._$handleSecondaryAny);
		      }
		      this._primary.offAny(this._$handlePrimaryAny);
		    },
	
		    _clear: function _clear() {
		      BaseClass.prototype._clear.call(this);
		      this._primary = null;
		      this._secondary = null;
		      this._lastSecondary = null;
		      this._$handleSecondaryAny = null;
		      this._$handlePrimaryAny = null;
		      this._free();
		    }
	
		  };
		}
	
		function createStream(name, mixin) {
		  var S = createConstructor(Stream, name);
		  inherit(S, Stream, createClassMethods(Stream), mixin);
		  return S;
		}
	
		function createProperty(name, mixin) {
		  var P = createConstructor(Property, name);
		  inherit(P, Property, createClassMethods(Property), mixin);
		  return P;
		}
	
		module.exports = { createStream: createStream, createProperty: createProperty };
	
	/***/ },
	/* 71 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var combine = __webpack_require__(60);
	
		var id2 = function id2(_, x) {
		  return x;
		};
	
		module.exports = function sampledBy(passive, active, combinator) {
		  var _combinator = combinator ? function (a, b) {
		    return combinator(b, a);
		  } : id2;
		  return combine([active], [passive], _combinator).setName(passive, 'sampledBy');
		};
	
	/***/ },
	/* 72 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(70);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var _require2 = __webpack_require__(3);
	
		var NOTHING = _require2.NOTHING;
	
		var mixin = {
	
		  _handlePrimaryValue: function _handlePrimaryValue(x) {
		    if (this._lastSecondary !== NOTHING) {
		      this._emitValue(x);
		    }
		  },
	
		  _handleSecondaryEnd: function _handleSecondaryEnd() {
		    if (this._lastSecondary === NOTHING) {
		      this._emitEnd();
		    }
		  }
	
		};
	
		var S = createStream('skipUntilBy', mixin);
		var P = createProperty('skipUntilBy', mixin);
	
		module.exports = function skipUntilBy(primary, secondary) {
		  return new (primary._ofSameType(S, P))(primary, secondary);
		};
	
	/***/ },
	/* 73 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(70);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _handleSecondaryValue: function _handleSecondaryValue() {
		    this._emitEnd();
		  }
	
		};
	
		var S = createStream('takeUntilBy', mixin);
		var P = createProperty('takeUntilBy', mixin);
	
		module.exports = function takeUntilBy(primary, secondary) {
		  return new (primary._ofSameType(S, P))(primary, secondary);
		};
	
	/***/ },
	/* 74 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(70);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init() {
		    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		    var _ref$flushOnEnd = _ref.flushOnEnd;
		    var flushOnEnd = _ref$flushOnEnd === undefined ? true : _ref$flushOnEnd;
	
		    this._buff = [];
		    this._flushOnEnd = flushOnEnd;
		  },
	
		  _free: function _free() {
		    this._buff = null;
		  },
	
		  _flush: function _flush() {
		    if (this._buff !== null) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
	
		  _handlePrimaryEnd: function _handlePrimaryEnd() {
		    if (this._flushOnEnd) {
		      this._flush();
		    }
		    this._emitEnd();
		  },
	
		  _onActivation: function _onActivation() {
		    this._primary.onAny(this._$handlePrimaryAny);
		    if (this._alive && this._secondary !== null) {
		      this._secondary.onAny(this._$handleSecondaryAny);
		    }
		  },
	
		  _handlePrimaryValue: function _handlePrimaryValue(x) {
		    this._buff.push(x);
		  },
	
		  _handleSecondaryValue: function _handleSecondaryValue() {
		    this._flush();
		  },
	
		  _handleSecondaryEnd: function _handleSecondaryEnd() {
		    if (!this._flushOnEnd) {
		      this._emitEnd();
		    }
		  }
	
		};
	
		var S = createStream('bufferBy', mixin);
		var P = createProperty('bufferBy', mixin);
	
		module.exports = function bufferBy(primary, secondary, options /* optional */) {
		  return new (primary._ofSameType(S, P))(primary, secondary, options);
		};
	
	/***/ },
	/* 75 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(70);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var _require2 = __webpack_require__(3);
	
		var NOTHING = _require2.NOTHING;
	
		var mixin = {
	
		  _init: function _init() {
		    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
		    var _ref$flushOnEnd = _ref.flushOnEnd;
		    var flushOnEnd = _ref$flushOnEnd === undefined ? true : _ref$flushOnEnd;
		    var _ref$flushOnChange = _ref.flushOnChange;
		    var flushOnChange = _ref$flushOnChange === undefined ? false : _ref$flushOnChange;
	
		    this._buff = [];
		    this._flushOnEnd = flushOnEnd;
		    this._flushOnChange = flushOnChange;
		  },
	
		  _free: function _free() {
		    this._buff = null;
		  },
	
		  _flush: function _flush() {
		    if (this._buff !== null) {
		      this._emitValue(this._buff);
		      this._buff = [];
		    }
		  },
	
		  _handlePrimaryEnd: function _handlePrimaryEnd() {
		    if (this._flushOnEnd) {
		      this._flush();
		    }
		    this._emitEnd();
		  },
	
		  _handlePrimaryValue: function _handlePrimaryValue(x) {
		    this._buff.push(x);
		    if (this._lastSecondary !== NOTHING && !this._lastSecondary) {
		      this._flush();
		    }
		  },
	
		  _handleSecondaryEnd: function _handleSecondaryEnd() {
		    if (!this._flushOnEnd && (this._lastSecondary === NOTHING || this._lastSecondary)) {
		      this._emitEnd();
		    }
		  },
	
		  _handleSecondaryValue: function _handleSecondaryValue(x) {
		    if (this._flushOnChange && !x) {
		      this._flush();
		    }
	
		    // from default _handleSecondaryValue
		    this._lastSecondary = x;
		  }
	
		};
	
		var S = createStream('bufferWhileBy', mixin);
		var P = createProperty('bufferWhileBy', mixin);
	
		module.exports = function bufferWhileBy(primary, secondary, options /* optional */) {
		  return new (primary._ofSameType(S, P))(primary, secondary, options);
		};
	
	/***/ },
	/* 76 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var merge = __webpack_require__(62);
		var map = __webpack_require__(32);
		var skipDuplicates = __webpack_require__(40);
		var toProperty = __webpack_require__(24);
	
		var f = function f() {
		  return false;
		};
		var t = function t() {
		  return true;
		};
	
		module.exports = function awaiting(a, b) {
		  var result = merge([map(a, t), map(b, f)]);
		  result = skipDuplicates(result);
		  result = toProperty(result, f);
		  return result.setName(a, 'awaiting');
		};
	
	/***/ },
	/* 77 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleValue: function _handleValue(x) {
		    var fn = this._fn;
		    var result = fn(x);
		    if (result.convert) {
		      this._emitError(result.error);
		    } else {
		      this._emitValue(x);
		    }
		  }
	
		};
	
		var S = createStream('valuesToErrors', mixin);
		var P = createProperty('valuesToErrors', mixin);
	
		var defFn = function defFn(x) {
		  return { convert: true, error: x };
		};
	
		module.exports = function valuesToErrors(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? defFn : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 78 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _init: function _init(_ref) {
		    var fn = _ref.fn;
	
		    this._fn = fn;
		  },
	
		  _free: function _free() {
		    this._fn = null;
		  },
	
		  _handleError: function _handleError(x) {
		    var fn = this._fn;
		    var result = fn(x);
		    if (result.convert) {
		      this._emitValue(result.value);
		    } else {
		      this._emitError(x);
		    }
		  }
	
		};
	
		var S = createStream('errorsToValues', mixin);
		var P = createProperty('errorsToValues', mixin);
	
		var defFn = function defFn(x) {
		  return { convert: true, value: x };
		};
	
		module.exports = function errorsToValues(obs) {
		  var fn = arguments.length <= 1 || arguments[1] === undefined ? defFn : arguments[1];
	
		  return new (obs._ofSameType(S, P))(obs, { fn: fn });
		};
	
	/***/ },
	/* 79 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
	
		var _require = __webpack_require__(25);
	
		var createStream = _require.createStream;
		var createProperty = _require.createProperty;
	
		var mixin = {
	
		  _handleError: function _handleError(x) {
		    this._emitError(x);
		    this._emitEnd();
		  }
	
		};
	
		var S = createStream('endOnError', mixin);
		var P = createProperty('endOnError', mixin);
	
		module.exports = function endOnError(obs) {
		  return new (obs._ofSameType(S, P))(obs);
		};
	
	/***/ }
	/******/ ])
	});
	;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports.convertAllPropsToPx = function (keyframes, windowWidth, windowHeight) {
	  var i, j, k;
	  for (i = 0; i < keyframes.length; i++) {
	    // loop keyframes
	    keyframes[i].duration = convertPercentToPx(keyframes[i].duration, 'y', windowWidth, windowHeight);
	    for (j = 0; j < keyframes[i].animations.length; j++) {
	      // loop animations
	      Object.keys(keyframes[i].animations[j]).forEach(function (key) {
	        // loop properties
	        var value = keyframes[i].animations[j][key];
	        if (key !== 'selector') {
	          if (value instanceof Array) {
	            // if its an array
	            for (k = 0; k < value.length; k++) {
	              // if value in array is %
	              if (typeof value[k] === "string") {
	                if (key === 'translateY') {
	                  value[k] = convertPercentToPx(value[k], 'y', windowWidth, windowHeight);
	                } else {
	                  value[k] = convertPercentToPx(value[k], 'x', windowWidth, windowHeight);
	                }
	              }
	            }
	          } else {
	            if (typeof value === "string") {
	              // if single value is a %
	              if (key === 'translateY') {
	                value = convertPercentToPx(value, 'y', windowWidth, windowHeight);
	              } else {
	                value = convertPercentToPx(value, 'x', windowWidth, windowHeight);
	              }
	            }
	          }
	          keyframes[i].animations[j][key] = value;
	        }
	      });
	    }
	  }
	  return keyframes;
	};
	
	function convertPercentToPx(value, axis, windowWidth, windowHeight) {
	  if (typeof value === "string" && value.match(/%/g)) {
	    if (axis === 'y') value = parseFloat(value) / 100 * windowHeight;
	    if (axis === 'x') value = parseFloat(value) / 100 * windowWidth;
	  }
	  if (typeof value === "string" && value.match(/v/g)) {
	    if (axis === 'y') value = parseFloat(value) / 100 * windowHeight;
	    if (axis === 'x') value = parseFloat(value) / 100 * windowWidth;
	  }
	  return value;
	};
	
	module.exports.buildPage = function (keyframes, wrappers) {
	  var i,
	      j,
	      k,
	      initFrames = [],
	      bodyHeight = 0;
	  for (i = 0; i < keyframes.length; i++) {
	    // loop keyframes
	    if (keyframes[i].focus) {
	      if (bodyHeight !== initFrames[initFrames.length - 1]) {
	        initFrames.push(bodyHeight);
	      }
	    }
	    bodyHeight += keyframes[i].duration;
	    if ($.inArray(keyframes[i].wrapper, wrappers) == -1) {
	      wrappers.push(keyframes[i].wrapper);
	    }
	    for (j = 0; j < keyframes[i].animations.length; j++) {
	      // loop animations
	      Object.keys(keyframes[i].animations[j]).forEach(function (key) {
	        // loop properties
	        var value = keyframes[i].animations[j][key];
	        if (key !== 'selector' && value instanceof Array === false) {
	          var valueSet = [];
	          valueSet.push(getDefaultPropertyValue(key), value);
	          value = valueSet;
	        }
	        keyframes[i].animations[j][key] = value;
	      });
	    }
	  }
	
	  return {
	    frameFocus: initFrames,
	    bodyHeight: bodyHeight,
	    wrappers: wrappers
	  };
	};
	
	module.exports.getDefaultPropertyValue = getDefaultPropertyValue;
	
	function getDefaultPropertyValue(property) {
	  switch (property) {
	    case 'translateX':
	      return 0;
	    case 'translateY':
	      return 0;
	    case 'scale':
	      return 1;
	    case 'rotate':
	      return 0;
	    case 'opacity':
	      return 1;
	    default:
	      return null;
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var PROPERTIES = ['translateX', 'translateY', 'opacity', 'rotate', 'scale'];
	var ANIMATION_TIME = 41;
	
	var $window = $(window);
	var $body = $('body,html');
	
	var INIT_STATE = {
	
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
	
	};
	
	module.exports.INIT_STATE = INIT_STATE;
	module.exports.PROPERTIES = PROPERTIES;
	module.exports.ANIMATION_TIME = ANIMATION_TIME;
	module.exports.$body = $body;
	module.exports.$window = $window;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function() {
	  var AjaxMonitor, Bar, DocumentMonitor, ElementMonitor, ElementTracker, EventLagMonitor, Evented, Events, NoTargetError, Pace, RequestIntercept, SOURCE_KEYS, Scaler, SocketRequestTracker, XHRRequestTracker, animation, avgAmplitude, bar, cancelAnimation, cancelAnimationFrame, defaultOptions, extend, extendNative, getFromDOM, getIntercept, handlePushState, ignoreStack, init, now, options, requestAnimationFrame, result, runAnimation, scalers, shouldIgnoreURL, shouldTrack, source, sources, uniScaler, _WebSocket, _XDomainRequest, _XMLHttpRequest, _i, _intercept, _len, _pushState, _ref, _ref1, _replaceState,
	    __slice = [].slice,
	    __hasProp = {}.hasOwnProperty,
	    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
	
	  defaultOptions = {
	    catchupTime: 100,
	    initialRate: .03,
	    minTime: 250,
	    ghostTime: 100,
	    maxProgressPerFrame: 20,
	    easeFactor: 1.25,
	    startOnPageLoad: true,
	    restartOnPushState: true,
	    restartOnRequestAfter: 500,
	    target: 'body',
	    elements: {
	      checkInterval: 100,
	      selectors: ['body']
	    },
	    eventLag: {
	      minSamples: 10,
	      sampleCount: 3,
	      lagThreshold: 3
	    },
	    ajax: {
	      trackMethods: ['GET'],
	      trackWebSockets: true,
	      ignoreURLs: []
	    }
	  };
	
	  now = function() {
	    var _ref;
	    return (_ref = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref : +(new Date);
	  };
	
	  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	
	  if (requestAnimationFrame == null) {
	    requestAnimationFrame = function(fn) {
	      return setTimeout(fn, 50);
	    };
	    cancelAnimationFrame = function(id) {
	      return clearTimeout(id);
	    };
	  }
	
	  runAnimation = function(fn) {
	    var last, tick;
	    last = now();
	    tick = function() {
	      var diff;
	      diff = now() - last;
	      if (diff >= 33) {
	        last = now();
	        return fn(diff, function() {
	          return requestAnimationFrame(tick);
	        });
	      } else {
	        return setTimeout(tick, 33 - diff);
	      }
	    };
	    return tick();
	  };
	
	  result = function() {
	    var args, key, obj;
	    obj = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
	    if (typeof obj[key] === 'function') {
	      return obj[key].apply(obj, args);
	    } else {
	      return obj[key];
	    }
	  };
	
	  extend = function() {
	    var key, out, source, sources, val, _i, _len;
	    out = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    for (_i = 0, _len = sources.length; _i < _len; _i++) {
	      source = sources[_i];
	      if (source) {
	        for (key in source) {
	          if (!__hasProp.call(source, key)) continue;
	          val = source[key];
	          if ((out[key] != null) && typeof out[key] === 'object' && (val != null) && typeof val === 'object') {
	            extend(out[key], val);
	          } else {
	            out[key] = val;
	          }
	        }
	      }
	    }
	    return out;
	  };
	
	  avgAmplitude = function(arr) {
	    var count, sum, v, _i, _len;
	    sum = count = 0;
	    for (_i = 0, _len = arr.length; _i < _len; _i++) {
	      v = arr[_i];
	      sum += Math.abs(v);
	      count++;
	    }
	    return sum / count;
	  };
	
	  getFromDOM = function(key, json) {
	    var data, e, el;
	    if (key == null) {
	      key = 'options';
	    }
	    if (json == null) {
	      json = true;
	    }
	    el = document.querySelector("[data-pace-" + key + "]");
	    if (!el) {
	      return;
	    }
	    data = el.getAttribute("data-pace-" + key);
	    if (!json) {
	      return data;
	    }
	    try {
	      return JSON.parse(data);
	    } catch (_error) {
	      e = _error;
	      return typeof console !== "undefined" && console !== null ? console.error("Error parsing inline pace options", e) : void 0;
	    }
	  };
	
	  Evented = (function() {
	    function Evented() {}
	
	    Evented.prototype.on = function(event, handler, ctx, once) {
	      var _base;
	      if (once == null) {
	        once = false;
	      }
	      if (this.bindings == null) {
	        this.bindings = {};
	      }
	      if ((_base = this.bindings)[event] == null) {
	        _base[event] = [];
	      }
	      return this.bindings[event].push({
	        handler: handler,
	        ctx: ctx,
	        once: once
	      });
	    };
	
	    Evented.prototype.once = function(event, handler, ctx) {
	      return this.on(event, handler, ctx, true);
	    };
	
	    Evented.prototype.off = function(event, handler) {
	      var i, _ref, _results;
	      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
	        return;
	      }
	      if (handler == null) {
	        return delete this.bindings[event];
	      } else {
	        i = 0;
	        _results = [];
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            _results.push(this.bindings[event].splice(i, 1));
	          } else {
	            _results.push(i++);
	          }
	        }
	        return _results;
	      }
	    };
	
	    Evented.prototype.trigger = function() {
	      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
	      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
	        i = 0;
	        _results = [];
	        while (i < this.bindings[event].length) {
	          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
	          handler.apply(ctx != null ? ctx : this, args);
	          if (once) {
	            _results.push(this.bindings[event].splice(i, 1));
	          } else {
	            _results.push(i++);
	          }
	        }
	        return _results;
	      }
	    };
	
	    return Evented;
	
	  })();
	
	  Pace = window.Pace || {};
	
	  window.Pace = Pace;
	
	  extend(Pace, Evented.prototype);
	
	  options = Pace.options = extend({}, defaultOptions, window.paceOptions, getFromDOM());
	
	  _ref = ['ajax', 'document', 'eventLag', 'elements'];
	  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	    source = _ref[_i];
	    if (options[source] === true) {
	      options[source] = defaultOptions[source];
	    }
	  }
	
	  NoTargetError = (function(_super) {
	    __extends(NoTargetError, _super);
	
	    function NoTargetError() {
	      _ref1 = NoTargetError.__super__.constructor.apply(this, arguments);
	      return _ref1;
	    }
	
	    return NoTargetError;
	
	  })(Error);
	
	  Bar = (function() {
	    function Bar() {
	      this.progress = 0;
	    }
	
	    Bar.prototype.getElement = function() {
	      var targetElement;
	      if (this.el == null) {
	        targetElement = document.querySelector(options.target);
	        if (!targetElement) {
	          throw new NoTargetError;
	        }
	        this.el = document.createElement('div');
	        this.el.className = "pace pace-active";
	        document.body.className = document.body.className.replace(/pace-done/g, '');
	        document.body.className += ' pace-running';
	        this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';
	        if (targetElement.firstChild != null) {
	          targetElement.insertBefore(this.el, targetElement.firstChild);
	        } else {
	          targetElement.appendChild(this.el);
	        }
	      }
	      return this.el;
	    };
	
	    Bar.prototype.finish = function() {
	      var el;
	      el = this.getElement();
	      el.className = el.className.replace('pace-active', '');
	      el.className += ' pace-inactive';
	      document.body.className = document.body.className.replace('pace-running', '');
	      return document.body.className += ' pace-done';
	    };
	
	    Bar.prototype.update = function(prog) {
	      this.progress = prog;
	      return this.render();
	    };
	
	    Bar.prototype.destroy = function() {
	      try {
	        this.getElement().parentNode.removeChild(this.getElement());
	      } catch (_error) {
	        NoTargetError = _error;
	      }
	      return this.el = void 0;
	    };
	
	    Bar.prototype.render = function() {
	      var el, key, progressStr, transform, _j, _len1, _ref2;
	      if (document.querySelector(options.target) == null) {
	        return false;
	      }
	      el = this.getElement();
	      transform = "translate3d(" + this.progress + "%, 0, 0)";
	      _ref2 = ['webkitTransform', 'msTransform', 'transform'];
	      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	        key = _ref2[_j];
	        el.children[0].style[key] = transform;
	      }
	      if (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) {
	        el.children[0].setAttribute('data-progress-text', "" + (this.progress | 0) + "%");
	        if (this.progress >= 100) {
	          progressStr = '99';
	        } else {
	          progressStr = this.progress < 10 ? "0" : "";
	          progressStr += this.progress | 0;
	        }
	        el.children[0].setAttribute('data-progress', "" + progressStr);
	      }
	      return this.lastRenderedProgress = this.progress;
	    };
	
	    Bar.prototype.done = function() {
	      return this.progress >= 100;
	    };
	
	    return Bar;
	
	  })();
	
	  Events = (function() {
	    function Events() {
	      this.bindings = {};
	    }
	
	    Events.prototype.trigger = function(name, val) {
	      var binding, _j, _len1, _ref2, _results;
	      if (this.bindings[name] != null) {
	        _ref2 = this.bindings[name];
	        _results = [];
	        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	          binding = _ref2[_j];
	          _results.push(binding.call(this, val));
	        }
	        return _results;
	      }
	    };
	
	    Events.prototype.on = function(name, fn) {
	      var _base;
	      if ((_base = this.bindings)[name] == null) {
	        _base[name] = [];
	      }
	      return this.bindings[name].push(fn);
	    };
	
	    return Events;
	
	  })();
	
	  _XMLHttpRequest = window.XMLHttpRequest;
	
	  _XDomainRequest = window.XDomainRequest;
	
	  _WebSocket = window.WebSocket;
	
	  extendNative = function(to, from) {
	    var e, key, _results;
	    _results = [];
	    for (key in from.prototype) {
	      try {
	        if ((to[key] == null) && typeof from[key] !== 'function') {
	          if (typeof Object.defineProperty === 'function') {
	            _results.push(Object.defineProperty(to, key, {
	              get: function() {
	                return from.prototype[key];
	              },
	              configurable: true,
	              enumerable: true
	            }));
	          } else {
	            _results.push(to[key] = from.prototype[key]);
	          }
	        } else {
	          _results.push(void 0);
	        }
	      } catch (_error) {
	        e = _error;
	      }
	    }
	    return _results;
	  };
	
	  ignoreStack = [];
	
	  Pace.ignore = function() {
	    var args, fn, ret;
	    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    ignoreStack.unshift('ignore');
	    ret = fn.apply(null, args);
	    ignoreStack.shift();
	    return ret;
	  };
	
	  Pace.track = function() {
	    var args, fn, ret;
	    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
	    ignoreStack.unshift('track');
	    ret = fn.apply(null, args);
	    ignoreStack.shift();
	    return ret;
	  };
	
	  shouldTrack = function(method) {
	    var _ref2;
	    if (method == null) {
	      method = 'GET';
	    }
	    if (ignoreStack[0] === 'track') {
	      return 'force';
	    }
	    if (!ignoreStack.length && options.ajax) {
	      if (method === 'socket' && options.ajax.trackWebSockets) {
	        return true;
	      } else if (_ref2 = method.toUpperCase(), __indexOf.call(options.ajax.trackMethods, _ref2) >= 0) {
	        return true;
	      }
	    }
	    return false;
	  };
	
	  RequestIntercept = (function(_super) {
	    __extends(RequestIntercept, _super);
	
	    function RequestIntercept() {
	      var monitorXHR,
	        _this = this;
	      RequestIntercept.__super__.constructor.apply(this, arguments);
	      monitorXHR = function(req) {
	        var _open;
	        _open = req.open;
	        return req.open = function(type, url, async) {
	          if (shouldTrack(type)) {
	            _this.trigger('request', {
	              type: type,
	              url: url,
	              request: req
	            });
	          }
	          return _open.apply(req, arguments);
	        };
	      };
	      window.XMLHttpRequest = function(flags) {
	        var req;
	        req = new _XMLHttpRequest(flags);
	        monitorXHR(req);
	        return req;
	      };
	      try {
	        extendNative(window.XMLHttpRequest, _XMLHttpRequest);
	      } catch (_error) {}
	      if (_XDomainRequest != null) {
	        window.XDomainRequest = function() {
	          var req;
	          req = new _XDomainRequest;
	          monitorXHR(req);
	          return req;
	        };
	        try {
	          extendNative(window.XDomainRequest, _XDomainRequest);
	        } catch (_error) {}
	      }
	      if ((_WebSocket != null) && options.ajax.trackWebSockets) {
	        window.WebSocket = function(url, protocols) {
	          var req;
	          if (protocols != null) {
	            req = new _WebSocket(url, protocols);
	          } else {
	            req = new _WebSocket(url);
	          }
	          if (shouldTrack('socket')) {
	            _this.trigger('request', {
	              type: 'socket',
	              url: url,
	              protocols: protocols,
	              request: req
	            });
	          }
	          return req;
	        };
	        try {
	          extendNative(window.WebSocket, _WebSocket);
	        } catch (_error) {}
	      }
	    }
	
	    return RequestIntercept;
	
	  })(Events);
	
	  _intercept = null;
	
	  getIntercept = function() {
	    if (_intercept == null) {
	      _intercept = new RequestIntercept;
	    }
	    return _intercept;
	  };
	
	  shouldIgnoreURL = function(url) {
	    var pattern, _j, _len1, _ref2;
	    _ref2 = options.ajax.ignoreURLs;
	    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	      pattern = _ref2[_j];
	      if (typeof pattern === 'string') {
	        if (url.indexOf(pattern) !== -1) {
	          return true;
	        }
	      } else {
	        if (pattern.test(url)) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };
	
	  getIntercept().on('request', function(_arg) {
	    var after, args, request, type, url;
	    type = _arg.type, request = _arg.request, url = _arg.url;
	    if (shouldIgnoreURL(url)) {
	      return;
	    }
	    if (!Pace.running && (options.restartOnRequestAfter !== false || shouldTrack(type) === 'force')) {
	      args = arguments;
	      after = options.restartOnRequestAfter || 0;
	      if (typeof after === 'boolean') {
	        after = 0;
	      }
	      return setTimeout(function() {
	        var stillActive, _j, _len1, _ref2, _ref3, _results;
	        if (type === 'socket') {
	          stillActive = request.readyState < 2;
	        } else {
	          stillActive = (0 < (_ref2 = request.readyState) && _ref2 < 4);
	        }
	        if (stillActive) {
	          Pace.restart();
	          _ref3 = Pace.sources;
	          _results = [];
	          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
	            source = _ref3[_j];
	            if (source instanceof AjaxMonitor) {
	              source.watch.apply(source, args);
	              break;
	            } else {
	              _results.push(void 0);
	            }
	          }
	          return _results;
	        }
	      }, after);
	    }
	  });
	
	  AjaxMonitor = (function() {
	    function AjaxMonitor() {
	      var _this = this;
	      this.elements = [];
	      getIntercept().on('request', function() {
	        return _this.watch.apply(_this, arguments);
	      });
	    }
	
	    AjaxMonitor.prototype.watch = function(_arg) {
	      var request, tracker, type, url;
	      type = _arg.type, request = _arg.request, url = _arg.url;
	      if (shouldIgnoreURL(url)) {
	        return;
	      }
	      if (type === 'socket') {
	        tracker = new SocketRequestTracker(request);
	      } else {
	        tracker = new XHRRequestTracker(request);
	      }
	      return this.elements.push(tracker);
	    };
	
	    return AjaxMonitor;
	
	  })();
	
	  XHRRequestTracker = (function() {
	    function XHRRequestTracker(request) {
	      var event, size, _j, _len1, _onreadystatechange, _ref2,
	        _this = this;
	      this.progress = 0;
	      if (window.ProgressEvent != null) {
	        size = null;
	        request.addEventListener('progress', function(evt) {
	          if (evt.lengthComputable) {
	            return _this.progress = 100 * evt.loaded / evt.total;
	          } else {
	            return _this.progress = _this.progress + (100 - _this.progress) / 2;
	          }
	        }, false);
	        _ref2 = ['load', 'abort', 'timeout', 'error'];
	        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	          event = _ref2[_j];
	          request.addEventListener(event, function() {
	            return _this.progress = 100;
	          }, false);
	        }
	      } else {
	        _onreadystatechange = request.onreadystatechange;
	        request.onreadystatechange = function() {
	          var _ref3;
	          if ((_ref3 = request.readyState) === 0 || _ref3 === 4) {
	            _this.progress = 100;
	          } else if (request.readyState === 3) {
	            _this.progress = 50;
	          }
	          return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
	        };
	      }
	    }
	
	    return XHRRequestTracker;
	
	  })();
	
	  SocketRequestTracker = (function() {
	    function SocketRequestTracker(request) {
	      var event, _j, _len1, _ref2,
	        _this = this;
	      this.progress = 0;
	      _ref2 = ['error', 'open'];
	      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	        event = _ref2[_j];
	        request.addEventListener(event, function() {
	          return _this.progress = 100;
	        }, false);
	      }
	    }
	
	    return SocketRequestTracker;
	
	  })();
	
	  ElementMonitor = (function() {
	    function ElementMonitor(options) {
	      var selector, _j, _len1, _ref2;
	      if (options == null) {
	        options = {};
	      }
	      this.elements = [];
	      if (options.selectors == null) {
	        options.selectors = [];
	      }
	      _ref2 = options.selectors;
	      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	        selector = _ref2[_j];
	        this.elements.push(new ElementTracker(selector));
	      }
	    }
	
	    return ElementMonitor;
	
	  })();
	
	  ElementTracker = (function() {
	    function ElementTracker(selector) {
	      this.selector = selector;
	      this.progress = 0;
	      this.check();
	    }
	
	    ElementTracker.prototype.check = function() {
	      var _this = this;
	      if (document.querySelector(this.selector)) {
	        return this.done();
	      } else {
	        return setTimeout((function() {
	          return _this.check();
	        }), options.elements.checkInterval);
	      }
	    };
	
	    ElementTracker.prototype.done = function() {
	      return this.progress = 100;
	    };
	
	    return ElementTracker;
	
	  })();
	
	  DocumentMonitor = (function() {
	    DocumentMonitor.prototype.states = {
	      loading: 0,
	      interactive: 50,
	      complete: 100
	    };
	
	    function DocumentMonitor() {
	      var _onreadystatechange, _ref2,
	        _this = this;
	      this.progress = (_ref2 = this.states[document.readyState]) != null ? _ref2 : 100;
	      _onreadystatechange = document.onreadystatechange;
	      document.onreadystatechange = function() {
	        if (_this.states[document.readyState] != null) {
	          _this.progress = _this.states[document.readyState];
	        }
	        return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
	      };
	    }
	
	    return DocumentMonitor;
	
	  })();
	
	  EventLagMonitor = (function() {
	    function EventLagMonitor() {
	      var avg, interval, last, points, samples,
	        _this = this;
	      this.progress = 0;
	      avg = 0;
	      samples = [];
	      points = 0;
	      last = now();
	      interval = setInterval(function() {
	        var diff;
	        diff = now() - last - 50;
	        last = now();
	        samples.push(diff);
	        if (samples.length > options.eventLag.sampleCount) {
	          samples.shift();
	        }
	        avg = avgAmplitude(samples);
	        if (++points >= options.eventLag.minSamples && avg < options.eventLag.lagThreshold) {
	          _this.progress = 100;
	          return clearInterval(interval);
	        } else {
	          return _this.progress = 100 * (3 / (avg + 3));
	        }
	      }, 50);
	    }
	
	    return EventLagMonitor;
	
	  })();
	
	  Scaler = (function() {
	    function Scaler(source) {
	      this.source = source;
	      this.last = this.sinceLastUpdate = 0;
	      this.rate = options.initialRate;
	      this.catchup = 0;
	      this.progress = this.lastProgress = 0;
	      if (this.source != null) {
	        this.progress = result(this.source, 'progress');
	      }
	    }
	
	    Scaler.prototype.tick = function(frameTime, val) {
	      var scaling;
	      if (val == null) {
	        val = result(this.source, 'progress');
	      }
	      if (val >= 100) {
	        this.done = true;
	      }
	      if (val === this.last) {
	        this.sinceLastUpdate += frameTime;
	      } else {
	        if (this.sinceLastUpdate) {
	          this.rate = (val - this.last) / this.sinceLastUpdate;
	        }
	        this.catchup = (val - this.progress) / options.catchupTime;
	        this.sinceLastUpdate = 0;
	        this.last = val;
	      }
	      if (val > this.progress) {
	        this.progress += this.catchup * frameTime;
	      }
	      scaling = 1 - Math.pow(this.progress / 100, options.easeFactor);
	      this.progress += scaling * this.rate * frameTime;
	      this.progress = Math.min(this.lastProgress + options.maxProgressPerFrame, this.progress);
	      this.progress = Math.max(0, this.progress);
	      this.progress = Math.min(100, this.progress);
	      this.lastProgress = this.progress;
	      return this.progress;
	    };
	
	    return Scaler;
	
	  })();
	
	  sources = null;
	
	  scalers = null;
	
	  bar = null;
	
	  uniScaler = null;
	
	  animation = null;
	
	  cancelAnimation = null;
	
	  Pace.running = false;
	
	  handlePushState = function() {
	    if (options.restartOnPushState) {
	      return Pace.restart();
	    }
	  };
	
	  if (window.history.pushState != null) {
	    _pushState = window.history.pushState;
	    window.history.pushState = function() {
	      handlePushState();
	      return _pushState.apply(window.history, arguments);
	    };
	  }
	
	  if (window.history.replaceState != null) {
	    _replaceState = window.history.replaceState;
	    window.history.replaceState = function() {
	      handlePushState();
	      return _replaceState.apply(window.history, arguments);
	    };
	  }
	
	  SOURCE_KEYS = {
	    ajax: AjaxMonitor,
	    elements: ElementMonitor,
	    document: DocumentMonitor,
	    eventLag: EventLagMonitor
	  };
	
	  (init = function() {
	    var type, _j, _k, _len1, _len2, _ref2, _ref3, _ref4;
	    Pace.sources = sources = [];
	    _ref2 = ['ajax', 'elements', 'document', 'eventLag'];
	    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
	      type = _ref2[_j];
	      if (options[type] !== false) {
	        sources.push(new SOURCE_KEYS[type](options[type]));
	      }
	    }
	    _ref4 = (_ref3 = options.extraSources) != null ? _ref3 : [];
	    for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
	      source = _ref4[_k];
	      sources.push(new source(options));
	    }
	    Pace.bar = bar = new Bar;
	    scalers = [];
	    return uniScaler = new Scaler;
	  })();
	
	  Pace.stop = function() {
	    Pace.trigger('stop');
	    Pace.running = false;
	    bar.destroy();
	    cancelAnimation = true;
	    if (animation != null) {
	      if (typeof cancelAnimationFrame === "function") {
	        cancelAnimationFrame(animation);
	      }
	      animation = null;
	    }
	    return init();
	  };
	
	  Pace.restart = function() {
	    Pace.trigger('restart');
	    Pace.stop();
	    return Pace.start();
	  };
	
	  Pace.go = function() {
	    var start;
	    Pace.running = true;
	    bar.render();
	    start = now();
	    cancelAnimation = false;
	    return animation = runAnimation(function(frameTime, enqueueNextFrame) {
	      var avg, count, done, element, elements, i, j, remaining, scaler, scalerList, sum, _j, _k, _len1, _len2, _ref2;
	      remaining = 100 - bar.progress;
	      count = sum = 0;
	      done = true;
	      for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
	        source = sources[i];
	        scalerList = scalers[i] != null ? scalers[i] : scalers[i] = [];
	        elements = (_ref2 = source.elements) != null ? _ref2 : [source];
	        for (j = _k = 0, _len2 = elements.length; _k < _len2; j = ++_k) {
	          element = elements[j];
	          scaler = scalerList[j] != null ? scalerList[j] : scalerList[j] = new Scaler(element);
	          done &= scaler.done;
	          if (scaler.done) {
	            continue;
	          }
	          count++;
	          sum += scaler.tick(frameTime);
	        }
	      }
	      avg = sum / count;
	      bar.update(uniScaler.tick(frameTime, avg));
	      if (bar.done() || done || cancelAnimation) {
	        bar.update(100);
	        Pace.trigger('done');
	        return setTimeout(function() {
	          bar.finish();
	          Pace.running = false;
	          return Pace.trigger('hide');
	        }, Math.max(options.ghostTime, Math.max(options.minTime - (now() - start), 0)));
	      } else {
	        return enqueueNextFrame();
	      }
	    });
	  };
	
	  Pace.start = function(_options) {
	    extend(options, _options);
	    Pace.running = true;
	    try {
	      bar.render();
	    } catch (_error) {
	      NoTargetError = _error;
	    }
	    if (!document.querySelector('.pace')) {
	      return setTimeout(Pace.start, 50);
	    } else {
	      Pace.trigger('start');
	      return Pace.go();
	    }
	  };
	
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Pace;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = Pace;
	  } else {
	    if (options.startOnPageLoad) {
	      Pace.start();
	    }
	  }
	
	}).call(this);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Kefir = __webpack_require__(2);
	
	var obscene = __webpack_require__(1);
	var readyToParse$ = obscene.readyToParse$;
	
	module.exports.init = function () {
	  readyToParse$.onValue(function () {
	    initControls();
	  });
	};
	
	function initControls() {
	
	  var PLAY_SPEED = 10;
	
	  var isPlaying = false;
	  var isPlayingInterval;
	  var bodyHeight = $('body').height();
	  var na = 0;
	
	  var keyUpPressed = Kefir.fromEvents(document, 'keyup', function (e) {
	    e.preventDefault();
	    return e;
	  });
	
	  var backKey = keyUpPressed.filter(function (e) {
	    return e.keyCode === 38;
	  });
	  var nextKey = keyUpPressed.filter(function (e) {
	    return e.keyCode === 40;
	  });
	
	  var toggleUpClicked = Kefir.fromEvents($("#toggleUp"), 'click');
	  var toggleDownClicked = Kefir.fromEvents($("#toggleDown"), 'click');
	
	  Kefir.merge([nextKey, toggleDownClicked]).onValue(function (e) {
	    obscene.action('next');
	  });
	
	  Kefir.merge([backKey, toggleUpClicked]).onValue(function (e) {
	    obscene.action('previous');
	  });
	
	  $("#togglePlay").on('click', function (e) {
	    console.log("CLICK");
	    if (isPlaying) {
	      pause();
	    } else {
	      play();
	    }
	  });
	
	  keyUpPressed.filter(function (e) {
	    return e.keyCode === 80 || e.keyCode === 32;
	  }).onValue(function (e) {
	    if (isPlaying) {
	      pause();
	    } else {
	      play();
	    }
	  });
	
	  function play() {
	    console.log("PLAY");
	    isPlayingInterval = setInterval(function () {
	      obscene.action('next');
	    }, 5000);
	    $("#togglePlay").removeClass('fa-play').addClass('fa-pause');
	    isPlaying = true;
	  }
	
	  function pause() {
	    console.log("PAUSE");
	    clearInterval(isPlayingInterval);
	    isPlaying = false;
	    $("#togglePlay").removeClass('fa-pause').addClass('fa-play');
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _obScene = __webpack_require__(1);
	
	var _pageUtils = __webpack_require__(3);
	
	var pageUtils = _interopRequireWildcard(_pageUtils);
	
	var _constants = __webpack_require__(4);
	
	var _kefir = __webpack_require__(2);
	
	var _kefir2 = _interopRequireDefault(_kefir);
	
	var _mainLoop = __webpack_require__(8);
	
	var _mainLoop2 = _interopRequireDefault(_mainLoop);
	
	var _h = __webpack_require__(16);
	
	var _h2 = _interopRequireDefault(_h);
	
	var _template = __webpack_require__(34);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// import audioplayer from './render/audioplayer.js'
	// audioplayer.config(sceneAudioConfig)
	
	/*
	 *  Child Renders
	*/
	
	/*
	 *  Dependencies
	*/
	
	var renderWrapper = __webpack_require__(35);
	var renderScrollbar = __webpack_require__(36);
	var renderAudioPlayer = __webpack_require__(37);
	var renderVideoPlayer = __webpack_require__(41);
	var renderError = __webpack_require__(42);
	
	/*
	 *  Render
	*/
	
	// Hack to force resize once. For some
	// reason this prevents the animations from blinking on Chrome
	_obScene.scrollTopChanged$.take(1).delay(500).onValue(function () {
	  _constants.$window.trigger('resize');
	});
	
	// Render Dimensions
	_obScene.dimensionsCalculated$.onValue(function (state) {
	  _constants.$body.height(state.bodyHeight);
	  renderScrollBarFocusBars(state);
	});
	
	function renderScrollBarFocusBars(state) {
	  state.frameFocus.map(function (focus) {
	    return (focus / state.bodyHeight).toFixed(2) * 100;
	  }) // Convert to percent
	  .map(function (focusPercent) {
	    return focusPercent + "vh";
	  }) // Convert to vh
	  .map(function (focusVh) {
	    $("#experience-progress").append('<div class="center-marker" style="top:' + focusVh + '"></div>');
	  });
	}
	
	// Render Wrapper
	_obScene.wrapperChanged$.onValue(function (currentWrapper) {
	  // console.log("WRAPPER CHANGED");
	  window.requestAnimationFrame(function () {
	    $(currentWrapper[0]).hide();
	    $(currentWrapper[1]).show();
	
	    window.location.hash = currentWrapper[1];
	    // ga('send', 'scene_accessed', currentWrapper[1]) // Google Analytics
	    renderVideo(currentWrapper);
	    renderAudio(currentWrapper);
	  });
	});
	
	function showCurrentWrappers(prev, next) {
	  if (prev.currentWrapper === next.currentWrapper) {
	    return false;
	  }
	  // console.log('previous', prev, next)
	  $(prev.currentWrapper).hide();
	  $(next.currentWrapper).show();
	}
	
	function renderVideo(state) {
	
	  $('video', state[0]).animate({
	    volume: 0
	  }, 300, 'swing', function () {
	    // really stop the video
	    $(this).get(0).pause();
	  });
	
	  var $newVideo = $('video', state[1]);
	
	  if ($newVideo[0]) {
	    $newVideo[0].play();
	    $newVideo.animate({
	      volume: $newVideo.attr('max-volume') || 1
	    }, 300, 'swing');
	    renderVideoPlayer.start($newVideo);
	  } else {
	    renderVideoPlayer.stop($newVideo);
	  }
	}
	function renderAudio(state) {
	  renderAudioPlayer.next(state[1].substr(1));
	}
	
	// Render Keyframes
	
	_obScene.scrollTopChanged$.onValue(function (statediff) {
	
	  window.requestAnimationFrame(function () {
	    var prev = statediff[0];
	    var next = statediff[1];
	
	    animateElements(next);
	    animateScrollBar(next);
	    // renderMusic(next)
	  });
	});
	
	_obScene.focusChanged$.onValue(renderScroll);
	
	function renderScroll(scroll) {
	  // console.log('RENDER', scroll, Math.floor($window.scrollTop()))
	  _constants.$body.animate({
	    scrollTop: scroll
	  }, 1500, 'linear');
	}
	
	function renderMusic(wrapperId) {
	  audioplayer.next(wrapperId.substr(1));
	}
	
	function animateScrollBar(state) {
	  var percent = (state.scrollTop / state.bodyHeight).toFixed(2) * 100;
	  $('#experience-progress .progress').css({
	    'transform': 'translateY(' + percent + '%)'
	  });
	}
	
	function animateElements(state) {
	  var animation, translateY, translateX, scale, rotate, opacity;
	  for (var i = 0; i < state.keyframes[state.currentKeyframe].animations.length; i++) {
	    animation = state.keyframes[state.currentKeyframe].animations[i];
	    translateY = calcPropValue(animation, 'translateY', state);
	    translateX = calcPropValue(animation, 'translateX', state);
	    scale = calcPropValue(animation, 'scale', state);
	    rotate = calcPropValue(animation, 'rotate', state);
	    opacity = calcPropValue(animation, 'opacity', state);
	    $(animation.selector, state.currentWrapper).css({
	      'transform': 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ') rotate(' + rotate + 'deg)',
	      'opacity': opacity.toFixed(2)
	    });
	  }
	}
	
	function calcPropValue(animation, property, state) {
	  var value = animation[property];
	  if (value) {
	    value = easeInOutQuad(state.relativeScrollTop, value[0], value[1] - value[0], state.keyframes[state.currentKeyframe].duration);
	  } else {
	    value = pageUtils.getDefaultPropertyValue(property);
	  }
	  // value = +value.toFixed(2)
	  // TEMPORARILY REMOVED CAUSE SCALE DOESN'T WORK WITHA AGRESSIVE ROUNDING LIKE THIS
	  return value;
	}
	
	function getDefaultPropertyValue(property) {
	  switch (property) {
	    case 'translateX':
	      return 0;
	    case 'translateY':
	      return 0;
	    case 'scale':
	      return 1;
	    case 'rotate':
	      return 0;
	    case 'opacity':
	      return 1;
	    default:
	      return null;
	  }
	}
	
	function easeInOutQuad(t, b, c, d) {
	  //sinusoadial in and out
	  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}
	
	/*
	 *  Helpers
	*/
	
	// function throwError() {
	//   $body.addClass('page-error')
	// }
	
	function renderable(state) {
	  return (0, _h2.default)('div', { style: { position: 'fixed' } }, [(0, _h2.default)('div', [(0, _h2.default)('span', 'Hello World'), (0, _h2.default)('span', state.currentWrapper), (0, _h2.default)('span', state.scrollTop.toString() ? state.scrollTop.toString() : null)])]);
	}
	
	app(document.querySelector('body'), _obScene.calculatedCurrentState$, renderable);
	
	function app(elem, observable, render) {
	  var loop = undefined;
	  return observable.onValue(function (value) {
	    // console.log(nextVal)
	    if (loop) {
	      loop.update(value);
	    } else {
	      loop = (0, _mainLoop2.default)(value, render, {
	        diff: __webpack_require__(43),
	        create: __webpack_require__(49),
	        patch: __webpack_require__(54)
	      });
	      elem.appendChild(loop.target);
	    }
	  });
	}
	
	module.exports.app = app;
	
	// Add the core template, inluding ui elements,
	// from `./template.js` to the body
	// @returns stream when template is added
	function addCoreUI() {
	  var DOM_ID_TO_LOOK_FOR = 'experience-progress';
	  var OBSCENE_WRAPPER_ID = 'ob-scene-wrapper';
	
	  // Add UI html
	  var $mainUI = document.createElement('div');
	  $mainUI.setAttribute('id', OBSCENE_WRAPPER_ID);
	  $mainUI.innerHTML = _template2.default;
	  document.querySelector('body').appendChild($mainUI);
	
	  return _kefir2.default.stream(function (emitter) {
	    // source: http://stackoverflow.com/a/35211286
	
	    // set up the mutation observer
	    var observer = new MutationObserver(function (mutations, self) {
	      // `mutations` is an array of mutations that occurred
	      // `self` is the MutationObserver instance
	      var obsceneWrapper = document.getElementById(DOM_ID_TO_LOOK_FOR);
	      if (obsceneWrapper) {
	        emitter.emit(obsceneWrapper);
	        emitter.end();
	      }
	      return function () {
	        self.disconnect(); // stop observing
	      };
	    });
	
	    // start observing
	    observer.observe(document, {
	      childList: true,
	      subtree: true
	    });
	  });
	}
	
	module.exports.init = function () {
	  var coreUIAdded$ = addCoreUI();
	  return coreUIAdded$;
	};
	
	_obScene.readyToParse$.onValue(function (config) {
	  $('.container-inner').html(config.sceneHtmlString);
	  $('.loading').delay(300).fadeOut();
	  // audioplayer.next('intro');
	  // audioplayer.play();
	});
	
	_obScene.touchDeviceDetected$.onValue(function () {
	  $('#unsupported').show();
	  $('.container').hide();
	  $('.loading').hide();
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var raf = __webpack_require__(9)
	var TypedError = __webpack_require__(12)
	
	var InvalidUpdateInRender = TypedError({
	    type: "main-loop.invalid.update.in-render",
	    message: "main-loop: Unexpected update occurred in loop.\n" +
	        "We are currently rendering a view, " +
	            "you can't change state right now.\n" +
	        "The diff is: {stringDiff}.\n" +
	        "SUGGESTED FIX: find the state mutation in your view " +
	            "or rendering function and remove it.\n" +
	        "The view should not have any side effects.\n",
	    diff: null,
	    stringDiff: null
	})
	
	module.exports = main
	
	function main(initialState, view, opts) {
	    opts = opts || {}
	
	    var currentState = initialState
	    var create = opts.create
	    var diff = opts.diff
	    var patch = opts.patch
	    var redrawScheduled = false
	
	    var tree = opts.initialTree || view(currentState)
	    var target = opts.target || create(tree, opts)
	    var inRenderingTransaction = false
	
	    currentState = null
	
	    var loop = {
	        state: initialState,
	        target: target,
	        update: update
	    }
	    return loop
	
	    function update(state) {
	        if (inRenderingTransaction) {
	            throw InvalidUpdateInRender({
	                diff: state._diff,
	                stringDiff: JSON.stringify(state._diff)
	            })
	        }
	
	        if (currentState === null && !redrawScheduled) {
	            redrawScheduled = true
	            raf(redraw)
	        }
	
	        currentState = state
	        loop.state = state
	    }
	
	    function redraw() {
	        redrawScheduled = false
	        if (currentState === null) {
	            return
	        }
	
	        inRenderingTransaction = true
	        var newTree = view(currentState)
	
	        if (opts.createOnly) {
	            inRenderingTransaction = false
	            create(newTree, opts)
	        } else {
	            var patches = diff(tree, newTree, opts)
	            inRenderingTransaction = false
	            target = patch(target, patches, opts)
	        }
	
	        tree = newTree
	        currentState = null
	    }
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(10)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
	  , isNative = true
	
	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  isNative = false
	
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  if(!isNative) {
	    return raf.call(global, fn)
	  }
	  return raf.call(global, function() {
	    try{
	      fn.apply(this, arguments)
	    } catch(e) {
	      setTimeout(function() { throw e }, 0)
	    }
	  })
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.6.3
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/*
	//@ sourceMappingURL=performance-now.map
	*/
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var camelize = __webpack_require__(13)
	var template = __webpack_require__(14)
	var extend = __webpack_require__(15)
	
	module.exports = TypedError
	
	function TypedError(args) {
	    if (!args) {
	        throw new Error("args is required");
	    }
	    if (!args.type) {
	        throw new Error("args.type is required");
	    }
	    if (!args.message) {
	        throw new Error("args.message is required");
	    }
	
	    var message = args.message
	
	    if (args.type && !args.name) {
	        var errorName = camelize(args.type) + "Error"
	        args.name = errorName[0].toUpperCase() + errorName.substr(1)
	    }
	
	    extend(createError, args);
	    createError._name = args.name;
	
	    return createError;
	
	    function createError(opts) {
	        var result = new Error()
	
	        Object.defineProperty(result, "type", {
	            value: result.type,
	            enumerable: true,
	            writable: true,
	            configurable: true
	        })
	
	        var options = extend({}, args, opts)
	
	        extend(result, options)
	        result.message = template(message, options)
	
	        return result
	    }
	}
	


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	    if (typeof obj === 'string') return camelCase(obj);
	    return walk(obj);
	};
	
	function walk (obj) {
	    if (!obj || typeof obj !== 'object') return obj;
	    if (isDate(obj) || isRegex(obj)) return obj;
	    if (isArray(obj)) return map(obj, walk);
	    return reduce(objectKeys(obj), function (acc, key) {
	        var camel = camelCase(key);
	        acc[camel] = walk(obj[key]);
	        return acc;
	    }, {});
	}
	
	function camelCase(str) {
	    return str.replace(/[_.-](\w|$)/g, function (_,x) {
	        return x.toUpperCase();
	    });
	}
	
	var isArray = Array.isArray || function (obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	};
	
	var isDate = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object Date]';
	};
	
	var isRegex = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	var has = Object.prototype.hasOwnProperty;
	var objectKeys = Object.keys || function (obj) {
	    var keys = [];
	    for (var key in obj) {
	        if (has.call(obj, key)) keys.push(key);
	    }
	    return keys;
	};
	
	function map (xs, f) {
	    if (xs.map) return xs.map(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        res.push(f(xs[i], i));
	    }
	    return res;
	}
	
	function reduce (xs, f, acc) {
	    if (xs.reduce) return xs.reduce(f, acc);
	    for (var i = 0; i < xs.length; i++) {
	        acc = f(acc, xs[i], i);
	    }
	    return acc;
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	var nargs = /\{([0-9a-zA-Z]+)\}/g
	var slice = Array.prototype.slice
	
	module.exports = template
	
	function template(string) {
	    var args
	
	    if (arguments.length === 2 && typeof arguments[1] === "object") {
	        args = arguments[1]
	    } else {
	        args = slice.call(arguments, 1)
	    }
	
	    if (!args || !args.hasOwnProperty) {
	        args = {}
	    }
	
	    return string.replace(nargs, function replaceArg(match, i, index) {
	        var result
	
	        if (string[index - 1] === "{" &&
	            string[index + match.length] === "}") {
	            return i
	        } else {
	            result = args.hasOwnProperty(i) ? args[i] : null
	            if (result === null || result === undefined) {
	                return ""
	            }
	
	            return result
	        }
	    })
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = extend
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function extend(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var h = __webpack_require__(17)
	
	module.exports = h


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArray = __webpack_require__(18);
	
	var VNode = __webpack_require__(19);
	var VText = __webpack_require__(25);
	var isVNode = __webpack_require__(21);
	var isVText = __webpack_require__(26);
	var isWidget = __webpack_require__(22);
	var isHook = __webpack_require__(24);
	var isVThunk = __webpack_require__(23);
	
	var parseTag = __webpack_require__(27);
	var softSetHook = __webpack_require__(29);
	var evHook = __webpack_require__(30);
	
	module.exports = h;
	
	function h(tagName, properties, children) {
	    var childNodes = [];
	    var tag, props, key, namespace;
	
	    if (!children && isChildren(properties)) {
	        children = properties;
	        props = {};
	    }
	
	    props = props || properties || {};
	    tag = parseTag(tagName, props);
	
	    // support keys
	    if (props.hasOwnProperty('key')) {
	        key = props.key;
	        props.key = undefined;
	    }
	
	    // support namespace
	    if (props.hasOwnProperty('namespace')) {
	        namespace = props.namespace;
	        props.namespace = undefined;
	    }
	
	    // fix cursor bug
	    if (tag === 'INPUT' &&
	        !namespace &&
	        props.hasOwnProperty('value') &&
	        props.value !== undefined &&
	        !isHook(props.value)
	    ) {
	        props.value = softSetHook(props.value);
	    }
	
	    transformProperties(props);
	
	    if (children !== undefined && children !== null) {
	        addChild(children, childNodes, tag, props);
	    }
	
	
	    return new VNode(tag, props, childNodes, key, namespace);
	}
	
	function addChild(c, childNodes, tag, props) {
	    if (typeof c === 'string') {
	        childNodes.push(new VText(c));
	    } else if (typeof c === 'number') {
	        childNodes.push(new VText(String(c)));
	    } else if (isChild(c)) {
	        childNodes.push(c);
	    } else if (isArray(c)) {
	        for (var i = 0; i < c.length; i++) {
	            addChild(c[i], childNodes, tag, props);
	        }
	    } else if (c === null || c === undefined) {
	        return;
	    } else {
	        throw UnexpectedVirtualElement({
	            foreignObject: c,
	            parentVnode: {
	                tagName: tag,
	                properties: props
	            }
	        });
	    }
	}
	
	function transformProperties(props) {
	    for (var propName in props) {
	        if (props.hasOwnProperty(propName)) {
	            var value = props[propName];
	
	            if (isHook(value)) {
	                continue;
	            }
	
	            if (propName.substr(0, 3) === 'ev-') {
	                // add ev-foo support
	                props[propName] = evHook(value);
	            }
	        }
	    }
	}
	
	function isChild(x) {
	    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
	}
	
	function isChildren(x) {
	    return typeof x === 'string' || isArray(x) || isChild(x);
	}
	
	function UnexpectedVirtualElement(data) {
	    var err = new Error();
	
	    err.type = 'virtual-hyperscript.unexpected.virtual-element';
	    err.message = 'Unexpected virtual child passed to h().\n' +
	        'Expected a VNode / Vthunk / VWidget / string but:\n' +
	        'got:\n' +
	        errorString(data.foreignObject) +
	        '.\n' +
	        'The parent vnode is:\n' +
	        errorString(data.parentVnode)
	        '\n' +
	        'Suggested fix: change your `h(..., [ ... ])` callsite.';
	    err.foreignObject = data.foreignObject;
	    err.parentVnode = data.parentVnode;
	
	    return err;
	}
	
	function errorString(obj) {
	    try {
	        return JSON.stringify(obj, null, '    ');
	    } catch (e) {
	        return String(obj);
	    }
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	var nativeIsArray = Array.isArray
	var toString = Object.prototype.toString
	
	module.exports = nativeIsArray || isArray
	
	function isArray(obj) {
	    return toString.call(obj) === "[object Array]"
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	var isVNode = __webpack_require__(21)
	var isWidget = __webpack_require__(22)
	var isThunk = __webpack_require__(23)
	var isVHook = __webpack_require__(24)
	
	module.exports = VirtualNode
	
	var noProperties = {}
	var noChildren = []
	
	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName
	    this.properties = properties || noProperties
	    this.children = children || noChildren
	    this.key = key != null ? String(key) : undefined
	    this.namespace = (typeof namespace === "string") ? namespace : null
	
	    var count = (children && children.length) || 0
	    var descendants = 0
	    var hasWidgets = false
	    var hasThunks = false
	    var descendantHooks = false
	    var hooks
	
	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName]
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {}
	                }
	
	                hooks[propName] = property
	            }
	        }
	    }
	
	    for (var i = 0; i < count; i++) {
	        var child = children[i]
	        if (isVNode(child)) {
	            descendants += child.count || 0
	
	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true
	            }
	
	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true
	            }
	
	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }
	
	    this.count = count + descendants
	    this.hasWidgets = hasWidgets
	    this.hasThunks = hasThunks
	    this.hooks = hooks
	    this.descendantHooks = descendantHooks
	}
	
	VirtualNode.prototype.version = version
	VirtualNode.prototype.type = "VirtualNode"


/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "2"


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	
	module.exports = isVirtualNode
	
	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version
	}


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = isWidget
	
	function isWidget(w) {
	    return w && w.type === "Widget"
	}


/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = isThunk
	
	function isThunk(t) {
	    return t && t.type === "Thunk"
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = isHook
	
	function isHook(hook) {
	    return hook &&
	      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
	       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	
	module.exports = VirtualText
	
	function VirtualText(text) {
	    this.text = String(text)
	}
	
	VirtualText.prototype.version = version
	VirtualText.prototype.type = "VirtualText"


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	
	module.exports = isVirtualText
	
	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var split = __webpack_require__(28);
	
	var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
	var notClassId = /^\.|#/;
	
	module.exports = parseTag;
	
	function parseTag(tag, props) {
	    if (!tag) {
	        return 'DIV';
	    }
	
	    var noId = !(props.hasOwnProperty('id'));
	
	    var tagParts = split(tag, classIdSplit);
	    var tagName = null;
	
	    if (notClassId.test(tagParts[1])) {
	        tagName = 'DIV';
	    }
	
	    var classes, part, type, i;
	
	    for (i = 0; i < tagParts.length; i++) {
	        part = tagParts[i];
	
	        if (!part) {
	            continue;
	        }
	
	        type = part.charAt(0);
	
	        if (!tagName) {
	            tagName = part;
	        } else if (type === '.') {
	            classes = classes || [];
	            classes.push(part.substring(1, part.length));
	        } else if (type === '#' && noId) {
	            props.id = part.substring(1, part.length);
	        }
	    }
	
	    if (classes) {
	        if (props.className) {
	            classes.push(props.className);
	        }
	
	        props.className = classes.join(' ');
	    }
	
	    return props.namespace ? tagName : tagName.toUpperCase();
	}


/***/ },
/* 28 */
/***/ function(module, exports) {

	/*!
	 * Cross-Browser Split 1.1.1
	 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
	 * Available under the MIT License
	 * ECMAScript compliant, uniform cross-browser split method
	 */
	
	/**
	 * Splits a string into an array of strings using a regex or string separator. Matches of the
	 * separator are not included in the result array. However, if `separator` is a regex that contains
	 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
	 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
	 * cross-browser.
	 * @param {String} str String to split.
	 * @param {RegExp|String} separator Regex or string to use for separating the string.
	 * @param {Number} [limit] Maximum number of items to include in the result array.
	 * @returns {Array} Array of substrings.
	 * @example
	 *
	 * // Basic use
	 * split('a b c d', ' ');
	 * // -> ['a', 'b', 'c', 'd']
	 *
	 * // With limit
	 * split('a b c d', ' ', 2);
	 * // -> ['a', 'b']
	 *
	 * // Backreferences in result array
	 * split('..word1 word2..', /([a-z]+)(\d+)/i);
	 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
	 */
	module.exports = (function split(undef) {
	
	  var nativeSplit = String.prototype.split,
	    compliantExecNpcg = /()??/.exec("")[1] === undef,
	    // NPCG: nonparticipating capturing group
	    self;
	
	  self = function(str, separator, limit) {
	    // If `separator` is not a regex, use `nativeSplit`
	    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
	      return nativeSplit.call(str, separator, limit);
	    }
	    var output = [],
	      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
	      (separator.sticky ? "y" : ""),
	      // Firefox 3+
	      lastLastIndex = 0,
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      separator = new RegExp(separator.source, flags + "g"),
	      separator2, match, lastIndex, lastLength;
	    str += ""; // Type-convert
	    if (!compliantExecNpcg) {
	      // Doesn't need flags gy, but they don't hurt
	      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
	    }
	    /* Values for `limit`, per the spec:
	     * If undefined: 4294967295 // Math.pow(2, 32) - 1
	     * If 0, Infinity, or NaN: 0
	     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
	     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
	     * If other: Type-convert, then use the above rules
	     */
	    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
	    limit >>> 0; // ToUint32(limit)
	    while (match = separator.exec(str)) {
	      // `separator.lastIndex` is not reliable cross-browser
	      lastIndex = match.index + match[0].length;
	      if (lastIndex > lastLastIndex) {
	        output.push(str.slice(lastLastIndex, match.index));
	        // Fix browsers whose `exec` methods don't consistently return `undefined` for
	        // nonparticipating capturing groups
	        if (!compliantExecNpcg && match.length > 1) {
	          match[0].replace(separator2, function() {
	            for (var i = 1; i < arguments.length - 2; i++) {
	              if (arguments[i] === undef) {
	                match[i] = undef;
	              }
	            }
	          });
	        }
	        if (match.length > 1 && match.index < str.length) {
	          Array.prototype.push.apply(output, match.slice(1));
	        }
	        lastLength = match[0].length;
	        lastLastIndex = lastIndex;
	        if (output.length >= limit) {
	          break;
	        }
	      }
	      if (separator.lastIndex === match.index) {
	        separator.lastIndex++; // Avoid an infinite loop
	      }
	    }
	    if (lastLastIndex === str.length) {
	      if (lastLength || !separator.test("")) {
	        output.push("");
	      }
	    } else {
	      output.push(str.slice(lastLastIndex));
	    }
	    return output.length > limit ? output.slice(0, limit) : output;
	  };
	
	  return self;
	})();


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = SoftSetHook;
	
	function SoftSetHook(value) {
	    if (!(this instanceof SoftSetHook)) {
	        return new SoftSetHook(value);
	    }
	
	    this.value = value;
	}
	
	SoftSetHook.prototype.hook = function (node, propertyName) {
	    if (node[propertyName] !== this.value) {
	        node[propertyName] = this.value;
	    }
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var EvStore = __webpack_require__(31);
	
	module.exports = EvHook;
	
	function EvHook(value) {
	    if (!(this instanceof EvHook)) {
	        return new EvHook(value);
	    }
	
	    this.value = value;
	}
	
	EvHook.prototype.hook = function (node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);
	
	    es[propName] = this.value;
	};
	
	EvHook.prototype.unhook = function(node, propertyName) {
	    var es = EvStore(node);
	    var propName = propertyName.substr(3);
	
	    es[propName] = undefined;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var OneVersionConstraint = __webpack_require__(32);
	
	var MY_VERSION = '7';
	OneVersionConstraint('ev-store', MY_VERSION);
	
	var hashKey = '__EV_STORE_KEY@' + MY_VERSION;
	
	module.exports = EvStore;
	
	function EvStore(elem) {
	    var hash = elem[hashKey];
	
	    if (!hash) {
	        hash = elem[hashKey] = {};
	    }
	
	    return hash;
	}


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Individual = __webpack_require__(33);
	
	module.exports = OneVersion;
	
	function OneVersion(moduleName, version, defaultValue) {
	    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
	    var enforceKey = key + '_ENFORCE_SINGLETON';
	
	    var versionValue = Individual(enforceKey, version);
	
	    if (versionValue !== version) {
	        throw new Error('Can only have one copy of ' +
	            moduleName + '.\n' +
	            'You already have version ' + versionValue +
	            ' installed.\n' +
	            'This means you cannot install version ' + version);
	    }
	
	    return Individual(key, defaultValue);
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	/*global window, global*/
	
	var root = typeof window !== 'undefined' ?
	    window : typeof global !== 'undefined' ?
	    global : {};
	
	module.exports = Individual;
	
	function Individual(key, value) {
	    if (key in root) {
	        return root[key];
	    }
	
	    root[key] = value;
	
	    return value;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = "\n<style>\n  #video-progress {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 100vw;\n    height: 1vh;\n    background: black;\n    z-index: 5;\n  }\n  #video-progress .progress {\n    background: rgba(255,0,0,1);\n    width: 1vw;\n    height: 1vh;\n    /*transition: all 0.1s ease;*/\n  }\n\n  .center-marker {\n    position: fixed;\n    width: 0.5vw;\n    height: 0.5vw;\n    background: rgba(255,255,255,0.8);\n    z-index: 6;\n    right: 1vw;\n    border-radius: 3vw;\n  }\n\n\n  #experience-progress {\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vmin;\n    height: 100vh;\n    background: black;\n    z-index: 5;\n  }\n  #experience-progress .progress {\n    background: rgb(255, 255, 255);\n    opacity: 0.7;\n    width: 0.2vw;\n    height: 100vh;\n    margin-top: -100vh;\n    right: 1.15vw;\n    transition: transform 0.3s ease;\n    position: absolute;\n    border-radius: 5vw;\n  }\n\n  ::-webkit-scrollbar {\n      display: none;\n  }\n\n  .control-play {\n    position: fixed;\n    top: 3vmin;\n    right: 3vmin;\n    color: white;\n    z-index: 1;\n  }\n\n  .focus-toggles i {\n    display: block;\n    line-height: 5vmin;\n  }\n  #togglePlay {\n    font-size: 5vmin;\n    margin-right: 5vmin;\n  }\n\n  .control-play i {\n    font-size: 8vmin;\n    text-shadow: 0 0.5vmin 1vmin rgba(0,0,0,0.5);\n    line-height: 100%;\n    cursor: pointer;\n  }\n  #unsupported {\n    margin: 0 auto;\n    text-align: center;\n    margin: 50px;\n    display: none;\n  }\n\n  .loading {\n    width: 100vw;\n    height: 100vh;\n    background: black;\n    z-index: 7;\n    position: fixed;\n    text-align: center;\n    padding-top: 30vh;\n  }\n  .loading h3 {\n    font-weight: 400;\n  }\n\n\n  .pace {\n    -webkit-pointer-events: none;\n    pointer-events: none;\n\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    user-select: none;\n\n    z-index: 2000;\n    position: fixed;\n    margin: auto;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    height: 5vh;\n    width: 50vw;\n    background: transparent;\n    border: none;\n\n    overflow: hidden;\n  }\n\n  .pace .pace-progress {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -ms-box-sizing: border-box;\n    -o-box-sizing: border-box;\n    box-sizing: border-box;\n\n    -webkit-transform: translate3d(0, 0, 0);\n    -moz-transform: translate3d(0, 0, 0);\n    -ms-transform: translate3d(0, 0, 0);\n    -o-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n\n    max-width: 200px;\n    position: fixed;\n    z-index: 2000;\n    display: block;\n    position: absolute;\n    top: 0;\n    right: 100%;\n    height: 100%;\n    width: 100%;\n    background: #29d;\n  }\n\n  .pace.pace-inactive {\n    display: none;\n  }\n</style>\n\n<div class=\"loading\">\n  <h3>Experience Loading...</h3>\n</div>\n<div id=\"video-progress\">\n  <div class=\"progress\"></div>\n</div>\n<div id=\"experience-progress\">\n  <div class=\"progress\"></div>\n</div>\n<div class=\"control-play\">\n  <i class=\"fa fa-play\" id=\"togglePlay\"></i>\n  <div class='focus-toggles'>\n    <i class=\"fa fa-caret-up\" id=\"toggleUp\"></i>\n    <i class=\"fa fa-caret-down\" id=\"toggleDown\"></i>\n  </div>\n</div>\n<div class=\"container\">\n  <div class=\"background\"></div>\n  <div class=\"container-inner\"></div>\n</div>\n\n<h3 class=\"error\" style=\"display:none\">Whoops! Right now this demo doesn't handle resizing or browsers less than 1000px wide. Reload this page or get on a laptop!</h3>\n<div id=\"unsupported\">\n<span style=\"text-transform: uppercase\">Mobile experience coming soon</span>  <br><br> This interactive experience is currently only for desktops.\n</div>\n";

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	var $window = $(window);
	var $body = $('body,html');
	var $experienceIndicator = $('#experience-progress .progress');
	var $experienceProgress = $("#experience-progress");
	
	function renderScroll(scroll) {
	  console.log("RENDER", scroll, Math.floor($window.scrollTop()));
	  $body.animate({
	    scrollTop: scroll
	  }, 1500, 'linear');
	}
	
	function animateScrollBar() {
	  var percent = (scrollTop / bodyHeight).toFixed(2) * 100;
	  $experienceIndicator.css({
	    transform: 'translateY(' + percent + '%)'
	  });
	}
	
	function buildScrollBarCenters() {
	  frameFocus.map(function (center) {
	    return (center / bodyHeight).toFixed(2) * 100;
	  }).map(function (centerPercent) {
	    return centerPercent + "vh";
	  }).map(function (centerVh) {
	    $experienceProgress.append('<div class="center-marker" style="top:' + centerVh + '"></div>');
	  });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var looper = __webpack_require__(38);
	
	module.exports.next = next;
	
	module.exports.config = function (config) {
	  looper.config(config);
	};
	
	module.exports.play = function () {
	  looper.play();
	};
	
	function next(id) {
	  looper.next(id);
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Howl = __webpack_require__(39).Howl;
	
	var loops = {};
	var loop;
	
	module.exports.config = function (config) {
	  loops = config.map(function (c) {
	    var audioConfig = {
	      src: ['media/' + c.audio.src + '.mp3'],
	      html5: true,
	      volume: 0
	    };
	    return {
	      'id': c.id,
	      'vol': c.audio.max,
	      'sound1': new Howl(audioConfig),
	      'sound2': new Howl(audioConfig)
	    };
	  }).reduce(function (prev, next) {
	    prev[next.id] = next;return prev;
	  }, {});
	};
	
	module.exports.next = function (id) {
	  // console.log('next', id)
	  loop = loops[id];
	  // console.log(loop);
	};
	
	module.exports.pause = function (config) {};
	
	module.exports.play = function (config) {
	  looper();
	};
	
	module.exports.stop = function (config) {};
	
	function looper() {
	
	  'use strict';
	  // console.log('looper', loop.sound1)
	
	  var fadePercent = loop.sound1.duration() > 5 ? 0.01 : 0.015; // 2% or 1% depending on if sound is over 5 seconds
	  var faderate = 1 - fadePercent;
	  var duration = loop.sound1.duration() * 1000 * (1 - fadePercent);
	  var volume = loop.vol;
	  // console.log(faderate, fadePercent, duration, volume);
	
	  loop.sound1.play();
	  loop.sound1.fade(0, volume, duration * fadePercent);
	
	  setTimeout(function () {
	    loop.sound1.fade(volume, 0, duration * fadePercent);
	  }, duration * faderate);
	
	  setTimeout(function () {
	    loop.sound2.play();
	    loop.sound2.fade(0, volume, duration * fadePercent);
	  }, duration * faderate);
	
	  setTimeout(function () {
	    loop.sound2.fade(volume, 0, duration * fadePercent);
	    looper();
	  }, duration * 2 * faderate);
	}
	
	module.exports.loop = looper;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*! howler.js v2.0.0-beta7 | (c) 2013-2016, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
	!function(){"use strict";function e(){try{"undefined"!=typeof AudioContext?n=new AudioContext:"undefined"!=typeof webkitAudioContext?n=new webkitAudioContext:o=!1}catch(e){o=!1}if(!o)if("undefined"!=typeof Audio)try{var d=new Audio;"undefined"==typeof d.oncanplaythrough&&(u="canplay")}catch(e){t=!0}else t=!0;try{var d=new Audio;d.muted&&(t=!0)}catch(e){}var a=/iP(hone|od|ad)/.test(navigator.platform),i=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),_=i?parseInt(i[1],10):null;if(a&&_&&9>_){var s=/safari/.test(window.navigator.userAgent.toLowerCase());(window.navigator.standalone&&!s||!window.navigator.standalone&&!s)&&(o=!1)}o&&(r="undefined"==typeof n.createGain?n.createGainNode():n.createGain(),r.gain.value=1,r.connect(n.destination))}var n=null,o=!0,t=!1,r=null,u="canplaythrough";e();var d=function(){this.init()};d.prototype={init:function(){var e=this||a;return e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e.state=n?n.state||"running":"running",e.autoSuspend=!0,e._autoSuspend(),e.mobileAutoEnable=!0,e.noAudio=t,e.usingWebAudio=o,e.ctx=n,t||e._setupCodecs(),e},volume:function(e){var n=this||a;if(e=parseFloat(e),"undefined"!=typeof e&&e>=0&&1>=e){n._volume=e,o&&(r.gain.value=e);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var u=n._howls[t]._getSoundIds(),d=0;d<u.length;d++){var i=n._howls[t]._soundById(u[d]);i&&i._node&&(i._node.volume=i._volume*e)}return n}return n._volume},mute:function(e){var n=this||a;n._muted=e,o&&(r.gain.value=e?0:n._volume);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var u=n._howls[t]._getSoundIds(),d=0;d<u.length;d++){var i=n._howls[t]._soundById(u[d]);i&&i._node&&(i._node.muted=e?!0:i._muted)}return n},unload:function(){for(var o=this||a,t=o._howls.length-1;t>=0;t--)o._howls[t].unload();return o.usingWebAudio&&"undefined"!=typeof n.close&&(o.ctx=null,n.close(),e(),o.ctx=n),o},codecs:function(e){return(this||a)._codecs[e]},_setupCodecs:function(){var e=this||a,n=new Audio,o=n.canPlayType("audio/mpeg;").replace(/^no$/,""),t=/OPR\//.test(navigator.userAgent);return e._codecs={mp3:!(t||!o&&!n.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!o,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!n.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||a,o=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk/i.test(navigator.userAgent),t=!!("ontouchend"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0);if(!n||!e._mobileEnabled&&o&&t){e._mobileEnabled=!1;var r=function(){var o=n.createBuffer(1,1,22050),t=n.createBufferSource();t.buffer=o,t.connect(n.destination),"undefined"==typeof t.start?t.noteOn(0):t.start(0),t.onended=function(){t.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchend",r,!0)}};return document.addEventListener("touchend",r,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&n&&"undefined"!=typeof n.suspend&&o){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio)for(var r=0;r<e._howls[t]._sounds.length;r++)if(!e._howls[t]._sounds[r]._paused)return e;return e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",n.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(n&&"undefined"!=typeof n.resume&&o)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.state="resuming",n.resume().then(function(){e.state="running"}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var a=new d,i=function(e){var n=this;return e.src&&0!==e.src.length?void n.init(e):void console.error("An array of source files must be passed with any new Howl.")};i.prototype={init:function(e){var t=this;return t._autoplay=e.autoplay||!1,t._format="string"!=typeof e.format?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"==typeof e.preload?e.preload:!0,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._duration=0,t._loaded=!1,t._sounds=[],t._endTimers={},t._queue=[],t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._webAudio=o&&!t._html5,"undefined"!=typeof n&&n&&a.mobileAutoEnable&&a._enableMobileAudio(),a._howls.push(t),t._preload&&t.load(),t},load:function(){var e=this,n=null;if(t)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var o=0;o<e._src.length;o++){var r,u;if(e._format&&e._format[o]?r=e._format[o]:(u=e._src[o],r=/^data:audio\/([^;,]+);/i.exec(u),r||(r=/\.([^.]+)$/.exec(u.split("?",1)[0])),r&&(r=r[1].toLowerCase())),a.codecs(r)){n=e._src[o];break}}return n?(e._src=n,"https:"===window.location.protocol&&"http:"===n.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new _(e),e._webAudio&&l(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e){var o=this,t=arguments,r=null;if("number"==typeof e)r=e,e=null;else if("undefined"==typeof e){e="__default";for(var d=0,i=0;i<o._sounds.length;i++)o._sounds[i]._paused&&!o._sounds[i]._ended&&(d++,r=o._sounds[i]._id);1===d?e=null:r=null}var _=r?o._soundById(r):o._inactiveSound();if(!_)return null;if(r&&!e&&(e=_._sprite||"__default"),!o._loaded&&!o._sprite[e])return o._queue.push({event:"play",action:function(){o.play(o._soundById(_._id)?_._id:void 0)}}),_._id;if(r&&!_._paused)return _._id;o._webAudio&&a._autoResume();var s=_._seek>0?_._seek:o._sprite[e][0]/1e3,l=(o._sprite[e][0]+o._sprite[e][1])/1e3-s,f=1e3*l/Math.abs(_._rate);f!==1/0&&(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),_._paused=!1,_._ended=!1,_._sprite=e,_._seek=s,_._start=o._sprite[e][0]/1e3,_._stop=(o._sprite[e][0]+o._sprite[e][1])/1e3,_._loop=!(!_._loop&&!o._sprite[e][2]);var c=_._node;if(o._webAudio){var p=function(){o._refreshBuffer(_);var e=_._muted||o._muted?0:_._volume*a.volume();c.gain.setValueAtTime(e,n.currentTime),_._playStart=n.currentTime,"undefined"==typeof c.bufferSource.start?_._loop?c.bufferSource.noteGrainOn(0,s,86400):c.bufferSource.noteGrainOn(0,s,l):_._loop?c.bufferSource.start(0,s,86400):c.bufferSource.start(0,s,l),o._endTimers[_._id]||f===1/0||(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),t[1]||setTimeout(function(){o._emit("play",_._id)},0)};o._loaded?p():(o.once("load",p,_._id),o._clearTimer(_._id))}else{var m=function(){c.currentTime=s,c.muted=_._muted||o._muted||a._muted||c.muted,c.volume=_._volume*a.volume(),c.playbackRate=_._rate,setTimeout(function(){c.play(),t[1]||o._emit("play",_._id)},0)};if(4===c.readyState||!c.readyState&&navigator.isCocoonJS)m();else{var v=function(){f!==1/0&&(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),m(),c.removeEventListener(u,v,!1)};c.addEventListener(u,v,!1),o._clearTimer(_._id)}}return _._id},pause:function(e){var n=this;if(!n._loaded)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused){if(r._seek=n.seek(o[t]),r._paused=!0,n._stopFade(o[t]),r._node)if(n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),r._node.bufferSource=null}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r._id)}}return n},stop:function(e){var n=this;if(!n._loaded)return"undefined"!=typeof n._sounds[0]._sprite&&n._queue.push({event:"stop",action:function(){n.stop(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused){if(r._seek=r._start||0,r._paused=!0,r._ended=!0,n._stopFade(o[t]),r._node)if(n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),r._node.bufferSource=null}else isNaN(r._node.duration)&&r._node.duration!==1/0||(r._node.pause(),r._node.currentTime=r._start||0);n._emit("stop",r._id)}}return n},mute:function(e,o){var t=this;if(!t._loaded)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if("undefined"==typeof o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),u=0;u<r.length;u++){var d=t._soundById(r[u]);d&&(d._muted=e,t._webAudio&&d._node?d._node.gain.setValueAtTime(e?0:d._volume*a.volume(),n.currentTime):d._node&&(d._node.muted=a._muted?!0:e),t._emit("mute",d._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length){var u=t._getSoundIds(),d=u.indexOf(r[0]);d>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var i;if(!("undefined"!=typeof e&&e>=0&&1>=e))return i=o?t._soundById(o):t._sounds[0],i?i._volume:0;if(!t._loaded)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;"undefined"==typeof o&&(t._volume=e),o=t._getSoundIds(o);for(var _=0;_<o.length;_++)i=t._soundById(o[_]),i&&(i._volume=e,r[2]||t._stopFade(o[_]),t._webAudio&&i._node&&!i._muted?i._node.gain.setValueAtTime(e*a.volume(),n.currentTime):i._node&&!i._muted&&(i._node.volume=e*a.volume()),t._emit("volume",i._id));return t},fade:function(e,o,t,r){var u=this;if(!u._loaded)return u._queue.push({event:"fade",action:function(){u.fade(e,o,t,r)}}),u;u.volume(e,r);for(var d=u._getSoundIds(r),a=0;a<d.length;a++){var i=u._soundById(d[a]);if(i)if(r||u._stopFade(d[a]),u._webAudio&&!i._muted){var _=n.currentTime,s=_+t/1e3;i._volume=e,i._node.gain.setValueAtTime(e,_),i._node.gain.linearRampToValueAtTime(o,s),i._timeout=setTimeout(function(e,t){delete t._timeout,setTimeout(function(){t._volume=o,u._emit("fade",e)},s-n.currentTime>0?Math.ceil(1e3*(s-n.currentTime)):0)}.bind(u,d[a],i),t)}else{var l=Math.abs(e-o),f=e>o?"out":"in",c=l/.01,p=t/c;!function(){var n=e;i._interval=setInterval(function(e,t){n+="in"===f?.01:-.01,n=Math.max(0,n),n=Math.min(1,n),n=Math.round(100*n)/100,u.volume(n,e,!0),n===o&&(clearInterval(t._interval),delete t._interval,u._emit("fade",e))}.bind(u,d[a],i),p)}()}}return u},_stopFade:function(e){var o=this,t=o._soundById(e);return t._interval?(clearInterval(t._interval),delete t._interval,o._emit("fade",e)):t._timeout&&(clearTimeout(t._timeout),delete t._timeout,t._node.gain.cancelScheduledValues(n.currentTime),o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return o=t._soundById(parseInt(r[0],10)),o?o._loop:!1;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var u=t._getSoundIds(n),d=0;d<u.length;d++)o=t._soundById(u[d]),o&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e));return t},rate:function(){var e,n,o=this,t=arguments;if(0===t.length)n=o._sounds[0]._id;else if(1===t.length){var r=o._getSoundIds(),u=r.indexOf(t[0]);u>=0?n=parseInt(t[0],10):e=parseFloat(t[0])}else 2===t.length&&(e=parseFloat(t[0]),n=parseInt(t[1],10));var d;if("number"!=typeof e)return d=o._soundById(n),d?d._rate:o._rate;if(!o._loaded)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,t)}}),o;"undefined"==typeof n&&(o._rate=e),n=o._getSoundIds(n);for(var a=0;a<n.length;a++)if(d=o._soundById(n[a])){d._rate=e,o._webAudio&&d._node&&d._node.bufferSource?d._node.bufferSource.playbackRate.value=e:d._node&&(d._node.playbackRate=e);var i=o.seek(n[a]),_=(o._sprite[d._sprite][0]+o._sprite[d._sprite][1])/1e3-i,s=1e3*_/Math.abs(d._rate);o._clearTimer(n[a]),o._endTimers[n[a]]=setTimeout(o._ended.bind(o,d),s),o._emit("rate",d._id)}return o},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var u=t._getSoundIds(),d=u.indexOf(r[0]);d>=0?o=parseInt(r[0],10):(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if("undefined"==typeof o)return t;if(!t._loaded)return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var a=t._soundById(o);if(a){if(!(e>=0))return t._webAudio?a._seek+(t.playing(o)?n.currentTime-a._playStart:0):a._node.currentTime;var i=t.playing(o);i&&t.pause(o,!0),a._seek=e,t._clearTimer(o),i&&t.play(o,!0),t._emit("seek",o)}return t},playing:function(e){var n=this,o=n._soundById(e)||n._sounds[0];return o?!o._paused:!1},duration:function(){return this._duration},unload:function(){for(var e=this,n=e._sounds,o=0;o<n.length;o++){n[o]._paused||(e.stop(n[o]._id),e._emit("end",n[o]._id)),e._webAudio||(n[o]._node.src="",n[o]._node.removeEventListener("error",n[o]._errorFn,!1),n[o]._node.removeEventListener(u,n[o]._loadFn,!1)),delete n[o]._node,e._clearTimer(n[o]._id);var t=a._howls.indexOf(e);t>=0&&a._howls.splice(t,1)}return s&&delete s[e._src],e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,u=r["_on"+e];return"function"==typeof n&&u.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e];if(n){for(var u=0;u<r.length;u++)if(n===r[u].fn&&o===r[u].id){r.splice(u,1);break}}else if(e)t["_on"+e]=[];else for(var d=Object.keys(t),u=0;u<d.length;u++)0===d[u].indexOf("_on")&&Array.isArray(t[d[u]])&&(t[d[u]]=[]);return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],u=r.length-1;u>=0;u--)r[u].id&&r[u].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[u].fn),0),r[u].once&&t.off(e,r[u].fn,r[u].id));return t},_loadQueue:function(){var e=this;if(e._queue.length>0){var n=e._queue[0];e.once(n.event,function(){e._queue.shift(),e._loadQueue()}),n.action()}return e},_ended:function(e){var o=this,t=e._sprite,r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._playStart=n.currentTime;var u=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),u)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,o._clearTimer(e._id),e._node.bufferSource=null,a._autoSuspend()),o._webAudio||r||o.stop(e._id),o},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new _(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(n>=o)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if("undefined"==typeof e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.createBufferSource(),e._node.bufferSource.buffer=s[o._src],e._node.bufferSource.connect(e._panner?e._panner:e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=o._rate,o}};var _=function(e){this._parent=e,this.init()};if(_.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),n._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=a._muted||e._muted||e._parent._muted?0:e._volume*a.volume();return o._webAudio?(e._node="undefined"==typeof n.createGain?n.createGainNode():n.createGain(),e._node.gain.setValueAtTime(t,n.currentTime),e._node.paused=!0,e._node.connect(r)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(u,e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t,e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),e},_errorListener:function(){var e=this;e._node.error&&4===e._node.error.code&&(a.noAudio=!0),e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorListener,!1)},_loadListener:function(){var e=this,n=e._parent;n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),n._loaded||(n._loaded=!0,n._emit("load"),n._loadQueue()),n._autoplay&&n.play(),e._node.removeEventListener(u,e._loadFn,!1)}},o)var s={},l=function(e){var n=e._src;if(s[n])return e._duration=s[n].duration,void p(e);if(/^data:[^;]+;base64,/.test(n)){window.atob=window.atob||function(e){for(var n,o,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r=String(e).replace(/=+$/,""),u=0,d=0,a="";o=r.charAt(d++);~o&&(n=u%4?64*n+o:o,u++%4)?a+=String.fromCharCode(255&n>>(-2*u&6)):0)o=t.indexOf(o);return a};for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),r=0;r<o.length;++r)t[r]=o.charCodeAt(r);c(t.buffer,e)}else{var u=new XMLHttpRequest;u.open("GET",n,!0),u.responseType="arraybuffer",u.onload=function(){c(u.response,e)},u.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete s[n],e.load())},f(u)}},f=function(e){try{e.send()}catch(n){e.onerror()}},c=function(e,o){n.decodeAudioData(e,function(e){e&&o._sounds.length>0&&(s[o._src]=e,p(o,e))},function(){o._emit("loaderror",null,"Decoding audio data failed.")})},p=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e._emit("load"),e._loadQueue()),e._autoplay&&e.play()};"function"=="function"&&__webpack_require__(40)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return{Howler:a,Howl:i}}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),"undefined"!=typeof exports&&(exports.Howler=a,exports.Howl=i),"undefined"!=typeof window?(window.HowlerGlobal=d,window.Howler=a,window.Howl=i,window.Sound=_):"undefined"!=typeof global&&(global.HowlerGlobal=d,global.Howler=a,global.Howl=i,global.Sound=_)}();
	/*! Effects Plugin */
	!function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype._velocity=[0,0,0],HowlerGlobal.prototype._listenerAttr={dopplerFactor:1,speedOfSound:343.3},HowlerGlobal.prototype.pos=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._pos[1]:n,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof e?o._pos:(o._pos=[e,n,t],o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,n,t,o,r,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;var p=a._orientation;return n="number"!=typeof n?p[1]:n,t="number"!=typeof t?p[2]:t,o="number"!=typeof o?p[3]:o,r="number"!=typeof r?p[4]:r,i="number"!=typeof i?p[5]:i,"number"!=typeof e?p:(a._orientation=[e,n,t,o,r,i],a.ctx.listener.setOrientation(e,n,t,o,r,i),a)},HowlerGlobal.prototype.velocity=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._velocity[1]:n,t="number"!=typeof t?o._velocity[2]:t,"number"!=typeof e?o._velocity:(o._velocity=[e,n,t],o.ctx.listener.setVelocity(o._velocity[0],o._velocity[1],o._velocity[2]),o)):o},HowlerGlobal.prototype.listenerAttr=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;var t=n._listenerAttr;return e?(n._listenerAttr={dopplerFactor:"undefined"!=typeof e.dopplerFactor?e.dopplerFactor:t.dopplerFactor,speedOfSound:"undefined"!=typeof e.speedOfSound?e.speedOfSound:t.speedOfSound},n.ctx.listener.dopplerFactor=t.dopplerFactor,n.ctx.listener.speedOfSound=t.speedOfSound,n):t},Howl.prototype.init=function(e){return function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._pos=n.pos||null,t._velocity=n.velocity||[0,0,0],t._pannerAttr={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:0,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:"inverse",maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:1e4,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:"HRTF",refDistance:"undefined"!=typeof n.refDistance?n.refDistance:1,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:1},e.call(this,n)}}(Howl.prototype.init),Howl.prototype.pos=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.pos(n,t,o,r)}),i;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,"undefined"==typeof r){if("number"!=typeof n)return i._pos;i._pos=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._pos;l._pos=[n,t,o],l._node&&(l._panner||e(l),l._panner.setPosition(n,t,o))}}return i},Howl.prototype.orientation=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.orientation(n,t,o,r)}),i;if(t="number"!=typeof t?i._orientation[1]:t,o="number"!=typeof o?i._orientation[2]:o,"undefined"==typeof r){if("number"!=typeof n)return i._orientation;i._orientation=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._orientation;l._orientation=[n,t,o],l._node&&(l._panner||e(l),l._panner.setOrientation(n,t,o))}}return i},Howl.prototype.velocity=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.velocity(n,t,o,r)}),i;if(t="number"!=typeof t?i._velocity[1]:t,o="number"!=typeof o?i._velocity[2]:o,"undefined"==typeof r){if("number"!=typeof n)return i._velocity;i._velocity=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._velocity;l._velocity=[n,t,o],l._node&&(l._panner||e(l),l._panner.setVelocity(n,t,o))}}return i},Howl.prototype.pannerAttr=function(){var n,t,o,r=this,i=arguments;if(!r._webAudio)return r;if(0===i.length)return r._pannerAttr;if(1===i.length){if("object"!=typeof i[0])return o=r._soundById(parseInt(i[0],10)),o?o._pannerAttr:r._pannerAttr;n=i[0],"undefined"==typeof t&&(r._pannerAttr={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:r._coneOuterAngle,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:r._coneOuterGain,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:r._distanceModel,maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:r._maxDistance,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:r._panningModel,refDistance:"undefined"!=typeof n.refDistance?n.refDistance:r._refDistance,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:r._rolloffFactor})}else 2===i.length&&(n=i[0],t=parseInt(i[1],10));for(var a=r._getSoundIds(t),p=0;p<a.length;p++)if(o=r._soundById(a[p])){var l=o._pannerAttr;l={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:l.coneInnerAngle,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:l.coneOuterAngle,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:l.coneOuterGain,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:l.distanceModel,maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:l.maxDistance,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:l.panningModel,refDistance:"undefined"!=typeof n.refDistance?n.refDistance:l.refDistance,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:l.rolloffFactor};var c=o._panner;c?(c.coneInnerAngle=l.coneInnerAngle,c.coneOuterAngle=l.coneOuterAngle,c.coneOuterGain=l.coneOuterGain,c.distanceModel=l.distanceModel,c.maxDistance=l.maxDistance,c.panningModel=l.panningModel,c.refDistance=l.refDistance,c.rolloffFactor=l.rolloffFactor):(o._pos||(o._pos=r._pos||[0,0,-.5]),e(o))}return r},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._pos=t._pos,n._velocity=t._velocity,n._pannerAttr=t._pannerAttr,e.call(this),n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._pos=t._pos,n._velocity=t._velocity,n._pannerAttr=t._pannerAttr,e.call(this)}}(Sound.prototype.reset);var e=function(e){e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.panningModel=e._pannerAttr.panningModel,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2]),e._panner.setVelocity(e._velocity[0],e._velocity[1],e._velocity[2]),e._panner.connect(e._node),e._paused||e._parent.pause(e._id).play(e._id)}}();
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 40 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	var $videoIndicator = $('#video-progress .progress');
	var videoPlaying;
	var $el;
	
	$videoIndicator.hide();
	module.exports.start = function ($newVideo) {
	  $el = $newVideo[0];
	  $videoIndicator.show();
	  videoPlaying = true;
	  loop();
	};
	
	module.exports.stop = function () {
	  videoPlaying = false;
	  $('#video-progress .progress').hide();
	};
	
	function loop() {
	  window.requestAnimationFrame(function () {
	    var rate = $el.currentTime / $el.duration;
	    var percent = (rate * 100).toFixed(2);
	    $videoIndicator.css({ 'width': percent + 'vw' });
	    if (videoPlaying) {
	      setTimeout(function () {
	        loop();
	      }, 41);
	    }
	  });
	}

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var diff = __webpack_require__(44)
	
	module.exports = diff


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(18)
	
	var VPatch = __webpack_require__(45)
	var isVNode = __webpack_require__(21)
	var isVText = __webpack_require__(26)
	var isWidget = __webpack_require__(22)
	var isThunk = __webpack_require__(23)
	var handleThunk = __webpack_require__(46)
	
	var diffProps = __webpack_require__(47)
	
	module.exports = diff
	
	function diff(a, b) {
	    var patch = { a: a }
	    walk(a, b, patch, 0)
	    return patch
	}
	
	function walk(a, b, patch, index) {
	    if (a === b) {
	        return
	    }
	
	    var apply = patch[index]
	    var applyClear = false
	
	    if (isThunk(a) || isThunk(b)) {
	        thunks(a, b, patch, index)
	    } else if (b == null) {
	
	        // If a is a widget we will add a remove patch for it
	        // Otherwise any child widgets/hooks must be destroyed.
	        // This prevents adding two remove patches for a widget.
	        if (!isWidget(a)) {
	            clearState(a, patch, index)
	            apply = patch[index]
	        }
	
	        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
	    } else if (isVNode(b)) {
	        if (isVNode(a)) {
	            if (a.tagName === b.tagName &&
	                a.namespace === b.namespace &&
	                a.key === b.key) {
	                var propsPatch = diffProps(a.properties, b.properties)
	                if (propsPatch) {
	                    apply = appendPatch(apply,
	                        new VPatch(VPatch.PROPS, a, propsPatch))
	                }
	                apply = diffChildren(a, b, patch, apply, index)
	            } else {
	                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	                applyClear = true
	            }
	        } else {
	            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	            applyClear = true
	        }
	    } else if (isVText(b)) {
	        if (!isVText(a)) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	            applyClear = true
	        } else if (a.text !== b.text) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	        }
	    } else if (isWidget(b)) {
	        if (!isWidget(a)) {
	            applyClear = true
	        }
	
	        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
	    }
	
	    if (apply) {
	        patch[index] = apply
	    }
	
	    if (applyClear) {
	        clearState(a, patch, index)
	    }
	}
	
	function diffChildren(a, b, patch, apply, index) {
	    var aChildren = a.children
	    var orderedSet = reorder(aChildren, b.children)
	    var bChildren = orderedSet.children
	
	    var aLen = aChildren.length
	    var bLen = bChildren.length
	    var len = aLen > bLen ? aLen : bLen
	
	    for (var i = 0; i < len; i++) {
	        var leftNode = aChildren[i]
	        var rightNode = bChildren[i]
	        index += 1
	
	        if (!leftNode) {
	            if (rightNode) {
	                // Excess nodes in b need to be added
	                apply = appendPatch(apply,
	                    new VPatch(VPatch.INSERT, null, rightNode))
	            }
	        } else {
	            walk(leftNode, rightNode, patch, index)
	        }
	
	        if (isVNode(leftNode) && leftNode.count) {
	            index += leftNode.count
	        }
	    }
	
	    if (orderedSet.moves) {
	        // Reorder nodes last
	        apply = appendPatch(apply, new VPatch(
	            VPatch.ORDER,
	            a,
	            orderedSet.moves
	        ))
	    }
	
	    return apply
	}
	
	function clearState(vNode, patch, index) {
	    // TODO: Make this a single walk, not two
	    unhook(vNode, patch, index)
	    destroyWidgets(vNode, patch, index)
	}
	
	// Patch records for all destroyed widgets must be added because we need
	// a DOM node reference for the destroy function
	function destroyWidgets(vNode, patch, index) {
	    if (isWidget(vNode)) {
	        if (typeof vNode.destroy === "function") {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(VPatch.REMOVE, vNode, null)
	            )
	        }
	    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
	        var children = vNode.children
	        var len = children.length
	        for (var i = 0; i < len; i++) {
	            var child = children[i]
	            index += 1
	
	            destroyWidgets(child, patch, index)
	
	            if (isVNode(child) && child.count) {
	                index += child.count
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}
	
	// Create a sub-patch for thunks
	function thunks(a, b, patch, index) {
	    var nodes = handleThunk(a, b)
	    var thunkPatch = diff(nodes.a, nodes.b)
	    if (hasPatches(thunkPatch)) {
	        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
	    }
	}
	
	function hasPatches(patch) {
	    for (var index in patch) {
	        if (index !== "a") {
	            return true
	        }
	    }
	
	    return false
	}
	
	// Execute hooks when two nodes are identical
	function unhook(vNode, patch, index) {
	    if (isVNode(vNode)) {
	        if (vNode.hooks) {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(
	                    VPatch.PROPS,
	                    vNode,
	                    undefinedKeys(vNode.hooks)
	                )
	            )
	        }
	
	        if (vNode.descendantHooks || vNode.hasThunks) {
	            var children = vNode.children
	            var len = children.length
	            for (var i = 0; i < len; i++) {
	                var child = children[i]
	                index += 1
	
	                unhook(child, patch, index)
	
	                if (isVNode(child) && child.count) {
	                    index += child.count
	                }
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}
	
	function undefinedKeys(obj) {
	    var result = {}
	
	    for (var key in obj) {
	        result[key] = undefined
	    }
	
	    return result
	}
	
	// List diff, naive left to right reordering
	function reorder(aChildren, bChildren) {
	    // O(M) time, O(M) memory
	    var bChildIndex = keyIndex(bChildren)
	    var bKeys = bChildIndex.keys
	    var bFree = bChildIndex.free
	
	    if (bFree.length === bChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }
	
	    // O(N) time, O(N) memory
	    var aChildIndex = keyIndex(aChildren)
	    var aKeys = aChildIndex.keys
	    var aFree = aChildIndex.free
	
	    if (aFree.length === aChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }
	
	    // O(MAX(N, M)) memory
	    var newChildren = []
	
	    var freeIndex = 0
	    var freeCount = bFree.length
	    var deletedItems = 0
	
	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var i = 0 ; i < aChildren.length; i++) {
	        var aItem = aChildren[i]
	        var itemIndex
	
	        if (aItem.key) {
	            if (bKeys.hasOwnProperty(aItem.key)) {
	                // Match up the old keys
	                itemIndex = bKeys[aItem.key]
	                newChildren.push(bChildren[itemIndex])
	
	            } else {
	                // Remove old keyed items
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        } else {
	            // Match the item in a with the next free item in b
	            if (freeIndex < freeCount) {
	                itemIndex = bFree[freeIndex++]
	                newChildren.push(bChildren[itemIndex])
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        }
	    }
	
	    var lastFreeIndex = freeIndex >= bFree.length ?
	        bChildren.length :
	        bFree[freeIndex]
	
	    // Iterate through b and append any new keys
	    // O(M) time
	    for (var j = 0; j < bChildren.length; j++) {
	        var newItem = bChildren[j]
	
	        if (newItem.key) {
	            if (!aKeys.hasOwnProperty(newItem.key)) {
	                // Add any new keyed items
	                // We are adding new items to the end and then sorting them
	                // in place. In future we should insert new items in place.
	                newChildren.push(newItem)
	            }
	        } else if (j >= lastFreeIndex) {
	            // Add any leftover non-keyed items
	            newChildren.push(newItem)
	        }
	    }
	
	    var simulate = newChildren.slice()
	    var simulateIndex = 0
	    var removes = []
	    var inserts = []
	    var simulateItem
	
	    for (var k = 0; k < bChildren.length;) {
	        var wantedItem = bChildren[k]
	        simulateItem = simulate[simulateIndex]
	
	        // remove items
	        while (simulateItem === null && simulate.length) {
	            removes.push(remove(simulate, simulateIndex, null))
	            simulateItem = simulate[simulateIndex]
	        }
	
	        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	            // if we need a key in this position...
	            if (wantedItem.key) {
	                if (simulateItem && simulateItem.key) {
	                    // if an insert doesn't put this key in place, it needs to move
	                    if (bKeys[simulateItem.key] !== k + 1) {
	                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
	                        simulateItem = simulate[simulateIndex]
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	                            inserts.push({key: wantedItem.key, to: k})
	                        }
	                        // items are matching, so skip ahead
	                        else {
	                            simulateIndex++
	                        }
	                    }
	                    else {
	                        inserts.push({key: wantedItem.key, to: k})
	                    }
	                }
	                else {
	                    inserts.push({key: wantedItem.key, to: k})
	                }
	                k++
	            }
	            // a key in simulate has no matching wanted key, remove it
	            else if (simulateItem && simulateItem.key) {
	                removes.push(remove(simulate, simulateIndex, simulateItem.key))
	            }
	        }
	        else {
	            simulateIndex++
	            k++
	        }
	    }
	
	    // remove all the remaining nodes from simulate
	    while(simulateIndex < simulate.length) {
	        simulateItem = simulate[simulateIndex]
	        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
	    }
	
	    // If the only moves we have are deletes then we can just
	    // let the delete patch remove these items.
	    if (removes.length === deletedItems && !inserts.length) {
	        return {
	            children: newChildren,
	            moves: null
	        }
	    }
	
	    return {
	        children: newChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    }
	}
	
	function remove(arr, index, key) {
	    arr.splice(index, 1)
	
	    return {
	        from: index,
	        key: key
	    }
	}
	
	function keyIndex(children) {
	    var keys = {}
	    var free = []
	    var length = children.length
	
	    for (var i = 0; i < length; i++) {
	        var child = children[i]
	
	        if (child.key) {
	            keys[child.key] = i
	        } else {
	            free.push(i)
	        }
	    }
	
	    return {
	        keys: keys,     // A hash of key name to index
	        free: free      // An array of unkeyed item indices
	    }
	}
	
	function appendPatch(apply, patch) {
	    if (apply) {
	        if (isArray(apply)) {
	            apply.push(patch)
	        } else {
	            apply = [apply, patch]
	        }
	
	        return apply
	    } else {
	        return patch
	    }
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var version = __webpack_require__(20)
	
	VirtualPatch.NONE = 0
	VirtualPatch.VTEXT = 1
	VirtualPatch.VNODE = 2
	VirtualPatch.WIDGET = 3
	VirtualPatch.PROPS = 4
	VirtualPatch.ORDER = 5
	VirtualPatch.INSERT = 6
	VirtualPatch.REMOVE = 7
	VirtualPatch.THUNK = 8
	
	module.exports = VirtualPatch
	
	function VirtualPatch(type, vNode, patch) {
	    this.type = Number(type)
	    this.vNode = vNode
	    this.patch = patch
	}
	
	VirtualPatch.prototype.version = version
	VirtualPatch.prototype.type = "VirtualPatch"


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var isVNode = __webpack_require__(21)
	var isVText = __webpack_require__(26)
	var isWidget = __webpack_require__(22)
	var isThunk = __webpack_require__(23)
	
	module.exports = handleThunk
	
	function handleThunk(a, b) {
	    var renderedA = a
	    var renderedB = b
	
	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a)
	    }
	
	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null)
	    }
	
	    return {
	        a: renderedA,
	        b: renderedB
	    }
	}
	
	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode
	
	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous)
	    }
	
	    if (!(isVNode(renderedThunk) ||
	            isVText(renderedThunk) ||
	            isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }
	
	    return renderedThunk
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(48)
	var isHook = __webpack_require__(24)
	
	module.exports = diffProps
	
	function diffProps(a, b) {
	    var diff
	
	    for (var aKey in a) {
	        if (!(aKey in b)) {
	            diff = diff || {}
	            diff[aKey] = undefined
	        }
	
	        var aValue = a[aKey]
	        var bValue = b[aKey]
	
	        if (aValue === bValue) {
	            continue
	        } else if (isObject(aValue) && isObject(bValue)) {
	            if (getPrototype(bValue) !== getPrototype(aValue)) {
	                diff = diff || {}
	                diff[aKey] = bValue
	            } else if (isHook(bValue)) {
	                 diff = diff || {}
	                 diff[aKey] = bValue
	            } else {
	                var objectDiff = diffProps(aValue, bValue)
	                if (objectDiff) {
	                    diff = diff || {}
	                    diff[aKey] = objectDiff
	                }
	            }
	        } else {
	            diff = diff || {}
	            diff[aKey] = bValue
	        }
	    }
	
	    for (var bKey in b) {
	        if (!(bKey in a)) {
	            diff = diff || {}
	            diff[bKey] = b[bKey]
	        }
	    }
	
	    return diff
	}
	
	function getPrototype(value) {
	  if (Object.getPrototypeOf) {
	    return Object.getPrototypeOf(value)
	  } else if (value.__proto__) {
	    return value.__proto__
	  } else if (value.constructor) {
	    return value.constructor.prototype
	  }
	}


/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var createElement = __webpack_require__(50)
	
	module.exports = createElement


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(51)
	
	var applyProperties = __webpack_require__(53)
	
	var isVNode = __webpack_require__(21)
	var isVText = __webpack_require__(26)
	var isWidget = __webpack_require__(22)
	var handleThunk = __webpack_require__(46)
	
	module.exports = createElement
	
	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document
	    var warn = opts ? opts.warn : null
	
	    vnode = handleThunk(vnode).a
	
	    if (isWidget(vnode)) {
	        return vnode.init()
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text)
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode)
	        }
	        return null
	    }
	
	    var node = (vnode.namespace === null) ?
	        doc.createElement(vnode.tagName) :
	        doc.createElementNS(vnode.namespace, vnode.tagName)
	
	    var props = vnode.properties
	    applyProperties(node, props)
	
	    var children = vnode.children
	
	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts)
	        if (childNode) {
	            node.appendChild(childNode)
	        }
	    }
	
	    return node
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = __webpack_require__(52);
	
	if (typeof document !== 'undefined') {
	    module.exports = document;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
	
	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }
	
	    module.exports = doccy;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 52 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(48)
	var isHook = __webpack_require__(24)
	
	module.exports = applyProperties
	
	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName]
	
	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous)
	            if (propValue.hook) {
	                propValue.hook(node,
	                    propName,
	                    previous ? previous[propName] : undefined)
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue
	            }
	        }
	    }
	}
	
	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName]
	
	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName)
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = ""
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = ""
	            } else {
	                node[propName] = null
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue)
	        }
	    }
	}
	
	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined
	
	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName]
	
	            if (attrValue === undefined) {
	                node.removeAttribute(attrName)
	            } else {
	                node.setAttribute(attrName, attrValue)
	            }
	        }
	
	        return
	    }
	
	    if(previousValue && isObject(previousValue) &&
	        getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue
	        return
	    }
	
	    if (!isObject(node[propName])) {
	        node[propName] = {}
	    }
	
	    var replacer = propName === "style" ? "" : undefined
	
	    for (var k in propValue) {
	        var value = propValue[k]
	        node[propName][k] = (value === undefined) ? replacer : value
	    }
	}
	
	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value)
	    } else if (value.__proto__) {
	        return value.__proto__
	    } else if (value.constructor) {
	        return value.constructor.prototype
	    }
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var patch = __webpack_require__(55)
	
	module.exports = patch


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var document = __webpack_require__(51)
	var isArray = __webpack_require__(18)
	
	var render = __webpack_require__(50)
	var domIndex = __webpack_require__(56)
	var patchOp = __webpack_require__(57)
	module.exports = patch
	
	function patch(rootNode, patches, renderOptions) {
	    renderOptions = renderOptions || {}
	    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
	        ? renderOptions.patch
	        : patchRecursive
	    renderOptions.render = renderOptions.render || render
	
	    return renderOptions.patch(rootNode, patches, renderOptions)
	}
	
	function patchRecursive(rootNode, patches, renderOptions) {
	    var indices = patchIndices(patches)
	
	    if (indices.length === 0) {
	        return rootNode
	    }
	
	    var index = domIndex(rootNode, patches.a, indices)
	    var ownerDocument = rootNode.ownerDocument
	
	    if (!renderOptions.document && ownerDocument !== document) {
	        renderOptions.document = ownerDocument
	    }
	
	    for (var i = 0; i < indices.length; i++) {
	        var nodeIndex = indices[i]
	        rootNode = applyPatch(rootNode,
	            index[nodeIndex],
	            patches[nodeIndex],
	            renderOptions)
	    }
	
	    return rootNode
	}
	
	function applyPatch(rootNode, domNode, patchList, renderOptions) {
	    if (!domNode) {
	        return rootNode
	    }
	
	    var newNode
	
	    if (isArray(patchList)) {
	        for (var i = 0; i < patchList.length; i++) {
	            newNode = patchOp(patchList[i], domNode, renderOptions)
	
	            if (domNode === rootNode) {
	                rootNode = newNode
	            }
	        }
	    } else {
	        newNode = patchOp(patchList, domNode, renderOptions)
	
	        if (domNode === rootNode) {
	            rootNode = newNode
	        }
	    }
	
	    return rootNode
	}
	
	function patchIndices(patches) {
	    var indices = []
	
	    for (var key in patches) {
	        if (key !== "a") {
	            indices.push(Number(key))
	        }
	    }
	
	    return indices
	}


/***/ },
/* 56 */
/***/ function(module, exports) {

	// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
	// We don't want to read all of the DOM nodes in the tree so we use
	// the in-order tree indexing to eliminate recursion down certain branches.
	// We only recurse into a DOM node if we know that it contains a child of
	// interest.
	
	var noChild = {}
	
	module.exports = domIndex
	
	function domIndex(rootNode, tree, indices, nodes) {
	    if (!indices || indices.length === 0) {
	        return {}
	    } else {
	        indices.sort(ascending)
	        return recurse(rootNode, tree, indices, nodes, 0)
	    }
	}
	
	function recurse(rootNode, tree, indices, nodes, rootIndex) {
	    nodes = nodes || {}
	
	
	    if (rootNode) {
	        if (indexInRange(indices, rootIndex, rootIndex)) {
	            nodes[rootIndex] = rootNode
	        }
	
	        var vChildren = tree.children
	
	        if (vChildren) {
	
	            var childNodes = rootNode.childNodes
	
	            for (var i = 0; i < tree.children.length; i++) {
	                rootIndex += 1
	
	                var vChild = vChildren[i] || noChild
	                var nextIndex = rootIndex + (vChild.count || 0)
	
	                // skip recursion down the tree if there are no nodes down here
	                if (indexInRange(indices, rootIndex, nextIndex)) {
	                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
	                }
	
	                rootIndex = nextIndex
	            }
	        }
	    }
	
	    return nodes
	}
	
	// Binary search for an index in the interval [left, right]
	function indexInRange(indices, left, right) {
	    if (indices.length === 0) {
	        return false
	    }
	
	    var minIndex = 0
	    var maxIndex = indices.length - 1
	    var currentIndex
	    var currentItem
	
	    while (minIndex <= maxIndex) {
	        currentIndex = ((maxIndex + minIndex) / 2) >> 0
	        currentItem = indices[currentIndex]
	
	        if (minIndex === maxIndex) {
	            return currentItem >= left && currentItem <= right
	        } else if (currentItem < left) {
	            minIndex = currentIndex + 1
	        } else  if (currentItem > right) {
	            maxIndex = currentIndex - 1
	        } else {
	            return true
	        }
	    }
	
	    return false;
	}
	
	function ascending(a, b) {
	    return a > b ? 1 : -1
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var applyProperties = __webpack_require__(53)
	
	var isWidget = __webpack_require__(22)
	var VPatch = __webpack_require__(45)
	
	var updateWidget = __webpack_require__(58)
	
	module.exports = applyPatch
	
	function applyPatch(vpatch, domNode, renderOptions) {
	    var type = vpatch.type
	    var vNode = vpatch.vNode
	    var patch = vpatch.patch
	
	    switch (type) {
	        case VPatch.REMOVE:
	            return removeNode(domNode, vNode)
	        case VPatch.INSERT:
	            return insertNode(domNode, patch, renderOptions)
	        case VPatch.VTEXT:
	            return stringPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.WIDGET:
	            return widgetPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.VNODE:
	            return vNodePatch(domNode, vNode, patch, renderOptions)
	        case VPatch.ORDER:
	            reorderChildren(domNode, patch)
	            return domNode
	        case VPatch.PROPS:
	            applyProperties(domNode, patch, vNode.properties)
	            return domNode
	        case VPatch.THUNK:
	            return replaceRoot(domNode,
	                renderOptions.patch(domNode, patch, renderOptions))
	        default:
	            return domNode
	    }
	}
	
	function removeNode(domNode, vNode) {
	    var parentNode = domNode.parentNode
	
	    if (parentNode) {
	        parentNode.removeChild(domNode)
	    }
	
	    destroyWidget(domNode, vNode);
	
	    return null
	}
	
	function insertNode(parentNode, vNode, renderOptions) {
	    var newNode = renderOptions.render(vNode, renderOptions)
	
	    if (parentNode) {
	        parentNode.appendChild(newNode)
	    }
	
	    return parentNode
	}
	
	function stringPatch(domNode, leftVNode, vText, renderOptions) {
	    var newNode
	
	    if (domNode.nodeType === 3) {
	        domNode.replaceData(0, domNode.length, vText.text)
	        newNode = domNode
	    } else {
	        var parentNode = domNode.parentNode
	        newNode = renderOptions.render(vText, renderOptions)
	
	        if (parentNode && newNode !== domNode) {
	            parentNode.replaceChild(newNode, domNode)
	        }
	    }
	
	    return newNode
	}
	
	function widgetPatch(domNode, leftVNode, widget, renderOptions) {
	    var updating = updateWidget(leftVNode, widget)
	    var newNode
	
	    if (updating) {
	        newNode = widget.update(leftVNode, domNode) || domNode
	    } else {
	        newNode = renderOptions.render(widget, renderOptions)
	    }
	
	    var parentNode = domNode.parentNode
	
	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }
	
	    if (!updating) {
	        destroyWidget(domNode, leftVNode)
	    }
	
	    return newNode
	}
	
	function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
	    var parentNode = domNode.parentNode
	    var newNode = renderOptions.render(vNode, renderOptions)
	
	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }
	
	    return newNode
	}
	
	function destroyWidget(domNode, w) {
	    if (typeof w.destroy === "function" && isWidget(w)) {
	        w.destroy(domNode)
	    }
	}
	
	function reorderChildren(domNode, moves) {
	    var childNodes = domNode.childNodes
	    var keyMap = {}
	    var node
	    var remove
	    var insert
	
	    for (var i = 0; i < moves.removes.length; i++) {
	        remove = moves.removes[i]
	        node = childNodes[remove.from]
	        if (remove.key) {
	            keyMap[remove.key] = node
	        }
	        domNode.removeChild(node)
	    }
	
	    var length = childNodes.length
	    for (var j = 0; j < moves.inserts.length; j++) {
	        insert = moves.inserts[j]
	        node = keyMap[insert.key]
	        // this is the weirdest bug i've ever seen in webkit
	        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
	    }
	}
	
	function replaceRoot(oldRoot, newRoot) {
	    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
	        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
	    }
	
	    return newRoot;
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var isWidget = __webpack_require__(22)
	
	module.exports = updateWidget
	
	function updateWidget(a, b) {
	    if (isWidget(a) && isWidget(b)) {
	        if ("name" in a && "name" in b) {
	            return a.id === b.id
	        } else {
	            return a.init === b.init
	        }
	    }
	
	    return false
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGY5NzEwYTFjMWFhODk4YjUyNjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vYi1zY2VuZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2tlZmlyL2Rpc3Qva2VmaXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3BhZ2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9+L3BhY2UvcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXNlci9jb250cm9scy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vbWFpbi1sb29wL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmFmL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcGVyZm9ybWFuY2Utbm93L2xpYi9wZXJmb3JtYW5jZS1ub3cuanMiLCJ3ZWJwYWNrOi8vLy4vfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9lcnJvci90eXBlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NhbWVsaXplL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vc3RyaW5nLXRlbXBsYXRlL2luZGV4LmpzIiwid2VicGFjazovLy8uL34veHRlbmQvbXV0YWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL2guanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS92aXJ0dWFsLWh5cGVyc2NyaXB0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34veC1pcy1hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL3Zub2RlLmpzIiwid2VicGFjazovLy8uL34vdmlydHVhbC1kb20vdm5vZGUvdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXZub2RlLmpzIiwid2VicGFjazovLy8uL34vdmlydHVhbC1kb20vdm5vZGUvaXMtd2lkZ2V0LmpzIiwid2VicGFjazovLy8uL34vdmlydHVhbC1kb20vdm5vZGUvaXMtdGh1bmsuanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS92bm9kZS9pcy12aG9vay5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL3Z0ZXh0LmpzIiwid2VicGFjazovLy8uL34vdmlydHVhbC1kb20vdm5vZGUvaXMtdnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS92aXJ0dWFsLWh5cGVyc2NyaXB0L3BhcnNlLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Jyb3dzZXItc3BsaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS92aXJ0dWFsLWh5cGVyc2NyaXB0L2hvb2tzL3NvZnQtc2V0LWhvb2suanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS92aXJ0dWFsLWh5cGVyc2NyaXB0L2hvb2tzL2V2LWhvb2suanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldi1zdG9yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2luZGl2aWR1YWwvb25lLXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9pbmRpdmlkdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXIvdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlci9zY3JvbGxiYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlci9hdWRpb3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyL2xvb3Blci5qcyIsIndlYnBhY2s6Ly8vLi9+L2hvd2xlci9ob3dsZXIuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXIvdmlkZW9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS9kaWZmLmpzIiwid2VicGFjazovLy8uL34vdmlydHVhbC1kb20vdnRyZWUvZGlmZi5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL3ZwYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL2hhbmRsZS10aHVuay5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Z0cmVlL2RpZmYtcHJvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pcy1vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS9jcmVhdGUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Zkb20vY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9nbG9iYWwvZG9jdW1lbnQuanMiLCJ3ZWJwYWNrOi8vL21pbi1kb2N1bWVudCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS92ZG9tL2FwcGx5LXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS9wYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Zkb20vcGF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS92ZG9tL2RvbS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3ZpcnR1YWwtZG9tL3Zkb20vcGF0Y2gtb3AuanMiLCJ3ZWJwYWNrOi8vLy4vfi92aXJ0dWFsLWRvbS92ZG9tL3VwZGF0ZS13aWRnZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDQSxRQUFP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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBaUMsNEJBQTRCO0FBQzdEO0FBQ0E7QUFDQSxrQ0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0Esa0NBQWlDLDZCQUE2QjtBQUM5RDtBQUNBO0FBQ0Esa0NBQWlDLGlDQUFpQztBQUNsRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLDhDQUE2QztBQUM3QyxrREFBaUQ7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsbUNBQWtDLDRCQUE0QjtBQUM5RDtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLG1DQUFrQyw0QkFBNEI7QUFDOUQ7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxZQUFZO0FBQzlDO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOLGtDQUFpQyxZQUFZO0FBQzdDO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLCtCQUErQjtBQUM5RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBbUI7O0FBRW5CLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwwQ0FBeUMscUJBQXFCO0FBQzlEO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLDBDQUF5QyxrQkFBa0I7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUYsb0JBQW1COztBQUVuQixRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYyxZQUFZO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGVBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWMsWUFBWTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBLDBCQUF5QixZQUFZO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBYyxZQUFZO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBLHFDQUFvQyw0QkFBNEI7QUFDaEU7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLDhCQUE2QjtBQUM3QjtBQUNBLHFDQUFvQyw0QkFBNEI7QUFDaEU7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsWUFBWTtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQyxZQUFZO0FBQzdDO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBLHdCQUF1QixPQUFPO0FBQzlCOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQ0FBK0I7QUFDL0IsZ0NBQStCOztBQUUvQixvQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSTs7QUFFSjtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGO0FBQ0Esd0JBQXVCLE9BQU87QUFDOUI7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUY7QUFDQSxvREFBbUQsU0FBUztBQUM1RDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGO0FBQ0Esd0JBQXVCLFNBQVM7QUFDaEM7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBLHdCQUF1QixTQUFTO0FBQ2hDOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQVc7QUFDWDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsS0FBSTtBQUNKOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBbUI7O0FBRW5CLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDO0FBQzFDOztBQUVBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IsU0FBUztBQUMvQjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0NBQStCO0FBQy9CLGdDQUErQjs7QUFFL0I7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1COztBQUVuQixRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBLE9BQU07QUFDTixLQUFJO0FBQ0o7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2Q0FBNEMsU0FBUztBQUNyRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZDQUE0QyxPQUFPO0FBQ25EOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZDQUE0QyxPQUFPO0FBQ25EOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEMsT0FBTztBQUNuRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxrQ0FBa0M7QUFDOUU7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBOztBQUVBLHVCQUFzQixxQkFBcUI7QUFDM0M7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EscUJBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUFzQixTQUFTO0FBQy9COztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTRDLGFBQWE7QUFDekQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3RUFBdUU7O0FBRXZFO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDQUE0QyxtREFBbUQ7QUFDL0Y7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0VBQXVFOztBQUV2RTtBQUNBOztBQUVBLDZDQUE0QyxtQ0FBbUM7QUFDL0U7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEMsU0FBUztBQUNyRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLHFCQUFxQjtBQUNqRTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0VBQXVFOztBQUV2RTtBQUNBOztBQUVBLDZDQUE0Qyx1Q0FBdUM7QUFDbkY7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7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QUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUVBQXNFOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTTtBQUNOLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXFELFdBQVcsVUFBVTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsMkJBQTJCO0FBQ3pEO0FBQ0EsS0FBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBLGlEQUFnRCxvQ0FBb0M7QUFDcEY7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQSxpREFBZ0Qsb0JBQW9CO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKLG9DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUY7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQStCO0FBQy9CLGdDQUErQjs7QUFFL0I7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLE9BQU07QUFDTiw0REFBMkQ7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1COztBQUVuQixRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EseUVBQXdFOztBQUV4RTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLHlFQUF3RTs7QUFFeEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQztBQUNELEU7Ozs7Ozs7O0FDanRKQSxRQUFPLE9BQVAsQ0FBZSxtQkFBZixHQUFxQyxVQUFTLFNBQVQsRUFBb0IsV0FBcEIsRUFBaUMsWUFBakMsRUFBK0M7QUFDbEYsT0FBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FEa0Y7QUFFbEYsUUFBSSxJQUFFLENBQUYsRUFBSSxJQUFFLFVBQVUsTUFBVixFQUFpQixHQUEzQixFQUFnQzs7QUFDOUIsZUFBVSxDQUFWLEVBQWEsUUFBYixHQUF3QixtQkFBbUIsVUFBVSxDQUFWLEVBQWEsUUFBYixFQUF1QixHQUExQyxFQUErQyxXQUEvQyxFQUE0RCxZQUE1RCxDQUF4QixDQUQ4QjtBQUU5QixVQUFJLElBQUUsQ0FBRixFQUFJLElBQUUsVUFBVSxDQUFWLEVBQWEsVUFBYixDQUF3QixNQUF4QixFQUErQixHQUF6QyxFQUE4Qzs7QUFDNUMsY0FBTyxJQUFQLENBQVksVUFBVSxDQUFWLEVBQWEsVUFBYixDQUF3QixDQUF4QixDQUFaLEVBQXdDLE9BQXhDLENBQWdELFVBQVMsR0FBVCxFQUFjOztBQUM1RCxhQUFJLFFBQVEsVUFBVSxDQUFWLEVBQWEsVUFBYixDQUF3QixDQUF4QixFQUEyQixHQUEzQixDQUFSLENBRHdEO0FBRTVELGFBQUcsUUFBUSxVQUFSLEVBQW9CO0FBQ3JCLGVBQUcsaUJBQWlCLEtBQWpCLEVBQXdCOztBQUN6QixrQkFBSSxJQUFFLENBQUYsRUFBSSxJQUFFLE1BQU0sTUFBTixFQUFhLEdBQXZCLEVBQTRCOztBQUMxQixtQkFBRyxPQUFPLE1BQU0sQ0FBTixDQUFQLEtBQW9CLFFBQXBCLEVBQThCO0FBQy9CLHFCQUFHLFFBQVEsWUFBUixFQUFzQjtBQUN2Qix5QkFBTSxDQUFOLElBQVcsbUJBQW1CLE1BQU0sQ0FBTixDQUFuQixFQUE2QixHQUE3QixFQUFrQyxXQUFsQyxFQUErQyxZQUEvQyxDQUFYLENBRHVCO2tCQUF6QixNQUVPO0FBQ0wseUJBQU0sQ0FBTixJQUFXLG1CQUFtQixNQUFNLENBQU4sQ0FBbkIsRUFBNkIsR0FBN0IsRUFBa0MsV0FBbEMsRUFBK0MsWUFBL0MsQ0FBWCxDQURLO2tCQUZQO2dCQURGO2NBREY7WUFERixNQVVPO0FBQ0wsaUJBQUcsT0FBTyxLQUFQLEtBQWlCLFFBQWpCLEVBQTJCOztBQUM1QixtQkFBRyxRQUFRLFlBQVIsRUFBc0I7QUFDdkIseUJBQVEsbUJBQW1CLEtBQW5CLEVBQTBCLEdBQTFCLEVBQStCLFdBQS9CLEVBQTRDLFlBQTVDLENBQVIsQ0FEdUI7Z0JBQXpCLE1BRU87QUFDTCx5QkFBUSxtQkFBbUIsS0FBbkIsRUFBMEIsR0FBMUIsRUFBK0IsV0FBL0IsRUFBNEMsWUFBNUMsQ0FBUixDQURLO2dCQUZQO2NBREY7WUFYRjtBQW1CQSxxQkFBVSxDQUFWLEVBQWEsVUFBYixDQUF3QixDQUF4QixFQUEyQixHQUEzQixJQUFrQyxLQUFsQyxDQXBCcUI7VUFBdkI7UUFGOEMsQ0FBaEQsQ0FENEM7TUFBOUM7SUFGRjtBQThCQSxVQUFPLFNBQVAsQ0FoQ2tGO0VBQS9DOztBQXFDckMsVUFBUyxrQkFBVCxDQUE0QixLQUE1QixFQUFtQyxJQUFuQyxFQUF5QyxXQUF6QyxFQUFzRCxZQUF0RCxFQUFvRTtBQUNsRSxPQUFHLE9BQU8sS0FBUCxLQUFpQixRQUFqQixJQUE2QixNQUFNLEtBQU4sQ0FBWSxJQUFaLENBQTdCLEVBQWdEO0FBQ2pELFNBQUcsU0FBUyxHQUFULEVBQWMsUUFBUSxVQUFDLENBQVcsS0FBWCxJQUFvQixHQUFwQixHQUEyQixZQUE1QixDQUF6QjtBQUNBLFNBQUcsU0FBUyxHQUFULEVBQWMsUUFBUSxVQUFDLENBQVcsS0FBWCxJQUFvQixHQUFwQixHQUEyQixXQUE1QixDQUF6QjtJQUZGO0FBSUEsT0FBRyxPQUFPLEtBQVAsS0FBaUIsUUFBakIsSUFBNkIsTUFBTSxLQUFOLENBQVksSUFBWixDQUE3QixFQUFnRDtBQUNqRCxTQUFHLFNBQVMsR0FBVCxFQUFjLFFBQVEsVUFBQyxDQUFXLEtBQVgsSUFBb0IsR0FBcEIsR0FBMkIsWUFBNUIsQ0FBekI7QUFDQSxTQUFHLFNBQVMsR0FBVCxFQUFjLFFBQVEsVUFBQyxDQUFXLEtBQVgsSUFBb0IsR0FBcEIsR0FBMkIsV0FBNUIsQ0FBekI7SUFGRjtBQUlBLFVBQU8sS0FBUCxDQVRrRTtFQUFwRTs7QUFhQSxRQUFPLE9BQVAsQ0FBZSxTQUFmLEdBQTJCLFVBQVMsU0FBVCxFQUFvQixRQUFwQixFQUE4QjtBQUN2RCxPQUFJLENBQUo7T0FBTyxDQUFQO09BQVUsQ0FBVjtPQUFhLGFBQWEsRUFBYjtPQUFpQixhQUFhLENBQWIsQ0FEeUI7QUFFdkQsUUFBSSxJQUFFLENBQUYsRUFBSSxJQUFFLFVBQVUsTUFBVixFQUFpQixHQUEzQixFQUFnQzs7QUFDNUIsU0FBRyxVQUFVLENBQVYsRUFBYSxLQUFiLEVBQW9CO0FBQ25CLFdBQUcsZUFBZSxXQUFXLFdBQVcsTUFBWCxHQUFvQixDQUFwQixDQUExQixFQUFrRDtBQUNuRCxvQkFBVyxJQUFYLENBQWdCLFVBQWhCLEVBRG1EO1FBQXJEO01BREo7QUFLQSxtQkFBYyxVQUFVLENBQVYsRUFBYSxRQUFiLENBTmM7QUFPNUIsU0FBRyxFQUFFLE9BQUYsQ0FBVSxVQUFVLENBQVYsRUFBYSxPQUFiLEVBQXNCLFFBQWhDLEtBQTZDLENBQUMsQ0FBRCxFQUFJO0FBQ2xELGdCQUFTLElBQVQsQ0FBYyxVQUFVLENBQVYsRUFBYSxPQUFiLENBQWQsQ0FEa0Q7TUFBcEQ7QUFHQSxVQUFJLElBQUUsQ0FBRixFQUFJLElBQUUsVUFBVSxDQUFWLEVBQWEsVUFBYixDQUF3QixNQUF4QixFQUErQixHQUF6QyxFQUE4Qzs7QUFDNUMsY0FBTyxJQUFQLENBQVksVUFBVSxDQUFWLEVBQWEsVUFBYixDQUF3QixDQUF4QixDQUFaLEVBQXdDLE9BQXhDLENBQWdELFVBQVMsR0FBVCxFQUFjOztBQUM1RCxhQUFJLFFBQVEsVUFBVSxDQUFWLEVBQWEsVUFBYixDQUF3QixDQUF4QixFQUEyQixHQUEzQixDQUFSLENBRHdEO0FBRTVELGFBQUcsUUFBUSxVQUFSLElBQXNCLGlCQUFpQixLQUFqQixLQUEyQixLQUEzQixFQUFrQztBQUN6RCxlQUFJLFdBQVcsRUFBWCxDQURxRDtBQUV6RCxvQkFBUyxJQUFULENBQWMsd0JBQXdCLEdBQXhCLENBQWQsRUFBNEMsS0FBNUMsRUFGeUQ7QUFHekQsbUJBQVEsUUFBUixDQUh5RDtVQUEzRDtBQUtBLG1CQUFVLENBQVYsRUFBYSxVQUFiLENBQXdCLENBQXhCLEVBQTJCLEdBQTNCLElBQWtDLEtBQWxDLENBUDREO1FBQWQsQ0FBaEQsQ0FENEM7TUFBOUM7SUFWSjs7QUF1QkEsVUFBTztBQUNMLGlCQUFZLFVBQVo7QUFDQSxpQkFBWSxVQUFaO0FBQ0EsZUFBVSxRQUFWO0lBSEYsQ0F6QnVEO0VBQTlCOztBQWdDM0IsUUFBTyxPQUFQLENBQWUsdUJBQWYsR0FBeUMsdUJBQXpDOztBQUVBLFVBQVMsdUJBQVQsQ0FBaUMsUUFBakMsRUFBMkM7QUFDekMsV0FBUSxRQUFSO0FBQ0UsVUFBSyxZQUFMO0FBQ0UsY0FBTyxDQUFQLENBREY7QUFERixVQUdPLFlBQUw7QUFDRSxjQUFPLENBQVAsQ0FERjtBQUhGLFVBS08sT0FBTDtBQUNFLGNBQU8sQ0FBUCxDQURGO0FBTEYsVUFPTyxRQUFMO0FBQ0UsY0FBTyxDQUFQLENBREY7QUFQRixVQVNPLFNBQUw7QUFDRSxjQUFPLENBQVAsQ0FERjtBQVRGO0FBWUksY0FBTyxJQUFQLENBREY7QUFYRixJQUR5Qzs7Ozs7Ozs7O0FDcEYzQyxLQUFNLGFBQWEsQ0FBQyxZQUFELEVBQWUsWUFBZixFQUE2QixTQUE3QixFQUF3QyxRQUF4QyxFQUFrRCxPQUFsRCxDQUFiO0FBQ04sS0FBTSxpQkFBaUIsRUFBakI7O0FBRU4sS0FBSSxVQUFVLEVBQUUsTUFBRixDQUFWO0FBQ0osS0FBSSxRQUFRLEVBQUUsV0FBRixDQUFSOztBQUVKLEtBQU0sYUFBYTs7Ozs7O0FBTWYsYUFBVSxFQUFWO0FBQ0EsbUJBQWdCLElBQWhCOzs7O0FBSUEsY0FBVyxRQUFRLFNBQVIsRUFBWDtBQUNBLHNCQUFtQixDQUFuQjs7Ozs7O0FBTUEsY0FBVyxTQUFYOzs7O0FBSUEsMkJBQXdCLENBQXhCOzs7O0FBSUEsb0JBQWlCLENBQWpCOzs7Ozs7O0FBT0EsZUFBWSxFQUFaOzs7O0FBSUEsaUJBQWMsQ0FBZDs7O0FBR0EsaUJBQWMsQ0FBQyxDQUFELENBQWQ7Ozs7QUFJQSxvQkFBaUIsQ0FBakI7Ozs7QUFJQSxlQUFZLENBQVo7QUFDQSxpQkFBYyxDQUFkO0FBQ0EsZ0JBQWEsQ0FBYjs7RUFsREU7O0FBdUROLFFBQU8sT0FBUCxDQUFlLFVBQWYsR0FBNEIsVUFBNUI7QUFDQSxRQUFPLE9BQVAsQ0FBZSxVQUFmLEdBQTRCLFVBQTVCO0FBQ0EsUUFBTyxPQUFQLENBQWUsY0FBZixHQUFnQyxjQUFoQztBQUNBLFFBQU8sT0FBUCxDQUFlLEtBQWYsR0FBdUIsS0FBdkI7QUFDQSxRQUFPLE9BQVAsQ0FBZSxPQUFmLEdBQXlCLE9BQXpCLEM7Ozs7OztBQ2pFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBa0I7QUFDbEIsMENBQXlDLDBCQUEwQiwyREFBMkQsRUFBRSxrQkFBa0IsMEJBQTBCLEVBQUUsbUNBQW1DLDhCQUE4QixvQ0FBb0MsY0FBYyxFQUFFO0FBQ25TLCtDQUE4QyxpQ0FBaUMsT0FBTyxPQUFPLDZDQUE2QyxFQUFFLFdBQVc7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLFdBQVc7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxxQ0FBb0M7O0FBRXBDO0FBQ0EsbUNBQWtDLFdBQVc7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsWUFBWTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLFlBQVk7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0MsWUFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxZQUFZO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLDJDQUEwQyxZQUFZO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QyxZQUFZO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QyxZQUFZO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLFlBQVk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0wsd0JBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7QUN4SUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBbUIsV0FBVztBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFD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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSx3QkFBdUIsU0FBUztBQUNoQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQW9CLHNCQUFzQjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBbUIsc0JBQXNCO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLHNCQUFzQjtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsMkJBQTJCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLDJCQUEyQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MsMkJBQTJCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBbUIsWUFBWTtBQUMvQjs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7O0FDMWFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN2Q0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7O0FDekRBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBOztBQUVBOzs7Ozs7O0FDRkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxvQkFBbUIscUJBQXFCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNkQSxnQjs7Ozs7O0FDQUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7Ozs7Ozs7QUNoR0E7O0FBRUE7Ozs7Ozs7QUNGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG9CQUFtQixvQkFBb0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx3QkFBdUIsc0JBQXNCO0FBQzdDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsNEJBQTJCLDBCQUEwQjtBQUNyRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwRkE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLDBCQUEwQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFtQiwwQkFBMEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0SkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoib2JzY2VuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGY5NzEwYTFjMWFhODk4YjUyNjZcbiAqKi8iLCIvLyBnbG9iYWxzIG9ic2NlbmVfY29tcGlsZWRcblxuaW1wb3J0IG9ic2NlbmUgZnJvbSAnLi9vYi1zY2VuZS5qcydcbmltcG9ydCBjb250cm9scyBmcm9tICcuL3VzZXIvY29udHJvbHMuanMnXG5pbXBvcnQgcmVuZGVyZXIgZnJvbSAnLi9yZW5kZXIvaW5kZXguanMnXG5cbm1vZHVsZS5leHBvcnRzLmluaXQgPSAoY29uZmlnKSA9PiB7XG4gIC8vIG9ic2NlbmVfY29tcGlsZWQgc2hvdWxkIGJlIGEgZ2xvYmFsIHZhcmlhYmxlIGV4cG9zZWQgYnkgdGhlIG9ic2NlbmUgY29tcGlsZXJcbiAgY29uc3QgY29uZiA9IGNvbmZpZyB8fCBvYnNjZW5lX2NvbXBpbGVkXG5cbiAgaWYgKCFjb25mKSB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBpbmNsdWRlIGFuIG9ic2NlbmUtY29tcGlsZWQganMgZmlsZSBiZWZvcmUgdGhlIGluaXQnKVxuICBjb25zdCBjb3JlVUlBZGRlZCQgPSByZW5kZXJlci5pbml0KClcbiAgb2JzY2VuZS5pbml0KGNvbmYsIGNvcmVVSUFkZGVkJClcbiAgY29udHJvbHMuaW5pdCgpXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIi8qXG4gKiAgRGVwZW5kZW5jaWVzXG4qL1xuXG4gIGltcG9ydCAqIGFzIEtlZmlyIGZyb20gJ2tlZmlyJ1xuICBpbXBvcnQgeyBidWlsZFBhZ2UsIGNvbnZlcnRBbGxQcm9wc1RvUHggfSBmcm9tICcuL3V0aWxzL3BhZ2UtdXRpbHMuanMnXG5cbi8qXG4gKiAgR2xvYmFsc1xuKi9cblxuICBpbXBvcnQgeyBBTklNQVRJT05fVElNRSwgJHdpbmRvdywgSU5JVF9TVEFURSB9IGZyb20gJy4vY29uc3RhbnRzLmpzJ1xuXG4vKlxuICogIEluaXRpYWxpemVcbiovXG5cbiAgY29uc3QgaW5pdFN0YXRlID0gS2VmaXIuc3RyZWFtKGVtaXR0ZXIgPT4ge1xuICAgIGVtaXR0ZXIuZW1pdChJTklUX1NUQVRFKVxuICB9KVxuXG4gIGltcG9ydCBQYWNlIGZyb20gJ3BhY2UnXG4gIGNvbnN0IHJlYWR5VG9QYXJzZSQgPSBLZWZpci5wb29sKClcblxuICBtb2R1bGUuZXhwb3J0cy5pbml0ID0gKGNvbmZpZywgY29yZVVJQWRkZWQkKSA9PiB7XG4gICAgLy8gY29uc3Qgc2NlbmVIdG1sU3RyaW5nID0gY29uZmlnLnNjZW5lSHRtbFN0cmluZ1xuICAgIC8vIGNvbnN0IHNjZW5lQ29uZmlnID0gY29uZmlnLnNjZW5lQ29uZmlnXG5cbiAgICAvLyBQYWNlIHJlcXVpcmVzIGEgLnN0YXJ0IHRvIHNob3cgdGhlIGxvYWRpbmcgc2NyZWVuXG4gICAgY29uc3QgbG9hZGluZ0NvbXBsZXRlJCA9IEtlZmlyLmZyb21FdmVudHMoUGFjZSwgJ2RvbmUnKVxuICAgIFBhY2Uuc3RhcnQoKVxuXG4gICAgY29uc3QgaW5pdExvYWRpbmdDb21wbGV0ZSQgPSBLZWZpci56aXAoW2xvYWRpbmdDb21wbGV0ZSQsIGNvcmVVSUFkZGVkJF0pXG4gICAgICAuZmlsdGVyKGNoZWNrUmVhZHlTdGF0ZSlcblxuICAgIGNvbnN0IGluaXRSZWFkeSQgPSBpbml0TG9hZGluZ0NvbXBsZXRlJFxuICAgICAgLmZpbHRlcigoKSA9PiAhKGlzVG91Y2hEZXZpY2UoKSkpXG4gICAgICAubWFwKCgpID0+IGNvbmZpZylcblxuICAgIHJlYWR5VG9QYXJzZSQucGx1Zyhpbml0UmVhZHkkKVxuICB9XG5cbiAgY29uc3QgdG91Y2hEZXZpY2VEZXRlY3RlZCQgPSByZWFkeVRvUGFyc2UkXG4gICAgLmZpbHRlcihpc1RvdWNoRGV2aWNlKVxuXG4gIGZ1bmN0aW9uIGNoZWNrUmVhZHlTdGF0ZSgpIHtcbiAgICByZXR1cm4gKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgLy8gbW9zdCBicm93c2Vyc1xuICAgICAgICAgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRlZCcgLy8gb2xkZXIgc2FmYXJpXG4gICAgICAgICB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnIC8vIGF0IGxlYXN0IGluaXRhbCBkb2MgbG9hZGVkXG4gICAgICAgICApXG4gIH1cblxuICBmdW5jdGlvbiBpc1RvdWNoRGV2aWNlKCkge1xuICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgLy8gd29ya3Mgb24gbW9zdCBicm93c2Vyc1xuICAgICAgfHwgJ29ubXNnZXN0dXJlY2hhbmdlJyBpbiB3aW5kb3cgLy8gd29ya3Mgb24gaWUxMFxuICB9XG5cbiAgY29uc3Qga2V5RnJhbWVzUmV0cmVpdmVkJCA9IHJlYWR5VG9QYXJzZSRcbiAgICAuZmxhdE1hcCgoY29uZmlnKSA9PiBLZWZpci5zdHJlYW0oZW1pdHRlciA9PiB7XG4gICAgICBlbWl0dGVyLmVtaXQoY29uZmlnLnNjZW5lQ29uZmlnKVxuICAgIH0pXG4gIClcblxuICBjb25zdCBzdGF0ZUluaXRpYWxpemVkJCA9IGtleUZyYW1lc1JldHJlaXZlZCRcbiAgICAuZmxhdE1hcChrZXlmcmFtZXMgPT4gaW5pdFN0YXRlLm1hcChzdGF0ZSA9PiB7XG4gICAgICBjb25zdCBzID0gc3RhdGVcbiAgICAgIHMua2V5ZnJhbWVzID0ga2V5ZnJhbWVzXG4gICAgICByZXR1cm4gc1xuICAgIH0pKVxuICAgIC5tYXAoc3RhdGUgPT4ge1xuICAgICAgY29uc3QgcyA9IHN0YXRlXG4gICAgICBzLmN1cnJlbnRXcmFwcGVyID0gcy53cmFwcGVyc1swXVxuICAgICAgcy5zY3JvbGxUb3AgPSAwXG4gICAgICByZXR1cm4gc1xuICAgIH0pXG5cbiAgbW9kdWxlLmV4cG9ydHMucmVhZHlUb1BhcnNlJCA9IHJlYWR5VG9QYXJzZSRcblxuICBtb2R1bGUuZXhwb3J0cy50b3VjaERldmljZURldGVjdGVkJCA9IHRvdWNoRGV2aWNlRGV0ZWN0ZWQkXG5cbi8qXG4gKiAgQnVpbGQgUGFnZVxuKi9cblxuICBjb25zdCB3aW5kb3dSZXNpemVkJCA9IHN0YXRlSW5pdGlhbGl6ZWQkXG4gICAgLmZsYXRNYXAoKHN0YXRlKSA9PiBLZWZpci5mcm9tRXZlbnRzKCR3aW5kb3csICdyZXNpemUnLCAoKSA9PiBzdGF0ZSkpXG4gICAgLnRocm90dGxlKEFOSU1BVElPTl9USU1FKVxuXG4gIGNvbnN0IGRpbWVuc2lvbnNDYWxjdWxhdGVkJCA9IEtlZmlyLm1lcmdlKFtzdGF0ZUluaXRpYWxpemVkJCwgd2luZG93UmVzaXplZCRdKVxuICAgIC5tYXAoY2FsY3VsYXRlRGltZW5zaW9ucylcbiAgICAubWFwKGNvbnZlcnRLZXlGcmFtZXMpXG4gICAgLm1hcChjYWxjdWxhdGVLZXlGcmFtZXNBbmRGb2N1cylcbiAgICAubWFwKHNldEluaXRXcmFwcGVyKVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZURpbWVuc2lvbnMoc3RhdGUpIHtcbiAgICBjb25zdCBzID0gc3RhdGVcbiAgICBzLnNjcm9sbFRvcCA9IE1hdGguZmxvb3IoJHdpbmRvdy5zY3JvbGxUb3AoKSlcbiAgICBzLndpbmRvd0hlaWdodCA9ICR3aW5kb3cuaGVpZ2h0KClcbiAgICBzLndpbmRvd1dpZHRoID0gJHdpbmRvdy53aWR0aCgpXG4gICAgcmV0dXJuIHNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnZlcnRLZXlGcmFtZXMoc3RhdGUpIHtcbiAgICBjb25zdCBzID0gc3RhdGVcbiAgICBzLmtleWZyYW1lcyA9IGNvbnZlcnRBbGxQcm9wc1RvUHgocy5rZXlmcmFtZXMsIHMud2luZG93V2lkdGgsIHMud2luZG93SGVpZ2h0KVxuICAgIHJldHVybiBzXG4gIH1cblxuICBmdW5jdGlvbiBjYWxjdWxhdGVLZXlGcmFtZXNBbmRGb2N1cyhzdGF0ZSkge1xuICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgIGNvbnN0IHBhZ2VJbmZvID0gYnVpbGRQYWdlKHN0YXRlLmtleWZyYW1lcywgc3RhdGUud3JhcHBlcnMpXG5cbiAgICBzLmJvZHlIZWlnaHQgPSBwYWdlSW5mby5ib2R5SGVpZ2h0XG4gICAgcy53cmFwcGVycyA9IHBhZ2VJbmZvLndyYXBwZXJzXG5cbiAgICBzLmZyYW1lRm9jdXMgPSBwYWdlSW5mby5mcmFtZUZvY3VzXG4gICAgICAubWFwKGkgPT4gTWF0aC5mbG9vcihpKSlcbiAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IHtcbiAgICAgICAgIC8vIGNsZWFycyBhbnkgZnJhbWUgZHVwbGljYXRlcy4gVE9ETzogZmluZCBidWcgdGhhdCBtYWtlcyBmcmFtZSBkdXBsaWNhdGVzXG4gICAgICAgIGlmIChhLmluZGV4T2YoYikgPCAwKSBhLnB1c2goYilcbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0sIFtdKVxuXG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cblxuICBmdW5jdGlvbiBzZXRJbml0V3JhcHBlcihzdGF0ZSkge1xuICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgIHMuY3VycmVudFdyYXBwZXIgPSBzLndyYXBwZXJzWzBdXG4gICAgcmV0dXJuIHNcbiAgfVxuXG4gIG1vZHVsZS5leHBvcnRzLmRpbWVuc2lvbnNDYWxjdWxhdGVkJCA9IGRpbWVuc2lvbnNDYWxjdWxhdGVkJFxuXG4vKlxuICogIFBvc2l0aW9uIG1vdmVkXG4qL1xuXG4gIGNvbnN0IHdpbmRvd1Njcm9sbGVkJCA9IEtlZmlyLmZyb21FdmVudHMoJHdpbmRvdywgJ3Njcm9sbCcpXG4gICAgLnRocm90dGxlKEFOSU1BVElPTl9USU1FKVxuXG4gIGNvbnN0IHNvbWV0aGluZ01vdmVkJCA9IEtlZmlyLmZyb21FdmVudHMod2luZG93LCAnUE9TSVRJT05fQ0hBTkdFRCcpXG5cbiAgY29uc3Qgd2luZG93c09yUG9zaXRpb25DaGFuZ2VkJCA9IGRpbWVuc2lvbnNDYWxjdWxhdGVkJFxuICAgIC5mbGF0TWFwKHN0YXRlID0+IEtlZmlyLm1lcmdlKFt3aW5kb3dTY3JvbGxlZCQsIHNvbWV0aGluZ01vdmVkJF0pXG4gICAgICAubWFwKGUgPT4ge1xuICAgICAgICBjb25zdCBzID0gc3RhdGVcbiAgICAgICAgcy5jaGFuZ2VkID0gZVxuICAgICAgICByZXR1cm4gc1xuICAgICAgfSlcbiAgICApXG5cbiAgY29uc3QgcG9zaXRpb25DaGFuZ2VkJCA9IEtlZmlyXG4gICAgLm1lcmdlKFtkaW1lbnNpb25zQ2FsY3VsYXRlZCQsIHdpbmRvd3NPclBvc2l0aW9uQ2hhbmdlZCRdKVxuXG4vKlxuICogIFN0YXRlIENoYW5nZWRcbiovXG5cbiAgLy8gQ2FsY3VsYXRlIGN1cnJlbnQgc3RhdGVcbiAgY29uc3QgY2FsY3VsYXRlZEN1cnJlbnRTdGF0ZSQgPSBLZWZpclxuICAgIC5tZXJnZShbZGltZW5zaW9uc0NhbGN1bGF0ZWQkLCBwb3NpdGlvbkNoYW5nZWQkXSlcbiAgICAubWFwKHNldFRvcHMpXG4gICAgLm1hcChzZXRLZXlmcmFtZSlcbiAgICAubWFwKGdldFNsaWRlTG9jYXRpb24pXG4gICAgLm1hcChzdGF0ZSA9PiB7XG4gICAgICBjb25zdCBzID0gc3RhdGVcbiAgICAgIHMuY3VycmVudFdyYXBwZXIgPSBzLmtleWZyYW1lc1tzLmN1cnJlbnRLZXlmcmFtZV0ud3JhcHBlclxuICAgICAgcmV0dXJuIHNcbiAgICB9KVxuXG4gIGZ1bmN0aW9uIHNldFRvcHMoc3RhdGUpIHtcbiAgICBjb25zdCBzID0gc3RhdGVcbiAgICBzLnNjcm9sbFRvcCA9IE1hdGguZmxvb3IoJHdpbmRvdy5zY3JvbGxUb3AoKSlcbiAgICBzLnJlbGF0aXZlU2Nyb2xsVG9wID0gcy5zY3JvbGxUb3AgLSBzLnByZXZLZXlmcmFtZXNEdXJhdGlvbnNcbiAgICByZXR1cm4gc1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0S2V5ZnJhbWUoc3RhdGUpIHtcbiAgICBjb25zdCBzID0gc3RhdGVcbiAgICBpZiAocy5zY3JvbGxUb3AgPiAocy5rZXlmcmFtZXNbcy5jdXJyZW50S2V5ZnJhbWVdLmR1cmF0aW9uICsgcy5wcmV2S2V5ZnJhbWVzRHVyYXRpb25zKSkge1xuICAgICAgcy5wcmV2S2V5ZnJhbWVzRHVyYXRpb25zICs9IHMua2V5ZnJhbWVzW3MuY3VycmVudEtleWZyYW1lXS5kdXJhdGlvblxuICAgICAgcy5jdXJyZW50S2V5ZnJhbWUrK1xuICAgIH0gZWxzZSBpZiAocy5zY3JvbGxUb3AgPCBzLnByZXZLZXlmcmFtZXNEdXJhdGlvbnMpIHtcbiAgICAgIHMuY3VycmVudEtleWZyYW1lLS1cbiAgICAgIHMucHJldktleWZyYW1lc0R1cmF0aW9ucyAtPSBzLmtleWZyYW1lc1tzLmN1cnJlbnRLZXlmcmFtZV0uZHVyYXRpb25cbiAgICB9XG4gICAgcmV0dXJuIHNcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNsaWRlTG9jYXRpb24oc3RhdGUpIHtcbiAgICBmdW5jdGlvbiBudW1iZXJJc0JldHdlZW4oYSwgYikge1xuICAgICAgY29uc3QgbWluID0gTWF0aC5taW4uYXBwbHkoTWF0aCwgW2EsIGJdKVxuICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgW2EsIGJdKVxuICAgICAgcmV0dXJuIHRoaXMgPiBtaW4gJiYgdGhpcyA8IG1heFxuICAgIH1cblxuICAgIGNvbnN0IHMgPSBzdGF0ZVxuXG4gICAgZm9yIChsZXQgeCA9IDE7IHggPD0gcy5mcmFtZUZvY3VzLmxlbmd0aDsgeCsrKSB7XG4gICAgICBpZiAocy5mcmFtZUZvY3VzW3hdID09PSBzLnNjcm9sbFRvcCkge1xuICAgICAgICBzLmN1cnJlbnRGcmFtZSA9IFt4XVxuICAgICAgfVxuICAgICAgaWYgKG51bWJlcklzQmV0d2Vlbi5jYWxsKHMuc2Nyb2xsLCBzLmZyYW1lRm9jdXNbeCAtIDFdLCBzLmZyYW1lRm9jdXNbeF0pKSB7XG4gICAgICAgIHMuY3VycmVudEZyYW1lID0gW3ggLSAxLCB4XVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc1xuICB9XG5cbiAgY29uc3Qgd3JhcHBlckNoYW5nZWQkID0gY2FsY3VsYXRlZEN1cnJlbnRTdGF0ZSRcbiAgICAubWFwKHN0YXRlID0+IHN0YXRlLmN1cnJlbnRXcmFwcGVyKVxuICAgIC5kaWZmKG51bGwsICcnKVxuICAgIC5maWx0ZXIoY3VycmVudFdyYXBwZXIgPT4gY3VycmVudFdyYXBwZXJbMF0gIT09IGN1cnJlbnRXcmFwcGVyWzFdKVxuICAgIC8vIC5kZWxheShBTklNQVRJT05fVElNRSoyKSAvLyBUbyB3YWl0IGZvciBmaXJzdCBhbmltYXRpb24gZnJhbWUgdG8gc3RhcnQgYmVmb3JlIHN3aXRjaGluZ1xuXG4gIG1vZHVsZS5leHBvcnRzLndyYXBwZXJDaGFuZ2VkJCA9IHdyYXBwZXJDaGFuZ2VkJFxuXG4gIGNvbnN0IHNjcm9sbFRvcENoYW5nZWQkID0gY2FsY3VsYXRlZEN1cnJlbnRTdGF0ZSRcbiAgICAuZGlmZihudWxsLCB7IC8vIEhhY2ssIGZvciBzb21lIHJlYXNvbiBJTklUX1NUQVRFIGlzbid0IGNvbWluZyBpbiBwcm9wZXJseVxuICAgICAgd3JhcHBlcnM6IFtdLFxuICAgICAgY3VycmVudFdyYXBwZXI6IHVuZGVmaW5lZCxcblxuICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgcmVsYXRpdmVTY3JvbGxUb3A6IDAsXG5cbiAgICAgIGtleWZyYW1lczogdW5kZWZpbmVkLFxuICAgICAgcHJldktleWZyYW1lc0R1cmF0aW9uczogMCxcbiAgICAgIGN1cnJlbnRLZXlmcmFtZTogMCxcblxuICAgICAgZnJhbWVGb2N1czogW10sXG4gICAgICBjdXJyZW50Rm9jdXM6IDAsXG4gICAgICBjdXJyZW50SW50ZXJ2YWw6IDAsXG5cbiAgICAgIHNjcm9sbFRpbWVvdXRJRDogMCxcblxuICAgICAgYm9keUhlaWdodDogMCxcbiAgICAgIHdpbmRvd0hlaWdodDogMCxcbiAgICAgIHdpbmRvd1dpZHRoOiAwLFxuICAgIH0pXG5cbiAgbW9kdWxlLmV4cG9ydHMuY2FsY3VsYXRlZEN1cnJlbnRTdGF0ZSQgPSBjYWxjdWxhdGVkQ3VycmVudFN0YXRlJFxuICBtb2R1bGUuZXhwb3J0cy5zY3JvbGxUb3BDaGFuZ2VkJCA9IHNjcm9sbFRvcENoYW5nZWQkXG4gIC8vIHNjcm9sbFRvcENoYW5nZWQkLmxvZygpXG5cbi8qXG4gKiAgQWN0aW9uc1xuKi9cblxuICAvLyBtb2R1bGUuZXhwb3J0cy5nZXQgPSAoKSA9PiBzdGF0ZVxuICAvLyAgIHJldHVybiBzdGF0ZVxuICAvLyB9XG5cbiAgbW9kdWxlLmV4cG9ydHMuYWN0aW9uID0gKGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgJHdpbmRvdy50cmlnZ2VyKCdGT0NVU19ORVhUJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgJHdpbmRvdy50cmlnZ2VyKCdGT0NVU19QUkVWSU9VUycpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFjdGlvbkZvY3VzTmV4dCA9IHNjcm9sbFRvcENoYW5nZWQkXG4gICAgLmZsYXRNYXBGaXJzdCgoc3RhdGUpID0+IEtlZmlyLmZyb21FdmVudHMoJHdpbmRvdywgJ0ZPQ1VTX05FWFQnLCAoKSA9PiBzdGF0ZSkpXG4gICAgLm1hcChzdGF0ZSA9PiBzdGF0ZVsxXSlcbiAgICAubWFwKG5leHRGb2N1cylcblxuICBjb25zdCBhY3Rpb25Gb2N1c1ByZXZpb3VzID0gc2Nyb2xsVG9wQ2hhbmdlZCRcbiAgICAuZmxhdE1hcEZpcnN0KChzdGF0ZSkgPT4gS2VmaXIuZnJvbUV2ZW50cygkd2luZG93LCAnRk9DVVNfUFJFVklPVVMnLCAoKSA9PiBzdGF0ZSkpXG4gICAgLm1hcChzdGF0ZSA9PiBzdGF0ZVsxXSlcbiAgICAubWFwKHByZXZpb3VzRm9jdXMpXG5cbiAgZnVuY3Rpb24gbmV4dEZvY3VzKHN0YXRlKSB7XG4gICAgc3dpdGNoIChzdGF0ZS5jdXJyZW50RnJhbWUubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBzdGF0ZS5mcmFtZUZvY3VzW3N0YXRlLmN1cnJlbnRGcmFtZVswXSArIDFdXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBzdGF0ZS5mcmFtZUZvY3VzW3N0YXRlLmN1cnJlbnRGcmFtZVsxXV1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzRm9jdXMoc3RhdGUpIHtcbiAgICBzd2l0Y2ggKHN0YXRlLmN1cnJlbnRGcmFtZS5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIHN0YXRlLmZyYW1lRm9jdXNbc3RhdGUuY3VycmVudEZyYW1lWzBdIC0gMV1cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIHN0YXRlLmZyYW1lRm9jdXNbc3RhdGUuY3VycmVudEZyYW1lWzBdXVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9jdXNDaGFuZ2VkJCA9IEtlZmlyLm1lcmdlKFthY3Rpb25Gb2N1c1ByZXZpb3VzLCBhY3Rpb25Gb2N1c05leHRdKVxuXG4gIG1vZHVsZS5leHBvcnRzLmZvY3VzQ2hhbmdlZCQgPSBmb2N1c0NoYW5nZWQkXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYi1zY2VuZS5qc1xuICoqLyIsIi8qISBLZWZpci5qcyB2My4yLjBcbiAqICBodHRwczovL2dpdGh1Yi5jb20vcnBvbWlub3Yva2VmaXJcbiAqL1xuXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJLZWZpclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJLZWZpclwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG5cblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIEtlZmlyID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblx0S2VmaXIuS2VmaXIgPSBLZWZpcjtcblxuXHR2YXIgT2JzZXJ2YWJsZSA9IEtlZmlyLk9ic2VydmFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXHRLZWZpci5TdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHRLZWZpci5Qcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cblx0Ly8gQ3JlYXRlIGEgc3RyZWFtXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Ly8gKCkgLT4gU3RyZWFtXG5cdEtlZmlyLm5ldmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblxuXHQvLyAobnVtYmVyLCBhbnkpIC0+IFN0cmVhbVxuXHRLZWZpci5sYXRlciA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cblx0Ly8gKG51bWJlciwgYW55KSAtPiBTdHJlYW1cblx0S2VmaXIuaW50ZXJ2YWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblxuXHQvLyAobnVtYmVyLCBBcnJheTxhbnk+KSAtPiBTdHJlYW1cblx0S2VmaXIuc2VxdWVudGlhbGx5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XG5cblx0Ly8gKG51bWJlciwgRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHRLZWZpci5mcm9tUG9sbCA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuXG5cdC8vIChudW1iZXIsIEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0S2VmaXIud2l0aEludGVydmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XG5cblx0Ly8gKEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0S2VmaXIuZnJvbUNhbGxiYWNrID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNik7XG5cblx0Ly8gKEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0S2VmaXIuZnJvbU5vZGVDYWxsYmFjayA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG5cdC8vIFRhcmdldCA9IHthZGRFdmVudExpc3RlbmVyLCByZW1vdmVFdmVudExpc3RlbmVyfXx7YWRkTGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVyfXx7b24sIG9mZn1cblx0Ly8gKFRhcmdldCwgc3RyaW5nLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHRLZWZpci5mcm9tRXZlbnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cblx0Ly8gKEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0S2VmaXIuc3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cblx0Ly8gQ3JlYXRlIGEgcHJvcGVydHlcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvLyAoYW55KSAtPiBQcm9wZXJ0eVxuXHRLZWZpci5jb25zdGFudCA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpO1xuXG5cdC8vIChhbnkpIC0+IFByb3BlcnR5XG5cdEtlZmlyLmNvbnN0YW50RXJyb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblxuXHQvLyBDb252ZXJ0IG9ic2VydmFibGVzXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Ly8gKFN0cmVhbXxQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgdG9Qcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb3BlcnR5ID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIHRvUHJvcGVydHkodGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW18UHJvcGVydHkpIC0+IFN0cmVhbVxuXHR2YXIgY2hhbmdlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMjYpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5jaGFuZ2VzID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBjaGFuZ2VzKHRoaXMpO1xuXHR9O1xuXG5cdC8vIEludGVyb3BlcmF0aW9uIHdpdGggb3RoZXIgaW1wbGltZW50YXRpb25zXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Ly8gKFByb21pc2UpIC0+IFByb3BlcnR5XG5cdEtlZmlyLmZyb21Qcm9taXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNyk7XG5cblx0Ly8gKFN0cmVhbXxQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9taXNlXG5cdHZhciB0b1Byb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI4KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9taXNlID0gZnVuY3Rpb24gKFByb21pc2UpIHtcblx0ICByZXR1cm4gdG9Qcm9taXNlKHRoaXMsIFByb21pc2UpO1xuXHR9O1xuXG5cdC8vIChFU09ic2VydmFibGUpIC0+IFN0cmVhbVxuXHRLZWZpci5mcm9tRVNPYnNlcnZhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOSk7XG5cblx0Ly8gKFN0cmVhbXxQcm9wZXJ0eSkgLT4gRVM3IE9ic2VydmFibGVcblx0dmFyIHRvRVNPYnNlcnZhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRvRVNPYnNlcnZhYmxlID0gdG9FU09ic2VydmFibGU7XG5cdE9ic2VydmFibGUucHJvdG90eXBlW19fd2VicGFja19yZXF1aXJlX18oMzApKCdvYnNlcnZhYmxlJyldID0gdG9FU09ic2VydmFibGU7XG5cblx0Ly8gTW9kaWZ5IGFuIG9ic2VydmFibGVcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIG1hcCA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gbWFwKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGZpbHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMzMpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gZmlsdGVyKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBudW1iZXIpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlcikgLT4gUHJvcGVydHlcblx0dmFyIHRha2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM0KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZSA9IGZ1bmN0aW9uIChuKSB7XG5cdCAgcmV0dXJuIHRha2UodGhpcywgbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgbnVtYmVyKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIpIC0+IFByb3BlcnR5XG5cdHZhciB0YWtlRXJyb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRha2VFcnJvcnMgPSBmdW5jdGlvbiAobikge1xuXHQgIHJldHVybiB0YWtlRXJyb3JzKHRoaXMsIG4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgdGFrZVdoaWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRha2VXaGlsZSA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiB0YWtlV2hpbGUodGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0pIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciBsYXN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNyk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIGxhc3QodGhpcyk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgbnVtYmVyKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIpIC0+IFByb3BlcnR5XG5cdHZhciBza2lwID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnNraXAgPSBmdW5jdGlvbiAobikge1xuXHQgIHJldHVybiBza2lwKHRoaXMsIG4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgc2tpcFdoaWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzOSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnNraXBXaGlsZSA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBza2lwV2hpbGUodGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgc2tpcER1cGxpY2F0ZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcER1cGxpY2F0ZXMgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gc2tpcER1cGxpY2F0ZXModGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufGZhbHNleSwgYW55fHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258ZmFsc2V5LCBhbnl8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgZGlmZiA9IF9fd2VicGFja19yZXF1aXJlX18oNDEpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5kaWZmID0gZnVuY3Rpb24gKGZuLCBzZWVkKSB7XG5cdCAgcmV0dXJuIGRpZmYodGhpcywgZm4sIHNlZWQpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW18UHJvcGVydHksIEZ1bmN0aW9uLCBhbnl8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgc2NhbiA9IF9fd2VicGFja19yZXF1aXJlX18oNDIpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gKGZuLCBzZWVkKSB7XG5cdCAgcmV0dXJuIHNjYW4odGhpcywgZm4sIHNlZWQpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgZmxhdHRlbiA9IF9fd2VicGFja19yZXF1aXJlX18oNDMpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0dGVuID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIGZsYXR0ZW4odGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIG51bWJlcikgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyKSAtPiBQcm9wZXJ0eVxuXHR2YXIgZGVsYXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ0KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiAod2FpdCkge1xuXHQgIHJldHVybiBkZWxheSh0aGlzLCB3YWl0KTtcblx0fTtcblxuXHQvLyBPcHRpb25zID0ge2xlYWRpbmc6IGJvb2xlYW58dW5kZWZpbmVkLCB0cmFpbGluZzogYm9vbGVhbnx1bmRlZmluZWR9XG5cdC8vIChTdHJlYW0sIG51bWJlciwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlciwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciB0aHJvdHRsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDUpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50aHJvdHRsZSA9IGZ1bmN0aW9uICh3YWl0LCBvcHRpb25zKSB7XG5cdCAgcmV0dXJuIHRocm90dGxlKHRoaXMsIHdhaXQsIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8vIE9wdGlvbnMgPSB7aW1tZWRpYXRlOiBib29sZWFufHVuZGVmaW5lZH1cblx0Ly8gKFN0cmVhbSwgbnVtYmVyLCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyLCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGRlYm91bmNlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Nyk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmRlYm91bmNlID0gZnVuY3Rpb24gKHdhaXQsIG9wdGlvbnMpIHtcblx0ICByZXR1cm4gZGVib3VuY2UodGhpcywgd2FpdCwgb3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBtYXBFcnJvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ4KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwRXJyb3JzID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIG1hcEVycm9ycyh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBmaWx0ZXJFcnJvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ5KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlsdGVyRXJyb3JzID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIGZpbHRlckVycm9ycyh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIGlnbm9yZVZhbHVlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNTApO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5pZ25vcmVWYWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIGlnbm9yZVZhbHVlcyh0aGlzKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgaWdub3JlRXJyb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmlnbm9yZUVycm9ycyA9IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gaWdub3JlRXJyb3JzKHRoaXMpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0pIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciBpZ25vcmVFbmQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUyKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuaWdub3JlRW5kID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBpZ25vcmVFbmQodGhpcyk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9uKSAtPiBQcm9wZXJ0eVxuXHR2YXIgYmVmb3JlRW5kID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Myk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmJlZm9yZUVuZCA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBiZWZvcmVFbmQodGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIG51bWJlciwgbnVtYmVyfHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyLCBudW1iZXJ8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgc2xpZGluZ1dpbmRvdyA9IF9fd2VicGFja19yZXF1aXJlX18oNTQpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5zbGlkaW5nV2luZG93ID0gZnVuY3Rpb24gKG1heCwgbWluKSB7XG5cdCAgcmV0dXJuIHNsaWRpbmdXaW5kb3codGhpcywgbWF4LCBtaW4pO1xuXHR9O1xuXG5cdC8vIE9wdGlvbnMgPSB7Zmx1c2hPbkVuZDogYm9vbGVhbnx1bmRlZmluZWR9XG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufGZhbHNleSwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufGZhbHNleSwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBidWZmZXJXaGlsZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTUpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJXaGlsZSA9IGZ1bmN0aW9uIChmbiwgb3B0aW9ucykge1xuXHQgIHJldHVybiBidWZmZXJXaGlsZSh0aGlzLCBmbiwgb3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgbnVtYmVyKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIpIC0+IFByb3BlcnR5XG5cdHZhciBidWZmZXJXaXRoQ291bnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU2KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyV2l0aENvdW50ID0gZnVuY3Rpb24gKGNvdW50LCBvcHRpb25zKSB7XG5cdCAgcmV0dXJuIGJ1ZmZlcldpdGhDb3VudCh0aGlzLCBjb3VudCwgb3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gT3B0aW9ucyA9IHtmbHVzaE9uRW5kOiBib29sZWFufHVuZGVmaW5lZH1cblx0Ly8gKFN0cmVhbSwgbnVtYmVyLCBudW1iZXIsIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIsIG51bWJlciwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBidWZmZXJXaXRoVGltZU9yQ291bnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU3KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyV2l0aFRpbWVPckNvdW50ID0gZnVuY3Rpb24gKHdhaXQsIGNvdW50LCBvcHRpb25zKSB7XG5cdCAgcmV0dXJuIGJ1ZmZlcldpdGhUaW1lT3JDb3VudCh0aGlzLCB3YWl0LCBjb3VudCwgb3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9uKSAtPiBQcm9wZXJ0eVxuXHR2YXIgdHJhbnNkdWNlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRyYW5zZHVjZSA9IGZ1bmN0aW9uICh0cmFuc2R1Y2VyKSB7XG5cdCAgcmV0dXJuIHRyYW5zZHVjZSh0aGlzLCB0cmFuc2R1Y2VyKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbikgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb24pIC0+IFByb3BlcnR5XG5cdHZhciB3aXRoSGFuZGxlciA9IF9fd2VicGFja19yZXF1aXJlX18oNTkpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS53aXRoSGFuZGxlciA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiB3aXRoSGFuZGxlcih0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gQ29tYmluZSBvYnNlcnZhYmxlc1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vIChBcnJheTxTdHJlYW18UHJvcGVydHk+LCBGdW5jdGlvbnx1bmRlZmllbmQpIC0+IFN0cmVhbVxuXHQvLyAoQXJyYXk8U3RyZWFtfFByb3BlcnR5PiwgQXJyYXk8U3RyZWFtfFByb3BlcnR5PiwgRnVuY3Rpb258dW5kZWZpZW5kKSAtPiBTdHJlYW1cblx0dmFyIGNvbWJpbmUgPSBLZWZpci5jb21iaW5lID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmNvbWJpbmUgPSBmdW5jdGlvbiAob3RoZXIsIGNvbWJpbmF0b3IpIHtcblx0ICByZXR1cm4gY29tYmluZShbdGhpcywgb3RoZXJdLCBjb21iaW5hdG9yKTtcblx0fTtcblxuXHQvLyAoQXJyYXk8U3RyZWFtfFByb3BlcnR5PiwgRnVuY3Rpb258dW5kZWZpZW5kKSAtPiBTdHJlYW1cblx0dmFyIHppcCA9IEtlZmlyLnppcCA9IF9fd2VicGFja19yZXF1aXJlX18oNjEpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS56aXAgPSBmdW5jdGlvbiAob3RoZXIsIGNvbWJpbmF0b3IpIHtcblx0ICByZXR1cm4gemlwKFt0aGlzLCBvdGhlcl0sIGNvbWJpbmF0b3IpO1xuXHR9O1xuXG5cdC8vIChBcnJheTxTdHJlYW18UHJvcGVydHk+KSAtPiBTdHJlYW1cblx0dmFyIG1lcmdlID0gS2VmaXIubWVyZ2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYyKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUubWVyZ2UgPSBmdW5jdGlvbiAob3RoZXIpIHtcblx0ICByZXR1cm4gbWVyZ2UoW3RoaXMsIG90aGVyXSk7XG5cdH07XG5cblx0Ly8gKEFycmF5PFN0cmVhbXxQcm9wZXJ0eT4pIC0+IFN0cmVhbVxuXHR2YXIgY29uY2F0ID0gS2VmaXIuY29uY2F0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uIChvdGhlcikge1xuXHQgIHJldHVybiBjb25jYXQoW3RoaXMsIG90aGVyXSk7XG5cdH07XG5cblx0Ly8gKCkgLT4gUG9vbFxuXHR2YXIgUG9vbCA9IEtlZmlyLlBvb2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY2KTtcblx0S2VmaXIucG9vbCA9IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gbmV3IFBvb2woKTtcblx0fTtcblxuXHQvLyAoRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHRLZWZpci5yZXBlYXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY1KTtcblxuXHQvLyBPcHRpb25zID0ge2NvbmN1ckxpbTogbnVtYmVyfHVuZGVmaW5lZCwgcXVldWVMaW06IG51bWJlcnx1bmRlZmluZWQsIGRyb3A6ICdvbGQnfCduZXcnfHVuZGVmaWVuZH1cblx0Ly8gKFN0cmVhbXxQcm9wZXJ0eSwgRnVuY3Rpb258ZmFsc2V5LCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdHZhciBGbGF0TWFwID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Nyk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXAgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gbmV3IEZsYXRNYXAodGhpcywgZm4pLnNldE5hbWUodGhpcywgJ2ZsYXRNYXAnKTtcblx0fTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcExhdGVzdCA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBuZXcgRmxhdE1hcCh0aGlzLCBmbiwgeyBjb25jdXJMaW06IDEsIGRyb3A6ICdvbGQnIH0pLnNldE5hbWUodGhpcywgJ2ZsYXRNYXBMYXRlc3QnKTtcblx0fTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcEZpcnN0ID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIG5ldyBGbGF0TWFwKHRoaXMsIGZuLCB7IGNvbmN1ckxpbTogMSB9KS5zZXROYW1lKHRoaXMsICdmbGF0TWFwRmlyc3QnKTtcblx0fTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcENvbmNhdCA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBuZXcgRmxhdE1hcCh0aGlzLCBmbiwgeyBxdWV1ZUxpbTogLTEsIGNvbmN1ckxpbTogMSB9KS5zZXROYW1lKHRoaXMsICdmbGF0TWFwQ29uY2F0Jyk7XG5cdH07XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBDb25jdXJMaW1pdCA9IGZ1bmN0aW9uIChmbiwgbGltaXQpIHtcblx0ICByZXR1cm4gbmV3IEZsYXRNYXAodGhpcywgZm4sIHsgcXVldWVMaW06IC0xLCBjb25jdXJMaW06IGxpbWl0IH0pLnNldE5hbWUodGhpcywgJ2ZsYXRNYXBDb25jdXJMaW1pdCcpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW18UHJvcGVydHksIEZ1bmN0aW9ufGZhbHNleSkgLT4gU3RyZWFtXG5cdHZhciBGbGF0TWFwRXJyb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2OCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBFcnJvcnMgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gbmV3IEZsYXRNYXBFcnJvcnModGhpcywgZm4pLnNldE5hbWUodGhpcywgJ2ZsYXRNYXBFcnJvcnMnKTtcblx0fTtcblxuXHQvLyBDb21iaW5lIHR3byBvYnNlcnZhYmxlc1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vIChTdHJlYW0sIFN0cmVhbXxQcm9wZXJ0eSkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgU3RyZWFtfFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgZmlsdGVyQnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY5KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlsdGVyQnkgPSBmdW5jdGlvbiAob3RoZXIpIHtcblx0ICByZXR1cm4gZmlsdGVyQnkodGhpcywgb3RoZXIpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIFN0cmVhbXxQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpZW5kKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBTdHJlYW18UHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaWVuZCkgLT4gUHJvcGVydHlcblx0dmFyIHNhbXBsZWRCeTJpdGVtcyA9IF9fd2VicGFja19yZXF1aXJlX18oNzEpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5zYW1wbGVkQnkgPSBmdW5jdGlvbiAob3RoZXIsIGNvbWJpbmF0b3IpIHtcblx0ICByZXR1cm4gc2FtcGxlZEJ5Mml0ZW1zKHRoaXMsIG90aGVyLCBjb21iaW5hdG9yKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBTdHJlYW18UHJvcGVydHkpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIFN0cmVhbXxQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIHNraXBVbnRpbEJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Mik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnNraXBVbnRpbEJ5ID0gZnVuY3Rpb24gKG90aGVyKSB7XG5cdCAgcmV0dXJuIHNraXBVbnRpbEJ5KHRoaXMsIG90aGVyKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBTdHJlYW18UHJvcGVydHkpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIFN0cmVhbXxQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIHRha2VVbnRpbEJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Myk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRha2VVbnRpbEJ5ID0gZnVuY3Rpb24gKG90aGVyKSB7XG5cdCAgcmV0dXJuIHRha2VVbnRpbEJ5KHRoaXMsIG90aGVyKTtcblx0fTtcblxuXHQvLyBPcHRpb25zID0ge2ZsdXNoT25FbmQ6IGJvb2xlYW58dW5kZWZpbmVkfVxuXHQvLyAoU3RyZWFtLCBTdHJlYW18UHJvcGVydHksIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBTdHJlYW18UHJvcGVydHksIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgYnVmZmVyQnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc0KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyQnkgPSBmdW5jdGlvbiAob3RoZXIsIG9wdGlvbnMpIHtcblx0ICByZXR1cm4gYnVmZmVyQnkodGhpcywgb3RoZXIsIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8vIE9wdGlvbnMgPSB7Zmx1c2hPbkVuZDogYm9vbGVhbnx1bmRlZmluZWR9XG5cdC8vIChTdHJlYW0sIFN0cmVhbXxQcm9wZXJ0eSwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIFN0cmVhbXxQcm9wZXJ0eSwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBidWZmZXJXaGlsZUJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlcldoaWxlQnkgPSBmdW5jdGlvbiAob3RoZXIsIG9wdGlvbnMpIHtcblx0ICByZXR1cm4gYnVmZmVyV2hpbGVCeSh0aGlzLCBvdGhlciwgb3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gRGVwcmVjYXRlZFxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGZ1bmN0aW9uIHdhcm4obXNnKSB7XG5cdCAgaWYgKEtlZmlyLkRFUFJFQ0FUSU9OX1dBUk5JTkdTICE9PSBmYWxzZSAmJiBjb25zb2xlICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHZhciBtc2cyID0gJ1xcbkhlcmUgaXMgYW4gRXJyb3Igb2JqZWN0IGZvciB5b3UgY29udGFpbmluZyB0aGUgY2FsbCBzdGFjazonO1xuXHQgICAgY29uc29sZS53YXJuKG1zZywgbXNnMiwgbmV3IEVycm9yKCkpO1xuXHQgIH1cblx0fVxuXG5cdC8vIChTdHJlYW18UHJvcGVydHksIFN0cmVhbXxQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIGF3YWl0aW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Nik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmF3YWl0aW5nID0gZnVuY3Rpb24gKG90aGVyKSB7XG5cdCAgd2FybignWW91IGFyZSB1c2luZyBkZXByZWNhdGVkIC5hd2FpdGluZygpIG1ldGhvZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ycG9taW5vdi9rZWZpci9pc3N1ZXMvMTQ1Jyk7XG5cdCAgcmV0dXJuIGF3YWl0aW5nKHRoaXMsIG90aGVyKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIHZhbHVlc1RvRXJyb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3Nyk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlc1RvRXJyb3JzID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgd2FybignWW91IGFyZSB1c2luZyBkZXByZWNhdGVkIC52YWx1ZXNUb0Vycm9ycygpIG1ldGhvZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ycG9taW5vdi9rZWZpci9pc3N1ZXMvMTQ5Jyk7XG5cdCAgcmV0dXJuIHZhbHVlc1RvRXJyb3JzKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGVycm9yc1RvVmFsdWVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3OCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmVycm9yc1RvVmFsdWVzID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgd2FybignWW91IGFyZSB1c2luZyBkZXByZWNhdGVkIC5lcnJvcnNUb1ZhbHVlcygpIG1ldGhvZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ycG9taW5vdi9rZWZpci9pc3N1ZXMvMTQ5Jyk7XG5cdCAgcmV0dXJuIGVycm9yc1RvVmFsdWVzKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgZW5kT25FcnJvciA9IF9fd2VicGFja19yZXF1aXJlX18oNzkpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5lbmRPbkVycm9yID0gZnVuY3Rpb24gKCkge1xuXHQgIHdhcm4oJ1lvdSBhcmUgdXNpbmcgZGVwcmVjYXRlZCAuZW5kT25FcnJvcigpIG1ldGhvZCwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ycG9taW5vdi9rZWZpci9pc3N1ZXMvMTUwJyk7XG5cdCAgcmV0dXJuIGVuZE9uRXJyb3IodGhpcyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgZXh0ZW5kID0gX3JlcXVpcmUuZXh0ZW5kO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlMi5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUyLkVSUk9SO1xuXHR2YXIgQU5ZID0gX3JlcXVpcmUyLkFOWTtcblx0dmFyIEVORCA9IF9yZXF1aXJlMi5FTkQ7XG5cblx0dmFyIF9yZXF1aXJlMyA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cblx0dmFyIERpc3BhdGNoZXIgPSBfcmVxdWlyZTMuRGlzcGF0Y2hlcjtcblx0dmFyIGNhbGxTdWJzY3JpYmVyID0gX3JlcXVpcmUzLmNhbGxTdWJzY3JpYmVyO1xuXG5cdHZhciBfcmVxdWlyZTQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdHZhciBmaW5kQnlQcmVkID0gX3JlcXVpcmU0LmZpbmRCeVByZWQ7XG5cblx0ZnVuY3Rpb24gT2JzZXJ2YWJsZSgpIHtcblx0ICB0aGlzLl9kaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcblx0ICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcblx0ICB0aGlzLl9hbGl2ZSA9IHRydWU7XG5cdCAgdGhpcy5fYWN0aXZhdGluZyA9IGZhbHNlO1xuXHQgIHRoaXMuX2xvZ0hhbmRsZXJzID0gbnVsbDtcblx0fVxuXG5cdGV4dGVuZChPYnNlcnZhYmxlLnByb3RvdHlwZSwge1xuXG5cdCAgX25hbWU6ICdvYnNlcnZhYmxlJyxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7fSxcblx0ICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHt9LFxuXG5cdCAgX3NldEFjdGl2ZTogZnVuY3Rpb24gX3NldEFjdGl2ZShhY3RpdmUpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmUgIT09IGFjdGl2ZSkge1xuXHQgICAgICB0aGlzLl9hY3RpdmUgPSBhY3RpdmU7XG5cdCAgICAgIGlmIChhY3RpdmUpIHtcblx0ICAgICAgICB0aGlzLl9hY3RpdmF0aW5nID0gdHJ1ZTtcblx0ICAgICAgICB0aGlzLl9vbkFjdGl2YXRpb24oKTtcblx0ICAgICAgICB0aGlzLl9hY3RpdmF0aW5nID0gZmFsc2U7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5fb25EZWFjdGl2YXRpb24oKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgIHRoaXMuX3NldEFjdGl2ZShmYWxzZSk7XG5cdCAgICB0aGlzLl9kaXNwYXRjaGVyLmNsZWFudXAoKTtcblx0ICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBudWxsO1xuXHQgICAgdGhpcy5fbG9nSGFuZGxlcnMgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfZW1pdDogZnVuY3Rpb24gX2VtaXQodHlwZSwgeCkge1xuXHQgICAgc3dpdGNoICh0eXBlKSB7XG5cdCAgICAgIGNhc2UgVkFMVUU6XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgICAgY2FzZSBFUlJPUjpcblx0ICAgICAgICByZXR1cm4gdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgICBjYXNlIEVORDpcblx0ICAgICAgICByZXR1cm4gdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZW1pdFZhbHVlOiBmdW5jdGlvbiBfZW1pdFZhbHVlKHZhbHVlKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IFZBTFVFLCB2YWx1ZTogdmFsdWUgfSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9lbWl0RXJyb3I6IGZ1bmN0aW9uIF9lbWl0RXJyb3IodmFsdWUpIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogRVJST1IsIHZhbHVlOiB2YWx1ZSB9KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2VtaXRFbmQ6IGZ1bmN0aW9uIF9lbWl0RW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHRoaXMuX2FsaXZlID0gZmFsc2U7XG5cdCAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBFTkQgfSk7XG5cdCAgICAgIHRoaXMuX2NsZWFyKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbjogZnVuY3Rpb24gX29uKHR5cGUsIGZuKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdGhpcy5fZGlzcGF0Y2hlci5hZGQodHlwZSwgZm4pO1xuXHQgICAgICB0aGlzLl9zZXRBY3RpdmUodHJ1ZSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBjYWxsU3Vic2NyaWJlcih0eXBlLCBmbiwgeyB0eXBlOiBFTkQgfSk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9LFxuXG5cdCAgX29mZjogZnVuY3Rpb24gX29mZih0eXBlLCBmbikge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHZhciBjb3VudCA9IHRoaXMuX2Rpc3BhdGNoZXIucmVtb3ZlKHR5cGUsIGZuKTtcblx0ICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG5cdCAgICAgICAgdGhpcy5fc2V0QWN0aXZlKGZhbHNlKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfSxcblxuXHQgIG9uVmFsdWU6IGZ1bmN0aW9uIG9uVmFsdWUoZm4pIHtcblx0ICAgIHJldHVybiB0aGlzLl9vbihWQUxVRSwgZm4pO1xuXHQgIH0sXG5cdCAgb25FcnJvcjogZnVuY3Rpb24gb25FcnJvcihmbikge1xuXHQgICAgcmV0dXJuIHRoaXMuX29uKEVSUk9SLCBmbik7XG5cdCAgfSxcblx0ICBvbkVuZDogZnVuY3Rpb24gb25FbmQoZm4pIHtcblx0ICAgIHJldHVybiB0aGlzLl9vbihFTkQsIGZuKTtcblx0ICB9LFxuXHQgIG9uQW55OiBmdW5jdGlvbiBvbkFueShmbikge1xuXHQgICAgcmV0dXJuIHRoaXMuX29uKEFOWSwgZm4pO1xuXHQgIH0sXG5cblx0ICBvZmZWYWx1ZTogZnVuY3Rpb24gb2ZmVmFsdWUoZm4pIHtcblx0ICAgIHJldHVybiB0aGlzLl9vZmYoVkFMVUUsIGZuKTtcblx0ICB9LFxuXHQgIG9mZkVycm9yOiBmdW5jdGlvbiBvZmZFcnJvcihmbikge1xuXHQgICAgcmV0dXJuIHRoaXMuX29mZihFUlJPUiwgZm4pO1xuXHQgIH0sXG5cdCAgb2ZmRW5kOiBmdW5jdGlvbiBvZmZFbmQoZm4pIHtcblx0ICAgIHJldHVybiB0aGlzLl9vZmYoRU5ELCBmbik7XG5cdCAgfSxcblx0ICBvZmZBbnk6IGZ1bmN0aW9uIG9mZkFueShmbikge1xuXHQgICAgcmV0dXJuIHRoaXMuX29mZihBTlksIGZuKTtcblx0ICB9LFxuXG5cdCAgLy8gQSBhbmQgQiBtdXN0IGJlIHN1YmNsYXNzZXMgb2YgU3RyZWFtIGFuZCBQcm9wZXJ0eSAob3JkZXIgZG9lc24ndCBtYXR0ZXIpXG5cdCAgX29mU2FtZVR5cGU6IGZ1bmN0aW9uIF9vZlNhbWVUeXBlKEEsIEIpIHtcblx0ICAgIHJldHVybiBBLnByb3RvdHlwZS5nZXRUeXBlKCkgPT09IHRoaXMuZ2V0VHlwZSgpID8gQSA6IEI7XG5cdCAgfSxcblxuXHQgIHNldE5hbWU6IGZ1bmN0aW9uIHNldE5hbWUoc291cmNlT2JzLCAvKiBvcHRpb25hbCAqL3NlbGZOYW1lKSB7XG5cdCAgICB0aGlzLl9uYW1lID0gc2VsZk5hbWUgPyBzb3VyY2VPYnMuX25hbWUgKyAnLicgKyBzZWxmTmFtZSA6IHNvdXJjZU9icztcblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH0sXG5cblx0ICBsb2c6IGZ1bmN0aW9uIGxvZygpIHtcblx0ICAgIHZhciBuYW1lID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdGhpcy50b1N0cmluZygpIDogYXJndW1lbnRzWzBdO1xuXG5cdCAgICB2YXIgaXNDdXJyZW50ID0gdW5kZWZpbmVkO1xuXHQgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG5cdCAgICAgIHZhciB0eXBlID0gJzwnICsgZXZlbnQudHlwZSArIChpc0N1cnJlbnQgPyAnOmN1cnJlbnQnIDogJycpICsgJz4nO1xuXHQgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gRU5EKSB7XG5cdCAgICAgICAgY29uc29sZS5sb2cobmFtZSwgdHlwZSk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgY29uc29sZS5sb2cobmFtZSwgdHlwZSwgZXZlbnQudmFsdWUpO1xuXHQgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgaWYgKCF0aGlzLl9sb2dIYW5kbGVycykge1xuXHQgICAgICAgIHRoaXMuX2xvZ0hhbmRsZXJzID0gW107XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5fbG9nSGFuZGxlcnMucHVzaCh7IG5hbWU6IG5hbWUsIGhhbmRsZXI6IGhhbmRsZXIgfSk7XG5cdCAgICB9XG5cblx0ICAgIGlzQ3VycmVudCA9IHRydWU7XG5cdCAgICB0aGlzLm9uQW55KGhhbmRsZXIpO1xuXHQgICAgaXNDdXJyZW50ID0gZmFsc2U7XG5cblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH0sXG5cblx0ICBvZmZMb2c6IGZ1bmN0aW9uIG9mZkxvZygpIHtcblx0ICAgIHZhciBuYW1lID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gdGhpcy50b1N0cmluZygpIDogYXJndW1lbnRzWzBdO1xuXG5cdCAgICBpZiAodGhpcy5fbG9nSGFuZGxlcnMpIHtcblx0ICAgICAgdmFyIGhhbmRsZXJJbmRleCA9IGZpbmRCeVByZWQodGhpcy5fbG9nSGFuZGxlcnMsIGZ1bmN0aW9uIChvYmopIHtcblx0ICAgICAgICByZXR1cm4gb2JqLm5hbWUgPT09IG5hbWU7XG5cdCAgICAgIH0pO1xuXHQgICAgICBpZiAoaGFuZGxlckluZGV4ICE9PSAtMSkge1xuXHQgICAgICAgIHRoaXMub2ZmQW55KHRoaXMuX2xvZ0hhbmRsZXJzW2hhbmRsZXJJbmRleF0uaGFuZGxlcik7XG5cdCAgICAgICAgdGhpcy5fbG9nSGFuZGxlcnMuc3BsaWNlKGhhbmRsZXJJbmRleCwgMSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfVxuXHR9KTtcblxuXHQvLyBleHRlbmQoKSBjYW4ndCBoYW5kbGUgYHRvU3RyaW5nYCBpbiBJRThcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuICdbJyArIHRoaXMuX25hbWUgKyAnXSc7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBPYnNlcnZhYmxlO1xuXG4vKioqLyB9LFxuLyogMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0ZnVuY3Rpb24gY3JlYXRlT2JqKHByb3RvKSB7XG5cdCAgdmFyIEYgPSBmdW5jdGlvbiBGKCkge307XG5cdCAgRi5wcm90b3R5cGUgPSBwcm90bztcblx0ICByZXR1cm4gbmV3IEYoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQgLyosIG1peGluMSwgbWl4aW4yLi4uKi8pIHtcblx0ICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0ICAgICAgaSA9IHVuZGVmaW5lZCxcblx0ICAgICAgcHJvcCA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIGZvciAocHJvcCBpbiBhcmd1bWVudHNbaV0pIHtcblx0ICAgICAgdGFyZ2V0W3Byb3BdID0gYXJndW1lbnRzW2ldW3Byb3BdO1xuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gdGFyZ2V0O1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5oZXJpdChDaGlsZCwgUGFyZW50IC8qLCBtaXhpbjEsIG1peGluMi4uLiovKSB7XG5cdCAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgQ2hpbGQucHJvdG90eXBlID0gY3JlYXRlT2JqKFBhcmVudC5wcm90b3R5cGUpO1xuXHQgIENoaWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENoaWxkO1xuXHQgIGZvciAoaSA9IDI7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgZXh0ZW5kKENoaWxkLnByb3RvdHlwZSwgYXJndW1lbnRzW2ldKTtcblx0ICB9XG5cdCAgcmV0dXJuIENoaWxkO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7IGV4dGVuZDogZXh0ZW5kLCBpbmhlcml0OiBpbmhlcml0IH07XG5cbi8qKiovIH0sXG4vKiAzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0ZXhwb3J0cy5OT1RISU5HID0gWyc8bm90aGluZz4nXTtcblx0ZXhwb3J0cy5FTkQgPSAnZW5kJztcblx0ZXhwb3J0cy5WQUxVRSA9ICd2YWx1ZSc7XG5cdGV4cG9ydHMuRVJST1IgPSAnZXJyb3InO1xuXHRleHBvcnRzLkFOWSA9ICdhbnknO1xuXG4vKioqLyB9LFxuLyogNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGV4dGVuZCA9IF9yZXF1aXJlLmV4dGVuZDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZTIuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlMi5FUlJPUjtcblx0dmFyIEFOWSA9IF9yZXF1aXJlMi5BTlk7XG5cblx0dmFyIF9yZXF1aXJlMyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIGNvbmNhdCA9IF9yZXF1aXJlMy5jb25jYXQ7XG5cdHZhciBmaW5kQnlQcmVkID0gX3JlcXVpcmUzLmZpbmRCeVByZWQ7XG5cdHZhciBfcmVtb3ZlID0gX3JlcXVpcmUzLnJlbW92ZTtcblx0dmFyIGNvbnRhaW5zID0gX3JlcXVpcmUzLmNvbnRhaW5zO1xuXG5cdGZ1bmN0aW9uIGNhbGxTdWJzY3JpYmVyKHR5cGUsIGZuLCBldmVudCkge1xuXHQgIGlmICh0eXBlID09PSBBTlkpIHtcblx0ICAgIGZuKGV2ZW50KTtcblx0ICB9IGVsc2UgaWYgKHR5cGUgPT09IGV2ZW50LnR5cGUpIHtcblx0ICAgIGlmICh0eXBlID09PSBWQUxVRSB8fCB0eXBlID09PSBFUlJPUikge1xuXHQgICAgICBmbihldmVudC52YWx1ZSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBmbigpO1xuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIERpc3BhdGNoZXIoKSB7XG5cdCAgdGhpcy5faXRlbXMgPSBbXTtcblx0ICB0aGlzLl9pbkxvb3AgPSAwO1xuXHQgIHRoaXMuX3JlbW92ZWRJdGVtcyA9IG51bGw7XG5cdH1cblxuXHRleHRlbmQoRGlzcGF0Y2hlci5wcm90b3R5cGUsIHtcblxuXHQgIGFkZDogZnVuY3Rpb24gYWRkKHR5cGUsIGZuKSB7XG5cdCAgICB0aGlzLl9pdGVtcyA9IGNvbmNhdCh0aGlzLl9pdGVtcywgW3sgdHlwZTogdHlwZSwgZm46IGZuIH1dKTtcblx0ICAgIHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGg7XG5cdCAgfSxcblxuXHQgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKHR5cGUsIGZuKSB7XG5cdCAgICB2YXIgaW5kZXggPSBmaW5kQnlQcmVkKHRoaXMuX2l0ZW1zLCBmdW5jdGlvbiAoeCkge1xuXHQgICAgICByZXR1cm4geC50eXBlID09PSB0eXBlICYmIHguZm4gPT09IGZuO1xuXHQgICAgfSk7XG5cblx0ICAgIC8vIGlmIHdlJ3JlIGN1cnJlbnRseSBpbiBhIG5vdGlmaWNhdGlvbiBsb29wLFxuXHQgICAgLy8gcmVtZW1iZXIgdGhpcyBzdWJzY3JpYmVyIHdhcyByZW1vdmVkXG5cdCAgICBpZiAodGhpcy5faW5Mb29wICE9PSAwICYmIGluZGV4ICE9PSAtMSkge1xuXHQgICAgICBpZiAodGhpcy5fcmVtb3ZlZEl0ZW1zID09PSBudWxsKSB7XG5cdCAgICAgICAgdGhpcy5fcmVtb3ZlZEl0ZW1zID0gW107XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5fcmVtb3ZlZEl0ZW1zLnB1c2godGhpcy5faXRlbXNbaW5kZXhdKTtcblx0ICAgIH1cblxuXHQgICAgdGhpcy5faXRlbXMgPSBfcmVtb3ZlKHRoaXMuX2l0ZW1zLCBpbmRleCk7XG5cdCAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuXHQgIH0sXG5cblx0ICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goZXZlbnQpIHtcblx0ICAgIHRoaXMuX2luTG9vcCsrO1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIGl0ZW1zID0gdGhpcy5faXRlbXM7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXG5cdCAgICAgIC8vIGNsZWFudXAgd2FzIGNhbGxlZFxuXHQgICAgICBpZiAodGhpcy5faXRlbXMgPT09IG51bGwpIHtcblx0ICAgICAgICBicmVhaztcblx0ICAgICAgfVxuXG5cdCAgICAgIC8vIHRoaXMgc3Vic2NyaWJlciB3YXMgcmVtb3ZlZFxuXHQgICAgICBpZiAodGhpcy5fcmVtb3ZlZEl0ZW1zICE9PSBudWxsICYmIGNvbnRhaW5zKHRoaXMuX3JlbW92ZWRJdGVtcywgaXRlbXNbaV0pKSB7XG5cdCAgICAgICAgY29udGludWU7XG5cdCAgICAgIH1cblxuXHQgICAgICBjYWxsU3Vic2NyaWJlcihpdGVtc1tpXS50eXBlLCBpdGVtc1tpXS5mbiwgZXZlbnQpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5faW5Mb29wLS07XG5cdCAgICBpZiAodGhpcy5faW5Mb29wID09PSAwKSB7XG5cdCAgICAgIHRoaXMuX3JlbW92ZWRJdGVtcyA9IG51bGw7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIGNsZWFudXA6IGZ1bmN0aW9uIGNsZWFudXAoKSB7XG5cdCAgICB0aGlzLl9pdGVtcyA9IG51bGw7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0geyBjYWxsU3Vic2NyaWJlcjogY2FsbFN1YnNjcmliZXIsIERpc3BhdGNoZXI6IERpc3BhdGNoZXIgfTtcblxuLyoqKi8gfSxcbi8qIDUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGZ1bmN0aW9uIGNvbmNhdChhLCBiKSB7XG5cdCAgdmFyIHJlc3VsdCA9IHVuZGVmaW5lZCxcblx0ICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkLFxuXHQgICAgICBpID0gdW5kZWZpbmVkLFxuXHQgICAgICBqID0gdW5kZWZpbmVkO1xuXHQgIGlmIChhLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgcmV0dXJuIGI7XG5cdCAgfVxuXHQgIGlmIChiLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgcmV0dXJuIGE7XG5cdCAgfVxuXHQgIGogPSAwO1xuXHQgIHJlc3VsdCA9IG5ldyBBcnJheShhLmxlbmd0aCArIGIubGVuZ3RoKTtcblx0ICBsZW5ndGggPSBhLmxlbmd0aDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyssIGorKykge1xuXHQgICAgcmVzdWx0W2pdID0gYVtpXTtcblx0ICB9XG5cdCAgbGVuZ3RoID0gYi5sZW5ndGg7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrLCBqKyspIHtcblx0ICAgIHJlc3VsdFtqXSA9IGJbaV07XG5cdCAgfVxuXHQgIHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBjaXJjbGVTaGlmdChhcnIsIGRpc3RhbmNlKSB7XG5cdCAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXG5cdCAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShsZW5ndGgpLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgcmVzdWx0WyhpICsgZGlzdGFuY2UpICUgbGVuZ3RoXSA9IGFycltpXTtcblx0ICB9XG5cdCAgcmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGZpbmQoYXJyLCB2YWx1ZSkge1xuXHQgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgaWYgKGFycltpXSA9PT0gdmFsdWUpIHtcblx0ICAgICAgcmV0dXJuIGk7XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiAtMTtcblx0fVxuXG5cdGZ1bmN0aW9uIGZpbmRCeVByZWQoYXJyLCBwcmVkKSB7XG5cdCAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICBpZiAocHJlZChhcnJbaV0pKSB7XG5cdCAgICAgIHJldHVybiBpO1xuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gLTE7XG5cdH1cblxuXHRmdW5jdGlvbiBjbG9uZUFycmF5KGlucHV0KSB7XG5cdCAgdmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0ICAgICAgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aCksXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICByZXN1bHRbaV0gPSBpbnB1dFtpXTtcblx0ICB9XG5cdCAgcmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIHJlbW92ZShpbnB1dCwgaW5kZXgpIHtcblx0ICB2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHQgICAgICByZXN1bHQgPSB1bmRlZmluZWQsXG5cdCAgICAgIGkgPSB1bmRlZmluZWQsXG5cdCAgICAgIGogPSB1bmRlZmluZWQ7XG5cdCAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGgpIHtcblx0ICAgIGlmIChsZW5ndGggPT09IDEpIHtcblx0ICAgICAgcmV0dXJuIFtdO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aCAtIDEpO1xuXHQgICAgICBmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgaWYgKGkgIT09IGluZGV4KSB7XG5cdCAgICAgICAgICByZXN1bHRbal0gPSBpbnB1dFtpXTtcblx0ICAgICAgICAgIGorKztcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgcmV0dXJuIHJlc3VsdDtcblx0ICAgIH1cblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIGlucHV0O1xuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIHJlbW92ZUJ5UHJlZChpbnB1dCwgcHJlZCkge1xuXHQgIHJldHVybiByZW1vdmUoaW5wdXQsIGZpbmRCeVByZWQoaW5wdXQsIHByZWQpKTtcblx0fVxuXG5cdGZ1bmN0aW9uIG1hcChpbnB1dCwgZm4pIHtcblx0ICB2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHQgICAgICByZXN1bHQgPSBuZXcgQXJyYXkobGVuZ3RoKSxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIHJlc3VsdFtpXSA9IGZuKGlucHV0W2ldKTtcblx0ICB9XG5cdCAgcmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGZvckVhY2goYXJyLCBmbikge1xuXHQgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgZm4oYXJyW2ldKTtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBmaWxsQXJyYXkoYXJyLCB2YWx1ZSkge1xuXHQgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgYXJyW2ldID0gdmFsdWU7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY29udGFpbnMoYXJyLCB2YWx1ZSkge1xuXHQgIHJldHVybiBmaW5kKGFyciwgdmFsdWUpICE9PSAtMTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNsaWRlKGN1ciwgbmV4dCwgbWF4KSB7XG5cdCAgdmFyIGxlbmd0aCA9IE1hdGgubWluKG1heCwgY3VyLmxlbmd0aCArIDEpLFxuXHQgICAgICBvZmZzZXQgPSBjdXIubGVuZ3RoIC0gbGVuZ3RoICsgMSxcblx0ICAgICAgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aCksXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIHJlc3VsdFtpIC0gb2Zmc2V0XSA9IGN1cltpXTtcblx0ICB9XG5cdCAgcmVzdWx0W2xlbmd0aCAtIDFdID0gbmV4dDtcblx0ICByZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7XG5cdCAgY29uY2F0OiBjb25jYXQsXG5cdCAgY2lyY2xlU2hpZnQ6IGNpcmNsZVNoaWZ0LFxuXHQgIGZpbmQ6IGZpbmQsXG5cdCAgZmluZEJ5UHJlZDogZmluZEJ5UHJlZCxcblx0ICBjbG9uZUFycmF5OiBjbG9uZUFycmF5LFxuXHQgIHJlbW92ZTogcmVtb3ZlLFxuXHQgIHJlbW92ZUJ5UHJlZDogcmVtb3ZlQnlQcmVkLFxuXHQgIG1hcDogbWFwLFxuXHQgIGZvckVhY2g6IGZvckVhY2gsXG5cdCAgZmlsbEFycmF5OiBmaWxsQXJyYXksXG5cdCAgY29udGFpbnM6IGNvbnRhaW5zLFxuXHQgIHNsaWRlOiBzbGlkZVxuXHR9O1xuXG4vKioqLyB9LFxuLyogNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBPYnNlcnZhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxuXHRmdW5jdGlvbiBTdHJlYW0oKSB7XG5cdCAgT2JzZXJ2YWJsZS5jYWxsKHRoaXMpO1xuXHR9XG5cblx0aW5oZXJpdChTdHJlYW0sIE9ic2VydmFibGUsIHtcblxuXHQgIF9uYW1lOiAnc3RyZWFtJyxcblxuXHQgIGdldFR5cGU6IGZ1bmN0aW9uIGdldFR5cGUoKSB7XG5cdCAgICByZXR1cm4gJ3N0cmVhbSc7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gU3RyZWFtO1xuXG4vKioqLyB9LFxuLyogNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlMi5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUyLkVSUk9SO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUyLkVORDtcblxuXHR2YXIgX3JlcXVpcmUzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxuXHR2YXIgY2FsbFN1YnNjcmliZXIgPSBfcmVxdWlyZTMuY2FsbFN1YnNjcmliZXI7XG5cblx0dmFyIE9ic2VydmFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG5cdGZ1bmN0aW9uIFByb3BlcnR5KCkge1xuXHQgIE9ic2VydmFibGUuY2FsbCh0aGlzKTtcblx0ICB0aGlzLl9jdXJyZW50RXZlbnQgPSBudWxsO1xuXHR9XG5cblx0aW5oZXJpdChQcm9wZXJ0eSwgT2JzZXJ2YWJsZSwge1xuXG5cdCAgX25hbWU6ICdwcm9wZXJ0eScsXG5cblx0ICBfZW1pdFZhbHVlOiBmdW5jdGlvbiBfZW1pdFZhbHVlKHZhbHVlKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdGhpcy5fY3VycmVudEV2ZW50ID0geyB0eXBlOiBWQUxVRSwgdmFsdWU6IHZhbHVlIH07XG5cdCAgICAgIGlmICghdGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBWQUxVRSwgdmFsdWU6IHZhbHVlIH0pO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9lbWl0RXJyb3I6IGZ1bmN0aW9uIF9lbWl0RXJyb3IodmFsdWUpIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB0aGlzLl9jdXJyZW50RXZlbnQgPSB7IHR5cGU6IEVSUk9SLCB2YWx1ZTogdmFsdWUgfTtcblx0ICAgICAgaWYgKCF0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IEVSUk9SLCB2YWx1ZTogdmFsdWUgfSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2VtaXRFbmQ6IGZ1bmN0aW9uIF9lbWl0RW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHRoaXMuX2FsaXZlID0gZmFsc2U7XG5cdCAgICAgIGlmICghdGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBFTkQgfSk7XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5fY2xlYXIoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uOiBmdW5jdGlvbiBfb24odHlwZSwgZm4pIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB0aGlzLl9kaXNwYXRjaGVyLmFkZCh0eXBlLCBmbik7XG5cdCAgICAgIHRoaXMuX3NldEFjdGl2ZSh0cnVlKTtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLl9jdXJyZW50RXZlbnQgIT09IG51bGwpIHtcblx0ICAgICAgY2FsbFN1YnNjcmliZXIodHlwZSwgZm4sIHRoaXMuX2N1cnJlbnRFdmVudCk7XG5cdCAgICB9XG5cdCAgICBpZiAoIXRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIGNhbGxTdWJzY3JpYmVyKHR5cGUsIGZuLCB7IHR5cGU6IEVORCB9KTtcblx0ICAgIH1cblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH0sXG5cblx0ICBnZXRUeXBlOiBmdW5jdGlvbiBnZXRUeXBlKCkge1xuXHQgICAgcmV0dXJuICdwcm9wZXJ0eSc7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gUHJvcGVydHk7XG5cbi8qKiovIH0sXG4vKiA4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIG5ldmVyUyA9IG5ldyBTdHJlYW0oKTtcblx0bmV2ZXJTLl9lbWl0RW5kKCk7XG5cdG5ldmVyUy5fbmFtZSA9ICduZXZlcic7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuZXZlcigpIHtcblx0ICByZXR1cm4gbmV2ZXJTO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciB0aW1lQmFzZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxuXHR2YXIgUyA9IHRpbWVCYXNlZCh7XG5cblx0ICBfbmFtZTogJ2xhdGVyJyxcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgeCA9IF9yZWYueDtcblxuXHQgICAgdGhpcy5feCA9IHg7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX3ggPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfb25UaWNrOiBmdW5jdGlvbiBfb25UaWNrKCkge1xuXHQgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX3gpO1xuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxhdGVyKHdhaXQsIHgpIHtcblx0ICByZXR1cm4gbmV3IFMod2FpdCwgeyB4OiB4IH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRpbWVCYXNlZChtaXhpbikge1xuXG5cdCAgZnVuY3Rpb24gQW5vbnltb3VzU3RyZWFtKHdhaXQsIG9wdGlvbnMpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICAgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fd2FpdCA9IHdhaXQ7XG5cdCAgICB0aGlzLl9pbnRlcnZhbElkID0gbnVsbDtcblx0ICAgIHRoaXMuXyRvblRpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5fb25UaWNrKCk7XG5cdCAgICB9O1xuXHQgICAgdGhpcy5faW5pdChvcHRpb25zKTtcblx0ICB9XG5cblx0ICBpbmhlcml0KEFub255bW91c1N0cmVhbSwgU3RyZWFtLCB7XG5cblx0ICAgIF9pbml0OiBmdW5jdGlvbiBfaW5pdCgpIHt9LFxuXHQgICAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge30sXG5cblx0ICAgIF9vblRpY2s6IGZ1bmN0aW9uIF9vblRpY2soKSB7fSxcblxuXHQgICAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRoaXMuXyRvblRpY2ssIHRoaXMuX3dhaXQpO1xuXHQgICAgfSxcblxuXHQgICAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICAgIGlmICh0aGlzLl9pbnRlcnZhbElkICE9PSBudWxsKSB7XG5cdCAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbElkKTtcblx0ICAgICAgICB0aGlzLl9pbnRlcnZhbElkID0gbnVsbDtcblx0ICAgICAgfVxuXHQgICAgfSxcblxuXHQgICAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICAgIFN0cmVhbS5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICAgIHRoaXMuXyRvblRpY2sgPSBudWxsO1xuXHQgICAgICB0aGlzLl9mcmVlKCk7XG5cdCAgICB9XG5cblx0ICB9LCBtaXhpbik7XG5cblx0ICByZXR1cm4gQW5vbnltb3VzU3RyZWFtO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgdGltZUJhc2VkID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cblx0dmFyIFMgPSB0aW1lQmFzZWQoe1xuXG5cdCAgX25hbWU6ICdpbnRlcnZhbCcsXG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIHggPSBfcmVmLng7XG5cblx0ICAgIHRoaXMuX3ggPSB4O1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl94ID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX29uVGljazogZnVuY3Rpb24gX29uVGljaygpIHtcblx0ICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl94KTtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnRlcnZhbCh3YWl0LCB4KSB7XG5cdCAgcmV0dXJuIG5ldyBTKHdhaXQsIHsgeDogeCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDEyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHRpbWVCYXNlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIGNsb25lQXJyYXkgPSBfcmVxdWlyZS5jbG9uZUFycmF5O1xuXG5cdHZhciBuZXZlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cblx0dmFyIFMgPSB0aW1lQmFzZWQoe1xuXG5cdCAgX25hbWU6ICdzZXF1ZW50aWFsbHknLFxuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciB4cyA9IF9yZWYueHM7XG5cblx0ICAgIHRoaXMuX3hzID0gY2xvbmVBcnJheSh4cyk7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX3hzID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX29uVGljazogZnVuY3Rpb24gX29uVGljaygpIHtcblx0ICAgIGlmICh0aGlzLl94cy5sZW5ndGggPT09IDEpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX3hzWzBdKTtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX3hzLnNoaWZ0KCkpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNlcXVlbnRpYWxseSh3YWl0LCB4cykge1xuXHQgIHJldHVybiB4cy5sZW5ndGggPT09IDAgPyBuZXZlcigpIDogbmV3IFMod2FpdCwgeyB4czogeHMgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciB0aW1lQmFzZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxuXHR2YXIgUyA9IHRpbWVCYXNlZCh7XG5cblx0ICBfbmFtZTogJ2Zyb21Qb2xsJyxcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9vblRpY2s6IGZ1bmN0aW9uIF9vblRpY2soKSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIHRoaXMuX2VtaXRWYWx1ZShmbigpKTtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tUG9sbCh3YWl0LCBmbikge1xuXHQgIHJldHVybiBuZXcgUyh3YWl0LCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDE0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHRpbWVCYXNlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXHR2YXIgZW1pdHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG5cdHZhciBTID0gdGltZUJhc2VkKHtcblxuXHQgIF9uYW1lOiAnd2l0aEludGVydmFsJyxcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgICAgdGhpcy5fZW1pdHRlciA9IGVtaXR0ZXIodGhpcyk7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICAgIHRoaXMuX2VtaXR0ZXIgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfb25UaWNrOiBmdW5jdGlvbiBfb25UaWNrKCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICBmbih0aGlzLl9lbWl0dGVyKTtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aXRoSW50ZXJ2YWwod2FpdCwgZm4pIHtcblx0ICByZXR1cm4gbmV3IFMod2FpdCwgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbWl0dGVyKG9icykge1xuXG5cdCAgZnVuY3Rpb24gdmFsdWUoeCkge1xuXHQgICAgb2JzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICByZXR1cm4gb2JzLl9hY3RpdmU7XG5cdCAgfVxuXG5cdCAgZnVuY3Rpb24gZXJyb3IoeCkge1xuXHQgICAgb2JzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICByZXR1cm4gb2JzLl9hY3RpdmU7XG5cdCAgfVxuXG5cdCAgZnVuY3Rpb24gZW5kKCkge1xuXHQgICAgb2JzLl9lbWl0RW5kKCk7XG5cdCAgICByZXR1cm4gb2JzLl9hY3RpdmU7XG5cdCAgfVxuXG5cdCAgZnVuY3Rpb24gZXZlbnQoZSkge1xuXHQgICAgb2JzLl9lbWl0KGUudHlwZSwgZS52YWx1ZSk7XG5cdCAgICByZXR1cm4gb2JzLl9hY3RpdmU7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBlcnJvcjogZXJyb3IsIGVuZDogZW5kLCBldmVudDogZXZlbnQsIGVtaXQ6IHZhbHVlLCBlbWl0RXZlbnQ6IGV2ZW50IH07XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBzdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb21DYWxsYmFjayhjYWxsYmFja0NvbnN1bWVyKSB7XG5cblx0ICB2YXIgY2FsbGVkID0gZmFsc2U7XG5cblx0ICByZXR1cm4gc3RyZWFtKGZ1bmN0aW9uIChlbWl0dGVyKSB7XG5cblx0ICAgIGlmICghY2FsbGVkKSB7XG5cdCAgICAgIGNhbGxiYWNrQ29uc3VtZXIoZnVuY3Rpb24gKHgpIHtcblx0ICAgICAgICBlbWl0dGVyLmVtaXQoeCk7XG5cdCAgICAgICAgZW1pdHRlci5lbmQoKTtcblx0ICAgICAgfSk7XG5cdCAgICAgIGNhbGxlZCA9IHRydWU7XG5cdCAgICB9XG5cdCAgfSkuc2V0TmFtZSgnZnJvbUNhbGxiYWNrJyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHR2YXIgZW1pdHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG5cdGZ1bmN0aW9uIFMoZm4pIHtcblx0ICBTdHJlYW0uY2FsbCh0aGlzKTtcblx0ICB0aGlzLl9mbiA9IGZuO1xuXHQgIHRoaXMuX3Vuc3Vic2NyaWJlID0gbnVsbDtcblx0fVxuXG5cdGluaGVyaXQoUywgU3RyZWFtLCB7XG5cblx0ICBfbmFtZTogJ3N0cmVhbScsXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICB2YXIgdW5zdWJzY3JpYmUgPSBmbihlbWl0dGVyKHRoaXMpKTtcblx0ICAgIHRoaXMuX3Vuc3Vic2NyaWJlID0gdHlwZW9mIHVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nID8gdW5zdWJzY3JpYmUgOiBudWxsO1xuXG5cdCAgICAvLyBmaXggaHR0cHM6Ly9naXRodWIuY29tL3Jwb21pbm92L2tlZmlyL2lzc3Vlcy8zNVxuXHQgICAgaWYgKCF0aGlzLl9hY3RpdmUpIHtcblx0ICAgICAgdGhpcy5fY2FsbFVuc3Vic2NyaWJlKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9jYWxsVW5zdWJzY3JpYmU6IGZ1bmN0aW9uIF9jYWxsVW5zdWJzY3JpYmUoKSB7XG5cdCAgICBpZiAodGhpcy5fdW5zdWJzY3JpYmUgIT09IG51bGwpIHtcblx0ICAgICAgdGhpcy5fdW5zdWJzY3JpYmUoKTtcblx0ICAgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSBudWxsO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgIHRoaXMuX2NhbGxVbnN1YnNjcmliZSgpO1xuXHQgIH0sXG5cblx0ICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgIFN0cmVhbS5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyZWFtKGZuKSB7XG5cdCAgcmV0dXJuIG5ldyBTKGZuKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDE4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbU5vZGVDYWxsYmFjayhjYWxsYmFja0NvbnN1bWVyKSB7XG5cblx0ICB2YXIgY2FsbGVkID0gZmFsc2U7XG5cblx0ICByZXR1cm4gc3RyZWFtKGZ1bmN0aW9uIChlbWl0dGVyKSB7XG5cblx0ICAgIGlmICghY2FsbGVkKSB7XG5cdCAgICAgIGNhbGxiYWNrQ29uc3VtZXIoZnVuY3Rpb24gKGVycm9yLCB4KSB7XG5cdCAgICAgICAgaWYgKGVycm9yKSB7XG5cdCAgICAgICAgICBlbWl0dGVyLmVycm9yKGVycm9yKTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgZW1pdHRlci5lbWl0KHgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICBlbWl0dGVyLmVuZCgpO1xuXHQgICAgICB9KTtcblx0ICAgICAgY2FsbGVkID0gdHJ1ZTtcblx0ICAgIH1cblx0ICB9KS5zZXROYW1lKCdmcm9tTm9kZUNhbGxiYWNrJyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBmcm9tU3ViVW5zdWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblxuXHR2YXIgcGFpcnMgPSBbWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInXSwgWydhZGRMaXN0ZW5lcicsICdyZW1vdmVMaXN0ZW5lciddLCBbJ29uJywgJ29mZiddXTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb21FdmVudHModGFyZ2V0LCBldmVudE5hbWUsIHRyYW5zZm9ybWVyKSB7XG5cdCAgdmFyIHN1YiA9IHVuZGVmaW5lZCxcblx0ICAgICAgdW5zdWIgPSB1bmRlZmluZWQ7XG5cblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICBpZiAodHlwZW9mIHRhcmdldFtwYWlyc1tpXVswXV0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHRhcmdldFtwYWlyc1tpXVsxXV0gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgc3ViID0gcGFpcnNbaV1bMF07XG5cdCAgICAgIHVuc3ViID0gcGFpcnNbaV1bMV07XG5cdCAgICAgIGJyZWFrO1xuXHQgICAgfVxuXHQgIH1cblxuXHQgIGlmIChzdWIgPT09IHVuZGVmaW5lZCkge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCd0YXJnZXQgZG9uXFwndCBzdXBwb3J0IGFueSBvZiAnICsgJ2FkZEV2ZW50TGlzdGVuZXIvcmVtb3ZlRXZlbnRMaXN0ZW5lciwgYWRkTGlzdGVuZXIvcmVtb3ZlTGlzdGVuZXIsIG9uL29mZiBtZXRob2QgcGFpcicpO1xuXHQgIH1cblxuXHQgIHJldHVybiBmcm9tU3ViVW5zdWIoZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0ICAgIHJldHVybiB0YXJnZXRbc3ViXShldmVudE5hbWUsIGhhbmRsZXIpO1xuXHQgIH0sIGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cdCAgICByZXR1cm4gdGFyZ2V0W3Vuc3ViXShldmVudE5hbWUsIGhhbmRsZXIpO1xuXHQgIH0sIHRyYW5zZm9ybWVyKS5zZXROYW1lKCdmcm9tRXZlbnRzJyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAyMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBzdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxuXHR2YXIgYXBwbHkgPSBfcmVxdWlyZS5hcHBseTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb21TdWJVbnN1YihzdWIsIHVuc3ViLCB0cmFuc2Zvcm1lciAvKiBGdW5jdGlvbiB8IGZhbHNleSAqLykge1xuXHQgIHJldHVybiBzdHJlYW0oZnVuY3Rpb24gKGVtaXR0ZXIpIHtcblxuXHQgICAgdmFyIGhhbmRsZXIgPSB0cmFuc2Zvcm1lciA/IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgZW1pdHRlci5lbWl0KGFwcGx5KHRyYW5zZm9ybWVyLCB0aGlzLCBhcmd1bWVudHMpKTtcblx0ICAgIH0gOiBmdW5jdGlvbiAoeCkge1xuXHQgICAgICBlbWl0dGVyLmVtaXQoeCk7XG5cdCAgICB9O1xuXG5cdCAgICBzdWIoaGFuZGxlcik7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgICByZXR1cm4gdW5zdWIoaGFuZGxlcik7XG5cdCAgICB9O1xuXHQgIH0pLnNldE5hbWUoJ2Zyb21TdWJVbnN1YicpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMjEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGZ1bmN0aW9uIHNwcmVhZChmbiwgbGVuZ3RoKSB7XG5cdCAgc3dpdGNoIChsZW5ndGgpIHtcblx0ICAgIGNhc2UgMDpcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICByZXR1cm4gZm4oKTtcblx0ICAgICAgfTtcblx0ICAgIGNhc2UgMTpcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgcmV0dXJuIGZuKGFbMF0pO1xuXHQgICAgICB9O1xuXHQgICAgY2FzZSAyOlxuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICByZXR1cm4gZm4oYVswXSwgYVsxXSk7XG5cdCAgICAgIH07XG5cdCAgICBjYXNlIDM6XG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgIHJldHVybiBmbihhWzBdLCBhWzFdLCBhWzJdKTtcblx0ICAgICAgfTtcblx0ICAgIGNhc2UgNDpcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgcmV0dXJuIGZuKGFbMF0sIGFbMV0sIGFbMl0sIGFbM10pO1xuXHQgICAgICB9O1xuXHQgICAgZGVmYXVsdDpcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGEpO1xuXHQgICAgICB9O1xuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGx5KGZuLCBjLCBhKSB7XG5cdCAgdmFyIGFMZW5ndGggPSBhID8gYS5sZW5ndGggOiAwO1xuXHQgIGlmIChjID09IG51bGwpIHtcblx0ICAgIHN3aXRjaCAoYUxlbmd0aCkge1xuXHQgICAgICBjYXNlIDA6XG5cdCAgICAgICAgcmV0dXJuIGZuKCk7XG5cdCAgICAgIGNhc2UgMTpcblx0ICAgICAgICByZXR1cm4gZm4oYVswXSk7XG5cdCAgICAgIGNhc2UgMjpcblx0ICAgICAgICByZXR1cm4gZm4oYVswXSwgYVsxXSk7XG5cdCAgICAgIGNhc2UgMzpcblx0ICAgICAgICByZXR1cm4gZm4oYVswXSwgYVsxXSwgYVsyXSk7XG5cdCAgICAgIGNhc2UgNDpcblx0ICAgICAgICByZXR1cm4gZm4oYVswXSwgYVsxXSwgYVsyXSwgYVszXSk7XG5cdCAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGEpO1xuXHQgICAgfVxuXHQgIH0gZWxzZSB7XG5cdCAgICBzd2l0Y2ggKGFMZW5ndGgpIHtcblx0ICAgICAgY2FzZSAwOlxuXHQgICAgICAgIHJldHVybiBmbi5jYWxsKGMpO1xuXHQgICAgICBkZWZhdWx0OlxuXHQgICAgICAgIHJldHVybiBmbi5hcHBseShjLCBhKTtcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHsgc3ByZWFkOiBzcHJlYWQsIGFwcGx5OiBhcHBseSB9O1xuXG4vKioqLyB9LFxuLyogMjIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xuXG5cdC8vIEhBQ0s6XG5cdC8vICAgV2UgZG9uJ3QgY2FsbCBwYXJlbnQgQ2xhc3MgY29uc3RydWN0b3IsIGJ1dCBpbnN0ZWFkIHB1dHRpbmcgYWxsIG5lY2Vzc2FyeVxuXHQvLyAgIHByb3BlcnRpZXMgaW50byBwcm90b3R5cGUgdG8gc2ltdWxhdGUgZW5kZWQgUHJvcGVydHlcblx0Ly8gICAoc2VlIFByb3BwZXJ0eSBhbmQgT2JzZXJ2YWJsZSBjbGFzc2VzKS5cblxuXHRmdW5jdGlvbiBQKHZhbHVlKSB7XG5cdCAgdGhpcy5fY3VycmVudEV2ZW50ID0geyB0eXBlOiAndmFsdWUnLCB2YWx1ZTogdmFsdWUsIGN1cnJlbnQ6IHRydWUgfTtcblx0fVxuXG5cdGluaGVyaXQoUCwgUHJvcGVydHksIHtcblx0ICBfbmFtZTogJ2NvbnN0YW50Jyxcblx0ICBfYWN0aXZlOiBmYWxzZSxcblx0ICBfYWN0aXZhdGluZzogZmFsc2UsXG5cdCAgX2FsaXZlOiBmYWxzZSxcblx0ICBfZGlzcGF0Y2hlcjogbnVsbCxcblx0ICBfbG9nSGFuZGxlcnM6IG51bGxcblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25zdGFudCh4KSB7XG5cdCAgcmV0dXJuIG5ldyBQKHgpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMjMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xuXG5cdC8vIEhBQ0s6XG5cdC8vICAgV2UgZG9uJ3QgY2FsbCBwYXJlbnQgQ2xhc3MgY29uc3RydWN0b3IsIGJ1dCBpbnN0ZWFkIHB1dHRpbmcgYWxsIG5lY2Vzc2FyeVxuXHQvLyAgIHByb3BlcnRpZXMgaW50byBwcm90b3R5cGUgdG8gc2ltdWxhdGUgZW5kZWQgUHJvcGVydHlcblx0Ly8gICAoc2VlIFByb3BwZXJ0eSBhbmQgT2JzZXJ2YWJsZSBjbGFzc2VzKS5cblxuXHRmdW5jdGlvbiBQKHZhbHVlKSB7XG5cdCAgdGhpcy5fY3VycmVudEV2ZW50ID0geyB0eXBlOiAnZXJyb3InLCB2YWx1ZTogdmFsdWUsIGN1cnJlbnQ6IHRydWUgfTtcblx0fVxuXG5cdGluaGVyaXQoUCwgUHJvcGVydHksIHtcblx0ICBfbmFtZTogJ2NvbnN0YW50RXJyb3InLFxuXHQgIF9hY3RpdmU6IGZhbHNlLFxuXHQgIF9hY3RpdmF0aW5nOiBmYWxzZSxcblx0ICBfYWxpdmU6IGZhbHNlLFxuXHQgIF9kaXNwYXRjaGVyOiBudWxsLFxuXHQgIF9sb2dIYW5kbGVyczogbnVsbFxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbnN0YW50RXJyb3IoeCkge1xuXHQgIHJldHVybiBuZXcgUCh4KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDI0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgndG9Qcm9wZXJ0eScsIHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9nZXRJbml0aWFsQ3VycmVudCA9IGZuO1xuXHQgIH0sXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgaWYgKHRoaXMuX2dldEluaXRpYWxDdXJyZW50ICE9PSBudWxsKSB7XG5cdCAgICAgIHZhciBnZXRJbml0aWFsID0gdGhpcy5fZ2V0SW5pdGlhbEN1cnJlbnQ7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZShnZXRJbml0aWFsKCkpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fc291cmNlLm9uQW55KHRoaXMuXyRoYW5kbGVBbnkpOyAvLyBjb3BpZWQgZnJvbSBwYXR0ZXJucy9vbmUtc291cmNlXG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdG9Qcm9wZXJ0eShvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgaWYgKGZuICE9PSBudWxsICYmIHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdZb3Ugc2hvdWxkIGNhbGwgdG9Qcm9wZXJ0eSgpIHdpdGggYSBmdW5jdGlvbiBvciBubyBhcmd1bWVudHMuJyk7XG5cdCAgfVxuXHQgIHJldHVybiBuZXcgUChvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMjUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0dmFyIFByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZTIuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlMi5FUlJPUjtcblx0dmFyIEVORCA9IF9yZXF1aXJlMi5FTkQ7XG5cblx0ZnVuY3Rpb24gY3JlYXRlQ29uc3RydWN0b3IoQmFzZUNsYXNzLCBuYW1lKSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uIEFub255bW91c09ic2VydmFibGUoc291cmNlLCBvcHRpb25zKSB7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICBCYXNlQ2xhc3MuY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX3NvdXJjZSA9IHNvdXJjZTtcblx0ICAgIHRoaXMuX25hbWUgPSBzb3VyY2UuX25hbWUgKyAnLicgKyBuYW1lO1xuXHQgICAgdGhpcy5faW5pdChvcHRpb25zKTtcblx0ICAgIHRoaXMuXyRoYW5kbGVBbnkgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9oYW5kbGVBbnkoZXZlbnQpO1xuXHQgICAgfTtcblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlQ2xhc3NNZXRob2RzKEJhc2VDbGFzcykge1xuXHQgIHJldHVybiB7XG5cblx0ICAgIF9pbml0OiBmdW5jdGlvbiBfaW5pdCgpIHt9LFxuXHQgICAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge30sXG5cblx0ICAgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfSxcblx0ICAgIF9oYW5kbGVFcnJvcjogZnVuY3Rpb24gX2hhbmRsZUVycm9yKHgpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgfSxcblx0ICAgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH0sXG5cblx0ICAgIF9oYW5kbGVBbnk6IGZ1bmN0aW9uIF9oYW5kbGVBbnkoZXZlbnQpIHtcblx0ICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG5cdCAgICAgICAgY2FzZSBWQUxVRTpcblx0ICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVWYWx1ZShldmVudC52YWx1ZSk7XG5cdCAgICAgICAgY2FzZSBFUlJPUjpcblx0ICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVFcnJvcihldmVudC52YWx1ZSk7XG5cdCAgICAgICAgY2FzZSBFTkQ6XG5cdCAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlRW5kKCk7XG5cdCAgICAgIH1cblx0ICAgIH0sXG5cblx0ICAgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZS5vbkFueSh0aGlzLl8kaGFuZGxlQW55KTtcblx0ICAgIH0sXG5cdCAgICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgICAgdGhpcy5fc291cmNlLm9mZkFueSh0aGlzLl8kaGFuZGxlQW55KTtcblx0ICAgIH0sXG5cblx0ICAgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgICBCYXNlQ2xhc3MucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xuXHQgICAgICB0aGlzLl8kaGFuZGxlQW55ID0gbnVsbDtcblx0ICAgICAgdGhpcy5fZnJlZSgpO1xuXHQgICAgfVxuXG5cdCAgfTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVN0cmVhbShuYW1lLCBtaXhpbikge1xuXHQgIHZhciBTID0gY3JlYXRlQ29uc3RydWN0b3IoU3RyZWFtLCBuYW1lKTtcblx0ICBpbmhlcml0KFMsIFN0cmVhbSwgY3JlYXRlQ2xhc3NNZXRob2RzKFN0cmVhbSksIG1peGluKTtcblx0ICByZXR1cm4gUztcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVByb3BlcnR5KG5hbWUsIG1peGluKSB7XG5cdCAgdmFyIFAgPSBjcmVhdGVDb25zdHJ1Y3RvcihQcm9wZXJ0eSwgbmFtZSk7XG5cdCAgaW5oZXJpdChQLCBQcm9wZXJ0eSwgY3JlYXRlQ2xhc3NNZXRob2RzKFByb3BlcnR5KSwgbWl4aW4pO1xuXHQgIHJldHVybiBQO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7IGNyZWF0ZVN0cmVhbTogY3JlYXRlU3RyZWFtLCBjcmVhdGVQcm9wZXJ0eTogY3JlYXRlUHJvcGVydHkgfTtcblxuLyoqKi8gfSxcbi8qIDI2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnY2hhbmdlcycsIHtcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIGlmICghdGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFcnJvcjogZnVuY3Rpb24gX2hhbmRsZUVycm9yKHgpIHtcblx0ICAgIGlmICghdGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2hhbmdlcyhvYnMpIHtcblx0ICByZXR1cm4gbmV3IFMob2JzKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDI3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXHR2YXIgdG9Qcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbVByb21pc2UocHJvbWlzZSkge1xuXG5cdCAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuXG5cdCAgdmFyIHJlc3VsdCA9IHN0cmVhbShmdW5jdGlvbiAoZW1pdHRlcikge1xuXHQgICAgaWYgKCFjYWxsZWQpIHtcblx0ICAgICAgdmFyIG9uVmFsdWUgPSBmdW5jdGlvbiBvblZhbHVlKHgpIHtcblx0ICAgICAgICBlbWl0dGVyLmVtaXQoeCk7XG5cdCAgICAgICAgZW1pdHRlci5lbmQoKTtcblx0ICAgICAgfTtcblx0ICAgICAgdmFyIG9uRXJyb3IgPSBmdW5jdGlvbiBvbkVycm9yKHgpIHtcblx0ICAgICAgICBlbWl0dGVyLmVycm9yKHgpO1xuXHQgICAgICAgIGVtaXR0ZXIuZW5kKCk7XG5cdCAgICAgIH07XG5cdCAgICAgIHZhciBfcHJvbWlzZSA9IHByb21pc2UudGhlbihvblZhbHVlLCBvbkVycm9yKTtcblxuXHQgICAgICAvLyBwcmV2ZW50IGxpYnJhcmllcyBsaWtlICdRJyBvciAnd2hlbicgZnJvbSBzd2FsbG93aW5nIGV4Y2VwdGlvbnNcblx0ICAgICAgaWYgKF9wcm9taXNlICYmIHR5cGVvZiBfcHJvbWlzZS5kb25lID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgICAgX3Byb21pc2UuZG9uZSgpO1xuXHQgICAgICB9XG5cblx0ICAgICAgY2FsbGVkID0gdHJ1ZTtcblx0ICAgIH1cblx0ICB9KTtcblxuXHQgIHJldHVybiB0b1Byb3BlcnR5KHJlc3VsdCwgbnVsbCkuc2V0TmFtZSgnZnJvbVByb21pc2UnKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDI4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZS5WQUxVRTtcblx0dmFyIEVORCA9IF9yZXF1aXJlLkVORDtcblxuXHRmdW5jdGlvbiBnZXRHbG9kYWxQcm9taXNlKCkge1xuXHQgIGlmICh0eXBlb2YgUHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgcmV0dXJuIFByb21pc2U7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgaXNuXFwndCBkZWZhdWx0IFByb21pc2UsIHVzZSBzaGltIG9yIHBhcmFtZXRlcicpO1xuXHQgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9icykge1xuXHQgIHZhciBQcm9taXNlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gZ2V0R2xvZGFsUHJvbWlzZSgpIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgdmFyIGxhc3QgPSBudWxsO1xuXHQgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cdCAgICBvYnMub25BbnkoZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICAgIGlmIChldmVudC50eXBlID09PSBFTkQgJiYgbGFzdCAhPT0gbnVsbCkge1xuXHQgICAgICAgIChsYXN0LnR5cGUgPT09IFZBTFVFID8gcmVzb2x2ZSA6IHJlamVjdCkobGFzdC52YWx1ZSk7XG5cdCAgICAgICAgbGFzdCA9IG51bGw7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgbGFzdCA9IGV2ZW50O1xuXHQgICAgICB9XG5cdCAgICB9KTtcblx0ICB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDI5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXHR2YXIgc3ltYm9sID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMCkoJ29ic2VydmFibGUnKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb21FU09ic2VydmFibGUoX29ic2VydmFibGUpIHtcblx0ICB2YXIgb2JzZXJ2YWJsZSA9IF9vYnNlcnZhYmxlW3N5bWJvbF0gPyBfb2JzZXJ2YWJsZVtzeW1ib2xdKCkgOiBfb2JzZXJ2YWJsZTtcblx0ICByZXR1cm4gc3RyZWFtKGZ1bmN0aW9uIChlbWl0dGVyKSB7XG5cdCAgICB2YXIgdW5zdWIgPSBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG5cdCAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihfZXJyb3IpIHtcblx0ICAgICAgICBlbWl0dGVyLmVycm9yKF9lcnJvcik7XG5cdCAgICAgICAgZW1pdHRlci5lbmQoKTtcblx0ICAgICAgfSxcblx0ICAgICAgbmV4dDogZnVuY3Rpb24gbmV4dCh2YWx1ZSkge1xuXHQgICAgICAgIGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG5cdCAgICAgIH0sXG5cdCAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcblx0ICAgICAgICBlbWl0dGVyLmVuZCgpO1xuXHQgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgaWYgKHVuc3ViLnVuc3Vic2NyaWJlKSB7XG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgdW5zdWIudW5zdWJzY3JpYmUoKTtcblx0ICAgICAgfTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHJldHVybiB1bnN1Yjtcblx0ICAgIH1cblx0ICB9KS5zZXROYW1lKCdmcm9tRVNPYnNlcnZhYmxlJyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuXHQgIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2xba2V5XSkge1xuXHQgICAgcmV0dXJuIFN5bWJvbFtrZXldO1xuXHQgIH0gZWxzZSBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHJldHVybiBTeW1ib2xbJ2ZvciddKGtleSk7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHJldHVybiAnQEAnICsga2V5O1xuXHQgIH1cblx0fTtcblxuLyoqKi8gfSxcbi8qIDMxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgZXh0ZW5kID0gX3JlcXVpcmUuZXh0ZW5kO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlMi5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUyLkVSUk9SO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUyLkVORDtcblxuXHRmdW5jdGlvbiBFU09ic2VydmFibGUob2JzZXJ2YWJsZSkge1xuXHQgIHRoaXMuX29ic2VydmFibGUgPSBvYnNlcnZhYmxlLnRha2VFcnJvcnMoMSk7XG5cdH1cblxuXHRleHRlbmQoRVNPYnNlcnZhYmxlLnByb3RvdHlwZSwge1xuXHQgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICB2YXIgZm4gPSBmdW5jdGlvbiBmbihldmVudCkge1xuXHQgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gVkFMVUUgJiYgb2JzZXJ2ZXIubmV4dCkge1xuXHQgICAgICAgIG9ic2VydmVyLm5leHQoZXZlbnQudmFsdWUpO1xuXHQgICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09IEVSUk9SICYmIG9ic2VydmVyLmVycm9yKSB7XG5cdCAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXZlbnQudmFsdWUpO1xuXHQgICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09IEVORCAmJiBvYnNlcnZlci5jb21wbGV0ZSkge1xuXHQgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgdGhpcy5fb2JzZXJ2YWJsZS5vbkFueShmbik7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX29ic2VydmFibGUub2ZmQW55KGZuKTtcblx0ICAgIH07XG5cdCAgfVxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRvRVNPYnNlcnZhYmxlKCkge1xuXHQgIHJldHVybiBuZXcgRVNPYnNlcnZhYmxlKHRoaXMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIHRoaXMuX2VtaXRWYWx1ZShmbih4KSk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ21hcCcsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnbWFwJywgbWl4aW4pO1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hcChvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBpZCA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDMzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICBpZiAoZm4oeCkpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdmaWx0ZXInLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2ZpbHRlcicsIG1peGluKTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWx0ZXIob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gaWQgOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgbiA9IF9yZWYubjtcblxuXHQgICAgdGhpcy5fbiA9IG47XG5cdCAgICBpZiAobiA8PSAwKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdGhpcy5fbi0tO1xuXHQgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgaWYgKHRoaXMuX24gPT09IDApIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCd0YWtlJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd0YWtlJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGFrZShvYnMsIG4pIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBuOiBuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIG4gPSBfcmVmLm47XG5cblx0ICAgIHRoaXMuX24gPSBuO1xuXHQgICAgaWYgKG4gPD0gMCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFcnJvcjogZnVuY3Rpb24gX2hhbmRsZUVycm9yKHgpIHtcblx0ICAgIHRoaXMuX24tLTtcblx0ICAgIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgIGlmICh0aGlzLl9uID09PSAwKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgndGFrZUVycm9ycycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgndGFrZUVycm9ycycsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRha2VFcnJvcnMob2JzLCBuKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgbjogbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDM2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICBpZiAoZm4oeCkpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCd0YWtlV2hpbGUnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3Rha2VXaGlsZScsIG1peGluKTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0YWtlV2hpbGUob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gaWQgOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUyLk5PVEhJTkc7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KCkge1xuXHQgICAgdGhpcy5fbGFzdFZhbHVlID0gTk9USElORztcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fbGFzdFZhbHVlID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdGhpcy5fbGFzdFZhbHVlID0geDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9sYXN0VmFsdWUgIT09IE5PVEhJTkcpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX2xhc3RWYWx1ZSk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2xhc3QnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2xhc3QnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsYXN0KG9icykge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDM4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBuID0gX3JlZi5uO1xuXG5cdCAgICB0aGlzLl9uID0gTWF0aC5tYXgoMCwgbik7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl9uID09PSAwKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX24tLTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnc2tpcCcsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnc2tpcCcsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNraXAob2JzLCBuKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgbjogbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDM5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICBpZiAodGhpcy5fZm4gIT09IG51bGwgJiYgIWZuKHgpKSB7XG5cdCAgICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLl9mbiA9PT0gbnVsbCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3NraXBXaGlsZScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnc2tpcFdoaWxlJywgbWl4aW4pO1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNraXBXaGlsZShvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBpZCA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZTIuTk9USElORztcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICAgIHRoaXMuX3ByZXYgPSBOT1RISU5HO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgICB0aGlzLl9wcmV2ID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICBpZiAodGhpcy5fcHJldiA9PT0gTk9USElORyB8fCAhZm4odGhpcy5fcHJldiwgeCkpIHtcblx0ICAgICAgdGhpcy5fcHJldiA9IHg7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnc2tpcER1cGxpY2F0ZXMnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3NraXBEdXBsaWNhdGVzJywgbWl4aW4pO1xuXG5cdHZhciBlcSA9IGZ1bmN0aW9uIGVxKGEsIGIpIHtcblx0ICByZXR1cm4gYSA9PT0gYjtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNraXBEdXBsaWNhdGVzKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGVxIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlMi5OT1RISU5HO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXHQgICAgdmFyIHNlZWQgPSBfcmVmLnNlZWQ7XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgICB0aGlzLl9wcmV2ID0gc2VlZDtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fcHJldiA9IG51bGw7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl9wcmV2ICE9PSBOT1RISU5HKSB7XG5cdCAgICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoZm4odGhpcy5fcHJldiwgeCkpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fcHJldiA9IHg7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2RpZmYnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2RpZmYnLCBtaXhpbik7XG5cblx0ZnVuY3Rpb24gZGVmYXVsdEZuKGEsIGIpIHtcblx0ICByZXR1cm4gW2EsIGJdO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaWZmKG9icywgZm4pIHtcblx0ICB2YXIgc2VlZCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IE5PVEhJTkcgOiBhcmd1bWVudHNbMl07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfHwgZGVmYXVsdEZuLCBzZWVkOiBzZWVkIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgRVJST1IgPSBfcmVxdWlyZTIuRVJST1I7XG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUyLk5PVEhJTkc7XG5cblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnc2NhbicsIHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXHQgICAgdmFyIHNlZWQgPSBfcmVmLnNlZWQ7XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgICB0aGlzLl9zZWVkID0gc2VlZDtcblx0ICAgIGlmIChzZWVkICE9PSBOT1RISU5HKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZShzZWVkKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgICAgdGhpcy5fc2VlZCA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgaWYgKHRoaXMuX2N1cnJlbnRFdmVudCA9PT0gbnVsbCB8fCB0aGlzLl9jdXJyZW50RXZlbnQudHlwZSA9PT0gRVJST1IpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX3NlZWQgPT09IE5PVEhJTkcgPyB4IDogZm4odGhpcy5fc2VlZCwgeCkpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKGZuKHRoaXMuX2N1cnJlbnRFdmVudC52YWx1ZSwgeCkpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNjYW4ob2JzLCBmbikge1xuXHQgIHZhciBzZWVkID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gTk9USElORyA6IGFyZ3VtZW50c1syXTtcblxuXHQgIHJldHVybiBuZXcgUChvYnMsIHsgZm46IGZuLCBzZWVkOiBzZWVkIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgdmFyIHhzID0gZm4oeCk7XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4c1tpXSk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2ZsYXR0ZW4nLCBtaXhpbik7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmxhdHRlbihvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBpZCA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgUyhvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgRU5EX01BUktFUiA9IHt9O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICB2YXIgd2FpdCA9IF9yZWYud2FpdDtcblxuXHQgICAgdGhpcy5fd2FpdCA9IE1hdGgubWF4KDAsIHdhaXQpO1xuXHQgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgICAgdGhpcy5fJHNoaWZ0QnVmZiA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgdmFyIHZhbHVlID0gX3RoaXMuX2J1ZmYuc2hpZnQoKTtcblx0ICAgICAgaWYgKHZhbHVlID09PSBFTkRfTUFSS0VSKSB7XG5cdCAgICAgICAgX3RoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBfdGhpcy5fZW1pdFZhbHVlKHZhbHVlKTtcblx0ICAgICAgfVxuXHQgICAgfTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fYnVmZiA9IG51bGw7XG5cdCAgICB0aGlzLl8kc2hpZnRCdWZmID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fYnVmZi5wdXNoKHgpO1xuXHQgICAgICBzZXRUaW1lb3V0KHRoaXMuXyRzaGlmdEJ1ZmYsIHRoaXMuX3dhaXQpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fYnVmZi5wdXNoKEVORF9NQVJLRVIpO1xuXHQgICAgICBzZXRUaW1lb3V0KHRoaXMuXyRzaGlmdEJ1ZmYsIHRoaXMuX3dhaXQpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdkZWxheScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnZGVsYXknLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWxheShvYnMsIHdhaXQpIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyB3YWl0OiB3YWl0IH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbm93ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Nik7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICAgIHZhciB3YWl0ID0gX3JlZi53YWl0O1xuXHQgICAgdmFyIGxlYWRpbmcgPSBfcmVmLmxlYWRpbmc7XG5cdCAgICB2YXIgdHJhaWxpbmcgPSBfcmVmLnRyYWlsaW5nO1xuXG5cdCAgICB0aGlzLl93YWl0ID0gTWF0aC5tYXgoMCwgd2FpdCk7XG5cdCAgICB0aGlzLl9sZWFkaW5nID0gbGVhZGluZztcblx0ICAgIHRoaXMuX3RyYWlsaW5nID0gdHJhaWxpbmc7XG5cdCAgICB0aGlzLl90cmFpbGluZ1ZhbHVlID0gbnVsbDtcblx0ICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG5cdCAgICB0aGlzLl9lbmRMYXRlciA9IGZhbHNlO1xuXHQgICAgdGhpcy5fbGFzdENhbGxUaW1lID0gMDtcblx0ICAgIHRoaXMuXyR0cmFpbGluZ0NhbGwgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5fdHJhaWxpbmdDYWxsKCk7XG5cdCAgICB9O1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl90cmFpbGluZ1ZhbHVlID0gbnVsbDtcblx0ICAgIHRoaXMuXyR0cmFpbGluZ0NhbGwgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB2YXIgY3VyVGltZSA9IG5vdygpO1xuXHQgICAgICBpZiAodGhpcy5fbGFzdENhbGxUaW1lID09PSAwICYmICF0aGlzLl9sZWFkaW5nKSB7XG5cdCAgICAgICAgdGhpcy5fbGFzdENhbGxUaW1lID0gY3VyVGltZTtcblx0ICAgICAgfVxuXHQgICAgICB2YXIgcmVtYWluaW5nID0gdGhpcy5fd2FpdCAtIChjdXJUaW1lIC0gdGhpcy5fbGFzdENhbGxUaW1lKTtcblx0ICAgICAgaWYgKHJlbWFpbmluZyA8PSAwKSB7XG5cdCAgICAgICAgdGhpcy5fY2FuY2VsVHJhaWxpbmcoKTtcblx0ICAgICAgICB0aGlzLl9sYXN0Q2FsbFRpbWUgPSBjdXJUaW1lO1xuXHQgICAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgICAgfSBlbHNlIGlmICh0aGlzLl90cmFpbGluZykge1xuXHQgICAgICAgIHRoaXMuX2NhbmNlbFRyYWlsaW5nKCk7XG5cdCAgICAgICAgdGhpcy5fdHJhaWxpbmdWYWx1ZSA9IHg7XG5cdCAgICAgICAgdGhpcy5fdGltZW91dElkID0gc2V0VGltZW91dCh0aGlzLl8kdHJhaWxpbmdDYWxsLCByZW1haW5pbmcpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpZiAodGhpcy5fdGltZW91dElkKSB7XG5cdCAgICAgICAgdGhpcy5fZW5kTGF0ZXIgPSB0cnVlO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfY2FuY2VsVHJhaWxpbmc6IGZ1bmN0aW9uIF9jYW5jZWxUcmFpbGluZygpIHtcblx0ICAgIGlmICh0aGlzLl90aW1lb3V0SWQgIT09IG51bGwpIHtcblx0ICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXRJZCk7XG5cdCAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF90cmFpbGluZ0NhbGw6IGZ1bmN0aW9uIF90cmFpbGluZ0NhbGwoKSB7XG5cdCAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fdHJhaWxpbmdWYWx1ZSk7XG5cdCAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuXHQgICAgdGhpcy5fdHJhaWxpbmdWYWx1ZSA9IG51bGw7XG5cdCAgICB0aGlzLl9sYXN0Q2FsbFRpbWUgPSAhdGhpcy5fbGVhZGluZyA/IDAgOiBub3coKTtcblx0ICAgIGlmICh0aGlzLl9lbmRMYXRlcikge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3Rocm90dGxlJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd0aHJvdHRsZScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRocm90dGxlKG9icywgd2FpdCkge1xuXHQgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzJdO1xuXG5cdCAgdmFyIF9yZWYyJGxlYWRpbmcgPSBfcmVmMi5sZWFkaW5nO1xuXHQgIHZhciBsZWFkaW5nID0gX3JlZjIkbGVhZGluZyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJGxlYWRpbmc7XG5cdCAgdmFyIF9yZWYyJHRyYWlsaW5nID0gX3JlZjIudHJhaWxpbmc7XG5cdCAgdmFyIHRyYWlsaW5nID0gX3JlZjIkdHJhaWxpbmcgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMiR0cmFpbGluZztcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IHdhaXQ6IHdhaXQsIGxlYWRpbmc6IGxlYWRpbmcsIHRyYWlsaW5nOiB0cmFpbGluZyB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQ2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IERhdGUubm93ID8gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBEYXRlLm5vdygpO1xuXHR9IDogZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQ3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG5vdyA9IF9fd2VicGFja19yZXF1aXJlX18oNDYpO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICB2YXIgd2FpdCA9IF9yZWYud2FpdDtcblx0ICAgIHZhciBpbW1lZGlhdGUgPSBfcmVmLmltbWVkaWF0ZTtcblxuXHQgICAgdGhpcy5fd2FpdCA9IE1hdGgubWF4KDAsIHdhaXQpO1xuXHQgICAgdGhpcy5faW1tZWRpYXRlID0gaW1tZWRpYXRlO1xuXHQgICAgdGhpcy5fbGFzdEF0dGVtcHQgPSAwO1xuXHQgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcblx0ICAgIHRoaXMuX2xhdGVyVmFsdWUgPSBudWxsO1xuXHQgICAgdGhpcy5fZW5kTGF0ZXIgPSBmYWxzZTtcblx0ICAgIHRoaXMuXyRsYXRlciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9sYXRlcigpO1xuXHQgICAgfTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fbGF0ZXJWYWx1ZSA9IG51bGw7XG5cdCAgICB0aGlzLl8kbGF0ZXIgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9sYXN0QXR0ZW1wdCA9IG5vdygpO1xuXHQgICAgICBpZiAodGhpcy5faW1tZWRpYXRlICYmICF0aGlzLl90aW1lb3V0SWQpIHtcblx0ICAgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKCF0aGlzLl90aW1lb3V0SWQpIHtcblx0ICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBzZXRUaW1lb3V0KHRoaXMuXyRsYXRlciwgdGhpcy5fd2FpdCk7XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKCF0aGlzLl9pbW1lZGlhdGUpIHtcblx0ICAgICAgICB0aGlzLl9sYXRlclZhbHVlID0geDtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaWYgKHRoaXMuX3RpbWVvdXRJZCAmJiAhdGhpcy5faW1tZWRpYXRlKSB7XG5cdCAgICAgICAgdGhpcy5fZW5kTGF0ZXIgPSB0cnVlO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfbGF0ZXI6IGZ1bmN0aW9uIF9sYXRlcigpIHtcblx0ICAgIHZhciBsYXN0ID0gbm93KCkgLSB0aGlzLl9sYXN0QXR0ZW1wdDtcblx0ICAgIGlmIChsYXN0IDwgdGhpcy5fd2FpdCAmJiBsYXN0ID49IDApIHtcblx0ICAgICAgdGhpcy5fdGltZW91dElkID0gc2V0VGltZW91dCh0aGlzLl8kbGF0ZXIsIHRoaXMuX3dhaXQgLSBsYXN0KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG5cdCAgICAgIGlmICghdGhpcy5faW1tZWRpYXRlKSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX2xhdGVyVmFsdWUpO1xuXHQgICAgICAgIHRoaXMuX2xhdGVyVmFsdWUgPSBudWxsO1xuXHQgICAgICB9XG5cdCAgICAgIGlmICh0aGlzLl9lbmRMYXRlcikge1xuXHQgICAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdkZWJvdW5jZScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnZGVib3VuY2UnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWJvdW5jZShvYnMsIHdhaXQpIHtcblx0ICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcblxuXHQgIHZhciBfcmVmMiRpbW1lZGlhdGUgPSBfcmVmMi5pbW1lZGlhdGU7XG5cdCAgdmFyIGltbWVkaWF0ZSA9IF9yZWYyJGltbWVkaWF0ZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmMiRpbW1lZGlhdGU7XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyB3YWl0OiB3YWl0LCBpbW1lZGlhdGU6IGltbWVkaWF0ZSB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQ4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlRXJyb3IoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICB0aGlzLl9lbWl0RXJyb3IoZm4oeCkpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdtYXBFcnJvcnMnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ21hcEVycm9ycycsIG1peGluKTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXBFcnJvcnMob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gaWQgOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0OSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFcnJvcjogZnVuY3Rpb24gX2hhbmRsZUVycm9yKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgaWYgKGZuKHgpKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZmlsdGVyRXJyb3JzJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdmaWx0ZXJFcnJvcnMnLCBtaXhpbik7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmlsdGVyRXJyb3JzKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGlkIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoKSB7fVxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdpZ25vcmVWYWx1ZXMnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2lnbm9yZVZhbHVlcycsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlnbm9yZVZhbHVlcyhvYnMpIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblx0ICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVFcnJvcigpIHt9XG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2lnbm9yZUVycm9ycycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnaWdub3JlRXJyb3JzJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWdub3JlRXJyb3JzKG9icykge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDUyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7fVxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdpZ25vcmVFbmQnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2lnbm9yZUVuZCcsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlnbm9yZUVuZChvYnMpIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1MyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIHRoaXMuX2VtaXRWYWx1ZShmbigpKTtcblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnYmVmb3JlRW5kJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdiZWZvcmVFbmQnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiZWZvcmVFbmQob2JzLCBmbikge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDU0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIHNsaWRlID0gX3JlcXVpcmUyLnNsaWRlO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgbWluID0gX3JlZi5taW47XG5cdCAgICB2YXIgbWF4ID0gX3JlZi5tYXg7XG5cblx0ICAgIHRoaXMuX21heCA9IG1heDtcblx0ICAgIHRoaXMuX21pbiA9IG1pbjtcblx0ICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fYnVmZiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHRoaXMuX2J1ZmYgPSBzbGlkZSh0aGlzLl9idWZmLCB4LCB0aGlzLl9tYXgpO1xuXHQgICAgaWYgKHRoaXMuX2J1ZmYubGVuZ3RoID49IHRoaXMuX21pbikge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fYnVmZik7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3NsaWRpbmdXaW5kb3cnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3NsaWRpbmdXaW5kb3cnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzbGlkaW5nV2luZG93KG9icywgbWF4KSB7XG5cdCAgdmFyIG1pbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IDAgOiBhcmd1bWVudHNbMl07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBtaW46IG1pbiwgbWF4OiBtYXggfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1NSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXHQgICAgdmFyIGZsdXNoT25FbmQgPSBfcmVmLmZsdXNoT25FbmQ7XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgICB0aGlzLl9mbHVzaE9uRW5kID0gZmx1c2hPbkVuZDtcblx0ICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fYnVmZiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9mbHVzaDogZnVuY3Rpb24gX2ZsdXNoKCkge1xuXHQgICAgaWYgKHRoaXMuX2J1ZmYgIT09IG51bGwgJiYgdGhpcy5fYnVmZi5sZW5ndGggIT09IDApIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX2J1ZmYpO1xuXHQgICAgICB0aGlzLl9idWZmID0gW107XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHRoaXMuX2J1ZmYucHVzaCh4KTtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgaWYgKCFmbih4KSkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2ZsdXNoT25FbmQpIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnYnVmZmVyV2hpbGUnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2J1ZmZlcldoaWxlJywgbWl4aW4pO1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1ZmZlcldoaWxlKG9icywgZm4pIHtcblx0ICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcblxuXHQgIHZhciBfcmVmMiRmbHVzaE9uRW5kID0gX3JlZjIuZmx1c2hPbkVuZDtcblx0ICB2YXIgZmx1c2hPbkVuZCA9IF9yZWYyJGZsdXNoT25FbmQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMiRmbHVzaE9uRW5kO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIHx8IGlkLCBmbHVzaE9uRW5kOiBmbHVzaE9uRW5kIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGNvdW50ID0gX3JlZi5jb3VudDtcblx0ICAgIHZhciBmbHVzaE9uRW5kID0gX3JlZi5mbHVzaE9uRW5kO1xuXG5cdCAgICB0aGlzLl9jb3VudCA9IGNvdW50O1xuXHQgICAgdGhpcy5fZmx1c2hPbkVuZCA9IGZsdXNoT25FbmQ7XG5cdCAgICB0aGlzLl9idWZmID0gW107XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2J1ZmYgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfZmx1c2g6IGZ1bmN0aW9uIF9mbHVzaCgpIHtcblx0ICAgIGlmICh0aGlzLl9idWZmICE9PSBudWxsICYmIHRoaXMuX2J1ZmYubGVuZ3RoICE9PSAwKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9idWZmKTtcblx0ICAgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB0aGlzLl9idWZmLnB1c2goeCk7XG5cdCAgICBpZiAodGhpcy5fYnVmZi5sZW5ndGggPj0gdGhpcy5fY291bnQpIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9mbHVzaE9uRW5kKSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2J1ZmZlcldpdGhDb3VudCcsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnYnVmZmVyV2l0aENvdW50JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVmZmVyV2hpbGUob2JzLCBjb3VudCkge1xuXHQgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzJdO1xuXG5cdCAgdmFyIF9yZWYyJGZsdXNoT25FbmQgPSBfcmVmMi5mbHVzaE9uRW5kO1xuXHQgIHZhciBmbHVzaE9uRW5kID0gX3JlZjIkZmx1c2hPbkVuZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJGZsdXNoT25FbmQ7XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBjb3VudDogY291bnQsIGZsdXNoT25FbmQ6IGZsdXNoT25FbmQgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1NyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICB2YXIgd2FpdCA9IF9yZWYud2FpdDtcblx0ICAgIHZhciBjb3VudCA9IF9yZWYuY291bnQ7XG5cdCAgICB2YXIgZmx1c2hPbkVuZCA9IF9yZWYuZmx1c2hPbkVuZDtcblxuXHQgICAgdGhpcy5fd2FpdCA9IHdhaXQ7XG5cdCAgICB0aGlzLl9jb3VudCA9IGNvdW50O1xuXHQgICAgdGhpcy5fZmx1c2hPbkVuZCA9IGZsdXNoT25FbmQ7XG5cdCAgICB0aGlzLl9pbnRlcnZhbElkID0gbnVsbDtcblx0ICAgIHRoaXMuXyRvblRpY2sgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5fZmx1c2goKTtcblx0ICAgIH07XG5cdCAgICB0aGlzLl9idWZmID0gW107XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuXyRvblRpY2sgPSBudWxsO1xuXHQgICAgdGhpcy5fYnVmZiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9mbHVzaDogZnVuY3Rpb24gX2ZsdXNoKCkge1xuXHQgICAgaWYgKHRoaXMuX2J1ZmYgIT09IG51bGwpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX2J1ZmYpO1xuXHQgICAgICB0aGlzLl9idWZmID0gW107XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHRoaXMuX2J1ZmYucHVzaCh4KTtcblx0ICAgIGlmICh0aGlzLl9idWZmLmxlbmd0aCA+PSB0aGlzLl9jb3VudCkge1xuXHQgICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsSWQpO1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgICB0aGlzLl9pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5fJG9uVGljaywgdGhpcy5fd2FpdCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fZmx1c2hPbkVuZCAmJiB0aGlzLl9idWZmLmxlbmd0aCAhPT0gMCkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH0sXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgdGhpcy5fc291cmNlLm9uQW55KHRoaXMuXyRoYW5kbGVBbnkpOyAvLyBjb3BpZWQgZnJvbSBwYXR0ZXJucy9vbmUtc291cmNlXG5cdCAgICB0aGlzLl9pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5fJG9uVGljaywgdGhpcy5fd2FpdCk7XG5cdCAgfSxcblxuXHQgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgaWYgKHRoaXMuX2ludGVydmFsSWQgIT09IG51bGwpIHtcblx0ICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbElkKTtcblx0ICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IG51bGw7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9zb3VyY2Uub2ZmQW55KHRoaXMuXyRoYW5kbGVBbnkpOyAvLyBjb3BpZWQgZnJvbSBwYXR0ZXJucy9vbmUtc291cmNlXG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2J1ZmZlcldpdGhUaW1lT3JDb3VudCcsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnYnVmZmVyV2l0aFRpbWVPckNvdW50JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVmZmVyV2l0aFRpbWVPckNvdW50KG9icywgd2FpdCwgY291bnQpIHtcblx0ICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDMgfHwgYXJndW1lbnRzWzNdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1szXTtcblxuXHQgIHZhciBfcmVmMiRmbHVzaE9uRW5kID0gX3JlZjIuZmx1c2hPbkVuZDtcblx0ICB2YXIgZmx1c2hPbkVuZCA9IF9yZWYyJGZsdXNoT25FbmQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMiRmbHVzaE9uRW5kO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgd2FpdDogd2FpdCwgY291bnQ6IGNvdW50LCBmbHVzaE9uRW5kOiBmbHVzaE9uRW5kIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiB4Zm9ybUZvck9icyhvYnMpIHtcblx0ICByZXR1cm4ge1xuXG5cdCAgICAnQEB0cmFuc2R1Y2VyL3N0ZXAnOiBmdW5jdGlvbiB0cmFuc2R1Y2VyU3RlcChyZXMsIGlucHV0KSB7XG5cdCAgICAgIG9icy5fZW1pdFZhbHVlKGlucHV0KTtcblx0ICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICB9LFxuXG5cdCAgICAnQEB0cmFuc2R1Y2VyL3Jlc3VsdCc6IGZ1bmN0aW9uIHRyYW5zZHVjZXJSZXN1bHQoKSB7XG5cdCAgICAgIG9icy5fZW1pdEVuZCgpO1xuXHQgICAgICByZXR1cm4gbnVsbDtcblx0ICAgIH1cblxuXHQgIH07XG5cdH1cblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIHRyYW5zZHVjZXIgPSBfcmVmLnRyYW5zZHVjZXI7XG5cblx0ICAgIHRoaXMuX3hmb3JtID0gdHJhbnNkdWNlcih4Zm9ybUZvck9icyh0aGlzKSk7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX3hmb3JtID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX3hmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKG51bGwsIHgpICE9PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuX3hmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10obnVsbCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICB0aGlzLl94Zm9ybVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKG51bGwpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCd0cmFuc2R1Y2UnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3RyYW5zZHVjZScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZHVjZShvYnMsIHRyYW5zZHVjZXIpIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyB0cmFuc2R1Y2VyOiB0cmFuc2R1Y2VyIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgZW1pdHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTUpO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9oYW5kbGVyID0gZm47XG5cdCAgICB0aGlzLl9lbWl0dGVyID0gZW1pdHRlcih0aGlzKTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5faGFuZGxlciA9IG51bGw7XG5cdCAgICB0aGlzLl9lbWl0dGVyID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZUFueTogZnVuY3Rpb24gX2hhbmRsZUFueShldmVudCkge1xuXHQgICAgdGhpcy5faGFuZGxlcih0aGlzLl9lbWl0dGVyLCBldmVudCk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3dpdGhIYW5kbGVyJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd3aXRoSGFuZGxlcicsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdpdGhIYW5kbGVyKG9icywgZm4pIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA2MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlLkVSUk9SO1xuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlLk5PVEhJTkc7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZTIuaW5oZXJpdDtcblxuXHR2YXIgX3JlcXVpcmUzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgY29uY2F0ID0gX3JlcXVpcmUzLmNvbmNhdDtcblx0dmFyIGZpbGxBcnJheSA9IF9yZXF1aXJlMy5maWxsQXJyYXk7XG5cblx0dmFyIF9yZXF1aXJlNCA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXG5cdHZhciBzcHJlYWQgPSBfcmVxdWlyZTQuc3ByZWFkO1xuXG5cdHZhciBuZXZlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cblx0ZnVuY3Rpb24gZGVmYXVsdEVycm9yc0NvbWJpbmF0b3IoZXJyb3JzKSB7XG5cdCAgdmFyIGxhdGVzdEVycm9yID0gdW5kZWZpbmVkO1xuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICBpZiAoZXJyb3JzW2ldICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgaWYgKGxhdGVzdEVycm9yID09PSB1bmRlZmluZWQgfHwgbGF0ZXN0RXJyb3IuaW5kZXggPCBlcnJvcnNbaV0uaW5kZXgpIHtcblx0ICAgICAgICBsYXRlc3RFcnJvciA9IGVycm9yc1tpXTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gbGF0ZXN0RXJyb3IuZXJyb3I7XG5cdH1cblxuXHRmdW5jdGlvbiBDb21iaW5lKGFjdGl2ZSwgcGFzc2l2ZSwgY29tYmluYXRvcikge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICBTdHJlYW0uY2FsbCh0aGlzKTtcblx0ICB0aGlzLl9hY3RpdmVDb3VudCA9IGFjdGl2ZS5sZW5ndGg7XG5cdCAgdGhpcy5fc291cmNlcyA9IGNvbmNhdChhY3RpdmUsIHBhc3NpdmUpO1xuXHQgIHRoaXMuX2NvbWJpbmF0b3IgPSBjb21iaW5hdG9yID8gc3ByZWFkKGNvbWJpbmF0b3IsIHRoaXMuX3NvdXJjZXMubGVuZ3RoKSA6IGZ1bmN0aW9uICh4KSB7XG5cdCAgICByZXR1cm4geDtcblx0ICB9O1xuXHQgIHRoaXMuX2FsaXZlQ291bnQgPSAwO1xuXHQgIHRoaXMuX2xhdGVzdFZhbHVlcyA9IG5ldyBBcnJheSh0aGlzLl9zb3VyY2VzLmxlbmd0aCk7XG5cdCAgdGhpcy5fbGF0ZXN0RXJyb3JzID0gbmV3IEFycmF5KHRoaXMuX3NvdXJjZXMubGVuZ3RoKTtcblx0ICBmaWxsQXJyYXkodGhpcy5fbGF0ZXN0VmFsdWVzLCBOT1RISU5HKTtcblx0ICB0aGlzLl9lbWl0QWZ0ZXJBY3RpdmF0aW9uID0gZmFsc2U7XG5cdCAgdGhpcy5fZW5kQWZ0ZXJBY3RpdmF0aW9uID0gZmFsc2U7XG5cdCAgdGhpcy5fbGF0ZXN0RXJyb3JJbmRleCA9IDA7XG5cblx0ICB0aGlzLl8kaGFuZGxlcnMgPSBbXTtcblxuXHQgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIChpKSB7XG5cdCAgICBfdGhpcy5fJGhhbmRsZXJzLnB1c2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5faGFuZGxlQW55KGksIGV2ZW50KTtcblx0ICAgIH0pO1xuXHQgIH07XG5cblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NvdXJjZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgIF9sb29wKGkpO1xuXHQgIH1cblx0fVxuXG5cdGluaGVyaXQoQ29tYmluZSwgU3RyZWFtLCB7XG5cblx0ICBfbmFtZTogJ2NvbWJpbmUnLFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgIHRoaXMuX2FsaXZlQ291bnQgPSB0aGlzLl9hY3RpdmVDb3VudDtcblxuXHQgICAgLy8gd2UgbmVlZCB0byBzdXNjcmliZSB0byBfcGFzc2l2ZV8gc291cmNlcyBiZWZvcmUgX2FjdGl2ZV9cblx0ICAgIC8vIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Jwb21pbm92L2tlZmlyL2lzc3Vlcy85OClcblx0ICAgIGZvciAodmFyIGkgPSB0aGlzLl9hY3RpdmVDb3VudDsgaSA8IHRoaXMuX3NvdXJjZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdGhpcy5fc291cmNlc1tpXS5vbkFueSh0aGlzLl8kaGFuZGxlcnNbaV0pO1xuXHQgICAgfVxuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9hY3RpdmVDb3VudDsgaSsrKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZXNbaV0ub25BbnkodGhpcy5fJGhhbmRsZXJzW2ldKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKHRoaXMuX2VtaXRBZnRlckFjdGl2YXRpb24pIHtcblx0ICAgICAgdGhpcy5fZW1pdEFmdGVyQWN0aXZhdGlvbiA9IGZhbHNlO1xuXHQgICAgICB0aGlzLl9lbWl0SWZGdWxsKCk7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5fZW5kQWZ0ZXJBY3RpdmF0aW9uKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICB2YXIgbGVuZ3RoID0gdGhpcy5fc291cmNlcy5sZW5ndGgsXG5cdCAgICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgICB0aGlzLl9zb3VyY2VzW2ldLm9mZkFueSh0aGlzLl8kaGFuZGxlcnNbaV0pO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZW1pdElmRnVsbDogZnVuY3Rpb24gX2VtaXRJZkZ1bGwoKSB7XG5cdCAgICB2YXIgaGFzQWxsVmFsdWVzID0gdHJ1ZTtcblx0ICAgIHZhciBoYXNFcnJvcnMgPSBmYWxzZTtcblx0ICAgIHZhciBsZW5ndGggPSB0aGlzLl9sYXRlc3RWYWx1ZXMubGVuZ3RoO1xuXHQgICAgdmFyIHZhbHVlc0NvcHkgPSBuZXcgQXJyYXkobGVuZ3RoKTtcblx0ICAgIHZhciBlcnJvcnNDb3B5ID0gbmV3IEFycmF5KGxlbmd0aCk7XG5cblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdmFsdWVzQ29weVtpXSA9IHRoaXMuX2xhdGVzdFZhbHVlc1tpXTtcblx0ICAgICAgZXJyb3JzQ29weVtpXSA9IHRoaXMuX2xhdGVzdEVycm9yc1tpXTtcblxuXHQgICAgICBpZiAodmFsdWVzQ29weVtpXSA9PT0gTk9USElORykge1xuXHQgICAgICAgIGhhc0FsbFZhbHVlcyA9IGZhbHNlO1xuXHQgICAgICB9XG5cblx0ICAgICAgaWYgKGVycm9yc0NvcHlbaV0gIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgIH1cblxuXHQgICAgaWYgKGhhc0FsbFZhbHVlcykge1xuXHQgICAgICB2YXIgY29tYmluYXRvciA9IHRoaXMuX2NvbWJpbmF0b3I7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZShjb21iaW5hdG9yKHZhbHVlc0NvcHkpKTtcblx0ICAgIH1cblx0ICAgIGlmIChoYXNFcnJvcnMpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKGRlZmF1bHRFcnJvcnNDb21iaW5hdG9yKGVycm9yc0NvcHkpKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUFueTogZnVuY3Rpb24gX2hhbmRsZUFueShpLCBldmVudCkge1xuXG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gVkFMVUUgfHwgZXZlbnQudHlwZSA9PT0gRVJST1IpIHtcblxuXHQgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gVkFMVUUpIHtcblx0ICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZXNbaV0gPSBldmVudC52YWx1ZTtcblx0ICAgICAgICB0aGlzLl9sYXRlc3RFcnJvcnNbaV0gPSB1bmRlZmluZWQ7XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVSUk9SKSB7XG5cdCAgICAgICAgdGhpcy5fbGF0ZXN0VmFsdWVzW2ldID0gTk9USElORztcblx0ICAgICAgICB0aGlzLl9sYXRlc3RFcnJvcnNbaV0gPSB7XG5cdCAgICAgICAgICBpbmRleDogdGhpcy5fbGF0ZXN0RXJyb3JJbmRleCsrLFxuXHQgICAgICAgICAgZXJyb3I6IGV2ZW50LnZhbHVlXG5cdCAgICAgICAgfTtcblx0ICAgICAgfVxuXG5cdCAgICAgIGlmIChpIDwgdGhpcy5fYWN0aXZlQ291bnQpIHtcblx0ICAgICAgICBpZiAodGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICAgICAgdGhpcy5fZW1pdEFmdGVyQWN0aXZhdGlvbiA9IHRydWU7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIHRoaXMuX2VtaXRJZkZ1bGwoKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIC8vIEVORFxuXG5cdCAgICAgIGlmIChpIDwgdGhpcy5fYWN0aXZlQ291bnQpIHtcblx0ICAgICAgICB0aGlzLl9hbGl2ZUNvdW50LS07XG5cdCAgICAgICAgaWYgKHRoaXMuX2FsaXZlQ291bnQgPT09IDApIHtcblx0ICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2VuZEFmdGVyQWN0aXZhdGlvbiA9IHRydWU7XG5cdCAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgU3RyZWFtLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX3NvdXJjZXMgPSBudWxsO1xuXHQgICAgdGhpcy5fbGF0ZXN0VmFsdWVzID0gbnVsbDtcblx0ICAgIHRoaXMuX2xhdGVzdEVycm9ycyA9IG51bGw7XG5cdCAgICB0aGlzLl9jb21iaW5hdG9yID0gbnVsbDtcblx0ICAgIHRoaXMuXyRoYW5kbGVycyA9IG51bGw7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZShhY3RpdmUsIHBhc3NpdmUsIGNvbWJpbmF0b3IpIHtcblx0ICBpZiAocGFzc2l2ZSA9PT0gdW5kZWZpbmVkKSBwYXNzaXZlID0gW107XG5cblx0ICBpZiAodHlwZW9mIHBhc3NpdmUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIGNvbWJpbmF0b3IgPSBwYXNzaXZlO1xuXHQgICAgcGFzc2l2ZSA9IFtdO1xuXHQgIH1cblx0ICByZXR1cm4gYWN0aXZlLmxlbmd0aCA9PT0gMCA/IG5ldmVyKCkgOiBuZXcgQ29tYmluZShhY3RpdmUsIHBhc3NpdmUsIGNvbWJpbmF0b3IpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNjEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZS5FUlJPUjtcblx0dmFyIEVORCA9IF9yZXF1aXJlLkVORDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlMi5pbmhlcml0O1xuXG5cdHZhciBfcmVxdWlyZTMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdHZhciBtYXAgPSBfcmVxdWlyZTMubWFwO1xuXHR2YXIgY2xvbmVBcnJheSA9IF9yZXF1aXJlMy5jbG9uZUFycmF5O1xuXG5cdHZhciBfcmVxdWlyZTQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxuXHR2YXIgc3ByZWFkID0gX3JlcXVpcmU0LnNwcmVhZDtcblxuXHR2YXIgbmV2ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG5cdHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcblx0ICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcblx0fTtcblxuXHRmdW5jdGlvbiBaaXAoc291cmNlcywgY29tYmluYXRvcikge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICBTdHJlYW0uY2FsbCh0aGlzKTtcblxuXHQgIHRoaXMuX2J1ZmZlcnMgPSBtYXAoc291cmNlcywgZnVuY3Rpb24gKHNvdXJjZSkge1xuXHQgICAgcmV0dXJuIGlzQXJyYXkoc291cmNlKSA/IGNsb25lQXJyYXkoc291cmNlKSA6IFtdO1xuXHQgIH0pO1xuXHQgIHRoaXMuX3NvdXJjZXMgPSBtYXAoc291cmNlcywgZnVuY3Rpb24gKHNvdXJjZSkge1xuXHQgICAgcmV0dXJuIGlzQXJyYXkoc291cmNlKSA/IG5ldmVyKCkgOiBzb3VyY2U7XG5cdCAgfSk7XG5cblx0ICB0aGlzLl9jb21iaW5hdG9yID0gY29tYmluYXRvciA/IHNwcmVhZChjb21iaW5hdG9yLCB0aGlzLl9zb3VyY2VzLmxlbmd0aCkgOiBmdW5jdGlvbiAoeCkge1xuXHQgICAgcmV0dXJuIHg7XG5cdCAgfTtcblx0ICB0aGlzLl9hbGl2ZUNvdW50ID0gMDtcblxuXHQgIHRoaXMuXyRoYW5kbGVycyA9IFtdO1xuXG5cdCAgdmFyIF9sb29wID0gZnVuY3Rpb24gKGkpIHtcblx0ICAgIF90aGlzLl8kaGFuZGxlcnMucHVzaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9oYW5kbGVBbnkoaSwgZXZlbnQpO1xuXHQgICAgfSk7XG5cdCAgfTtcblxuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc291cmNlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgX2xvb3AoaSk7XG5cdCAgfVxuXHR9XG5cblx0aW5oZXJpdChaaXAsIFN0cmVhbSwge1xuXG5cdCAgX25hbWU6ICd6aXAnLFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblxuXHQgICAgLy8gaWYgYWxsIHNvdXJjZXMgYXJlIGFycmF5c1xuXHQgICAgd2hpbGUgKHRoaXMuX2lzRnVsbCgpKSB7XG5cdCAgICAgIHRoaXMuX2VtaXQoKTtcblx0ICAgIH1cblxuXHQgICAgdmFyIGxlbmd0aCA9IHRoaXMuX3NvdXJjZXMubGVuZ3RoO1xuXHQgICAgdGhpcy5fYWxpdmVDb3VudCA9IGxlbmd0aDtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoICYmIHRoaXMuX2FjdGl2ZTsgaSsrKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZXNbaV0ub25BbnkodGhpcy5fJGhhbmRsZXJzW2ldKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NvdXJjZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdGhpcy5fc291cmNlc1tpXS5vZmZBbnkodGhpcy5fJGhhbmRsZXJzW2ldKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2VtaXQ6IGZ1bmN0aW9uIF9lbWl0KCkge1xuXHQgICAgdmFyIHZhbHVlcyA9IG5ldyBBcnJheSh0aGlzLl9idWZmZXJzLmxlbmd0aCk7XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2J1ZmZlcnMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdmFsdWVzW2ldID0gdGhpcy5fYnVmZmVyc1tpXS5zaGlmdCgpO1xuXHQgICAgfVxuXHQgICAgdmFyIGNvbWJpbmF0b3IgPSB0aGlzLl9jb21iaW5hdG9yO1xuXHQgICAgdGhpcy5fZW1pdFZhbHVlKGNvbWJpbmF0b3IodmFsdWVzKSk7XG5cdCAgfSxcblxuXHQgIF9pc0Z1bGw6IGZ1bmN0aW9uIF9pc0Z1bGwoKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2J1ZmZlcnMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgaWYgKHRoaXMuX2J1ZmZlcnNbaV0ubGVuZ3RoID09PSAwKSB7XG5cdCAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdHJ1ZTtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZUFueTogZnVuY3Rpb24gX2hhbmRsZUFueShpLCBldmVudCkge1xuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IFZBTFVFKSB7XG5cdCAgICAgIHRoaXMuX2J1ZmZlcnNbaV0ucHVzaChldmVudC52YWx1ZSk7XG5cdCAgICAgIGlmICh0aGlzLl9pc0Z1bGwoKSkge1xuXHQgICAgICAgIHRoaXMuX2VtaXQoKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVSUk9SKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcihldmVudC52YWx1ZSk7XG5cdCAgICB9XG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gRU5EKSB7XG5cdCAgICAgIHRoaXMuX2FsaXZlQ291bnQtLTtcblx0ICAgICAgaWYgKHRoaXMuX2FsaXZlQ291bnQgPT09IDApIHtcblx0ICAgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICBTdHJlYW0ucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fc291cmNlcyA9IG51bGw7XG5cdCAgICB0aGlzLl9idWZmZXJzID0gbnVsbDtcblx0ICAgIHRoaXMuX2NvbWJpbmF0b3IgPSBudWxsO1xuXHQgICAgdGhpcy5fJGhhbmRsZXJzID0gbnVsbDtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB6aXAob2JzZXJ2YWJsZXMsIGNvbWJpbmF0b3IgLyogRnVuY3Rpb24gfCBmYWxzZXkgKi8pIHtcblx0ICByZXR1cm4gb2JzZXJ2YWJsZXMubGVuZ3RoID09PSAwID8gbmV2ZXIoKSA6IG5ldyBaaXAob2JzZXJ2YWJsZXMsIGNvbWJpbmF0b3IpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNjIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgQWJzdHJhY3RQb29sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Myk7XG5cdHZhciBuZXZlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cblx0ZnVuY3Rpb24gTWVyZ2Uoc291cmNlcykge1xuXHQgIEFic3RyYWN0UG9vbC5jYWxsKHRoaXMpO1xuXHQgIHRoaXMuX2FkZEFsbChzb3VyY2VzKTtcblx0ICB0aGlzLl9pbml0aWFsaXNlZCA9IHRydWU7XG5cdH1cblxuXHRpbmhlcml0KE1lcmdlLCBBYnN0cmFjdFBvb2wsIHtcblxuXHQgIF9uYW1lOiAnbWVyZ2UnLFxuXG5cdCAgX29uRW1wdHk6IGZ1bmN0aW9uIF9vbkVtcHR5KCkge1xuXHQgICAgaWYgKHRoaXMuX2luaXRpYWxpc2VkKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZShvYnNlcnZhYmxlcykge1xuXHQgIHJldHVybiBvYnNlcnZhYmxlcy5sZW5ndGggPT09IDAgPyBuZXZlcigpIDogbmV3IE1lcmdlKG9ic2VydmFibGVzKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDYzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZS5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUuRVJST1I7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZTIuaW5oZXJpdDtcblxuXHR2YXIgX3JlcXVpcmUzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgY29uY2F0ID0gX3JlcXVpcmUzLmNvbmNhdDtcblx0dmFyIGZvckVhY2ggPSBfcmVxdWlyZTMuZm9yRWFjaDtcblx0dmFyIGZpbmRCeVByZWQgPSBfcmVxdWlyZTMuZmluZEJ5UHJlZDtcblx0dmFyIGZpbmQgPSBfcmVxdWlyZTMuZmluZDtcblx0dmFyIHJlbW92ZSA9IF9yZXF1aXJlMy5yZW1vdmU7XG5cdHZhciBjbG9uZUFycmF5ID0gX3JlcXVpcmUzLmNsb25lQXJyYXk7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdGZ1bmN0aW9uIEFic3RyYWN0UG9vbCgpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHQgIHZhciBfcmVmJHF1ZXVlTGltID0gX3JlZi5xdWV1ZUxpbTtcblx0ICB2YXIgcXVldWVMaW0gPSBfcmVmJHF1ZXVlTGltID09PSB1bmRlZmluZWQgPyAwIDogX3JlZiRxdWV1ZUxpbTtcblx0ICB2YXIgX3JlZiRjb25jdXJMaW0gPSBfcmVmLmNvbmN1ckxpbTtcblx0ICB2YXIgY29uY3VyTGltID0gX3JlZiRjb25jdXJMaW0gPT09IHVuZGVmaW5lZCA/IC0xIDogX3JlZiRjb25jdXJMaW07XG5cdCAgdmFyIF9yZWYkZHJvcCA9IF9yZWYuZHJvcDtcblx0ICB2YXIgZHJvcCA9IF9yZWYkZHJvcCA9PT0gdW5kZWZpbmVkID8gJ25ldycgOiBfcmVmJGRyb3A7XG5cblx0ICBTdHJlYW0uY2FsbCh0aGlzKTtcblxuXHQgIHRoaXMuX3F1ZXVlTGltID0gcXVldWVMaW0gPCAwID8gLTEgOiBxdWV1ZUxpbTtcblx0ICB0aGlzLl9jb25jdXJMaW0gPSBjb25jdXJMaW0gPCAwID8gLTEgOiBjb25jdXJMaW07XG5cdCAgdGhpcy5fZHJvcCA9IGRyb3A7XG5cdCAgdGhpcy5fcXVldWUgPSBbXTtcblx0ICB0aGlzLl9jdXJTb3VyY2VzID0gW107XG5cdCAgdGhpcy5fJGhhbmRsZVN1YkFueSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgcmV0dXJuIF90aGlzLl9oYW5kbGVTdWJBbnkoZXZlbnQpO1xuXHQgIH07XG5cdCAgdGhpcy5fJGVuZEhhbmRsZXJzID0gW107XG5cdCAgdGhpcy5fY3VycmVudGx5QWRkaW5nID0gbnVsbDtcblxuXHQgIGlmICh0aGlzLl9jb25jdXJMaW0gPT09IDApIHtcblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9XG5cdH1cblxuXHRpbmhlcml0KEFic3RyYWN0UG9vbCwgU3RyZWFtLCB7XG5cblx0ICBfbmFtZTogJ2Fic3RyYWN0UG9vbCcsXG5cblx0ICBfYWRkOiBmdW5jdGlvbiBfYWRkKG9iaiwgdG9PYnMgLyogRnVuY3Rpb24gfCBmYWxzZXkgKi8pIHtcblx0ICAgIHRvT2JzID0gdG9PYnMgfHwgaWQ7XG5cdCAgICBpZiAodGhpcy5fY29uY3VyTGltID09PSAtMSB8fCB0aGlzLl9jdXJTb3VyY2VzLmxlbmd0aCA8IHRoaXMuX2NvbmN1ckxpbSkge1xuXHQgICAgICB0aGlzLl9hZGRUb0N1cih0b09icyhvYmopKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlmICh0aGlzLl9xdWV1ZUxpbSA9PT0gLTEgfHwgdGhpcy5fcXVldWUubGVuZ3RoIDwgdGhpcy5fcXVldWVMaW0pIHtcblx0ICAgICAgICB0aGlzLl9hZGRUb1F1ZXVlKHRvT2JzKG9iaikpO1xuXHQgICAgICB9IGVsc2UgaWYgKHRoaXMuX2Ryb3AgPT09ICdvbGQnKSB7XG5cdCAgICAgICAgdGhpcy5fcmVtb3ZlT2xkZXN0KCk7XG5cdCAgICAgICAgdGhpcy5fYWRkKG9iaiwgdG9PYnMpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9hZGRBbGw6IGZ1bmN0aW9uIF9hZGRBbGwob2Jzcykge1xuXHQgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cblx0ICAgIGZvckVhY2gob2JzcywgZnVuY3Rpb24gKG9icykge1xuXHQgICAgICByZXR1cm4gX3RoaXMyLl9hZGQob2JzKTtcblx0ICAgIH0pO1xuXHQgIH0sXG5cblx0ICBfcmVtb3ZlOiBmdW5jdGlvbiBfcmVtb3ZlKG9icykge1xuXHQgICAgaWYgKHRoaXMuX3JlbW92ZUN1cihvYnMpID09PSAtMSkge1xuXHQgICAgICB0aGlzLl9yZW1vdmVRdWV1ZShvYnMpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfYWRkVG9RdWV1ZTogZnVuY3Rpb24gX2FkZFRvUXVldWUob2JzKSB7XG5cdCAgICB0aGlzLl9xdWV1ZSA9IGNvbmNhdCh0aGlzLl9xdWV1ZSwgW29ic10pO1xuXHQgIH0sXG5cblx0ICBfYWRkVG9DdXI6IGZ1bmN0aW9uIF9hZGRUb0N1cihvYnMpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcblxuXHQgICAgICAvLyBIQUNLOlxuXHQgICAgICAvL1xuXHQgICAgICAvLyBXZSBoYXZlIHR3byBvcHRpbWl6YXRpb25zIGZvciBjYXNlcyB3aGVuIGBvYnNgIGlzIGVuZGVkLiBXZSBkb24ndCB3YW50XG5cdCAgICAgIC8vIHRvIGFkZCBzdWNoIG9ic2VydmFibGUgdG8gdGhlIGxpc3QsIGJ1dCBvbmx5IHdhbnQgdG8gZW1pdCBldmVudHNcblx0ICAgICAgLy8gZnJvbSBpdCAoaWYgaXQgaGFzIHNvbWUpLlxuXHQgICAgICAvL1xuXHQgICAgICAvLyBJbnN0ZWFkIG9mIHRoaXMgaGFja3MsIHdlIGNvdWxkIGp1c3QgZGlkIGZvbGxvd2luZyxcblx0ICAgICAgLy8gYnV0IGl0IHdvdWxkIGJlIDUtOCB0aW1lcyBzbG93ZXI6XG5cdCAgICAgIC8vXG5cdCAgICAgIC8vICAgICB0aGlzLl9jdXJTb3VyY2VzID0gY29uY2F0KHRoaXMuX2N1clNvdXJjZXMsIFtvYnNdKTtcblx0ICAgICAgLy8gICAgIHRoaXMuX3N1YnNjcmliZShvYnMpO1xuXHQgICAgICAvL1xuXG5cdCAgICAgIC8vICMxXG5cdCAgICAgIC8vIFRoaXMgb25lIGZvciBjYXNlcyB3aGVuIGBvYnNgIGFscmVhZHkgZW5kZWRcblx0ICAgICAgLy8gZS5nLiwgS2VmaXIuY29uc3RhbnQoKSBvciBLZWZpci5uZXZlcigpXG5cdCAgICAgIGlmICghb2JzLl9hbGl2ZSkge1xuXHQgICAgICAgIGlmIChvYnMuX2N1cnJlbnRFdmVudCkge1xuXHQgICAgICAgICAgdGhpcy5fZW1pdChvYnMuX2N1cnJlbnRFdmVudC50eXBlLCBvYnMuX2N1cnJlbnRFdmVudC52YWx1ZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybjtcblx0ICAgICAgfVxuXG5cdCAgICAgIC8vICMyXG5cdCAgICAgIC8vIFRoaXMgb25lIGlzIGZvciBjYXNlcyB3aGVuIGBvYnNgIGdvaW5nIHRvIGVuZCBzeW5jaHJvbm91c2x5IG9uXG5cdCAgICAgIC8vIGZpcnN0IHN1YnNjcmliZXIgZS5nLiwgS2VmaXIuc3RyZWFtKGVtID0+IHtlbS5lbWl0KDEpOyBlbS5lbmQoKX0pXG5cdCAgICAgIHRoaXMuX2N1cnJlbnRseUFkZGluZyA9IG9icztcblx0ICAgICAgb2JzLm9uQW55KHRoaXMuXyRoYW5kbGVTdWJBbnkpO1xuXHQgICAgICB0aGlzLl9jdXJyZW50bHlBZGRpbmcgPSBudWxsO1xuXHQgICAgICBpZiAob2JzLl9hbGl2ZSkge1xuXHQgICAgICAgIHRoaXMuX2N1clNvdXJjZXMgPSBjb25jYXQodGhpcy5fY3VyU291cmNlcywgW29ic10pO1xuXHQgICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcblx0ICAgICAgICAgIHRoaXMuX3N1YlRvRW5kKG9icyk7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9jdXJTb3VyY2VzID0gY29uY2F0KHRoaXMuX2N1clNvdXJjZXMsIFtvYnNdKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX3N1YlRvRW5kOiBmdW5jdGlvbiBfc3ViVG9FbmQob2JzKSB7XG5cdCAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuXHQgICAgdmFyIG9uRW5kID0gZnVuY3Rpb24gb25FbmQoKSB7XG5cdCAgICAgIHJldHVybiBfdGhpczMuX3JlbW92ZUN1cihvYnMpO1xuXHQgICAgfTtcblx0ICAgIHRoaXMuXyRlbmRIYW5kbGVycy5wdXNoKHsgb2JzOiBvYnMsIGhhbmRsZXI6IG9uRW5kIH0pO1xuXHQgICAgb2JzLm9uRW5kKG9uRW5kKTtcblx0ICB9LFxuXG5cdCAgX3N1YnNjcmliZTogZnVuY3Rpb24gX3N1YnNjcmliZShvYnMpIHtcblx0ICAgIG9icy5vbkFueSh0aGlzLl8kaGFuZGxlU3ViQW55KTtcblxuXHQgICAgLy8gaXQgY2FuIGJlY29tZSBpbmFjdGl2ZSBpbiByZXNwb25jZSBvZiBzdWJzY3JpYmluZyB0byBgb2JzLm9uQW55YCBhYm92ZVxuXHQgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuXHQgICAgICB0aGlzLl9zdWJUb0VuZChvYnMpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIF91bnN1YnNjcmliZShvYnMpIHtcblx0ICAgIG9icy5vZmZBbnkodGhpcy5fJGhhbmRsZVN1YkFueSk7XG5cblx0ICAgIHZhciBvbkVuZEkgPSBmaW5kQnlQcmVkKHRoaXMuXyRlbmRIYW5kbGVycywgZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICByZXR1cm4gb2JqLm9icyA9PT0gb2JzO1xuXHQgICAgfSk7XG5cdCAgICBpZiAob25FbmRJICE9PSAtMSkge1xuXHQgICAgICBvYnMub2ZmRW5kKHRoaXMuXyRlbmRIYW5kbGVyc1tvbkVuZEldLmhhbmRsZXIpO1xuXHQgICAgICB0aGlzLl8kZW5kSGFuZGxlcnMuc3BsaWNlKG9uRW5kSSwgMSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVTdWJBbnk6IGZ1bmN0aW9uIF9oYW5kbGVTdWJBbnkoZXZlbnQpIHtcblx0ICAgIGlmIChldmVudC50eXBlID09PSBWQUxVRSkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoZXZlbnQudmFsdWUpO1xuXHQgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBFUlJPUikge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoZXZlbnQudmFsdWUpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfcmVtb3ZlUXVldWU6IGZ1bmN0aW9uIF9yZW1vdmVRdWV1ZShvYnMpIHtcblx0ICAgIHZhciBpbmRleCA9IGZpbmQodGhpcy5fcXVldWUsIG9icyk7XG5cdCAgICB0aGlzLl9xdWV1ZSA9IHJlbW92ZSh0aGlzLl9xdWV1ZSwgaW5kZXgpO1xuXHQgICAgcmV0dXJuIGluZGV4O1xuXHQgIH0sXG5cblx0ICBfcmVtb3ZlQ3VyOiBmdW5jdGlvbiBfcmVtb3ZlQ3VyKG9icykge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuXHQgICAgICB0aGlzLl91bnN1YnNjcmliZShvYnMpO1xuXHQgICAgfVxuXHQgICAgdmFyIGluZGV4ID0gZmluZCh0aGlzLl9jdXJTb3VyY2VzLCBvYnMpO1xuXHQgICAgdGhpcy5fY3VyU291cmNlcyA9IHJlbW92ZSh0aGlzLl9jdXJTb3VyY2VzLCBpbmRleCk7XG5cdCAgICBpZiAoaW5kZXggIT09IC0xKSB7XG5cdCAgICAgIGlmICh0aGlzLl9xdWV1ZS5sZW5ndGggIT09IDApIHtcblx0ICAgICAgICB0aGlzLl9wdWxsUXVldWUoKTtcblx0ICAgICAgfSBlbHNlIGlmICh0aGlzLl9jdXJTb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgIHRoaXMuX29uRW1wdHkoKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGluZGV4O1xuXHQgIH0sXG5cblx0ICBfcmVtb3ZlT2xkZXN0OiBmdW5jdGlvbiBfcmVtb3ZlT2xkZXN0KCkge1xuXHQgICAgdGhpcy5fcmVtb3ZlQ3VyKHRoaXMuX2N1clNvdXJjZXNbMF0pO1xuXHQgIH0sXG5cblx0ICBfcHVsbFF1ZXVlOiBmdW5jdGlvbiBfcHVsbFF1ZXVlKCkge1xuXHQgICAgaWYgKHRoaXMuX3F1ZXVlLmxlbmd0aCAhPT0gMCkge1xuXHQgICAgICB0aGlzLl9xdWV1ZSA9IGNsb25lQXJyYXkodGhpcy5fcXVldWUpO1xuXHQgICAgICB0aGlzLl9hZGRUb0N1cih0aGlzLl9xdWV1ZS5zaGlmdCgpKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBzb3VyY2VzID0gdGhpcy5fY3VyU291cmNlczsgaSA8IHNvdXJjZXMubGVuZ3RoICYmIHRoaXMuX2FjdGl2ZTsgaSsrKSB7XG5cdCAgICAgIHRoaXMuX3N1YnNjcmliZShzb3VyY2VzW2ldKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgc291cmNlcyA9IHRoaXMuX2N1clNvdXJjZXM7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKHNvdXJjZXNbaV0pO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuX2N1cnJlbnRseUFkZGluZyAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLl91bnN1YnNjcmliZSh0aGlzLl9jdXJyZW50bHlBZGRpbmcpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaXNFbXB0eTogZnVuY3Rpb24gX2lzRW1wdHkoKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fY3VyU291cmNlcy5sZW5ndGggPT09IDA7XG5cdCAgfSxcblxuXHQgIF9vbkVtcHR5OiBmdW5jdGlvbiBfb25FbXB0eSgpIHt9LFxuXG5cdCAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICBTdHJlYW0ucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fcXVldWUgPSBudWxsO1xuXHQgICAgdGhpcy5fY3VyU291cmNlcyA9IG51bGw7XG5cdCAgICB0aGlzLl8kaGFuZGxlU3ViQW55ID0gbnVsbDtcblx0ICAgIHRoaXMuXyRlbmRIYW5kbGVycyA9IG51bGw7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gQWJzdHJhY3RQb29sO1xuXG4vKioqLyB9LFxuLyogNjQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgcmVwZWF0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25jYXQob2JzZXJ2YWJsZXMpIHtcblx0ICByZXR1cm4gcmVwZWF0KGZ1bmN0aW9uIChpbmRleCkge1xuXHQgICAgcmV0dXJuIG9ic2VydmFibGVzLmxlbmd0aCA+IGluZGV4ID8gb2JzZXJ2YWJsZXNbaW5kZXhdIDogZmFsc2U7XG5cdCAgfSkuc2V0TmFtZSgnY29uY2F0Jyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA2NSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBFTkQgPSBfcmVxdWlyZTIuRU5EO1xuXG5cdGZ1bmN0aW9uIFMoZ2VuZXJhdG9yKSB7XG5cdCAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXHQgIHRoaXMuX2dlbmVyYXRvciA9IGdlbmVyYXRvcjtcblx0ICB0aGlzLl9zb3VyY2UgPSBudWxsO1xuXHQgIHRoaXMuX2luTG9vcCA9IGZhbHNlO1xuXHQgIHRoaXMuX2l0ZXJhdGlvbiA9IDA7XG5cdCAgdGhpcy5fJGhhbmRsZUFueSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgcmV0dXJuIF90aGlzLl9oYW5kbGVBbnkoZXZlbnQpO1xuXHQgIH07XG5cdH1cblxuXHRpbmhlcml0KFMsIFN0cmVhbSwge1xuXG5cdCAgX25hbWU6ICdyZXBlYXQnLFxuXG5cdCAgX2hhbmRsZUFueTogZnVuY3Rpb24gX2hhbmRsZUFueShldmVudCkge1xuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVORCkge1xuXHQgICAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xuXHQgICAgICB0aGlzLl9nZXRTb3VyY2UoKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2VtaXQoZXZlbnQudHlwZSwgZXZlbnQudmFsdWUpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZ2V0U291cmNlOiBmdW5jdGlvbiBfZ2V0U291cmNlKCkge1xuXHQgICAgaWYgKCF0aGlzLl9pbkxvb3ApIHtcblx0ICAgICAgdGhpcy5faW5Mb29wID0gdHJ1ZTtcblx0ICAgICAgdmFyIGdlbmVyYXRvciA9IHRoaXMuX2dlbmVyYXRvcjtcblx0ICAgICAgd2hpbGUgKHRoaXMuX3NvdXJjZSA9PT0gbnVsbCAmJiB0aGlzLl9hbGl2ZSAmJiB0aGlzLl9hY3RpdmUpIHtcblx0ICAgICAgICB0aGlzLl9zb3VyY2UgPSBnZW5lcmF0b3IodGhpcy5faXRlcmF0aW9uKyspO1xuXHQgICAgICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcblx0ICAgICAgICAgIHRoaXMuX3NvdXJjZS5vbkFueSh0aGlzLl8kaGFuZGxlQW55KTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgICB0aGlzLl9pbkxvb3AgPSBmYWxzZTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcblx0ICAgICAgdGhpcy5fc291cmNlLm9uQW55KHRoaXMuXyRoYW5kbGVBbnkpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fZ2V0U291cmNlKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgaWYgKHRoaXMuX3NvdXJjZSkge1xuXHQgICAgICB0aGlzLl9zb3VyY2Uub2ZmQW55KHRoaXMuXyRoYW5kbGVBbnkpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgIFN0cmVhbS5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9nZW5lcmF0b3IgPSBudWxsO1xuXHQgICAgdGhpcy5fc291cmNlID0gbnVsbDtcblx0ICAgIHRoaXMuXyRoYW5kbGVBbnkgPSBudWxsO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChnZW5lcmF0b3IpIHtcblx0ICByZXR1cm4gbmV3IFMoZ2VuZXJhdG9yKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDY2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIEFic3RyYWN0UG9vbCA9IF9fd2VicGFja19yZXF1aXJlX18oNjMpO1xuXG5cdGZ1bmN0aW9uIFBvb2woKSB7XG5cdCAgQWJzdHJhY3RQb29sLmNhbGwodGhpcyk7XG5cdH1cblxuXHRpbmhlcml0KFBvb2wsIEFic3RyYWN0UG9vbCwge1xuXG5cdCAgX25hbWU6ICdwb29sJyxcblxuXHQgIHBsdWc6IGZ1bmN0aW9uIHBsdWcob2JzKSB7XG5cdCAgICB0aGlzLl9hZGQob2JzKTtcblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH0sXG5cblx0ICB1bnBsdWc6IGZ1bmN0aW9uIHVucGx1ZyhvYnMpIHtcblx0ICAgIHRoaXMuX3JlbW92ZShvYnMpO1xuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gUG9vbDtcblxuLyoqKi8gfSxcbi8qIDY3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZS5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUuRVJST1I7XG5cdHZhciBFTkQgPSBfcmVxdWlyZS5FTkQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZTIuaW5oZXJpdDtcblxuXHR2YXIgQWJzdHJhY3RQb29sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Myk7XG5cblx0ZnVuY3Rpb24gRmxhdE1hcChzb3VyY2UsIGZuLCBvcHRpb25zKSB7XG5cdCAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgIEFic3RyYWN0UG9vbC5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuXHQgIHRoaXMuX3NvdXJjZSA9IHNvdXJjZTtcblx0ICB0aGlzLl9mbiA9IGZuO1xuXHQgIHRoaXMuX21haW5FbmRlZCA9IGZhbHNlO1xuXHQgIHRoaXMuX2xhc3RDdXJyZW50ID0gbnVsbDtcblx0ICB0aGlzLl8kaGFuZGxlTWFpbiA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgcmV0dXJuIF90aGlzLl9oYW5kbGVNYWluKGV2ZW50KTtcblx0ICB9O1xuXHR9XG5cblx0aW5oZXJpdChGbGF0TWFwLCBBYnN0cmFjdFBvb2wsIHtcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICBBYnN0cmFjdFBvb2wucHJvdG90eXBlLl9vbkFjdGl2YXRpb24uY2FsbCh0aGlzKTtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcblx0ICAgICAgdGhpcy5fc291cmNlLm9uQW55KHRoaXMuXyRoYW5kbGVNYWluKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICBBYnN0cmFjdFBvb2wucHJvdG90eXBlLl9vbkRlYWN0aXZhdGlvbi5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fc291cmNlLm9mZkFueSh0aGlzLl8kaGFuZGxlTWFpbik7XG5cdCAgICB0aGlzLl9oYWROb0V2U2luY2VEZWFjdCA9IHRydWU7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVNYWluOiBmdW5jdGlvbiBfaGFuZGxlTWFpbihldmVudCkge1xuXG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gVkFMVUUpIHtcblx0ICAgICAgLy8gSXMgbGF0ZXN0IHZhbHVlIGJlZm9yZSBkZWFjdGl2YXRpb24gc3Vydml2ZWQsIGFuZCBub3cgaXMgJ2N1cnJlbnQnIG9uIHRoaXMgYWN0aXZhdGlvbj9cblx0ICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBoYW5kbGUgc3VjaCB2YWx1ZXMsIHRvIHByZXZlbnQgdG8gY29uc3RhbnRseSBhZGRcblx0ICAgICAgLy8gc2FtZSBvYnNlcnZhbGUgb24gZWFjaCBhY3RpdmF0aW9uL2RlYWN0aXZhdGlvbiB3aGVuIG91ciBtYWluIHNvdXJjZVxuXHQgICAgICAvLyBpcyBhIGBLZWZpci5jb25hdGFudCgpYCBmb3IgZXhhbXBsZS5cblx0ICAgICAgdmFyIHNhbWVDdXJyID0gdGhpcy5fYWN0aXZhdGluZyAmJiB0aGlzLl9oYWROb0V2U2luY2VEZWFjdCAmJiB0aGlzLl9sYXN0Q3VycmVudCA9PT0gZXZlbnQudmFsdWU7XG5cdCAgICAgIGlmICghc2FtZUN1cnIpIHtcblx0ICAgICAgICB0aGlzLl9hZGQoZXZlbnQudmFsdWUsIHRoaXMuX2ZuKTtcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLl9sYXN0Q3VycmVudCA9IGV2ZW50LnZhbHVlO1xuXHQgICAgICB0aGlzLl9oYWROb0V2U2luY2VEZWFjdCA9IGZhbHNlO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gRVJST1IpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKGV2ZW50LnZhbHVlKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVORCkge1xuXHQgICAgICBpZiAodGhpcy5faXNFbXB0eSgpKSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuX21haW5FbmRlZCA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRW1wdHk6IGZ1bmN0aW9uIF9vbkVtcHR5KCkge1xuXHQgICAgaWYgKHRoaXMuX21haW5FbmRlZCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgQWJzdHJhY3RQb29sLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XG5cdCAgICB0aGlzLl9sYXN0Q3VycmVudCA9IG51bGw7XG5cdCAgICB0aGlzLl8kaGFuZGxlTWFpbiA9IG51bGw7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gRmxhdE1hcDtcblxuLyoqKi8gfSxcbi8qIDY4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZS5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUuRVJST1I7XG5cdHZhciBFTkQgPSBfcmVxdWlyZS5FTkQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZTIuaW5oZXJpdDtcblxuXHR2YXIgRmxhdE1hcCA9IF9fd2VicGFja19yZXF1aXJlX18oNjcpO1xuXG5cdGZ1bmN0aW9uIEZsYXRNYXBFcnJvcnMoc291cmNlLCBmbikge1xuXHQgIEZsYXRNYXAuY2FsbCh0aGlzLCBzb3VyY2UsIGZuKTtcblx0fVxuXG5cdGluaGVyaXQoRmxhdE1hcEVycm9ycywgRmxhdE1hcCwge1xuXG5cdCAgLy8gU2FtZSBhcyBpbiBGbGF0TWFwLCBvbmx5IFZBTFVFL0VSUk9SIGZsaXBwZWRcblx0ICBfaGFuZGxlTWFpbjogZnVuY3Rpb24gX2hhbmRsZU1haW4oZXZlbnQpIHtcblxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVSUk9SKSB7XG5cdCAgICAgIHZhciBzYW1lQ3VyciA9IHRoaXMuX2FjdGl2YXRpbmcgJiYgdGhpcy5faGFkTm9FdlNpbmNlRGVhY3QgJiYgdGhpcy5fbGFzdEN1cnJlbnQgPT09IGV2ZW50LnZhbHVlO1xuXHQgICAgICBpZiAoIXNhbWVDdXJyKSB7XG5cdCAgICAgICAgdGhpcy5fYWRkKGV2ZW50LnZhbHVlLCB0aGlzLl9mbik7XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5fbGFzdEN1cnJlbnQgPSBldmVudC52YWx1ZTtcblx0ICAgICAgdGhpcy5faGFkTm9FdlNpbmNlRGVhY3QgPSBmYWxzZTtcblx0ICAgIH1cblxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IFZBTFVFKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZShldmVudC52YWx1ZSk7XG5cdCAgICB9XG5cblx0ICAgIGlmIChldmVudC50eXBlID09PSBFTkQpIHtcblx0ICAgICAgaWYgKHRoaXMuX2lzRW1wdHkoKSkge1xuXHQgICAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLl9tYWluRW5kZWQgPSB0cnVlO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gRmxhdE1hcEVycm9ycztcblxuLyoqKi8gfSxcbi8qIDY5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MCk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZTIuTk9USElORztcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaGFuZGxlUHJpbWFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl9sYXN0U2Vjb25kYXJ5ICE9PSBOT1RISU5HICYmIHRoaXMuX2xhc3RTZWNvbmRhcnkpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlU2Vjb25kYXJ5RW5kOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5RW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2xhc3RTZWNvbmRhcnkgPT09IE5PVEhJTkcgfHwgIXRoaXMuX2xhc3RTZWNvbmRhcnkpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdmaWx0ZXJCeScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnZmlsdGVyQnknLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWx0ZXJCeShwcmltYXJ5LCBzZWNvbmRhcnkpIHtcblx0ICByZXR1cm4gbmV3IChwcmltYXJ5Ll9vZlNhbWVUeXBlKFMsIFApKShwcmltYXJ5LCBzZWNvbmRhcnkpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0dmFyIFByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZTIuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlMi5FUlJPUjtcblx0dmFyIEVORCA9IF9yZXF1aXJlMi5FTkQ7XG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUyLk5PVEhJTkc7XG5cblx0ZnVuY3Rpb24gY3JlYXRlQ29uc3RydWN0b3IoQmFzZUNsYXNzLCBuYW1lKSB7XG5cdCAgcmV0dXJuIGZ1bmN0aW9uIEFub255bW91c09ic2VydmFibGUocHJpbWFyeSwgc2Vjb25kYXJ5LCBvcHRpb25zKSB7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICBCYXNlQ2xhc3MuY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX3ByaW1hcnkgPSBwcmltYXJ5O1xuXHQgICAgdGhpcy5fc2Vjb25kYXJ5ID0gc2Vjb25kYXJ5O1xuXHQgICAgdGhpcy5fbmFtZSA9IHByaW1hcnkuX25hbWUgKyAnLicgKyBuYW1lO1xuXHQgICAgdGhpcy5fbGFzdFNlY29uZGFyeSA9IE5PVEhJTkc7XG5cdCAgICB0aGlzLl8kaGFuZGxlU2Vjb25kYXJ5QW55ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5faGFuZGxlU2Vjb25kYXJ5QW55KGV2ZW50KTtcblx0ICAgIH07XG5cdCAgICB0aGlzLl8kaGFuZGxlUHJpbWFyeUFueSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX2hhbmRsZVByaW1hcnlBbnkoZXZlbnQpO1xuXHQgICAgfTtcblx0ICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG5cdCAgfTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUNsYXNzTWV0aG9kcyhCYXNlQ2xhc3MpIHtcblx0ICByZXR1cm4ge1xuXHQgICAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KCkge30sXG5cdCAgICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7fSxcblxuXHQgICAgX2hhbmRsZVByaW1hcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlWYWx1ZSh4KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH0sXG5cdCAgICBfaGFuZGxlUHJpbWFyeUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeUVycm9yKHgpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgfSxcblx0ICAgIF9oYW5kbGVQcmltYXJ5RW5kOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeUVuZCgpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfSxcblxuXHQgICAgX2hhbmRsZVNlY29uZGFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5VmFsdWUoeCkge1xuXHQgICAgICB0aGlzLl9sYXN0U2Vjb25kYXJ5ID0geDtcblx0ICAgIH0sXG5cdCAgICBfaGFuZGxlU2Vjb25kYXJ5RXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlFcnJvcih4KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgIH0sXG5cdCAgICBfaGFuZGxlU2Vjb25kYXJ5RW5kOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5RW5kKCkge30sXG5cblx0ICAgIF9oYW5kbGVQcmltYXJ5QW55OiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeUFueShldmVudCkge1xuXHQgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcblx0ICAgICAgICBjYXNlIFZBTFVFOlxuXHQgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVByaW1hcnlWYWx1ZShldmVudC52YWx1ZSk7XG5cdCAgICAgICAgY2FzZSBFUlJPUjpcblx0ICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVQcmltYXJ5RXJyb3IoZXZlbnQudmFsdWUpO1xuXHQgICAgICAgIGNhc2UgRU5EOlxuXHQgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVByaW1hcnlFbmQoZXZlbnQudmFsdWUpO1xuXHQgICAgICB9XG5cdCAgICB9LFxuXHQgICAgX2hhbmRsZVNlY29uZGFyeUFueTogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeUFueShldmVudCkge1xuXHQgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcblx0ICAgICAgICBjYXNlIFZBTFVFOlxuXHQgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVNlY29uZGFyeVZhbHVlKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgICBjYXNlIEVSUk9SOlxuXHQgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVNlY29uZGFyeUVycm9yKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgICBjYXNlIEVORDpcblx0ICAgICAgICAgIHRoaXMuX2hhbmRsZVNlY29uZGFyeUVuZChldmVudC52YWx1ZSk7XG5cdCAgICAgICAgICB0aGlzLl9yZW1vdmVTZWNvbmRhcnkoKTtcblx0ICAgICAgfVxuXHQgICAgfSxcblxuXHQgICAgX3JlbW92ZVNlY29uZGFyeTogZnVuY3Rpb24gX3JlbW92ZVNlY29uZGFyeSgpIHtcblx0ICAgICAgaWYgKHRoaXMuX3NlY29uZGFyeSAhPT0gbnVsbCkge1xuXHQgICAgICAgIHRoaXMuX3NlY29uZGFyeS5vZmZBbnkodGhpcy5fJGhhbmRsZVNlY29uZGFyeUFueSk7XG5cdCAgICAgICAgdGhpcy5fJGhhbmRsZVNlY29uZGFyeUFueSA9IG51bGw7XG5cdCAgICAgICAgdGhpcy5fc2Vjb25kYXJ5ID0gbnVsbDtcblx0ICAgICAgfVxuXHQgICAgfSxcblxuXHQgICAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgICAgaWYgKHRoaXMuX3NlY29uZGFyeSAhPT0gbnVsbCkge1xuXHQgICAgICAgIHRoaXMuX3NlY29uZGFyeS5vbkFueSh0aGlzLl8kaGFuZGxlU2Vjb25kYXJ5QW55KTtcblx0ICAgICAgfVxuXHQgICAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG5cdCAgICAgICAgdGhpcy5fcHJpbWFyeS5vbkFueSh0aGlzLl8kaGFuZGxlUHJpbWFyeUFueSk7XG5cdCAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgICAgaWYgKHRoaXMuX3NlY29uZGFyeSAhPT0gbnVsbCkge1xuXHQgICAgICAgIHRoaXMuX3NlY29uZGFyeS5vZmZBbnkodGhpcy5fJGhhbmRsZVNlY29uZGFyeUFueSk7XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5fcHJpbWFyeS5vZmZBbnkodGhpcy5fJGhhbmRsZVByaW1hcnlBbnkpO1xuXHQgICAgfSxcblxuXHQgICAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICAgIEJhc2VDbGFzcy5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICAgIHRoaXMuX3ByaW1hcnkgPSBudWxsO1xuXHQgICAgICB0aGlzLl9zZWNvbmRhcnkgPSBudWxsO1xuXHQgICAgICB0aGlzLl9sYXN0U2Vjb25kYXJ5ID0gbnVsbDtcblx0ICAgICAgdGhpcy5fJGhhbmRsZVNlY29uZGFyeUFueSA9IG51bGw7XG5cdCAgICAgIHRoaXMuXyRoYW5kbGVQcmltYXJ5QW55ID0gbnVsbDtcblx0ICAgICAgdGhpcy5fZnJlZSgpO1xuXHQgICAgfVxuXG5cdCAgfTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVN0cmVhbShuYW1lLCBtaXhpbikge1xuXHQgIHZhciBTID0gY3JlYXRlQ29uc3RydWN0b3IoU3RyZWFtLCBuYW1lKTtcblx0ICBpbmhlcml0KFMsIFN0cmVhbSwgY3JlYXRlQ2xhc3NNZXRob2RzKFN0cmVhbSksIG1peGluKTtcblx0ICByZXR1cm4gUztcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVByb3BlcnR5KG5hbWUsIG1peGluKSB7XG5cdCAgdmFyIFAgPSBjcmVhdGVDb25zdHJ1Y3RvcihQcm9wZXJ0eSwgbmFtZSk7XG5cdCAgaW5oZXJpdChQLCBQcm9wZXJ0eSwgY3JlYXRlQ2xhc3NNZXRob2RzKFByb3BlcnR5KSwgbWl4aW4pO1xuXHQgIHJldHVybiBQO1xuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7IGNyZWF0ZVN0cmVhbTogY3JlYXRlU3RyZWFtLCBjcmVhdGVQcm9wZXJ0eTogY3JlYXRlUHJvcGVydHkgfTtcblxuLyoqKi8gfSxcbi8qIDcxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGNvbWJpbmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYwKTtcblxuXHR2YXIgaWQyID0gZnVuY3Rpb24gaWQyKF8sIHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNhbXBsZWRCeShwYXNzaXZlLCBhY3RpdmUsIGNvbWJpbmF0b3IpIHtcblx0ICB2YXIgX2NvbWJpbmF0b3IgPSBjb21iaW5hdG9yID8gZnVuY3Rpb24gKGEsIGIpIHtcblx0ICAgIHJldHVybiBjb21iaW5hdG9yKGIsIGEpO1xuXHQgIH0gOiBpZDI7XG5cdCAgcmV0dXJuIGNvbWJpbmUoW2FjdGl2ZV0sIFtwYXNzaXZlXSwgX2NvbWJpbmF0b3IpLnNldE5hbWUocGFzc2l2ZSwgJ3NhbXBsZWRCeScpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcwKTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlMi5OT1RISU5HO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9oYW5kbGVQcmltYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5VmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX2xhc3RTZWNvbmRhcnkgIT09IE5PVEhJTkcpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlU2Vjb25kYXJ5RW5kOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5RW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2xhc3RTZWNvbmRhcnkgPT09IE5PVEhJTkcpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdza2lwVW50aWxCeScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnc2tpcFVudGlsQnknLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBza2lwVW50aWxCeShwcmltYXJ5LCBzZWNvbmRhcnkpIHtcblx0ICByZXR1cm4gbmV3IChwcmltYXJ5Ll9vZlNhbWVUeXBlKFMsIFApKShwcmltYXJ5LCBzZWNvbmRhcnkpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcwKTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaGFuZGxlU2Vjb25kYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlWYWx1ZSgpIHtcblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgndGFrZVVudGlsQnknLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3Rha2VVbnRpbEJ5JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGFrZVVudGlsQnkocHJpbWFyeSwgc2Vjb25kYXJ5KSB7XG5cdCAgcmV0dXJuIG5ldyAocHJpbWFyeS5fb2ZTYW1lVHlwZShTLCBQKSkocHJpbWFyeSwgc2Vjb25kYXJ5KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDc0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MCk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KCkge1xuXHQgICAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHQgICAgdmFyIF9yZWYkZmx1c2hPbkVuZCA9IF9yZWYuZmx1c2hPbkVuZDtcblx0ICAgIHZhciBmbHVzaE9uRW5kID0gX3JlZiRmbHVzaE9uRW5kID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZiRmbHVzaE9uRW5kO1xuXG5cdCAgICB0aGlzLl9idWZmID0gW107XG5cdCAgICB0aGlzLl9mbHVzaE9uRW5kID0gZmx1c2hPbkVuZDtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fYnVmZiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9mbHVzaDogZnVuY3Rpb24gX2ZsdXNoKCkge1xuXHQgICAgaWYgKHRoaXMuX2J1ZmYgIT09IG51bGwpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX2J1ZmYpO1xuXHQgICAgICB0aGlzLl9idWZmID0gW107XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVQcmltYXJ5RW5kOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9mbHVzaE9uRW5kKSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfSxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICB0aGlzLl9wcmltYXJ5Lm9uQW55KHRoaXMuXyRoYW5kbGVQcmltYXJ5QW55KTtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSAmJiB0aGlzLl9zZWNvbmRhcnkgIT09IG51bGwpIHtcblx0ICAgICAgdGhpcy5fc2Vjb25kYXJ5Lm9uQW55KHRoaXMuXyRoYW5kbGVTZWNvbmRhcnlBbnkpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlUHJpbWFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeVZhbHVlKHgpIHtcblx0ICAgIHRoaXMuX2J1ZmYucHVzaCh4KTtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVNlY29uZGFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5VmFsdWUoKSB7XG5cdCAgICB0aGlzLl9mbHVzaCgpO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlU2Vjb25kYXJ5RW5kOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5RW5kKCkge1xuXHQgICAgaWYgKCF0aGlzLl9mbHVzaE9uRW5kKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnYnVmZmVyQnknLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2J1ZmZlckJ5JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVmZmVyQnkocHJpbWFyeSwgc2Vjb25kYXJ5LCBvcHRpb25zIC8qIG9wdGlvbmFsICovKSB7XG5cdCAgcmV0dXJuIG5ldyAocHJpbWFyeS5fb2ZTYW1lVHlwZShTLCBQKSkocHJpbWFyeSwgc2Vjb25kYXJ5LCBvcHRpb25zKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDc1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MCk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZTIuTk9USElORztcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoKSB7XG5cdCAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cdCAgICB2YXIgX3JlZiRmbHVzaE9uRW5kID0gX3JlZi5mbHVzaE9uRW5kO1xuXHQgICAgdmFyIGZsdXNoT25FbmQgPSBfcmVmJGZsdXNoT25FbmQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJGZsdXNoT25FbmQ7XG5cdCAgICB2YXIgX3JlZiRmbHVzaE9uQ2hhbmdlID0gX3JlZi5mbHVzaE9uQ2hhbmdlO1xuXHQgICAgdmFyIGZsdXNoT25DaGFuZ2UgPSBfcmVmJGZsdXNoT25DaGFuZ2UgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZiRmbHVzaE9uQ2hhbmdlO1xuXG5cdCAgICB0aGlzLl9idWZmID0gW107XG5cdCAgICB0aGlzLl9mbHVzaE9uRW5kID0gZmx1c2hPbkVuZDtcblx0ICAgIHRoaXMuX2ZsdXNoT25DaGFuZ2UgPSBmbHVzaE9uQ2hhbmdlO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9idWZmID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2ZsdXNoOiBmdW5jdGlvbiBfZmx1c2goKSB7XG5cdCAgICBpZiAodGhpcy5fYnVmZiAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fYnVmZik7XG5cdCAgICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVByaW1hcnlFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5RW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2ZsdXNoT25FbmQpIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVByaW1hcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlWYWx1ZSh4KSB7XG5cdCAgICB0aGlzLl9idWZmLnB1c2goeCk7XG5cdCAgICBpZiAodGhpcy5fbGFzdFNlY29uZGFyeSAhPT0gTk9USElORyAmJiAhdGhpcy5fbGFzdFNlY29uZGFyeSkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlU2Vjb25kYXJ5RW5kOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5RW5kKCkge1xuXHQgICAgaWYgKCF0aGlzLl9mbHVzaE9uRW5kICYmICh0aGlzLl9sYXN0U2Vjb25kYXJ5ID09PSBOT1RISU5HIHx8IHRoaXMuX2xhc3RTZWNvbmRhcnkpKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVNlY29uZGFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5VmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX2ZsdXNoT25DaGFuZ2UgJiYgIXgpIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblxuXHQgICAgLy8gZnJvbSBkZWZhdWx0IF9oYW5kbGVTZWNvbmRhcnlWYWx1ZVxuXHQgICAgdGhpcy5fbGFzdFNlY29uZGFyeSA9IHg7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2J1ZmZlcldoaWxlQnknLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2J1ZmZlcldoaWxlQnknLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWZmZXJXaGlsZUJ5KHByaW1hcnksIHNlY29uZGFyeSwgb3B0aW9ucyAvKiBvcHRpb25hbCAqLykge1xuXHQgIHJldHVybiBuZXcgKHByaW1hcnkuX29mU2FtZVR5cGUoUywgUCkpKHByaW1hcnksIHNlY29uZGFyeSwgb3B0aW9ucyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBtZXJnZSA9IF9fd2VicGFja19yZXF1aXJlX18oNjIpO1xuXHR2YXIgbWFwID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMik7XG5cdHZhciBza2lwRHVwbGljYXRlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNDApO1xuXHR2YXIgdG9Qcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXG5cdHZhciBmID0gZnVuY3Rpb24gZigpIHtcblx0ICByZXR1cm4gZmFsc2U7XG5cdH07XG5cdHZhciB0ID0gZnVuY3Rpb24gdCgpIHtcblx0ICByZXR1cm4gdHJ1ZTtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGF3YWl0aW5nKGEsIGIpIHtcblx0ICB2YXIgcmVzdWx0ID0gbWVyZ2UoW21hcChhLCB0KSwgbWFwKGIsIGYpXSk7XG5cdCAgcmVzdWx0ID0gc2tpcER1cGxpY2F0ZXMocmVzdWx0KTtcblx0ICByZXN1bHQgPSB0b1Byb3BlcnR5KHJlc3VsdCwgZik7XG5cdCAgcmV0dXJuIHJlc3VsdC5zZXROYW1lKGEsICdhd2FpdGluZycpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIHZhciByZXN1bHQgPSBmbih4KTtcblx0ICAgIGlmIChyZXN1bHQuY29udmVydCkge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IocmVzdWx0LmVycm9yKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgndmFsdWVzVG9FcnJvcnMnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3ZhbHVlc1RvRXJyb3JzJywgbWl4aW4pO1xuXG5cdHZhciBkZWZGbiA9IGZ1bmN0aW9uIGRlZkZuKHgpIHtcblx0ICByZXR1cm4geyBjb252ZXJ0OiB0cnVlLCBlcnJvcjogeCB9O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdmFsdWVzVG9FcnJvcnMob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gZGVmRm4gOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3OCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFcnJvcjogZnVuY3Rpb24gX2hhbmRsZUVycm9yKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgdmFyIHJlc3VsdCA9IGZuKHgpO1xuXHQgICAgaWYgKHJlc3VsdC5jb252ZXJ0KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZShyZXN1bHQudmFsdWUpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdlcnJvcnNUb1ZhbHVlcycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnZXJyb3JzVG9WYWx1ZXMnLCBtaXhpbik7XG5cblx0dmFyIGRlZkZuID0gZnVuY3Rpb24gZGVmRm4oeCkge1xuXHQgIHJldHVybiB7IGNvbnZlcnQ6IHRydWUsIHZhbHVlOiB4IH07XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlcnJvcnNUb1ZhbHVlcyhvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBkZWZGbiA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDc5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlRXJyb3IoeCkge1xuXHQgICAgdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdlbmRPbkVycm9yJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdlbmRPbkVycm9yJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5kT25FcnJvcihvYnMpIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icyk7XG5cdH07XG5cbi8qKiovIH1cbi8qKioqKiovIF0pXG59KTtcbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9rZWZpci9kaXN0L2tlZmlyLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMuY29udmVydEFsbFByb3BzVG9QeCA9IGZ1bmN0aW9uKGtleWZyYW1lcywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCkge1xuICB2YXIgaSwgaiwgaztcbiAgZm9yKGk9MDtpPGtleWZyYW1lcy5sZW5ndGg7aSsrKSB7IC8vIGxvb3Aga2V5ZnJhbWVzXG4gICAga2V5ZnJhbWVzW2ldLmR1cmF0aW9uID0gY29udmVydFBlcmNlbnRUb1B4KGtleWZyYW1lc1tpXS5kdXJhdGlvbiwgJ3knLCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0KTtcbiAgICBmb3Ioaj0wO2o8a2V5ZnJhbWVzW2ldLmFuaW1hdGlvbnMubGVuZ3RoO2orKykgeyAvLyBsb29wIGFuaW1hdGlvbnNcbiAgICAgIE9iamVjdC5rZXlzKGtleWZyYW1lc1tpXS5hbmltYXRpb25zW2pdKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkgeyAvLyBsb29wIHByb3BlcnRpZXNcbiAgICAgICAgdmFyIHZhbHVlID0ga2V5ZnJhbWVzW2ldLmFuaW1hdGlvbnNbal1ba2V5XTtcbiAgICAgICAgaWYoa2V5ICE9PSAnc2VsZWN0b3InKSB7XG4gICAgICAgICAgaWYodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgeyAvLyBpZiBpdHMgYW4gYXJyYXlcbiAgICAgICAgICAgIGZvcihrPTA7azx2YWx1ZS5sZW5ndGg7aysrKSB7IC8vIGlmIHZhbHVlIGluIGFycmF5IGlzICVcbiAgICAgICAgICAgICAgaWYodHlwZW9mIHZhbHVlW2tdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgaWYoa2V5ID09PSAndHJhbnNsYXRlWScpIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlW2tdID0gY29udmVydFBlcmNlbnRUb1B4KHZhbHVlW2tdLCAneScsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IGNvbnZlcnRQZXJjZW50VG9QeCh2YWx1ZVtrXSwgJ3gnLCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7IC8vIGlmIHNpbmdsZSB2YWx1ZSBpcyBhICVcbiAgICAgICAgICAgICAgaWYoa2V5ID09PSAndHJhbnNsYXRlWScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvbnZlcnRQZXJjZW50VG9QeCh2YWx1ZSwgJ3knLCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvbnZlcnRQZXJjZW50VG9QeCh2YWx1ZSwgJ3gnLCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBrZXlmcmFtZXNbaV0uYW5pbWF0aW9uc1tqXVtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4ga2V5ZnJhbWVzO1xufTtcblxuXG5cbmZ1bmN0aW9uIGNvbnZlcnRQZXJjZW50VG9QeCh2YWx1ZSwgYXhpcywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCkge1xuICBpZih0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUubWF0Y2goLyUvZykpIHtcbiAgICBpZihheGlzID09PSAneScpIHZhbHVlID0gKHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwKSAqIHdpbmRvd0hlaWdodDtcbiAgICBpZihheGlzID09PSAneCcpIHZhbHVlID0gKHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwKSAqIHdpbmRvd1dpZHRoO1xuICB9XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS5tYXRjaCgvdi9nKSkge1xuICAgIGlmKGF4aXMgPT09ICd5JykgdmFsdWUgPSAocGFyc2VGbG9hdCh2YWx1ZSkgLyAxMDApICogd2luZG93SGVpZ2h0O1xuICAgIGlmKGF4aXMgPT09ICd4JykgdmFsdWUgPSAocGFyc2VGbG9hdCh2YWx1ZSkgLyAxMDApICogd2luZG93V2lkdGg7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cy5idWlsZFBhZ2UgPSBmdW5jdGlvbihrZXlmcmFtZXMsIHdyYXBwZXJzKSB7XG4gIHZhciBpLCBqLCBrLCBpbml0RnJhbWVzID0gW10sIGJvZHlIZWlnaHQgPSAwO1xuICBmb3IoaT0wO2k8a2V5ZnJhbWVzLmxlbmd0aDtpKyspIHsgLy8gbG9vcCBrZXlmcmFtZXNcbiAgICAgIGlmKGtleWZyYW1lc1tpXS5mb2N1cykge1xuICAgICAgICAgIGlmKGJvZHlIZWlnaHQgIT09IGluaXRGcmFtZXNbaW5pdEZyYW1lcy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgaW5pdEZyYW1lcy5wdXNoKGJvZHlIZWlnaHQpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJvZHlIZWlnaHQgKz0ga2V5ZnJhbWVzW2ldLmR1cmF0aW9uO1xuICAgICAgaWYoJC5pbkFycmF5KGtleWZyYW1lc1tpXS53cmFwcGVyLCB3cmFwcGVycykgPT0gLTEpIHtcbiAgICAgICAgd3JhcHBlcnMucHVzaChrZXlmcmFtZXNbaV0ud3JhcHBlcik7XG4gICAgICB9XG4gICAgICBmb3Ioaj0wO2o8a2V5ZnJhbWVzW2ldLmFuaW1hdGlvbnMubGVuZ3RoO2orKykgeyAvLyBsb29wIGFuaW1hdGlvbnNcbiAgICAgICAgT2JqZWN0LmtleXMoa2V5ZnJhbWVzW2ldLmFuaW1hdGlvbnNbal0pLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7IC8vIGxvb3AgcHJvcGVydGllc1xuICAgICAgICAgIHZhciB2YWx1ZSA9IGtleWZyYW1lc1tpXS5hbmltYXRpb25zW2pdW2tleV07XG4gICAgICAgICAgaWYoa2V5ICE9PSAnc2VsZWN0b3InICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVTZXQgPSBbXTtcbiAgICAgICAgICAgIHZhbHVlU2V0LnB1c2goZ2V0RGVmYXVsdFByb3BlcnR5VmFsdWUoa2V5KSwgdmFsdWUpO1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVNldDtcbiAgICAgICAgICB9XG4gICAgICAgICAga2V5ZnJhbWVzW2ldLmFuaW1hdGlvbnNbal1ba2V5XSA9IHZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZnJhbWVGb2N1czogaW5pdEZyYW1lcyxcbiAgICBib2R5SGVpZ2h0OiBib2R5SGVpZ2h0LFxuICAgIHdyYXBwZXJzOiB3cmFwcGVyc1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5nZXREZWZhdWx0UHJvcGVydHlWYWx1ZSA9IGdldERlZmF1bHRQcm9wZXJ0eVZhbHVlO1xuXG5mdW5jdGlvbiBnZXREZWZhdWx0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkge1xuICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgY2FzZSAndHJhbnNsYXRlWCc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICd0cmFuc2xhdGVZJzpcbiAgICAgIHJldHVybiAwO1xuICAgIGNhc2UgJ3NjYWxlJzpcbiAgICAgIHJldHVybiAxO1xuICAgIGNhc2UgJ3JvdGF0ZSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgIHJldHVybiAxO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXRpbHMvcGFnZS11dGlscy5qc1xuICoqLyIsImNvbnN0IFBST1BFUlRJRVMgPSBbJ3RyYW5zbGF0ZVgnLCAndHJhbnNsYXRlWScsICdvcGFjaXR5JywgJ3JvdGF0ZScsICdzY2FsZSddXG5jb25zdCBBTklNQVRJT05fVElNRSA9IDQxXG5cbnZhciAkd2luZG93ID0gJCh3aW5kb3cpXG52YXIgJGJvZHkgPSAkKCdib2R5LGh0bWwnKVxuXG5jb25zdCBJTklUX1NUQVRFID0ge1xuXG4gIC8vIFdyYXBwZXJzIGFyZSB0aGUgY29udGFpbmVyIHNjZW5lcywga2luZCBvZiBsaWtlIHNlY3Rpb25zLlxuICAvLyBUaGV5IGFyZSBkZWZpbmVkIGJ5IHRoZSBmb2xkZXIgc3RydWN0dXJlLlxuICAvLyBUaGV5IGhlbHAgc2hhcmluZyBtdWx0aXBsZSBmb2N1cyBwb2ludHMgYmV0d2VlbiBpbnRlZ3JhdGVkIGFuaW1hdGlvbnMuXG5cbiAgICB3cmFwcGVyczogW10sXG4gICAgY3VycmVudFdyYXBwZXI6IG51bGwsXG5cbiAgLy8gS25vdyBzY3JvbGwgbG9jYXRpb24gaXMgY3JpdGljYWwgdG8gdGhlIHNjYW4gZXhwZXJpZW5jZS5cblxuICAgIHNjcm9sbFRvcDogJHdpbmRvdy5zY3JvbGxUb3AoKSxcbiAgICByZWxhdGl2ZVNjcm9sbFRvcDogMCxcblxuICAvLyBLZXlmcmFtZXMgYXJlIHRoZSBhY3R1YWwgYW5pbWF0aW9uIGZyYW1lcywgZGVmaW5lZCBpbiBzY2VuZS5qc29uIHdpdGhcbiAgLy8gc2VsZWN0b3JzIGFuZCBhc3NvY2lhdGVkIGFuaW1hdGlvbnMuXG4gIC8vIE9uZSB3cmFwcGVyIGNhbiBoYXZlIG11bHRpcGxlIGtleWZyYW1lcy5cblxuICAgIGtleWZyYW1lczogdW5kZWZpbmVkLFxuXG4gIC8vIFN1bSBvZiBhbGwgcHJldmlvdXMga2V5ZnJhbWVzICh0byBrbm93IHJlbGF0aXZlIHBvc2l0aW9uKVxuXG4gICAgcHJldktleWZyYW1lc0R1cmF0aW9uczogMCxcblxuICAvLyBDdXJyZW50IGtleWZyYW1lIGFycmF5IG51bWJlclxuXG4gICAgY3VycmVudEtleWZyYW1lOiAwLFxuXG4gIC8vIEtleWZyYW1lcyBjYW4gYmUgZGVmaW5lZCBhcyBwb2ludHMgb2YgZm9jdXMuXG4gIC8vIFRoZXNlIGZvY3VzIHBvaW50cyBoZWxwIGdpdmUgdGhlIHVzZXIgZm9jdXMgd2hlcmUgdGhleSBtYXkgd2FudCBpdCwgbGlrZSB3aXRoXG4gIC8vIFRoZSBzbGlkZSBleHBlcmllbmNlIGFuZCB0aGUgc2Nyb2xsYmFyIGxlZ2VuZC5cblxuICAvLyBBcnJheSBvZiBvYmplY3RzIHt0aW1lOiAsIHNjcm9sbDogfVxuICAgIGZyYW1lRm9jdXM6IFtdLFxuXG4gIC8vIElkIG9mIGN1cnJlbnQgZm9jdXNcblxuICAgIGN1cnJlbnRGb2N1czogMCxcblxuICAvLyBUT0RPXG4gICAgY3VycmVudEZyYW1lOiBbMF0sXG5cbiAgLy8gVE9ET1xuXG4gICAgc2Nyb2xsVGltZW91dElEOiAwLFxuXG4gIC8vIERlZmluaW5nIGRpbWVuc2lvbnMgZm9yIHRoZSBleHBlcmllbmNlXG5cbiAgICBib2R5SGVpZ2h0OiAwLFxuICAgIHdpbmRvd0hlaWdodDogMCxcbiAgICB3aW5kb3dXaWR0aDogMFxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMuSU5JVF9TVEFURSA9IElOSVRfU1RBVEVcbm1vZHVsZS5leHBvcnRzLlBST1BFUlRJRVMgPSBQUk9QRVJUSUVTXG5tb2R1bGUuZXhwb3J0cy5BTklNQVRJT05fVElNRSA9IEFOSU1BVElPTl9USU1FXG5tb2R1bGUuZXhwb3J0cy4kYm9keSA9ICRib2R5XG5tb2R1bGUuZXhwb3J0cy4kd2luZG93ID0gJHdpbmRvd1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uc3RhbnRzLmpzXG4gKiovIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgQWpheE1vbml0b3IsIEJhciwgRG9jdW1lbnRNb25pdG9yLCBFbGVtZW50TW9uaXRvciwgRWxlbWVudFRyYWNrZXIsIEV2ZW50TGFnTW9uaXRvciwgRXZlbnRlZCwgRXZlbnRzLCBOb1RhcmdldEVycm9yLCBQYWNlLCBSZXF1ZXN0SW50ZXJjZXB0LCBTT1VSQ0VfS0VZUywgU2NhbGVyLCBTb2NrZXRSZXF1ZXN0VHJhY2tlciwgWEhSUmVxdWVzdFRyYWNrZXIsIGFuaW1hdGlvbiwgYXZnQW1wbGl0dWRlLCBiYXIsIGNhbmNlbEFuaW1hdGlvbiwgY2FuY2VsQW5pbWF0aW9uRnJhbWUsIGRlZmF1bHRPcHRpb25zLCBleHRlbmQsIGV4dGVuZE5hdGl2ZSwgZ2V0RnJvbURPTSwgZ2V0SW50ZXJjZXB0LCBoYW5kbGVQdXNoU3RhdGUsIGlnbm9yZVN0YWNrLCBpbml0LCBub3csIG9wdGlvbnMsIHJlcXVlc3RBbmltYXRpb25GcmFtZSwgcmVzdWx0LCBydW5BbmltYXRpb24sIHNjYWxlcnMsIHNob3VsZElnbm9yZVVSTCwgc2hvdWxkVHJhY2ssIHNvdXJjZSwgc291cmNlcywgdW5pU2NhbGVyLCBfV2ViU29ja2V0LCBfWERvbWFpblJlcXVlc3QsIF9YTUxIdHRwUmVxdWVzdCwgX2ksIF9pbnRlcmNlcHQsIF9sZW4sIF9wdXNoU3RhdGUsIF9yZWYsIF9yZWYxLCBfcmVwbGFjZVN0YXRlLFxuICAgIF9fc2xpY2UgPSBbXS5zbGljZSxcbiAgICBfX2hhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBfX2V4dGVuZHMgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKF9faGFzUHJvcC5jYWxsKHBhcmVudCwga2V5KSkgY2hpbGRba2V5XSA9IHBhcmVudFtrZXldOyB9IGZ1bmN0aW9uIGN0b3IoKSB7IHRoaXMuY29uc3RydWN0b3IgPSBjaGlsZDsgfSBjdG9yLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7IGNoaWxkLnByb3RvdHlwZSA9IG5ldyBjdG9yKCk7IGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7IHJldHVybiBjaGlsZDsgfSxcbiAgICBfX2luZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuICBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBjYXRjaHVwVGltZTogMTAwLFxuICAgIGluaXRpYWxSYXRlOiAuMDMsXG4gICAgbWluVGltZTogMjUwLFxuICAgIGdob3N0VGltZTogMTAwLFxuICAgIG1heFByb2dyZXNzUGVyRnJhbWU6IDIwLFxuICAgIGVhc2VGYWN0b3I6IDEuMjUsXG4gICAgc3RhcnRPblBhZ2VMb2FkOiB0cnVlLFxuICAgIHJlc3RhcnRPblB1c2hTdGF0ZTogdHJ1ZSxcbiAgICByZXN0YXJ0T25SZXF1ZXN0QWZ0ZXI6IDUwMCxcbiAgICB0YXJnZXQ6ICdib2R5JyxcbiAgICBlbGVtZW50czoge1xuICAgICAgY2hlY2tJbnRlcnZhbDogMTAwLFxuICAgICAgc2VsZWN0b3JzOiBbJ2JvZHknXVxuICAgIH0sXG4gICAgZXZlbnRMYWc6IHtcbiAgICAgIG1pblNhbXBsZXM6IDEwLFxuICAgICAgc2FtcGxlQ291bnQ6IDMsXG4gICAgICBsYWdUaHJlc2hvbGQ6IDNcbiAgICB9LFxuICAgIGFqYXg6IHtcbiAgICAgIHRyYWNrTWV0aG9kczogWydHRVQnXSxcbiAgICAgIHRyYWNrV2ViU29ja2V0czogdHJ1ZSxcbiAgICAgIGlnbm9yZVVSTHM6IFtdXG4gICAgfVxuICB9O1xuXG4gIG5vdyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfcmVmO1xuICAgIHJldHVybiAoX3JlZiA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCA/IHR5cGVvZiBwZXJmb3JtYW5jZS5ub3cgPT09IFwiZnVuY3Rpb25cIiA/IHBlcmZvcm1hbmNlLm5vdygpIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsID8gX3JlZiA6ICsobmV3IERhdGUpO1xuICB9O1xuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZTtcblxuICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWU7XG5cbiAgaWYgKHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PSBudWxsKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oZm4pIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCA1MCk7XG4gICAgfTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTtcbiAgICB9O1xuICB9XG5cbiAgcnVuQW5pbWF0aW9uID0gZnVuY3Rpb24oZm4pIHtcbiAgICB2YXIgbGFzdCwgdGljaztcbiAgICBsYXN0ID0gbm93KCk7XG4gICAgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGRpZmY7XG4gICAgICBkaWZmID0gbm93KCkgLSBsYXN0O1xuICAgICAgaWYgKGRpZmYgPj0gMzMpIHtcbiAgICAgICAgbGFzdCA9IG5vdygpO1xuICAgICAgICByZXR1cm4gZm4oZGlmZiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCh0aWNrLCAzMyAtIGRpZmYpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRpY2soKTtcbiAgfTtcblxuICByZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywga2V5LCBvYmo7XG4gICAgb2JqID0gYXJndW1lbnRzWzBdLCBrZXkgPSBhcmd1bWVudHNbMV0sIGFyZ3MgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSA6IFtdO1xuICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XS5hcHBseShvYmosIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfVxuICB9O1xuXG4gIGV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXksIG91dCwgc291cmNlLCBzb3VyY2VzLCB2YWwsIF9pLCBfbGVuO1xuICAgIG91dCA9IGFyZ3VtZW50c1swXSwgc291cmNlcyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBzb3VyY2VzLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBzb3VyY2UgPSBzb3VyY2VzW19pXTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgaWYgKCFfX2hhc1Byb3AuY2FsbChzb3VyY2UsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgIHZhbCA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgIGlmICgob3V0W2tleV0gIT0gbnVsbCkgJiYgdHlwZW9mIG91dFtrZXldID09PSAnb2JqZWN0JyAmJiAodmFsICE9IG51bGwpICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBleHRlbmQob3V0W2tleV0sIHZhbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dFtrZXldID0gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0O1xuICB9O1xuXG4gIGF2Z0FtcGxpdHVkZSA9IGZ1bmN0aW9uKGFycikge1xuICAgIHZhciBjb3VudCwgc3VtLCB2LCBfaSwgX2xlbjtcbiAgICBzdW0gPSBjb3VudCA9IDA7XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBhcnIubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIHYgPSBhcnJbX2ldO1xuICAgICAgc3VtICs9IE1hdGguYWJzKHYpO1xuICAgICAgY291bnQrKztcbiAgICB9XG4gICAgcmV0dXJuIHN1bSAvIGNvdW50O1xuICB9O1xuXG4gIGdldEZyb21ET00gPSBmdW5jdGlvbihrZXksIGpzb24pIHtcbiAgICB2YXIgZGF0YSwgZSwgZWw7XG4gICAgaWYgKGtleSA9PSBudWxsKSB7XG4gICAgICBrZXkgPSAnb3B0aW9ucyc7XG4gICAgfVxuICAgIGlmIChqc29uID09IG51bGwpIHtcbiAgICAgIGpzb24gPSB0cnVlO1xuICAgIH1cbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wYWNlLVwiICsga2V5ICsgXCJdXCIpO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGF0YSA9IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGFjZS1cIiArIGtleSk7XG4gICAgaWYgKCFqc29uKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgZSA9IF9lcnJvcjtcbiAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsID8gY29uc29sZS5lcnJvcihcIkVycm9yIHBhcnNpbmcgaW5saW5lIHBhY2Ugb3B0aW9uc1wiLCBlKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG5cbiAgRXZlbnRlZCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudGVkKCkge31cblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIsIGN0eCwgb25jZSkge1xuICAgICAgdmFyIF9iYXNlO1xuICAgICAgaWYgKG9uY2UgPT0gbnVsbCkge1xuICAgICAgICBvbmNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5iaW5kaW5ncyA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICgoX2Jhc2UgPSB0aGlzLmJpbmRpbmdzKVtldmVudF0gPT0gbnVsbCkge1xuICAgICAgICBfYmFzZVtldmVudF0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW2V2ZW50XS5wdXNoKHtcbiAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgY3R4OiBjdHgsXG4gICAgICAgIG9uY2U6IG9uY2VcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIsIGN0eCkge1xuICAgICAgcmV0dXJuIHRoaXMub24oZXZlbnQsIGhhbmRsZXIsIGN0eCwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICB2YXIgaSwgX3JlZiwgX3Jlc3VsdHM7XG4gICAgICBpZiAoKChfcmVmID0gdGhpcy5iaW5kaW5ncykgIT0gbnVsbCA/IF9yZWZbZXZlbnRdIDogdm9pZCAwKSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChoYW5kbGVyID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRlbGV0ZSB0aGlzLmJpbmRpbmdzW2V2ZW50XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIGlmICh0aGlzLmJpbmRpbmdzW2V2ZW50XVtpXS5oYW5kbGVyID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHRoaXMuYmluZGluZ3NbZXZlbnRdLnNwbGljZShpLCAxKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goaSsrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgY3R4LCBldmVudCwgaGFuZGxlciwgaSwgb25jZSwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xuICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKChfcmVmID0gdGhpcy5iaW5kaW5ncykgIT0gbnVsbCA/IF9yZWZbZXZlbnRdIDogdm9pZCAwKSB7XG4gICAgICAgIGkgPSAwO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICB3aGlsZSAoaSA8IHRoaXMuYmluZGluZ3NbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICAgIF9yZWYxID0gdGhpcy5iaW5kaW5nc1tldmVudF1baV0sIGhhbmRsZXIgPSBfcmVmMS5oYW5kbGVyLCBjdHggPSBfcmVmMS5jdHgsIG9uY2UgPSBfcmVmMS5vbmNlO1xuICAgICAgICAgIGhhbmRsZXIuYXBwbHkoY3R4ICE9IG51bGwgPyBjdHggOiB0aGlzLCBhcmdzKTtcbiAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGkrKyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50ZWQ7XG5cbiAgfSkoKTtcblxuICBQYWNlID0gd2luZG93LlBhY2UgfHwge307XG5cbiAgd2luZG93LlBhY2UgPSBQYWNlO1xuXG4gIGV4dGVuZChQYWNlLCBFdmVudGVkLnByb3RvdHlwZSk7XG5cbiAgb3B0aW9ucyA9IFBhY2Uub3B0aW9ucyA9IGV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIHdpbmRvdy5wYWNlT3B0aW9ucywgZ2V0RnJvbURPTSgpKTtcblxuICBfcmVmID0gWydhamF4JywgJ2RvY3VtZW50JywgJ2V2ZW50TGFnJywgJ2VsZW1lbnRzJ107XG4gIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZi5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgIHNvdXJjZSA9IF9yZWZbX2ldO1xuICAgIGlmIChvcHRpb25zW3NvdXJjZV0gPT09IHRydWUpIHtcbiAgICAgIG9wdGlvbnNbc291cmNlXSA9IGRlZmF1bHRPcHRpb25zW3NvdXJjZV07XG4gICAgfVxuICB9XG5cbiAgTm9UYXJnZXRFcnJvciA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTm9UYXJnZXRFcnJvciwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIE5vVGFyZ2V0RXJyb3IoKSB7XG4gICAgICBfcmVmMSA9IE5vVGFyZ2V0RXJyb3IuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gX3JlZjE7XG4gICAgfVxuXG4gICAgcmV0dXJuIE5vVGFyZ2V0RXJyb3I7XG5cbiAgfSkoRXJyb3IpO1xuXG4gIEJhciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBCYXIoKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICB9XG5cbiAgICBCYXIucHJvdG90eXBlLmdldEVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXRFbGVtZW50O1xuICAgICAgaWYgKHRoaXMuZWwgPT0gbnVsbCkge1xuICAgICAgICB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnRhcmdldCk7XG4gICAgICAgIGlmICghdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgIHRocm93IG5ldyBOb1RhcmdldEVycm9yO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbC5jbGFzc05hbWUgPSBcInBhY2UgcGFjZS1hY3RpdmVcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKC9wYWNlLWRvbmUvZywgJycpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSArPSAnIHBhY2UtcnVubmluZyc7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJwYWNlLXByb2dyZXNzXCI+XFxuICA8ZGl2IGNsYXNzPVwicGFjZS1wcm9ncmVzcy1pbm5lclwiPjwvZGl2PlxcbjwvZGl2PlxcbjxkaXYgY2xhc3M9XCJwYWNlLWFjdGl2aXR5XCI+PC9kaXY+JztcbiAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQuZmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgdGFyZ2V0RWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5lbCwgdGFyZ2V0RWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbDtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbDtcbiAgICAgIGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZSgncGFjZS1hY3RpdmUnLCAnJyk7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gJyBwYWNlLWluYWN0aXZlJztcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgncGFjZS1ydW5uaW5nJywgJycpO1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lICs9ICcgcGFjZS1kb25lJztcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihwcm9nKSB7XG4gICAgICB0aGlzLnByb2dyZXNzID0gcHJvZztcbiAgICAgIHJldHVybiB0aGlzLnJlbmRlcigpO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5nZXRFbGVtZW50KCkpO1xuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgIE5vVGFyZ2V0RXJyb3IgPSBfZXJyb3I7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbCA9IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlbCwga2V5LCBwcm9ncmVzc1N0ciwgdHJhbnNmb3JtLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50YXJnZXQpID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgIHRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoXCIgKyB0aGlzLnByb2dyZXNzICsgXCIlLCAwLCAwKVwiO1xuICAgICAgX3JlZjIgPSBbJ3dlYmtpdFRyYW5zZm9ybScsICdtc1RyYW5zZm9ybScsICd0cmFuc2Zvcm0nXTtcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBrZXkgPSBfcmVmMltfal07XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnN0eWxlW2tleV0gPSB0cmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgfHwgdGhpcy5sYXN0UmVuZGVyZWRQcm9ncmVzcyB8IDAgIT09IHRoaXMucHJvZ3Jlc3MgfCAwKSB7XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzcy10ZXh0JywgXCJcIiArICh0aGlzLnByb2dyZXNzIHwgMCkgKyBcIiVcIik7XG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzID49IDEwMCkge1xuICAgICAgICAgIHByb2dyZXNzU3RyID0gJzk5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9ncmVzc1N0ciA9IHRoaXMucHJvZ3Jlc3MgPCAxMCA/IFwiMFwiIDogXCJcIjtcbiAgICAgICAgICBwcm9ncmVzc1N0ciArPSB0aGlzLnByb2dyZXNzIHwgMDtcbiAgICAgICAgfVxuICAgICAgICBlbC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MnLCBcIlwiICsgcHJvZ3Jlc3NTdHIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzID49IDEwMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJhcjtcblxuICB9KSgpO1xuXG4gIEV2ZW50cyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudHMoKSB7XG4gICAgICB0aGlzLmJpbmRpbmdzID0ge307XG4gICAgfVxuXG4gICAgRXZlbnRzLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgICB2YXIgYmluZGluZywgX2osIF9sZW4xLCBfcmVmMiwgX3Jlc3VsdHM7XG4gICAgICBpZiAodGhpcy5iaW5kaW5nc1tuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgIF9yZWYyID0gdGhpcy5iaW5kaW5nc1tuYW1lXTtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgYmluZGluZyA9IF9yZWYyW19qXTtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKGJpbmRpbmcuY2FsbCh0aGlzLCB2YWwpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEV2ZW50cy5wcm90b3R5cGUub24gPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICAgICAgdmFyIF9iYXNlO1xuICAgICAgaWYgKChfYmFzZSA9IHRoaXMuYmluZGluZ3MpW25hbWVdID09IG51bGwpIHtcbiAgICAgICAgX2Jhc2VbbmFtZV0gPSBbXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJpbmRpbmdzW25hbWVdLnB1c2goZm4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnRzO1xuXG4gIH0pKCk7XG5cbiAgX1hNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0O1xuXG4gIF9YRG9tYWluUmVxdWVzdCA9IHdpbmRvdy5YRG9tYWluUmVxdWVzdDtcblxuICBfV2ViU29ja2V0ID0gd2luZG93LldlYlNvY2tldDtcblxuICBleHRlbmROYXRpdmUgPSBmdW5jdGlvbih0bywgZnJvbSkge1xuICAgIHZhciBlLCBrZXksIF9yZXN1bHRzO1xuICAgIF9yZXN1bHRzID0gW107XG4gICAgZm9yIChrZXkgaW4gZnJvbS5wcm90b3R5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICgodG9ba2V5XSA9PSBudWxsKSAmJiB0eXBlb2YgZnJvbVtrZXldICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZGVmaW5lUHJvcGVydHkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goT2JqZWN0LmRlZmluZVByb3BlcnR5KHRvLCBrZXksIHtcbiAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJvbS5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godG9ba2V5XSA9IGZyb20ucHJvdG90eXBlW2tleV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBlID0gX2Vycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cbiAgaWdub3JlU3RhY2sgPSBbXTtcblxuICBQYWNlLmlnbm9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmbiwgcmV0O1xuICAgIGZuID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZ25vcmVTdGFjay51bnNoaWZ0KCdpZ25vcmUnKTtcbiAgICByZXQgPSBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICBpZ25vcmVTdGFjay5zaGlmdCgpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgUGFjZS50cmFjayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmbiwgcmV0O1xuICAgIGZuID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZ25vcmVTdGFjay51bnNoaWZ0KCd0cmFjaycpO1xuICAgIHJldCA9IGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIGlnbm9yZVN0YWNrLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBzaG91bGRUcmFjayA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBfcmVmMjtcbiAgICBpZiAobWV0aG9kID09IG51bGwpIHtcbiAgICAgIG1ldGhvZCA9ICdHRVQnO1xuICAgIH1cbiAgICBpZiAoaWdub3JlU3RhY2tbMF0gPT09ICd0cmFjaycpIHtcbiAgICAgIHJldHVybiAnZm9yY2UnO1xuICAgIH1cbiAgICBpZiAoIWlnbm9yZVN0YWNrLmxlbmd0aCAmJiBvcHRpb25zLmFqYXgpIHtcbiAgICAgIGlmIChtZXRob2QgPT09ICdzb2NrZXQnICYmIG9wdGlvbnMuYWpheC50cmFja1dlYlNvY2tldHMpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKF9yZWYyID0gbWV0aG9kLnRvVXBwZXJDYXNlKCksIF9faW5kZXhPZi5jYWxsKG9wdGlvbnMuYWpheC50cmFja01ldGhvZHMsIF9yZWYyKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgUmVxdWVzdEludGVyY2VwdCA9IChmdW5jdGlvbihfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVxdWVzdEludGVyY2VwdCwgX3N1cGVyKTtcblxuICAgIGZ1bmN0aW9uIFJlcXVlc3RJbnRlcmNlcHQoKSB7XG4gICAgICB2YXIgbW9uaXRvclhIUixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgUmVxdWVzdEludGVyY2VwdC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIG1vbml0b3JYSFIgPSBmdW5jdGlvbihyZXEpIHtcbiAgICAgICAgdmFyIF9vcGVuO1xuICAgICAgICBfb3BlbiA9IHJlcS5vcGVuO1xuICAgICAgICByZXR1cm4gcmVxLm9wZW4gPSBmdW5jdGlvbih0eXBlLCB1cmwsIGFzeW5jKSB7XG4gICAgICAgICAgaWYgKHNob3VsZFRyYWNrKHR5cGUpKSB7XG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyKCdyZXF1ZXN0Jywge1xuICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcmVxdWVzdDogcmVxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9vcGVuLmFwcGx5KHJlcSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbihmbGFncykge1xuICAgICAgICB2YXIgcmVxO1xuICAgICAgICByZXEgPSBuZXcgX1hNTEh0dHBSZXF1ZXN0KGZsYWdzKTtcbiAgICAgICAgbW9uaXRvclhIUihyZXEpO1xuICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgfTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuWE1MSHR0cFJlcXVlc3QsIF9YTUxIdHRwUmVxdWVzdCk7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICBpZiAoX1hEb21haW5SZXF1ZXN0ICE9IG51bGwpIHtcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHJlcTtcbiAgICAgICAgICByZXEgPSBuZXcgX1hEb21haW5SZXF1ZXN0O1xuICAgICAgICAgIG1vbml0b3JYSFIocmVxKTtcbiAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuWERvbWFpblJlcXVlc3QsIF9YRG9tYWluUmVxdWVzdCk7XG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge31cbiAgICAgIH1cbiAgICAgIGlmICgoX1dlYlNvY2tldCAhPSBudWxsKSAmJiBvcHRpb25zLmFqYXgudHJhY2tXZWJTb2NrZXRzKSB7XG4gICAgICAgIHdpbmRvdy5XZWJTb2NrZXQgPSBmdW5jdGlvbih1cmwsIHByb3RvY29scykge1xuICAgICAgICAgIHZhciByZXE7XG4gICAgICAgICAgaWYgKHByb3RvY29scyAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXEgPSBuZXcgX1dlYlNvY2tldCh1cmwsIHByb3RvY29scyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcSA9IG5ldyBfV2ViU29ja2V0KHVybCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaG91bGRUcmFjaygnc29ja2V0JykpIHtcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXIoJ3JlcXVlc3QnLCB7XG4gICAgICAgICAgICAgIHR5cGU6ICdzb2NrZXQnLFxuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgcHJvdG9jb2xzOiBwcm90b2NvbHMsXG4gICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXh0ZW5kTmF0aXZlKHdpbmRvdy5XZWJTb2NrZXQsIF9XZWJTb2NrZXQpO1xuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFJlcXVlc3RJbnRlcmNlcHQ7XG5cbiAgfSkoRXZlbnRzKTtcblxuICBfaW50ZXJjZXB0ID0gbnVsbDtcblxuICBnZXRJbnRlcmNlcHQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoX2ludGVyY2VwdCA9PSBudWxsKSB7XG4gICAgICBfaW50ZXJjZXB0ID0gbmV3IFJlcXVlc3RJbnRlcmNlcHQ7XG4gICAgfVxuICAgIHJldHVybiBfaW50ZXJjZXB0O1xuICB9O1xuXG4gIHNob3VsZElnbm9yZVVSTCA9IGZ1bmN0aW9uKHVybCkge1xuICAgIHZhciBwYXR0ZXJuLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgIF9yZWYyID0gb3B0aW9ucy5hamF4Lmlnbm9yZVVSTHM7XG4gICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICBwYXR0ZXJuID0gX3JlZjJbX2pdO1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodXJsLmluZGV4T2YocGF0dGVybikgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXR0ZXJuLnRlc3QodXJsKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBnZXRJbnRlcmNlcHQoKS5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKF9hcmcpIHtcbiAgICB2YXIgYWZ0ZXIsIGFyZ3MsIHJlcXVlc3QsIHR5cGUsIHVybDtcbiAgICB0eXBlID0gX2FyZy50eXBlLCByZXF1ZXN0ID0gX2FyZy5yZXF1ZXN0LCB1cmwgPSBfYXJnLnVybDtcbiAgICBpZiAoc2hvdWxkSWdub3JlVVJMKHVybCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFQYWNlLnJ1bm5pbmcgJiYgKG9wdGlvbnMucmVzdGFydE9uUmVxdWVzdEFmdGVyICE9PSBmYWxzZSB8fCBzaG91bGRUcmFjayh0eXBlKSA9PT0gJ2ZvcmNlJykpIHtcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBhZnRlciA9IG9wdGlvbnMucmVzdGFydE9uUmVxdWVzdEFmdGVyIHx8IDA7XG4gICAgICBpZiAodHlwZW9mIGFmdGVyID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgYWZ0ZXIgPSAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdGlsbEFjdGl2ZSwgX2osIF9sZW4xLCBfcmVmMiwgX3JlZjMsIF9yZXN1bHRzO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3NvY2tldCcpIHtcbiAgICAgICAgICBzdGlsbEFjdGl2ZSA9IHJlcXVlc3QucmVhZHlTdGF0ZSA8IDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RpbGxBY3RpdmUgPSAoMCA8IChfcmVmMiA9IHJlcXVlc3QucmVhZHlTdGF0ZSkgJiYgX3JlZjIgPCA0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RpbGxBY3RpdmUpIHtcbiAgICAgICAgICBQYWNlLnJlc3RhcnQoKTtcbiAgICAgICAgICBfcmVmMyA9IFBhY2Uuc291cmNlcztcbiAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYzLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgICAgc291cmNlID0gX3JlZjNbX2pdO1xuICAgICAgICAgICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEFqYXhNb25pdG9yKSB7XG4gICAgICAgICAgICAgIHNvdXJjZS53YXRjaC5hcHBseShzb3VyY2UsIGFyZ3MpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICB9XG4gICAgICB9LCBhZnRlcik7XG4gICAgfVxuICB9KTtcblxuICBBamF4TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBBamF4TW9uaXRvcigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBnZXRJbnRlcmNlcHQoKS5vbigncmVxdWVzdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMud2F0Y2guYXBwbHkoX3RoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBBamF4TW9uaXRvci5wcm90b3R5cGUud2F0Y2ggPSBmdW5jdGlvbihfYXJnKSB7XG4gICAgICB2YXIgcmVxdWVzdCwgdHJhY2tlciwgdHlwZSwgdXJsO1xuICAgICAgdHlwZSA9IF9hcmcudHlwZSwgcmVxdWVzdCA9IF9hcmcucmVxdWVzdCwgdXJsID0gX2FyZy51cmw7XG4gICAgICBpZiAoc2hvdWxkSWdub3JlVVJMKHVybCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09ICdzb2NrZXQnKSB7XG4gICAgICAgIHRyYWNrZXIgPSBuZXcgU29ja2V0UmVxdWVzdFRyYWNrZXIocmVxdWVzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFja2VyID0gbmV3IFhIUlJlcXVlc3RUcmFja2VyKHJlcXVlc3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucHVzaCh0cmFja2VyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFqYXhNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgWEhSUmVxdWVzdFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gWEhSUmVxdWVzdFRyYWNrZXIocmVxdWVzdCkge1xuICAgICAgdmFyIGV2ZW50LCBzaXplLCBfaiwgX2xlbjEsIF9vbnJlYWR5c3RhdGVjaGFuZ2UsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIGlmICh3aW5kb3cuUHJvZ3Jlc3NFdmVudCAhPSBudWxsKSB7XG4gICAgICAgIHNpemUgPSBudWxsO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgaWYgKGV2dC5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDAgKiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSBfdGhpcy5wcm9ncmVzcyArICgxMDAgLSBfdGhpcy5wcm9ncmVzcykgLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICBfcmVmMiA9IFsnbG9hZCcsICdhYm9ydCcsICd0aW1lb3V0JywgJ2Vycm9yJ107XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIGV2ZW50ID0gX3JlZjJbX2pdO1xuICAgICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfb25yZWFkeXN0YXRlY2hhbmdlID0gcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gICAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIF9yZWYzO1xuICAgICAgICAgIGlmICgoX3JlZjMgPSByZXF1ZXN0LnJlYWR5U3RhdGUpID09PSAwIHx8IF9yZWYzID09PSA0KSB7XG4gICAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSA1MDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBfb25yZWFkeXN0YXRlY2hhbmdlID09PSBcImZ1bmN0aW9uXCIgPyBfb25yZWFkeXN0YXRlY2hhbmdlLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgOiB2b2lkIDA7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFhIUlJlcXVlc3RUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgU29ja2V0UmVxdWVzdFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU29ja2V0UmVxdWVzdFRyYWNrZXIocmVxdWVzdCkge1xuICAgICAgdmFyIGV2ZW50LCBfaiwgX2xlbjEsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIF9yZWYyID0gWydlcnJvcicsICdvcGVuJ107XG4gICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgZXZlbnQgPSBfcmVmMltfal07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFNvY2tldFJlcXVlc3RUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgRWxlbWVudE1vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRWxlbWVudE1vbml0b3Iob3B0aW9ucykge1xuICAgICAgdmFyIHNlbGVjdG9yLCBfaiwgX2xlbjEsIF9yZWYyO1xuICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICB9XG4gICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgICBpZiAob3B0aW9ucy5zZWxlY3RvcnMgPT0gbnVsbCkge1xuICAgICAgICBvcHRpb25zLnNlbGVjdG9ycyA9IFtdO1xuICAgICAgfVxuICAgICAgX3JlZjIgPSBvcHRpb25zLnNlbGVjdG9ycztcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBzZWxlY3RvciA9IF9yZWYyW19qXTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKG5ldyBFbGVtZW50VHJhY2tlcihzZWxlY3RvcikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBFbGVtZW50TW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIEVsZW1lbnRUcmFja2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEVsZW1lbnRUcmFja2VyKHNlbGVjdG9yKSB7XG4gICAgICB0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIHRoaXMuY2hlY2soKTtcbiAgICB9XG5cbiAgICBFbGVtZW50VHJhY2tlci5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb25lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLmNoZWNrKCk7XG4gICAgICAgIH0pLCBvcHRpb25zLmVsZW1lbnRzLmNoZWNrSW50ZXJ2YWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFbGVtZW50VHJhY2tlci5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgfTtcblxuICAgIHJldHVybiBFbGVtZW50VHJhY2tlcjtcblxuICB9KSgpO1xuXG4gIERvY3VtZW50TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBEb2N1bWVudE1vbml0b3IucHJvdG90eXBlLnN0YXRlcyA9IHtcbiAgICAgIGxvYWRpbmc6IDAsXG4gICAgICBpbnRlcmFjdGl2ZTogNTAsXG4gICAgICBjb21wbGV0ZTogMTAwXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIERvY3VtZW50TW9uaXRvcigpIHtcbiAgICAgIHZhciBfb25yZWFkeXN0YXRlY2hhbmdlLCBfcmVmMixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IChfcmVmMiA9IHRoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdKSAhPSBudWxsID8gX3JlZjIgOiAxMDA7XG4gICAgICBfb25yZWFkeXN0YXRlY2hhbmdlID0gZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlO1xuICAgICAgZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChfdGhpcy5zdGF0ZXNbZG9jdW1lbnQucmVhZHlTdGF0ZV0gIT0gbnVsbCkge1xuICAgICAgICAgIF90aGlzLnByb2dyZXNzID0gX3RoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgX29ucmVhZHlzdGF0ZWNoYW5nZSA9PT0gXCJmdW5jdGlvblwiID8gX29ucmVhZHlzdGF0ZWNoYW5nZS5hcHBseShudWxsLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gRG9jdW1lbnRNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgRXZlbnRMYWdNb25pdG9yID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50TGFnTW9uaXRvcigpIHtcbiAgICAgIHZhciBhdmcsIGludGVydmFsLCBsYXN0LCBwb2ludHMsIHNhbXBsZXMsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgYXZnID0gMDtcbiAgICAgIHNhbXBsZXMgPSBbXTtcbiAgICAgIHBvaW50cyA9IDA7XG4gICAgICBsYXN0ID0gbm93KCk7XG4gICAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGlmZjtcbiAgICAgICAgZGlmZiA9IG5vdygpIC0gbGFzdCAtIDUwO1xuICAgICAgICBsYXN0ID0gbm93KCk7XG4gICAgICAgIHNhbXBsZXMucHVzaChkaWZmKTtcbiAgICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID4gb3B0aW9ucy5ldmVudExhZy5zYW1wbGVDb3VudCkge1xuICAgICAgICAgIHNhbXBsZXMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICBhdmcgPSBhdmdBbXBsaXR1ZGUoc2FtcGxlcyk7XG4gICAgICAgIGlmICgrK3BvaW50cyA+PSBvcHRpb25zLmV2ZW50TGFnLm1pblNhbXBsZXMgJiYgYXZnIDwgb3B0aW9ucy5ldmVudExhZy5sYWdUaHJlc2hvbGQpIHtcbiAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwICogKDMgLyAoYXZnICsgMykpO1xuICAgICAgICB9XG4gICAgICB9LCA1MCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIEV2ZW50TGFnTW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIFNjYWxlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTY2FsZXIoc291cmNlKSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRoaXMubGFzdCA9IHRoaXMuc2luY2VMYXN0VXBkYXRlID0gMDtcbiAgICAgIHRoaXMucmF0ZSA9IG9wdGlvbnMuaW5pdGlhbFJhdGU7XG4gICAgICB0aGlzLmNhdGNodXAgPSAwO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMubGFzdFByb2dyZXNzID0gMDtcbiAgICAgIGlmICh0aGlzLnNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSByZXN1bHQodGhpcy5zb3VyY2UsICdwcm9ncmVzcycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIFNjYWxlci5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKGZyYW1lVGltZSwgdmFsKSB7XG4gICAgICB2YXIgc2NhbGluZztcbiAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgICB2YWwgPSByZXN1bHQodGhpcy5zb3VyY2UsICdwcm9ncmVzcycpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA+PSAxMDApIHtcbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPT09IHRoaXMubGFzdCkge1xuICAgICAgICB0aGlzLnNpbmNlTGFzdFVwZGF0ZSArPSBmcmFtZVRpbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5zaW5jZUxhc3RVcGRhdGUpIHtcbiAgICAgICAgICB0aGlzLnJhdGUgPSAodmFsIC0gdGhpcy5sYXN0KSAvIHRoaXMuc2luY2VMYXN0VXBkYXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2F0Y2h1cCA9ICh2YWwgLSB0aGlzLnByb2dyZXNzKSAvIG9wdGlvbnMuY2F0Y2h1cFRpbWU7XG4gICAgICAgIHRoaXMuc2luY2VMYXN0VXBkYXRlID0gMDtcbiAgICAgICAgdGhpcy5sYXN0ID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA+IHRoaXMucHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyArPSB0aGlzLmNhdGNodXAgKiBmcmFtZVRpbWU7XG4gICAgICB9XG4gICAgICBzY2FsaW5nID0gMSAtIE1hdGgucG93KHRoaXMucHJvZ3Jlc3MgLyAxMDAsIG9wdGlvbnMuZWFzZUZhY3Rvcik7XG4gICAgICB0aGlzLnByb2dyZXNzICs9IHNjYWxpbmcgKiB0aGlzLnJhdGUgKiBmcmFtZVRpbWU7XG4gICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4odGhpcy5sYXN0UHJvZ3Jlc3MgKyBvcHRpb25zLm1heFByb2dyZXNzUGVyRnJhbWUsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWF4KDAsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKDEwMCwgdGhpcy5wcm9ncmVzcyk7XG4gICAgICB0aGlzLmxhc3RQcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3M7XG4gICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjYWxlcjtcblxuICB9KSgpO1xuXG4gIHNvdXJjZXMgPSBudWxsO1xuXG4gIHNjYWxlcnMgPSBudWxsO1xuXG4gIGJhciA9IG51bGw7XG5cbiAgdW5pU2NhbGVyID0gbnVsbDtcblxuICBhbmltYXRpb24gPSBudWxsO1xuXG4gIGNhbmNlbEFuaW1hdGlvbiA9IG51bGw7XG5cbiAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG5cbiAgaGFuZGxlUHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKG9wdGlvbnMucmVzdGFydE9uUHVzaFN0YXRlKSB7XG4gICAgICByZXR1cm4gUGFjZS5yZXN0YXJ0KCk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgIT0gbnVsbCkge1xuICAgIF9wdXNoU3RhdGUgPSB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGU7XG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVQdXNoU3RhdGUoKTtcbiAgICAgIHJldHVybiBfcHVzaFN0YXRlLmFwcGx5KHdpbmRvdy5oaXN0b3J5LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAod2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlICE9IG51bGwpIHtcbiAgICBfcmVwbGFjZVN0YXRlID0gd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlO1xuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaGFuZGxlUHVzaFN0YXRlKCk7XG4gICAgICByZXR1cm4gX3JlcGxhY2VTdGF0ZS5hcHBseSh3aW5kb3cuaGlzdG9yeSwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgU09VUkNFX0tFWVMgPSB7XG4gICAgYWpheDogQWpheE1vbml0b3IsXG4gICAgZWxlbWVudHM6IEVsZW1lbnRNb25pdG9yLFxuICAgIGRvY3VtZW50OiBEb2N1bWVudE1vbml0b3IsXG4gICAgZXZlbnRMYWc6IEV2ZW50TGFnTW9uaXRvclxuICB9O1xuXG4gIChpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHR5cGUsIF9qLCBfaywgX2xlbjEsIF9sZW4yLCBfcmVmMiwgX3JlZjMsIF9yZWY0O1xuICAgIFBhY2Uuc291cmNlcyA9IHNvdXJjZXMgPSBbXTtcbiAgICBfcmVmMiA9IFsnYWpheCcsICdlbGVtZW50cycsICdkb2N1bWVudCcsICdldmVudExhZyddO1xuICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgdHlwZSA9IF9yZWYyW19qXTtcbiAgICAgIGlmIChvcHRpb25zW3R5cGVdICE9PSBmYWxzZSkge1xuICAgICAgICBzb3VyY2VzLnB1c2gobmV3IFNPVVJDRV9LRVlTW3R5cGVdKG9wdGlvbnNbdHlwZV0pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3JlZjQgPSAoX3JlZjMgPSBvcHRpb25zLmV4dHJhU291cmNlcykgIT0gbnVsbCA/IF9yZWYzIDogW107XG4gICAgZm9yIChfayA9IDAsIF9sZW4yID0gX3JlZjQubGVuZ3RoOyBfayA8IF9sZW4yOyBfaysrKSB7XG4gICAgICBzb3VyY2UgPSBfcmVmNFtfa107XG4gICAgICBzb3VyY2VzLnB1c2gobmV3IHNvdXJjZShvcHRpb25zKSk7XG4gICAgfVxuICAgIFBhY2UuYmFyID0gYmFyID0gbmV3IEJhcjtcbiAgICBzY2FsZXJzID0gW107XG4gICAgcmV0dXJuIHVuaVNjYWxlciA9IG5ldyBTY2FsZXI7XG4gIH0pKCk7XG5cbiAgUGFjZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgUGFjZS50cmlnZ2VyKCdzdG9wJyk7XG4gICAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgYmFyLmRlc3Ryb3koKTtcbiAgICBjYW5jZWxBbmltYXRpb24gPSB0cnVlO1xuICAgIGlmIChhbmltYXRpb24gIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBjYW5jZWxBbmltYXRpb25GcmFtZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbik7XG4gICAgICB9XG4gICAgICBhbmltYXRpb24gPSBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaW5pdCgpO1xuICB9O1xuXG4gIFBhY2UucmVzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIFBhY2UudHJpZ2dlcigncmVzdGFydCcpO1xuICAgIFBhY2Uuc3RvcCgpO1xuICAgIHJldHVybiBQYWNlLnN0YXJ0KCk7XG4gIH07XG5cbiAgUGFjZS5nbyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGFydDtcbiAgICBQYWNlLnJ1bm5pbmcgPSB0cnVlO1xuICAgIGJhci5yZW5kZXIoKTtcbiAgICBzdGFydCA9IG5vdygpO1xuICAgIGNhbmNlbEFuaW1hdGlvbiA9IGZhbHNlO1xuICAgIHJldHVybiBhbmltYXRpb24gPSBydW5BbmltYXRpb24oZnVuY3Rpb24oZnJhbWVUaW1lLCBlbnF1ZXVlTmV4dEZyYW1lKSB7XG4gICAgICB2YXIgYXZnLCBjb3VudCwgZG9uZSwgZWxlbWVudCwgZWxlbWVudHMsIGksIGosIHJlbWFpbmluZywgc2NhbGVyLCBzY2FsZXJMaXN0LCBzdW0sIF9qLCBfaywgX2xlbjEsIF9sZW4yLCBfcmVmMjtcbiAgICAgIHJlbWFpbmluZyA9IDEwMCAtIGJhci5wcm9ncmVzcztcbiAgICAgIGNvdW50ID0gc3VtID0gMDtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgZm9yIChpID0gX2ogPSAwLCBfbGVuMSA9IHNvdXJjZXMubGVuZ3RoOyBfaiA8IF9sZW4xOyBpID0gKytfaikge1xuICAgICAgICBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgICAgICBzY2FsZXJMaXN0ID0gc2NhbGVyc1tpXSAhPSBudWxsID8gc2NhbGVyc1tpXSA6IHNjYWxlcnNbaV0gPSBbXTtcbiAgICAgICAgZWxlbWVudHMgPSAoX3JlZjIgPSBzb3VyY2UuZWxlbWVudHMpICE9IG51bGwgPyBfcmVmMiA6IFtzb3VyY2VdO1xuICAgICAgICBmb3IgKGogPSBfayA9IDAsIF9sZW4yID0gZWxlbWVudHMubGVuZ3RoOyBfayA8IF9sZW4yOyBqID0gKytfaykge1xuICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tqXTtcbiAgICAgICAgICBzY2FsZXIgPSBzY2FsZXJMaXN0W2pdICE9IG51bGwgPyBzY2FsZXJMaXN0W2pdIDogc2NhbGVyTGlzdFtqXSA9IG5ldyBTY2FsZXIoZWxlbWVudCk7XG4gICAgICAgICAgZG9uZSAmPSBzY2FsZXIuZG9uZTtcbiAgICAgICAgICBpZiAoc2NhbGVyLmRvbmUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgIHN1bSArPSBzY2FsZXIudGljayhmcmFtZVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhdmcgPSBzdW0gLyBjb3VudDtcbiAgICAgIGJhci51cGRhdGUodW5pU2NhbGVyLnRpY2soZnJhbWVUaW1lLCBhdmcpKTtcbiAgICAgIGlmIChiYXIuZG9uZSgpIHx8IGRvbmUgfHwgY2FuY2VsQW5pbWF0aW9uKSB7XG4gICAgICAgIGJhci51cGRhdGUoMTAwKTtcbiAgICAgICAgUGFjZS50cmlnZ2VyKCdkb25lJyk7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGJhci5maW5pc2goKTtcbiAgICAgICAgICBQYWNlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gUGFjZS50cmlnZ2VyKCdoaWRlJyk7XG4gICAgICAgIH0sIE1hdGgubWF4KG9wdGlvbnMuZ2hvc3RUaW1lLCBNYXRoLm1heChvcHRpb25zLm1pblRpbWUgLSAobm93KCkgLSBzdGFydCksIDApKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW5xdWV1ZU5leHRGcmFtZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFBhY2Uuc3RhcnQgPSBmdW5jdGlvbihfb3B0aW9ucykge1xuICAgIGV4dGVuZChvcHRpb25zLCBfb3B0aW9ucyk7XG4gICAgUGFjZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgYmFyLnJlbmRlcigpO1xuICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgTm9UYXJnZXRFcnJvciA9IF9lcnJvcjtcbiAgICB9XG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFjZScpKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChQYWNlLnN0YXJ0LCA1MCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBhY2UudHJpZ2dlcignc3RhcnQnKTtcbiAgICAgIHJldHVybiBQYWNlLmdvKCk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoWydwYWNlJ10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFBhY2U7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQYWNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChvcHRpb25zLnN0YXJ0T25QYWdlTG9hZCkge1xuICAgICAgUGFjZS5zdGFydCgpO1xuICAgIH1cbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcGFjZS9wYWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiY29uc3QgS2VmaXIgPSByZXF1aXJlKCdrZWZpcicpXG5cbmNvbnN0IG9ic2NlbmUgPSByZXF1aXJlKCcuLi9vYi1zY2VuZS5qcycpXG5jb25zdCByZWFkeVRvUGFyc2UkID0gb2JzY2VuZS5yZWFkeVRvUGFyc2UkXG5cbm1vZHVsZS5leHBvcnRzLmluaXQgPSAoKSA9PiB7XG4gIHJlYWR5VG9QYXJzZSQub25WYWx1ZSgoKSA9PiB7XG4gICAgICBpbml0Q29udHJvbHMoKVxuICB9KVxufVxuXG5mdW5jdGlvbiBpbml0Q29udHJvbHMoKSB7XG5cbiAgdmFyIFBMQVlfU1BFRUQgPSAxMDtcblxuICB2YXIgaXNQbGF5aW5nID0gZmFsc2U7XG4gIHZhciBpc1BsYXlpbmdJbnRlcnZhbDtcbiAgdmFyIGJvZHlIZWlnaHQgPSAkKCdib2R5JykuaGVpZ2h0KCk7XG4gIHZhciBuYT0wO1xuXG4gIGNvbnN0IGtleVVwUHJlc3NlZCA9IEtlZmlyLmZyb21FdmVudHMoZG9jdW1lbnQsICdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZTtcbiAgfSk7XG5cbiAgY29uc3QgYmFja0tleSA9IGtleVVwUHJlc3NlZFxuICAgIC5maWx0ZXIoZSA9PiBlLmtleUNvZGUgPT09IDM4KVxuICBjb25zdCBuZXh0S2V5ID0ga2V5VXBQcmVzc2VkXG4gICAgLmZpbHRlcihlID0+IGUua2V5Q29kZSA9PT0gNDApXG5cbiAgY29uc3QgdG9nZ2xlVXBDbGlja2VkID0gS2VmaXIuZnJvbUV2ZW50cygkKFwiI3RvZ2dsZVVwXCIpLCAnY2xpY2snKVxuICBjb25zdCB0b2dnbGVEb3duQ2xpY2tlZCA9IEtlZmlyLmZyb21FdmVudHMoJChcIiN0b2dnbGVEb3duXCIpLCAnY2xpY2snKVxuXG4gIEtlZmlyLm1lcmdlKFtuZXh0S2V5LCB0b2dnbGVEb3duQ2xpY2tlZF0pXG4gICAgLm9uVmFsdWUoZSA9PiB7XG4gICAgICBvYnNjZW5lLmFjdGlvbignbmV4dCcpXG4gICAgfSlcblxuICBLZWZpci5tZXJnZShbYmFja0tleSwgdG9nZ2xlVXBDbGlja2VkXSlcbiAgICAub25WYWx1ZShlID0+IHtcbiAgICAgIG9ic2NlbmUuYWN0aW9uKCdwcmV2aW91cycpXG4gICAgfSlcblxuICAkKFwiI3RvZ2dsZVBsYXlcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0tcIik7XG4gICAgaWYoaXNQbGF5aW5nKSB7IHBhdXNlKCkgfSBlbHNlIHsgcGxheSgpIH1cbiAgfSlcblxuICBrZXlVcFByZXNzZWRcbiAgICAuZmlsdGVyKGUgPT4gZS5rZXlDb2RlID09PSA4MCB8fCBlLmtleUNvZGUgPT09IDMyKVxuICAgIC5vblZhbHVlKGUgPT4ge1xuICAgICAgaWYgKGlzUGxheWluZykgeyBwYXVzZSgpIH0gZWxzZSB7IHBsYXkoKSB9XG4gICAgfSlcblxuICBmdW5jdGlvbiBwbGF5KCkge1xuICAgIGNvbnNvbGUubG9nKFwiUExBWVwiKVxuICAgIGlzUGxheWluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBvYnNjZW5lLmFjdGlvbignbmV4dCcpO1xuICAgIH0sIDUwMDApO1xuICAgICQoXCIjdG9nZ2xlUGxheVwiKS5yZW1vdmVDbGFzcygnZmEtcGxheScpLmFkZENsYXNzKCdmYS1wYXVzZScpO1xuICAgIGlzUGxheWluZyA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlBBVVNFXCIpO1xuICAgIGNsZWFySW50ZXJ2YWwoaXNQbGF5aW5nSW50ZXJ2YWwpO1xuICAgIGlzUGxheWluZyA9IGZhbHNlO1xuICAgICQoXCIjdG9nZ2xlUGxheVwiKS5yZW1vdmVDbGFzcygnZmEtcGF1c2UnKS5hZGRDbGFzcygnZmEtcGxheScpO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91c2VyL2NvbnRyb2xzLmpzXG4gKiovIiwiLypcbiAqICBEZXBlbmRlbmNpZXNcbiovXG5cbiAgaW1wb3J0IHtcbiAgICAgICAgICBzY3JvbGxUb3BDaGFuZ2VkJCxcbiAgICAgICAgICBmb2N1c0NoYW5nZWQkLFxuICAgICAgICAgIGRpbWVuc2lvbnNDYWxjdWxhdGVkJCxcbiAgICAgICAgICBjYWxjdWxhdGVkQ3VycmVudFN0YXRlJCxcbiAgICAgICAgICB3cmFwcGVyQ2hhbmdlZCQsXG4gICAgICAgICAgcmVhZHlUb1BhcnNlJCxcbiAgICAgICAgICB0b3VjaERldmljZURldGVjdGVkJCxcbiAgICAgICAgICB9IGZyb20gJy4uL29iLXNjZW5lLmpzJ1xuXG4gIGltcG9ydCAqIGFzIHBhZ2VVdGlscyBmcm9tICcuLi91dGlscy9wYWdlLXV0aWxzLmpzJ1xuICBpbXBvcnQgeyAkd2luZG93LCAkYm9keSB9IGZyb20gJy4uL2NvbnN0YW50cy5qcydcblxuICBpbXBvcnQgS2VmaXIgZnJvbSAna2VmaXInXG5cbiAgaW1wb3J0IG1haW5Mb29wIGZyb20gJ21haW4tbG9vcCdcbiAgaW1wb3J0IGggZnJvbSAndmlydHVhbC1kb20vaCdcblxuICAvLyBpbXBvcnQgYXVkaW9wbGF5ZXIgZnJvbSAnLi9yZW5kZXIvYXVkaW9wbGF5ZXIuanMnXG4gIC8vIGF1ZGlvcGxheWVyLmNvbmZpZyhzY2VuZUF1ZGlvQ29uZmlnKVxuXG4vKlxuICogIENoaWxkIFJlbmRlcnNcbiovXG5cbiAgY29uc3QgcmVuZGVyV3JhcHBlciA9IHJlcXVpcmUoJy4vd3JhcHBlci5qcycpXG4gIGNvbnN0IHJlbmRlclNjcm9sbGJhciA9IHJlcXVpcmUoJy4vc2Nyb2xsYmFyLmpzJylcbiAgY29uc3QgcmVuZGVyQXVkaW9QbGF5ZXIgPSByZXF1aXJlKCcuL2F1ZGlvcGxheWVyLmpzJylcbiAgY29uc3QgcmVuZGVyVmlkZW9QbGF5ZXIgPSByZXF1aXJlKCcuL3ZpZGVvcGxheWVyLmpzJylcbiAgY29uc3QgcmVuZGVyRXJyb3IgPSByZXF1aXJlKCcuL2Vycm9yLmpzJylcblxuLypcbiAqICBSZW5kZXJcbiovXG5cbiAgLy8gSGFjayB0byBmb3JjZSByZXNpemUgb25jZS4gRm9yIHNvbWVcbiAgLy8gcmVhc29uIHRoaXMgcHJldmVudHMgdGhlIGFuaW1hdGlvbnMgZnJvbSBibGlua2luZyBvbiBDaHJvbWVcbiAgc2Nyb2xsVG9wQ2hhbmdlZCQudGFrZSgxKS5kZWxheSg1MDApLm9uVmFsdWUoKCkgPT4ge1xuICAgICR3aW5kb3cudHJpZ2dlcigncmVzaXplJylcbiAgfSlcblxuICAvLyBSZW5kZXIgRGltZW5zaW9uc1xuICBkaW1lbnNpb25zQ2FsY3VsYXRlZCQub25WYWx1ZShzdGF0ZSA9PiB7XG4gICAgJGJvZHkuaGVpZ2h0KHN0YXRlLmJvZHlIZWlnaHQpXG4gICAgcmVuZGVyU2Nyb2xsQmFyRm9jdXNCYXJzKHN0YXRlKVxuICB9KVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyU2Nyb2xsQmFyRm9jdXNCYXJzKHN0YXRlKSB7XG4gICAgICBzdGF0ZS5mcmFtZUZvY3VzXG4gICAgICAgIC5tYXAoKGZvY3VzKSA9PiAoZm9jdXMgLyBzdGF0ZS5ib2R5SGVpZ2h0KS50b0ZpeGVkKDIpICogMTAwKSAvLyBDb252ZXJ0IHRvIHBlcmNlbnRcbiAgICAgICAgLm1hcCgoZm9jdXNQZXJjZW50KSA9PiBmb2N1c1BlcmNlbnQgKyBcInZoXCIpIC8vIENvbnZlcnQgdG8gdmhcbiAgICAgICAgLm1hcCgoZm9jdXNWaCkgPT4ge1xuICAgICAgICAgICQoXCIjZXhwZXJpZW5jZS1wcm9ncmVzc1wiKVxuICAgICAgICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNlbnRlci1tYXJrZXJcIiBzdHlsZT1cInRvcDonICsgZm9jdXNWaCArICdcIj48L2Rpdj4nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAvLyBSZW5kZXIgV3JhcHBlclxuICB3cmFwcGVyQ2hhbmdlZCQub25WYWx1ZSgoY3VycmVudFdyYXBwZXIpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIldSQVBQRVIgQ0hBTkdFRFwiKTtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICQoY3VycmVudFdyYXBwZXJbMF0pLmhpZGUoKVxuICAgICAgJChjdXJyZW50V3JhcHBlclsxXSkuc2hvdygpXG5cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gY3VycmVudFdyYXBwZXJbMV1cbiAgICAgIC8vIGdhKCdzZW5kJywgJ3NjZW5lX2FjY2Vzc2VkJywgY3VycmVudFdyYXBwZXJbMV0pIC8vIEdvb2dsZSBBbmFseXRpY3NcbiAgICAgIHJlbmRlclZpZGVvKGN1cnJlbnRXcmFwcGVyKVxuICAgICAgcmVuZGVyQXVkaW8oY3VycmVudFdyYXBwZXIpXG4gICAgfSlcbiAgfSlcblxuICAgIGZ1bmN0aW9uIHNob3dDdXJyZW50V3JhcHBlcnMocHJldiwgbmV4dCkge1xuICAgICAgaWYgKHByZXYuY3VycmVudFdyYXBwZXIgPT09IG5leHQuY3VycmVudFdyYXBwZXIpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdwcmV2aW91cycsIHByZXYsIG5leHQpXG4gICAgICAkKHByZXYuY3VycmVudFdyYXBwZXIpLmhpZGUoKVxuICAgICAgJChuZXh0LmN1cnJlbnRXcmFwcGVyKS5zaG93KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJWaWRlbyhzdGF0ZSkge1xuXG4gICAgICAgICQoJ3ZpZGVvJywgc3RhdGVbMF0pLmFuaW1hdGUoe1xuICAgICAgICAgIHZvbHVtZTogMFxuICAgICAgICB9LCAzMDAsICdzd2luZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIHJlYWxseSBzdG9wIHRoZSB2aWRlb1xuICAgICAgICAgICQodGhpcykuZ2V0KDApLnBhdXNlKClcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgJG5ld1ZpZGVvID0gJCgndmlkZW8nLCBzdGF0ZVsxXSlcblxuICAgICAgICBpZiAoJG5ld1ZpZGVvWzBdKSB7XG4gICAgICAgICAgJG5ld1ZpZGVvWzBdLnBsYXkoKVxuICAgICAgICAgICRuZXdWaWRlby5hbmltYXRlKHtcbiAgICAgICAgICAgIHZvbHVtZTogJG5ld1ZpZGVvLmF0dHIoJ21heC12b2x1bWUnKSB8fCAxXG4gICAgICAgICAgfSwgMzAwLCAnc3dpbmcnKVxuICAgICAgICAgIHJlbmRlclZpZGVvUGxheWVyLnN0YXJ0KCRuZXdWaWRlbylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZW5kZXJWaWRlb1BsYXllci5zdG9wKCRuZXdWaWRlbylcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlckF1ZGlvKHN0YXRlKSB7XG4gICAgICByZW5kZXJBdWRpb1BsYXllci5uZXh0KHN0YXRlWzFdLnN1YnN0cigxKSk7XG4gICAgfVxuXG4gIC8vIFJlbmRlciBLZXlmcmFtZXNcblxuICBzY3JvbGxUb3BDaGFuZ2VkJC5vblZhbHVlKChzdGF0ZWRpZmYpID0+IHtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBsZXQgcHJldiA9IHN0YXRlZGlmZlswXVxuICAgICAgICBsZXQgbmV4dCA9IHN0YXRlZGlmZlsxXVxuXG4gICAgICAgIGFuaW1hdGVFbGVtZW50cyhuZXh0KVxuICAgICAgICBhbmltYXRlU2Nyb2xsQmFyKG5leHQpXG4gICAgICAgIC8vIHJlbmRlck11c2ljKG5leHQpXG4gICAgfSlcblxuICB9KVxuXG4gIGZvY3VzQ2hhbmdlZCQub25WYWx1ZShyZW5kZXJTY3JvbGwpXG5cbiAgICBmdW5jdGlvbiByZW5kZXJTY3JvbGwoc2Nyb2xsKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnUkVOREVSJywgc2Nyb2xsLCBNYXRoLmZsb29yKCR3aW5kb3cuc2Nyb2xsVG9wKCkpKVxuICAgICAgJGJvZHkuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsLFxuICAgICAgfSwgMTUwMCwgJ2xpbmVhcicpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyTXVzaWMod3JhcHBlcklkKSB7XG4gICAgICBhdWRpb3BsYXllci5uZXh0KHdyYXBwZXJJZC5zdWJzdHIoMSkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZVNjcm9sbEJhcihzdGF0ZSkge1xuICAgICAgdmFyIHBlcmNlbnQgPSAoc3RhdGUuc2Nyb2xsVG9wIC8gc3RhdGUuYm9keUhlaWdodCkudG9GaXhlZCgyKSAqIDEwMFxuICAgICAgJCgnI2V4cGVyaWVuY2UtcHJvZ3Jlc3MgLnByb2dyZXNzJykuY3NzKHtcbiAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGVZKCcgKyBwZXJjZW50ICsgJyUpJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlRWxlbWVudHMoc3RhdGUpIHtcbiAgICAgIHZhciBhbmltYXRpb24sIHRyYW5zbGF0ZVksIHRyYW5zbGF0ZVgsIHNjYWxlLCByb3RhdGUsIG9wYWNpdHlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGUua2V5ZnJhbWVzW3N0YXRlLmN1cnJlbnRLZXlmcmFtZV0uYW5pbWF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBhbmltYXRpb24gPSBzdGF0ZS5rZXlmcmFtZXNbc3RhdGUuY3VycmVudEtleWZyYW1lXS5hbmltYXRpb25zW2ldXG4gICAgICAgIHRyYW5zbGF0ZVkgPSBjYWxjUHJvcFZhbHVlKGFuaW1hdGlvbiwgJ3RyYW5zbGF0ZVknLCBzdGF0ZSlcbiAgICAgICAgdHJhbnNsYXRlWCA9IGNhbGNQcm9wVmFsdWUoYW5pbWF0aW9uLCAndHJhbnNsYXRlWCcsIHN0YXRlKVxuICAgICAgICBzY2FsZSA9IGNhbGNQcm9wVmFsdWUoYW5pbWF0aW9uLCAnc2NhbGUnLCBzdGF0ZSlcbiAgICAgICAgcm90YXRlID0gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sICdyb3RhdGUnLCBzdGF0ZSlcbiAgICAgICAgb3BhY2l0eSA9IGNhbGNQcm9wVmFsdWUoYW5pbWF0aW9uLCAnb3BhY2l0eScsIHN0YXRlKVxuICAgICAgICAkKGFuaW1hdGlvbi5zZWxlY3Rvciwgc3RhdGUuY3VycmVudFdyYXBwZXIpLmNzcyh7XG4gICAgICAgICAgJ3RyYW5zZm9ybSc6ICd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlWCArICdweCwgJyArIHRyYW5zbGF0ZVkgKyAncHgsIDApIHNjYWxlKCcgKyBzY2FsZSArICcpIHJvdGF0ZSgnICsgcm90YXRlICsgJ2RlZyknLFxuICAgICAgICAgICdvcGFjaXR5Jzogb3BhY2l0eS50b0ZpeGVkKDIpXG4gICAgICAgIH0pXG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNhbGNQcm9wVmFsdWUoYW5pbWF0aW9uLCBwcm9wZXJ0eSwgc3RhdGUpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gYW5pbWF0aW9uW3Byb3BlcnR5XVxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGVhc2VJbk91dFF1YWQoc3RhdGUucmVsYXRpdmVTY3JvbGxUb3AsIHZhbHVlWzBdLCAodmFsdWVbMV0gLSB2YWx1ZVswXSksIHN0YXRlLmtleWZyYW1lc1tzdGF0ZS5jdXJyZW50S2V5ZnJhbWVdLmR1cmF0aW9uKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gcGFnZVV0aWxzLmdldERlZmF1bHRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxuICAgICAgICB9XG4gICAgICAgIC8vIHZhbHVlID0gK3ZhbHVlLnRvRml4ZWQoMilcbiAgICAgICAgLy8gVEVNUE9SQVJJTFkgUkVNT1ZFRCBDQVVTRSBTQ0FMRSBET0VTTidUIFdPUksgV0lUSEEgQUdSRVNTSVZFIFJPVU5ESU5HIExJS0UgVEhJU1xuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BlcnR5VmFsdWUocHJvcGVydHkpIHtcbiAgICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgIGNhc2UgJ3RyYW5zbGF0ZVgnOlxuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICBjYXNlICd0cmFuc2xhdGVZJzpcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgICAgY2FzZSAnc2NhbGUnOlxuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICBjYXNlICdyb3RhdGUnOlxuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIC8vc2ludXNvYWRpYWwgaW4gYW5kIG91dFxuICAgICAgICByZXR1cm4gLWMgLyAyICogKE1hdGguY29zKE1hdGguUEkgKiB0IC8gZCkgLSAxKSArIGJcbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAqICBIZWxwZXJzXG4gICAgICAqL1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIHRocm93RXJyb3IoKSB7XG4gICAgICAgIC8vICAgJGJvZHkuYWRkQ2xhc3MoJ3BhZ2UtZXJyb3InKVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVuZGVyYWJsZShzdGF0ZSkge1xuICAgICAgICAgIHJldHVybiBoKCdkaXYnLCB7IHN0eWxlOiB7IHBvc2l0aW9uOiAnZml4ZWQnIH0gfSwgW1xuICAgICAgICAgICAgaCgnZGl2JywgW1xuICAgICAgICAgICAgICBoKCdzcGFuJywgJ0hlbGxvIFdvcmxkJyksXG4gICAgICAgICAgICAgIGgoJ3NwYW4nLCBzdGF0ZS5jdXJyZW50V3JhcHBlciksXG4gICAgICAgICAgICAgIGgoJ3NwYW4nLCBzdGF0ZS5zY3JvbGxUb3AudG9TdHJpbmcoKSA/IHN0YXRlLnNjcm9sbFRvcC50b1N0cmluZygpIDogbnVsbCksXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICBdKVxuICAgICAgICB9XG5cblxuICBhcHAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLCBjYWxjdWxhdGVkQ3VycmVudFN0YXRlJCwgcmVuZGVyYWJsZSlcblxuICBmdW5jdGlvbiBhcHAoZWxlbSwgb2JzZXJ2YWJsZSwgcmVuZGVyKSB7XG4gICAgbGV0IGxvb3BcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2cobmV4dFZhbClcbiAgICAgIGlmIChsb29wKSB7XG4gICAgICAgIGxvb3AudXBkYXRlKHZhbHVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9vcCA9IG1haW5Mb29wKHZhbHVlLCByZW5kZXIsIHtcbiAgICAgICAgICBkaWZmOiByZXF1aXJlKCd2aXJ0dWFsLWRvbS9kaWZmJyksXG4gICAgICAgICAgY3JlYXRlOiByZXF1aXJlKCd2aXJ0dWFsLWRvbS9jcmVhdGUtZWxlbWVudCcpLFxuICAgICAgICAgIHBhdGNoOiByZXF1aXJlKCd2aXJ0dWFsLWRvbS9wYXRjaCcpLFxuICAgICAgICB9KVxuICAgICAgICBlbGVtLmFwcGVuZENoaWxkKGxvb3AudGFyZ2V0KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cy5hcHAgPSBhcHBcblxuXG4gIGltcG9ydCBNQUlOX1VJX1RFTVBMQVRFIGZyb20gJy4vdGVtcGxhdGUuanMnXG5cbiAgLy8gQWRkIHRoZSBjb3JlIHRlbXBsYXRlLCBpbmx1ZGluZyB1aSBlbGVtZW50cyxcbiAgLy8gZnJvbSBgLi90ZW1wbGF0ZS5qc2AgdG8gdGhlIGJvZHlcbiAgLy8gQHJldHVybnMgc3RyZWFtIHdoZW4gdGVtcGxhdGUgaXMgYWRkZWRcbiAgZnVuY3Rpb24gYWRkQ29yZVVJKCkge1xuICAgIGNvbnN0IERPTV9JRF9UT19MT09LX0ZPUiA9ICdleHBlcmllbmNlLXByb2dyZXNzJ1xuICAgIGNvbnN0IE9CU0NFTkVfV1JBUFBFUl9JRCA9ICdvYi1zY2VuZS13cmFwcGVyJ1xuXG4gICAgLy8gQWRkIFVJIGh0bWxcbiAgICBjb25zdCAkbWFpblVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAkbWFpblVJLnNldEF0dHJpYnV0ZSgnaWQnLCBPQlNDRU5FX1dSQVBQRVJfSUQpXG4gICAgJG1haW5VSS5pbm5lckhUTUwgPSBNQUlOX1VJX1RFTVBMQVRFXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKCRtYWluVUkpXG5cbiAgICByZXR1cm4gS2VmaXIuc3RyZWFtKChlbWl0dGVyKSA9PiB7XG4gICAgICAvLyBzb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM1MjExMjg2XG5cbiAgICAgIC8vIHNldCB1cCB0aGUgbXV0YXRpb24gb2JzZXJ2ZXJcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucywgc2VsZikgPT4ge1xuICAgICAgICAvLyBgbXV0YXRpb25zYCBpcyBhbiBhcnJheSBvZiBtdXRhdGlvbnMgdGhhdCBvY2N1cnJlZFxuICAgICAgICAvLyBgc2VsZmAgaXMgdGhlIE11dGF0aW9uT2JzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgICAgY29uc3Qgb2JzY2VuZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChET01fSURfVE9fTE9PS19GT1IpXG4gICAgICAgIGlmIChvYnNjZW5lV3JhcHBlcikge1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdChvYnNjZW5lV3JhcHBlcilcbiAgICAgICAgICBlbWl0dGVyLmVuZCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICBzZWxmLmRpc2Nvbm5lY3QoKSAvLyBzdG9wIG9ic2VydmluZ1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBzdGFydCBvYnNlcnZpbmdcbiAgICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMuaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCBjb3JlVUlBZGRlZCQgPSBhZGRDb3JlVUkoKVxuICAgIHJldHVybiBjb3JlVUlBZGRlZCRcbiAgfVxuXG4gIHJlYWR5VG9QYXJzZSQub25WYWx1ZSgoY29uZmlnKSA9PiB7XG4gICAgJCgnLmNvbnRhaW5lci1pbm5lcicpLmh0bWwoY29uZmlnLnNjZW5lSHRtbFN0cmluZylcbiAgICAkKCcubG9hZGluZycpLmRlbGF5KDMwMCkuZmFkZU91dCgpXG4gICAgLy8gYXVkaW9wbGF5ZXIubmV4dCgnaW50cm8nKTtcbiAgICAvLyBhdWRpb3BsYXllci5wbGF5KCk7XG4gIH0pXG5cbiAgdG91Y2hEZXZpY2VEZXRlY3RlZCRcbiAgICAub25WYWx1ZSgoKSA9PiB7XG4gICAgICAkKCcjdW5zdXBwb3J0ZWQnKS5zaG93KClcbiAgICAgICQoJy5jb250YWluZXInKS5oaWRlKClcbiAgICAgICQoJy5sb2FkaW5nJykuaGlkZSgpXG4gICAgfSlcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlbmRlci9pbmRleC5qc1xuICoqLyIsInZhciByYWYgPSByZXF1aXJlKFwicmFmXCIpXG52YXIgVHlwZWRFcnJvciA9IHJlcXVpcmUoXCJlcnJvci90eXBlZFwiKVxuXG52YXIgSW52YWxpZFVwZGF0ZUluUmVuZGVyID0gVHlwZWRFcnJvcih7XG4gICAgdHlwZTogXCJtYWluLWxvb3AuaW52YWxpZC51cGRhdGUuaW4tcmVuZGVyXCIsXG4gICAgbWVzc2FnZTogXCJtYWluLWxvb3A6IFVuZXhwZWN0ZWQgdXBkYXRlIG9jY3VycmVkIGluIGxvb3AuXFxuXCIgK1xuICAgICAgICBcIldlIGFyZSBjdXJyZW50bHkgcmVuZGVyaW5nIGEgdmlldywgXCIgK1xuICAgICAgICAgICAgXCJ5b3UgY2FuJ3QgY2hhbmdlIHN0YXRlIHJpZ2h0IG5vdy5cXG5cIiArXG4gICAgICAgIFwiVGhlIGRpZmYgaXM6IHtzdHJpbmdEaWZmfS5cXG5cIiArXG4gICAgICAgIFwiU1VHR0VTVEVEIEZJWDogZmluZCB0aGUgc3RhdGUgbXV0YXRpb24gaW4geW91ciB2aWV3IFwiICtcbiAgICAgICAgICAgIFwib3IgcmVuZGVyaW5nIGZ1bmN0aW9uIGFuZCByZW1vdmUgaXQuXFxuXCIgK1xuICAgICAgICBcIlRoZSB2aWV3IHNob3VsZCBub3QgaGF2ZSBhbnkgc2lkZSBlZmZlY3RzLlxcblwiLFxuICAgIGRpZmY6IG51bGwsXG4gICAgc3RyaW5nRGlmZjogbnVsbFxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBtYWluXG5cbmZ1bmN0aW9uIG1haW4oaW5pdGlhbFN0YXRlLCB2aWV3LCBvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge31cblxuICAgIHZhciBjdXJyZW50U3RhdGUgPSBpbml0aWFsU3RhdGVcbiAgICB2YXIgY3JlYXRlID0gb3B0cy5jcmVhdGVcbiAgICB2YXIgZGlmZiA9IG9wdHMuZGlmZlxuICAgIHZhciBwYXRjaCA9IG9wdHMucGF0Y2hcbiAgICB2YXIgcmVkcmF3U2NoZWR1bGVkID0gZmFsc2VcblxuICAgIHZhciB0cmVlID0gb3B0cy5pbml0aWFsVHJlZSB8fCB2aWV3KGN1cnJlbnRTdGF0ZSlcbiAgICB2YXIgdGFyZ2V0ID0gb3B0cy50YXJnZXQgfHwgY3JlYXRlKHRyZWUsIG9wdHMpXG4gICAgdmFyIGluUmVuZGVyaW5nVHJhbnNhY3Rpb24gPSBmYWxzZVxuXG4gICAgY3VycmVudFN0YXRlID0gbnVsbFxuXG4gICAgdmFyIGxvb3AgPSB7XG4gICAgICAgIHN0YXRlOiBpbml0aWFsU3RhdGUsXG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICB1cGRhdGU6IHVwZGF0ZVxuICAgIH1cbiAgICByZXR1cm4gbG9vcFxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKHN0YXRlKSB7XG4gICAgICAgIGlmIChpblJlbmRlcmluZ1RyYW5zYWN0aW9uKSB7XG4gICAgICAgICAgICB0aHJvdyBJbnZhbGlkVXBkYXRlSW5SZW5kZXIoe1xuICAgICAgICAgICAgICAgIGRpZmY6IHN0YXRlLl9kaWZmLFxuICAgICAgICAgICAgICAgIHN0cmluZ0RpZmY6IEpTT04uc3RyaW5naWZ5KHN0YXRlLl9kaWZmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IG51bGwgJiYgIXJlZHJhd1NjaGVkdWxlZCkge1xuICAgICAgICAgICAgcmVkcmF3U2NoZWR1bGVkID0gdHJ1ZVxuICAgICAgICAgICAgcmFmKHJlZHJhdylcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlXG4gICAgICAgIGxvb3Auc3RhdGUgPSBzdGF0ZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZHJhdygpIHtcbiAgICAgICAgcmVkcmF3U2NoZWR1bGVkID0gZmFsc2VcbiAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpblJlbmRlcmluZ1RyYW5zYWN0aW9uID0gdHJ1ZVxuICAgICAgICB2YXIgbmV3VHJlZSA9IHZpZXcoY3VycmVudFN0YXRlKVxuXG4gICAgICAgIGlmIChvcHRzLmNyZWF0ZU9ubHkpIHtcbiAgICAgICAgICAgIGluUmVuZGVyaW5nVHJhbnNhY3Rpb24gPSBmYWxzZVxuICAgICAgICAgICAgY3JlYXRlKG5ld1RyZWUsIG9wdHMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcGF0Y2hlcyA9IGRpZmYodHJlZSwgbmV3VHJlZSwgb3B0cylcbiAgICAgICAgICAgIGluUmVuZGVyaW5nVHJhbnNhY3Rpb24gPSBmYWxzZVxuICAgICAgICAgICAgdGFyZ2V0ID0gcGF0Y2godGFyZ2V0LCBwYXRjaGVzLCBvcHRzKVxuICAgICAgICB9XG5cbiAgICAgICAgdHJlZSA9IG5ld1RyZWVcbiAgICAgICAgY3VycmVudFN0YXRlID0gbnVsbFxuICAgIH1cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L21haW4tbG9vcC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBub3cgPSByZXF1aXJlKCdwZXJmb3JtYW5jZS1ub3cnKVxuICAsIGdsb2JhbCA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8ge30gOiB3aW5kb3dcbiAgLCB2ZW5kb3JzID0gWydtb3onLCAnd2Via2l0J11cbiAgLCBzdWZmaXggPSAnQW5pbWF0aW9uRnJhbWUnXG4gICwgcmFmID0gZ2xvYmFsWydyZXF1ZXN0JyArIHN1ZmZpeF1cbiAgLCBjYWYgPSBnbG9iYWxbJ2NhbmNlbCcgKyBzdWZmaXhdIHx8IGdsb2JhbFsnY2FuY2VsUmVxdWVzdCcgKyBzdWZmaXhdXG4gICwgaXNOYXRpdmUgPSB0cnVlXG5cbmZvcih2YXIgaSA9IDA7IGkgPCB2ZW5kb3JzLmxlbmd0aCAmJiAhcmFmOyBpKyspIHtcbiAgcmFmID0gZ2xvYmFsW3ZlbmRvcnNbaV0gKyAnUmVxdWVzdCcgKyBzdWZmaXhdXG4gIGNhZiA9IGdsb2JhbFt2ZW5kb3JzW2ldICsgJ0NhbmNlbCcgKyBzdWZmaXhdXG4gICAgICB8fCBnbG9iYWxbdmVuZG9yc1tpXSArICdDYW5jZWxSZXF1ZXN0JyArIHN1ZmZpeF1cbn1cblxuLy8gU29tZSB2ZXJzaW9ucyBvZiBGRiBoYXZlIHJBRiBidXQgbm90IGNBRlxuaWYoIXJhZiB8fCAhY2FmKSB7XG4gIGlzTmF0aXZlID0gZmFsc2VcblxuICB2YXIgbGFzdCA9IDBcbiAgICAsIGlkID0gMFxuICAgICwgcXVldWUgPSBbXVxuICAgICwgZnJhbWVEdXJhdGlvbiA9IDEwMDAgLyA2MFxuXG4gIHJhZiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgaWYocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXIgX25vdyA9IG5vdygpXG4gICAgICAgICwgbmV4dCA9IE1hdGgubWF4KDAsIGZyYW1lRHVyYXRpb24gLSAoX25vdyAtIGxhc3QpKVxuICAgICAgbGFzdCA9IG5leHQgKyBfbm93XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY3AgPSBxdWV1ZS5zbGljZSgwKVxuICAgICAgICAvLyBDbGVhciBxdWV1ZSBoZXJlIHRvIHByZXZlbnRcbiAgICAgICAgLy8gY2FsbGJhY2tzIGZyb20gYXBwZW5kaW5nIGxpc3RlbmVyc1xuICAgICAgICAvLyB0byB0aGUgY3VycmVudCBmcmFtZSdzIHF1ZXVlXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDBcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYoIWNwW2ldLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICBjcFtpXS5jYWxsYmFjayhsYXN0KVxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRocm93IGUgfSwgMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIE1hdGgucm91bmQobmV4dCkpXG4gICAgfVxuICAgIHF1ZXVlLnB1c2goe1xuICAgICAgaGFuZGxlOiArK2lkLFxuICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgY2FuY2VsbGVkOiBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuIGlkXG4gIH1cblxuICBjYWYgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHF1ZXVlW2ldLmhhbmRsZSA9PT0gaGFuZGxlKSB7XG4gICAgICAgIHF1ZXVlW2ldLmNhbmNlbGxlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbikge1xuICAvLyBXcmFwIGluIGEgbmV3IGZ1bmN0aW9uIHRvIHByZXZlbnRcbiAgLy8gYGNhbmNlbGAgcG90ZW50aWFsbHkgYmVpbmcgYXNzaWduZWRcbiAgLy8gdG8gdGhlIG5hdGl2ZSByQUYgZnVuY3Rpb25cbiAgaWYoIWlzTmF0aXZlKSB7XG4gICAgcmV0dXJuIHJhZi5jYWxsKGdsb2JhbCwgZm4pXG4gIH1cbiAgcmV0dXJuIHJhZi5jYWxsKGdsb2JhbCwgZnVuY3Rpb24oKSB7XG4gICAgdHJ5e1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdGhyb3cgZSB9LCAwKVxuICAgIH1cbiAgfSlcbn1cbm1vZHVsZS5leHBvcnRzLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICBjYWYuYXBwbHkoZ2xvYmFsLCBhcmd1bWVudHMpXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yYWYvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNi4zXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBnZXROYW5vU2Vjb25kcywgaHJ0aW1lLCBsb2FkVGltZTtcblxuICBpZiAoKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCkgJiYgcGVyZm9ybWFuY2Uubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzICE9PSBudWxsKSAmJiBwcm9jZXNzLmhydGltZSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGdldE5hbm9TZWNvbmRzKCkgLSBsb2FkVGltZSkgLyAxZTY7XG4gICAgfTtcbiAgICBocnRpbWUgPSBwcm9jZXNzLmhydGltZTtcbiAgICBnZXROYW5vU2Vjb25kcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhyO1xuICAgICAgaHIgPSBocnRpbWUoKTtcbiAgICAgIHJldHVybiBoclswXSAqIDFlOSArIGhyWzFdO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBnZXROYW5vU2Vjb25kcygpO1xuICB9IGVsc2UgaWYgKERhdGUubm93KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gbG9hZFRpbWU7XG4gICAgfTtcbiAgICBsb2FkVGltZSA9IERhdGUubm93KCk7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxvYWRUaW1lO1xuICAgIH07XG4gICAgbG9hZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG59KS5jYWxsKHRoaXMpO1xuXG4vKlxuLy9AIHNvdXJjZU1hcHBpbmdVUkw9cGVyZm9ybWFuY2Utbm93Lm1hcFxuKi9cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3BlcmZvcm1hbmNlLW5vdy9saWIvcGVyZm9ybWFuY2Utbm93LmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjYW1lbGl6ZSA9IHJlcXVpcmUoXCJjYW1lbGl6ZVwiKVxudmFyIHRlbXBsYXRlID0gcmVxdWlyZShcInN0cmluZy10ZW1wbGF0ZVwiKVxudmFyIGV4dGVuZCA9IHJlcXVpcmUoXCJ4dGVuZC9tdXRhYmxlXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gVHlwZWRFcnJvclxuXG5mdW5jdGlvbiBUeXBlZEVycm9yKGFyZ3MpIHtcbiAgICBpZiAoIWFyZ3MpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXJncyBpcyByZXF1aXJlZFwiKTtcbiAgICB9XG4gICAgaWYgKCFhcmdzLnR5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiYXJncy50eXBlIGlzIHJlcXVpcmVkXCIpO1xuICAgIH1cbiAgICBpZiAoIWFyZ3MubWVzc2FnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcmdzLm1lc3NhZ2UgaXMgcmVxdWlyZWRcIik7XG4gICAgfVxuXG4gICAgdmFyIG1lc3NhZ2UgPSBhcmdzLm1lc3NhZ2VcblxuICAgIGlmIChhcmdzLnR5cGUgJiYgIWFyZ3MubmFtZSkge1xuICAgICAgICB2YXIgZXJyb3JOYW1lID0gY2FtZWxpemUoYXJncy50eXBlKSArIFwiRXJyb3JcIlxuICAgICAgICBhcmdzLm5hbWUgPSBlcnJvck5hbWVbMF0udG9VcHBlckNhc2UoKSArIGVycm9yTmFtZS5zdWJzdHIoMSlcbiAgICB9XG5cbiAgICBleHRlbmQoY3JlYXRlRXJyb3IsIGFyZ3MpO1xuICAgIGNyZWF0ZUVycm9yLl9uYW1lID0gYXJncy5uYW1lO1xuXG4gICAgcmV0dXJuIGNyZWF0ZUVycm9yO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlRXJyb3Iob3B0cykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEVycm9yKClcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVzdWx0LCBcInR5cGVcIiwge1xuICAgICAgICAgICAgdmFsdWU6IHJlc3VsdC50eXBlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBleHRlbmQoe30sIGFyZ3MsIG9wdHMpXG5cbiAgICAgICAgZXh0ZW5kKHJlc3VsdCwgb3B0aW9ucylcbiAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSB0ZW1wbGF0ZShtZXNzYWdlLCBvcHRpb25zKVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Vycm9yL3R5cGVkLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSByZXR1cm4gY2FtZWxDYXNlKG9iaik7XG4gICAgcmV0dXJuIHdhbGsob2JqKTtcbn07XG5cbmZ1bmN0aW9uIHdhbGsgKG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSByZXR1cm4gb2JqO1xuICAgIGlmIChpc0RhdGUob2JqKSB8fCBpc1JlZ2V4KG9iaikpIHJldHVybiBvYmo7XG4gICAgaWYgKGlzQXJyYXkob2JqKSkgcmV0dXJuIG1hcChvYmosIHdhbGspO1xuICAgIHJldHVybiByZWR1Y2Uob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIGNhbWVsID0gY2FtZWxDYXNlKGtleSk7XG4gICAgICAgIGFjY1tjYW1lbF0gPSB3YWxrKG9ialtrZXldKTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1tfLi1dKFxcd3wkKS9nLCBmdW5jdGlvbiAoXyx4KSB7XG4gICAgICAgIHJldHVybiB4LnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG59XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxudmFyIGlzRGF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJztcbn07XG5cbnZhciBpc1JlZ2V4ID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXM7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gICAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgICB2YXIgcmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIHJlZHVjZSAoeHMsIGYsIGFjYykge1xuICAgIGlmICh4cy5yZWR1Y2UpIHJldHVybiB4cy5yZWR1Y2UoZiwgYWNjKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFjYyA9IGYoYWNjLCB4c1tpXSwgaSk7XG4gICAgfVxuICAgIHJldHVybiBhY2M7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jYW1lbGl6ZS9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgbmFyZ3MgPSAvXFx7KFswLTlhLXpBLVpdKylcXH0vZ1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGVcblxuZnVuY3Rpb24gdGVtcGxhdGUoc3RyaW5nKSB7XG4gICAgdmFyIGFyZ3NcblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50c1sxXVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICB9XG5cbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcbiAgICAgICAgYXJncyA9IHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKG5hcmdzLCBmdW5jdGlvbiByZXBsYWNlQXJnKG1hdGNoLCBpLCBpbmRleCkge1xuICAgICAgICB2YXIgcmVzdWx0XG5cbiAgICAgICAgaWYgKHN0cmluZ1tpbmRleCAtIDFdID09PSBcIntcIiAmJlxuICAgICAgICAgICAgc3RyaW5nW2luZGV4ICsgbWF0Y2gubGVuZ3RoXSA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBhcmdzLmhhc093blByb3BlcnR5KGkpID8gYXJnc1tpXSA6IG51bGxcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3RyaW5nLXRlbXBsYXRlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34veHRlbmQvbXV0YWJsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgaCA9IHJlcXVpcmUoXCIuL3ZpcnR1YWwtaHlwZXJzY3JpcHQvaW5kZXguanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBoXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS9oLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCd4LWlzLWFycmF5Jyk7XG5cbnZhciBWTm9kZSA9IHJlcXVpcmUoJy4uL3Zub2RlL3Zub2RlLmpzJyk7XG52YXIgVlRleHQgPSByZXF1aXJlKCcuLi92bm9kZS92dGV4dC5qcycpO1xudmFyIGlzVk5vZGUgPSByZXF1aXJlKCcuLi92bm9kZS9pcy12bm9kZScpO1xudmFyIGlzVlRleHQgPSByZXF1aXJlKCcuLi92bm9kZS9pcy12dGV4dCcpO1xudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZSgnLi4vdm5vZGUvaXMtd2lkZ2V0Jyk7XG52YXIgaXNIb29rID0gcmVxdWlyZSgnLi4vdm5vZGUvaXMtdmhvb2snKTtcbnZhciBpc1ZUaHVuayA9IHJlcXVpcmUoJy4uL3Zub2RlL2lzLXRodW5rJyk7XG5cbnZhciBwYXJzZVRhZyA9IHJlcXVpcmUoJy4vcGFyc2UtdGFnLmpzJyk7XG52YXIgc29mdFNldEhvb2sgPSByZXF1aXJlKCcuL2hvb2tzL3NvZnQtc2V0LWhvb2suanMnKTtcbnZhciBldkhvb2sgPSByZXF1aXJlKCcuL2hvb2tzL2V2LWhvb2suanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBoO1xuXG5mdW5jdGlvbiBoKHRhZ05hbWUsIHByb3BlcnRpZXMsIGNoaWxkcmVuKSB7XG4gICAgdmFyIGNoaWxkTm9kZXMgPSBbXTtcbiAgICB2YXIgdGFnLCBwcm9wcywga2V5LCBuYW1lc3BhY2U7XG5cbiAgICBpZiAoIWNoaWxkcmVuICYmIGlzQ2hpbGRyZW4ocHJvcGVydGllcykpIHtcbiAgICAgICAgY2hpbGRyZW4gPSBwcm9wZXJ0aWVzO1xuICAgICAgICBwcm9wcyA9IHt9O1xuICAgIH1cblxuICAgIHByb3BzID0gcHJvcHMgfHwgcHJvcGVydGllcyB8fCB7fTtcbiAgICB0YWcgPSBwYXJzZVRhZyh0YWdOYW1lLCBwcm9wcyk7XG5cbiAgICAvLyBzdXBwb3J0IGtleXNcbiAgICBpZiAocHJvcHMuaGFzT3duUHJvcGVydHkoJ2tleScpKSB7XG4gICAgICAgIGtleSA9IHByb3BzLmtleTtcbiAgICAgICAgcHJvcHMua2V5ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnQgbmFtZXNwYWNlXG4gICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KCduYW1lc3BhY2UnKSkge1xuICAgICAgICBuYW1lc3BhY2UgPSBwcm9wcy5uYW1lc3BhY2U7XG4gICAgICAgIHByb3BzLm5hbWVzcGFjZSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBmaXggY3Vyc29yIGJ1Z1xuICAgIGlmICh0YWcgPT09ICdJTlBVVCcgJiZcbiAgICAgICAgIW5hbWVzcGFjZSAmJlxuICAgICAgICBwcm9wcy5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSAmJlxuICAgICAgICBwcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICFpc0hvb2socHJvcHMudmFsdWUpXG4gICAgKSB7XG4gICAgICAgIHByb3BzLnZhbHVlID0gc29mdFNldEhvb2socHJvcHMudmFsdWUpO1xuICAgIH1cblxuICAgIHRyYW5zZm9ybVByb3BlcnRpZXMocHJvcHMpO1xuXG4gICAgaWYgKGNoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgY2hpbGRyZW4gIT09IG51bGwpIHtcbiAgICAgICAgYWRkQ2hpbGQoY2hpbGRyZW4sIGNoaWxkTm9kZXMsIHRhZywgcHJvcHMpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIG5ldyBWTm9kZSh0YWcsIHByb3BzLCBjaGlsZE5vZGVzLCBrZXksIG5hbWVzcGFjZSk7XG59XG5cbmZ1bmN0aW9uIGFkZENoaWxkKGMsIGNoaWxkTm9kZXMsIHRhZywgcHJvcHMpIHtcbiAgICBpZiAodHlwZW9mIGMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNoaWxkTm9kZXMucHVzaChuZXcgVlRleHQoYykpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNoaWxkTm9kZXMucHVzaChuZXcgVlRleHQoU3RyaW5nKGMpKSk7XG4gICAgfSBlbHNlIGlmIChpc0NoaWxkKGMpKSB7XG4gICAgICAgIGNoaWxkTm9kZXMucHVzaChjKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkoYykpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhZGRDaGlsZChjW2ldLCBjaGlsZE5vZGVzLCB0YWcsIHByb3BzKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYyA9PT0gbnVsbCB8fCBjID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IFVuZXhwZWN0ZWRWaXJ0dWFsRWxlbWVudCh7XG4gICAgICAgICAgICBmb3JlaWduT2JqZWN0OiBjLFxuICAgICAgICAgICAgcGFyZW50Vm5vZGU6IHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiB0YWcsXG4gICAgICAgICAgICAgICAgcHJvcGVydGllczogcHJvcHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1Qcm9wZXJ0aWVzKHByb3BzKSB7XG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuXG4gICAgICAgICAgICBpZiAoaXNIb29rKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocHJvcE5hbWUuc3Vic3RyKDAsIDMpID09PSAnZXYtJykge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBldi1mb28gc3VwcG9ydFxuICAgICAgICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGV2SG9vayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQ2hpbGQoeCkge1xuICAgIHJldHVybiBpc1ZOb2RlKHgpIHx8IGlzVlRleHQoeCkgfHwgaXNXaWRnZXQoeCkgfHwgaXNWVGh1bmsoeCk7XG59XG5cbmZ1bmN0aW9uIGlzQ2hpbGRyZW4oeCkge1xuICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ3N0cmluZycgfHwgaXNBcnJheSh4KSB8fCBpc0NoaWxkKHgpO1xufVxuXG5mdW5jdGlvbiBVbmV4cGVjdGVkVmlydHVhbEVsZW1lbnQoZGF0YSkge1xuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoKTtcblxuICAgIGVyci50eXBlID0gJ3ZpcnR1YWwtaHlwZXJzY3JpcHQudW5leHBlY3RlZC52aXJ0dWFsLWVsZW1lbnQnO1xuICAgIGVyci5tZXNzYWdlID0gJ1VuZXhwZWN0ZWQgdmlydHVhbCBjaGlsZCBwYXNzZWQgdG8gaCgpLlxcbicgK1xuICAgICAgICAnRXhwZWN0ZWQgYSBWTm9kZSAvIFZ0aHVuayAvIFZXaWRnZXQgLyBzdHJpbmcgYnV0OlxcbicgK1xuICAgICAgICAnZ290OlxcbicgK1xuICAgICAgICBlcnJvclN0cmluZyhkYXRhLmZvcmVpZ25PYmplY3QpICtcbiAgICAgICAgJy5cXG4nICtcbiAgICAgICAgJ1RoZSBwYXJlbnQgdm5vZGUgaXM6XFxuJyArXG4gICAgICAgIGVycm9yU3RyaW5nKGRhdGEucGFyZW50Vm5vZGUpXG4gICAgICAgICdcXG4nICtcbiAgICAgICAgJ1N1Z2dlc3RlZCBmaXg6IGNoYW5nZSB5b3VyIGBoKC4uLiwgWyAuLi4gXSlgIGNhbGxzaXRlLic7XG4gICAgZXJyLmZvcmVpZ25PYmplY3QgPSBkYXRhLmZvcmVpZ25PYmplY3Q7XG4gICAgZXJyLnBhcmVudFZub2RlID0gZGF0YS5wYXJlbnRWbm9kZTtcblxuICAgIHJldHVybiBlcnI7XG59XG5cbmZ1bmN0aW9uIGVycm9yU3RyaW5nKG9iaikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIG51bGwsICcgICAgJyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gICAgfVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdmlydHVhbC1kb20vdmlydHVhbC1oeXBlcnNjcmlwdC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgbmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXlcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxubW9kdWxlLmV4cG9ydHMgPSBuYXRpdmVJc0FycmF5IHx8IGlzQXJyYXlcblxuZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCJcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3gtaXMtYXJyYXkvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHZlcnNpb24gPSByZXF1aXJlKFwiLi92ZXJzaW9uXCIpXG52YXIgaXNWTm9kZSA9IHJlcXVpcmUoXCIuL2lzLXZub2RlXCIpXG52YXIgaXNXaWRnZXQgPSByZXF1aXJlKFwiLi9pcy13aWRnZXRcIilcbnZhciBpc1RodW5rID0gcmVxdWlyZShcIi4vaXMtdGh1bmtcIilcbnZhciBpc1ZIb29rID0gcmVxdWlyZShcIi4vaXMtdmhvb2tcIilcblxubW9kdWxlLmV4cG9ydHMgPSBWaXJ0dWFsTm9kZVxuXG52YXIgbm9Qcm9wZXJ0aWVzID0ge31cbnZhciBub0NoaWxkcmVuID0gW11cblxuZnVuY3Rpb24gVmlydHVhbE5vZGUodGFnTmFtZSwgcHJvcGVydGllcywgY2hpbGRyZW4sIGtleSwgbmFtZXNwYWNlKSB7XG4gICAgdGhpcy50YWdOYW1lID0gdGFnTmFtZVxuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwgbm9Qcm9wZXJ0aWVzXG4gICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIHx8IG5vQ2hpbGRyZW5cbiAgICB0aGlzLmtleSA9IGtleSAhPSBudWxsID8gU3RyaW5nKGtleSkgOiB1bmRlZmluZWRcbiAgICB0aGlzLm5hbWVzcGFjZSA9ICh0eXBlb2YgbmFtZXNwYWNlID09PSBcInN0cmluZ1wiKSA/IG5hbWVzcGFjZSA6IG51bGxcblxuICAgIHZhciBjb3VudCA9IChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpIHx8IDBcbiAgICB2YXIgZGVzY2VuZGFudHMgPSAwXG4gICAgdmFyIGhhc1dpZGdldHMgPSBmYWxzZVxuICAgIHZhciBoYXNUaHVua3MgPSBmYWxzZVxuICAgIHZhciBkZXNjZW5kYW50SG9va3MgPSBmYWxzZVxuICAgIHZhciBob29rc1xuXG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcGVydGllcykge1xuICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbcHJvcE5hbWVdXG4gICAgICAgICAgICBpZiAoaXNWSG9vayhwcm9wZXJ0eSkgJiYgcHJvcGVydHkudW5ob29rKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFob29rcykge1xuICAgICAgICAgICAgICAgICAgICBob29rcyA9IHt9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaG9va3NbcHJvcE5hbWVdID0gcHJvcGVydHlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICBpZiAoaXNWTm9kZShjaGlsZCkpIHtcbiAgICAgICAgICAgIGRlc2NlbmRhbnRzICs9IGNoaWxkLmNvdW50IHx8IDBcblxuICAgICAgICAgICAgaWYgKCFoYXNXaWRnZXRzICYmIGNoaWxkLmhhc1dpZGdldHMpIHtcbiAgICAgICAgICAgICAgICBoYXNXaWRnZXRzID0gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWhhc1RodW5rcyAmJiBjaGlsZC5oYXNUaHVua3MpIHtcbiAgICAgICAgICAgICAgICBoYXNUaHVua3MgPSB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZGVzY2VuZGFudEhvb2tzICYmIChjaGlsZC5ob29rcyB8fCBjaGlsZC5kZXNjZW5kYW50SG9va3MpKSB7XG4gICAgICAgICAgICAgICAgZGVzY2VuZGFudEhvb2tzID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFoYXNXaWRnZXRzICYmIGlzV2lkZ2V0KGNoaWxkKSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZC5kZXN0cm95ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBoYXNXaWRnZXRzID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFoYXNUaHVua3MgJiYgaXNUaHVuayhjaGlsZCkpIHtcbiAgICAgICAgICAgIGhhc1RodW5rcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvdW50ID0gY291bnQgKyBkZXNjZW5kYW50c1xuICAgIHRoaXMuaGFzV2lkZ2V0cyA9IGhhc1dpZGdldHNcbiAgICB0aGlzLmhhc1RodW5rcyA9IGhhc1RodW5rc1xuICAgIHRoaXMuaG9va3MgPSBob29rc1xuICAgIHRoaXMuZGVzY2VuZGFudEhvb2tzID0gZGVzY2VuZGFudEhvb2tzXG59XG5cblZpcnR1YWxOb2RlLnByb3RvdHlwZS52ZXJzaW9uID0gdmVyc2lvblxuVmlydHVhbE5vZGUucHJvdG90eXBlLnR5cGUgPSBcIlZpcnR1YWxOb2RlXCJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL3Zub2RlLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCIyXCJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL3ZlcnNpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHZlcnNpb24gPSByZXF1aXJlKFwiLi92ZXJzaW9uXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gaXNWaXJ0dWFsTm9kZVxuXG5mdW5jdGlvbiBpc1ZpcnR1YWxOb2RlKHgpIHtcbiAgICByZXR1cm4geCAmJiB4LnR5cGUgPT09IFwiVmlydHVhbE5vZGVcIiAmJiB4LnZlcnNpb24gPT09IHZlcnNpb25cbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXZub2RlLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gaXNXaWRnZXRcblxuZnVuY3Rpb24gaXNXaWRnZXQodykge1xuICAgIHJldHVybiB3ICYmIHcudHlwZSA9PT0gXCJXaWRnZXRcIlxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdmlydHVhbC1kb20vdm5vZGUvaXMtd2lkZ2V0LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gaXNUaHVua1xyXG5cclxuZnVuY3Rpb24gaXNUaHVuayh0KSB7XHJcbiAgICByZXR1cm4gdCAmJiB0LnR5cGUgPT09IFwiVGh1bmtcIlxyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL2lzLXRodW5rLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gaXNIb29rXG5cbmZ1bmN0aW9uIGlzSG9vayhob29rKSB7XG4gICAgcmV0dXJuIGhvb2sgJiZcbiAgICAgICh0eXBlb2YgaG9vay5ob29rID09PSBcImZ1bmN0aW9uXCIgJiYgIWhvb2suaGFzT3duUHJvcGVydHkoXCJob29rXCIpIHx8XG4gICAgICAgdHlwZW9mIGhvb2sudW5ob29rID09PSBcImZ1bmN0aW9uXCIgJiYgIWhvb2suaGFzT3duUHJvcGVydHkoXCJ1bmhvb2tcIikpXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS92bm9kZS9pcy12aG9vay5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdmVyc2lvbiA9IHJlcXVpcmUoXCIuL3ZlcnNpb25cIilcblxubW9kdWxlLmV4cG9ydHMgPSBWaXJ0dWFsVGV4dFxuXG5mdW5jdGlvbiBWaXJ0dWFsVGV4dCh0ZXh0KSB7XG4gICAgdGhpcy50ZXh0ID0gU3RyaW5nKHRleHQpXG59XG5cblZpcnR1YWxUZXh0LnByb3RvdHlwZS52ZXJzaW9uID0gdmVyc2lvblxuVmlydHVhbFRleHQucHJvdG90eXBlLnR5cGUgPSBcIlZpcnR1YWxUZXh0XCJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ZpcnR1YWwtZG9tL3Zub2RlL3Z0ZXh0LmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB2ZXJzaW9uID0gcmVxdWlyZShcIi4vdmVyc2lvblwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVmlydHVhbFRleHRcblxuZnVuY3Rpb24gaXNWaXJ0dWFsVGV4dCh4KSB7XG4gICAgcmV0dXJuIHggJiYgeC50eXBlID09PSBcIlZpcnR1YWxUZXh0XCIgJiYgeC52ZXJzaW9uID09PSB2ZXJzaW9uXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS92bm9kZS9pcy12dGV4dC5qc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzcGxpdCA9IHJlcXVpcmUoJ2Jyb3dzZXItc3BsaXQnKTtcblxudmFyIGNsYXNzSWRTcGxpdCA9IC8oW1xcLiNdP1thLXpBLVowLTlcXHUwMDdGLVxcdUZGRkZfOi1dKykvO1xudmFyIG5vdENsYXNzSWQgPSAvXlxcLnwjLztcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVRhZztcblxuZnVuY3Rpb24gcGFyc2VUYWcodGFnLCBwcm9wcykge1xuICAgIGlmICghdGFnKSB7XG4gICAgICAgIHJldHVybiAnRElWJztcbiAgICB9XG5cbiAgICB2YXIgbm9JZCA9ICEocHJvcHMuaGFzT3duUHJvcGVydHkoJ2lkJykpO1xuXG4gICAgdmFyIHRhZ1BhcnRzID0gc3BsaXQodGFnLCBjbGFzc0lkU3BsaXQpO1xuICAgIHZhciB0YWdOYW1lID0gbnVsbDtcblxuICAgIGlmIChub3RDbGFzc0lkLnRlc3QodGFnUGFydHNbMV0pKSB7XG4gICAgICAgIHRhZ05hbWUgPSAnRElWJztcbiAgICB9XG5cbiAgICB2YXIgY2xhc3NlcywgcGFydCwgdHlwZSwgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCB0YWdQYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJ0ID0gdGFnUGFydHNbaV07XG5cbiAgICAgICAgaWYgKCFwYXJ0KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHR5cGUgPSBwYXJ0LmNoYXJBdCgwKTtcblxuICAgICAgICBpZiAoIXRhZ05hbWUpIHtcbiAgICAgICAgICAgIHRhZ05hbWUgPSBwYXJ0O1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICcuJykge1xuICAgICAgICAgICAgY2xhc3NlcyA9IGNsYXNzZXMgfHwgW107XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2gocGFydC5zdWJzdHJpbmcoMSwgcGFydC5sZW5ndGgpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnIycgJiYgbm9JZCkge1xuICAgICAgICAgICAgcHJvcHMuaWQgPSBwYXJ0LnN1YnN0cmluZygxLCBwYXJ0Lmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2xhc3Nlcykge1xuICAgICAgICBpZiAocHJvcHMuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBjbGFzc2VzLnB1c2gocHJvcHMuY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3BzLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5uYW1lc3BhY2UgPyB0YWdOYW1lIDogdGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdmlydHVhbC1kb20vdmlydHVhbC1oeXBlcnNjcmlwdC9wYXJzZS10YWcuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyohXG4gKiBDcm9zcy1Ccm93c2VyIFNwbGl0IDEuMS4xXG4gKiBDb3B5cmlnaHQgMjAwNy0yMDEyIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPlxuICogQXZhaWxhYmxlIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICogRUNNQVNjcmlwdCBjb21wbGlhbnQsIHVuaWZvcm0gY3Jvc3MtYnJvd3NlciBzcGxpdCBtZXRob2RcbiAqL1xuXG4vKipcbiAqIFNwbGl0cyBhIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3MgdXNpbmcgYSByZWdleCBvciBzdHJpbmcgc2VwYXJhdG9yLiBNYXRjaGVzIG9mIHRoZVxuICogc2VwYXJhdG9yIGFyZSBub3QgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdCBhcnJheS4gSG93ZXZlciwgaWYgYHNlcGFyYXRvcmAgaXMgYSByZWdleCB0aGF0IGNvbnRhaW5zXG4gKiBjYXB0dXJpbmcgZ3JvdXBzLCBiYWNrcmVmZXJlbmNlcyBhcmUgc3BsaWNlZCBpbnRvIHRoZSByZXN1bHQgZWFjaCB0aW1lIGBzZXBhcmF0b3JgIGlzIG1hdGNoZWQuXG4gKiBGaXhlcyBicm93c2VyIGJ1Z3MgY29tcGFyZWQgdG8gdGhlIG5hdGl2ZSBgU3RyaW5nLnByb3RvdHlwZS5zcGxpdGAgYW5kIGNhbiBiZSB1c2VkIHJlbGlhYmx5XG4gKiBjcm9zcy1icm93c2VyLlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBTdHJpbmcgdG8gc3BsaXQuXG4gKiBAcGFyYW0ge1JlZ0V4cHxTdHJpbmd9IHNlcGFyYXRvciBSZWdleCBvciBzdHJpbmcgdG8gdXNlIGZvciBzZXBhcmF0aW5nIHRoZSBzdHJpbmcuXG4gKiBAcGFyYW0ge051bWJlcn0gW2xpbWl0XSBNYXhpbXVtIG51bWJlciBvZiBpdGVtcyB0byBpbmNsdWRlIGluIHRoZSByZXN1bHQgYXJyYXkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIHN1YnN0cmluZ3MuXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEJhc2ljIHVzZVxuICogc3BsaXQoJ2EgYiBjIGQnLCAnICcpO1xuICogLy8gLT4gWydhJywgJ2InLCAnYycsICdkJ11cbiAqXG4gKiAvLyBXaXRoIGxpbWl0XG4gKiBzcGxpdCgnYSBiIGMgZCcsICcgJywgMik7XG4gKiAvLyAtPiBbJ2EnLCAnYiddXG4gKlxuICogLy8gQmFja3JlZmVyZW5jZXMgaW4gcmVzdWx0IGFycmF5XG4gKiBzcGxpdCgnLi53b3JkMSB3b3JkMi4uJywgLyhbYS16XSspKFxcZCspL2kpO1xuICogLy8gLT4gWycuLicsICd3b3JkJywgJzEnLCAnICcsICd3b3JkJywgJzInLCAnLi4nXVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiBzcGxpdCh1bmRlZikge1xuXG4gIHZhciBuYXRpdmVTcGxpdCA9IFN0cmluZy5wcm90b3R5cGUuc3BsaXQsXG4gICAgY29tcGxpYW50RXhlY05wY2cgPSAvKCk/Py8uZXhlYyhcIlwiKVsxXSA9PT0gdW5kZWYsXG4gICAgLy8gTlBDRzogbm9ucGFydGljaXBhdGluZyBjYXB0dXJpbmcgZ3JvdXBcbiAgICBzZWxmO1xuXG4gIHNlbGYgPSBmdW5jdGlvbihzdHIsIHNlcGFyYXRvciwgbGltaXQpIHtcbiAgICAvLyBJZiBgc2VwYXJhdG9yYCBpcyBub3QgYSByZWdleCwgdXNlIGBuYXRpdmVTcGxpdGBcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNlcGFyYXRvcikgIT09IFwiW29iamVjdCBSZWdFeHBdXCIpIHtcbiAgICAgIHJldHVybiBuYXRpdmVTcGxpdC5jYWxsKHN0ciwgc2VwYXJhdG9yLCBsaW1pdCk7XG4gICAgfVxuICAgIHZhciBvdXRwdXQgPSBbXSxcbiAgICAgIGZsYWdzID0gKHNlcGFyYXRvci5pZ25vcmVDYXNlID8gXCJpXCIgOiBcIlwiKSArIChzZXBhcmF0b3IubXVsdGlsaW5lID8gXCJtXCIgOiBcIlwiKSArIChzZXBhcmF0b3IuZXh0ZW5kZWQgPyBcInhcIiA6IFwiXCIpICsgLy8gUHJvcG9zZWQgZm9yIEVTNlxuICAgICAgKHNlcGFyYXRvci5zdGlja3kgPyBcInlcIiA6IFwiXCIpLFxuICAgICAgLy8gRmlyZWZveCAzK1xuICAgICAgbGFzdExhc3RJbmRleCA9IDAsXG4gICAgICAvLyBNYWtlIGBnbG9iYWxgIGFuZCBhdm9pZCBgbGFzdEluZGV4YCBpc3N1ZXMgYnkgd29ya2luZyB3aXRoIGEgY29weVxuICAgICAgc2VwYXJhdG9yID0gbmV3IFJlZ0V4cChzZXBhcmF0b3Iuc291cmNlLCBmbGFncyArIFwiZ1wiKSxcbiAgICAgIHNlcGFyYXRvcjIsIG1hdGNoLCBsYXN0SW5kZXgsIGxhc3RMZW5ndGg7XG4gICAgc3RyICs9IFwiXCI7IC8vIFR5cGUtY29udmVydFxuICAgIGlmICghY29tcGxpYW50RXhlY05wY2cpIHtcbiAgICAgIC8vIERvZXNuJ3QgbmVlZCBmbGFncyBneSwgYnV0IHRoZXkgZG9uJ3QgaHVydFxuICAgICAgc2VwYXJhdG9yMiA9IG5ldyBSZWdFeHAoXCJeXCIgKyBzZXBhcmF0b3Iuc291cmNlICsgXCIkKD8hXFxcXHMpXCIsIGZsYWdzKTtcbiAgICB9XG4gICAgLyogVmFsdWVzIGZvciBgbGltaXRgLCBwZXIgdGhlIHNwZWM6XG4gICAgICogSWYgdW5kZWZpbmVkOiA0Mjk0OTY3Mjk1IC8vIE1hdGgucG93KDIsIDMyKSAtIDFcbiAgICAgKiBJZiAwLCBJbmZpbml0eSwgb3IgTmFOOiAwXG4gICAgICogSWYgcG9zaXRpdmUgbnVtYmVyOiBsaW1pdCA9IE1hdGguZmxvb3IobGltaXQpOyBpZiAobGltaXQgPiA0Mjk0OTY3Mjk1KSBsaW1pdCAtPSA0Mjk0OTY3Mjk2O1xuICAgICAqIElmIG5lZ2F0aXZlIG51bWJlcjogNDI5NDk2NzI5NiAtIE1hdGguZmxvb3IoTWF0aC5hYnMobGltaXQpKVxuICAgICAqIElmIG90aGVyOiBUeXBlLWNvbnZlcnQsIHRoZW4gdXNlIHRoZSBhYm92ZSBydWxlc1xuICAgICAqL1xuICAgIGxpbWl0ID0gbGltaXQgPT09IHVuZGVmID8gLTEgPj4+IDAgOiAvLyBNYXRoLnBvdygyLCAzMikgLSAxXG4gICAgbGltaXQgPj4+IDA7IC8vIFRvVWludDMyKGxpbWl0KVxuICAgIHdoaWxlIChtYXRjaCA9IHNlcGFyYXRvci5leGVjKHN0cikpIHtcbiAgICAgIC8vIGBzZXBhcmF0b3IubGFzdEluZGV4YCBpcyBub3QgcmVsaWFibGUgY3Jvc3MtYnJvd3NlclxuICAgICAgbGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG4gICAgICBpZiAobGFzdEluZGV4ID4gbGFzdExhc3RJbmRleCkge1xuICAgICAgICBvdXRwdXQucHVzaChzdHIuc2xpY2UobGFzdExhc3RJbmRleCwgbWF0Y2guaW5kZXgpKTtcbiAgICAgICAgLy8gRml4IGJyb3dzZXJzIHdob3NlIGBleGVjYCBtZXRob2RzIGRvbid0IGNvbnNpc3RlbnRseSByZXR1cm4gYHVuZGVmaW5lZGAgZm9yXG4gICAgICAgIC8vIG5vbnBhcnRpY2lwYXRpbmcgY2FwdHVyaW5nIGdyb3Vwc1xuICAgICAgICBpZiAoIWNvbXBsaWFudEV4ZWNOcGNnICYmIG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBtYXRjaFswXS5yZXBsYWNlKHNlcGFyYXRvcjIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoIC0gMjsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmIChhcmd1bWVudHNbaV0gPT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hbaV0gPSB1bmRlZjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAxICYmIG1hdGNoLmluZGV4IDwgc3RyLmxlbmd0aCkge1xuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KG91dHB1dCwgbWF0Y2guc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RMZW5ndGggPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIGxhc3RMYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgIGlmIChvdXRwdXQubGVuZ3RoID49IGxpbWl0KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzZXBhcmF0b3IubGFzdEluZGV4ID09PSBtYXRjaC5pbmRleCkge1xuICAgICAgICBzZXBhcmF0b3IubGFzdEluZGV4Kys7IC8vIEF2b2lkIGFuIGluZmluaXRlIGxvb3BcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxhc3RMYXN0SW5kZXggPT09IHN0ci5sZW5ndGgpIHtcbiAgICAgIGlmIChsYXN0TGVuZ3RoIHx8ICFzZXBhcmF0b3IudGVzdChcIlwiKSkge1xuICAgICAgICBvdXRwdXQucHVzaChcIlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goc3RyLnNsaWNlKGxhc3RMYXN0SW5kZXgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dC5sZW5ndGggPiBsaW1pdCA/IG91dHB1dC5zbGljZSgwLCBsaW1pdCkgOiBvdXRwdXQ7XG4gIH07XG5cbiAgcmV0dXJuIHNlbGY7XG59KSgpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vYnJvd3Nlci1zcGxpdC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gU29mdFNldEhvb2s7XG5cbmZ1bmN0aW9uIFNvZnRTZXRIb29rKHZhbHVlKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvZnRTZXRIb29rKSkge1xuICAgICAgICByZXR1cm4gbmV3IFNvZnRTZXRIb29rKHZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG59XG5cblNvZnRTZXRIb29rLnByb3RvdHlwZS5ob29rID0gZnVuY3Rpb24gKG5vZGUsIHByb3BlcnR5TmFtZSkge1xuICAgIGlmIChub2RlW3Byb3BlcnR5TmFtZV0gIT09IHRoaXMudmFsdWUpIHtcbiAgICAgICAgbm9kZVtwcm9wZXJ0eU5hbWVdID0gdGhpcy52YWx1ZTtcbiAgICB9XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdmlydHVhbC1kb20vdmlydHVhbC1oeXBlcnNjcmlwdC9ob29rcy9zb2Z0LXNldC1ob29rLmpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEV2U3RvcmUgPSByZXF1aXJlKCdldi1zdG9yZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2SG9vaztcblxuZnVuY3Rpb24gRXZIb29rKHZhbHVlKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEV2SG9vaykpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFdkhvb2sodmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbn1cblxuRXZIb29rLnByb3RvdHlwZS5ob29rID0gZnVuY3Rpb24gKG5vZGUsIHByb3BlcnR5TmFtZSkge1xuICAgIHZhciBlcyA9IEV2U3RvcmUobm9kZSk7XG4gICAgdmFyIHByb3BOYW1lID0gcHJvcGVydHlOYW1lLnN1YnN0cigzKTtcblxuICAgIGVzW3Byb3BOYW1lXSA9IHRoaXMudmFsdWU7XG59O1xuXG5Fdkhvb2sucHJvdG90eXBlLnVuaG9vayA9IGZ1bmN0aW9uKG5vZGUsIHByb3BlcnR5TmFtZSkge1xuICAgIHZhciBlcyA9IEV2U3RvcmUobm9kZSk7XG4gICAgdmFyIHByb3BOYW1lID0gcHJvcGVydHlOYW1lLnN1YnN0cigzKTtcblxuICAgIGVzW3Byb3BOYW1lXSA9IHVuZGVmaW5lZDtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS92aXJ0dWFsLWh5cGVyc2NyaXB0L2hvb2tzL2V2LWhvb2suanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgT25lVmVyc2lvbkNvbnN0cmFpbnQgPSByZXF1aXJlKCdpbmRpdmlkdWFsL29uZS12ZXJzaW9uJyk7XG5cbnZhciBNWV9WRVJTSU9OID0gJzcnO1xuT25lVmVyc2lvbkNvbnN0cmFpbnQoJ2V2LXN0b3JlJywgTVlfVkVSU0lPTik7XG5cbnZhciBoYXNoS2V5ID0gJ19fRVZfU1RPUkVfS0VZQCcgKyBNWV9WRVJTSU9OO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2U3RvcmU7XG5cbmZ1bmN0aW9uIEV2U3RvcmUoZWxlbSkge1xuICAgIHZhciBoYXNoID0gZWxlbVtoYXNoS2V5XTtcblxuICAgIGlmICghaGFzaCkge1xuICAgICAgICBoYXNoID0gZWxlbVtoYXNoS2V5XSA9IHt9O1xuICAgIH1cblxuICAgIHJldHVybiBoYXNoO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZXYtc3RvcmUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgSW5kaXZpZHVhbCA9IHJlcXVpcmUoJy4vaW5kZXguanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPbmVWZXJzaW9uO1xuXG5mdW5jdGlvbiBPbmVWZXJzaW9uKG1vZHVsZU5hbWUsIHZlcnNpb24sIGRlZmF1bHRWYWx1ZSkge1xuICAgIHZhciBrZXkgPSAnX19JTkRJVklEVUFMX09ORV9WRVJTSU9OXycgKyBtb2R1bGVOYW1lO1xuICAgIHZhciBlbmZvcmNlS2V5ID0ga2V5ICsgJ19FTkZPUkNFX1NJTkdMRVRPTic7XG5cbiAgICB2YXIgdmVyc2lvblZhbHVlID0gSW5kaXZpZHVhbChlbmZvcmNlS2V5LCB2ZXJzaW9uKTtcblxuICAgIGlmICh2ZXJzaW9uVmFsdWUgIT09IHZlcnNpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gb25seSBoYXZlIG9uZSBjb3B5IG9mICcgK1xuICAgICAgICAgICAgbW9kdWxlTmFtZSArICcuXFxuJyArXG4gICAgICAgICAgICAnWW91IGFscmVhZHkgaGF2ZSB2ZXJzaW9uICcgKyB2ZXJzaW9uVmFsdWUgK1xuICAgICAgICAgICAgJyBpbnN0YWxsZWQuXFxuJyArXG4gICAgICAgICAgICAnVGhpcyBtZWFucyB5b3UgY2Fubm90IGluc3RhbGwgdmVyc2lvbiAnICsgdmVyc2lvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIEluZGl2aWR1YWwoa2V5LCBkZWZhdWx0VmFsdWUpO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW5kaXZpZHVhbC9vbmUtdmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qZ2xvYmFsIHdpbmRvdywgZ2xvYmFsKi9cblxudmFyIHJvb3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/XG4gICAgd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgP1xuICAgIGdsb2JhbCA6IHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEluZGl2aWR1YWw7XG5cbmZ1bmN0aW9uIEluZGl2aWR1YWwoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChrZXkgaW4gcm9vdCkge1xuICAgICAgICByZXR1cm4gcm9vdFtrZXldO1xuICAgIH1cblxuICAgIHJvb3Rba2V5XSA9IHZhbHVlO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW5kaXZpZHVhbC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGBcbjxzdHlsZT5cbiAgI3ZpZGVvLXByb2dyZXNzIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGhlaWdodDogMXZoO1xuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgIHotaW5kZXg6IDU7XG4gIH1cbiAgI3ZpZGVvLXByb2dyZXNzIC5wcm9ncmVzcyB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMCwwLDEpO1xuICAgIHdpZHRoOiAxdnc7XG4gICAgaGVpZ2h0OiAxdmg7XG4gICAgLyp0cmFuc2l0aW9uOiBhbGwgMC4xcyBlYXNlOyovXG4gIH1cblxuICAuY2VudGVyLW1hcmtlciB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHdpZHRoOiAwLjV2dztcbiAgICBoZWlnaHQ6IDAuNXZ3O1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC44KTtcbiAgICB6LWluZGV4OiA2O1xuICAgIHJpZ2h0OiAxdnc7XG4gICAgYm9yZGVyLXJhZGl1czogM3Z3O1xuICB9XG5cblxuICAjZXhwZXJpZW5jZS1wcm9ncmVzcyB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMDtcbiAgICB3aWR0aDogMXZtaW47XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICB6LWluZGV4OiA1O1xuICB9XG4gICNleHBlcmllbmNlLXByb2dyZXNzIC5wcm9ncmVzcyB7XG4gICAgYmFja2dyb3VuZDogcmdiKDI1NSwgMjU1LCAyNTUpO1xuICAgIG9wYWNpdHk6IDAuNztcbiAgICB3aWR0aDogMC4ydnc7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBtYXJnaW4tdG9wOiAtMTAwdmg7XG4gICAgcmlnaHQ6IDEuMTV2dztcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3JkZXItcmFkaXVzOiA1dnc7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAuY29udHJvbC1wbGF5IHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdG9wOiAzdm1pbjtcbiAgICByaWdodDogM3ZtaW47XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cblxuICAuZm9jdXMtdG9nZ2xlcyBpIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBsaW5lLWhlaWdodDogNXZtaW47XG4gIH1cbiAgI3RvZ2dsZVBsYXkge1xuICAgIGZvbnQtc2l6ZTogNXZtaW47XG4gICAgbWFyZ2luLXJpZ2h0OiA1dm1pbjtcbiAgfVxuXG4gIC5jb250cm9sLXBsYXkgaSB7XG4gICAgZm9udC1zaXplOiA4dm1pbjtcbiAgICB0ZXh0LXNoYWRvdzogMCAwLjV2bWluIDF2bWluIHJnYmEoMCwwLDAsMC41KTtcbiAgICBsaW5lLWhlaWdodDogMTAwJTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cbiAgI3Vuc3VwcG9ydGVkIHtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luOiA1MHB4O1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAubG9hZGluZyB7XG4gICAgd2lkdGg6IDEwMHZ3O1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgei1pbmRleDogNztcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmctdG9wOiAzMHZoO1xuICB9XG4gIC5sb2FkaW5nIGgzIHtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG5cblxuICAucGFjZSB7XG4gICAgLXdlYmtpdC1wb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcblxuICAgIHotaW5kZXg6IDIwMDA7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIG1hcmdpbjogYXV0bztcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgaGVpZ2h0OiA1dmg7XG4gICAgd2lkdGg6IDUwdnc7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC5wYWNlIC5wYWNlLXByb2dyZXNzIHtcbiAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tcy1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1vLWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICAtbW96LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgLW8tdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuXG4gICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMjAwMDtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBiYWNrZ3JvdW5kOiAjMjlkO1xuICB9XG5cbiAgLnBhY2UucGFjZS1pbmFjdGl2ZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cImxvYWRpbmdcIj5cbiAgPGgzPkV4cGVyaWVuY2UgTG9hZGluZy4uLjwvaDM+XG48L2Rpdj5cbjxkaXYgaWQ9XCJ2aWRlby1wcm9ncmVzc1wiPlxuICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48L2Rpdj5cbjwvZGl2PlxuPGRpdiBpZD1cImV4cGVyaWVuY2UtcHJvZ3Jlc3NcIj5cbiAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJjb250cm9sLXBsYXlcIj5cbiAgPGkgY2xhc3M9XCJmYSBmYS1wbGF5XCIgaWQ9XCJ0b2dnbGVQbGF5XCI+PC9pPlxuICA8ZGl2IGNsYXNzPSdmb2N1cy10b2dnbGVzJz5cbiAgICA8aSBjbGFzcz1cImZhIGZhLWNhcmV0LXVwXCIgaWQ9XCJ0b2dnbGVVcFwiPjwvaT5cbiAgICA8aSBjbGFzcz1cImZhIGZhLWNhcmV0LWRvd25cIiBpZD1cInRvZ2dsZURvd25cIj48L2k+XG4gIDwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gIDxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXItaW5uZXJcIj48L2Rpdj5cbjwvZGl2PlxuXG48aDMgY2xhc3M9XCJlcnJvclwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+V2hvb3BzISBSaWdodCBub3cgdGhpcyBkZW1vIGRvZXNuJ3QgaGFuZGxlIHJlc2l6aW5nIG9yIGJyb3dzZXJzIGxlc3MgdGhhbiAxMDAwcHggd2lkZS4gUmVsb2FkIHRoaXMgcGFnZSBvciBnZXQgb24gYSBsYXB0b3AhPC9oMz5cbjxkaXYgaWQ9XCJ1bnN1cHBvcnRlZFwiPlxuPHNwYW4gc3R5bGU9XCJ0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlXCI+TW9iaWxlIGV4cGVyaWVuY2UgY29taW5nIHNvb248L3NwYW4+ICA8YnI+PGJyPiBUaGlzIGludGVyYWN0aXZlIGV4cGVyaWVuY2UgaXMgY3VycmVudGx5IG9ubHkgZm9yIGRlc2t0b3BzLlxuPC9kaXY+XG5gXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIvdGVtcGxhdGUuanNcbiAqKi8iLCJjb25zdCAkd2luZG93ID0gJCh3aW5kb3cpXG5jb25zdCAkYm9keSA9ICQoJ2JvZHksaHRtbCcpXG5jb25zdCAkZXhwZXJpZW5jZUluZGljYXRvciA9ICQoJyNleHBlcmllbmNlLXByb2dyZXNzIC5wcm9ncmVzcycpXG5jb25zdCAkZXhwZXJpZW5jZVByb2dyZXNzID0gJChcIiNleHBlcmllbmNlLXByb2dyZXNzXCIpXG5cbmZ1bmN0aW9uIHJlbmRlclNjcm9sbChzY3JvbGwpIHtcbiAgY29uc29sZS5sb2coXCJSRU5ERVJcIiwgc2Nyb2xsLCBNYXRoLmZsb29yKCR3aW5kb3cuc2Nyb2xsVG9wKCkpKVxuICAkYm9keS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6IHNjcm9sbFxuICB9LCAxNTAwLCAnbGluZWFyJyk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVTY3JvbGxCYXIoKSB7XG4gIHZhciBwZXJjZW50ID0gKHNjcm9sbFRvcCAvIGJvZHlIZWlnaHQpLnRvRml4ZWQoMikgKiAxMDA7XG4gICRleHBlcmllbmNlSW5kaWNhdG9yLmNzcyh7XG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke3BlcmNlbnR9JSlgXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGJ1aWxkU2Nyb2xsQmFyQ2VudGVycygpIHtcbiAgZnJhbWVGb2N1c1xuICAgIC5tYXAoKGNlbnRlcikgPT4gKGNlbnRlciAvIGJvZHlIZWlnaHQpLnRvRml4ZWQoMikgKiAxMDApXG4gICAgLm1hcCgoY2VudGVyUGVyY2VudCkgPT4gY2VudGVyUGVyY2VudCArIFwidmhcIilcbiAgICAubWFwKChjZW50ZXJWaCkgPT4ge1xuICAgICAgJGV4cGVyaWVuY2VQcm9ncmVzc1xuICAgICAgICAuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2VudGVyLW1hcmtlclwiIHN0eWxlPVwidG9wOicgKyBjZW50ZXJWaCArICdcIj48L2Rpdj4nKTtcbiAgICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlbmRlci9zY3JvbGxiYXIuanNcbiAqKi8iLCJjb25zdCBsb29wZXIgPSByZXF1aXJlKCcuL2xvb3Blci5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cy5uZXh0ID0gbmV4dDtcblxubW9kdWxlLmV4cG9ydHMuY29uZmlnID0gKGNvbmZpZykgPT4ge1xuICBsb29wZXIuY29uZmlnKGNvbmZpZylcbn07XG5cbm1vZHVsZS5leHBvcnRzLnBsYXkgPSAoKSA9PiB7XG4gIGxvb3Blci5wbGF5KClcbn07XG5cblxuZnVuY3Rpb24gbmV4dChpZCkge1xuICBsb29wZXIubmV4dChpZCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIvYXVkaW9wbGF5ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5jb25zdCBIb3dsID0gcmVxdWlyZSgnaG93bGVyJykuSG93bDtcblxudmFyIGxvb3BzID0ge307XG52YXIgbG9vcDtcblxubW9kdWxlLmV4cG9ydHMuY29uZmlnID0gKGNvbmZpZykgPT4ge1xuICBsb29wcyA9IGNvbmZpZy5tYXAoYyA9PiB7XG4gICAgbGV0IGF1ZGlvQ29uZmlnID0ge1xuICAgICAgc3JjOiBbJ21lZGlhLycrIGMuYXVkaW8uc3JjICsnLm1wMyddLFxuICAgICAgaHRtbDU6IHRydWUsXG4gICAgICB2b2x1bWU6IDBcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICdpZCc6IGMuaWQsXG4gICAgICAndm9sJzogYy5hdWRpby5tYXgsXG4gICAgICAnc291bmQxJzogbmV3IEhvd2woYXVkaW9Db25maWcpLFxuICAgICAgJ3NvdW5kMic6IG5ldyBIb3dsKGF1ZGlvQ29uZmlnKVxuICAgIH1cbiAgfSkucmVkdWNlKCAocHJldixuZXh0KSA9PiAge3ByZXZbbmV4dC5pZF0gPSBuZXh0OyByZXR1cm4gcHJldjt9LCB7fSlcbn1cblxubW9kdWxlLmV4cG9ydHMubmV4dCA9IChpZCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZygnbmV4dCcsIGlkKVxuICBsb29wID0gbG9vcHNbaWRdO1xuICAvLyBjb25zb2xlLmxvZyhsb29wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMucGF1c2UgPSAoY29uZmlnKSA9PiB7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMucGxheSA9IChjb25maWcpID0+IHtcbiAgbG9vcGVyKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLnN0b3AgPSAoY29uZmlnKSA9PiB7XG5cbn1cblxuZnVuY3Rpb24gbG9vcGVyKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcbiAgLy8gY29uc29sZS5sb2coJ2xvb3BlcicsIGxvb3Auc291bmQxKVxuICBsZXQgZmFkZVBlcmNlbnQgPSAobG9vcC5zb3VuZDEuZHVyYXRpb24oKSA+IDUpICA/IDAuMDEgOiAwLjAxNTsgLy8gMiUgb3IgMSUgZGVwZW5kaW5nIG9uIGlmIHNvdW5kIGlzIG92ZXIgNSBzZWNvbmRzXG4gIGxldCBmYWRlcmF0ZSA9ICAxIC0gZmFkZVBlcmNlbnQ7XG4gIGxldCBkdXJhdGlvbiA9IGxvb3Auc291bmQxLmR1cmF0aW9uKCkgKiAxMDAwICogKDEgLSBmYWRlUGVyY2VudCk7XG4gIGxldCB2b2x1bWUgPSBsb29wLnZvbDtcbiAgLy8gY29uc29sZS5sb2coZmFkZXJhdGUsIGZhZGVQZXJjZW50LCBkdXJhdGlvbiwgdm9sdW1lKTtcblxuICBsb29wLnNvdW5kMS5wbGF5KCk7XG4gIGxvb3Auc291bmQxLmZhZGUoMCx2b2x1bWUsIGR1cmF0aW9uICogZmFkZVBlcmNlbnQpO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGxvb3Auc291bmQxLmZhZGUodm9sdW1lLDAsIGR1cmF0aW9uICogZmFkZVBlcmNlbnQpO1xuICB9LCBkdXJhdGlvbiAqIGZhZGVyYXRlICk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbG9vcC5zb3VuZDIucGxheSgpO1xuICAgIGxvb3Auc291bmQyLmZhZGUoMCx2b2x1bWUsIGR1cmF0aW9uICogZmFkZVBlcmNlbnQpO1xuICB9LCBkdXJhdGlvbiAqIGZhZGVyYXRlKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb29wLnNvdW5kMi5mYWRlKHZvbHVtZSwwLCBkdXJhdGlvbiAqIGZhZGVQZXJjZW50KTtcbiAgICBsb29wZXIoKTtcbiAgfSwgZHVyYXRpb24gKiAyICogZmFkZXJhdGUpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzLmxvb3AgPSBsb29wZXI7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIvbG9vcGVyLmpzXG4gKiovIiwiLyohIGhvd2xlci5qcyB2Mi4wLjAtYmV0YTcgfCAoYykgMjAxMy0yMDE2LCBKYW1lcyBTaW1wc29uIG9mIEdvbGRGaXJlIFN0dWRpb3MgfCBNSVQgTGljZW5zZSB8IGhvd2xlcmpzLmNvbSAqL1xuIWZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZSgpe3RyeXtcInVuZGVmaW5lZFwiIT10eXBlb2YgQXVkaW9Db250ZXh0P249bmV3IEF1ZGlvQ29udGV4dDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2Via2l0QXVkaW9Db250ZXh0P249bmV3IHdlYmtpdEF1ZGlvQ29udGV4dDpvPSExfWNhdGNoKGUpe289ITF9aWYoIW8paWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEF1ZGlvKXRyeXt2YXIgZD1uZXcgQXVkaW87XCJ1bmRlZmluZWRcIj09dHlwZW9mIGQub25jYW5wbGF5dGhyb3VnaCYmKHU9XCJjYW5wbGF5XCIpfWNhdGNoKGUpe3Q9ITB9ZWxzZSB0PSEwO3RyeXt2YXIgZD1uZXcgQXVkaW87ZC5tdXRlZCYmKHQ9ITApfWNhdGNoKGUpe312YXIgYT0vaVAoaG9uZXxvZHxhZCkvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKSxpPW5hdmlnYXRvci5hcHBWZXJzaW9uLm1hdGNoKC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/LyksXz1pP3BhcnNlSW50KGlbMV0sMTApOm51bGw7aWYoYSYmXyYmOT5fKXt2YXIgcz0vc2FmYXJpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpOyh3aW5kb3cubmF2aWdhdG9yLnN0YW5kYWxvbmUmJiFzfHwhd2luZG93Lm5hdmlnYXRvci5zdGFuZGFsb25lJiYhcykmJihvPSExKX1vJiYocj1cInVuZGVmaW5lZFwiPT10eXBlb2Ygbi5jcmVhdGVHYWluP24uY3JlYXRlR2Fpbk5vZGUoKTpuLmNyZWF0ZUdhaW4oKSxyLmdhaW4udmFsdWU9MSxyLmNvbm5lY3Qobi5kZXN0aW5hdGlvbikpfXZhciBuPW51bGwsbz0hMCx0PSExLHI9bnVsbCx1PVwiY2FucGxheXRocm91Z2hcIjtlKCk7dmFyIGQ9ZnVuY3Rpb24oKXt0aGlzLmluaXQoKX07ZC5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzfHxhO3JldHVybiBlLl9jb2RlY3M9e30sZS5faG93bHM9W10sZS5fbXV0ZWQ9ITEsZS5fdm9sdW1lPTEsZS5zdGF0ZT1uP24uc3RhdGV8fFwicnVubmluZ1wiOlwicnVubmluZ1wiLGUuYXV0b1N1c3BlbmQ9ITAsZS5fYXV0b1N1c3BlbmQoKSxlLm1vYmlsZUF1dG9FbmFibGU9ITAsZS5ub0F1ZGlvPXQsZS51c2luZ1dlYkF1ZGlvPW8sZS5jdHg9bix0fHxlLl9zZXR1cENvZGVjcygpLGV9LHZvbHVtZTpmdW5jdGlvbihlKXt2YXIgbj10aGlzfHxhO2lmKGU9cGFyc2VGbG9hdChlKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgZSYmZT49MCYmMT49ZSl7bi5fdm9sdW1lPWUsbyYmKHIuZ2Fpbi52YWx1ZT1lKTtmb3IodmFyIHQ9MDt0PG4uX2hvd2xzLmxlbmd0aDt0KyspaWYoIW4uX2hvd2xzW3RdLl93ZWJBdWRpbylmb3IodmFyIHU9bi5faG93bHNbdF0uX2dldFNvdW5kSWRzKCksZD0wO2Q8dS5sZW5ndGg7ZCsrKXt2YXIgaT1uLl9ob3dsc1t0XS5fc291bmRCeUlkKHVbZF0pO2kmJmkuX25vZGUmJihpLl9ub2RlLnZvbHVtZT1pLl92b2x1bWUqZSl9cmV0dXJuIG59cmV0dXJuIG4uX3ZvbHVtZX0sbXV0ZTpmdW5jdGlvbihlKXt2YXIgbj10aGlzfHxhO24uX211dGVkPWUsbyYmKHIuZ2Fpbi52YWx1ZT1lPzA6bi5fdm9sdW1lKTtmb3IodmFyIHQ9MDt0PG4uX2hvd2xzLmxlbmd0aDt0KyspaWYoIW4uX2hvd2xzW3RdLl93ZWJBdWRpbylmb3IodmFyIHU9bi5faG93bHNbdF0uX2dldFNvdW5kSWRzKCksZD0wO2Q8dS5sZW5ndGg7ZCsrKXt2YXIgaT1uLl9ob3dsc1t0XS5fc291bmRCeUlkKHVbZF0pO2kmJmkuX25vZGUmJihpLl9ub2RlLm11dGVkPWU/ITA6aS5fbXV0ZWQpfXJldHVybiBufSx1bmxvYWQ6ZnVuY3Rpb24oKXtmb3IodmFyIG89dGhpc3x8YSx0PW8uX2hvd2xzLmxlbmd0aC0xO3Q+PTA7dC0tKW8uX2hvd2xzW3RdLnVubG9hZCgpO3JldHVybiBvLnVzaW5nV2ViQXVkaW8mJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNsb3NlJiYoby5jdHg9bnVsbCxuLmNsb3NlKCksZSgpLG8uY3R4PW4pLG99LGNvZGVjczpmdW5jdGlvbihlKXtyZXR1cm4odGhpc3x8YSkuX2NvZGVjc1tlXX0sX3NldHVwQ29kZWNzOmZ1bmN0aW9uKCl7dmFyIGU9dGhpc3x8YSxuPW5ldyBBdWRpbyxvPW4uY2FuUGxheVR5cGUoXCJhdWRpby9tcGVnO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx0PS9PUFJcXC8vLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7cmV0dXJuIGUuX2NvZGVjcz17bXAzOiEodHx8IW8mJiFuLmNhblBsYXlUeXBlKFwiYXVkaW8vbXAzO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSksbXBlZzohIW8sb3B1czohIW4uY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwib3B1c1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksb2dnOiEhbi5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG9nYTohIW4uY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx3YXY6ISFuLmNhblBsYXlUeXBlKCdhdWRpby93YXY7IGNvZGVjcz1cIjFcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLGFhYzohIW4uY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG00YTohIShuLmNhblBsYXlUeXBlKFwiYXVkaW8veC1tNGE7XCIpfHxuLmNhblBsYXlUeXBlKFwiYXVkaW8vbTRhO1wiKXx8bi5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG1wNDohIShuLmNhblBsYXlUeXBlKFwiYXVkaW8veC1tcDQ7XCIpfHxuLmNhblBsYXlUeXBlKFwiYXVkaW8vbXA0O1wiKXx8bi5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikpLnJlcGxhY2UoL15ubyQvLFwiXCIpLHdlYmE6ISFuLmNhblBsYXlUeXBlKCdhdWRpby93ZWJtOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLHdlYm06ISFuLmNhblBsYXlUeXBlKCdhdWRpby93ZWJtOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLGRvbGJ5OiEhbi5jYW5QbGF5VHlwZSgnYXVkaW8vbXA0OyBjb2RlY3M9XCJlYy0zXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKX0sZX0sX2VuYWJsZU1vYmlsZUF1ZGlvOmZ1bmN0aW9uKCl7dmFyIGU9dGhpc3x8YSxvPS9pUGhvbmV8aVBhZHxpUG9kfEFuZHJvaWR8QmxhY2tCZXJyeXxCQjEwfFNpbGsvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLHQ9ISEoXCJvbnRvdWNoZW5kXCJpbiB3aW5kb3d8fG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cz4wfHxuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cz4wKTtpZighbnx8IWUuX21vYmlsZUVuYWJsZWQmJm8mJnQpe2UuX21vYmlsZUVuYWJsZWQ9ITE7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgbz1uLmNyZWF0ZUJ1ZmZlcigxLDEsMjIwNTApLHQ9bi5jcmVhdGVCdWZmZXJTb3VyY2UoKTt0LmJ1ZmZlcj1vLHQuY29ubmVjdChuLmRlc3RpbmF0aW9uKSxcInVuZGVmaW5lZFwiPT10eXBlb2YgdC5zdGFydD90Lm5vdGVPbigwKTp0LnN0YXJ0KDApLHQub25lbmRlZD1mdW5jdGlvbigpe3QuZGlzY29ubmVjdCgwKSxlLl9tb2JpbGVFbmFibGVkPSEwLGUubW9iaWxlQXV0b0VuYWJsZT0hMSxkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixyLCEwKX19O3JldHVybiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixyLCEwKSxlfX0sX2F1dG9TdXNwZW5kOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZihlLmF1dG9TdXNwZW5kJiZuJiZcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5zdXNwZW5kJiZvKXtmb3IodmFyIHQ9MDt0PGUuX2hvd2xzLmxlbmd0aDt0KyspaWYoZS5faG93bHNbdF0uX3dlYkF1ZGlvKWZvcih2YXIgcj0wO3I8ZS5faG93bHNbdF0uX3NvdW5kcy5sZW5ndGg7cisrKWlmKCFlLl9ob3dsc1t0XS5fc291bmRzW3JdLl9wYXVzZWQpcmV0dXJuIGU7cmV0dXJuIGUuX3N1c3BlbmRUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5hdXRvU3VzcGVuZCYmKGUuX3N1c3BlbmRUaW1lcj1udWxsLGUuc3RhdGU9XCJzdXNwZW5kaW5nXCIsbi5zdXNwZW5kKCkudGhlbihmdW5jdGlvbigpe2Uuc3RhdGU9XCJzdXNwZW5kZWRcIixlLl9yZXN1bWVBZnRlclN1c3BlbmQmJihkZWxldGUgZS5fcmVzdW1lQWZ0ZXJTdXNwZW5kLGUuX2F1dG9SZXN1bWUoKSl9KSl9LDNlNCksZX19LF9hdXRvUmVzdW1lOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZihuJiZcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5yZXN1bWUmJm8pcmV0dXJuXCJydW5uaW5nXCI9PT1lLnN0YXRlJiZlLl9zdXNwZW5kVGltZXI/KGNsZWFyVGltZW91dChlLl9zdXNwZW5kVGltZXIpLGUuX3N1c3BlbmRUaW1lcj1udWxsKTpcInN1c3BlbmRlZFwiPT09ZS5zdGF0ZT8oZS5zdGF0ZT1cInJlc3VtaW5nXCIsbi5yZXN1bWUoKS50aGVuKGZ1bmN0aW9uKCl7ZS5zdGF0ZT1cInJ1bm5pbmdcIn0pLGUuX3N1c3BlbmRUaW1lciYmKGNsZWFyVGltZW91dChlLl9zdXNwZW5kVGltZXIpLGUuX3N1c3BlbmRUaW1lcj1udWxsKSk6XCJzdXNwZW5kaW5nXCI9PT1lLnN0YXRlJiYoZS5fcmVzdW1lQWZ0ZXJTdXNwZW5kPSEwKSxlfX07dmFyIGE9bmV3IGQsaT1mdW5jdGlvbihlKXt2YXIgbj10aGlzO3JldHVybiBlLnNyYyYmMCE9PWUuc3JjLmxlbmd0aD92b2lkIG4uaW5pdChlKTp2b2lkIGNvbnNvbGUuZXJyb3IoXCJBbiBhcnJheSBvZiBzb3VyY2UgZmlsZXMgbXVzdCBiZSBwYXNzZWQgd2l0aCBhbnkgbmV3IEhvd2wuXCIpfTtpLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbihlKXt2YXIgdD10aGlzO3JldHVybiB0Ll9hdXRvcGxheT1lLmF1dG9wbGF5fHwhMSx0Ll9mb3JtYXQ9XCJzdHJpbmdcIiE9dHlwZW9mIGUuZm9ybWF0P2UuZm9ybWF0OltlLmZvcm1hdF0sdC5faHRtbDU9ZS5odG1sNXx8ITEsdC5fbXV0ZWQ9ZS5tdXRlfHwhMSx0Ll9sb29wPWUubG9vcHx8ITEsdC5fcG9vbD1lLnBvb2x8fDUsdC5fcHJlbG9hZD1cImJvb2xlYW5cIj09dHlwZW9mIGUucHJlbG9hZD9lLnByZWxvYWQ6ITAsdC5fcmF0ZT1lLnJhdGV8fDEsdC5fc3ByaXRlPWUuc3ByaXRlfHx7fSx0Ll9zcmM9XCJzdHJpbmdcIiE9dHlwZW9mIGUuc3JjP2Uuc3JjOltlLnNyY10sdC5fdm9sdW1lPXZvaWQgMCE9PWUudm9sdW1lP2Uudm9sdW1lOjEsdC5fZHVyYXRpb249MCx0Ll9sb2FkZWQ9ITEsdC5fc291bmRzPVtdLHQuX2VuZFRpbWVycz17fSx0Ll9xdWV1ZT1bXSx0Ll9vbmVuZD1lLm9uZW5kP1t7Zm46ZS5vbmVuZH1dOltdLHQuX29uZmFkZT1lLm9uZmFkZT9be2ZuOmUub25mYWRlfV06W10sdC5fb25sb2FkPWUub25sb2FkP1t7Zm46ZS5vbmxvYWR9XTpbXSx0Ll9vbmxvYWRlcnJvcj1lLm9ubG9hZGVycm9yP1t7Zm46ZS5vbmxvYWRlcnJvcn1dOltdLHQuX29ucGF1c2U9ZS5vbnBhdXNlP1t7Zm46ZS5vbnBhdXNlfV06W10sdC5fb25wbGF5PWUub25wbGF5P1t7Zm46ZS5vbnBsYXl9XTpbXSx0Ll9vbnN0b3A9ZS5vbnN0b3A/W3tmbjplLm9uc3RvcH1dOltdLHQuX29ubXV0ZT1lLm9ubXV0ZT9be2ZuOmUub25tdXRlfV06W10sdC5fb252b2x1bWU9ZS5vbnZvbHVtZT9be2ZuOmUub252b2x1bWV9XTpbXSx0Ll9vbnJhdGU9ZS5vbnJhdGU/W3tmbjplLm9ucmF0ZX1dOltdLHQuX29uc2Vlaz1lLm9uc2Vlaz9be2ZuOmUub25zZWVrfV06W10sdC5fd2ViQXVkaW89byYmIXQuX2h0bWw1LFwidW5kZWZpbmVkXCIhPXR5cGVvZiBuJiZuJiZhLm1vYmlsZUF1dG9FbmFibGUmJmEuX2VuYWJsZU1vYmlsZUF1ZGlvKCksYS5faG93bHMucHVzaCh0KSx0Ll9wcmVsb2FkJiZ0LmxvYWQoKSx0fSxsb2FkOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxuPW51bGw7aWYodClyZXR1cm4gdm9pZCBlLl9lbWl0KFwibG9hZGVycm9yXCIsbnVsbCxcIk5vIGF1ZGlvIHN1cHBvcnQuXCIpO1wic3RyaW5nXCI9PXR5cGVvZiBlLl9zcmMmJihlLl9zcmM9W2UuX3NyY10pO2Zvcih2YXIgbz0wO288ZS5fc3JjLmxlbmd0aDtvKyspe3ZhciByLHU7aWYoZS5fZm9ybWF0JiZlLl9mb3JtYXRbb10/cj1lLl9mb3JtYXRbb106KHU9ZS5fc3JjW29dLHI9L15kYXRhOmF1ZGlvXFwvKFteOyxdKyk7L2kuZXhlYyh1KSxyfHwocj0vXFwuKFteLl0rKSQvLmV4ZWModS5zcGxpdChcIj9cIiwxKVswXSkpLHImJihyPXJbMV0udG9Mb3dlckNhc2UoKSkpLGEuY29kZWNzKHIpKXtuPWUuX3NyY1tvXTticmVha319cmV0dXJuIG4/KGUuX3NyYz1uLFwiaHR0cHM6XCI9PT13aW5kb3cubG9jYXRpb24ucHJvdG9jb2wmJlwiaHR0cDpcIj09PW4uc2xpY2UoMCw1KSYmKGUuX2h0bWw1PSEwLGUuX3dlYkF1ZGlvPSExKSxuZXcgXyhlKSxlLl93ZWJBdWRpbyYmbChlKSxlKTp2b2lkIGUuX2VtaXQoXCJsb2FkZXJyb3JcIixudWxsLFwiTm8gY29kZWMgc3VwcG9ydCBmb3Igc2VsZWN0ZWQgYXVkaW8gc291cmNlcy5cIil9LHBsYXk6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcyx0PWFyZ3VtZW50cyxyPW51bGw7aWYoXCJudW1iZXJcIj09dHlwZW9mIGUpcj1lLGU9bnVsbDtlbHNlIGlmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlKXtlPVwiX19kZWZhdWx0XCI7Zm9yKHZhciBkPTAsaT0wO2k8by5fc291bmRzLmxlbmd0aDtpKyspby5fc291bmRzW2ldLl9wYXVzZWQmJiFvLl9zb3VuZHNbaV0uX2VuZGVkJiYoZCsrLHI9by5fc291bmRzW2ldLl9pZCk7MT09PWQ/ZT1udWxsOnI9bnVsbH12YXIgXz1yP28uX3NvdW5kQnlJZChyKTpvLl9pbmFjdGl2ZVNvdW5kKCk7aWYoIV8pcmV0dXJuIG51bGw7aWYociYmIWUmJihlPV8uX3Nwcml0ZXx8XCJfX2RlZmF1bHRcIiksIW8uX2xvYWRlZCYmIW8uX3Nwcml0ZVtlXSlyZXR1cm4gby5fcXVldWUucHVzaCh7ZXZlbnQ6XCJwbGF5XCIsYWN0aW9uOmZ1bmN0aW9uKCl7by5wbGF5KG8uX3NvdW5kQnlJZChfLl9pZCk/Xy5faWQ6dm9pZCAwKX19KSxfLl9pZDtpZihyJiYhXy5fcGF1c2VkKXJldHVybiBfLl9pZDtvLl93ZWJBdWRpbyYmYS5fYXV0b1Jlc3VtZSgpO3ZhciBzPV8uX3NlZWs+MD9fLl9zZWVrOm8uX3Nwcml0ZVtlXVswXS8xZTMsbD0oby5fc3ByaXRlW2VdWzBdK28uX3Nwcml0ZVtlXVsxXSkvMWUzLXMsZj0xZTMqbC9NYXRoLmFicyhfLl9yYXRlKTtmIT09MS8wJiYoby5fZW5kVGltZXJzW18uX2lkXT1zZXRUaW1lb3V0KG8uX2VuZGVkLmJpbmQobyxfKSxmKSksXy5fcGF1c2VkPSExLF8uX2VuZGVkPSExLF8uX3Nwcml0ZT1lLF8uX3NlZWs9cyxfLl9zdGFydD1vLl9zcHJpdGVbZV1bMF0vMWUzLF8uX3N0b3A9KG8uX3Nwcml0ZVtlXVswXStvLl9zcHJpdGVbZV1bMV0pLzFlMyxfLl9sb29wPSEoIV8uX2xvb3AmJiFvLl9zcHJpdGVbZV1bMl0pO3ZhciBjPV8uX25vZGU7aWYoby5fd2ViQXVkaW8pe3ZhciBwPWZ1bmN0aW9uKCl7by5fcmVmcmVzaEJ1ZmZlcihfKTt2YXIgZT1fLl9tdXRlZHx8by5fbXV0ZWQ/MDpfLl92b2x1bWUqYS52b2x1bWUoKTtjLmdhaW4uc2V0VmFsdWVBdFRpbWUoZSxuLmN1cnJlbnRUaW1lKSxfLl9wbGF5U3RhcnQ9bi5jdXJyZW50VGltZSxcInVuZGVmaW5lZFwiPT10eXBlb2YgYy5idWZmZXJTb3VyY2Uuc3RhcnQ/Xy5fbG9vcD9jLmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLHMsODY0MDApOmMuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAscyxsKTpfLl9sb29wP2MuYnVmZmVyU291cmNlLnN0YXJ0KDAscyw4NjQwMCk6Yy5idWZmZXJTb3VyY2Uuc3RhcnQoMCxzLGwpLG8uX2VuZFRpbWVyc1tfLl9pZF18fGY9PT0xLzB8fChvLl9lbmRUaW1lcnNbXy5faWRdPXNldFRpbWVvdXQoby5fZW5kZWQuYmluZChvLF8pLGYpKSx0WzFdfHxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7by5fZW1pdChcInBsYXlcIixfLl9pZCl9LDApfTtvLl9sb2FkZWQ/cCgpOihvLm9uY2UoXCJsb2FkXCIscCxfLl9pZCksby5fY2xlYXJUaW1lcihfLl9pZCkpfWVsc2V7dmFyIG09ZnVuY3Rpb24oKXtjLmN1cnJlbnRUaW1lPXMsYy5tdXRlZD1fLl9tdXRlZHx8by5fbXV0ZWR8fGEuX211dGVkfHxjLm11dGVkLGMudm9sdW1lPV8uX3ZvbHVtZSphLnZvbHVtZSgpLGMucGxheWJhY2tSYXRlPV8uX3JhdGUsc2V0VGltZW91dChmdW5jdGlvbigpe2MucGxheSgpLHRbMV18fG8uX2VtaXQoXCJwbGF5XCIsXy5faWQpfSwwKX07aWYoND09PWMucmVhZHlTdGF0ZXx8IWMucmVhZHlTdGF0ZSYmbmF2aWdhdG9yLmlzQ29jb29uSlMpbSgpO2Vsc2V7dmFyIHY9ZnVuY3Rpb24oKXtmIT09MS8wJiYoby5fZW5kVGltZXJzW18uX2lkXT1zZXRUaW1lb3V0KG8uX2VuZGVkLmJpbmQobyxfKSxmKSksbSgpLGMucmVtb3ZlRXZlbnRMaXN0ZW5lcih1LHYsITEpfTtjLmFkZEV2ZW50TGlzdGVuZXIodSx2LCExKSxvLl9jbGVhclRpbWVyKF8uX2lkKX19cmV0dXJuIF8uX2lkfSxwYXVzZTpmdW5jdGlvbihlKXt2YXIgbj10aGlzO2lmKCFuLl9sb2FkZWQpcmV0dXJuIG4uX3F1ZXVlLnB1c2goe2V2ZW50OlwicGF1c2VcIixhY3Rpb246ZnVuY3Rpb24oKXtuLnBhdXNlKGUpfX0pLG47Zm9yKHZhciBvPW4uX2dldFNvdW5kSWRzKGUpLHQ9MDt0PG8ubGVuZ3RoO3QrKyl7bi5fY2xlYXJUaW1lcihvW3RdKTt2YXIgcj1uLl9zb3VuZEJ5SWQob1t0XSk7aWYociYmIXIuX3BhdXNlZCl7aWYoci5fc2Vlaz1uLnNlZWsob1t0XSksci5fcGF1c2VkPSEwLG4uX3N0b3BGYWRlKG9bdF0pLHIuX25vZGUpaWYobi5fd2ViQXVkaW8pe2lmKCFyLl9ub2RlLmJ1ZmZlclNvdXJjZSlyZXR1cm4gbjtcInVuZGVmaW5lZFwiPT10eXBlb2Ygci5fbm9kZS5idWZmZXJTb3VyY2Uuc3RvcD9yLl9ub2RlLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApOnIuX25vZGUuYnVmZmVyU291cmNlLnN0b3AoMCksci5fbm9kZS5idWZmZXJTb3VyY2U9bnVsbH1lbHNlIGlzTmFOKHIuX25vZGUuZHVyYXRpb24pJiZyLl9ub2RlLmR1cmF0aW9uIT09MS8wfHxyLl9ub2RlLnBhdXNlKCk7YXJndW1lbnRzWzFdfHxuLl9lbWl0KFwicGF1c2VcIixyLl9pZCl9fXJldHVybiBufSxzdG9wOmZ1bmN0aW9uKGUpe3ZhciBuPXRoaXM7aWYoIW4uX2xvYWRlZClyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5fc291bmRzWzBdLl9zcHJpdGUmJm4uX3F1ZXVlLnB1c2goe2V2ZW50Olwic3RvcFwiLGFjdGlvbjpmdW5jdGlvbigpe24uc3RvcChlKX19KSxuO2Zvcih2YXIgbz1uLl9nZXRTb3VuZElkcyhlKSx0PTA7dDxvLmxlbmd0aDt0Kyspe24uX2NsZWFyVGltZXIob1t0XSk7dmFyIHI9bi5fc291bmRCeUlkKG9bdF0pO2lmKHImJiFyLl9wYXVzZWQpe2lmKHIuX3NlZWs9ci5fc3RhcnR8fDAsci5fcGF1c2VkPSEwLHIuX2VuZGVkPSEwLG4uX3N0b3BGYWRlKG9bdF0pLHIuX25vZGUpaWYobi5fd2ViQXVkaW8pe2lmKCFyLl9ub2RlLmJ1ZmZlclNvdXJjZSlyZXR1cm4gbjtcInVuZGVmaW5lZFwiPT10eXBlb2Ygci5fbm9kZS5idWZmZXJTb3VyY2Uuc3RvcD9yLl9ub2RlLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApOnIuX25vZGUuYnVmZmVyU291cmNlLnN0b3AoMCksci5fbm9kZS5idWZmZXJTb3VyY2U9bnVsbH1lbHNlIGlzTmFOKHIuX25vZGUuZHVyYXRpb24pJiZyLl9ub2RlLmR1cmF0aW9uIT09MS8wfHwoci5fbm9kZS5wYXVzZSgpLHIuX25vZGUuY3VycmVudFRpbWU9ci5fc3RhcnR8fDApO24uX2VtaXQoXCJzdG9wXCIsci5faWQpfX1yZXR1cm4gbn0sbXV0ZTpmdW5jdGlvbihlLG8pe3ZhciB0PXRoaXM7aWYoIXQuX2xvYWRlZClyZXR1cm4gdC5fcXVldWUucHVzaCh7ZXZlbnQ6XCJtdXRlXCIsYWN0aW9uOmZ1bmN0aW9uKCl7dC5tdXRlKGUsbyl9fSksdDtpZihcInVuZGVmaW5lZFwiPT10eXBlb2Ygbyl7aWYoXCJib29sZWFuXCIhPXR5cGVvZiBlKXJldHVybiB0Ll9tdXRlZDt0Ll9tdXRlZD1lfWZvcih2YXIgcj10Ll9nZXRTb3VuZElkcyhvKSx1PTA7dTxyLmxlbmd0aDt1Kyspe3ZhciBkPXQuX3NvdW5kQnlJZChyW3VdKTtkJiYoZC5fbXV0ZWQ9ZSx0Ll93ZWJBdWRpbyYmZC5fbm9kZT9kLl9ub2RlLmdhaW4uc2V0VmFsdWVBdFRpbWUoZT8wOmQuX3ZvbHVtZSphLnZvbHVtZSgpLG4uY3VycmVudFRpbWUpOmQuX25vZGUmJihkLl9ub2RlLm11dGVkPWEuX211dGVkPyEwOmUpLHQuX2VtaXQoXCJtdXRlXCIsZC5faWQpKX1yZXR1cm4gdH0sdm9sdW1lOmZ1bmN0aW9uKCl7dmFyIGUsbyx0PXRoaXMscj1hcmd1bWVudHM7aWYoMD09PXIubGVuZ3RoKXJldHVybiB0Ll92b2x1bWU7aWYoMT09PXIubGVuZ3RoKXt2YXIgdT10Ll9nZXRTb3VuZElkcygpLGQ9dS5pbmRleE9mKHJbMF0pO2Q+PTA/bz1wYXJzZUludChyWzBdLDEwKTplPXBhcnNlRmxvYXQoclswXSl9ZWxzZSByLmxlbmd0aD49MiYmKGU9cGFyc2VGbG9hdChyWzBdKSxvPXBhcnNlSW50KHJbMV0sMTApKTt2YXIgaTtpZighKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBlJiZlPj0wJiYxPj1lKSlyZXR1cm4gaT1vP3QuX3NvdW5kQnlJZChvKTp0Ll9zb3VuZHNbMF0saT9pLl92b2x1bWU6MDtpZighdC5fbG9hZGVkKXJldHVybiB0Ll9xdWV1ZS5wdXNoKHtldmVudDpcInZvbHVtZVwiLGFjdGlvbjpmdW5jdGlvbigpe3Qudm9sdW1lLmFwcGx5KHQscil9fSksdDtcInVuZGVmaW5lZFwiPT10eXBlb2YgbyYmKHQuX3ZvbHVtZT1lKSxvPXQuX2dldFNvdW5kSWRzKG8pO2Zvcih2YXIgXz0wO188by5sZW5ndGg7XysrKWk9dC5fc291bmRCeUlkKG9bX10pLGkmJihpLl92b2x1bWU9ZSxyWzJdfHx0Ll9zdG9wRmFkZShvW19dKSx0Ll93ZWJBdWRpbyYmaS5fbm9kZSYmIWkuX211dGVkP2kuX25vZGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZShlKmEudm9sdW1lKCksbi5jdXJyZW50VGltZSk6aS5fbm9kZSYmIWkuX211dGVkJiYoaS5fbm9kZS52b2x1bWU9ZSphLnZvbHVtZSgpKSx0Ll9lbWl0KFwidm9sdW1lXCIsaS5faWQpKTtyZXR1cm4gdH0sZmFkZTpmdW5jdGlvbihlLG8sdCxyKXt2YXIgdT10aGlzO2lmKCF1Ll9sb2FkZWQpcmV0dXJuIHUuX3F1ZXVlLnB1c2goe2V2ZW50OlwiZmFkZVwiLGFjdGlvbjpmdW5jdGlvbigpe3UuZmFkZShlLG8sdCxyKX19KSx1O3Uudm9sdW1lKGUscik7Zm9yKHZhciBkPXUuX2dldFNvdW5kSWRzKHIpLGE9MDthPGQubGVuZ3RoO2ErKyl7dmFyIGk9dS5fc291bmRCeUlkKGRbYV0pO2lmKGkpaWYocnx8dS5fc3RvcEZhZGUoZFthXSksdS5fd2ViQXVkaW8mJiFpLl9tdXRlZCl7dmFyIF89bi5jdXJyZW50VGltZSxzPV8rdC8xZTM7aS5fdm9sdW1lPWUsaS5fbm9kZS5nYWluLnNldFZhbHVlQXRUaW1lKGUsXyksaS5fbm9kZS5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKG8scyksaS5fdGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKGUsdCl7ZGVsZXRlIHQuX3RpbWVvdXQsc2V0VGltZW91dChmdW5jdGlvbigpe3QuX3ZvbHVtZT1vLHUuX2VtaXQoXCJmYWRlXCIsZSl9LHMtbi5jdXJyZW50VGltZT4wP01hdGguY2VpbCgxZTMqKHMtbi5jdXJyZW50VGltZSkpOjApfS5iaW5kKHUsZFthXSxpKSx0KX1lbHNle3ZhciBsPU1hdGguYWJzKGUtbyksZj1lPm8/XCJvdXRcIjpcImluXCIsYz1sLy4wMSxwPXQvYzshZnVuY3Rpb24oKXt2YXIgbj1lO2kuX2ludGVydmFsPXNldEludGVydmFsKGZ1bmN0aW9uKGUsdCl7bis9XCJpblwiPT09Zj8uMDE6LS4wMSxuPU1hdGgubWF4KDAsbiksbj1NYXRoLm1pbigxLG4pLG49TWF0aC5yb3VuZCgxMDAqbikvMTAwLHUudm9sdW1lKG4sZSwhMCksbj09PW8mJihjbGVhckludGVydmFsKHQuX2ludGVydmFsKSxkZWxldGUgdC5faW50ZXJ2YWwsdS5fZW1pdChcImZhZGVcIixlKSl9LmJpbmQodSxkW2FdLGkpLHApfSgpfX1yZXR1cm4gdX0sX3N0b3BGYWRlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXMsdD1vLl9zb3VuZEJ5SWQoZSk7cmV0dXJuIHQuX2ludGVydmFsPyhjbGVhckludGVydmFsKHQuX2ludGVydmFsKSxkZWxldGUgdC5faW50ZXJ2YWwsby5fZW1pdChcImZhZGVcIixlKSk6dC5fdGltZW91dCYmKGNsZWFyVGltZW91dCh0Ll90aW1lb3V0KSxkZWxldGUgdC5fdGltZW91dCx0Ll9ub2RlLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKG4uY3VycmVudFRpbWUpLG8uX2VtaXQoXCJmYWRlXCIsZSkpLG99LGxvb3A6ZnVuY3Rpb24oKXt2YXIgZSxuLG8sdD10aGlzLHI9YXJndW1lbnRzO2lmKDA9PT1yLmxlbmd0aClyZXR1cm4gdC5fbG9vcDtpZigxPT09ci5sZW5ndGgpe2lmKFwiYm9vbGVhblwiIT10eXBlb2YgclswXSlyZXR1cm4gbz10Ll9zb3VuZEJ5SWQocGFyc2VJbnQoclswXSwxMCkpLG8/by5fbG9vcDohMTtlPXJbMF0sdC5fbG9vcD1lfWVsc2UgMj09PXIubGVuZ3RoJiYoZT1yWzBdLG49cGFyc2VJbnQoclsxXSwxMCkpO2Zvcih2YXIgdT10Ll9nZXRTb3VuZElkcyhuKSxkPTA7ZDx1Lmxlbmd0aDtkKyspbz10Ll9zb3VuZEJ5SWQodVtkXSksbyYmKG8uX2xvb3A9ZSx0Ll93ZWJBdWRpbyYmby5fbm9kZSYmby5fbm9kZS5idWZmZXJTb3VyY2UmJihvLl9ub2RlLmJ1ZmZlclNvdXJjZS5sb29wPWUpKTtyZXR1cm4gdH0scmF0ZTpmdW5jdGlvbigpe3ZhciBlLG4sbz10aGlzLHQ9YXJndW1lbnRzO2lmKDA9PT10Lmxlbmd0aCluPW8uX3NvdW5kc1swXS5faWQ7ZWxzZSBpZigxPT09dC5sZW5ndGgpe3ZhciByPW8uX2dldFNvdW5kSWRzKCksdT1yLmluZGV4T2YodFswXSk7dT49MD9uPXBhcnNlSW50KHRbMF0sMTApOmU9cGFyc2VGbG9hdCh0WzBdKX1lbHNlIDI9PT10Lmxlbmd0aCYmKGU9cGFyc2VGbG9hdCh0WzBdKSxuPXBhcnNlSW50KHRbMV0sMTApKTt2YXIgZDtpZihcIm51bWJlclwiIT10eXBlb2YgZSlyZXR1cm4gZD1vLl9zb3VuZEJ5SWQobiksZD9kLl9yYXRlOm8uX3JhdGU7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5fcXVldWUucHVzaCh7ZXZlbnQ6XCJyYXRlXCIsYWN0aW9uOmZ1bmN0aW9uKCl7by5yYXRlLmFwcGx5KG8sdCl9fSksbztcInVuZGVmaW5lZFwiPT10eXBlb2YgbiYmKG8uX3JhdGU9ZSksbj1vLl9nZXRTb3VuZElkcyhuKTtmb3IodmFyIGE9MDthPG4ubGVuZ3RoO2ErKylpZihkPW8uX3NvdW5kQnlJZChuW2FdKSl7ZC5fcmF0ZT1lLG8uX3dlYkF1ZGlvJiZkLl9ub2RlJiZkLl9ub2RlLmJ1ZmZlclNvdXJjZT9kLl9ub2RlLmJ1ZmZlclNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWU9ZTpkLl9ub2RlJiYoZC5fbm9kZS5wbGF5YmFja1JhdGU9ZSk7dmFyIGk9by5zZWVrKG5bYV0pLF89KG8uX3Nwcml0ZVtkLl9zcHJpdGVdWzBdK28uX3Nwcml0ZVtkLl9zcHJpdGVdWzFdKS8xZTMtaSxzPTFlMypfL01hdGguYWJzKGQuX3JhdGUpO28uX2NsZWFyVGltZXIoblthXSksby5fZW5kVGltZXJzW25bYV1dPXNldFRpbWVvdXQoby5fZW5kZWQuYmluZChvLGQpLHMpLG8uX2VtaXQoXCJyYXRlXCIsZC5faWQpfXJldHVybiBvfSxzZWVrOmZ1bmN0aW9uKCl7dmFyIGUsbyx0PXRoaXMscj1hcmd1bWVudHM7aWYoMD09PXIubGVuZ3RoKW89dC5fc291bmRzWzBdLl9pZDtlbHNlIGlmKDE9PT1yLmxlbmd0aCl7dmFyIHU9dC5fZ2V0U291bmRJZHMoKSxkPXUuaW5kZXhPZihyWzBdKTtkPj0wP289cGFyc2VJbnQoclswXSwxMCk6KG89dC5fc291bmRzWzBdLl9pZCxlPXBhcnNlRmxvYXQoclswXSkpfWVsc2UgMj09PXIubGVuZ3RoJiYoZT1wYXJzZUZsb2F0KHJbMF0pLG89cGFyc2VJbnQoclsxXSwxMCkpO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBvKXJldHVybiB0O2lmKCF0Ll9sb2FkZWQpcmV0dXJuIHQuX3F1ZXVlLnB1c2goe2V2ZW50Olwic2Vla1wiLGFjdGlvbjpmdW5jdGlvbigpe3Quc2Vlay5hcHBseSh0LHIpfX0pLHQ7dmFyIGE9dC5fc291bmRCeUlkKG8pO2lmKGEpe2lmKCEoZT49MCkpcmV0dXJuIHQuX3dlYkF1ZGlvP2EuX3NlZWsrKHQucGxheWluZyhvKT9uLmN1cnJlbnRUaW1lLWEuX3BsYXlTdGFydDowKTphLl9ub2RlLmN1cnJlbnRUaW1lO3ZhciBpPXQucGxheWluZyhvKTtpJiZ0LnBhdXNlKG8sITApLGEuX3NlZWs9ZSx0Ll9jbGVhclRpbWVyKG8pLGkmJnQucGxheShvLCEwKSx0Ll9lbWl0KFwic2Vla1wiLG8pfXJldHVybiB0fSxwbGF5aW5nOmZ1bmN0aW9uKGUpe3ZhciBuPXRoaXMsbz1uLl9zb3VuZEJ5SWQoZSl8fG4uX3NvdW5kc1swXTtyZXR1cm4gbz8hby5fcGF1c2VkOiExfSxkdXJhdGlvbjpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9kdXJhdGlvbn0sdW5sb2FkOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPXRoaXMsbj1lLl9zb3VuZHMsbz0wO288bi5sZW5ndGg7bysrKXtuW29dLl9wYXVzZWR8fChlLnN0b3AobltvXS5faWQpLGUuX2VtaXQoXCJlbmRcIixuW29dLl9pZCkpLGUuX3dlYkF1ZGlvfHwobltvXS5fbm9kZS5zcmM9XCJcIixuW29dLl9ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLG5bb10uX2Vycm9yRm4sITEpLG5bb10uX25vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih1LG5bb10uX2xvYWRGbiwhMSkpLGRlbGV0ZSBuW29dLl9ub2RlLGUuX2NsZWFyVGltZXIobltvXS5faWQpO3ZhciB0PWEuX2hvd2xzLmluZGV4T2YoZSk7dD49MCYmYS5faG93bHMuc3BsaWNlKHQsMSl9cmV0dXJuIHMmJmRlbGV0ZSBzW2UuX3NyY10sZS5fc291bmRzPVtdLGU9bnVsbCxudWxsfSxvbjpmdW5jdGlvbihlLG4sbyx0KXt2YXIgcj10aGlzLHU9cltcIl9vblwiK2VdO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJnUucHVzaCh0P3tpZDpvLGZuOm4sb25jZTp0fTp7aWQ6byxmbjpufSkscn0sb2ZmOmZ1bmN0aW9uKGUsbixvKXt2YXIgdD10aGlzLHI9dFtcIl9vblwiK2VdO2lmKG4pe2Zvcih2YXIgdT0wO3U8ci5sZW5ndGg7dSsrKWlmKG49PT1yW3VdLmZuJiZvPT09clt1XS5pZCl7ci5zcGxpY2UodSwxKTticmVha319ZWxzZSBpZihlKXRbXCJfb25cIitlXT1bXTtlbHNlIGZvcih2YXIgZD1PYmplY3Qua2V5cyh0KSx1PTA7dTxkLmxlbmd0aDt1KyspMD09PWRbdV0uaW5kZXhPZihcIl9vblwiKSYmQXJyYXkuaXNBcnJheSh0W2RbdV1dKSYmKHRbZFt1XV09W10pO3JldHVybiB0fSxvbmNlOmZ1bmN0aW9uKGUsbixvKXt2YXIgdD10aGlzO3JldHVybiB0Lm9uKGUsbixvLDEpLHR9LF9lbWl0OmZ1bmN0aW9uKGUsbixvKXtmb3IodmFyIHQ9dGhpcyxyPXRbXCJfb25cIitlXSx1PXIubGVuZ3RoLTE7dT49MDt1LS0pclt1XS5pZCYmclt1XS5pZCE9PW4mJlwibG9hZFwiIT09ZXx8KHNldFRpbWVvdXQoZnVuY3Rpb24oZSl7ZS5jYWxsKHRoaXMsbixvKX0uYmluZCh0LHJbdV0uZm4pLDApLHJbdV0ub25jZSYmdC5vZmYoZSxyW3VdLmZuLHJbdV0uaWQpKTtyZXR1cm4gdH0sX2xvYWRRdWV1ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYoZS5fcXVldWUubGVuZ3RoPjApe3ZhciBuPWUuX3F1ZXVlWzBdO2Uub25jZShuLmV2ZW50LGZ1bmN0aW9uKCl7ZS5fcXVldWUuc2hpZnQoKSxlLl9sb2FkUXVldWUoKX0pLG4uYWN0aW9uKCl9cmV0dXJuIGV9LF9lbmRlZDpmdW5jdGlvbihlKXt2YXIgbz10aGlzLHQ9ZS5fc3ByaXRlLHI9ISghZS5fbG9vcCYmIW8uX3Nwcml0ZVt0XVsyXSk7aWYoby5fZW1pdChcImVuZFwiLGUuX2lkKSwhby5fd2ViQXVkaW8mJnImJm8uc3RvcChlLl9pZCkucGxheShlLl9pZCksby5fd2ViQXVkaW8mJnIpe28uX2VtaXQoXCJwbGF5XCIsZS5faWQpLGUuX3NlZWs9ZS5fc3RhcnR8fDAsZS5fcGxheVN0YXJ0PW4uY3VycmVudFRpbWU7dmFyIHU9MWUzKihlLl9zdG9wLWUuX3N0YXJ0KS9NYXRoLmFicyhlLl9yYXRlKTtvLl9lbmRUaW1lcnNbZS5faWRdPXNldFRpbWVvdXQoby5fZW5kZWQuYmluZChvLGUpLHUpfXJldHVybiBvLl93ZWJBdWRpbyYmIXImJihlLl9wYXVzZWQ9ITAsZS5fZW5kZWQ9ITAsZS5fc2Vlaz1lLl9zdGFydHx8MCxvLl9jbGVhclRpbWVyKGUuX2lkKSxlLl9ub2RlLmJ1ZmZlclNvdXJjZT1udWxsLGEuX2F1dG9TdXNwZW5kKCkpLG8uX3dlYkF1ZGlvfHxyfHxvLnN0b3AoZS5faWQpLG99LF9jbGVhclRpbWVyOmZ1bmN0aW9uKGUpe3ZhciBuPXRoaXM7cmV0dXJuIG4uX2VuZFRpbWVyc1tlXSYmKGNsZWFyVGltZW91dChuLl9lbmRUaW1lcnNbZV0pLGRlbGV0ZSBuLl9lbmRUaW1lcnNbZV0pLG59LF9zb3VuZEJ5SWQ6ZnVuY3Rpb24oZSl7Zm9yKHZhciBuPXRoaXMsbz0wO288bi5fc291bmRzLmxlbmd0aDtvKyspaWYoZT09PW4uX3NvdW5kc1tvXS5faWQpcmV0dXJuIG4uX3NvdW5kc1tvXTtyZXR1cm4gbnVsbH0sX2luYWN0aXZlU291bmQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2UuX2RyYWluKCk7Zm9yKHZhciBuPTA7bjxlLl9zb3VuZHMubGVuZ3RoO24rKylpZihlLl9zb3VuZHNbbl0uX2VuZGVkKXJldHVybiBlLl9zb3VuZHNbbl0ucmVzZXQoKTtyZXR1cm4gbmV3IF8oZSl9LF9kcmFpbjpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj1lLl9wb29sLG89MCx0PTA7aWYoIShlLl9zb3VuZHMubGVuZ3RoPG4pKXtmb3IodD0wO3Q8ZS5fc291bmRzLmxlbmd0aDt0KyspZS5fc291bmRzW3RdLl9lbmRlZCYmbysrO2Zvcih0PWUuX3NvdW5kcy5sZW5ndGgtMTt0Pj0wO3QtLSl7aWYobj49bylyZXR1cm47ZS5fc291bmRzW3RdLl9lbmRlZCYmKGUuX3dlYkF1ZGlvJiZlLl9zb3VuZHNbdF0uX25vZGUmJmUuX3NvdW5kc1t0XS5fbm9kZS5kaXNjb25uZWN0KDApLGUuX3NvdW5kcy5zcGxpY2UodCwxKSxvLS0pfX19LF9nZXRTb3VuZElkczpmdW5jdGlvbihlKXt2YXIgbj10aGlzO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlKXtmb3IodmFyIG89W10sdD0wO3Q8bi5fc291bmRzLmxlbmd0aDt0Kyspby5wdXNoKG4uX3NvdW5kc1t0XS5faWQpO3JldHVybiBvfXJldHVybltlXX0sX3JlZnJlc2hCdWZmZXI6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztyZXR1cm4gZS5fbm9kZS5idWZmZXJTb3VyY2U9bi5jcmVhdGVCdWZmZXJTb3VyY2UoKSxlLl9ub2RlLmJ1ZmZlclNvdXJjZS5idWZmZXI9c1tvLl9zcmNdLGUuX25vZGUuYnVmZmVyU291cmNlLmNvbm5lY3QoZS5fcGFubmVyP2UuX3Bhbm5lcjplLl9ub2RlKSxlLl9ub2RlLmJ1ZmZlclNvdXJjZS5sb29wPWUuX2xvb3AsZS5fbG9vcCYmKGUuX25vZGUuYnVmZmVyU291cmNlLmxvb3BTdGFydD1lLl9zdGFydHx8MCxlLl9ub2RlLmJ1ZmZlclNvdXJjZS5sb29wRW5kPWUuX3N0b3ApLGUuX25vZGUuYnVmZmVyU291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZT1vLl9yYXRlLG99fTt2YXIgXz1mdW5jdGlvbihlKXt0aGlzLl9wYXJlbnQ9ZSx0aGlzLmluaXQoKX07aWYoXy5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG49ZS5fcGFyZW50O3JldHVybiBlLl9tdXRlZD1uLl9tdXRlZCxlLl9sb29wPW4uX2xvb3AsZS5fdm9sdW1lPW4uX3ZvbHVtZSxlLl9tdXRlZD1uLl9tdXRlZCxlLl9yYXRlPW4uX3JhdGUsZS5fc2Vlaz0wLGUuX3BhdXNlZD0hMCxlLl9lbmRlZD0hMCxlLl9zcHJpdGU9XCJfX2RlZmF1bHRcIixlLl9pZD1NYXRoLnJvdW5kKERhdGUubm93KCkqTWF0aC5yYW5kb20oKSksbi5fc291bmRzLnB1c2goZSksZS5jcmVhdGUoKSxlfSxjcmVhdGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG89ZS5fcGFyZW50LHQ9YS5fbXV0ZWR8fGUuX211dGVkfHxlLl9wYXJlbnQuX211dGVkPzA6ZS5fdm9sdW1lKmEudm9sdW1lKCk7cmV0dXJuIG8uX3dlYkF1ZGlvPyhlLl9ub2RlPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLmNyZWF0ZUdhaW4/bi5jcmVhdGVHYWluTm9kZSgpOm4uY3JlYXRlR2FpbigpLGUuX25vZGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZSh0LG4uY3VycmVudFRpbWUpLGUuX25vZGUucGF1c2VkPSEwLGUuX25vZGUuY29ubmVjdChyKSk6KGUuX25vZGU9bmV3IEF1ZGlvLGUuX2Vycm9yRm49ZS5fZXJyb3JMaXN0ZW5lci5iaW5kKGUpLGUuX25vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZS5fZXJyb3JGbiwhMSksZS5fbG9hZEZuPWUuX2xvYWRMaXN0ZW5lci5iaW5kKGUpLGUuX25vZGUuYWRkRXZlbnRMaXN0ZW5lcih1LGUuX2xvYWRGbiwhMSksZS5fbm9kZS5zcmM9by5fc3JjLGUuX25vZGUucHJlbG9hZD1cImF1dG9cIixlLl9ub2RlLnZvbHVtZT10LGUuX25vZGUubG9hZCgpKSxlfSxyZXNldDpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj1lLl9wYXJlbnQ7cmV0dXJuIGUuX211dGVkPW4uX211dGVkLGUuX2xvb3A9bi5fbG9vcCxlLl92b2x1bWU9bi5fdm9sdW1lLGUuX211dGVkPW4uX211dGVkLGUuX3JhdGU9bi5fcmF0ZSxlLl9zZWVrPTAsZS5fcGF1c2VkPSEwLGUuX2VuZGVkPSEwLGUuX3Nwcml0ZT1cIl9fZGVmYXVsdFwiLGUuX2lkPU1hdGgucm91bmQoRGF0ZS5ub3coKSpNYXRoLnJhbmRvbSgpKSxlfSxfZXJyb3JMaXN0ZW5lcjpmdW5jdGlvbigpe3ZhciBlPXRoaXM7ZS5fbm9kZS5lcnJvciYmND09PWUuX25vZGUuZXJyb3IuY29kZSYmKGEubm9BdWRpbz0hMCksZS5fcGFyZW50Ll9lbWl0KFwibG9hZGVycm9yXCIsZS5faWQsZS5fbm9kZS5lcnJvcj9lLl9ub2RlLmVycm9yLmNvZGU6MCksZS5fbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIixlLl9lcnJvckxpc3RlbmVyLCExKX0sX2xvYWRMaXN0ZW5lcjpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj1lLl9wYXJlbnQ7bi5fZHVyYXRpb249TWF0aC5jZWlsKDEwKmUuX25vZGUuZHVyYXRpb24pLzEwLDA9PT1PYmplY3Qua2V5cyhuLl9zcHJpdGUpLmxlbmd0aCYmKG4uX3Nwcml0ZT17X19kZWZhdWx0OlswLDFlMypuLl9kdXJhdGlvbl19KSxuLl9sb2FkZWR8fChuLl9sb2FkZWQ9ITAsbi5fZW1pdChcImxvYWRcIiksbi5fbG9hZFF1ZXVlKCkpLG4uX2F1dG9wbGF5JiZuLnBsYXkoKSxlLl9ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIodSxlLl9sb2FkRm4sITEpfX0sbyl2YXIgcz17fSxsPWZ1bmN0aW9uKGUpe3ZhciBuPWUuX3NyYztpZihzW25dKXJldHVybiBlLl9kdXJhdGlvbj1zW25dLmR1cmF0aW9uLHZvaWQgcChlKTtpZigvXmRhdGE6W147XSs7YmFzZTY0LC8udGVzdChuKSl7d2luZG93LmF0b2I9d2luZG93LmF0b2J8fGZ1bmN0aW9uKGUpe2Zvcih2YXIgbixvLHQ9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVwiLHI9U3RyaW5nKGUpLnJlcGxhY2UoLz0rJC8sXCJcIiksdT0wLGQ9MCxhPVwiXCI7bz1yLmNoYXJBdChkKyspO35vJiYobj11JTQ/NjQqbitvOm8sdSsrJTQpP2ErPVN0cmluZy5mcm9tQ2hhckNvZGUoMjU1Jm4+PigtMip1JjYpKTowKW89dC5pbmRleE9mKG8pO3JldHVybiBhfTtmb3IodmFyIG89YXRvYihuLnNwbGl0KFwiLFwiKVsxXSksdD1uZXcgVWludDhBcnJheShvLmxlbmd0aCkscj0wO3I8by5sZW5ndGg7KytyKXRbcl09by5jaGFyQ29kZUF0KHIpO2ModC5idWZmZXIsZSl9ZWxzZXt2YXIgdT1uZXcgWE1MSHR0cFJlcXVlc3Q7dS5vcGVuKFwiR0VUXCIsbiwhMCksdS5yZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiLHUub25sb2FkPWZ1bmN0aW9uKCl7Yyh1LnJlc3BvbnNlLGUpfSx1Lm9uZXJyb3I9ZnVuY3Rpb24oKXtlLl93ZWJBdWRpbyYmKGUuX2h0bWw1PSEwLGUuX3dlYkF1ZGlvPSExLGUuX3NvdW5kcz1bXSxkZWxldGUgc1tuXSxlLmxvYWQoKSl9LGYodSl9fSxmPWZ1bmN0aW9uKGUpe3RyeXtlLnNlbmQoKX1jYXRjaChuKXtlLm9uZXJyb3IoKX19LGM9ZnVuY3Rpb24oZSxvKXtuLmRlY29kZUF1ZGlvRGF0YShlLGZ1bmN0aW9uKGUpe2UmJm8uX3NvdW5kcy5sZW5ndGg+MCYmKHNbby5fc3JjXT1lLHAobyxlKSl9LGZ1bmN0aW9uKCl7by5fZW1pdChcImxvYWRlcnJvclwiLG51bGwsXCJEZWNvZGluZyBhdWRpbyBkYXRhIGZhaWxlZC5cIil9KX0scD1mdW5jdGlvbihlLG4pe24mJiFlLl9kdXJhdGlvbiYmKGUuX2R1cmF0aW9uPW4uZHVyYXRpb24pLDA9PT1PYmplY3Qua2V5cyhlLl9zcHJpdGUpLmxlbmd0aCYmKGUuX3Nwcml0ZT17X19kZWZhdWx0OlswLDFlMyplLl9kdXJhdGlvbl19KSxlLl9sb2FkZWR8fChlLl9sb2FkZWQ9ITAsZS5fZW1pdChcImxvYWRcIiksZS5fbG9hZFF1ZXVlKCkpLGUuX2F1dG9wbGF5JiZlLnBsYXkoKX07XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoW10sZnVuY3Rpb24oKXtyZXR1cm57SG93bGVyOmEsSG93bDppfX0pLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzJiYoZXhwb3J0cy5Ib3dsZXI9YSxleHBvcnRzLkhvd2w9aSksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz8od2luZG93Lkhvd2xlckdsb2JhbD1kLHdpbmRvdy5Ib3dsZXI9YSx3aW5kb3cuSG93bD1pLHdpbmRvdy5Tb3VuZD1fKTpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsJiYoZ2xvYmFsLkhvd2xlckdsb2JhbD1kLGdsb2JhbC5Ib3dsZXI9YSxnbG9iYWwuSG93bD1pLGdsb2JhbC5Tb3VuZD1fKX0oKTtcbi8qISBFZmZlY3RzIFBsdWdpbiAqL1xuIWZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7SG93bGVyR2xvYmFsLnByb3RvdHlwZS5fcG9zPVswLDAsMF0sSG93bGVyR2xvYmFsLnByb3RvdHlwZS5fb3JpZW50YXRpb249WzAsMCwtMSwwLDEsMF0sSG93bGVyR2xvYmFsLnByb3RvdHlwZS5fdmVsb2NpdHk9WzAsMCwwXSxIb3dsZXJHbG9iYWwucHJvdG90eXBlLl9saXN0ZW5lckF0dHI9e2RvcHBsZXJGYWN0b3I6MSxzcGVlZE9mU291bmQ6MzQzLjN9LEhvd2xlckdsb2JhbC5wcm90b3R5cGUucG9zPWZ1bmN0aW9uKGUsbix0KXt2YXIgbz10aGlzO3JldHVybiBvLmN0eCYmby5jdHgubGlzdGVuZXI/KG49XCJudW1iZXJcIiE9dHlwZW9mIG4/by5fcG9zWzFdOm4sdD1cIm51bWJlclwiIT10eXBlb2YgdD9vLl9wb3NbMl06dCxcIm51bWJlclwiIT10eXBlb2YgZT9vLl9wb3M6KG8uX3Bvcz1bZSxuLHRdLG8uY3R4Lmxpc3RlbmVyLnNldFBvc2l0aW9uKG8uX3Bvc1swXSxvLl9wb3NbMV0sby5fcG9zWzJdKSxvKSk6b30sSG93bGVyR2xvYmFsLnByb3RvdHlwZS5vcmllbnRhdGlvbj1mdW5jdGlvbihlLG4sdCxvLHIsaSl7dmFyIGE9dGhpcztpZighYS5jdHh8fCFhLmN0eC5saXN0ZW5lcilyZXR1cm4gYTt2YXIgcD1hLl9vcmllbnRhdGlvbjtyZXR1cm4gbj1cIm51bWJlclwiIT10eXBlb2Ygbj9wWzFdOm4sdD1cIm51bWJlclwiIT10eXBlb2YgdD9wWzJdOnQsbz1cIm51bWJlclwiIT10eXBlb2Ygbz9wWzNdOm8scj1cIm51bWJlclwiIT10eXBlb2Ygcj9wWzRdOnIsaT1cIm51bWJlclwiIT10eXBlb2YgaT9wWzVdOmksXCJudW1iZXJcIiE9dHlwZW9mIGU/cDooYS5fb3JpZW50YXRpb249W2Usbix0LG8scixpXSxhLmN0eC5saXN0ZW5lci5zZXRPcmllbnRhdGlvbihlLG4sdCxvLHIsaSksYSl9LEhvd2xlckdsb2JhbC5wcm90b3R5cGUudmVsb2NpdHk9ZnVuY3Rpb24oZSxuLHQpe3ZhciBvPXRoaXM7cmV0dXJuIG8uY3R4JiZvLmN0eC5saXN0ZW5lcj8obj1cIm51bWJlclwiIT10eXBlb2Ygbj9vLl92ZWxvY2l0eVsxXTpuLHQ9XCJudW1iZXJcIiE9dHlwZW9mIHQ/by5fdmVsb2NpdHlbMl06dCxcIm51bWJlclwiIT10eXBlb2YgZT9vLl92ZWxvY2l0eTooby5fdmVsb2NpdHk9W2Usbix0XSxvLmN0eC5saXN0ZW5lci5zZXRWZWxvY2l0eShvLl92ZWxvY2l0eVswXSxvLl92ZWxvY2l0eVsxXSxvLl92ZWxvY2l0eVsyXSksbykpOm99LEhvd2xlckdsb2JhbC5wcm90b3R5cGUubGlzdGVuZXJBdHRyPWZ1bmN0aW9uKGUpe3ZhciBuPXRoaXM7aWYoIW4uY3R4fHwhbi5jdHgubGlzdGVuZXIpcmV0dXJuIG47dmFyIHQ9bi5fbGlzdGVuZXJBdHRyO3JldHVybiBlPyhuLl9saXN0ZW5lckF0dHI9e2RvcHBsZXJGYWN0b3I6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUuZG9wcGxlckZhY3Rvcj9lLmRvcHBsZXJGYWN0b3I6dC5kb3BwbGVyRmFjdG9yLHNwZWVkT2ZTb3VuZDpcInVuZGVmaW5lZFwiIT10eXBlb2YgZS5zcGVlZE9mU291bmQ/ZS5zcGVlZE9mU291bmQ6dC5zcGVlZE9mU291bmR9LG4uY3R4Lmxpc3RlbmVyLmRvcHBsZXJGYWN0b3I9dC5kb3BwbGVyRmFjdG9yLG4uY3R4Lmxpc3RlbmVyLnNwZWVkT2ZTb3VuZD10LnNwZWVkT2ZTb3VuZCxuKTp0fSxIb3dsLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgdD10aGlzO3JldHVybiB0Ll9vcmllbnRhdGlvbj1uLm9yaWVudGF0aW9ufHxbMSwwLDBdLHQuX3Bvcz1uLnBvc3x8bnVsbCx0Ll92ZWxvY2l0eT1uLnZlbG9jaXR5fHxbMCwwLDBdLHQuX3Bhbm5lckF0dHI9e2NvbmVJbm5lckFuZ2xlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVJbm5lckFuZ2xlP24uY29uZUlubmVyQW5nbGU6MzYwLGNvbmVPdXRlckFuZ2xlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVPdXRlckFuZ2xlP24uY29uZU91dGVyQW5nbGU6MzYwLGNvbmVPdXRlckdhaW46XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZU91dGVyR2Fpbj9uLmNvbmVPdXRlckdhaW46MCxkaXN0YW5jZU1vZGVsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmRpc3RhbmNlTW9kZWw/bi5kaXN0YW5jZU1vZGVsOlwiaW52ZXJzZVwiLG1heERpc3RhbmNlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLm1heERpc3RhbmNlP24ubWF4RGlzdGFuY2U6MWU0LHBhbm5pbmdNb2RlbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5wYW5uaW5nTW9kZWw/bi5wYW5uaW5nTW9kZWw6XCJIUlRGXCIscmVmRGlzdGFuY2U6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucmVmRGlzdGFuY2U/bi5yZWZEaXN0YW5jZToxLHJvbGxvZmZGYWN0b3I6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucm9sbG9mZkZhY3Rvcj9uLnJvbGxvZmZGYWN0b3I6MX0sZS5jYWxsKHRoaXMsbil9fShIb3dsLnByb3RvdHlwZS5pbml0KSxIb3dsLnByb3RvdHlwZS5wb3M9ZnVuY3Rpb24obix0LG8scil7dmFyIGk9dGhpcztpZighaS5fd2ViQXVkaW8pcmV0dXJuIGk7aWYoIWkuX2xvYWRlZClyZXR1cm4gaS5vbmNlKFwicGxheVwiLGZ1bmN0aW9uKCl7aS5wb3Mobix0LG8scil9KSxpO2lmKHQ9XCJudW1iZXJcIiE9dHlwZW9mIHQ/MDp0LG89XCJudW1iZXJcIiE9dHlwZW9mIG8/LS41Om8sXCJ1bmRlZmluZWRcIj09dHlwZW9mIHIpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBuKXJldHVybiBpLl9wb3M7aS5fcG9zPVtuLHQsb119Zm9yKHZhciBhPWkuX2dldFNvdW5kSWRzKHIpLHA9MDtwPGEubGVuZ3RoO3ArKyl7dmFyIGw9aS5fc291bmRCeUlkKGFbcF0pO2lmKGwpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBuKXJldHVybiBsLl9wb3M7bC5fcG9zPVtuLHQsb10sbC5fbm9kZSYmKGwuX3Bhbm5lcnx8ZShsKSxsLl9wYW5uZXIuc2V0UG9zaXRpb24obix0LG8pKX19cmV0dXJuIGl9LEhvd2wucHJvdG90eXBlLm9yaWVudGF0aW9uPWZ1bmN0aW9uKG4sdCxvLHIpe3ZhciBpPXRoaXM7aWYoIWkuX3dlYkF1ZGlvKXJldHVybiBpO2lmKCFpLl9sb2FkZWQpcmV0dXJuIGkub25jZShcInBsYXlcIixmdW5jdGlvbigpe2kub3JpZW50YXRpb24obix0LG8scil9KSxpO2lmKHQ9XCJudW1iZXJcIiE9dHlwZW9mIHQ/aS5fb3JpZW50YXRpb25bMV06dCxvPVwibnVtYmVyXCIhPXR5cGVvZiBvP2kuX29yaWVudGF0aW9uWzJdOm8sXCJ1bmRlZmluZWRcIj09dHlwZW9mIHIpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBuKXJldHVybiBpLl9vcmllbnRhdGlvbjtpLl9vcmllbnRhdGlvbj1bbix0LG9dfWZvcih2YXIgYT1pLl9nZXRTb3VuZElkcyhyKSxwPTA7cDxhLmxlbmd0aDtwKyspe3ZhciBsPWkuX3NvdW5kQnlJZChhW3BdKTtpZihsKXtpZihcIm51bWJlclwiIT10eXBlb2YgbilyZXR1cm4gbC5fb3JpZW50YXRpb247bC5fb3JpZW50YXRpb249W24sdCxvXSxsLl9ub2RlJiYobC5fcGFubmVyfHxlKGwpLGwuX3Bhbm5lci5zZXRPcmllbnRhdGlvbihuLHQsbykpfX1yZXR1cm4gaX0sSG93bC5wcm90b3R5cGUudmVsb2NpdHk9ZnVuY3Rpb24obix0LG8scil7dmFyIGk9dGhpcztpZighaS5fd2ViQXVkaW8pcmV0dXJuIGk7aWYoIWkuX2xvYWRlZClyZXR1cm4gaS5vbmNlKFwicGxheVwiLGZ1bmN0aW9uKCl7aS52ZWxvY2l0eShuLHQsbyxyKX0pLGk7aWYodD1cIm51bWJlclwiIT10eXBlb2YgdD9pLl92ZWxvY2l0eVsxXTp0LG89XCJudW1iZXJcIiE9dHlwZW9mIG8/aS5fdmVsb2NpdHlbMl06byxcInVuZGVmaW5lZFwiPT10eXBlb2Ygcil7aWYoXCJudW1iZXJcIiE9dHlwZW9mIG4pcmV0dXJuIGkuX3ZlbG9jaXR5O2kuX3ZlbG9jaXR5PVtuLHQsb119Zm9yKHZhciBhPWkuX2dldFNvdW5kSWRzKHIpLHA9MDtwPGEubGVuZ3RoO3ArKyl7dmFyIGw9aS5fc291bmRCeUlkKGFbcF0pO2lmKGwpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBuKXJldHVybiBsLl92ZWxvY2l0eTtsLl92ZWxvY2l0eT1bbix0LG9dLGwuX25vZGUmJihsLl9wYW5uZXJ8fGUobCksbC5fcGFubmVyLnNldFZlbG9jaXR5KG4sdCxvKSl9fXJldHVybiBpfSxIb3dsLnByb3RvdHlwZS5wYW5uZXJBdHRyPWZ1bmN0aW9uKCl7dmFyIG4sdCxvLHI9dGhpcyxpPWFyZ3VtZW50cztpZighci5fd2ViQXVkaW8pcmV0dXJuIHI7aWYoMD09PWkubGVuZ3RoKXJldHVybiByLl9wYW5uZXJBdHRyO2lmKDE9PT1pLmxlbmd0aCl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIGlbMF0pcmV0dXJuIG89ci5fc291bmRCeUlkKHBhcnNlSW50KGlbMF0sMTApKSxvP28uX3Bhbm5lckF0dHI6ci5fcGFubmVyQXR0cjtuPWlbMF0sXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQmJihyLl9wYW5uZXJBdHRyPXtjb25lSW5uZXJBbmdsZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lSW5uZXJBbmdsZT9uLmNvbmVJbm5lckFuZ2xlOnIuX2NvbmVJbm5lckFuZ2xlLGNvbmVPdXRlckFuZ2xlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVPdXRlckFuZ2xlP24uY29uZU91dGVyQW5nbGU6ci5fY29uZU91dGVyQW5nbGUsY29uZU91dGVyR2FpbjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lT3V0ZXJHYWluP24uY29uZU91dGVyR2FpbjpyLl9jb25lT3V0ZXJHYWluLGRpc3RhbmNlTW9kZWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uZGlzdGFuY2VNb2RlbD9uLmRpc3RhbmNlTW9kZWw6ci5fZGlzdGFuY2VNb2RlbCxtYXhEaXN0YW5jZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5tYXhEaXN0YW5jZT9uLm1heERpc3RhbmNlOnIuX21heERpc3RhbmNlLHBhbm5pbmdNb2RlbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5wYW5uaW5nTW9kZWw/bi5wYW5uaW5nTW9kZWw6ci5fcGFubmluZ01vZGVsLHJlZkRpc3RhbmNlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnJlZkRpc3RhbmNlP24ucmVmRGlzdGFuY2U6ci5fcmVmRGlzdGFuY2Uscm9sbG9mZkZhY3RvcjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5yb2xsb2ZmRmFjdG9yP24ucm9sbG9mZkZhY3RvcjpyLl9yb2xsb2ZmRmFjdG9yfSl9ZWxzZSAyPT09aS5sZW5ndGgmJihuPWlbMF0sdD1wYXJzZUludChpWzFdLDEwKSk7Zm9yKHZhciBhPXIuX2dldFNvdW5kSWRzKHQpLHA9MDtwPGEubGVuZ3RoO3ArKylpZihvPXIuX3NvdW5kQnlJZChhW3BdKSl7dmFyIGw9by5fcGFubmVyQXR0cjtsPXtjb25lSW5uZXJBbmdsZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lSW5uZXJBbmdsZT9uLmNvbmVJbm5lckFuZ2xlOmwuY29uZUlubmVyQW5nbGUsY29uZU91dGVyQW5nbGU6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZU91dGVyQW5nbGU/bi5jb25lT3V0ZXJBbmdsZTpsLmNvbmVPdXRlckFuZ2xlLGNvbmVPdXRlckdhaW46XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZU91dGVyR2Fpbj9uLmNvbmVPdXRlckdhaW46bC5jb25lT3V0ZXJHYWluLGRpc3RhbmNlTW9kZWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uZGlzdGFuY2VNb2RlbD9uLmRpc3RhbmNlTW9kZWw6bC5kaXN0YW5jZU1vZGVsLG1heERpc3RhbmNlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLm1heERpc3RhbmNlP24ubWF4RGlzdGFuY2U6bC5tYXhEaXN0YW5jZSxwYW5uaW5nTW9kZWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucGFubmluZ01vZGVsP24ucGFubmluZ01vZGVsOmwucGFubmluZ01vZGVsLHJlZkRpc3RhbmNlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnJlZkRpc3RhbmNlP24ucmVmRGlzdGFuY2U6bC5yZWZEaXN0YW5jZSxyb2xsb2ZmRmFjdG9yOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnJvbGxvZmZGYWN0b3I/bi5yb2xsb2ZmRmFjdG9yOmwucm9sbG9mZkZhY3Rvcn07dmFyIGM9by5fcGFubmVyO2M/KGMuY29uZUlubmVyQW5nbGU9bC5jb25lSW5uZXJBbmdsZSxjLmNvbmVPdXRlckFuZ2xlPWwuY29uZU91dGVyQW5nbGUsYy5jb25lT3V0ZXJHYWluPWwuY29uZU91dGVyR2FpbixjLmRpc3RhbmNlTW9kZWw9bC5kaXN0YW5jZU1vZGVsLGMubWF4RGlzdGFuY2U9bC5tYXhEaXN0YW5jZSxjLnBhbm5pbmdNb2RlbD1sLnBhbm5pbmdNb2RlbCxjLnJlZkRpc3RhbmNlPWwucmVmRGlzdGFuY2UsYy5yb2xsb2ZmRmFjdG9yPWwucm9sbG9mZkZhY3Rvcik6KG8uX3Bvc3x8KG8uX3Bvcz1yLl9wb3N8fFswLDAsLS41XSksZShvKSl9cmV0dXJuIHJ9LFNvdW5kLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbigpe3ZhciBuPXRoaXMsdD1uLl9wYXJlbnQ7bi5fb3JpZW50YXRpb249dC5fb3JpZW50YXRpb24sbi5fcG9zPXQuX3BvcyxuLl92ZWxvY2l0eT10Ll92ZWxvY2l0eSxuLl9wYW5uZXJBdHRyPXQuX3Bhbm5lckF0dHIsZS5jYWxsKHRoaXMpLG4uX3BvcyYmdC5wb3Mobi5fcG9zWzBdLG4uX3Bvc1sxXSxuLl9wb3NbMl0sbi5faWQpfX0oU291bmQucHJvdG90eXBlLmluaXQpLFNvdW5kLnByb3RvdHlwZS5yZXNldD1mdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgbj10aGlzLHQ9bi5fcGFyZW50O3JldHVybiBuLl9vcmllbnRhdGlvbj10Ll9vcmllbnRhdGlvbixuLl9wb3M9dC5fcG9zLG4uX3ZlbG9jaXR5PXQuX3ZlbG9jaXR5LG4uX3Bhbm5lckF0dHI9dC5fcGFubmVyQXR0cixlLmNhbGwodGhpcyl9fShTb3VuZC5wcm90b3R5cGUucmVzZXQpO3ZhciBlPWZ1bmN0aW9uKGUpe2UuX3Bhbm5lcj1Ib3dsZXIuY3R4LmNyZWF0ZVBhbm5lcigpLGUuX3Bhbm5lci5jb25lSW5uZXJBbmdsZT1lLl9wYW5uZXJBdHRyLmNvbmVJbm5lckFuZ2xlLGUuX3Bhbm5lci5jb25lT3V0ZXJBbmdsZT1lLl9wYW5uZXJBdHRyLmNvbmVPdXRlckFuZ2xlLGUuX3Bhbm5lci5jb25lT3V0ZXJHYWluPWUuX3Bhbm5lckF0dHIuY29uZU91dGVyR2FpbixlLl9wYW5uZXIuZGlzdGFuY2VNb2RlbD1lLl9wYW5uZXJBdHRyLmRpc3RhbmNlTW9kZWwsZS5fcGFubmVyLm1heERpc3RhbmNlPWUuX3Bhbm5lckF0dHIubWF4RGlzdGFuY2UsZS5fcGFubmVyLnBhbm5pbmdNb2RlbD1lLl9wYW5uZXJBdHRyLnBhbm5pbmdNb2RlbCxlLl9wYW5uZXIucmVmRGlzdGFuY2U9ZS5fcGFubmVyQXR0ci5yZWZEaXN0YW5jZSxlLl9wYW5uZXIucm9sbG9mZkZhY3Rvcj1lLl9wYW5uZXJBdHRyLnJvbGxvZmZGYWN0b3IsZS5fcGFubmVyLnNldFBvc2l0aW9uKGUuX3Bvc1swXSxlLl9wb3NbMV0sZS5fcG9zWzJdKSxlLl9wYW5uZXIuc2V0T3JpZW50YXRpb24oZS5fb3JpZW50YXRpb25bMF0sZS5fb3JpZW50YXRpb25bMV0sZS5fb3JpZW50YXRpb25bMl0pLGUuX3Bhbm5lci5zZXRWZWxvY2l0eShlLl92ZWxvY2l0eVswXSxlLl92ZWxvY2l0eVsxXSxlLl92ZWxvY2l0eVsyXSksZS5fcGFubmVyLmNvbm5lY3QoZS5fbm9kZSksZS5fcGF1c2VkfHxlLl9wYXJlbnQucGF1c2UoZS5faWQpLnBsYXkoZS5faWQpfX0oKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2hvd2xlci9ob3dsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDQwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcbnZhciAkdmlkZW9JbmRpY2F0b3IgPSAkKCcjdmlkZW8tcHJvZ3Jlc3MgLnByb2dyZXNzJyk7XG52YXIgdmlkZW9QbGF5aW5nO1xudmFyICRlbDtcblxuJHZpZGVvSW5kaWNhdG9yLmhpZGUoKTtcbm1vZHVsZS5leHBvcnRzLnN0YXJ0ID0gZnVuY3Rpb24oJG5ld1ZpZGVvKSB7XG4gICRlbCA9ICRuZXdWaWRlb1swXTtcbiAgJHZpZGVvSW5kaWNhdG9yLnNob3coKTtcbiAgdmlkZW9QbGF5aW5nID0gdHJ1ZTtcbiAgbG9vcCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICB2aWRlb1BsYXlpbmcgPSBmYWxzZTtcbiAgJCgnI3ZpZGVvLXByb2dyZXNzIC5wcm9ncmVzcycpLmhpZGUoKTtcbn07XG5cbmZ1bmN0aW9uIGxvb3AoKSB7XG4gIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJhdGUgPSAoJGVsLmN1cnJlbnRUaW1lIC8gJGVsLmR1cmF0aW9uKTtcbiAgICB2YXIgcGVyY2VudCA9IChyYXRlICogMTAwKS50b0ZpeGVkKDIpO1xuICAgICR2aWRlb0luZGljYXRvci5jc3Moeyd3aWR0aCc6IHBlcmNlbnQgKyAndncnfSk7XG4gICAgaWYodmlkZW9QbGF5aW5nKSB7XG4gICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7bG9vcCgpfSAsIDQxIClcbiAgICB9XG4gIH0pXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIvdmlkZW9wbGF5ZXIuanNcbiAqKi8iLCJ2YXIgZGlmZiA9IHJlcXVpcmUoXCIuL3Z0cmVlL2RpZmYuanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS9kaWZmLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc0FycmF5ID0gcmVxdWlyZShcIngtaXMtYXJyYXlcIilcblxudmFyIFZQYXRjaCA9IHJlcXVpcmUoXCIuLi92bm9kZS92cGF0Y2hcIilcbnZhciBpc1ZOb2RlID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXZub2RlXCIpXG52YXIgaXNWVGV4dCA9IHJlcXVpcmUoXCIuLi92bm9kZS9pcy12dGV4dFwiKVxudmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldFwiKVxudmFyIGlzVGh1bmsgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdGh1bmtcIilcbnZhciBoYW5kbGVUaHVuayA9IHJlcXVpcmUoXCIuLi92bm9kZS9oYW5kbGUtdGh1bmtcIilcblxudmFyIGRpZmZQcm9wcyA9IHJlcXVpcmUoXCIuL2RpZmYtcHJvcHNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmXG5cbmZ1bmN0aW9uIGRpZmYoYSwgYikge1xuICAgIHZhciBwYXRjaCA9IHsgYTogYSB9XG4gICAgd2FsayhhLCBiLCBwYXRjaCwgMClcbiAgICByZXR1cm4gcGF0Y2hcbn1cblxuZnVuY3Rpb24gd2FsayhhLCBiLCBwYXRjaCwgaW5kZXgpIHtcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB2YXIgYXBwbHkgPSBwYXRjaFtpbmRleF1cbiAgICB2YXIgYXBwbHlDbGVhciA9IGZhbHNlXG5cbiAgICBpZiAoaXNUaHVuayhhKSB8fCBpc1RodW5rKGIpKSB7XG4gICAgICAgIHRodW5rcyhhLCBiLCBwYXRjaCwgaW5kZXgpXG4gICAgfSBlbHNlIGlmIChiID09IG51bGwpIHtcblxuICAgICAgICAvLyBJZiBhIGlzIGEgd2lkZ2V0IHdlIHdpbGwgYWRkIGEgcmVtb3ZlIHBhdGNoIGZvciBpdFxuICAgICAgICAvLyBPdGhlcndpc2UgYW55IGNoaWxkIHdpZGdldHMvaG9va3MgbXVzdCBiZSBkZXN0cm95ZWQuXG4gICAgICAgIC8vIFRoaXMgcHJldmVudHMgYWRkaW5nIHR3byByZW1vdmUgcGF0Y2hlcyBmb3IgYSB3aWRnZXQuXG4gICAgICAgIGlmICghaXNXaWRnZXQoYSkpIHtcbiAgICAgICAgICAgIGNsZWFyU3RhdGUoYSwgcGF0Y2gsIGluZGV4KVxuICAgICAgICAgICAgYXBwbHkgPSBwYXRjaFtpbmRleF1cbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlJFTU9WRSwgYSwgYikpXG4gICAgfSBlbHNlIGlmIChpc1ZOb2RlKGIpKSB7XG4gICAgICAgIGlmIChpc1ZOb2RlKGEpKSB7XG4gICAgICAgICAgICBpZiAoYS50YWdOYW1lID09PSBiLnRhZ05hbWUgJiZcbiAgICAgICAgICAgICAgICBhLm5hbWVzcGFjZSA9PT0gYi5uYW1lc3BhY2UgJiZcbiAgICAgICAgICAgICAgICBhLmtleSA9PT0gYi5rZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcHNQYXRjaCA9IGRpZmZQcm9wcyhhLnByb3BlcnRpZXMsIGIucHJvcGVydGllcylcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNQYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFZQYXRjaChWUGF0Y2guUFJPUFMsIGEsIHByb3BzUGF0Y2gpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcHBseSA9IGRpZmZDaGlsZHJlbihhLCBiLCBwYXRjaCwgYXBwbHksIGluZGV4KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WTk9ERSwgYSwgYikpXG4gICAgICAgICAgICAgICAgYXBwbHlDbGVhciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goVlBhdGNoLlZOT0RFLCBhLCBiKSlcbiAgICAgICAgICAgIGFwcGx5Q2xlYXIgPSB0cnVlXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVlRleHQoYikpIHtcbiAgICAgICAgaWYgKCFpc1ZUZXh0KGEpKSB7XG4gICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WVEVYVCwgYSwgYikpXG4gICAgICAgICAgICBhcHBseUNsZWFyID0gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGEudGV4dCAhPT0gYi50ZXh0KSB7XG4gICAgICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5WVEVYVCwgYSwgYikpXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzV2lkZ2V0KGIpKSB7XG4gICAgICAgIGlmICghaXNXaWRnZXQoYSkpIHtcbiAgICAgICAgICAgIGFwcGx5Q2xlYXIgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBhcHBseSA9IGFwcGVuZFBhdGNoKGFwcGx5LCBuZXcgVlBhdGNoKFZQYXRjaC5XSURHRVQsIGEsIGIpKVxuICAgIH1cblxuICAgIGlmIChhcHBseSkge1xuICAgICAgICBwYXRjaFtpbmRleF0gPSBhcHBseVxuICAgIH1cblxuICAgIGlmIChhcHBseUNsZWFyKSB7XG4gICAgICAgIGNsZWFyU3RhdGUoYSwgcGF0Y2gsIGluZGV4KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZkNoaWxkcmVuKGEsIGIsIHBhdGNoLCBhcHBseSwgaW5kZXgpIHtcbiAgICB2YXIgYUNoaWxkcmVuID0gYS5jaGlsZHJlblxuICAgIHZhciBvcmRlcmVkU2V0ID0gcmVvcmRlcihhQ2hpbGRyZW4sIGIuY2hpbGRyZW4pXG4gICAgdmFyIGJDaGlsZHJlbiA9IG9yZGVyZWRTZXQuY2hpbGRyZW5cblxuICAgIHZhciBhTGVuID0gYUNoaWxkcmVuLmxlbmd0aFxuICAgIHZhciBiTGVuID0gYkNoaWxkcmVuLmxlbmd0aFxuICAgIHZhciBsZW4gPSBhTGVuID4gYkxlbiA/IGFMZW4gOiBiTGVuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBsZWZ0Tm9kZSA9IGFDaGlsZHJlbltpXVxuICAgICAgICB2YXIgcmlnaHROb2RlID0gYkNoaWxkcmVuW2ldXG4gICAgICAgIGluZGV4ICs9IDFcblxuICAgICAgICBpZiAoIWxlZnROb2RlKSB7XG4gICAgICAgICAgICBpZiAocmlnaHROb2RlKSB7XG4gICAgICAgICAgICAgICAgLy8gRXhjZXNzIG5vZGVzIGluIGIgbmVlZCB0byBiZSBhZGRlZFxuICAgICAgICAgICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWUGF0Y2goVlBhdGNoLklOU0VSVCwgbnVsbCwgcmlnaHROb2RlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhbGsobGVmdE5vZGUsIHJpZ2h0Tm9kZSwgcGF0Y2gsIGluZGV4KVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVk5vZGUobGVmdE5vZGUpICYmIGxlZnROb2RlLmNvdW50KSB7XG4gICAgICAgICAgICBpbmRleCArPSBsZWZ0Tm9kZS5jb3VudFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yZGVyZWRTZXQubW92ZXMpIHtcbiAgICAgICAgLy8gUmVvcmRlciBub2RlcyBsYXN0XG4gICAgICAgIGFwcGx5ID0gYXBwZW5kUGF0Y2goYXBwbHksIG5ldyBWUGF0Y2goXG4gICAgICAgICAgICBWUGF0Y2guT1JERVIsXG4gICAgICAgICAgICBhLFxuICAgICAgICAgICAgb3JkZXJlZFNldC5tb3Zlc1xuICAgICAgICApKVxuICAgIH1cblxuICAgIHJldHVybiBhcHBseVxufVxuXG5mdW5jdGlvbiBjbGVhclN0YXRlKHZOb2RlLCBwYXRjaCwgaW5kZXgpIHtcbiAgICAvLyBUT0RPOiBNYWtlIHRoaXMgYSBzaW5nbGUgd2Fsaywgbm90IHR3b1xuICAgIHVuaG9vayh2Tm9kZSwgcGF0Y2gsIGluZGV4KVxuICAgIGRlc3Ryb3lXaWRnZXRzKHZOb2RlLCBwYXRjaCwgaW5kZXgpXG59XG5cbi8vIFBhdGNoIHJlY29yZHMgZm9yIGFsbCBkZXN0cm95ZWQgd2lkZ2V0cyBtdXN0IGJlIGFkZGVkIGJlY2F1c2Ugd2UgbmVlZFxuLy8gYSBET00gbm9kZSByZWZlcmVuY2UgZm9yIHRoZSBkZXN0cm95IGZ1bmN0aW9uXG5mdW5jdGlvbiBkZXN0cm95V2lkZ2V0cyh2Tm9kZSwgcGF0Y2gsIGluZGV4KSB7XG4gICAgaWYgKGlzV2lkZ2V0KHZOb2RlKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZOb2RlLmRlc3Ryb3kgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcGF0Y2hbaW5kZXhdID0gYXBwZW5kUGF0Y2goXG4gICAgICAgICAgICAgICAgcGF0Y2hbaW5kZXhdLFxuICAgICAgICAgICAgICAgIG5ldyBWUGF0Y2goVlBhdGNoLlJFTU9WRSwgdk5vZGUsIG51bGwpXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVk5vZGUodk5vZGUpICYmICh2Tm9kZS5oYXNXaWRnZXRzIHx8IHZOb2RlLmhhc1RodW5rcykpIHtcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW5cbiAgICAgICAgdmFyIGxlbiA9IGNoaWxkcmVuLmxlbmd0aFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICAgICAgaW5kZXggKz0gMVxuXG4gICAgICAgICAgICBkZXN0cm95V2lkZ2V0cyhjaGlsZCwgcGF0Y2gsIGluZGV4KVxuXG4gICAgICAgICAgICBpZiAoaXNWTm9kZShjaGlsZCkgJiYgY2hpbGQuY291bnQpIHtcbiAgICAgICAgICAgICAgICBpbmRleCArPSBjaGlsZC5jb3VudFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1RodW5rKHZOb2RlKSkge1xuICAgICAgICB0aHVua3Modk5vZGUsIG51bGwsIHBhdGNoLCBpbmRleClcbiAgICB9XG59XG5cbi8vIENyZWF0ZSBhIHN1Yi1wYXRjaCBmb3IgdGh1bmtzXG5mdW5jdGlvbiB0aHVua3MoYSwgYiwgcGF0Y2gsIGluZGV4KSB7XG4gICAgdmFyIG5vZGVzID0gaGFuZGxlVGh1bmsoYSwgYilcbiAgICB2YXIgdGh1bmtQYXRjaCA9IGRpZmYobm9kZXMuYSwgbm9kZXMuYilcbiAgICBpZiAoaGFzUGF0Y2hlcyh0aHVua1BhdGNoKSkge1xuICAgICAgICBwYXRjaFtpbmRleF0gPSBuZXcgVlBhdGNoKFZQYXRjaC5USFVOSywgbnVsbCwgdGh1bmtQYXRjaClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhc1BhdGNoZXMocGF0Y2gpIHtcbiAgICBmb3IgKHZhciBpbmRleCBpbiBwYXRjaCkge1xuICAgICAgICBpZiAoaW5kZXggIT09IFwiYVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG59XG5cbi8vIEV4ZWN1dGUgaG9va3Mgd2hlbiB0d28gbm9kZXMgYXJlIGlkZW50aWNhbFxuZnVuY3Rpb24gdW5ob29rKHZOb2RlLCBwYXRjaCwgaW5kZXgpIHtcbiAgICBpZiAoaXNWTm9kZSh2Tm9kZSkpIHtcbiAgICAgICAgaWYgKHZOb2RlLmhvb2tzKSB7XG4gICAgICAgICAgICBwYXRjaFtpbmRleF0gPSBhcHBlbmRQYXRjaChcbiAgICAgICAgICAgICAgICBwYXRjaFtpbmRleF0sXG4gICAgICAgICAgICAgICAgbmV3IFZQYXRjaChcbiAgICAgICAgICAgICAgICAgICAgVlBhdGNoLlBST1BTLFxuICAgICAgICAgICAgICAgICAgICB2Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkS2V5cyh2Tm9kZS5ob29rcylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodk5vZGUuZGVzY2VuZGFudEhvb2tzIHx8IHZOb2RlLmhhc1RodW5rcykge1xuICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gdk5vZGUuY2hpbGRyZW5cbiAgICAgICAgICAgIHZhciBsZW4gPSBjaGlsZHJlbi5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgICAgICAgICAgIGluZGV4ICs9IDFcblxuICAgICAgICAgICAgICAgIHVuaG9vayhjaGlsZCwgcGF0Y2gsIGluZGV4KVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzVk5vZGUoY2hpbGQpICYmIGNoaWxkLmNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ICs9IGNoaWxkLmNvdW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1RodW5rKHZOb2RlKSkge1xuICAgICAgICB0aHVua3Modk5vZGUsIG51bGwsIHBhdGNoLCBpbmRleClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHVuZGVmaW5lZEtleXMob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBMaXN0IGRpZmYsIG5haXZlIGxlZnQgdG8gcmlnaHQgcmVvcmRlcmluZ1xuZnVuY3Rpb24gcmVvcmRlcihhQ2hpbGRyZW4sIGJDaGlsZHJlbikge1xuICAgIC8vIE8oTSkgdGltZSwgTyhNKSBtZW1vcnlcbiAgICB2YXIgYkNoaWxkSW5kZXggPSBrZXlJbmRleChiQ2hpbGRyZW4pXG4gICAgdmFyIGJLZXlzID0gYkNoaWxkSW5kZXgua2V5c1xuICAgIHZhciBiRnJlZSA9IGJDaGlsZEluZGV4LmZyZWVcblxuICAgIGlmIChiRnJlZS5sZW5ndGggPT09IGJDaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBiQ2hpbGRyZW4sXG4gICAgICAgICAgICBtb3ZlczogbnVsbFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTyhOKSB0aW1lLCBPKE4pIG1lbW9yeVxuICAgIHZhciBhQ2hpbGRJbmRleCA9IGtleUluZGV4KGFDaGlsZHJlbilcbiAgICB2YXIgYUtleXMgPSBhQ2hpbGRJbmRleC5rZXlzXG4gICAgdmFyIGFGcmVlID0gYUNoaWxkSW5kZXguZnJlZVxuXG4gICAgaWYgKGFGcmVlLmxlbmd0aCA9PT0gYUNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hpbGRyZW46IGJDaGlsZHJlbixcbiAgICAgICAgICAgIG1vdmVzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPKE1BWChOLCBNKSkgbWVtb3J5XG4gICAgdmFyIG5ld0NoaWxkcmVuID0gW11cblxuICAgIHZhciBmcmVlSW5kZXggPSAwXG4gICAgdmFyIGZyZWVDb3VudCA9IGJGcmVlLmxlbmd0aFxuICAgIHZhciBkZWxldGVkSXRlbXMgPSAwXG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggYSBhbmQgbWF0Y2ggYSBub2RlIGluIGJcbiAgICAvLyBPKE4pIHRpbWUsXG4gICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgYUNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhSXRlbSA9IGFDaGlsZHJlbltpXVxuICAgICAgICB2YXIgaXRlbUluZGV4XG5cbiAgICAgICAgaWYgKGFJdGVtLmtleSkge1xuICAgICAgICAgICAgaWYgKGJLZXlzLmhhc093blByb3BlcnR5KGFJdGVtLmtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBNYXRjaCB1cCB0aGUgb2xkIGtleXNcbiAgICAgICAgICAgICAgICBpdGVtSW5kZXggPSBiS2V5c1thSXRlbS5rZXldXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChiQ2hpbGRyZW5baXRlbUluZGV4XSlcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgb2xkIGtleWVkIGl0ZW1zXG4gICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gaSAtIGRlbGV0ZWRJdGVtcysrXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTWF0Y2ggdGhlIGl0ZW0gaW4gYSB3aXRoIHRoZSBuZXh0IGZyZWUgaXRlbSBpbiBiXG4gICAgICAgICAgICBpZiAoZnJlZUluZGV4IDwgZnJlZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgaXRlbUluZGV4ID0gYkZyZWVbZnJlZUluZGV4KytdXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChiQ2hpbGRyZW5baXRlbUluZGV4XSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlcmUgYXJlIG5vIGZyZWUgaXRlbXMgaW4gYiB0byBtYXRjaCB3aXRoXG4gICAgICAgICAgICAgICAgLy8gdGhlIGZyZWUgaXRlbXMgaW4gYSwgc28gdGhlIGV4dHJhIGZyZWUgbm9kZXNcbiAgICAgICAgICAgICAgICAvLyBhcmUgZGVsZXRlZC5cbiAgICAgICAgICAgICAgICBpdGVtSW5kZXggPSBpIC0gZGVsZXRlZEl0ZW1zKytcbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFzdEZyZWVJbmRleCA9IGZyZWVJbmRleCA+PSBiRnJlZS5sZW5ndGggP1xuICAgICAgICBiQ2hpbGRyZW4ubGVuZ3RoIDpcbiAgICAgICAgYkZyZWVbZnJlZUluZGV4XVxuXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGIgYW5kIGFwcGVuZCBhbnkgbmV3IGtleXNcbiAgICAvLyBPKE0pIHRpbWVcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJDaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgbmV3SXRlbSA9IGJDaGlsZHJlbltqXVxuXG4gICAgICAgIGlmIChuZXdJdGVtLmtleSkge1xuICAgICAgICAgICAgaWYgKCFhS2V5cy5oYXNPd25Qcm9wZXJ0eShuZXdJdGVtLmtleSkpIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgYW55IG5ldyBrZXllZCBpdGVtc1xuICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBhZGRpbmcgbmV3IGl0ZW1zIHRvIHRoZSBlbmQgYW5kIHRoZW4gc29ydGluZyB0aGVtXG4gICAgICAgICAgICAgICAgLy8gaW4gcGxhY2UuIEluIGZ1dHVyZSB3ZSBzaG91bGQgaW5zZXJ0IG5ldyBpdGVtcyBpbiBwbGFjZS5cbiAgICAgICAgICAgICAgICBuZXdDaGlsZHJlbi5wdXNoKG5ld0l0ZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaiA+PSBsYXN0RnJlZUluZGV4KSB7XG4gICAgICAgICAgICAvLyBBZGQgYW55IGxlZnRvdmVyIG5vbi1rZXllZCBpdGVtc1xuICAgICAgICAgICAgbmV3Q2hpbGRyZW4ucHVzaChuZXdJdGVtKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNpbXVsYXRlID0gbmV3Q2hpbGRyZW4uc2xpY2UoKVxuICAgIHZhciBzaW11bGF0ZUluZGV4ID0gMFxuICAgIHZhciByZW1vdmVzID0gW11cbiAgICB2YXIgaW5zZXJ0cyA9IFtdXG4gICAgdmFyIHNpbXVsYXRlSXRlbVxuXG4gICAgZm9yICh2YXIgayA9IDA7IGsgPCBiQ2hpbGRyZW4ubGVuZ3RoOykge1xuICAgICAgICB2YXIgd2FudGVkSXRlbSA9IGJDaGlsZHJlbltrXVxuICAgICAgICBzaW11bGF0ZUl0ZW0gPSBzaW11bGF0ZVtzaW11bGF0ZUluZGV4XVxuXG4gICAgICAgIC8vIHJlbW92ZSBpdGVtc1xuICAgICAgICB3aGlsZSAoc2ltdWxhdGVJdGVtID09PSBudWxsICYmIHNpbXVsYXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVtb3Zlcy5wdXNoKHJlbW92ZShzaW11bGF0ZSwgc2ltdWxhdGVJbmRleCwgbnVsbCkpXG4gICAgICAgICAgICBzaW11bGF0ZUl0ZW0gPSBzaW11bGF0ZVtzaW11bGF0ZUluZGV4XVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzaW11bGF0ZUl0ZW0gfHwgc2ltdWxhdGVJdGVtLmtleSAhPT0gd2FudGVkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIG5lZWQgYSBrZXkgaW4gdGhpcyBwb3NpdGlvbi4uLlxuICAgICAgICAgICAgaWYgKHdhbnRlZEl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNpbXVsYXRlSXRlbSAmJiBzaW11bGF0ZUl0ZW0ua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFuIGluc2VydCBkb2Vzbid0IHB1dCB0aGlzIGtleSBpbiBwbGFjZSwgaXQgbmVlZHMgdG8gbW92ZVxuICAgICAgICAgICAgICAgICAgICBpZiAoYktleXNbc2ltdWxhdGVJdGVtLmtleV0gIT09IGsgKyAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2gocmVtb3ZlKHNpbXVsYXRlLCBzaW11bGF0ZUluZGV4LCBzaW11bGF0ZUl0ZW0ua2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbXVsYXRlSXRlbSA9IHNpbXVsYXRlW3NpbXVsYXRlSW5kZXhdXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcmVtb3ZlIGRpZG4ndCBwdXQgdGhlIHdhbnRlZCBpdGVtIGluIHBsYWNlLCB3ZSBuZWVkIHRvIGluc2VydCBpdFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzaW11bGF0ZUl0ZW0gfHwgc2ltdWxhdGVJdGVtLmtleSAhPT0gd2FudGVkSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRzLnB1c2goe2tleTogd2FudGVkSXRlbS5rZXksIHRvOiBrfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZW1zIGFyZSBtYXRjaGluZywgc28gc2tpcCBhaGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2ltdWxhdGVJbmRleCsrXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRzLnB1c2goe2tleTogd2FudGVkSXRlbS5rZXksIHRvOiBrfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0cy5wdXNoKHtrZXk6IHdhbnRlZEl0ZW0ua2V5LCB0bzoga30pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGsrK1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYSBrZXkgaW4gc2ltdWxhdGUgaGFzIG5vIG1hdGNoaW5nIHdhbnRlZCBrZXksIHJlbW92ZSBpdFxuICAgICAgICAgICAgZWxzZSBpZiAoc2ltdWxhdGVJdGVtICYmIHNpbXVsYXRlSXRlbS5rZXkpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVzLnB1c2gocmVtb3ZlKHNpbXVsYXRlLCBzaW11bGF0ZUluZGV4LCBzaW11bGF0ZUl0ZW0ua2V5KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNpbXVsYXRlSW5kZXgrK1xuICAgICAgICAgICAgaysrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgYWxsIHRoZSByZW1haW5pbmcgbm9kZXMgZnJvbSBzaW11bGF0ZVxuICAgIHdoaWxlKHNpbXVsYXRlSW5kZXggPCBzaW11bGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgc2ltdWxhdGVJdGVtID0gc2ltdWxhdGVbc2ltdWxhdGVJbmRleF1cbiAgICAgICAgcmVtb3Zlcy5wdXNoKHJlbW92ZShzaW11bGF0ZSwgc2ltdWxhdGVJbmRleCwgc2ltdWxhdGVJdGVtICYmIHNpbXVsYXRlSXRlbS5rZXkpKVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBvbmx5IG1vdmVzIHdlIGhhdmUgYXJlIGRlbGV0ZXMgdGhlbiB3ZSBjYW4ganVzdFxuICAgIC8vIGxldCB0aGUgZGVsZXRlIHBhdGNoIHJlbW92ZSB0aGVzZSBpdGVtcy5cbiAgICBpZiAocmVtb3Zlcy5sZW5ndGggPT09IGRlbGV0ZWRJdGVtcyAmJiAhaW5zZXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiBuZXdDaGlsZHJlbixcbiAgICAgICAgICAgIG1vdmVzOiBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjaGlsZHJlbjogbmV3Q2hpbGRyZW4sXG4gICAgICAgIG1vdmVzOiB7XG4gICAgICAgICAgICByZW1vdmVzOiByZW1vdmVzLFxuICAgICAgICAgICAgaW5zZXJ0czogaW5zZXJ0c1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUoYXJyLCBpbmRleCwga2V5KSB7XG4gICAgYXJyLnNwbGljZShpbmRleCwgMSlcblxuICAgIHJldHVybiB7XG4gICAgICAgIGZyb206IGluZGV4LFxuICAgICAgICBrZXk6IGtleVxuICAgIH1cbn1cblxuZnVuY3Rpb24ga2V5SW5kZXgoY2hpbGRyZW4pIHtcbiAgICB2YXIga2V5cyA9IHt9XG4gICAgdmFyIGZyZWUgPSBbXVxuICAgIHZhciBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGhcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cblxuICAgICAgICBpZiAoY2hpbGQua2V5KSB7XG4gICAgICAgICAgICBrZXlzW2NoaWxkLmtleV0gPSBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcmVlLnB1c2goaSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGtleXM6IGtleXMsICAgICAvLyBBIGhhc2ggb2Yga2V5IG5hbWUgdG8gaW5kZXhcbiAgICAgICAgZnJlZTogZnJlZSAgICAgIC8vIEFuIGFycmF5IG9mIHVua2V5ZWQgaXRlbSBpbmRpY2VzXG4gICAgfVxufVxuXG5mdW5jdGlvbiBhcHBlbmRQYXRjaChhcHBseSwgcGF0Y2gpIHtcbiAgICBpZiAoYXBwbHkpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkoYXBwbHkpKSB7XG4gICAgICAgICAgICBhcHBseS5wdXNoKHBhdGNoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXBwbHkgPSBbYXBwbHksIHBhdGNoXVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFwcGx5XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhdGNoXG4gICAgfVxufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdmlydHVhbC1kb20vdnRyZWUvZGlmZi5qc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgdmVyc2lvbiA9IHJlcXVpcmUoXCIuL3ZlcnNpb25cIilcblxuVmlydHVhbFBhdGNoLk5PTkUgPSAwXG5WaXJ0dWFsUGF0Y2guVlRFWFQgPSAxXG5WaXJ0dWFsUGF0Y2guVk5PREUgPSAyXG5WaXJ0dWFsUGF0Y2guV0lER0VUID0gM1xuVmlydHVhbFBhdGNoLlBST1BTID0gNFxuVmlydHVhbFBhdGNoLk9SREVSID0gNVxuVmlydHVhbFBhdGNoLklOU0VSVCA9IDZcblZpcnR1YWxQYXRjaC5SRU1PVkUgPSA3XG5WaXJ0dWFsUGF0Y2guVEhVTksgPSA4XG5cbm1vZHVsZS5leHBvcnRzID0gVmlydHVhbFBhdGNoXG5cbmZ1bmN0aW9uIFZpcnR1YWxQYXRjaCh0eXBlLCB2Tm9kZSwgcGF0Y2gpIHtcbiAgICB0aGlzLnR5cGUgPSBOdW1iZXIodHlwZSlcbiAgICB0aGlzLnZOb2RlID0gdk5vZGVcbiAgICB0aGlzLnBhdGNoID0gcGF0Y2hcbn1cblxuVmlydHVhbFBhdGNoLnByb3RvdHlwZS52ZXJzaW9uID0gdmVyc2lvblxuVmlydHVhbFBhdGNoLnByb3RvdHlwZS50eXBlID0gXCJWaXJ0dWFsUGF0Y2hcIlxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdmlydHVhbC1kb20vdm5vZGUvdnBhdGNoLmpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc1ZOb2RlID0gcmVxdWlyZShcIi4vaXMtdm5vZGVcIilcbnZhciBpc1ZUZXh0ID0gcmVxdWlyZShcIi4vaXMtdnRleHRcIilcbnZhciBpc1dpZGdldCA9IHJlcXVpcmUoXCIuL2lzLXdpZGdldFwiKVxudmFyIGlzVGh1bmsgPSByZXF1aXJlKFwiLi9pcy10aHVua1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhbmRsZVRodW5rXG5cbmZ1bmN0aW9uIGhhbmRsZVRodW5rKGEsIGIpIHtcbiAgICB2YXIgcmVuZGVyZWRBID0gYVxuICAgIHZhciByZW5kZXJlZEIgPSBiXG5cbiAgICBpZiAoaXNUaHVuayhiKSkge1xuICAgICAgICByZW5kZXJlZEIgPSByZW5kZXJUaHVuayhiLCBhKVxuICAgIH1cblxuICAgIGlmIChpc1RodW5rKGEpKSB7XG4gICAgICAgIHJlbmRlcmVkQSA9IHJlbmRlclRodW5rKGEsIG51bGwpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYTogcmVuZGVyZWRBLFxuICAgICAgICBiOiByZW5kZXJlZEJcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRodW5rKHRodW5rLCBwcmV2aW91cykge1xuICAgIHZhciByZW5kZXJlZFRodW5rID0gdGh1bmsudm5vZGVcblxuICAgIGlmICghcmVuZGVyZWRUaHVuaykge1xuICAgICAgICByZW5kZXJlZFRodW5rID0gdGh1bmsudm5vZGUgPSB0aHVuay5yZW5kZXIocHJldmlvdXMpXG4gICAgfVxuXG4gICAgaWYgKCEoaXNWTm9kZShyZW5kZXJlZFRodW5rKSB8fFxuICAgICAgICAgICAgaXNWVGV4dChyZW5kZXJlZFRodW5rKSB8fFxuICAgICAgICAgICAgaXNXaWRnZXQocmVuZGVyZWRUaHVuaykpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcInRodW5rIGRpZCBub3QgcmV0dXJuIGEgdmFsaWQgbm9kZVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVuZGVyZWRUaHVua1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdmlydHVhbC1kb20vdm5vZGUvaGFuZGxlLXRodW5rLmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoXCJpcy1vYmplY3RcIilcbnZhciBpc0hvb2sgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdmhvb2tcIilcblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmUHJvcHNcblxuZnVuY3Rpb24gZGlmZlByb3BzKGEsIGIpIHtcbiAgICB2YXIgZGlmZlxuXG4gICAgZm9yICh2YXIgYUtleSBpbiBhKSB7XG4gICAgICAgIGlmICghKGFLZXkgaW4gYikpIHtcbiAgICAgICAgICAgIGRpZmYgPSBkaWZmIHx8IHt9XG4gICAgICAgICAgICBkaWZmW2FLZXldID0gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYVZhbHVlID0gYVthS2V5XVxuICAgICAgICB2YXIgYlZhbHVlID0gYlthS2V5XVxuXG4gICAgICAgIGlmIChhVmFsdWUgPT09IGJWYWx1ZSkge1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpc09iamVjdChhVmFsdWUpICYmIGlzT2JqZWN0KGJWYWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChnZXRQcm90b3R5cGUoYlZhbHVlKSAhPT0gZ2V0UHJvdG90eXBlKGFWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkaWZmID0gZGlmZiB8fCB7fVxuICAgICAgICAgICAgICAgIGRpZmZbYUtleV0gPSBiVmFsdWVcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNIb29rKGJWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgZGlmZiA9IGRpZmYgfHwge31cbiAgICAgICAgICAgICAgICAgZGlmZlthS2V5XSA9IGJWYWx1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0RGlmZiA9IGRpZmZQcm9wcyhhVmFsdWUsIGJWYWx1ZSlcbiAgICAgICAgICAgICAgICBpZiAob2JqZWN0RGlmZikge1xuICAgICAgICAgICAgICAgICAgICBkaWZmID0gZGlmZiB8fCB7fVxuICAgICAgICAgICAgICAgICAgICBkaWZmW2FLZXldID0gb2JqZWN0RGlmZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpZmYgPSBkaWZmIHx8IHt9XG4gICAgICAgICAgICBkaWZmW2FLZXldID0gYlZhbHVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBiS2V5IGluIGIpIHtcbiAgICAgICAgaWYgKCEoYktleSBpbiBhKSkge1xuICAgICAgICAgICAgZGlmZiA9IGRpZmYgfHwge31cbiAgICAgICAgICAgIGRpZmZbYktleV0gPSBiW2JLZXldXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlmZlxufVxuXG5mdW5jdGlvbiBnZXRQcm90b3R5cGUodmFsdWUpIHtcbiAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZikge1xuICAgIHJldHVybiBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpXG4gIH0gZWxzZSBpZiAodmFsdWUuX19wcm90b19fKSB7XG4gICAgcmV0dXJuIHZhbHVlLl9fcHJvdG9fX1xuICB9IGVsc2UgaWYgKHZhbHVlLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS92dHJlZS9kaWZmLXByb3BzLmpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcblx0cmV0dXJuIHR5cGVvZiB4ID09PSBcIm9iamVjdFwiICYmIHggIT09IG51bGw7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaXMtb2JqZWN0L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZShcIi4vdmRvbS9jcmVhdGUtZWxlbWVudC5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUVsZW1lbnRcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ZpcnR1YWwtZG9tL2NyZWF0ZS1lbGVtZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoXCJnbG9iYWwvZG9jdW1lbnRcIilcblxudmFyIGFwcGx5UHJvcGVydGllcyA9IHJlcXVpcmUoXCIuL2FwcGx5LXByb3BlcnRpZXNcIilcblxudmFyIGlzVk5vZGUgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdm5vZGUuanNcIilcbnZhciBpc1ZUZXh0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXZ0ZXh0LmpzXCIpXG52YXIgaXNXaWRnZXQgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtd2lkZ2V0LmpzXCIpXG52YXIgaGFuZGxlVGh1bmsgPSByZXF1aXJlKFwiLi4vdm5vZGUvaGFuZGxlLXRodW5rLmpzXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRWxlbWVudFxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHZub2RlLCBvcHRzKSB7XG4gICAgdmFyIGRvYyA9IG9wdHMgPyBvcHRzLmRvY3VtZW50IHx8IGRvY3VtZW50IDogZG9jdW1lbnRcbiAgICB2YXIgd2FybiA9IG9wdHMgPyBvcHRzLndhcm4gOiBudWxsXG5cbiAgICB2bm9kZSA9IGhhbmRsZVRodW5rKHZub2RlKS5hXG5cbiAgICBpZiAoaXNXaWRnZXQodm5vZGUpKSB7XG4gICAgICAgIHJldHVybiB2bm9kZS5pbml0KClcbiAgICB9IGVsc2UgaWYgKGlzVlRleHQodm5vZGUpKSB7XG4gICAgICAgIHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dClcbiAgICB9IGVsc2UgaWYgKCFpc1ZOb2RlKHZub2RlKSkge1xuICAgICAgICBpZiAod2Fybikge1xuICAgICAgICAgICAgd2FybihcIkl0ZW0gaXMgbm90IGEgdmFsaWQgdmlydHVhbCBkb20gbm9kZVwiLCB2bm9kZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHZhciBub2RlID0gKHZub2RlLm5hbWVzcGFjZSA9PT0gbnVsbCkgP1xuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudCh2bm9kZS50YWdOYW1lKSA6XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50TlModm5vZGUubmFtZXNwYWNlLCB2bm9kZS50YWdOYW1lKVxuXG4gICAgdmFyIHByb3BzID0gdm5vZGUucHJvcGVydGllc1xuICAgIGFwcGx5UHJvcGVydGllcyhub2RlLCBwcm9wcylcblxuICAgIHZhciBjaGlsZHJlbiA9IHZub2RlLmNoaWxkcmVuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBjcmVhdGVFbGVtZW50KGNoaWxkcmVuW2ldLCBvcHRzKVxuICAgICAgICBpZiAoY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkTm9kZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS92ZG9tL2NyZWF0ZS1lbGVtZW50LmpzXG4gKiogbW9kdWxlIGlkID0gNTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciB0b3BMZXZlbCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9XG52YXIgbWluRG9jID0gcmVxdWlyZSgnbWluLWRvY3VtZW50Jyk7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudDtcbn0gZWxzZSB7XG4gICAgdmFyIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXTtcblxuICAgIGlmICghZG9jY3kpIHtcbiAgICAgICAgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddID0gbWluRG9jO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jY3k7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9nbG9iYWwvZG9jdW1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSA1MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyogKGlnbm9yZWQpICovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBtaW4tZG9jdW1lbnQgKGlnbm9yZWQpXG4gKiogbW9kdWxlIGlkID0gNTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoXCJpcy1vYmplY3RcIilcbnZhciBpc0hvb2sgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtdmhvb2suanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBhcHBseVByb3BlcnRpZXNcblxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKG5vZGUsIHByb3BzLCBwcmV2aW91cykge1xuICAgIGZvciAodmFyIHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV1cblxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlbW92ZVByb3BlcnR5KG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUsIHByZXZpb3VzKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0hvb2socHJvcFZhbHVlKSkge1xuICAgICAgICAgICAgcmVtb3ZlUHJvcGVydHkobm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJldmlvdXMpXG4gICAgICAgICAgICBpZiAocHJvcFZhbHVlLmhvb2spIHtcbiAgICAgICAgICAgICAgICBwcm9wVmFsdWUuaG9vayhub2RlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgPyBwcmV2aW91c1twcm9wTmFtZV0gOiB1bmRlZmluZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNPYmplY3QocHJvcFZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHBhdGNoT2JqZWN0KG5vZGUsIHByb3BzLCBwcmV2aW91cywgcHJvcE5hbWUsIHByb3BWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVByb3BlcnR5KG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUsIHByZXZpb3VzKSB7XG4gICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXNbcHJvcE5hbWVdXG5cbiAgICAgICAgaWYgKCFpc0hvb2socHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gXCJhdHRyaWJ1dGVzXCIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBwcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnN0eWxlW2ldID0gXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXZpb3VzVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBub2RlW3Byb3BOYW1lXSA9IFwiXCJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZVtwcm9wTmFtZV0gPSBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldmlvdXNWYWx1ZS51bmhvb2spIHtcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWUudW5ob29rKG5vZGUsIHByb3BOYW1lLCBwcm9wVmFsdWUpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoT2JqZWN0KG5vZGUsIHByb3BzLCBwcmV2aW91cywgcHJvcE5hbWUsIHByb3BWYWx1ZSkge1xuICAgIHZhciBwcmV2aW91c1ZhbHVlID0gcHJldmlvdXMgPyBwcmV2aW91c1twcm9wTmFtZV0gOiB1bmRlZmluZWRcblxuICAgIC8vIFNldCBhdHRyaWJ1dGVzXG4gICAgaWYgKHByb3BOYW1lID09PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBhdHRyVmFsdWUgPSBwcm9wVmFsdWVbYXR0ck5hbWVdXG5cbiAgICAgICAgICAgIGlmIChhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYocHJldmlvdXNWYWx1ZSAmJiBpc09iamVjdChwcmV2aW91c1ZhbHVlKSAmJlxuICAgICAgICBnZXRQcm90b3R5cGUocHJldmlvdXNWYWx1ZSkgIT09IGdldFByb3RvdHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIG5vZGVbcHJvcE5hbWVdID0gcHJvcFZhbHVlXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghaXNPYmplY3Qobm9kZVtwcm9wTmFtZV0pKSB7XG4gICAgICAgIG5vZGVbcHJvcE5hbWVdID0ge31cbiAgICB9XG5cbiAgICB2YXIgcmVwbGFjZXIgPSBwcm9wTmFtZSA9PT0gXCJzdHlsZVwiID8gXCJcIiA6IHVuZGVmaW5lZFxuXG4gICAgZm9yICh2YXIgayBpbiBwcm9wVmFsdWUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcHJvcFZhbHVlW2tdXG4gICAgICAgIG5vZGVbcHJvcE5hbWVdW2tdID0gKHZhbHVlID09PSB1bmRlZmluZWQpID8gcmVwbGFjZXIgOiB2YWx1ZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvdG90eXBlKHZhbHVlKSB7XG4gICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKVxuICAgIH0gZWxzZSBpZiAodmFsdWUuX19wcm90b19fKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5fX3Byb3RvX19cbiAgICB9IGVsc2UgaWYgKHZhbHVlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGVcbiAgICB9XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS92ZG9tL2FwcGx5LXByb3BlcnRpZXMuanNcbiAqKiBtb2R1bGUgaWQgPSA1M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIHBhdGNoID0gcmVxdWlyZShcIi4vdmRvbS9wYXRjaC5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS9wYXRjaC5qc1xuICoqIG1vZHVsZSBpZCA9IDU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKFwiZ2xvYmFsL2RvY3VtZW50XCIpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoXCJ4LWlzLWFycmF5XCIpXG5cbnZhciByZW5kZXIgPSByZXF1aXJlKFwiLi9jcmVhdGUtZWxlbWVudFwiKVxudmFyIGRvbUluZGV4ID0gcmVxdWlyZShcIi4vZG9tLWluZGV4XCIpXG52YXIgcGF0Y2hPcCA9IHJlcXVpcmUoXCIuL3BhdGNoLW9wXCIpXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoXG5cbmZ1bmN0aW9uIHBhdGNoKHJvb3ROb2RlLCBwYXRjaGVzLCByZW5kZXJPcHRpb25zKSB7XG4gICAgcmVuZGVyT3B0aW9ucyA9IHJlbmRlck9wdGlvbnMgfHwge31cbiAgICByZW5kZXJPcHRpb25zLnBhdGNoID0gcmVuZGVyT3B0aW9ucy5wYXRjaCAmJiByZW5kZXJPcHRpb25zLnBhdGNoICE9PSBwYXRjaFxuICAgICAgICA/IHJlbmRlck9wdGlvbnMucGF0Y2hcbiAgICAgICAgOiBwYXRjaFJlY3Vyc2l2ZVxuICAgIHJlbmRlck9wdGlvbnMucmVuZGVyID0gcmVuZGVyT3B0aW9ucy5yZW5kZXIgfHwgcmVuZGVyXG5cbiAgICByZXR1cm4gcmVuZGVyT3B0aW9ucy5wYXRjaChyb290Tm9kZSwgcGF0Y2hlcywgcmVuZGVyT3B0aW9ucylcbn1cblxuZnVuY3Rpb24gcGF0Y2hSZWN1cnNpdmUocm9vdE5vZGUsIHBhdGNoZXMsIHJlbmRlck9wdGlvbnMpIHtcbiAgICB2YXIgaW5kaWNlcyA9IHBhdGNoSW5kaWNlcyhwYXRjaGVzKVxuXG4gICAgaWYgKGluZGljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiByb290Tm9kZVxuICAgIH1cblxuICAgIHZhciBpbmRleCA9IGRvbUluZGV4KHJvb3ROb2RlLCBwYXRjaGVzLmEsIGluZGljZXMpXG4gICAgdmFyIG93bmVyRG9jdW1lbnQgPSByb290Tm9kZS5vd25lckRvY3VtZW50XG5cbiAgICBpZiAoIXJlbmRlck9wdGlvbnMuZG9jdW1lbnQgJiYgb3duZXJEb2N1bWVudCAhPT0gZG9jdW1lbnQpIHtcbiAgICAgICAgcmVuZGVyT3B0aW9ucy5kb2N1bWVudCA9IG93bmVyRG9jdW1lbnRcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG5vZGVJbmRleCA9IGluZGljZXNbaV1cbiAgICAgICAgcm9vdE5vZGUgPSBhcHBseVBhdGNoKHJvb3ROb2RlLFxuICAgICAgICAgICAgaW5kZXhbbm9kZUluZGV4XSxcbiAgICAgICAgICAgIHBhdGNoZXNbbm9kZUluZGV4XSxcbiAgICAgICAgICAgIHJlbmRlck9wdGlvbnMpXG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3ROb2RlXG59XG5cbmZ1bmN0aW9uIGFwcGx5UGF0Y2gocm9vdE5vZGUsIGRvbU5vZGUsIHBhdGNoTGlzdCwgcmVuZGVyT3B0aW9ucykge1xuICAgIGlmICghZG9tTm9kZSkge1xuICAgICAgICByZXR1cm4gcm9vdE5vZGVcbiAgICB9XG5cbiAgICB2YXIgbmV3Tm9kZVxuXG4gICAgaWYgKGlzQXJyYXkocGF0Y2hMaXN0KSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGNoTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3Tm9kZSA9IHBhdGNoT3AocGF0Y2hMaXN0W2ldLCBkb21Ob2RlLCByZW5kZXJPcHRpb25zKVxuXG4gICAgICAgICAgICBpZiAoZG9tTm9kZSA9PT0gcm9vdE5vZGUpIHtcbiAgICAgICAgICAgICAgICByb290Tm9kZSA9IG5ld05vZGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld05vZGUgPSBwYXRjaE9wKHBhdGNoTGlzdCwgZG9tTm9kZSwgcmVuZGVyT3B0aW9ucylcblxuICAgICAgICBpZiAoZG9tTm9kZSA9PT0gcm9vdE5vZGUpIHtcbiAgICAgICAgICAgIHJvb3ROb2RlID0gbmV3Tm9kZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3ROb2RlXG59XG5cbmZ1bmN0aW9uIHBhdGNoSW5kaWNlcyhwYXRjaGVzKSB7XG4gICAgdmFyIGluZGljZXMgPSBbXVxuXG4gICAgZm9yICh2YXIga2V5IGluIHBhdGNoZXMpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gXCJhXCIpIHtcbiAgICAgICAgICAgIGluZGljZXMucHVzaChOdW1iZXIoa2V5KSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbmRpY2VzXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS92ZG9tL3BhdGNoLmpzXG4gKiogbW9kdWxlIGlkID0gNTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIE1hcHMgYSB2aXJ0dWFsIERPTSB0cmVlIG9udG8gYSByZWFsIERPTSB0cmVlIGluIGFuIGVmZmljaWVudCBtYW5uZXIuXG4vLyBXZSBkb24ndCB3YW50IHRvIHJlYWQgYWxsIG9mIHRoZSBET00gbm9kZXMgaW4gdGhlIHRyZWUgc28gd2UgdXNlXG4vLyB0aGUgaW4tb3JkZXIgdHJlZSBpbmRleGluZyB0byBlbGltaW5hdGUgcmVjdXJzaW9uIGRvd24gY2VydGFpbiBicmFuY2hlcy5cbi8vIFdlIG9ubHkgcmVjdXJzZSBpbnRvIGEgRE9NIG5vZGUgaWYgd2Uga25vdyB0aGF0IGl0IGNvbnRhaW5zIGEgY2hpbGQgb2Zcbi8vIGludGVyZXN0LlxuXG52YXIgbm9DaGlsZCA9IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tSW5kZXhcblxuZnVuY3Rpb24gZG9tSW5kZXgocm9vdE5vZGUsIHRyZWUsIGluZGljZXMsIG5vZGVzKSB7XG4gICAgaWYgKCFpbmRpY2VzIHx8IGluZGljZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB7fVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGljZXMuc29ydChhc2NlbmRpbmcpXG4gICAgICAgIHJldHVybiByZWN1cnNlKHJvb3ROb2RlLCB0cmVlLCBpbmRpY2VzLCBub2RlcywgMClcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlY3Vyc2Uocm9vdE5vZGUsIHRyZWUsIGluZGljZXMsIG5vZGVzLCByb290SW5kZXgpIHtcbiAgICBub2RlcyA9IG5vZGVzIHx8IHt9XG5cblxuICAgIGlmIChyb290Tm9kZSkge1xuICAgICAgICBpZiAoaW5kZXhJblJhbmdlKGluZGljZXMsIHJvb3RJbmRleCwgcm9vdEluZGV4KSkge1xuICAgICAgICAgICAgbm9kZXNbcm9vdEluZGV4XSA9IHJvb3ROb2RlXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdkNoaWxkcmVuID0gdHJlZS5jaGlsZHJlblxuXG4gICAgICAgIGlmICh2Q2hpbGRyZW4pIHtcblxuICAgICAgICAgICAgdmFyIGNoaWxkTm9kZXMgPSByb290Tm9kZS5jaGlsZE5vZGVzXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJvb3RJbmRleCArPSAxXG5cbiAgICAgICAgICAgICAgICB2YXIgdkNoaWxkID0gdkNoaWxkcmVuW2ldIHx8IG5vQ2hpbGRcbiAgICAgICAgICAgICAgICB2YXIgbmV4dEluZGV4ID0gcm9vdEluZGV4ICsgKHZDaGlsZC5jb3VudCB8fCAwKVxuXG4gICAgICAgICAgICAgICAgLy8gc2tpcCByZWN1cnNpb24gZG93biB0aGUgdHJlZSBpZiB0aGVyZSBhcmUgbm8gbm9kZXMgZG93biBoZXJlXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4SW5SYW5nZShpbmRpY2VzLCByb290SW5kZXgsIG5leHRJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjdXJzZShjaGlsZE5vZGVzW2ldLCB2Q2hpbGQsIGluZGljZXMsIG5vZGVzLCByb290SW5kZXgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm9vdEluZGV4ID0gbmV4dEluZGV4XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXNcbn1cblxuLy8gQmluYXJ5IHNlYXJjaCBmb3IgYW4gaW5kZXggaW4gdGhlIGludGVydmFsIFtsZWZ0LCByaWdodF1cbmZ1bmN0aW9uIGluZGV4SW5SYW5nZShpbmRpY2VzLCBsZWZ0LCByaWdodCkge1xuICAgIGlmIChpbmRpY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB2YXIgbWluSW5kZXggPSAwXG4gICAgdmFyIG1heEluZGV4ID0gaW5kaWNlcy5sZW5ndGggLSAxXG4gICAgdmFyIGN1cnJlbnRJbmRleFxuICAgIHZhciBjdXJyZW50SXRlbVxuXG4gICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgIGN1cnJlbnRJbmRleCA9ICgobWF4SW5kZXggKyBtaW5JbmRleCkgLyAyKSA+PiAwXG4gICAgICAgIGN1cnJlbnRJdGVtID0gaW5kaWNlc1tjdXJyZW50SW5kZXhdXG5cbiAgICAgICAgaWYgKG1pbkluZGV4ID09PSBtYXhJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJdGVtID49IGxlZnQgJiYgY3VycmVudEl0ZW0gPD0gcmlnaHRcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50SXRlbSA8IGxlZnQpIHtcbiAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMVxuICAgICAgICB9IGVsc2UgIGlmIChjdXJyZW50SXRlbSA+IHJpZ2h0KSB7XG4gICAgICAgICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgPiBiID8gMSA6IC0xXG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aXJ0dWFsLWRvbS92ZG9tL2RvbS1pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDU2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYXBwbHlQcm9wZXJ0aWVzID0gcmVxdWlyZShcIi4vYXBwbHktcHJvcGVydGllc1wiKVxuXG52YXIgaXNXaWRnZXQgPSByZXF1aXJlKFwiLi4vdm5vZGUvaXMtd2lkZ2V0LmpzXCIpXG52YXIgVlBhdGNoID0gcmVxdWlyZShcIi4uL3Zub2RlL3ZwYXRjaC5qc1wiKVxuXG52YXIgdXBkYXRlV2lkZ2V0ID0gcmVxdWlyZShcIi4vdXBkYXRlLXdpZGdldFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFwcGx5UGF0Y2hcblxuZnVuY3Rpb24gYXBwbHlQYXRjaCh2cGF0Y2gsIGRvbU5vZGUsIHJlbmRlck9wdGlvbnMpIHtcbiAgICB2YXIgdHlwZSA9IHZwYXRjaC50eXBlXG4gICAgdmFyIHZOb2RlID0gdnBhdGNoLnZOb2RlXG4gICAgdmFyIHBhdGNoID0gdnBhdGNoLnBhdGNoXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBWUGF0Y2guUkVNT1ZFOlxuICAgICAgICAgICAgcmV0dXJuIHJlbW92ZU5vZGUoZG9tTm9kZSwgdk5vZGUpXG4gICAgICAgIGNhc2UgVlBhdGNoLklOU0VSVDpcbiAgICAgICAgICAgIHJldHVybiBpbnNlcnROb2RlKGRvbU5vZGUsIHBhdGNoLCByZW5kZXJPcHRpb25zKVxuICAgICAgICBjYXNlIFZQYXRjaC5WVEVYVDpcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdQYXRjaChkb21Ob2RlLCB2Tm9kZSwgcGF0Y2gsIHJlbmRlck9wdGlvbnMpXG4gICAgICAgIGNhc2UgVlBhdGNoLldJREdFVDpcbiAgICAgICAgICAgIHJldHVybiB3aWRnZXRQYXRjaChkb21Ob2RlLCB2Tm9kZSwgcGF0Y2gsIHJlbmRlck9wdGlvbnMpXG4gICAgICAgIGNhc2UgVlBhdGNoLlZOT0RFOlxuICAgICAgICAgICAgcmV0dXJuIHZOb2RlUGF0Y2goZG9tTm9kZSwgdk5vZGUsIHBhdGNoLCByZW5kZXJPcHRpb25zKVxuICAgICAgICBjYXNlIFZQYXRjaC5PUkRFUjpcbiAgICAgICAgICAgIHJlb3JkZXJDaGlsZHJlbihkb21Ob2RlLCBwYXRjaClcbiAgICAgICAgICAgIHJldHVybiBkb21Ob2RlXG4gICAgICAgIGNhc2UgVlBhdGNoLlBST1BTOlxuICAgICAgICAgICAgYXBwbHlQcm9wZXJ0aWVzKGRvbU5vZGUsIHBhdGNoLCB2Tm9kZS5wcm9wZXJ0aWVzKVxuICAgICAgICAgICAgcmV0dXJuIGRvbU5vZGVcbiAgICAgICAgY2FzZSBWUGF0Y2guVEhVTks6XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZVJvb3QoZG9tTm9kZSxcbiAgICAgICAgICAgICAgICByZW5kZXJPcHRpb25zLnBhdGNoKGRvbU5vZGUsIHBhdGNoLCByZW5kZXJPcHRpb25zKSlcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBkb21Ob2RlXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVOb2RlKGRvbU5vZGUsIHZOb2RlKSB7XG4gICAgdmFyIHBhcmVudE5vZGUgPSBkb21Ob2RlLnBhcmVudE5vZGVcblxuICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tTm9kZSlcbiAgICB9XG5cbiAgICBkZXN0cm95V2lkZ2V0KGRvbU5vZGUsIHZOb2RlKTtcblxuICAgIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIGluc2VydE5vZGUocGFyZW50Tm9kZSwgdk5vZGUsIHJlbmRlck9wdGlvbnMpIHtcbiAgICB2YXIgbmV3Tm9kZSA9IHJlbmRlck9wdGlvbnMucmVuZGVyKHZOb2RlLCByZW5kZXJPcHRpb25zKVxuXG4gICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdOb2RlKVxuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnROb2RlXG59XG5cbmZ1bmN0aW9uIHN0cmluZ1BhdGNoKGRvbU5vZGUsIGxlZnRWTm9kZSwgdlRleHQsIHJlbmRlck9wdGlvbnMpIHtcbiAgICB2YXIgbmV3Tm9kZVxuXG4gICAgaWYgKGRvbU5vZGUubm9kZVR5cGUgPT09IDMpIHtcbiAgICAgICAgZG9tTm9kZS5yZXBsYWNlRGF0YSgwLCBkb21Ob2RlLmxlbmd0aCwgdlRleHQudGV4dClcbiAgICAgICAgbmV3Tm9kZSA9IGRvbU5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGRvbU5vZGUucGFyZW50Tm9kZVxuICAgICAgICBuZXdOb2RlID0gcmVuZGVyT3B0aW9ucy5yZW5kZXIodlRleHQsIHJlbmRlck9wdGlvbnMpXG5cbiAgICAgICAgaWYgKHBhcmVudE5vZGUgJiYgbmV3Tm9kZSAhPT0gZG9tTm9kZSkge1xuICAgICAgICAgICAgcGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgZG9tTm9kZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdOb2RlXG59XG5cbmZ1bmN0aW9uIHdpZGdldFBhdGNoKGRvbU5vZGUsIGxlZnRWTm9kZSwgd2lkZ2V0LCByZW5kZXJPcHRpb25zKSB7XG4gICAgdmFyIHVwZGF0aW5nID0gdXBkYXRlV2lkZ2V0KGxlZnRWTm9kZSwgd2lkZ2V0KVxuICAgIHZhciBuZXdOb2RlXG5cbiAgICBpZiAodXBkYXRpbmcpIHtcbiAgICAgICAgbmV3Tm9kZSA9IHdpZGdldC51cGRhdGUobGVmdFZOb2RlLCBkb21Ob2RlKSB8fCBkb21Ob2RlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Tm9kZSA9IHJlbmRlck9wdGlvbnMucmVuZGVyKHdpZGdldCwgcmVuZGVyT3B0aW9ucylcbiAgICB9XG5cbiAgICB2YXIgcGFyZW50Tm9kZSA9IGRvbU5vZGUucGFyZW50Tm9kZVxuXG4gICAgaWYgKHBhcmVudE5vZGUgJiYgbmV3Tm9kZSAhPT0gZG9tTm9kZSkge1xuICAgICAgICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBkb21Ob2RlKVxuICAgIH1cblxuICAgIGlmICghdXBkYXRpbmcpIHtcbiAgICAgICAgZGVzdHJveVdpZGdldChkb21Ob2RlLCBsZWZ0Vk5vZGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbn1cblxuZnVuY3Rpb24gdk5vZGVQYXRjaChkb21Ob2RlLCBsZWZ0Vk5vZGUsIHZOb2RlLCByZW5kZXJPcHRpb25zKSB7XG4gICAgdmFyIHBhcmVudE5vZGUgPSBkb21Ob2RlLnBhcmVudE5vZGVcbiAgICB2YXIgbmV3Tm9kZSA9IHJlbmRlck9wdGlvbnMucmVuZGVyKHZOb2RlLCByZW5kZXJPcHRpb25zKVxuXG4gICAgaWYgKHBhcmVudE5vZGUgJiYgbmV3Tm9kZSAhPT0gZG9tTm9kZSkge1xuICAgICAgICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBkb21Ob2RlKVxuICAgIH1cblxuICAgIHJldHVybiBuZXdOb2RlXG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3lXaWRnZXQoZG9tTm9kZSwgdykge1xuICAgIGlmICh0eXBlb2Ygdy5kZXN0cm95ID09PSBcImZ1bmN0aW9uXCIgJiYgaXNXaWRnZXQodykpIHtcbiAgICAgICAgdy5kZXN0cm95KGRvbU5vZGUpXG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW9yZGVyQ2hpbGRyZW4oZG9tTm9kZSwgbW92ZXMpIHtcbiAgICB2YXIgY2hpbGROb2RlcyA9IGRvbU5vZGUuY2hpbGROb2Rlc1xuICAgIHZhciBrZXlNYXAgPSB7fVxuICAgIHZhciBub2RlXG4gICAgdmFyIHJlbW92ZVxuICAgIHZhciBpbnNlcnRcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW92ZXMucmVtb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZW1vdmUgPSBtb3Zlcy5yZW1vdmVzW2ldXG4gICAgICAgIG5vZGUgPSBjaGlsZE5vZGVzW3JlbW92ZS5mcm9tXVxuICAgICAgICBpZiAocmVtb3ZlLmtleSkge1xuICAgICAgICAgICAga2V5TWFwW3JlbW92ZS5rZXldID0gbm9kZVxuICAgICAgICB9XG4gICAgICAgIGRvbU5vZGUucmVtb3ZlQ2hpbGQobm9kZSlcbiAgICB9XG5cbiAgICB2YXIgbGVuZ3RoID0gY2hpbGROb2Rlcy5sZW5ndGhcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1vdmVzLmluc2VydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaW5zZXJ0ID0gbW92ZXMuaW5zZXJ0c1tqXVxuICAgICAgICBub2RlID0ga2V5TWFwW2luc2VydC5rZXldXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHdlaXJkZXN0IGJ1ZyBpJ3ZlIGV2ZXIgc2VlbiBpbiB3ZWJraXRcbiAgICAgICAgZG9tTm9kZS5pbnNlcnRCZWZvcmUobm9kZSwgaW5zZXJ0LnRvID49IGxlbmd0aCsrID8gbnVsbCA6IGNoaWxkTm9kZXNbaW5zZXJ0LnRvXSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VSb290KG9sZFJvb3QsIG5ld1Jvb3QpIHtcbiAgICBpZiAob2xkUm9vdCAmJiBuZXdSb290ICYmIG9sZFJvb3QgIT09IG5ld1Jvb3QgJiYgb2xkUm9vdC5wYXJlbnROb2RlKSB7XG4gICAgICAgIG9sZFJvb3QucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Um9vdCwgb2xkUm9vdClcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3Um9vdDtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ZpcnR1YWwtZG9tL3Zkb20vcGF0Y2gtb3AuanNcbiAqKiBtb2R1bGUgaWQgPSA1N1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGlzV2lkZ2V0ID0gcmVxdWlyZShcIi4uL3Zub2RlL2lzLXdpZGdldC5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVwZGF0ZVdpZGdldFxuXG5mdW5jdGlvbiB1cGRhdGVXaWRnZXQoYSwgYikge1xuICAgIGlmIChpc1dpZGdldChhKSAmJiBpc1dpZGdldChiKSkge1xuICAgICAgICBpZiAoXCJuYW1lXCIgaW4gYSAmJiBcIm5hbWVcIiBpbiBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5pZCA9PT0gYi5pZFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGEuaW5pdCA9PT0gYi5pbml0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2Vcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3ZpcnR1YWwtZG9tL3Zkb20vdXBkYXRlLXdpZGdldC5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9