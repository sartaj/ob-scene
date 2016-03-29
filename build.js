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
	
	var _kefir = __webpack_require__(1);
	
	var _kefir2 = _interopRequireDefault(_kefir);
	
	var _pace = __webpack_require__(2);
	
	var _pace2 = _interopRequireDefault(_pace);
	
	var _obScene = __webpack_require__(3);
	
	var _obScene2 = _interopRequireDefault(_obScene);
	
	var _controls = __webpack_require__(6);
	
	var _controls2 = _interopRequireDefault(_controls);
	
	var _index = __webpack_require__(11);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _audioplayer = __webpack_require__(14);
	
	var _audioplayer2 = _interopRequireDefault(_audioplayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// audioplayer.config(sceneAudioConfig)
	
	// function compile(path) {
	//   const sceneHtmlString = sceneCompiler.renderHTML()
	//   const sceneConfig = sceneCompiler.getScenes()
	//   const sceneAudioConfig =  sceneCompiler.getAudioConfig()
	// }
	
	// import sceneCompiler from './scene-compiler.js'
	
	// The focus of the library is to be reactive throughout.
	// The primary reactive library used in our app. Most knowledge gaps will be attributed to
	module.exports.init = function (config) {
	  init(config);
	};
	
	function init(config) {
	  // Pace requires a .start to show the loading screen
	  _pace2.default.start();
	
	  var sceneHtmlString = config.sceneHtmlString;
	  var sceneConfig = config.sceneConfig;
	
	  var initLoadingComplete = _kefir2.default.fromEvents(_pace2.default, 'done').filter(checkReadyState);
	
	  var touchDeviceDetected = initLoadingComplete.filter(isTouchDevice);
	
	  touchDeviceDetected.onValue(function () {
	    $('#unsupported').show();
	    $(".container").hide();
	    $(".loading").hide();
	  });
	
	  var readyToParse = initLoadingComplete.filter(function () {
	    return !isTouchDevice();
	  });
	
	  readyToParse.onValue(function () {
	    _obScene2.default.init(sceneConfig);
	    _controls2.default.init();
	  });
	
	  readyToParse.onValue(function () {
	    $('.container-inner').html(sceneHtmlString);
	    $('.loading').delay(300).fadeOut();
	    // audioplayer.next('intro');
	    // audioplayer.play();
	  });
	}
	
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

/***/ },
/* 1 */
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
/* 2 */
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
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _kefir = __webpack_require__(1);
	
	var Kefir = _interopRequireWildcard(_kefir);
	
	var _pageUtils = __webpack_require__(4);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*
	 *  Globals
	*/
	
	/*
	 *  Dependencies
	*/
	
	var CONSTANTS = __webpack_require__(5);
	
	// const PROPERTIES = CONSTANTS.PROPERTIES
	var ANIMATION_TIME = CONSTANTS.ANIMATION_TIME;
	
	var $window = CONSTANTS.WINDOW;
	var $bodyhtml = CONSTANTS.BODYHTML;
	
	var INIT_STATE = CONSTANTS.INIT_STATE;
	
	/*
	 *  Initialize
	*/
	
	var stateInitialized$ = Kefir.pool();
	
	var initState = Kefir.stream(function (emitter) {
	  emitter.emit(INIT_STATE);
	});
	
	module.exports.init = function (retreivedKeyFrames) {
	  var keyFramesRetreived$ = Kefir.stream(function (emitter) {
	    emitter.emit(retreivedKeyFrames);
	  });
	
	  var keyFramesMappedToState$ = keyFramesRetreived$.flatMap(function (keyframes) {
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
	
	  stateInitialized$.plug(keyFramesMappedToState$);
	};
	
	/*
	 *  Build Page
	*/
	
	var windowResized$ = stateInitialized$.flatMap(function (state) {
	  return Kefir.fromEvents($window, 'resize', function () {
	    return state;
	  });
	}).throttle(ANIMATION_TIME);
	
	var dimensionsCalculated$ = Kefir.merge([stateInitialized$, windowResized$]).map(calculateDimensions).map(convertKeyFrames).map(calculateKeyFramesAndFocus).map(setInitWrapper);
	
	function calculateDimensions(state) {
	  var s = state;
	  s.scrollTop = Math.floor($window.scrollTop());
	  s.windowHeight = $window.height();
	  s.windowWidth = $window.width();
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
	
	var windowScrolled$ = Kefir.fromEvents($window, 'scroll').throttle(ANIMATION_TIME);
	
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
	  s.scrollTop = Math.floor($window.scrollTop());
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
	      $window.trigger('FOCUS_NEXT');
	      break;
	    case 'previous':
	      $window.trigger('FOCUS_PREVIOUS');
	      break;
	    default:
	      break;
	  }
	};
	
	var actionFocusNext = scrollTopChanged$.flatMapFirst(function (state) {
	  return Kefir.fromEvents($window, 'FOCUS_NEXT', function () {
	    return state;
	  });
	}).map(function (state) {
	  return state[1];
	}).map(nextFocus);
	
	var actionFocusPrevious = scrollTopChanged$.flatMapFirst(function (state) {
	  return Kefir.fromEvents($window, 'FOCUS_PREVIOUS', function () {
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
	
	var focusChanged$ = Kefir.merge([actionFocusPrevious, actionFocusNext]).onValue(renderScroll);
	
	// TODO: Remove log
	focusChanged$.log();
	
	// TODO: Abstract Render to renderer
	function renderScroll(scroll) {
	  // console.log("RENDER", scroll, Math.floor($window.scrollTop()))
	  $bodyhtml.animate({
	    scrollTop: scroll
	  }, 1500, 'linear');
	}
	
	/*
	 *  Helpers
	*/

	// function throwError() {
	//   $bodyhtml.addClass('page-error')
	// }

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var PROPERTIES = ['translateX', 'translateY', 'opacity', 'rotate', 'scale'];
	var ANIMATION_TIME = 41;
	
	var $window = $(window);
	var $bodyhtml = $('body,html');
	
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
	module.exports.WINDOW = $window;
	module.exports.BODYHTML = $bodyhtml;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Kefir = __webpack_require__(1);
	
	var obscene = __webpack_require__(3);
	
	module.exports.init = function () {
	
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
	};

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _obScene = __webpack_require__(3);
	
	var _pageUtils = __webpack_require__(4);
	
	var pageUtils = _interopRequireWildcard(_pageUtils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*
	 *  Streams
	*/
	
	/*
	 *  DOM Elements
	*/
	
	/*
	 *  Dependencies
	*/
	
	var $window = $(window);
	var $body = $('body,html');
	var $experienceIndicator = $('#experience-progress .progress');
	
	/*
	 *  Child Renders
	*/
	
	var renderWrapper = __webpack_require__(12);
	var renderScrollbar = __webpack_require__(13);
	var renderAudioPlayer = __webpack_require__(14);
	var renderVideoPlayer = __webpack_require__(18);
	var renderError = __webpack_require__(19);
	
	/*
	 *  Render
	*/
	
	// Hack to force resize once. For some
	// reason this prevents the animations from blinking on Chrome
	_obScene.scrollTopChanged$.take(1).delay(500).onValue(function () {
	  $window.trigger('resize');
	});
	
	// Render Dimensions
	_obScene.dimensionsCalculated$.onValue(function (state) {
	  $body.height(state.bodyHeight);
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
	    ga('send', 'scene_accessed', currentWrapper[1]); // Google Analytics
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
	
	function renderMusic(wrapperId) {
	  audioplayer.next(wrapperId.substr(1));
	}
	
	function animateScrollBar(state) {
	  var percent = (state.scrollTop / state.bodyHeight).toFixed(2) * 100;
	  $experienceIndicator.css({
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

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	function renderScroll(scroll) {
	  console.log("RENDER", scroll, Math.floor($window.scrollTop()));
	  $bodyhtml.animate({ scrollTop: scroll }, 1500, 'linear');
	}
	
	function animateScrollBar() {
	  var percent = (scrollTop / bodyHeight).toFixed(2) * 100;
	  $experienceIndicator.css({
	    'transform': 'translateY(' + percent + '%)'
	  });
	}
	function buildScrollBarCenters() {
	  frameFocus.map(function (center) {
	    return (center / bodyHeight).toFixed(2) * 100;
	  }).map(function (centerPercent) {
	    return centerPercent + "vh";
	  }).map(function (centerVh) {
	    $("#experience-progress").append('<div class="center-marker" style="top:' + centerVh + '"></div>');
	  });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var looper = __webpack_require__(15);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Howl = __webpack_require__(16).Howl;
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*! howler.js v2.0.0-beta7 | (c) 2013-2016, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
	!function(){"use strict";function e(){try{"undefined"!=typeof AudioContext?n=new AudioContext:"undefined"!=typeof webkitAudioContext?n=new webkitAudioContext:o=!1}catch(e){o=!1}if(!o)if("undefined"!=typeof Audio)try{var d=new Audio;"undefined"==typeof d.oncanplaythrough&&(u="canplay")}catch(e){t=!0}else t=!0;try{var d=new Audio;d.muted&&(t=!0)}catch(e){}var a=/iP(hone|od|ad)/.test(navigator.platform),i=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),_=i?parseInt(i[1],10):null;if(a&&_&&9>_){var s=/safari/.test(window.navigator.userAgent.toLowerCase());(window.navigator.standalone&&!s||!window.navigator.standalone&&!s)&&(o=!1)}o&&(r="undefined"==typeof n.createGain?n.createGainNode():n.createGain(),r.gain.value=1,r.connect(n.destination))}var n=null,o=!0,t=!1,r=null,u="canplaythrough";e();var d=function(){this.init()};d.prototype={init:function(){var e=this||a;return e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e.state=n?n.state||"running":"running",e.autoSuspend=!0,e._autoSuspend(),e.mobileAutoEnable=!0,e.noAudio=t,e.usingWebAudio=o,e.ctx=n,t||e._setupCodecs(),e},volume:function(e){var n=this||a;if(e=parseFloat(e),"undefined"!=typeof e&&e>=0&&1>=e){n._volume=e,o&&(r.gain.value=e);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var u=n._howls[t]._getSoundIds(),d=0;d<u.length;d++){var i=n._howls[t]._soundById(u[d]);i&&i._node&&(i._node.volume=i._volume*e)}return n}return n._volume},mute:function(e){var n=this||a;n._muted=e,o&&(r.gain.value=e?0:n._volume);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var u=n._howls[t]._getSoundIds(),d=0;d<u.length;d++){var i=n._howls[t]._soundById(u[d]);i&&i._node&&(i._node.muted=e?!0:i._muted)}return n},unload:function(){for(var o=this||a,t=o._howls.length-1;t>=0;t--)o._howls[t].unload();return o.usingWebAudio&&"undefined"!=typeof n.close&&(o.ctx=null,n.close(),e(),o.ctx=n),o},codecs:function(e){return(this||a)._codecs[e]},_setupCodecs:function(){var e=this||a,n=new Audio,o=n.canPlayType("audio/mpeg;").replace(/^no$/,""),t=/OPR\//.test(navigator.userAgent);return e._codecs={mp3:!(t||!o&&!n.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!o,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!n.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||a,o=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk/i.test(navigator.userAgent),t=!!("ontouchend"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0);if(!n||!e._mobileEnabled&&o&&t){e._mobileEnabled=!1;var r=function(){var o=n.createBuffer(1,1,22050),t=n.createBufferSource();t.buffer=o,t.connect(n.destination),"undefined"==typeof t.start?t.noteOn(0):t.start(0),t.onended=function(){t.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchend",r,!0)}};return document.addEventListener("touchend",r,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&n&&"undefined"!=typeof n.suspend&&o){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio)for(var r=0;r<e._howls[t]._sounds.length;r++)if(!e._howls[t]._sounds[r]._paused)return e;return e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",n.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(n&&"undefined"!=typeof n.resume&&o)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.state="resuming",n.resume().then(function(){e.state="running"}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var a=new d,i=function(e){var n=this;return e.src&&0!==e.src.length?void n.init(e):void console.error("An array of source files must be passed with any new Howl.")};i.prototype={init:function(e){var t=this;return t._autoplay=e.autoplay||!1,t._format="string"!=typeof e.format?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"==typeof e.preload?e.preload:!0,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._duration=0,t._loaded=!1,t._sounds=[],t._endTimers={},t._queue=[],t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._webAudio=o&&!t._html5,"undefined"!=typeof n&&n&&a.mobileAutoEnable&&a._enableMobileAudio(),a._howls.push(t),t._preload&&t.load(),t},load:function(){var e=this,n=null;if(t)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var o=0;o<e._src.length;o++){var r,u;if(e._format&&e._format[o]?r=e._format[o]:(u=e._src[o],r=/^data:audio\/([^;,]+);/i.exec(u),r||(r=/\.([^.]+)$/.exec(u.split("?",1)[0])),r&&(r=r[1].toLowerCase())),a.codecs(r)){n=e._src[o];break}}return n?(e._src=n,"https:"===window.location.protocol&&"http:"===n.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new _(e),e._webAudio&&l(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e){var o=this,t=arguments,r=null;if("number"==typeof e)r=e,e=null;else if("undefined"==typeof e){e="__default";for(var d=0,i=0;i<o._sounds.length;i++)o._sounds[i]._paused&&!o._sounds[i]._ended&&(d++,r=o._sounds[i]._id);1===d?e=null:r=null}var _=r?o._soundById(r):o._inactiveSound();if(!_)return null;if(r&&!e&&(e=_._sprite||"__default"),!o._loaded&&!o._sprite[e])return o._queue.push({event:"play",action:function(){o.play(o._soundById(_._id)?_._id:void 0)}}),_._id;if(r&&!_._paused)return _._id;o._webAudio&&a._autoResume();var s=_._seek>0?_._seek:o._sprite[e][0]/1e3,l=(o._sprite[e][0]+o._sprite[e][1])/1e3-s,f=1e3*l/Math.abs(_._rate);f!==1/0&&(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),_._paused=!1,_._ended=!1,_._sprite=e,_._seek=s,_._start=o._sprite[e][0]/1e3,_._stop=(o._sprite[e][0]+o._sprite[e][1])/1e3,_._loop=!(!_._loop&&!o._sprite[e][2]);var c=_._node;if(o._webAudio){var p=function(){o._refreshBuffer(_);var e=_._muted||o._muted?0:_._volume*a.volume();c.gain.setValueAtTime(e,n.currentTime),_._playStart=n.currentTime,"undefined"==typeof c.bufferSource.start?_._loop?c.bufferSource.noteGrainOn(0,s,86400):c.bufferSource.noteGrainOn(0,s,l):_._loop?c.bufferSource.start(0,s,86400):c.bufferSource.start(0,s,l),o._endTimers[_._id]||f===1/0||(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),t[1]||setTimeout(function(){o._emit("play",_._id)},0)};o._loaded?p():(o.once("load",p,_._id),o._clearTimer(_._id))}else{var m=function(){c.currentTime=s,c.muted=_._muted||o._muted||a._muted||c.muted,c.volume=_._volume*a.volume(),c.playbackRate=_._rate,setTimeout(function(){c.play(),t[1]||o._emit("play",_._id)},0)};if(4===c.readyState||!c.readyState&&navigator.isCocoonJS)m();else{var v=function(){f!==1/0&&(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),m(),c.removeEventListener(u,v,!1)};c.addEventListener(u,v,!1),o._clearTimer(_._id)}}return _._id},pause:function(e){var n=this;if(!n._loaded)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused){if(r._seek=n.seek(o[t]),r._paused=!0,n._stopFade(o[t]),r._node)if(n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),r._node.bufferSource=null}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r._id)}}return n},stop:function(e){var n=this;if(!n._loaded)return"undefined"!=typeof n._sounds[0]._sprite&&n._queue.push({event:"stop",action:function(){n.stop(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused){if(r._seek=r._start||0,r._paused=!0,r._ended=!0,n._stopFade(o[t]),r._node)if(n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),r._node.bufferSource=null}else isNaN(r._node.duration)&&r._node.duration!==1/0||(r._node.pause(),r._node.currentTime=r._start||0);n._emit("stop",r._id)}}return n},mute:function(e,o){var t=this;if(!t._loaded)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if("undefined"==typeof o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),u=0;u<r.length;u++){var d=t._soundById(r[u]);d&&(d._muted=e,t._webAudio&&d._node?d._node.gain.setValueAtTime(e?0:d._volume*a.volume(),n.currentTime):d._node&&(d._node.muted=a._muted?!0:e),t._emit("mute",d._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length){var u=t._getSoundIds(),d=u.indexOf(r[0]);d>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var i;if(!("undefined"!=typeof e&&e>=0&&1>=e))return i=o?t._soundById(o):t._sounds[0],i?i._volume:0;if(!t._loaded)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;"undefined"==typeof o&&(t._volume=e),o=t._getSoundIds(o);for(var _=0;_<o.length;_++)i=t._soundById(o[_]),i&&(i._volume=e,r[2]||t._stopFade(o[_]),t._webAudio&&i._node&&!i._muted?i._node.gain.setValueAtTime(e*a.volume(),n.currentTime):i._node&&!i._muted&&(i._node.volume=e*a.volume()),t._emit("volume",i._id));return t},fade:function(e,o,t,r){var u=this;if(!u._loaded)return u._queue.push({event:"fade",action:function(){u.fade(e,o,t,r)}}),u;u.volume(e,r);for(var d=u._getSoundIds(r),a=0;a<d.length;a++){var i=u._soundById(d[a]);if(i)if(r||u._stopFade(d[a]),u._webAudio&&!i._muted){var _=n.currentTime,s=_+t/1e3;i._volume=e,i._node.gain.setValueAtTime(e,_),i._node.gain.linearRampToValueAtTime(o,s),i._timeout=setTimeout(function(e,t){delete t._timeout,setTimeout(function(){t._volume=o,u._emit("fade",e)},s-n.currentTime>0?Math.ceil(1e3*(s-n.currentTime)):0)}.bind(u,d[a],i),t)}else{var l=Math.abs(e-o),f=e>o?"out":"in",c=l/.01,p=t/c;!function(){var n=e;i._interval=setInterval(function(e,t){n+="in"===f?.01:-.01,n=Math.max(0,n),n=Math.min(1,n),n=Math.round(100*n)/100,u.volume(n,e,!0),n===o&&(clearInterval(t._interval),delete t._interval,u._emit("fade",e))}.bind(u,d[a],i),p)}()}}return u},_stopFade:function(e){var o=this,t=o._soundById(e);return t._interval?(clearInterval(t._interval),delete t._interval,o._emit("fade",e)):t._timeout&&(clearTimeout(t._timeout),delete t._timeout,t._node.gain.cancelScheduledValues(n.currentTime),o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return o=t._soundById(parseInt(r[0],10)),o?o._loop:!1;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var u=t._getSoundIds(n),d=0;d<u.length;d++)o=t._soundById(u[d]),o&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e));return t},rate:function(){var e,n,o=this,t=arguments;if(0===t.length)n=o._sounds[0]._id;else if(1===t.length){var r=o._getSoundIds(),u=r.indexOf(t[0]);u>=0?n=parseInt(t[0],10):e=parseFloat(t[0])}else 2===t.length&&(e=parseFloat(t[0]),n=parseInt(t[1],10));var d;if("number"!=typeof e)return d=o._soundById(n),d?d._rate:o._rate;if(!o._loaded)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,t)}}),o;"undefined"==typeof n&&(o._rate=e),n=o._getSoundIds(n);for(var a=0;a<n.length;a++)if(d=o._soundById(n[a])){d._rate=e,o._webAudio&&d._node&&d._node.bufferSource?d._node.bufferSource.playbackRate.value=e:d._node&&(d._node.playbackRate=e);var i=o.seek(n[a]),_=(o._sprite[d._sprite][0]+o._sprite[d._sprite][1])/1e3-i,s=1e3*_/Math.abs(d._rate);o._clearTimer(n[a]),o._endTimers[n[a]]=setTimeout(o._ended.bind(o,d),s),o._emit("rate",d._id)}return o},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var u=t._getSoundIds(),d=u.indexOf(r[0]);d>=0?o=parseInt(r[0],10):(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if("undefined"==typeof o)return t;if(!t._loaded)return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var a=t._soundById(o);if(a){if(!(e>=0))return t._webAudio?a._seek+(t.playing(o)?n.currentTime-a._playStart:0):a._node.currentTime;var i=t.playing(o);i&&t.pause(o,!0),a._seek=e,t._clearTimer(o),i&&t.play(o,!0),t._emit("seek",o)}return t},playing:function(e){var n=this,o=n._soundById(e)||n._sounds[0];return o?!o._paused:!1},duration:function(){return this._duration},unload:function(){for(var e=this,n=e._sounds,o=0;o<n.length;o++){n[o]._paused||(e.stop(n[o]._id),e._emit("end",n[o]._id)),e._webAudio||(n[o]._node.src="",n[o]._node.removeEventListener("error",n[o]._errorFn,!1),n[o]._node.removeEventListener(u,n[o]._loadFn,!1)),delete n[o]._node,e._clearTimer(n[o]._id);var t=a._howls.indexOf(e);t>=0&&a._howls.splice(t,1)}return s&&delete s[e._src],e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,u=r["_on"+e];return"function"==typeof n&&u.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e];if(n){for(var u=0;u<r.length;u++)if(n===r[u].fn&&o===r[u].id){r.splice(u,1);break}}else if(e)t["_on"+e]=[];else for(var d=Object.keys(t),u=0;u<d.length;u++)0===d[u].indexOf("_on")&&Array.isArray(t[d[u]])&&(t[d[u]]=[]);return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],u=r.length-1;u>=0;u--)r[u].id&&r[u].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[u].fn),0),r[u].once&&t.off(e,r[u].fn,r[u].id));return t},_loadQueue:function(){var e=this;if(e._queue.length>0){var n=e._queue[0];e.once(n.event,function(){e._queue.shift(),e._loadQueue()}),n.action()}return e},_ended:function(e){var o=this,t=e._sprite,r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._playStart=n.currentTime;var u=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),u)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,o._clearTimer(e._id),e._node.bufferSource=null,a._autoSuspend()),o._webAudio||r||o.stop(e._id),o},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new _(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(n>=o)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if("undefined"==typeof e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.createBufferSource(),e._node.bufferSource.buffer=s[o._src],e._node.bufferSource.connect(e._panner?e._panner:e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=o._rate,o}};var _=function(e){this._parent=e,this.init()};if(_.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),n._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=a._muted||e._muted||e._parent._muted?0:e._volume*a.volume();return o._webAudio?(e._node="undefined"==typeof n.createGain?n.createGainNode():n.createGain(),e._node.gain.setValueAtTime(t,n.currentTime),e._node.paused=!0,e._node.connect(r)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(u,e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t,e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),e},_errorListener:function(){var e=this;e._node.error&&4===e._node.error.code&&(a.noAudio=!0),e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorListener,!1)},_loadListener:function(){var e=this,n=e._parent;n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),n._loaded||(n._loaded=!0,n._emit("load"),n._loadQueue()),n._autoplay&&n.play(),e._node.removeEventListener(u,e._loadFn,!1)}},o)var s={},l=function(e){var n=e._src;if(s[n])return e._duration=s[n].duration,void p(e);if(/^data:[^;]+;base64,/.test(n)){window.atob=window.atob||function(e){for(var n,o,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r=String(e).replace(/=+$/,""),u=0,d=0,a="";o=r.charAt(d++);~o&&(n=u%4?64*n+o:o,u++%4)?a+=String.fromCharCode(255&n>>(-2*u&6)):0)o=t.indexOf(o);return a};for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),r=0;r<o.length;++r)t[r]=o.charCodeAt(r);c(t.buffer,e)}else{var u=new XMLHttpRequest;u.open("GET",n,!0),u.responseType="arraybuffer",u.onload=function(){c(u.response,e)},u.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete s[n],e.load())},f(u)}},f=function(e){try{e.send()}catch(n){e.onerror()}},c=function(e,o){n.decodeAudioData(e,function(e){e&&o._sounds.length>0&&(s[o._src]=e,p(o,e))},function(){o._emit("loaderror",null,"Decoding audio data failed.")})},p=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e._emit("load"),e._loadQueue()),e._autoplay&&e.play()};"function"=="function"&&__webpack_require__(17)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return{Howler:a,Howl:i}}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),"undefined"!=typeof exports&&(exports.Howler=a,exports.Howl=i),"undefined"!=typeof window?(window.HowlerGlobal=d,window.Howler=a,window.Howl=i,window.Sound=_):"undefined"!=typeof global&&(global.HowlerGlobal=d,global.Howler=a,global.Howl=i,global.Sound=_)}();
	/*! Effects Plugin */
	!function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype._velocity=[0,0,0],HowlerGlobal.prototype._listenerAttr={dopplerFactor:1,speedOfSound:343.3},HowlerGlobal.prototype.pos=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._pos[1]:n,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof e?o._pos:(o._pos=[e,n,t],o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,n,t,o,r,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;var p=a._orientation;return n="number"!=typeof n?p[1]:n,t="number"!=typeof t?p[2]:t,o="number"!=typeof o?p[3]:o,r="number"!=typeof r?p[4]:r,i="number"!=typeof i?p[5]:i,"number"!=typeof e?p:(a._orientation=[e,n,t,o,r,i],a.ctx.listener.setOrientation(e,n,t,o,r,i),a)},HowlerGlobal.prototype.velocity=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._velocity[1]:n,t="number"!=typeof t?o._velocity[2]:t,"number"!=typeof e?o._velocity:(o._velocity=[e,n,t],o.ctx.listener.setVelocity(o._velocity[0],o._velocity[1],o._velocity[2]),o)):o},HowlerGlobal.prototype.listenerAttr=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;var t=n._listenerAttr;return e?(n._listenerAttr={dopplerFactor:"undefined"!=typeof e.dopplerFactor?e.dopplerFactor:t.dopplerFactor,speedOfSound:"undefined"!=typeof e.speedOfSound?e.speedOfSound:t.speedOfSound},n.ctx.listener.dopplerFactor=t.dopplerFactor,n.ctx.listener.speedOfSound=t.speedOfSound,n):t},Howl.prototype.init=function(e){return function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._pos=n.pos||null,t._velocity=n.velocity||[0,0,0],t._pannerAttr={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:0,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:"inverse",maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:1e4,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:"HRTF",refDistance:"undefined"!=typeof n.refDistance?n.refDistance:1,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:1},e.call(this,n)}}(Howl.prototype.init),Howl.prototype.pos=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.pos(n,t,o,r)}),i;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,"undefined"==typeof r){if("number"!=typeof n)return i._pos;i._pos=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._pos;l._pos=[n,t,o],l._node&&(l._panner||e(l),l._panner.setPosition(n,t,o))}}return i},Howl.prototype.orientation=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.orientation(n,t,o,r)}),i;if(t="number"!=typeof t?i._orientation[1]:t,o="number"!=typeof o?i._orientation[2]:o,"undefined"==typeof r){if("number"!=typeof n)return i._orientation;i._orientation=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._orientation;l._orientation=[n,t,o],l._node&&(l._panner||e(l),l._panner.setOrientation(n,t,o))}}return i},Howl.prototype.velocity=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.velocity(n,t,o,r)}),i;if(t="number"!=typeof t?i._velocity[1]:t,o="number"!=typeof o?i._velocity[2]:o,"undefined"==typeof r){if("number"!=typeof n)return i._velocity;i._velocity=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._velocity;l._velocity=[n,t,o],l._node&&(l._panner||e(l),l._panner.setVelocity(n,t,o))}}return i},Howl.prototype.pannerAttr=function(){var n,t,o,r=this,i=arguments;if(!r._webAudio)return r;if(0===i.length)return r._pannerAttr;if(1===i.length){if("object"!=typeof i[0])return o=r._soundById(parseInt(i[0],10)),o?o._pannerAttr:r._pannerAttr;n=i[0],"undefined"==typeof t&&(r._pannerAttr={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:r._coneOuterAngle,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:r._coneOuterGain,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:r._distanceModel,maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:r._maxDistance,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:r._panningModel,refDistance:"undefined"!=typeof n.refDistance?n.refDistance:r._refDistance,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:r._rolloffFactor})}else 2===i.length&&(n=i[0],t=parseInt(i[1],10));for(var a=r._getSoundIds(t),p=0;p<a.length;p++)if(o=r._soundById(a[p])){var l=o._pannerAttr;l={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:l.coneInnerAngle,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:l.coneOuterAngle,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:l.coneOuterGain,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:l.distanceModel,maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:l.maxDistance,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:l.panningModel,refDistance:"undefined"!=typeof n.refDistance?n.refDistance:l.refDistance,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:l.rolloffFactor};var c=o._panner;c?(c.coneInnerAngle=l.coneInnerAngle,c.coneOuterAngle=l.coneOuterAngle,c.coneOuterGain=l.coneOuterGain,c.distanceModel=l.distanceModel,c.maxDistance=l.maxDistance,c.panningModel=l.panningModel,c.refDistance=l.refDistance,c.rolloffFactor=l.rolloffFactor):(o._pos||(o._pos=r._pos||[0,0,-.5]),e(o))}return r},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._pos=t._pos,n._velocity=t._velocity,n._pannerAttr=t._pannerAttr,e.call(this),n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._pos=t._pos,n._velocity=t._velocity,n._pannerAttr=t._pannerAttr,e.call(this)}}(Sound.prototype.reset);var e=function(e){e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.panningModel=e._pannerAttr.panningModel,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2]),e._panner.setVelocity(e._velocity[0],e._velocity[1],e._velocity[2]),e._panner.connect(e._node),e._paused||e._parent.pause(e._id).play(e._id)}}();
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 17 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports) {

	"use strict";

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzEyYWUxNjFiYTI5YjkyMWFjODgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL34va2VmaXIvZGlzdC9rZWZpci5qcyIsIndlYnBhY2s6Ly8vLi9+L3BhY2UvcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2Itc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3BhZ2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXNlci9jb250cm9scy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXIvc2Nyb2xsYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXIvYXVkaW9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlci9sb29wZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ob3dsZXIvaG93bGVyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyL3ZpZGVvcGxheWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBLFFBQU8sT0FBUCxDQUFlLElBQWYsR0FBc0IsVUFBQyxNQUFELEVBQVk7QUFDaEMsUUFBSyxNQUFMLEVBRGdDO0VBQVo7O0FBSXRCLFVBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0I7O0FBRXBCLGtCQUFLLEtBQUwsR0FGb0I7O0FBSXBCLE9BQU0sa0JBQWtCLE9BQU8sZUFBUCxDQUpKO0FBS3BCLE9BQU0sY0FBYyxPQUFPLFdBQVAsQ0FMQTs7QUFPcEIsT0FBTSxzQkFBc0IsZ0JBQU0sVUFBTixpQkFBdUIsTUFBdkIsRUFDekIsTUFEeUIsQ0FDbEIsZUFEa0IsQ0FBdEIsQ0FQYzs7QUFVcEIsT0FBTSxzQkFBc0Isb0JBQ3pCLE1BRHlCLENBQ2xCLGFBRGtCLENBQXRCLENBVmM7O0FBYXBCLHVCQUNHLE9BREgsQ0FDVyxZQUFNO0FBQ2IsT0FBRSxjQUFGLEVBQWtCLElBQWxCLEdBRGE7QUFFYixPQUFFLFlBQUYsRUFBZ0IsSUFBaEIsR0FGYTtBQUdiLE9BQUUsVUFBRixFQUFjLElBQWQsR0FIYTtJQUFOLENBRFgsQ0Fib0I7O0FBb0JwQixPQUFNLGVBQWUsb0JBQ2xCLE1BRGtCLENBQ1g7WUFBTSxDQUFFLGVBQUY7SUFBTixDQURKLENBcEJjOztBQXVCcEIsZ0JBQWEsT0FBYixDQUFxQixZQUFNO0FBQ3pCLHVCQUFRLElBQVIsQ0FBYSxXQUFiLEVBRHlCO0FBRXpCLHdCQUFTLElBQVQsR0FGeUI7SUFBTixDQUFyQixDQXZCb0I7O0FBNEJwQixnQkFBYSxPQUFiLENBQXFCLFlBQU07QUFDdkIsT0FBRSxrQkFBRixFQUFzQixJQUF0QixDQUEyQixlQUEzQixFQUR1QjtBQUV2QixPQUFFLFVBQUYsRUFBYyxLQUFkLENBQW9CLEdBQXBCLEVBQXlCLE9BQXpCOzs7QUFGdUIsSUFBTixDQUFyQixDQTVCb0I7RUFBdEI7O0FBb0NBLFVBQVMsZUFBVCxHQUEyQjtBQUN6QixVQUFRLFNBQVMsVUFBVCxLQUF3QixVQUF4QjtPQUNFLFNBQVMsVUFBVCxLQUF3QixRQUF4QjtBQURGLE9BRUUsU0FBUyxVQUFULEtBQXdCLGFBQXhCO0FBRlYsSUFEeUI7RUFBM0I7O0FBT0EsVUFBUyxhQUFULEdBQXlCO0FBQ3ZCLFVBQU8sa0JBQWtCLE1BQWxCO09BQ0YsdUJBQXVCLE1BQXZCO0FBRmtCLEU7Ozs7OztBQ3RFekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCxxQ0FBb0M7QUFDcEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGVBQWMsc0NBQXNDLEVBQUUsNEJBQTRCLEVBQUU7QUFDcEY7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBaUMsNEJBQTRCO0FBQzdEO0FBQ0E7QUFDQSxrQ0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FB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RUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBLE9BQU07QUFDTixLQUFJO0FBQ0o7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2Q0FBNEMsU0FBUztBQUNyRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZDQUE0QyxPQUFPO0FBQ25EOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZDQUE0QyxPQUFPO0FBQ25EOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEMsT0FBTztBQUNuRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxrQ0FBa0M7QUFDOUU7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBOztBQUVBLHVCQUFzQixxQkFBcUI7QUFDM0M7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EscUJBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVCQUFzQixTQUFTO0FBQy9COztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTRDLGFBQWE7QUFDekQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3RUFBdUU7O0FBRXZFO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDQUE0QyxtREFBbUQ7QUFDL0Y7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0VBQXVFOztBQUV2RTtBQUNBOztBQUVBLDZDQUE0QyxtQ0FBbUM7QUFDL0U7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEMsU0FBUztBQUNyRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLHFCQUFxQjtBQUNqRTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0VBQXVFOztBQUV2RTtBQUNBOztBQUVBLDZDQUE0Qyx1Q0FBdUM7QUFDbkY7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdFQUF1RTs7QUFFdkU7QUFDQTs7QUFFQSw2Q0FBNEMsdUNBQXVDO0FBQ25GOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQSwyQ0FBMEM7QUFDMUM7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBMkM7QUFDM0M7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdFQUF1RTs7QUFFdkU7QUFDQTs7QUFFQSw2Q0FBNEMsbURBQW1EO0FBQy9GOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTRDLHlCQUF5QjtBQUNyRTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047O0FBRUEsbUJBQWtCLDBCQUEwQjtBQUM1QztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQW9DLDBCQUEwQjtBQUM5RDtBQUNBO0FBQ0EscUJBQW9CLHVCQUF1QjtBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQW9CLFlBQVk7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjs7QUFFQSxtQkFBa0IsMEJBQTBCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBLHFCQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLHFCQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0EscUJBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUVBQXNFOztBQUV0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTTtBQUNOLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXFELFdBQVcsVUFBVTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsMkJBQTJCO0FBQ3pEO0FBQ0EsS0FBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBLGlEQUFnRCxvQ0FBb0M7QUFDcEY7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQSxpREFBZ0Qsb0JBQW9CO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKLG9DQUFtQzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUY7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQStCO0FBQy9CLGdDQUErQjs7QUFFL0I7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLE9BQU07QUFDTiw0REFBMkQ7O0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1COztBQUVuQixRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EseUVBQXdFOztBQUV4RTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLHlFQUF3RTs7QUFFeEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFD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QUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsWUFBWTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyxZQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyxZQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQThDLFlBQVk7QUFDMUQ7QUFDQTtBQUNBO0FBQ0Esa0RBQWlELFlBQVk7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUM7Ozs7Ozs7Ozs7O0tDbDZCYTs7Ozs7Ozs7Ozs7Ozs7QUFPWixLQUFNLFlBQVksb0JBQVEsQ0FBUixDQUFaOzs7QUFHTixLQUFNLGlCQUFpQixVQUFVLGNBQVY7O0FBRXZCLEtBQU0sVUFBVSxVQUFVLE1BQVY7QUFDaEIsS0FBTSxZQUFZLFVBQVUsUUFBVjs7QUFFbEIsS0FBTSxhQUFhLFVBQVUsVUFBVjs7Ozs7O0FBTW5CLEtBQU0sb0JBQW9CLE1BQU0sSUFBTixFQUFwQjs7QUFFTixLQUFNLFlBQVksTUFBTSxNQUFOLENBQWEsbUJBQVc7QUFDeEMsV0FBUSxJQUFSLENBQWEsVUFBYixFQUR3QztFQUFYLENBQXpCOztBQUlOLFFBQU8sT0FBUCxDQUFlLElBQWYsR0FBc0IsVUFBQyxrQkFBRCxFQUF3QjtBQUM1QyxPQUFNLHNCQUFzQixNQUFNLE1BQU4sQ0FBYSxtQkFBVztBQUNsRCxhQUFRLElBQVIsQ0FBYSxrQkFBYixFQURrRDtJQUFYLENBQW5DLENBRHNDOztBQUs1QyxPQUFNLDBCQUEwQixvQkFDN0IsT0FENkIsQ0FDckI7WUFBYSxVQUFVLEdBQVYsQ0FBYyxpQkFBUztBQUMzQyxXQUFNLElBQUksS0FBSixDQURxQztBQUUzQyxTQUFFLFNBQUYsR0FBYyxTQUFkLENBRjJDO0FBRzNDLGNBQU8sQ0FBUCxDQUgyQztNQUFUO0lBQTNCLENBRHFCLENBTTdCLEdBTjZCLENBTXpCLGlCQUFTO0FBQ1osU0FBTSxJQUFJLEtBQUosQ0FETTtBQUVaLE9BQUUsY0FBRixHQUFtQixFQUFFLFFBQUYsQ0FBVyxDQUFYLENBQW5CLENBRlk7QUFHWixPQUFFLFNBQUYsR0FBYyxDQUFkLENBSFk7QUFJWixZQUFPLENBQVAsQ0FKWTtJQUFULENBTkQsQ0FMc0M7O0FBa0I1QyxxQkFBa0IsSUFBbEIsQ0FBdUIsdUJBQXZCLEVBbEI0QztFQUF4Qjs7Ozs7O0FBeUJ0QixLQUFNLGlCQUFpQixrQkFDcEIsT0FEb0IsQ0FDWixVQUFDLEtBQUQ7VUFBVyxNQUFNLFVBQU4sQ0FBaUIsT0FBakIsRUFBMEIsUUFBMUIsRUFBb0M7WUFBTTtJQUFOO0VBQS9DLENBRFksQ0FFcEIsUUFGb0IsQ0FFWCxjQUZXLENBQWpCOztBQUlOLEtBQU0sd0JBQXdCLE1BQU0sS0FBTixDQUFZLENBQUMsaUJBQUQsRUFBb0IsY0FBcEIsQ0FBWixFQUMzQixHQUQyQixDQUN2QixtQkFEdUIsRUFFM0IsR0FGMkIsQ0FFdkIsZ0JBRnVCLEVBRzNCLEdBSDJCLENBR3ZCLDBCQUh1QixFQUkzQixHQUoyQixDQUl2QixjQUp1QixDQUF4Qjs7QUFNTixVQUFTLG1CQUFULENBQTZCLEtBQTdCLEVBQW9DO0FBQ2xDLE9BQU0sSUFBSSxLQUFKLENBRDRCO0FBRWxDLEtBQUUsU0FBRixHQUFjLEtBQUssS0FBTCxDQUFXLFFBQVEsU0FBUixFQUFYLENBQWQsQ0FGa0M7QUFHbEMsS0FBRSxZQUFGLEdBQWlCLFFBQVEsTUFBUixFQUFqQixDQUhrQztBQUlsQyxLQUFFLFdBQUYsR0FBZ0IsUUFBUSxLQUFSLEVBQWhCLENBSmtDO0FBS2xDLFVBQU8sQ0FBUCxDQUxrQztFQUFwQzs7QUFRQSxVQUFTLGdCQUFULENBQTBCLEtBQTFCLEVBQWlDO0FBQy9CLE9BQU0sSUFBSSxLQUFKLENBRHlCO0FBRS9CLEtBQUUsU0FBRixHQUFjLG9DQUFvQixFQUFFLFNBQUYsRUFBYSxFQUFFLFdBQUYsRUFBZSxFQUFFLFlBQUYsQ0FBOUQsQ0FGK0I7QUFHL0IsVUFBTyxDQUFQLENBSCtCO0VBQWpDOztBQU1BLFVBQVMsMEJBQVQsQ0FBb0MsS0FBcEMsRUFBMkM7QUFDekMsT0FBTSxJQUFJLEtBQUosQ0FEbUM7QUFFekMsT0FBTSxXQUFXLDBCQUFVLE1BQU0sU0FBTixFQUFpQixNQUFNLFFBQU4sQ0FBdEMsQ0FGbUM7O0FBSXpDLEtBQUUsVUFBRixHQUFlLFNBQVMsVUFBVCxDQUowQjtBQUt6QyxLQUFFLFFBQUYsR0FBYSxTQUFTLFFBQVQsQ0FMNEI7O0FBT3pDLEtBQUUsVUFBRixHQUFlLFNBQVMsVUFBVCxDQUNaLEdBRFksQ0FDUjtZQUFLLEtBQUssS0FBTCxDQUFXLENBQVg7SUFBTCxDQURRLENBRVosTUFGWSxDQUVMLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTs7QUFFaEIsU0FBSSxFQUFFLE9BQUYsQ0FBVSxDQUFWLElBQWUsQ0FBZixFQUFrQixFQUFFLElBQUYsQ0FBTyxDQUFQLEVBQXRCO0FBQ0EsWUFBTyxDQUFQLENBSGdCO0lBQVYsRUFJTCxFQU5VLENBQWYsQ0FQeUM7O0FBZXpDLFVBQU8sS0FBUCxDQWZ5QztFQUEzQzs7QUFrQkEsVUFBUyxjQUFULENBQXdCLEtBQXhCLEVBQStCO0FBQzdCLE9BQU0sSUFBSSxLQUFKLENBRHVCO0FBRTdCLEtBQUUsY0FBRixHQUFtQixFQUFFLFFBQUYsQ0FBVyxDQUFYLENBQW5CLENBRjZCO0FBRzdCLFVBQU8sQ0FBUCxDQUg2QjtFQUEvQjs7QUFNQSxRQUFPLE9BQVAsQ0FBZSxxQkFBZixHQUF1QyxxQkFBdkM7Ozs7OztBQU1BLEtBQU0sa0JBQWtCLE1BQU0sVUFBTixDQUFpQixPQUFqQixFQUEwQixRQUExQixFQUNyQixRQURxQixDQUNaLGNBRFksQ0FBbEI7O0FBR04sS0FBTSxrQkFBa0IsTUFBTSxVQUFOLENBQWlCLE1BQWpCLEVBQXlCLGtCQUF6QixDQUFsQjs7QUFFTixLQUFNLDRCQUE0QixzQkFDL0IsT0FEK0IsQ0FDdkI7VUFBUyxNQUFNLEtBQU4sQ0FBWSxDQUFDLGVBQUQsRUFBa0IsZUFBbEIsQ0FBWixFQUNmLEdBRGUsQ0FDWCxhQUFLO0FBQ1IsU0FBTSxJQUFJLEtBQUosQ0FERTtBQUVSLE9BQUUsT0FBRixHQUFZLENBQVosQ0FGUTtBQUdSLFlBQU8sQ0FBUCxDQUhRO0lBQUw7RUFERSxDQURMOztBQVNOLEtBQU0sbUJBQW1CLE1BQ3RCLEtBRHNCLENBQ2hCLENBQUMscUJBQUQsRUFBd0IseUJBQXhCLENBRGdCLENBQW5COzs7Ozs7O0FBUU4sS0FBTSwwQkFBMEIsTUFDN0IsS0FENkIsQ0FDdkIsQ0FBQyxxQkFBRCxFQUF3QixnQkFBeEIsQ0FEdUIsRUFFN0IsR0FGNkIsQ0FFekIsT0FGeUIsRUFHN0IsR0FINkIsQ0FHekIsV0FIeUIsRUFJN0IsR0FKNkIsQ0FJekIsZ0JBSnlCLEVBSzdCLEdBTDZCLENBS3pCLGlCQUFTO0FBQ1osT0FBTSxJQUFJLEtBQUosQ0FETTtBQUVaLEtBQUUsY0FBRixHQUFtQixFQUFFLFNBQUYsQ0FBWSxFQUFFLGVBQUYsQ0FBWixDQUErQixPQUEvQixDQUZQO0FBR1osVUFBTyxDQUFQLENBSFk7RUFBVCxDQUxEOztBQVdOLFVBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QjtBQUN0QixPQUFNLElBQUksS0FBSixDQURnQjtBQUV0QixLQUFFLFNBQUYsR0FBYyxLQUFLLEtBQUwsQ0FBVyxRQUFRLFNBQVIsRUFBWCxDQUFkLENBRnNCO0FBR3RCLEtBQUUsaUJBQUYsR0FBc0IsRUFBRSxTQUFGLEdBQWMsRUFBRSxzQkFBRixDQUhkO0FBSXRCLFVBQU8sQ0FBUCxDQUpzQjtFQUF4Qjs7QUFPQSxVQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBNEI7QUFDMUIsT0FBTSxJQUFJLEtBQUosQ0FEb0I7QUFFMUIsT0FBSSxFQUFFLFNBQUYsR0FBZSxFQUFFLFNBQUYsQ0FBWSxFQUFFLGVBQUYsQ0FBWixDQUErQixRQUEvQixHQUEwQyxFQUFFLHNCQUFGLEVBQTJCO0FBQ3RGLE9BQUUsc0JBQUYsSUFBNEIsRUFBRSxTQUFGLENBQVksRUFBRSxlQUFGLENBQVosQ0FBK0IsUUFBL0IsQ0FEMEQ7QUFFdEYsT0FBRSxlQUFGLEdBRnNGO0lBQXhGLE1BR08sSUFBSSxFQUFFLFNBQUYsR0FBYyxFQUFFLHNCQUFGLEVBQTBCO0FBQ2pELE9BQUUsZUFBRixHQURpRDtBQUVqRCxPQUFFLHNCQUFGLElBQTRCLEVBQUUsU0FBRixDQUFZLEVBQUUsZUFBRixDQUFaLENBQStCLFFBQS9CLENBRnFCO0lBQTVDO0FBSVAsVUFBTyxDQUFQLENBVDBCO0VBQTVCOztBQVlBLFVBQVMsZ0JBQVQsQ0FBMEIsS0FBMUIsRUFBaUM7QUFDL0IsWUFBUyxlQUFULENBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCO0FBQzdCLFNBQU0sTUFBTSxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsSUFBZixFQUFxQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQXJCLENBQU4sQ0FEdUI7QUFFN0IsU0FBTSxNQUFNLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBckIsQ0FBTixDQUZ1QjtBQUc3QixZQUFPLE9BQU8sR0FBUCxJQUFjLE9BQU8sR0FBUCxDQUhRO0lBQS9COztBQU1BLE9BQU0sSUFBSSxLQUFKLENBUHlCOztBQVMvQixRQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sS0FBSyxFQUFFLFVBQUYsQ0FBYSxNQUFiLEVBQXFCLEdBQTFDLEVBQStDO0FBQzdDLFNBQUksRUFBRSxVQUFGLENBQWEsQ0FBYixNQUFvQixFQUFFLFNBQUYsRUFBYTtBQUNuQyxTQUFFLFlBQUYsR0FBaUIsQ0FBQyxDQUFELENBQWpCLENBRG1DO01BQXJDO0FBR0EsU0FBSSxnQkFBZ0IsSUFBaEIsQ0FBcUIsRUFBRSxNQUFGLEVBQVUsRUFBRSxVQUFGLENBQWEsSUFBSSxDQUFKLENBQTVDLEVBQW9ELEVBQUUsVUFBRixDQUFhLENBQWIsQ0FBcEQsQ0FBSixFQUEwRTtBQUN4RSxTQUFFLFlBQUYsR0FBaUIsQ0FBQyxJQUFJLENBQUosRUFBTyxDQUFSLENBQWpCLENBRHdFO01BQTFFO0lBSkY7QUFRQSxVQUFPLENBQVAsQ0FqQitCO0VBQWpDOztBQW9CQSxLQUFNLGtCQUFrQix3QkFDckIsR0FEcUIsQ0FDakI7VUFBUyxNQUFNLGNBQU47RUFBVCxDQURpQixDQUVyQixJQUZxQixDQUVoQixJQUZnQixFQUVWLEVBRlUsRUFHckIsTUFIcUIsQ0FHZDtVQUFrQixlQUFlLENBQWYsTUFBc0IsZUFBZSxDQUFmLENBQXRCO0VBQWxCLENBSEo7OztBQU1OLFFBQU8sT0FBUCxDQUFlLGVBQWYsR0FBaUMsZUFBakM7O0FBRUEsS0FBTSxvQkFBb0Isd0JBQ3ZCLElBRHVCLENBQ2xCLElBRGtCLEVBQ1o7QUFDVixhQUFVLEVBQVY7QUFDQSxtQkFBZ0IsU0FBaEI7O0FBRUEsY0FBVyxDQUFYO0FBQ0Esc0JBQW1CLENBQW5COztBQUVBLGNBQVcsU0FBWDtBQUNBLDJCQUF3QixDQUF4QjtBQUNBLG9CQUFpQixDQUFqQjs7QUFFQSxlQUFZLEVBQVo7QUFDQSxpQkFBYyxDQUFkO0FBQ0Esb0JBQWlCLENBQWpCOztBQUVBLG9CQUFpQixDQUFqQjs7QUFFQSxlQUFZLENBQVo7QUFDQSxpQkFBYyxDQUFkO0FBQ0EsZ0JBQWEsQ0FBYjtFQXBCc0IsQ0FBcEI7O0FBdUJOLFFBQU8sT0FBUCxDQUFlLGlCQUFmLEdBQW1DLGlCQUFuQzs7Ozs7Ozs7Ozs7QUFXQSxRQUFPLE9BQVAsQ0FBZSxNQUFmLEdBQXdCLFVBQUMsTUFBRCxFQUFZO0FBQ2xDLFdBQVEsTUFBUjtBQUNFLFVBQUssTUFBTDtBQUNFLGVBQVEsT0FBUixDQUFnQixZQUFoQixFQURGO0FBRUUsYUFGRjtBQURGLFVBSU8sVUFBTDtBQUNFLGVBQVEsT0FBUixDQUFnQixnQkFBaEIsRUFERjtBQUVFLGFBRkY7QUFKRjtBQVFJLGFBREY7QUFQRixJQURrQztFQUFaOztBQWF4QixLQUFNLGtCQUFrQixrQkFDckIsWUFEcUIsQ0FDUixVQUFDLEtBQUQ7VUFBVyxNQUFNLFVBQU4sQ0FBaUIsT0FBakIsRUFBMEIsWUFBMUIsRUFBd0M7WUFBTTtJQUFOO0VBQW5ELENBRFEsQ0FFckIsR0FGcUIsQ0FFakI7VUFBUyxNQUFNLENBQU47RUFBVCxDQUZpQixDQUdyQixHQUhxQixDQUdqQixTQUhpQixDQUFsQjs7QUFLTixLQUFNLHNCQUFzQixrQkFDekIsWUFEeUIsQ0FDWixVQUFDLEtBQUQ7VUFBVyxNQUFNLFVBQU4sQ0FBaUIsT0FBakIsRUFBMEIsZ0JBQTFCLEVBQTRDO1lBQU07SUFBTjtFQUF2RCxDQURZLENBRXpCLEdBRnlCLENBRXJCO1VBQVMsTUFBTSxDQUFOO0VBQVQsQ0FGcUIsQ0FHekIsR0FIeUIsQ0FHckIsYUFIcUIsQ0FBdEI7O0FBS04sVUFBUyxTQUFULENBQW1CLEtBQW5CLEVBQTBCO0FBQ3hCLFdBQVEsTUFBTSxZQUFOLENBQW1CLE1BQW5CO0FBQ04sVUFBSyxDQUFMO0FBQ0UsY0FBTyxNQUFNLFVBQU4sQ0FBaUIsTUFBTSxZQUFOLENBQW1CLENBQW5CLElBQXdCLENBQXhCLENBQXhCLENBREY7QUFERixVQUdPLENBQUw7QUFDRSxjQUFPLE1BQU0sVUFBTixDQUFpQixNQUFNLFlBQU4sQ0FBbUIsQ0FBbkIsQ0FBakIsQ0FBUCxDQURGO0FBSEY7QUFNSSxjQUFPLEtBQVAsQ0FERjtBQUxGLElBRHdCO0VBQTFCOztBQVdBLFVBQVMsYUFBVCxDQUF1QixLQUF2QixFQUE4QjtBQUM1QixXQUFRLE1BQU0sWUFBTixDQUFtQixNQUFuQjtBQUNOLFVBQUssQ0FBTDtBQUNFLGNBQU8sTUFBTSxVQUFOLENBQWlCLE1BQU0sWUFBTixDQUFtQixDQUFuQixJQUF3QixDQUF4QixDQUF4QixDQURGO0FBREYsVUFHTyxDQUFMO0FBQ0UsY0FBTyxNQUFNLFVBQU4sQ0FBaUIsTUFBTSxZQUFOLENBQW1CLENBQW5CLENBQWpCLENBQVAsQ0FERjtBQUhGO0FBTUksY0FBTyxLQUFQLENBREY7QUFMRixJQUQ0QjtFQUE5Qjs7QUFXQSxLQUFNLGdCQUFnQixNQUFNLEtBQU4sQ0FBWSxDQUFDLG1CQUFELEVBQXNCLGVBQXRCLENBQVosRUFDbkIsT0FEbUIsQ0FDWCxZQURXLENBQWhCOzs7QUFJTixlQUFjLEdBQWQ7OztBQUdBLFVBQVMsWUFBVCxDQUFzQixNQUF0QixFQUE4Qjs7QUFFNUIsYUFBVSxPQUFWLENBQWtCO0FBQ2hCLGdCQUFXLE1BQVg7SUFERixFQUVHLElBRkgsRUFFUyxRQUZULEVBRjRCO0VBQTlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDcFJGLFFBQU8sT0FBUCxDQUFlLG1CQUFmLEdBQXFDLFVBQVMsU0FBVCxFQUFvQixXQUFwQixFQUFpQyxZQUFqQyxFQUErQztBQUNsRixPQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQURrRjtBQUVsRixRQUFJLElBQUUsQ0FBRixFQUFJLElBQUUsVUFBVSxNQUFWLEVBQWlCLEdBQTNCLEVBQWdDOztBQUM5QixlQUFVLENBQVYsRUFBYSxRQUFiLEdBQXdCLG1CQUFtQixVQUFVLENBQVYsRUFBYSxRQUFiLEVBQXVCLEdBQTFDLEVBQStDLFdBQS9DLEVBQTRELFlBQTVELENBQXhCLENBRDhCO0FBRTlCLFVBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxVQUFVLENBQVYsRUFBYSxVQUFiLENBQXdCLE1BQXhCLEVBQStCLEdBQXpDLEVBQThDOztBQUM1QyxjQUFPLElBQVAsQ0FBWSxVQUFVLENBQVYsRUFBYSxVQUFiLENBQXdCLENBQXhCLENBQVosRUFBd0MsT0FBeEMsQ0FBZ0QsVUFBUyxHQUFULEVBQWM7O0FBQzVELGFBQUksUUFBUSxVQUFVLENBQVYsRUFBYSxVQUFiLENBQXdCLENBQXhCLEVBQTJCLEdBQTNCLENBQVIsQ0FEd0Q7QUFFNUQsYUFBRyxRQUFRLFVBQVIsRUFBb0I7QUFDckIsZUFBRyxpQkFBaUIsS0FBakIsRUFBd0I7O0FBQ3pCLGtCQUFJLElBQUUsQ0FBRixFQUFJLElBQUUsTUFBTSxNQUFOLEVBQWEsR0FBdkIsRUFBNEI7O0FBQzFCLG1CQUFHLE9BQU8sTUFBTSxDQUFOLENBQVAsS0FBb0IsUUFBcEIsRUFBOEI7QUFDL0IscUJBQUcsUUFBUSxZQUFSLEVBQXNCO0FBQ3ZCLHlCQUFNLENBQU4sSUFBVyxtQkFBbUIsTUFBTSxDQUFOLENBQW5CLEVBQTZCLEdBQTdCLEVBQWtDLFdBQWxDLEVBQStDLFlBQS9DLENBQVgsQ0FEdUI7a0JBQXpCLE1BRU87QUFDTCx5QkFBTSxDQUFOLElBQVcsbUJBQW1CLE1BQU0sQ0FBTixDQUFuQixFQUE2QixHQUE3QixFQUFrQyxXQUFsQyxFQUErQyxZQUEvQyxDQUFYLENBREs7a0JBRlA7Z0JBREY7Y0FERjtZQURGLE1BVU87QUFDTCxpQkFBRyxPQUFPLEtBQVAsS0FBaUIsUUFBakIsRUFBMkI7O0FBQzVCLG1CQUFHLFFBQVEsWUFBUixFQUFzQjtBQUN2Qix5QkFBUSxtQkFBbUIsS0FBbkIsRUFBMEIsR0FBMUIsRUFBK0IsV0FBL0IsRUFBNEMsWUFBNUMsQ0FBUixDQUR1QjtnQkFBekIsTUFFTztBQUNMLHlCQUFRLG1CQUFtQixLQUFuQixFQUEwQixHQUExQixFQUErQixXQUEvQixFQUE0QyxZQUE1QyxDQUFSLENBREs7Z0JBRlA7Y0FERjtZQVhGO0FBbUJBLHFCQUFVLENBQVYsRUFBYSxVQUFiLENBQXdCLENBQXhCLEVBQTJCLEdBQTNCLElBQWtDLEtBQWxDLENBcEJxQjtVQUF2QjtRQUY4QyxDQUFoRCxDQUQ0QztNQUE5QztJQUZGO0FBOEJBLFVBQU8sU0FBUCxDQWhDa0Y7RUFBL0M7O0FBcUNyQyxVQUFTLGtCQUFULENBQTRCLEtBQTVCLEVBQW1DLElBQW5DLEVBQXlDLFdBQXpDLEVBQXNELFlBQXRELEVBQW9FO0FBQ2xFLE9BQUcsT0FBTyxLQUFQLEtBQWlCLFFBQWpCLElBQTZCLE1BQU0sS0FBTixDQUFZLElBQVosQ0FBN0IsRUFBZ0Q7QUFDakQsU0FBRyxTQUFTLEdBQVQsRUFBYyxRQUFRLFVBQUMsQ0FBVyxLQUFYLElBQW9CLEdBQXBCLEdBQTJCLFlBQTVCLENBQXpCO0FBQ0EsU0FBRyxTQUFTLEdBQVQsRUFBYyxRQUFRLFVBQUMsQ0FBVyxLQUFYLElBQW9CLEdBQXBCLEdBQTJCLFdBQTVCLENBQXpCO0lBRkY7QUFJQSxPQUFHLE9BQU8sS0FBUCxLQUFpQixRQUFqQixJQUE2QixNQUFNLEtBQU4sQ0FBWSxJQUFaLENBQTdCLEVBQWdEO0FBQ2pELFNBQUcsU0FBUyxHQUFULEVBQWMsUUFBUSxVQUFDLENBQVcsS0FBWCxJQUFvQixHQUFwQixHQUEyQixZQUE1QixDQUF6QjtBQUNBLFNBQUcsU0FBUyxHQUFULEVBQWMsUUFBUSxVQUFDLENBQVcsS0FBWCxJQUFvQixHQUFwQixHQUEyQixXQUE1QixDQUF6QjtJQUZGO0FBSUEsVUFBTyxLQUFQLENBVGtFO0VBQXBFOztBQWFBLFFBQU8sT0FBUCxDQUFlLFNBQWYsR0FBMkIsVUFBUyxTQUFULEVBQW9CLFFBQXBCLEVBQThCO0FBQ3ZELE9BQUksQ0FBSjtPQUFPLENBQVA7T0FBVSxDQUFWO09BQWEsYUFBYSxFQUFiO09BQWlCLGFBQWEsQ0FBYixDQUR5QjtBQUV2RCxRQUFJLElBQUUsQ0FBRixFQUFJLElBQUUsVUFBVSxNQUFWLEVBQWlCLEdBQTNCLEVBQWdDOztBQUM1QixTQUFHLFVBQVUsQ0FBVixFQUFhLEtBQWIsRUFBb0I7QUFDbkIsV0FBRyxlQUFlLFdBQVcsV0FBVyxNQUFYLEdBQW9CLENBQXBCLENBQTFCLEVBQWtEO0FBQ25ELG9CQUFXLElBQVgsQ0FBZ0IsVUFBaEIsRUFEbUQ7UUFBckQ7TUFESjtBQUtBLG1CQUFjLFVBQVUsQ0FBVixFQUFhLFFBQWIsQ0FOYztBQU81QixTQUFHLEVBQUUsT0FBRixDQUFVLFVBQVUsQ0FBVixFQUFhLE9BQWIsRUFBc0IsUUFBaEMsS0FBNkMsQ0FBQyxDQUFELEVBQUk7QUFDbEQsZ0JBQVMsSUFBVCxDQUFjLFVBQVUsQ0FBVixFQUFhLE9BQWIsQ0FBZCxDQURrRDtNQUFwRDtBQUdBLFVBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxVQUFVLENBQVYsRUFBYSxVQUFiLENBQXdCLE1BQXhCLEVBQStCLEdBQXpDLEVBQThDOztBQUM1QyxjQUFPLElBQVAsQ0FBWSxVQUFVLENBQVYsRUFBYSxVQUFiLENBQXdCLENBQXhCLENBQVosRUFBd0MsT0FBeEMsQ0FBZ0QsVUFBUyxHQUFULEVBQWM7O0FBQzVELGFBQUksUUFBUSxVQUFVLENBQVYsRUFBYSxVQUFiLENBQXdCLENBQXhCLEVBQTJCLEdBQTNCLENBQVIsQ0FEd0Q7QUFFNUQsYUFBRyxRQUFRLFVBQVIsSUFBc0IsaUJBQWlCLEtBQWpCLEtBQTJCLEtBQTNCLEVBQWtDO0FBQ3pELGVBQUksV0FBVyxFQUFYLENBRHFEO0FBRXpELG9CQUFTLElBQVQsQ0FBYyx3QkFBd0IsR0FBeEIsQ0FBZCxFQUE0QyxLQUE1QyxFQUZ5RDtBQUd6RCxtQkFBUSxRQUFSLENBSHlEO1VBQTNEO0FBS0EsbUJBQVUsQ0FBVixFQUFhLFVBQWIsQ0FBd0IsQ0FBeEIsRUFBMkIsR0FBM0IsSUFBa0MsS0FBbEMsQ0FQNEQ7UUFBZCxDQUFoRCxDQUQ0QztNQUE5QztJQVZKOztBQXVCQSxVQUFPO0FBQ0wsaUJBQVksVUFBWjtBQUNBLGlCQUFZLFVBQVo7QUFDQSxlQUFVLFFBQVY7SUFIRixDQXpCdUQ7RUFBOUI7O0FBZ0MzQixRQUFPLE9BQVAsQ0FBZSx1QkFBZixHQUF5Qyx1QkFBekM7O0FBRUEsVUFBUyx1QkFBVCxDQUFpQyxRQUFqQyxFQUEyQztBQUN6QyxXQUFRLFFBQVI7QUFDRSxVQUFLLFlBQUw7QUFDRSxjQUFPLENBQVAsQ0FERjtBQURGLFVBR08sWUFBTDtBQUNFLGNBQU8sQ0FBUCxDQURGO0FBSEYsVUFLTyxPQUFMO0FBQ0UsY0FBTyxDQUFQLENBREY7QUFMRixVQU9PLFFBQUw7QUFDRSxjQUFPLENBQVAsQ0FERjtBQVBGLFVBU08sU0FBTDtBQUNFLGNBQU8sQ0FBUCxDQURGO0FBVEY7QUFZSSxjQUFPLElBQVAsQ0FERjtBQVhGLElBRHlDOzs7Ozs7Ozs7QUNwRjNDLEtBQU0sYUFBYSxDQUFDLFlBQUQsRUFBZSxZQUFmLEVBQTZCLFNBQTdCLEVBQXdDLFFBQXhDLEVBQWtELE9BQWxELENBQWI7QUFDTixLQUFNLGlCQUFpQixFQUFqQjs7QUFFTixLQUFNLFVBQVUsRUFBRSxNQUFGLENBQVY7QUFDTixLQUFNLFlBQVksRUFBRSxXQUFGLENBQVo7O0FBRU4sS0FBTSxhQUFhOzs7Ozs7QUFNZixhQUFVLEVBQVY7QUFDQSxtQkFBZ0IsSUFBaEI7Ozs7QUFJQSxjQUFXLFFBQVEsU0FBUixFQUFYO0FBQ0Esc0JBQW1CLENBQW5COzs7Ozs7QUFNQSxjQUFXLFNBQVg7Ozs7QUFJQSwyQkFBd0IsQ0FBeEI7Ozs7QUFJQSxvQkFBaUIsQ0FBakI7Ozs7Ozs7QUFPQSxlQUFZLEVBQVo7Ozs7QUFJQSxpQkFBYyxDQUFkOzs7QUFHQSxpQkFBYyxDQUFDLENBQUQsQ0FBZDs7OztBQUlBLG9CQUFpQixDQUFqQjs7OztBQUlBLGVBQVksQ0FBWjtBQUNBLGlCQUFjLENBQWQ7QUFDQSxnQkFBYSxDQUFiOztFQWxERTs7QUF1RE4sUUFBTyxPQUFQLENBQWUsVUFBZixHQUE0QixVQUE1QjtBQUNBLFFBQU8sT0FBUCxDQUFlLFVBQWYsR0FBNEIsVUFBNUI7QUFDQSxRQUFPLE9BQVAsQ0FBZSxjQUFmLEdBQWdDLGNBQWhDO0FBQ0EsUUFBTyxPQUFQLENBQWUsTUFBZixHQUF3QixPQUF4QjtBQUNBLFFBQU8sT0FBUCxDQUFlLFFBQWYsR0FBMEIsU0FBMUIsQzs7Ozs7Ozs7QUNqRUEsS0FBTSxRQUFRLG9CQUFRLENBQVIsQ0FBUjs7QUFFTixLQUFNLFVBQVUsb0JBQVEsQ0FBUixDQUFWOztBQUVOLFFBQU8sT0FBUCxDQUFlLElBQWYsR0FBc0IsWUFBVzs7QUFFL0IsT0FBSSxhQUFhLEVBQWIsQ0FGMkI7O0FBSS9CLE9BQUksWUFBWSxLQUFaLENBSjJCO0FBSy9CLE9BQUksaUJBQUosQ0FMK0I7QUFNL0IsT0FBSSxhQUFhLEVBQUUsTUFBRixFQUFVLE1BQVYsRUFBYixDQU4yQjtBQU8vQixPQUFJLEtBQUcsQ0FBSCxDQVAyQjs7QUFTL0IsT0FBTSxlQUFlLE1BQU0sVUFBTixDQUFpQixRQUFqQixFQUEyQixPQUEzQixFQUFvQyxVQUFTLENBQVQsRUFBVztBQUNsRSxPQUFFLGNBQUYsR0FEa0U7QUFFbEUsWUFBTyxDQUFQLENBRmtFO0lBQVgsQ0FBbkQsQ0FUeUI7O0FBYy9CLE9BQU0sVUFBVSxhQUNiLE1BRGEsQ0FDTjtZQUFLLEVBQUUsT0FBRixLQUFjLEVBQWQ7SUFBTCxDQURKLENBZHlCO0FBZ0IvQixPQUFNLFVBQVUsYUFDYixNQURhLENBQ047WUFBSyxFQUFFLE9BQUYsS0FBYyxFQUFkO0lBQUwsQ0FESixDQWhCeUI7O0FBbUIvQixPQUFNLGtCQUFrQixNQUFNLFVBQU4sQ0FBaUIsRUFBRSxXQUFGLENBQWpCLEVBQWlDLE9BQWpDLENBQWxCLENBbkJ5QjtBQW9CL0IsT0FBTSxvQkFBb0IsTUFBTSxVQUFOLENBQWlCLEVBQUUsYUFBRixDQUFqQixFQUFtQyxPQUFuQyxDQUFwQixDQXBCeUI7O0FBc0IvQixTQUFNLEtBQU4sQ0FBWSxDQUFDLE9BQUQsRUFBVSxpQkFBVixDQUFaLEVBQ0csT0FESCxDQUNXLGFBQUs7QUFDWixhQUFRLE1BQVIsQ0FBZSxNQUFmLEVBRFk7SUFBTCxDQURYLENBdEIrQjs7QUEyQi9CLFNBQU0sS0FBTixDQUFZLENBQUMsT0FBRCxFQUFVLGVBQVYsQ0FBWixFQUNHLE9BREgsQ0FDVyxhQUFLO0FBQ1osYUFBUSxNQUFSLENBQWUsVUFBZixFQURZO0lBQUwsQ0FEWCxDQTNCK0I7O0FBZ0MvQixLQUFFLGFBQUYsRUFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsVUFBUyxDQUFULEVBQVk7QUFDdkMsYUFBUSxHQUFSLENBQVksT0FBWixFQUR1QztBQUV2QyxTQUFHLFNBQUgsRUFBYztBQUFFLGVBQUY7TUFBZCxNQUErQjtBQUFFLGNBQUY7TUFBL0I7SUFGMkIsQ0FBN0IsQ0FoQytCOztBQXFDL0IsZ0JBQ0csTUFESCxDQUNVO1lBQUssRUFBRSxPQUFGLEtBQWMsRUFBZCxJQUFvQixFQUFFLE9BQUYsS0FBYyxFQUFkO0lBQXpCLENBRFYsQ0FFRyxPQUZILENBRVcsYUFBSztBQUNaLFNBQUksU0FBSixFQUFlO0FBQUUsZUFBRjtNQUFmLE1BQWdDO0FBQUUsY0FBRjtNQUFoQztJQURPLENBRlgsQ0FyQytCOztBQTJDL0IsWUFBUyxJQUFULEdBQWdCO0FBQ2QsYUFBUSxHQUFSLENBQVksTUFBWixFQURjO0FBRWQseUJBQW9CLFlBQVksWUFBVztBQUN6QyxlQUFRLE1BQVIsQ0FBZSxNQUFmLEVBRHlDO01BQVgsRUFFN0IsSUFGaUIsQ0FBcEIsQ0FGYztBQUtkLE9BQUUsYUFBRixFQUFpQixXQUFqQixDQUE2QixTQUE3QixFQUF3QyxRQUF4QyxDQUFpRCxVQUFqRCxFQUxjO0FBTWQsaUJBQVksSUFBWixDQU5jO0lBQWhCOztBQVNBLFlBQVMsS0FBVCxHQUFpQjtBQUNmLGFBQVEsR0FBUixDQUFZLE9BQVosRUFEZTtBQUVmLG1CQUFjLGlCQUFkLEVBRmU7QUFHZixpQkFBWSxLQUFaLENBSGU7QUFJZixPQUFFLGFBQUYsRUFBaUIsV0FBakIsQ0FBNkIsVUFBN0IsRUFBeUMsUUFBekMsQ0FBa0QsU0FBbEQsRUFKZTtJQUFqQjtFQXBEb0IsQzs7Ozs7Ozs7Ozs7Ozs7OztLQ0NSOzs7Ozs7Ozs7Ozs7Ozs7O0FBVVosS0FBTSxVQUFVLEVBQUUsTUFBRixDQUFWO0FBQ04sS0FBTSxRQUFRLEVBQUUsV0FBRixDQUFSO0FBQ04sS0FBTSx1QkFBdUIsRUFBRSxnQ0FBRixDQUF2Qjs7Ozs7O0FBTU4sS0FBTSxnQkFBZ0Isb0JBQVEsRUFBUixDQUFoQjtBQUNOLEtBQU0sa0JBQWtCLG9CQUFRLEVBQVIsQ0FBbEI7QUFDTixLQUFNLG9CQUFvQixvQkFBUSxFQUFSLENBQXBCO0FBQ04sS0FBTSxvQkFBb0Isb0JBQVEsRUFBUixDQUFwQjtBQUNOLEtBQU0sY0FBYyxvQkFBUSxFQUFSLENBQWQ7Ozs7Ozs7O0FBUU4sNEJBQWtCLElBQWxCLENBQXVCLENBQXZCLEVBQTBCLEtBQTFCLENBQWdDLEdBQWhDLEVBQXFDLE9BQXJDLENBQTZDLFlBQU07QUFDakQsV0FBUSxPQUFSLENBQWdCLFFBQWhCLEVBRGlEO0VBQU4sQ0FBN0M7OztBQUtBLGdDQUFzQixPQUF0QixDQUE4QixpQkFBUztBQUNyQyxTQUFNLE1BQU4sQ0FBYSxNQUFNLFVBQU4sQ0FBYixDQURxQztBQUVyQyw0QkFBeUIsS0FBekIsRUFGcUM7RUFBVCxDQUE5Qjs7QUFLRSxVQUFTLHdCQUFULENBQWtDLEtBQWxDLEVBQXlDO0FBQ3ZDLFNBQU0sVUFBTixDQUNHLEdBREgsQ0FDTyxVQUFDLEtBQUQ7WUFBVyxDQUFDLFFBQVEsTUFBTSxVQUFOLENBQVQsQ0FBMkIsT0FBM0IsQ0FBbUMsQ0FBbkMsSUFBd0MsR0FBeEM7SUFBWDtBQURQLElBRUcsR0FGSCxDQUVPLFVBQUMsWUFBRDtZQUFrQixlQUFlLElBQWY7SUFBbEI7QUFGUCxJQUdHLEdBSEgsQ0FHTyxVQUFDLE9BQUQsRUFBYTtBQUNoQixPQUFFLHNCQUFGLEVBQ0csTUFESCxDQUNVLDJDQUEyQyxPQUEzQyxHQUFxRCxVQUFyRCxDQURWLENBRGdCO0lBQWIsQ0FIUCxDQUR1QztFQUF6Qzs7O0FBV0YsMEJBQWdCLE9BQWhCLENBQXdCLFVBQUMsY0FBRCxFQUFvQjs7QUFFMUMsVUFBTyxxQkFBUCxDQUE2QixZQUFNO0FBQ2pDLE9BQUUsZUFBZSxDQUFmLENBQUYsRUFBcUIsSUFBckIsR0FEaUM7QUFFakMsT0FBRSxlQUFlLENBQWYsQ0FBRixFQUFxQixJQUFyQixHQUZpQzs7QUFJakMsWUFBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLGVBQWUsQ0FBZixDQUF2QixDQUppQztBQUtqQyxRQUFHLE1BQUgsRUFBVyxnQkFBWCxFQUE2QixlQUFlLENBQWYsQ0FBN0I7QUFMaUMsZ0JBTWpDLENBQVksY0FBWixFQU5pQztBQU9qQyxpQkFBWSxjQUFaLEVBUGlDO0lBQU4sQ0FBN0IsQ0FGMEM7RUFBcEIsQ0FBeEI7O0FBYUUsVUFBUyxtQkFBVCxDQUE2QixJQUE3QixFQUFtQyxJQUFuQyxFQUF5QztBQUN2QyxPQUFJLEtBQUssY0FBTCxLQUF3QixLQUFLLGNBQUwsRUFBcUI7QUFBRSxZQUFPLEtBQVAsQ0FBRjtJQUFqRDs7QUFEdUMsSUFHdkMsQ0FBRSxLQUFLLGNBQUwsQ0FBRixDQUF1QixJQUF2QixHQUh1QztBQUl2QyxLQUFFLEtBQUssY0FBTCxDQUFGLENBQXVCLElBQXZCLEdBSnVDO0VBQXpDOztBQU9BLFVBQVMsV0FBVCxDQUFxQixLQUFyQixFQUE0Qjs7QUFFeEIsS0FBRSxPQUFGLEVBQVcsTUFBTSxDQUFOLENBQVgsRUFBcUIsT0FBckIsQ0FBNkI7QUFDM0IsYUFBUSxDQUFSO0lBREYsRUFFRyxHQUZILEVBRVEsT0FGUixFQUVpQixZQUFXOztBQUUxQixPQUFFLElBQUYsRUFBUSxHQUFSLENBQVksQ0FBWixFQUFlLEtBQWYsR0FGMEI7SUFBWCxDQUZqQixDQUZ3Qjs7QUFTeEIsT0FBSSxZQUFZLEVBQUUsT0FBRixFQUFXLE1BQU0sQ0FBTixDQUFYLENBQVosQ0FUb0I7O0FBV3hCLE9BQUksVUFBVSxDQUFWLENBQUosRUFBa0I7QUFDaEIsZUFBVSxDQUFWLEVBQWEsSUFBYixHQURnQjtBQUVoQixlQUFVLE9BQVYsQ0FBa0I7QUFDaEIsZUFBUSxVQUFVLElBQVYsQ0FBZSxZQUFmLEtBQWdDLENBQWhDO01BRFYsRUFFRyxHQUZILEVBRVEsT0FGUixFQUZnQjtBQUtoQix1QkFBa0IsS0FBbEIsQ0FBd0IsU0FBeEIsRUFMZ0I7SUFBbEIsTUFNTztBQUNMLHVCQUFrQixJQUFsQixDQUF1QixTQUF2QixFQURLO0lBTlA7RUFYSjtBQXNCQSxVQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBNEI7QUFDMUIscUJBQWtCLElBQWxCLENBQXVCLE1BQU0sQ0FBTixFQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsQ0FBdkIsRUFEMEI7RUFBNUI7Ozs7QUFNRiw0QkFBa0IsT0FBbEIsQ0FBMEIsVUFBQyxTQUFELEVBQWU7O0FBRXZDLFVBQU8scUJBQVAsQ0FBNkIsWUFBTTtBQUMvQixTQUFJLE9BQU8sVUFBVSxDQUFWLENBQVAsQ0FEMkI7QUFFL0IsU0FBSSxPQUFPLFVBQVUsQ0FBVixDQUFQLENBRjJCOztBQUkvQixxQkFBZ0IsSUFBaEIsRUFKK0I7QUFLL0Isc0JBQWlCLElBQWpCOztBQUwrQixJQUFOLENBQTdCLENBRnVDO0VBQWYsQ0FBMUI7O0FBYUUsVUFBUyxXQUFULENBQXFCLFNBQXJCLEVBQWdDO0FBQzlCLGVBQVksSUFBWixDQUFpQixVQUFVLE1BQVYsQ0FBaUIsQ0FBakIsQ0FBakIsRUFEOEI7RUFBaEM7O0FBSUEsVUFBUyxnQkFBVCxDQUEwQixLQUExQixFQUFpQztBQUMvQixPQUFJLFVBQVUsQ0FBQyxNQUFNLFNBQU4sR0FBa0IsTUFBTSxVQUFOLENBQW5CLENBQXFDLE9BQXJDLENBQTZDLENBQTdDLElBQWtELEdBQWxELENBRGlCO0FBRS9CLHdCQUFxQixHQUFyQixDQUF5QjtBQUN2QixrQkFBYSxnQkFBZ0IsT0FBaEIsR0FBMEIsSUFBMUI7SUFEZixFQUYrQjtFQUFqQzs7QUFPQSxVQUFTLGVBQVQsQ0FBeUIsS0FBekIsRUFBZ0M7QUFDOUIsT0FBSSxTQUFKLEVBQWUsVUFBZixFQUEyQixVQUEzQixFQUF1QyxLQUF2QyxFQUE4QyxNQUE5QyxFQUFzRCxPQUF0RCxDQUQ4QjtBQUU5QixRQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxNQUFNLFNBQU4sQ0FBZ0IsTUFBTSxlQUFOLENBQWhCLENBQXVDLFVBQXZDLENBQWtELE1BQWxELEVBQTBELEdBQTlFLEVBQW1GO0FBQ2pGLGlCQUFZLE1BQU0sU0FBTixDQUFnQixNQUFNLGVBQU4sQ0FBaEIsQ0FBdUMsVUFBdkMsQ0FBa0QsQ0FBbEQsQ0FBWixDQURpRjtBQUVqRixrQkFBYSxjQUFjLFNBQWQsRUFBeUIsWUFBekIsRUFBdUMsS0FBdkMsQ0FBYixDQUZpRjtBQUdqRixrQkFBYSxjQUFjLFNBQWQsRUFBeUIsWUFBekIsRUFBdUMsS0FBdkMsQ0FBYixDQUhpRjtBQUlqRixhQUFRLGNBQWMsU0FBZCxFQUF5QixPQUF6QixFQUFrQyxLQUFsQyxDQUFSLENBSmlGO0FBS2pGLGNBQVMsY0FBYyxTQUFkLEVBQXlCLFFBQXpCLEVBQW1DLEtBQW5DLENBQVQsQ0FMaUY7QUFNakYsZUFBVSxjQUFjLFNBQWQsRUFBeUIsU0FBekIsRUFBb0MsS0FBcEMsQ0FBVixDQU5pRjtBQU9qRixPQUFFLFVBQVUsUUFBVixFQUFvQixNQUFNLGNBQU4sQ0FBdEIsQ0FBNEMsR0FBNUMsQ0FBZ0Q7QUFDOUMsb0JBQWEsaUJBQWlCLFVBQWpCLEdBQThCLE1BQTlCLEdBQXVDLFVBQXZDLEdBQW9ELGVBQXBELEdBQXNFLEtBQXRFLEdBQThFLFdBQTlFLEdBQTRGLE1BQTVGLEdBQXFHLE1BQXJHO0FBQ2Isa0JBQVcsUUFBUSxPQUFSLENBQWdCLENBQWhCLENBQVg7TUFGRixFQVBpRjtJQUFuRjtFQUZGOztBQWlCRSxVQUFTLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsUUFBbEMsRUFBNEMsS0FBNUMsRUFBbUQ7QUFDakQsT0FBSSxRQUFRLFVBQVUsUUFBVixDQUFSLENBRDZDO0FBRWpELE9BQUksS0FBSixFQUFXO0FBQ1QsYUFBUSxjQUFjLE1BQU0saUJBQU4sRUFBeUIsTUFBTSxDQUFOLENBQXZDLEVBQWtELE1BQU0sQ0FBTixJQUFXLE1BQU0sQ0FBTixDQUFYLEVBQXNCLE1BQU0sU0FBTixDQUFnQixNQUFNLGVBQU4sQ0FBaEIsQ0FBdUMsUUFBdkMsQ0FBaEYsQ0FEUztJQUFYLE1BRU87QUFDTCxhQUFRLFVBQVUsdUJBQVYsQ0FBa0MsUUFBbEMsQ0FBUixDQURLO0lBRlA7OztBQUZpRCxVQVMxQyxLQUFQLENBVGlEO0VBQW5EOztBQVlBLFVBQVMsdUJBQVQsQ0FBaUMsUUFBakMsRUFBMkM7QUFDekMsV0FBUSxRQUFSO0FBQ0UsVUFBSyxZQUFMO0FBQ0UsY0FBTyxDQUFQLENBREY7QUFERixVQUdPLFlBQUw7QUFDRSxjQUFPLENBQVAsQ0FERjtBQUhGLFVBS08sT0FBTDtBQUNFLGNBQU8sQ0FBUCxDQURGO0FBTEYsVUFPTyxRQUFMO0FBQ0UsY0FBTyxDQUFQLENBREY7QUFQRixVQVNPLFNBQUw7QUFDRSxjQUFPLENBQVAsQ0FERjtBQVRGO0FBWUksY0FBTyxJQUFQLENBREY7QUFYRixJQUR5QztFQUEzQzs7QUFpQkEsVUFBUyxhQUFULENBQXVCLENBQXZCLEVBQTBCLENBQTFCLEVBQTZCLENBQTdCLEVBQWdDLENBQWhDLEVBQW1DOztBQUVqQyxVQUFPLENBQUMsQ0FBRCxHQUFLLENBQUwsSUFBVSxLQUFLLEdBQUwsQ0FBUyxLQUFLLEVBQUwsR0FBVSxDQUFWLEdBQWMsQ0FBZCxDQUFULEdBQTRCLENBQTVCLENBQVYsR0FBMkMsQ0FBM0MsQ0FGMEI7Ozs7Ozs7Ozs7Ozs7OztBQzlLekMsVUFBUyxZQUFULENBQXNCLE1BQXRCLEVBQThCO0FBQzVCLFdBQVEsR0FBUixDQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBOEIsS0FBSyxLQUFMLENBQVcsUUFBUSxTQUFSLEVBQVgsQ0FBOUIsRUFENEI7QUFFMUIsYUFBVSxPQUFWLENBQWtCLEVBQUUsV0FBVyxNQUFYLEVBQXBCLEVBQXlDLElBQXpDLEVBQStDLFFBQS9DLEVBRjBCO0VBQTlCOztBQUtBLFVBQVMsZ0JBQVQsR0FBNEI7QUFDMUIsT0FBSSxVQUFVLENBQUMsWUFBWSxVQUFaLENBQUQsQ0FBeUIsT0FBekIsQ0FBaUMsQ0FBakMsSUFBc0MsR0FBdEMsQ0FEWTtBQUUxQix3QkFBcUIsR0FBckIsQ0FBeUI7QUFDckIsa0JBQWdCLGdCQUFnQixPQUFoQixHQUEwQixJQUExQjtJQURwQixFQUYwQjtFQUE1QjtBQU1BLFVBQVMscUJBQVQsR0FBaUM7QUFDL0IsY0FDRyxHQURILENBQ08sVUFBQyxNQUFEO1lBQVksQ0FBQyxTQUFTLFVBQVQsQ0FBRCxDQUFzQixPQUF0QixDQUE4QixDQUE5QixJQUFtQyxHQUFuQztJQUFaLENBRFAsQ0FFRyxHQUZILENBRU8sVUFBQyxhQUFEO1lBQW1CLGdCQUFnQixJQUFoQjtJQUFuQixDQUZQLENBR0csR0FISCxDQUdPLFVBQUMsUUFBRCxFQUFjO0FBQ2pCLE9BQUUsc0JBQUYsRUFDRyxNQURILENBQ1UsMkNBQTBDLFFBQTFDLEdBQW9ELFVBQXBELENBRFYsQ0FEaUI7SUFBZCxDQUhQLENBRCtCOzs7Ozs7Ozs7QUNYakMsS0FBTSxTQUFTLG9CQUFRLEVBQVIsQ0FBVDs7QUFFTixRQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLElBQXRCOztBQUVBLFFBQU8sT0FBUCxDQUFlLE1BQWYsR0FBd0IsVUFBQyxNQUFELEVBQVk7QUFDbEMsVUFBTyxNQUFQLENBQWMsTUFBZCxFQURrQztFQUFaOztBQUl4QixRQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLFlBQU07QUFDMUIsVUFBTyxJQUFQLEdBRDBCO0VBQU47O0FBS3RCLFVBQVMsSUFBVCxDQUFjLEVBQWQsRUFBa0I7QUFDaEIsVUFBTyxJQUFQLENBQVksRUFBWixFQURnQjs7Ozs7OztBQ2JsQjs7QUFDQSxLQUFNLE9BQU8sb0JBQVEsRUFBUixFQUFrQixJQUFsQjs7QUFFYixLQUFJLFFBQVEsRUFBUjtBQUNKLEtBQUksSUFBSjs7QUFFQSxRQUFPLE9BQVAsQ0FBZSxNQUFmLEdBQXdCLFVBQUMsTUFBRCxFQUFZO0FBQ2xDLFdBQVEsT0FBTyxHQUFQLENBQVcsYUFBSztBQUN0QixTQUFJLGNBQWM7QUFDaEIsWUFBSyxDQUFDLFdBQVUsRUFBRSxLQUFGLENBQVEsR0FBUixHQUFhLE1BQXZCLENBQU47QUFDQSxjQUFPLElBQVA7QUFDQSxlQUFRLENBQVI7TUFIRSxDQURrQjtBQU10QixZQUFPO0FBQ0wsYUFBTSxFQUFFLEVBQUY7QUFDTixjQUFPLEVBQUUsS0FBRixDQUFRLEdBQVI7QUFDUCxpQkFBVSxJQUFJLElBQUosQ0FBUyxXQUFULENBQVY7QUFDQSxpQkFBVSxJQUFJLElBQUosQ0FBUyxXQUFULENBQVY7TUFKRixDQU5zQjtJQUFMLENBQVgsQ0FZTCxNQVpLLENBWUcsVUFBQyxJQUFELEVBQU0sSUFBTixFQUFnQjtBQUFDLFVBQUssS0FBSyxFQUFMLENBQUwsR0FBZ0IsSUFBaEIsQ0FBRCxPQUE4QixJQUFQLENBQXZCO0lBQWhCLEVBQXNELEVBWnpELENBQVIsQ0FEa0M7RUFBWjs7QUFnQnhCLFFBQU8sT0FBUCxDQUFlLElBQWYsR0FBc0IsVUFBQyxFQUFELEVBQVE7O0FBRTVCLFVBQU8sTUFBTSxFQUFOLENBQVA7O0FBRjRCLEVBQVI7O0FBTXRCLFFBQU8sT0FBUCxDQUFlLEtBQWYsR0FBdUIsVUFBQyxNQUFELEVBQVksRUFBWjs7QUFJdkIsUUFBTyxPQUFQLENBQWUsSUFBZixHQUFzQixVQUFDLE1BQUQsRUFBWTtBQUNoQyxZQURnQztFQUFaOztBQUl0QixRQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLFVBQUMsTUFBRCxFQUFZLEVBQVo7O0FBSXRCLFVBQVMsTUFBVCxHQUFrQjs7QUFFaEI7O0FBRmdCO0FBSWhCLE9BQUksY0FBYyxJQUFDLENBQUssTUFBTCxDQUFZLFFBQVosS0FBeUIsQ0FBekIsR0FBK0IsSUFBaEMsR0FBdUMsS0FBdkM7QUFKRixPQUtaLFdBQVksSUFBSSxXQUFKLENBTEE7QUFNaEIsT0FBSSxXQUFXLEtBQUssTUFBTCxDQUFZLFFBQVosS0FBeUIsSUFBekIsSUFBaUMsSUFBSSxXQUFKLENBQWpDLENBTkM7QUFPaEIsT0FBSSxTQUFTLEtBQUssR0FBTDs7O0FBUEcsT0FVaEIsQ0FBSyxNQUFMLENBQVksSUFBWixHQVZnQjtBQVdoQixRQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLENBQWpCLEVBQW1CLE1BQW5CLEVBQTJCLFdBQVcsV0FBWCxDQUEzQixDQVhnQjs7QUFhaEIsY0FBVyxZQUFNO0FBQ2YsVUFBSyxNQUFMLENBQVksSUFBWixDQUFpQixNQUFqQixFQUF3QixDQUF4QixFQUEyQixXQUFXLFdBQVgsQ0FBM0IsQ0FEZTtJQUFOLEVBRVIsV0FBVyxRQUFYLENBRkgsQ0FiZ0I7O0FBaUJoQixjQUFXLFlBQU07QUFDZixVQUFLLE1BQUwsQ0FBWSxJQUFaLEdBRGU7QUFFZixVQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLENBQWpCLEVBQW1CLE1BQW5CLEVBQTJCLFdBQVcsV0FBWCxDQUEzQixDQUZlO0lBQU4sRUFHUixXQUFXLFFBQVgsQ0FISCxDQWpCZ0I7O0FBc0JoQixjQUFXLFlBQU07QUFDZixVQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLE1BQWpCLEVBQXdCLENBQXhCLEVBQTJCLFdBQVcsV0FBWCxDQUEzQixDQURlO0FBRWYsY0FGZTtJQUFOLEVBR1IsV0FBVyxDQUFYLEdBQWUsUUFBZixDQUhILENBdEJnQjtFQUFsQjs7QUE2QkEsUUFBTyxPQUFQLENBQWUsSUFBZixHQUFzQixNQUF0QixDOzs7Ozs7aUVDckVBO0FBQ0EsYUFBWSxhQUFhLGFBQWEsSUFBSSx5SEFBeUgsU0FBUyxLQUFLLHVDQUF1QyxnQkFBZ0Isc0RBQXNELFNBQVMsS0FBSyxVQUFVLElBQUksZ0JBQWdCLGdCQUFnQixVQUFVLGtJQUFrSSxjQUFjLDhEQUE4RCw0RUFBNEUsa0hBQWtILCtDQUErQyxJQUFJLGlCQUFpQixhQUFhLGFBQWEsZ0JBQWdCLGNBQWMsbUJBQW1CLGdNQUFnTSxvQkFBb0IsY0FBYyxzREFBc0QsZ0NBQWdDLFlBQVksa0JBQWtCLHVFQUF1RSxXQUFXLEtBQUssbUNBQW1DLHlDQUF5QyxTQUFTLGlCQUFpQixrQkFBa0IsY0FBYywyQ0FBMkMsWUFBWSxrQkFBa0IsdUVBQXVFLFdBQVcsS0FBSyxtQ0FBbUMsMENBQTBDLFNBQVMsbUJBQW1CLHNDQUFzQyxLQUFLLHlCQUF5QiwwRkFBMEYsb0JBQW9CLDJCQUEyQix5QkFBeUIsc0RBQXNELDBEQUEwRCxrQkFBa0IsdUNBQXVDLGdFQUFnRSxtRUFBbUUscUVBQXFFLHFFQUFxRSxnRUFBZ0Usd0RBQXdELDZCQUE2Qiw2QkFBNkIseURBQXlELDZCQUE2Qiw2QkFBNkIsd0RBQXdELHVFQUF1RSx1RUFBdUUsb0NBQW9DLEdBQUcsK0JBQStCLGlMQUFpTCxnQ0FBZ0Msb0JBQW9CLGlCQUFpQix5REFBeUQsNEdBQTRHLDBHQUEwRyxxREFBcUQseUJBQXlCLFdBQVcsdURBQXVELFlBQVksa0JBQWtCLHlDQUF5Qyw2QkFBNkIsZ0RBQWdELDZDQUE2QyxzRkFBc0YsMEZBQTBGLEdBQUcsU0FBUyx3QkFBd0IsV0FBVywyTUFBMk0sa0JBQWtCLGdJQUFnSSwwQkFBMEIsV0FBVyxnSUFBZ0ksYUFBYSxpQkFBaUIsV0FBVyxvUUFBb1EsMklBQTJJLGdDQUFnQyxXQUFXLDBCQUEwQixZQUFZLDBCQUEwQixZQUFZLG9DQUFvQyxpQkFBaUIsNEJBQTRCLGFBQWEsMEJBQTBCLFlBQVksMEJBQTBCLFlBQVksMEJBQTBCLFlBQVksOEJBQThCLGNBQWMsMEJBQTBCLFlBQVksMEJBQTBCLFlBQVksMklBQTJJLGlCQUFpQixrQkFBa0IsK0RBQStELDJDQUEyQyxZQUFZLGdCQUFnQixLQUFLLFFBQVEsMkVBQTJFLEtBQUssK0ZBQStGLFlBQVksT0FBTyx5TkFBeU4sa0JBQWtCLDhCQUE4QixpQ0FBaUMsK0JBQStCLGNBQWMsZ0JBQWdCLG1CQUFtQix5RUFBeUUsb0JBQW9CLDJDQUEyQyxrQkFBa0IscUZBQXFGLCtCQUErQiwwQ0FBMEMsUUFBUSw4QkFBOEIsNkJBQTZCLGdIQUFnSCxnT0FBZ08sY0FBYyxnQkFBZ0IsaUJBQWlCLG9CQUFvQixnREFBZ0QsZ1hBQWdYLHNCQUFzQixLQUFLLDREQUE0RCxLQUFLLGlCQUFpQix5SUFBeUkscUNBQXFDLEtBQUssNkRBQTZELEtBQUssaUJBQWlCLG1HQUFtRyxpREFBaUQsYUFBYSxtQkFBbUIsV0FBVyxvQ0FBb0MsZ0NBQWdDLFlBQVksSUFBSSxnQ0FBZ0MsV0FBVyxLQUFLLG9CQUFvQix5QkFBeUIsa0JBQWtCLCtFQUErRSxrQ0FBa0MscUlBQXFJLHNFQUFzRSxzQ0FBc0MsU0FBUyxrQkFBa0IsV0FBVyw2RUFBNkUsK0JBQStCLFdBQVcsSUFBSSxnQ0FBZ0MsV0FBVyxLQUFLLG9CQUFvQix5QkFBeUIsa0JBQWtCLDBGQUEwRixrQ0FBa0MscUlBQXFJLHdHQUF3Ryx1QkFBdUIsU0FBUyxvQkFBb0IsV0FBVyxvQ0FBb0MsK0JBQStCLGFBQWEsSUFBSSwwQkFBMEIsdUNBQXVDLFdBQVcsZ0NBQWdDLFdBQVcsS0FBSyx5QkFBeUIsc0tBQXNLLFNBQVMsbUJBQW1CLDJCQUEyQixpQ0FBaUMsaUJBQWlCLHlDQUF5Qyw0Q0FBNEMsMkRBQTJELE1BQU0sOEZBQThGLG9DQUFvQyxpQ0FBaUMscUJBQXFCLElBQUkseURBQXlELFlBQVksV0FBVyxvT0FBb08sU0FBUyx3QkFBd0IsV0FBVyxvQ0FBb0MsK0JBQStCLGlCQUFpQixJQUFJLGNBQWMsZ0NBQWdDLFdBQVcsS0FBSyx5QkFBeUIscURBQXFELDhCQUE4QiwySEFBMkgsd0NBQXdDLDhCQUE4Qix1REFBdUQsbUJBQW1CLEtBQUssbURBQW1ELFlBQVksUUFBUSxzQ0FBc0MsdUtBQXVLLG1CQUFtQixJQUFJLFNBQVMsdUJBQXVCLDZCQUE2QixvTkFBb04saUJBQWlCLDZCQUE2QiwrQkFBK0IsaUJBQWlCLGdGQUFnRixpQkFBaUIsZ0RBQWdELGdDQUFnQyxXQUFXLGtIQUFrSCxTQUFTLGlCQUFpQiwyQkFBMkIsbUNBQW1DLHNCQUFzQix5Q0FBeUMsNENBQTRDLDREQUE0RCxNQUFNLGlFQUFpRSxvQ0FBb0MsK0JBQStCLG1CQUFtQixJQUFJLHVEQUF1RCxZQUFZLFdBQVcsNkJBQTZCLGlJQUFpSSx1R0FBdUcsOEZBQThGLFNBQVMsaUJBQWlCLDJCQUEyQixtQ0FBbUMsc0JBQXNCLHlDQUF5QyxpRUFBaUUsNERBQTRELGtDQUFrQyxvQ0FBb0MsK0JBQStCLG1CQUFtQixJQUFJLHNCQUFzQixNQUFNLHNHQUFzRyxtQkFBbUIsOEVBQThFLFNBQVMscUJBQXFCLDJDQUEyQyx1QkFBdUIscUJBQXFCLHNCQUFzQixtQkFBbUIsK0JBQStCLFdBQVcsS0FBSywrT0FBK08sMEJBQTBCLDJCQUEyQixvREFBb0Qsc0JBQXNCLHdCQUF3QixzQ0FBc0MsaUJBQWlCLEVBQUUsVUFBVSxJQUFJLHFCQUFxQix3QkFBd0IsTUFBTSxZQUFZLFdBQVcsaUNBQWlDLGNBQWMsT0FBTyx3QkFBd0Isa0NBQWtDLFdBQVcsa0VBQWtFLFNBQVMsc0JBQXNCLFdBQVcsdUJBQXVCLHVCQUF1Qix5Q0FBeUMsS0FBSyw4REFBOEQsaUJBQWlCLHlEQUF5RCxTQUFTLHVCQUF1QixXQUFXLHNCQUFzQixrQkFBa0IsMEJBQTBCLGdDQUFnQyxhQUFhLFNBQVMsb0JBQW9CLHVEQUF1RCxtRkFBbUYscUVBQXFFLCtDQUErQyxxREFBcUQsdUtBQXVLLHlCQUF5QixXQUFXLGlGQUFpRix3QkFBd0IsbUJBQW1CLG1CQUFtQixnREFBZ0QsWUFBWSwyQkFBMkIsV0FBVyxXQUFXLFlBQVksbUJBQW1CLHVEQUF1RCxnQkFBZ0IsbUJBQW1CLDZCQUE2QiwwQkFBMEIsUUFBUSxtQkFBbUIsNkJBQTZCLHlCQUF5QixLQUFLLEtBQUssZUFBZSxxSEFBcUgsMEJBQTBCLFdBQVcsMEJBQTBCLGlCQUFpQixtQkFBbUIsNkJBQTZCLFNBQVMsVUFBVSw0QkFBNEIsV0FBVyxvVUFBb1Usa0JBQWtCLDRCQUE0QixnQkFBZ0IsZ0JBQWdCLHVCQUF1QixrT0FBa08sbUJBQW1CLHFGQUFxRixpYkFBaWIsa0JBQWtCLHVCQUF1QixxTUFBcU0sMkJBQTJCLFdBQVcscUxBQXFMLDBCQUEwQix1QkFBdUIsNkZBQTZGLDhCQUE4Qiw4SEFBOEgsV0FBVyxlQUFlLGFBQWEsbURBQW1ELGFBQWEsR0FBRyxrQkFBa0IscUNBQXFDLDZIQUE2SCxnQkFBZ0Isb0ZBQW9GLFVBQVUsK0RBQStELFdBQVcseUJBQXlCLGNBQWMsS0FBSyx5QkFBeUIsb0VBQW9FLGdCQUFnQixzQkFBc0IsNEVBQTRFLE9BQU8sZUFBZSxJQUFJLFNBQVMsU0FBUyxhQUFhLGlCQUFpQixnQ0FBZ0MsNENBQTRDLFlBQVksd0RBQXdELEVBQUUsaUJBQWlCLHlGQUF5Riw4QkFBOEIsa0ZBQWtGLGlJQUE0RCxPQUFPLGlCQUFpQixnWkFBa1E7QUFDcnRtQjtBQUNBLGFBQVksYUFBYSxzS0FBc0ssbUNBQW1DLDRDQUE0QyxXQUFXLDBNQUEwTSwwREFBMEQsV0FBVyxvQ0FBb0MscUJBQXFCLG9QQUFvUCxpREFBaUQsV0FBVyw2T0FBNk8saURBQWlELFdBQVcsb0NBQW9DLHNCQUFzQiwyQkFBMkIsZ0tBQWdLLDhGQUE4RixpQ0FBaUMsbUJBQW1CLFdBQVcsK0dBQStHLDBpQkFBMGlCLGlCQUFpQiwyREFBMkQsV0FBVyx5QkFBeUIsOENBQThDLGVBQWUsSUFBSSw4RUFBOEUsb0NBQW9DLGVBQWUsZ0NBQWdDLFdBQVcsS0FBSyx5QkFBeUIsTUFBTSxvQ0FBb0Msd0VBQXdFLFNBQVMsOENBQThDLFdBQVcseUJBQXlCLDhDQUE4Qyx1QkFBdUIsSUFBSSw0R0FBNEcsNENBQTRDLHVCQUF1QixnQ0FBZ0MsV0FBVyxLQUFLLHlCQUF5QixNQUFNLDRDQUE0QyxtRkFBbUYsU0FBUywyQ0FBMkMsV0FBVyx5QkFBeUIsOENBQThDLG9CQUFvQixJQUFJLHNHQUFzRyx5Q0FBeUMsb0JBQW9CLGdDQUFnQyxXQUFXLEtBQUsseUJBQXlCLE1BQU0seUNBQXlDLDZFQUE2RSxTQUFTLHNDQUFzQyw2QkFBNkIseUJBQXlCLHFDQUFxQyxpQkFBaUIsZ0dBQWdHLDhDQUE4Qyw0b0JBQTRvQixFQUFFLGdEQUFnRCxnQ0FBZ0MsV0FBVyw2QkFBNkIsb0JBQW9CLEdBQUcscW9CQUFxb0IsZ0JBQWdCLHdTQUF3UyxTQUFTLGtDQUFrQyxrQkFBa0IsdUJBQXVCLGlLQUFpSyx5REFBeUQsa0JBQWtCLHVCQUF1QixxSEFBcUgsd0JBQXdCLGtCQUFrQixpdEJBQWl0Qjs7Ozs7Ozs7QUNIbjhOOzs7Ozs7Ozs7O0FDQ0EsS0FBSSxrQkFBa0IsRUFBRSwyQkFBRixDQUFsQjtBQUNKLEtBQUksWUFBSjtBQUNBLEtBQUksR0FBSjs7QUFFQSxpQkFBZ0IsSUFBaEI7QUFDQSxRQUFPLE9BQVAsQ0FBZSxLQUFmLEdBQXVCLFVBQVMsU0FBVCxFQUFvQjtBQUN6QyxTQUFNLFVBQVUsQ0FBVixDQUFOLENBRHlDO0FBRXpDLG1CQUFnQixJQUFoQixHQUZ5QztBQUd6QyxrQkFBZSxJQUFmLENBSHlDO0FBSXpDLFVBSnlDO0VBQXBCOztBQU92QixRQUFPLE9BQVAsQ0FBZSxJQUFmLEdBQXNCLFlBQVc7QUFDL0Isa0JBQWUsS0FBZixDQUQrQjtBQUUvQixLQUFFLDJCQUFGLEVBQStCLElBQS9CLEdBRitCO0VBQVg7O0FBS3RCLFVBQVMsSUFBVCxHQUFnQjtBQUNkLFVBQU8scUJBQVAsQ0FBNkIsWUFBVztBQUN0QyxTQUFJLE9BQVEsSUFBSSxXQUFKLEdBQWtCLElBQUksUUFBSixDQURRO0FBRXRDLFNBQUksVUFBVSxDQUFDLE9BQU8sR0FBUCxDQUFELENBQWEsT0FBYixDQUFxQixDQUFyQixDQUFWLENBRmtDO0FBR3RDLHFCQUFnQixHQUFoQixDQUFvQixFQUFDLFNBQVMsVUFBVSxJQUFWLEVBQTlCLEVBSHNDO0FBSXRDLFNBQUcsWUFBSCxFQUFpQjtBQUNmLGtCQUFZLFlBQU07QUFBQyxnQkFBRDtRQUFOLEVBQWlCLEVBQTdCLEVBRGU7TUFBakI7SUFKMkIsQ0FBN0IsQ0FEYyIsImZpbGUiOiJidWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNzEyYWUxNjFiYTI5YjkyMWFjODhcbiAqKi8iLCJcbi8vIFRoZSBmb2N1cyBvZiB0aGUgbGlicmFyeSBpcyB0byBiZSByZWFjdGl2ZSB0aHJvdWdob3V0LlxuLy8gVGhlIHByaW1hcnkgcmVhY3RpdmUgbGlicmFyeSB1c2VkIGluIG91ciBhcHAuIE1vc3Qga25vd2xlZGdlIGdhcHMgd2lsbCBiZSBhdHRyaWJ1dGVkIHRvXG5pbXBvcnQgS2VmaXIgZnJvbSAna2VmaXInXG5cbmltcG9ydCBQYWNlIGZyb20gJ3BhY2UnXG5cbmltcG9ydCBvYnNjZW5lIGZyb20gJy4vb2Itc2NlbmUuanMnXG5pbXBvcnQgY29udHJvbHMgZnJvbSAnLi91c2VyL2NvbnRyb2xzLmpzJ1xuXG4vLyBpbXBvcnQgc2NlbmVDb21waWxlciBmcm9tICcuL3NjZW5lLWNvbXBpbGVyLmpzJ1xuXG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyL2luZGV4LmpzJ1xuaW1wb3J0IGF1ZGlvcGxheWVyIGZyb20gJy4vcmVuZGVyL2F1ZGlvcGxheWVyLmpzJ1xuXG4vLyBhdWRpb3BsYXllci5jb25maWcoc2NlbmVBdWRpb0NvbmZpZylcblxuLy8gZnVuY3Rpb24gY29tcGlsZShwYXRoKSB7XG4vLyAgIGNvbnN0IHNjZW5lSHRtbFN0cmluZyA9IHNjZW5lQ29tcGlsZXIucmVuZGVySFRNTCgpXG4vLyAgIGNvbnN0IHNjZW5lQ29uZmlnID0gc2NlbmVDb21waWxlci5nZXRTY2VuZXMoKVxuLy8gICBjb25zdCBzY2VuZUF1ZGlvQ29uZmlnID0gIHNjZW5lQ29tcGlsZXIuZ2V0QXVkaW9Db25maWcoKVxuLy8gfVxuXG5tb2R1bGUuZXhwb3J0cy5pbml0ID0gKGNvbmZpZykgPT4ge1xuICBpbml0KGNvbmZpZylcbn1cblxuZnVuY3Rpb24gaW5pdChjb25maWcpIHtcbiAgLy8gUGFjZSByZXF1aXJlcyBhIC5zdGFydCB0byBzaG93IHRoZSBsb2FkaW5nIHNjcmVlblxuICBQYWNlLnN0YXJ0KClcblxuICBjb25zdCBzY2VuZUh0bWxTdHJpbmcgPSBjb25maWcuc2NlbmVIdG1sU3RyaW5nXG4gIGNvbnN0IHNjZW5lQ29uZmlnID0gY29uZmlnLnNjZW5lQ29uZmlnXG5cbiAgY29uc3QgaW5pdExvYWRpbmdDb21wbGV0ZSA9IEtlZmlyLmZyb21FdmVudHMoUGFjZSwgJ2RvbmUnKVxuICAgIC5maWx0ZXIoY2hlY2tSZWFkeVN0YXRlKVxuXG4gIGNvbnN0IHRvdWNoRGV2aWNlRGV0ZWN0ZWQgPSBpbml0TG9hZGluZ0NvbXBsZXRlXG4gICAgLmZpbHRlcihpc1RvdWNoRGV2aWNlKVxuXG4gIHRvdWNoRGV2aWNlRGV0ZWN0ZWRcbiAgICAub25WYWx1ZSgoKSA9PiB7XG4gICAgICAkKCcjdW5zdXBwb3J0ZWQnKS5zaG93KClcbiAgICAgICQoXCIuY29udGFpbmVyXCIpLmhpZGUoKVxuICAgICAgJChcIi5sb2FkaW5nXCIpLmhpZGUoKVxuICAgIH0pXG5cbiAgY29uc3QgcmVhZHlUb1BhcnNlID0gaW5pdExvYWRpbmdDb21wbGV0ZVxuICAgIC5maWx0ZXIoKCkgPT4gIShpc1RvdWNoRGV2aWNlKCkpKVxuXG4gIHJlYWR5VG9QYXJzZS5vblZhbHVlKCgpID0+IHtcbiAgICBvYnNjZW5lLmluaXQoc2NlbmVDb25maWcpXG4gICAgY29udHJvbHMuaW5pdCgpXG4gIH0pXG5cbiAgcmVhZHlUb1BhcnNlLm9uVmFsdWUoKCkgPT4ge1xuICAgICAgJCgnLmNvbnRhaW5lci1pbm5lcicpLmh0bWwoc2NlbmVIdG1sU3RyaW5nKVxuICAgICAgJCgnLmxvYWRpbmcnKS5kZWxheSgzMDApLmZhZGVPdXQoKVxuICAgICAgLy8gYXVkaW9wbGF5ZXIubmV4dCgnaW50cm8nKTtcbiAgICAgIC8vIGF1ZGlvcGxheWVyLnBsYXkoKTtcbiAgfSlcbn1cblxuZnVuY3Rpb24gY2hlY2tSZWFkeVN0YXRlKCkge1xuICByZXR1cm4gKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgLy8gbW9zdCBicm93c2Vyc1xuICAgICAgICAgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRlZCcgLy8gb2xkZXIgc2FmYXJpXG4gICAgICAgICB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnIC8vIGF0IGxlYXN0IGluaXRhbCBkb2MgbG9hZGVkXG4gICAgICAgICApXG59XG5cbmZ1bmN0aW9uIGlzVG91Y2hEZXZpY2UoKSB7XG4gIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgLy8gd29ya3Mgb24gbW9zdCBicm93c2Vyc1xuICAgIHx8ICdvbm1zZ2VzdHVyZWNoYW5nZScgaW4gd2luZG93IC8vIHdvcmtzIG9uIGllMTBcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiLyohIEtlZmlyLmpzIHYzLjIuMFxuICogIGh0dHBzOi8vZ2l0aHViLmNvbS9ycG9taW5vdi9rZWZpclxuICovXG5cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIktlZmlyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIktlZmlyXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge30sXG4vKioqKioqLyBcdFx0XHRpZDogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4vKioqKioqLyBcdFx0fTtcblxuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cblxuXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgS2VmaXIgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXHRLZWZpci5LZWZpciA9IEtlZmlyO1xuXG5cdHZhciBPYnNlcnZhYmxlID0gS2VmaXIuT2JzZXJ2YWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cdEtlZmlyLlN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cdEtlZmlyLlByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblxuXHQvLyBDcmVhdGUgYSBzdHJlYW1cblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvLyAoKSAtPiBTdHJlYW1cblx0S2VmaXIubmV2ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG5cdC8vIChudW1iZXIsIGFueSkgLT4gU3RyZWFtXG5cdEtlZmlyLmxhdGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcblxuXHQvLyAobnVtYmVyLCBhbnkpIC0+IFN0cmVhbVxuXHRLZWZpci5pbnRlcnZhbCA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xuXG5cdC8vIChudW1iZXIsIEFycmF5PGFueT4pIC0+IFN0cmVhbVxuXHRLZWZpci5zZXF1ZW50aWFsbHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblxuXHQvLyAobnVtYmVyLCBGdW5jdGlvbikgLT4gU3RyZWFtXG5cdEtlZmlyLmZyb21Qb2xsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cblx0Ly8gKG51bWJlciwgRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHRLZWZpci53aXRoSW50ZXJ2YWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KTtcblxuXHQvLyAoRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHRLZWZpci5mcm9tQ2FsbGJhY2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcblxuXHQvLyAoRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHRLZWZpci5mcm9tTm9kZUNhbGxiYWNrID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cblx0Ly8gVGFyZ2V0ID0ge2FkZEV2ZW50TGlzdGVuZXIsIHJlbW92ZUV2ZW50TGlzdGVuZXJ9fHthZGRMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXJ9fHtvbiwgb2ZmfVxuXHQvLyAoVGFyZ2V0LCBzdHJpbmcsIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdEtlZmlyLmZyb21FdmVudHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KTtcblxuXHQvLyAoRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHRLZWZpci5zdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblxuXHQvLyBDcmVhdGUgYSBwcm9wZXJ0eVxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vIChhbnkpIC0+IFByb3BlcnR5XG5cdEtlZmlyLmNvbnN0YW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMik7XG5cblx0Ly8gKGFueSkgLT4gUHJvcGVydHlcblx0S2VmaXIuY29uc3RhbnRFcnJvciA9IF9fd2VicGFja19yZXF1aXJlX18oMjMpO1xuXG5cdC8vIENvbnZlcnQgb2JzZXJ2YWJsZXNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvLyAoU3RyZWFtfFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciB0b1Byb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvcGVydHkgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gdG9Qcm9wZXJ0eSh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbXxQcm9wZXJ0eSkgLT4gU3RyZWFtXG5cdHZhciBjaGFuZ2VzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmNoYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIGNoYW5nZXModGhpcyk7XG5cdH07XG5cblx0Ly8gSW50ZXJvcGVyYXRpb24gd2l0aCBvdGhlciBpbXBsaW1lbnRhdGlvbnNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvLyAoUHJvbWlzZSkgLT4gUHJvcGVydHlcblx0S2VmaXIuZnJvbVByb21pc2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI3KTtcblxuXHQvLyAoU3RyZWFtfFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb21pc2Vcblx0dmFyIHRvUHJvbWlzZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjgpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAoUHJvbWlzZSkge1xuXHQgIHJldHVybiB0b1Byb21pc2UodGhpcywgUHJvbWlzZSk7XG5cdH07XG5cblx0Ly8gKEVTT2JzZXJ2YWJsZSkgLT4gU3RyZWFtXG5cdEtlZmlyLmZyb21FU09ic2VydmFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI5KTtcblxuXHQvLyAoU3RyZWFtfFByb3BlcnR5KSAtPiBFUzcgT2JzZXJ2YWJsZVxuXHR2YXIgdG9FU09ic2VydmFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMxKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudG9FU09ic2VydmFibGUgPSB0b0VTT2JzZXJ2YWJsZTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGVbX193ZWJwYWNrX3JlcXVpcmVfXygzMCkoJ29ic2VydmFibGUnKV0gPSB0b0VTT2JzZXJ2YWJsZTtcblxuXHQvLyBNb2RpZnkgYW4gb2JzZXJ2YWJsZVxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgbWFwID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBtYXAodGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgZmlsdGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzMyk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBmaWx0ZXIodGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIG51bWJlcikgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyKSAtPiBQcm9wZXJ0eVxuXHR2YXIgdGFrZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzQpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlID0gZnVuY3Rpb24gKG4pIHtcblx0ICByZXR1cm4gdGFrZSh0aGlzLCBuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBudW1iZXIpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlcikgLT4gUHJvcGVydHlcblx0dmFyIHRha2VFcnJvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM1KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZUVycm9ycyA9IGZ1bmN0aW9uIChuKSB7XG5cdCAgcmV0dXJuIHRha2VFcnJvcnModGhpcywgbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciB0YWtlV2hpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM2KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZVdoaWxlID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIHRha2VXaGlsZSh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIGxhc3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM3KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gbGFzdCh0aGlzKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBudW1iZXIpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlcikgLT4gUHJvcGVydHlcblx0dmFyIHNraXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM4KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uIChuKSB7XG5cdCAgcmV0dXJuIHNraXAodGhpcywgbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBza2lwV2hpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDM5KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcFdoaWxlID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIHNraXBXaGlsZSh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBza2lwRHVwbGljYXRlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNDApO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwRHVwbGljYXRlcyA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBza2lwRHVwbGljYXRlcyh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258ZmFsc2V5LCBhbnl8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnxmYWxzZXksIGFueXx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBkaWZmID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmRpZmYgPSBmdW5jdGlvbiAoZm4sIHNlZWQpIHtcblx0ICByZXR1cm4gZGlmZih0aGlzLCBmbiwgc2VlZCk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbXxQcm9wZXJ0eSwgRnVuY3Rpb24sIGFueXx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBzY2FuID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Mik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiAoZm4sIHNlZWQpIHtcblx0ICByZXR1cm4gc2Nhbih0aGlzLCBmbiwgc2VlZCk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBmbGF0dGVuID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Myk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZsYXR0ZW4gPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gZmxhdHRlbih0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgbnVtYmVyKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIpIC0+IFByb3BlcnR5XG5cdHZhciBkZWxheSA9IF9fd2VicGFja19yZXF1aXJlX18oNDQpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uICh3YWl0KSB7XG5cdCAgcmV0dXJuIGRlbGF5KHRoaXMsIHdhaXQpO1xuXHR9O1xuXG5cdC8vIE9wdGlvbnMgPSB7bGVhZGluZzogYm9vbGVhbnx1bmRlZmluZWQsIHRyYWlsaW5nOiBib29sZWFufHVuZGVmaW5lZH1cblx0Ly8gKFN0cmVhbSwgbnVtYmVyLCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyLCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIHRocm90dGxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRocm90dGxlID0gZnVuY3Rpb24gKHdhaXQsIG9wdGlvbnMpIHtcblx0ICByZXR1cm4gdGhyb3R0bGUodGhpcywgd2FpdCwgb3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gT3B0aW9ucyA9IHtpbW1lZGlhdGU6IGJvb2xlYW58dW5kZWZpbmVkfVxuXHQvLyAoU3RyZWFtLCBudW1iZXIsIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIsIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgZGVib3VuY2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ3KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZGVib3VuY2UgPSBmdW5jdGlvbiAod2FpdCwgb3B0aW9ucykge1xuXHQgIHJldHVybiBkZWJvdW5jZSh0aGlzLCB3YWl0LCBvcHRpb25zKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIG1hcEVycm9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oNDgpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5tYXBFcnJvcnMgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gbWFwRXJyb3JzKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGZpbHRlckVycm9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oNDkpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5maWx0ZXJFcnJvcnMgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gZmlsdGVyRXJyb3JzKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgaWdub3JlVmFsdWVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1MCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmlnbm9yZVZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gaWdub3JlVmFsdWVzKHRoaXMpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0pIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciBpZ25vcmVFcnJvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUxKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuaWdub3JlRXJyb3JzID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBpZ25vcmVFcnJvcnModGhpcyk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIGlnbm9yZUVuZCA9IF9fd2VicGFja19yZXF1aXJlX18oNTIpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5pZ25vcmVFbmQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIGlnbm9yZUVuZCh0aGlzKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbikgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb24pIC0+IFByb3BlcnR5XG5cdHZhciBiZWZvcmVFbmQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUzKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuYmVmb3JlRW5kID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIGJlZm9yZUVuZCh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgbnVtYmVyLCBudW1iZXJ8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIsIG51bWJlcnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBzbGlkaW5nV2luZG93ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnNsaWRpbmdXaW5kb3cgPSBmdW5jdGlvbiAobWF4LCBtaW4pIHtcblx0ICByZXR1cm4gc2xpZGluZ1dpbmRvdyh0aGlzLCBtYXgsIG1pbik7XG5cdH07XG5cblx0Ly8gT3B0aW9ucyA9IHtmbHVzaE9uRW5kOiBib29sZWFufHVuZGVmaW5lZH1cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258ZmFsc2V5LCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258ZmFsc2V5LCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGJ1ZmZlcldoaWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1NSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlcldoaWxlID0gZnVuY3Rpb24gKGZuLCBvcHRpb25zKSB7XG5cdCAgcmV0dXJuIGJ1ZmZlcldoaWxlKHRoaXMsIGZuLCBvcHRpb25zKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBudW1iZXIpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlcikgLT4gUHJvcGVydHlcblx0dmFyIGJ1ZmZlcldpdGhDb3VudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTYpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJXaXRoQ291bnQgPSBmdW5jdGlvbiAoY291bnQsIG9wdGlvbnMpIHtcblx0ICByZXR1cm4gYnVmZmVyV2l0aENvdW50KHRoaXMsIGNvdW50LCBvcHRpb25zKTtcblx0fTtcblxuXHQvLyBPcHRpb25zID0ge2ZsdXNoT25FbmQ6IGJvb2xlYW58dW5kZWZpbmVkfVxuXHQvLyAoU3RyZWFtLCBudW1iZXIsIG51bWJlciwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlciwgbnVtYmVyLCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGJ1ZmZlcldpdGhUaW1lT3JDb3VudCA9IF9fd2VicGFja19yZXF1aXJlX18oNTcpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJXaXRoVGltZU9yQ291bnQgPSBmdW5jdGlvbiAod2FpdCwgY291bnQsIG9wdGlvbnMpIHtcblx0ICByZXR1cm4gYnVmZmVyV2l0aFRpbWVPckNvdW50KHRoaXMsIHdhaXQsIGNvdW50LCBvcHRpb25zKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbikgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb24pIC0+IFByb3BlcnR5XG5cdHZhciB0cmFuc2R1Y2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU4KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudHJhbnNkdWNlID0gZnVuY3Rpb24gKHRyYW5zZHVjZXIpIHtcblx0ICByZXR1cm4gdHJhbnNkdWNlKHRoaXMsIHRyYW5zZHVjZXIpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbikgLT4gUHJvcGVydHlcblx0dmFyIHdpdGhIYW5kbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1OSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLndpdGhIYW5kbGVyID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIHdpdGhIYW5kbGVyKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyBDb21iaW5lIG9ic2VydmFibGVzXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Ly8gKEFycmF5PFN0cmVhbXxQcm9wZXJ0eT4sIEZ1bmN0aW9ufHVuZGVmaWVuZCkgLT4gU3RyZWFtXG5cdC8vIChBcnJheTxTdHJlYW18UHJvcGVydHk+LCBBcnJheTxTdHJlYW18UHJvcGVydHk+LCBGdW5jdGlvbnx1bmRlZmllbmQpIC0+IFN0cmVhbVxuXHR2YXIgY29tYmluZSA9IEtlZmlyLmNvbWJpbmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYwKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuY29tYmluZSA9IGZ1bmN0aW9uIChvdGhlciwgY29tYmluYXRvcikge1xuXHQgIHJldHVybiBjb21iaW5lKFt0aGlzLCBvdGhlcl0sIGNvbWJpbmF0b3IpO1xuXHR9O1xuXG5cdC8vIChBcnJheTxTdHJlYW18UHJvcGVydHk+LCBGdW5jdGlvbnx1bmRlZmllbmQpIC0+IFN0cmVhbVxuXHR2YXIgemlwID0gS2VmaXIuemlwID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnppcCA9IGZ1bmN0aW9uIChvdGhlciwgY29tYmluYXRvcikge1xuXHQgIHJldHVybiB6aXAoW3RoaXMsIG90aGVyXSwgY29tYmluYXRvcik7XG5cdH07XG5cblx0Ly8gKEFycmF5PFN0cmVhbXxQcm9wZXJ0eT4pIC0+IFN0cmVhbVxuXHR2YXIgbWVyZ2UgPSBLZWZpci5tZXJnZSA9IF9fd2VicGFja19yZXF1aXJlX18oNjIpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuXHQgIHJldHVybiBtZXJnZShbdGhpcywgb3RoZXJdKTtcblx0fTtcblxuXHQvLyAoQXJyYXk8U3RyZWFtfFByb3BlcnR5PikgLT4gU3RyZWFtXG5cdHZhciBjb25jYXQgPSBLZWZpci5jb25jYXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY0KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuY29uY2F0ID0gZnVuY3Rpb24gKG90aGVyKSB7XG5cdCAgcmV0dXJuIGNvbmNhdChbdGhpcywgb3RoZXJdKTtcblx0fTtcblxuXHQvLyAoKSAtPiBQb29sXG5cdHZhciBQb29sID0gS2VmaXIuUG9vbCA9IF9fd2VicGFja19yZXF1aXJlX18oNjYpO1xuXHRLZWZpci5wb29sID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBuZXcgUG9vbCgpO1xuXHR9O1xuXG5cdC8vIChGdW5jdGlvbikgLT4gU3RyZWFtXG5cdEtlZmlyLnJlcGVhdCA9IF9fd2VicGFja19yZXF1aXJlX18oNjUpO1xuXG5cdC8vIE9wdGlvbnMgPSB7Y29uY3VyTGltOiBudW1iZXJ8dW5kZWZpbmVkLCBxdWV1ZUxpbTogbnVtYmVyfHVuZGVmaW5lZCwgZHJvcDogJ29sZCd8J25ldyd8dW5kZWZpZW5kfVxuXHQvLyAoU3RyZWFtfFByb3BlcnR5LCBGdW5jdGlvbnxmYWxzZXksIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0dmFyIEZsYXRNYXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY3KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcCA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBuZXcgRmxhdE1hcCh0aGlzLCBmbikuc2V0TmFtZSh0aGlzLCAnZmxhdE1hcCcpO1xuXHR9O1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwTGF0ZXN0ID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIG5ldyBGbGF0TWFwKHRoaXMsIGZuLCB7IGNvbmN1ckxpbTogMSwgZHJvcDogJ29sZCcgfSkuc2V0TmFtZSh0aGlzLCAnZmxhdE1hcExhdGVzdCcpO1xuXHR9O1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwRmlyc3QgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gbmV3IEZsYXRNYXAodGhpcywgZm4sIHsgY29uY3VyTGltOiAxIH0pLnNldE5hbWUodGhpcywgJ2ZsYXRNYXBGaXJzdCcpO1xuXHR9O1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwQ29uY2F0ID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIG5ldyBGbGF0TWFwKHRoaXMsIGZuLCB7IHF1ZXVlTGltOiAtMSwgY29uY3VyTGltOiAxIH0pLnNldE5hbWUodGhpcywgJ2ZsYXRNYXBDb25jYXQnKTtcblx0fTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcENvbmN1ckxpbWl0ID0gZnVuY3Rpb24gKGZuLCBsaW1pdCkge1xuXHQgIHJldHVybiBuZXcgRmxhdE1hcCh0aGlzLCBmbiwgeyBxdWV1ZUxpbTogLTEsIGNvbmN1ckxpbTogbGltaXQgfSkuc2V0TmFtZSh0aGlzLCAnZmxhdE1hcENvbmN1ckxpbWl0Jyk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbXxQcm9wZXJ0eSwgRnVuY3Rpb258ZmFsc2V5KSAtPiBTdHJlYW1cblx0dmFyIEZsYXRNYXBFcnJvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY4KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcEVycm9ycyA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBuZXcgRmxhdE1hcEVycm9ycyh0aGlzLCBmbikuc2V0TmFtZSh0aGlzLCAnZmxhdE1hcEVycm9ycycpO1xuXHR9O1xuXG5cdC8vIENvbWJpbmUgdHdvIG9ic2VydmFibGVzXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Ly8gKFN0cmVhbSwgU3RyZWFtfFByb3BlcnR5KSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBTdHJlYW18UHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciBmaWx0ZXJCeSA9IF9fd2VicGFja19yZXF1aXJlX18oNjkpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5maWx0ZXJCeSA9IGZ1bmN0aW9uIChvdGhlcikge1xuXHQgIHJldHVybiBmaWx0ZXJCeSh0aGlzLCBvdGhlcik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgU3RyZWFtfFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmllbmQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIFN0cmVhbXxQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpZW5kKSAtPiBQcm9wZXJ0eVxuXHR2YXIgc2FtcGxlZEJ5Mml0ZW1zID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnNhbXBsZWRCeSA9IGZ1bmN0aW9uIChvdGhlciwgY29tYmluYXRvcikge1xuXHQgIHJldHVybiBzYW1wbGVkQnkyaXRlbXModGhpcywgb3RoZXIsIGNvbWJpbmF0b3IpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIFN0cmVhbXxQcm9wZXJ0eSkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgU3RyZWFtfFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgc2tpcFVudGlsQnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcyKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcFVudGlsQnkgPSBmdW5jdGlvbiAob3RoZXIpIHtcblx0ICByZXR1cm4gc2tpcFVudGlsQnkodGhpcywgb3RoZXIpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIFN0cmVhbXxQcm9wZXJ0eSkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgU3RyZWFtfFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgdGFrZVVudGlsQnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDczKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZVVudGlsQnkgPSBmdW5jdGlvbiAob3RoZXIpIHtcblx0ICByZXR1cm4gdGFrZVVudGlsQnkodGhpcywgb3RoZXIpO1xuXHR9O1xuXG5cdC8vIE9wdGlvbnMgPSB7Zmx1c2hPbkVuZDogYm9vbGVhbnx1bmRlZmluZWR9XG5cdC8vIChTdHJlYW0sIFN0cmVhbXxQcm9wZXJ0eSwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIFN0cmVhbXxQcm9wZXJ0eSwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBidWZmZXJCeSA9IF9fd2VicGFja19yZXF1aXJlX18oNzQpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJCeSA9IGZ1bmN0aW9uIChvdGhlciwgb3B0aW9ucykge1xuXHQgIHJldHVybiBidWZmZXJCeSh0aGlzLCBvdGhlciwgb3B0aW9ucyk7XG5cdH07XG5cblx0Ly8gT3B0aW9ucyA9IHtmbHVzaE9uRW5kOiBib29sZWFufHVuZGVmaW5lZH1cblx0Ly8gKFN0cmVhbSwgU3RyZWFtfFByb3BlcnR5LCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgU3RyZWFtfFByb3BlcnR5LCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGJ1ZmZlcldoaWxlQnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc1KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyV2hpbGVCeSA9IGZ1bmN0aW9uIChvdGhlciwgb3B0aW9ucykge1xuXHQgIHJldHVybiBidWZmZXJXaGlsZUJ5KHRoaXMsIG90aGVyLCBvcHRpb25zKTtcblx0fTtcblxuXHQvLyBEZXByZWNhdGVkXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0ZnVuY3Rpb24gd2Fybihtc2cpIHtcblx0ICBpZiAoS2VmaXIuREVQUkVDQVRJT05fV0FSTklOR1MgIT09IGZhbHNlICYmIGNvbnNvbGUgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgdmFyIG1zZzIgPSAnXFxuSGVyZSBpcyBhbiBFcnJvciBvYmplY3QgZm9yIHlvdSBjb250YWluaW5nIHRoZSBjYWxsIHN0YWNrOic7XG5cdCAgICBjb25zb2xlLndhcm4obXNnLCBtc2cyLCBuZXcgRXJyb3IoKSk7XG5cdCAgfVxuXHR9XG5cblx0Ly8gKFN0cmVhbXxQcm9wZXJ0eSwgU3RyZWFtfFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgYXdhaXRpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc2KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuYXdhaXRpbmcgPSBmdW5jdGlvbiAob3RoZXIpIHtcblx0ICB3YXJuKCdZb3UgYXJlIHVzaW5nIGRlcHJlY2F0ZWQgLmF3YWl0aW5nKCkgbWV0aG9kLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Jwb21pbm92L2tlZmlyL2lzc3Vlcy8xNDUnKTtcblx0ICByZXR1cm4gYXdhaXRpbmcodGhpcywgb3RoZXIpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgdmFsdWVzVG9FcnJvcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc3KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudmFsdWVzVG9FcnJvcnMgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICB3YXJuKCdZb3UgYXJlIHVzaW5nIGRlcHJlY2F0ZWQgLnZhbHVlc1RvRXJyb3JzKCkgbWV0aG9kLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Jwb21pbm92L2tlZmlyL2lzc3Vlcy8xNDknKTtcblx0ICByZXR1cm4gdmFsdWVzVG9FcnJvcnModGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgZXJyb3JzVG9WYWx1ZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc4KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZXJyb3JzVG9WYWx1ZXMgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICB3YXJuKCdZb3UgYXJlIHVzaW5nIGRlcHJlY2F0ZWQgLmVycm9yc1RvVmFsdWVzKCkgbWV0aG9kLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Jwb21pbm92L2tlZmlyL2lzc3Vlcy8xNDknKTtcblx0ICByZXR1cm4gZXJyb3JzVG9WYWx1ZXModGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0pIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciBlbmRPbkVycm9yID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3OSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmVuZE9uRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdCAgd2FybignWW91IGFyZSB1c2luZyBkZXByZWNhdGVkIC5lbmRPbkVycm9yKCkgbWV0aG9kLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Jwb21pbm92L2tlZmlyL2lzc3Vlcy8xNTAnKTtcblx0ICByZXR1cm4gZW5kT25FcnJvcih0aGlzKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBleHRlbmQgPSBfcmVxdWlyZS5leHRlbmQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUyLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZTIuRVJST1I7XG5cdHZhciBBTlkgPSBfcmVxdWlyZTIuQU5ZO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUyLkVORDtcblxuXHR2YXIgX3JlcXVpcmUzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxuXHR2YXIgRGlzcGF0Y2hlciA9IF9yZXF1aXJlMy5EaXNwYXRjaGVyO1xuXHR2YXIgY2FsbFN1YnNjcmliZXIgPSBfcmVxdWlyZTMuY2FsbFN1YnNjcmliZXI7XG5cblx0dmFyIF9yZXF1aXJlNCA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIGZpbmRCeVByZWQgPSBfcmVxdWlyZTQuZmluZEJ5UHJlZDtcblxuXHRmdW5jdGlvbiBPYnNlcnZhYmxlKCkge1xuXHQgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuXHQgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuXHQgIHRoaXMuX2FsaXZlID0gdHJ1ZTtcblx0ICB0aGlzLl9hY3RpdmF0aW5nID0gZmFsc2U7XG5cdCAgdGhpcy5fbG9nSGFuZGxlcnMgPSBudWxsO1xuXHR9XG5cblx0ZXh0ZW5kKE9ic2VydmFibGUucHJvdG90eXBlLCB7XG5cblx0ICBfbmFtZTogJ29ic2VydmFibGUnLFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHt9LFxuXHQgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge30sXG5cblx0ICBfc2V0QWN0aXZlOiBmdW5jdGlvbiBfc2V0QWN0aXZlKGFjdGl2ZSkge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2ZSAhPT0gYWN0aXZlKSB7XG5cdCAgICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcblx0ICAgICAgaWYgKGFjdGl2ZSkge1xuXHQgICAgICAgIHRoaXMuX2FjdGl2YXRpbmcgPSB0cnVlO1xuXHQgICAgICAgIHRoaXMuX29uQWN0aXZhdGlvbigpO1xuXHQgICAgICAgIHRoaXMuX2FjdGl2YXRpbmcgPSBmYWxzZTtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLl9vbkRlYWN0aXZhdGlvbigpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgdGhpcy5fc2V0QWN0aXZlKGZhbHNlKTtcblx0ICAgIHRoaXMuX2Rpc3BhdGNoZXIuY2xlYW51cCgpO1xuXHQgICAgdGhpcy5fZGlzcGF0Y2hlciA9IG51bGw7XG5cdCAgICB0aGlzLl9sb2dIYW5kbGVycyA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9lbWl0OiBmdW5jdGlvbiBfZW1pdCh0eXBlLCB4KSB7XG5cdCAgICBzd2l0Y2ggKHR5cGUpIHtcblx0ICAgICAgY2FzZSBWQUxVRTpcblx0ICAgICAgICByZXR1cm4gdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgICBjYXNlIEVSUk9SOlxuXHQgICAgICAgIHJldHVybiB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICAgIGNhc2UgRU5EOlxuXHQgICAgICAgIHJldHVybiB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9lbWl0VmFsdWU6IGZ1bmN0aW9uIF9lbWl0VmFsdWUodmFsdWUpIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogVkFMVUUsIHZhbHVlOiB2YWx1ZSB9KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2VtaXRFcnJvcjogZnVuY3Rpb24gX2VtaXRFcnJvcih2YWx1ZSkge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBFUlJPUiwgdmFsdWU6IHZhbHVlIH0pO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZW1pdEVuZDogZnVuY3Rpb24gX2VtaXRFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdGhpcy5fYWxpdmUgPSBmYWxzZTtcblx0ICAgICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IEVORCB9KTtcblx0ICAgICAgdGhpcy5fY2xlYXIoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uOiBmdW5jdGlvbiBfb24odHlwZSwgZm4pIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB0aGlzLl9kaXNwYXRjaGVyLmFkZCh0eXBlLCBmbik7XG5cdCAgICAgIHRoaXMuX3NldEFjdGl2ZSh0cnVlKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGNhbGxTdWJzY3JpYmVyKHR5cGUsIGZuLCB7IHR5cGU6IEVORCB9KTtcblx0ICAgIH1cblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH0sXG5cblx0ICBfb2ZmOiBmdW5jdGlvbiBfb2ZmKHR5cGUsIGZuKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdmFyIGNvdW50ID0gdGhpcy5fZGlzcGF0Y2hlci5yZW1vdmUodHlwZSwgZm4pO1xuXHQgICAgICBpZiAoY291bnQgPT09IDApIHtcblx0ICAgICAgICB0aGlzLl9zZXRBY3RpdmUoZmFsc2UpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9LFxuXG5cdCAgb25WYWx1ZTogZnVuY3Rpb24gb25WYWx1ZShmbikge1xuXHQgICAgcmV0dXJuIHRoaXMuX29uKFZBTFVFLCBmbik7XG5cdCAgfSxcblx0ICBvbkVycm9yOiBmdW5jdGlvbiBvbkVycm9yKGZuKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fb24oRVJST1IsIGZuKTtcblx0ICB9LFxuXHQgIG9uRW5kOiBmdW5jdGlvbiBvbkVuZChmbikge1xuXHQgICAgcmV0dXJuIHRoaXMuX29uKEVORCwgZm4pO1xuXHQgIH0sXG5cdCAgb25Bbnk6IGZ1bmN0aW9uIG9uQW55KGZuKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fb24oQU5ZLCBmbik7XG5cdCAgfSxcblxuXHQgIG9mZlZhbHVlOiBmdW5jdGlvbiBvZmZWYWx1ZShmbikge1xuXHQgICAgcmV0dXJuIHRoaXMuX29mZihWQUxVRSwgZm4pO1xuXHQgIH0sXG5cdCAgb2ZmRXJyb3I6IGZ1bmN0aW9uIG9mZkVycm9yKGZuKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fb2ZmKEVSUk9SLCBmbik7XG5cdCAgfSxcblx0ICBvZmZFbmQ6IGZ1bmN0aW9uIG9mZkVuZChmbikge1xuXHQgICAgcmV0dXJuIHRoaXMuX29mZihFTkQsIGZuKTtcblx0ICB9LFxuXHQgIG9mZkFueTogZnVuY3Rpb24gb2ZmQW55KGZuKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fb2ZmKEFOWSwgZm4pO1xuXHQgIH0sXG5cblx0ICAvLyBBIGFuZCBCIG11c3QgYmUgc3ViY2xhc3NlcyBvZiBTdHJlYW0gYW5kIFByb3BlcnR5IChvcmRlciBkb2Vzbid0IG1hdHRlcilcblx0ICBfb2ZTYW1lVHlwZTogZnVuY3Rpb24gX29mU2FtZVR5cGUoQSwgQikge1xuXHQgICAgcmV0dXJuIEEucHJvdG90eXBlLmdldFR5cGUoKSA9PT0gdGhpcy5nZXRUeXBlKCkgPyBBIDogQjtcblx0ICB9LFxuXG5cdCAgc2V0TmFtZTogZnVuY3Rpb24gc2V0TmFtZShzb3VyY2VPYnMsIC8qIG9wdGlvbmFsICovc2VsZk5hbWUpIHtcblx0ICAgIHRoaXMuX25hbWUgPSBzZWxmTmFtZSA/IHNvdXJjZU9icy5fbmFtZSArICcuJyArIHNlbGZOYW1lIDogc291cmNlT2JzO1xuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfSxcblxuXHQgIGxvZzogZnVuY3Rpb24gbG9nKCkge1xuXHQgICAgdmFyIG5hbWUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB0aGlzLnRvU3RyaW5nKCkgOiBhcmd1bWVudHNbMF07XG5cblx0ICAgIHZhciBpc0N1cnJlbnQgPSB1bmRlZmluZWQ7XG5cdCAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcblx0ICAgICAgdmFyIHR5cGUgPSAnPCcgKyBldmVudC50eXBlICsgKGlzQ3VycmVudCA/ICc6Y3VycmVudCcgOiAnJykgKyAnPic7XG5cdCAgICAgIGlmIChldmVudC50eXBlID09PSBFTkQpIHtcblx0ICAgICAgICBjb25zb2xlLmxvZyhuYW1lLCB0eXBlKTtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBjb25zb2xlLmxvZyhuYW1lLCB0eXBlLCBldmVudC52YWx1ZSk7XG5cdCAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICBpZiAoIXRoaXMuX2xvZ0hhbmRsZXJzKSB7XG5cdCAgICAgICAgdGhpcy5fbG9nSGFuZGxlcnMgPSBbXTtcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLl9sb2dIYW5kbGVycy5wdXNoKHsgbmFtZTogbmFtZSwgaGFuZGxlcjogaGFuZGxlciB9KTtcblx0ICAgIH1cblxuXHQgICAgaXNDdXJyZW50ID0gdHJ1ZTtcblx0ICAgIHRoaXMub25BbnkoaGFuZGxlcik7XG5cdCAgICBpc0N1cnJlbnQgPSBmYWxzZTtcblxuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfSxcblxuXHQgIG9mZkxvZzogZnVuY3Rpb24gb2ZmTG9nKCkge1xuXHQgICAgdmFyIG5hbWUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB0aGlzLnRvU3RyaW5nKCkgOiBhcmd1bWVudHNbMF07XG5cblx0ICAgIGlmICh0aGlzLl9sb2dIYW5kbGVycykge1xuXHQgICAgICB2YXIgaGFuZGxlckluZGV4ID0gZmluZEJ5UHJlZCh0aGlzLl9sb2dIYW5kbGVycywgZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgIHJldHVybiBvYmoubmFtZSA9PT0gbmFtZTtcblx0ICAgICAgfSk7XG5cdCAgICAgIGlmIChoYW5kbGVySW5kZXggIT09IC0xKSB7XG5cdCAgICAgICAgdGhpcy5vZmZBbnkodGhpcy5fbG9nSGFuZGxlcnNbaGFuZGxlckluZGV4XS5oYW5kbGVyKTtcblx0ICAgICAgICB0aGlzLl9sb2dIYW5kbGVycy5zcGxpY2UoaGFuZGxlckluZGV4LCAxKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9XG5cdH0pO1xuXG5cdC8vIGV4dGVuZCgpIGNhbid0IGhhbmRsZSBgdG9TdHJpbmdgIGluIElFOFxuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gJ1snICsgdGhpcy5fbmFtZSArICddJztcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IE9ic2VydmFibGU7XG5cbi8qKiovIH0sXG4vKiAyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRmdW5jdGlvbiBjcmVhdGVPYmoocHJvdG8pIHtcblx0ICB2YXIgRiA9IGZ1bmN0aW9uIEYoKSB7fTtcblx0ICBGLnByb3RvdHlwZSA9IHByb3RvO1xuXHQgIHJldHVybiBuZXcgRigpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCAvKiwgbWl4aW4xLCBtaXhpbjIuLi4qLykge1xuXHQgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHQgICAgICBpID0gdW5kZWZpbmVkLFxuXHQgICAgICBwcm9wID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgZm9yIChwcm9wIGluIGFyZ3VtZW50c1tpXSkge1xuXHQgICAgICB0YXJnZXRbcHJvcF0gPSBhcmd1bWVudHNbaV1bcHJvcF07XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0YXJnZXQ7XG5cdH1cblxuXHRmdW5jdGlvbiBpbmhlcml0KENoaWxkLCBQYXJlbnQgLyosIG1peGluMSwgbWl4aW4yLi4uKi8pIHtcblx0ICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBDaGlsZC5wcm90b3R5cGUgPSBjcmVhdGVPYmooUGFyZW50LnByb3RvdHlwZSk7XG5cdCAgQ2hpbGQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2hpbGQ7XG5cdCAgZm9yIChpID0gMjsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICBleHRlbmQoQ2hpbGQucHJvdG90eXBlLCBhcmd1bWVudHNbaV0pO1xuXHQgIH1cblx0ICByZXR1cm4gQ2hpbGQ7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHsgZXh0ZW5kOiBleHRlbmQsIGluaGVyaXQ6IGluaGVyaXQgfTtcblxuLyoqKi8gfSxcbi8qIDMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRleHBvcnRzLk5PVEhJTkcgPSBbJzxub3RoaW5nPiddO1xuXHRleHBvcnRzLkVORCA9ICdlbmQnO1xuXHRleHBvcnRzLlZBTFVFID0gJ3ZhbHVlJztcblx0ZXhwb3J0cy5FUlJPUiA9ICdlcnJvcic7XG5cdGV4cG9ydHMuQU5ZID0gJ2FueSc7XG5cbi8qKiovIH0sXG4vKiA0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgZXh0ZW5kID0gX3JlcXVpcmUuZXh0ZW5kO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlMi5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUyLkVSUk9SO1xuXHR2YXIgQU5ZID0gX3JlcXVpcmUyLkFOWTtcblxuXHR2YXIgX3JlcXVpcmUzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgY29uY2F0ID0gX3JlcXVpcmUzLmNvbmNhdDtcblx0dmFyIGZpbmRCeVByZWQgPSBfcmVxdWlyZTMuZmluZEJ5UHJlZDtcblx0dmFyIF9yZW1vdmUgPSBfcmVxdWlyZTMucmVtb3ZlO1xuXHR2YXIgY29udGFpbnMgPSBfcmVxdWlyZTMuY29udGFpbnM7XG5cblx0ZnVuY3Rpb24gY2FsbFN1YnNjcmliZXIodHlwZSwgZm4sIGV2ZW50KSB7XG5cdCAgaWYgKHR5cGUgPT09IEFOWSkge1xuXHQgICAgZm4oZXZlbnQpO1xuXHQgIH0gZWxzZSBpZiAodHlwZSA9PT0gZXZlbnQudHlwZSkge1xuXHQgICAgaWYgKHR5cGUgPT09IFZBTFVFIHx8IHR5cGUgPT09IEVSUk9SKSB7XG5cdCAgICAgIGZuKGV2ZW50LnZhbHVlKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGZuKCk7XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gRGlzcGF0Y2hlcigpIHtcblx0ICB0aGlzLl9pdGVtcyA9IFtdO1xuXHQgIHRoaXMuX2luTG9vcCA9IDA7XG5cdCAgdGhpcy5fcmVtb3ZlZEl0ZW1zID0gbnVsbDtcblx0fVxuXG5cdGV4dGVuZChEaXNwYXRjaGVyLnByb3RvdHlwZSwge1xuXG5cdCAgYWRkOiBmdW5jdGlvbiBhZGQodHlwZSwgZm4pIHtcblx0ICAgIHRoaXMuX2l0ZW1zID0gY29uY2F0KHRoaXMuX2l0ZW1zLCBbeyB0eXBlOiB0eXBlLCBmbjogZm4gfV0pO1xuXHQgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmxlbmd0aDtcblx0ICB9LFxuXG5cdCAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUodHlwZSwgZm4pIHtcblx0ICAgIHZhciBpbmRleCA9IGZpbmRCeVByZWQodGhpcy5faXRlbXMsIGZ1bmN0aW9uICh4KSB7XG5cdCAgICAgIHJldHVybiB4LnR5cGUgPT09IHR5cGUgJiYgeC5mbiA9PT0gZm47XG5cdCAgICB9KTtcblxuXHQgICAgLy8gaWYgd2UncmUgY3VycmVudGx5IGluIGEgbm90aWZpY2F0aW9uIGxvb3AsXG5cdCAgICAvLyByZW1lbWJlciB0aGlzIHN1YnNjcmliZXIgd2FzIHJlbW92ZWRcblx0ICAgIGlmICh0aGlzLl9pbkxvb3AgIT09IDAgJiYgaW5kZXggIT09IC0xKSB7XG5cdCAgICAgIGlmICh0aGlzLl9yZW1vdmVkSXRlbXMgPT09IG51bGwpIHtcblx0ICAgICAgICB0aGlzLl9yZW1vdmVkSXRlbXMgPSBbXTtcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLl9yZW1vdmVkSXRlbXMucHVzaCh0aGlzLl9pdGVtc1tpbmRleF0pO1xuXHQgICAgfVxuXG5cdCAgICB0aGlzLl9pdGVtcyA9IF9yZW1vdmUodGhpcy5faXRlbXMsIGluZGV4KTtcblx0ICAgIHJldHVybiB0aGlzLl9pdGVtcy5sZW5ndGg7XG5cdCAgfSxcblxuXHQgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaChldmVudCkge1xuXHQgICAgdGhpcy5faW5Mb29wKys7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgaXRlbXMgPSB0aGlzLl9pdGVtczsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG5cblx0ICAgICAgLy8gY2xlYW51cCB3YXMgY2FsbGVkXG5cdCAgICAgIGlmICh0aGlzLl9pdGVtcyA9PT0gbnVsbCkge1xuXHQgICAgICAgIGJyZWFrO1xuXHQgICAgICB9XG5cblx0ICAgICAgLy8gdGhpcyBzdWJzY3JpYmVyIHdhcyByZW1vdmVkXG5cdCAgICAgIGlmICh0aGlzLl9yZW1vdmVkSXRlbXMgIT09IG51bGwgJiYgY29udGFpbnModGhpcy5fcmVtb3ZlZEl0ZW1zLCBpdGVtc1tpXSkpIHtcblx0ICAgICAgICBjb250aW51ZTtcblx0ICAgICAgfVxuXG5cdCAgICAgIGNhbGxTdWJzY3JpYmVyKGl0ZW1zW2ldLnR5cGUsIGl0ZW1zW2ldLmZuLCBldmVudCk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9pbkxvb3AtLTtcblx0ICAgIGlmICh0aGlzLl9pbkxvb3AgPT09IDApIHtcblx0ICAgICAgdGhpcy5fcmVtb3ZlZEl0ZW1zID0gbnVsbDtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgY2xlYW51cDogZnVuY3Rpb24gY2xlYW51cCgpIHtcblx0ICAgIHRoaXMuX2l0ZW1zID0gbnVsbDtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7IGNhbGxTdWJzY3JpYmVyOiBjYWxsU3Vic2NyaWJlciwgRGlzcGF0Y2hlcjogRGlzcGF0Y2hlciB9O1xuXG4vKioqLyB9LFxuLyogNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0ZnVuY3Rpb24gY29uY2F0KGEsIGIpIHtcblx0ICB2YXIgcmVzdWx0ID0gdW5kZWZpbmVkLFxuXHQgICAgICBsZW5ndGggPSB1bmRlZmluZWQsXG5cdCAgICAgIGkgPSB1bmRlZmluZWQsXG5cdCAgICAgIGogPSB1bmRlZmluZWQ7XG5cdCAgaWYgKGEubGVuZ3RoID09PSAwKSB7XG5cdCAgICByZXR1cm4gYjtcblx0ICB9XG5cdCAgaWYgKGIubGVuZ3RoID09PSAwKSB7XG5cdCAgICByZXR1cm4gYTtcblx0ICB9XG5cdCAgaiA9IDA7XG5cdCAgcmVzdWx0ID0gbmV3IEFycmF5KGEubGVuZ3RoICsgYi5sZW5ndGgpO1xuXHQgIGxlbmd0aCA9IGEubGVuZ3RoO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKywgaisrKSB7XG5cdCAgICByZXN1bHRbal0gPSBhW2ldO1xuXHQgIH1cblx0ICBsZW5ndGggPSBiLmxlbmd0aDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyssIGorKykge1xuXHQgICAgcmVzdWx0W2pdID0gYltpXTtcblx0ICB9XG5cdCAgcmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZ1bmN0aW9uIGNpcmNsZVNoaWZ0KGFyciwgZGlzdGFuY2UpIHtcblx0ICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcblx0ICAgICAgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aCksXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICByZXN1bHRbKGkgKyBkaXN0YW5jZSkgJSBsZW5ndGhdID0gYXJyW2ldO1xuXHQgIH1cblx0ICByZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gZmluZChhcnIsIHZhbHVlKSB7XG5cdCAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICBpZiAoYXJyW2ldID09PSB2YWx1ZSkge1xuXHQgICAgICByZXR1cm4gaTtcblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIC0xO1xuXHR9XG5cblx0ZnVuY3Rpb24gZmluZEJ5UHJlZChhcnIsIHByZWQpIHtcblx0ICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIGlmIChwcmVkKGFycltpXSkpIHtcblx0ICAgICAgcmV0dXJuIGk7XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiAtMTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsb25lQXJyYXkoaW5wdXQpIHtcblx0ICB2YXIgbGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHQgICAgICByZXN1bHQgPSBuZXcgQXJyYXkobGVuZ3RoKSxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIHJlc3VsdFtpXSA9IGlucHV0W2ldO1xuXHQgIH1cblx0ICByZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVtb3ZlKGlucHV0LCBpbmRleCkge1xuXHQgIHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdCAgICAgIHJlc3VsdCA9IHVuZGVmaW5lZCxcblx0ICAgICAgaSA9IHVuZGVmaW5lZCxcblx0ICAgICAgaiA9IHVuZGVmaW5lZDtcblx0ICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IGxlbmd0aCkge1xuXHQgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuXHQgICAgICByZXR1cm4gW107XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXN1bHQgPSBuZXcgQXJyYXkobGVuZ3RoIC0gMSk7XG5cdCAgICAgIGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICBpZiAoaSAhPT0gaW5kZXgpIHtcblx0ICAgICAgICAgIHJlc3VsdFtqXSA9IGlucHV0W2ldO1xuXHQgICAgICAgICAgaisrO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgICByZXR1cm4gcmVzdWx0O1xuXHQgICAgfVxuXHQgIH0gZWxzZSB7XG5cdCAgICByZXR1cm4gaW5wdXQ7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gcmVtb3ZlQnlQcmVkKGlucHV0LCBwcmVkKSB7XG5cdCAgcmV0dXJuIHJlbW92ZShpbnB1dCwgZmluZEJ5UHJlZChpbnB1dCwgcHJlZCkpO1xuXHR9XG5cblx0ZnVuY3Rpb24gbWFwKGlucHV0LCBmbikge1xuXHQgIHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdCAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShsZW5ndGgpLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgcmVzdWx0W2ldID0gZm4oaW5wdXRbaV0pO1xuXHQgIH1cblx0ICByZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gZm9yRWFjaChhcnIsIGZuKSB7XG5cdCAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICBmbihhcnJbaV0pO1xuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGZpbGxBcnJheShhcnIsIHZhbHVlKSB7XG5cdCAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGgsXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICBhcnJbaV0gPSB2YWx1ZTtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBjb250YWlucyhhcnIsIHZhbHVlKSB7XG5cdCAgcmV0dXJuIGZpbmQoYXJyLCB2YWx1ZSkgIT09IC0xO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2xpZGUoY3VyLCBuZXh0LCBtYXgpIHtcblx0ICB2YXIgbGVuZ3RoID0gTWF0aC5taW4obWF4LCBjdXIubGVuZ3RoICsgMSksXG5cdCAgICAgIG9mZnNldCA9IGN1ci5sZW5ndGggLSBsZW5ndGggKyAxLFxuXHQgICAgICByZXN1bHQgPSBuZXcgQXJyYXkobGVuZ3RoKSxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgcmVzdWx0W2kgLSBvZmZzZXRdID0gY3VyW2ldO1xuXHQgIH1cblx0ICByZXN1bHRbbGVuZ3RoIC0gMV0gPSBuZXh0O1xuXHQgIHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHtcblx0ICBjb25jYXQ6IGNvbmNhdCxcblx0ICBjaXJjbGVTaGlmdDogY2lyY2xlU2hpZnQsXG5cdCAgZmluZDogZmluZCxcblx0ICBmaW5kQnlQcmVkOiBmaW5kQnlQcmVkLFxuXHQgIGNsb25lQXJyYXk6IGNsb25lQXJyYXksXG5cdCAgcmVtb3ZlOiByZW1vdmUsXG5cdCAgcmVtb3ZlQnlQcmVkOiByZW1vdmVCeVByZWQsXG5cdCAgbWFwOiBtYXAsXG5cdCAgZm9yRWFjaDogZm9yRWFjaCxcblx0ICBmaWxsQXJyYXk6IGZpbGxBcnJheSxcblx0ICBjb250YWluczogY29udGFpbnMsXG5cdCAgc2xpZGU6IHNsaWRlXG5cdH07XG5cbi8qKiovIH0sXG4vKiA2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIE9ic2VydmFibGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpO1xuXG5cdGZ1bmN0aW9uIFN0cmVhbSgpIHtcblx0ICBPYnNlcnZhYmxlLmNhbGwodGhpcyk7XG5cdH1cblxuXHRpbmhlcml0KFN0cmVhbSwgT2JzZXJ2YWJsZSwge1xuXG5cdCAgX25hbWU6ICdzdHJlYW0nLFxuXG5cdCAgZ2V0VHlwZTogZnVuY3Rpb24gZ2V0VHlwZSgpIHtcblx0ICAgIHJldHVybiAnc3RyZWFtJztcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBTdHJlYW07XG5cbi8qKiovIH0sXG4vKiA3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUyLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZTIuRVJST1I7XG5cdHZhciBFTkQgPSBfcmVxdWlyZTIuRU5EO1xuXG5cdHZhciBfcmVxdWlyZTMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG5cdHZhciBjYWxsU3Vic2NyaWJlciA9IF9yZXF1aXJlMy5jYWxsU3Vic2NyaWJlcjtcblxuXHR2YXIgT2JzZXJ2YWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cblx0ZnVuY3Rpb24gUHJvcGVydHkoKSB7XG5cdCAgT2JzZXJ2YWJsZS5jYWxsKHRoaXMpO1xuXHQgIHRoaXMuX2N1cnJlbnRFdmVudCA9IG51bGw7XG5cdH1cblxuXHRpbmhlcml0KFByb3BlcnR5LCBPYnNlcnZhYmxlLCB7XG5cblx0ICBfbmFtZTogJ3Byb3BlcnR5JyxcblxuXHQgIF9lbWl0VmFsdWU6IGZ1bmN0aW9uIF9lbWl0VmFsdWUodmFsdWUpIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB0aGlzLl9jdXJyZW50RXZlbnQgPSB7IHR5cGU6IFZBTFVFLCB2YWx1ZTogdmFsdWUgfTtcblx0ICAgICAgaWYgKCF0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IFZBTFVFLCB2YWx1ZTogdmFsdWUgfSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2VtaXRFcnJvcjogZnVuY3Rpb24gX2VtaXRFcnJvcih2YWx1ZSkge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHRoaXMuX2N1cnJlbnRFdmVudCA9IHsgdHlwZTogRVJST1IsIHZhbHVlOiB2YWx1ZSB9O1xuXHQgICAgICBpZiAoIXRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogRVJST1IsIHZhbHVlOiB2YWx1ZSB9KTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZW1pdEVuZDogZnVuY3Rpb24gX2VtaXRFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdGhpcy5fYWxpdmUgPSBmYWxzZTtcblx0ICAgICAgaWYgKCF0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IEVORCB9KTtcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLl9jbGVhcigpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb246IGZ1bmN0aW9uIF9vbih0eXBlLCBmbikge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuYWRkKHR5cGUsIGZuKTtcblx0ICAgICAgdGhpcy5fc2V0QWN0aXZlKHRydWUpO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuX2N1cnJlbnRFdmVudCAhPT0gbnVsbCkge1xuXHQgICAgICBjYWxsU3Vic2NyaWJlcih0eXBlLCBmbiwgdGhpcy5fY3VycmVudEV2ZW50KTtcblx0ICAgIH1cblx0ICAgIGlmICghdGhpcy5fYWxpdmUpIHtcblx0ICAgICAgY2FsbFN1YnNjcmliZXIodHlwZSwgZm4sIHsgdHlwZTogRU5EIH0pO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfSxcblxuXHQgIGdldFR5cGU6IGZ1bmN0aW9uIGdldFR5cGUoKSB7XG5cdCAgICByZXR1cm4gJ3Byb3BlcnR5Jztcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBQcm9wZXJ0eTtcblxuLyoqKi8gfSxcbi8qIDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuXHR2YXIgbmV2ZXJTID0gbmV3IFN0cmVhbSgpO1xuXHRuZXZlclMuX2VtaXRFbmQoKTtcblx0bmV2ZXJTLl9uYW1lID0gJ25ldmVyJztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5ldmVyKCkge1xuXHQgIHJldHVybiBuZXZlclM7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHRpbWVCYXNlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXG5cdHZhciBTID0gdGltZUJhc2VkKHtcblxuXHQgIF9uYW1lOiAnbGF0ZXInLFxuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciB4ID0gX3JlZi54O1xuXG5cdCAgICB0aGlzLl94ID0geDtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5feCA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9vblRpY2s6IGZ1bmN0aW9uIF9vblRpY2soKSB7XG5cdCAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5feCk7XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGF0ZXIod2FpdCwgeCkge1xuXHQgIHJldHVybiBuZXcgUyh3YWl0LCB7IHg6IHggfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGltZUJhc2VkKG1peGluKSB7XG5cblx0ICBmdW5jdGlvbiBBbm9ueW1vdXNTdHJlYW0od2FpdCwgb3B0aW9ucykge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgICAgU3RyZWFtLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl93YWl0ID0gd2FpdDtcblx0ICAgIHRoaXMuX2ludGVydmFsSWQgPSBudWxsO1xuXHQgICAgdGhpcy5fJG9uVGljayA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9vblRpY2soKTtcblx0ICAgIH07XG5cdCAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuXHQgIH1cblxuXHQgIGluaGVyaXQoQW5vbnltb3VzU3RyZWFtLCBTdHJlYW0sIHtcblxuXHQgICAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KCkge30sXG5cdCAgICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7fSxcblxuXHQgICAgX29uVGljazogZnVuY3Rpb24gX29uVGljaygpIHt9LFxuXG5cdCAgICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgICB0aGlzLl9pbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwodGhpcy5fJG9uVGljaywgdGhpcy5fd2FpdCk7XG5cdCAgICB9LFxuXG5cdCAgICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgICAgaWYgKHRoaXMuX2ludGVydmFsSWQgIT09IG51bGwpIHtcblx0ICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsSWQpO1xuXHQgICAgICAgIHRoaXMuX2ludGVydmFsSWQgPSBudWxsO1xuXHQgICAgICB9XG5cdCAgICB9LFxuXG5cdCAgICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgICAgU3RyZWFtLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgICAgdGhpcy5fJG9uVGljayA9IG51bGw7XG5cdCAgICAgIHRoaXMuX2ZyZWUoKTtcblx0ICAgIH1cblxuXHQgIH0sIG1peGluKTtcblxuXHQgIHJldHVybiBBbm9ueW1vdXNTdHJlYW07XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciB0aW1lQmFzZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxuXHR2YXIgUyA9IHRpbWVCYXNlZCh7XG5cblx0ICBfbmFtZTogJ2ludGVydmFsJyxcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgeCA9IF9yZWYueDtcblxuXHQgICAgdGhpcy5feCA9IHg7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX3ggPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfb25UaWNrOiBmdW5jdGlvbiBfb25UaWNrKCkge1xuXHQgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX3gpO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGludGVydmFsKHdhaXQsIHgpIHtcblx0ICByZXR1cm4gbmV3IFMod2FpdCwgeyB4OiB4IH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgdGltZUJhc2VkID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgY2xvbmVBcnJheSA9IF9yZXF1aXJlLmNsb25lQXJyYXk7XG5cblx0dmFyIG5ldmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblxuXHR2YXIgUyA9IHRpbWVCYXNlZCh7XG5cblx0ICBfbmFtZTogJ3NlcXVlbnRpYWxseScsXG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIHhzID0gX3JlZi54cztcblxuXHQgICAgdGhpcy5feHMgPSBjbG9uZUFycmF5KHhzKTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5feHMgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfb25UaWNrOiBmdW5jdGlvbiBfb25UaWNrKCkge1xuXHQgICAgaWYgKHRoaXMuX3hzLmxlbmd0aCA9PT0gMSkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5feHNbMF0pO1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5feHMuc2hpZnQoKSk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VxdWVudGlhbGx5KHdhaXQsIHhzKSB7XG5cdCAgcmV0dXJuIHhzLmxlbmd0aCA9PT0gMCA/IG5ldmVyKCkgOiBuZXcgUyh3YWl0LCB7IHhzOiB4cyB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDEzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHRpbWVCYXNlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXG5cdHZhciBTID0gdGltZUJhc2VkKHtcblxuXHQgIF9uYW1lOiAnZnJvbVBvbGwnLFxuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX29uVGljazogZnVuY3Rpb24gX29uVGljaygpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgdGhpcy5fZW1pdFZhbHVlKGZuKCkpO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb21Qb2xsKHdhaXQsIGZuKSB7XG5cdCAgcmV0dXJuIG5ldyBTKHdhaXQsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgdGltZUJhc2VkID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cdHZhciBlbWl0dGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cblx0dmFyIFMgPSB0aW1lQmFzZWQoe1xuXG5cdCAgX25hbWU6ICd3aXRoSW50ZXJ2YWwnLFxuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgICB0aGlzLl9lbWl0dGVyID0gZW1pdHRlcih0aGlzKTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgICAgdGhpcy5fZW1pdHRlciA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9vblRpY2s6IGZ1bmN0aW9uIF9vblRpY2soKSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIGZuKHRoaXMuX2VtaXR0ZXIpO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdpdGhJbnRlcnZhbCh3YWl0LCBmbikge1xuXHQgIHJldHVybiBuZXcgUyh3YWl0LCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDE1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVtaXR0ZXIob2JzKSB7XG5cblx0ICBmdW5jdGlvbiB2YWx1ZSh4KSB7XG5cdCAgICBvYnMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIHJldHVybiBvYnMuX2FjdGl2ZTtcblx0ICB9XG5cblx0ICBmdW5jdGlvbiBlcnJvcih4KSB7XG5cdCAgICBvYnMuX2VtaXRFcnJvcih4KTtcblx0ICAgIHJldHVybiBvYnMuX2FjdGl2ZTtcblx0ICB9XG5cblx0ICBmdW5jdGlvbiBlbmQoKSB7XG5cdCAgICBvYnMuX2VtaXRFbmQoKTtcblx0ICAgIHJldHVybiBvYnMuX2FjdGl2ZTtcblx0ICB9XG5cblx0ICBmdW5jdGlvbiBldmVudChlKSB7XG5cdCAgICBvYnMuX2VtaXQoZS50eXBlLCBlLnZhbHVlKTtcblx0ICAgIHJldHVybiBvYnMuX2FjdGl2ZTtcblx0ICB9XG5cblx0ICByZXR1cm4geyB2YWx1ZTogdmFsdWUsIGVycm9yOiBlcnJvciwgZW5kOiBlbmQsIGV2ZW50OiBldmVudCwgZW1pdDogdmFsdWUsIGVtaXRFdmVudDogZXZlbnQgfTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDE2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbUNhbGxiYWNrKGNhbGxiYWNrQ29uc3VtZXIpIHtcblxuXHQgIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuXHQgIHJldHVybiBzdHJlYW0oZnVuY3Rpb24gKGVtaXR0ZXIpIHtcblxuXHQgICAgaWYgKCFjYWxsZWQpIHtcblx0ICAgICAgY2FsbGJhY2tDb25zdW1lcihmdW5jdGlvbiAoeCkge1xuXHQgICAgICAgIGVtaXR0ZXIuZW1pdCh4KTtcblx0ICAgICAgICBlbWl0dGVyLmVuZCgpO1xuXHQgICAgICB9KTtcblx0ICAgICAgY2FsbGVkID0gdHJ1ZTtcblx0ICAgIH1cblx0ICB9KS5zZXROYW1lKCdmcm9tQ2FsbGJhY2snKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDE3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cdHZhciBlbWl0dGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cblx0ZnVuY3Rpb24gUyhmbikge1xuXHQgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXHQgIHRoaXMuX2ZuID0gZm47XG5cdCAgdGhpcy5fdW5zdWJzY3JpYmUgPSBudWxsO1xuXHR9XG5cblx0aW5oZXJpdChTLCBTdHJlYW0sIHtcblxuXHQgIF9uYW1lOiAnc3RyZWFtJyxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIHZhciB1bnN1YnNjcmliZSA9IGZuKGVtaXR0ZXIodGhpcykpO1xuXHQgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSB0eXBlb2YgdW5zdWJzY3JpYmUgPT09ICdmdW5jdGlvbicgPyB1bnN1YnNjcmliZSA6IG51bGw7XG5cblx0ICAgIC8vIGZpeCBodHRwczovL2dpdGh1Yi5jb20vcnBvbWlub3Yva2VmaXIvaXNzdWVzLzM1XG5cdCAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuXHQgICAgICB0aGlzLl9jYWxsVW5zdWJzY3JpYmUoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2NhbGxVbnN1YnNjcmliZTogZnVuY3Rpb24gX2NhbGxVbnN1YnNjcmliZSgpIHtcblx0ICAgIGlmICh0aGlzLl91bnN1YnNjcmliZSAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLl91bnN1YnNjcmliZSgpO1xuXHQgICAgICB0aGlzLl91bnN1YnNjcmliZSA9IG51bGw7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgdGhpcy5fY2FsbFVuc3Vic2NyaWJlKCk7XG5cdCAgfSxcblxuXHQgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgU3RyZWFtLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHJlYW0oZm4pIHtcblx0ICByZXR1cm4gbmV3IFMoZm4pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgc3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tTm9kZUNhbGxiYWNrKGNhbGxiYWNrQ29uc3VtZXIpIHtcblxuXHQgIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuXHQgIHJldHVybiBzdHJlYW0oZnVuY3Rpb24gKGVtaXR0ZXIpIHtcblxuXHQgICAgaWYgKCFjYWxsZWQpIHtcblx0ICAgICAgY2FsbGJhY2tDb25zdW1lcihmdW5jdGlvbiAoZXJyb3IsIHgpIHtcblx0ICAgICAgICBpZiAoZXJyb3IpIHtcblx0ICAgICAgICAgIGVtaXR0ZXIuZXJyb3IoZXJyb3IpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICBlbWl0dGVyLmVtaXQoeCk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGVtaXR0ZXIuZW5kKCk7XG5cdCAgICAgIH0pO1xuXHQgICAgICBjYWxsZWQgPSB0cnVlO1xuXHQgICAgfVxuXHQgIH0pLnNldE5hbWUoJ2Zyb21Ob2RlQ2FsbGJhY2snKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDE5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGZyb21TdWJVbnN1YiA9IF9fd2VicGFja19yZXF1aXJlX18oMjApO1xuXG5cdHZhciBwYWlycyA9IFtbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lciddLCBbJ2FkZExpc3RlbmVyJywgJ3JlbW92ZUxpc3RlbmVyJ10sIFsnb24nLCAnb2ZmJ11dO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbUV2ZW50cyh0YXJnZXQsIGV2ZW50TmFtZSwgdHJhbnNmb3JtZXIpIHtcblx0ICB2YXIgc3ViID0gdW5kZWZpbmVkLFxuXHQgICAgICB1bnN1YiA9IHVuZGVmaW5lZDtcblxuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcblx0ICAgIGlmICh0eXBlb2YgdGFyZ2V0W3BhaXJzW2ldWzBdXSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdGFyZ2V0W3BhaXJzW2ldWzFdXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICBzdWIgPSBwYWlyc1tpXVswXTtcblx0ICAgICAgdW5zdWIgPSBwYWlyc1tpXVsxXTtcblx0ICAgICAgYnJlYWs7XG5cdCAgICB9XG5cdCAgfVxuXG5cdCAgaWYgKHN1YiA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ3RhcmdldCBkb25cXCd0IHN1cHBvcnQgYW55IG9mICcgKyAnYWRkRXZlbnRMaXN0ZW5lci9yZW1vdmVFdmVudExpc3RlbmVyLCBhZGRMaXN0ZW5lci9yZW1vdmVMaXN0ZW5lciwgb24vb2ZmIG1ldGhvZCBwYWlyJyk7XG5cdCAgfVxuXG5cdCAgcmV0dXJuIGZyb21TdWJVbnN1YihmdW5jdGlvbiAoaGFuZGxlcikge1xuXHQgICAgcmV0dXJuIHRhcmdldFtzdWJdKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdCAgfSwgZnVuY3Rpb24gKGhhbmRsZXIpIHtcblx0ICAgIHJldHVybiB0YXJnZXRbdW5zdWJdKGV2ZW50TmFtZSwgaGFuZGxlcik7XG5cdCAgfSwgdHJhbnNmb3JtZXIpLnNldE5hbWUoJ2Zyb21FdmVudHMnKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDIwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXG5cdHZhciBhcHBseSA9IF9yZXF1aXJlLmFwcGx5O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbVN1YlVuc3ViKHN1YiwgdW5zdWIsIHRyYW5zZm9ybWVyIC8qIEZ1bmN0aW9uIHwgZmFsc2V5ICovKSB7XG5cdCAgcmV0dXJuIHN0cmVhbShmdW5jdGlvbiAoZW1pdHRlcikge1xuXG5cdCAgICB2YXIgaGFuZGxlciA9IHRyYW5zZm9ybWVyID8gZnVuY3Rpb24gKCkge1xuXHQgICAgICBlbWl0dGVyLmVtaXQoYXBwbHkodHJhbnNmb3JtZXIsIHRoaXMsIGFyZ3VtZW50cykpO1xuXHQgICAgfSA6IGZ1bmN0aW9uICh4KSB7XG5cdCAgICAgIGVtaXR0ZXIuZW1pdCh4KTtcblx0ICAgIH07XG5cblx0ICAgIHN1YihoYW5kbGVyKTtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiB1bnN1YihoYW5kbGVyKTtcblx0ICAgIH07XG5cdCAgfSkuc2V0TmFtZSgnZnJvbVN1YlVuc3ViJyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAyMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0ZnVuY3Rpb24gc3ByZWFkKGZuLCBsZW5ndGgpIHtcblx0ICBzd2l0Y2ggKGxlbmd0aCkge1xuXHQgICAgY2FzZSAwOlxuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHJldHVybiBmbigpO1xuXHQgICAgICB9O1xuXHQgICAgY2FzZSAxOlxuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICByZXR1cm4gZm4oYVswXSk7XG5cdCAgICAgIH07XG5cdCAgICBjYXNlIDI6XG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgIHJldHVybiBmbihhWzBdLCBhWzFdKTtcblx0ICAgICAgfTtcblx0ICAgIGNhc2UgMzpcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgcmV0dXJuIGZuKGFbMF0sIGFbMV0sIGFbMl0pO1xuXHQgICAgICB9O1xuXHQgICAgY2FzZSA0OlxuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICByZXR1cm4gZm4oYVswXSwgYVsxXSwgYVsyXSwgYVszXSk7XG5cdCAgICAgIH07XG5cdCAgICBkZWZhdWx0OlxuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYSk7XG5cdCAgICAgIH07XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gYXBwbHkoZm4sIGMsIGEpIHtcblx0ICB2YXIgYUxlbmd0aCA9IGEgPyBhLmxlbmd0aCA6IDA7XG5cdCAgaWYgKGMgPT0gbnVsbCkge1xuXHQgICAgc3dpdGNoIChhTGVuZ3RoKSB7XG5cdCAgICAgIGNhc2UgMDpcblx0ICAgICAgICByZXR1cm4gZm4oKTtcblx0ICAgICAgY2FzZSAxOlxuXHQgICAgICAgIHJldHVybiBmbihhWzBdKTtcblx0ICAgICAgY2FzZSAyOlxuXHQgICAgICAgIHJldHVybiBmbihhWzBdLCBhWzFdKTtcblx0ICAgICAgY2FzZSAzOlxuXHQgICAgICAgIHJldHVybiBmbihhWzBdLCBhWzFdLCBhWzJdKTtcblx0ICAgICAgY2FzZSA0OlxuXHQgICAgICAgIHJldHVybiBmbihhWzBdLCBhWzFdLCBhWzJdLCBhWzNdKTtcblx0ICAgICAgZGVmYXVsdDpcblx0ICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYSk7XG5cdCAgICB9XG5cdCAgfSBlbHNlIHtcblx0ICAgIHN3aXRjaCAoYUxlbmd0aCkge1xuXHQgICAgICBjYXNlIDA6XG5cdCAgICAgICAgcmV0dXJuIGZuLmNhbGwoYyk7XG5cdCAgICAgIGRlZmF1bHQ6XG5cdCAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGMsIGEpO1xuXHQgICAgfVxuXHQgIH1cblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0geyBzcHJlYWQ6IHNwcmVhZCwgYXBwbHk6IGFwcGx5IH07XG5cbi8qKiovIH0sXG4vKiAyMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cblx0Ly8gSEFDSzpcblx0Ly8gICBXZSBkb24ndCBjYWxsIHBhcmVudCBDbGFzcyBjb25zdHJ1Y3RvciwgYnV0IGluc3RlYWQgcHV0dGluZyBhbGwgbmVjZXNzYXJ5XG5cdC8vICAgcHJvcGVydGllcyBpbnRvIHByb3RvdHlwZSB0byBzaW11bGF0ZSBlbmRlZCBQcm9wZXJ0eVxuXHQvLyAgIChzZWUgUHJvcHBlcnR5IGFuZCBPYnNlcnZhYmxlIGNsYXNzZXMpLlxuXG5cdGZ1bmN0aW9uIFAodmFsdWUpIHtcblx0ICB0aGlzLl9jdXJyZW50RXZlbnQgPSB7IHR5cGU6ICd2YWx1ZScsIHZhbHVlOiB2YWx1ZSwgY3VycmVudDogdHJ1ZSB9O1xuXHR9XG5cblx0aW5oZXJpdChQLCBQcm9wZXJ0eSwge1xuXHQgIF9uYW1lOiAnY29uc3RhbnQnLFxuXHQgIF9hY3RpdmU6IGZhbHNlLFxuXHQgIF9hY3RpdmF0aW5nOiBmYWxzZSxcblx0ICBfYWxpdmU6IGZhbHNlLFxuXHQgIF9kaXNwYXRjaGVyOiBudWxsLFxuXHQgIF9sb2dIYW5kbGVyczogbnVsbFxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbnN0YW50KHgpIHtcblx0ICByZXR1cm4gbmV3IFAoeCk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAyMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cblx0Ly8gSEFDSzpcblx0Ly8gICBXZSBkb24ndCBjYWxsIHBhcmVudCBDbGFzcyBjb25zdHJ1Y3RvciwgYnV0IGluc3RlYWQgcHV0dGluZyBhbGwgbmVjZXNzYXJ5XG5cdC8vICAgcHJvcGVydGllcyBpbnRvIHByb3RvdHlwZSB0byBzaW11bGF0ZSBlbmRlZCBQcm9wZXJ0eVxuXHQvLyAgIChzZWUgUHJvcHBlcnR5IGFuZCBPYnNlcnZhYmxlIGNsYXNzZXMpLlxuXG5cdGZ1bmN0aW9uIFAodmFsdWUpIHtcblx0ICB0aGlzLl9jdXJyZW50RXZlbnQgPSB7IHR5cGU6ICdlcnJvcicsIHZhbHVlOiB2YWx1ZSwgY3VycmVudDogdHJ1ZSB9O1xuXHR9XG5cblx0aW5oZXJpdChQLCBQcm9wZXJ0eSwge1xuXHQgIF9uYW1lOiAnY29uc3RhbnRFcnJvcicsXG5cdCAgX2FjdGl2ZTogZmFsc2UsXG5cdCAgX2FjdGl2YXRpbmc6IGZhbHNlLFxuXHQgIF9hbGl2ZTogZmFsc2UsXG5cdCAgX2Rpc3BhdGNoZXI6IG51bGwsXG5cdCAgX2xvZ0hhbmRsZXJzOiBudWxsXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uc3RhbnRFcnJvcih4KSB7XG5cdCAgcmV0dXJuIG5ldyBQKHgpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMjQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd0b1Byb3BlcnR5Jywge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2dldEluaXRpYWxDdXJyZW50ID0gZm47XG5cdCAgfSxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICBpZiAodGhpcy5fZ2V0SW5pdGlhbEN1cnJlbnQgIT09IG51bGwpIHtcblx0ICAgICAgdmFyIGdldEluaXRpYWwgPSB0aGlzLl9nZXRJbml0aWFsQ3VycmVudDtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKGdldEluaXRpYWwoKSk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9zb3VyY2Uub25BbnkodGhpcy5fJGhhbmRsZUFueSk7IC8vIGNvcGllZCBmcm9tIHBhdHRlcm5zL29uZS1zb3VyY2Vcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b1Byb3BlcnR5KG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IG51bGwgOiBhcmd1bWVudHNbMV07XG5cblx0ICBpZiAoZm4gIT09IG51bGwgJiYgdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBzaG91bGQgY2FsbCB0b1Byb3BlcnR5KCkgd2l0aCBhIGZ1bmN0aW9uIG9yIG5vIGFyZ3VtZW50cy4nKTtcblx0ICB9XG5cdCAgcmV0dXJuIG5ldyBQKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAyNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHR2YXIgUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlMi5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUyLkVSUk9SO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUyLkVORDtcblxuXHRmdW5jdGlvbiBjcmVhdGVDb25zdHJ1Y3RvcihCYXNlQ2xhc3MsIG5hbWUpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gQW5vbnltb3VzT2JzZXJ2YWJsZShzb3VyY2UsIG9wdGlvbnMpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICAgIEJhc2VDbGFzcy5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fc291cmNlID0gc291cmNlO1xuXHQgICAgdGhpcy5fbmFtZSA9IHNvdXJjZS5fbmFtZSArICcuJyArIG5hbWU7XG5cdCAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuXHQgICAgdGhpcy5fJGhhbmRsZUFueSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX2hhbmRsZUFueShldmVudCk7XG5cdCAgICB9O1xuXHQgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVDbGFzc01ldGhvZHMoQmFzZUNsYXNzKSB7XG5cdCAgcmV0dXJuIHtcblxuXHQgICAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KCkge30sXG5cdCAgICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7fSxcblxuXHQgICAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9LFxuXHQgICAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlRXJyb3IoeCkge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICB9LFxuXHQgICAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfSxcblxuXHQgICAgX2hhbmRsZUFueTogZnVuY3Rpb24gX2hhbmRsZUFueShldmVudCkge1xuXHQgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcblx0ICAgICAgICBjYXNlIFZBTFVFOlxuXHQgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVZhbHVlKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgICBjYXNlIEVSUk9SOlxuXHQgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZUVycm9yKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgICBjYXNlIEVORDpcblx0ICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVFbmQoKTtcblx0ICAgICAgfVxuXHQgICAgfSxcblxuXHQgICAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgICAgdGhpcy5fc291cmNlLm9uQW55KHRoaXMuXyRoYW5kbGVBbnkpO1xuXHQgICAgfSxcblx0ICAgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgICB0aGlzLl9zb3VyY2Uub2ZmQW55KHRoaXMuXyRoYW5kbGVBbnkpO1xuXHQgICAgfSxcblxuXHQgICAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICAgIEJhc2VDbGFzcy5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XG5cdCAgICAgIHRoaXMuXyRoYW5kbGVBbnkgPSBudWxsO1xuXHQgICAgICB0aGlzLl9mcmVlKCk7XG5cdCAgICB9XG5cblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlU3RyZWFtKG5hbWUsIG1peGluKSB7XG5cdCAgdmFyIFMgPSBjcmVhdGVDb25zdHJ1Y3RvcihTdHJlYW0sIG5hbWUpO1xuXHQgIGluaGVyaXQoUywgU3RyZWFtLCBjcmVhdGVDbGFzc01ldGhvZHMoU3RyZWFtKSwgbWl4aW4pO1xuXHQgIHJldHVybiBTO1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlUHJvcGVydHkobmFtZSwgbWl4aW4pIHtcblx0ICB2YXIgUCA9IGNyZWF0ZUNvbnN0cnVjdG9yKFByb3BlcnR5LCBuYW1lKTtcblx0ICBpbmhlcml0KFAsIFByb3BlcnR5LCBjcmVhdGVDbGFzc01ldGhvZHMoUHJvcGVydHkpLCBtaXhpbik7XG5cdCAgcmV0dXJuIFA7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHsgY3JlYXRlU3RyZWFtOiBjcmVhdGVTdHJlYW0sIGNyZWF0ZVByb3BlcnR5OiBjcmVhdGVQcm9wZXJ0eSB9O1xuXG4vKioqLyB9LFxuLyogMjYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdjaGFuZ2VzJywge1xuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgaWYgKCF0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlRXJyb3IoeCkge1xuXHQgICAgaWYgKCF0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgIH1cblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjaGFuZ2VzKG9icykge1xuXHQgIHJldHVybiBuZXcgUyhvYnMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMjcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgc3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cdHZhciB0b1Byb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tUHJvbWlzZShwcm9taXNlKSB7XG5cblx0ICB2YXIgY2FsbGVkID0gZmFsc2U7XG5cblx0ICB2YXIgcmVzdWx0ID0gc3RyZWFtKGZ1bmN0aW9uIChlbWl0dGVyKSB7XG5cdCAgICBpZiAoIWNhbGxlZCkge1xuXHQgICAgICB2YXIgb25WYWx1ZSA9IGZ1bmN0aW9uIG9uVmFsdWUoeCkge1xuXHQgICAgICAgIGVtaXR0ZXIuZW1pdCh4KTtcblx0ICAgICAgICBlbWl0dGVyLmVuZCgpO1xuXHQgICAgICB9O1xuXHQgICAgICB2YXIgb25FcnJvciA9IGZ1bmN0aW9uIG9uRXJyb3IoeCkge1xuXHQgICAgICAgIGVtaXR0ZXIuZXJyb3IoeCk7XG5cdCAgICAgICAgZW1pdHRlci5lbmQoKTtcblx0ICAgICAgfTtcblx0ICAgICAgdmFyIF9wcm9taXNlID0gcHJvbWlzZS50aGVuKG9uVmFsdWUsIG9uRXJyb3IpO1xuXG5cdCAgICAgIC8vIHByZXZlbnQgbGlicmFyaWVzIGxpa2UgJ1EnIG9yICd3aGVuJyBmcm9tIHN3YWxsb3dpbmcgZXhjZXB0aW9uc1xuXHQgICAgICBpZiAoX3Byb21pc2UgJiYgdHlwZW9mIF9wcm9taXNlLmRvbmUgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgICAgICBfcHJvbWlzZS5kb25lKCk7XG5cdCAgICAgIH1cblxuXHQgICAgICBjYWxsZWQgPSB0cnVlO1xuXHQgICAgfVxuXHQgIH0pO1xuXG5cdCAgcmV0dXJuIHRvUHJvcGVydHkocmVzdWx0LCBudWxsKS5zZXROYW1lKCdmcm9tUHJvbWlzZScpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMjggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlLlZBTFVFO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUuRU5EO1xuXG5cdGZ1bmN0aW9uIGdldEdsb2RhbFByb21pc2UoKSB7XG5cdCAgaWYgKHR5cGVvZiBQcm9taXNlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICByZXR1cm4gUHJvbWlzZTtcblx0ICB9IGVsc2Uge1xuXHQgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpc25cXCd0IGRlZmF1bHQgUHJvbWlzZSwgdXNlIHNoaW0gb3IgcGFyYW1ldGVyJyk7XG5cdCAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JzKSB7XG5cdCAgdmFyIFByb21pc2UgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBnZXRHbG9kYWxQcm9taXNlKCkgOiBhcmd1bWVudHNbMV07XG5cblx0ICB2YXIgbGFzdCA9IG51bGw7XG5cdCAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblx0ICAgIG9icy5vbkFueShmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVORCAmJiBsYXN0ICE9PSBudWxsKSB7XG5cdCAgICAgICAgKGxhc3QudHlwZSA9PT0gVkFMVUUgPyByZXNvbHZlIDogcmVqZWN0KShsYXN0LnZhbHVlKTtcblx0ICAgICAgICBsYXN0ID0gbnVsbDtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICBsYXN0ID0gZXZlbnQ7XG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXHQgIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMjkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgc3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cdHZhciBzeW1ib2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKSgnb2JzZXJ2YWJsZScpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbUVTT2JzZXJ2YWJsZShfb2JzZXJ2YWJsZSkge1xuXHQgIHZhciBvYnNlcnZhYmxlID0gX29ic2VydmFibGVbc3ltYm9sXSA/IF9vYnNlcnZhYmxlW3N5bWJvbF0oKSA6IF9vYnNlcnZhYmxlO1xuXHQgIHJldHVybiBzdHJlYW0oZnVuY3Rpb24gKGVtaXR0ZXIpIHtcblx0ICAgIHZhciB1bnN1YiA9IG9ic2VydmFibGUuc3Vic2NyaWJlKHtcblx0ICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKF9lcnJvcikge1xuXHQgICAgICAgIGVtaXR0ZXIuZXJyb3IoX2Vycm9yKTtcblx0ICAgICAgICBlbWl0dGVyLmVuZCgpO1xuXHQgICAgICB9LFxuXHQgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KHZhbHVlKSB7XG5cdCAgICAgICAgZW1pdHRlci5lbWl0KHZhbHVlKTtcblx0ICAgICAgfSxcblx0ICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuXHQgICAgICAgIGVtaXR0ZXIuZW5kKCk7XG5cdCAgICAgIH1cblx0ICAgIH0pO1xuXG5cdCAgICBpZiAodW5zdWIudW5zdWJzY3JpYmUpIHtcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICB1bnN1Yi51bnN1YnNjcmliZSgpO1xuXHQgICAgICB9O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgcmV0dXJuIHVuc3ViO1xuXHQgICAgfVxuXHQgIH0pLnNldE5hbWUoJ2Zyb21FU09ic2VydmFibGUnKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDMwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG5cdCAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbFtrZXldKSB7XG5cdCAgICByZXR1cm4gU3ltYm9sW2tleV07XG5cdCAgfSBlbHNlIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgU3ltYm9sWydmb3InXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgcmV0dXJuIFN5bWJvbFsnZm9yJ10oa2V5KTtcblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuICdAQCcgKyBrZXk7XG5cdCAgfVxuXHR9O1xuXG4vKioqLyB9LFxuLyogMzEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBleHRlbmQgPSBfcmVxdWlyZS5leHRlbmQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUyLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZTIuRVJST1I7XG5cdHZhciBFTkQgPSBfcmVxdWlyZTIuRU5EO1xuXG5cdGZ1bmN0aW9uIEVTT2JzZXJ2YWJsZShvYnNlcnZhYmxlKSB7XG5cdCAgdGhpcy5fb2JzZXJ2YWJsZSA9IG9ic2VydmFibGUudGFrZUVycm9ycygxKTtcblx0fVxuXG5cdGV4dGVuZChFU09ic2VydmFibGUucHJvdG90eXBlLCB7XG5cdCAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICAgIHZhciBmbiA9IGZ1bmN0aW9uIGZuKGV2ZW50KSB7XG5cdCAgICAgIGlmIChldmVudC50eXBlID09PSBWQUxVRSAmJiBvYnNlcnZlci5uZXh0KSB7XG5cdCAgICAgICAgb2JzZXJ2ZXIubmV4dChldmVudC52YWx1ZSk7XG5cdCAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gRVJST1IgJiYgb2JzZXJ2ZXIuZXJyb3IpIHtcblx0ICAgICAgICBvYnNlcnZlci5lcnJvcihldmVudC52YWx1ZSk7XG5cdCAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gRU5EICYmIG9ic2VydmVyLmNvbXBsZXRlKSB7XG5cdCAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoZXZlbnQudmFsdWUpO1xuXHQgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICB0aGlzLl9vYnNlcnZhYmxlLm9uQW55KGZuKTtcblx0ICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5fb2JzZXJ2YWJsZS5vZmZBbnkoZm4pO1xuXHQgICAgfTtcblx0ICB9XG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdG9FU09ic2VydmFibGUoKSB7XG5cdCAgcmV0dXJuIG5ldyBFU09ic2VydmFibGUodGhpcyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgdGhpcy5fZW1pdFZhbHVlKGZuKHgpKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnbWFwJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdtYXAnLCBtaXhpbik7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWFwKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGlkIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIGlmIChmbih4KSkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2ZpbHRlcicsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnZmlsdGVyJywgbWl4aW4pO1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbHRlcihvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBpZCA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDM0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBuID0gX3JlZi5uO1xuXG5cdCAgICB0aGlzLl9uID0gbjtcblx0ICAgIGlmIChuIDw9IDApIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB0aGlzLl9uLS07XG5cdCAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICBpZiAodGhpcy5fbiA9PT0gMCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3Rha2UnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3Rha2UnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0YWtlKG9icywgbikge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IG46IG4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgbiA9IF9yZWYubjtcblxuXHQgICAgdGhpcy5fbiA9IG47XG5cdCAgICBpZiAobiA8PSAwKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlRXJyb3IoeCkge1xuXHQgICAgdGhpcy5fbi0tO1xuXHQgICAgdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgaWYgKHRoaXMuX24gPT09IDApIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCd0YWtlRXJyb3JzJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd0YWtlRXJyb3JzJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGFrZUVycm9ycyhvYnMsIG4pIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBuOiBuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIGlmIChmbih4KSkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3Rha2VXaGlsZScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgndGFrZVdoaWxlJywgbWl4aW4pO1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRha2VXaGlsZShvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBpZCA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDM3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZTIuTk9USElORztcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoKSB7XG5cdCAgICB0aGlzLl9sYXN0VmFsdWUgPSBOT1RISU5HO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9sYXN0VmFsdWUgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB0aGlzLl9sYXN0VmFsdWUgPSB4O1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2xhc3RWYWx1ZSAhPT0gTk9USElORykge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fbGFzdFZhbHVlKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnbGFzdCcsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnbGFzdCcsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxhc3Qob2JzKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIG4gPSBfcmVmLm47XG5cblx0ICAgIHRoaXMuX24gPSBNYXRoLm1heCgwLCBuKTtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX24gPT09IDApIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fbi0tO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdza2lwJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdza2lwJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2tpcChvYnMsIG4pIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBuOiBuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIGlmICh0aGlzLl9mbiAhPT0gbnVsbCAmJiAhZm4oeCkpIHtcblx0ICAgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuX2ZuID09PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnc2tpcFdoaWxlJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdza2lwV2hpbGUnLCBtaXhpbik7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2tpcFdoaWxlKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGlkIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlMi5OT1RISU5HO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgICAgdGhpcy5fcHJldiA9IE5PVEhJTkc7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICAgIHRoaXMuX3ByZXYgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIGlmICh0aGlzLl9wcmV2ID09PSBOT1RISU5HIHx8ICFmbih0aGlzLl9wcmV2LCB4KSkge1xuXHQgICAgICB0aGlzLl9wcmV2ID0geDtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdza2lwRHVwbGljYXRlcycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnc2tpcER1cGxpY2F0ZXMnLCBtaXhpbik7XG5cblx0dmFyIGVxID0gZnVuY3Rpb24gZXEoYSwgYikge1xuXHQgIHJldHVybiBhID09PSBiO1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2tpcER1cGxpY2F0ZXMob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gZXEgOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUyLk5PVEhJTkc7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cdCAgICB2YXIgc2VlZCA9IF9yZWYuc2VlZDtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICAgIHRoaXMuX3ByZXYgPSBzZWVkO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9wcmV2ID0gbnVsbDtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX3ByZXYgIT09IE5PVEhJTkcpIHtcblx0ICAgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZShmbih0aGlzLl9wcmV2LCB4KSk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9wcmV2ID0geDtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZGlmZicsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnZGlmZicsIG1peGluKTtcblxuXHRmdW5jdGlvbiBkZWZhdWx0Rm4oYSwgYikge1xuXHQgIHJldHVybiBbYSwgYl07XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpZmYob2JzLCBmbikge1xuXHQgIHZhciBzZWVkID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gTk9USElORyA6IGFyZ3VtZW50c1syXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB8fCBkZWZhdWx0Rm4sIHNlZWQ6IHNlZWQgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlMi5FUlJPUjtcblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZTIuTk9USElORztcblxuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdzY2FuJywge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cdCAgICB2YXIgc2VlZCA9IF9yZWYuc2VlZDtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICAgIHRoaXMuX3NlZWQgPSBzZWVkO1xuXHQgICAgaWYgKHNlZWQgIT09IE5PVEhJTkcpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHNlZWQpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgICB0aGlzLl9zZWVkID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICBpZiAodGhpcy5fY3VycmVudEV2ZW50ID09PSBudWxsIHx8IHRoaXMuX2N1cnJlbnRFdmVudC50eXBlID09PSBFUlJPUikge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fc2VlZCA9PT0gTk9USElORyA/IHggOiBmbih0aGlzLl9zZWVkLCB4KSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoZm4odGhpcy5fY3VycmVudEV2ZW50LnZhbHVlLCB4KSk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2NhbihvYnMsIGZuKSB7XG5cdCAgdmFyIHNlZWQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBOT1RISU5HIDogYXJndW1lbnRzWzJdO1xuXG5cdCAgcmV0dXJuIG5ldyBQKG9icywgeyBmbjogZm4sIHNlZWQ6IHNlZWQgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0MyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICB2YXIgeHMgPSBmbih4KTtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHhzW2ldKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZmxhdHRlbicsIG1peGluKTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmbGF0dGVuKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGlkIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyBTKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBFTkRfTUFSS0VSID0ge307XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICAgIHZhciB3YWl0ID0gX3JlZi53YWl0O1xuXG5cdCAgICB0aGlzLl93YWl0ID0gTWF0aC5tYXgoMCwgd2FpdCk7XG5cdCAgICB0aGlzLl9idWZmID0gW107XG5cdCAgICB0aGlzLl8kc2hpZnRCdWZmID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICB2YXIgdmFsdWUgPSBfdGhpcy5fYnVmZi5zaGlmdCgpO1xuXHQgICAgICBpZiAodmFsdWUgPT09IEVORF9NQVJLRVIpIHtcblx0ICAgICAgICBfdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIF90aGlzLl9lbWl0VmFsdWUodmFsdWUpO1xuXHQgICAgICB9XG5cdCAgICB9O1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9idWZmID0gbnVsbDtcblx0ICAgIHRoaXMuXyRzaGlmdEJ1ZmYgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9idWZmLnB1c2goeCk7XG5cdCAgICAgIHNldFRpbWVvdXQodGhpcy5fJHNoaWZ0QnVmZiwgdGhpcy5fd2FpdCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9idWZmLnB1c2goRU5EX01BUktFUik7XG5cdCAgICAgIHNldFRpbWVvdXQodGhpcy5fJHNoaWZ0QnVmZiwgdGhpcy5fd2FpdCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2RlbGF5JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdkZWxheScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlbGF5KG9icywgd2FpdCkge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IHdhaXQ6IHdhaXQgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0NSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBub3cgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgICAgdmFyIHdhaXQgPSBfcmVmLndhaXQ7XG5cdCAgICB2YXIgbGVhZGluZyA9IF9yZWYubGVhZGluZztcblx0ICAgIHZhciB0cmFpbGluZyA9IF9yZWYudHJhaWxpbmc7XG5cblx0ICAgIHRoaXMuX3dhaXQgPSBNYXRoLm1heCgwLCB3YWl0KTtcblx0ICAgIHRoaXMuX2xlYWRpbmcgPSBsZWFkaW5nO1xuXHQgICAgdGhpcy5fdHJhaWxpbmcgPSB0cmFpbGluZztcblx0ICAgIHRoaXMuX3RyYWlsaW5nVmFsdWUgPSBudWxsO1xuXHQgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcblx0ICAgIHRoaXMuX2VuZExhdGVyID0gZmFsc2U7XG5cdCAgICB0aGlzLl9sYXN0Q2FsbFRpbWUgPSAwO1xuXHQgICAgdGhpcy5fJHRyYWlsaW5nQ2FsbCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl90cmFpbGluZ0NhbGwoKTtcblx0ICAgIH07XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX3RyYWlsaW5nVmFsdWUgPSBudWxsO1xuXHQgICAgdGhpcy5fJHRyYWlsaW5nQ2FsbCA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHZhciBjdXJUaW1lID0gbm93KCk7XG5cdCAgICAgIGlmICh0aGlzLl9sYXN0Q2FsbFRpbWUgPT09IDAgJiYgIXRoaXMuX2xlYWRpbmcpIHtcblx0ICAgICAgICB0aGlzLl9sYXN0Q2FsbFRpbWUgPSBjdXJUaW1lO1xuXHQgICAgICB9XG5cdCAgICAgIHZhciByZW1haW5pbmcgPSB0aGlzLl93YWl0IC0gKGN1clRpbWUgLSB0aGlzLl9sYXN0Q2FsbFRpbWUpO1xuXHQgICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcblx0ICAgICAgICB0aGlzLl9jYW5jZWxUcmFpbGluZygpO1xuXHQgICAgICAgIHRoaXMuX2xhc3RDYWxsVGltZSA9IGN1clRpbWU7XG5cdCAgICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgICB9IGVsc2UgaWYgKHRoaXMuX3RyYWlsaW5nKSB7XG5cdCAgICAgICAgdGhpcy5fY2FuY2VsVHJhaWxpbmcoKTtcblx0ICAgICAgICB0aGlzLl90cmFpbGluZ1ZhbHVlID0geDtcblx0ICAgICAgICB0aGlzLl90aW1lb3V0SWQgPSBzZXRUaW1lb3V0KHRoaXMuXyR0cmFpbGluZ0NhbGwsIHJlbWFpbmluZyk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlmICh0aGlzLl90aW1lb3V0SWQpIHtcblx0ICAgICAgICB0aGlzLl9lbmRMYXRlciA9IHRydWU7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9jYW5jZWxUcmFpbGluZzogZnVuY3Rpb24gX2NhbmNlbFRyYWlsaW5nKCkge1xuXHQgICAgaWYgKHRoaXMuX3RpbWVvdXRJZCAhPT0gbnVsbCkge1xuXHQgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dElkKTtcblx0ICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX3RyYWlsaW5nQ2FsbDogZnVuY3Rpb24gX3RyYWlsaW5nQ2FsbCgpIHtcblx0ICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl90cmFpbGluZ1ZhbHVlKTtcblx0ICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG5cdCAgICB0aGlzLl90cmFpbGluZ1ZhbHVlID0gbnVsbDtcblx0ICAgIHRoaXMuX2xhc3RDYWxsVGltZSA9ICF0aGlzLl9sZWFkaW5nID8gMCA6IG5vdygpO1xuXHQgICAgaWYgKHRoaXMuX2VuZExhdGVyKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgndGhyb3R0bGUnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3Rocm90dGxlJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGhyb3R0bGUob2JzLCB3YWl0KSB7XG5cdCAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cblx0ICB2YXIgX3JlZjIkbGVhZGluZyA9IF9yZWYyLmxlYWRpbmc7XG5cdCAgdmFyIGxlYWRpbmcgPSBfcmVmMiRsZWFkaW5nID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZjIkbGVhZGluZztcblx0ICB2YXIgX3JlZjIkdHJhaWxpbmcgPSBfcmVmMi50cmFpbGluZztcblx0ICB2YXIgdHJhaWxpbmcgPSBfcmVmMiR0cmFpbGluZyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJHRyYWlsaW5nO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgd2FpdDogd2FpdCwgbGVhZGluZzogbGVhZGluZywgdHJhaWxpbmc6IHRyYWlsaW5nIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gRGF0ZS5ub3cgPyBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIERhdGUubm93KCk7XG5cdH0gOiBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbm93ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0Nik7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICAgIHZhciB3YWl0ID0gX3JlZi53YWl0O1xuXHQgICAgdmFyIGltbWVkaWF0ZSA9IF9yZWYuaW1tZWRpYXRlO1xuXG5cdCAgICB0aGlzLl93YWl0ID0gTWF0aC5tYXgoMCwgd2FpdCk7XG5cdCAgICB0aGlzLl9pbW1lZGlhdGUgPSBpbW1lZGlhdGU7XG5cdCAgICB0aGlzLl9sYXN0QXR0ZW1wdCA9IDA7XG5cdCAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuXHQgICAgdGhpcy5fbGF0ZXJWYWx1ZSA9IG51bGw7XG5cdCAgICB0aGlzLl9lbmRMYXRlciA9IGZhbHNlO1xuXHQgICAgdGhpcy5fJGxhdGVyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX2xhdGVyKCk7XG5cdCAgICB9O1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9sYXRlclZhbHVlID0gbnVsbDtcblx0ICAgIHRoaXMuXyRsYXRlciA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2xhc3RBdHRlbXB0ID0gbm93KCk7XG5cdCAgICAgIGlmICh0aGlzLl9pbW1lZGlhdGUgJiYgIXRoaXMuX3RpbWVvdXRJZCkge1xuXHQgICAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgICAgfVxuXHQgICAgICBpZiAoIXRoaXMuX3RpbWVvdXRJZCkge1xuXHQgICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IHNldFRpbWVvdXQodGhpcy5fJGxhdGVyLCB0aGlzLl93YWl0KTtcblx0ICAgICAgfVxuXHQgICAgICBpZiAoIXRoaXMuX2ltbWVkaWF0ZSkge1xuXHQgICAgICAgIHRoaXMuX2xhdGVyVmFsdWUgPSB4O1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpZiAodGhpcy5fdGltZW91dElkICYmICF0aGlzLl9pbW1lZGlhdGUpIHtcblx0ICAgICAgICB0aGlzLl9lbmRMYXRlciA9IHRydWU7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9sYXRlcjogZnVuY3Rpb24gX2xhdGVyKCkge1xuXHQgICAgdmFyIGxhc3QgPSBub3coKSAtIHRoaXMuX2xhc3RBdHRlbXB0O1xuXHQgICAgaWYgKGxhc3QgPCB0aGlzLl93YWl0ICYmIGxhc3QgPj0gMCkge1xuXHQgICAgICB0aGlzLl90aW1lb3V0SWQgPSBzZXRUaW1lb3V0KHRoaXMuXyRsYXRlciwgdGhpcy5fd2FpdCAtIGxhc3QpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcblx0ICAgICAgaWYgKCF0aGlzLl9pbW1lZGlhdGUpIHtcblx0ICAgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fbGF0ZXJWYWx1ZSk7XG5cdCAgICAgICAgdGhpcy5fbGF0ZXJWYWx1ZSA9IG51bGw7XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKHRoaXMuX2VuZExhdGVyKSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2RlYm91bmNlJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdkZWJvdW5jZScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlYm91bmNlKG9icywgd2FpdCkge1xuXHQgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzJdO1xuXG5cdCAgdmFyIF9yZWYyJGltbWVkaWF0ZSA9IF9yZWYyLmltbWVkaWF0ZTtcblx0ICB2YXIgaW1tZWRpYXRlID0gX3JlZjIkaW1tZWRpYXRlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYyJGltbWVkaWF0ZTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IHdhaXQ6IHdhaXQsIGltbWVkaWF0ZTogaW1tZWRpYXRlIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVFcnJvcih4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIHRoaXMuX2VtaXRFcnJvcihmbih4KSk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ21hcEVycm9ycycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnbWFwRXJyb3JzJywgbWl4aW4pO1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1hcEVycm9ycyhvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBpZCA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQ5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlRXJyb3IoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICBpZiAoZm4oeCkpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdmaWx0ZXJFcnJvcnMnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2ZpbHRlckVycm9ycycsIG1peGluKTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWx0ZXJFcnJvcnMob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gaWQgOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSgpIHt9XG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2lnbm9yZVZhbHVlcycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnaWdub3JlVmFsdWVzJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWdub3JlVmFsdWVzKG9icykge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDUxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXHQgIF9oYW5kbGVFcnJvcjogZnVuY3Rpb24gX2hhbmRsZUVycm9yKCkge31cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnaWdub3JlRXJyb3JzJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdpZ25vcmVFcnJvcnMnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZ25vcmVFcnJvcnMob2JzKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHt9XG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2lnbm9yZUVuZCcsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnaWdub3JlRW5kJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaWdub3JlRW5kKG9icykge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDUzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgdGhpcy5fZW1pdFZhbHVlKGZuKCkpO1xuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdiZWZvcmVFbmQnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2JlZm9yZUVuZCcsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJlZm9yZUVuZChvYnMsIGZuKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgc2xpZGUgPSBfcmVxdWlyZTIuc2xpZGU7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBtaW4gPSBfcmVmLm1pbjtcblx0ICAgIHZhciBtYXggPSBfcmVmLm1heDtcblxuXHQgICAgdGhpcy5fbWF4ID0gbWF4O1xuXHQgICAgdGhpcy5fbWluID0gbWluO1xuXHQgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9idWZmID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdGhpcy5fYnVmZiA9IHNsaWRlKHRoaXMuX2J1ZmYsIHgsIHRoaXMuX21heCk7XG5cdCAgICBpZiAodGhpcy5fYnVmZi5sZW5ndGggPj0gdGhpcy5fbWluKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9idWZmKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnc2xpZGluZ1dpbmRvdycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnc2xpZGluZ1dpbmRvdycsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNsaWRpbmdXaW5kb3cob2JzLCBtYXgpIHtcblx0ICB2YXIgbWluID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8gMCA6IGFyZ3VtZW50c1syXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IG1pbjogbWluLCBtYXg6IG1heCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDU1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cdCAgICB2YXIgZmx1c2hPbkVuZCA9IF9yZWYuZmx1c2hPbkVuZDtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICAgIHRoaXMuX2ZsdXNoT25FbmQgPSBmbHVzaE9uRW5kO1xuXHQgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9idWZmID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2ZsdXNoOiBmdW5jdGlvbiBfZmx1c2goKSB7XG5cdCAgICBpZiAodGhpcy5fYnVmZiAhPT0gbnVsbCAmJiB0aGlzLl9idWZmLmxlbmd0aCAhPT0gMCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fYnVmZik7XG5cdCAgICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdGhpcy5fYnVmZi5wdXNoKHgpO1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICBpZiAoIWZuKHgpKSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fZmx1c2hPbkVuZCkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdidWZmZXJXaGlsZScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnYnVmZmVyV2hpbGUnLCBtaXhpbik7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVmZmVyV2hpbGUob2JzLCBmbikge1xuXHQgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzJdO1xuXG5cdCAgdmFyIF9yZWYyJGZsdXNoT25FbmQgPSBfcmVmMi5mbHVzaE9uRW5kO1xuXHQgIHZhciBmbHVzaE9uRW5kID0gX3JlZjIkZmx1c2hPbkVuZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJGZsdXNoT25FbmQ7XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfHwgaWQsIGZsdXNoT25FbmQ6IGZsdXNoT25FbmQgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgY291bnQgPSBfcmVmLmNvdW50O1xuXHQgICAgdmFyIGZsdXNoT25FbmQgPSBfcmVmLmZsdXNoT25FbmQ7XG5cblx0ICAgIHRoaXMuX2NvdW50ID0gY291bnQ7XG5cdCAgICB0aGlzLl9mbHVzaE9uRW5kID0gZmx1c2hPbkVuZDtcblx0ICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fYnVmZiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9mbHVzaDogZnVuY3Rpb24gX2ZsdXNoKCkge1xuXHQgICAgaWYgKHRoaXMuX2J1ZmYgIT09IG51bGwgJiYgdGhpcy5fYnVmZi5sZW5ndGggIT09IDApIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX2J1ZmYpO1xuXHQgICAgICB0aGlzLl9idWZmID0gW107XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHRoaXMuX2J1ZmYucHVzaCh4KTtcblx0ICAgIGlmICh0aGlzLl9idWZmLmxlbmd0aCA+PSB0aGlzLl9jb3VudCkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2ZsdXNoT25FbmQpIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnYnVmZmVyV2l0aENvdW50JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdidWZmZXJXaXRoQ291bnQnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWZmZXJXaGlsZShvYnMsIGNvdW50KSB7XG5cdCAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cblx0ICB2YXIgX3JlZjIkZmx1c2hPbkVuZCA9IF9yZWYyLmZsdXNoT25FbmQ7XG5cdCAgdmFyIGZsdXNoT25FbmQgPSBfcmVmMiRmbHVzaE9uRW5kID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZjIkZmx1c2hPbkVuZDtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGNvdW50OiBjb3VudCwgZmx1c2hPbkVuZDogZmx1c2hPbkVuZCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDU3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICAgIHZhciB3YWl0ID0gX3JlZi53YWl0O1xuXHQgICAgdmFyIGNvdW50ID0gX3JlZi5jb3VudDtcblx0ICAgIHZhciBmbHVzaE9uRW5kID0gX3JlZi5mbHVzaE9uRW5kO1xuXG5cdCAgICB0aGlzLl93YWl0ID0gd2FpdDtcblx0ICAgIHRoaXMuX2NvdW50ID0gY291bnQ7XG5cdCAgICB0aGlzLl9mbHVzaE9uRW5kID0gZmx1c2hPbkVuZDtcblx0ICAgIHRoaXMuX2ludGVydmFsSWQgPSBudWxsO1xuXHQgICAgdGhpcy5fJG9uVGljayA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9mbHVzaCgpO1xuXHQgICAgfTtcblx0ICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fJG9uVGljayA9IG51bGw7XG5cdCAgICB0aGlzLl9idWZmID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2ZsdXNoOiBmdW5jdGlvbiBfZmx1c2goKSB7XG5cdCAgICBpZiAodGhpcy5fYnVmZiAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fYnVmZik7XG5cdCAgICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdGhpcy5fYnVmZi5wdXNoKHgpO1xuXHQgICAgaWYgKHRoaXMuX2J1ZmYubGVuZ3RoID49IHRoaXMuX2NvdW50KSB7XG5cdCAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxJZCk7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICAgIHRoaXMuX2ludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGlzLl8kb25UaWNrLCB0aGlzLl93YWl0KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9mbHVzaE9uRW5kICYmIHRoaXMuX2J1ZmYubGVuZ3RoICE9PSAwKSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfSxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICB0aGlzLl9zb3VyY2Uub25BbnkodGhpcy5fJGhhbmRsZUFueSk7IC8vIGNvcGllZCBmcm9tIHBhdHRlcm5zL29uZS1zb3VyY2Vcblx0ICAgIHRoaXMuX2ludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGlzLl8kb25UaWNrLCB0aGlzLl93YWl0KTtcblx0ICB9LFxuXG5cdCAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCAhPT0gbnVsbCkge1xuXHQgICAgICBjbGVhckludGVydmFsKHRoaXMuX2ludGVydmFsSWQpO1xuXHQgICAgICB0aGlzLl9pbnRlcnZhbElkID0gbnVsbDtcblx0ICAgIH1cblx0ICAgIHRoaXMuX3NvdXJjZS5vZmZBbnkodGhpcy5fJGhhbmRsZUFueSk7IC8vIGNvcGllZCBmcm9tIHBhdHRlcm5zL29uZS1zb3VyY2Vcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnYnVmZmVyV2l0aFRpbWVPckNvdW50JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdidWZmZXJXaXRoVGltZU9yQ291bnQnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWZmZXJXaXRoVGltZU9yQ291bnQob2JzLCB3YWl0LCBjb3VudCkge1xuXHQgIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMyB8fCBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzNdO1xuXG5cdCAgdmFyIF9yZWYyJGZsdXNoT25FbmQgPSBfcmVmMi5mbHVzaE9uRW5kO1xuXHQgIHZhciBmbHVzaE9uRW5kID0gX3JlZjIkZmx1c2hPbkVuZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYyJGZsdXNoT25FbmQ7XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyB3YWl0OiB3YWl0LCBjb3VudDogY291bnQsIGZsdXNoT25FbmQ6IGZsdXNoT25FbmQgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1OCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIHhmb3JtRm9yT2JzKG9icykge1xuXHQgIHJldHVybiB7XG5cblx0ICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIHRyYW5zZHVjZXJTdGVwKHJlcywgaW5wdXQpIHtcblx0ICAgICAgb2JzLl9lbWl0VmFsdWUoaW5wdXQpO1xuXHQgICAgICByZXR1cm4gbnVsbDtcblx0ICAgIH0sXG5cblx0ICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24gdHJhbnNkdWNlclJlc3VsdCgpIHtcblx0ICAgICAgb2JzLl9lbWl0RW5kKCk7XG5cdCAgICAgIHJldHVybiBudWxsO1xuXHQgICAgfVxuXG5cdCAgfTtcblx0fVxuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgdHJhbnNkdWNlciA9IF9yZWYudHJhbnNkdWNlcjtcblxuXHQgICAgdGhpcy5feGZvcm0gPSB0cmFuc2R1Y2VyKHhmb3JtRm9yT2JzKHRoaXMpKTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5feGZvcm0gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5feGZvcm1bJ0BAdHJhbnNkdWNlci9zdGVwJ10obnVsbCwgeCkgIT09IG51bGwpIHtcblx0ICAgICAgdGhpcy5feGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShudWxsKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIHRoaXMuX3hmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10obnVsbCk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3RyYW5zZHVjZScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgndHJhbnNkdWNlJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNkdWNlKG9icywgdHJhbnNkdWNlcikge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IHRyYW5zZHVjZXI6IHRyYW5zZHVjZXIgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1OSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBlbWl0dGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2hhbmRsZXIgPSBmbjtcblx0ICAgIHRoaXMuX2VtaXR0ZXIgPSBlbWl0dGVyKHRoaXMpO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9oYW5kbGVyID0gbnVsbDtcblx0ICAgIHRoaXMuX2VtaXR0ZXIgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlQW55OiBmdW5jdGlvbiBfaGFuZGxlQW55KGV2ZW50KSB7XG5cdCAgICB0aGlzLl9oYW5kbGVyKHRoaXMuX2VtaXR0ZXIsIGV2ZW50KTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnd2l0aEhhbmRsZXInLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3dpdGhIYW5kbGVyJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2l0aEhhbmRsZXIob2JzLCBmbikge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDYwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZS5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUuRVJST1I7XG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUuTk9USElORztcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlMi5pbmhlcml0O1xuXG5cdHZhciBfcmVxdWlyZTMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdHZhciBjb25jYXQgPSBfcmVxdWlyZTMuY29uY2F0O1xuXHR2YXIgZmlsbEFycmF5ID0gX3JlcXVpcmUzLmZpbGxBcnJheTtcblxuXHR2YXIgX3JlcXVpcmU0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XG5cblx0dmFyIHNwcmVhZCA9IF9yZXF1aXJlNC5zcHJlYWQ7XG5cblx0dmFyIG5ldmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblxuXHRmdW5jdGlvbiBkZWZhdWx0RXJyb3JzQ29tYmluYXRvcihlcnJvcnMpIHtcblx0ICB2YXIgbGF0ZXN0RXJyb3IgPSB1bmRlZmluZWQ7XG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCBlcnJvcnMubGVuZ3RoOyBpKyspIHtcblx0ICAgIGlmIChlcnJvcnNbaV0gIT09IHVuZGVmaW5lZCkge1xuXHQgICAgICBpZiAobGF0ZXN0RXJyb3IgPT09IHVuZGVmaW5lZCB8fCBsYXRlc3RFcnJvci5pbmRleCA8IGVycm9yc1tpXS5pbmRleCkge1xuXHQgICAgICAgIGxhdGVzdEVycm9yID0gZXJyb3JzW2ldO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiBsYXRlc3RFcnJvci5lcnJvcjtcblx0fVxuXG5cdGZ1bmN0aW9uIENvbWJpbmUoYWN0aXZlLCBwYXNzaXZlLCBjb21iaW5hdG9yKSB7XG5cdCAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXHQgIHRoaXMuX2FjdGl2ZUNvdW50ID0gYWN0aXZlLmxlbmd0aDtcblx0ICB0aGlzLl9zb3VyY2VzID0gY29uY2F0KGFjdGl2ZSwgcGFzc2l2ZSk7XG5cdCAgdGhpcy5fY29tYmluYXRvciA9IGNvbWJpbmF0b3IgPyBzcHJlYWQoY29tYmluYXRvciwgdGhpcy5fc291cmNlcy5sZW5ndGgpIDogZnVuY3Rpb24gKHgpIHtcblx0ICAgIHJldHVybiB4O1xuXHQgIH07XG5cdCAgdGhpcy5fYWxpdmVDb3VudCA9IDA7XG5cdCAgdGhpcy5fbGF0ZXN0VmFsdWVzID0gbmV3IEFycmF5KHRoaXMuX3NvdXJjZXMubGVuZ3RoKTtcblx0ICB0aGlzLl9sYXRlc3RFcnJvcnMgPSBuZXcgQXJyYXkodGhpcy5fc291cmNlcy5sZW5ndGgpO1xuXHQgIGZpbGxBcnJheSh0aGlzLl9sYXRlc3RWYWx1ZXMsIE5PVEhJTkcpO1xuXHQgIHRoaXMuX2VtaXRBZnRlckFjdGl2YXRpb24gPSBmYWxzZTtcblx0ICB0aGlzLl9lbmRBZnRlckFjdGl2YXRpb24gPSBmYWxzZTtcblx0ICB0aGlzLl9sYXRlc3RFcnJvckluZGV4ID0gMDtcblxuXHQgIHRoaXMuXyRoYW5kbGVycyA9IFtdO1xuXG5cdCAgdmFyIF9sb29wID0gZnVuY3Rpb24gKGkpIHtcblx0ICAgIF90aGlzLl8kaGFuZGxlcnMucHVzaChmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9oYW5kbGVBbnkoaSwgZXZlbnQpO1xuXHQgICAgfSk7XG5cdCAgfTtcblxuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc291cmNlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgX2xvb3AoaSk7XG5cdCAgfVxuXHR9XG5cblx0aW5oZXJpdChDb21iaW5lLCBTdHJlYW0sIHtcblxuXHQgIF9uYW1lOiAnY29tYmluZScsXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgdGhpcy5fYWxpdmVDb3VudCA9IHRoaXMuX2FjdGl2ZUNvdW50O1xuXG5cdCAgICAvLyB3ZSBuZWVkIHRvIHN1c2NyaWJlIHRvIF9wYXNzaXZlXyBzb3VyY2VzIGJlZm9yZSBfYWN0aXZlX1xuXHQgICAgLy8gKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcnBvbWlub3Yva2VmaXIvaXNzdWVzLzk4KVxuXHQgICAgZm9yICh2YXIgaSA9IHRoaXMuX2FjdGl2ZUNvdW50OyBpIDwgdGhpcy5fc291cmNlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICB0aGlzLl9zb3VyY2VzW2ldLm9uQW55KHRoaXMuXyRoYW5kbGVyc1tpXSk7XG5cdCAgICB9XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2FjdGl2ZUNvdW50OyBpKyspIHtcblx0ICAgICAgdGhpcy5fc291cmNlc1tpXS5vbkFueSh0aGlzLl8kaGFuZGxlcnNbaV0pO1xuXHQgICAgfVxuXG5cdCAgICBpZiAodGhpcy5fZW1pdEFmdGVyQWN0aXZhdGlvbikge1xuXHQgICAgICB0aGlzLl9lbWl0QWZ0ZXJBY3RpdmF0aW9uID0gZmFsc2U7XG5cdCAgICAgIHRoaXMuX2VtaXRJZkZ1bGwoKTtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLl9lbmRBZnRlckFjdGl2YXRpb24pIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgIHZhciBsZW5ndGggPSB0aGlzLl9zb3VyY2VzLmxlbmd0aCxcblx0ICAgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZXNbaV0ub2ZmQW55KHRoaXMuXyRoYW5kbGVyc1tpXSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9lbWl0SWZGdWxsOiBmdW5jdGlvbiBfZW1pdElmRnVsbCgpIHtcblx0ICAgIHZhciBoYXNBbGxWYWx1ZXMgPSB0cnVlO1xuXHQgICAgdmFyIGhhc0Vycm9ycyA9IGZhbHNlO1xuXHQgICAgdmFyIGxlbmd0aCA9IHRoaXMuX2xhdGVzdFZhbHVlcy5sZW5ndGg7XG5cdCAgICB2YXIgdmFsdWVzQ29weSA9IG5ldyBBcnJheShsZW5ndGgpO1xuXHQgICAgdmFyIGVycm9yc0NvcHkgPSBuZXcgQXJyYXkobGVuZ3RoKTtcblxuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgICB2YWx1ZXNDb3B5W2ldID0gdGhpcy5fbGF0ZXN0VmFsdWVzW2ldO1xuXHQgICAgICBlcnJvcnNDb3B5W2ldID0gdGhpcy5fbGF0ZXN0RXJyb3JzW2ldO1xuXG5cdCAgICAgIGlmICh2YWx1ZXNDb3B5W2ldID09PSBOT1RISU5HKSB7XG5cdCAgICAgICAgaGFzQWxsVmFsdWVzID0gZmFsc2U7XG5cdCAgICAgIH1cblxuXHQgICAgICBpZiAoZXJyb3JzQ29weVtpXSAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgaGFzRXJyb3JzID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgfVxuXG5cdCAgICBpZiAoaGFzQWxsVmFsdWVzKSB7XG5cdCAgICAgIHZhciBjb21iaW5hdG9yID0gdGhpcy5fY29tYmluYXRvcjtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKGNvbWJpbmF0b3IodmFsdWVzQ29weSkpO1xuXHQgICAgfVxuXHQgICAgaWYgKGhhc0Vycm9ycykge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoZGVmYXVsdEVycm9yc0NvbWJpbmF0b3IoZXJyb3JzQ29weSkpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlQW55OiBmdW5jdGlvbiBfaGFuZGxlQW55KGksIGV2ZW50KSB7XG5cblx0ICAgIGlmIChldmVudC50eXBlID09PSBWQUxVRSB8fCBldmVudC50eXBlID09PSBFUlJPUikge1xuXG5cdCAgICAgIGlmIChldmVudC50eXBlID09PSBWQUxVRSkge1xuXHQgICAgICAgIHRoaXMuX2xhdGVzdFZhbHVlc1tpXSA9IGV2ZW50LnZhbHVlO1xuXHQgICAgICAgIHRoaXMuX2xhdGVzdEVycm9yc1tpXSA9IHVuZGVmaW5lZDtcblx0ICAgICAgfVxuXHQgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gRVJST1IpIHtcblx0ICAgICAgICB0aGlzLl9sYXRlc3RWYWx1ZXNbaV0gPSBOT1RISU5HO1xuXHQgICAgICAgIHRoaXMuX2xhdGVzdEVycm9yc1tpXSA9IHtcblx0ICAgICAgICAgIGluZGV4OiB0aGlzLl9sYXRlc3RFcnJvckluZGV4KyssXG5cdCAgICAgICAgICBlcnJvcjogZXZlbnQudmFsdWVcblx0ICAgICAgICB9O1xuXHQgICAgICB9XG5cblx0ICAgICAgaWYgKGkgPCB0aGlzLl9hY3RpdmVDb3VudCkge1xuXHQgICAgICAgIGlmICh0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgICAgICB0aGlzLl9lbWl0QWZ0ZXJBY3RpdmF0aW9uID0gdHJ1ZTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgdGhpcy5fZW1pdElmRnVsbCgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gRU5EXG5cblx0ICAgICAgaWYgKGkgPCB0aGlzLl9hY3RpdmVDb3VudCkge1xuXHQgICAgICAgIHRoaXMuX2FsaXZlQ291bnQtLTtcblx0ICAgICAgICBpZiAodGhpcy5fYWxpdmVDb3VudCA9PT0gMCkge1xuXHQgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgICAgICAgdGhpcy5fZW5kQWZ0ZXJBY3RpdmF0aW9uID0gdHJ1ZTtcblx0ICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICBTdHJlYW0ucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fc291cmNlcyA9IG51bGw7XG5cdCAgICB0aGlzLl9sYXRlc3RWYWx1ZXMgPSBudWxsO1xuXHQgICAgdGhpcy5fbGF0ZXN0RXJyb3JzID0gbnVsbDtcblx0ICAgIHRoaXMuX2NvbWJpbmF0b3IgPSBudWxsO1xuXHQgICAgdGhpcy5fJGhhbmRsZXJzID0gbnVsbDtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lKGFjdGl2ZSwgcGFzc2l2ZSwgY29tYmluYXRvcikge1xuXHQgIGlmIChwYXNzaXZlID09PSB1bmRlZmluZWQpIHBhc3NpdmUgPSBbXTtcblxuXHQgIGlmICh0eXBlb2YgcGFzc2l2ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgY29tYmluYXRvciA9IHBhc3NpdmU7XG5cdCAgICBwYXNzaXZlID0gW107XG5cdCAgfVxuXHQgIHJldHVybiBhY3RpdmUubGVuZ3RoID09PSAwID8gbmV2ZXIoKSA6IG5ldyBDb21iaW5lKGFjdGl2ZSwgcGFzc2l2ZSwgY29tYmluYXRvcik7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA2MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlLkVSUk9SO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUuRU5EO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUyLmluaGVyaXQ7XG5cblx0dmFyIF9yZXF1aXJlMyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIG1hcCA9IF9yZXF1aXJlMy5tYXA7XG5cdHZhciBjbG9uZUFycmF5ID0gX3JlcXVpcmUzLmNsb25lQXJyYXk7XG5cblx0dmFyIF9yZXF1aXJlNCA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXG5cdHZhciBzcHJlYWQgPSBfcmVxdWlyZTQuc3ByZWFkO1xuXG5cdHZhciBuZXZlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cblx0dmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuXHQgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIFppcChzb3VyY2VzLCBjb21iaW5hdG9yKSB7XG5cdCAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXG5cdCAgdGhpcy5fYnVmZmVycyA9IG1hcChzb3VyY2VzLCBmdW5jdGlvbiAoc291cmNlKSB7XG5cdCAgICByZXR1cm4gaXNBcnJheShzb3VyY2UpID8gY2xvbmVBcnJheShzb3VyY2UpIDogW107XG5cdCAgfSk7XG5cdCAgdGhpcy5fc291cmNlcyA9IG1hcChzb3VyY2VzLCBmdW5jdGlvbiAoc291cmNlKSB7XG5cdCAgICByZXR1cm4gaXNBcnJheShzb3VyY2UpID8gbmV2ZXIoKSA6IHNvdXJjZTtcblx0ICB9KTtcblxuXHQgIHRoaXMuX2NvbWJpbmF0b3IgPSBjb21iaW5hdG9yID8gc3ByZWFkKGNvbWJpbmF0b3IsIHRoaXMuX3NvdXJjZXMubGVuZ3RoKSA6IGZ1bmN0aW9uICh4KSB7XG5cdCAgICByZXR1cm4geDtcblx0ICB9O1xuXHQgIHRoaXMuX2FsaXZlQ291bnQgPSAwO1xuXG5cdCAgdGhpcy5fJGhhbmRsZXJzID0gW107XG5cblx0ICB2YXIgX2xvb3AgPSBmdW5jdGlvbiAoaSkge1xuXHQgICAgX3RoaXMuXyRoYW5kbGVycy5wdXNoKGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX2hhbmRsZUFueShpLCBldmVudCk7XG5cdCAgICB9KTtcblx0ICB9O1xuXG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICBfbG9vcChpKTtcblx0ICB9XG5cdH1cblxuXHRpbmhlcml0KFppcCwgU3RyZWFtLCB7XG5cblx0ICBfbmFtZTogJ3ppcCcsXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXG5cdCAgICAvLyBpZiBhbGwgc291cmNlcyBhcmUgYXJyYXlzXG5cdCAgICB3aGlsZSAodGhpcy5faXNGdWxsKCkpIHtcblx0ICAgICAgdGhpcy5fZW1pdCgpO1xuXHQgICAgfVxuXG5cdCAgICB2YXIgbGVuZ3RoID0gdGhpcy5fc291cmNlcy5sZW5ndGg7XG5cdCAgICB0aGlzLl9hbGl2ZUNvdW50ID0gbGVuZ3RoO1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGggJiYgdGhpcy5fYWN0aXZlOyBpKyspIHtcblx0ICAgICAgdGhpcy5fc291cmNlc1tpXS5vbkFueSh0aGlzLl8kaGFuZGxlcnNbaV0pO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fc291cmNlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICB0aGlzLl9zb3VyY2VzW2ldLm9mZkFueSh0aGlzLl8kaGFuZGxlcnNbaV0pO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZW1pdDogZnVuY3Rpb24gX2VtaXQoKSB7XG5cdCAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KHRoaXMuX2J1ZmZlcnMubGVuZ3RoKTtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYnVmZmVycy5sZW5ndGg7IGkrKykge1xuXHQgICAgICB2YWx1ZXNbaV0gPSB0aGlzLl9idWZmZXJzW2ldLnNoaWZ0KCk7XG5cdCAgICB9XG5cdCAgICB2YXIgY29tYmluYXRvciA9IHRoaXMuX2NvbWJpbmF0b3I7XG5cdCAgICB0aGlzLl9lbWl0VmFsdWUoY29tYmluYXRvcih2YWx1ZXMpKTtcblx0ICB9LFxuXG5cdCAgX2lzRnVsbDogZnVuY3Rpb24gX2lzRnVsbCgpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYnVmZmVycy5sZW5ndGg7IGkrKykge1xuXHQgICAgICBpZiAodGhpcy5fYnVmZmVyc1tpXS5sZW5ndGggPT09IDApIHtcblx0ICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiB0cnVlO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlQW55OiBmdW5jdGlvbiBfaGFuZGxlQW55KGksIGV2ZW50KSB7XG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gVkFMVUUpIHtcblx0ICAgICAgdGhpcy5fYnVmZmVyc1tpXS5wdXNoKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgaWYgKHRoaXMuX2lzRnVsbCgpKSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdCgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gRVJST1IpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKGV2ZW50LnZhbHVlKTtcblx0ICAgIH1cblx0ICAgIGlmIChldmVudC50eXBlID09PSBFTkQpIHtcblx0ICAgICAgdGhpcy5fYWxpdmVDb3VudC0tO1xuXHQgICAgICBpZiAodGhpcy5fYWxpdmVDb3VudCA9PT0gMCkge1xuXHQgICAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgIFN0cmVhbS5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9zb3VyY2VzID0gbnVsbDtcblx0ICAgIHRoaXMuX2J1ZmZlcnMgPSBudWxsO1xuXHQgICAgdGhpcy5fY29tYmluYXRvciA9IG51bGw7XG5cdCAgICB0aGlzLl8kaGFuZGxlcnMgPSBudWxsO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHppcChvYnNlcnZhYmxlcywgY29tYmluYXRvciAvKiBGdW5jdGlvbiB8IGZhbHNleSAqLykge1xuXHQgIHJldHVybiBvYnNlcnZhYmxlcy5sZW5ndGggPT09IDAgPyBuZXZlcigpIDogbmV3IFppcChvYnNlcnZhYmxlcywgY29tYmluYXRvcik7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA2MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBBYnN0cmFjdFBvb2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYzKTtcblx0dmFyIG5ldmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblxuXHRmdW5jdGlvbiBNZXJnZShzb3VyY2VzKSB7XG5cdCAgQWJzdHJhY3RQb29sLmNhbGwodGhpcyk7XG5cdCAgdGhpcy5fYWRkQWxsKHNvdXJjZXMpO1xuXHQgIHRoaXMuX2luaXRpYWxpc2VkID0gdHJ1ZTtcblx0fVxuXG5cdGluaGVyaXQoTWVyZ2UsIEFic3RyYWN0UG9vbCwge1xuXG5cdCAgX25hbWU6ICdtZXJnZScsXG5cblx0ICBfb25FbXB0eTogZnVuY3Rpb24gX29uRW1wdHkoKSB7XG5cdCAgICBpZiAodGhpcy5faW5pdGlhbGlzZWQpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlKG9ic2VydmFibGVzKSB7XG5cdCAgcmV0dXJuIG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMCA/IG5ldmVyKCkgOiBuZXcgTWVyZ2Uob2JzZXJ2YWJsZXMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNjMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZS5FUlJPUjtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlMi5pbmhlcml0O1xuXG5cdHZhciBfcmVxdWlyZTMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdHZhciBjb25jYXQgPSBfcmVxdWlyZTMuY29uY2F0O1xuXHR2YXIgZm9yRWFjaCA9IF9yZXF1aXJlMy5mb3JFYWNoO1xuXHR2YXIgZmluZEJ5UHJlZCA9IF9yZXF1aXJlMy5maW5kQnlQcmVkO1xuXHR2YXIgZmluZCA9IF9yZXF1aXJlMy5maW5kO1xuXHR2YXIgcmVtb3ZlID0gX3JlcXVpcmUzLnJlbW92ZTtcblx0dmFyIGNsb25lQXJyYXkgPSBfcmVxdWlyZTMuY2xvbmVBcnJheTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0ZnVuY3Rpb24gQWJzdHJhY3RQb29sKCkge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cdCAgdmFyIF9yZWYkcXVldWVMaW0gPSBfcmVmLnF1ZXVlTGltO1xuXHQgIHZhciBxdWV1ZUxpbSA9IF9yZWYkcXVldWVMaW0gPT09IHVuZGVmaW5lZCA/IDAgOiBfcmVmJHF1ZXVlTGltO1xuXHQgIHZhciBfcmVmJGNvbmN1ckxpbSA9IF9yZWYuY29uY3VyTGltO1xuXHQgIHZhciBjb25jdXJMaW0gPSBfcmVmJGNvbmN1ckxpbSA9PT0gdW5kZWZpbmVkID8gLTEgOiBfcmVmJGNvbmN1ckxpbTtcblx0ICB2YXIgX3JlZiRkcm9wID0gX3JlZi5kcm9wO1xuXHQgIHZhciBkcm9wID0gX3JlZiRkcm9wID09PSB1bmRlZmluZWQgPyAnbmV3JyA6IF9yZWYkZHJvcDtcblxuXHQgIFN0cmVhbS5jYWxsKHRoaXMpO1xuXG5cdCAgdGhpcy5fcXVldWVMaW0gPSBxdWV1ZUxpbSA8IDAgPyAtMSA6IHF1ZXVlTGltO1xuXHQgIHRoaXMuX2NvbmN1ckxpbSA9IGNvbmN1ckxpbSA8IDAgPyAtMSA6IGNvbmN1ckxpbTtcblx0ICB0aGlzLl9kcm9wID0gZHJvcDtcblx0ICB0aGlzLl9xdWV1ZSA9IFtdO1xuXHQgIHRoaXMuX2N1clNvdXJjZXMgPSBbXTtcblx0ICB0aGlzLl8kaGFuZGxlU3ViQW55ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICByZXR1cm4gX3RoaXMuX2hhbmRsZVN1YkFueShldmVudCk7XG5cdCAgfTtcblx0ICB0aGlzLl8kZW5kSGFuZGxlcnMgPSBbXTtcblx0ICB0aGlzLl9jdXJyZW50bHlBZGRpbmcgPSBudWxsO1xuXG5cdCAgaWYgKHRoaXMuX2NvbmN1ckxpbSA9PT0gMCkge1xuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH1cblx0fVxuXG5cdGluaGVyaXQoQWJzdHJhY3RQb29sLCBTdHJlYW0sIHtcblxuXHQgIF9uYW1lOiAnYWJzdHJhY3RQb29sJyxcblxuXHQgIF9hZGQ6IGZ1bmN0aW9uIF9hZGQob2JqLCB0b09icyAvKiBGdW5jdGlvbiB8IGZhbHNleSAqLykge1xuXHQgICAgdG9PYnMgPSB0b09icyB8fCBpZDtcblx0ICAgIGlmICh0aGlzLl9jb25jdXJMaW0gPT09IC0xIHx8IHRoaXMuX2N1clNvdXJjZXMubGVuZ3RoIDwgdGhpcy5fY29uY3VyTGltKSB7XG5cdCAgICAgIHRoaXMuX2FkZFRvQ3VyKHRvT2JzKG9iaikpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaWYgKHRoaXMuX3F1ZXVlTGltID09PSAtMSB8fCB0aGlzLl9xdWV1ZS5sZW5ndGggPCB0aGlzLl9xdWV1ZUxpbSkge1xuXHQgICAgICAgIHRoaXMuX2FkZFRvUXVldWUodG9PYnMob2JqKSk7XG5cdCAgICAgIH0gZWxzZSBpZiAodGhpcy5fZHJvcCA9PT0gJ29sZCcpIHtcblx0ICAgICAgICB0aGlzLl9yZW1vdmVPbGRlc3QoKTtcblx0ICAgICAgICB0aGlzLl9hZGQob2JqLCB0b09icyk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2FkZEFsbDogZnVuY3Rpb24gX2FkZEFsbChvYnNzKSB7XG5cdCAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuXHQgICAgZm9yRWFjaChvYnNzLCBmdW5jdGlvbiAob2JzKSB7XG5cdCAgICAgIHJldHVybiBfdGhpczIuX2FkZChvYnMpO1xuXHQgICAgfSk7XG5cdCAgfSxcblxuXHQgIF9yZW1vdmU6IGZ1bmN0aW9uIF9yZW1vdmUob2JzKSB7XG5cdCAgICBpZiAodGhpcy5fcmVtb3ZlQ3VyKG9icykgPT09IC0xKSB7XG5cdCAgICAgIHRoaXMuX3JlbW92ZVF1ZXVlKG9icyk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9hZGRUb1F1ZXVlOiBmdW5jdGlvbiBfYWRkVG9RdWV1ZShvYnMpIHtcblx0ICAgIHRoaXMuX3F1ZXVlID0gY29uY2F0KHRoaXMuX3F1ZXVlLCBbb2JzXSk7XG5cdCAgfSxcblxuXHQgIF9hZGRUb0N1cjogZnVuY3Rpb24gX2FkZFRvQ3VyKG9icykge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuXG5cdCAgICAgIC8vIEhBQ0s6XG5cdCAgICAgIC8vXG5cdCAgICAgIC8vIFdlIGhhdmUgdHdvIG9wdGltaXphdGlvbnMgZm9yIGNhc2VzIHdoZW4gYG9ic2AgaXMgZW5kZWQuIFdlIGRvbid0IHdhbnRcblx0ICAgICAgLy8gdG8gYWRkIHN1Y2ggb2JzZXJ2YWJsZSB0byB0aGUgbGlzdCwgYnV0IG9ubHkgd2FudCB0byBlbWl0IGV2ZW50c1xuXHQgICAgICAvLyBmcm9tIGl0IChpZiBpdCBoYXMgc29tZSkuXG5cdCAgICAgIC8vXG5cdCAgICAgIC8vIEluc3RlYWQgb2YgdGhpcyBoYWNrcywgd2UgY291bGQganVzdCBkaWQgZm9sbG93aW5nLFxuXHQgICAgICAvLyBidXQgaXQgd291bGQgYmUgNS04IHRpbWVzIHNsb3dlcjpcblx0ICAgICAgLy9cblx0ICAgICAgLy8gICAgIHRoaXMuX2N1clNvdXJjZXMgPSBjb25jYXQodGhpcy5fY3VyU291cmNlcywgW29ic10pO1xuXHQgICAgICAvLyAgICAgdGhpcy5fc3Vic2NyaWJlKG9icyk7XG5cdCAgICAgIC8vXG5cblx0ICAgICAgLy8gIzFcblx0ICAgICAgLy8gVGhpcyBvbmUgZm9yIGNhc2VzIHdoZW4gYG9ic2AgYWxyZWFkeSBlbmRlZFxuXHQgICAgICAvLyBlLmcuLCBLZWZpci5jb25zdGFudCgpIG9yIEtlZmlyLm5ldmVyKClcblx0ICAgICAgaWYgKCFvYnMuX2FsaXZlKSB7XG5cdCAgICAgICAgaWYgKG9icy5fY3VycmVudEV2ZW50KSB7XG5cdCAgICAgICAgICB0aGlzLl9lbWl0KG9icy5fY3VycmVudEV2ZW50LnR5cGUsIG9icy5fY3VycmVudEV2ZW50LnZhbHVlKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuO1xuXHQgICAgICB9XG5cblx0ICAgICAgLy8gIzJcblx0ICAgICAgLy8gVGhpcyBvbmUgaXMgZm9yIGNhc2VzIHdoZW4gYG9ic2AgZ29pbmcgdG8gZW5kIHN5bmNocm9ub3VzbHkgb25cblx0ICAgICAgLy8gZmlyc3Qgc3Vic2NyaWJlciBlLmcuLCBLZWZpci5zdHJlYW0oZW0gPT4ge2VtLmVtaXQoMSk7IGVtLmVuZCgpfSlcblx0ICAgICAgdGhpcy5fY3VycmVudGx5QWRkaW5nID0gb2JzO1xuXHQgICAgICBvYnMub25BbnkodGhpcy5fJGhhbmRsZVN1YkFueSk7XG5cdCAgICAgIHRoaXMuX2N1cnJlbnRseUFkZGluZyA9IG51bGw7XG5cdCAgICAgIGlmIChvYnMuX2FsaXZlKSB7XG5cdCAgICAgICAgdGhpcy5fY3VyU291cmNlcyA9IGNvbmNhdCh0aGlzLl9jdXJTb3VyY2VzLCBbb2JzXSk7XG5cdCAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuXHQgICAgICAgICAgdGhpcy5fc3ViVG9FbmQob2JzKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2N1clNvdXJjZXMgPSBjb25jYXQodGhpcy5fY3VyU291cmNlcywgW29ic10pO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfc3ViVG9FbmQ6IGZ1bmN0aW9uIF9zdWJUb0VuZChvYnMpIHtcblx0ICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG5cdCAgICB2YXIgb25FbmQgPSBmdW5jdGlvbiBvbkVuZCgpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzMy5fcmVtb3ZlQ3VyKG9icyk7XG5cdCAgICB9O1xuXHQgICAgdGhpcy5fJGVuZEhhbmRsZXJzLnB1c2goeyBvYnM6IG9icywgaGFuZGxlcjogb25FbmQgfSk7XG5cdCAgICBvYnMub25FbmQob25FbmQpO1xuXHQgIH0sXG5cblx0ICBfc3Vic2NyaWJlOiBmdW5jdGlvbiBfc3Vic2NyaWJlKG9icykge1xuXHQgICAgb2JzLm9uQW55KHRoaXMuXyRoYW5kbGVTdWJBbnkpO1xuXG5cdCAgICAvLyBpdCBjYW4gYmVjb21lIGluYWN0aXZlIGluIHJlc3BvbmNlIG9mIHN1YnNjcmliaW5nIHRvIGBvYnMub25BbnlgIGFib3ZlXG5cdCAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG5cdCAgICAgIHRoaXMuX3N1YlRvRW5kKG9icyk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF91bnN1YnNjcmliZTogZnVuY3Rpb24gX3Vuc3Vic2NyaWJlKG9icykge1xuXHQgICAgb2JzLm9mZkFueSh0aGlzLl8kaGFuZGxlU3ViQW55KTtcblxuXHQgICAgdmFyIG9uRW5kSSA9IGZpbmRCeVByZWQodGhpcy5fJGVuZEhhbmRsZXJzLCBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgIHJldHVybiBvYmoub2JzID09PSBvYnM7XG5cdCAgICB9KTtcblx0ICAgIGlmIChvbkVuZEkgIT09IC0xKSB7XG5cdCAgICAgIG9icy5vZmZFbmQodGhpcy5fJGVuZEhhbmRsZXJzW29uRW5kSV0uaGFuZGxlcik7XG5cdCAgICAgIHRoaXMuXyRlbmRIYW5kbGVycy5zcGxpY2Uob25FbmRJLCAxKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVN1YkFueTogZnVuY3Rpb24gX2hhbmRsZVN1YkFueShldmVudCkge1xuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IFZBTFVFKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZShldmVudC52YWx1ZSk7XG5cdCAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09IEVSUk9SKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcihldmVudC52YWx1ZSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9yZW1vdmVRdWV1ZTogZnVuY3Rpb24gX3JlbW92ZVF1ZXVlKG9icykge1xuXHQgICAgdmFyIGluZGV4ID0gZmluZCh0aGlzLl9xdWV1ZSwgb2JzKTtcblx0ICAgIHRoaXMuX3F1ZXVlID0gcmVtb3ZlKHRoaXMuX3F1ZXVlLCBpbmRleCk7XG5cdCAgICByZXR1cm4gaW5kZXg7XG5cdCAgfSxcblxuXHQgIF9yZW1vdmVDdXI6IGZ1bmN0aW9uIF9yZW1vdmVDdXIob2JzKSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG5cdCAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKG9icyk7XG5cdCAgICB9XG5cdCAgICB2YXIgaW5kZXggPSBmaW5kKHRoaXMuX2N1clNvdXJjZXMsIG9icyk7XG5cdCAgICB0aGlzLl9jdXJTb3VyY2VzID0gcmVtb3ZlKHRoaXMuX2N1clNvdXJjZXMsIGluZGV4KTtcblx0ICAgIGlmIChpbmRleCAhPT0gLTEpIHtcblx0ICAgICAgaWYgKHRoaXMuX3F1ZXVlLmxlbmd0aCAhPT0gMCkge1xuXHQgICAgICAgIHRoaXMuX3B1bGxRdWV1ZSgpO1xuXHQgICAgICB9IGVsc2UgaWYgKHRoaXMuX2N1clNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG5cdCAgICAgICAgdGhpcy5fb25FbXB0eSgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgICByZXR1cm4gaW5kZXg7XG5cdCAgfSxcblxuXHQgIF9yZW1vdmVPbGRlc3Q6IGZ1bmN0aW9uIF9yZW1vdmVPbGRlc3QoKSB7XG5cdCAgICB0aGlzLl9yZW1vdmVDdXIodGhpcy5fY3VyU291cmNlc1swXSk7XG5cdCAgfSxcblxuXHQgIF9wdWxsUXVldWU6IGZ1bmN0aW9uIF9wdWxsUXVldWUoKSB7XG5cdCAgICBpZiAodGhpcy5fcXVldWUubGVuZ3RoICE9PSAwKSB7XG5cdCAgICAgIHRoaXMuX3F1ZXVlID0gY2xvbmVBcnJheSh0aGlzLl9xdWV1ZSk7XG5cdCAgICAgIHRoaXMuX2FkZFRvQ3VyKHRoaXMuX3F1ZXVlLnNoaWZ0KCkpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIHNvdXJjZXMgPSB0aGlzLl9jdXJTb3VyY2VzOyBpIDwgc291cmNlcy5sZW5ndGggJiYgdGhpcy5fYWN0aXZlOyBpKyspIHtcblx0ICAgICAgdGhpcy5fc3Vic2NyaWJlKHNvdXJjZXNbaV0pO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgIGZvciAodmFyIGkgPSAwLCBzb3VyY2VzID0gdGhpcy5fY3VyU291cmNlczsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdGhpcy5fdW5zdWJzY3JpYmUoc291cmNlc1tpXSk7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5fY3VycmVudGx5QWRkaW5nICE9PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKHRoaXMuX2N1cnJlbnRseUFkZGluZyk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9pc0VtcHR5OiBmdW5jdGlvbiBfaXNFbXB0eSgpIHtcblx0ICAgIHJldHVybiB0aGlzLl9jdXJTb3VyY2VzLmxlbmd0aCA9PT0gMDtcblx0ICB9LFxuXG5cdCAgX29uRW1wdHk6IGZ1bmN0aW9uIF9vbkVtcHR5KCkge30sXG5cblx0ICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgIFN0cmVhbS5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9xdWV1ZSA9IG51bGw7XG5cdCAgICB0aGlzLl9jdXJTb3VyY2VzID0gbnVsbDtcblx0ICAgIHRoaXMuXyRoYW5kbGVTdWJBbnkgPSBudWxsO1xuXHQgICAgdGhpcy5fJGVuZEhhbmRsZXJzID0gbnVsbDtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBBYnN0cmFjdFBvb2w7XG5cbi8qKiovIH0sXG4vKiA2NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciByZXBlYXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY1KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbmNhdChvYnNlcnZhYmxlcykge1xuXHQgIHJldHVybiByZXBlYXQoZnVuY3Rpb24gKGluZGV4KSB7XG5cdCAgICByZXR1cm4gb2JzZXJ2YWJsZXMubGVuZ3RoID4gaW5kZXggPyBvYnNlcnZhYmxlc1tpbmRleF0gOiBmYWxzZTtcblx0ICB9KS5zZXROYW1lKCdjb25jYXQnKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDY1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIEVORCA9IF9yZXF1aXJlMi5FTkQ7XG5cblx0ZnVuY3Rpb24gUyhnZW5lcmF0b3IpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgU3RyZWFtLmNhbGwodGhpcyk7XG5cdCAgdGhpcy5fZ2VuZXJhdG9yID0gZ2VuZXJhdG9yO1xuXHQgIHRoaXMuX3NvdXJjZSA9IG51bGw7XG5cdCAgdGhpcy5faW5Mb29wID0gZmFsc2U7XG5cdCAgdGhpcy5faXRlcmF0aW9uID0gMDtcblx0ICB0aGlzLl8kaGFuZGxlQW55ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICByZXR1cm4gX3RoaXMuX2hhbmRsZUFueShldmVudCk7XG5cdCAgfTtcblx0fVxuXG5cdGluaGVyaXQoUywgU3RyZWFtLCB7XG5cblx0ICBfbmFtZTogJ3JlcGVhdCcsXG5cblx0ICBfaGFuZGxlQW55OiBmdW5jdGlvbiBfaGFuZGxlQW55KGV2ZW50KSB7XG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gRU5EKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XG5cdCAgICAgIHRoaXMuX2dldFNvdXJjZSgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fZW1pdChldmVudC50eXBlLCBldmVudC52YWx1ZSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9nZXRTb3VyY2U6IGZ1bmN0aW9uIF9nZXRTb3VyY2UoKSB7XG5cdCAgICBpZiAoIXRoaXMuX2luTG9vcCkge1xuXHQgICAgICB0aGlzLl9pbkxvb3AgPSB0cnVlO1xuXHQgICAgICB2YXIgZ2VuZXJhdG9yID0gdGhpcy5fZ2VuZXJhdG9yO1xuXHQgICAgICB3aGlsZSAodGhpcy5fc291cmNlID09PSBudWxsICYmIHRoaXMuX2FsaXZlICYmIHRoaXMuX2FjdGl2ZSkge1xuXHQgICAgICAgIHRoaXMuX3NvdXJjZSA9IGdlbmVyYXRvcih0aGlzLl9pdGVyYXRpb24rKyk7XG5cdCAgICAgICAgaWYgKHRoaXMuX3NvdXJjZSkge1xuXHQgICAgICAgICAgdGhpcy5fc291cmNlLm9uQW55KHRoaXMuXyRoYW5kbGVBbnkpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuX2luTG9vcCA9IGZhbHNlO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgaWYgKHRoaXMuX3NvdXJjZSkge1xuXHQgICAgICB0aGlzLl9zb3VyY2Uub25BbnkodGhpcy5fJGhhbmRsZUFueSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9nZXRTb3VyY2UoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICBpZiAodGhpcy5fc291cmNlKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZS5vZmZBbnkodGhpcy5fJGhhbmRsZUFueSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgU3RyZWFtLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX2dlbmVyYXRvciA9IG51bGw7XG5cdCAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xuXHQgICAgdGhpcy5fJGhhbmRsZUFueSA9IG51bGw7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGdlbmVyYXRvcikge1xuXHQgIHJldHVybiBuZXcgUyhnZW5lcmF0b3IpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNjYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgQWJzdHJhY3RQb29sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Myk7XG5cblx0ZnVuY3Rpb24gUG9vbCgpIHtcblx0ICBBYnN0cmFjdFBvb2wuY2FsbCh0aGlzKTtcblx0fVxuXG5cdGluaGVyaXQoUG9vbCwgQWJzdHJhY3RQb29sLCB7XG5cblx0ICBfbmFtZTogJ3Bvb2wnLFxuXG5cdCAgcGx1ZzogZnVuY3Rpb24gcGx1ZyhvYnMpIHtcblx0ICAgIHRoaXMuX2FkZChvYnMpO1xuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfSxcblxuXHQgIHVucGx1ZzogZnVuY3Rpb24gdW5wbHVnKG9icykge1xuXHQgICAgdGhpcy5fcmVtb3ZlKG9icyk7XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBQb29sO1xuXG4vKioqLyB9LFxuLyogNjcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZS5FUlJPUjtcblx0dmFyIEVORCA9IF9yZXF1aXJlLkVORDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlMi5pbmhlcml0O1xuXG5cdHZhciBBYnN0cmFjdFBvb2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYzKTtcblxuXHRmdW5jdGlvbiBGbGF0TWFwKHNvdXJjZSwgZm4sIG9wdGlvbnMpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgQWJzdHJhY3RQb29sLmNhbGwodGhpcywgb3B0aW9ucyk7XG5cdCAgdGhpcy5fc291cmNlID0gc291cmNlO1xuXHQgIHRoaXMuX2ZuID0gZm47XG5cdCAgdGhpcy5fbWFpbkVuZGVkID0gZmFsc2U7XG5cdCAgdGhpcy5fbGFzdEN1cnJlbnQgPSBudWxsO1xuXHQgIHRoaXMuXyRoYW5kbGVNYWluID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICByZXR1cm4gX3RoaXMuX2hhbmRsZU1haW4oZXZlbnQpO1xuXHQgIH07XG5cdH1cblxuXHRpbmhlcml0KEZsYXRNYXAsIEFic3RyYWN0UG9vbCwge1xuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgIEFic3RyYWN0UG9vbC5wcm90b3R5cGUuX29uQWN0aXZhdGlvbi5jYWxsKHRoaXMpO1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuXHQgICAgICB0aGlzLl9zb3VyY2Uub25BbnkodGhpcy5fJGhhbmRsZU1haW4pO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgIEFic3RyYWN0UG9vbC5wcm90b3R5cGUuX29uRGVhY3RpdmF0aW9uLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9zb3VyY2Uub2ZmQW55KHRoaXMuXyRoYW5kbGVNYWluKTtcblx0ICAgIHRoaXMuX2hhZE5vRXZTaW5jZURlYWN0ID0gdHJ1ZTtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZU1haW46IGZ1bmN0aW9uIF9oYW5kbGVNYWluKGV2ZW50KSB7XG5cblx0ICAgIGlmIChldmVudC50eXBlID09PSBWQUxVRSkge1xuXHQgICAgICAvLyBJcyBsYXRlc3QgdmFsdWUgYmVmb3JlIGRlYWN0aXZhdGlvbiBzdXJ2aXZlZCwgYW5kIG5vdyBpcyAnY3VycmVudCcgb24gdGhpcyBhY3RpdmF0aW9uP1xuXHQgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIGhhbmRsZSBzdWNoIHZhbHVlcywgdG8gcHJldmVudCB0byBjb25zdGFudGx5IGFkZFxuXHQgICAgICAvLyBzYW1lIG9ic2VydmFsZSBvbiBlYWNoIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIHdoZW4gb3VyIG1haW4gc291cmNlXG5cdCAgICAgIC8vIGlzIGEgYEtlZmlyLmNvbmF0YW50KClgIGZvciBleGFtcGxlLlxuXHQgICAgICB2YXIgc2FtZUN1cnIgPSB0aGlzLl9hY3RpdmF0aW5nICYmIHRoaXMuX2hhZE5vRXZTaW5jZURlYWN0ICYmIHRoaXMuX2xhc3RDdXJyZW50ID09PSBldmVudC52YWx1ZTtcblx0ICAgICAgaWYgKCFzYW1lQ3Vycikge1xuXHQgICAgICAgIHRoaXMuX2FkZChldmVudC52YWx1ZSwgdGhpcy5fZm4pO1xuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuX2xhc3RDdXJyZW50ID0gZXZlbnQudmFsdWU7XG5cdCAgICAgIHRoaXMuX2hhZE5vRXZTaW5jZURlYWN0ID0gZmFsc2U7XG5cdCAgICB9XG5cblx0ICAgIGlmIChldmVudC50eXBlID09PSBFUlJPUikge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoZXZlbnQudmFsdWUpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gRU5EKSB7XG5cdCAgICAgIGlmICh0aGlzLl9pc0VtcHR5KCkpIHtcblx0ICAgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5fbWFpbkVuZGVkID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25FbXB0eTogZnVuY3Rpb24gX29uRW1wdHkoKSB7XG5cdCAgICBpZiAodGhpcy5fbWFpbkVuZGVkKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICBBYnN0cmFjdFBvb2wucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fc291cmNlID0gbnVsbDtcblx0ICAgIHRoaXMuX2xhc3RDdXJyZW50ID0gbnVsbDtcblx0ICAgIHRoaXMuXyRoYW5kbGVNYWluID0gbnVsbDtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBGbGF0TWFwO1xuXG4vKioqLyB9LFxuLyogNjggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZS5FUlJPUjtcblx0dmFyIEVORCA9IF9yZXF1aXJlLkVORDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlMi5pbmhlcml0O1xuXG5cdHZhciBGbGF0TWFwID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Nyk7XG5cblx0ZnVuY3Rpb24gRmxhdE1hcEVycm9ycyhzb3VyY2UsIGZuKSB7XG5cdCAgRmxhdE1hcC5jYWxsKHRoaXMsIHNvdXJjZSwgZm4pO1xuXHR9XG5cblx0aW5oZXJpdChGbGF0TWFwRXJyb3JzLCBGbGF0TWFwLCB7XG5cblx0ICAvLyBTYW1lIGFzIGluIEZsYXRNYXAsIG9ubHkgVkFMVUUvRVJST1IgZmxpcHBlZFxuXHQgIF9oYW5kbGVNYWluOiBmdW5jdGlvbiBfaGFuZGxlTWFpbihldmVudCkge1xuXG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gRVJST1IpIHtcblx0ICAgICAgdmFyIHNhbWVDdXJyID0gdGhpcy5fYWN0aXZhdGluZyAmJiB0aGlzLl9oYWROb0V2U2luY2VEZWFjdCAmJiB0aGlzLl9sYXN0Q3VycmVudCA9PT0gZXZlbnQudmFsdWU7XG5cdCAgICAgIGlmICghc2FtZUN1cnIpIHtcblx0ICAgICAgICB0aGlzLl9hZGQoZXZlbnQudmFsdWUsIHRoaXMuX2ZuKTtcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLl9sYXN0Q3VycmVudCA9IGV2ZW50LnZhbHVlO1xuXHQgICAgICB0aGlzLl9oYWROb0V2U2luY2VEZWFjdCA9IGZhbHNlO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gVkFMVUUpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKGV2ZW50LnZhbHVlKTtcblx0ICAgIH1cblxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVORCkge1xuXHQgICAgICBpZiAodGhpcy5faXNFbXB0eSgpKSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuX21haW5FbmRlZCA9IHRydWU7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBGbGF0TWFwRXJyb3JzO1xuXG4vKioqLyB9LFxuLyogNjkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcwKTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlMi5OT1RISU5HO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9oYW5kbGVQcmltYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5VmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX2xhc3RTZWNvbmRhcnkgIT09IE5PVEhJTkcgJiYgdGhpcy5fbGFzdFNlY29uZGFyeSkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVTZWNvbmRhcnlFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fbGFzdFNlY29uZGFyeSA9PT0gTk9USElORyB8fCAhdGhpcy5fbGFzdFNlY29uZGFyeSkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2ZpbHRlckJ5JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdmaWx0ZXJCeScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbHRlckJ5KHByaW1hcnksIHNlY29uZGFyeSkge1xuXHQgIHJldHVybiBuZXcgKHByaW1hcnkuX29mU2FtZVR5cGUoUywgUCkpKHByaW1hcnksIHNlY29uZGFyeSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXHR2YXIgUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlMi5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUyLkVSUk9SO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUyLkVORDtcblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZTIuTk9USElORztcblxuXHRmdW5jdGlvbiBjcmVhdGVDb25zdHJ1Y3RvcihCYXNlQ2xhc3MsIG5hbWUpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gQW5vbnltb3VzT2JzZXJ2YWJsZShwcmltYXJ5LCBzZWNvbmRhcnksIG9wdGlvbnMpIHtcblx0ICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICAgIEJhc2VDbGFzcy5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fcHJpbWFyeSA9IHByaW1hcnk7XG5cdCAgICB0aGlzLl9zZWNvbmRhcnkgPSBzZWNvbmRhcnk7XG5cdCAgICB0aGlzLl9uYW1lID0gcHJpbWFyeS5fbmFtZSArICcuJyArIG5hbWU7XG5cdCAgICB0aGlzLl9sYXN0U2Vjb25kYXJ5ID0gTk9USElORztcblx0ICAgIHRoaXMuXyRoYW5kbGVTZWNvbmRhcnlBbnkgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9oYW5kbGVTZWNvbmRhcnlBbnkoZXZlbnQpO1xuXHQgICAgfTtcblx0ICAgIHRoaXMuXyRoYW5kbGVQcmltYXJ5QW55ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5faGFuZGxlUHJpbWFyeUFueShldmVudCk7XG5cdCAgICB9O1xuXHQgICAgdGhpcy5faW5pdChvcHRpb25zKTtcblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlQ2xhc3NNZXRob2RzKEJhc2VDbGFzcykge1xuXHQgIHJldHVybiB7XG5cdCAgICBfaW5pdDogZnVuY3Rpb24gX2luaXQoKSB7fSxcblx0ICAgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHt9LFxuXG5cdCAgICBfaGFuZGxlUHJpbWFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeVZhbHVlKHgpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfSxcblx0ICAgIF9oYW5kbGVQcmltYXJ5RXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5RXJyb3IoeCkge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICB9LFxuXHQgICAgX2hhbmRsZVByaW1hcnlFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5RW5kKCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9LFxuXG5cdCAgICBfaGFuZGxlU2Vjb25kYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlWYWx1ZSh4KSB7XG5cdCAgICAgIHRoaXMuX2xhc3RTZWNvbmRhcnkgPSB4O1xuXHQgICAgfSxcblx0ICAgIF9oYW5kbGVTZWNvbmRhcnlFcnJvcjogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeUVycm9yKHgpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgfSxcblx0ICAgIF9oYW5kbGVTZWNvbmRhcnlFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlFbmQoKSB7fSxcblxuXHQgICAgX2hhbmRsZVByaW1hcnlBbnk6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5QW55KGV2ZW50KSB7XG5cdCAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuXHQgICAgICAgIGNhc2UgVkFMVUU6XG5cdCAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlUHJpbWFyeVZhbHVlKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgICBjYXNlIEVSUk9SOlxuXHQgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZVByaW1hcnlFcnJvcihldmVudC52YWx1ZSk7XG5cdCAgICAgICAgY2FzZSBFTkQ6XG5cdCAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlUHJpbWFyeUVuZChldmVudC52YWx1ZSk7XG5cdCAgICAgIH1cblx0ICAgIH0sXG5cdCAgICBfaGFuZGxlU2Vjb25kYXJ5QW55OiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5QW55KGV2ZW50KSB7XG5cdCAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuXHQgICAgICAgIGNhc2UgVkFMVUU6XG5cdCAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlU2Vjb25kYXJ5VmFsdWUoZXZlbnQudmFsdWUpO1xuXHQgICAgICAgIGNhc2UgRVJST1I6XG5cdCAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlU2Vjb25kYXJ5RXJyb3IoZXZlbnQudmFsdWUpO1xuXHQgICAgICAgIGNhc2UgRU5EOlxuXHQgICAgICAgICAgdGhpcy5faGFuZGxlU2Vjb25kYXJ5RW5kKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgICAgIHRoaXMuX3JlbW92ZVNlY29uZGFyeSgpO1xuXHQgICAgICB9XG5cdCAgICB9LFxuXG5cdCAgICBfcmVtb3ZlU2Vjb25kYXJ5OiBmdW5jdGlvbiBfcmVtb3ZlU2Vjb25kYXJ5KCkge1xuXHQgICAgICBpZiAodGhpcy5fc2Vjb25kYXJ5ICE9PSBudWxsKSB7XG5cdCAgICAgICAgdGhpcy5fc2Vjb25kYXJ5Lm9mZkFueSh0aGlzLl8kaGFuZGxlU2Vjb25kYXJ5QW55KTtcblx0ICAgICAgICB0aGlzLl8kaGFuZGxlU2Vjb25kYXJ5QW55ID0gbnVsbDtcblx0ICAgICAgICB0aGlzLl9zZWNvbmRhcnkgPSBudWxsO1xuXHQgICAgICB9XG5cdCAgICB9LFxuXG5cdCAgICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgICBpZiAodGhpcy5fc2Vjb25kYXJ5ICE9PSBudWxsKSB7XG5cdCAgICAgICAgdGhpcy5fc2Vjb25kYXJ5Lm9uQW55KHRoaXMuXyRoYW5kbGVTZWNvbmRhcnlBbnkpO1xuXHQgICAgICB9XG5cdCAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcblx0ICAgICAgICB0aGlzLl9wcmltYXJ5Lm9uQW55KHRoaXMuXyRoYW5kbGVQcmltYXJ5QW55KTtcblx0ICAgICAgfVxuXHQgICAgfSxcblx0ICAgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgICBpZiAodGhpcy5fc2Vjb25kYXJ5ICE9PSBudWxsKSB7XG5cdCAgICAgICAgdGhpcy5fc2Vjb25kYXJ5Lm9mZkFueSh0aGlzLl8kaGFuZGxlU2Vjb25kYXJ5QW55KTtcblx0ICAgICAgfVxuXHQgICAgICB0aGlzLl9wcmltYXJ5Lm9mZkFueSh0aGlzLl8kaGFuZGxlUHJpbWFyeUFueSk7XG5cdCAgICB9LFxuXG5cdCAgICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgICAgQmFzZUNsYXNzLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgICAgdGhpcy5fcHJpbWFyeSA9IG51bGw7XG5cdCAgICAgIHRoaXMuX3NlY29uZGFyeSA9IG51bGw7XG5cdCAgICAgIHRoaXMuX2xhc3RTZWNvbmRhcnkgPSBudWxsO1xuXHQgICAgICB0aGlzLl8kaGFuZGxlU2Vjb25kYXJ5QW55ID0gbnVsbDtcblx0ICAgICAgdGhpcy5fJGhhbmRsZVByaW1hcnlBbnkgPSBudWxsO1xuXHQgICAgICB0aGlzLl9mcmVlKCk7XG5cdCAgICB9XG5cblx0ICB9O1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlU3RyZWFtKG5hbWUsIG1peGluKSB7XG5cdCAgdmFyIFMgPSBjcmVhdGVDb25zdHJ1Y3RvcihTdHJlYW0sIG5hbWUpO1xuXHQgIGluaGVyaXQoUywgU3RyZWFtLCBjcmVhdGVDbGFzc01ldGhvZHMoU3RyZWFtKSwgbWl4aW4pO1xuXHQgIHJldHVybiBTO1xuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlUHJvcGVydHkobmFtZSwgbWl4aW4pIHtcblx0ICB2YXIgUCA9IGNyZWF0ZUNvbnN0cnVjdG9yKFByb3BlcnR5LCBuYW1lKTtcblx0ICBpbmhlcml0KFAsIFByb3BlcnR5LCBjcmVhdGVDbGFzc01ldGhvZHMoUHJvcGVydHkpLCBtaXhpbik7XG5cdCAgcmV0dXJuIFA7XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IHsgY3JlYXRlU3RyZWFtOiBjcmVhdGVTdHJlYW0sIGNyZWF0ZVByb3BlcnR5OiBjcmVhdGVQcm9wZXJ0eSB9O1xuXG4vKioqLyB9LFxuLyogNzEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgY29tYmluZSA9IF9fd2VicGFja19yZXF1aXJlX18oNjApO1xuXG5cdHZhciBpZDIgPSBmdW5jdGlvbiBpZDIoXywgeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2FtcGxlZEJ5KHBhc3NpdmUsIGFjdGl2ZSwgY29tYmluYXRvcikge1xuXHQgIHZhciBfY29tYmluYXRvciA9IGNvbWJpbmF0b3IgPyBmdW5jdGlvbiAoYSwgYikge1xuXHQgICAgcmV0dXJuIGNvbWJpbmF0b3IoYiwgYSk7XG5cdCAgfSA6IGlkMjtcblx0ICByZXR1cm4gY29tYmluZShbYWN0aXZlXSwgW3Bhc3NpdmVdLCBfY29tYmluYXRvcikuc2V0TmFtZShwYXNzaXZlLCAnc2FtcGxlZEJ5Jyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNzApO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUyLk5PVEhJTkc7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2hhbmRsZVByaW1hcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5fbGFzdFNlY29uZGFyeSAhPT0gTk9USElORykge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVTZWNvbmRhcnlFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fbGFzdFNlY29uZGFyeSA9PT0gTk9USElORykge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3NraXBVbnRpbEJ5JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdza2lwVW50aWxCeScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNraXBVbnRpbEJ5KHByaW1hcnksIHNlY29uZGFyeSkge1xuXHQgIHJldHVybiBuZXcgKHByaW1hcnkuX29mU2FtZVR5cGUoUywgUCkpKHByaW1hcnksIHNlY29uZGFyeSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3MyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNzApO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9oYW5kbGVTZWNvbmRhcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeVZhbHVlKCkge1xuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCd0YWtlVW50aWxCeScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgndGFrZVVudGlsQnknLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0YWtlVW50aWxCeShwcmltYXJ5LCBzZWNvbmRhcnkpIHtcblx0ICByZXR1cm4gbmV3IChwcmltYXJ5Ll9vZlNhbWVUeXBlKFMsIFApKShwcmltYXJ5LCBzZWNvbmRhcnkpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcwKTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoKSB7XG5cdCAgICB2YXIgX3JlZiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzBdO1xuXG5cdCAgICB2YXIgX3JlZiRmbHVzaE9uRW5kID0gX3JlZi5mbHVzaE9uRW5kO1xuXHQgICAgdmFyIGZsdXNoT25FbmQgPSBfcmVmJGZsdXNoT25FbmQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmJGZsdXNoT25FbmQ7XG5cblx0ICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICAgIHRoaXMuX2ZsdXNoT25FbmQgPSBmbHVzaE9uRW5kO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9idWZmID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2ZsdXNoOiBmdW5jdGlvbiBfZmx1c2goKSB7XG5cdCAgICBpZiAodGhpcy5fYnVmZiAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fYnVmZik7XG5cdCAgICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVByaW1hcnlFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5RW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2ZsdXNoT25FbmQpIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9LFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgIHRoaXMuX3ByaW1hcnkub25BbnkodGhpcy5fJGhhbmRsZVByaW1hcnlBbnkpO1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlICYmIHRoaXMuX3NlY29uZGFyeSAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLl9zZWNvbmRhcnkub25BbnkodGhpcy5fJGhhbmRsZVNlY29uZGFyeUFueSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVQcmltYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5VmFsdWUoeCkge1xuXHQgICAgdGhpcy5fYnVmZi5wdXNoKHgpO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlU2Vjb25kYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlWYWx1ZSgpIHtcblx0ICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVTZWNvbmRhcnlFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlFbmQoKSB7XG5cdCAgICBpZiAoIXRoaXMuX2ZsdXNoT25FbmQpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdidWZmZXJCeScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnYnVmZmVyQnknLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWZmZXJCeShwcmltYXJ5LCBzZWNvbmRhcnksIG9wdGlvbnMgLyogb3B0aW9uYWwgKi8pIHtcblx0ICByZXR1cm4gbmV3IChwcmltYXJ5Ll9vZlNhbWVUeXBlKFMsIFApKShwcmltYXJ5LCBzZWNvbmRhcnksIG9wdGlvbnMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcwKTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlMi5OT1RISU5HO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdCgpIHtcblx0ICAgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cblx0ICAgIHZhciBfcmVmJGZsdXNoT25FbmQgPSBfcmVmLmZsdXNoT25FbmQ7XG5cdCAgICB2YXIgZmx1c2hPbkVuZCA9IF9yZWYkZmx1c2hPbkVuZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYkZmx1c2hPbkVuZDtcblx0ICAgIHZhciBfcmVmJGZsdXNoT25DaGFuZ2UgPSBfcmVmLmZsdXNoT25DaGFuZ2U7XG5cdCAgICB2YXIgZmx1c2hPbkNoYW5nZSA9IF9yZWYkZmx1c2hPbkNoYW5nZSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBfcmVmJGZsdXNoT25DaGFuZ2U7XG5cblx0ICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICAgIHRoaXMuX2ZsdXNoT25FbmQgPSBmbHVzaE9uRW5kO1xuXHQgICAgdGhpcy5fZmx1c2hPbkNoYW5nZSA9IGZsdXNoT25DaGFuZ2U7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2J1ZmYgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfZmx1c2g6IGZ1bmN0aW9uIF9mbHVzaCgpIHtcblx0ICAgIGlmICh0aGlzLl9idWZmICE9PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9idWZmKTtcblx0ICAgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlUHJpbWFyeUVuZDogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fZmx1c2hPbkVuZCkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlUHJpbWFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeVZhbHVlKHgpIHtcblx0ICAgIHRoaXMuX2J1ZmYucHVzaCh4KTtcblx0ICAgIGlmICh0aGlzLl9sYXN0U2Vjb25kYXJ5ICE9PSBOT1RISU5HICYmICF0aGlzLl9sYXN0U2Vjb25kYXJ5KSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVTZWNvbmRhcnlFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlFbmQoKSB7XG5cdCAgICBpZiAoIXRoaXMuX2ZsdXNoT25FbmQgJiYgKHRoaXMuX2xhc3RTZWNvbmRhcnkgPT09IE5PVEhJTkcgfHwgdGhpcy5fbGFzdFNlY29uZGFyeSkpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlU2Vjb25kYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5fZmx1c2hPbkNoYW5nZSAmJiAheCkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXG5cdCAgICAvLyBmcm9tIGRlZmF1bHQgX2hhbmRsZVNlY29uZGFyeVZhbHVlXG5cdCAgICB0aGlzLl9sYXN0U2Vjb25kYXJ5ID0geDtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnYnVmZmVyV2hpbGVCeScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnYnVmZmVyV2hpbGVCeScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1ZmZlcldoaWxlQnkocHJpbWFyeSwgc2Vjb25kYXJ5LCBvcHRpb25zIC8qIG9wdGlvbmFsICovKSB7XG5cdCAgcmV0dXJuIG5ldyAocHJpbWFyeS5fb2ZTYW1lVHlwZShTLCBQKSkocHJpbWFyeSwgc2Vjb25kYXJ5LCBvcHRpb25zKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDc2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIG1lcmdlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Mik7XG5cdHZhciBtYXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKTtcblx0dmFyIHNraXBEdXBsaWNhdGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MCk7XG5cdHZhciB0b1Byb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNCk7XG5cblx0dmFyIGYgPSBmdW5jdGlvbiBmKCkge1xuXHQgIHJldHVybiBmYWxzZTtcblx0fTtcblx0dmFyIHQgPSBmdW5jdGlvbiB0KCkge1xuXHQgIHJldHVybiB0cnVlO1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXdhaXRpbmcoYSwgYikge1xuXHQgIHZhciByZXN1bHQgPSBtZXJnZShbbWFwKGEsIHQpLCBtYXAoYiwgZildKTtcblx0ICByZXN1bHQgPSBza2lwRHVwbGljYXRlcyhyZXN1bHQpO1xuXHQgIHJlc3VsdCA9IHRvUHJvcGVydHkocmVzdWx0LCBmKTtcblx0ICByZXR1cm4gcmVzdWx0LnNldE5hbWUoYSwgJ2F3YWl0aW5nJyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3NyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgdmFyIHJlc3VsdCA9IGZuKHgpO1xuXHQgICAgaWYgKHJlc3VsdC5jb252ZXJ0KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcihyZXN1bHQuZXJyb3IpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCd2YWx1ZXNUb0Vycm9ycycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgndmFsdWVzVG9FcnJvcnMnLCBtaXhpbik7XG5cblx0dmFyIGRlZkZuID0gZnVuY3Rpb24gZGVmRm4oeCkge1xuXHQgIHJldHVybiB7IGNvbnZlcnQ6IHRydWUsIGVycm9yOiB4IH07XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB2YWx1ZXNUb0Vycm9ycyhvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBkZWZGbiA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDc4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlRXJyb3IoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICB2YXIgcmVzdWx0ID0gZm4oeCk7XG5cdCAgICBpZiAocmVzdWx0LmNvbnZlcnQpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHJlc3VsdC52YWx1ZSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2Vycm9yc1RvVmFsdWVzJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdlcnJvcnNUb1ZhbHVlcycsIG1peGluKTtcblxuXHR2YXIgZGVmRm4gPSBmdW5jdGlvbiBkZWZGbih4KSB7XG5cdCAgcmV0dXJuIHsgY29udmVydDogdHJ1ZSwgdmFsdWU6IHggfTtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVycm9yc1RvVmFsdWVzKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGRlZkZuIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVFcnJvcih4KSB7XG5cdCAgICB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2VuZE9uRXJyb3InLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2VuZE9uRXJyb3InLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmRPbkVycm9yKG9icykge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzKTtcblx0fTtcblxuLyoqKi8gfVxuLyoqKioqKi8gXSlcbn0pO1xuO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2tlZmlyL2Rpc3Qva2VmaXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBBamF4TW9uaXRvciwgQmFyLCBEb2N1bWVudE1vbml0b3IsIEVsZW1lbnRNb25pdG9yLCBFbGVtZW50VHJhY2tlciwgRXZlbnRMYWdNb25pdG9yLCBFdmVudGVkLCBFdmVudHMsIE5vVGFyZ2V0RXJyb3IsIFBhY2UsIFJlcXVlc3RJbnRlcmNlcHQsIFNPVVJDRV9LRVlTLCBTY2FsZXIsIFNvY2tldFJlcXVlc3RUcmFja2VyLCBYSFJSZXF1ZXN0VHJhY2tlciwgYW5pbWF0aW9uLCBhdmdBbXBsaXR1ZGUsIGJhciwgY2FuY2VsQW5pbWF0aW9uLCBjYW5jZWxBbmltYXRpb25GcmFtZSwgZGVmYXVsdE9wdGlvbnMsIGV4dGVuZCwgZXh0ZW5kTmF0aXZlLCBnZXRGcm9tRE9NLCBnZXRJbnRlcmNlcHQsIGhhbmRsZVB1c2hTdGF0ZSwgaWdub3JlU3RhY2ssIGluaXQsIG5vdywgb3B0aW9ucywgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLCByZXN1bHQsIHJ1bkFuaW1hdGlvbiwgc2NhbGVycywgc2hvdWxkSWdub3JlVVJMLCBzaG91bGRUcmFjaywgc291cmNlLCBzb3VyY2VzLCB1bmlTY2FsZXIsIF9XZWJTb2NrZXQsIF9YRG9tYWluUmVxdWVzdCwgX1hNTEh0dHBSZXF1ZXN0LCBfaSwgX2ludGVyY2VwdCwgX2xlbiwgX3B1c2hTdGF0ZSwgX3JlZiwgX3JlZjEsIF9yZXBsYWNlU3RhdGUsXG4gICAgX19zbGljZSA9IFtdLnNsaWNlLFxuICAgIF9faGFzUHJvcCA9IHt9Lmhhc093blByb3BlcnR5LFxuICAgIF9fZXh0ZW5kcyA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpIHsgZm9yICh2YXIga2V5IGluIHBhcmVudCkgeyBpZiAoX19oYXNQcm9wLmNhbGwocGFyZW50LCBrZXkpKSBjaGlsZFtrZXldID0gcGFyZW50W2tleV07IH0gZnVuY3Rpb24gY3RvcigpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGNoaWxkOyB9IGN0b3IucHJvdG90eXBlID0gcGFyZW50LnByb3RvdHlwZTsgY2hpbGQucHJvdG90eXBlID0gbmV3IGN0b3IoKTsgY2hpbGQuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTsgcmV0dXJuIGNoaWxkOyB9LFxuICAgIF9faW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG4gIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGNhdGNodXBUaW1lOiAxMDAsXG4gICAgaW5pdGlhbFJhdGU6IC4wMyxcbiAgICBtaW5UaW1lOiAyNTAsXG4gICAgZ2hvc3RUaW1lOiAxMDAsXG4gICAgbWF4UHJvZ3Jlc3NQZXJGcmFtZTogMjAsXG4gICAgZWFzZUZhY3RvcjogMS4yNSxcbiAgICBzdGFydE9uUGFnZUxvYWQ6IHRydWUsXG4gICAgcmVzdGFydE9uUHVzaFN0YXRlOiB0cnVlLFxuICAgIHJlc3RhcnRPblJlcXVlc3RBZnRlcjogNTAwLFxuICAgIHRhcmdldDogJ2JvZHknLFxuICAgIGVsZW1lbnRzOiB7XG4gICAgICBjaGVja0ludGVydmFsOiAxMDAsXG4gICAgICBzZWxlY3RvcnM6IFsnYm9keSddXG4gICAgfSxcbiAgICBldmVudExhZzoge1xuICAgICAgbWluU2FtcGxlczogMTAsXG4gICAgICBzYW1wbGVDb3VudDogMyxcbiAgICAgIGxhZ1RocmVzaG9sZDogM1xuICAgIH0sXG4gICAgYWpheDoge1xuICAgICAgdHJhY2tNZXRob2RzOiBbJ0dFVCddLFxuICAgICAgdHJhY2tXZWJTb2NrZXRzOiB0cnVlLFxuICAgICAgaWdub3JlVVJMczogW11cbiAgICB9XG4gIH07XG5cbiAgbm93ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIF9yZWY7XG4gICAgcmV0dXJuIChfcmVmID0gdHlwZW9mIHBlcmZvcm1hbmNlICE9PSBcInVuZGVmaW5lZFwiICYmIHBlcmZvcm1hbmNlICE9PSBudWxsID8gdHlwZW9mIHBlcmZvcm1hbmNlLm5vdyA9PT0gXCJmdW5jdGlvblwiID8gcGVyZm9ybWFuY2Uubm93KCkgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwgPyBfcmVmIDogKyhuZXcgRGF0ZSk7XG4gIH07XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICBpZiAocmVxdWVzdEFuaW1hdGlvbkZyYW1lID09IG51bGwpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihmbikge1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIDUwKTtcbiAgICB9O1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgIHJldHVybiBjbGVhclRpbWVvdXQoaWQpO1xuICAgIH07XG4gIH1cblxuICBydW5BbmltYXRpb24gPSBmdW5jdGlvbihmbikge1xuICAgIHZhciBsYXN0LCB0aWNrO1xuICAgIGxhc3QgPSBub3coKTtcbiAgICB0aWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZGlmZjtcbiAgICAgIGRpZmYgPSBub3coKSAtIGxhc3Q7XG4gICAgICBpZiAoZGlmZiA+PSAzMykge1xuICAgICAgICBsYXN0ID0gbm93KCk7XG4gICAgICAgIHJldHVybiBmbihkaWZmLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KHRpY2ssIDMzIC0gZGlmZik7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGljaygpO1xuICB9O1xuXG4gIHJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBrZXksIG9iajtcbiAgICBvYmogPSBhcmd1bWVudHNbMF0sIGtleSA9IGFyZ3VtZW50c1sxXSwgYXJncyA9IDMgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogW107XG4gICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG9ialtrZXldLmFwcGx5KG9iaiwgYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9XG4gIH07XG5cbiAgZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleSwgb3V0LCBzb3VyY2UsIHNvdXJjZXMsIHZhbCwgX2ksIF9sZW47XG4gICAgb3V0ID0gYXJndW1lbnRzWzBdLCBzb3VyY2VzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IHNvdXJjZXMubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZXNbX2ldO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICBpZiAoIV9faGFzUHJvcC5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgdmFsID0gc291cmNlW2tleV07XG4gICAgICAgICAgaWYgKChvdXRba2V5XSAhPSBudWxsKSAmJiB0eXBlb2Ygb3V0W2tleV0gPT09ICdvYmplY3QnICYmICh2YWwgIT0gbnVsbCkgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGV4dGVuZChvdXRba2V5XSwgdmFsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0W2tleV0gPSB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG4gIH07XG5cbiAgYXZnQW1wbGl0dWRlID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgdmFyIGNvdW50LCBzdW0sIHYsIF9pLCBfbGVuO1xuICAgIHN1bSA9IGNvdW50ID0gMDtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IGFyci5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgdiA9IGFycltfaV07XG4gICAgICBzdW0gKz0gTWF0aC5hYnModik7XG4gICAgICBjb3VudCsrO1xuICAgIH1cbiAgICByZXR1cm4gc3VtIC8gY291bnQ7XG4gIH07XG5cbiAgZ2V0RnJvbURPTSA9IGZ1bmN0aW9uKGtleSwganNvbikge1xuICAgIHZhciBkYXRhLCBlLCBlbDtcbiAgICBpZiAoa2V5ID09IG51bGwpIHtcbiAgICAgIGtleSA9ICdvcHRpb25zJztcbiAgICB9XG4gICAgaWYgKGpzb24gPT0gbnVsbCkge1xuICAgICAganNvbiA9IHRydWU7XG4gICAgfVxuICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXBhY2UtXCIgKyBrZXkgKyBcIl1cIik7XG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRhID0gZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYWNlLVwiICsga2V5KTtcbiAgICBpZiAoIWpzb24pIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICBlID0gX2Vycm9yO1xuICAgICAgcmV0dXJuIHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUgIT09IG51bGwgPyBjb25zb2xlLmVycm9yKFwiRXJyb3IgcGFyc2luZyBpbmxpbmUgcGFjZSBvcHRpb25zXCIsIGUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcblxuICBFdmVudGVkID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50ZWQoKSB7fVxuXG4gICAgRXZlbnRlZC5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudCwgaGFuZGxlciwgY3R4LCBvbmNlKSB7XG4gICAgICB2YXIgX2Jhc2U7XG4gICAgICBpZiAob25jZSA9PSBudWxsKSB7XG4gICAgICAgIG9uY2UgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmJpbmRpbmdzID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5iaW5kaW5ncyA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKChfYmFzZSA9IHRoaXMuYmluZGluZ3MpW2V2ZW50XSA9PSBudWxsKSB7XG4gICAgICAgIF9iYXNlW2V2ZW50XSA9IFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYmluZGluZ3NbZXZlbnRdLnB1c2goe1xuICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgICAgICBjdHg6IGN0eCxcbiAgICAgICAgb25jZTogb25jZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgaGFuZGxlciwgY3R4KSB7XG4gICAgICByZXR1cm4gdGhpcy5vbihldmVudCwgaGFuZGxlciwgY3R4LCB0cnVlKTtcbiAgICB9O1xuXG4gICAgRXZlbnRlZC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICAgIHZhciBpLCBfcmVmLCBfcmVzdWx0cztcbiAgICAgIGlmICgoKF9yZWYgPSB0aGlzLmJpbmRpbmdzKSAhPSBudWxsID8gX3JlZltldmVudF0gOiB2b2lkIDApID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGhhbmRsZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZGVsZXRlIHRoaXMuYmluZGluZ3NbZXZlbnRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5iaW5kaW5nc1tldmVudF0ubGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuYmluZGluZ3NbZXZlbnRdW2ldLmhhbmRsZXIgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godGhpcy5iaW5kaW5nc1tldmVudF0uc3BsaWNlKGksIDEpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChpKyspO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEV2ZW50ZWQucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBjdHgsIGV2ZW50LCBoYW5kbGVyLCBpLCBvbmNlLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHM7XG4gICAgICBldmVudCA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICBpZiAoKF9yZWYgPSB0aGlzLmJpbmRpbmdzKSAhPSBudWxsID8gX3JlZltldmVudF0gOiB2b2lkIDApIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy5iaW5kaW5nc1tldmVudF0ubGVuZ3RoKSB7XG4gICAgICAgICAgX3JlZjEgPSB0aGlzLmJpbmRpbmdzW2V2ZW50XVtpXSwgaGFuZGxlciA9IF9yZWYxLmhhbmRsZXIsIGN0eCA9IF9yZWYxLmN0eCwgb25jZSA9IF9yZWYxLm9uY2U7XG4gICAgICAgICAgaGFuZGxlci5hcHBseShjdHggIT0gbnVsbCA/IGN0eCA6IHRoaXMsIGFyZ3MpO1xuICAgICAgICAgIGlmIChvbmNlKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHRoaXMuYmluZGluZ3NbZXZlbnRdLnNwbGljZShpLCAxKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goaSsrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRXZlbnRlZDtcblxuICB9KSgpO1xuXG4gIFBhY2UgPSB3aW5kb3cuUGFjZSB8fCB7fTtcblxuICB3aW5kb3cuUGFjZSA9IFBhY2U7XG5cbiAgZXh0ZW5kKFBhY2UsIEV2ZW50ZWQucHJvdG90eXBlKTtcblxuICBvcHRpb25zID0gUGFjZS5vcHRpb25zID0gZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgd2luZG93LnBhY2VPcHRpb25zLCBnZXRGcm9tRE9NKCkpO1xuXG4gIF9yZWYgPSBbJ2FqYXgnLCAnZG9jdW1lbnQnLCAnZXZlbnRMYWcnLCAnZWxlbWVudHMnXTtcbiAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgc291cmNlID0gX3JlZltfaV07XG4gICAgaWYgKG9wdGlvbnNbc291cmNlXSA9PT0gdHJ1ZSkge1xuICAgICAgb3B0aW9uc1tzb3VyY2VdID0gZGVmYXVsdE9wdGlvbnNbc291cmNlXTtcbiAgICB9XG4gIH1cblxuICBOb1RhcmdldEVycm9yID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhOb1RhcmdldEVycm9yLCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gTm9UYXJnZXRFcnJvcigpIHtcbiAgICAgIF9yZWYxID0gTm9UYXJnZXRFcnJvci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBfcmVmMTtcbiAgICB9XG5cbiAgICByZXR1cm4gTm9UYXJnZXRFcnJvcjtcblxuICB9KShFcnJvcik7XG5cbiAgQmFyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEJhcigpIHtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgIH1cblxuICAgIEJhci5wcm90b3R5cGUuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldEVsZW1lbnQ7XG4gICAgICBpZiAodGhpcy5lbCA9PSBudWxsKSB7XG4gICAgICAgIHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMudGFyZ2V0KTtcbiAgICAgICAgaWYgKCF0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IE5vVGFyZ2V0RXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmVsLmNsYXNzTmFtZSA9IFwicGFjZSBwYWNlLWFjdGl2ZVwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoL3BhY2UtZG9uZS9nLCAnJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lICs9ICcgcGFjZS1ydW5uaW5nJztcbiAgICAgICAgdGhpcy5lbC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cInBhY2UtcHJvZ3Jlc3NcIj5cXG4gIDxkaXYgY2xhc3M9XCJwYWNlLXByb2dyZXNzLWlubmVyXCI+PC9kaXY+XFxuPC9kaXY+XFxuPGRpdiBjbGFzcz1cInBhY2UtYWN0aXZpdHlcIj48L2Rpdj4nO1xuICAgICAgICBpZiAodGFyZ2V0RWxlbWVudC5maXJzdENoaWxkICE9IG51bGwpIHtcbiAgICAgICAgICB0YXJnZXRFbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLmVsLCB0YXJnZXRFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVsO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVsO1xuICAgICAgZWwgPSB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKCdwYWNlLWFjdGl2ZScsICcnKTtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSAnIHBhY2UtaW5hY3RpdmUnO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgPSBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZS5yZXBsYWNlKCdwYWNlLXJ1bm5pbmcnLCAnJyk7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgKz0gJyBwYWNlLWRvbmUnO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKHByb2cpIHtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBwcm9nO1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyKCk7XG4gICAgfTtcblxuICAgIEJhci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmdldEVsZW1lbnQoKSk7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgTm9UYXJnZXRFcnJvciA9IF9lcnJvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVsID0gdm9pZCAwO1xuICAgIH07XG5cbiAgICBCYXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGVsLCBrZXksIHByb2dyZXNzU3RyLCB0cmFuc2Zvcm0sIF9qLCBfbGVuMSwgX3JlZjI7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnRhcmdldCkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgdHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUzZChcIiArIHRoaXMucHJvZ3Jlc3MgKyBcIiUsIDAsIDApXCI7XG4gICAgICBfcmVmMiA9IFsnd2Via2l0VHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJywgJ3RyYW5zZm9ybSddO1xuICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgIGtleSA9IF9yZWYyW19qXTtcbiAgICAgICAgZWwuY2hpbGRyZW5bMF0uc3R5bGVba2V5XSA9IHRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5sYXN0UmVuZGVyZWRQcm9ncmVzcyB8fCB0aGlzLmxhc3RSZW5kZXJlZFByb2dyZXNzIHwgMCAhPT0gdGhpcy5wcm9ncmVzcyB8IDApIHtcbiAgICAgICAgZWwuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdkYXRhLXByb2dyZXNzLXRleHQnLCBcIlwiICsgKHRoaXMucHJvZ3Jlc3MgfCAwKSArIFwiJVwiKTtcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MgPj0gMTAwKSB7XG4gICAgICAgICAgcHJvZ3Jlc3NTdHIgPSAnOTknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2dyZXNzU3RyID0gdGhpcy5wcm9ncmVzcyA8IDEwID8gXCIwXCIgOiBcIlwiO1xuICAgICAgICAgIHByb2dyZXNzU3RyICs9IHRoaXMucHJvZ3Jlc3MgfCAwO1xuICAgICAgICB9XG4gICAgICAgIGVsLmNoaWxkcmVuWzBdLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9ncmVzcycsIFwiXCIgKyBwcm9ncmVzc1N0cik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5sYXN0UmVuZGVyZWRQcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3M7XG4gICAgfTtcblxuICAgIEJhci5wcm90b3R5cGUuZG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3MgPj0gMTAwO1xuICAgIH07XG5cbiAgICByZXR1cm4gQmFyO1xuXG4gIH0pKCk7XG5cbiAgRXZlbnRzID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50cygpIHtcbiAgICAgIHRoaXMuYmluZGluZ3MgPSB7fTtcbiAgICB9XG5cbiAgICBFdmVudHMucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcbiAgICAgIHZhciBiaW5kaW5nLCBfaiwgX2xlbjEsIF9yZWYyLCBfcmVzdWx0cztcbiAgICAgIGlmICh0aGlzLmJpbmRpbmdzW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgX3JlZjIgPSB0aGlzLmJpbmRpbmdzW25hbWVdO1xuICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgICBiaW5kaW5nID0gX3JlZjJbX2pdO1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2goYmluZGluZy5jYWxsKHRoaXMsIHZhbCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRXZlbnRzLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gICAgICB2YXIgX2Jhc2U7XG4gICAgICBpZiAoKF9iYXNlID0gdGhpcy5iaW5kaW5ncylbbmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBfYmFzZVtuYW1lXSA9IFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYmluZGluZ3NbbmFtZV0ucHVzaChmbik7XG4gICAgfTtcblxuICAgIHJldHVybiBFdmVudHM7XG5cbiAgfSkoKTtcblxuICBfWE1MSHR0cFJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3Q7XG5cbiAgX1hEb21haW5SZXF1ZXN0ID0gd2luZG93LlhEb21haW5SZXF1ZXN0O1xuXG4gIF9XZWJTb2NrZXQgPSB3aW5kb3cuV2ViU29ja2V0O1xuXG4gIGV4dGVuZE5hdGl2ZSA9IGZ1bmN0aW9uKHRvLCBmcm9tKSB7XG4gICAgdmFyIGUsIGtleSwgX3Jlc3VsdHM7XG4gICAgX3Jlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGtleSBpbiBmcm9tLnByb3RvdHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCh0b1trZXldID09IG51bGwpICYmIHR5cGVvZiBmcm9tW2tleV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChPYmplY3QuZGVmaW5lUHJvcGVydHkodG8sIGtleSwge1xuICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcm9tLnByb3RvdHlwZVtrZXldO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0b1trZXldID0gZnJvbS5wcm90b3R5cGVba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICAgIGUgPSBfZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfcmVzdWx0cztcbiAgfTtcblxuICBpZ25vcmVTdGFjayA9IFtdO1xuXG4gIFBhY2UuaWdub3JlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGZuLCByZXQ7XG4gICAgZm4gPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGlnbm9yZVN0YWNrLnVuc2hpZnQoJ2lnbm9yZScpO1xuICAgIHJldCA9IGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIGlnbm9yZVN0YWNrLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICBQYWNlLnRyYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGZuLCByZXQ7XG4gICAgZm4gPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGlnbm9yZVN0YWNrLnVuc2hpZnQoJ3RyYWNrJyk7XG4gICAgcmV0ID0gZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgaWdub3JlU3RhY2suc2hpZnQoKTtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIHNob3VsZFRyYWNrID0gZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIF9yZWYyO1xuICAgIGlmIChtZXRob2QgPT0gbnVsbCkge1xuICAgICAgbWV0aG9kID0gJ0dFVCc7XG4gICAgfVxuICAgIGlmIChpZ25vcmVTdGFja1swXSA9PT0gJ3RyYWNrJykge1xuICAgICAgcmV0dXJuICdmb3JjZSc7XG4gICAgfVxuICAgIGlmICghaWdub3JlU3RhY2subGVuZ3RoICYmIG9wdGlvbnMuYWpheCkge1xuICAgICAgaWYgKG1ldGhvZCA9PT0gJ3NvY2tldCcgJiYgb3B0aW9ucy5hamF4LnRyYWNrV2ViU29ja2V0cykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoX3JlZjIgPSBtZXRob2QudG9VcHBlckNhc2UoKSwgX19pbmRleE9mLmNhbGwob3B0aW9ucy5hamF4LnRyYWNrTWV0aG9kcywgX3JlZjIpID49IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBSZXF1ZXN0SW50ZXJjZXB0ID0gKGZ1bmN0aW9uKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSZXF1ZXN0SW50ZXJjZXB0LCBfc3VwZXIpO1xuXG4gICAgZnVuY3Rpb24gUmVxdWVzdEludGVyY2VwdCgpIHtcbiAgICAgIHZhciBtb25pdG9yWEhSLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICBSZXF1ZXN0SW50ZXJjZXB0Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgbW9uaXRvclhIUiA9IGZ1bmN0aW9uKHJlcSkge1xuICAgICAgICB2YXIgX29wZW47XG4gICAgICAgIF9vcGVuID0gcmVxLm9wZW47XG4gICAgICAgIHJldHVybiByZXEub3BlbiA9IGZ1bmN0aW9uKHR5cGUsIHVybCwgYXN5bmMpIHtcbiAgICAgICAgICBpZiAoc2hvdWxkVHJhY2sodHlwZSkpIHtcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXIoJ3JlcXVlc3QnLCB7XG4gICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICByZXF1ZXN0OiByZXFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gX29wZW4uYXBwbHkocmVxLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA9IGZ1bmN0aW9uKGZsYWdzKSB7XG4gICAgICAgIHZhciByZXE7XG4gICAgICAgIHJlcSA9IG5ldyBfWE1MSHR0cFJlcXVlc3QoZmxhZ3MpO1xuICAgICAgICBtb25pdG9yWEhSKHJlcSk7XG4gICAgICAgIHJldHVybiByZXE7XG4gICAgICB9O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZXh0ZW5kTmF0aXZlKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCwgX1hNTEh0dHBSZXF1ZXN0KTtcbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge31cbiAgICAgIGlmIChfWERvbWFpblJlcXVlc3QgIT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcmVxO1xuICAgICAgICAgIHJlcSA9IG5ldyBfWERvbWFpblJlcXVlc3Q7XG4gICAgICAgICAgbW9uaXRvclhIUihyZXEpO1xuICAgICAgICAgIHJldHVybiByZXE7XG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXh0ZW5kTmF0aXZlKHdpbmRvdy5YRG9tYWluUmVxdWVzdCwgX1hEb21haW5SZXF1ZXN0KTtcbiAgICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7fVxuICAgICAgfVxuICAgICAgaWYgKChfV2ViU29ja2V0ICE9IG51bGwpICYmIG9wdGlvbnMuYWpheC50cmFja1dlYlNvY2tldHMpIHtcbiAgICAgICAgd2luZG93LldlYlNvY2tldCA9IGZ1bmN0aW9uKHVybCwgcHJvdG9jb2xzKSB7XG4gICAgICAgICAgdmFyIHJlcTtcbiAgICAgICAgICBpZiAocHJvdG9jb2xzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcSA9IG5ldyBfV2ViU29ja2V0KHVybCwgcHJvdG9jb2xzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxID0gbmV3IF9XZWJTb2NrZXQodXJsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNob3VsZFRyYWNrKCdzb2NrZXQnKSkge1xuICAgICAgICAgICAgX3RoaXMudHJpZ2dlcigncmVxdWVzdCcsIHtcbiAgICAgICAgICAgICAgdHlwZTogJ3NvY2tldCcsXG4gICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICBwcm90b2NvbHM6IHByb3RvY29scyxcbiAgICAgICAgICAgICAgcmVxdWVzdDogcmVxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBleHRlbmROYXRpdmUod2luZG93LldlYlNvY2tldCwgX1dlYlNvY2tldCk7XG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge31cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUmVxdWVzdEludGVyY2VwdDtcblxuICB9KShFdmVudHMpO1xuXG4gIF9pbnRlcmNlcHQgPSBudWxsO1xuXG4gIGdldEludGVyY2VwdCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChfaW50ZXJjZXB0ID09IG51bGwpIHtcbiAgICAgIF9pbnRlcmNlcHQgPSBuZXcgUmVxdWVzdEludGVyY2VwdDtcbiAgICB9XG4gICAgcmV0dXJuIF9pbnRlcmNlcHQ7XG4gIH07XG5cbiAgc2hvdWxkSWdub3JlVVJMID0gZnVuY3Rpb24odXJsKSB7XG4gICAgdmFyIHBhdHRlcm4sIF9qLCBfbGVuMSwgX3JlZjI7XG4gICAgX3JlZjIgPSBvcHRpb25zLmFqYXguaWdub3JlVVJMcztcbiAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgIHBhdHRlcm4gPSBfcmVmMltfal07XG4gICAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh1cmwuaW5kZXhPZihwYXR0ZXJuKSAhPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBhdHRlcm4udGVzdCh1cmwpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGdldEludGVyY2VwdCgpLm9uKCdyZXF1ZXN0JywgZnVuY3Rpb24oX2FyZykge1xuICAgIHZhciBhZnRlciwgYXJncywgcmVxdWVzdCwgdHlwZSwgdXJsO1xuICAgIHR5cGUgPSBfYXJnLnR5cGUsIHJlcXVlc3QgPSBfYXJnLnJlcXVlc3QsIHVybCA9IF9hcmcudXJsO1xuICAgIGlmIChzaG91bGRJZ25vcmVVUkwodXJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIVBhY2UucnVubmluZyAmJiAob3B0aW9ucy5yZXN0YXJ0T25SZXF1ZXN0QWZ0ZXIgIT09IGZhbHNlIHx8IHNob3VsZFRyYWNrKHR5cGUpID09PSAnZm9yY2UnKSkge1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGFmdGVyID0gb3B0aW9ucy5yZXN0YXJ0T25SZXF1ZXN0QWZ0ZXIgfHwgMDtcbiAgICAgIGlmICh0eXBlb2YgYWZ0ZXIgPT09ICdib29sZWFuJykge1xuICAgICAgICBhZnRlciA9IDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN0aWxsQWN0aXZlLCBfaiwgX2xlbjEsIF9yZWYyLCBfcmVmMywgX3Jlc3VsdHM7XG4gICAgICAgIGlmICh0eXBlID09PSAnc29ja2V0Jykge1xuICAgICAgICAgIHN0aWxsQWN0aXZlID0gcmVxdWVzdC5yZWFkeVN0YXRlIDwgMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGlsbEFjdGl2ZSA9ICgwIDwgKF9yZWYyID0gcmVxdWVzdC5yZWFkeVN0YXRlKSAmJiBfcmVmMiA8IDQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGlsbEFjdGl2ZSkge1xuICAgICAgICAgIFBhY2UucmVzdGFydCgpO1xuICAgICAgICAgIF9yZWYzID0gUGFjZS5zb3VyY2VzO1xuICAgICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjMubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgICBzb3VyY2UgPSBfcmVmM1tfal07XG4gICAgICAgICAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgQWpheE1vbml0b3IpIHtcbiAgICAgICAgICAgICAgc291cmNlLndhdGNoLmFwcGx5KHNvdXJjZSwgYXJncyk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgIH1cbiAgICAgIH0sIGFmdGVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIEFqYXhNb25pdG9yID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEFqYXhNb25pdG9yKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICAgIGdldEludGVyY2VwdCgpLm9uKCdyZXF1ZXN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy53YXRjaC5hcHBseShfdGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIEFqYXhNb25pdG9yLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uKF9hcmcpIHtcbiAgICAgIHZhciByZXF1ZXN0LCB0cmFja2VyLCB0eXBlLCB1cmw7XG4gICAgICB0eXBlID0gX2FyZy50eXBlLCByZXF1ZXN0ID0gX2FyZy5yZXF1ZXN0LCB1cmwgPSBfYXJnLnVybDtcbiAgICAgIGlmIChzaG91bGRJZ25vcmVVUkwodXJsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZSA9PT0gJ3NvY2tldCcpIHtcbiAgICAgICAgdHJhY2tlciA9IG5ldyBTb2NrZXRSZXF1ZXN0VHJhY2tlcihyZXF1ZXN0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYWNrZXIgPSBuZXcgWEhSUmVxdWVzdFRyYWNrZXIocmVxdWVzdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5wdXNoKHRyYWNrZXIpO1xuICAgIH07XG5cbiAgICByZXR1cm4gQWpheE1vbml0b3I7XG5cbiAgfSkoKTtcblxuICBYSFJSZXF1ZXN0VHJhY2tlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBYSFJSZXF1ZXN0VHJhY2tlcihyZXF1ZXN0KSB7XG4gICAgICB2YXIgZXZlbnQsIHNpemUsIF9qLCBfbGVuMSwgX29ucmVhZHlzdGF0ZWNoYW5nZSwgX3JlZjIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgaWYgKHdpbmRvdy5Qcm9ncmVzc0V2ZW50ICE9IG51bGwpIHtcbiAgICAgICAgc2l6ZSA9IG51bGw7XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICBpZiAoZXZ0Lmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5wcm9ncmVzcyA9IDEwMCAqIGV2dC5sb2FkZWQgLyBldnQudG90YWw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5wcm9ncmVzcyA9IF90aGlzLnByb2dyZXNzICsgKDEwMCAtIF90aGlzLnByb2dyZXNzKSAvIDI7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIF9yZWYyID0gWydsb2FkJywgJ2Fib3J0JywgJ3RpbWVvdXQnLCAnZXJyb3InXTtcbiAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgZXZlbnQgPSBfcmVmMltfal07XG4gICAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZTtcbiAgICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgX3JlZjM7XG4gICAgICAgICAgaWYgKChfcmVmMyA9IHJlcXVlc3QucmVhZHlTdGF0ZSkgPT09IDAgfHwgX3JlZjMgPT09IDQpIHtcbiAgICAgICAgICAgIF90aGlzLnByb2dyZXNzID0gMTAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSAzKSB7XG4gICAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IDUwO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHlwZW9mIF9vbnJlYWR5c3RhdGVjaGFuZ2UgPT09IFwiZnVuY3Rpb25cIiA/IF9vbnJlYWR5c3RhdGVjaGFuZ2UuYXBwbHkobnVsbCwgYXJndW1lbnRzKSA6IHZvaWQgMDtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gWEhSUmVxdWVzdFRyYWNrZXI7XG5cbiAgfSkoKTtcblxuICBTb2NrZXRSZXF1ZXN0VHJhY2tlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTb2NrZXRSZXF1ZXN0VHJhY2tlcihyZXF1ZXN0KSB7XG4gICAgICB2YXIgZXZlbnQsIF9qLCBfbGVuMSwgX3JlZjIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgX3JlZjIgPSBbJ2Vycm9yJywgJ29wZW4nXTtcbiAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICBldmVudCA9IF9yZWYyW19qXTtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gU29ja2V0UmVxdWVzdFRyYWNrZXI7XG5cbiAgfSkoKTtcblxuICBFbGVtZW50TW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFbGVtZW50TW9uaXRvcihvcHRpb25zKSB7XG4gICAgICB2YXIgc2VsZWN0b3IsIF9qLCBfbGVuMSwgX3JlZjI7XG4gICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICAgIGlmIChvcHRpb25zLnNlbGVjdG9ycyA9PSBudWxsKSB7XG4gICAgICAgIG9wdGlvbnMuc2VsZWN0b3JzID0gW107XG4gICAgICB9XG4gICAgICBfcmVmMiA9IG9wdGlvbnMuc2VsZWN0b3JzO1xuICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgIHNlbGVjdG9yID0gX3JlZjJbX2pdO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnB1c2gobmV3IEVsZW1lbnRUcmFja2VyKHNlbGVjdG9yKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIEVsZW1lbnRNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgRWxlbWVudFRyYWNrZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRWxlbWVudFRyYWNrZXIoc2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICAgICAgdGhpcy5jaGVjaygpO1xuICAgIH1cblxuICAgIEVsZW1lbnRUcmFja2VyLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2VsZWN0b3IpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvbmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuY2hlY2soKTtcbiAgICAgICAgfSksIG9wdGlvbnMuZWxlbWVudHMuY2hlY2tJbnRlcnZhbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIEVsZW1lbnRUcmFja2VyLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVsZW1lbnRUcmFja2VyO1xuXG4gIH0pKCk7XG5cbiAgRG9jdW1lbnRNb25pdG9yID0gKGZ1bmN0aW9uKCkge1xuICAgIERvY3VtZW50TW9uaXRvci5wcm90b3R5cGUuc3RhdGVzID0ge1xuICAgICAgbG9hZGluZzogMCxcbiAgICAgIGludGVyYWN0aXZlOiA1MCxcbiAgICAgIGNvbXBsZXRlOiAxMDBcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gRG9jdW1lbnRNb25pdG9yKCkge1xuICAgICAgdmFyIF9vbnJlYWR5c3RhdGVjaGFuZ2UsIF9yZWYyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gKF9yZWYyID0gdGhpcy5zdGF0ZXNbZG9jdW1lbnQucmVhZHlTdGF0ZV0pICE9IG51bGwgPyBfcmVmMiA6IDEwMDtcbiAgICAgIF9vbnJlYWR5c3RhdGVjaGFuZ2UgPSBkb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2U7XG4gICAgICBkb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF90aGlzLnN0YXRlc1tkb2N1bWVudC5yZWFkeVN0YXRlXSAhPSBudWxsKSB7XG4gICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSBfdGhpcy5zdGF0ZXNbZG9jdW1lbnQucmVhZHlTdGF0ZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBfb25yZWFkeXN0YXRlY2hhbmdlID09PSBcImZ1bmN0aW9uXCIgPyBfb25yZWFkeXN0YXRlY2hhbmdlLmFwcGx5KG51bGwsIGFyZ3VtZW50cykgOiB2b2lkIDA7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBEb2N1bWVudE1vbml0b3I7XG5cbiAgfSkoKTtcblxuICBFdmVudExhZ01vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRMYWdNb25pdG9yKCkge1xuICAgICAgdmFyIGF2ZywgaW50ZXJ2YWwsIGxhc3QsIHBvaW50cywgc2FtcGxlcyxcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICBhdmcgPSAwO1xuICAgICAgc2FtcGxlcyA9IFtdO1xuICAgICAgcG9pbnRzID0gMDtcbiAgICAgIGxhc3QgPSBub3coKTtcbiAgICAgIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaWZmO1xuICAgICAgICBkaWZmID0gbm93KCkgLSBsYXN0IC0gNTA7XG4gICAgICAgIGxhc3QgPSBub3coKTtcbiAgICAgICAgc2FtcGxlcy5wdXNoKGRpZmYpO1xuICAgICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPiBvcHRpb25zLmV2ZW50TGFnLnNhbXBsZUNvdW50KSB7XG4gICAgICAgICAgc2FtcGxlcy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIGF2ZyA9IGF2Z0FtcGxpdHVkZShzYW1wbGVzKTtcbiAgICAgICAgaWYgKCsrcG9pbnRzID49IG9wdGlvbnMuZXZlbnRMYWcubWluU2FtcGxlcyAmJiBhdmcgPCBvcHRpb25zLmV2ZW50TGFnLmxhZ1RocmVzaG9sZCkge1xuICAgICAgICAgIF90aGlzLnByb2dyZXNzID0gMTAwO1xuICAgICAgICAgIHJldHVybiBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMucHJvZ3Jlc3MgPSAxMDAgKiAoMyAvIChhdmcgKyAzKSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gRXZlbnRMYWdNb25pdG9yO1xuXG4gIH0pKCk7XG5cbiAgU2NhbGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFNjYWxlcihzb3VyY2UpIHtcbiAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgdGhpcy5sYXN0ID0gdGhpcy5zaW5jZUxhc3RVcGRhdGUgPSAwO1xuICAgICAgdGhpcy5yYXRlID0gb3B0aW9ucy5pbml0aWFsUmF0ZTtcbiAgICAgIHRoaXMuY2F0Y2h1cCA9IDA7XG4gICAgICB0aGlzLnByb2dyZXNzID0gdGhpcy5sYXN0UHJvZ3Jlc3MgPSAwO1xuICAgICAgaWYgKHRoaXMuc291cmNlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9IHJlc3VsdCh0aGlzLnNvdXJjZSwgJ3Byb2dyZXNzJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgU2NhbGVyLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24oZnJhbWVUaW1lLCB2YWwpIHtcbiAgICAgIHZhciBzY2FsaW5nO1xuICAgICAgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgICAgIHZhbCA9IHJlc3VsdCh0aGlzLnNvdXJjZSwgJ3Byb2dyZXNzJyk7XG4gICAgICB9XG4gICAgICBpZiAodmFsID49IDEwMCkge1xuICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHZhbCA9PT0gdGhpcy5sYXN0KSB7XG4gICAgICAgIHRoaXMuc2luY2VMYXN0VXBkYXRlICs9IGZyYW1lVGltZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnNpbmNlTGFzdFVwZGF0ZSkge1xuICAgICAgICAgIHRoaXMucmF0ZSA9ICh2YWwgLSB0aGlzLmxhc3QpIC8gdGhpcy5zaW5jZUxhc3RVcGRhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYXRjaHVwID0gKHZhbCAtIHRoaXMucHJvZ3Jlc3MpIC8gb3B0aW9ucy5jYXRjaHVwVGltZTtcbiAgICAgICAgdGhpcy5zaW5jZUxhc3RVcGRhdGUgPSAwO1xuICAgICAgICB0aGlzLmxhc3QgPSB2YWw7XG4gICAgICB9XG4gICAgICBpZiAodmFsID4gdGhpcy5wcm9ncmVzcykge1xuICAgICAgICB0aGlzLnByb2dyZXNzICs9IHRoaXMuY2F0Y2h1cCAqIGZyYW1lVGltZTtcbiAgICAgIH1cbiAgICAgIHNjYWxpbmcgPSAxIC0gTWF0aC5wb3codGhpcy5wcm9ncmVzcyAvIDEwMCwgb3B0aW9ucy5lYXNlRmFjdG9yKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgKz0gc2NhbGluZyAqIHRoaXMucmF0ZSAqIGZyYW1lVGltZTtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1pbih0aGlzLmxhc3RQcm9ncmVzcyArIG9wdGlvbnMubWF4UHJvZ3Jlc3NQZXJGcmFtZSwgdGhpcy5wcm9ncmVzcyk7XG4gICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5tYXgoMCwgdGhpcy5wcm9ncmVzcyk7XG4gICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5taW4oMTAwLCB0aGlzLnByb2dyZXNzKTtcbiAgICAgIHRoaXMubGFzdFByb2dyZXNzID0gdGhpcy5wcm9ncmVzcztcbiAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzO1xuICAgIH07XG5cbiAgICByZXR1cm4gU2NhbGVyO1xuXG4gIH0pKCk7XG5cbiAgc291cmNlcyA9IG51bGw7XG5cbiAgc2NhbGVycyA9IG51bGw7XG5cbiAgYmFyID0gbnVsbDtcblxuICB1bmlTY2FsZXIgPSBudWxsO1xuXG4gIGFuaW1hdGlvbiA9IG51bGw7XG5cbiAgY2FuY2VsQW5pbWF0aW9uID0gbnVsbDtcblxuICBQYWNlLnJ1bm5pbmcgPSBmYWxzZTtcblxuICBoYW5kbGVQdXNoU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAob3B0aW9ucy5yZXN0YXJ0T25QdXNoU3RhdGUpIHtcbiAgICAgIHJldHVybiBQYWNlLnJlc3RhcnQoKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSAhPSBudWxsKSB7XG4gICAgX3B1c2hTdGF0ZSA9IHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZTtcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGhhbmRsZVB1c2hTdGF0ZSgpO1xuICAgICAgcmV0dXJuIF9wdXNoU3RhdGUuYXBwbHkod2luZG93Lmhpc3RvcnksIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmICh3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgIT0gbnVsbCkge1xuICAgIF9yZXBsYWNlU3RhdGUgPSB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGU7XG4gICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVQdXNoU3RhdGUoKTtcbiAgICAgIHJldHVybiBfcmVwbGFjZVN0YXRlLmFwcGx5KHdpbmRvdy5oaXN0b3J5LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBTT1VSQ0VfS0VZUyA9IHtcbiAgICBhamF4OiBBamF4TW9uaXRvcixcbiAgICBlbGVtZW50czogRWxlbWVudE1vbml0b3IsXG4gICAgZG9jdW1lbnQ6IERvY3VtZW50TW9uaXRvcixcbiAgICBldmVudExhZzogRXZlbnRMYWdNb25pdG9yXG4gIH07XG5cbiAgKGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdHlwZSwgX2osIF9rLCBfbGVuMSwgX2xlbjIsIF9yZWYyLCBfcmVmMywgX3JlZjQ7XG4gICAgUGFjZS5zb3VyY2VzID0gc291cmNlcyA9IFtdO1xuICAgIF9yZWYyID0gWydhamF4JywgJ2VsZW1lbnRzJywgJ2RvY3VtZW50JywgJ2V2ZW50TGFnJ107XG4gICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICB0eXBlID0gX3JlZjJbX2pdO1xuICAgICAgaWYgKG9wdGlvbnNbdHlwZV0gIT09IGZhbHNlKSB7XG4gICAgICAgIHNvdXJjZXMucHVzaChuZXcgU09VUkNFX0tFWVNbdHlwZV0ob3B0aW9uc1t0eXBlXSkpO1xuICAgICAgfVxuICAgIH1cbiAgICBfcmVmNCA9IChfcmVmMyA9IG9wdGlvbnMuZXh0cmFTb3VyY2VzKSAhPSBudWxsID8gX3JlZjMgOiBbXTtcbiAgICBmb3IgKF9rID0gMCwgX2xlbjIgPSBfcmVmNC5sZW5ndGg7IF9rIDwgX2xlbjI7IF9rKyspIHtcbiAgICAgIHNvdXJjZSA9IF9yZWY0W19rXTtcbiAgICAgIHNvdXJjZXMucHVzaChuZXcgc291cmNlKG9wdGlvbnMpKTtcbiAgICB9XG4gICAgUGFjZS5iYXIgPSBiYXIgPSBuZXcgQmFyO1xuICAgIHNjYWxlcnMgPSBbXTtcbiAgICByZXR1cm4gdW5pU2NhbGVyID0gbmV3IFNjYWxlcjtcbiAgfSkoKTtcblxuICBQYWNlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICBQYWNlLnRyaWdnZXIoJ3N0b3AnKTtcbiAgICBQYWNlLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICBiYXIuZGVzdHJveSgpO1xuICAgIGNhbmNlbEFuaW1hdGlvbiA9IHRydWU7XG4gICAgaWYgKGFuaW1hdGlvbiAhPSBudWxsKSB7XG4gICAgICBpZiAodHlwZW9mIGNhbmNlbEFuaW1hdGlvbkZyYW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKTtcbiAgICAgIH1cbiAgICAgIGFuaW1hdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIHJldHVybiBpbml0KCk7XG4gIH07XG5cbiAgUGFjZS5yZXN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgUGFjZS50cmlnZ2VyKCdyZXN0YXJ0Jyk7XG4gICAgUGFjZS5zdG9wKCk7XG4gICAgcmV0dXJuIFBhY2Uuc3RhcnQoKTtcbiAgfTtcblxuICBQYWNlLmdvID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YXJ0O1xuICAgIFBhY2UucnVubmluZyA9IHRydWU7XG4gICAgYmFyLnJlbmRlcigpO1xuICAgIHN0YXJ0ID0gbm93KCk7XG4gICAgY2FuY2VsQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgcmV0dXJuIGFuaW1hdGlvbiA9IHJ1bkFuaW1hdGlvbihmdW5jdGlvbihmcmFtZVRpbWUsIGVucXVldWVOZXh0RnJhbWUpIHtcbiAgICAgIHZhciBhdmcsIGNvdW50LCBkb25lLCBlbGVtZW50LCBlbGVtZW50cywgaSwgaiwgcmVtYWluaW5nLCBzY2FsZXIsIHNjYWxlckxpc3QsIHN1bSwgX2osIF9rLCBfbGVuMSwgX2xlbjIsIF9yZWYyO1xuICAgICAgcmVtYWluaW5nID0gMTAwIC0gYmFyLnByb2dyZXNzO1xuICAgICAgY291bnQgPSBzdW0gPSAwO1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBmb3IgKGkgPSBfaiA9IDAsIF9sZW4xID0gc291cmNlcy5sZW5ndGg7IF9qIDwgX2xlbjE7IGkgPSArK19qKSB7XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZXNbaV07XG4gICAgICAgIHNjYWxlckxpc3QgPSBzY2FsZXJzW2ldICE9IG51bGwgPyBzY2FsZXJzW2ldIDogc2NhbGVyc1tpXSA9IFtdO1xuICAgICAgICBlbGVtZW50cyA9IChfcmVmMiA9IHNvdXJjZS5lbGVtZW50cykgIT0gbnVsbCA/IF9yZWYyIDogW3NvdXJjZV07XG4gICAgICAgIGZvciAoaiA9IF9rID0gMCwgX2xlbjIgPSBlbGVtZW50cy5sZW5ndGg7IF9rIDwgX2xlbjI7IGogPSArK19rKSB7XG4gICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnRzW2pdO1xuICAgICAgICAgIHNjYWxlciA9IHNjYWxlckxpc3Rbal0gIT0gbnVsbCA/IHNjYWxlckxpc3Rbal0gOiBzY2FsZXJMaXN0W2pdID0gbmV3IFNjYWxlcihlbGVtZW50KTtcbiAgICAgICAgICBkb25lICY9IHNjYWxlci5kb25lO1xuICAgICAgICAgIGlmIChzY2FsZXIuZG9uZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgc3VtICs9IHNjYWxlci50aWNrKGZyYW1lVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF2ZyA9IHN1bSAvIGNvdW50O1xuICAgICAgYmFyLnVwZGF0ZSh1bmlTY2FsZXIudGljayhmcmFtZVRpbWUsIGF2ZykpO1xuICAgICAgaWYgKGJhci5kb25lKCkgfHwgZG9uZSB8fCBjYW5jZWxBbmltYXRpb24pIHtcbiAgICAgICAgYmFyLnVwZGF0ZSgxMDApO1xuICAgICAgICBQYWNlLnRyaWdnZXIoJ2RvbmUnKTtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgYmFyLmZpbmlzaCgpO1xuICAgICAgICAgIFBhY2UucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBQYWNlLnRyaWdnZXIoJ2hpZGUnKTtcbiAgICAgICAgfSwgTWF0aC5tYXgob3B0aW9ucy5naG9zdFRpbWUsIE1hdGgubWF4KG9wdGlvbnMubWluVGltZSAtIChub3coKSAtIHN0YXJ0KSwgMCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlbnF1ZXVlTmV4dEZyYW1lKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgUGFjZS5zdGFydCA9IGZ1bmN0aW9uKF9vcHRpb25zKSB7XG4gICAgZXh0ZW5kKG9wdGlvbnMsIF9vcHRpb25zKTtcbiAgICBQYWNlLnJ1bm5pbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBiYXIucmVuZGVyKCk7XG4gICAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgICBOb1RhcmdldEVycm9yID0gX2Vycm9yO1xuICAgIH1cbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWNlJykpIHtcbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KFBhY2Uuc3RhcnQsIDUwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUGFjZS50cmlnZ2VyKCdzdGFydCcpO1xuICAgICAgcmV0dXJuIFBhY2UuZ28oKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ3BhY2UnXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUGFjZTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFBhY2U7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wdGlvbnMuc3RhcnRPblBhZ2VMb2FkKSB7XG4gICAgICBQYWNlLnN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbn0pLmNhbGwodGhpcyk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wYWNlL3BhY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxuICogIERlcGVuZGVuY2llc1xuKi9cblxuICBpbXBvcnQgKiBhcyBLZWZpciBmcm9tICdrZWZpcidcbiAgaW1wb3J0IHsgYnVpbGRQYWdlLCBjb252ZXJ0QWxsUHJvcHNUb1B4IH0gZnJvbSAnLi91dGlscy9wYWdlLXV0aWxzLmpzJ1xuXG4vKlxuICogIEdsb2JhbHNcbiovXG5cbiAgY29uc3QgQ09OU1RBTlRTID0gcmVxdWlyZSgnLi9jb25zdGFudHMuanMnKVxuXG4gIC8vIGNvbnN0IFBST1BFUlRJRVMgPSBDT05TVEFOVFMuUFJPUEVSVElFU1xuICBjb25zdCBBTklNQVRJT05fVElNRSA9IENPTlNUQU5UUy5BTklNQVRJT05fVElNRVxuXG4gIGNvbnN0ICR3aW5kb3cgPSBDT05TVEFOVFMuV0lORE9XXG4gIGNvbnN0ICRib2R5aHRtbCA9IENPTlNUQU5UUy5CT0RZSFRNTFxuXG4gIGNvbnN0IElOSVRfU1RBVEUgPSBDT05TVEFOVFMuSU5JVF9TVEFURVxuXG4vKlxuICogIEluaXRpYWxpemVcbiovXG5cbiAgY29uc3Qgc3RhdGVJbml0aWFsaXplZCQgPSBLZWZpci5wb29sKClcblxuICBjb25zdCBpbml0U3RhdGUgPSBLZWZpci5zdHJlYW0oZW1pdHRlciA9PiB7XG4gICAgZW1pdHRlci5lbWl0KElOSVRfU1RBVEUpXG4gIH0pXG5cbiAgbW9kdWxlLmV4cG9ydHMuaW5pdCA9IChyZXRyZWl2ZWRLZXlGcmFtZXMpID0+IHtcbiAgICBjb25zdCBrZXlGcmFtZXNSZXRyZWl2ZWQkID0gS2VmaXIuc3RyZWFtKGVtaXR0ZXIgPT4ge1xuICAgICAgZW1pdHRlci5lbWl0KHJldHJlaXZlZEtleUZyYW1lcylcbiAgICB9KVxuXG4gICAgY29uc3Qga2V5RnJhbWVzTWFwcGVkVG9TdGF0ZSQgPSBrZXlGcmFtZXNSZXRyZWl2ZWQkXG4gICAgICAuZmxhdE1hcChrZXlmcmFtZXMgPT4gaW5pdFN0YXRlLm1hcChzdGF0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgICAgICBzLmtleWZyYW1lcyA9IGtleWZyYW1lc1xuICAgICAgICByZXR1cm4gc1xuICAgICAgfSkpXG4gICAgICAubWFwKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3QgcyA9IHN0YXRlXG4gICAgICAgIHMuY3VycmVudFdyYXBwZXIgPSBzLndyYXBwZXJzWzBdXG4gICAgICAgIHMuc2Nyb2xsVG9wID0gMFxuICAgICAgICByZXR1cm4gc1xuICAgICAgfSlcblxuICAgIHN0YXRlSW5pdGlhbGl6ZWQkLnBsdWcoa2V5RnJhbWVzTWFwcGVkVG9TdGF0ZSQpXG4gIH1cblxuLypcbiAqICBCdWlsZCBQYWdlXG4qL1xuXG4gIGNvbnN0IHdpbmRvd1Jlc2l6ZWQkID0gc3RhdGVJbml0aWFsaXplZCRcbiAgICAuZmxhdE1hcCgoc3RhdGUpID0+IEtlZmlyLmZyb21FdmVudHMoJHdpbmRvdywgJ3Jlc2l6ZScsICgpID0+IHN0YXRlKSlcbiAgICAudGhyb3R0bGUoQU5JTUFUSU9OX1RJTUUpXG5cbiAgY29uc3QgZGltZW5zaW9uc0NhbGN1bGF0ZWQkID0gS2VmaXIubWVyZ2UoW3N0YXRlSW5pdGlhbGl6ZWQkLCB3aW5kb3dSZXNpemVkJF0pXG4gICAgLm1hcChjYWxjdWxhdGVEaW1lbnNpb25zKVxuICAgIC5tYXAoY29udmVydEtleUZyYW1lcylcbiAgICAubWFwKGNhbGN1bGF0ZUtleUZyYW1lc0FuZEZvY3VzKVxuICAgIC5tYXAoc2V0SW5pdFdyYXBwZXIpXG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlRGltZW5zaW9ucyhzdGF0ZSkge1xuICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgIHMuc2Nyb2xsVG9wID0gTWF0aC5mbG9vcigkd2luZG93LnNjcm9sbFRvcCgpKVxuICAgIHMud2luZG93SGVpZ2h0ID0gJHdpbmRvdy5oZWlnaHQoKVxuICAgIHMud2luZG93V2lkdGggPSAkd2luZG93LndpZHRoKClcbiAgICByZXR1cm4gc1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydEtleUZyYW1lcyhzdGF0ZSkge1xuICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgIHMua2V5ZnJhbWVzID0gY29udmVydEFsbFByb3BzVG9QeChzLmtleWZyYW1lcywgcy53aW5kb3dXaWR0aCwgcy53aW5kb3dIZWlnaHQpXG4gICAgcmV0dXJuIHNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUtleUZyYW1lc0FuZEZvY3VzKHN0YXRlKSB7XG4gICAgY29uc3QgcyA9IHN0YXRlXG4gICAgY29uc3QgcGFnZUluZm8gPSBidWlsZFBhZ2Uoc3RhdGUua2V5ZnJhbWVzLCBzdGF0ZS53cmFwcGVycylcblxuICAgIHMuYm9keUhlaWdodCA9IHBhZ2VJbmZvLmJvZHlIZWlnaHRcbiAgICBzLndyYXBwZXJzID0gcGFnZUluZm8ud3JhcHBlcnNcblxuICAgIHMuZnJhbWVGb2N1cyA9IHBhZ2VJbmZvLmZyYW1lRm9jdXNcbiAgICAgIC5tYXAoaSA9PiBNYXRoLmZsb29yKGkpKVxuICAgICAgLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgICAgLy8gY2xlYXJzIGFueSBmcmFtZSBkdXBsaWNhdGVzLiBUT0RPOiBmaW5kIGJ1ZyB0aGF0IG1ha2VzIGZyYW1lIGR1cGxpY2F0ZXNcbiAgICAgICAgaWYgKGEuaW5kZXhPZihiKSA8IDApIGEucHVzaChiKVxuICAgICAgICByZXR1cm4gYVxuICAgICAgfSwgW10pXG5cbiAgICByZXR1cm4gc3RhdGVcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEluaXRXcmFwcGVyKHN0YXRlKSB7XG4gICAgY29uc3QgcyA9IHN0YXRlXG4gICAgcy5jdXJyZW50V3JhcHBlciA9IHMud3JhcHBlcnNbMF1cbiAgICByZXR1cm4gc1xuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMuZGltZW5zaW9uc0NhbGN1bGF0ZWQkID0gZGltZW5zaW9uc0NhbGN1bGF0ZWQkXG5cbi8qXG4gKiAgUG9zaXRpb24gbW92ZWRcbiovXG5cbiAgY29uc3Qgd2luZG93U2Nyb2xsZWQkID0gS2VmaXIuZnJvbUV2ZW50cygkd2luZG93LCAnc2Nyb2xsJylcbiAgICAudGhyb3R0bGUoQU5JTUFUSU9OX1RJTUUpXG5cbiAgY29uc3Qgc29tZXRoaW5nTW92ZWQkID0gS2VmaXIuZnJvbUV2ZW50cyh3aW5kb3csICdQT1NJVElPTl9DSEFOR0VEJylcblxuICBjb25zdCB3aW5kb3dzT3JQb3NpdGlvbkNoYW5nZWQkID0gZGltZW5zaW9uc0NhbGN1bGF0ZWQkXG4gICAgLmZsYXRNYXAoc3RhdGUgPT4gS2VmaXIubWVyZ2UoW3dpbmRvd1Njcm9sbGVkJCwgc29tZXRoaW5nTW92ZWQkXSlcbiAgICAgIC5tYXAoZSA9PiB7XG4gICAgICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgICAgICBzLmNoYW5nZWQgPSBlXG4gICAgICAgIHJldHVybiBzXG4gICAgICB9KVxuICAgIClcblxuICBjb25zdCBwb3NpdGlvbkNoYW5nZWQkID0gS2VmaXJcbiAgICAubWVyZ2UoW2RpbWVuc2lvbnNDYWxjdWxhdGVkJCwgd2luZG93c09yUG9zaXRpb25DaGFuZ2VkJF0pXG5cbi8qXG4gKiAgU3RhdGUgQ2hhbmdlZFxuKi9cblxuICAvLyBDYWxjdWxhdGUgY3VycmVudCBzdGF0ZVxuICBjb25zdCBjYWxjdWxhdGVkQ3VycmVudFN0YXRlJCA9IEtlZmlyXG4gICAgLm1lcmdlKFtkaW1lbnNpb25zQ2FsY3VsYXRlZCQsIHBvc2l0aW9uQ2hhbmdlZCRdKVxuICAgIC5tYXAoc2V0VG9wcylcbiAgICAubWFwKHNldEtleWZyYW1lKVxuICAgIC5tYXAoZ2V0U2xpZGVMb2NhdGlvbilcbiAgICAubWFwKHN0YXRlID0+IHtcbiAgICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgICAgcy5jdXJyZW50V3JhcHBlciA9IHMua2V5ZnJhbWVzW3MuY3VycmVudEtleWZyYW1lXS53cmFwcGVyXG4gICAgICByZXR1cm4gc1xuICAgIH0pXG5cbiAgZnVuY3Rpb24gc2V0VG9wcyhzdGF0ZSkge1xuICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgIHMuc2Nyb2xsVG9wID0gTWF0aC5mbG9vcigkd2luZG93LnNjcm9sbFRvcCgpKVxuICAgIHMucmVsYXRpdmVTY3JvbGxUb3AgPSBzLnNjcm9sbFRvcCAtIHMucHJldktleWZyYW1lc0R1cmF0aW9uc1xuICAgIHJldHVybiBzXG4gIH1cblxuICBmdW5jdGlvbiBzZXRLZXlmcmFtZShzdGF0ZSkge1xuICAgIGNvbnN0IHMgPSBzdGF0ZVxuICAgIGlmIChzLnNjcm9sbFRvcCA+IChzLmtleWZyYW1lc1tzLmN1cnJlbnRLZXlmcmFtZV0uZHVyYXRpb24gKyBzLnByZXZLZXlmcmFtZXNEdXJhdGlvbnMpKSB7XG4gICAgICBzLnByZXZLZXlmcmFtZXNEdXJhdGlvbnMgKz0gcy5rZXlmcmFtZXNbcy5jdXJyZW50S2V5ZnJhbWVdLmR1cmF0aW9uXG4gICAgICBzLmN1cnJlbnRLZXlmcmFtZSsrXG4gICAgfSBlbHNlIGlmIChzLnNjcm9sbFRvcCA8IHMucHJldktleWZyYW1lc0R1cmF0aW9ucykge1xuICAgICAgcy5jdXJyZW50S2V5ZnJhbWUtLVxuICAgICAgcy5wcmV2S2V5ZnJhbWVzRHVyYXRpb25zIC09IHMua2V5ZnJhbWVzW3MuY3VycmVudEtleWZyYW1lXS5kdXJhdGlvblxuICAgIH1cbiAgICByZXR1cm4gc1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2xpZGVMb2NhdGlvbihzdGF0ZSkge1xuICAgIGZ1bmN0aW9uIG51bWJlcklzQmV0d2VlbihhLCBiKSB7XG4gICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbi5hcHBseShNYXRoLCBbYSwgYl0pXG4gICAgICBjb25zdCBtYXggPSBNYXRoLm1heC5hcHBseShNYXRoLCBbYSwgYl0pXG4gICAgICByZXR1cm4gdGhpcyA+IG1pbiAmJiB0aGlzIDwgbWF4XG4gICAgfVxuXG4gICAgY29uc3QgcyA9IHN0YXRlXG5cbiAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSBzLmZyYW1lRm9jdXMubGVuZ3RoOyB4KyspIHtcbiAgICAgIGlmIChzLmZyYW1lRm9jdXNbeF0gPT09IHMuc2Nyb2xsVG9wKSB7XG4gICAgICAgIHMuY3VycmVudEZyYW1lID0gW3hdXG4gICAgICB9XG4gICAgICBpZiAobnVtYmVySXNCZXR3ZWVuLmNhbGwocy5zY3JvbGwsIHMuZnJhbWVGb2N1c1t4IC0gMV0sIHMuZnJhbWVGb2N1c1t4XSkpIHtcbiAgICAgICAgcy5jdXJyZW50RnJhbWUgPSBbeCAtIDEsIHhdXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzXG4gIH1cblxuICBjb25zdCB3cmFwcGVyQ2hhbmdlZCQgPSBjYWxjdWxhdGVkQ3VycmVudFN0YXRlJFxuICAgIC5tYXAoc3RhdGUgPT4gc3RhdGUuY3VycmVudFdyYXBwZXIpXG4gICAgLmRpZmYobnVsbCwgJycpXG4gICAgLmZpbHRlcihjdXJyZW50V3JhcHBlciA9PiBjdXJyZW50V3JhcHBlclswXSAhPT0gY3VycmVudFdyYXBwZXJbMV0pXG4gICAgLy8gLmRlbGF5KEFOSU1BVElPTl9USU1FKjIpIC8vIFRvIHdhaXQgZm9yIGZpcnN0IGFuaW1hdGlvbiBmcmFtZSB0byBzdGFydCBiZWZvcmUgc3dpdGNoaW5nXG5cbiAgbW9kdWxlLmV4cG9ydHMud3JhcHBlckNoYW5nZWQkID0gd3JhcHBlckNoYW5nZWQkXG5cbiAgY29uc3Qgc2Nyb2xsVG9wQ2hhbmdlZCQgPSBjYWxjdWxhdGVkQ3VycmVudFN0YXRlJFxuICAgIC5kaWZmKG51bGwsIHsgLy8gSGFjaywgZm9yIHNvbWUgcmVhc29uIElOSVRfU1RBVEUgaXNuJ3QgY29taW5nIGluIHByb3Blcmx5XG4gICAgICB3cmFwcGVyczogW10sXG4gICAgICBjdXJyZW50V3JhcHBlcjogdW5kZWZpbmVkLFxuXG4gICAgICBzY3JvbGxUb3A6IDAsXG4gICAgICByZWxhdGl2ZVNjcm9sbFRvcDogMCxcblxuICAgICAga2V5ZnJhbWVzOiB1bmRlZmluZWQsXG4gICAgICBwcmV2S2V5ZnJhbWVzRHVyYXRpb25zOiAwLFxuICAgICAgY3VycmVudEtleWZyYW1lOiAwLFxuXG4gICAgICBmcmFtZUZvY3VzOiBbXSxcbiAgICAgIGN1cnJlbnRGb2N1czogMCxcbiAgICAgIGN1cnJlbnRJbnRlcnZhbDogMCxcblxuICAgICAgc2Nyb2xsVGltZW91dElEOiAwLFxuXG4gICAgICBib2R5SGVpZ2h0OiAwLFxuICAgICAgd2luZG93SGVpZ2h0OiAwLFxuICAgICAgd2luZG93V2lkdGg6IDAsXG4gICAgfSlcblxuICBtb2R1bGUuZXhwb3J0cy5zY3JvbGxUb3BDaGFuZ2VkJCA9IHNjcm9sbFRvcENoYW5nZWQkXG4gIC8vIHNjcm9sbFRvcENoYW5nZWQkLmxvZygpXG5cbi8qXG4gKiAgQWN0aW9uc1xuKi9cblxuICAvLyBtb2R1bGUuZXhwb3J0cy5nZXQgPSAoKSA9PiBzdGF0ZVxuICAvLyAgIHJldHVybiBzdGF0ZVxuICAvLyB9XG5cbiAgbW9kdWxlLmV4cG9ydHMuYWN0aW9uID0gKGFjdGlvbikgPT4ge1xuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgJHdpbmRvdy50cmlnZ2VyKCdGT0NVU19ORVhUJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3ByZXZpb3VzJzpcbiAgICAgICAgJHdpbmRvdy50cmlnZ2VyKCdGT0NVU19QUkVWSU9VUycpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFjdGlvbkZvY3VzTmV4dCA9IHNjcm9sbFRvcENoYW5nZWQkXG4gICAgLmZsYXRNYXBGaXJzdCgoc3RhdGUpID0+IEtlZmlyLmZyb21FdmVudHMoJHdpbmRvdywgJ0ZPQ1VTX05FWFQnLCAoKSA9PiBzdGF0ZSkpXG4gICAgLm1hcChzdGF0ZSA9PiBzdGF0ZVsxXSlcbiAgICAubWFwKG5leHRGb2N1cylcblxuICBjb25zdCBhY3Rpb25Gb2N1c1ByZXZpb3VzID0gc2Nyb2xsVG9wQ2hhbmdlZCRcbiAgICAuZmxhdE1hcEZpcnN0KChzdGF0ZSkgPT4gS2VmaXIuZnJvbUV2ZW50cygkd2luZG93LCAnRk9DVVNfUFJFVklPVVMnLCAoKSA9PiBzdGF0ZSkpXG4gICAgLm1hcChzdGF0ZSA9PiBzdGF0ZVsxXSlcbiAgICAubWFwKHByZXZpb3VzRm9jdXMpXG5cbiAgZnVuY3Rpb24gbmV4dEZvY3VzKHN0YXRlKSB7XG4gICAgc3dpdGNoIChzdGF0ZS5jdXJyZW50RnJhbWUubGVuZ3RoKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBzdGF0ZS5mcmFtZUZvY3VzW3N0YXRlLmN1cnJlbnRGcmFtZVswXSArIDFdXG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBzdGF0ZS5mcmFtZUZvY3VzW3N0YXRlLmN1cnJlbnRGcmFtZVsxXV1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzRm9jdXMoc3RhdGUpIHtcbiAgICBzd2l0Y2ggKHN0YXRlLmN1cnJlbnRGcmFtZS5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIHN0YXRlLmZyYW1lRm9jdXNbc3RhdGUuY3VycmVudEZyYW1lWzBdIC0gMV1cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIHN0YXRlLmZyYW1lRm9jdXNbc3RhdGUuY3VycmVudEZyYW1lWzBdXVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9jdXNDaGFuZ2VkJCA9IEtlZmlyLm1lcmdlKFthY3Rpb25Gb2N1c1ByZXZpb3VzLCBhY3Rpb25Gb2N1c05leHRdKVxuICAgIC5vblZhbHVlKHJlbmRlclNjcm9sbClcblxuICAvLyBUT0RPOiBSZW1vdmUgbG9nXG4gIGZvY3VzQ2hhbmdlZCQubG9nKClcblxuICAvLyBUT0RPOiBBYnN0cmFjdCBSZW5kZXIgdG8gcmVuZGVyZXJcbiAgZnVuY3Rpb24gcmVuZGVyU2Nyb2xsKHNjcm9sbCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiUkVOREVSXCIsIHNjcm9sbCwgTWF0aC5mbG9vcigkd2luZG93LnNjcm9sbFRvcCgpKSlcbiAgICAkYm9keWh0bWwuYW5pbWF0ZSh7XG4gICAgICBzY3JvbGxUb3A6IHNjcm9sbCxcbiAgICB9LCAxNTAwLCAnbGluZWFyJylcbiAgfVxuXG4vKlxuICogIEhlbHBlcnNcbiovXG5cbiAgLy8gZnVuY3Rpb24gdGhyb3dFcnJvcigpIHtcbiAgLy8gICAkYm9keWh0bWwuYWRkQ2xhc3MoJ3BhZ2UtZXJyb3InKVxuICAvLyB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYi1zY2VuZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzLmNvbnZlcnRBbGxQcm9wc1RvUHggPSBmdW5jdGlvbihrZXlmcmFtZXMsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpIHtcbiAgdmFyIGksIGosIGs7XG4gIGZvcihpPTA7aTxrZXlmcmFtZXMubGVuZ3RoO2krKykgeyAvLyBsb29wIGtleWZyYW1lc1xuICAgIGtleWZyYW1lc1tpXS5kdXJhdGlvbiA9IGNvbnZlcnRQZXJjZW50VG9QeChrZXlmcmFtZXNbaV0uZHVyYXRpb24sICd5Jywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgZm9yKGo9MDtqPGtleWZyYW1lc1tpXS5hbmltYXRpb25zLmxlbmd0aDtqKyspIHsgLy8gbG9vcCBhbmltYXRpb25zXG4gICAgICBPYmplY3Qua2V5cyhrZXlmcmFtZXNbaV0uYW5pbWF0aW9uc1tqXSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHsgLy8gbG9vcCBwcm9wZXJ0aWVzXG4gICAgICAgIHZhciB2YWx1ZSA9IGtleWZyYW1lc1tpXS5hbmltYXRpb25zW2pdW2tleV07XG4gICAgICAgIGlmKGtleSAhPT0gJ3NlbGVjdG9yJykge1xuICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHsgLy8gaWYgaXRzIGFuIGFycmF5XG4gICAgICAgICAgICBmb3Ioaz0wO2s8dmFsdWUubGVuZ3RoO2srKykgeyAvLyBpZiB2YWx1ZSBpbiBhcnJheSBpcyAlXG4gICAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZVtrXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gJ3RyYW5zbGF0ZVknKSB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IGNvbnZlcnRQZXJjZW50VG9QeCh2YWx1ZVtrXSwgJ3knLCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSBjb252ZXJ0UGVyY2VudFRvUHgodmFsdWVba10sICd4Jywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgeyAvLyBpZiBzaW5nbGUgdmFsdWUgaXMgYSAlXG4gICAgICAgICAgICAgIGlmKGtleSA9PT0gJ3RyYW5zbGF0ZVknKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjb252ZXJ0UGVyY2VudFRvUHgodmFsdWUsICd5Jywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjb252ZXJ0UGVyY2VudFRvUHgodmFsdWUsICd4Jywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAga2V5ZnJhbWVzW2ldLmFuaW1hdGlvbnNbal1ba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtleWZyYW1lcztcbn07XG5cblxuXG5mdW5jdGlvbiBjb252ZXJ0UGVyY2VudFRvUHgodmFsdWUsIGF4aXMsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpIHtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLm1hdGNoKC8lL2cpKSB7XG4gICAgaWYoYXhpcyA9PT0gJ3knKSB2YWx1ZSA9IChwYXJzZUZsb2F0KHZhbHVlKSAvIDEwMCkgKiB3aW5kb3dIZWlnaHQ7XG4gICAgaWYoYXhpcyA9PT0gJ3gnKSB2YWx1ZSA9IChwYXJzZUZsb2F0KHZhbHVlKSAvIDEwMCkgKiB3aW5kb3dXaWR0aDtcbiAgfVxuICBpZih0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUubWF0Y2goL3YvZykpIHtcbiAgICBpZihheGlzID09PSAneScpIHZhbHVlID0gKHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwKSAqIHdpbmRvd0hlaWdodDtcbiAgICBpZihheGlzID09PSAneCcpIHZhbHVlID0gKHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwKSAqIHdpbmRvd1dpZHRoO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMuYnVpbGRQYWdlID0gZnVuY3Rpb24oa2V5ZnJhbWVzLCB3cmFwcGVycykge1xuICB2YXIgaSwgaiwgaywgaW5pdEZyYW1lcyA9IFtdLCBib2R5SGVpZ2h0ID0gMDtcbiAgZm9yKGk9MDtpPGtleWZyYW1lcy5sZW5ndGg7aSsrKSB7IC8vIGxvb3Aga2V5ZnJhbWVzXG4gICAgICBpZihrZXlmcmFtZXNbaV0uZm9jdXMpIHtcbiAgICAgICAgICBpZihib2R5SGVpZ2h0ICE9PSBpbml0RnJhbWVzW2luaXRGcmFtZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGluaXRGcmFtZXMucHVzaChib2R5SGVpZ2h0KTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBib2R5SGVpZ2h0ICs9IGtleWZyYW1lc1tpXS5kdXJhdGlvbjtcbiAgICAgIGlmKCQuaW5BcnJheShrZXlmcmFtZXNbaV0ud3JhcHBlciwgd3JhcHBlcnMpID09IC0xKSB7XG4gICAgICAgIHdyYXBwZXJzLnB1c2goa2V5ZnJhbWVzW2ldLndyYXBwZXIpO1xuICAgICAgfVxuICAgICAgZm9yKGo9MDtqPGtleWZyYW1lc1tpXS5hbmltYXRpb25zLmxlbmd0aDtqKyspIHsgLy8gbG9vcCBhbmltYXRpb25zXG4gICAgICAgIE9iamVjdC5rZXlzKGtleWZyYW1lc1tpXS5hbmltYXRpb25zW2pdKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkgeyAvLyBsb29wIHByb3BlcnRpZXNcbiAgICAgICAgICB2YXIgdmFsdWUgPSBrZXlmcmFtZXNbaV0uYW5pbWF0aW9uc1tqXVtrZXldO1xuICAgICAgICAgIGlmKGtleSAhPT0gJ3NlbGVjdG9yJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlU2V0ID0gW107XG4gICAgICAgICAgICB2YWx1ZVNldC5wdXNoKGdldERlZmF1bHRQcm9wZXJ0eVZhbHVlKGtleSksIHZhbHVlKTtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVTZXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGtleWZyYW1lc1tpXS5hbmltYXRpb25zW2pdW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZyYW1lRm9jdXM6IGluaXRGcmFtZXMsXG4gICAgYm9keUhlaWdodDogYm9keUhlaWdodCxcbiAgICB3cmFwcGVyczogd3JhcHBlcnNcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0RGVmYXVsdFByb3BlcnR5VmFsdWUgPSBnZXREZWZhdWx0UHJvcGVydHlWYWx1ZTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BlcnR5VmFsdWUocHJvcGVydHkpIHtcbiAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgIGNhc2UgJ3RyYW5zbGF0ZVgnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAndHJhbnNsYXRlWSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdzY2FsZSc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICdyb3RhdGUnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICByZXR1cm4gMTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3BhZ2UtdXRpbHMuanNcbiAqKi8iLCJjb25zdCBQUk9QRVJUSUVTID0gWyd0cmFuc2xhdGVYJywgJ3RyYW5zbGF0ZVknLCAnb3BhY2l0eScsICdyb3RhdGUnLCAnc2NhbGUnXVxuY29uc3QgQU5JTUFUSU9OX1RJTUUgPSA0MVxuXG5jb25zdCAkd2luZG93ID0gJCh3aW5kb3cpXG5jb25zdCAkYm9keWh0bWwgPSAkKCdib2R5LGh0bWwnKVxuXG5jb25zdCBJTklUX1NUQVRFID0ge1xuXG4gIC8vIFdyYXBwZXJzIGFyZSB0aGUgY29udGFpbmVyIHNjZW5lcywga2luZCBvZiBsaWtlIHNlY3Rpb25zLlxuICAvLyBUaGV5IGFyZSBkZWZpbmVkIGJ5IHRoZSBmb2xkZXIgc3RydWN0dXJlLlxuICAvLyBUaGV5IGhlbHAgc2hhcmluZyBtdWx0aXBsZSBmb2N1cyBwb2ludHMgYmV0d2VlbiBpbnRlZ3JhdGVkIGFuaW1hdGlvbnMuXG5cbiAgICB3cmFwcGVyczogW10sXG4gICAgY3VycmVudFdyYXBwZXI6IG51bGwsXG5cbiAgLy8gS25vdyBzY3JvbGwgbG9jYXRpb24gaXMgY3JpdGljYWwgdG8gdGhlIHNjYW4gZXhwZXJpZW5jZS5cblxuICAgIHNjcm9sbFRvcDogJHdpbmRvdy5zY3JvbGxUb3AoKSxcbiAgICByZWxhdGl2ZVNjcm9sbFRvcDogMCxcblxuICAvLyBLZXlmcmFtZXMgYXJlIHRoZSBhY3R1YWwgYW5pbWF0aW9uIGZyYW1lcywgZGVmaW5lZCBpbiBzY2VuZS5qc29uIHdpdGhcbiAgLy8gc2VsZWN0b3JzIGFuZCBhc3NvY2lhdGVkIGFuaW1hdGlvbnMuXG4gIC8vIE9uZSB3cmFwcGVyIGNhbiBoYXZlIG11bHRpcGxlIGtleWZyYW1lcy5cblxuICAgIGtleWZyYW1lczogdW5kZWZpbmVkLFxuXG4gIC8vIFN1bSBvZiBhbGwgcHJldmlvdXMga2V5ZnJhbWVzICh0byBrbm93IHJlbGF0aXZlIHBvc2l0aW9uKVxuXG4gICAgcHJldktleWZyYW1lc0R1cmF0aW9uczogMCxcblxuICAvLyBDdXJyZW50IGtleWZyYW1lIGFycmF5IG51bWJlclxuXG4gICAgY3VycmVudEtleWZyYW1lOiAwLFxuXG4gIC8vIEtleWZyYW1lcyBjYW4gYmUgZGVmaW5lZCBhcyBwb2ludHMgb2YgZm9jdXMuXG4gIC8vIFRoZXNlIGZvY3VzIHBvaW50cyBoZWxwIGdpdmUgdGhlIHVzZXIgZm9jdXMgd2hlcmUgdGhleSBtYXkgd2FudCBpdCwgbGlrZSB3aXRoXG4gIC8vIFRoZSBzbGlkZSBleHBlcmllbmNlIGFuZCB0aGUgc2Nyb2xsYmFyIGxlZ2VuZC5cblxuICAvLyBBcnJheSBvZiBvYmplY3RzIHt0aW1lOiAsIHNjcm9sbDogfVxuICAgIGZyYW1lRm9jdXM6IFtdLFxuXG4gIC8vIElkIG9mIGN1cnJlbnQgZm9jdXNcblxuICAgIGN1cnJlbnRGb2N1czogMCxcblxuICAvLyBUT0RPXG4gICAgY3VycmVudEZyYW1lOiBbMF0sXG5cbiAgLy8gVE9ET1xuXG4gICAgc2Nyb2xsVGltZW91dElEOiAwLFxuXG4gIC8vIERlZmluaW5nIGRpbWVuc2lvbnMgZm9yIHRoZSBleHBlcmllbmNlXG5cbiAgICBib2R5SGVpZ2h0OiAwLFxuICAgIHdpbmRvd0hlaWdodDogMCxcbiAgICB3aW5kb3dXaWR0aDogMFxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMuSU5JVF9TVEFURSA9IElOSVRfU1RBVEVcbm1vZHVsZS5leHBvcnRzLlBST1BFUlRJRVMgPSBQUk9QRVJUSUVTXG5tb2R1bGUuZXhwb3J0cy5BTklNQVRJT05fVElNRSA9IEFOSU1BVElPTl9USU1FXG5tb2R1bGUuZXhwb3J0cy5XSU5ET1cgPSAkd2luZG93XG5tb2R1bGUuZXhwb3J0cy5CT0RZSFRNTCA9ICRib2R5aHRtbFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uc3RhbnRzLmpzXG4gKiovIiwiY29uc3QgS2VmaXIgPSByZXF1aXJlKCdrZWZpcicpXG5cbmNvbnN0IG9ic2NlbmUgPSByZXF1aXJlKCcuLi9vYi1zY2VuZS5qcycpXG5cbm1vZHVsZS5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICB2YXIgUExBWV9TUEVFRCA9IDEwO1xuXG4gIHZhciBpc1BsYXlpbmcgPSBmYWxzZTtcbiAgdmFyIGlzUGxheWluZ0ludGVydmFsO1xuICB2YXIgYm9keUhlaWdodCA9ICQoJ2JvZHknKS5oZWlnaHQoKTtcbiAgdmFyIG5hPTA7XG5cbiAgY29uc3Qga2V5VXBQcmVzc2VkID0gS2VmaXIuZnJvbUV2ZW50cyhkb2N1bWVudCwgJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBlO1xuICB9KTtcblxuICBjb25zdCBiYWNrS2V5ID0ga2V5VXBQcmVzc2VkXG4gICAgLmZpbHRlcihlID0+IGUua2V5Q29kZSA9PT0gMzgpXG4gIGNvbnN0IG5leHRLZXkgPSBrZXlVcFByZXNzZWRcbiAgICAuZmlsdGVyKGUgPT4gZS5rZXlDb2RlID09PSA0MClcblxuICBjb25zdCB0b2dnbGVVcENsaWNrZWQgPSBLZWZpci5mcm9tRXZlbnRzKCQoXCIjdG9nZ2xlVXBcIiksICdjbGljaycpXG4gIGNvbnN0IHRvZ2dsZURvd25DbGlja2VkID0gS2VmaXIuZnJvbUV2ZW50cygkKFwiI3RvZ2dsZURvd25cIiksICdjbGljaycpXG5cbiAgS2VmaXIubWVyZ2UoW25leHRLZXksIHRvZ2dsZURvd25DbGlja2VkXSlcbiAgICAub25WYWx1ZShlID0+IHtcbiAgICAgIG9ic2NlbmUuYWN0aW9uKCduZXh0JylcbiAgICB9KVxuXG4gIEtlZmlyLm1lcmdlKFtiYWNrS2V5LCB0b2dnbGVVcENsaWNrZWRdKVxuICAgIC5vblZhbHVlKGUgPT4ge1xuICAgICAgb2JzY2VuZS5hY3Rpb24oJ3ByZXZpb3VzJylcbiAgICB9KVxuXG4gICQoXCIjdG9nZ2xlUGxheVwiKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coXCJDTElDS1wiKTtcbiAgICBpZihpc1BsYXlpbmcpIHsgcGF1c2UoKSB9IGVsc2UgeyBwbGF5KCkgfVxuICB9KVxuXG4gIGtleVVwUHJlc3NlZFxuICAgIC5maWx0ZXIoZSA9PiBlLmtleUNvZGUgPT09IDgwIHx8IGUua2V5Q29kZSA9PT0gMzIpXG4gICAgLm9uVmFsdWUoZSA9PiB7XG4gICAgICBpZiAoaXNQbGF5aW5nKSB7IHBhdXNlKCkgfSBlbHNlIHsgcGxheSgpIH1cbiAgICB9KVxuXG4gIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgY29uc29sZS5sb2coXCJQTEFZXCIpXG4gICAgaXNQbGF5aW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIG9ic2NlbmUuYWN0aW9uKCduZXh0Jyk7XG4gICAgfSwgNTAwMCk7XG4gICAgJChcIiN0b2dnbGVQbGF5XCIpLnJlbW92ZUNsYXNzKCdmYS1wbGF5JykuYWRkQ2xhc3MoJ2ZhLXBhdXNlJyk7XG4gICAgaXNQbGF5aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgIGNvbnNvbGUubG9nKFwiUEFVU0VcIik7XG4gICAgY2xlYXJJbnRlcnZhbChpc1BsYXlpbmdJbnRlcnZhbCk7XG4gICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgJChcIiN0b2dnbGVQbGF5XCIpLnJlbW92ZUNsYXNzKCdmYS1wYXVzZScpLmFkZENsYXNzKCdmYS1wbGF5Jyk7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91c2VyL2NvbnRyb2xzLmpzXG4gKiovIiwiLypcbiAqICBEZXBlbmRlbmNpZXNcbiovXG5cbiAgaW1wb3J0IHsgc2Nyb2xsVG9wQ2hhbmdlZCQsIGRpbWVuc2lvbnNDYWxjdWxhdGVkJCwgd3JhcHBlckNoYW5nZWQkIH0gZnJvbSAnLi4vb2Itc2NlbmUuanMnXG4gIGltcG9ydCAqIGFzIHBhZ2VVdGlscyBmcm9tICcuLi91dGlscy9wYWdlLXV0aWxzLmpzJ1xuXG4vKlxuICogIFN0cmVhbXNcbiovXG5cbi8qXG4gKiAgRE9NIEVsZW1lbnRzXG4qL1xuXG4gIGNvbnN0ICR3aW5kb3cgPSAkKHdpbmRvdylcbiAgY29uc3QgJGJvZHkgPSAkKCdib2R5LGh0bWwnKVxuICBjb25zdCAkZXhwZXJpZW5jZUluZGljYXRvciA9ICQoJyNleHBlcmllbmNlLXByb2dyZXNzIC5wcm9ncmVzcycpXG5cbi8qXG4gKiAgQ2hpbGQgUmVuZGVyc1xuKi9cblxuICBjb25zdCByZW5kZXJXcmFwcGVyID0gcmVxdWlyZSgnLi93cmFwcGVyLmpzJylcbiAgY29uc3QgcmVuZGVyU2Nyb2xsYmFyID0gcmVxdWlyZSgnLi9zY3JvbGxiYXIuanMnKVxuICBjb25zdCByZW5kZXJBdWRpb1BsYXllciA9IHJlcXVpcmUoJy4vYXVkaW9wbGF5ZXIuanMnKVxuICBjb25zdCByZW5kZXJWaWRlb1BsYXllciA9IHJlcXVpcmUoJy4vdmlkZW9wbGF5ZXIuanMnKVxuICBjb25zdCByZW5kZXJFcnJvciA9IHJlcXVpcmUoJy4vZXJyb3IuanMnKVxuXG4vKlxuICogIFJlbmRlclxuKi9cblxuICAvLyBIYWNrIHRvIGZvcmNlIHJlc2l6ZSBvbmNlLiBGb3Igc29tZVxuICAvLyByZWFzb24gdGhpcyBwcmV2ZW50cyB0aGUgYW5pbWF0aW9ucyBmcm9tIGJsaW5raW5nIG9uIENocm9tZVxuICBzY3JvbGxUb3BDaGFuZ2VkJC50YWtlKDEpLmRlbGF5KDUwMCkub25WYWx1ZSgoKSA9PiB7XG4gICAgJHdpbmRvdy50cmlnZ2VyKCdyZXNpemUnKVxuICB9KVxuXG4gIC8vIFJlbmRlciBEaW1lbnNpb25zXG4gIGRpbWVuc2lvbnNDYWxjdWxhdGVkJC5vblZhbHVlKHN0YXRlID0+IHtcbiAgICAkYm9keS5oZWlnaHQoc3RhdGUuYm9keUhlaWdodClcbiAgICByZW5kZXJTY3JvbGxCYXJGb2N1c0JhcnMoc3RhdGUpXG4gIH0pXG5cbiAgICBmdW5jdGlvbiByZW5kZXJTY3JvbGxCYXJGb2N1c0JhcnMoc3RhdGUpIHtcbiAgICAgIHN0YXRlLmZyYW1lRm9jdXNcbiAgICAgICAgLm1hcCgoZm9jdXMpID0+IChmb2N1cyAvIHN0YXRlLmJvZHlIZWlnaHQpLnRvRml4ZWQoMikgKiAxMDApIC8vIENvbnZlcnQgdG8gcGVyY2VudFxuICAgICAgICAubWFwKChmb2N1c1BlcmNlbnQpID0+IGZvY3VzUGVyY2VudCArIFwidmhcIikgLy8gQ29udmVydCB0byB2aFxuICAgICAgICAubWFwKChmb2N1c1ZoKSA9PiB7XG4gICAgICAgICAgJChcIiNleHBlcmllbmNlLXByb2dyZXNzXCIpXG4gICAgICAgICAgICAuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2VudGVyLW1hcmtlclwiIHN0eWxlPVwidG9wOicgKyBmb2N1c1ZoICsgJ1wiPjwvZGl2PicpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gIC8vIFJlbmRlciBXcmFwcGVyXG4gIHdyYXBwZXJDaGFuZ2VkJC5vblZhbHVlKChjdXJyZW50V3JhcHBlcikgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiV1JBUFBFUiBDSEFOR0VEXCIpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgJChjdXJyZW50V3JhcHBlclswXSkuaGlkZSgpXG4gICAgICAkKGN1cnJlbnRXcmFwcGVyWzFdKS5zaG93KClcblxuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBjdXJyZW50V3JhcHBlclsxXVxuICAgICAgZ2EoJ3NlbmQnLCAnc2NlbmVfYWNjZXNzZWQnLCBjdXJyZW50V3JhcHBlclsxXSkgLy8gR29vZ2xlIEFuYWx5dGljc1xuICAgICAgcmVuZGVyVmlkZW8oY3VycmVudFdyYXBwZXIpXG4gICAgICByZW5kZXJBdWRpbyhjdXJyZW50V3JhcHBlcilcbiAgICB9KVxuICB9KVxuXG4gICAgZnVuY3Rpb24gc2hvd0N1cnJlbnRXcmFwcGVycyhwcmV2LCBuZXh0KSB7XG4gICAgICBpZiAocHJldi5jdXJyZW50V3JhcHBlciA9PT0gbmV4dC5jdXJyZW50V3JhcHBlcikgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXZpb3VzJywgcHJldiwgbmV4dClcbiAgICAgICQocHJldi5jdXJyZW50V3JhcHBlcikuaGlkZSgpXG4gICAgICAkKG5leHQuY3VycmVudFdyYXBwZXIpLnNob3coKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclZpZGVvKHN0YXRlKSB7XG5cbiAgICAgICAgJCgndmlkZW8nLCBzdGF0ZVswXSkuYW5pbWF0ZSh7XG4gICAgICAgICAgdm9sdW1lOiAwXG4gICAgICAgIH0sIDMwMCwgJ3N3aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gcmVhbGx5IHN0b3AgdGhlIHZpZGVvXG4gICAgICAgICAgJCh0aGlzKS5nZXQoMCkucGF1c2UoKVxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCAkbmV3VmlkZW8gPSAkKCd2aWRlbycsIHN0YXRlWzFdKVxuXG4gICAgICAgIGlmICgkbmV3VmlkZW9bMF0pIHtcbiAgICAgICAgICAkbmV3VmlkZW9bMF0ucGxheSgpXG4gICAgICAgICAgJG5ld1ZpZGVvLmFuaW1hdGUoe1xuICAgICAgICAgICAgdm9sdW1lOiAkbmV3VmlkZW8uYXR0cignbWF4LXZvbHVtZScpIHx8IDFcbiAgICAgICAgICB9LCAzMDAsICdzd2luZycpXG4gICAgICAgICAgcmVuZGVyVmlkZW9QbGF5ZXIuc3RhcnQoJG5ld1ZpZGVvKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbmRlclZpZGVvUGxheWVyLnN0b3AoJG5ld1ZpZGVvKVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyQXVkaW8oc3RhdGUpIHtcbiAgICAgIHJlbmRlckF1ZGlvUGxheWVyLm5leHQoc3RhdGVbMV0uc3Vic3RyKDEpKTtcbiAgICB9XG5cbiAgLy8gUmVuZGVyIEtleWZyYW1lc1xuXG4gIHNjcm9sbFRvcENoYW5nZWQkLm9uVmFsdWUoKHN0YXRlZGlmZikgPT4ge1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGxldCBwcmV2ID0gc3RhdGVkaWZmWzBdXG4gICAgICAgIGxldCBuZXh0ID0gc3RhdGVkaWZmWzFdXG5cbiAgICAgICAgYW5pbWF0ZUVsZW1lbnRzKG5leHQpXG4gICAgICAgIGFuaW1hdGVTY3JvbGxCYXIobmV4dClcbiAgICAgICAgLy8gcmVuZGVyTXVzaWMobmV4dClcbiAgICB9KVxuXG4gIH0pXG5cbiAgICBmdW5jdGlvbiByZW5kZXJNdXNpYyh3cmFwcGVySWQpIHtcbiAgICAgIGF1ZGlvcGxheWVyLm5leHQod3JhcHBlcklkLnN1YnN0cigxKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlU2Nyb2xsQmFyKHN0YXRlKSB7XG4gICAgICB2YXIgcGVyY2VudCA9IChzdGF0ZS5zY3JvbGxUb3AgLyBzdGF0ZS5ib2R5SGVpZ2h0KS50b0ZpeGVkKDIpICogMTAwXG4gICAgICAkZXhwZXJpZW5jZUluZGljYXRvci5jc3Moe1xuICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVkoJyArIHBlcmNlbnQgKyAnJSknXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVFbGVtZW50cyhzdGF0ZSkge1xuICAgICAgdmFyIGFuaW1hdGlvbiwgdHJhbnNsYXRlWSwgdHJhbnNsYXRlWCwgc2NhbGUsIHJvdGF0ZSwgb3BhY2l0eVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5rZXlmcmFtZXNbc3RhdGUuY3VycmVudEtleWZyYW1lXS5hbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFuaW1hdGlvbiA9IHN0YXRlLmtleWZyYW1lc1tzdGF0ZS5jdXJyZW50S2V5ZnJhbWVdLmFuaW1hdGlvbnNbaV1cbiAgICAgICAgdHJhbnNsYXRlWSA9IGNhbGNQcm9wVmFsdWUoYW5pbWF0aW9uLCAndHJhbnNsYXRlWScsIHN0YXRlKVxuICAgICAgICB0cmFuc2xhdGVYID0gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sICd0cmFuc2xhdGVYJywgc3RhdGUpXG4gICAgICAgIHNjYWxlID0gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sICdzY2FsZScsIHN0YXRlKVxuICAgICAgICByb3RhdGUgPSBjYWxjUHJvcFZhbHVlKGFuaW1hdGlvbiwgJ3JvdGF0ZScsIHN0YXRlKVxuICAgICAgICBvcGFjaXR5ID0gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sICdvcGFjaXR5Jywgc3RhdGUpXG4gICAgICAgICQoYW5pbWF0aW9uLnNlbGVjdG9yLCBzdGF0ZS5jdXJyZW50V3JhcHBlcikuY3NzKHtcbiAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJ3B4LCAnICsgdHJhbnNsYXRlWSArICdweCwgMCkgc2NhbGUoJyArIHNjYWxlICsgJykgcm90YXRlKCcgKyByb3RhdGUgKyAnZGVnKScsXG4gICAgICAgICAgJ29wYWNpdHknOiBvcGFjaXR5LnRvRml4ZWQoMilcbiAgICAgICAgfSlcblxuICAgICAgfVxuICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sIHByb3BlcnR5LCBzdGF0ZSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBhbmltYXRpb25bcHJvcGVydHldXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHZhbHVlID0gZWFzZUluT3V0UXVhZChzdGF0ZS5yZWxhdGl2ZVNjcm9sbFRvcCwgdmFsdWVbMF0sICh2YWx1ZVsxXSAtIHZhbHVlWzBdKSwgc3RhdGUua2V5ZnJhbWVzW3N0YXRlLmN1cnJlbnRLZXlmcmFtZV0uZHVyYXRpb24pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBwYWdlVXRpbHMuZ2V0RGVmYXVsdFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG4gICAgICAgIH1cbiAgICAgICAgLy8gdmFsdWUgPSArdmFsdWUudG9GaXhlZCgyKVxuICAgICAgICAvLyBURU1QT1JBUklMWSBSRU1PVkVEIENBVVNFIFNDQUxFIERPRVNOJ1QgV09SSyBXSVRIQSBBR1JFU1NJVkUgUk9VTkRJTkcgTElLRSBUSElTXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICAgY2FzZSAndHJhbnNsYXRlWCc6XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIGNhc2UgJ3RyYW5zbGF0ZVknOlxuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICBjYXNlICdzY2FsZSc6XG4gICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgIGNhc2UgJ3JvdGF0ZSc6XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgLy9zaW51c29hZGlhbCBpbiBhbmQgb3V0XG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYlxuICAgICAgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyL2luZGV4LmpzXG4gKiovIiwiZnVuY3Rpb24gcmVuZGVyU2Nyb2xsKHNjcm9sbCkge1xuICBjb25zb2xlLmxvZyhcIlJFTkRFUlwiLCBzY3JvbGwsIE1hdGguZmxvb3IoJHdpbmRvdy5zY3JvbGxUb3AoKSkpXG4gICAgJGJvZHlodG1sLmFuaW1hdGUoeyBzY3JvbGxUb3A6IHNjcm9sbCB9LCAxNTAwLCAnbGluZWFyJyk7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVTY3JvbGxCYXIoKSB7XG4gIHZhciBwZXJjZW50ID0gKHNjcm9sbFRvcCAvIGJvZHlIZWlnaHQpLnRvRml4ZWQoMikgKiAxMDA7XG4gICRleHBlcmllbmNlSW5kaWNhdG9yLmNzcyh7XG4gICAgICAndHJhbnNmb3JtJzogICAgJ3RyYW5zbGF0ZVkoJyArIHBlcmNlbnQgKyAnJSknXG4gICAgfSk7XG59XG5mdW5jdGlvbiBidWlsZFNjcm9sbEJhckNlbnRlcnMoKSB7XG4gIGZyYW1lRm9jdXNcbiAgICAubWFwKChjZW50ZXIpID0+IChjZW50ZXIgLyBib2R5SGVpZ2h0KS50b0ZpeGVkKDIpICogMTAwKVxuICAgIC5tYXAoKGNlbnRlclBlcmNlbnQpID0+IGNlbnRlclBlcmNlbnQgKyBcInZoXCIgKVxuICAgIC5tYXAoKGNlbnRlclZoKSA9PiB7XG4gICAgICAkKFwiI2V4cGVyaWVuY2UtcHJvZ3Jlc3NcIilcbiAgICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNlbnRlci1tYXJrZXJcIiBzdHlsZT1cInRvcDonKyBjZW50ZXJWaCArJ1wiPjwvZGl2PicpO1xuICAgIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyL3Njcm9sbGJhci5qc1xuICoqLyIsImNvbnN0IGxvb3BlciA9IHJlcXVpcmUoJy4vbG9vcGVyLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzLm5leHQgPSBuZXh0O1xuXG5tb2R1bGUuZXhwb3J0cy5jb25maWcgPSAoY29uZmlnKSA9PiB7XG4gIGxvb3Blci5jb25maWcoY29uZmlnKVxufTtcblxubW9kdWxlLmV4cG9ydHMucGxheSA9ICgpID0+IHtcbiAgbG9vcGVyLnBsYXkoKVxufTtcblxuXG5mdW5jdGlvbiBuZXh0KGlkKSB7XG4gIGxvb3Blci5uZXh0KGlkKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlbmRlci9hdWRpb3BsYXllci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IEhvd2wgPSByZXF1aXJlKCdob3dsZXInKS5Ib3dsO1xuXG52YXIgbG9vcHMgPSB7fTtcbnZhciBsb29wO1xuXG5tb2R1bGUuZXhwb3J0cy5jb25maWcgPSAoY29uZmlnKSA9PiB7XG4gIGxvb3BzID0gY29uZmlnLm1hcChjID0+IHtcbiAgICBsZXQgYXVkaW9Db25maWcgPSB7XG4gICAgICBzcmM6IFsnbWVkaWEvJysgYy5hdWRpby5zcmMgKycubXAzJ10sXG4gICAgICBodG1sNTogdHJ1ZSxcbiAgICAgIHZvbHVtZTogMFxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgJ2lkJzogYy5pZCxcbiAgICAgICd2b2wnOiBjLmF1ZGlvLm1heCxcbiAgICAgICdzb3VuZDEnOiBuZXcgSG93bChhdWRpb0NvbmZpZyksXG4gICAgICAnc291bmQyJzogbmV3IEhvd2woYXVkaW9Db25maWcpXG4gICAgfVxuICB9KS5yZWR1Y2UoIChwcmV2LG5leHQpID0+ICB7cHJldltuZXh0LmlkXSA9IG5leHQ7IHJldHVybiBwcmV2O30sIHt9KVxufVxuXG5tb2R1bGUuZXhwb3J0cy5uZXh0ID0gKGlkKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKCduZXh0JywgaWQpXG4gIGxvb3AgPSBsb29wc1tpZF07XG4gIC8vIGNvbnNvbGUubG9nKGxvb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5wYXVzZSA9IChjb25maWcpID0+IHtcblxufVxuXG5tb2R1bGUuZXhwb3J0cy5wbGF5ID0gKGNvbmZpZykgPT4ge1xuICBsb29wZXIoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMuc3RvcCA9IChjb25maWcpID0+IHtcblxufVxuXG5mdW5jdGlvbiBsb29wZXIoKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyBjb25zb2xlLmxvZygnbG9vcGVyJywgbG9vcC5zb3VuZDEpXG4gIGxldCBmYWRlUGVyY2VudCA9IChsb29wLnNvdW5kMS5kdXJhdGlvbigpID4gNSkgID8gMC4wMSA6IDAuMDE1OyAvLyAyJSBvciAxJSBkZXBlbmRpbmcgb24gaWYgc291bmQgaXMgb3ZlciA1IHNlY29uZHNcbiAgbGV0IGZhZGVyYXRlID0gIDEgLSBmYWRlUGVyY2VudDtcbiAgbGV0IGR1cmF0aW9uID0gbG9vcC5zb3VuZDEuZHVyYXRpb24oKSAqIDEwMDAgKiAoMSAtIGZhZGVQZXJjZW50KTtcbiAgbGV0IHZvbHVtZSA9IGxvb3Audm9sO1xuICAvLyBjb25zb2xlLmxvZyhmYWRlcmF0ZSwgZmFkZVBlcmNlbnQsIGR1cmF0aW9uLCB2b2x1bWUpO1xuXG4gIGxvb3Auc291bmQxLnBsYXkoKTtcbiAgbG9vcC5zb3VuZDEuZmFkZSgwLHZvbHVtZSwgZHVyYXRpb24gKiBmYWRlUGVyY2VudCk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbG9vcC5zb3VuZDEuZmFkZSh2b2x1bWUsMCwgZHVyYXRpb24gKiBmYWRlUGVyY2VudCk7XG4gIH0sIGR1cmF0aW9uICogZmFkZXJhdGUgKTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb29wLnNvdW5kMi5wbGF5KCk7XG4gICAgbG9vcC5zb3VuZDIuZmFkZSgwLHZvbHVtZSwgZHVyYXRpb24gKiBmYWRlUGVyY2VudCk7XG4gIH0sIGR1cmF0aW9uICogZmFkZXJhdGUpO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGxvb3Auc291bmQyLmZhZGUodm9sdW1lLDAsIGR1cmF0aW9uICogZmFkZVBlcmNlbnQpO1xuICAgIGxvb3BlcigpO1xuICB9LCBkdXJhdGlvbiAqIDIgKiBmYWRlcmF0ZSk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMubG9vcCA9IGxvb3BlcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlbmRlci9sb29wZXIuanNcbiAqKi8iLCIvKiEgaG93bGVyLmpzIHYyLjAuMC1iZXRhNyB8IChjKSAyMDEzLTIwMTYsIEphbWVzIFNpbXBzb24gb2YgR29sZEZpcmUgU3R1ZGlvcyB8IE1JVCBMaWNlbnNlIHwgaG93bGVyanMuY29tICovXG4hZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKCl7dHJ5e1widW5kZWZpbmVkXCIhPXR5cGVvZiBBdWRpb0NvbnRleHQ/bj1uZXcgQXVkaW9Db250ZXh0OlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3ZWJraXRBdWRpb0NvbnRleHQ/bj1uZXcgd2Via2l0QXVkaW9Db250ZXh0Om89ITF9Y2F0Y2goZSl7bz0hMX1pZighbylpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgQXVkaW8pdHJ5e3ZhciBkPW5ldyBBdWRpbztcInVuZGVmaW5lZFwiPT10eXBlb2YgZC5vbmNhbnBsYXl0aHJvdWdoJiYodT1cImNhbnBsYXlcIil9Y2F0Y2goZSl7dD0hMH1lbHNlIHQ9ITA7dHJ5e3ZhciBkPW5ldyBBdWRpbztkLm11dGVkJiYodD0hMCl9Y2F0Y2goZSl7fXZhciBhPS9pUChob25lfG9kfGFkKS8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0pLGk9bmF2aWdhdG9yLmFwcFZlcnNpb24ubWF0Y2goL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vKSxfPWk/cGFyc2VJbnQoaVsxXSwxMCk6bnVsbDtpZihhJiZfJiY5Pl8pe3ZhciBzPS9zYWZhcmkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7KHdpbmRvdy5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSYmIXN8fCF3aW5kb3cubmF2aWdhdG9yLnN0YW5kYWxvbmUmJiFzKSYmKG89ITEpfW8mJihyPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLmNyZWF0ZUdhaW4/bi5jcmVhdGVHYWluTm9kZSgpOm4uY3JlYXRlR2FpbigpLHIuZ2Fpbi52YWx1ZT0xLHIuY29ubmVjdChuLmRlc3RpbmF0aW9uKSl9dmFyIG49bnVsbCxvPSEwLHQ9ITEscj1udWxsLHU9XCJjYW5wbGF5dGhyb3VnaFwiO2UoKTt2YXIgZD1mdW5jdGlvbigpe3RoaXMuaW5pdCgpfTtkLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbigpe3ZhciBlPXRoaXN8fGE7cmV0dXJuIGUuX2NvZGVjcz17fSxlLl9ob3dscz1bXSxlLl9tdXRlZD0hMSxlLl92b2x1bWU9MSxlLnN0YXRlPW4/bi5zdGF0ZXx8XCJydW5uaW5nXCI6XCJydW5uaW5nXCIsZS5hdXRvU3VzcGVuZD0hMCxlLl9hdXRvU3VzcGVuZCgpLGUubW9iaWxlQXV0b0VuYWJsZT0hMCxlLm5vQXVkaW89dCxlLnVzaW5nV2ViQXVkaW89byxlLmN0eD1uLHR8fGUuX3NldHVwQ29kZWNzKCksZX0sdm9sdW1lOmZ1bmN0aW9uKGUpe3ZhciBuPXRoaXN8fGE7aWYoZT1wYXJzZUZsb2F0KGUpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBlJiZlPj0wJiYxPj1lKXtuLl92b2x1bWU9ZSxvJiYoci5nYWluLnZhbHVlPWUpO2Zvcih2YXIgdD0wO3Q8bi5faG93bHMubGVuZ3RoO3QrKylpZighbi5faG93bHNbdF0uX3dlYkF1ZGlvKWZvcih2YXIgdT1uLl9ob3dsc1t0XS5fZ2V0U291bmRJZHMoKSxkPTA7ZDx1Lmxlbmd0aDtkKyspe3ZhciBpPW4uX2hvd2xzW3RdLl9zb3VuZEJ5SWQodVtkXSk7aSYmaS5fbm9kZSYmKGkuX25vZGUudm9sdW1lPWkuX3ZvbHVtZSplKX1yZXR1cm4gbn1yZXR1cm4gbi5fdm9sdW1lfSxtdXRlOmZ1bmN0aW9uKGUpe3ZhciBuPXRoaXN8fGE7bi5fbXV0ZWQ9ZSxvJiYoci5nYWluLnZhbHVlPWU/MDpuLl92b2x1bWUpO2Zvcih2YXIgdD0wO3Q8bi5faG93bHMubGVuZ3RoO3QrKylpZighbi5faG93bHNbdF0uX3dlYkF1ZGlvKWZvcih2YXIgdT1uLl9ob3dsc1t0XS5fZ2V0U291bmRJZHMoKSxkPTA7ZDx1Lmxlbmd0aDtkKyspe3ZhciBpPW4uX2hvd2xzW3RdLl9zb3VuZEJ5SWQodVtkXSk7aSYmaS5fbm9kZSYmKGkuX25vZGUubXV0ZWQ9ZT8hMDppLl9tdXRlZCl9cmV0dXJuIG59LHVubG9hZDpmdW5jdGlvbigpe2Zvcih2YXIgbz10aGlzfHxhLHQ9by5faG93bHMubGVuZ3RoLTE7dD49MDt0LS0pby5faG93bHNbdF0udW5sb2FkKCk7cmV0dXJuIG8udXNpbmdXZWJBdWRpbyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY2xvc2UmJihvLmN0eD1udWxsLG4uY2xvc2UoKSxlKCksby5jdHg9biksb30sY29kZWNzOmZ1bmN0aW9uKGUpe3JldHVybih0aGlzfHxhKS5fY29kZWNzW2VdfSxfc2V0dXBDb2RlY3M6ZnVuY3Rpb24oKXt2YXIgZT10aGlzfHxhLG49bmV3IEF1ZGlvLG89bi5jYW5QbGF5VHlwZShcImF1ZGlvL21wZWc7XCIpLnJlcGxhY2UoL15ubyQvLFwiXCIpLHQ9L09QUlxcLy8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtyZXR1cm4gZS5fY29kZWNzPXttcDM6ISh0fHwhbyYmIW4uY2FuUGxheVR5cGUoXCJhdWRpby9tcDM7XCIpLnJlcGxhY2UoL15ubyQvLFwiXCIpKSxtcGVnOiEhbyxvcHVzOiEhbi5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJvcHVzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxvZ2c6ISFuLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksb2dhOiEhbi5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLHdhdjohIW4uY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksYWFjOiEhbi5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikucmVwbGFjZSgvXm5vJC8sXCJcIiksbTRhOiEhKG4uY2FuUGxheVR5cGUoXCJhdWRpby94LW00YTtcIil8fG4uY2FuUGxheVR5cGUoXCJhdWRpby9tNGE7XCIpfHxuLmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKSkucmVwbGFjZSgvXm5vJC8sXCJcIiksbXA0OiEhKG4uY2FuUGxheVR5cGUoXCJhdWRpby94LW1wNDtcIil8fG4uY2FuUGxheVR5cGUoXCJhdWRpby9tcDQ7XCIpfHxuLmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKSkucmVwbGFjZSgvXm5vJC8sXCJcIiksd2ViYTohIW4uY2FuUGxheVR5cGUoJ2F1ZGlvL3dlYm07IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksd2VibTohIW4uY2FuUGxheVR5cGUoJ2F1ZGlvL3dlYm07IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksZG9sYnk6ISFuLmNhblBsYXlUeXBlKCdhdWRpby9tcDQ7IGNvZGVjcz1cImVjLTNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpfSxlfSxfZW5hYmxlTW9iaWxlQXVkaW86ZnVuY3Rpb24oKXt2YXIgZT10aGlzfHxhLG89L2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZHxCbGFja0JlcnJ5fEJCMTB8U2lsay9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksdD0hIShcIm9udG91Y2hlbmRcImluIHdpbmRvd3x8bmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzPjB8fG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzPjApO2lmKCFufHwhZS5fbW9iaWxlRW5hYmxlZCYmbyYmdCl7ZS5fbW9iaWxlRW5hYmxlZD0hMTt2YXIgcj1mdW5jdGlvbigpe3ZhciBvPW4uY3JlYXRlQnVmZmVyKDEsMSwyMjA1MCksdD1uLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO3QuYnVmZmVyPW8sdC5jb25uZWN0KG4uZGVzdGluYXRpb24pLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LnN0YXJ0P3Qubm90ZU9uKDApOnQuc3RhcnQoMCksdC5vbmVuZGVkPWZ1bmN0aW9uKCl7dC5kaXNjb25uZWN0KDApLGUuX21vYmlsZUVuYWJsZWQ9ITAsZS5tb2JpbGVBdXRvRW5hYmxlPSExLGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHIsITApfX07cmV0dXJuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLHIsITApLGV9fSxfYXV0b1N1c3BlbmQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2lmKGUuYXV0b1N1c3BlbmQmJm4mJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnN1c3BlbmQmJm8pe2Zvcih2YXIgdD0wO3Q8ZS5faG93bHMubGVuZ3RoO3QrKylpZihlLl9ob3dsc1t0XS5fd2ViQXVkaW8pZm9yKHZhciByPTA7cjxlLl9ob3dsc1t0XS5fc291bmRzLmxlbmd0aDtyKyspaWYoIWUuX2hvd2xzW3RdLl9zb3VuZHNbcl0uX3BhdXNlZClyZXR1cm4gZTtyZXR1cm4gZS5fc3VzcGVuZFRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLmF1dG9TdXNwZW5kJiYoZS5fc3VzcGVuZFRpbWVyPW51bGwsZS5zdGF0ZT1cInN1c3BlbmRpbmdcIixuLnN1c3BlbmQoKS50aGVuKGZ1bmN0aW9uKCl7ZS5zdGF0ZT1cInN1c3BlbmRlZFwiLGUuX3Jlc3VtZUFmdGVyU3VzcGVuZCYmKGRlbGV0ZSBlLl9yZXN1bWVBZnRlclN1c3BlbmQsZS5fYXV0b1Jlc3VtZSgpKX0pKX0sM2U0KSxlfX0sX2F1dG9SZXN1bWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2lmKG4mJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnJlc3VtZSYmbylyZXR1cm5cInJ1bm5pbmdcIj09PWUuc3RhdGUmJmUuX3N1c3BlbmRUaW1lcj8oY2xlYXJUaW1lb3V0KGUuX3N1c3BlbmRUaW1lciksZS5fc3VzcGVuZFRpbWVyPW51bGwpOlwic3VzcGVuZGVkXCI9PT1lLnN0YXRlPyhlLnN0YXRlPVwicmVzdW1pbmdcIixuLnJlc3VtZSgpLnRoZW4oZnVuY3Rpb24oKXtlLnN0YXRlPVwicnVubmluZ1wifSksZS5fc3VzcGVuZFRpbWVyJiYoY2xlYXJUaW1lb3V0KGUuX3N1c3BlbmRUaW1lciksZS5fc3VzcGVuZFRpbWVyPW51bGwpKTpcInN1c3BlbmRpbmdcIj09PWUuc3RhdGUmJihlLl9yZXN1bWVBZnRlclN1c3BlbmQ9ITApLGV9fTt2YXIgYT1uZXcgZCxpPWZ1bmN0aW9uKGUpe3ZhciBuPXRoaXM7cmV0dXJuIGUuc3JjJiYwIT09ZS5zcmMubGVuZ3RoP3ZvaWQgbi5pbml0KGUpOnZvaWQgY29uc29sZS5lcnJvcihcIkFuIGFycmF5IG9mIHNvdXJjZSBmaWxlcyBtdXN0IGJlIHBhc3NlZCB3aXRoIGFueSBuZXcgSG93bC5cIil9O2kucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7cmV0dXJuIHQuX2F1dG9wbGF5PWUuYXV0b3BsYXl8fCExLHQuX2Zvcm1hdD1cInN0cmluZ1wiIT10eXBlb2YgZS5mb3JtYXQ/ZS5mb3JtYXQ6W2UuZm9ybWF0XSx0Ll9odG1sNT1lLmh0bWw1fHwhMSx0Ll9tdXRlZD1lLm11dGV8fCExLHQuX2xvb3A9ZS5sb29wfHwhMSx0Ll9wb29sPWUucG9vbHx8NSx0Ll9wcmVsb2FkPVwiYm9vbGVhblwiPT10eXBlb2YgZS5wcmVsb2FkP2UucHJlbG9hZDohMCx0Ll9yYXRlPWUucmF0ZXx8MSx0Ll9zcHJpdGU9ZS5zcHJpdGV8fHt9LHQuX3NyYz1cInN0cmluZ1wiIT10eXBlb2YgZS5zcmM/ZS5zcmM6W2Uuc3JjXSx0Ll92b2x1bWU9dm9pZCAwIT09ZS52b2x1bWU/ZS52b2x1bWU6MSx0Ll9kdXJhdGlvbj0wLHQuX2xvYWRlZD0hMSx0Ll9zb3VuZHM9W10sdC5fZW5kVGltZXJzPXt9LHQuX3F1ZXVlPVtdLHQuX29uZW5kPWUub25lbmQ/W3tmbjplLm9uZW5kfV06W10sdC5fb25mYWRlPWUub25mYWRlP1t7Zm46ZS5vbmZhZGV9XTpbXSx0Ll9vbmxvYWQ9ZS5vbmxvYWQ/W3tmbjplLm9ubG9hZH1dOltdLHQuX29ubG9hZGVycm9yPWUub25sb2FkZXJyb3I/W3tmbjplLm9ubG9hZGVycm9yfV06W10sdC5fb25wYXVzZT1lLm9ucGF1c2U/W3tmbjplLm9ucGF1c2V9XTpbXSx0Ll9vbnBsYXk9ZS5vbnBsYXk/W3tmbjplLm9ucGxheX1dOltdLHQuX29uc3RvcD1lLm9uc3RvcD9be2ZuOmUub25zdG9wfV06W10sdC5fb25tdXRlPWUub25tdXRlP1t7Zm46ZS5vbm11dGV9XTpbXSx0Ll9vbnZvbHVtZT1lLm9udm9sdW1lP1t7Zm46ZS5vbnZvbHVtZX1dOltdLHQuX29ucmF0ZT1lLm9ucmF0ZT9be2ZuOmUub25yYXRlfV06W10sdC5fb25zZWVrPWUub25zZWVrP1t7Zm46ZS5vbnNlZWt9XTpbXSx0Ll93ZWJBdWRpbz1vJiYhdC5faHRtbDUsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4mJm4mJmEubW9iaWxlQXV0b0VuYWJsZSYmYS5fZW5hYmxlTW9iaWxlQXVkaW8oKSxhLl9ob3dscy5wdXNoKHQpLHQuX3ByZWxvYWQmJnQubG9hZCgpLHR9LGxvYWQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG49bnVsbDtpZih0KXJldHVybiB2b2lkIGUuX2VtaXQoXCJsb2FkZXJyb3JcIixudWxsLFwiTm8gYXVkaW8gc3VwcG9ydC5cIik7XCJzdHJpbmdcIj09dHlwZW9mIGUuX3NyYyYmKGUuX3NyYz1bZS5fc3JjXSk7Zm9yKHZhciBvPTA7bzxlLl9zcmMubGVuZ3RoO28rKyl7dmFyIHIsdTtpZihlLl9mb3JtYXQmJmUuX2Zvcm1hdFtvXT9yPWUuX2Zvcm1hdFtvXToodT1lLl9zcmNbb10scj0vXmRhdGE6YXVkaW9cXC8oW147LF0rKTsvaS5leGVjKHUpLHJ8fChyPS9cXC4oW14uXSspJC8uZXhlYyh1LnNwbGl0KFwiP1wiLDEpWzBdKSksciYmKHI9clsxXS50b0xvd2VyQ2FzZSgpKSksYS5jb2RlY3Mocikpe249ZS5fc3JjW29dO2JyZWFrfX1yZXR1cm4gbj8oZS5fc3JjPW4sXCJodHRwczpcIj09PXdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCYmXCJodHRwOlwiPT09bi5zbGljZSgwLDUpJiYoZS5faHRtbDU9ITAsZS5fd2ViQXVkaW89ITEpLG5ldyBfKGUpLGUuX3dlYkF1ZGlvJiZsKGUpLGUpOnZvaWQgZS5fZW1pdChcImxvYWRlcnJvclwiLG51bGwsXCJObyBjb2RlYyBzdXBwb3J0IGZvciBzZWxlY3RlZCBhdWRpbyBzb3VyY2VzLlwiKX0scGxheTpmdW5jdGlvbihlKXt2YXIgbz10aGlzLHQ9YXJndW1lbnRzLHI9bnVsbDtpZihcIm51bWJlclwiPT10eXBlb2YgZSlyPWUsZT1udWxsO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUpe2U9XCJfX2RlZmF1bHRcIjtmb3IodmFyIGQ9MCxpPTA7aTxvLl9zb3VuZHMubGVuZ3RoO2krKylvLl9zb3VuZHNbaV0uX3BhdXNlZCYmIW8uX3NvdW5kc1tpXS5fZW5kZWQmJihkKysscj1vLl9zb3VuZHNbaV0uX2lkKTsxPT09ZD9lPW51bGw6cj1udWxsfXZhciBfPXI/by5fc291bmRCeUlkKHIpOm8uX2luYWN0aXZlU291bmQoKTtpZighXylyZXR1cm4gbnVsbDtpZihyJiYhZSYmKGU9Xy5fc3ByaXRlfHxcIl9fZGVmYXVsdFwiKSwhby5fbG9hZGVkJiYhby5fc3ByaXRlW2VdKXJldHVybiBvLl9xdWV1ZS5wdXNoKHtldmVudDpcInBsYXlcIixhY3Rpb246ZnVuY3Rpb24oKXtvLnBsYXkoby5fc291bmRCeUlkKF8uX2lkKT9fLl9pZDp2b2lkIDApfX0pLF8uX2lkO2lmKHImJiFfLl9wYXVzZWQpcmV0dXJuIF8uX2lkO28uX3dlYkF1ZGlvJiZhLl9hdXRvUmVzdW1lKCk7dmFyIHM9Xy5fc2Vlaz4wP18uX3NlZWs6by5fc3ByaXRlW2VdWzBdLzFlMyxsPShvLl9zcHJpdGVbZV1bMF0rby5fc3ByaXRlW2VdWzFdKS8xZTMtcyxmPTFlMypsL01hdGguYWJzKF8uX3JhdGUpO2YhPT0xLzAmJihvLl9lbmRUaW1lcnNbXy5faWRdPXNldFRpbWVvdXQoby5fZW5kZWQuYmluZChvLF8pLGYpKSxfLl9wYXVzZWQ9ITEsXy5fZW5kZWQ9ITEsXy5fc3ByaXRlPWUsXy5fc2Vlaz1zLF8uX3N0YXJ0PW8uX3Nwcml0ZVtlXVswXS8xZTMsXy5fc3RvcD0oby5fc3ByaXRlW2VdWzBdK28uX3Nwcml0ZVtlXVsxXSkvMWUzLF8uX2xvb3A9ISghXy5fbG9vcCYmIW8uX3Nwcml0ZVtlXVsyXSk7dmFyIGM9Xy5fbm9kZTtpZihvLl93ZWJBdWRpbyl7dmFyIHA9ZnVuY3Rpb24oKXtvLl9yZWZyZXNoQnVmZmVyKF8pO3ZhciBlPV8uX211dGVkfHxvLl9tdXRlZD8wOl8uX3ZvbHVtZSphLnZvbHVtZSgpO2MuZ2Fpbi5zZXRWYWx1ZUF0VGltZShlLG4uY3VycmVudFRpbWUpLF8uX3BsYXlTdGFydD1uLmN1cnJlbnRUaW1lLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBjLmJ1ZmZlclNvdXJjZS5zdGFydD9fLl9sb29wP2MuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAscyw4NjQwMCk6Yy5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCxzLGwpOl8uX2xvb3A/Yy5idWZmZXJTb3VyY2Uuc3RhcnQoMCxzLDg2NDAwKTpjLmJ1ZmZlclNvdXJjZS5zdGFydCgwLHMsbCksby5fZW5kVGltZXJzW18uX2lkXXx8Zj09PTEvMHx8KG8uX2VuZFRpbWVyc1tfLl9pZF09c2V0VGltZW91dChvLl9lbmRlZC5iaW5kKG8sXyksZikpLHRbMV18fHNldFRpbWVvdXQoZnVuY3Rpb24oKXtvLl9lbWl0KFwicGxheVwiLF8uX2lkKX0sMCl9O28uX2xvYWRlZD9wKCk6KG8ub25jZShcImxvYWRcIixwLF8uX2lkKSxvLl9jbGVhclRpbWVyKF8uX2lkKSl9ZWxzZXt2YXIgbT1mdW5jdGlvbigpe2MuY3VycmVudFRpbWU9cyxjLm11dGVkPV8uX211dGVkfHxvLl9tdXRlZHx8YS5fbXV0ZWR8fGMubXV0ZWQsYy52b2x1bWU9Xy5fdm9sdW1lKmEudm9sdW1lKCksYy5wbGF5YmFja1JhdGU9Xy5fcmF0ZSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Yy5wbGF5KCksdFsxXXx8by5fZW1pdChcInBsYXlcIixfLl9pZCl9LDApfTtpZig0PT09Yy5yZWFkeVN0YXRlfHwhYy5yZWFkeVN0YXRlJiZuYXZpZ2F0b3IuaXNDb2Nvb25KUyltKCk7ZWxzZXt2YXIgdj1mdW5jdGlvbigpe2YhPT0xLzAmJihvLl9lbmRUaW1lcnNbXy5faWRdPXNldFRpbWVvdXQoby5fZW5kZWQuYmluZChvLF8pLGYpKSxtKCksYy5yZW1vdmVFdmVudExpc3RlbmVyKHUsdiwhMSl9O2MuYWRkRXZlbnRMaXN0ZW5lcih1LHYsITEpLG8uX2NsZWFyVGltZXIoXy5faWQpfX1yZXR1cm4gXy5faWR9LHBhdXNlOmZ1bmN0aW9uKGUpe3ZhciBuPXRoaXM7aWYoIW4uX2xvYWRlZClyZXR1cm4gbi5fcXVldWUucHVzaCh7ZXZlbnQ6XCJwYXVzZVwiLGFjdGlvbjpmdW5jdGlvbigpe24ucGF1c2UoZSl9fSksbjtmb3IodmFyIG89bi5fZ2V0U291bmRJZHMoZSksdD0wO3Q8by5sZW5ndGg7dCsrKXtuLl9jbGVhclRpbWVyKG9bdF0pO3ZhciByPW4uX3NvdW5kQnlJZChvW3RdKTtpZihyJiYhci5fcGF1c2VkKXtpZihyLl9zZWVrPW4uc2VlayhvW3RdKSxyLl9wYXVzZWQ9ITAsbi5fc3RvcEZhZGUob1t0XSksci5fbm9kZSlpZihuLl93ZWJBdWRpbyl7aWYoIXIuX25vZGUuYnVmZmVyU291cmNlKXJldHVybiBuO1widW5kZWZpbmVkXCI9PXR5cGVvZiByLl9ub2RlLmJ1ZmZlclNvdXJjZS5zdG9wP3IuX25vZGUuYnVmZmVyU291cmNlLm5vdGVPZmYoMCk6ci5fbm9kZS5idWZmZXJTb3VyY2Uuc3RvcCgwKSxyLl9ub2RlLmJ1ZmZlclNvdXJjZT1udWxsfWVsc2UgaXNOYU4oci5fbm9kZS5kdXJhdGlvbikmJnIuX25vZGUuZHVyYXRpb24hPT0xLzB8fHIuX25vZGUucGF1c2UoKTthcmd1bWVudHNbMV18fG4uX2VtaXQoXCJwYXVzZVwiLHIuX2lkKX19cmV0dXJuIG59LHN0b3A6ZnVuY3Rpb24oZSl7dmFyIG49dGhpcztpZighbi5fbG9hZGVkKXJldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLl9zb3VuZHNbMF0uX3Nwcml0ZSYmbi5fcXVldWUucHVzaCh7ZXZlbnQ6XCJzdG9wXCIsYWN0aW9uOmZ1bmN0aW9uKCl7bi5zdG9wKGUpfX0pLG47Zm9yKHZhciBvPW4uX2dldFNvdW5kSWRzKGUpLHQ9MDt0PG8ubGVuZ3RoO3QrKyl7bi5fY2xlYXJUaW1lcihvW3RdKTt2YXIgcj1uLl9zb3VuZEJ5SWQob1t0XSk7aWYociYmIXIuX3BhdXNlZCl7aWYoci5fc2Vlaz1yLl9zdGFydHx8MCxyLl9wYXVzZWQ9ITAsci5fZW5kZWQ9ITAsbi5fc3RvcEZhZGUob1t0XSksci5fbm9kZSlpZihuLl93ZWJBdWRpbyl7aWYoIXIuX25vZGUuYnVmZmVyU291cmNlKXJldHVybiBuO1widW5kZWZpbmVkXCI9PXR5cGVvZiByLl9ub2RlLmJ1ZmZlclNvdXJjZS5zdG9wP3IuX25vZGUuYnVmZmVyU291cmNlLm5vdGVPZmYoMCk6ci5fbm9kZS5idWZmZXJTb3VyY2Uuc3RvcCgwKSxyLl9ub2RlLmJ1ZmZlclNvdXJjZT1udWxsfWVsc2UgaXNOYU4oci5fbm9kZS5kdXJhdGlvbikmJnIuX25vZGUuZHVyYXRpb24hPT0xLzB8fChyLl9ub2RlLnBhdXNlKCksci5fbm9kZS5jdXJyZW50VGltZT1yLl9zdGFydHx8MCk7bi5fZW1pdChcInN0b3BcIixyLl9pZCl9fXJldHVybiBufSxtdXRlOmZ1bmN0aW9uKGUsbyl7dmFyIHQ9dGhpcztpZighdC5fbG9hZGVkKXJldHVybiB0Ll9xdWV1ZS5wdXNoKHtldmVudDpcIm11dGVcIixhY3Rpb246ZnVuY3Rpb24oKXt0Lm11dGUoZSxvKX19KSx0O2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBvKXtpZihcImJvb2xlYW5cIiE9dHlwZW9mIGUpcmV0dXJuIHQuX211dGVkO3QuX211dGVkPWV9Zm9yKHZhciByPXQuX2dldFNvdW5kSWRzKG8pLHU9MDt1PHIubGVuZ3RoO3UrKyl7dmFyIGQ9dC5fc291bmRCeUlkKHJbdV0pO2QmJihkLl9tdXRlZD1lLHQuX3dlYkF1ZGlvJiZkLl9ub2RlP2QuX25vZGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZShlPzA6ZC5fdm9sdW1lKmEudm9sdW1lKCksbi5jdXJyZW50VGltZSk6ZC5fbm9kZSYmKGQuX25vZGUubXV0ZWQ9YS5fbXV0ZWQ/ITA6ZSksdC5fZW1pdChcIm11dGVcIixkLl9pZCkpfXJldHVybiB0fSx2b2x1bWU6ZnVuY3Rpb24oKXt2YXIgZSxvLHQ9dGhpcyxyPWFyZ3VtZW50cztpZigwPT09ci5sZW5ndGgpcmV0dXJuIHQuX3ZvbHVtZTtpZigxPT09ci5sZW5ndGgpe3ZhciB1PXQuX2dldFNvdW5kSWRzKCksZD11LmluZGV4T2YoclswXSk7ZD49MD9vPXBhcnNlSW50KHJbMF0sMTApOmU9cGFyc2VGbG9hdChyWzBdKX1lbHNlIHIubGVuZ3RoPj0yJiYoZT1wYXJzZUZsb2F0KHJbMF0pLG89cGFyc2VJbnQoclsxXSwxMCkpO3ZhciBpO2lmKCEoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUmJmU+PTAmJjE+PWUpKXJldHVybiBpPW8/dC5fc291bmRCeUlkKG8pOnQuX3NvdW5kc1swXSxpP2kuX3ZvbHVtZTowO2lmKCF0Ll9sb2FkZWQpcmV0dXJuIHQuX3F1ZXVlLnB1c2goe2V2ZW50Olwidm9sdW1lXCIsYWN0aW9uOmZ1bmN0aW9uKCl7dC52b2x1bWUuYXBwbHkodCxyKX19KSx0O1widW5kZWZpbmVkXCI9PXR5cGVvZiBvJiYodC5fdm9sdW1lPWUpLG89dC5fZ2V0U291bmRJZHMobyk7Zm9yKHZhciBfPTA7XzxvLmxlbmd0aDtfKyspaT10Ll9zb3VuZEJ5SWQob1tfXSksaSYmKGkuX3ZvbHVtZT1lLHJbMl18fHQuX3N0b3BGYWRlKG9bX10pLHQuX3dlYkF1ZGlvJiZpLl9ub2RlJiYhaS5fbXV0ZWQ/aS5fbm9kZS5nYWluLnNldFZhbHVlQXRUaW1lKGUqYS52b2x1bWUoKSxuLmN1cnJlbnRUaW1lKTppLl9ub2RlJiYhaS5fbXV0ZWQmJihpLl9ub2RlLnZvbHVtZT1lKmEudm9sdW1lKCkpLHQuX2VtaXQoXCJ2b2x1bWVcIixpLl9pZCkpO3JldHVybiB0fSxmYWRlOmZ1bmN0aW9uKGUsbyx0LHIpe3ZhciB1PXRoaXM7aWYoIXUuX2xvYWRlZClyZXR1cm4gdS5fcXVldWUucHVzaCh7ZXZlbnQ6XCJmYWRlXCIsYWN0aW9uOmZ1bmN0aW9uKCl7dS5mYWRlKGUsbyx0LHIpfX0pLHU7dS52b2x1bWUoZSxyKTtmb3IodmFyIGQ9dS5fZ2V0U291bmRJZHMociksYT0wO2E8ZC5sZW5ndGg7YSsrKXt2YXIgaT11Ll9zb3VuZEJ5SWQoZFthXSk7aWYoaSlpZihyfHx1Ll9zdG9wRmFkZShkW2FdKSx1Ll93ZWJBdWRpbyYmIWkuX211dGVkKXt2YXIgXz1uLmN1cnJlbnRUaW1lLHM9Xyt0LzFlMztpLl92b2x1bWU9ZSxpLl9ub2RlLmdhaW4uc2V0VmFsdWVBdFRpbWUoZSxfKSxpLl9ub2RlLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUobyxzKSxpLl90aW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oZSx0KXtkZWxldGUgdC5fdGltZW91dCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5fdm9sdW1lPW8sdS5fZW1pdChcImZhZGVcIixlKX0scy1uLmN1cnJlbnRUaW1lPjA/TWF0aC5jZWlsKDFlMyoocy1uLmN1cnJlbnRUaW1lKSk6MCl9LmJpbmQodSxkW2FdLGkpLHQpfWVsc2V7dmFyIGw9TWF0aC5hYnMoZS1vKSxmPWU+bz9cIm91dFwiOlwiaW5cIixjPWwvLjAxLHA9dC9jOyFmdW5jdGlvbigpe3ZhciBuPWU7aS5faW50ZXJ2YWw9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oZSx0KXtuKz1cImluXCI9PT1mPy4wMTotLjAxLG49TWF0aC5tYXgoMCxuKSxuPU1hdGgubWluKDEsbiksbj1NYXRoLnJvdW5kKDEwMCpuKS8xMDAsdS52b2x1bWUobixlLCEwKSxuPT09byYmKGNsZWFySW50ZXJ2YWwodC5faW50ZXJ2YWwpLGRlbGV0ZSB0Ll9pbnRlcnZhbCx1Ll9lbWl0KFwiZmFkZVwiLGUpKX0uYmluZCh1LGRbYV0saSkscCl9KCl9fXJldHVybiB1fSxfc3RvcEZhZGU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcyx0PW8uX3NvdW5kQnlJZChlKTtyZXR1cm4gdC5faW50ZXJ2YWw/KGNsZWFySW50ZXJ2YWwodC5faW50ZXJ2YWwpLGRlbGV0ZSB0Ll9pbnRlcnZhbCxvLl9lbWl0KFwiZmFkZVwiLGUpKTp0Ll90aW1lb3V0JiYoY2xlYXJUaW1lb3V0KHQuX3RpbWVvdXQpLGRlbGV0ZSB0Ll90aW1lb3V0LHQuX25vZGUuZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXMobi5jdXJyZW50VGltZSksby5fZW1pdChcImZhZGVcIixlKSksb30sbG9vcDpmdW5jdGlvbigpe3ZhciBlLG4sbyx0PXRoaXMscj1hcmd1bWVudHM7aWYoMD09PXIubGVuZ3RoKXJldHVybiB0Ll9sb29wO2lmKDE9PT1yLmxlbmd0aCl7aWYoXCJib29sZWFuXCIhPXR5cGVvZiByWzBdKXJldHVybiBvPXQuX3NvdW5kQnlJZChwYXJzZUludChyWzBdLDEwKSksbz9vLl9sb29wOiExO2U9clswXSx0Ll9sb29wPWV9ZWxzZSAyPT09ci5sZW5ndGgmJihlPXJbMF0sbj1wYXJzZUludChyWzFdLDEwKSk7Zm9yKHZhciB1PXQuX2dldFNvdW5kSWRzKG4pLGQ9MDtkPHUubGVuZ3RoO2QrKylvPXQuX3NvdW5kQnlJZCh1W2RdKSxvJiYoby5fbG9vcD1lLHQuX3dlYkF1ZGlvJiZvLl9ub2RlJiZvLl9ub2RlLmJ1ZmZlclNvdXJjZSYmKG8uX25vZGUuYnVmZmVyU291cmNlLmxvb3A9ZSkpO3JldHVybiB0fSxyYXRlOmZ1bmN0aW9uKCl7dmFyIGUsbixvPXRoaXMsdD1hcmd1bWVudHM7aWYoMD09PXQubGVuZ3RoKW49by5fc291bmRzWzBdLl9pZDtlbHNlIGlmKDE9PT10Lmxlbmd0aCl7dmFyIHI9by5fZ2V0U291bmRJZHMoKSx1PXIuaW5kZXhPZih0WzBdKTt1Pj0wP249cGFyc2VJbnQodFswXSwxMCk6ZT1wYXJzZUZsb2F0KHRbMF0pfWVsc2UgMj09PXQubGVuZ3RoJiYoZT1wYXJzZUZsb2F0KHRbMF0pLG49cGFyc2VJbnQodFsxXSwxMCkpO3ZhciBkO2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlKXJldHVybiBkPW8uX3NvdW5kQnlJZChuKSxkP2QuX3JhdGU6by5fcmF0ZTtpZighby5fbG9hZGVkKXJldHVybiBvLl9xdWV1ZS5wdXNoKHtldmVudDpcInJhdGVcIixhY3Rpb246ZnVuY3Rpb24oKXtvLnJhdGUuYXBwbHkobyx0KX19KSxvO1widW5kZWZpbmVkXCI9PXR5cGVvZiBuJiYoby5fcmF0ZT1lKSxuPW8uX2dldFNvdW5kSWRzKG4pO2Zvcih2YXIgYT0wO2E8bi5sZW5ndGg7YSsrKWlmKGQ9by5fc291bmRCeUlkKG5bYV0pKXtkLl9yYXRlPWUsby5fd2ViQXVkaW8mJmQuX25vZGUmJmQuX25vZGUuYnVmZmVyU291cmNlP2QuX25vZGUuYnVmZmVyU291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZT1lOmQuX25vZGUmJihkLl9ub2RlLnBsYXliYWNrUmF0ZT1lKTt2YXIgaT1vLnNlZWsoblthXSksXz0oby5fc3ByaXRlW2QuX3Nwcml0ZV1bMF0rby5fc3ByaXRlW2QuX3Nwcml0ZV1bMV0pLzFlMy1pLHM9MWUzKl8vTWF0aC5hYnMoZC5fcmF0ZSk7by5fY2xlYXJUaW1lcihuW2FdKSxvLl9lbmRUaW1lcnNbblthXV09c2V0VGltZW91dChvLl9lbmRlZC5iaW5kKG8sZCkscyksby5fZW1pdChcInJhdGVcIixkLl9pZCl9cmV0dXJuIG99LHNlZWs6ZnVuY3Rpb24oKXt2YXIgZSxvLHQ9dGhpcyxyPWFyZ3VtZW50cztpZigwPT09ci5sZW5ndGgpbz10Ll9zb3VuZHNbMF0uX2lkO2Vsc2UgaWYoMT09PXIubGVuZ3RoKXt2YXIgdT10Ll9nZXRTb3VuZElkcygpLGQ9dS5pbmRleE9mKHJbMF0pO2Q+PTA/bz1wYXJzZUludChyWzBdLDEwKToobz10Ll9zb3VuZHNbMF0uX2lkLGU9cGFyc2VGbG9hdChyWzBdKSl9ZWxzZSAyPT09ci5sZW5ndGgmJihlPXBhcnNlRmxvYXQoclswXSksbz1wYXJzZUludChyWzFdLDEwKSk7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIG8pcmV0dXJuIHQ7aWYoIXQuX2xvYWRlZClyZXR1cm4gdC5fcXVldWUucHVzaCh7ZXZlbnQ6XCJzZWVrXCIsYWN0aW9uOmZ1bmN0aW9uKCl7dC5zZWVrLmFwcGx5KHQscil9fSksdDt2YXIgYT10Ll9zb3VuZEJ5SWQobyk7aWYoYSl7aWYoIShlPj0wKSlyZXR1cm4gdC5fd2ViQXVkaW8/YS5fc2VlaysodC5wbGF5aW5nKG8pP24uY3VycmVudFRpbWUtYS5fcGxheVN0YXJ0OjApOmEuX25vZGUuY3VycmVudFRpbWU7dmFyIGk9dC5wbGF5aW5nKG8pO2kmJnQucGF1c2UobywhMCksYS5fc2Vlaz1lLHQuX2NsZWFyVGltZXIobyksaSYmdC5wbGF5KG8sITApLHQuX2VtaXQoXCJzZWVrXCIsbyl9cmV0dXJuIHR9LHBsYXlpbmc6ZnVuY3Rpb24oZSl7dmFyIG49dGhpcyxvPW4uX3NvdW5kQnlJZChlKXx8bi5fc291bmRzWzBdO3JldHVybiBvPyFvLl9wYXVzZWQ6ITF9LGR1cmF0aW9uOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2R1cmF0aW9ufSx1bmxvYWQ6ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcyxuPWUuX3NvdW5kcyxvPTA7bzxuLmxlbmd0aDtvKyspe25bb10uX3BhdXNlZHx8KGUuc3RvcChuW29dLl9pZCksZS5fZW1pdChcImVuZFwiLG5bb10uX2lkKSksZS5fd2ViQXVkaW98fChuW29dLl9ub2RlLnNyYz1cIlwiLG5bb10uX25vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsbltvXS5fZXJyb3JGbiwhMSksbltvXS5fbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHUsbltvXS5fbG9hZEZuLCExKSksZGVsZXRlIG5bb10uX25vZGUsZS5fY2xlYXJUaW1lcihuW29dLl9pZCk7dmFyIHQ9YS5faG93bHMuaW5kZXhPZihlKTt0Pj0wJiZhLl9ob3dscy5zcGxpY2UodCwxKX1yZXR1cm4gcyYmZGVsZXRlIHNbZS5fc3JjXSxlLl9zb3VuZHM9W10sZT1udWxsLG51bGx9LG9uOmZ1bmN0aW9uKGUsbixvLHQpe3ZhciByPXRoaXMsdT1yW1wiX29uXCIrZV07cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmdS5wdXNoKHQ/e2lkOm8sZm46bixvbmNlOnR9OntpZDpvLGZuOm59KSxyfSxvZmY6ZnVuY3Rpb24oZSxuLG8pe3ZhciB0PXRoaXMscj10W1wiX29uXCIrZV07aWYobil7Zm9yKHZhciB1PTA7dTxyLmxlbmd0aDt1KyspaWYobj09PXJbdV0uZm4mJm89PT1yW3VdLmlkKXtyLnNwbGljZSh1LDEpO2JyZWFrfX1lbHNlIGlmKGUpdFtcIl9vblwiK2VdPVtdO2Vsc2UgZm9yKHZhciBkPU9iamVjdC5rZXlzKHQpLHU9MDt1PGQubGVuZ3RoO3UrKykwPT09ZFt1XS5pbmRleE9mKFwiX29uXCIpJiZBcnJheS5pc0FycmF5KHRbZFt1XV0pJiYodFtkW3VdXT1bXSk7cmV0dXJuIHR9LG9uY2U6ZnVuY3Rpb24oZSxuLG8pe3ZhciB0PXRoaXM7cmV0dXJuIHQub24oZSxuLG8sMSksdH0sX2VtaXQ6ZnVuY3Rpb24oZSxuLG8pe2Zvcih2YXIgdD10aGlzLHI9dFtcIl9vblwiK2VdLHU9ci5sZW5ndGgtMTt1Pj0wO3UtLSlyW3VdLmlkJiZyW3VdLmlkIT09biYmXCJsb2FkXCIhPT1lfHwoc2V0VGltZW91dChmdW5jdGlvbihlKXtlLmNhbGwodGhpcyxuLG8pfS5iaW5kKHQsclt1XS5mbiksMCksclt1XS5vbmNlJiZ0Lm9mZihlLHJbdV0uZm4sclt1XS5pZCkpO3JldHVybiB0fSxfbG9hZFF1ZXVlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZihlLl9xdWV1ZS5sZW5ndGg+MCl7dmFyIG49ZS5fcXVldWVbMF07ZS5vbmNlKG4uZXZlbnQsZnVuY3Rpb24oKXtlLl9xdWV1ZS5zaGlmdCgpLGUuX2xvYWRRdWV1ZSgpfSksbi5hY3Rpb24oKX1yZXR1cm4gZX0sX2VuZGVkOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXMsdD1lLl9zcHJpdGUscj0hKCFlLl9sb29wJiYhby5fc3ByaXRlW3RdWzJdKTtpZihvLl9lbWl0KFwiZW5kXCIsZS5faWQpLCFvLl93ZWJBdWRpbyYmciYmby5zdG9wKGUuX2lkKS5wbGF5KGUuX2lkKSxvLl93ZWJBdWRpbyYmcil7by5fZW1pdChcInBsYXlcIixlLl9pZCksZS5fc2Vlaz1lLl9zdGFydHx8MCxlLl9wbGF5U3RhcnQ9bi5jdXJyZW50VGltZTt2YXIgdT0xZTMqKGUuX3N0b3AtZS5fc3RhcnQpL01hdGguYWJzKGUuX3JhdGUpO28uX2VuZFRpbWVyc1tlLl9pZF09c2V0VGltZW91dChvLl9lbmRlZC5iaW5kKG8sZSksdSl9cmV0dXJuIG8uX3dlYkF1ZGlvJiYhciYmKGUuX3BhdXNlZD0hMCxlLl9lbmRlZD0hMCxlLl9zZWVrPWUuX3N0YXJ0fHwwLG8uX2NsZWFyVGltZXIoZS5faWQpLGUuX25vZGUuYnVmZmVyU291cmNlPW51bGwsYS5fYXV0b1N1c3BlbmQoKSksby5fd2ViQXVkaW98fHJ8fG8uc3RvcChlLl9pZCksb30sX2NsZWFyVGltZXI6ZnVuY3Rpb24oZSl7dmFyIG49dGhpcztyZXR1cm4gbi5fZW5kVGltZXJzW2VdJiYoY2xlYXJUaW1lb3V0KG4uX2VuZFRpbWVyc1tlXSksZGVsZXRlIG4uX2VuZFRpbWVyc1tlXSksbn0sX3NvdW5kQnlJZDpmdW5jdGlvbihlKXtmb3IodmFyIG49dGhpcyxvPTA7bzxuLl9zb3VuZHMubGVuZ3RoO28rKylpZihlPT09bi5fc291bmRzW29dLl9pZClyZXR1cm4gbi5fc291bmRzW29dO3JldHVybiBudWxsfSxfaW5hY3RpdmVTb3VuZDpmdW5jdGlvbigpe3ZhciBlPXRoaXM7ZS5fZHJhaW4oKTtmb3IodmFyIG49MDtuPGUuX3NvdW5kcy5sZW5ndGg7bisrKWlmKGUuX3NvdW5kc1tuXS5fZW5kZWQpcmV0dXJuIGUuX3NvdW5kc1tuXS5yZXNldCgpO3JldHVybiBuZXcgXyhlKX0sX2RyYWluOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxuPWUuX3Bvb2wsbz0wLHQ9MDtpZighKGUuX3NvdW5kcy5sZW5ndGg8bikpe2Zvcih0PTA7dDxlLl9zb3VuZHMubGVuZ3RoO3QrKyllLl9zb3VuZHNbdF0uX2VuZGVkJiZvKys7Zm9yKHQ9ZS5fc291bmRzLmxlbmd0aC0xO3Q+PTA7dC0tKXtpZihuPj1vKXJldHVybjtlLl9zb3VuZHNbdF0uX2VuZGVkJiYoZS5fd2ViQXVkaW8mJmUuX3NvdW5kc1t0XS5fbm9kZSYmZS5fc291bmRzW3RdLl9ub2RlLmRpc2Nvbm5lY3QoMCksZS5fc291bmRzLnNwbGljZSh0LDEpLG8tLSl9fX0sX2dldFNvdW5kSWRzOmZ1bmN0aW9uKGUpe3ZhciBuPXRoaXM7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUpe2Zvcih2YXIgbz1bXSx0PTA7dDxuLl9zb3VuZHMubGVuZ3RoO3QrKylvLnB1c2gobi5fc291bmRzW3RdLl9pZCk7cmV0dXJuIG99cmV0dXJuW2VdfSxfcmVmcmVzaEJ1ZmZlcjpmdW5jdGlvbihlKXt2YXIgbz10aGlzO3JldHVybiBlLl9ub2RlLmJ1ZmZlclNvdXJjZT1uLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpLGUuX25vZGUuYnVmZmVyU291cmNlLmJ1ZmZlcj1zW28uX3NyY10sZS5fbm9kZS5idWZmZXJTb3VyY2UuY29ubmVjdChlLl9wYW5uZXI/ZS5fcGFubmVyOmUuX25vZGUpLGUuX25vZGUuYnVmZmVyU291cmNlLmxvb3A9ZS5fbG9vcCxlLl9sb29wJiYoZS5fbm9kZS5idWZmZXJTb3VyY2UubG9vcFN0YXJ0PWUuX3N0YXJ0fHwwLGUuX25vZGUuYnVmZmVyU291cmNlLmxvb3BFbmQ9ZS5fc3RvcCksZS5fbm9kZS5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlPW8uX3JhdGUsb319O3ZhciBfPWZ1bmN0aW9uKGUpe3RoaXMuX3BhcmVudD1lLHRoaXMuaW5pdCgpfTtpZihfLnByb3RvdHlwZT17aW5pdDpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj1lLl9wYXJlbnQ7cmV0dXJuIGUuX211dGVkPW4uX211dGVkLGUuX2xvb3A9bi5fbG9vcCxlLl92b2x1bWU9bi5fdm9sdW1lLGUuX211dGVkPW4uX211dGVkLGUuX3JhdGU9bi5fcmF0ZSxlLl9zZWVrPTAsZS5fcGF1c2VkPSEwLGUuX2VuZGVkPSEwLGUuX3Nwcml0ZT1cIl9fZGVmYXVsdFwiLGUuX2lkPU1hdGgucm91bmQoRGF0ZS5ub3coKSpNYXRoLnJhbmRvbSgpKSxuLl9zb3VuZHMucHVzaChlKSxlLmNyZWF0ZSgpLGV9LGNyZWF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbz1lLl9wYXJlbnQsdD1hLl9tdXRlZHx8ZS5fbXV0ZWR8fGUuX3BhcmVudC5fbXV0ZWQ/MDplLl92b2x1bWUqYS52b2x1bWUoKTtyZXR1cm4gby5fd2ViQXVkaW8/KGUuX25vZGU9XCJ1bmRlZmluZWRcIj09dHlwZW9mIG4uY3JlYXRlR2Fpbj9uLmNyZWF0ZUdhaW5Ob2RlKCk6bi5jcmVhdGVHYWluKCksZS5fbm9kZS5nYWluLnNldFZhbHVlQXRUaW1lKHQsbi5jdXJyZW50VGltZSksZS5fbm9kZS5wYXVzZWQ9ITAsZS5fbm9kZS5jb25uZWN0KHIpKTooZS5fbm9kZT1uZXcgQXVkaW8sZS5fZXJyb3JGbj1lLl9lcnJvckxpc3RlbmVyLmJpbmQoZSksZS5fbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixlLl9lcnJvckZuLCExKSxlLl9sb2FkRm49ZS5fbG9hZExpc3RlbmVyLmJpbmQoZSksZS5fbm9kZS5hZGRFdmVudExpc3RlbmVyKHUsZS5fbG9hZEZuLCExKSxlLl9ub2RlLnNyYz1vLl9zcmMsZS5fbm9kZS5wcmVsb2FkPVwiYXV0b1wiLGUuX25vZGUudm9sdW1lPXQsZS5fbm9kZS5sb2FkKCkpLGV9LHJlc2V0OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxuPWUuX3BhcmVudDtyZXR1cm4gZS5fbXV0ZWQ9bi5fbXV0ZWQsZS5fbG9vcD1uLl9sb29wLGUuX3ZvbHVtZT1uLl92b2x1bWUsZS5fbXV0ZWQ9bi5fbXV0ZWQsZS5fcmF0ZT1uLl9yYXRlLGUuX3NlZWs9MCxlLl9wYXVzZWQ9ITAsZS5fZW5kZWQ9ITAsZS5fc3ByaXRlPVwiX19kZWZhdWx0XCIsZS5faWQ9TWF0aC5yb3VuZChEYXRlLm5vdygpKk1hdGgucmFuZG9tKCkpLGV9LF9lcnJvckxpc3RlbmVyOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztlLl9ub2RlLmVycm9yJiY0PT09ZS5fbm9kZS5lcnJvci5jb2RlJiYoYS5ub0F1ZGlvPSEwKSxlLl9wYXJlbnQuX2VtaXQoXCJsb2FkZXJyb3JcIixlLl9pZCxlLl9ub2RlLmVycm9yP2UuX25vZGUuZXJyb3IuY29kZTowKSxlLl9ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGUuX2Vycm9yTGlzdGVuZXIsITEpfSxfbG9hZExpc3RlbmVyOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxuPWUuX3BhcmVudDtuLl9kdXJhdGlvbj1NYXRoLmNlaWwoMTAqZS5fbm9kZS5kdXJhdGlvbikvMTAsMD09PU9iamVjdC5rZXlzKG4uX3Nwcml0ZSkubGVuZ3RoJiYobi5fc3ByaXRlPXtfX2RlZmF1bHQ6WzAsMWUzKm4uX2R1cmF0aW9uXX0pLG4uX2xvYWRlZHx8KG4uX2xvYWRlZD0hMCxuLl9lbWl0KFwibG9hZFwiKSxuLl9sb2FkUXVldWUoKSksbi5fYXV0b3BsYXkmJm4ucGxheSgpLGUuX25vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih1LGUuX2xvYWRGbiwhMSl9fSxvKXZhciBzPXt9LGw9ZnVuY3Rpb24oZSl7dmFyIG49ZS5fc3JjO2lmKHNbbl0pcmV0dXJuIGUuX2R1cmF0aW9uPXNbbl0uZHVyYXRpb24sdm9pZCBwKGUpO2lmKC9eZGF0YTpbXjtdKztiYXNlNjQsLy50ZXN0KG4pKXt3aW5kb3cuYXRvYj13aW5kb3cuYXRvYnx8ZnVuY3Rpb24oZSl7Zm9yKHZhciBuLG8sdD1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCIscj1TdHJpbmcoZSkucmVwbGFjZSgvPSskLyxcIlwiKSx1PTAsZD0wLGE9XCJcIjtvPXIuY2hhckF0KGQrKyk7fm8mJihuPXUlND82NCpuK286byx1KyslNCk/YSs9U3RyaW5nLmZyb21DaGFyQ29kZSgyNTUmbj4+KC0yKnUmNikpOjApbz10LmluZGV4T2Yobyk7cmV0dXJuIGF9O2Zvcih2YXIgbz1hdG9iKG4uc3BsaXQoXCIsXCIpWzFdKSx0PW5ldyBVaW50OEFycmF5KG8ubGVuZ3RoKSxyPTA7cjxvLmxlbmd0aDsrK3IpdFtyXT1vLmNoYXJDb2RlQXQocik7Yyh0LmJ1ZmZlcixlKX1lbHNle3ZhciB1PW5ldyBYTUxIdHRwUmVxdWVzdDt1Lm9wZW4oXCJHRVRcIixuLCEwKSx1LnJlc3BvbnNlVHlwZT1cImFycmF5YnVmZmVyXCIsdS5vbmxvYWQ9ZnVuY3Rpb24oKXtjKHUucmVzcG9uc2UsZSl9LHUub25lcnJvcj1mdW5jdGlvbigpe2UuX3dlYkF1ZGlvJiYoZS5faHRtbDU9ITAsZS5fd2ViQXVkaW89ITEsZS5fc291bmRzPVtdLGRlbGV0ZSBzW25dLGUubG9hZCgpKX0sZih1KX19LGY9ZnVuY3Rpb24oZSl7dHJ5e2Uuc2VuZCgpfWNhdGNoKG4pe2Uub25lcnJvcigpfX0sYz1mdW5jdGlvbihlLG8pe24uZGVjb2RlQXVkaW9EYXRhKGUsZnVuY3Rpb24oZSl7ZSYmby5fc291bmRzLmxlbmd0aD4wJiYoc1tvLl9zcmNdPWUscChvLGUpKX0sZnVuY3Rpb24oKXtvLl9lbWl0KFwibG9hZGVycm9yXCIsbnVsbCxcIkRlY29kaW5nIGF1ZGlvIGRhdGEgZmFpbGVkLlwiKX0pfSxwPWZ1bmN0aW9uKGUsbil7biYmIWUuX2R1cmF0aW9uJiYoZS5fZHVyYXRpb249bi5kdXJhdGlvbiksMD09PU9iamVjdC5rZXlzKGUuX3Nwcml0ZSkubGVuZ3RoJiYoZS5fc3ByaXRlPXtfX2RlZmF1bHQ6WzAsMWUzKmUuX2R1cmF0aW9uXX0pLGUuX2xvYWRlZHx8KGUuX2xvYWRlZD0hMCxlLl9lbWl0KFwibG9hZFwiKSxlLl9sb2FkUXVldWUoKSksZS5fYXV0b3BsYXkmJmUucGxheSgpfTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShbXSxmdW5jdGlvbigpe3JldHVybntIb3dsZXI6YSxIb3dsOml9fSksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMmJihleHBvcnRzLkhvd2xlcj1hLGV4cG9ydHMuSG93bD1pKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93Pyh3aW5kb3cuSG93bGVyR2xvYmFsPWQsd2luZG93Lkhvd2xlcj1hLHdpbmRvdy5Ib3dsPWksd2luZG93LlNvdW5kPV8pOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWwmJihnbG9iYWwuSG93bGVyR2xvYmFsPWQsZ2xvYmFsLkhvd2xlcj1hLGdsb2JhbC5Ib3dsPWksZ2xvYmFsLlNvdW5kPV8pfSgpO1xuLyohIEVmZmVjdHMgUGx1Z2luICovXG4hZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtIb3dsZXJHbG9iYWwucHJvdG90eXBlLl9wb3M9WzAsMCwwXSxIb3dsZXJHbG9iYWwucHJvdG90eXBlLl9vcmllbnRhdGlvbj1bMCwwLC0xLDAsMSwwXSxIb3dsZXJHbG9iYWwucHJvdG90eXBlLl92ZWxvY2l0eT1bMCwwLDBdLEhvd2xlckdsb2JhbC5wcm90b3R5cGUuX2xpc3RlbmVyQXR0cj17ZG9wcGxlckZhY3RvcjoxLHNwZWVkT2ZTb3VuZDozNDMuM30sSG93bGVyR2xvYmFsLnByb3RvdHlwZS5wb3M9ZnVuY3Rpb24oZSxuLHQpe3ZhciBvPXRoaXM7cmV0dXJuIG8uY3R4JiZvLmN0eC5saXN0ZW5lcj8obj1cIm51bWJlclwiIT10eXBlb2Ygbj9vLl9wb3NbMV06bix0PVwibnVtYmVyXCIhPXR5cGVvZiB0P28uX3Bvc1syXTp0LFwibnVtYmVyXCIhPXR5cGVvZiBlP28uX3Bvczooby5fcG9zPVtlLG4sdF0sby5jdHgubGlzdGVuZXIuc2V0UG9zaXRpb24oby5fcG9zWzBdLG8uX3Bvc1sxXSxvLl9wb3NbMl0pLG8pKTpvfSxIb3dsZXJHbG9iYWwucHJvdG90eXBlLm9yaWVudGF0aW9uPWZ1bmN0aW9uKGUsbix0LG8scixpKXt2YXIgYT10aGlzO2lmKCFhLmN0eHx8IWEuY3R4Lmxpc3RlbmVyKXJldHVybiBhO3ZhciBwPWEuX29yaWVudGF0aW9uO3JldHVybiBuPVwibnVtYmVyXCIhPXR5cGVvZiBuP3BbMV06bix0PVwibnVtYmVyXCIhPXR5cGVvZiB0P3BbMl06dCxvPVwibnVtYmVyXCIhPXR5cGVvZiBvP3BbM106byxyPVwibnVtYmVyXCIhPXR5cGVvZiByP3BbNF06cixpPVwibnVtYmVyXCIhPXR5cGVvZiBpP3BbNV06aSxcIm51bWJlclwiIT10eXBlb2YgZT9wOihhLl9vcmllbnRhdGlvbj1bZSxuLHQsbyxyLGldLGEuY3R4Lmxpc3RlbmVyLnNldE9yaWVudGF0aW9uKGUsbix0LG8scixpKSxhKX0sSG93bGVyR2xvYmFsLnByb3RvdHlwZS52ZWxvY2l0eT1mdW5jdGlvbihlLG4sdCl7dmFyIG89dGhpcztyZXR1cm4gby5jdHgmJm8uY3R4Lmxpc3RlbmVyPyhuPVwibnVtYmVyXCIhPXR5cGVvZiBuP28uX3ZlbG9jaXR5WzFdOm4sdD1cIm51bWJlclwiIT10eXBlb2YgdD9vLl92ZWxvY2l0eVsyXTp0LFwibnVtYmVyXCIhPXR5cGVvZiBlP28uX3ZlbG9jaXR5OihvLl92ZWxvY2l0eT1bZSxuLHRdLG8uY3R4Lmxpc3RlbmVyLnNldFZlbG9jaXR5KG8uX3ZlbG9jaXR5WzBdLG8uX3ZlbG9jaXR5WzFdLG8uX3ZlbG9jaXR5WzJdKSxvKSk6b30sSG93bGVyR2xvYmFsLnByb3RvdHlwZS5saXN0ZW5lckF0dHI9ZnVuY3Rpb24oZSl7dmFyIG49dGhpcztpZighbi5jdHh8fCFuLmN0eC5saXN0ZW5lcilyZXR1cm4gbjt2YXIgdD1uLl9saXN0ZW5lckF0dHI7cmV0dXJuIGU/KG4uX2xpc3RlbmVyQXR0cj17ZG9wcGxlckZhY3RvcjpcInVuZGVmaW5lZFwiIT10eXBlb2YgZS5kb3BwbGVyRmFjdG9yP2UuZG9wcGxlckZhY3Rvcjp0LmRvcHBsZXJGYWN0b3Isc3BlZWRPZlNvdW5kOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBlLnNwZWVkT2ZTb3VuZD9lLnNwZWVkT2ZTb3VuZDp0LnNwZWVkT2ZTb3VuZH0sbi5jdHgubGlzdGVuZXIuZG9wcGxlckZhY3Rvcj10LmRvcHBsZXJGYWN0b3Isbi5jdHgubGlzdGVuZXIuc3BlZWRPZlNvdW5kPXQuc3BlZWRPZlNvdW5kLG4pOnR9LEhvd2wucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciB0PXRoaXM7cmV0dXJuIHQuX29yaWVudGF0aW9uPW4ub3JpZW50YXRpb258fFsxLDAsMF0sdC5fcG9zPW4ucG9zfHxudWxsLHQuX3ZlbG9jaXR5PW4udmVsb2NpdHl8fFswLDAsMF0sdC5fcGFubmVyQXR0cj17Y29uZUlubmVyQW5nbGU6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZUlubmVyQW5nbGU/bi5jb25lSW5uZXJBbmdsZTozNjAsY29uZU91dGVyQW5nbGU6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZU91dGVyQW5nbGU/bi5jb25lT3V0ZXJBbmdsZTozNjAsY29uZU91dGVyR2FpbjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lT3V0ZXJHYWluP24uY29uZU91dGVyR2FpbjowLGRpc3RhbmNlTW9kZWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uZGlzdGFuY2VNb2RlbD9uLmRpc3RhbmNlTW9kZWw6XCJpbnZlcnNlXCIsbWF4RGlzdGFuY2U6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ubWF4RGlzdGFuY2U/bi5tYXhEaXN0YW5jZToxZTQscGFubmluZ01vZGVsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnBhbm5pbmdNb2RlbD9uLnBhbm5pbmdNb2RlbDpcIkhSVEZcIixyZWZEaXN0YW5jZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5yZWZEaXN0YW5jZT9uLnJlZkRpc3RhbmNlOjEscm9sbG9mZkZhY3RvcjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5yb2xsb2ZmRmFjdG9yP24ucm9sbG9mZkZhY3RvcjoxfSxlLmNhbGwodGhpcyxuKX19KEhvd2wucHJvdG90eXBlLmluaXQpLEhvd2wucHJvdG90eXBlLnBvcz1mdW5jdGlvbihuLHQsbyxyKXt2YXIgaT10aGlzO2lmKCFpLl93ZWJBdWRpbylyZXR1cm4gaTtpZighaS5fbG9hZGVkKXJldHVybiBpLm9uY2UoXCJwbGF5XCIsZnVuY3Rpb24oKXtpLnBvcyhuLHQsbyxyKX0pLGk7aWYodD1cIm51bWJlclwiIT10eXBlb2YgdD8wOnQsbz1cIm51bWJlclwiIT10eXBlb2Ygbz8tLjU6byxcInVuZGVmaW5lZFwiPT10eXBlb2Ygcil7aWYoXCJudW1iZXJcIiE9dHlwZW9mIG4pcmV0dXJuIGkuX3BvcztpLl9wb3M9W24sdCxvXX1mb3IodmFyIGE9aS5fZ2V0U291bmRJZHMocikscD0wO3A8YS5sZW5ndGg7cCsrKXt2YXIgbD1pLl9zb3VuZEJ5SWQoYVtwXSk7aWYobCl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIG4pcmV0dXJuIGwuX3BvcztsLl9wb3M9W24sdCxvXSxsLl9ub2RlJiYobC5fcGFubmVyfHxlKGwpLGwuX3Bhbm5lci5zZXRQb3NpdGlvbihuLHQsbykpfX1yZXR1cm4gaX0sSG93bC5wcm90b3R5cGUub3JpZW50YXRpb249ZnVuY3Rpb24obix0LG8scil7dmFyIGk9dGhpcztpZighaS5fd2ViQXVkaW8pcmV0dXJuIGk7aWYoIWkuX2xvYWRlZClyZXR1cm4gaS5vbmNlKFwicGxheVwiLGZ1bmN0aW9uKCl7aS5vcmllbnRhdGlvbihuLHQsbyxyKX0pLGk7aWYodD1cIm51bWJlclwiIT10eXBlb2YgdD9pLl9vcmllbnRhdGlvblsxXTp0LG89XCJudW1iZXJcIiE9dHlwZW9mIG8/aS5fb3JpZW50YXRpb25bMl06byxcInVuZGVmaW5lZFwiPT10eXBlb2Ygcil7aWYoXCJudW1iZXJcIiE9dHlwZW9mIG4pcmV0dXJuIGkuX29yaWVudGF0aW9uO2kuX29yaWVudGF0aW9uPVtuLHQsb119Zm9yKHZhciBhPWkuX2dldFNvdW5kSWRzKHIpLHA9MDtwPGEubGVuZ3RoO3ArKyl7dmFyIGw9aS5fc291bmRCeUlkKGFbcF0pO2lmKGwpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBuKXJldHVybiBsLl9vcmllbnRhdGlvbjtsLl9vcmllbnRhdGlvbj1bbix0LG9dLGwuX25vZGUmJihsLl9wYW5uZXJ8fGUobCksbC5fcGFubmVyLnNldE9yaWVudGF0aW9uKG4sdCxvKSl9fXJldHVybiBpfSxIb3dsLnByb3RvdHlwZS52ZWxvY2l0eT1mdW5jdGlvbihuLHQsbyxyKXt2YXIgaT10aGlzO2lmKCFpLl93ZWJBdWRpbylyZXR1cm4gaTtpZighaS5fbG9hZGVkKXJldHVybiBpLm9uY2UoXCJwbGF5XCIsZnVuY3Rpb24oKXtpLnZlbG9jaXR5KG4sdCxvLHIpfSksaTtpZih0PVwibnVtYmVyXCIhPXR5cGVvZiB0P2kuX3ZlbG9jaXR5WzFdOnQsbz1cIm51bWJlclwiIT10eXBlb2Ygbz9pLl92ZWxvY2l0eVsyXTpvLFwidW5kZWZpbmVkXCI9PXR5cGVvZiByKXtpZihcIm51bWJlclwiIT10eXBlb2YgbilyZXR1cm4gaS5fdmVsb2NpdHk7aS5fdmVsb2NpdHk9W24sdCxvXX1mb3IodmFyIGE9aS5fZ2V0U291bmRJZHMocikscD0wO3A8YS5sZW5ndGg7cCsrKXt2YXIgbD1pLl9zb3VuZEJ5SWQoYVtwXSk7aWYobCl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIG4pcmV0dXJuIGwuX3ZlbG9jaXR5O2wuX3ZlbG9jaXR5PVtuLHQsb10sbC5fbm9kZSYmKGwuX3Bhbm5lcnx8ZShsKSxsLl9wYW5uZXIuc2V0VmVsb2NpdHkobix0LG8pKX19cmV0dXJuIGl9LEhvd2wucHJvdG90eXBlLnBhbm5lckF0dHI9ZnVuY3Rpb24oKXt2YXIgbix0LG8scj10aGlzLGk9YXJndW1lbnRzO2lmKCFyLl93ZWJBdWRpbylyZXR1cm4gcjtpZigwPT09aS5sZW5ndGgpcmV0dXJuIHIuX3Bhbm5lckF0dHI7aWYoMT09PWkubGVuZ3RoKXtpZihcIm9iamVjdFwiIT10eXBlb2YgaVswXSlyZXR1cm4gbz1yLl9zb3VuZEJ5SWQocGFyc2VJbnQoaVswXSwxMCkpLG8/by5fcGFubmVyQXR0cjpyLl9wYW5uZXJBdHRyO249aVswXSxcInVuZGVmaW5lZFwiPT10eXBlb2YgdCYmKHIuX3Bhbm5lckF0dHI9e2NvbmVJbm5lckFuZ2xlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVJbm5lckFuZ2xlP24uY29uZUlubmVyQW5nbGU6ci5fY29uZUlubmVyQW5nbGUsY29uZU91dGVyQW5nbGU6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZU91dGVyQW5nbGU/bi5jb25lT3V0ZXJBbmdsZTpyLl9jb25lT3V0ZXJBbmdsZSxjb25lT3V0ZXJHYWluOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVPdXRlckdhaW4/bi5jb25lT3V0ZXJHYWluOnIuX2NvbmVPdXRlckdhaW4sZGlzdGFuY2VNb2RlbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5kaXN0YW5jZU1vZGVsP24uZGlzdGFuY2VNb2RlbDpyLl9kaXN0YW5jZU1vZGVsLG1heERpc3RhbmNlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLm1heERpc3RhbmNlP24ubWF4RGlzdGFuY2U6ci5fbWF4RGlzdGFuY2UscGFubmluZ01vZGVsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnBhbm5pbmdNb2RlbD9uLnBhbm5pbmdNb2RlbDpyLl9wYW5uaW5nTW9kZWwscmVmRGlzdGFuY2U6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucmVmRGlzdGFuY2U/bi5yZWZEaXN0YW5jZTpyLl9yZWZEaXN0YW5jZSxyb2xsb2ZmRmFjdG9yOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnJvbGxvZmZGYWN0b3I/bi5yb2xsb2ZmRmFjdG9yOnIuX3JvbGxvZmZGYWN0b3J9KX1lbHNlIDI9PT1pLmxlbmd0aCYmKG49aVswXSx0PXBhcnNlSW50KGlbMV0sMTApKTtmb3IodmFyIGE9ci5fZ2V0U291bmRJZHModCkscD0wO3A8YS5sZW5ndGg7cCsrKWlmKG89ci5fc291bmRCeUlkKGFbcF0pKXt2YXIgbD1vLl9wYW5uZXJBdHRyO2w9e2NvbmVJbm5lckFuZ2xlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVJbm5lckFuZ2xlP24uY29uZUlubmVyQW5nbGU6bC5jb25lSW5uZXJBbmdsZSxjb25lT3V0ZXJBbmdsZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lT3V0ZXJBbmdsZT9uLmNvbmVPdXRlckFuZ2xlOmwuY29uZU91dGVyQW5nbGUsY29uZU91dGVyR2FpbjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lT3V0ZXJHYWluP24uY29uZU91dGVyR2FpbjpsLmNvbmVPdXRlckdhaW4sZGlzdGFuY2VNb2RlbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5kaXN0YW5jZU1vZGVsP24uZGlzdGFuY2VNb2RlbDpsLmRpc3RhbmNlTW9kZWwsbWF4RGlzdGFuY2U6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ubWF4RGlzdGFuY2U/bi5tYXhEaXN0YW5jZTpsLm1heERpc3RhbmNlLHBhbm5pbmdNb2RlbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5wYW5uaW5nTW9kZWw/bi5wYW5uaW5nTW9kZWw6bC5wYW5uaW5nTW9kZWwscmVmRGlzdGFuY2U6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucmVmRGlzdGFuY2U/bi5yZWZEaXN0YW5jZTpsLnJlZkRpc3RhbmNlLHJvbGxvZmZGYWN0b3I6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucm9sbG9mZkZhY3Rvcj9uLnJvbGxvZmZGYWN0b3I6bC5yb2xsb2ZmRmFjdG9yfTt2YXIgYz1vLl9wYW5uZXI7Yz8oYy5jb25lSW5uZXJBbmdsZT1sLmNvbmVJbm5lckFuZ2xlLGMuY29uZU91dGVyQW5nbGU9bC5jb25lT3V0ZXJBbmdsZSxjLmNvbmVPdXRlckdhaW49bC5jb25lT3V0ZXJHYWluLGMuZGlzdGFuY2VNb2RlbD1sLmRpc3RhbmNlTW9kZWwsYy5tYXhEaXN0YW5jZT1sLm1heERpc3RhbmNlLGMucGFubmluZ01vZGVsPWwucGFubmluZ01vZGVsLGMucmVmRGlzdGFuY2U9bC5yZWZEaXN0YW5jZSxjLnJvbGxvZmZGYWN0b3I9bC5yb2xsb2ZmRmFjdG9yKTooby5fcG9zfHwoby5fcG9zPXIuX3Bvc3x8WzAsMCwtLjVdKSxlKG8pKX1yZXR1cm4gcn0sU291bmQucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIG49dGhpcyx0PW4uX3BhcmVudDtuLl9vcmllbnRhdGlvbj10Ll9vcmllbnRhdGlvbixuLl9wb3M9dC5fcG9zLG4uX3ZlbG9jaXR5PXQuX3ZlbG9jaXR5LG4uX3Bhbm5lckF0dHI9dC5fcGFubmVyQXR0cixlLmNhbGwodGhpcyksbi5fcG9zJiZ0LnBvcyhuLl9wb3NbMF0sbi5fcG9zWzFdLG4uX3Bvc1syXSxuLl9pZCl9fShTb3VuZC5wcm90b3R5cGUuaW5pdCksU291bmQucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbigpe3ZhciBuPXRoaXMsdD1uLl9wYXJlbnQ7cmV0dXJuIG4uX29yaWVudGF0aW9uPXQuX29yaWVudGF0aW9uLG4uX3Bvcz10Ll9wb3Msbi5fdmVsb2NpdHk9dC5fdmVsb2NpdHksbi5fcGFubmVyQXR0cj10Ll9wYW5uZXJBdHRyLGUuY2FsbCh0aGlzKX19KFNvdW5kLnByb3RvdHlwZS5yZXNldCk7dmFyIGU9ZnVuY3Rpb24oZSl7ZS5fcGFubmVyPUhvd2xlci5jdHguY3JlYXRlUGFubmVyKCksZS5fcGFubmVyLmNvbmVJbm5lckFuZ2xlPWUuX3Bhbm5lckF0dHIuY29uZUlubmVyQW5nbGUsZS5fcGFubmVyLmNvbmVPdXRlckFuZ2xlPWUuX3Bhbm5lckF0dHIuY29uZU91dGVyQW5nbGUsZS5fcGFubmVyLmNvbmVPdXRlckdhaW49ZS5fcGFubmVyQXR0ci5jb25lT3V0ZXJHYWluLGUuX3Bhbm5lci5kaXN0YW5jZU1vZGVsPWUuX3Bhbm5lckF0dHIuZGlzdGFuY2VNb2RlbCxlLl9wYW5uZXIubWF4RGlzdGFuY2U9ZS5fcGFubmVyQXR0ci5tYXhEaXN0YW5jZSxlLl9wYW5uZXIucGFubmluZ01vZGVsPWUuX3Bhbm5lckF0dHIucGFubmluZ01vZGVsLGUuX3Bhbm5lci5yZWZEaXN0YW5jZT1lLl9wYW5uZXJBdHRyLnJlZkRpc3RhbmNlLGUuX3Bhbm5lci5yb2xsb2ZmRmFjdG9yPWUuX3Bhbm5lckF0dHIucm9sbG9mZkZhY3RvcixlLl9wYW5uZXIuc2V0UG9zaXRpb24oZS5fcG9zWzBdLGUuX3Bvc1sxXSxlLl9wb3NbMl0pLGUuX3Bhbm5lci5zZXRPcmllbnRhdGlvbihlLl9vcmllbnRhdGlvblswXSxlLl9vcmllbnRhdGlvblsxXSxlLl9vcmllbnRhdGlvblsyXSksZS5fcGFubmVyLnNldFZlbG9jaXR5KGUuX3ZlbG9jaXR5WzBdLGUuX3ZlbG9jaXR5WzFdLGUuX3ZlbG9jaXR5WzJdKSxlLl9wYW5uZXIuY29ubmVjdChlLl9ub2RlKSxlLl9wYXVzZWR8fGUuX3BhcmVudC5wYXVzZShlLl9pZCkucGxheShlLl9pZCl9fSgpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaG93bGVyL2hvd2xlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxudmFyICR2aWRlb0luZGljYXRvciA9ICQoJyN2aWRlby1wcm9ncmVzcyAucHJvZ3Jlc3MnKTtcbnZhciB2aWRlb1BsYXlpbmc7XG52YXIgJGVsO1xuXG4kdmlkZW9JbmRpY2F0b3IuaGlkZSgpO1xubW9kdWxlLmV4cG9ydHMuc3RhcnQgPSBmdW5jdGlvbigkbmV3VmlkZW8pIHtcbiAgJGVsID0gJG5ld1ZpZGVvWzBdO1xuICAkdmlkZW9JbmRpY2F0b3Iuc2hvdygpO1xuICB2aWRlb1BsYXlpbmcgPSB0cnVlO1xuICBsb29wKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIHZpZGVvUGxheWluZyA9IGZhbHNlO1xuICAkKCcjdmlkZW8tcHJvZ3Jlc3MgLnByb2dyZXNzJykuaGlkZSgpO1xufTtcblxuZnVuY3Rpb24gbG9vcCgpIHtcbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcbiAgICB2YXIgcmF0ZSA9ICgkZWwuY3VycmVudFRpbWUgLyAkZWwuZHVyYXRpb24pO1xuICAgIHZhciBwZXJjZW50ID0gKHJhdGUgKiAxMDApLnRvRml4ZWQoMik7XG4gICAgJHZpZGVvSW5kaWNhdG9yLmNzcyh7J3dpZHRoJzogcGVyY2VudCArICd2dyd9KTtcbiAgICBpZih2aWRlb1BsYXlpbmcpIHtcbiAgICAgIHNldFRpbWVvdXQoICgpID0+IHtsb29wKCl9ICwgNDEgKVxuICAgIH1cbiAgfSlcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlbmRlci92aWRlb3BsYXllci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=