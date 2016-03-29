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
	
	var _kefir = __webpack_require__(1);
	
	var _kefir2 = _interopRequireDefault(_kefir);
	
	var _pace = __webpack_require__(2);
	
	var _pace2 = _interopRequireDefault(_pace);
	
	var _obScene = __webpack_require__(3);
	
	var _obScene2 = _interopRequireDefault(_obScene);
	
	var _controls = __webpack_require__(6);
	
	var _controls2 = _interopRequireDefault(_controls);
	
	var _constants = __webpack_require__(5);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _index = __webpack_require__(7);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _audioplayer = __webpack_require__(10);
	
	var _audioplayer2 = _interopRequireDefault(_audioplayer);
	
	var _template = __webpack_require__(16);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// audioplayer.config(sceneAudioConfig)
	
	// globals obscene_compiled
	
	// The focus of the library is to be reactive throughout.
	// The primary reactive library used in our app. Most knowledge gaps will be attributed to
	module.exports.init = function (config) {
	  // obscene_compiled should be a global variable exposed by the obscene compiler
	  var conf = config || obscene_compiled;
	
	  // Initialize Obscene
	  // try {
	  init(conf);
	  // } catch (e) {
	  // console.error("ob-scene initalization failed. did you add the compiled ob-scene files?", e)
	  // }
	};
	// import sceneCompiler from './scene-compiler.js'
	
	function init(config) {
	  // Pace requires a .start to show the loading screen
	  _pace2.default.start();
	
	  var sceneHtmlString = config.sceneHtmlString;
	  var sceneConfig = config.sceneConfig;
	
	  var coreUIAdded$ = addCoreUI();
	  var loadingComplete$ = _kefir2.default.fromEvents(_pace2.default, 'done');
	
	  var initLoadingComplete$ = _kefir2.default.zip([loadingComplete$, coreUIAdded$]).filter(checkReadyState);
	
	  var touchDeviceDetected$ = initLoadingComplete$.filter(isTouchDevice);
	
	  touchDeviceDetected$.onValue(function () {
	    $('#unsupported').show();
	    $(".container").hide();
	    $(".loading").hide();
	  });
	
	  var readyToParse$ = initLoadingComplete$.filter(function () {
	    return !isTouchDevice();
	  });
	
	  readyToParse$.onValue(function () {
	    _obScene2.default.init(sceneConfig);
	    _controls2.default.init();
	  });
	
	  readyToParse$.onValue(function () {
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
	
	function addCoreUI() {
	
	  // Add UI html
	  var $mainUI = document.createElement('div');
	  $mainUI.setAttribute('id', 'ob-scene-wrapper');
	  $mainUI.innerHTML = _template2.default;
	  document.querySelector('body').appendChild($mainUI);
	
	  return _kefir2.default.stream(function (emitter) {
	    // http://stackoverflow.com/a/35211286
	
	    // set up the mutation observer
	    var observer = new MutationObserver(function (mutations, me) {
	      // `mutations` is an array of mutations that occurred
	      // `me` is the MutationObserver instance
	      var obsceneWrapper = document.getElementById('experience-progress');
	      if (obsceneWrapper) {
	        emitter.emit(obsceneWrapper);
	        me.disconnect(); // stop observing
	        return;
	      }
	    });
	
	    // start observing
	    observer.observe(document, {
	      childList: true,
	      subtree: true
	    });
	  });
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
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*
	 *  Initialize
	*/
	
	var stateInitialized$ = Kefir.pool();
	
	/*
	 *  Globals
	*/
	/*
	 *  Dependencies
	*/
	
	var initState = Kefir.stream(function (emitter) {
	  emitter.emit(_constants.INIT_STATE);
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
	
	var focusChanged$ = Kefir.merge([actionFocusPrevious, actionFocusNext]).onValue(renderScroll);
	
	// TODO: Remove log
	focusChanged$.log();
	
	// TODO: Abstract Render to renderer
	function renderScroll(scroll) {
	  // console.log("RENDER", scroll, Math.floor($window.scrollTop()))
	  _constants.$body.animate({
	    scrollTop: scroll
	  }, 1500, 'linear');
	}
	
	/*
	 *  Helpers
	*/

	// function throwError() {
	//   $body.addClass('page-error')
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _obScene = __webpack_require__(3);
	
	var _pageUtils = __webpack_require__(4);
	
	var pageUtils = _interopRequireWildcard(_pageUtils);
	
	var _constants = __webpack_require__(5);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/*
	 *  Child Renders
	*/
	
	var renderWrapper = __webpack_require__(8); /*
	                                              *  Dependencies
	                                             */
	
	var renderScrollbar = __webpack_require__(9);
	var renderAudioPlayer = __webpack_require__(10);
	var renderVideoPlayer = __webpack_require__(14);
	var renderError = __webpack_require__(15);
	
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

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var looper = __webpack_require__(11);
	
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Howl = __webpack_require__(12).Howl;
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*! howler.js v2.0.0-beta7 | (c) 2013-2016, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
	!function(){"use strict";function e(){try{"undefined"!=typeof AudioContext?n=new AudioContext:"undefined"!=typeof webkitAudioContext?n=new webkitAudioContext:o=!1}catch(e){o=!1}if(!o)if("undefined"!=typeof Audio)try{var d=new Audio;"undefined"==typeof d.oncanplaythrough&&(u="canplay")}catch(e){t=!0}else t=!0;try{var d=new Audio;d.muted&&(t=!0)}catch(e){}var a=/iP(hone|od|ad)/.test(navigator.platform),i=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),_=i?parseInt(i[1],10):null;if(a&&_&&9>_){var s=/safari/.test(window.navigator.userAgent.toLowerCase());(window.navigator.standalone&&!s||!window.navigator.standalone&&!s)&&(o=!1)}o&&(r="undefined"==typeof n.createGain?n.createGainNode():n.createGain(),r.gain.value=1,r.connect(n.destination))}var n=null,o=!0,t=!1,r=null,u="canplaythrough";e();var d=function(){this.init()};d.prototype={init:function(){var e=this||a;return e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e.state=n?n.state||"running":"running",e.autoSuspend=!0,e._autoSuspend(),e.mobileAutoEnable=!0,e.noAudio=t,e.usingWebAudio=o,e.ctx=n,t||e._setupCodecs(),e},volume:function(e){var n=this||a;if(e=parseFloat(e),"undefined"!=typeof e&&e>=0&&1>=e){n._volume=e,o&&(r.gain.value=e);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var u=n._howls[t]._getSoundIds(),d=0;d<u.length;d++){var i=n._howls[t]._soundById(u[d]);i&&i._node&&(i._node.volume=i._volume*e)}return n}return n._volume},mute:function(e){var n=this||a;n._muted=e,o&&(r.gain.value=e?0:n._volume);for(var t=0;t<n._howls.length;t++)if(!n._howls[t]._webAudio)for(var u=n._howls[t]._getSoundIds(),d=0;d<u.length;d++){var i=n._howls[t]._soundById(u[d]);i&&i._node&&(i._node.muted=e?!0:i._muted)}return n},unload:function(){for(var o=this||a,t=o._howls.length-1;t>=0;t--)o._howls[t].unload();return o.usingWebAudio&&"undefined"!=typeof n.close&&(o.ctx=null,n.close(),e(),o.ctx=n),o},codecs:function(e){return(this||a)._codecs[e]},_setupCodecs:function(){var e=this||a,n=new Audio,o=n.canPlayType("audio/mpeg;").replace(/^no$/,""),t=/OPR\//.test(navigator.userAgent);return e._codecs={mp3:!(t||!o&&!n.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!o,opus:!!n.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!n.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!n.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!n.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(n.canPlayType("audio/x-m4a;")||n.canPlayType("audio/m4a;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(n.canPlayType("audio/x-mp4;")||n.canPlayType("audio/mp4;")||n.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!n.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!n.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||a,o=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk/i.test(navigator.userAgent),t=!!("ontouchend"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0);if(!n||!e._mobileEnabled&&o&&t){e._mobileEnabled=!1;var r=function(){var o=n.createBuffer(1,1,22050),t=n.createBufferSource();t.buffer=o,t.connect(n.destination),"undefined"==typeof t.start?t.noteOn(0):t.start(0),t.onended=function(){t.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchend",r,!0)}};return document.addEventListener("touchend",r,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&n&&"undefined"!=typeof n.suspend&&o){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio)for(var r=0;r<e._howls[t]._sounds.length;r++)if(!e._howls[t]._sounds[r]._paused)return e;return e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",n.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(n&&"undefined"!=typeof n.resume&&o)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.state="resuming",n.resume().then(function(){e.state="running"}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var a=new d,i=function(e){var n=this;return e.src&&0!==e.src.length?void n.init(e):void console.error("An array of source files must be passed with any new Howl.")};i.prototype={init:function(e){var t=this;return t._autoplay=e.autoplay||!1,t._format="string"!=typeof e.format?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"==typeof e.preload?e.preload:!0,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._duration=0,t._loaded=!1,t._sounds=[],t._endTimers={},t._queue=[],t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._webAudio=o&&!t._html5,"undefined"!=typeof n&&n&&a.mobileAutoEnable&&a._enableMobileAudio(),a._howls.push(t),t._preload&&t.load(),t},load:function(){var e=this,n=null;if(t)return void e._emit("loaderror",null,"No audio support.");"string"==typeof e._src&&(e._src=[e._src]);for(var o=0;o<e._src.length;o++){var r,u;if(e._format&&e._format[o]?r=e._format[o]:(u=e._src[o],r=/^data:audio\/([^;,]+);/i.exec(u),r||(r=/\.([^.]+)$/.exec(u.split("?",1)[0])),r&&(r=r[1].toLowerCase())),a.codecs(r)){n=e._src[o];break}}return n?(e._src=n,"https:"===window.location.protocol&&"http:"===n.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new _(e),e._webAudio&&l(e),e):void e._emit("loaderror",null,"No codec support for selected audio sources.")},play:function(e){var o=this,t=arguments,r=null;if("number"==typeof e)r=e,e=null;else if("undefined"==typeof e){e="__default";for(var d=0,i=0;i<o._sounds.length;i++)o._sounds[i]._paused&&!o._sounds[i]._ended&&(d++,r=o._sounds[i]._id);1===d?e=null:r=null}var _=r?o._soundById(r):o._inactiveSound();if(!_)return null;if(r&&!e&&(e=_._sprite||"__default"),!o._loaded&&!o._sprite[e])return o._queue.push({event:"play",action:function(){o.play(o._soundById(_._id)?_._id:void 0)}}),_._id;if(r&&!_._paused)return _._id;o._webAudio&&a._autoResume();var s=_._seek>0?_._seek:o._sprite[e][0]/1e3,l=(o._sprite[e][0]+o._sprite[e][1])/1e3-s,f=1e3*l/Math.abs(_._rate);f!==1/0&&(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),_._paused=!1,_._ended=!1,_._sprite=e,_._seek=s,_._start=o._sprite[e][0]/1e3,_._stop=(o._sprite[e][0]+o._sprite[e][1])/1e3,_._loop=!(!_._loop&&!o._sprite[e][2]);var c=_._node;if(o._webAudio){var p=function(){o._refreshBuffer(_);var e=_._muted||o._muted?0:_._volume*a.volume();c.gain.setValueAtTime(e,n.currentTime),_._playStart=n.currentTime,"undefined"==typeof c.bufferSource.start?_._loop?c.bufferSource.noteGrainOn(0,s,86400):c.bufferSource.noteGrainOn(0,s,l):_._loop?c.bufferSource.start(0,s,86400):c.bufferSource.start(0,s,l),o._endTimers[_._id]||f===1/0||(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),t[1]||setTimeout(function(){o._emit("play",_._id)},0)};o._loaded?p():(o.once("load",p,_._id),o._clearTimer(_._id))}else{var m=function(){c.currentTime=s,c.muted=_._muted||o._muted||a._muted||c.muted,c.volume=_._volume*a.volume(),c.playbackRate=_._rate,setTimeout(function(){c.play(),t[1]||o._emit("play",_._id)},0)};if(4===c.readyState||!c.readyState&&navigator.isCocoonJS)m();else{var v=function(){f!==1/0&&(o._endTimers[_._id]=setTimeout(o._ended.bind(o,_),f)),m(),c.removeEventListener(u,v,!1)};c.addEventListener(u,v,!1),o._clearTimer(_._id)}}return _._id},pause:function(e){var n=this;if(!n._loaded)return n._queue.push({event:"pause",action:function(){n.pause(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused){if(r._seek=n.seek(o[t]),r._paused=!0,n._stopFade(o[t]),r._node)if(n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),r._node.bufferSource=null}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||n._emit("pause",r._id)}}return n},stop:function(e){var n=this;if(!n._loaded)return"undefined"!=typeof n._sounds[0]._sprite&&n._queue.push({event:"stop",action:function(){n.stop(e)}}),n;for(var o=n._getSoundIds(e),t=0;t<o.length;t++){n._clearTimer(o[t]);var r=n._soundById(o[t]);if(r&&!r._paused){if(r._seek=r._start||0,r._paused=!0,r._ended=!0,n._stopFade(o[t]),r._node)if(n._webAudio){if(!r._node.bufferSource)return n;"undefined"==typeof r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),r._node.bufferSource=null}else isNaN(r._node.duration)&&r._node.duration!==1/0||(r._node.pause(),r._node.currentTime=r._start||0);n._emit("stop",r._id)}}return n},mute:function(e,o){var t=this;if(!t._loaded)return t._queue.push({event:"mute",action:function(){t.mute(e,o)}}),t;if("undefined"==typeof o){if("boolean"!=typeof e)return t._muted;t._muted=e}for(var r=t._getSoundIds(o),u=0;u<r.length;u++){var d=t._soundById(r[u]);d&&(d._muted=e,t._webAudio&&d._node?d._node.gain.setValueAtTime(e?0:d._volume*a.volume(),n.currentTime):d._node&&(d._node.muted=a._muted?!0:e),t._emit("mute",d._id))}return t},volume:function(){var e,o,t=this,r=arguments;if(0===r.length)return t._volume;if(1===r.length){var u=t._getSoundIds(),d=u.indexOf(r[0]);d>=0?o=parseInt(r[0],10):e=parseFloat(r[0])}else r.length>=2&&(e=parseFloat(r[0]),o=parseInt(r[1],10));var i;if(!("undefined"!=typeof e&&e>=0&&1>=e))return i=o?t._soundById(o):t._sounds[0],i?i._volume:0;if(!t._loaded)return t._queue.push({event:"volume",action:function(){t.volume.apply(t,r)}}),t;"undefined"==typeof o&&(t._volume=e),o=t._getSoundIds(o);for(var _=0;_<o.length;_++)i=t._soundById(o[_]),i&&(i._volume=e,r[2]||t._stopFade(o[_]),t._webAudio&&i._node&&!i._muted?i._node.gain.setValueAtTime(e*a.volume(),n.currentTime):i._node&&!i._muted&&(i._node.volume=e*a.volume()),t._emit("volume",i._id));return t},fade:function(e,o,t,r){var u=this;if(!u._loaded)return u._queue.push({event:"fade",action:function(){u.fade(e,o,t,r)}}),u;u.volume(e,r);for(var d=u._getSoundIds(r),a=0;a<d.length;a++){var i=u._soundById(d[a]);if(i)if(r||u._stopFade(d[a]),u._webAudio&&!i._muted){var _=n.currentTime,s=_+t/1e3;i._volume=e,i._node.gain.setValueAtTime(e,_),i._node.gain.linearRampToValueAtTime(o,s),i._timeout=setTimeout(function(e,t){delete t._timeout,setTimeout(function(){t._volume=o,u._emit("fade",e)},s-n.currentTime>0?Math.ceil(1e3*(s-n.currentTime)):0)}.bind(u,d[a],i),t)}else{var l=Math.abs(e-o),f=e>o?"out":"in",c=l/.01,p=t/c;!function(){var n=e;i._interval=setInterval(function(e,t){n+="in"===f?.01:-.01,n=Math.max(0,n),n=Math.min(1,n),n=Math.round(100*n)/100,u.volume(n,e,!0),n===o&&(clearInterval(t._interval),delete t._interval,u._emit("fade",e))}.bind(u,d[a],i),p)}()}}return u},_stopFade:function(e){var o=this,t=o._soundById(e);return t._interval?(clearInterval(t._interval),delete t._interval,o._emit("fade",e)):t._timeout&&(clearTimeout(t._timeout),delete t._timeout,t._node.gain.cancelScheduledValues(n.currentTime),o._emit("fade",e)),o},loop:function(){var e,n,o,t=this,r=arguments;if(0===r.length)return t._loop;if(1===r.length){if("boolean"!=typeof r[0])return o=t._soundById(parseInt(r[0],10)),o?o._loop:!1;e=r[0],t._loop=e}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var u=t._getSoundIds(n),d=0;d<u.length;d++)o=t._soundById(u[d]),o&&(o._loop=e,t._webAudio&&o._node&&o._node.bufferSource&&(o._node.bufferSource.loop=e));return t},rate:function(){var e,n,o=this,t=arguments;if(0===t.length)n=o._sounds[0]._id;else if(1===t.length){var r=o._getSoundIds(),u=r.indexOf(t[0]);u>=0?n=parseInt(t[0],10):e=parseFloat(t[0])}else 2===t.length&&(e=parseFloat(t[0]),n=parseInt(t[1],10));var d;if("number"!=typeof e)return d=o._soundById(n),d?d._rate:o._rate;if(!o._loaded)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,t)}}),o;"undefined"==typeof n&&(o._rate=e),n=o._getSoundIds(n);for(var a=0;a<n.length;a++)if(d=o._soundById(n[a])){d._rate=e,o._webAudio&&d._node&&d._node.bufferSource?d._node.bufferSource.playbackRate.value=e:d._node&&(d._node.playbackRate=e);var i=o.seek(n[a]),_=(o._sprite[d._sprite][0]+o._sprite[d._sprite][1])/1e3-i,s=1e3*_/Math.abs(d._rate);o._clearTimer(n[a]),o._endTimers[n[a]]=setTimeout(o._ended.bind(o,d),s),o._emit("rate",d._id)}return o},seek:function(){var e,o,t=this,r=arguments;if(0===r.length)o=t._sounds[0]._id;else if(1===r.length){var u=t._getSoundIds(),d=u.indexOf(r[0]);d>=0?o=parseInt(r[0],10):(o=t._sounds[0]._id,e=parseFloat(r[0]))}else 2===r.length&&(e=parseFloat(r[0]),o=parseInt(r[1],10));if("undefined"==typeof o)return t;if(!t._loaded)return t._queue.push({event:"seek",action:function(){t.seek.apply(t,r)}}),t;var a=t._soundById(o);if(a){if(!(e>=0))return t._webAudio?a._seek+(t.playing(o)?n.currentTime-a._playStart:0):a._node.currentTime;var i=t.playing(o);i&&t.pause(o,!0),a._seek=e,t._clearTimer(o),i&&t.play(o,!0),t._emit("seek",o)}return t},playing:function(e){var n=this,o=n._soundById(e)||n._sounds[0];return o?!o._paused:!1},duration:function(){return this._duration},unload:function(){for(var e=this,n=e._sounds,o=0;o<n.length;o++){n[o]._paused||(e.stop(n[o]._id),e._emit("end",n[o]._id)),e._webAudio||(n[o]._node.src="",n[o]._node.removeEventListener("error",n[o]._errorFn,!1),n[o]._node.removeEventListener(u,n[o]._loadFn,!1)),delete n[o]._node,e._clearTimer(n[o]._id);var t=a._howls.indexOf(e);t>=0&&a._howls.splice(t,1)}return s&&delete s[e._src],e._sounds=[],e=null,null},on:function(e,n,o,t){var r=this,u=r["_on"+e];return"function"==typeof n&&u.push(t?{id:o,fn:n,once:t}:{id:o,fn:n}),r},off:function(e,n,o){var t=this,r=t["_on"+e];if(n){for(var u=0;u<r.length;u++)if(n===r[u].fn&&o===r[u].id){r.splice(u,1);break}}else if(e)t["_on"+e]=[];else for(var d=Object.keys(t),u=0;u<d.length;u++)0===d[u].indexOf("_on")&&Array.isArray(t[d[u]])&&(t[d[u]]=[]);return t},once:function(e,n,o){var t=this;return t.on(e,n,o,1),t},_emit:function(e,n,o){for(var t=this,r=t["_on"+e],u=r.length-1;u>=0;u--)r[u].id&&r[u].id!==n&&"load"!==e||(setTimeout(function(e){e.call(this,n,o)}.bind(t,r[u].fn),0),r[u].once&&t.off(e,r[u].fn,r[u].id));return t},_loadQueue:function(){var e=this;if(e._queue.length>0){var n=e._queue[0];e.once(n.event,function(){e._queue.shift(),e._loadQueue()}),n.action()}return e},_ended:function(e){var o=this,t=e._sprite,r=!(!e._loop&&!o._sprite[t][2]);if(o._emit("end",e._id),!o._webAudio&&r&&o.stop(e._id).play(e._id),o._webAudio&&r){o._emit("play",e._id),e._seek=e._start||0,e._playStart=n.currentTime;var u=1e3*(e._stop-e._start)/Math.abs(e._rate);o._endTimers[e._id]=setTimeout(o._ended.bind(o,e),u)}return o._webAudio&&!r&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,o._clearTimer(e._id),e._node.bufferSource=null,a._autoSuspend()),o._webAudio||r||o.stop(e._id),o},_clearTimer:function(e){var n=this;return n._endTimers[e]&&(clearTimeout(n._endTimers[e]),delete n._endTimers[e]),n},_soundById:function(e){for(var n=this,o=0;o<n._sounds.length;o++)if(e===n._sounds[o]._id)return n._sounds[o];return null},_inactiveSound:function(){var e=this;e._drain();for(var n=0;n<e._sounds.length;n++)if(e._sounds[n]._ended)return e._sounds[n].reset();return new _(e)},_drain:function(){var e=this,n=e._pool,o=0,t=0;if(!(e._sounds.length<n)){for(t=0;t<e._sounds.length;t++)e._sounds[t]._ended&&o++;for(t=e._sounds.length-1;t>=0;t--){if(n>=o)return;e._sounds[t]._ended&&(e._webAudio&&e._sounds[t]._node&&e._sounds[t]._node.disconnect(0),e._sounds.splice(t,1),o--)}}},_getSoundIds:function(e){var n=this;if("undefined"==typeof e){for(var o=[],t=0;t<n._sounds.length;t++)o.push(n._sounds[t]._id);return o}return[e]},_refreshBuffer:function(e){var o=this;return e._node.bufferSource=n.createBufferSource(),e._node.bufferSource.buffer=s[o._src],e._node.bufferSource.connect(e._panner?e._panner:e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=o._rate,o}};var _=function(e){this._parent=e,this.init()};if(_.prototype={init:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),n._sounds.push(e),e.create(),e},create:function(){var e=this,o=e._parent,t=a._muted||e._muted||e._parent._muted?0:e._volume*a.volume();return o._webAudio?(e._node="undefined"==typeof n.createGain?n.createGainNode():n.createGain(),e._node.gain.setValueAtTime(t,n.currentTime),e._node.paused=!0,e._node.connect(r)):(e._node=new Audio,e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(u,e._loadFn,!1),e._node.src=o._src,e._node.preload="auto",e._node.volume=t,e._node.load()),e},reset:function(){var e=this,n=e._parent;return e._muted=n._muted,e._loop=n._loop,e._volume=n._volume,e._muted=n._muted,e._rate=n._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=Math.round(Date.now()*Math.random()),e},_errorListener:function(){var e=this;e._node.error&&4===e._node.error.code&&(a.noAudio=!0),e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorListener,!1)},_loadListener:function(){var e=this,n=e._parent;n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),n._loaded||(n._loaded=!0,n._emit("load"),n._loadQueue()),n._autoplay&&n.play(),e._node.removeEventListener(u,e._loadFn,!1)}},o)var s={},l=function(e){var n=e._src;if(s[n])return e._duration=s[n].duration,void p(e);if(/^data:[^;]+;base64,/.test(n)){window.atob=window.atob||function(e){for(var n,o,t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r=String(e).replace(/=+$/,""),u=0,d=0,a="";o=r.charAt(d++);~o&&(n=u%4?64*n+o:o,u++%4)?a+=String.fromCharCode(255&n>>(-2*u&6)):0)o=t.indexOf(o);return a};for(var o=atob(n.split(",")[1]),t=new Uint8Array(o.length),r=0;r<o.length;++r)t[r]=o.charCodeAt(r);c(t.buffer,e)}else{var u=new XMLHttpRequest;u.open("GET",n,!0),u.responseType="arraybuffer",u.onload=function(){c(u.response,e)},u.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete s[n],e.load())},f(u)}},f=function(e){try{e.send()}catch(n){e.onerror()}},c=function(e,o){n.decodeAudioData(e,function(e){e&&o._sounds.length>0&&(s[o._src]=e,p(o,e))},function(){o._emit("loaderror",null,"Decoding audio data failed.")})},p=function(e,n){n&&!e._duration&&(e._duration=n.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e._emit("load"),e._loadQueue()),e._autoplay&&e.play()};"function"=="function"&&__webpack_require__(13)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return{Howler:a,Howl:i}}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),"undefined"!=typeof exports&&(exports.Howler=a,exports.Howl=i),"undefined"!=typeof window?(window.HowlerGlobal=d,window.Howler=a,window.Howl=i,window.Sound=_):"undefined"!=typeof global&&(global.HowlerGlobal=d,global.Howler=a,global.Howl=i,global.Sound=_)}();
	/*! Effects Plugin */
	!function(){"use strict";HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype._velocity=[0,0,0],HowlerGlobal.prototype._listenerAttr={dopplerFactor:1,speedOfSound:343.3},HowlerGlobal.prototype.pos=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._pos[1]:n,t="number"!=typeof t?o._pos[2]:t,"number"!=typeof e?o._pos:(o._pos=[e,n,t],o.ctx.listener.setPosition(o._pos[0],o._pos[1],o._pos[2]),o)):o},HowlerGlobal.prototype.orientation=function(e,n,t,o,r,i){var a=this;if(!a.ctx||!a.ctx.listener)return a;var p=a._orientation;return n="number"!=typeof n?p[1]:n,t="number"!=typeof t?p[2]:t,o="number"!=typeof o?p[3]:o,r="number"!=typeof r?p[4]:r,i="number"!=typeof i?p[5]:i,"number"!=typeof e?p:(a._orientation=[e,n,t,o,r,i],a.ctx.listener.setOrientation(e,n,t,o,r,i),a)},HowlerGlobal.prototype.velocity=function(e,n,t){var o=this;return o.ctx&&o.ctx.listener?(n="number"!=typeof n?o._velocity[1]:n,t="number"!=typeof t?o._velocity[2]:t,"number"!=typeof e?o._velocity:(o._velocity=[e,n,t],o.ctx.listener.setVelocity(o._velocity[0],o._velocity[1],o._velocity[2]),o)):o},HowlerGlobal.prototype.listenerAttr=function(e){var n=this;if(!n.ctx||!n.ctx.listener)return n;var t=n._listenerAttr;return e?(n._listenerAttr={dopplerFactor:"undefined"!=typeof e.dopplerFactor?e.dopplerFactor:t.dopplerFactor,speedOfSound:"undefined"!=typeof e.speedOfSound?e.speedOfSound:t.speedOfSound},n.ctx.listener.dopplerFactor=t.dopplerFactor,n.ctx.listener.speedOfSound=t.speedOfSound,n):t},Howl.prototype.init=function(e){return function(n){var t=this;return t._orientation=n.orientation||[1,0,0],t._pos=n.pos||null,t._velocity=n.velocity||[0,0,0],t._pannerAttr={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:360,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:360,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:0,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:"inverse",maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:1e4,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:"HRTF",refDistance:"undefined"!=typeof n.refDistance?n.refDistance:1,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:1},e.call(this,n)}}(Howl.prototype.init),Howl.prototype.pos=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.pos(n,t,o,r)}),i;if(t="number"!=typeof t?0:t,o="number"!=typeof o?-.5:o,"undefined"==typeof r){if("number"!=typeof n)return i._pos;i._pos=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._pos;l._pos=[n,t,o],l._node&&(l._panner||e(l),l._panner.setPosition(n,t,o))}}return i},Howl.prototype.orientation=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.orientation(n,t,o,r)}),i;if(t="number"!=typeof t?i._orientation[1]:t,o="number"!=typeof o?i._orientation[2]:o,"undefined"==typeof r){if("number"!=typeof n)return i._orientation;i._orientation=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._orientation;l._orientation=[n,t,o],l._node&&(l._panner||e(l),l._panner.setOrientation(n,t,o))}}return i},Howl.prototype.velocity=function(n,t,o,r){var i=this;if(!i._webAudio)return i;if(!i._loaded)return i.once("play",function(){i.velocity(n,t,o,r)}),i;if(t="number"!=typeof t?i._velocity[1]:t,o="number"!=typeof o?i._velocity[2]:o,"undefined"==typeof r){if("number"!=typeof n)return i._velocity;i._velocity=[n,t,o]}for(var a=i._getSoundIds(r),p=0;p<a.length;p++){var l=i._soundById(a[p]);if(l){if("number"!=typeof n)return l._velocity;l._velocity=[n,t,o],l._node&&(l._panner||e(l),l._panner.setVelocity(n,t,o))}}return i},Howl.prototype.pannerAttr=function(){var n,t,o,r=this,i=arguments;if(!r._webAudio)return r;if(0===i.length)return r._pannerAttr;if(1===i.length){if("object"!=typeof i[0])return o=r._soundById(parseInt(i[0],10)),o?o._pannerAttr:r._pannerAttr;n=i[0],"undefined"==typeof t&&(r._pannerAttr={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:r._coneInnerAngle,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:r._coneOuterAngle,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:r._coneOuterGain,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:r._distanceModel,maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:r._maxDistance,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:r._panningModel,refDistance:"undefined"!=typeof n.refDistance?n.refDistance:r._refDistance,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:r._rolloffFactor})}else 2===i.length&&(n=i[0],t=parseInt(i[1],10));for(var a=r._getSoundIds(t),p=0;p<a.length;p++)if(o=r._soundById(a[p])){var l=o._pannerAttr;l={coneInnerAngle:"undefined"!=typeof n.coneInnerAngle?n.coneInnerAngle:l.coneInnerAngle,coneOuterAngle:"undefined"!=typeof n.coneOuterAngle?n.coneOuterAngle:l.coneOuterAngle,coneOuterGain:"undefined"!=typeof n.coneOuterGain?n.coneOuterGain:l.coneOuterGain,distanceModel:"undefined"!=typeof n.distanceModel?n.distanceModel:l.distanceModel,maxDistance:"undefined"!=typeof n.maxDistance?n.maxDistance:l.maxDistance,panningModel:"undefined"!=typeof n.panningModel?n.panningModel:l.panningModel,refDistance:"undefined"!=typeof n.refDistance?n.refDistance:l.refDistance,rolloffFactor:"undefined"!=typeof n.rolloffFactor?n.rolloffFactor:l.rolloffFactor};var c=o._panner;c?(c.coneInnerAngle=l.coneInnerAngle,c.coneOuterAngle=l.coneOuterAngle,c.coneOuterGain=l.coneOuterGain,c.distanceModel=l.distanceModel,c.maxDistance=l.maxDistance,c.panningModel=l.panningModel,c.refDistance=l.refDistance,c.rolloffFactor=l.rolloffFactor):(o._pos||(o._pos=r._pos||[0,0,-.5]),e(o))}return r},Sound.prototype.init=function(e){return function(){var n=this,t=n._parent;n._orientation=t._orientation,n._pos=t._pos,n._velocity=t._velocity,n._pannerAttr=t._pannerAttr,e.call(this),n._pos&&t.pos(n._pos[0],n._pos[1],n._pos[2],n._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var n=this,t=n._parent;return n._orientation=t._orientation,n._pos=t._pos,n._velocity=t._velocity,n._pannerAttr=t._pannerAttr,e.call(this)}}(Sound.prototype.reset);var e=function(e){e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.panningModel=e._pannerAttr.panningModel,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2]),e._panner.setVelocity(e._velocity[0],e._velocity[1],e._velocity[2]),e._panner.connect(e._node),e._paused||e._parent.pause(e._id).play(e._id)}}();
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = "\n<style>\n  #video-progress {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 100vw;\n    height: 1vh;\n    background: black;\n    z-index: 5;\n  }\n  #video-progress .progress {\n    background: rgba(255,0,0,1);\n    width: 1vw;\n    height: 1vh;\n    /*transition: all 0.1s ease;*/\n  }\n\n  .center-marker {\n    position: fixed;\n    width: 0.5vw;\n    height: 0.5vw;\n    background: rgba(255,255,255,0.8);\n    z-index: 6;\n    right: 1vw;\n    border-radius: 3vw;\n  }\n\n\n  #experience-progress {\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vmin;\n    height: 100vh;\n    background: black;\n    z-index: 5;\n  }\n  #experience-progress .progress {\n    background: rgb(255, 255, 255);\n    opacity: 0.7;\n    width: 0.2vw;\n    height: 100vh;\n    margin-top: -100vh;\n    right: 1.15vw;\n    transition: transform 0.3s ease;\n    position: absolute;\n    border-radius: 5vw;\n  }\n\n  ::-webkit-scrollbar {\n      display: none;\n  }\n\n  .control-play {\n    position: fixed;\n    top: 3vmin;\n    right: 3vmin;\n    color: white;\n    z-index: 1;\n  }\n\n  .focus-toggles i {\n    display: block;\n    line-height: 5vmin;\n  }\n  #togglePlay {\n    font-size: 5vmin;\n    margin-right: 5vmin;\n  }\n\n  .control-play i {\n    font-size: 8vmin;\n    text-shadow: 0 0.5vmin 1vmin rgba(0,0,0,0.5);\n    line-height: 100%;\n    cursor: pointer;\n  }\n  #unsupported {\n    margin: 0 auto;\n    text-align: center;\n    margin: 50px;\n    display: none;\n  }\n\n  .loading {\n    width: 100vw;\n    height: 100vh;\n    background: black;\n    z-index: 7;\n    position: fixed;\n    text-align: center;\n    padding-top: 30vh;\n  }\n  .loading h3 {\n    font-weight: 400;\n  }\n\n\n  .pace {\n    -webkit-pointer-events: none;\n    pointer-events: none;\n\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    user-select: none;\n\n    z-index: 2000;\n    position: fixed;\n    margin: auto;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    height: 5vh;\n    width: 50vw;\n    background: transparent;\n    border: none;\n\n    overflow: hidden;\n  }\n\n  .pace .pace-progress {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -ms-box-sizing: border-box;\n    -o-box-sizing: border-box;\n    box-sizing: border-box;\n\n    -webkit-transform: translate3d(0, 0, 0);\n    -moz-transform: translate3d(0, 0, 0);\n    -ms-transform: translate3d(0, 0, 0);\n    -o-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0);\n\n    max-width: 200px;\n    position: fixed;\n    z-index: 2000;\n    display: block;\n    position: absolute;\n    top: 0;\n    right: 100%;\n    height: 100%;\n    width: 100%;\n    background: #29d;\n  }\n\n  .pace.pace-inactive {\n    display: none;\n  }\n</style>\n\n<div class=\"loading\">\n  <h3>Experience Loading...</h3>\n</div>\n<div id=\"video-progress\">\n  <div class=\"progress\"></div>\n</div>\n<div id=\"experience-progress\">\n  <div class=\"progress\"></div>\n</div>\n<div class=\"control-play\">\n  <i class=\"fa fa-play\" id=\"togglePlay\"></i>\n  <div class='focus-toggles'>\n    <i class=\"fa fa-caret-up\" id=\"toggleUp\"></i>\n    <i class=\"fa fa-caret-down\" id=\"toggleDown\"></i>\n  </div>\n</div>\n<div class=\"container\">\n  <div class=\"background\"></div>\n  <div class=\"container-inner\"></div>\n</div>\n\n<h3 class=\"error\" style=\"display:none\">Whoops! Right now this demo doesn't handle resizing or browsers less than 1000px wide. Reload this page or get on a laptop!</h3>\n<div id=\"unsupported\">\n<span style=\"text-transform: uppercase\">Mobile experience coming soon</span>  <br><br> This interactive experience is currently only for desktops.\n</div>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYThlMGRlNWE0ZGNlNWVjYmFlODkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL34va2VmaXIvZGlzdC9rZWZpci5qcyIsIndlYnBhY2s6Ly8vLi9+L3BhY2UvcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2Itc2NlbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3BhZ2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXNlci9jb250cm9scy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXIvc2Nyb2xsYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9yZW5kZXIvYXVkaW9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlci9sb29wZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ob3dsZXIvaG93bGVyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyL3ZpZGVvcGxheWVyLmpzIiwid2VicGFjazovLy8uL3NyYy90ZW1wbGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkEsUUFBTyxPQUFQLENBQWUsSUFBZixHQUFzQixVQUFDLE1BQUQsRUFBWTs7QUFFaEMsT0FB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QUF1QjtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxlQUFjLHNDQUFzQyxFQUFFLDRCQUE0QixFQUFFO0FBQ3BGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUY7QUFDQSx3QkFBdUIsU0FBUztBQUNoQzs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFXO0FBQ1g7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBLEtBQUk7QUFDSjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1COztBQUVuQixRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQztBQUMxQzs7QUFFQSxHQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCLFNBQVM7QUFDL0I7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdDQUErQjtBQUMvQixnQ0FBK0I7O0FBRS9CO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFtQjs7QUFFbkIsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQSxPQUFNO0FBQ04sS0FBSTtBQUNKOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2Q0FBNEMsU0FBUztBQUNyRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEMsT0FBTztBQUNuRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNEMsT0FBTztBQUNuRDs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTRD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QTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTRDLFNBQVM7QUFDckQ7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxxQkFBcUI7QUFDakU7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF1RTs7QUFFdkU7QUFDQTs7QUFFQSw2Q0FBNEMsdUNBQXVDO0FBQ25GOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3RUFBdUU7O0FBRXZFO0FBQ0E7O0FBRUEsNkNBQTRDLHVDQUF1QztBQUNuRjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0EsMkNBQTBDO0FBQzFDO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDO0FBQzNDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3RUFBdUU7O0FBRXZFO0FB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O0FBQzlDO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQSxxQkFBb0IsMEJBQTBCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBLHFCQUFvQiwwQkFBMEI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHVFQUFzRTs7QUFFdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU07QUFDTixLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFxRCxXQUFXLFVBQVU7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLDJCQUEyQjtBQUN6RDtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQSxpREFBZ0Qsb0NBQW9DO0FBQ3BGO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0EsaURBQWdELG9CQUFvQjtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSixvQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUU7O0FBRUY7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTs7QUFFRjs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUErQjtBQUMvQixnQ0FBK0I7O0FBRS9CO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxPQUFNO0FBQ04sNERBQTJEOztBQUUzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07O0FBRU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFtQjs7QUFFbkIsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHlFQUF3RTs7QUFFeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSx5RUFBd0U7O0FBRXhFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFlBQVc7QUFDWDs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFlBQVc7QUFDWDs7QUFFQTtBQUNBOztBQUVBLDZDQUE0QyxTQUFTO0FBQ3JEOztBQUVBLFFBQU87QUFDUDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7QUFDRCxFOzs7Ozs7QUNqdEpBO0FBQ0E7QUFDQTtBQUNBLG1CQUFrQjtBQUNsQiwwQ0FBeUMsMEJBQTBCLDJEQUEyRCxFQUFFLGtCQUFrQiwwQkFBMEIsRUFBRSxtQ0FBbUMsOEJBQThCLG9DQUFvQyxjQUFjLEVBQUU7QUFDblMsK0NBQThDLGlDQUFpQyxPQUFPLE9BQU8sNkNBQTZDLEVBQUUsV0FBVzs7QUFFdko7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBdUMsV0FBVztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsV0FBVztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLHFDQUFvQzs7QUFFcEM7QUFDQSxtQ0FBa0MsV0FBVztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QyxZQUFZO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsWUFBWTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBLGNBQWE7QUFDYixZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyxZQUFZO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLFlBQVk7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsMkNBQTBDLFlBQVk7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLFlBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLFlBQVk7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0MsWUFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0MsWUFBWTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LFNBQUcsWUFBSCxFQUFpQjtBQUNmLGtCQUFZLFlBQU07QUFBQyxnQkFBRDtRQUFOLEVBQWlCLEVBQTdCLEVBRGU7TUFBakI7SUFKMkIsQ0FBN0IsQ0FEYzs7Ozs7Ozs7Ozs7Ozs7O0FDbEJoQixRQUFPLE9BQVAsb3BIIiwiZmlsZSI6Im9ic2NlbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE4ZTBkZTVhNGRjZTVlY2JhZTg5XG4gKiovIiwiLy8gZ2xvYmFscyBvYnNjZW5lX2NvbXBpbGVkXG5cbi8vIFRoZSBmb2N1cyBvZiB0aGUgbGlicmFyeSBpcyB0byBiZSByZWFjdGl2ZSB0aHJvdWdob3V0LlxuLy8gVGhlIHByaW1hcnkgcmVhY3RpdmUgbGlicmFyeSB1c2VkIGluIG91ciBhcHAuIE1vc3Qga25vd2xlZGdlIGdhcHMgd2lsbCBiZSBhdHRyaWJ1dGVkIHRvXG5pbXBvcnQgS2VmaXIgZnJvbSAna2VmaXInXG5cbmltcG9ydCBQYWNlIGZyb20gJ3BhY2UnXG5cbmltcG9ydCBvYnNjZW5lIGZyb20gJy4vb2Itc2NlbmUuanMnXG5pbXBvcnQgY29udHJvbHMgZnJvbSAnLi91c2VyL2NvbnRyb2xzLmpzJ1xuaW1wb3J0IENPTlNUQU5UUyBmcm9tICcuL2NvbnN0YW50cy5qcydcbi8vIGltcG9ydCBzY2VuZUNvbXBpbGVyIGZyb20gJy4vc2NlbmUtY29tcGlsZXIuanMnXG5cbmltcG9ydCByZW5kZXIgZnJvbSAnLi9yZW5kZXIvaW5kZXguanMnXG5pbXBvcnQgYXVkaW9wbGF5ZXIgZnJvbSAnLi9yZW5kZXIvYXVkaW9wbGF5ZXIuanMnXG5pbXBvcnQgbWFpblVJIGZyb20gJy4vdGVtcGxhdGUuanMnXG5cbi8vIGF1ZGlvcGxheWVyLmNvbmZpZyhzY2VuZUF1ZGlvQ29uZmlnKVxuXG5cbm1vZHVsZS5leHBvcnRzLmluaXQgPSAoY29uZmlnKSA9PiB7XG4gICAgLy8gb2JzY2VuZV9jb21waWxlZCBzaG91bGQgYmUgYSBnbG9iYWwgdmFyaWFibGUgZXhwb3NlZCBieSB0aGUgb2JzY2VuZSBjb21waWxlclxuICBsZXQgY29uZiA9IGNvbmZpZyB8fCBvYnNjZW5lX2NvbXBpbGVkXG5cbiAgLy8gSW5pdGlhbGl6ZSBPYnNjZW5lXG4gIC8vIHRyeSB7XG4gICAgaW5pdChjb25mKVxuICAvLyB9IGNhdGNoIChlKSB7XG4gICAgLy8gY29uc29sZS5lcnJvcihcIm9iLXNjZW5lIGluaXRhbGl6YXRpb24gZmFpbGVkLiBkaWQgeW91IGFkZCB0aGUgY29tcGlsZWQgb2Itc2NlbmUgZmlsZXM/XCIsIGUpXG4gIC8vIH1cbn1cblxuZnVuY3Rpb24gaW5pdChjb25maWcpIHtcbiAgLy8gUGFjZSByZXF1aXJlcyBhIC5zdGFydCB0byBzaG93IHRoZSBsb2FkaW5nIHNjcmVlblxuICBQYWNlLnN0YXJ0KClcblxuICBjb25zdCBzY2VuZUh0bWxTdHJpbmcgPSBjb25maWcuc2NlbmVIdG1sU3RyaW5nXG4gIGNvbnN0IHNjZW5lQ29uZmlnID0gY29uZmlnLnNjZW5lQ29uZmlnXG5cbiAgY29uc3QgY29yZVVJQWRkZWQkID0gYWRkQ29yZVVJKClcbiAgY29uc3QgbG9hZGluZ0NvbXBsZXRlJCA9IEtlZmlyLmZyb21FdmVudHMoUGFjZSwgJ2RvbmUnKVxuXG4gIGNvbnN0IGluaXRMb2FkaW5nQ29tcGxldGUkID0gS2VmaXIuemlwKFtsb2FkaW5nQ29tcGxldGUkLCBjb3JlVUlBZGRlZCRdKVxuICAgIC5maWx0ZXIoY2hlY2tSZWFkeVN0YXRlKVxuXG4gIGNvbnN0IHRvdWNoRGV2aWNlRGV0ZWN0ZWQkID0gaW5pdExvYWRpbmdDb21wbGV0ZSRcbiAgICAuZmlsdGVyKGlzVG91Y2hEZXZpY2UpXG5cbiAgdG91Y2hEZXZpY2VEZXRlY3RlZCRcbiAgICAub25WYWx1ZSgoKSA9PiB7XG4gICAgICAkKCcjdW5zdXBwb3J0ZWQnKS5zaG93KClcbiAgICAgICQoXCIuY29udGFpbmVyXCIpLmhpZGUoKVxuICAgICAgJChcIi5sb2FkaW5nXCIpLmhpZGUoKVxuICAgIH0pXG5cbiAgY29uc3QgcmVhZHlUb1BhcnNlJCA9IGluaXRMb2FkaW5nQ29tcGxldGUkXG4gICAgLmZpbHRlcigoKSA9PiAhKGlzVG91Y2hEZXZpY2UoKSkpXG5cbiAgcmVhZHlUb1BhcnNlJC5vblZhbHVlKCgpID0+IHtcbiAgICBvYnNjZW5lLmluaXQoc2NlbmVDb25maWcpXG4gICAgY29udHJvbHMuaW5pdCgpXG4gIH0pXG5cbiAgcmVhZHlUb1BhcnNlJC5vblZhbHVlKCgpID0+IHtcbiAgICAgICQoJy5jb250YWluZXItaW5uZXInKS5odG1sKHNjZW5lSHRtbFN0cmluZylcbiAgICAgICQoJy5sb2FkaW5nJykuZGVsYXkoMzAwKS5mYWRlT3V0KClcbiAgICAgIC8vIGF1ZGlvcGxheWVyLm5leHQoJ2ludHJvJyk7XG4gICAgICAvLyBhdWRpb3BsYXllci5wbGF5KCk7XG4gIH0pXG59XG5cbmZ1bmN0aW9uIGNoZWNrUmVhZHlTdGF0ZSgpIHtcbiAgcmV0dXJuIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIC8vIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkZWQnIC8vIG9sZGVyIHNhZmFyaVxuICAgICAgICAgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyAvLyBhdCBsZWFzdCBpbml0YWwgZG9jIGxvYWRlZFxuICAgICAgICAgKVxufVxuXG5mdW5jdGlvbiBpc1RvdWNoRGV2aWNlKCkge1xuICByZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IC8vIHdvcmtzIG9uIG1vc3QgYnJvd3NlcnNcbiAgICB8fCAnb25tc2dlc3R1cmVjaGFuZ2UnIGluIHdpbmRvdyAvLyB3b3JrcyBvbiBpZTEwXG59XG5cbmZ1bmN0aW9uIGFkZENvcmVVSSgpIHtcblxuICAvLyBBZGQgVUkgaHRtbFxuICBjb25zdCAkbWFpblVJID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgJG1haW5VSS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ29iLXNjZW5lLXdyYXBwZXInKVxuICAkbWFpblVJLmlubmVySFRNTCA9IG1haW5VSVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoJG1haW5VSSlcblxuICByZXR1cm4gS2VmaXIuc3RyZWFtKChlbWl0dGVyKSA9PiB7XG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzUyMTEyODZcblxuICAgIC8vIHNldCB1cCB0aGUgbXV0YXRpb24gb2JzZXJ2ZXJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMsIG1lKSA9PiB7XG4gICAgICAvLyBgbXV0YXRpb25zYCBpcyBhbiBhcnJheSBvZiBtdXRhdGlvbnMgdGhhdCBvY2N1cnJlZFxuICAgICAgLy8gYG1lYCBpcyB0aGUgTXV0YXRpb25PYnNlcnZlciBpbnN0YW5jZVxuICAgICAgY29uc3Qgb2JzY2VuZVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhwZXJpZW5jZS1wcm9ncmVzcycpXG4gICAgICBpZiAob2JzY2VuZVdyYXBwZXIpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KG9ic2NlbmVXcmFwcGVyKVxuICAgICAgICBtZS5kaXNjb25uZWN0KCkgLy8gc3RvcCBvYnNlcnZpbmdcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIHN0YXJ0IG9ic2VydmluZ1xuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgfSlcbiAgfSlcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCIvKiEgS2VmaXIuanMgdjMuMi4wXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL3Jwb21pbm92L2tlZmlyXG4gKi9cblxuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiS2VmaXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiS2VmaXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBLZWZpciA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cdEtlZmlyLktlZmlyID0gS2VmaXI7XG5cblx0dmFyIE9ic2VydmFibGUgPSBLZWZpci5PYnNlcnZhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblx0S2VmaXIuU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0S2VmaXIuUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xuXG5cdC8vIENyZWF0ZSBhIHN0cmVhbVxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vICgpIC0+IFN0cmVhbVxuXHRLZWZpci5uZXZlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cblx0Ly8gKG51bWJlciwgYW55KSAtPiBTdHJlYW1cblx0S2VmaXIubGF0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXG5cdC8vIChudW1iZXIsIGFueSkgLT4gU3RyZWFtXG5cdEtlZmlyLmludGVydmFsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMSk7XG5cblx0Ly8gKG51bWJlciwgQXJyYXk8YW55PikgLT4gU3RyZWFtXG5cdEtlZmlyLnNlcXVlbnRpYWxseSA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xuXG5cdC8vIChudW1iZXIsIEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0S2VmaXIuZnJvbVBvbGwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEzKTtcblxuXHQvLyAobnVtYmVyLCBGdW5jdGlvbikgLT4gU3RyZWFtXG5cdEtlZmlyLndpdGhJbnRlcnZhbCA9IF9fd2VicGFja19yZXF1aXJlX18oMTQpO1xuXG5cdC8vIChGdW5jdGlvbikgLT4gU3RyZWFtXG5cdEtlZmlyLmZyb21DYWxsYmFjayA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xuXG5cdC8vIChGdW5jdGlvbikgLT4gU3RyZWFtXG5cdEtlZmlyLmZyb21Ob2RlQ2FsbGJhY2sgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblxuXHQvLyBUYXJnZXQgPSB7YWRkRXZlbnRMaXN0ZW5lciwgcmVtb3ZlRXZlbnRMaXN0ZW5lcn18e2FkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lcn18e29uLCBvZmZ9XG5cdC8vIChUYXJnZXQsIHN0cmluZywgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0S2VmaXIuZnJvbUV2ZW50cyA9IF9fd2VicGFja19yZXF1aXJlX18oMTkpO1xuXG5cdC8vIChGdW5jdGlvbikgLT4gU3RyZWFtXG5cdEtlZmlyLnN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oMTcpO1xuXG5cdC8vIENyZWF0ZSBhIHByb3BlcnR5XG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Ly8gKGFueSkgLT4gUHJvcGVydHlcblx0S2VmaXIuY29uc3RhbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTtcblxuXHQvLyAoYW55KSAtPiBQcm9wZXJ0eVxuXHRLZWZpci5jb25zdGFudEVycm9yID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cblx0Ly8gQ29udmVydCBvYnNlcnZhYmxlc1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vIChTdHJlYW18UHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIHRvUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudG9Qcm9wZXJ0eSA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiB0b1Byb3BlcnR5KHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtfFByb3BlcnR5KSAtPiBTdHJlYW1cblx0dmFyIGNoYW5nZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI2KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuY2hhbmdlcyA9IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gY2hhbmdlcyh0aGlzKTtcblx0fTtcblxuXHQvLyBJbnRlcm9wZXJhdGlvbiB3aXRoIG90aGVyIGltcGxpbWVudGF0aW9uc1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8vIChQcm9taXNlKSAtPiBQcm9wZXJ0eVxuXHRLZWZpci5mcm9tUHJvbWlzZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjcpO1xuXG5cdC8vIChTdHJlYW18UHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvbWlzZVxuXHR2YXIgdG9Qcm9taXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyOCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvbWlzZSA9IGZ1bmN0aW9uIChQcm9taXNlKSB7XG5cdCAgcmV0dXJuIHRvUHJvbWlzZSh0aGlzLCBQcm9taXNlKTtcblx0fTtcblxuXHQvLyAoRVNPYnNlcnZhYmxlKSAtPiBTdHJlYW1cblx0S2VmaXIuZnJvbUVTT2JzZXJ2YWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjkpO1xuXG5cdC8vIChTdHJlYW18UHJvcGVydHkpIC0+IEVTNyBPYnNlcnZhYmxlXG5cdHZhciB0b0VTT2JzZXJ2YWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzEpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50b0VTT2JzZXJ2YWJsZSA9IHRvRVNPYnNlcnZhYmxlO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZVtfX3dlYnBhY2tfcmVxdWlyZV9fKDMwKSgnb2JzZXJ2YWJsZScpXSA9IHRvRVNPYnNlcnZhYmxlO1xuXG5cdC8vIE1vZGlmeSBhbiBvYnNlcnZhYmxlXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBtYXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMyKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIG1hcCh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBmaWx0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMzKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlsdGVyID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIGZpbHRlcih0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgbnVtYmVyKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIpIC0+IFByb3BlcnR5XG5cdHZhciB0YWtlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRha2UgPSBmdW5jdGlvbiAobikge1xuXHQgIHJldHVybiB0YWtlKHRoaXMsIG4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIG51bWJlcikgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyKSAtPiBQcm9wZXJ0eVxuXHR2YXIgdGFrZUVycm9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oMzUpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlRXJyb3JzID0gZnVuY3Rpb24gKG4pIHtcblx0ICByZXR1cm4gdGFrZUVycm9ycyh0aGlzLCBuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIHRha2VXaGlsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzYpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlV2hpbGUgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gdGFrZVdoaWxlKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgbGFzdCA9IF9fd2VicGFja19yZXF1aXJlX18oMzcpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBsYXN0KHRoaXMpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIG51bWJlcikgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyKSAtPiBQcm9wZXJ0eVxuXHR2YXIgc2tpcCA9IF9fd2VicGFja19yZXF1aXJlX18oMzgpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwID0gZnVuY3Rpb24gKG4pIHtcblx0ICByZXR1cm4gc2tpcCh0aGlzLCBuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIHNraXBXaGlsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMzkpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwV2hpbGUgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gc2tpcFdoaWxlKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIHNraXBEdXBsaWNhdGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0MCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnNraXBEdXBsaWNhdGVzID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIHNraXBEdXBsaWNhdGVzKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnxmYWxzZXksIGFueXx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufGZhbHNleSwgYW55fHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGRpZmYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQxKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZGlmZiA9IGZ1bmN0aW9uIChmbiwgc2VlZCkge1xuXHQgIHJldHVybiBkaWZmKHRoaXMsIGZuLCBzZWVkKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtfFByb3BlcnR5LCBGdW5jdGlvbiwgYW55fHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIHNjYW4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQyKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIChmbiwgc2VlZCkge1xuXHQgIHJldHVybiBzY2FuKHRoaXMsIGZuLCBzZWVkKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGZsYXR0ZW4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdHRlbiA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBmbGF0dGVuKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBudW1iZXIpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlcikgLT4gUHJvcGVydHlcblx0dmFyIGRlbGF5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0NCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKHdhaXQpIHtcblx0ICByZXR1cm4gZGVsYXkodGhpcywgd2FpdCk7XG5cdH07XG5cblx0Ly8gT3B0aW9ucyA9IHtsZWFkaW5nOiBib29sZWFufHVuZGVmaW5lZCwgdHJhaWxpbmc6IGJvb2xlYW58dW5kZWZpbmVkfVxuXHQvLyAoU3RyZWFtLCBudW1iZXIsIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBudW1iZXIsIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgdGhyb3R0bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ1KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUudGhyb3R0bGUgPSBmdW5jdGlvbiAod2FpdCwgb3B0aW9ucykge1xuXHQgIHJldHVybiB0aHJvdHRsZSh0aGlzLCB3YWl0LCBvcHRpb25zKTtcblx0fTtcblxuXHQvLyBPcHRpb25zID0ge2ltbWVkaWF0ZTogYm9vbGVhbnx1bmRlZmluZWR9XG5cdC8vIChTdHJlYW0sIG51bWJlciwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlciwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBkZWJvdW5jZSA9IF9fd2VicGFja19yZXF1aXJlX18oNDcpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uICh3YWl0LCBvcHRpb25zKSB7XG5cdCAgcmV0dXJuIGRlYm91bmNlKHRoaXMsIHdhaXQsIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgbWFwRXJyb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLm1hcEVycm9ycyA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBtYXBFcnJvcnModGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9ufHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgZmlsdGVyRXJyb3JzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0OSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZpbHRlckVycm9ycyA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBmaWx0ZXJFcnJvcnModGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0pIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciBpZ25vcmVWYWx1ZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUwKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuaWdub3JlVmFsdWVzID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiBpZ25vcmVWYWx1ZXModGhpcyk7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIGlnbm9yZUVycm9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oNTEpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5pZ25vcmVFcnJvcnMgPSBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIGlnbm9yZUVycm9ycyh0aGlzKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5KSAtPiBQcm9wZXJ0eVxuXHR2YXIgaWdub3JlRW5kID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Mik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmlnbm9yZUVuZCA9IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gaWdub3JlRW5kKHRoaXMpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbikgLT4gUHJvcGVydHlcblx0dmFyIGJlZm9yZUVuZCA9IF9fd2VicGFja19yZXF1aXJlX18oNTMpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5iZWZvcmVFbmQgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gYmVmb3JlRW5kKHRoaXMsIGZuKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBudW1iZXIsIG51bWJlcnx1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIG51bWJlciwgbnVtYmVyfHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIHNsaWRpbmdXaW5kb3cgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU0KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuc2xpZGluZ1dpbmRvdyA9IGZ1bmN0aW9uIChtYXgsIG1pbikge1xuXHQgIHJldHVybiBzbGlkaW5nV2luZG93KHRoaXMsIG1heCwgbWluKTtcblx0fTtcblxuXHQvLyBPcHRpb25zID0ge2ZsdXNoT25FbmQ6IGJvb2xlYW58dW5kZWZpbmVkfVxuXHQvLyAoU3RyZWFtLCBGdW5jdGlvbnxmYWxzZXksIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnxmYWxzZXksIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgYnVmZmVyV2hpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU1KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyV2hpbGUgPSBmdW5jdGlvbiAoZm4sIG9wdGlvbnMpIHtcblx0ICByZXR1cm4gYnVmZmVyV2hpbGUodGhpcywgZm4sIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIG51bWJlcikgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyKSAtPiBQcm9wZXJ0eVxuXHR2YXIgYnVmZmVyV2l0aENvdW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Nik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlcldpdGhDb3VudCA9IGZ1bmN0aW9uIChjb3VudCwgb3B0aW9ucykge1xuXHQgIHJldHVybiBidWZmZXJXaXRoQ291bnQodGhpcywgY291bnQsIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8vIE9wdGlvbnMgPSB7Zmx1c2hPbkVuZDogYm9vbGVhbnx1bmRlZmluZWR9XG5cdC8vIChTdHJlYW0sIG51bWJlciwgbnVtYmVyLCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgbnVtYmVyLCBudW1iZXIsIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgYnVmZmVyV2l0aFRpbWVPckNvdW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1Nyk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlcldpdGhUaW1lT3JDb3VudCA9IGZ1bmN0aW9uICh3YWl0LCBjb3VudCwgb3B0aW9ucykge1xuXHQgIHJldHVybiBidWZmZXJXaXRoVGltZU9yQ291bnQodGhpcywgd2FpdCwgY291bnQsIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8vIChTdHJlYW0sIEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbikgLT4gUHJvcGVydHlcblx0dmFyIHRyYW5zZHVjZSA9IF9fd2VicGFja19yZXF1aXJlX18oNTgpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50cmFuc2R1Y2UgPSBmdW5jdGlvbiAodHJhbnNkdWNlcikge1xuXHQgIHJldHVybiB0cmFuc2R1Y2UodGhpcywgdHJhbnNkdWNlcik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb24pIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIEZ1bmN0aW9uKSAtPiBQcm9wZXJ0eVxuXHR2YXIgd2l0aEhhbmRsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDU5KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUud2l0aEhhbmRsZXIgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gd2l0aEhhbmRsZXIodGhpcywgZm4pO1xuXHR9O1xuXG5cdC8vIENvbWJpbmUgb2JzZXJ2YWJsZXNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvLyAoQXJyYXk8U3RyZWFtfFByb3BlcnR5PiwgRnVuY3Rpb258dW5kZWZpZW5kKSAtPiBTdHJlYW1cblx0Ly8gKEFycmF5PFN0cmVhbXxQcm9wZXJ0eT4sIEFycmF5PFN0cmVhbXxQcm9wZXJ0eT4sIEZ1bmN0aW9ufHVuZGVmaWVuZCkgLT4gU3RyZWFtXG5cdHZhciBjb21iaW5lID0gS2VmaXIuY29tYmluZSA9IF9fd2VicGFja19yZXF1aXJlX18oNjApO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5jb21iaW5lID0gZnVuY3Rpb24gKG90aGVyLCBjb21iaW5hdG9yKSB7XG5cdCAgcmV0dXJuIGNvbWJpbmUoW3RoaXMsIG90aGVyXSwgY29tYmluYXRvcik7XG5cdH07XG5cblx0Ly8gKEFycmF5PFN0cmVhbXxQcm9wZXJ0eT4sIEZ1bmN0aW9ufHVuZGVmaWVuZCkgLT4gU3RyZWFtXG5cdHZhciB6aXAgPSBLZWZpci56aXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYxKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuemlwID0gZnVuY3Rpb24gKG90aGVyLCBjb21iaW5hdG9yKSB7XG5cdCAgcmV0dXJuIHppcChbdGhpcywgb3RoZXJdLCBjb21iaW5hdG9yKTtcblx0fTtcblxuXHQvLyAoQXJyYXk8U3RyZWFtfFByb3BlcnR5PikgLT4gU3RyZWFtXG5cdHZhciBtZXJnZSA9IEtlZmlyLm1lcmdlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Mik7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24gKG90aGVyKSB7XG5cdCAgcmV0dXJuIG1lcmdlKFt0aGlzLCBvdGhlcl0pO1xuXHR9O1xuXG5cdC8vIChBcnJheTxTdHJlYW18UHJvcGVydHk+KSAtPiBTdHJlYW1cblx0dmFyIGNvbmNhdCA9IEtlZmlyLmNvbmNhdCA9IF9fd2VicGFja19yZXF1aXJlX18oNjQpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5jb25jYXQgPSBmdW5jdGlvbiAob3RoZXIpIHtcblx0ICByZXR1cm4gY29uY2F0KFt0aGlzLCBvdGhlcl0pO1xuXHR9O1xuXG5cdC8vICgpIC0+IFBvb2xcblx0dmFyIFBvb2wgPSBLZWZpci5Qb29sID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2Nik7XG5cdEtlZmlyLnBvb2wgPSBmdW5jdGlvbiAoKSB7XG5cdCAgcmV0dXJuIG5ldyBQb29sKCk7XG5cdH07XG5cblx0Ly8gKEZ1bmN0aW9uKSAtPiBTdHJlYW1cblx0S2VmaXIucmVwZWF0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NSk7XG5cblx0Ly8gT3B0aW9ucyA9IHtjb25jdXJMaW06IG51bWJlcnx1bmRlZmluZWQsIHF1ZXVlTGltOiBudW1iZXJ8dW5kZWZpbmVkLCBkcm9wOiAnb2xkJ3wnbmV3J3x1bmRlZmllbmR9XG5cdC8vIChTdHJlYW18UHJvcGVydHksIEZ1bmN0aW9ufGZhbHNleSwgT3B0aW9uc3x1bmRlZmluZWQpIC0+IFN0cmVhbVxuXHR2YXIgRmxhdE1hcCA9IF9fd2VicGFja19yZXF1aXJlX18oNjcpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIG5ldyBGbGF0TWFwKHRoaXMsIGZuKS5zZXROYW1lKHRoaXMsICdmbGF0TWFwJyk7XG5cdH07XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBMYXRlc3QgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gbmV3IEZsYXRNYXAodGhpcywgZm4sIHsgY29uY3VyTGltOiAxLCBkcm9wOiAnb2xkJyB9KS5zZXROYW1lKHRoaXMsICdmbGF0TWFwTGF0ZXN0Jyk7XG5cdH07XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBGaXJzdCA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHJldHVybiBuZXcgRmxhdE1hcCh0aGlzLCBmbiwgeyBjb25jdXJMaW06IDEgfSkuc2V0TmFtZSh0aGlzLCAnZmxhdE1hcEZpcnN0Jyk7XG5cdH07XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBDb25jYXQgPSBmdW5jdGlvbiAoZm4pIHtcblx0ICByZXR1cm4gbmV3IEZsYXRNYXAodGhpcywgZm4sIHsgcXVldWVMaW06IC0xLCBjb25jdXJMaW06IDEgfSkuc2V0TmFtZSh0aGlzLCAnZmxhdE1hcENvbmNhdCcpO1xuXHR9O1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwQ29uY3VyTGltaXQgPSBmdW5jdGlvbiAoZm4sIGxpbWl0KSB7XG5cdCAgcmV0dXJuIG5ldyBGbGF0TWFwKHRoaXMsIGZuLCB7IHF1ZXVlTGltOiAtMSwgY29uY3VyTGltOiBsaW1pdCB9KS5zZXROYW1lKHRoaXMsICdmbGF0TWFwQ29uY3VyTGltaXQnKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtfFByb3BlcnR5LCBGdW5jdGlvbnxmYWxzZXkpIC0+IFN0cmVhbVxuXHR2YXIgRmxhdE1hcEVycm9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oNjgpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwRXJyb3JzID0gZnVuY3Rpb24gKGZuKSB7XG5cdCAgcmV0dXJuIG5ldyBGbGF0TWFwRXJyb3JzKHRoaXMsIGZuKS5zZXROYW1lKHRoaXMsICdmbGF0TWFwRXJyb3JzJyk7XG5cdH07XG5cblx0Ly8gQ29tYmluZSB0d28gb2JzZXJ2YWJsZXNcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvLyAoU3RyZWFtLCBTdHJlYW18UHJvcGVydHkpIC0+IFN0cmVhbVxuXHQvLyAoUHJvcGVydHksIFN0cmVhbXxQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIGZpbHRlckJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2OSk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmZpbHRlckJ5ID0gZnVuY3Rpb24gKG90aGVyKSB7XG5cdCAgcmV0dXJuIGZpbHRlckJ5KHRoaXMsIG90aGVyKTtcblx0fTtcblxuXHQvLyAoU3RyZWFtLCBTdHJlYW18UHJvcGVydHksIEZ1bmN0aW9ufHVuZGVmaWVuZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgU3RyZWFtfFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmllbmQpIC0+IFByb3BlcnR5XG5cdHZhciBzYW1wbGVkQnkyaXRlbXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcxKTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuc2FtcGxlZEJ5ID0gZnVuY3Rpb24gKG90aGVyLCBjb21iaW5hdG9yKSB7XG5cdCAgcmV0dXJuIHNhbXBsZWRCeTJpdGVtcyh0aGlzLCBvdGhlciwgY29tYmluYXRvcik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgU3RyZWFtfFByb3BlcnR5KSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBTdHJlYW18UHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciBza2lwVW50aWxCeSA9IF9fd2VicGFja19yZXF1aXJlX18oNzIpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5za2lwVW50aWxCeSA9IGZ1bmN0aW9uIChvdGhlcikge1xuXHQgIHJldHVybiBza2lwVW50aWxCeSh0aGlzLCBvdGhlcik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgU3RyZWFtfFByb3BlcnR5KSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBTdHJlYW18UHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciB0YWtlVW50aWxCeSA9IF9fd2VicGFja19yZXF1aXJlX18oNzMpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS50YWtlVW50aWxCeSA9IGZ1bmN0aW9uIChvdGhlcikge1xuXHQgIHJldHVybiB0YWtlVW50aWxCeSh0aGlzLCBvdGhlcik7XG5cdH07XG5cblx0Ly8gT3B0aW9ucyA9IHtmbHVzaE9uRW5kOiBib29sZWFufHVuZGVmaW5lZH1cblx0Ly8gKFN0cmVhbSwgU3RyZWFtfFByb3BlcnR5LCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSwgU3RyZWFtfFByb3BlcnR5LCBPcHRpb25zfHVuZGVmaW5lZCkgLT4gUHJvcGVydHlcblx0dmFyIGJ1ZmZlckJ5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3NCk7XG5cdE9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlckJ5ID0gZnVuY3Rpb24gKG90aGVyLCBvcHRpb25zKSB7XG5cdCAgcmV0dXJuIGJ1ZmZlckJ5KHRoaXMsIG90aGVyLCBvcHRpb25zKTtcblx0fTtcblxuXHQvLyBPcHRpb25zID0ge2ZsdXNoT25FbmQ6IGJvb2xlYW58dW5kZWZpbmVkfVxuXHQvLyAoU3RyZWFtLCBTdHJlYW18UHJvcGVydHksIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBTdHJlYW18UHJvcGVydHksIE9wdGlvbnN8dW5kZWZpbmVkKSAtPiBQcm9wZXJ0eVxuXHR2YXIgYnVmZmVyV2hpbGVCeSA9IF9fd2VicGFja19yZXF1aXJlX18oNzUpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5idWZmZXJXaGlsZUJ5ID0gZnVuY3Rpb24gKG90aGVyLCBvcHRpb25zKSB7XG5cdCAgcmV0dXJuIGJ1ZmZlcldoaWxlQnkodGhpcywgb3RoZXIsIG9wdGlvbnMpO1xuXHR9O1xuXG5cdC8vIERlcHJlY2F0ZWRcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRmdW5jdGlvbiB3YXJuKG1zZykge1xuXHQgIGlmIChLZWZpci5ERVBSRUNBVElPTl9XQVJOSU5HUyAhPT0gZmFsc2UgJiYgY29uc29sZSAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICB2YXIgbXNnMiA9ICdcXG5IZXJlIGlzIGFuIEVycm9yIG9iamVjdCBmb3IgeW91IGNvbnRhaW5pbmcgdGhlIGNhbGwgc3RhY2s6Jztcblx0ICAgIGNvbnNvbGUud2Fybihtc2csIG1zZzIsIG5ldyBFcnJvcigpKTtcblx0ICB9XG5cdH1cblxuXHQvLyAoU3RyZWFtfFByb3BlcnR5LCBTdHJlYW18UHJvcGVydHkpIC0+IFByb3BlcnR5XG5cdHZhciBhd2FpdGluZyA9IF9fd2VicGFja19yZXF1aXJlX18oNzYpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5hd2FpdGluZyA9IGZ1bmN0aW9uIChvdGhlcikge1xuXHQgIHdhcm4oJ1lvdSBhcmUgdXNpbmcgZGVwcmVjYXRlZCAuYXdhaXRpbmcoKSBtZXRob2QsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcnBvbWlub3Yva2VmaXIvaXNzdWVzLzE0NScpO1xuXHQgIHJldHVybiBhd2FpdGluZyh0aGlzLCBvdGhlcik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciB2YWx1ZXNUb0Vycm9ycyA9IF9fd2VicGFja19yZXF1aXJlX18oNzcpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZXNUb0Vycm9ycyA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHdhcm4oJ1lvdSBhcmUgdXNpbmcgZGVwcmVjYXRlZCAudmFsdWVzVG9FcnJvcnMoKSBtZXRob2QsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcnBvbWlub3Yva2VmaXIvaXNzdWVzLzE0OScpO1xuXHQgIHJldHVybiB2YWx1ZXNUb0Vycm9ycyh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSwgRnVuY3Rpb258dW5kZWZpbmVkKSAtPiBTdHJlYW1cblx0Ly8gKFByb3BlcnR5LCBGdW5jdGlvbnx1bmRlZmluZWQpIC0+IFByb3BlcnR5XG5cdHZhciBlcnJvcnNUb1ZhbHVlcyA9IF9fd2VicGFja19yZXF1aXJlX18oNzgpO1xuXHRPYnNlcnZhYmxlLnByb3RvdHlwZS5lcnJvcnNUb1ZhbHVlcyA9IGZ1bmN0aW9uIChmbikge1xuXHQgIHdhcm4oJ1lvdSBhcmUgdXNpbmcgZGVwcmVjYXRlZCAuZXJyb3JzVG9WYWx1ZXMoKSBtZXRob2QsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcnBvbWlub3Yva2VmaXIvaXNzdWVzLzE0OScpO1xuXHQgIHJldHVybiBlcnJvcnNUb1ZhbHVlcyh0aGlzLCBmbik7XG5cdH07XG5cblx0Ly8gKFN0cmVhbSkgLT4gU3RyZWFtXG5cdC8vIChQcm9wZXJ0eSkgLT4gUHJvcGVydHlcblx0dmFyIGVuZE9uRXJyb3IgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDc5KTtcblx0T2JzZXJ2YWJsZS5wcm90b3R5cGUuZW5kT25FcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0ICB3YXJuKCdZb3UgYXJlIHVzaW5nIGRlcHJlY2F0ZWQgLmVuZE9uRXJyb3IoKSBtZXRob2QsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vcnBvbWlub3Yva2VmaXIvaXNzdWVzLzE1MCcpO1xuXHQgIHJldHVybiBlbmRPbkVycm9yKHRoaXMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGV4dGVuZCA9IF9yZXF1aXJlLmV4dGVuZDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZTIuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlMi5FUlJPUjtcblx0dmFyIEFOWSA9IF9yZXF1aXJlMi5BTlk7XG5cdHZhciBFTkQgPSBfcmVxdWlyZTIuRU5EO1xuXG5cdHZhciBfcmVxdWlyZTMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG5cdHZhciBEaXNwYXRjaGVyID0gX3JlcXVpcmUzLkRpc3BhdGNoZXI7XG5cdHZhciBjYWxsU3Vic2NyaWJlciA9IF9yZXF1aXJlMy5jYWxsU3Vic2NyaWJlcjtcblxuXHR2YXIgX3JlcXVpcmU0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgZmluZEJ5UHJlZCA9IF9yZXF1aXJlNC5maW5kQnlQcmVkO1xuXG5cdGZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XG5cdCAgdGhpcy5fZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG5cdCAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG5cdCAgdGhpcy5fYWxpdmUgPSB0cnVlO1xuXHQgIHRoaXMuX2FjdGl2YXRpbmcgPSBmYWxzZTtcblx0ICB0aGlzLl9sb2dIYW5kbGVycyA9IG51bGw7XG5cdH1cblxuXHRleHRlbmQoT2JzZXJ2YWJsZS5wcm90b3R5cGUsIHtcblxuXHQgIF9uYW1lOiAnb2JzZXJ2YWJsZScsXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge30sXG5cdCAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7fSxcblxuXHQgIF9zZXRBY3RpdmU6IGZ1bmN0aW9uIF9zZXRBY3RpdmUoYWN0aXZlKSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZlICE9PSBhY3RpdmUpIHtcblx0ICAgICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuXHQgICAgICBpZiAoYWN0aXZlKSB7XG5cdCAgICAgICAgdGhpcy5fYWN0aXZhdGluZyA9IHRydWU7XG5cdCAgICAgICAgdGhpcy5fb25BY3RpdmF0aW9uKCk7XG5cdCAgICAgICAgdGhpcy5fYWN0aXZhdGluZyA9IGZhbHNlO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIHRoaXMuX29uRGVhY3RpdmF0aW9uKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICB0aGlzLl9zZXRBY3RpdmUoZmFsc2UpO1xuXHQgICAgdGhpcy5fZGlzcGF0Y2hlci5jbGVhbnVwKCk7XG5cdCAgICB0aGlzLl9kaXNwYXRjaGVyID0gbnVsbDtcblx0ICAgIHRoaXMuX2xvZ0hhbmRsZXJzID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2VtaXQ6IGZ1bmN0aW9uIF9lbWl0KHR5cGUsIHgpIHtcblx0ICAgIHN3aXRjaCAodHlwZSkge1xuXHQgICAgICBjYXNlIFZBTFVFOlxuXHQgICAgICAgIHJldHVybiB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICAgIGNhc2UgRVJST1I6XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgICAgY2FzZSBFTkQ6XG5cdCAgICAgICAgcmV0dXJuIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2VtaXRWYWx1ZTogZnVuY3Rpb24gX2VtaXRWYWx1ZSh2YWx1ZSkge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBWQUxVRSwgdmFsdWU6IHZhbHVlIH0pO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZW1pdEVycm9yOiBmdW5jdGlvbiBfZW1pdEVycm9yKHZhbHVlKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdGhpcy5fZGlzcGF0Y2hlci5kaXNwYXRjaCh7IHR5cGU6IEVSUk9SLCB2YWx1ZTogdmFsdWUgfSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9lbWl0RW5kOiBmdW5jdGlvbiBfZW1pdEVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB0aGlzLl9hbGl2ZSA9IGZhbHNlO1xuXHQgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogRU5EIH0pO1xuXHQgICAgICB0aGlzLl9jbGVhcigpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb246IGZ1bmN0aW9uIF9vbih0eXBlLCBmbikge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuYWRkKHR5cGUsIGZuKTtcblx0ICAgICAgdGhpcy5fc2V0QWN0aXZlKHRydWUpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgY2FsbFN1YnNjcmliZXIodHlwZSwgZm4sIHsgdHlwZTogRU5EIH0pO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRoaXM7XG5cdCAgfSxcblxuXHQgIF9vZmY6IGZ1bmN0aW9uIF9vZmYodHlwZSwgZm4pIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB2YXIgY291bnQgPSB0aGlzLl9kaXNwYXRjaGVyLnJlbW92ZSh0eXBlLCBmbik7XG5cdCAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuXHQgICAgICAgIHRoaXMuX3NldEFjdGl2ZShmYWxzZSk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH0sXG5cblx0ICBvblZhbHVlOiBmdW5jdGlvbiBvblZhbHVlKGZuKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fb24oVkFMVUUsIGZuKTtcblx0ICB9LFxuXHQgIG9uRXJyb3I6IGZ1bmN0aW9uIG9uRXJyb3IoZm4pIHtcblx0ICAgIHJldHVybiB0aGlzLl9vbihFUlJPUiwgZm4pO1xuXHQgIH0sXG5cdCAgb25FbmQ6IGZ1bmN0aW9uIG9uRW5kKGZuKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fb24oRU5ELCBmbik7XG5cdCAgfSxcblx0ICBvbkFueTogZnVuY3Rpb24gb25BbnkoZm4pIHtcblx0ICAgIHJldHVybiB0aGlzLl9vbihBTlksIGZuKTtcblx0ICB9LFxuXG5cdCAgb2ZmVmFsdWU6IGZ1bmN0aW9uIG9mZlZhbHVlKGZuKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fb2ZmKFZBTFVFLCBmbik7XG5cdCAgfSxcblx0ICBvZmZFcnJvcjogZnVuY3Rpb24gb2ZmRXJyb3IoZm4pIHtcblx0ICAgIHJldHVybiB0aGlzLl9vZmYoRVJST1IsIGZuKTtcblx0ICB9LFxuXHQgIG9mZkVuZDogZnVuY3Rpb24gb2ZmRW5kKGZuKSB7XG5cdCAgICByZXR1cm4gdGhpcy5fb2ZmKEVORCwgZm4pO1xuXHQgIH0sXG5cdCAgb2ZmQW55OiBmdW5jdGlvbiBvZmZBbnkoZm4pIHtcblx0ICAgIHJldHVybiB0aGlzLl9vZmYoQU5ZLCBmbik7XG5cdCAgfSxcblxuXHQgIC8vIEEgYW5kIEIgbXVzdCBiZSBzdWJjbGFzc2VzIG9mIFN0cmVhbSBhbmQgUHJvcGVydHkgKG9yZGVyIGRvZXNuJ3QgbWF0dGVyKVxuXHQgIF9vZlNhbWVUeXBlOiBmdW5jdGlvbiBfb2ZTYW1lVHlwZShBLCBCKSB7XG5cdCAgICByZXR1cm4gQS5wcm90b3R5cGUuZ2V0VHlwZSgpID09PSB0aGlzLmdldFR5cGUoKSA/IEEgOiBCO1xuXHQgIH0sXG5cblx0ICBzZXROYW1lOiBmdW5jdGlvbiBzZXROYW1lKHNvdXJjZU9icywgLyogb3B0aW9uYWwgKi9zZWxmTmFtZSkge1xuXHQgICAgdGhpcy5fbmFtZSA9IHNlbGZOYW1lID8gc291cmNlT2JzLl9uYW1lICsgJy4nICsgc2VsZk5hbWUgOiBzb3VyY2VPYnM7XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9LFxuXG5cdCAgbG9nOiBmdW5jdGlvbiBsb2coKSB7XG5cdCAgICB2YXIgbmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRoaXMudG9TdHJpbmcoKSA6IGFyZ3VtZW50c1swXTtcblxuXHQgICAgdmFyIGlzQ3VycmVudCA9IHVuZGVmaW5lZDtcblx0ICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuXHQgICAgICB2YXIgdHlwZSA9ICc8JyArIGV2ZW50LnR5cGUgKyAoaXNDdXJyZW50ID8gJzpjdXJyZW50JyA6ICcnKSArICc+Jztcblx0ICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVORCkge1xuXHQgICAgICAgIGNvbnNvbGUubG9nKG5hbWUsIHR5cGUpO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGNvbnNvbGUubG9nKG5hbWUsIHR5cGUsIGV2ZW50LnZhbHVlKTtcblx0ICAgICAgfVxuXHQgICAgfTtcblxuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIGlmICghdGhpcy5fbG9nSGFuZGxlcnMpIHtcblx0ICAgICAgICB0aGlzLl9sb2dIYW5kbGVycyA9IFtdO1xuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuX2xvZ0hhbmRsZXJzLnB1c2goeyBuYW1lOiBuYW1lLCBoYW5kbGVyOiBoYW5kbGVyIH0pO1xuXHQgICAgfVxuXG5cdCAgICBpc0N1cnJlbnQgPSB0cnVlO1xuXHQgICAgdGhpcy5vbkFueShoYW5kbGVyKTtcblx0ICAgIGlzQ3VycmVudCA9IGZhbHNlO1xuXG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9LFxuXG5cdCAgb2ZmTG9nOiBmdW5jdGlvbiBvZmZMb2coKSB7XG5cdCAgICB2YXIgbmFtZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IHRoaXMudG9TdHJpbmcoKSA6IGFyZ3VtZW50c1swXTtcblxuXHQgICAgaWYgKHRoaXMuX2xvZ0hhbmRsZXJzKSB7XG5cdCAgICAgIHZhciBoYW5kbGVySW5kZXggPSBmaW5kQnlQcmVkKHRoaXMuX2xvZ0hhbmRsZXJzLCBmdW5jdGlvbiAob2JqKSB7XG5cdCAgICAgICAgcmV0dXJuIG9iai5uYW1lID09PSBuYW1lO1xuXHQgICAgICB9KTtcblx0ICAgICAgaWYgKGhhbmRsZXJJbmRleCAhPT0gLTEpIHtcblx0ICAgICAgICB0aGlzLm9mZkFueSh0aGlzLl9sb2dIYW5kbGVyc1toYW5kbGVySW5kZXhdLmhhbmRsZXIpO1xuXHQgICAgICAgIHRoaXMuX2xvZ0hhbmRsZXJzLnNwbGljZShoYW5kbGVySW5kZXgsIDEpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH1cblx0fSk7XG5cblx0Ly8gZXh0ZW5kKCkgY2FuJ3QgaGFuZGxlIGB0b1N0cmluZ2AgaW4gSUU4XG5cdE9ic2VydmFibGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHQgIHJldHVybiAnWycgKyB0aGlzLl9uYW1lICsgJ10nO1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gT2JzZXJ2YWJsZTtcblxuLyoqKi8gfSxcbi8qIDIgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZU9iaihwcm90bykge1xuXHQgIHZhciBGID0gZnVuY3Rpb24gRigpIHt9O1xuXHQgIEYucHJvdG90eXBlID0gcHJvdG87XG5cdCAgcmV0dXJuIG5ldyBGKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBleHRlbmQodGFyZ2V0IC8qLCBtaXhpbjEsIG1peGluMi4uLiovKSB7XG5cdCAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsXG5cdCAgICAgIGkgPSB1bmRlZmluZWQsXG5cdCAgICAgIHByb3AgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICBmb3IgKHByb3AgaW4gYXJndW1lbnRzW2ldKSB7XG5cdCAgICAgIHRhcmdldFtwcm9wXSA9IGFyZ3VtZW50c1tpXVtwcm9wXTtcblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGZ1bmN0aW9uIGluaGVyaXQoQ2hpbGQsIFBhcmVudCAvKiwgbWl4aW4xLCBtaXhpbjIuLi4qLykge1xuXHQgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIENoaWxkLnByb3RvdHlwZSA9IGNyZWF0ZU9iaihQYXJlbnQucHJvdG90eXBlKTtcblx0ICBDaGlsZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDaGlsZDtcblx0ICBmb3IgKGkgPSAyOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIGV4dGVuZChDaGlsZC5wcm90b3R5cGUsIGFyZ3VtZW50c1tpXSk7XG5cdCAgfVxuXHQgIHJldHVybiBDaGlsZDtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0geyBleHRlbmQ6IGV4dGVuZCwgaW5oZXJpdDogaW5oZXJpdCB9O1xuXG4vKioqLyB9LFxuLyogMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdGV4cG9ydHMuTk9USElORyA9IFsnPG5vdGhpbmc+J107XG5cdGV4cG9ydHMuRU5EID0gJ2VuZCc7XG5cdGV4cG9ydHMuVkFMVUUgPSAndmFsdWUnO1xuXHRleHBvcnRzLkVSUk9SID0gJ2Vycm9yJztcblx0ZXhwb3J0cy5BTlkgPSAnYW55JztcblxuLyoqKi8gfSxcbi8qIDQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBleHRlbmQgPSBfcmVxdWlyZS5leHRlbmQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUyLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZTIuRVJST1I7XG5cdHZhciBBTlkgPSBfcmVxdWlyZTIuQU5ZO1xuXG5cdHZhciBfcmVxdWlyZTMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdHZhciBjb25jYXQgPSBfcmVxdWlyZTMuY29uY2F0O1xuXHR2YXIgZmluZEJ5UHJlZCA9IF9yZXF1aXJlMy5maW5kQnlQcmVkO1xuXHR2YXIgX3JlbW92ZSA9IF9yZXF1aXJlMy5yZW1vdmU7XG5cdHZhciBjb250YWlucyA9IF9yZXF1aXJlMy5jb250YWlucztcblxuXHRmdW5jdGlvbiBjYWxsU3Vic2NyaWJlcih0eXBlLCBmbiwgZXZlbnQpIHtcblx0ICBpZiAodHlwZSA9PT0gQU5ZKSB7XG5cdCAgICBmbihldmVudCk7XG5cdCAgfSBlbHNlIGlmICh0eXBlID09PSBldmVudC50eXBlKSB7XG5cdCAgICBpZiAodHlwZSA9PT0gVkFMVUUgfHwgdHlwZSA9PT0gRVJST1IpIHtcblx0ICAgICAgZm4oZXZlbnQudmFsdWUpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgZm4oKTtcblx0ICAgIH1cblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBEaXNwYXRjaGVyKCkge1xuXHQgIHRoaXMuX2l0ZW1zID0gW107XG5cdCAgdGhpcy5faW5Mb29wID0gMDtcblx0ICB0aGlzLl9yZW1vdmVkSXRlbXMgPSBudWxsO1xuXHR9XG5cblx0ZXh0ZW5kKERpc3BhdGNoZXIucHJvdG90eXBlLCB7XG5cblx0ICBhZGQ6IGZ1bmN0aW9uIGFkZCh0eXBlLCBmbikge1xuXHQgICAgdGhpcy5faXRlbXMgPSBjb25jYXQodGhpcy5faXRlbXMsIFt7IHR5cGU6IHR5cGUsIGZuOiBmbiB9XSk7XG5cdCAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuXHQgIH0sXG5cblx0ICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSh0eXBlLCBmbikge1xuXHQgICAgdmFyIGluZGV4ID0gZmluZEJ5UHJlZCh0aGlzLl9pdGVtcywgZnVuY3Rpb24gKHgpIHtcblx0ICAgICAgcmV0dXJuIHgudHlwZSA9PT0gdHlwZSAmJiB4LmZuID09PSBmbjtcblx0ICAgIH0pO1xuXG5cdCAgICAvLyBpZiB3ZSdyZSBjdXJyZW50bHkgaW4gYSBub3RpZmljYXRpb24gbG9vcCxcblx0ICAgIC8vIHJlbWVtYmVyIHRoaXMgc3Vic2NyaWJlciB3YXMgcmVtb3ZlZFxuXHQgICAgaWYgKHRoaXMuX2luTG9vcCAhPT0gMCAmJiBpbmRleCAhPT0gLTEpIHtcblx0ICAgICAgaWYgKHRoaXMuX3JlbW92ZWRJdGVtcyA9PT0gbnVsbCkge1xuXHQgICAgICAgIHRoaXMuX3JlbW92ZWRJdGVtcyA9IFtdO1xuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuX3JlbW92ZWRJdGVtcy5wdXNoKHRoaXMuX2l0ZW1zW2luZGV4XSk7XG5cdCAgICB9XG5cblx0ICAgIHRoaXMuX2l0ZW1zID0gX3JlbW92ZSh0aGlzLl9pdGVtcywgaW5kZXgpO1xuXHQgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmxlbmd0aDtcblx0ICB9LFxuXG5cdCAgZGlzcGF0Y2g6IGZ1bmN0aW9uIGRpc3BhdGNoKGV2ZW50KSB7XG5cdCAgICB0aGlzLl9pbkxvb3ArKztcblx0ICAgIGZvciAodmFyIGkgPSAwLCBpdGVtcyA9IHRoaXMuX2l0ZW1zOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblxuXHQgICAgICAvLyBjbGVhbnVwIHdhcyBjYWxsZWRcblx0ICAgICAgaWYgKHRoaXMuX2l0ZW1zID09PSBudWxsKSB7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICAgIH1cblxuXHQgICAgICAvLyB0aGlzIHN1YnNjcmliZXIgd2FzIHJlbW92ZWRcblx0ICAgICAgaWYgKHRoaXMuX3JlbW92ZWRJdGVtcyAhPT0gbnVsbCAmJiBjb250YWlucyh0aGlzLl9yZW1vdmVkSXRlbXMsIGl0ZW1zW2ldKSkge1xuXHQgICAgICAgIGNvbnRpbnVlO1xuXHQgICAgICB9XG5cblx0ICAgICAgY2FsbFN1YnNjcmliZXIoaXRlbXNbaV0udHlwZSwgaXRlbXNbaV0uZm4sIGV2ZW50KTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX2luTG9vcC0tO1xuXHQgICAgaWYgKHRoaXMuX2luTG9vcCA9PT0gMCkge1xuXHQgICAgICB0aGlzLl9yZW1vdmVkSXRlbXMgPSBudWxsO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBjbGVhbnVwOiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuXHQgICAgdGhpcy5faXRlbXMgPSBudWxsO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IHsgY2FsbFN1YnNjcmliZXI6IGNhbGxTdWJzY3JpYmVyLCBEaXNwYXRjaGVyOiBEaXNwYXRjaGVyIH07XG5cbi8qKiovIH0sXG4vKiA1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRmdW5jdGlvbiBjb25jYXQoYSwgYikge1xuXHQgIHZhciByZXN1bHQgPSB1bmRlZmluZWQsXG5cdCAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZCxcblx0ICAgICAgaSA9IHVuZGVmaW5lZCxcblx0ICAgICAgaiA9IHVuZGVmaW5lZDtcblx0ICBpZiAoYS5sZW5ndGggPT09IDApIHtcblx0ICAgIHJldHVybiBiO1xuXHQgIH1cblx0ICBpZiAoYi5sZW5ndGggPT09IDApIHtcblx0ICAgIHJldHVybiBhO1xuXHQgIH1cblx0ICBqID0gMDtcblx0ICByZXN1bHQgPSBuZXcgQXJyYXkoYS5sZW5ndGggKyBiLmxlbmd0aCk7XG5cdCAgbGVuZ3RoID0gYS5sZW5ndGg7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrLCBqKyspIHtcblx0ICAgIHJlc3VsdFtqXSA9IGFbaV07XG5cdCAgfVxuXHQgIGxlbmd0aCA9IGIubGVuZ3RoO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKywgaisrKSB7XG5cdCAgICByZXN1bHRbal0gPSBiW2ldO1xuXHQgIH1cblx0ICByZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZnVuY3Rpb24gY2lyY2xlU2hpZnQoYXJyLCBkaXN0YW5jZSkge1xuXHQgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoLFxuXHQgICAgICByZXN1bHQgPSBuZXcgQXJyYXkobGVuZ3RoKSxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIHJlc3VsdFsoaSArIGRpc3RhbmNlKSAlIGxlbmd0aF0gPSBhcnJbaV07XG5cdCAgfVxuXHQgIHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBmaW5kKGFyciwgdmFsdWUpIHtcblx0ICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIGlmIChhcnJbaV0gPT09IHZhbHVlKSB7XG5cdCAgICAgIHJldHVybiBpO1xuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gLTE7XG5cdH1cblxuXHRmdW5jdGlvbiBmaW5kQnlQcmVkKGFyciwgcHJlZCkge1xuXHQgIHZhciBsZW5ndGggPSBhcnIubGVuZ3RoLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgaWYgKHByZWQoYXJyW2ldKSkge1xuXHQgICAgICByZXR1cm4gaTtcblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIC0xO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xvbmVBcnJheShpbnB1dCkge1xuXHQgIHZhciBsZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdCAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShsZW5ndGgpLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgcmVzdWx0W2ldID0gaW5wdXRbaV07XG5cdCAgfVxuXHQgIHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmUoaW5wdXQsIGluZGV4KSB7XG5cdCAgdmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0ICAgICAgcmVzdWx0ID0gdW5kZWZpbmVkLFxuXHQgICAgICBpID0gdW5kZWZpbmVkLFxuXHQgICAgICBqID0gdW5kZWZpbmVkO1xuXHQgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoKSB7XG5cdCAgICBpZiAobGVuZ3RoID09PSAxKSB7XG5cdCAgICAgIHJldHVybiBbXTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShsZW5ndGggLSAxKTtcblx0ICAgICAgZm9yIChpID0gMCwgaiA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHQgICAgICAgIGlmIChpICE9PSBpbmRleCkge1xuXHQgICAgICAgICAgcmVzdWx0W2pdID0gaW5wdXRbaV07XG5cdCAgICAgICAgICBqKys7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICAgIHJldHVybiByZXN1bHQ7XG5cdCAgICB9XG5cdCAgfSBlbHNlIHtcblx0ICAgIHJldHVybiBpbnB1dDtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiByZW1vdmVCeVByZWQoaW5wdXQsIHByZWQpIHtcblx0ICByZXR1cm4gcmVtb3ZlKGlucHV0LCBmaW5kQnlQcmVkKGlucHV0LCBwcmVkKSk7XG5cdH1cblxuXHRmdW5jdGlvbiBtYXAoaW5wdXQsIGZuKSB7XG5cdCAgdmFyIGxlbmd0aCA9IGlucHV0Lmxlbmd0aCxcblx0ICAgICAgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aCksXG5cdCAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICByZXN1bHRbaV0gPSBmbihpbnB1dFtpXSk7XG5cdCAgfVxuXHQgIHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBmb3JFYWNoKGFyciwgZm4pIHtcblx0ICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIGZuKGFycltpXSk7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gZmlsbEFycmF5KGFyciwgdmFsdWUpIHtcblx0ICB2YXIgbGVuZ3RoID0gYXJyLmxlbmd0aCxcblx0ICAgICAgaSA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgIGFycltpXSA9IHZhbHVlO1xuXHQgIH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNvbnRhaW5zKGFyciwgdmFsdWUpIHtcblx0ICByZXR1cm4gZmluZChhcnIsIHZhbHVlKSAhPT0gLTE7XG5cdH1cblxuXHRmdW5jdGlvbiBzbGlkZShjdXIsIG5leHQsIG1heCkge1xuXHQgIHZhciBsZW5ndGggPSBNYXRoLm1pbihtYXgsIGN1ci5sZW5ndGggKyAxKSxcblx0ICAgICAgb2Zmc2V0ID0gY3VyLmxlbmd0aCAtIGxlbmd0aCArIDEsXG5cdCAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShsZW5ndGgpLFxuXHQgICAgICBpID0gdW5kZWZpbmVkO1xuXHQgIGZvciAoaSA9IG9mZnNldDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICByZXN1bHRbaSAtIG9mZnNldF0gPSBjdXJbaV07XG5cdCAgfVxuXHQgIHJlc3VsdFtsZW5ndGggLSAxXSA9IG5leHQ7XG5cdCAgcmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0ge1xuXHQgIGNvbmNhdDogY29uY2F0LFxuXHQgIGNpcmNsZVNoaWZ0OiBjaXJjbGVTaGlmdCxcblx0ICBmaW5kOiBmaW5kLFxuXHQgIGZpbmRCeVByZWQ6IGZpbmRCeVByZWQsXG5cdCAgY2xvbmVBcnJheTogY2xvbmVBcnJheSxcblx0ICByZW1vdmU6IHJlbW92ZSxcblx0ICByZW1vdmVCeVByZWQ6IHJlbW92ZUJ5UHJlZCxcblx0ICBtYXA6IG1hcCxcblx0ICBmb3JFYWNoOiBmb3JFYWNoLFxuXHQgIGZpbGxBcnJheTogZmlsbEFycmF5LFxuXHQgIGNvbnRhaW5zOiBjb250YWlucyxcblx0ICBzbGlkZTogc2xpZGVcblx0fTtcblxuLyoqKi8gfSxcbi8qIDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgT2JzZXJ2YWJsZSA9IF9fd2VicGFja19yZXF1aXJlX18oMSk7XG5cblx0ZnVuY3Rpb24gU3RyZWFtKCkge1xuXHQgIE9ic2VydmFibGUuY2FsbCh0aGlzKTtcblx0fVxuXG5cdGluaGVyaXQoU3RyZWFtLCBPYnNlcnZhYmxlLCB7XG5cblx0ICBfbmFtZTogJ3N0cmVhbScsXG5cblx0ICBnZXRUeXBlOiBmdW5jdGlvbiBnZXRUeXBlKCkge1xuXHQgICAgcmV0dXJuICdzdHJlYW0nO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IFN0cmVhbTtcblxuLyoqKi8gfSxcbi8qIDcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZTIuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlMi5FUlJPUjtcblx0dmFyIEVORCA9IF9yZXF1aXJlMi5FTkQ7XG5cblx0dmFyIF9yZXF1aXJlMyA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cblx0dmFyIGNhbGxTdWJzY3JpYmVyID0gX3JlcXVpcmUzLmNhbGxTdWJzY3JpYmVyO1xuXG5cdHZhciBPYnNlcnZhYmxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcblxuXHRmdW5jdGlvbiBQcm9wZXJ0eSgpIHtcblx0ICBPYnNlcnZhYmxlLmNhbGwodGhpcyk7XG5cdCAgdGhpcy5fY3VycmVudEV2ZW50ID0gbnVsbDtcblx0fVxuXG5cdGluaGVyaXQoUHJvcGVydHksIE9ic2VydmFibGUsIHtcblxuXHQgIF9uYW1lOiAncHJvcGVydHknLFxuXG5cdCAgX2VtaXRWYWx1ZTogZnVuY3Rpb24gX2VtaXRWYWx1ZSh2YWx1ZSkge1xuXHQgICAgaWYgKHRoaXMuX2FsaXZlKSB7XG5cdCAgICAgIHRoaXMuX2N1cnJlbnRFdmVudCA9IHsgdHlwZTogVkFMVUUsIHZhbHVlOiB2YWx1ZSB9O1xuXHQgICAgICBpZiAoIXRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogVkFMVUUsIHZhbHVlOiB2YWx1ZSB9KTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfZW1pdEVycm9yOiBmdW5jdGlvbiBfZW1pdEVycm9yKHZhbHVlKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdGhpcy5fY3VycmVudEV2ZW50ID0geyB0eXBlOiBFUlJPUiwgdmFsdWU6IHZhbHVlIH07XG5cdCAgICAgIGlmICghdGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZGlzcGF0Y2goeyB0eXBlOiBFUlJPUiwgdmFsdWU6IHZhbHVlIH0pO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9lbWl0RW5kOiBmdW5jdGlvbiBfZW1pdEVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9hbGl2ZSkge1xuXHQgICAgICB0aGlzLl9hbGl2ZSA9IGZhbHNlO1xuXHQgICAgICBpZiAoIXRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmRpc3BhdGNoKHsgdHlwZTogRU5EIH0pO1xuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuX2NsZWFyKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbjogZnVuY3Rpb24gX29uKHR5cGUsIGZuKSB7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUpIHtcblx0ICAgICAgdGhpcy5fZGlzcGF0Y2hlci5hZGQodHlwZSwgZm4pO1xuXHQgICAgICB0aGlzLl9zZXRBY3RpdmUodHJ1ZSk7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5fY3VycmVudEV2ZW50ICE9PSBudWxsKSB7XG5cdCAgICAgIGNhbGxTdWJzY3JpYmVyKHR5cGUsIGZuLCB0aGlzLl9jdXJyZW50RXZlbnQpO1xuXHQgICAgfVxuXHQgICAgaWYgKCF0aGlzLl9hbGl2ZSkge1xuXHQgICAgICBjYWxsU3Vic2NyaWJlcih0eXBlLCBmbiwgeyB0eXBlOiBFTkQgfSk7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9LFxuXG5cdCAgZ2V0VHlwZTogZnVuY3Rpb24gZ2V0VHlwZSgpIHtcblx0ICAgIHJldHVybiAncHJvcGVydHknO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IFByb3BlcnR5O1xuXG4vKioqLyB9LFxuLyogOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBuZXZlclMgPSBuZXcgU3RyZWFtKCk7XG5cdG5ldmVyUy5fZW1pdEVuZCgpO1xuXHRuZXZlclMuX25hbWUgPSAnbmV2ZXInO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbmV2ZXIoKSB7XG5cdCAgcmV0dXJuIG5ldmVyUztcblx0fTtcblxuLyoqKi8gfSxcbi8qIDkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgdGltZUJhc2VkID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cblx0dmFyIFMgPSB0aW1lQmFzZWQoe1xuXG5cdCAgX25hbWU6ICdsYXRlcicsXG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIHggPSBfcmVmLng7XG5cblx0ICAgIHRoaXMuX3ggPSB4O1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl94ID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX29uVGljazogZnVuY3Rpb24gX29uVGljaygpIHtcblx0ICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl94KTtcblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsYXRlcih3YWl0LCB4KSB7XG5cdCAgcmV0dXJuIG5ldyBTKHdhaXQsIHsgeDogeCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDEwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0aW1lQmFzZWQobWl4aW4pIHtcblxuXHQgIGZ1bmN0aW9uIEFub255bW91c1N0cmVhbSh3YWl0LCBvcHRpb25zKSB7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICBTdHJlYW0uY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX3dhaXQgPSB3YWl0O1xuXHQgICAgdGhpcy5faW50ZXJ2YWxJZCA9IG51bGw7XG5cdCAgICB0aGlzLl8kb25UaWNrID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX29uVGljaygpO1xuXHQgICAgfTtcblx0ICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG5cdCAgfVxuXG5cdCAgaW5oZXJpdChBbm9ueW1vdXNTdHJlYW0sIFN0cmVhbSwge1xuXG5cdCAgICBfaW5pdDogZnVuY3Rpb24gX2luaXQoKSB7fSxcblx0ICAgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHt9LFxuXG5cdCAgICBfb25UaWNrOiBmdW5jdGlvbiBfb25UaWNrKCkge30sXG5cblx0ICAgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICAgIHRoaXMuX2ludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGlzLl8kb25UaWNrLCB0aGlzLl93YWl0KTtcblx0ICAgIH0sXG5cblx0ICAgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgICBpZiAodGhpcy5faW50ZXJ2YWxJZCAhPT0gbnVsbCkge1xuXHQgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxJZCk7XG5cdCAgICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IG51bGw7XG5cdCAgICAgIH1cblx0ICAgIH0sXG5cblx0ICAgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgICBTdHJlYW0ucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgICB0aGlzLl8kb25UaWNrID0gbnVsbDtcblx0ICAgICAgdGhpcy5fZnJlZSgpO1xuXHQgICAgfVxuXG5cdCAgfSwgbWl4aW4pO1xuXG5cdCAgcmV0dXJuIEFub255bW91c1N0cmVhbTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDExICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHRpbWVCYXNlZCA9IF9fd2VicGFja19yZXF1aXJlX18oMTApO1xuXG5cdHZhciBTID0gdGltZUJhc2VkKHtcblxuXHQgIF9uYW1lOiAnaW50ZXJ2YWwnLFxuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciB4ID0gX3JlZi54O1xuXG5cdCAgICB0aGlzLl94ID0geDtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5feCA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9vblRpY2s6IGZ1bmN0aW9uIF9vblRpY2soKSB7XG5cdCAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5feCk7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW50ZXJ2YWwod2FpdCwgeCkge1xuXHQgIHJldHVybiBuZXcgUyh3YWl0LCB7IHg6IHggfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciB0aW1lQmFzZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdHZhciBjbG9uZUFycmF5ID0gX3JlcXVpcmUuY2xvbmVBcnJheTtcblxuXHR2YXIgbmV2ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG5cdHZhciBTID0gdGltZUJhc2VkKHtcblxuXHQgIF9uYW1lOiAnc2VxdWVudGlhbGx5JyxcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgeHMgPSBfcmVmLnhzO1xuXG5cdCAgICB0aGlzLl94cyA9IGNsb25lQXJyYXkoeHMpO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl94cyA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9vblRpY2s6IGZ1bmN0aW9uIF9vblRpY2soKSB7XG5cdCAgICBpZiAodGhpcy5feHMubGVuZ3RoID09PSAxKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl94c1swXSk7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl94cy5zaGlmdCgpKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXF1ZW50aWFsbHkod2FpdCwgeHMpIHtcblx0ICByZXR1cm4geHMubGVuZ3RoID09PSAwID8gbmV2ZXIoKSA6IG5ldyBTKHdhaXQsIHsgeHM6IHhzIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgdGltZUJhc2VkID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cblx0dmFyIFMgPSB0aW1lQmFzZWQoe1xuXG5cdCAgX25hbWU6ICdmcm9tUG9sbCcsXG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfb25UaWNrOiBmdW5jdGlvbiBfb25UaWNrKCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICB0aGlzLl9lbWl0VmFsdWUoZm4oKSk7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZnJvbVBvbGwod2FpdCwgZm4pIHtcblx0ICByZXR1cm4gbmV3IFMod2FpdCwgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciB0aW1lQmFzZWQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblx0dmFyIGVtaXR0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxuXHR2YXIgUyA9IHRpbWVCYXNlZCh7XG5cblx0ICBfbmFtZTogJ3dpdGhJbnRlcnZhbCcsXG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICAgIHRoaXMuX2VtaXR0ZXIgPSBlbWl0dGVyKHRoaXMpO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgICB0aGlzLl9lbWl0dGVyID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX29uVGljazogZnVuY3Rpb24gX29uVGljaygpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgZm4odGhpcy5fZW1pdHRlcik7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2l0aEludGVydmFsKHdhaXQsIGZuKSB7XG5cdCAgcmV0dXJuIG5ldyBTKHdhaXQsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW1pdHRlcihvYnMpIHtcblxuXHQgIGZ1bmN0aW9uIHZhbHVlKHgpIHtcblx0ICAgIG9icy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgcmV0dXJuIG9icy5fYWN0aXZlO1xuXHQgIH1cblxuXHQgIGZ1bmN0aW9uIGVycm9yKHgpIHtcblx0ICAgIG9icy5fZW1pdEVycm9yKHgpO1xuXHQgICAgcmV0dXJuIG9icy5fYWN0aXZlO1xuXHQgIH1cblxuXHQgIGZ1bmN0aW9uIGVuZCgpIHtcblx0ICAgIG9icy5fZW1pdEVuZCgpO1xuXHQgICAgcmV0dXJuIG9icy5fYWN0aXZlO1xuXHQgIH1cblxuXHQgIGZ1bmN0aW9uIGV2ZW50KGUpIHtcblx0ICAgIG9icy5fZW1pdChlLnR5cGUsIGUudmFsdWUpO1xuXHQgICAgcmV0dXJuIG9icy5fYWN0aXZlO1xuXHQgIH1cblxuXHQgIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZXJyb3I6IGVycm9yLCBlbmQ6IGVuZCwgZXZlbnQ6IGV2ZW50LCBlbWl0OiB2YWx1ZSwgZW1pdEV2ZW50OiBldmVudCB9O1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgc3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tQ2FsbGJhY2soY2FsbGJhY2tDb25zdW1lcikge1xuXG5cdCAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuXG5cdCAgcmV0dXJuIHN0cmVhbShmdW5jdGlvbiAoZW1pdHRlcikge1xuXG5cdCAgICBpZiAoIWNhbGxlZCkge1xuXHQgICAgICBjYWxsYmFja0NvbnN1bWVyKGZ1bmN0aW9uICh4KSB7XG5cdCAgICAgICAgZW1pdHRlci5lbWl0KHgpO1xuXHQgICAgICAgIGVtaXR0ZXIuZW5kKCk7XG5cdCAgICAgIH0pO1xuXHQgICAgICBjYWxsZWQgPSB0cnVlO1xuXHQgICAgfVxuXHQgIH0pLnNldE5hbWUoJ2Zyb21DYWxsYmFjaycpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0dmFyIGVtaXR0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxuXHRmdW5jdGlvbiBTKGZuKSB7XG5cdCAgU3RyZWFtLmNhbGwodGhpcyk7XG5cdCAgdGhpcy5fZm4gPSBmbjtcblx0ICB0aGlzLl91bnN1YnNjcmliZSA9IG51bGw7XG5cdH1cblxuXHRpbmhlcml0KFMsIFN0cmVhbSwge1xuXG5cdCAgX25hbWU6ICdzdHJlYW0nLFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgdmFyIHVuc3Vic2NyaWJlID0gZm4oZW1pdHRlcih0aGlzKSk7XG5cdCAgICB0aGlzLl91bnN1YnNjcmliZSA9IHR5cGVvZiB1bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJyA/IHVuc3Vic2NyaWJlIDogbnVsbDtcblxuXHQgICAgLy8gZml4IGh0dHBzOi8vZ2l0aHViLmNvbS9ycG9taW5vdi9rZWZpci9pc3N1ZXMvMzVcblx0ICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG5cdCAgICAgIHRoaXMuX2NhbGxVbnN1YnNjcmliZSgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfY2FsbFVuc3Vic2NyaWJlOiBmdW5jdGlvbiBfY2FsbFVuc3Vic2NyaWJlKCkge1xuXHQgICAgaWYgKHRoaXMuX3Vuc3Vic2NyaWJlICE9PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlKCk7XG5cdCAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlID0gbnVsbDtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICB0aGlzLl9jYWxsVW5zdWJzY3JpYmUoKTtcblx0ICB9LFxuXG5cdCAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICBTdHJlYW0ucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0cmVhbShmbikge1xuXHQgIHJldHVybiBuZXcgUyhmbik7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAxOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBzdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb21Ob2RlQ2FsbGJhY2soY2FsbGJhY2tDb25zdW1lcikge1xuXG5cdCAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuXG5cdCAgcmV0dXJuIHN0cmVhbShmdW5jdGlvbiAoZW1pdHRlcikge1xuXG5cdCAgICBpZiAoIWNhbGxlZCkge1xuXHQgICAgICBjYWxsYmFja0NvbnN1bWVyKGZ1bmN0aW9uIChlcnJvciwgeCkge1xuXHQgICAgICAgIGlmIChlcnJvcikge1xuXHQgICAgICAgICAgZW1pdHRlci5lcnJvcihlcnJvcik7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIGVtaXR0ZXIuZW1pdCh4KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgZW1pdHRlci5lbmQoKTtcblx0ICAgICAgfSk7XG5cdCAgICAgIGNhbGxlZCA9IHRydWU7XG5cdCAgICB9XG5cdCAgfSkuc2V0TmFtZSgnZnJvbU5vZGVDYWxsYmFjaycpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMTkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgZnJvbVN1YlVuc3ViID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMCk7XG5cblx0dmFyIHBhaXJzID0gW1snYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJ10sIFsnYWRkTGlzdGVuZXInLCAncmVtb3ZlTGlzdGVuZXInXSwgWydvbicsICdvZmYnXV07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tRXZlbnRzKHRhcmdldCwgZXZlbnROYW1lLCB0cmFuc2Zvcm1lcikge1xuXHQgIHZhciBzdWIgPSB1bmRlZmluZWQsXG5cdCAgICAgIHVuc3ViID0gdW5kZWZpbmVkO1xuXG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xuXHQgICAgaWYgKHR5cGVvZiB0YXJnZXRbcGFpcnNbaV1bMF1dID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0YXJnZXRbcGFpcnNbaV1bMV1dID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICAgIHN1YiA9IHBhaXJzW2ldWzBdO1xuXHQgICAgICB1bnN1YiA9IHBhaXJzW2ldWzFdO1xuXHQgICAgICBicmVhaztcblx0ICAgIH1cblx0ICB9XG5cblx0ICBpZiAoc3ViID09PSB1bmRlZmluZWQpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcigndGFyZ2V0IGRvblxcJ3Qgc3VwcG9ydCBhbnkgb2YgJyArICdhZGRFdmVudExpc3RlbmVyL3JlbW92ZUV2ZW50TGlzdGVuZXIsIGFkZExpc3RlbmVyL3JlbW92ZUxpc3RlbmVyLCBvbi9vZmYgbWV0aG9kIHBhaXInKTtcblx0ICB9XG5cblx0ICByZXR1cm4gZnJvbVN1YlVuc3ViKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cdCAgICByZXR1cm4gdGFyZ2V0W3N1Yl0oZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0ICB9LCBmdW5jdGlvbiAoaGFuZGxlcikge1xuXHQgICAgcmV0dXJuIHRhcmdldFt1bnN1Yl0oZXZlbnROYW1lLCBoYW5kbGVyKTtcblx0ICB9LCB0cmFuc2Zvcm1lcikuc2V0TmFtZSgnZnJvbUV2ZW50cycpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMjAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgc3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XG5cblx0dmFyIGFwcGx5ID0gX3JlcXVpcmUuYXBwbHk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tU3ViVW5zdWIoc3ViLCB1bnN1YiwgdHJhbnNmb3JtZXIgLyogRnVuY3Rpb24gfCBmYWxzZXkgKi8pIHtcblx0ICByZXR1cm4gc3RyZWFtKGZ1bmN0aW9uIChlbWl0dGVyKSB7XG5cblx0ICAgIHZhciBoYW5kbGVyID0gdHJhbnNmb3JtZXIgPyBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIGVtaXR0ZXIuZW1pdChhcHBseSh0cmFuc2Zvcm1lciwgdGhpcywgYXJndW1lbnRzKSk7XG5cdCAgICB9IDogZnVuY3Rpb24gKHgpIHtcblx0ICAgICAgZW1pdHRlci5lbWl0KHgpO1xuXHQgICAgfTtcblxuXHQgICAgc3ViKGhhbmRsZXIpO1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgcmV0dXJuIHVuc3ViKGhhbmRsZXIpO1xuXHQgICAgfTtcblx0ICB9KS5zZXROYW1lKCdmcm9tU3ViVW5zdWInKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDIxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRmdW5jdGlvbiBzcHJlYWQoZm4sIGxlbmd0aCkge1xuXHQgIHN3aXRjaCAobGVuZ3RoKSB7XG5cdCAgICBjYXNlIDA6XG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgcmV0dXJuIGZuKCk7XG5cdCAgICAgIH07XG5cdCAgICBjYXNlIDE6XG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgIHJldHVybiBmbihhWzBdKTtcblx0ICAgICAgfTtcblx0ICAgIGNhc2UgMjpcblx0ICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG5cdCAgICAgICAgcmV0dXJuIGZuKGFbMF0sIGFbMV0pO1xuXHQgICAgICB9O1xuXHQgICAgY2FzZSAzOlxuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gKGEpIHtcblx0ICAgICAgICByZXR1cm4gZm4oYVswXSwgYVsxXSwgYVsyXSk7XG5cdCAgICAgIH07XG5cdCAgICBjYXNlIDQ6XG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgIHJldHVybiBmbihhWzBdLCBhWzFdLCBhWzJdLCBhWzNdKTtcblx0ICAgICAgfTtcblx0ICAgIGRlZmF1bHQ6XG5cdCAgICAgIHJldHVybiBmdW5jdGlvbiAoYSkge1xuXHQgICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhKTtcblx0ICAgICAgfTtcblx0ICB9XG5cdH1cblxuXHRmdW5jdGlvbiBhcHBseShmbiwgYywgYSkge1xuXHQgIHZhciBhTGVuZ3RoID0gYSA/IGEubGVuZ3RoIDogMDtcblx0ICBpZiAoYyA9PSBudWxsKSB7XG5cdCAgICBzd2l0Y2ggKGFMZW5ndGgpIHtcblx0ICAgICAgY2FzZSAwOlxuXHQgICAgICAgIHJldHVybiBmbigpO1xuXHQgICAgICBjYXNlIDE6XG5cdCAgICAgICAgcmV0dXJuIGZuKGFbMF0pO1xuXHQgICAgICBjYXNlIDI6XG5cdCAgICAgICAgcmV0dXJuIGZuKGFbMF0sIGFbMV0pO1xuXHQgICAgICBjYXNlIDM6XG5cdCAgICAgICAgcmV0dXJuIGZuKGFbMF0sIGFbMV0sIGFbMl0pO1xuXHQgICAgICBjYXNlIDQ6XG5cdCAgICAgICAgcmV0dXJuIGZuKGFbMF0sIGFbMV0sIGFbMl0sIGFbM10pO1xuXHQgICAgICBkZWZhdWx0OlxuXHQgICAgICAgIHJldHVybiBmbi5hcHBseShudWxsLCBhKTtcblx0ICAgIH1cblx0ICB9IGVsc2Uge1xuXHQgICAgc3dpdGNoIChhTGVuZ3RoKSB7XG5cdCAgICAgIGNhc2UgMDpcblx0ICAgICAgICByZXR1cm4gZm4uY2FsbChjKTtcblx0ICAgICAgZGVmYXVsdDpcblx0ICAgICAgICByZXR1cm4gZm4uYXBwbHkoYywgYSk7XG5cdCAgICB9XG5cdCAgfVxuXHR9XG5cblx0bW9kdWxlLmV4cG9ydHMgPSB7IHNwcmVhZDogc3ByZWFkLCBhcHBseTogYXBwbHkgfTtcblxuLyoqKi8gfSxcbi8qIDIyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIFByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblxuXHQvLyBIQUNLOlxuXHQvLyAgIFdlIGRvbid0IGNhbGwgcGFyZW50IENsYXNzIGNvbnN0cnVjdG9yLCBidXQgaW5zdGVhZCBwdXR0aW5nIGFsbCBuZWNlc3Nhcnlcblx0Ly8gICBwcm9wZXJ0aWVzIGludG8gcHJvdG90eXBlIHRvIHNpbXVsYXRlIGVuZGVkIFByb3BlcnR5XG5cdC8vICAgKHNlZSBQcm9wcGVydHkgYW5kIE9ic2VydmFibGUgY2xhc3NlcykuXG5cblx0ZnVuY3Rpb24gUCh2YWx1ZSkge1xuXHQgIHRoaXMuX2N1cnJlbnRFdmVudCA9IHsgdHlwZTogJ3ZhbHVlJywgdmFsdWU6IHZhbHVlLCBjdXJyZW50OiB0cnVlIH07XG5cdH1cblxuXHRpbmhlcml0KFAsIFByb3BlcnR5LCB7XG5cdCAgX25hbWU6ICdjb25zdGFudCcsXG5cdCAgX2FjdGl2ZTogZmFsc2UsXG5cdCAgX2FjdGl2YXRpbmc6IGZhbHNlLFxuXHQgIF9hbGl2ZTogZmFsc2UsXG5cdCAgX2Rpc3BhdGNoZXI6IG51bGwsXG5cdCAgX2xvZ0hhbmRsZXJzOiBudWxsXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uc3RhbnQoeCkge1xuXHQgIHJldHVybiBuZXcgUCh4KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDIzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIFByb3BlcnR5ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KTtcblxuXHQvLyBIQUNLOlxuXHQvLyAgIFdlIGRvbid0IGNhbGwgcGFyZW50IENsYXNzIGNvbnN0cnVjdG9yLCBidXQgaW5zdGVhZCBwdXR0aW5nIGFsbCBuZWNlc3Nhcnlcblx0Ly8gICBwcm9wZXJ0aWVzIGludG8gcHJvdG90eXBlIHRvIHNpbXVsYXRlIGVuZGVkIFByb3BlcnR5XG5cdC8vICAgKHNlZSBQcm9wcGVydHkgYW5kIE9ic2VydmFibGUgY2xhc3NlcykuXG5cblx0ZnVuY3Rpb24gUCh2YWx1ZSkge1xuXHQgIHRoaXMuX2N1cnJlbnRFdmVudCA9IHsgdHlwZTogJ2Vycm9yJywgdmFsdWU6IHZhbHVlLCBjdXJyZW50OiB0cnVlIH07XG5cdH1cblxuXHRpbmhlcml0KFAsIFByb3BlcnR5LCB7XG5cdCAgX25hbWU6ICdjb25zdGFudEVycm9yJyxcblx0ICBfYWN0aXZlOiBmYWxzZSxcblx0ICBfYWN0aXZhdGluZzogZmFsc2UsXG5cdCAgX2FsaXZlOiBmYWxzZSxcblx0ICBfZGlzcGF0Y2hlcjogbnVsbCxcblx0ICBfbG9nSGFuZGxlcnM6IG51bGxcblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb25zdGFudEVycm9yKHgpIHtcblx0ICByZXR1cm4gbmV3IFAoeCk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAyNCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3RvUHJvcGVydHknLCB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZ2V0SW5pdGlhbEN1cnJlbnQgPSBmbjtcblx0ICB9LFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgIGlmICh0aGlzLl9nZXRJbml0aWFsQ3VycmVudCAhPT0gbnVsbCkge1xuXHQgICAgICB2YXIgZ2V0SW5pdGlhbCA9IHRoaXMuX2dldEluaXRpYWxDdXJyZW50O1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoZ2V0SW5pdGlhbCgpKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX3NvdXJjZS5vbkFueSh0aGlzLl8kaGFuZGxlQW55KTsgLy8gY29waWVkIGZyb20gcGF0dGVybnMvb25lLXNvdXJjZVxuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRvUHJvcGVydHkob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIGlmIChmbiAhPT0gbnVsbCAmJiB0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcignWW91IHNob3VsZCBjYWxsIHRvUHJvcGVydHkoKSB3aXRoIGEgZnVuY3Rpb24gb3Igbm8gYXJndW1lbnRzLicpO1xuXHQgIH1cblx0ICByZXR1cm4gbmV3IFAob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDI1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cdHZhciBQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUyLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZTIuRVJST1I7XG5cdHZhciBFTkQgPSBfcmVxdWlyZTIuRU5EO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZUNvbnN0cnVjdG9yKEJhc2VDbGFzcywgbmFtZSkge1xuXHQgIHJldHVybiBmdW5jdGlvbiBBbm9ueW1vdXNPYnNlcnZhYmxlKHNvdXJjZSwgb3B0aW9ucykge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgICAgQmFzZUNsYXNzLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG5cdCAgICB0aGlzLl9uYW1lID0gc291cmNlLl9uYW1lICsgJy4nICsgbmFtZTtcblx0ICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG5cdCAgICB0aGlzLl8kaGFuZGxlQW55ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5faGFuZGxlQW55KGV2ZW50KTtcblx0ICAgIH07XG5cdCAgfTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZUNsYXNzTWV0aG9kcyhCYXNlQ2xhc3MpIHtcblx0ICByZXR1cm4ge1xuXG5cdCAgICBfaW5pdDogZnVuY3Rpb24gX2luaXQoKSB7fSxcblx0ICAgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHt9LFxuXG5cdCAgICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH0sXG5cdCAgICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVFcnJvcih4KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgIH0sXG5cdCAgICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9LFxuXG5cdCAgICBfaGFuZGxlQW55OiBmdW5jdGlvbiBfaGFuZGxlQW55KGV2ZW50KSB7XG5cdCAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuXHQgICAgICAgIGNhc2UgVkFMVUU6XG5cdCAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlVmFsdWUoZXZlbnQudmFsdWUpO1xuXHQgICAgICAgIGNhc2UgRVJST1I6XG5cdCAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlRXJyb3IoZXZlbnQudmFsdWUpO1xuXHQgICAgICAgIGNhc2UgRU5EOlxuXHQgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhbmRsZUVuZCgpO1xuXHQgICAgICB9XG5cdCAgICB9LFxuXG5cdCAgICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgICB0aGlzLl9zb3VyY2Uub25BbnkodGhpcy5fJGhhbmRsZUFueSk7XG5cdCAgICB9LFxuXHQgICAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZS5vZmZBbnkodGhpcy5fJGhhbmRsZUFueSk7XG5cdCAgICB9LFxuXG5cdCAgICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgICAgQmFzZUNsYXNzLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgICAgdGhpcy5fc291cmNlID0gbnVsbDtcblx0ICAgICAgdGhpcy5fJGhhbmRsZUFueSA9IG51bGw7XG5cdCAgICAgIHRoaXMuX2ZyZWUoKTtcblx0ICAgIH1cblxuXHQgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVTdHJlYW0obmFtZSwgbWl4aW4pIHtcblx0ICB2YXIgUyA9IGNyZWF0ZUNvbnN0cnVjdG9yKFN0cmVhbSwgbmFtZSk7XG5cdCAgaW5oZXJpdChTLCBTdHJlYW0sIGNyZWF0ZUNsYXNzTWV0aG9kcyhTdHJlYW0pLCBtaXhpbik7XG5cdCAgcmV0dXJuIFM7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVQcm9wZXJ0eShuYW1lLCBtaXhpbikge1xuXHQgIHZhciBQID0gY3JlYXRlQ29uc3RydWN0b3IoUHJvcGVydHksIG5hbWUpO1xuXHQgIGluaGVyaXQoUCwgUHJvcGVydHksIGNyZWF0ZUNsYXNzTWV0aG9kcyhQcm9wZXJ0eSksIG1peGluKTtcblx0ICByZXR1cm4gUDtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0geyBjcmVhdGVTdHJlYW06IGNyZWF0ZVN0cmVhbSwgY3JlYXRlUHJvcGVydHk6IGNyZWF0ZVByb3BlcnR5IH07XG5cbi8qKiovIH0sXG4vKiAyNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2NoYW5nZXMnLCB7XG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICBpZiAoIXRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVFcnJvcih4KSB7XG5cdCAgICBpZiAoIXRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKHgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNoYW5nZXMob2JzKSB7XG5cdCAgcmV0dXJuIG5ldyBTKG9icyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAyNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBzdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblx0dmFyIHRvUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZyb21Qcm9taXNlKHByb21pc2UpIHtcblxuXHQgIHZhciBjYWxsZWQgPSBmYWxzZTtcblxuXHQgIHZhciByZXN1bHQgPSBzdHJlYW0oZnVuY3Rpb24gKGVtaXR0ZXIpIHtcblx0ICAgIGlmICghY2FsbGVkKSB7XG5cdCAgICAgIHZhciBvblZhbHVlID0gZnVuY3Rpb24gb25WYWx1ZSh4KSB7XG5cdCAgICAgICAgZW1pdHRlci5lbWl0KHgpO1xuXHQgICAgICAgIGVtaXR0ZXIuZW5kKCk7XG5cdCAgICAgIH07XG5cdCAgICAgIHZhciBvbkVycm9yID0gZnVuY3Rpb24gb25FcnJvcih4KSB7XG5cdCAgICAgICAgZW1pdHRlci5lcnJvcih4KTtcblx0ICAgICAgICBlbWl0dGVyLmVuZCgpO1xuXHQgICAgICB9O1xuXHQgICAgICB2YXIgX3Byb21pc2UgPSBwcm9taXNlLnRoZW4ob25WYWx1ZSwgb25FcnJvcik7XG5cblx0ICAgICAgLy8gcHJldmVudCBsaWJyYXJpZXMgbGlrZSAnUScgb3IgJ3doZW4nIGZyb20gc3dhbGxvd2luZyBleGNlcHRpb25zXG5cdCAgICAgIGlmIChfcHJvbWlzZSAmJiB0eXBlb2YgX3Byb21pc2UuZG9uZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHQgICAgICAgIF9wcm9taXNlLmRvbmUoKTtcblx0ICAgICAgfVxuXG5cdCAgICAgIGNhbGxlZCA9IHRydWU7XG5cdCAgICB9XG5cdCAgfSk7XG5cblx0ICByZXR1cm4gdG9Qcm9wZXJ0eShyZXN1bHQsIG51bGwpLnNldE5hbWUoJ2Zyb21Qcm9taXNlJyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAyOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUuVkFMVUU7XG5cdHZhciBFTkQgPSBfcmVxdWlyZS5FTkQ7XG5cblx0ZnVuY3Rpb24gZ2V0R2xvZGFsUHJvbWlzZSgpIHtcblx0ICBpZiAodHlwZW9mIFByb21pc2UgPT09ICdmdW5jdGlvbicpIHtcblx0ICAgIHJldHVybiBQcm9taXNlO1xuXHQgIH0gZWxzZSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzblxcJ3QgZGVmYXVsdCBQcm9taXNlLCB1c2Ugc2hpbSBvciBwYXJhbWV0ZXInKTtcblx0ICB9XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYnMpIHtcblx0ICB2YXIgUHJvbWlzZSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGdldEdsb2RhbFByb21pc2UoKSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHZhciBsYXN0ID0gbnVsbDtcblx0ICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXHQgICAgb2JzLm9uQW55KGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gRU5EICYmIGxhc3QgIT09IG51bGwpIHtcblx0ICAgICAgICAobGFzdC50eXBlID09PSBWQUxVRSA/IHJlc29sdmUgOiByZWplY3QpKGxhc3QudmFsdWUpO1xuXHQgICAgICAgIGxhc3QgPSBudWxsO1xuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIGxhc3QgPSBldmVudDtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cdCAgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAyOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBzdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblx0dmFyIHN5bWJvbCA9IF9fd2VicGFja19yZXF1aXJlX18oMzApKCdvYnNlcnZhYmxlJyk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tRVNPYnNlcnZhYmxlKF9vYnNlcnZhYmxlKSB7XG5cdCAgdmFyIG9ic2VydmFibGUgPSBfb2JzZXJ2YWJsZVtzeW1ib2xdID8gX29ic2VydmFibGVbc3ltYm9sXSgpIDogX29ic2VydmFibGU7XG5cdCAgcmV0dXJuIHN0cmVhbShmdW5jdGlvbiAoZW1pdHRlcikge1xuXHQgICAgdmFyIHVuc3ViID0gb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuXHQgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoX2Vycm9yKSB7XG5cdCAgICAgICAgZW1pdHRlci5lcnJvcihfZXJyb3IpO1xuXHQgICAgICAgIGVtaXR0ZXIuZW5kKCk7XG5cdCAgICAgIH0sXG5cdCAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQodmFsdWUpIHtcblx0ICAgICAgICBlbWl0dGVyLmVtaXQodmFsdWUpO1xuXHQgICAgICB9LFxuXHQgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG5cdCAgICAgICAgZW1pdHRlci5lbmQoKTtcblx0ICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIGlmICh1bnN1Yi51bnN1YnNjcmliZSkge1xuXHQgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIHVuc3ViLnVuc3Vic2NyaWJlKCk7XG5cdCAgICAgIH07XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXR1cm4gdW5zdWI7XG5cdCAgICB9XG5cdCAgfSkuc2V0TmFtZSgnZnJvbUVTT2JzZXJ2YWJsZScpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcblx0ICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sW2tleV0pIHtcblx0ICAgIHJldHVybiBTeW1ib2xba2V5XTtcblx0ICB9IGVsc2UgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBTeW1ib2xbJ2ZvciddID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICByZXR1cm4gU3ltYm9sWydmb3InXShrZXkpO1xuXHQgIH0gZWxzZSB7XG5cdCAgICByZXR1cm4gJ0BAJyArIGtleTtcblx0ICB9XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzMSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGV4dGVuZCA9IF9yZXF1aXJlLmV4dGVuZDtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZTIuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlMi5FUlJPUjtcblx0dmFyIEVORCA9IF9yZXF1aXJlMi5FTkQ7XG5cblx0ZnVuY3Rpb24gRVNPYnNlcnZhYmxlKG9ic2VydmFibGUpIHtcblx0ICB0aGlzLl9vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZS50YWtlRXJyb3JzKDEpO1xuXHR9XG5cblx0ZXh0ZW5kKEVTT2JzZXJ2YWJsZS5wcm90b3R5cGUsIHtcblx0ICBzdWJzY3JpYmU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgICAgdmFyIGZuID0gZnVuY3Rpb24gZm4oZXZlbnQpIHtcblx0ICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFZBTFVFICYmIG9ic2VydmVyLm5leHQpIHtcblx0ICAgICAgICBvYnNlcnZlci5uZXh0KGV2ZW50LnZhbHVlKTtcblx0ICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBFUlJPUiAmJiBvYnNlcnZlci5lcnJvcikge1xuXHQgICAgICAgIG9ic2VydmVyLmVycm9yKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgfSBlbHNlIGlmIChldmVudC50eXBlID09PSBFTkQgJiYgb2JzZXJ2ZXIuY29tcGxldGUpIHtcblx0ICAgICAgICBvYnNlcnZlci5jb21wbGV0ZShldmVudC52YWx1ZSk7XG5cdCAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIHRoaXMuX29ic2VydmFibGUub25BbnkoZm4pO1xuXHQgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9vYnNlcnZhYmxlLm9mZkFueShmbik7XG5cdCAgICB9O1xuXHQgIH1cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b0VTT2JzZXJ2YWJsZSgpIHtcblx0ICByZXR1cm4gbmV3IEVTT2JzZXJ2YWJsZSh0aGlzKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDMyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICB0aGlzLl9lbWl0VmFsdWUoZm4oeCkpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdtYXAnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ21hcCcsIG1peGluKTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYXAob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gaWQgOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgaWYgKGZuKHgpKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZmlsdGVyJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdmaWx0ZXInLCBtaXhpbik7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmlsdGVyKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGlkIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIG4gPSBfcmVmLm47XG5cblx0ICAgIHRoaXMuX24gPSBuO1xuXHQgICAgaWYgKG4gPD0gMCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHRoaXMuX24tLTtcblx0ICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIGlmICh0aGlzLl9uID09PSAwKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgndGFrZScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgndGFrZScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRha2Uob2JzLCBuKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgbjogbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDM1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBuID0gX3JlZi5uO1xuXG5cdCAgICB0aGlzLl9uID0gbjtcblx0ICAgIGlmIChuIDw9IDApIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVFcnJvcih4KSB7XG5cdCAgICB0aGlzLl9uLS07XG5cdCAgICB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICBpZiAodGhpcy5fbiA9PT0gMCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3Rha2VFcnJvcnMnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3Rha2VFcnJvcnMnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0YWtlRXJyb3JzKG9icywgbikge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IG46IG4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzNiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgaWYgKGZuKHgpKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgndGFrZVdoaWxlJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd0YWtlV2hpbGUnLCBtaXhpbik7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGFrZVdoaWxlKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGlkIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogMzcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlMi5OT1RISU5HO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdCgpIHtcblx0ICAgIHRoaXMuX2xhc3RWYWx1ZSA9IE5PVEhJTkc7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2xhc3RWYWx1ZSA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHRoaXMuX2xhc3RWYWx1ZSA9IHg7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fbGFzdFZhbHVlICE9PSBOT1RISU5HKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9sYXN0VmFsdWUpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdsYXN0JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdsYXN0JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGFzdChvYnMpIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzOCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgbiA9IF9yZWYubjtcblxuXHQgICAgdGhpcy5fbiA9IE1hdGgubWF4KDAsIG4pO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5fbiA9PT0gMCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9uLS07XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3NraXAnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3NraXAnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBza2lwKG9icywgbikge1xuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IG46IG4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiAzOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgaWYgKHRoaXMuX2ZuICE9PSBudWxsICYmICFmbih4KSkge1xuXHQgICAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgICB9XG5cdCAgICBpZiAodGhpcy5fZm4gPT09IG51bGwpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdza2lwV2hpbGUnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3NraXBXaGlsZScsIG1peGluKTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBza2lwV2hpbGUob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gaWQgOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0MCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUyLk5PVEhJTkc7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgICB0aGlzLl9wcmV2ID0gTk9USElORztcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgICAgdGhpcy5fcHJldiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgaWYgKHRoaXMuX3ByZXYgPT09IE5PVEhJTkcgfHwgIWZuKHRoaXMuX3ByZXYsIHgpKSB7XG5cdCAgICAgIHRoaXMuX3ByZXYgPSB4O1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3NraXBEdXBsaWNhdGVzJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdza2lwRHVwbGljYXRlcycsIG1peGluKTtcblxuXHR2YXIgZXEgPSBmdW5jdGlvbiBlcShhLCBiKSB7XG5cdCAgcmV0dXJuIGEgPT09IGI7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBza2lwRHVwbGljYXRlcyhvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBlcSA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZTIuTk9USElORztcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblx0ICAgIHZhciBzZWVkID0gX3JlZi5zZWVkO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgICAgdGhpcy5fcHJldiA9IHNlZWQ7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX3ByZXYgPSBudWxsO1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5fcHJldiAhPT0gTk9USElORykge1xuXHQgICAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKGZuKHRoaXMuX3ByZXYsIHgpKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX3ByZXYgPSB4O1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdkaWZmJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdkaWZmJywgbWl4aW4pO1xuXG5cdGZ1bmN0aW9uIGRlZmF1bHRGbihhLCBiKSB7XG5cdCAgcmV0dXJuIFthLCBiXTtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlmZihvYnMsIGZuKSB7XG5cdCAgdmFyIHNlZWQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyBOT1RISU5HIDogYXJndW1lbnRzWzJdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIHx8IGRlZmF1bHRGbiwgc2VlZDogc2VlZCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIEVSUk9SID0gX3JlcXVpcmUyLkVSUk9SO1xuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlMi5OT1RISU5HO1xuXG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3NjYW4nLCB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblx0ICAgIHZhciBzZWVkID0gX3JlZi5zZWVkO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgICAgdGhpcy5fc2VlZCA9IHNlZWQ7XG5cdCAgICBpZiAoc2VlZCAhPT0gTk9USElORykge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoc2VlZCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICAgIHRoaXMuX3NlZWQgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIGlmICh0aGlzLl9jdXJyZW50RXZlbnQgPT09IG51bGwgfHwgdGhpcy5fY3VycmVudEV2ZW50LnR5cGUgPT09IEVSUk9SKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9zZWVkID09PSBOT1RISU5HID8geCA6IGZuKHRoaXMuX3NlZWQsIHgpKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZShmbih0aGlzLl9jdXJyZW50RXZlbnQudmFsdWUsIHgpKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzY2FuKG9icywgZm4pIHtcblx0ICB2YXIgc2VlZCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IE5PVEhJTkcgOiBhcmd1bWVudHNbMl07XG5cblx0ICByZXR1cm4gbmV3IFAob2JzLCB7IGZuOiBmbiwgc2VlZDogc2VlZCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQzICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIHZhciB4cyA9IGZuKHgpO1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeHNbaV0pO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdmbGF0dGVuJywgbWl4aW4pO1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZsYXR0ZW4ob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gaWQgOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IFMob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQ0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIEVORF9NQVJLRVIgPSB7fTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgICAgdmFyIHdhaXQgPSBfcmVmLndhaXQ7XG5cblx0ICAgIHRoaXMuX3dhaXQgPSBNYXRoLm1heCgwLCB3YWl0KTtcblx0ICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICAgIHRoaXMuXyRzaGlmdEJ1ZmYgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHZhciB2YWx1ZSA9IF90aGlzLl9idWZmLnNoaWZ0KCk7XG5cdCAgICAgIGlmICh2YWx1ZSA9PT0gRU5EX01BUktFUikge1xuXHQgICAgICAgIF90aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgX3RoaXMuX2VtaXRWYWx1ZSh2YWx1ZSk7XG5cdCAgICAgIH1cblx0ICAgIH07XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2J1ZmYgPSBudWxsO1xuXHQgICAgdGhpcy5fJHNoaWZ0QnVmZiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2J1ZmYucHVzaCh4KTtcblx0ICAgICAgc2V0VGltZW91dCh0aGlzLl8kc2hpZnRCdWZmLCB0aGlzLl93YWl0KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2J1ZmYucHVzaChFTkRfTUFSS0VSKTtcblx0ICAgICAgc2V0VGltZW91dCh0aGlzLl8kc2hpZnRCdWZmLCB0aGlzLl93YWl0KTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZGVsYXknLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2RlbGF5JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVsYXkob2JzLCB3YWl0KSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgd2FpdDogd2FpdCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDQ1ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG5vdyA9IF9fd2VicGFja19yZXF1aXJlX18oNDYpO1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgICB2YXIgd2FpdCA9IF9yZWYud2FpdDtcblx0ICAgIHZhciBsZWFkaW5nID0gX3JlZi5sZWFkaW5nO1xuXHQgICAgdmFyIHRyYWlsaW5nID0gX3JlZi50cmFpbGluZztcblxuXHQgICAgdGhpcy5fd2FpdCA9IE1hdGgubWF4KDAsIHdhaXQpO1xuXHQgICAgdGhpcy5fbGVhZGluZyA9IGxlYWRpbmc7XG5cdCAgICB0aGlzLl90cmFpbGluZyA9IHRyYWlsaW5nO1xuXHQgICAgdGhpcy5fdHJhaWxpbmdWYWx1ZSA9IG51bGw7XG5cdCAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuXHQgICAgdGhpcy5fZW5kTGF0ZXIgPSBmYWxzZTtcblx0ICAgIHRoaXMuX2xhc3RDYWxsVGltZSA9IDA7XG5cdCAgICB0aGlzLl8kdHJhaWxpbmdDYWxsID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX3RyYWlsaW5nQ2FsbCgpO1xuXHQgICAgfTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fdHJhaWxpbmdWYWx1ZSA9IG51bGw7XG5cdCAgICB0aGlzLl8kdHJhaWxpbmdDYWxsID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdmFyIGN1clRpbWUgPSBub3coKTtcblx0ICAgICAgaWYgKHRoaXMuX2xhc3RDYWxsVGltZSA9PT0gMCAmJiAhdGhpcy5fbGVhZGluZykge1xuXHQgICAgICAgIHRoaXMuX2xhc3RDYWxsVGltZSA9IGN1clRpbWU7XG5cdCAgICAgIH1cblx0ICAgICAgdmFyIHJlbWFpbmluZyA9IHRoaXMuX3dhaXQgLSAoY3VyVGltZSAtIHRoaXMuX2xhc3RDYWxsVGltZSk7XG5cdCAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuXHQgICAgICAgIHRoaXMuX2NhbmNlbFRyYWlsaW5nKCk7XG5cdCAgICAgICAgdGhpcy5fbGFzdENhbGxUaW1lID0gY3VyVGltZTtcblx0ICAgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICAgIH0gZWxzZSBpZiAodGhpcy5fdHJhaWxpbmcpIHtcblx0ICAgICAgICB0aGlzLl9jYW5jZWxUcmFpbGluZygpO1xuXHQgICAgICAgIHRoaXMuX3RyYWlsaW5nVmFsdWUgPSB4O1xuXHQgICAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IHNldFRpbWVvdXQodGhpcy5fJHRyYWlsaW5nQ2FsbCwgcmVtYWluaW5nKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgaWYgKHRoaXMuX3RpbWVvdXRJZCkge1xuXHQgICAgICAgIHRoaXMuX2VuZExhdGVyID0gdHJ1ZTtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2NhbmNlbFRyYWlsaW5nOiBmdW5jdGlvbiBfY2FuY2VsVHJhaWxpbmcoKSB7XG5cdCAgICBpZiAodGhpcy5fdGltZW91dElkICE9PSBudWxsKSB7XG5cdCAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0SWQpO1xuXHQgICAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfdHJhaWxpbmdDYWxsOiBmdW5jdGlvbiBfdHJhaWxpbmdDYWxsKCkge1xuXHQgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX3RyYWlsaW5nVmFsdWUpO1xuXHQgICAgdGhpcy5fdGltZW91dElkID0gbnVsbDtcblx0ICAgIHRoaXMuX3RyYWlsaW5nVmFsdWUgPSBudWxsO1xuXHQgICAgdGhpcy5fbGFzdENhbGxUaW1lID0gIXRoaXMuX2xlYWRpbmcgPyAwIDogbm93KCk7XG5cdCAgICBpZiAodGhpcy5fZW5kTGF0ZXIpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCd0aHJvdHRsZScsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgndGhyb3R0bGUnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0aHJvdHRsZShvYnMsIHdhaXQpIHtcblx0ICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcblxuXHQgIHZhciBfcmVmMiRsZWFkaW5nID0gX3JlZjIubGVhZGluZztcblx0ICB2YXIgbGVhZGluZyA9IF9yZWYyJGxlYWRpbmcgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMiRsZWFkaW5nO1xuXHQgIHZhciBfcmVmMiR0cmFpbGluZyA9IF9yZWYyLnRyYWlsaW5nO1xuXHQgIHZhciB0cmFpbGluZyA9IF9yZWYyJHRyYWlsaW5nID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZjIkdHJhaWxpbmc7XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyB3YWl0OiB3YWl0LCBsZWFkaW5nOiBsZWFkaW5nLCB0cmFpbGluZzogdHJhaWxpbmcgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBEYXRlLm5vdyA/IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gRGF0ZS5ub3coKTtcblx0fSA6IGZ1bmN0aW9uICgpIHtcblx0ICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0NyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBub3cgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQ2KTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgICAgdmFyIHdhaXQgPSBfcmVmLndhaXQ7XG5cdCAgICB2YXIgaW1tZWRpYXRlID0gX3JlZi5pbW1lZGlhdGU7XG5cblx0ICAgIHRoaXMuX3dhaXQgPSBNYXRoLm1heCgwLCB3YWl0KTtcblx0ICAgIHRoaXMuX2ltbWVkaWF0ZSA9IGltbWVkaWF0ZTtcblx0ICAgIHRoaXMuX2xhc3RBdHRlbXB0ID0gMDtcblx0ICAgIHRoaXMuX3RpbWVvdXRJZCA9IG51bGw7XG5cdCAgICB0aGlzLl9sYXRlclZhbHVlID0gbnVsbDtcblx0ICAgIHRoaXMuX2VuZExhdGVyID0gZmFsc2U7XG5cdCAgICB0aGlzLl8kbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5fbGF0ZXIoKTtcblx0ICAgIH07XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2xhdGVyVmFsdWUgPSBudWxsO1xuXHQgICAgdGhpcy5fJGxhdGVyID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgaWYgKHRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fbGFzdEF0dGVtcHQgPSBub3coKTtcblx0ICAgICAgaWYgKHRoaXMuX2ltbWVkaWF0ZSAmJiAhdGhpcy5fdGltZW91dElkKSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdFZhbHVlKHgpO1xuXHQgICAgICB9XG5cdCAgICAgIGlmICghdGhpcy5fdGltZW91dElkKSB7XG5cdCAgICAgICAgdGhpcy5fdGltZW91dElkID0gc2V0VGltZW91dCh0aGlzLl8kbGF0ZXIsIHRoaXMuX3dhaXQpO1xuXHQgICAgICB9XG5cdCAgICAgIGlmICghdGhpcy5faW1tZWRpYXRlKSB7XG5cdCAgICAgICAgdGhpcy5fbGF0ZXJWYWx1ZSA9IHg7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmF0aW5nKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIGlmICh0aGlzLl90aW1lb3V0SWQgJiYgIXRoaXMuX2ltbWVkaWF0ZSkge1xuXHQgICAgICAgIHRoaXMuX2VuZExhdGVyID0gdHJ1ZTtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2xhdGVyOiBmdW5jdGlvbiBfbGF0ZXIoKSB7XG5cdCAgICB2YXIgbGFzdCA9IG5vdygpIC0gdGhpcy5fbGFzdEF0dGVtcHQ7XG5cdCAgICBpZiAobGFzdCA8IHRoaXMuX3dhaXQgJiYgbGFzdCA+PSAwKSB7XG5cdCAgICAgIHRoaXMuX3RpbWVvdXRJZCA9IHNldFRpbWVvdXQodGhpcy5fJGxhdGVyLCB0aGlzLl93YWl0IC0gbGFzdCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl90aW1lb3V0SWQgPSBudWxsO1xuXHQgICAgICBpZiAoIXRoaXMuX2ltbWVkaWF0ZSkge1xuXHQgICAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9sYXRlclZhbHVlKTtcblx0ICAgICAgICB0aGlzLl9sYXRlclZhbHVlID0gbnVsbDtcblx0ICAgICAgfVxuXHQgICAgICBpZiAodGhpcy5fZW5kTGF0ZXIpIHtcblx0ICAgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZGVib3VuY2UnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2RlYm91bmNlJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVib3VuY2Uob2JzLCB3YWl0KSB7XG5cdCAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cblx0ICB2YXIgX3JlZjIkaW1tZWRpYXRlID0gX3JlZjIuaW1tZWRpYXRlO1xuXHQgIHZhciBpbW1lZGlhdGUgPSBfcmVmMiRpbW1lZGlhdGUgPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogX3JlZjIkaW1tZWRpYXRlO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgd2FpdDogd2FpdCwgaW1tZWRpYXRlOiBpbW1lZGlhdGUgfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA0OCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdChfcmVmKSB7XG5cdCAgICB2YXIgZm4gPSBfcmVmLmZuO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9mbiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFcnJvcjogZnVuY3Rpb24gX2hhbmRsZUVycm9yKHgpIHtcblx0ICAgIHZhciBmbiA9IHRoaXMuX2ZuO1xuXHQgICAgdGhpcy5fZW1pdEVycm9yKGZuKHgpKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnbWFwRXJyb3JzJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdtYXBFcnJvcnMnLCBtaXhpbik7XG5cblx0dmFyIGlkID0gZnVuY3Rpb24gaWQoeCkge1xuXHQgIHJldHVybiB4O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWFwRXJyb3JzKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGlkIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNDkgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVFcnJvcih4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIGlmIChmbih4KSkge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2ZpbHRlckVycm9ycycsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnZmlsdGVyRXJyb3JzJywgbWl4aW4pO1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpbHRlckVycm9ycyhvYnMpIHtcblx0ICB2YXIgZm4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDEgfHwgYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBpZCA6IGFyZ3VtZW50c1sxXTtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDUwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKCkge31cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnaWdub3JlVmFsdWVzJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdpZ25vcmVWYWx1ZXMnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZ25vcmVWYWx1ZXMob2JzKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cdCAgX2hhbmRsZUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlRXJyb3IoKSB7fVxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdpZ25vcmVFcnJvcnMnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2lnbm9yZUVycm9ycycsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlnbm9yZUVycm9ycyhvYnMpIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1MiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge31cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnaWdub3JlRW5kJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdpZ25vcmVFbmQnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpZ25vcmVFbmQob2JzKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTMgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICB0aGlzLl9lbWl0VmFsdWUoZm4oKSk7XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2JlZm9yZUVuZCcsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnYmVmb3JlRW5kJywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmVmb3JlRW5kKG9icywgZm4pIHtcblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA1NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cdHZhciBzbGlkZSA9IF9yZXF1aXJlMi5zbGlkZTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIG1pbiA9IF9yZWYubWluO1xuXHQgICAgdmFyIG1heCA9IF9yZWYubWF4O1xuXG5cdCAgICB0aGlzLl9tYXggPSBtYXg7XG5cdCAgICB0aGlzLl9taW4gPSBtaW47XG5cdCAgICB0aGlzLl9idWZmID0gW107XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2J1ZmYgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB0aGlzLl9idWZmID0gc2xpZGUodGhpcy5fYnVmZiwgeCwgdGhpcy5fbWF4KTtcblx0ICAgIGlmICh0aGlzLl9idWZmLmxlbmd0aCA+PSB0aGlzLl9taW4pIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX2J1ZmYpO1xuXHQgICAgfVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdzbGlkaW5nV2luZG93JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdzbGlkaW5nV2luZG93JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2xpZGluZ1dpbmRvdyhvYnMsIG1heCkge1xuXHQgIHZhciBtaW4gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyAwIDogYXJndW1lbnRzWzJdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgbWluOiBtaW4sIG1heDogbWF4IH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblx0ICAgIHZhciBmbHVzaE9uRW5kID0gX3JlZi5mbHVzaE9uRW5kO1xuXG5cdCAgICB0aGlzLl9mbiA9IGZuO1xuXHQgICAgdGhpcy5fZmx1c2hPbkVuZCA9IGZsdXNoT25FbmQ7XG5cdCAgICB0aGlzLl9idWZmID0gW107XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2J1ZmYgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfZmx1c2g6IGZ1bmN0aW9uIF9mbHVzaCgpIHtcblx0ICAgIGlmICh0aGlzLl9idWZmICE9PSBudWxsICYmIHRoaXMuX2J1ZmYubGVuZ3RoICE9PSAwKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9idWZmKTtcblx0ICAgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB0aGlzLl9idWZmLnB1c2goeCk7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIGlmICghZm4oeCkpIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZUVuZDogZnVuY3Rpb24gX2hhbmRsZUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9mbHVzaE9uRW5kKSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2J1ZmZlcldoaWxlJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdidWZmZXJXaGlsZScsIG1peGluKTtcblxuXHR2YXIgaWQgPSBmdW5jdGlvbiBpZCh4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWZmZXJXaGlsZShvYnMsIGZuKSB7XG5cdCAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAyIHx8IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cblx0ICB2YXIgX3JlZjIkZmx1c2hPbkVuZCA9IF9yZWYyLmZsdXNoT25FbmQ7XG5cdCAgdmFyIGZsdXNoT25FbmQgPSBfcmVmMiRmbHVzaE9uRW5kID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZjIkZmx1c2hPbkVuZDtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IGZuOiBmbiB8fCBpZCwgZmx1c2hPbkVuZDogZmx1c2hPbkVuZCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDU2ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBjb3VudCA9IF9yZWYuY291bnQ7XG5cdCAgICB2YXIgZmx1c2hPbkVuZCA9IF9yZWYuZmx1c2hPbkVuZDtcblxuXHQgICAgdGhpcy5fY291bnQgPSBjb3VudDtcblx0ICAgIHRoaXMuX2ZsdXNoT25FbmQgPSBmbHVzaE9uRW5kO1xuXHQgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl9idWZmID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2ZsdXNoOiBmdW5jdGlvbiBfZmx1c2goKSB7XG5cdCAgICBpZiAodGhpcy5fYnVmZiAhPT0gbnVsbCAmJiB0aGlzLl9idWZmLmxlbmd0aCAhPT0gMCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUodGhpcy5fYnVmZik7XG5cdCAgICAgIHRoaXMuX2J1ZmYgPSBbXTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdGhpcy5fYnVmZi5wdXNoKHgpO1xuXHQgICAgaWYgKHRoaXMuX2J1ZmYubGVuZ3RoID49IHRoaXMuX2NvdW50KSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVFbmQ6IGZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fZmx1c2hPbkVuZCkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdidWZmZXJXaXRoQ291bnQnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2J1ZmZlcldpdGhDb3VudCcsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1ZmZlcldoaWxlKG9icywgY291bnQpIHtcblx0ICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcblxuXHQgIHZhciBfcmVmMiRmbHVzaE9uRW5kID0gX3JlZjIuZmx1c2hPbkVuZDtcblx0ICB2YXIgZmx1c2hPbkVuZCA9IF9yZWYyJGZsdXNoT25FbmQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBfcmVmMiRmbHVzaE9uRW5kO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgY291bnQ6IGNvdW50LCBmbHVzaE9uRW5kOiBmbHVzaE9uRW5kIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNTcgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgICAgdmFyIHdhaXQgPSBfcmVmLndhaXQ7XG5cdCAgICB2YXIgY291bnQgPSBfcmVmLmNvdW50O1xuXHQgICAgdmFyIGZsdXNoT25FbmQgPSBfcmVmLmZsdXNoT25FbmQ7XG5cblx0ICAgIHRoaXMuX3dhaXQgPSB3YWl0O1xuXHQgICAgdGhpcy5fY291bnQgPSBjb3VudDtcblx0ICAgIHRoaXMuX2ZsdXNoT25FbmQgPSBmbHVzaE9uRW5kO1xuXHQgICAgdGhpcy5faW50ZXJ2YWxJZCA9IG51bGw7XG5cdCAgICB0aGlzLl8kb25UaWNrID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX2ZsdXNoKCk7XG5cdCAgICB9O1xuXHQgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl8kb25UaWNrID0gbnVsbDtcblx0ICAgIHRoaXMuX2J1ZmYgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfZmx1c2g6IGZ1bmN0aW9uIF9mbHVzaCgpIHtcblx0ICAgIGlmICh0aGlzLl9idWZmICE9PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9idWZmKTtcblx0ICAgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlVmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVWYWx1ZSh4KSB7XG5cdCAgICB0aGlzLl9idWZmLnB1c2goeCk7XG5cdCAgICBpZiAodGhpcy5fYnVmZi5sZW5ndGggPj0gdGhpcy5fY291bnQpIHtcblx0ICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbElkKTtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRoaXMuXyRvblRpY2ssIHRoaXMuX3dhaXQpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgaWYgKHRoaXMuX2ZsdXNoT25FbmQgJiYgdGhpcy5fYnVmZi5sZW5ndGggIT09IDApIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9LFxuXG5cdCAgX29uQWN0aXZhdGlvbjogZnVuY3Rpb24gX29uQWN0aXZhdGlvbigpIHtcblx0ICAgIHRoaXMuX3NvdXJjZS5vbkFueSh0aGlzLl8kaGFuZGxlQW55KTsgLy8gY29waWVkIGZyb20gcGF0dGVybnMvb25lLXNvdXJjZVxuXHQgICAgdGhpcy5faW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHRoaXMuXyRvblRpY2ssIHRoaXMuX3dhaXQpO1xuXHQgIH0sXG5cblx0ICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgIGlmICh0aGlzLl9pbnRlcnZhbElkICE9PSBudWxsKSB7XG5cdCAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxJZCk7XG5cdCAgICAgIHRoaXMuX2ludGVydmFsSWQgPSBudWxsO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fc291cmNlLm9mZkFueSh0aGlzLl8kaGFuZGxlQW55KTsgLy8gY29waWVkIGZyb20gcGF0dGVybnMvb25lLXNvdXJjZVxuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdidWZmZXJXaXRoVGltZU9yQ291bnQnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2J1ZmZlcldpdGhUaW1lT3JDb3VudCcsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1ZmZlcldpdGhUaW1lT3JDb3VudChvYnMsIHdhaXQsIGNvdW50KSB7XG5cdCAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA8PSAzIHx8IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbM107XG5cblx0ICB2YXIgX3JlZjIkZmx1c2hPbkVuZCA9IF9yZWYyLmZsdXNoT25FbmQ7XG5cdCAgdmFyIGZsdXNoT25FbmQgPSBfcmVmMiRmbHVzaE9uRW5kID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZjIkZmx1c2hPbkVuZDtcblxuXHQgIHJldHVybiBuZXcgKG9icy5fb2ZTYW1lVHlwZShTLCBQKSkob2JzLCB7IHdhaXQ6IHdhaXQsIGNvdW50OiBjb3VudCwgZmx1c2hPbkVuZDogZmx1c2hPbkVuZCB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDU4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24geGZvcm1Gb3JPYnMob2JzKSB7XG5cdCAgcmV0dXJuIHtcblxuXHQgICAgJ0BAdHJhbnNkdWNlci9zdGVwJzogZnVuY3Rpb24gdHJhbnNkdWNlclN0ZXAocmVzLCBpbnB1dCkge1xuXHQgICAgICBvYnMuX2VtaXRWYWx1ZShpbnB1dCk7XG5cdCAgICAgIHJldHVybiBudWxsO1xuXHQgICAgfSxcblxuXHQgICAgJ0BAdHJhbnNkdWNlci9yZXN1bHQnOiBmdW5jdGlvbiB0cmFuc2R1Y2VyUmVzdWx0KCkge1xuXHQgICAgICBvYnMuX2VtaXRFbmQoKTtcblx0ICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICB9XG5cblx0ICB9O1xuXHR9XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciB0cmFuc2R1Y2VyID0gX3JlZi50cmFuc2R1Y2VyO1xuXG5cdCAgICB0aGlzLl94Zm9ybSA9IHRyYW5zZHVjZXIoeGZvcm1Gb3JPYnModGhpcykpO1xuXHQgIH0sXG5cblx0ICBfZnJlZTogZnVuY3Rpb24gX2ZyZWUoKSB7XG5cdCAgICB0aGlzLl94Zm9ybSA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl94Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShudWxsLCB4KSAhPT0gbnVsbCkge1xuXHQgICAgICB0aGlzLl94Zm9ybVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKG51bGwpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlRW5kOiBmdW5jdGlvbiBfaGFuZGxlRW5kKCkge1xuXHQgICAgdGhpcy5feGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShudWxsKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgndHJhbnNkdWNlJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd0cmFuc2R1Y2UnLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2R1Y2Uob2JzLCB0cmFuc2R1Y2VyKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgdHJhbnNkdWNlcjogdHJhbnNkdWNlciB9KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDU5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIGVtaXR0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5faGFuZGxlciA9IGZuO1xuXHQgICAgdGhpcy5fZW1pdHRlciA9IGVtaXR0ZXIodGhpcyk7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2hhbmRsZXIgPSBudWxsO1xuXHQgICAgdGhpcy5fZW1pdHRlciA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVBbnk6IGZ1bmN0aW9uIF9oYW5kbGVBbnkoZXZlbnQpIHtcblx0ICAgIHRoaXMuX2hhbmRsZXIodGhpcy5fZW1pdHRlciwgZXZlbnQpO1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCd3aXRoSGFuZGxlcicsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnd2l0aEhhbmRsZXInLCBtaXhpbik7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aXRoSGFuZGxlcihvYnMsIGZuKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNjAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBWQUxVRSA9IF9yZXF1aXJlLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZS5FUlJPUjtcblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZS5OT1RISU5HO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUyLmluaGVyaXQ7XG5cblx0dmFyIF9yZXF1aXJlMyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIGNvbmNhdCA9IF9yZXF1aXJlMy5jb25jYXQ7XG5cdHZhciBmaWxsQXJyYXkgPSBfcmVxdWlyZTMuZmlsbEFycmF5O1xuXG5cdHZhciBfcmVxdWlyZTQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxuXHR2YXIgc3ByZWFkID0gX3JlcXVpcmU0LnNwcmVhZDtcblxuXHR2YXIgbmV2ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG5cdGZ1bmN0aW9uIGRlZmF1bHRFcnJvcnNDb21iaW5hdG9yKGVycm9ycykge1xuXHQgIHZhciBsYXRlc3RFcnJvciA9IHVuZGVmaW5lZDtcblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IGVycm9ycy5sZW5ndGg7IGkrKykge1xuXHQgICAgaWYgKGVycm9yc1tpXSAhPT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgIGlmIChsYXRlc3RFcnJvciA9PT0gdW5kZWZpbmVkIHx8IGxhdGVzdEVycm9yLmluZGV4IDwgZXJyb3JzW2ldLmluZGV4KSB7XG5cdCAgICAgICAgbGF0ZXN0RXJyb3IgPSBlcnJvcnNbaV07XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICB9XG5cdCAgcmV0dXJuIGxhdGVzdEVycm9yLmVycm9yO1xuXHR9XG5cblx0ZnVuY3Rpb24gQ29tYmluZShhY3RpdmUsIHBhc3NpdmUsIGNvbWJpbmF0b3IpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgU3RyZWFtLmNhbGwodGhpcyk7XG5cdCAgdGhpcy5fYWN0aXZlQ291bnQgPSBhY3RpdmUubGVuZ3RoO1xuXHQgIHRoaXMuX3NvdXJjZXMgPSBjb25jYXQoYWN0aXZlLCBwYXNzaXZlKTtcblx0ICB0aGlzLl9jb21iaW5hdG9yID0gY29tYmluYXRvciA/IHNwcmVhZChjb21iaW5hdG9yLCB0aGlzLl9zb3VyY2VzLmxlbmd0aCkgOiBmdW5jdGlvbiAoeCkge1xuXHQgICAgcmV0dXJuIHg7XG5cdCAgfTtcblx0ICB0aGlzLl9hbGl2ZUNvdW50ID0gMDtcblx0ICB0aGlzLl9sYXRlc3RWYWx1ZXMgPSBuZXcgQXJyYXkodGhpcy5fc291cmNlcy5sZW5ndGgpO1xuXHQgIHRoaXMuX2xhdGVzdEVycm9ycyA9IG5ldyBBcnJheSh0aGlzLl9zb3VyY2VzLmxlbmd0aCk7XG5cdCAgZmlsbEFycmF5KHRoaXMuX2xhdGVzdFZhbHVlcywgTk9USElORyk7XG5cdCAgdGhpcy5fZW1pdEFmdGVyQWN0aXZhdGlvbiA9IGZhbHNlO1xuXHQgIHRoaXMuX2VuZEFmdGVyQWN0aXZhdGlvbiA9IGZhbHNlO1xuXHQgIHRoaXMuX2xhdGVzdEVycm9ySW5kZXggPSAwO1xuXG5cdCAgdGhpcy5fJGhhbmRsZXJzID0gW107XG5cblx0ICB2YXIgX2xvb3AgPSBmdW5jdGlvbiAoaSkge1xuXHQgICAgX3RoaXMuXyRoYW5kbGVycy5wdXNoKGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX2hhbmRsZUFueShpLCBldmVudCk7XG5cdCAgICB9KTtcblx0ICB9O1xuXG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICBfbG9vcChpKTtcblx0ICB9XG5cdH1cblxuXHRpbmhlcml0KENvbWJpbmUsIFN0cmVhbSwge1xuXG5cdCAgX25hbWU6ICdjb21iaW5lJyxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICB0aGlzLl9hbGl2ZUNvdW50ID0gdGhpcy5fYWN0aXZlQ291bnQ7XG5cblx0ICAgIC8vIHdlIG5lZWQgdG8gc3VzY3JpYmUgdG8gX3Bhc3NpdmVfIHNvdXJjZXMgYmVmb3JlIF9hY3RpdmVfXG5cdCAgICAvLyAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ycG9taW5vdi9rZWZpci9pc3N1ZXMvOTgpXG5cdCAgICBmb3IgKHZhciBpID0gdGhpcy5fYWN0aXZlQ291bnQ7IGkgPCB0aGlzLl9zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZXNbaV0ub25BbnkodGhpcy5fJGhhbmRsZXJzW2ldKTtcblx0ICAgIH1cblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYWN0aXZlQ291bnQ7IGkrKykge1xuXHQgICAgICB0aGlzLl9zb3VyY2VzW2ldLm9uQW55KHRoaXMuXyRoYW5kbGVyc1tpXSk7XG5cdCAgICB9XG5cblx0ICAgIGlmICh0aGlzLl9lbWl0QWZ0ZXJBY3RpdmF0aW9uKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRBZnRlckFjdGl2YXRpb24gPSBmYWxzZTtcblx0ICAgICAgdGhpcy5fZW1pdElmRnVsbCgpO1xuXHQgICAgfVxuXHQgICAgaWYgKHRoaXMuX2VuZEFmdGVyQWN0aXZhdGlvbikge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgdmFyIGxlbmd0aCA9IHRoaXMuX3NvdXJjZXMubGVuZ3RoLFxuXHQgICAgICAgIGkgPSB1bmRlZmluZWQ7XG5cdCAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdGhpcy5fc291cmNlc1tpXS5vZmZBbnkodGhpcy5fJGhhbmRsZXJzW2ldKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2VtaXRJZkZ1bGw6IGZ1bmN0aW9uIF9lbWl0SWZGdWxsKCkge1xuXHQgICAgdmFyIGhhc0FsbFZhbHVlcyA9IHRydWU7XG5cdCAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2U7XG5cdCAgICB2YXIgbGVuZ3RoID0gdGhpcy5fbGF0ZXN0VmFsdWVzLmxlbmd0aDtcblx0ICAgIHZhciB2YWx1ZXNDb3B5ID0gbmV3IEFycmF5KGxlbmd0aCk7XG5cdCAgICB2YXIgZXJyb3JzQ29weSA9IG5ldyBBcnJheShsZW5ndGgpO1xuXG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHZhbHVlc0NvcHlbaV0gPSB0aGlzLl9sYXRlc3RWYWx1ZXNbaV07XG5cdCAgICAgIGVycm9yc0NvcHlbaV0gPSB0aGlzLl9sYXRlc3RFcnJvcnNbaV07XG5cblx0ICAgICAgaWYgKHZhbHVlc0NvcHlbaV0gPT09IE5PVEhJTkcpIHtcblx0ICAgICAgICBoYXNBbGxWYWx1ZXMgPSBmYWxzZTtcblx0ICAgICAgfVxuXG5cdCAgICAgIGlmIChlcnJvcnNDb3B5W2ldICE9PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xuXHQgICAgICB9XG5cdCAgICB9XG5cblx0ICAgIGlmIChoYXNBbGxWYWx1ZXMpIHtcblx0ICAgICAgdmFyIGNvbWJpbmF0b3IgPSB0aGlzLl9jb21iaW5hdG9yO1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoY29tYmluYXRvcih2YWx1ZXNDb3B5KSk7XG5cdCAgICB9XG5cdCAgICBpZiAoaGFzRXJyb3JzKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcihkZWZhdWx0RXJyb3JzQ29tYmluYXRvcihlcnJvcnNDb3B5KSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVBbnk6IGZ1bmN0aW9uIF9oYW5kbGVBbnkoaSwgZXZlbnQpIHtcblxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IFZBTFVFIHx8IGV2ZW50LnR5cGUgPT09IEVSUk9SKSB7XG5cblx0ICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFZBTFVFKSB7XG5cdCAgICAgICAgdGhpcy5fbGF0ZXN0VmFsdWVzW2ldID0gZXZlbnQudmFsdWU7XG5cdCAgICAgICAgdGhpcy5fbGF0ZXN0RXJyb3JzW2ldID0gdW5kZWZpbmVkO1xuXHQgICAgICB9XG5cdCAgICAgIGlmIChldmVudC50eXBlID09PSBFUlJPUikge1xuXHQgICAgICAgIHRoaXMuX2xhdGVzdFZhbHVlc1tpXSA9IE5PVEhJTkc7XG5cdCAgICAgICAgdGhpcy5fbGF0ZXN0RXJyb3JzW2ldID0ge1xuXHQgICAgICAgICAgaW5kZXg6IHRoaXMuX2xhdGVzdEVycm9ySW5kZXgrKyxcblx0ICAgICAgICAgIGVycm9yOiBldmVudC52YWx1ZVxuXHQgICAgICAgIH07XG5cdCAgICAgIH1cblxuXHQgICAgICBpZiAoaSA8IHRoaXMuX2FjdGl2ZUNvdW50KSB7XG5cdCAgICAgICAgaWYgKHRoaXMuX2FjdGl2YXRpbmcpIHtcblx0ICAgICAgICAgIHRoaXMuX2VtaXRBZnRlckFjdGl2YXRpb24gPSB0cnVlO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICB0aGlzLl9lbWl0SWZGdWxsKCk7XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyBFTkRcblxuXHQgICAgICBpZiAoaSA8IHRoaXMuX2FjdGl2ZUNvdW50KSB7XG5cdCAgICAgICAgdGhpcy5fYWxpdmVDb3VudC0tO1xuXHQgICAgICAgIGlmICh0aGlzLl9hbGl2ZUNvdW50ID09PSAwKSB7XG5cdCAgICAgICAgICBpZiAodGhpcy5fYWN0aXZhdGluZykge1xuXHQgICAgICAgICAgICB0aGlzLl9lbmRBZnRlckFjdGl2YXRpb24gPSB0cnVlO1xuXHQgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgIFN0cmVhbS5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9zb3VyY2VzID0gbnVsbDtcblx0ICAgIHRoaXMuX2xhdGVzdFZhbHVlcyA9IG51bGw7XG5cdCAgICB0aGlzLl9sYXRlc3RFcnJvcnMgPSBudWxsO1xuXHQgICAgdGhpcy5fY29tYmluYXRvciA9IG51bGw7XG5cdCAgICB0aGlzLl8kaGFuZGxlcnMgPSBudWxsO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmUoYWN0aXZlLCBwYXNzaXZlLCBjb21iaW5hdG9yKSB7XG5cdCAgaWYgKHBhc3NpdmUgPT09IHVuZGVmaW5lZCkgcGFzc2l2ZSA9IFtdO1xuXG5cdCAgaWYgKHR5cGVvZiBwYXNzaXZlID09PSAnZnVuY3Rpb24nKSB7XG5cdCAgICBjb21iaW5hdG9yID0gcGFzc2l2ZTtcblx0ICAgIHBhc3NpdmUgPSBbXTtcblx0ICB9XG5cdCAgcmV0dXJuIGFjdGl2ZS5sZW5ndGggPT09IDAgPyBuZXZlcigpIDogbmV3IENvbWJpbmUoYWN0aXZlLCBwYXNzaXZlLCBjb21iaW5hdG9yKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDYxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgVkFMVUUgPSBfcmVxdWlyZS5WQUxVRTtcblx0dmFyIEVSUk9SID0gX3JlcXVpcmUuRVJST1I7XG5cdHZhciBFTkQgPSBfcmVxdWlyZS5FTkQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZTIuaW5oZXJpdDtcblxuXHR2YXIgX3JlcXVpcmUzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXHR2YXIgbWFwID0gX3JlcXVpcmUzLm1hcDtcblx0dmFyIGNsb25lQXJyYXkgPSBfcmVxdWlyZTMuY2xvbmVBcnJheTtcblxuXHR2YXIgX3JlcXVpcmU0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XG5cblx0dmFyIHNwcmVhZCA9IF9yZXF1aXJlNC5zcHJlYWQ7XG5cblx0dmFyIG5ldmVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblxuXHR2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG5cdCAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG5cdH07XG5cblx0ZnVuY3Rpb24gWmlwKHNvdXJjZXMsIGNvbWJpbmF0b3IpIHtcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdCAgU3RyZWFtLmNhbGwodGhpcyk7XG5cblx0ICB0aGlzLl9idWZmZXJzID0gbWFwKHNvdXJjZXMsIGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0ICAgIHJldHVybiBpc0FycmF5KHNvdXJjZSkgPyBjbG9uZUFycmF5KHNvdXJjZSkgOiBbXTtcblx0ICB9KTtcblx0ICB0aGlzLl9zb3VyY2VzID0gbWFwKHNvdXJjZXMsIGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0ICAgIHJldHVybiBpc0FycmF5KHNvdXJjZSkgPyBuZXZlcigpIDogc291cmNlO1xuXHQgIH0pO1xuXG5cdCAgdGhpcy5fY29tYmluYXRvciA9IGNvbWJpbmF0b3IgPyBzcHJlYWQoY29tYmluYXRvciwgdGhpcy5fc291cmNlcy5sZW5ndGgpIDogZnVuY3Rpb24gKHgpIHtcblx0ICAgIHJldHVybiB4O1xuXHQgIH07XG5cdCAgdGhpcy5fYWxpdmVDb3VudCA9IDA7XG5cblx0ICB0aGlzLl8kaGFuZGxlcnMgPSBbXTtcblxuXHQgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIChpKSB7XG5cdCAgICBfdGhpcy5fJGhhbmRsZXJzLnB1c2goZnVuY3Rpb24gKGV2ZW50KSB7XG5cdCAgICAgIHJldHVybiBfdGhpcy5faGFuZGxlQW55KGksIGV2ZW50KTtcblx0ICAgIH0pO1xuXHQgIH07XG5cblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3NvdXJjZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgIF9sb29wKGkpO1xuXHQgIH1cblx0fVxuXG5cdGluaGVyaXQoWmlwLCBTdHJlYW0sIHtcblxuXHQgIF9uYW1lOiAnemlwJyxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cblx0ICAgIC8vIGlmIGFsbCBzb3VyY2VzIGFyZSBhcnJheXNcblx0ICAgIHdoaWxlICh0aGlzLl9pc0Z1bGwoKSkge1xuXHQgICAgICB0aGlzLl9lbWl0KCk7XG5cdCAgICB9XG5cblx0ICAgIHZhciBsZW5ndGggPSB0aGlzLl9zb3VyY2VzLmxlbmd0aDtcblx0ICAgIHRoaXMuX2FsaXZlQ291bnQgPSBsZW5ndGg7XG5cdCAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aCAmJiB0aGlzLl9hY3RpdmU7IGkrKykge1xuXHQgICAgICB0aGlzLl9zb3VyY2VzW2ldLm9uQW55KHRoaXMuXyRoYW5kbGVyc1tpXSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZXNbaV0ub2ZmQW55KHRoaXMuXyRoYW5kbGVyc1tpXSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9lbWl0OiBmdW5jdGlvbiBfZW1pdCgpIHtcblx0ICAgIHZhciB2YWx1ZXMgPSBuZXcgQXJyYXkodGhpcy5fYnVmZmVycy5sZW5ndGgpO1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9idWZmZXJzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHZhbHVlc1tpXSA9IHRoaXMuX2J1ZmZlcnNbaV0uc2hpZnQoKTtcblx0ICAgIH1cblx0ICAgIHZhciBjb21iaW5hdG9yID0gdGhpcy5fY29tYmluYXRvcjtcblx0ICAgIHRoaXMuX2VtaXRWYWx1ZShjb21iaW5hdG9yKHZhbHVlcykpO1xuXHQgIH0sXG5cblx0ICBfaXNGdWxsOiBmdW5jdGlvbiBfaXNGdWxsKCkge1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9idWZmZXJzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIGlmICh0aGlzLl9idWZmZXJzW2ldLmxlbmd0aCA9PT0gMCkge1xuXHQgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmV0dXJuIHRydWU7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVBbnk6IGZ1bmN0aW9uIF9oYW5kbGVBbnkoaSwgZXZlbnQpIHtcblx0ICAgIGlmIChldmVudC50eXBlID09PSBWQUxVRSkge1xuXHQgICAgICB0aGlzLl9idWZmZXJzW2ldLnB1c2goZXZlbnQudmFsdWUpO1xuXHQgICAgICBpZiAodGhpcy5faXNGdWxsKCkpIHtcblx0ICAgICAgICB0aGlzLl9lbWl0KCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIGlmIChldmVudC50eXBlID09PSBFUlJPUikge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoZXZlbnQudmFsdWUpO1xuXHQgICAgfVxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVORCkge1xuXHQgICAgICB0aGlzLl9hbGl2ZUNvdW50LS07XG5cdCAgICAgIGlmICh0aGlzLl9hbGl2ZUNvdW50ID09PSAwKSB7XG5cdCAgICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgU3RyZWFtLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX3NvdXJjZXMgPSBudWxsO1xuXHQgICAgdGhpcy5fYnVmZmVycyA9IG51bGw7XG5cdCAgICB0aGlzLl9jb21iaW5hdG9yID0gbnVsbDtcblx0ICAgIHRoaXMuXyRoYW5kbGVycyA9IG51bGw7XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gemlwKG9ic2VydmFibGVzLCBjb21iaW5hdG9yIC8qIEZ1bmN0aW9uIHwgZmFsc2V5ICovKSB7XG5cdCAgcmV0dXJuIG9ic2VydmFibGVzLmxlbmd0aCA9PT0gMCA/IG5ldmVyKCkgOiBuZXcgWmlwKG9ic2VydmFibGVzLCBjb21iaW5hdG9yKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDYyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIEFic3RyYWN0UG9vbCA9IF9fd2VicGFja19yZXF1aXJlX18oNjMpO1xuXHR2YXIgbmV2ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG5cdGZ1bmN0aW9uIE1lcmdlKHNvdXJjZXMpIHtcblx0ICBBYnN0cmFjdFBvb2wuY2FsbCh0aGlzKTtcblx0ICB0aGlzLl9hZGRBbGwoc291cmNlcyk7XG5cdCAgdGhpcy5faW5pdGlhbGlzZWQgPSB0cnVlO1xuXHR9XG5cblx0aW5oZXJpdChNZXJnZSwgQWJzdHJhY3RQb29sLCB7XG5cblx0ICBfbmFtZTogJ21lcmdlJyxcblxuXHQgIF9vbkVtcHR5OiBmdW5jdGlvbiBfb25FbXB0eSgpIHtcblx0ICAgIGlmICh0aGlzLl9pbml0aWFsaXNlZCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH0pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2Uob2JzZXJ2YWJsZXMpIHtcblx0ICByZXR1cm4gb2JzZXJ2YWJsZXMubGVuZ3RoID09PSAwID8gbmV2ZXIoKSA6IG5ldyBNZXJnZShvYnNlcnZhYmxlcyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA2MyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBTdHJlYW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlLkVSUk9SO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUyLmluaGVyaXQ7XG5cblx0dmFyIF9yZXF1aXJlMyA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cblx0dmFyIGNvbmNhdCA9IF9yZXF1aXJlMy5jb25jYXQ7XG5cdHZhciBmb3JFYWNoID0gX3JlcXVpcmUzLmZvckVhY2g7XG5cdHZhciBmaW5kQnlQcmVkID0gX3JlcXVpcmUzLmZpbmRCeVByZWQ7XG5cdHZhciBmaW5kID0gX3JlcXVpcmUzLmZpbmQ7XG5cdHZhciByZW1vdmUgPSBfcmVxdWlyZTMucmVtb3ZlO1xuXHR2YXIgY2xvbmVBcnJheSA9IF9yZXF1aXJlMy5jbG9uZUFycmF5O1xuXG5cdHZhciBpZCA9IGZ1bmN0aW9uIGlkKHgpIHtcblx0ICByZXR1cm4geDtcblx0fTtcblxuXHRmdW5jdGlvbiBBYnN0cmFjdFBvb2woKSB7XG5cdCAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cblx0ICB2YXIgX3JlZiRxdWV1ZUxpbSA9IF9yZWYucXVldWVMaW07XG5cdCAgdmFyIHF1ZXVlTGltID0gX3JlZiRxdWV1ZUxpbSA9PT0gdW5kZWZpbmVkID8gMCA6IF9yZWYkcXVldWVMaW07XG5cdCAgdmFyIF9yZWYkY29uY3VyTGltID0gX3JlZi5jb25jdXJMaW07XG5cdCAgdmFyIGNvbmN1ckxpbSA9IF9yZWYkY29uY3VyTGltID09PSB1bmRlZmluZWQgPyAtMSA6IF9yZWYkY29uY3VyTGltO1xuXHQgIHZhciBfcmVmJGRyb3AgPSBfcmVmLmRyb3A7XG5cdCAgdmFyIGRyb3AgPSBfcmVmJGRyb3AgPT09IHVuZGVmaW5lZCA/ICduZXcnIDogX3JlZiRkcm9wO1xuXG5cdCAgU3RyZWFtLmNhbGwodGhpcyk7XG5cblx0ICB0aGlzLl9xdWV1ZUxpbSA9IHF1ZXVlTGltIDwgMCA/IC0xIDogcXVldWVMaW07XG5cdCAgdGhpcy5fY29uY3VyTGltID0gY29uY3VyTGltIDwgMCA/IC0xIDogY29uY3VyTGltO1xuXHQgIHRoaXMuX2Ryb3AgPSBkcm9wO1xuXHQgIHRoaXMuX3F1ZXVlID0gW107XG5cdCAgdGhpcy5fY3VyU291cmNlcyA9IFtdO1xuXHQgIHRoaXMuXyRoYW5kbGVTdWJBbnkgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgIHJldHVybiBfdGhpcy5faGFuZGxlU3ViQW55KGV2ZW50KTtcblx0ICB9O1xuXHQgIHRoaXMuXyRlbmRIYW5kbGVycyA9IFtdO1xuXHQgIHRoaXMuX2N1cnJlbnRseUFkZGluZyA9IG51bGw7XG5cblx0ICBpZiAodGhpcy5fY29uY3VyTGltID09PSAwKSB7XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfVxuXHR9XG5cblx0aW5oZXJpdChBYnN0cmFjdFBvb2wsIFN0cmVhbSwge1xuXG5cdCAgX25hbWU6ICdhYnN0cmFjdFBvb2wnLFxuXG5cdCAgX2FkZDogZnVuY3Rpb24gX2FkZChvYmosIHRvT2JzIC8qIEZ1bmN0aW9uIHwgZmFsc2V5ICovKSB7XG5cdCAgICB0b09icyA9IHRvT2JzIHx8IGlkO1xuXHQgICAgaWYgKHRoaXMuX2NvbmN1ckxpbSA9PT0gLTEgfHwgdGhpcy5fY3VyU291cmNlcy5sZW5ndGggPCB0aGlzLl9jb25jdXJMaW0pIHtcblx0ICAgICAgdGhpcy5fYWRkVG9DdXIodG9PYnMob2JqKSk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICBpZiAodGhpcy5fcXVldWVMaW0gPT09IC0xIHx8IHRoaXMuX3F1ZXVlLmxlbmd0aCA8IHRoaXMuX3F1ZXVlTGltKSB7XG5cdCAgICAgICAgdGhpcy5fYWRkVG9RdWV1ZSh0b09icyhvYmopKTtcblx0ICAgICAgfSBlbHNlIGlmICh0aGlzLl9kcm9wID09PSAnb2xkJykge1xuXHQgICAgICAgIHRoaXMuX3JlbW92ZU9sZGVzdCgpO1xuXHQgICAgICAgIHRoaXMuX2FkZChvYmosIHRvT2JzKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfYWRkQWxsOiBmdW5jdGlvbiBfYWRkQWxsKG9ic3MpIHtcblx0ICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG5cdCAgICBmb3JFYWNoKG9ic3MsIGZ1bmN0aW9uIChvYnMpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzMi5fYWRkKG9icyk7XG5cdCAgICB9KTtcblx0ICB9LFxuXG5cdCAgX3JlbW92ZTogZnVuY3Rpb24gX3JlbW92ZShvYnMpIHtcblx0ICAgIGlmICh0aGlzLl9yZW1vdmVDdXIob2JzKSA9PT0gLTEpIHtcblx0ICAgICAgdGhpcy5fcmVtb3ZlUXVldWUob2JzKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2FkZFRvUXVldWU6IGZ1bmN0aW9uIF9hZGRUb1F1ZXVlKG9icykge1xuXHQgICAgdGhpcy5fcXVldWUgPSBjb25jYXQodGhpcy5fcXVldWUsIFtvYnNdKTtcblx0ICB9LFxuXG5cdCAgX2FkZFRvQ3VyOiBmdW5jdGlvbiBfYWRkVG9DdXIob2JzKSB7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG5cblx0ICAgICAgLy8gSEFDSzpcblx0ICAgICAgLy9cblx0ICAgICAgLy8gV2UgaGF2ZSB0d28gb3B0aW1pemF0aW9ucyBmb3IgY2FzZXMgd2hlbiBgb2JzYCBpcyBlbmRlZC4gV2UgZG9uJ3Qgd2FudFxuXHQgICAgICAvLyB0byBhZGQgc3VjaCBvYnNlcnZhYmxlIHRvIHRoZSBsaXN0LCBidXQgb25seSB3YW50IHRvIGVtaXQgZXZlbnRzXG5cdCAgICAgIC8vIGZyb20gaXQgKGlmIGl0IGhhcyBzb21lKS5cblx0ICAgICAgLy9cblx0ICAgICAgLy8gSW5zdGVhZCBvZiB0aGlzIGhhY2tzLCB3ZSBjb3VsZCBqdXN0IGRpZCBmb2xsb3dpbmcsXG5cdCAgICAgIC8vIGJ1dCBpdCB3b3VsZCBiZSA1LTggdGltZXMgc2xvd2VyOlxuXHQgICAgICAvL1xuXHQgICAgICAvLyAgICAgdGhpcy5fY3VyU291cmNlcyA9IGNvbmNhdCh0aGlzLl9jdXJTb3VyY2VzLCBbb2JzXSk7XG5cdCAgICAgIC8vICAgICB0aGlzLl9zdWJzY3JpYmUob2JzKTtcblx0ICAgICAgLy9cblxuXHQgICAgICAvLyAjMVxuXHQgICAgICAvLyBUaGlzIG9uZSBmb3IgY2FzZXMgd2hlbiBgb2JzYCBhbHJlYWR5IGVuZGVkXG5cdCAgICAgIC8vIGUuZy4sIEtlZmlyLmNvbnN0YW50KCkgb3IgS2VmaXIubmV2ZXIoKVxuXHQgICAgICBpZiAoIW9icy5fYWxpdmUpIHtcblx0ICAgICAgICBpZiAob2JzLl9jdXJyZW50RXZlbnQpIHtcblx0ICAgICAgICAgIHRoaXMuX2VtaXQob2JzLl9jdXJyZW50RXZlbnQudHlwZSwgb2JzLl9jdXJyZW50RXZlbnQudmFsdWUpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm47XG5cdCAgICAgIH1cblxuXHQgICAgICAvLyAjMlxuXHQgICAgICAvLyBUaGlzIG9uZSBpcyBmb3IgY2FzZXMgd2hlbiBgb2JzYCBnb2luZyB0byBlbmQgc3luY2hyb25vdXNseSBvblxuXHQgICAgICAvLyBmaXJzdCBzdWJzY3JpYmVyIGUuZy4sIEtlZmlyLnN0cmVhbShlbSA9PiB7ZW0uZW1pdCgxKTsgZW0uZW5kKCl9KVxuXHQgICAgICB0aGlzLl9jdXJyZW50bHlBZGRpbmcgPSBvYnM7XG5cdCAgICAgIG9icy5vbkFueSh0aGlzLl8kaGFuZGxlU3ViQW55KTtcblx0ICAgICAgdGhpcy5fY3VycmVudGx5QWRkaW5nID0gbnVsbDtcblx0ICAgICAgaWYgKG9icy5fYWxpdmUpIHtcblx0ICAgICAgICB0aGlzLl9jdXJTb3VyY2VzID0gY29uY2F0KHRoaXMuX2N1clNvdXJjZXMsIFtvYnNdKTtcblx0ICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG5cdCAgICAgICAgICB0aGlzLl9zdWJUb0VuZChvYnMpO1xuXHQgICAgICAgIH1cblx0ICAgICAgfVxuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgdGhpcy5fY3VyU291cmNlcyA9IGNvbmNhdCh0aGlzLl9jdXJTb3VyY2VzLCBbb2JzXSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9zdWJUb0VuZDogZnVuY3Rpb24gX3N1YlRvRW5kKG9icykge1xuXHQgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cblx0ICAgIHZhciBvbkVuZCA9IGZ1bmN0aW9uIG9uRW5kKCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMzLl9yZW1vdmVDdXIob2JzKTtcblx0ICAgIH07XG5cdCAgICB0aGlzLl8kZW5kSGFuZGxlcnMucHVzaCh7IG9iczogb2JzLCBoYW5kbGVyOiBvbkVuZCB9KTtcblx0ICAgIG9icy5vbkVuZChvbkVuZCk7XG5cdCAgfSxcblxuXHQgIF9zdWJzY3JpYmU6IGZ1bmN0aW9uIF9zdWJzY3JpYmUob2JzKSB7XG5cdCAgICBvYnMub25BbnkodGhpcy5fJGhhbmRsZVN1YkFueSk7XG5cblx0ICAgIC8vIGl0IGNhbiBiZWNvbWUgaW5hY3RpdmUgaW4gcmVzcG9uY2Ugb2Ygc3Vic2NyaWJpbmcgdG8gYG9icy5vbkFueWAgYWJvdmVcblx0ICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcblx0ICAgICAgdGhpcy5fc3ViVG9FbmQob2JzKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX3Vuc3Vic2NyaWJlOiBmdW5jdGlvbiBfdW5zdWJzY3JpYmUob2JzKSB7XG5cdCAgICBvYnMub2ZmQW55KHRoaXMuXyRoYW5kbGVTdWJBbnkpO1xuXG5cdCAgICB2YXIgb25FbmRJID0gZmluZEJ5UHJlZCh0aGlzLl8kZW5kSGFuZGxlcnMsIGZ1bmN0aW9uIChvYmopIHtcblx0ICAgICAgcmV0dXJuIG9iai5vYnMgPT09IG9icztcblx0ICAgIH0pO1xuXHQgICAgaWYgKG9uRW5kSSAhPT0gLTEpIHtcblx0ICAgICAgb2JzLm9mZkVuZCh0aGlzLl8kZW5kSGFuZGxlcnNbb25FbmRJXS5oYW5kbGVyKTtcblx0ICAgICAgdGhpcy5fJGVuZEhhbmRsZXJzLnNwbGljZShvbkVuZEksIDEpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlU3ViQW55OiBmdW5jdGlvbiBfaGFuZGxlU3ViQW55KGV2ZW50KSB7XG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gVkFMVUUpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKGV2ZW50LnZhbHVlKTtcblx0ICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gRVJST1IpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKGV2ZW50LnZhbHVlKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX3JlbW92ZVF1ZXVlOiBmdW5jdGlvbiBfcmVtb3ZlUXVldWUob2JzKSB7XG5cdCAgICB2YXIgaW5kZXggPSBmaW5kKHRoaXMuX3F1ZXVlLCBvYnMpO1xuXHQgICAgdGhpcy5fcXVldWUgPSByZW1vdmUodGhpcy5fcXVldWUsIGluZGV4KTtcblx0ICAgIHJldHVybiBpbmRleDtcblx0ICB9LFxuXG5cdCAgX3JlbW92ZUN1cjogZnVuY3Rpb24gX3JlbW92ZUN1cihvYnMpIHtcblx0ICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcblx0ICAgICAgdGhpcy5fdW5zdWJzY3JpYmUob2JzKTtcblx0ICAgIH1cblx0ICAgIHZhciBpbmRleCA9IGZpbmQodGhpcy5fY3VyU291cmNlcywgb2JzKTtcblx0ICAgIHRoaXMuX2N1clNvdXJjZXMgPSByZW1vdmUodGhpcy5fY3VyU291cmNlcywgaW5kZXgpO1xuXHQgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuXHQgICAgICBpZiAodGhpcy5fcXVldWUubGVuZ3RoICE9PSAwKSB7XG5cdCAgICAgICAgdGhpcy5fcHVsbFF1ZXVlKCk7XG5cdCAgICAgIH0gZWxzZSBpZiAodGhpcy5fY3VyU291cmNlcy5sZW5ndGggPT09IDApIHtcblx0ICAgICAgICB0aGlzLl9vbkVtcHR5KCk7XG5cdCAgICAgIH1cblx0ICAgIH1cblx0ICAgIHJldHVybiBpbmRleDtcblx0ICB9LFxuXG5cdCAgX3JlbW92ZU9sZGVzdDogZnVuY3Rpb24gX3JlbW92ZU9sZGVzdCgpIHtcblx0ICAgIHRoaXMuX3JlbW92ZUN1cih0aGlzLl9jdXJTb3VyY2VzWzBdKTtcblx0ICB9LFxuXG5cdCAgX3B1bGxRdWV1ZTogZnVuY3Rpb24gX3B1bGxRdWV1ZSgpIHtcblx0ICAgIGlmICh0aGlzLl9xdWV1ZS5sZW5ndGggIT09IDApIHtcblx0ICAgICAgdGhpcy5fcXVldWUgPSBjbG9uZUFycmF5KHRoaXMuX3F1ZXVlKTtcblx0ICAgICAgdGhpcy5fYWRkVG9DdXIodGhpcy5fcXVldWUuc2hpZnQoKSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICBmb3IgKHZhciBpID0gMCwgc291cmNlcyA9IHRoaXMuX2N1clNvdXJjZXM7IGkgPCBzb3VyY2VzLmxlbmd0aCAmJiB0aGlzLl9hY3RpdmU7IGkrKykge1xuXHQgICAgICB0aGlzLl9zdWJzY3JpYmUoc291cmNlc1tpXSk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgZm9yICh2YXIgaSA9IDAsIHNvdXJjZXMgPSB0aGlzLl9jdXJTb3VyY2VzOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgICB0aGlzLl91bnN1YnNjcmliZShzb3VyY2VzW2ldKTtcblx0ICAgIH1cblx0ICAgIGlmICh0aGlzLl9jdXJyZW50bHlBZGRpbmcgIT09IG51bGwpIHtcblx0ICAgICAgdGhpcy5fdW5zdWJzY3JpYmUodGhpcy5fY3VycmVudGx5QWRkaW5nKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2lzRW1wdHk6IGZ1bmN0aW9uIF9pc0VtcHR5KCkge1xuXHQgICAgcmV0dXJuIHRoaXMuX2N1clNvdXJjZXMubGVuZ3RoID09PSAwO1xuXHQgIH0sXG5cblx0ICBfb25FbXB0eTogZnVuY3Rpb24gX29uRW1wdHkoKSB7fSxcblxuXHQgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgU3RyZWFtLnByb3RvdHlwZS5fY2xlYXIuY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX3F1ZXVlID0gbnVsbDtcblx0ICAgIHRoaXMuX2N1clNvdXJjZXMgPSBudWxsO1xuXHQgICAgdGhpcy5fJGhhbmRsZVN1YkFueSA9IG51bGw7XG5cdCAgICB0aGlzLl8kZW5kSGFuZGxlcnMgPSBudWxsO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IEFic3RyYWN0UG9vbDtcblxuLyoqKi8gfSxcbi8qIDY0ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIHJlcGVhdCA9IF9fd2VicGFja19yZXF1aXJlX18oNjUpO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29uY2F0KG9ic2VydmFibGVzKSB7XG5cdCAgcmV0dXJuIHJlcGVhdChmdW5jdGlvbiAoaW5kZXgpIHtcblx0ICAgIHJldHVybiBvYnNlcnZhYmxlcy5sZW5ndGggPiBpbmRleCA/IG9ic2VydmFibGVzW2luZGV4XSA6IGZhbHNlO1xuXHQgIH0pLnNldE5hbWUoJ2NvbmNhdCcpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNjUgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUuaW5oZXJpdDtcblxuXHR2YXIgU3RyZWFtID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxuXHR2YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxuXHR2YXIgRU5EID0gX3JlcXVpcmUyLkVORDtcblxuXHRmdW5jdGlvbiBTKGdlbmVyYXRvcikge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICBTdHJlYW0uY2FsbCh0aGlzKTtcblx0ICB0aGlzLl9nZW5lcmF0b3IgPSBnZW5lcmF0b3I7XG5cdCAgdGhpcy5fc291cmNlID0gbnVsbDtcblx0ICB0aGlzLl9pbkxvb3AgPSBmYWxzZTtcblx0ICB0aGlzLl9pdGVyYXRpb24gPSAwO1xuXHQgIHRoaXMuXyRoYW5kbGVBbnkgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgIHJldHVybiBfdGhpcy5faGFuZGxlQW55KGV2ZW50KTtcblx0ICB9O1xuXHR9XG5cblx0aW5oZXJpdChTLCBTdHJlYW0sIHtcblxuXHQgIF9uYW1lOiAncmVwZWF0JyxcblxuXHQgIF9oYW5kbGVBbnk6IGZ1bmN0aW9uIF9oYW5kbGVBbnkoZXZlbnQpIHtcblx0ICAgIGlmIChldmVudC50eXBlID09PSBFTkQpIHtcblx0ICAgICAgdGhpcy5fc291cmNlID0gbnVsbDtcblx0ICAgICAgdGhpcy5fZ2V0U291cmNlKCk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9lbWl0KGV2ZW50LnR5cGUsIGV2ZW50LnZhbHVlKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2dldFNvdXJjZTogZnVuY3Rpb24gX2dldFNvdXJjZSgpIHtcblx0ICAgIGlmICghdGhpcy5faW5Mb29wKSB7XG5cdCAgICAgIHRoaXMuX2luTG9vcCA9IHRydWU7XG5cdCAgICAgIHZhciBnZW5lcmF0b3IgPSB0aGlzLl9nZW5lcmF0b3I7XG5cdCAgICAgIHdoaWxlICh0aGlzLl9zb3VyY2UgPT09IG51bGwgJiYgdGhpcy5fYWxpdmUgJiYgdGhpcy5fYWN0aXZlKSB7XG5cdCAgICAgICAgdGhpcy5fc291cmNlID0gZ2VuZXJhdG9yKHRoaXMuX2l0ZXJhdGlvbisrKTtcblx0ICAgICAgICBpZiAodGhpcy5fc291cmNlKSB7XG5cdCAgICAgICAgICB0aGlzLl9zb3VyY2Uub25BbnkodGhpcy5fJGhhbmRsZUFueSk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5faW5Mb29wID0gZmFsc2U7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICBpZiAodGhpcy5fc291cmNlKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZS5vbkFueSh0aGlzLl8kaGFuZGxlQW55KTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2dldFNvdXJjZSgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfb25EZWFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkRlYWN0aXZhdGlvbigpIHtcblx0ICAgIGlmICh0aGlzLl9zb3VyY2UpIHtcblx0ICAgICAgdGhpcy5fc291cmNlLm9mZkFueSh0aGlzLl8kaGFuZGxlQW55KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2NsZWFyOiBmdW5jdGlvbiBfY2xlYXIoKSB7XG5cdCAgICBTdHJlYW0ucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgdGhpcy5fZ2VuZXJhdG9yID0gbnVsbDtcblx0ICAgIHRoaXMuX3NvdXJjZSA9IG51bGw7XG5cdCAgICB0aGlzLl8kaGFuZGxlQW55ID0gbnVsbDtcblx0ICB9XG5cblx0fSk7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZ2VuZXJhdG9yKSB7XG5cdCAgcmV0dXJuIG5ldyBTKGdlbmVyYXRvcik7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA2NiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cblx0dmFyIGluaGVyaXQgPSBfcmVxdWlyZS5pbmhlcml0O1xuXG5cdHZhciBBYnN0cmFjdFBvb2wgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYzKTtcblxuXHRmdW5jdGlvbiBQb29sKCkge1xuXHQgIEFic3RyYWN0UG9vbC5jYWxsKHRoaXMpO1xuXHR9XG5cblx0aW5oZXJpdChQb29sLCBBYnN0cmFjdFBvb2wsIHtcblxuXHQgIF9uYW1lOiAncG9vbCcsXG5cblx0ICBwbHVnOiBmdW5jdGlvbiBwbHVnKG9icykge1xuXHQgICAgdGhpcy5fYWRkKG9icyk7XG5cdCAgICByZXR1cm4gdGhpcztcblx0ICB9LFxuXG5cdCAgdW5wbHVnOiBmdW5jdGlvbiB1bnBsdWcob2JzKSB7XG5cdCAgICB0aGlzLl9yZW1vdmUob2JzKTtcblx0ICAgIHJldHVybiB0aGlzO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IFBvb2w7XG5cbi8qKiovIH0sXG4vKiA2NyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlLkVSUk9SO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUuRU5EO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUyLmluaGVyaXQ7XG5cblx0dmFyIEFic3RyYWN0UG9vbCA9IF9fd2VicGFja19yZXF1aXJlX18oNjMpO1xuXG5cdGZ1bmN0aW9uIEZsYXRNYXAoc291cmNlLCBmbiwgb3B0aW9ucykge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG5cblx0ICBBYnN0cmFjdFBvb2wuY2FsbCh0aGlzLCBvcHRpb25zKTtcblx0ICB0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG5cdCAgdGhpcy5fZm4gPSBmbjtcblx0ICB0aGlzLl9tYWluRW5kZWQgPSBmYWxzZTtcblx0ICB0aGlzLl9sYXN0Q3VycmVudCA9IG51bGw7XG5cdCAgdGhpcy5fJGhhbmRsZU1haW4gPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgIHJldHVybiBfdGhpcy5faGFuZGxlTWFpbihldmVudCk7XG5cdCAgfTtcblx0fVxuXG5cdGluaGVyaXQoRmxhdE1hcCwgQWJzdHJhY3RQb29sLCB7XG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgQWJzdHJhY3RQb29sLnByb3RvdHlwZS5fb25BY3RpdmF0aW9uLmNhbGwodGhpcyk7XG5cdCAgICBpZiAodGhpcy5fYWN0aXZlKSB7XG5cdCAgICAgIHRoaXMuX3NvdXJjZS5vbkFueSh0aGlzLl8kaGFuZGxlTWFpbik7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkRlYWN0aXZhdGlvbjogZnVuY3Rpb24gX29uRGVhY3RpdmF0aW9uKCkge1xuXHQgICAgQWJzdHJhY3RQb29sLnByb3RvdHlwZS5fb25EZWFjdGl2YXRpb24uY2FsbCh0aGlzKTtcblx0ICAgIHRoaXMuX3NvdXJjZS5vZmZBbnkodGhpcy5fJGhhbmRsZU1haW4pO1xuXHQgICAgdGhpcy5faGFkTm9FdlNpbmNlRGVhY3QgPSB0cnVlO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlTWFpbjogZnVuY3Rpb24gX2hhbmRsZU1haW4oZXZlbnQpIHtcblxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IFZBTFVFKSB7XG5cdCAgICAgIC8vIElzIGxhdGVzdCB2YWx1ZSBiZWZvcmUgZGVhY3RpdmF0aW9uIHN1cnZpdmVkLCBhbmQgbm93IGlzICdjdXJyZW50JyBvbiB0aGlzIGFjdGl2YXRpb24/XG5cdCAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gaGFuZGxlIHN1Y2ggdmFsdWVzLCB0byBwcmV2ZW50IHRvIGNvbnN0YW50bHkgYWRkXG5cdCAgICAgIC8vIHNhbWUgb2JzZXJ2YWxlIG9uIGVhY2ggYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gd2hlbiBvdXIgbWFpbiBzb3VyY2Vcblx0ICAgICAgLy8gaXMgYSBgS2VmaXIuY29uYXRhbnQoKWAgZm9yIGV4YW1wbGUuXG5cdCAgICAgIHZhciBzYW1lQ3VyciA9IHRoaXMuX2FjdGl2YXRpbmcgJiYgdGhpcy5faGFkTm9FdlNpbmNlRGVhY3QgJiYgdGhpcy5fbGFzdEN1cnJlbnQgPT09IGV2ZW50LnZhbHVlO1xuXHQgICAgICBpZiAoIXNhbWVDdXJyKSB7XG5cdCAgICAgICAgdGhpcy5fYWRkKGV2ZW50LnZhbHVlLCB0aGlzLl9mbik7XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5fbGFzdEN1cnJlbnQgPSBldmVudC52YWx1ZTtcblx0ICAgICAgdGhpcy5faGFkTm9FdlNpbmNlRGVhY3QgPSBmYWxzZTtcblx0ICAgIH1cblxuXHQgICAgaWYgKGV2ZW50LnR5cGUgPT09IEVSUk9SKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcihldmVudC52YWx1ZSk7XG5cdCAgICB9XG5cblx0ICAgIGlmIChldmVudC50eXBlID09PSBFTkQpIHtcblx0ICAgICAgaWYgKHRoaXMuX2lzRW1wdHkoKSkge1xuXHQgICAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICB0aGlzLl9tYWluRW5kZWQgPSB0cnVlO1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9vbkVtcHR5OiBmdW5jdGlvbiBfb25FbXB0eSgpIHtcblx0ICAgIGlmICh0aGlzLl9tYWluRW5kZWQpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfY2xlYXI6IGZ1bmN0aW9uIF9jbGVhcigpIHtcblx0ICAgIEFic3RyYWN0UG9vbC5wcm90b3R5cGUuX2NsZWFyLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9zb3VyY2UgPSBudWxsO1xuXHQgICAgdGhpcy5fbGFzdEN1cnJlbnQgPSBudWxsO1xuXHQgICAgdGhpcy5fJGhhbmRsZU1haW4gPSBudWxsO1xuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IEZsYXRNYXA7XG5cbi8qKiovIH0sXG4vKiA2OCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUuVkFMVUU7XG5cdHZhciBFUlJPUiA9IF9yZXF1aXJlLkVSUk9SO1xuXHR2YXIgRU5EID0gX3JlcXVpcmUuRU5EO1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG5cdHZhciBpbmhlcml0ID0gX3JlcXVpcmUyLmluaGVyaXQ7XG5cblx0dmFyIEZsYXRNYXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDY3KTtcblxuXHRmdW5jdGlvbiBGbGF0TWFwRXJyb3JzKHNvdXJjZSwgZm4pIHtcblx0ICBGbGF0TWFwLmNhbGwodGhpcywgc291cmNlLCBmbik7XG5cdH1cblxuXHRpbmhlcml0KEZsYXRNYXBFcnJvcnMsIEZsYXRNYXAsIHtcblxuXHQgIC8vIFNhbWUgYXMgaW4gRmxhdE1hcCwgb25seSBWQUxVRS9FUlJPUiBmbGlwcGVkXG5cdCAgX2hhbmRsZU1haW46IGZ1bmN0aW9uIF9oYW5kbGVNYWluKGV2ZW50KSB7XG5cblx0ICAgIGlmIChldmVudC50eXBlID09PSBFUlJPUikge1xuXHQgICAgICB2YXIgc2FtZUN1cnIgPSB0aGlzLl9hY3RpdmF0aW5nICYmIHRoaXMuX2hhZE5vRXZTaW5jZURlYWN0ICYmIHRoaXMuX2xhc3RDdXJyZW50ID09PSBldmVudC52YWx1ZTtcblx0ICAgICAgaWYgKCFzYW1lQ3Vycikge1xuXHQgICAgICAgIHRoaXMuX2FkZChldmVudC52YWx1ZSwgdGhpcy5fZm4pO1xuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuX2xhc3RDdXJyZW50ID0gZXZlbnQudmFsdWU7XG5cdCAgICAgIHRoaXMuX2hhZE5vRXZTaW5jZURlYWN0ID0gZmFsc2U7XG5cdCAgICB9XG5cblx0ICAgIGlmIChldmVudC50eXBlID09PSBWQUxVRSkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoZXZlbnQudmFsdWUpO1xuXHQgICAgfVxuXG5cdCAgICBpZiAoZXZlbnQudHlwZSA9PT0gRU5EKSB7XG5cdCAgICAgIGlmICh0aGlzLl9pc0VtcHR5KCkpIHtcblx0ICAgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5fbWFpbkVuZGVkID0gdHJ1ZTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgIH1cblxuXHR9KTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IEZsYXRNYXBFcnJvcnM7XG5cbi8qKiovIH0sXG4vKiA2OSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNzApO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUyLk5PVEhJTkc7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2hhbmRsZVByaW1hcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlWYWx1ZSh4KSB7XG5cdCAgICBpZiAodGhpcy5fbGFzdFNlY29uZGFyeSAhPT0gTk9USElORyAmJiB0aGlzLl9sYXN0U2Vjb25kYXJ5KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVNlY29uZGFyeUVuZDogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9sYXN0U2Vjb25kYXJ5ID09PSBOT1RISU5HIHx8ICF0aGlzLl9sYXN0U2Vjb25kYXJ5KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZmlsdGVyQnknLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2ZpbHRlckJ5JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmlsdGVyQnkocHJpbWFyeSwgc2Vjb25kYXJ5KSB7XG5cdCAgcmV0dXJuIG5ldyAocHJpbWFyeS5fb2ZTYW1lVHlwZShTLCBQKSkocHJpbWFyeSwgc2Vjb25kYXJ5KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDcwICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFN0cmVhbSA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cdHZhciBQcm9wZXJ0eSA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxuXHR2YXIgaW5oZXJpdCA9IF9yZXF1aXJlLmluaGVyaXQ7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIFZBTFVFID0gX3JlcXVpcmUyLlZBTFVFO1xuXHR2YXIgRVJST1IgPSBfcmVxdWlyZTIuRVJST1I7XG5cdHZhciBFTkQgPSBfcmVxdWlyZTIuRU5EO1xuXHR2YXIgTk9USElORyA9IF9yZXF1aXJlMi5OT1RISU5HO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZUNvbnN0cnVjdG9yKEJhc2VDbGFzcywgbmFtZSkge1xuXHQgIHJldHVybiBmdW5jdGlvbiBBbm9ueW1vdXNPYnNlcnZhYmxlKHByaW1hcnksIHNlY29uZGFyeSwgb3B0aW9ucykge1xuXHQgICAgdmFyIF90aGlzID0gdGhpcztcblxuXHQgICAgQmFzZUNsYXNzLmNhbGwodGhpcyk7XG5cdCAgICB0aGlzLl9wcmltYXJ5ID0gcHJpbWFyeTtcblx0ICAgIHRoaXMuX3NlY29uZGFyeSA9IHNlY29uZGFyeTtcblx0ICAgIHRoaXMuX25hbWUgPSBwcmltYXJ5Ll9uYW1lICsgJy4nICsgbmFtZTtcblx0ICAgIHRoaXMuX2xhc3RTZWNvbmRhcnkgPSBOT1RISU5HO1xuXHQgICAgdGhpcy5fJGhhbmRsZVNlY29uZGFyeUFueSA9IGZ1bmN0aW9uIChldmVudCkge1xuXHQgICAgICByZXR1cm4gX3RoaXMuX2hhbmRsZVNlY29uZGFyeUFueShldmVudCk7XG5cdCAgICB9O1xuXHQgICAgdGhpcy5fJGhhbmRsZVByaW1hcnlBbnkgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0ICAgICAgcmV0dXJuIF90aGlzLl9oYW5kbGVQcmltYXJ5QW55KGV2ZW50KTtcblx0ICAgIH07XG5cdCAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuXHQgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVDbGFzc01ldGhvZHMoQmFzZUNsYXNzKSB7XG5cdCAgcmV0dXJuIHtcblx0ICAgIF9pbml0OiBmdW5jdGlvbiBfaW5pdCgpIHt9LFxuXHQgICAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge30sXG5cblx0ICAgIF9oYW5kbGVQcmltYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5VmFsdWUoeCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9LFxuXHQgICAgX2hhbmRsZVByaW1hcnlFcnJvcjogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlFcnJvcih4KSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgIH0sXG5cdCAgICBfaGFuZGxlUHJpbWFyeUVuZDogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlFbmQoKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH0sXG5cblx0ICAgIF9oYW5kbGVTZWNvbmRhcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeVZhbHVlKHgpIHtcblx0ICAgICAgdGhpcy5fbGFzdFNlY29uZGFyeSA9IHg7XG5cdCAgICB9LFxuXHQgICAgX2hhbmRsZVNlY29uZGFyeUVycm9yOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5RXJyb3IoeCkge1xuXHQgICAgICB0aGlzLl9lbWl0RXJyb3IoeCk7XG5cdCAgICB9LFxuXHQgICAgX2hhbmRsZVNlY29uZGFyeUVuZDogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeUVuZCgpIHt9LFxuXG5cdCAgICBfaGFuZGxlUHJpbWFyeUFueTogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlBbnkoZXZlbnQpIHtcblx0ICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG5cdCAgICAgICAgY2FzZSBWQUxVRTpcblx0ICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVQcmltYXJ5VmFsdWUoZXZlbnQudmFsdWUpO1xuXHQgICAgICAgIGNhc2UgRVJST1I6XG5cdCAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlUHJpbWFyeUVycm9yKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgICBjYXNlIEVORDpcblx0ICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVQcmltYXJ5RW5kKGV2ZW50LnZhbHVlKTtcblx0ICAgICAgfVxuXHQgICAgfSxcblx0ICAgIF9oYW5kbGVTZWNvbmRhcnlBbnk6IGZ1bmN0aW9uIF9oYW5kbGVTZWNvbmRhcnlBbnkoZXZlbnQpIHtcblx0ICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG5cdCAgICAgICAgY2FzZSBWQUxVRTpcblx0ICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVTZWNvbmRhcnlWYWx1ZShldmVudC52YWx1ZSk7XG5cdCAgICAgICAgY2FzZSBFUlJPUjpcblx0ICAgICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVTZWNvbmRhcnlFcnJvcihldmVudC52YWx1ZSk7XG5cdCAgICAgICAgY2FzZSBFTkQ6XG5cdCAgICAgICAgICB0aGlzLl9oYW5kbGVTZWNvbmRhcnlFbmQoZXZlbnQudmFsdWUpO1xuXHQgICAgICAgICAgdGhpcy5fcmVtb3ZlU2Vjb25kYXJ5KCk7XG5cdCAgICAgIH1cblx0ICAgIH0sXG5cblx0ICAgIF9yZW1vdmVTZWNvbmRhcnk6IGZ1bmN0aW9uIF9yZW1vdmVTZWNvbmRhcnkoKSB7XG5cdCAgICAgIGlmICh0aGlzLl9zZWNvbmRhcnkgIT09IG51bGwpIHtcblx0ICAgICAgICB0aGlzLl9zZWNvbmRhcnkub2ZmQW55KHRoaXMuXyRoYW5kbGVTZWNvbmRhcnlBbnkpO1xuXHQgICAgICAgIHRoaXMuXyRoYW5kbGVTZWNvbmRhcnlBbnkgPSBudWxsO1xuXHQgICAgICAgIHRoaXMuX3NlY29uZGFyeSA9IG51bGw7XG5cdCAgICAgIH1cblx0ICAgIH0sXG5cblx0ICAgIF9vbkFjdGl2YXRpb246IGZ1bmN0aW9uIF9vbkFjdGl2YXRpb24oKSB7XG5cdCAgICAgIGlmICh0aGlzLl9zZWNvbmRhcnkgIT09IG51bGwpIHtcblx0ICAgICAgICB0aGlzLl9zZWNvbmRhcnkub25BbnkodGhpcy5fJGhhbmRsZVNlY29uZGFyeUFueSk7XG5cdCAgICAgIH1cblx0ICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuXHQgICAgICAgIHRoaXMuX3ByaW1hcnkub25BbnkodGhpcy5fJGhhbmRsZVByaW1hcnlBbnkpO1xuXHQgICAgICB9XG5cdCAgICB9LFxuXHQgICAgX29uRGVhY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25EZWFjdGl2YXRpb24oKSB7XG5cdCAgICAgIGlmICh0aGlzLl9zZWNvbmRhcnkgIT09IG51bGwpIHtcblx0ICAgICAgICB0aGlzLl9zZWNvbmRhcnkub2ZmQW55KHRoaXMuXyRoYW5kbGVTZWNvbmRhcnlBbnkpO1xuXHQgICAgICB9XG5cdCAgICAgIHRoaXMuX3ByaW1hcnkub2ZmQW55KHRoaXMuXyRoYW5kbGVQcmltYXJ5QW55KTtcblx0ICAgIH0sXG5cblx0ICAgIF9jbGVhcjogZnVuY3Rpb24gX2NsZWFyKCkge1xuXHQgICAgICBCYXNlQ2xhc3MucHJvdG90eXBlLl9jbGVhci5jYWxsKHRoaXMpO1xuXHQgICAgICB0aGlzLl9wcmltYXJ5ID0gbnVsbDtcblx0ICAgICAgdGhpcy5fc2Vjb25kYXJ5ID0gbnVsbDtcblx0ICAgICAgdGhpcy5fbGFzdFNlY29uZGFyeSA9IG51bGw7XG5cdCAgICAgIHRoaXMuXyRoYW5kbGVTZWNvbmRhcnlBbnkgPSBudWxsO1xuXHQgICAgICB0aGlzLl8kaGFuZGxlUHJpbWFyeUFueSA9IG51bGw7XG5cdCAgICAgIHRoaXMuX2ZyZWUoKTtcblx0ICAgIH1cblxuXHQgIH07XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVTdHJlYW0obmFtZSwgbWl4aW4pIHtcblx0ICB2YXIgUyA9IGNyZWF0ZUNvbnN0cnVjdG9yKFN0cmVhbSwgbmFtZSk7XG5cdCAgaW5oZXJpdChTLCBTdHJlYW0sIGNyZWF0ZUNsYXNzTWV0aG9kcyhTdHJlYW0pLCBtaXhpbik7XG5cdCAgcmV0dXJuIFM7XG5cdH1cblxuXHRmdW5jdGlvbiBjcmVhdGVQcm9wZXJ0eShuYW1lLCBtaXhpbikge1xuXHQgIHZhciBQID0gY3JlYXRlQ29uc3RydWN0b3IoUHJvcGVydHksIG5hbWUpO1xuXHQgIGluaGVyaXQoUCwgUHJvcGVydHksIGNyZWF0ZUNsYXNzTWV0aG9kcyhQcm9wZXJ0eSksIG1peGluKTtcblx0ICByZXR1cm4gUDtcblx0fVxuXG5cdG1vZHVsZS5leHBvcnRzID0geyBjcmVhdGVTdHJlYW06IGNyZWF0ZVN0cmVhbSwgY3JlYXRlUHJvcGVydHk6IGNyZWF0ZVByb3BlcnR5IH07XG5cbi8qKiovIH0sXG4vKiA3MSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBjb21iaW5lID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2MCk7XG5cblx0dmFyIGlkMiA9IGZ1bmN0aW9uIGlkMihfLCB4KSB7XG5cdCAgcmV0dXJuIHg7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzYW1wbGVkQnkocGFzc2l2ZSwgYWN0aXZlLCBjb21iaW5hdG9yKSB7XG5cdCAgdmFyIF9jb21iaW5hdG9yID0gY29tYmluYXRvciA/IGZ1bmN0aW9uIChhLCBiKSB7XG5cdCAgICByZXR1cm4gY29tYmluYXRvcihiLCBhKTtcblx0ICB9IDogaWQyO1xuXHQgIHJldHVybiBjb21iaW5lKFthY3RpdmVdLCBbcGFzc2l2ZV0sIF9jb21iaW5hdG9yKS5zZXROYW1lKHBhc3NpdmUsICdzYW1wbGVkQnknKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDcyICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MCk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cblx0dmFyIE5PVEhJTkcgPSBfcmVxdWlyZTIuTk9USElORztcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaGFuZGxlUHJpbWFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl9sYXN0U2Vjb25kYXJ5ICE9PSBOT1RISU5HKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh4KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVNlY29uZGFyeUVuZDogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9sYXN0U2Vjb25kYXJ5ID09PSBOT1RISU5HKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnc2tpcFVudGlsQnknLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ3NraXBVbnRpbEJ5JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2tpcFVudGlsQnkocHJpbWFyeSwgc2Vjb25kYXJ5KSB7XG5cdCAgcmV0dXJuIG5ldyAocHJpbWFyeS5fb2ZTYW1lVHlwZShTLCBQKSkocHJpbWFyeSwgc2Vjb25kYXJ5KTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDczICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3MCk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2hhbmRsZVNlY29uZGFyeVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlU2Vjb25kYXJ5VmFsdWUoKSB7XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3Rha2VVbnRpbEJ5JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd0YWtlVW50aWxCeScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRha2VVbnRpbEJ5KHByaW1hcnksIHNlY29uZGFyeSkge1xuXHQgIHJldHVybiBuZXcgKHByaW1hcnkuX29mU2FtZVR5cGUoUywgUCkpKHByaW1hcnksIHNlY29uZGFyeSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3NCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNzApO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9pbml0OiBmdW5jdGlvbiBfaW5pdCgpIHtcblx0ICAgIHZhciBfcmVmID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG5cblx0ICAgIHZhciBfcmVmJGZsdXNoT25FbmQgPSBfcmVmLmZsdXNoT25FbmQ7XG5cdCAgICB2YXIgZmx1c2hPbkVuZCA9IF9yZWYkZmx1c2hPbkVuZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IF9yZWYkZmx1c2hPbkVuZDtcblxuXHQgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgICAgdGhpcy5fZmx1c2hPbkVuZCA9IGZsdXNoT25FbmQ7XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2J1ZmYgPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfZmx1c2g6IGZ1bmN0aW9uIF9mbHVzaCgpIHtcblx0ICAgIGlmICh0aGlzLl9idWZmICE9PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuX2VtaXRWYWx1ZSh0aGlzLl9idWZmKTtcblx0ICAgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgICAgfVxuXHQgIH0sXG5cblx0ICBfaGFuZGxlUHJpbWFyeUVuZDogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlFbmQoKSB7XG5cdCAgICBpZiAodGhpcy5fZmx1c2hPbkVuZCkge1xuXHQgICAgICB0aGlzLl9mbHVzaCgpO1xuXHQgICAgfVxuXHQgICAgdGhpcy5fZW1pdEVuZCgpO1xuXHQgIH0sXG5cblx0ICBfb25BY3RpdmF0aW9uOiBmdW5jdGlvbiBfb25BY3RpdmF0aW9uKCkge1xuXHQgICAgdGhpcy5fcHJpbWFyeS5vbkFueSh0aGlzLl8kaGFuZGxlUHJpbWFyeUFueSk7XG5cdCAgICBpZiAodGhpcy5fYWxpdmUgJiYgdGhpcy5fc2Vjb25kYXJ5ICE9PSBudWxsKSB7XG5cdCAgICAgIHRoaXMuX3NlY29uZGFyeS5vbkFueSh0aGlzLl8kaGFuZGxlU2Vjb25kYXJ5QW55KTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVByaW1hcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVByaW1hcnlWYWx1ZSh4KSB7XG5cdCAgICB0aGlzLl9idWZmLnB1c2goeCk7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVTZWNvbmRhcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeVZhbHVlKCkge1xuXHQgICAgdGhpcy5fZmx1c2goKTtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVNlY29uZGFyeUVuZDogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeUVuZCgpIHtcblx0ICAgIGlmICghdGhpcy5fZmx1c2hPbkVuZCkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ2J1ZmZlckJ5JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdidWZmZXJCeScsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1ZmZlckJ5KHByaW1hcnksIHNlY29uZGFyeSwgb3B0aW9ucyAvKiBvcHRpb25hbCAqLykge1xuXHQgIHJldHVybiBuZXcgKHByaW1hcnkuX29mU2FtZVR5cGUoUywgUCkpKHByaW1hcnksIHNlY29uZGFyeSwgb3B0aW9ucyk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3NSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNzApO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG5cdHZhciBOT1RISU5HID0gX3JlcXVpcmUyLk5PVEhJTkc7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KCkge1xuXHQgICAgdmFyIF9yZWYgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcblxuXHQgICAgdmFyIF9yZWYkZmx1c2hPbkVuZCA9IF9yZWYuZmx1c2hPbkVuZDtcblx0ICAgIHZhciBmbHVzaE9uRW5kID0gX3JlZiRmbHVzaE9uRW5kID09PSB1bmRlZmluZWQgPyB0cnVlIDogX3JlZiRmbHVzaE9uRW5kO1xuXHQgICAgdmFyIF9yZWYkZmx1c2hPbkNoYW5nZSA9IF9yZWYuZmx1c2hPbkNoYW5nZTtcblx0ICAgIHZhciBmbHVzaE9uQ2hhbmdlID0gX3JlZiRmbHVzaE9uQ2hhbmdlID09PSB1bmRlZmluZWQgPyBmYWxzZSA6IF9yZWYkZmx1c2hPbkNoYW5nZTtcblxuXHQgICAgdGhpcy5fYnVmZiA9IFtdO1xuXHQgICAgdGhpcy5fZmx1c2hPbkVuZCA9IGZsdXNoT25FbmQ7XG5cdCAgICB0aGlzLl9mbHVzaE9uQ2hhbmdlID0gZmx1c2hPbkNoYW5nZTtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fYnVmZiA9IG51bGw7XG5cdCAgfSxcblxuXHQgIF9mbHVzaDogZnVuY3Rpb24gX2ZsdXNoKCkge1xuXHQgICAgaWYgKHRoaXMuX2J1ZmYgIT09IG51bGwpIHtcblx0ICAgICAgdGhpcy5fZW1pdFZhbHVlKHRoaXMuX2J1ZmYpO1xuXHQgICAgICB0aGlzLl9idWZmID0gW107XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVQcmltYXJ5RW5kOiBmdW5jdGlvbiBfaGFuZGxlUHJpbWFyeUVuZCgpIHtcblx0ICAgIGlmICh0aGlzLl9mbHVzaE9uRW5kKSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cdCAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVQcmltYXJ5VmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVQcmltYXJ5VmFsdWUoeCkge1xuXHQgICAgdGhpcy5fYnVmZi5wdXNoKHgpO1xuXHQgICAgaWYgKHRoaXMuX2xhc3RTZWNvbmRhcnkgIT09IE5PVEhJTkcgJiYgIXRoaXMuX2xhc3RTZWNvbmRhcnkpIHtcblx0ICAgICAgdGhpcy5fZmx1c2goKTtcblx0ICAgIH1cblx0ICB9LFxuXG5cdCAgX2hhbmRsZVNlY29uZGFyeUVuZDogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeUVuZCgpIHtcblx0ICAgIGlmICghdGhpcy5fZmx1c2hPbkVuZCAmJiAodGhpcy5fbGFzdFNlY29uZGFyeSA9PT0gTk9USElORyB8fCB0aGlzLl9sYXN0U2Vjb25kYXJ5KSkge1xuXHQgICAgICB0aGlzLl9lbWl0RW5kKCk7XG5cdCAgICB9XG5cdCAgfSxcblxuXHQgIF9oYW5kbGVTZWNvbmRhcnlWYWx1ZTogZnVuY3Rpb24gX2hhbmRsZVNlY29uZGFyeVZhbHVlKHgpIHtcblx0ICAgIGlmICh0aGlzLl9mbHVzaE9uQ2hhbmdlICYmICF4KSB7XG5cdCAgICAgIHRoaXMuX2ZsdXNoKCk7XG5cdCAgICB9XG5cblx0ICAgIC8vIGZyb20gZGVmYXVsdCBfaGFuZGxlU2Vjb25kYXJ5VmFsdWVcblx0ICAgIHRoaXMuX2xhc3RTZWNvbmRhcnkgPSB4O1xuXHQgIH1cblxuXHR9O1xuXG5cdHZhciBTID0gY3JlYXRlU3RyZWFtKCdidWZmZXJXaGlsZUJ5JywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCdidWZmZXJXaGlsZUJ5JywgbWl4aW4pO1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVmZmVyV2hpbGVCeShwcmltYXJ5LCBzZWNvbmRhcnksIG9wdGlvbnMgLyogb3B0aW9uYWwgKi8pIHtcblx0ICByZXR1cm4gbmV3IChwcmltYXJ5Ll9vZlNhbWVUeXBlKFMsIFApKShwcmltYXJ5LCBzZWNvbmRhcnksIG9wdGlvbnMpO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgbWVyZ2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYyKTtcblx0dmFyIG1hcCA9IF9fd2VicGFja19yZXF1aXJlX18oMzIpO1xuXHR2YXIgc2tpcER1cGxpY2F0ZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQwKTtcblx0dmFyIHRvUHJvcGVydHkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblxuXHR2YXIgZiA9IGZ1bmN0aW9uIGYoKSB7XG5cdCAgcmV0dXJuIGZhbHNlO1xuXHR9O1xuXHR2YXIgdCA9IGZ1bmN0aW9uIHQoKSB7XG5cdCAgcmV0dXJuIHRydWU7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhd2FpdGluZyhhLCBiKSB7XG5cdCAgdmFyIHJlc3VsdCA9IG1lcmdlKFttYXAoYSwgdCksIG1hcChiLCBmKV0pO1xuXHQgIHJlc3VsdCA9IHNraXBEdXBsaWNhdGVzKHJlc3VsdCk7XG5cdCAgcmVzdWx0ID0gdG9Qcm9wZXJ0eShyZXN1bHQsIGYpO1xuXHQgIHJldHVybiByZXN1bHQuc2V0TmFtZShhLCAnYXdhaXRpbmcnKTtcblx0fTtcblxuLyoqKi8gfSxcbi8qIDc3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyNSk7XG5cblx0dmFyIGNyZWF0ZVN0cmVhbSA9IF9yZXF1aXJlLmNyZWF0ZVN0cmVhbTtcblx0dmFyIGNyZWF0ZVByb3BlcnR5ID0gX3JlcXVpcmUuY3JlYXRlUHJvcGVydHk7XG5cblx0dmFyIG1peGluID0ge1xuXG5cdCAgX2luaXQ6IGZ1bmN0aW9uIF9pbml0KF9yZWYpIHtcblx0ICAgIHZhciBmbiA9IF9yZWYuZm47XG5cblx0ICAgIHRoaXMuX2ZuID0gZm47XG5cdCAgfSxcblxuXHQgIF9mcmVlOiBmdW5jdGlvbiBfZnJlZSgpIHtcblx0ICAgIHRoaXMuX2ZuID0gbnVsbDtcblx0ICB9LFxuXG5cdCAgX2hhbmRsZVZhbHVlOiBmdW5jdGlvbiBfaGFuZGxlVmFsdWUoeCkge1xuXHQgICAgdmFyIGZuID0gdGhpcy5fZm47XG5cdCAgICB2YXIgcmVzdWx0ID0gZm4oeCk7XG5cdCAgICBpZiAocmVzdWx0LmNvbnZlcnQpIHtcblx0ICAgICAgdGhpcy5fZW1pdEVycm9yKHJlc3VsdC5lcnJvcik7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUoeCk7XG5cdCAgICB9XG5cdCAgfVxuXG5cdH07XG5cblx0dmFyIFMgPSBjcmVhdGVTdHJlYW0oJ3ZhbHVlc1RvRXJyb3JzJywgbWl4aW4pO1xuXHR2YXIgUCA9IGNyZWF0ZVByb3BlcnR5KCd2YWx1ZXNUb0Vycm9ycycsIG1peGluKTtcblxuXHR2YXIgZGVmRm4gPSBmdW5jdGlvbiBkZWZGbih4KSB7XG5cdCAgcmV0dXJuIHsgY29udmVydDogdHJ1ZSwgZXJyb3I6IHggfTtcblx0fTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHZhbHVlc1RvRXJyb3JzKG9icykge1xuXHQgIHZhciBmbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IGRlZkZuIDogYXJndW1lbnRzWzFdO1xuXG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMsIHsgZm46IGZuIH0pO1xuXHR9O1xuXG4vKioqLyB9LFxuLyogNzggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTtcblxuXHR2YXIgY3JlYXRlU3RyZWFtID0gX3JlcXVpcmUuY3JlYXRlU3RyZWFtO1xuXHR2YXIgY3JlYXRlUHJvcGVydHkgPSBfcmVxdWlyZS5jcmVhdGVQcm9wZXJ0eTtcblxuXHR2YXIgbWl4aW4gPSB7XG5cblx0ICBfaW5pdDogZnVuY3Rpb24gX2luaXQoX3JlZikge1xuXHQgICAgdmFyIGZuID0gX3JlZi5mbjtcblxuXHQgICAgdGhpcy5fZm4gPSBmbjtcblx0ICB9LFxuXG5cdCAgX2ZyZWU6IGZ1bmN0aW9uIF9mcmVlKCkge1xuXHQgICAgdGhpcy5fZm4gPSBudWxsO1xuXHQgIH0sXG5cblx0ICBfaGFuZGxlRXJyb3I6IGZ1bmN0aW9uIF9oYW5kbGVFcnJvcih4KSB7XG5cdCAgICB2YXIgZm4gPSB0aGlzLl9mbjtcblx0ICAgIHZhciByZXN1bHQgPSBmbih4KTtcblx0ICAgIGlmIChyZXN1bHQuY29udmVydCkge1xuXHQgICAgICB0aGlzLl9lbWl0VmFsdWUocmVzdWx0LnZhbHVlKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgIH1cblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZXJyb3JzVG9WYWx1ZXMnLCBtaXhpbik7XG5cdHZhciBQID0gY3JlYXRlUHJvcGVydHkoJ2Vycm9yc1RvVmFsdWVzJywgbWl4aW4pO1xuXG5cdHZhciBkZWZGbiA9IGZ1bmN0aW9uIGRlZkZuKHgpIHtcblx0ICByZXR1cm4geyBjb252ZXJ0OiB0cnVlLCB2YWx1ZTogeCB9O1xuXHR9O1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXJyb3JzVG9WYWx1ZXMob2JzKSB7XG5cdCAgdmFyIGZuID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gZGVmRm4gOiBhcmd1bWVudHNbMV07XG5cblx0ICByZXR1cm4gbmV3IChvYnMuX29mU2FtZVR5cGUoUywgUCkpKG9icywgeyBmbjogZm4gfSk7XG5cdH07XG5cbi8qKiovIH0sXG4vKiA3OSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpO1xuXG5cdHZhciBjcmVhdGVTdHJlYW0gPSBfcmVxdWlyZS5jcmVhdGVTdHJlYW07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eSA9IF9yZXF1aXJlLmNyZWF0ZVByb3BlcnR5O1xuXG5cdHZhciBtaXhpbiA9IHtcblxuXHQgIF9oYW5kbGVFcnJvcjogZnVuY3Rpb24gX2hhbmRsZUVycm9yKHgpIHtcblx0ICAgIHRoaXMuX2VtaXRFcnJvcih4KTtcblx0ICAgIHRoaXMuX2VtaXRFbmQoKTtcblx0ICB9XG5cblx0fTtcblxuXHR2YXIgUyA9IGNyZWF0ZVN0cmVhbSgnZW5kT25FcnJvcicsIG1peGluKTtcblx0dmFyIFAgPSBjcmVhdGVQcm9wZXJ0eSgnZW5kT25FcnJvcicsIG1peGluKTtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuZE9uRXJyb3Iob2JzKSB7XG5cdCAgcmV0dXJuIG5ldyAob2JzLl9vZlNhbWVUeXBlKFMsIFApKShvYnMpO1xuXHR9O1xuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34va2VmaXIvZGlzdC9rZWZpci5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIihmdW5jdGlvbigpIHtcbiAgdmFyIEFqYXhNb25pdG9yLCBCYXIsIERvY3VtZW50TW9uaXRvciwgRWxlbWVudE1vbml0b3IsIEVsZW1lbnRUcmFja2VyLCBFdmVudExhZ01vbml0b3IsIEV2ZW50ZWQsIEV2ZW50cywgTm9UYXJnZXRFcnJvciwgUGFjZSwgUmVxdWVzdEludGVyY2VwdCwgU09VUkNFX0tFWVMsIFNjYWxlciwgU29ja2V0UmVxdWVzdFRyYWNrZXIsIFhIUlJlcXVlc3RUcmFja2VyLCBhbmltYXRpb24sIGF2Z0FtcGxpdHVkZSwgYmFyLCBjYW5jZWxBbmltYXRpb24sIGNhbmNlbEFuaW1hdGlvbkZyYW1lLCBkZWZhdWx0T3B0aW9ucywgZXh0ZW5kLCBleHRlbmROYXRpdmUsIGdldEZyb21ET00sIGdldEludGVyY2VwdCwgaGFuZGxlUHVzaFN0YXRlLCBpZ25vcmVTdGFjaywgaW5pdCwgbm93LCBvcHRpb25zLCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsIHJlc3VsdCwgcnVuQW5pbWF0aW9uLCBzY2FsZXJzLCBzaG91bGRJZ25vcmVVUkwsIHNob3VsZFRyYWNrLCBzb3VyY2UsIHNvdXJjZXMsIHVuaVNjYWxlciwgX1dlYlNvY2tldCwgX1hEb21haW5SZXF1ZXN0LCBfWE1MSHR0cFJlcXVlc3QsIF9pLCBfaW50ZXJjZXB0LCBfbGVuLCBfcHVzaFN0YXRlLCBfcmVmLCBfcmVmMSwgX3JlcGxhY2VTdGF0ZSxcbiAgICBfX3NsaWNlID0gW10uc2xpY2UsXG4gICAgX19oYXNQcm9wID0ge30uaGFzT3duUHJvcGVydHksXG4gICAgX19leHRlbmRzID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCkgeyBmb3IgKHZhciBrZXkgaW4gcGFyZW50KSB7IGlmIChfX2hhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgX19pbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cbiAgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgY2F0Y2h1cFRpbWU6IDEwMCxcbiAgICBpbml0aWFsUmF0ZTogLjAzLFxuICAgIG1pblRpbWU6IDI1MCxcbiAgICBnaG9zdFRpbWU6IDEwMCxcbiAgICBtYXhQcm9ncmVzc1BlckZyYW1lOiAyMCxcbiAgICBlYXNlRmFjdG9yOiAxLjI1LFxuICAgIHN0YXJ0T25QYWdlTG9hZDogdHJ1ZSxcbiAgICByZXN0YXJ0T25QdXNoU3RhdGU6IHRydWUsXG4gICAgcmVzdGFydE9uUmVxdWVzdEFmdGVyOiA1MDAsXG4gICAgdGFyZ2V0OiAnYm9keScsXG4gICAgZWxlbWVudHM6IHtcbiAgICAgIGNoZWNrSW50ZXJ2YWw6IDEwMCxcbiAgICAgIHNlbGVjdG9yczogWydib2R5J11cbiAgICB9LFxuICAgIGV2ZW50TGFnOiB7XG4gICAgICBtaW5TYW1wbGVzOiAxMCxcbiAgICAgIHNhbXBsZUNvdW50OiAzLFxuICAgICAgbGFnVGhyZXNob2xkOiAzXG4gICAgfSxcbiAgICBhamF4OiB7XG4gICAgICB0cmFja01ldGhvZHM6IFsnR0VUJ10sXG4gICAgICB0cmFja1dlYlNvY2tldHM6IHRydWUsXG4gICAgICBpZ25vcmVVUkxzOiBbXVxuICAgIH1cbiAgfTtcblxuICBub3cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3JlZjtcbiAgICByZXR1cm4gKF9yZWYgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwgPyB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ID09PSBcImZ1bmN0aW9uXCIgPyBwZXJmb3JtYW5jZS5ub3coKSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCA/IF9yZWYgOiArKG5ldyBEYXRlKTtcbiAgfTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lO1xuXG4gIGlmIChyZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT0gbnVsbCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChmbiwgNTApO1xuICAgIH07XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG4gICAgfTtcbiAgfVxuXG4gIHJ1bkFuaW1hdGlvbiA9IGZ1bmN0aW9uKGZuKSB7XG4gICAgdmFyIGxhc3QsIHRpY2s7XG4gICAgbGFzdCA9IG5vdygpO1xuICAgIHRpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBkaWZmO1xuICAgICAgZGlmZiA9IG5vdygpIC0gbGFzdDtcbiAgICAgIGlmIChkaWZmID49IDMzKSB7XG4gICAgICAgIGxhc3QgPSBub3coKTtcbiAgICAgICAgcmV0dXJuIGZuKGRpZmYsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQodGljaywgMzMgLSBkaWZmKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aWNrKCk7XG4gIH07XG5cbiAgcmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGtleSwgb2JqO1xuICAgIG9iaiA9IGFyZ3VtZW50c1swXSwga2V5ID0gYXJndW1lbnRzWzFdLCBhcmdzID0gMyA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiBbXTtcbiAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gb2JqW2tleV0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH1cbiAgfTtcblxuICBleHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5LCBvdXQsIHNvdXJjZSwgc291cmNlcywgdmFsLCBfaSwgX2xlbjtcbiAgICBvdXQgPSBhcmd1bWVudHNbMF0sIHNvdXJjZXMgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gc291cmNlcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgc291cmNlID0gc291cmNlc1tfaV07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgIGlmICghX19oYXNQcm9wLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICB2YWwgPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICBpZiAoKG91dFtrZXldICE9IG51bGwpICYmIHR5cGVvZiBvdXRba2V5XSA9PT0gJ29iamVjdCcgJiYgKHZhbCAhPSBudWxsKSAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgZXh0ZW5kKG91dFtrZXldLCB2YWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRba2V5XSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfTtcblxuICBhdmdBbXBsaXR1ZGUgPSBmdW5jdGlvbihhcnIpIHtcbiAgICB2YXIgY291bnQsIHN1bSwgdiwgX2ksIF9sZW47XG4gICAgc3VtID0gY291bnQgPSAwO1xuICAgIGZvciAoX2kgPSAwLCBfbGVuID0gYXJyLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICB2ID0gYXJyW19pXTtcbiAgICAgIHN1bSArPSBNYXRoLmFicyh2KTtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICAgIHJldHVybiBzdW0gLyBjb3VudDtcbiAgfTtcblxuICBnZXRGcm9tRE9NID0gZnVuY3Rpb24oa2V5LCBqc29uKSB7XG4gICAgdmFyIGRhdGEsIGUsIGVsO1xuICAgIGlmIChrZXkgPT0gbnVsbCkge1xuICAgICAga2V5ID0gJ29wdGlvbnMnO1xuICAgIH1cbiAgICBpZiAoanNvbiA9PSBudWxsKSB7XG4gICAgICBqc29uID0gdHJ1ZTtcbiAgICB9XG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtcGFjZS1cIiArIGtleSArIFwiXVwiKTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRhdGEgPSBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhY2UtXCIgKyBrZXkpO1xuICAgIGlmICghanNvbikge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcbiAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgIGUgPSBfZXJyb3I7XG4gICAgICByZXR1cm4gdHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uc29sZSAhPT0gbnVsbCA/IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGlubGluZSBwYWNlIG9wdGlvbnNcIiwgZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuXG4gIEV2ZW50ZWQgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRlZCgpIHt9XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyLCBjdHgsIG9uY2UpIHtcbiAgICAgIHZhciBfYmFzZTtcbiAgICAgIGlmIChvbmNlID09IG51bGwpIHtcbiAgICAgICAgb25jZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYmluZGluZ3MgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmJpbmRpbmdzID0ge307XG4gICAgICB9XG4gICAgICBpZiAoKF9iYXNlID0gdGhpcy5iaW5kaW5ncylbZXZlbnRdID09IG51bGwpIHtcbiAgICAgICAgX2Jhc2VbZXZlbnRdID0gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5iaW5kaW5nc1tldmVudF0ucHVzaCh7XG4gICAgICAgIGhhbmRsZXI6IGhhbmRsZXIsXG4gICAgICAgIGN0eDogY3R4LFxuICAgICAgICBvbmNlOiBvbmNlXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgRXZlbnRlZC5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyLCBjdHgpIHtcbiAgICAgIHJldHVybiB0aGlzLm9uKGV2ZW50LCBoYW5kbGVyLCBjdHgsIHRydWUpO1xuICAgIH07XG5cbiAgICBFdmVudGVkLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudCwgaGFuZGxlcikge1xuICAgICAgdmFyIGksIF9yZWYsIF9yZXN1bHRzO1xuICAgICAgaWYgKCgoX3JlZiA9IHRoaXMuYmluZGluZ3MpICE9IG51bGwgPyBfcmVmW2V2ZW50XSA6IHZvaWQgMCkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaGFuZGxlciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkZWxldGUgdGhpcy5iaW5kaW5nc1tldmVudF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLmJpbmRpbmdzW2V2ZW50XS5sZW5ndGgpIHtcbiAgICAgICAgICBpZiAodGhpcy5iaW5kaW5nc1tldmVudF1baV0uaGFuZGxlciA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh0aGlzLmJpbmRpbmdzW2V2ZW50XS5zcGxpY2UoaSwgMSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKGkrKyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRXZlbnRlZC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MsIGN0eCwgZXZlbnQsIGhhbmRsZXIsIGksIG9uY2UsIF9yZWYsIF9yZWYxLCBfcmVzdWx0cztcbiAgICAgIGV2ZW50ID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICAgIGlmICgoX3JlZiA9IHRoaXMuYmluZGluZ3MpICE9IG51bGwgPyBfcmVmW2V2ZW50XSA6IHZvaWQgMCkge1xuICAgICAgICBpID0gMDtcbiAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLmJpbmRpbmdzW2V2ZW50XS5sZW5ndGgpIHtcbiAgICAgICAgICBfcmVmMSA9IHRoaXMuYmluZGluZ3NbZXZlbnRdW2ldLCBoYW5kbGVyID0gX3JlZjEuaGFuZGxlciwgY3R4ID0gX3JlZjEuY3R4LCBvbmNlID0gX3JlZjEub25jZTtcbiAgICAgICAgICBoYW5kbGVyLmFwcGx5KGN0eCAhPSBudWxsID8gY3R4IDogdGhpcywgYXJncyk7XG4gICAgICAgICAgaWYgKG9uY2UpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godGhpcy5iaW5kaW5nc1tldmVudF0uc3BsaWNlKGksIDEpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChpKyspO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBFdmVudGVkO1xuXG4gIH0pKCk7XG5cbiAgUGFjZSA9IHdpbmRvdy5QYWNlIHx8IHt9O1xuXG4gIHdpbmRvdy5QYWNlID0gUGFjZTtcblxuICBleHRlbmQoUGFjZSwgRXZlbnRlZC5wcm90b3R5cGUpO1xuXG4gIG9wdGlvbnMgPSBQYWNlLm9wdGlvbnMgPSBleHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCB3aW5kb3cucGFjZU9wdGlvbnMsIGdldEZyb21ET00oKSk7XG5cbiAgX3JlZiA9IFsnYWpheCcsICdkb2N1bWVudCcsICdldmVudExhZycsICdlbGVtZW50cyddO1xuICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICBzb3VyY2UgPSBfcmVmW19pXTtcbiAgICBpZiAob3B0aW9uc1tzb3VyY2VdID09PSB0cnVlKSB7XG4gICAgICBvcHRpb25zW3NvdXJjZV0gPSBkZWZhdWx0T3B0aW9uc1tzb3VyY2VdO1xuICAgIH1cbiAgfVxuXG4gIE5vVGFyZ2V0RXJyb3IgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE5vVGFyZ2V0RXJyb3IsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBOb1RhcmdldEVycm9yKCkge1xuICAgICAgX3JlZjEgPSBOb1RhcmdldEVycm9yLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIF9yZWYxO1xuICAgIH1cblxuICAgIHJldHVybiBOb1RhcmdldEVycm9yO1xuXG4gIH0pKEVycm9yKTtcblxuICBCYXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gQmFyKCkge1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgfVxuXG4gICAgQmFyLnByb3RvdHlwZS5nZXRFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGFyZ2V0RWxlbWVudDtcbiAgICAgIGlmICh0aGlzLmVsID09IG51bGwpIHtcbiAgICAgICAgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICBpZiAoIXRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgTm9UYXJnZXRFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWwuY2xhc3NOYW1lID0gXCJwYWNlIHBhY2UtYWN0aXZlXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lID0gZG9jdW1lbnQuYm9keS5jbGFzc05hbWUucmVwbGFjZSgvcGFjZS1kb25lL2csICcnKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc05hbWUgKz0gJyBwYWNlLXJ1bm5pbmcnO1xuICAgICAgICB0aGlzLmVsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwicGFjZS1wcm9ncmVzc1wiPlxcbiAgPGRpdiBjbGFzcz1cInBhY2UtcHJvZ3Jlc3MtaW5uZXJcIj48L2Rpdj5cXG48L2Rpdj5cXG48ZGl2IGNsYXNzPVwicGFjZS1hY3Rpdml0eVwiPjwvZGl2Pic7XG4gICAgICAgIGlmICh0YXJnZXRFbGVtZW50LmZpcnN0Q2hpbGQgIT0gbnVsbCkge1xuICAgICAgICAgIHRhcmdldEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZWwsIHRhcmdldEVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWw7XG4gICAgfTtcblxuICAgIEJhci5wcm90b3R5cGUuZmluaXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWw7XG4gICAgICBlbCA9IHRoaXMuZ2V0RWxlbWVudCgpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoJ3BhY2UtYWN0aXZlJywgJycpO1xuICAgICAgZWwuY2xhc3NOYW1lICs9ICcgcGFjZS1pbmFjdGl2ZSc7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSA9IGRvY3VtZW50LmJvZHkuY2xhc3NOYW1lLnJlcGxhY2UoJ3BhY2UtcnVubmluZycsICcnKTtcbiAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmNsYXNzTmFtZSArPSAnIHBhY2UtZG9uZSc7XG4gICAgfTtcblxuICAgIEJhci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24ocHJvZykge1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IHByb2c7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZ2V0RWxlbWVudCgpKTtcbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBOb1RhcmdldEVycm9yID0gX2Vycm9yO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZWwgPSB2b2lkIDA7XG4gICAgfTtcblxuICAgIEJhci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZWwsIGtleSwgcHJvZ3Jlc3NTdHIsIHRyYW5zZm9ybSwgX2osIF9sZW4xLCBfcmVmMjtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMudGFyZ2V0KSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGVsID0gdGhpcy5nZXRFbGVtZW50KCk7XG4gICAgICB0cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKFwiICsgdGhpcy5wcm9ncmVzcyArIFwiJSwgMCwgMClcIjtcbiAgICAgIF9yZWYyID0gWyd3ZWJraXRUcmFuc2Zvcm0nLCAnbXNUcmFuc2Zvcm0nLCAndHJhbnNmb3JtJ107XG4gICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAga2V5ID0gX3JlZjJbX2pdO1xuICAgICAgICBlbC5jaGlsZHJlblswXS5zdHlsZVtrZXldID0gdHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmxhc3RSZW5kZXJlZFByb2dyZXNzIHx8IHRoaXMubGFzdFJlbmRlcmVkUHJvZ3Jlc3MgfCAwICE9PSB0aGlzLnByb2dyZXNzIHwgMCkge1xuICAgICAgICBlbC5jaGlsZHJlblswXS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZ3Jlc3MtdGV4dCcsIFwiXCIgKyAodGhpcy5wcm9ncmVzcyB8IDApICsgXCIlXCIpO1xuICAgICAgICBpZiAodGhpcy5wcm9ncmVzcyA+PSAxMDApIHtcbiAgICAgICAgICBwcm9ncmVzc1N0ciA9ICc5OSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvZ3Jlc3NTdHIgPSB0aGlzLnByb2dyZXNzIDwgMTAgPyBcIjBcIiA6IFwiXCI7XG4gICAgICAgICAgcHJvZ3Jlc3NTdHIgKz0gdGhpcy5wcm9ncmVzcyB8IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWwuY2hpbGRyZW5bMF0uc2V0QXR0cmlidXRlKCdkYXRhLXByb2dyZXNzJywgXCJcIiArIHByb2dyZXNzU3RyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmxhc3RSZW5kZXJlZFByb2dyZXNzID0gdGhpcy5wcm9ncmVzcztcbiAgICB9O1xuXG4gICAgQmFyLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9ncmVzcyA+PSAxMDA7XG4gICAgfTtcblxuICAgIHJldHVybiBCYXI7XG5cbiAgfSkoKTtcblxuICBFdmVudHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRzKCkge1xuICAgICAgdGhpcy5iaW5kaW5ncyA9IHt9O1xuICAgIH1cblxuICAgIEV2ZW50cy5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuICAgICAgdmFyIGJpbmRpbmcsIF9qLCBfbGVuMSwgX3JlZjIsIF9yZXN1bHRzO1xuICAgICAgaWYgKHRoaXMuYmluZGluZ3NbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICBfcmVmMiA9IHRoaXMuYmluZGluZ3NbbmFtZV07XG4gICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgICAgIGJpbmRpbmcgPSBfcmVmMltfal07XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaChiaW5kaW5nLmNhbGwodGhpcywgdmFsKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBFdmVudHMucHJvdG90eXBlLm9uID0gZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgICAgIHZhciBfYmFzZTtcbiAgICAgIGlmICgoX2Jhc2UgPSB0aGlzLmJpbmRpbmdzKVtuYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIF9iYXNlW25hbWVdID0gW107XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5iaW5kaW5nc1tuYW1lXS5wdXNoKGZuKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50cztcblxuICB9KSgpO1xuXG4gIF9YTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdDtcblxuICBfWERvbWFpblJlcXVlc3QgPSB3aW5kb3cuWERvbWFpblJlcXVlc3Q7XG5cbiAgX1dlYlNvY2tldCA9IHdpbmRvdy5XZWJTb2NrZXQ7XG5cbiAgZXh0ZW5kTmF0aXZlID0gZnVuY3Rpb24odG8sIGZyb20pIHtcbiAgICB2YXIgZSwga2V5LCBfcmVzdWx0cztcbiAgICBfcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoa2V5IGluIGZyb20ucHJvdG90eXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoKHRvW2tleV0gPT0gbnVsbCkgJiYgdHlwZW9mIGZyb21ba2V5XSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmRlZmluZVByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0bywga2V5LCB7XG4gICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb20ucHJvdG90eXBlW2tleV07XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHRvW2tleV0gPSBmcm9tLnByb3RvdHlwZVtrZXldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3Jlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgZSA9IF9lcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9yZXN1bHRzO1xuICB9O1xuXG4gIGlnbm9yZVN0YWNrID0gW107XG5cbiAgUGFjZS5pZ25vcmUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZm4sIHJldDtcbiAgICBmbiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWdub3JlU3RhY2sudW5zaGlmdCgnaWdub3JlJyk7XG4gICAgcmV0ID0gZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgaWdub3JlU3RhY2suc2hpZnQoKTtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIFBhY2UudHJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZm4sIHJldDtcbiAgICBmbiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWdub3JlU3RhY2sudW5zaGlmdCgndHJhY2snKTtcbiAgICByZXQgPSBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICBpZ25vcmVTdGFjay5zaGlmdCgpO1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgc2hvdWxkVHJhY2sgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgX3JlZjI7XG4gICAgaWYgKG1ldGhvZCA9PSBudWxsKSB7XG4gICAgICBtZXRob2QgPSAnR0VUJztcbiAgICB9XG4gICAgaWYgKGlnbm9yZVN0YWNrWzBdID09PSAndHJhY2snKSB7XG4gICAgICByZXR1cm4gJ2ZvcmNlJztcbiAgICB9XG4gICAgaWYgKCFpZ25vcmVTdGFjay5sZW5ndGggJiYgb3B0aW9ucy5hamF4KSB7XG4gICAgICBpZiAobWV0aG9kID09PSAnc29ja2V0JyAmJiBvcHRpb25zLmFqYXgudHJhY2tXZWJTb2NrZXRzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChfcmVmMiA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpLCBfX2luZGV4T2YuY2FsbChvcHRpb25zLmFqYXgudHJhY2tNZXRob2RzLCBfcmVmMikgPj0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIFJlcXVlc3RJbnRlcmNlcHQgPSAoZnVuY3Rpb24oX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJlcXVlc3RJbnRlcmNlcHQsIF9zdXBlcik7XG5cbiAgICBmdW5jdGlvbiBSZXF1ZXN0SW50ZXJjZXB0KCkge1xuICAgICAgdmFyIG1vbml0b3JYSFIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIFJlcXVlc3RJbnRlcmNlcHQuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBtb25pdG9yWEhSID0gZnVuY3Rpb24ocmVxKSB7XG4gICAgICAgIHZhciBfb3BlbjtcbiAgICAgICAgX29wZW4gPSByZXEub3BlbjtcbiAgICAgICAgcmV0dXJuIHJlcS5vcGVuID0gZnVuY3Rpb24odHlwZSwgdXJsLCBhc3luYykge1xuICAgICAgICAgIGlmIChzaG91bGRUcmFjayh0eXBlKSkge1xuICAgICAgICAgICAgX3RoaXMudHJpZ2dlcigncmVxdWVzdCcsIHtcbiAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBfb3Blbi5hcHBseShyZXEsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgICAgd2luZG93LlhNTEh0dHBSZXF1ZXN0ID0gZnVuY3Rpb24oZmxhZ3MpIHtcbiAgICAgICAgdmFyIHJlcTtcbiAgICAgICAgcmVxID0gbmV3IF9YTUxIdHRwUmVxdWVzdChmbGFncyk7XG4gICAgICAgIG1vbml0b3JYSFIocmVxKTtcbiAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgIH07XG4gICAgICB0cnkge1xuICAgICAgICBleHRlbmROYXRpdmUod2luZG93LlhNTEh0dHBSZXF1ZXN0LCBfWE1MSHR0cFJlcXVlc3QpO1xuICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7fVxuICAgICAgaWYgKF9YRG9tYWluUmVxdWVzdCAhPSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciByZXE7XG4gICAgICAgICAgcmVxID0gbmV3IF9YRG9tYWluUmVxdWVzdDtcbiAgICAgICAgICBtb25pdG9yWEhSKHJlcSk7XG4gICAgICAgICAgcmV0dXJuIHJlcTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBleHRlbmROYXRpdmUod2luZG93LlhEb21haW5SZXF1ZXN0LCBfWERvbWFpblJlcXVlc3QpO1xuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHt9XG4gICAgICB9XG4gICAgICBpZiAoKF9XZWJTb2NrZXQgIT0gbnVsbCkgJiYgb3B0aW9ucy5hamF4LnRyYWNrV2ViU29ja2V0cykge1xuICAgICAgICB3aW5kb3cuV2ViU29ja2V0ID0gZnVuY3Rpb24odXJsLCBwcm90b2NvbHMpIHtcbiAgICAgICAgICB2YXIgcmVxO1xuICAgICAgICAgIGlmIChwcm90b2NvbHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVxID0gbmV3IF9XZWJTb2NrZXQodXJsLCBwcm90b2NvbHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXEgPSBuZXcgX1dlYlNvY2tldCh1cmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2hvdWxkVHJhY2soJ3NvY2tldCcpKSB7XG4gICAgICAgICAgICBfdGhpcy50cmlnZ2VyKCdyZXF1ZXN0Jywge1xuICAgICAgICAgICAgICB0eXBlOiAnc29ja2V0JyxcbiAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgIHByb3RvY29sczogcHJvdG9jb2xzLFxuICAgICAgICAgICAgICByZXF1ZXN0OiByZXFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICB9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGV4dGVuZE5hdGl2ZSh3aW5kb3cuV2ViU29ja2V0LCBfV2ViU29ja2V0KTtcbiAgICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7fVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBSZXF1ZXN0SW50ZXJjZXB0O1xuXG4gIH0pKEV2ZW50cyk7XG5cbiAgX2ludGVyY2VwdCA9IG51bGw7XG5cbiAgZ2V0SW50ZXJjZXB0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKF9pbnRlcmNlcHQgPT0gbnVsbCkge1xuICAgICAgX2ludGVyY2VwdCA9IG5ldyBSZXF1ZXN0SW50ZXJjZXB0O1xuICAgIH1cbiAgICByZXR1cm4gX2ludGVyY2VwdDtcbiAgfTtcblxuICBzaG91bGRJZ25vcmVVUkwgPSBmdW5jdGlvbih1cmwpIHtcbiAgICB2YXIgcGF0dGVybiwgX2osIF9sZW4xLCBfcmVmMjtcbiAgICBfcmVmMiA9IG9wdGlvbnMuYWpheC5pZ25vcmVVUkxzO1xuICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xuICAgICAgcGF0dGVybiA9IF9yZWYyW19qXTtcbiAgICAgIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKHBhdHRlcm4pICE9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocGF0dGVybi50ZXN0KHVybCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgZ2V0SW50ZXJjZXB0KCkub24oJ3JlcXVlc3QnLCBmdW5jdGlvbihfYXJnKSB7XG4gICAgdmFyIGFmdGVyLCBhcmdzLCByZXF1ZXN0LCB0eXBlLCB1cmw7XG4gICAgdHlwZSA9IF9hcmcudHlwZSwgcmVxdWVzdCA9IF9hcmcucmVxdWVzdCwgdXJsID0gX2FyZy51cmw7XG4gICAgaWYgKHNob3VsZElnbm9yZVVSTCh1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghUGFjZS5ydW5uaW5nICYmIChvcHRpb25zLnJlc3RhcnRPblJlcXVlc3RBZnRlciAhPT0gZmFsc2UgfHwgc2hvdWxkVHJhY2sodHlwZSkgPT09ICdmb3JjZScpKSB7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgYWZ0ZXIgPSBvcHRpb25zLnJlc3RhcnRPblJlcXVlc3RBZnRlciB8fCAwO1xuICAgICAgaWYgKHR5cGVvZiBhZnRlciA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGFmdGVyID0gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3RpbGxBY3RpdmUsIF9qLCBfbGVuMSwgX3JlZjIsIF9yZWYzLCBfcmVzdWx0cztcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzb2NrZXQnKSB7XG4gICAgICAgICAgc3RpbGxBY3RpdmUgPSByZXF1ZXN0LnJlYWR5U3RhdGUgPCAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0aWxsQWN0aXZlID0gKDAgPCAoX3JlZjIgPSByZXF1ZXN0LnJlYWR5U3RhdGUpICYmIF9yZWYyIDwgNCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0aWxsQWN0aXZlKSB7XG4gICAgICAgICAgUGFjZS5yZXN0YXJ0KCk7XG4gICAgICAgICAgX3JlZjMgPSBQYWNlLnNvdXJjZXM7XG4gICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMy5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgICAgIHNvdXJjZSA9IF9yZWYzW19qXTtcbiAgICAgICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBBamF4TW9uaXRvcikge1xuICAgICAgICAgICAgICBzb3VyY2Uud2F0Y2guYXBwbHkoc291cmNlLCBhcmdzKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgfVxuICAgICAgfSwgYWZ0ZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgQWpheE1vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gQWpheE1vbml0b3IoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgICAgZ2V0SW50ZXJjZXB0KCkub24oJ3JlcXVlc3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLndhdGNoLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgQWpheE1vbml0b3IucHJvdG90eXBlLndhdGNoID0gZnVuY3Rpb24oX2FyZykge1xuICAgICAgdmFyIHJlcXVlc3QsIHRyYWNrZXIsIHR5cGUsIHVybDtcbiAgICAgIHR5cGUgPSBfYXJnLnR5cGUsIHJlcXVlc3QgPSBfYXJnLnJlcXVlc3QsIHVybCA9IF9hcmcudXJsO1xuICAgICAgaWYgKHNob3VsZElnbm9yZVVSTCh1cmwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSAnc29ja2V0Jykge1xuICAgICAgICB0cmFja2VyID0gbmV3IFNvY2tldFJlcXVlc3RUcmFja2VyKHJlcXVlc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhY2tlciA9IG5ldyBYSFJSZXF1ZXN0VHJhY2tlcihyZXF1ZXN0KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLnB1c2godHJhY2tlcik7XG4gICAgfTtcblxuICAgIHJldHVybiBBamF4TW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIFhIUlJlcXVlc3RUcmFja2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFhIUlJlcXVlc3RUcmFja2VyKHJlcXVlc3QpIHtcbiAgICAgIHZhciBldmVudCwgc2l6ZSwgX2osIF9sZW4xLCBfb25yZWFkeXN0YXRlY2hhbmdlLCBfcmVmMixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICBpZiAod2luZG93LlByb2dyZXNzRXZlbnQgIT0gbnVsbCkge1xuICAgICAgICBzaXplID0gbnVsbDtcbiAgICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgIGlmIChldnQubGVuZ3RoQ29tcHV0YWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwICogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gX3RoaXMucHJvZ3Jlc3MgKyAoMTAwIC0gX3RoaXMucHJvZ3Jlc3MpIC8gMjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgX3JlZjIgPSBbJ2xvYWQnLCAnYWJvcnQnLCAndGltZW91dCcsICdlcnJvciddO1xuICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgICBldmVudCA9IF9yZWYyW19qXTtcbiAgICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIF90aGlzLnByb2dyZXNzID0gMTAwO1xuICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX29ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlO1xuICAgICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBfcmVmMztcbiAgICAgICAgICBpZiAoKF9yZWYzID0gcmVxdWVzdC5yZWFkeVN0YXRlKSA9PT0gMCB8fCBfcmVmMyA9PT0gNCkge1xuICAgICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgIF90aGlzLnByb2dyZXNzID0gNTA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0eXBlb2YgX29ucmVhZHlzdGF0ZWNoYW5nZSA9PT0gXCJmdW5jdGlvblwiID8gX29ucmVhZHlzdGF0ZWNoYW5nZS5hcHBseShudWxsLCBhcmd1bWVudHMpIDogdm9pZCAwO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBYSFJSZXF1ZXN0VHJhY2tlcjtcblxuICB9KSgpO1xuXG4gIFNvY2tldFJlcXVlc3RUcmFja2VyID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFNvY2tldFJlcXVlc3RUcmFja2VyKHJlcXVlc3QpIHtcbiAgICAgIHZhciBldmVudCwgX2osIF9sZW4xLCBfcmVmMixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICBfcmVmMiA9IFsnZXJyb3InLCAnb3BlbiddO1xuICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgIGV2ZW50ID0gX3JlZjJbX2pdO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBTb2NrZXRSZXF1ZXN0VHJhY2tlcjtcblxuICB9KSgpO1xuXG4gIEVsZW1lbnRNb25pdG9yID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIEVsZW1lbnRNb25pdG9yKG9wdGlvbnMpIHtcbiAgICAgIHZhciBzZWxlY3RvciwgX2osIF9sZW4xLCBfcmVmMjtcbiAgICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgfVxuICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgICAgaWYgKG9wdGlvbnMuc2VsZWN0b3JzID09IG51bGwpIHtcbiAgICAgICAgb3B0aW9ucy5zZWxlY3RvcnMgPSBbXTtcbiAgICAgIH1cbiAgICAgIF9yZWYyID0gb3B0aW9ucy5zZWxlY3RvcnM7XG4gICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgICAgc2VsZWN0b3IgPSBfcmVmMltfal07XG4gICAgICAgIHRoaXMuZWxlbWVudHMucHVzaChuZXcgRWxlbWVudFRyYWNrZXIoc2VsZWN0b3IpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRWxlbWVudE1vbml0b3I7XG5cbiAgfSkoKTtcblxuICBFbGVtZW50VHJhY2tlciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFbGVtZW50VHJhY2tlcihzZWxlY3Rvcikge1xuICAgICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IDA7XG4gICAgICB0aGlzLmNoZWNrKCk7XG4gICAgfVxuXG4gICAgRWxlbWVudFRyYWNrZXIucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9uZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5jaGVjaygpO1xuICAgICAgICB9KSwgb3B0aW9ucy5lbGVtZW50cy5jaGVja0ludGVydmFsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRWxlbWVudFRyYWNrZXIucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb2dyZXNzID0gMTAwO1xuICAgIH07XG5cbiAgICByZXR1cm4gRWxlbWVudFRyYWNrZXI7XG5cbiAgfSkoKTtcblxuICBEb2N1bWVudE1vbml0b3IgPSAoZnVuY3Rpb24oKSB7XG4gICAgRG9jdW1lbnRNb25pdG9yLnByb3RvdHlwZS5zdGF0ZXMgPSB7XG4gICAgICBsb2FkaW5nOiAwLFxuICAgICAgaW50ZXJhY3RpdmU6IDUwLFxuICAgICAgY29tcGxldGU6IDEwMFxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBEb2N1bWVudE1vbml0b3IoKSB7XG4gICAgICB2YXIgX29ucmVhZHlzdGF0ZWNoYW5nZSwgX3JlZjIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSAoX3JlZjIgPSB0aGlzLnN0YXRlc1tkb2N1bWVudC5yZWFkeVN0YXRlXSkgIT0gbnVsbCA/IF9yZWYyIDogMTAwO1xuICAgICAgX29ucmVhZHlzdGF0ZWNoYW5nZSA9IGRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZTtcbiAgICAgIGRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoX3RoaXMuc3RhdGVzW2RvY3VtZW50LnJlYWR5U3RhdGVdICE9IG51bGwpIHtcbiAgICAgICAgICBfdGhpcy5wcm9ncmVzcyA9IF90aGlzLnN0YXRlc1tkb2N1bWVudC5yZWFkeVN0YXRlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZW9mIF9vbnJlYWR5c3RhdGVjaGFuZ2UgPT09IFwiZnVuY3Rpb25cIiA/IF9vbnJlYWR5c3RhdGVjaGFuZ2UuYXBwbHkobnVsbCwgYXJndW1lbnRzKSA6IHZvaWQgMDtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIERvY3VtZW50TW9uaXRvcjtcblxuICB9KSgpO1xuXG4gIEV2ZW50TGFnTW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBFdmVudExhZ01vbml0b3IoKSB7XG4gICAgICB2YXIgYXZnLCBpbnRlcnZhbCwgbGFzdCwgcG9pbnRzLCBzYW1wbGVzLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICB0aGlzLnByb2dyZXNzID0gMDtcbiAgICAgIGF2ZyA9IDA7XG4gICAgICBzYW1wbGVzID0gW107XG4gICAgICBwb2ludHMgPSAwO1xuICAgICAgbGFzdCA9IG5vdygpO1xuICAgICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpZmY7XG4gICAgICAgIGRpZmYgPSBub3coKSAtIGxhc3QgLSA1MDtcbiAgICAgICAgbGFzdCA9IG5vdygpO1xuICAgICAgICBzYW1wbGVzLnB1c2goZGlmZik7XG4gICAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+IG9wdGlvbnMuZXZlbnRMYWcuc2FtcGxlQ291bnQpIHtcbiAgICAgICAgICBzYW1wbGVzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgYXZnID0gYXZnQW1wbGl0dWRlKHNhbXBsZXMpO1xuICAgICAgICBpZiAoKytwb2ludHMgPj0gb3B0aW9ucy5ldmVudExhZy5taW5TYW1wbGVzICYmIGF2ZyA8IG9wdGlvbnMuZXZlbnRMYWcubGFnVGhyZXNob2xkKSB7XG4gICAgICAgICAgX3RoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5wcm9ncmVzcyA9IDEwMCAqICgzIC8gKGF2ZyArIDMpKTtcbiAgICAgICAgfVxuICAgICAgfSwgNTApO1xuICAgIH1cblxuICAgIHJldHVybiBFdmVudExhZ01vbml0b3I7XG5cbiAgfSkoKTtcblxuICBTY2FsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gU2NhbGVyKHNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aGlzLmxhc3QgPSB0aGlzLnNpbmNlTGFzdFVwZGF0ZSA9IDA7XG4gICAgICB0aGlzLnJhdGUgPSBvcHRpb25zLmluaXRpYWxSYXRlO1xuICAgICAgdGhpcy5jYXRjaHVwID0gMDtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSB0aGlzLmxhc3RQcm9ncmVzcyA9IDA7XG4gICAgICBpZiAodGhpcy5zb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLnByb2dyZXNzID0gcmVzdWx0KHRoaXMuc291cmNlLCAncHJvZ3Jlc3MnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBTY2FsZXIucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbihmcmFtZVRpbWUsIHZhbCkge1xuICAgICAgdmFyIHNjYWxpbmc7XG4gICAgICBpZiAodmFsID09IG51bGwpIHtcbiAgICAgICAgdmFsID0gcmVzdWx0KHRoaXMuc291cmNlLCAncHJvZ3Jlc3MnKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPj0gMTAwKSB7XG4gICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodmFsID09PSB0aGlzLmxhc3QpIHtcbiAgICAgICAgdGhpcy5zaW5jZUxhc3RVcGRhdGUgKz0gZnJhbWVUaW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuc2luY2VMYXN0VXBkYXRlKSB7XG4gICAgICAgICAgdGhpcy5yYXRlID0gKHZhbCAtIHRoaXMubGFzdCkgLyB0aGlzLnNpbmNlTGFzdFVwZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhdGNodXAgPSAodmFsIC0gdGhpcy5wcm9ncmVzcykgLyBvcHRpb25zLmNhdGNodXBUaW1lO1xuICAgICAgICB0aGlzLnNpbmNlTGFzdFVwZGF0ZSA9IDA7XG4gICAgICAgIHRoaXMubGFzdCA9IHZhbDtcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgPiB0aGlzLnByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgKz0gdGhpcy5jYXRjaHVwICogZnJhbWVUaW1lO1xuICAgICAgfVxuICAgICAgc2NhbGluZyA9IDEgLSBNYXRoLnBvdyh0aGlzLnByb2dyZXNzIC8gMTAwLCBvcHRpb25zLmVhc2VGYWN0b3IpO1xuICAgICAgdGhpcy5wcm9ncmVzcyArPSBzY2FsaW5nICogdGhpcy5yYXRlICogZnJhbWVUaW1lO1xuICAgICAgdGhpcy5wcm9ncmVzcyA9IE1hdGgubWluKHRoaXMubGFzdFByb2dyZXNzICsgb3B0aW9ucy5tYXhQcm9ncmVzc1BlckZyYW1lLCB0aGlzLnByb2dyZXNzKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1heCgwLCB0aGlzLnByb2dyZXNzKTtcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1pbigxMDAsIHRoaXMucHJvZ3Jlc3MpO1xuICAgICAgdGhpcy5sYXN0UHJvZ3Jlc3MgPSB0aGlzLnByb2dyZXNzO1xuICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3M7XG4gICAgfTtcblxuICAgIHJldHVybiBTY2FsZXI7XG5cbiAgfSkoKTtcblxuICBzb3VyY2VzID0gbnVsbDtcblxuICBzY2FsZXJzID0gbnVsbDtcblxuICBiYXIgPSBudWxsO1xuXG4gIHVuaVNjYWxlciA9IG51bGw7XG5cbiAgYW5pbWF0aW9uID0gbnVsbDtcblxuICBjYW5jZWxBbmltYXRpb24gPSBudWxsO1xuXG4gIFBhY2UucnVubmluZyA9IGZhbHNlO1xuXG4gIGhhbmRsZVB1c2hTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChvcHRpb25zLnJlc3RhcnRPblB1c2hTdGF0ZSkge1xuICAgICAgcmV0dXJuIFBhY2UucmVzdGFydCgpO1xuICAgIH1cbiAgfTtcblxuICBpZiAod2luZG93Lmhpc3RvcnkucHVzaFN0YXRlICE9IG51bGwpIHtcbiAgICBfcHVzaFN0YXRlID0gd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlO1xuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaGFuZGxlUHVzaFN0YXRlKCk7XG4gICAgICByZXR1cm4gX3B1c2hTdGF0ZS5hcHBseSh3aW5kb3cuaGlzdG9yeSwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSAhPSBudWxsKSB7XG4gICAgX3JlcGxhY2VTdGF0ZSA9IHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZTtcbiAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGhhbmRsZVB1c2hTdGF0ZSgpO1xuICAgICAgcmV0dXJuIF9yZXBsYWNlU3RhdGUuYXBwbHkod2luZG93Lmhpc3RvcnksIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIFNPVVJDRV9LRVlTID0ge1xuICAgIGFqYXg6IEFqYXhNb25pdG9yLFxuICAgIGVsZW1lbnRzOiBFbGVtZW50TW9uaXRvcixcbiAgICBkb2N1bWVudDogRG9jdW1lbnRNb25pdG9yLFxuICAgIGV2ZW50TGFnOiBFdmVudExhZ01vbml0b3JcbiAgfTtcblxuICAoaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0eXBlLCBfaiwgX2ssIF9sZW4xLCBfbGVuMiwgX3JlZjIsIF9yZWYzLCBfcmVmNDtcbiAgICBQYWNlLnNvdXJjZXMgPSBzb3VyY2VzID0gW107XG4gICAgX3JlZjIgPSBbJ2FqYXgnLCAnZWxlbWVudHMnLCAnZG9jdW1lbnQnLCAnZXZlbnRMYWcnXTtcbiAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcbiAgICAgIHR5cGUgPSBfcmVmMltfal07XG4gICAgICBpZiAob3B0aW9uc1t0eXBlXSAhPT0gZmFsc2UpIHtcbiAgICAgICAgc291cmNlcy5wdXNoKG5ldyBTT1VSQ0VfS0VZU1t0eXBlXShvcHRpb25zW3R5cGVdKSk7XG4gICAgICB9XG4gICAgfVxuICAgIF9yZWY0ID0gKF9yZWYzID0gb3B0aW9ucy5leHRyYVNvdXJjZXMpICE9IG51bGwgPyBfcmVmMyA6IFtdO1xuICAgIGZvciAoX2sgPSAwLCBfbGVuMiA9IF9yZWY0Lmxlbmd0aDsgX2sgPCBfbGVuMjsgX2srKykge1xuICAgICAgc291cmNlID0gX3JlZjRbX2tdO1xuICAgICAgc291cmNlcy5wdXNoKG5ldyBzb3VyY2Uob3B0aW9ucykpO1xuICAgIH1cbiAgICBQYWNlLmJhciA9IGJhciA9IG5ldyBCYXI7XG4gICAgc2NhbGVycyA9IFtdO1xuICAgIHJldHVybiB1bmlTY2FsZXIgPSBuZXcgU2NhbGVyO1xuICB9KSgpO1xuXG4gIFBhY2Uuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgIFBhY2UudHJpZ2dlcignc3RvcCcpO1xuICAgIFBhY2UucnVubmluZyA9IGZhbHNlO1xuICAgIGJhci5kZXN0cm95KCk7XG4gICAgY2FuY2VsQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICBpZiAoYW5pbWF0aW9uICE9IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb24pO1xuICAgICAgfVxuICAgICAgYW5pbWF0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGluaXQoKTtcbiAgfTtcblxuICBQYWNlLnJlc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICBQYWNlLnRyaWdnZXIoJ3Jlc3RhcnQnKTtcbiAgICBQYWNlLnN0b3AoKTtcbiAgICByZXR1cm4gUGFjZS5zdGFydCgpO1xuICB9O1xuXG4gIFBhY2UuZ28gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhcnQ7XG4gICAgUGFjZS5ydW5uaW5nID0gdHJ1ZTtcbiAgICBiYXIucmVuZGVyKCk7XG4gICAgc3RhcnQgPSBub3coKTtcbiAgICBjYW5jZWxBbmltYXRpb24gPSBmYWxzZTtcbiAgICByZXR1cm4gYW5pbWF0aW9uID0gcnVuQW5pbWF0aW9uKGZ1bmN0aW9uKGZyYW1lVGltZSwgZW5xdWV1ZU5leHRGcmFtZSkge1xuICAgICAgdmFyIGF2ZywgY291bnQsIGRvbmUsIGVsZW1lbnQsIGVsZW1lbnRzLCBpLCBqLCByZW1haW5pbmcsIHNjYWxlciwgc2NhbGVyTGlzdCwgc3VtLCBfaiwgX2ssIF9sZW4xLCBfbGVuMiwgX3JlZjI7XG4gICAgICByZW1haW5pbmcgPSAxMDAgLSBiYXIucHJvZ3Jlc3M7XG4gICAgICBjb3VudCA9IHN1bSA9IDA7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIGZvciAoaSA9IF9qID0gMCwgX2xlbjEgPSBzb3VyY2VzLmxlbmd0aDsgX2ogPCBfbGVuMTsgaSA9ICsrX2opIHtcbiAgICAgICAgc291cmNlID0gc291cmNlc1tpXTtcbiAgICAgICAgc2NhbGVyTGlzdCA9IHNjYWxlcnNbaV0gIT0gbnVsbCA/IHNjYWxlcnNbaV0gOiBzY2FsZXJzW2ldID0gW107XG4gICAgICAgIGVsZW1lbnRzID0gKF9yZWYyID0gc291cmNlLmVsZW1lbnRzKSAhPSBudWxsID8gX3JlZjIgOiBbc291cmNlXTtcbiAgICAgICAgZm9yIChqID0gX2sgPSAwLCBfbGVuMiA9IGVsZW1lbnRzLmxlbmd0aDsgX2sgPCBfbGVuMjsgaiA9ICsrX2spIHtcbiAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudHNbal07XG4gICAgICAgICAgc2NhbGVyID0gc2NhbGVyTGlzdFtqXSAhPSBudWxsID8gc2NhbGVyTGlzdFtqXSA6IHNjYWxlckxpc3Rbal0gPSBuZXcgU2NhbGVyKGVsZW1lbnQpO1xuICAgICAgICAgIGRvbmUgJj0gc2NhbGVyLmRvbmU7XG4gICAgICAgICAgaWYgKHNjYWxlci5kb25lKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgICBzdW0gKz0gc2NhbGVyLnRpY2soZnJhbWVUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXZnID0gc3VtIC8gY291bnQ7XG4gICAgICBiYXIudXBkYXRlKHVuaVNjYWxlci50aWNrKGZyYW1lVGltZSwgYXZnKSk7XG4gICAgICBpZiAoYmFyLmRvbmUoKSB8fCBkb25lIHx8IGNhbmNlbEFuaW1hdGlvbikge1xuICAgICAgICBiYXIudXBkYXRlKDEwMCk7XG4gICAgICAgIFBhY2UudHJpZ2dlcignZG9uZScpO1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBiYXIuZmluaXNoKCk7XG4gICAgICAgICAgUGFjZS5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIFBhY2UudHJpZ2dlcignaGlkZScpO1xuICAgICAgICB9LCBNYXRoLm1heChvcHRpb25zLmdob3N0VGltZSwgTWF0aC5tYXgob3B0aW9ucy5taW5UaW1lIC0gKG5vdygpIC0gc3RhcnQpLCAwKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGVucXVldWVOZXh0RnJhbWUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBQYWNlLnN0YXJ0ID0gZnVuY3Rpb24oX29wdGlvbnMpIHtcbiAgICBleHRlbmQob3B0aW9ucywgX29wdGlvbnMpO1xuICAgIFBhY2UucnVubmluZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGJhci5yZW5kZXIoKTtcbiAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgIE5vVGFyZ2V0RXJyb3IgPSBfZXJyb3I7XG4gICAgfVxuICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhY2UnKSkge1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoUGFjZS5zdGFydCwgNTApO1xuICAgIH0gZWxzZSB7XG4gICAgICBQYWNlLnRyaWdnZXIoJ3N0YXJ0Jyk7XG4gICAgICByZXR1cm4gUGFjZS5nbygpO1xuICAgIH1cbiAgfTtcblxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFsncGFjZSddLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBQYWNlO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gUGFjZTtcbiAgfSBlbHNlIHtcbiAgICBpZiAob3B0aW9ucy5zdGFydE9uUGFnZUxvYWQpIHtcbiAgICAgIFBhY2Uuc3RhcnQoKTtcbiAgICB9XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3BhY2UvcGFjZS5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXG4gKiAgRGVwZW5kZW5jaWVzXG4qL1xuXG4gIGltcG9ydCAqIGFzIEtlZmlyIGZyb20gJ2tlZmlyJ1xuICBpbXBvcnQgeyBidWlsZFBhZ2UsIGNvbnZlcnRBbGxQcm9wc1RvUHggfSBmcm9tICcuL3V0aWxzL3BhZ2UtdXRpbHMuanMnXG5cbi8qXG4gKiAgR2xvYmFsc1xuKi9cbiAgaW1wb3J0IHsgQU5JTUFUSU9OX1RJTUUsICR3aW5kb3csICRib2R5LCBJTklUX1NUQVRFIH0gZnJvbSAnLi9jb25zdGFudHMuanMnXG5cbi8qXG4gKiAgSW5pdGlhbGl6ZVxuKi9cblxuICBjb25zdCBzdGF0ZUluaXRpYWxpemVkJCA9IEtlZmlyLnBvb2woKVxuXG4gIGNvbnN0IGluaXRTdGF0ZSA9IEtlZmlyLnN0cmVhbShlbWl0dGVyID0+IHtcbiAgICBlbWl0dGVyLmVtaXQoSU5JVF9TVEFURSlcbiAgfSlcblxuICBtb2R1bGUuZXhwb3J0cy5pbml0ID0gKHJldHJlaXZlZEtleUZyYW1lcykgPT4ge1xuICAgIGNvbnN0IGtleUZyYW1lc1JldHJlaXZlZCQgPSBLZWZpci5zdHJlYW0oZW1pdHRlciA9PiB7XG4gICAgICBlbWl0dGVyLmVtaXQocmV0cmVpdmVkS2V5RnJhbWVzKVxuICAgIH0pXG5cbiAgICBjb25zdCBrZXlGcmFtZXNNYXBwZWRUb1N0YXRlJCA9IGtleUZyYW1lc1JldHJlaXZlZCRcbiAgICAgIC5mbGF0TWFwKGtleWZyYW1lcyA9PiBpbml0U3RhdGUubWFwKHN0YXRlID0+IHtcbiAgICAgICAgY29uc3QgcyA9IHN0YXRlXG4gICAgICAgIHMua2V5ZnJhbWVzID0ga2V5ZnJhbWVzXG4gICAgICAgIHJldHVybiBzXG4gICAgICB9KSlcbiAgICAgIC5tYXAoc3RhdGUgPT4ge1xuICAgICAgICBjb25zdCBzID0gc3RhdGVcbiAgICAgICAgcy5jdXJyZW50V3JhcHBlciA9IHMud3JhcHBlcnNbMF1cbiAgICAgICAgcy5zY3JvbGxUb3AgPSAwXG4gICAgICAgIHJldHVybiBzXG4gICAgICB9KVxuXG4gICAgc3RhdGVJbml0aWFsaXplZCQucGx1ZyhrZXlGcmFtZXNNYXBwZWRUb1N0YXRlJClcbiAgfVxuXG4vKlxuICogIEJ1aWxkIFBhZ2VcbiovXG5cbiAgY29uc3Qgd2luZG93UmVzaXplZCQgPSBzdGF0ZUluaXRpYWxpemVkJFxuICAgIC5mbGF0TWFwKChzdGF0ZSkgPT4gS2VmaXIuZnJvbUV2ZW50cygkd2luZG93LCAncmVzaXplJywgKCkgPT4gc3RhdGUpKVxuICAgIC50aHJvdHRsZShBTklNQVRJT05fVElNRSlcblxuICBjb25zdCBkaW1lbnNpb25zQ2FsY3VsYXRlZCQgPSBLZWZpci5tZXJnZShbc3RhdGVJbml0aWFsaXplZCQsIHdpbmRvd1Jlc2l6ZWQkXSlcbiAgICAubWFwKGNhbGN1bGF0ZURpbWVuc2lvbnMpXG4gICAgLm1hcChjb252ZXJ0S2V5RnJhbWVzKVxuICAgIC5tYXAoY2FsY3VsYXRlS2V5RnJhbWVzQW5kRm9jdXMpXG4gICAgLm1hcChzZXRJbml0V3JhcHBlcilcblxuICBmdW5jdGlvbiBjYWxjdWxhdGVEaW1lbnNpb25zKHN0YXRlKSB7XG4gICAgY29uc3QgcyA9IHN0YXRlXG4gICAgcy5zY3JvbGxUb3AgPSBNYXRoLmZsb29yKCR3aW5kb3cuc2Nyb2xsVG9wKCkpXG4gICAgcy53aW5kb3dIZWlnaHQgPSAkd2luZG93LmhlaWdodCgpXG4gICAgcy53aW5kb3dXaWR0aCA9ICR3aW5kb3cud2lkdGgoKVxuICAgIHJldHVybiBzXG4gIH1cblxuICBmdW5jdGlvbiBjb252ZXJ0S2V5RnJhbWVzKHN0YXRlKSB7XG4gICAgY29uc3QgcyA9IHN0YXRlXG4gICAgcy5rZXlmcmFtZXMgPSBjb252ZXJ0QWxsUHJvcHNUb1B4KHMua2V5ZnJhbWVzLCBzLndpbmRvd1dpZHRoLCBzLndpbmRvd0hlaWdodClcbiAgICByZXR1cm4gc1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlS2V5RnJhbWVzQW5kRm9jdXMoc3RhdGUpIHtcbiAgICBjb25zdCBzID0gc3RhdGVcbiAgICBjb25zdCBwYWdlSW5mbyA9IGJ1aWxkUGFnZShzdGF0ZS5rZXlmcmFtZXMsIHN0YXRlLndyYXBwZXJzKVxuXG4gICAgcy5ib2R5SGVpZ2h0ID0gcGFnZUluZm8uYm9keUhlaWdodFxuICAgIHMud3JhcHBlcnMgPSBwYWdlSW5mby53cmFwcGVyc1xuXG4gICAgcy5mcmFtZUZvY3VzID0gcGFnZUluZm8uZnJhbWVGb2N1c1xuICAgICAgLm1hcChpID0+IE1hdGguZmxvb3IoaSkpXG4gICAgICAucmVkdWNlKChhLCBiKSA9PiB7XG4gICAgICAgICAvLyBjbGVhcnMgYW55IGZyYW1lIGR1cGxpY2F0ZXMuIFRPRE86IGZpbmQgYnVnIHRoYXQgbWFrZXMgZnJhbWUgZHVwbGljYXRlc1xuICAgICAgICBpZiAoYS5pbmRleE9mKGIpIDwgMCkgYS5wdXNoKGIpXG4gICAgICAgIHJldHVybiBhXG4gICAgICB9LCBbXSlcblxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SW5pdFdyYXBwZXIoc3RhdGUpIHtcbiAgICBjb25zdCBzID0gc3RhdGVcbiAgICBzLmN1cnJlbnRXcmFwcGVyID0gcy53cmFwcGVyc1swXVxuICAgIHJldHVybiBzXG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cy5kaW1lbnNpb25zQ2FsY3VsYXRlZCQgPSBkaW1lbnNpb25zQ2FsY3VsYXRlZCRcblxuLypcbiAqICBQb3NpdGlvbiBtb3ZlZFxuKi9cblxuICBjb25zdCB3aW5kb3dTY3JvbGxlZCQgPSBLZWZpci5mcm9tRXZlbnRzKCR3aW5kb3csICdzY3JvbGwnKVxuICAgIC50aHJvdHRsZShBTklNQVRJT05fVElNRSlcblxuICBjb25zdCBzb21ldGhpbmdNb3ZlZCQgPSBLZWZpci5mcm9tRXZlbnRzKHdpbmRvdywgJ1BPU0lUSU9OX0NIQU5HRUQnKVxuXG4gIGNvbnN0IHdpbmRvd3NPclBvc2l0aW9uQ2hhbmdlZCQgPSBkaW1lbnNpb25zQ2FsY3VsYXRlZCRcbiAgICAuZmxhdE1hcChzdGF0ZSA9PiBLZWZpci5tZXJnZShbd2luZG93U2Nyb2xsZWQkLCBzb21ldGhpbmdNb3ZlZCRdKVxuICAgICAgLm1hcChlID0+IHtcbiAgICAgICAgY29uc3QgcyA9IHN0YXRlXG4gICAgICAgIHMuY2hhbmdlZCA9IGVcbiAgICAgICAgcmV0dXJuIHNcbiAgICAgIH0pXG4gICAgKVxuXG4gIGNvbnN0IHBvc2l0aW9uQ2hhbmdlZCQgPSBLZWZpclxuICAgIC5tZXJnZShbZGltZW5zaW9uc0NhbGN1bGF0ZWQkLCB3aW5kb3dzT3JQb3NpdGlvbkNoYW5nZWQkXSlcblxuLypcbiAqICBTdGF0ZSBDaGFuZ2VkXG4qL1xuXG4gIC8vIENhbGN1bGF0ZSBjdXJyZW50IHN0YXRlXG4gIGNvbnN0IGNhbGN1bGF0ZWRDdXJyZW50U3RhdGUkID0gS2VmaXJcbiAgICAubWVyZ2UoW2RpbWVuc2lvbnNDYWxjdWxhdGVkJCwgcG9zaXRpb25DaGFuZ2VkJF0pXG4gICAgLm1hcChzZXRUb3BzKVxuICAgIC5tYXAoc2V0S2V5ZnJhbWUpXG4gICAgLm1hcChnZXRTbGlkZUxvY2F0aW9uKVxuICAgIC5tYXAoc3RhdGUgPT4ge1xuICAgICAgY29uc3QgcyA9IHN0YXRlXG4gICAgICBzLmN1cnJlbnRXcmFwcGVyID0gcy5rZXlmcmFtZXNbcy5jdXJyZW50S2V5ZnJhbWVdLndyYXBwZXJcbiAgICAgIHJldHVybiBzXG4gICAgfSlcblxuICBmdW5jdGlvbiBzZXRUb3BzKHN0YXRlKSB7XG4gICAgY29uc3QgcyA9IHN0YXRlXG4gICAgcy5zY3JvbGxUb3AgPSBNYXRoLmZsb29yKCR3aW5kb3cuc2Nyb2xsVG9wKCkpXG4gICAgcy5yZWxhdGl2ZVNjcm9sbFRvcCA9IHMuc2Nyb2xsVG9wIC0gcy5wcmV2S2V5ZnJhbWVzRHVyYXRpb25zXG4gICAgcmV0dXJuIHNcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEtleWZyYW1lKHN0YXRlKSB7XG4gICAgY29uc3QgcyA9IHN0YXRlXG4gICAgaWYgKHMuc2Nyb2xsVG9wID4gKHMua2V5ZnJhbWVzW3MuY3VycmVudEtleWZyYW1lXS5kdXJhdGlvbiArIHMucHJldktleWZyYW1lc0R1cmF0aW9ucykpIHtcbiAgICAgIHMucHJldktleWZyYW1lc0R1cmF0aW9ucyArPSBzLmtleWZyYW1lc1tzLmN1cnJlbnRLZXlmcmFtZV0uZHVyYXRpb25cbiAgICAgIHMuY3VycmVudEtleWZyYW1lKytcbiAgICB9IGVsc2UgaWYgKHMuc2Nyb2xsVG9wIDwgcy5wcmV2S2V5ZnJhbWVzRHVyYXRpb25zKSB7XG4gICAgICBzLmN1cnJlbnRLZXlmcmFtZS0tXG4gICAgICBzLnByZXZLZXlmcmFtZXNEdXJhdGlvbnMgLT0gcy5rZXlmcmFtZXNbcy5jdXJyZW50S2V5ZnJhbWVdLmR1cmF0aW9uXG4gICAgfVxuICAgIHJldHVybiBzXG4gIH1cblxuICBmdW5jdGlvbiBnZXRTbGlkZUxvY2F0aW9uKHN0YXRlKSB7XG4gICAgZnVuY3Rpb24gbnVtYmVySXNCZXR3ZWVuKGEsIGIpIHtcbiAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluLmFwcGx5KE1hdGgsIFthLCBiXSlcbiAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIFthLCBiXSlcbiAgICAgIHJldHVybiB0aGlzID4gbWluICYmIHRoaXMgPCBtYXhcbiAgICB9XG5cbiAgICBjb25zdCBzID0gc3RhdGVcblxuICAgIGZvciAobGV0IHggPSAxOyB4IDw9IHMuZnJhbWVGb2N1cy5sZW5ndGg7IHgrKykge1xuICAgICAgaWYgKHMuZnJhbWVGb2N1c1t4XSA9PT0gcy5zY3JvbGxUb3ApIHtcbiAgICAgICAgcy5jdXJyZW50RnJhbWUgPSBbeF1cbiAgICAgIH1cbiAgICAgIGlmIChudW1iZXJJc0JldHdlZW4uY2FsbChzLnNjcm9sbCwgcy5mcmFtZUZvY3VzW3ggLSAxXSwgcy5mcmFtZUZvY3VzW3hdKSkge1xuICAgICAgICBzLmN1cnJlbnRGcmFtZSA9IFt4IC0gMSwgeF1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNcbiAgfVxuXG4gIGNvbnN0IHdyYXBwZXJDaGFuZ2VkJCA9IGNhbGN1bGF0ZWRDdXJyZW50U3RhdGUkXG4gICAgLm1hcChzdGF0ZSA9PiBzdGF0ZS5jdXJyZW50V3JhcHBlcilcbiAgICAuZGlmZihudWxsLCAnJylcbiAgICAuZmlsdGVyKGN1cnJlbnRXcmFwcGVyID0+IGN1cnJlbnRXcmFwcGVyWzBdICE9PSBjdXJyZW50V3JhcHBlclsxXSlcbiAgICAvLyAuZGVsYXkoQU5JTUFUSU9OX1RJTUUqMikgLy8gVG8gd2FpdCBmb3IgZmlyc3QgYW5pbWF0aW9uIGZyYW1lIHRvIHN0YXJ0IGJlZm9yZSBzd2l0Y2hpbmdcblxuICBtb2R1bGUuZXhwb3J0cy53cmFwcGVyQ2hhbmdlZCQgPSB3cmFwcGVyQ2hhbmdlZCRcblxuICBjb25zdCBzY3JvbGxUb3BDaGFuZ2VkJCA9IGNhbGN1bGF0ZWRDdXJyZW50U3RhdGUkXG4gICAgLmRpZmYobnVsbCwgeyAvLyBIYWNrLCBmb3Igc29tZSByZWFzb24gSU5JVF9TVEFURSBpc24ndCBjb21pbmcgaW4gcHJvcGVybHlcbiAgICAgIHdyYXBwZXJzOiBbXSxcbiAgICAgIGN1cnJlbnRXcmFwcGVyOiB1bmRlZmluZWQsXG5cbiAgICAgIHNjcm9sbFRvcDogMCxcbiAgICAgIHJlbGF0aXZlU2Nyb2xsVG9wOiAwLFxuXG4gICAgICBrZXlmcmFtZXM6IHVuZGVmaW5lZCxcbiAgICAgIHByZXZLZXlmcmFtZXNEdXJhdGlvbnM6IDAsXG4gICAgICBjdXJyZW50S2V5ZnJhbWU6IDAsXG5cbiAgICAgIGZyYW1lRm9jdXM6IFtdLFxuICAgICAgY3VycmVudEZvY3VzOiAwLFxuICAgICAgY3VycmVudEludGVydmFsOiAwLFxuXG4gICAgICBzY3JvbGxUaW1lb3V0SUQ6IDAsXG5cbiAgICAgIGJvZHlIZWlnaHQ6IDAsXG4gICAgICB3aW5kb3dIZWlnaHQ6IDAsXG4gICAgICB3aW5kb3dXaWR0aDogMCxcbiAgICB9KVxuXG4gIG1vZHVsZS5leHBvcnRzLnNjcm9sbFRvcENoYW5nZWQkID0gc2Nyb2xsVG9wQ2hhbmdlZCRcbiAgLy8gc2Nyb2xsVG9wQ2hhbmdlZCQubG9nKClcblxuLypcbiAqICBBY3Rpb25zXG4qL1xuXG4gIC8vIG1vZHVsZS5leHBvcnRzLmdldCA9ICgpID0+IHN0YXRlXG4gIC8vICAgcmV0dXJuIHN0YXRlXG4gIC8vIH1cblxuICBtb2R1bGUuZXhwb3J0cy5hY3Rpb24gPSAoYWN0aW9uKSA9PiB7XG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAkd2luZG93LnRyaWdnZXIoJ0ZPQ1VTX05FWFQnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAkd2luZG93LnRyaWdnZXIoJ0ZPQ1VTX1BSRVZJT1VTJylcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWN0aW9uRm9jdXNOZXh0ID0gc2Nyb2xsVG9wQ2hhbmdlZCRcbiAgICAuZmxhdE1hcEZpcnN0KChzdGF0ZSkgPT4gS2VmaXIuZnJvbUV2ZW50cygkd2luZG93LCAnRk9DVVNfTkVYVCcsICgpID0+IHN0YXRlKSlcbiAgICAubWFwKHN0YXRlID0+IHN0YXRlWzFdKVxuICAgIC5tYXAobmV4dEZvY3VzKVxuXG4gIGNvbnN0IGFjdGlvbkZvY3VzUHJldmlvdXMgPSBzY3JvbGxUb3BDaGFuZ2VkJFxuICAgIC5mbGF0TWFwRmlyc3QoKHN0YXRlKSA9PiBLZWZpci5mcm9tRXZlbnRzKCR3aW5kb3csICdGT0NVU19QUkVWSU9VUycsICgpID0+IHN0YXRlKSlcbiAgICAubWFwKHN0YXRlID0+IHN0YXRlWzFdKVxuICAgIC5tYXAocHJldmlvdXNGb2N1cylcblxuICBmdW5jdGlvbiBuZXh0Rm9jdXMoc3RhdGUpIHtcbiAgICBzd2l0Y2ggKHN0YXRlLmN1cnJlbnRGcmFtZS5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIHN0YXRlLmZyYW1lRm9jdXNbc3RhdGUuY3VycmVudEZyYW1lWzBdICsgMV1cbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIHN0YXRlLmZyYW1lRm9jdXNbc3RhdGUuY3VycmVudEZyYW1lWzFdXVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlvdXNGb2N1cyhzdGF0ZSkge1xuICAgIHN3aXRjaCAoc3RhdGUuY3VycmVudEZyYW1lLmxlbmd0aCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gc3RhdGUuZnJhbWVGb2N1c1tzdGF0ZS5jdXJyZW50RnJhbWVbMF0gLSAxXVxuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gc3RhdGUuZnJhbWVGb2N1c1tzdGF0ZS5jdXJyZW50RnJhbWVbMF1dXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBjb25zdCBmb2N1c0NoYW5nZWQkID0gS2VmaXIubWVyZ2UoW2FjdGlvbkZvY3VzUHJldmlvdXMsIGFjdGlvbkZvY3VzTmV4dF0pXG4gICAgLm9uVmFsdWUocmVuZGVyU2Nyb2xsKVxuXG4gIC8vIFRPRE86IFJlbW92ZSBsb2dcbiAgZm9jdXNDaGFuZ2VkJC5sb2coKVxuXG4gIC8vIFRPRE86IEFic3RyYWN0IFJlbmRlciB0byByZW5kZXJlclxuICBmdW5jdGlvbiByZW5kZXJTY3JvbGwoc2Nyb2xsKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJSRU5ERVJcIiwgc2Nyb2xsLCBNYXRoLmZsb29yKCR3aW5kb3cuc2Nyb2xsVG9wKCkpKVxuICAgICRib2R5LmFuaW1hdGUoe1xuICAgICAgc2Nyb2xsVG9wOiBzY3JvbGwsXG4gICAgfSwgMTUwMCwgJ2xpbmVhcicpXG4gIH1cblxuLypcbiAqICBIZWxwZXJzXG4qL1xuXG4gIC8vIGZ1bmN0aW9uIHRocm93RXJyb3IoKSB7XG4gIC8vICAgJGJvZHkuYWRkQ2xhc3MoJ3BhZ2UtZXJyb3InKVxuICAvLyB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYi1zY2VuZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzLmNvbnZlcnRBbGxQcm9wc1RvUHggPSBmdW5jdGlvbihrZXlmcmFtZXMsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpIHtcbiAgdmFyIGksIGosIGs7XG4gIGZvcihpPTA7aTxrZXlmcmFtZXMubGVuZ3RoO2krKykgeyAvLyBsb29wIGtleWZyYW1lc1xuICAgIGtleWZyYW1lc1tpXS5kdXJhdGlvbiA9IGNvbnZlcnRQZXJjZW50VG9QeChrZXlmcmFtZXNbaV0uZHVyYXRpb24sICd5Jywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgZm9yKGo9MDtqPGtleWZyYW1lc1tpXS5hbmltYXRpb25zLmxlbmd0aDtqKyspIHsgLy8gbG9vcCBhbmltYXRpb25zXG4gICAgICBPYmplY3Qua2V5cyhrZXlmcmFtZXNbaV0uYW5pbWF0aW9uc1tqXSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHsgLy8gbG9vcCBwcm9wZXJ0aWVzXG4gICAgICAgIHZhciB2YWx1ZSA9IGtleWZyYW1lc1tpXS5hbmltYXRpb25zW2pdW2tleV07XG4gICAgICAgIGlmKGtleSAhPT0gJ3NlbGVjdG9yJykge1xuICAgICAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHsgLy8gaWYgaXRzIGFuIGFycmF5XG4gICAgICAgICAgICBmb3Ioaz0wO2s8dmFsdWUubGVuZ3RoO2srKykgeyAvLyBpZiB2YWx1ZSBpbiBhcnJheSBpcyAlXG4gICAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZVtrXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gJ3RyYW5zbGF0ZVknKSB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IGNvbnZlcnRQZXJjZW50VG9QeCh2YWx1ZVtrXSwgJ3knLCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSBjb252ZXJ0UGVyY2VudFRvUHgodmFsdWVba10sICd4Jywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikgeyAvLyBpZiBzaW5nbGUgdmFsdWUgaXMgYSAlXG4gICAgICAgICAgICAgIGlmKGtleSA9PT0gJ3RyYW5zbGF0ZVknKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjb252ZXJ0UGVyY2VudFRvUHgodmFsdWUsICd5Jywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBjb252ZXJ0UGVyY2VudFRvUHgodmFsdWUsICd4Jywgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAga2V5ZnJhbWVzW2ldLmFuaW1hdGlvbnNbal1ba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtleWZyYW1lcztcbn07XG5cblxuXG5mdW5jdGlvbiBjb252ZXJ0UGVyY2VudFRvUHgodmFsdWUsIGF4aXMsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpIHtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLm1hdGNoKC8lL2cpKSB7XG4gICAgaWYoYXhpcyA9PT0gJ3knKSB2YWx1ZSA9IChwYXJzZUZsb2F0KHZhbHVlKSAvIDEwMCkgKiB3aW5kb3dIZWlnaHQ7XG4gICAgaWYoYXhpcyA9PT0gJ3gnKSB2YWx1ZSA9IChwYXJzZUZsb2F0KHZhbHVlKSAvIDEwMCkgKiB3aW5kb3dXaWR0aDtcbiAgfVxuICBpZih0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUubWF0Y2goL3YvZykpIHtcbiAgICBpZihheGlzID09PSAneScpIHZhbHVlID0gKHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwKSAqIHdpbmRvd0hlaWdodDtcbiAgICBpZihheGlzID09PSAneCcpIHZhbHVlID0gKHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwKSAqIHdpbmRvd1dpZHRoO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMuYnVpbGRQYWdlID0gZnVuY3Rpb24oa2V5ZnJhbWVzLCB3cmFwcGVycykge1xuICB2YXIgaSwgaiwgaywgaW5pdEZyYW1lcyA9IFtdLCBib2R5SGVpZ2h0ID0gMDtcbiAgZm9yKGk9MDtpPGtleWZyYW1lcy5sZW5ndGg7aSsrKSB7IC8vIGxvb3Aga2V5ZnJhbWVzXG4gICAgICBpZihrZXlmcmFtZXNbaV0uZm9jdXMpIHtcbiAgICAgICAgICBpZihib2R5SGVpZ2h0ICE9PSBpbml0RnJhbWVzW2luaXRGcmFtZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGluaXRGcmFtZXMucHVzaChib2R5SGVpZ2h0KTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBib2R5SGVpZ2h0ICs9IGtleWZyYW1lc1tpXS5kdXJhdGlvbjtcbiAgICAgIGlmKCQuaW5BcnJheShrZXlmcmFtZXNbaV0ud3JhcHBlciwgd3JhcHBlcnMpID09IC0xKSB7XG4gICAgICAgIHdyYXBwZXJzLnB1c2goa2V5ZnJhbWVzW2ldLndyYXBwZXIpO1xuICAgICAgfVxuICAgICAgZm9yKGo9MDtqPGtleWZyYW1lc1tpXS5hbmltYXRpb25zLmxlbmd0aDtqKyspIHsgLy8gbG9vcCBhbmltYXRpb25zXG4gICAgICAgIE9iamVjdC5rZXlzKGtleWZyYW1lc1tpXS5hbmltYXRpb25zW2pdKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkgeyAvLyBsb29wIHByb3BlcnRpZXNcbiAgICAgICAgICB2YXIgdmFsdWUgPSBrZXlmcmFtZXNbaV0uYW5pbWF0aW9uc1tqXVtrZXldO1xuICAgICAgICAgIGlmKGtleSAhPT0gJ3NlbGVjdG9yJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlU2V0ID0gW107XG4gICAgICAgICAgICB2YWx1ZVNldC5wdXNoKGdldERlZmF1bHRQcm9wZXJ0eVZhbHVlKGtleSksIHZhbHVlKTtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWVTZXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGtleWZyYW1lc1tpXS5hbmltYXRpb25zW2pdW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZyYW1lRm9jdXM6IGluaXRGcmFtZXMsXG4gICAgYm9keUhlaWdodDogYm9keUhlaWdodCxcbiAgICB3cmFwcGVyczogd3JhcHBlcnNcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZ2V0RGVmYXVsdFByb3BlcnR5VmFsdWUgPSBnZXREZWZhdWx0UHJvcGVydHlWYWx1ZTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdFByb3BlcnR5VmFsdWUocHJvcGVydHkpIHtcbiAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgIGNhc2UgJ3RyYW5zbGF0ZVgnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAndHJhbnNsYXRlWSc6XG4gICAgICByZXR1cm4gMDtcbiAgICBjYXNlICdzY2FsZSc6XG4gICAgICByZXR1cm4gMTtcbiAgICBjYXNlICdyb3RhdGUnOlxuICAgICAgcmV0dXJuIDA7XG4gICAgY2FzZSAnb3BhY2l0eSc6XG4gICAgICByZXR1cm4gMTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWxzL3BhZ2UtdXRpbHMuanNcbiAqKi8iLCJjb25zdCBQUk9QRVJUSUVTID0gWyd0cmFuc2xhdGVYJywgJ3RyYW5zbGF0ZVknLCAnb3BhY2l0eScsICdyb3RhdGUnLCAnc2NhbGUnXVxuY29uc3QgQU5JTUFUSU9OX1RJTUUgPSA0MVxuXG52YXIgJHdpbmRvdyA9ICQod2luZG93KVxudmFyICRib2R5ID0gJCgnYm9keSxodG1sJylcblxuY29uc3QgSU5JVF9TVEFURSA9IHtcblxuICAvLyBXcmFwcGVycyBhcmUgdGhlIGNvbnRhaW5lciBzY2VuZXMsIGtpbmQgb2YgbGlrZSBzZWN0aW9ucy5cbiAgLy8gVGhleSBhcmUgZGVmaW5lZCBieSB0aGUgZm9sZGVyIHN0cnVjdHVyZS5cbiAgLy8gVGhleSBoZWxwIHNoYXJpbmcgbXVsdGlwbGUgZm9jdXMgcG9pbnRzIGJldHdlZW4gaW50ZWdyYXRlZCBhbmltYXRpb25zLlxuXG4gICAgd3JhcHBlcnM6IFtdLFxuICAgIGN1cnJlbnRXcmFwcGVyOiBudWxsLFxuXG4gIC8vIEtub3cgc2Nyb2xsIGxvY2F0aW9uIGlzIGNyaXRpY2FsIHRvIHRoZSBzY2FuIGV4cGVyaWVuY2UuXG5cbiAgICBzY3JvbGxUb3A6ICR3aW5kb3cuc2Nyb2xsVG9wKCksXG4gICAgcmVsYXRpdmVTY3JvbGxUb3A6IDAsXG5cbiAgLy8gS2V5ZnJhbWVzIGFyZSB0aGUgYWN0dWFsIGFuaW1hdGlvbiBmcmFtZXMsIGRlZmluZWQgaW4gc2NlbmUuanNvbiB3aXRoXG4gIC8vIHNlbGVjdG9ycyBhbmQgYXNzb2NpYXRlZCBhbmltYXRpb25zLlxuICAvLyBPbmUgd3JhcHBlciBjYW4gaGF2ZSBtdWx0aXBsZSBrZXlmcmFtZXMuXG5cbiAgICBrZXlmcmFtZXM6IHVuZGVmaW5lZCxcblxuICAvLyBTdW0gb2YgYWxsIHByZXZpb3VzIGtleWZyYW1lcyAodG8ga25vdyByZWxhdGl2ZSBwb3NpdGlvbilcblxuICAgIHByZXZLZXlmcmFtZXNEdXJhdGlvbnM6IDAsXG5cbiAgLy8gQ3VycmVudCBrZXlmcmFtZSBhcnJheSBudW1iZXJcblxuICAgIGN1cnJlbnRLZXlmcmFtZTogMCxcblxuICAvLyBLZXlmcmFtZXMgY2FuIGJlIGRlZmluZWQgYXMgcG9pbnRzIG9mIGZvY3VzLlxuICAvLyBUaGVzZSBmb2N1cyBwb2ludHMgaGVscCBnaXZlIHRoZSB1c2VyIGZvY3VzIHdoZXJlIHRoZXkgbWF5IHdhbnQgaXQsIGxpa2Ugd2l0aFxuICAvLyBUaGUgc2xpZGUgZXhwZXJpZW5jZSBhbmQgdGhlIHNjcm9sbGJhciBsZWdlbmQuXG5cbiAgLy8gQXJyYXkgb2Ygb2JqZWN0cyB7dGltZTogLCBzY3JvbGw6IH1cbiAgICBmcmFtZUZvY3VzOiBbXSxcblxuICAvLyBJZCBvZiBjdXJyZW50IGZvY3VzXG5cbiAgICBjdXJyZW50Rm9jdXM6IDAsXG5cbiAgLy8gVE9ET1xuICAgIGN1cnJlbnRGcmFtZTogWzBdLFxuXG4gIC8vIFRPRE9cblxuICAgIHNjcm9sbFRpbWVvdXRJRDogMCxcblxuICAvLyBEZWZpbmluZyBkaW1lbnNpb25zIGZvciB0aGUgZXhwZXJpZW5jZVxuXG4gICAgYm9keUhlaWdodDogMCxcbiAgICB3aW5kb3dIZWlnaHQ6IDAsXG4gICAgd2luZG93V2lkdGg6IDBcblxufVxuXG5cbm1vZHVsZS5leHBvcnRzLklOSVRfU1RBVEUgPSBJTklUX1NUQVRFXG5tb2R1bGUuZXhwb3J0cy5QUk9QRVJUSUVTID0gUFJPUEVSVElFU1xubW9kdWxlLmV4cG9ydHMuQU5JTUFUSU9OX1RJTUUgPSBBTklNQVRJT05fVElNRVxubW9kdWxlLmV4cG9ydHMuJGJvZHkgPSAkYm9keVxubW9kdWxlLmV4cG9ydHMuJHdpbmRvdyA9ICR3aW5kb3dcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbnN0YW50cy5qc1xuICoqLyIsImNvbnN0IEtlZmlyID0gcmVxdWlyZSgna2VmaXInKVxuXG5jb25zdCBvYnNjZW5lID0gcmVxdWlyZSgnLi4vb2Itc2NlbmUuanMnKVxuXG5tb2R1bGUuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgdmFyIFBMQVlfU1BFRUQgPSAxMDtcblxuICB2YXIgaXNQbGF5aW5nID0gZmFsc2U7XG4gIHZhciBpc1BsYXlpbmdJbnRlcnZhbDtcbiAgdmFyIGJvZHlIZWlnaHQgPSAkKCdib2R5JykuaGVpZ2h0KCk7XG4gIHZhciBuYT0wO1xuXG4gIGNvbnN0IGtleVVwUHJlc3NlZCA9IEtlZmlyLmZyb21FdmVudHMoZG9jdW1lbnQsICdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZTtcbiAgfSk7XG5cbiAgY29uc3QgYmFja0tleSA9IGtleVVwUHJlc3NlZFxuICAgIC5maWx0ZXIoZSA9PiBlLmtleUNvZGUgPT09IDM4KVxuICBjb25zdCBuZXh0S2V5ID0ga2V5VXBQcmVzc2VkXG4gICAgLmZpbHRlcihlID0+IGUua2V5Q29kZSA9PT0gNDApXG5cbiAgY29uc3QgdG9nZ2xlVXBDbGlja2VkID0gS2VmaXIuZnJvbUV2ZW50cygkKFwiI3RvZ2dsZVVwXCIpLCAnY2xpY2snKVxuICBjb25zdCB0b2dnbGVEb3duQ2xpY2tlZCA9IEtlZmlyLmZyb21FdmVudHMoJChcIiN0b2dnbGVEb3duXCIpLCAnY2xpY2snKVxuXG4gIEtlZmlyLm1lcmdlKFtuZXh0S2V5LCB0b2dnbGVEb3duQ2xpY2tlZF0pXG4gICAgLm9uVmFsdWUoZSA9PiB7XG4gICAgICBvYnNjZW5lLmFjdGlvbignbmV4dCcpXG4gICAgfSlcblxuICBLZWZpci5tZXJnZShbYmFja0tleSwgdG9nZ2xlVXBDbGlja2VkXSlcbiAgICAub25WYWx1ZShlID0+IHtcbiAgICAgIG9ic2NlbmUuYWN0aW9uKCdwcmV2aW91cycpXG4gICAgfSlcblxuICAkKFwiI3RvZ2dsZVBsYXlcIikub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKFwiQ0xJQ0tcIik7XG4gICAgaWYoaXNQbGF5aW5nKSB7IHBhdXNlKCkgfSBlbHNlIHsgcGxheSgpIH1cbiAgfSlcblxuICBrZXlVcFByZXNzZWRcbiAgICAuZmlsdGVyKGUgPT4gZS5rZXlDb2RlID09PSA4MCB8fCBlLmtleUNvZGUgPT09IDMyKVxuICAgIC5vblZhbHVlKGUgPT4ge1xuICAgICAgaWYgKGlzUGxheWluZykgeyBwYXVzZSgpIH0gZWxzZSB7IHBsYXkoKSB9XG4gICAgfSlcblxuICBmdW5jdGlvbiBwbGF5KCkge1xuICAgIGNvbnNvbGUubG9nKFwiUExBWVwiKVxuICAgIGlzUGxheWluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBvYnNjZW5lLmFjdGlvbignbmV4dCcpO1xuICAgIH0sIDUwMDApO1xuICAgICQoXCIjdG9nZ2xlUGxheVwiKS5yZW1vdmVDbGFzcygnZmEtcGxheScpLmFkZENsYXNzKCdmYS1wYXVzZScpO1xuICAgIGlzUGxheWluZyA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlBBVVNFXCIpO1xuICAgIGNsZWFySW50ZXJ2YWwoaXNQbGF5aW5nSW50ZXJ2YWwpO1xuICAgIGlzUGxheWluZyA9IGZhbHNlO1xuICAgICQoXCIjdG9nZ2xlUGxheVwiKS5yZW1vdmVDbGFzcygnZmEtcGF1c2UnKS5hZGRDbGFzcygnZmEtcGxheScpO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdXNlci9jb250cm9scy5qc1xuICoqLyIsIi8qXG4gKiAgRGVwZW5kZW5jaWVzXG4qL1xuXG4gIGltcG9ydCB7IHNjcm9sbFRvcENoYW5nZWQkLCBkaW1lbnNpb25zQ2FsY3VsYXRlZCQsIHdyYXBwZXJDaGFuZ2VkJCB9IGZyb20gJy4uL29iLXNjZW5lLmpzJ1xuICBpbXBvcnQgKiBhcyBwYWdlVXRpbHMgZnJvbSAnLi4vdXRpbHMvcGFnZS11dGlscy5qcydcbiAgaW1wb3J0IHsgJHdpbmRvdywgJGJvZHkgfSBmcm9tICcuLi9jb25zdGFudHMuanMnXG5cbi8qXG4gKiAgQ2hpbGQgUmVuZGVyc1xuKi9cblxuICBjb25zdCByZW5kZXJXcmFwcGVyID0gcmVxdWlyZSgnLi93cmFwcGVyLmpzJylcbiAgY29uc3QgcmVuZGVyU2Nyb2xsYmFyID0gcmVxdWlyZSgnLi9zY3JvbGxiYXIuanMnKVxuICBjb25zdCByZW5kZXJBdWRpb1BsYXllciA9IHJlcXVpcmUoJy4vYXVkaW9wbGF5ZXIuanMnKVxuICBjb25zdCByZW5kZXJWaWRlb1BsYXllciA9IHJlcXVpcmUoJy4vdmlkZW9wbGF5ZXIuanMnKVxuICBjb25zdCByZW5kZXJFcnJvciA9IHJlcXVpcmUoJy4vZXJyb3IuanMnKVxuXG4vKlxuICogIFJlbmRlclxuKi9cblxuICAvLyBIYWNrIHRvIGZvcmNlIHJlc2l6ZSBvbmNlLiBGb3Igc29tZVxuICAvLyByZWFzb24gdGhpcyBwcmV2ZW50cyB0aGUgYW5pbWF0aW9ucyBmcm9tIGJsaW5raW5nIG9uIENocm9tZVxuICBzY3JvbGxUb3BDaGFuZ2VkJC50YWtlKDEpLmRlbGF5KDUwMCkub25WYWx1ZSgoKSA9PiB7XG4gICAgJHdpbmRvdy50cmlnZ2VyKCdyZXNpemUnKVxuICB9KVxuXG4gIC8vIFJlbmRlciBEaW1lbnNpb25zXG4gIGRpbWVuc2lvbnNDYWxjdWxhdGVkJC5vblZhbHVlKHN0YXRlID0+IHtcbiAgICAkYm9keS5oZWlnaHQoc3RhdGUuYm9keUhlaWdodClcbiAgICByZW5kZXJTY3JvbGxCYXJGb2N1c0JhcnMoc3RhdGUpXG4gIH0pXG5cbiAgICBmdW5jdGlvbiByZW5kZXJTY3JvbGxCYXJGb2N1c0JhcnMoc3RhdGUpIHtcbiAgICAgIHN0YXRlLmZyYW1lRm9jdXNcbiAgICAgICAgLm1hcCgoZm9jdXMpID0+IChmb2N1cyAvIHN0YXRlLmJvZHlIZWlnaHQpLnRvRml4ZWQoMikgKiAxMDApIC8vIENvbnZlcnQgdG8gcGVyY2VudFxuICAgICAgICAubWFwKChmb2N1c1BlcmNlbnQpID0+IGZvY3VzUGVyY2VudCArIFwidmhcIikgLy8gQ29udmVydCB0byB2aFxuICAgICAgICAubWFwKChmb2N1c1ZoKSA9PiB7XG4gICAgICAgICAgJChcIiNleHBlcmllbmNlLXByb2dyZXNzXCIpXG4gICAgICAgICAgICAuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiY2VudGVyLW1hcmtlclwiIHN0eWxlPVwidG9wOicgKyBmb2N1c1ZoICsgJ1wiPjwvZGl2PicpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gIC8vIFJlbmRlciBXcmFwcGVyXG4gIHdyYXBwZXJDaGFuZ2VkJC5vblZhbHVlKChjdXJyZW50V3JhcHBlcikgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiV1JBUFBFUiBDSEFOR0VEXCIpO1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgJChjdXJyZW50V3JhcHBlclswXSkuaGlkZSgpXG4gICAgICAkKGN1cnJlbnRXcmFwcGVyWzFdKS5zaG93KClcblxuICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBjdXJyZW50V3JhcHBlclsxXVxuICAgICAgZ2EoJ3NlbmQnLCAnc2NlbmVfYWNjZXNzZWQnLCBjdXJyZW50V3JhcHBlclsxXSkgLy8gR29vZ2xlIEFuYWx5dGljc1xuICAgICAgcmVuZGVyVmlkZW8oY3VycmVudFdyYXBwZXIpXG4gICAgICByZW5kZXJBdWRpbyhjdXJyZW50V3JhcHBlcilcbiAgICB9KVxuICB9KVxuXG4gICAgZnVuY3Rpb24gc2hvd0N1cnJlbnRXcmFwcGVycyhwcmV2LCBuZXh0KSB7XG4gICAgICBpZiAocHJldi5jdXJyZW50V3JhcHBlciA9PT0gbmV4dC5jdXJyZW50V3JhcHBlcikgeyByZXR1cm4gZmFsc2UgfVxuICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXZpb3VzJywgcHJldiwgbmV4dClcbiAgICAgICQocHJldi5jdXJyZW50V3JhcHBlcikuaGlkZSgpXG4gICAgICAkKG5leHQuY3VycmVudFdyYXBwZXIpLnNob3coKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclZpZGVvKHN0YXRlKSB7XG5cbiAgICAgICAgJCgndmlkZW8nLCBzdGF0ZVswXSkuYW5pbWF0ZSh7XG4gICAgICAgICAgdm9sdW1lOiAwXG4gICAgICAgIH0sIDMwMCwgJ3N3aW5nJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gcmVhbGx5IHN0b3AgdGhlIHZpZGVvXG4gICAgICAgICAgJCh0aGlzKS5nZXQoMCkucGF1c2UoKVxuICAgICAgICB9KVxuXG4gICAgICAgIGxldCAkbmV3VmlkZW8gPSAkKCd2aWRlbycsIHN0YXRlWzFdKVxuXG4gICAgICAgIGlmICgkbmV3VmlkZW9bMF0pIHtcbiAgICAgICAgICAkbmV3VmlkZW9bMF0ucGxheSgpXG4gICAgICAgICAgJG5ld1ZpZGVvLmFuaW1hdGUoe1xuICAgICAgICAgICAgdm9sdW1lOiAkbmV3VmlkZW8uYXR0cignbWF4LXZvbHVtZScpIHx8IDFcbiAgICAgICAgICB9LCAzMDAsICdzd2luZycpXG4gICAgICAgICAgcmVuZGVyVmlkZW9QbGF5ZXIuc3RhcnQoJG5ld1ZpZGVvKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbmRlclZpZGVvUGxheWVyLnN0b3AoJG5ld1ZpZGVvKVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyQXVkaW8oc3RhdGUpIHtcbiAgICAgIHJlbmRlckF1ZGlvUGxheWVyLm5leHQoc3RhdGVbMV0uc3Vic3RyKDEpKTtcbiAgICB9XG5cbiAgLy8gUmVuZGVyIEtleWZyYW1lc1xuXG4gIHNjcm9sbFRvcENoYW5nZWQkLm9uVmFsdWUoKHN0YXRlZGlmZikgPT4ge1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGxldCBwcmV2ID0gc3RhdGVkaWZmWzBdXG4gICAgICAgIGxldCBuZXh0ID0gc3RhdGVkaWZmWzFdXG5cbiAgICAgICAgYW5pbWF0ZUVsZW1lbnRzKG5leHQpXG4gICAgICAgIGFuaW1hdGVTY3JvbGxCYXIobmV4dClcbiAgICAgICAgLy8gcmVuZGVyTXVzaWMobmV4dClcbiAgICB9KVxuXG4gIH0pXG5cbiAgICBmdW5jdGlvbiByZW5kZXJNdXNpYyh3cmFwcGVySWQpIHtcbiAgICAgIGF1ZGlvcGxheWVyLm5leHQod3JhcHBlcklkLnN1YnN0cigxKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlU2Nyb2xsQmFyKHN0YXRlKSB7XG4gICAgICB2YXIgcGVyY2VudCA9IChzdGF0ZS5zY3JvbGxUb3AgLyBzdGF0ZS5ib2R5SGVpZ2h0KS50b0ZpeGVkKDIpICogMTAwXG4gICAgICAkKCcjZXhwZXJpZW5jZS1wcm9ncmVzcyAucHJvZ3Jlc3MnKS5jc3Moe1xuICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZVkoJyArIHBlcmNlbnQgKyAnJSknXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVFbGVtZW50cyhzdGF0ZSkge1xuICAgICAgdmFyIGFuaW1hdGlvbiwgdHJhbnNsYXRlWSwgdHJhbnNsYXRlWCwgc2NhbGUsIHJvdGF0ZSwgb3BhY2l0eVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5rZXlmcmFtZXNbc3RhdGUuY3VycmVudEtleWZyYW1lXS5hbmltYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFuaW1hdGlvbiA9IHN0YXRlLmtleWZyYW1lc1tzdGF0ZS5jdXJyZW50S2V5ZnJhbWVdLmFuaW1hdGlvbnNbaV1cbiAgICAgICAgdHJhbnNsYXRlWSA9IGNhbGNQcm9wVmFsdWUoYW5pbWF0aW9uLCAndHJhbnNsYXRlWScsIHN0YXRlKVxuICAgICAgICB0cmFuc2xhdGVYID0gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sICd0cmFuc2xhdGVYJywgc3RhdGUpXG4gICAgICAgIHNjYWxlID0gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sICdzY2FsZScsIHN0YXRlKVxuICAgICAgICByb3RhdGUgPSBjYWxjUHJvcFZhbHVlKGFuaW1hdGlvbiwgJ3JvdGF0ZScsIHN0YXRlKVxuICAgICAgICBvcGFjaXR5ID0gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sICdvcGFjaXR5Jywgc3RhdGUpXG4gICAgICAgICQoYW5pbWF0aW9uLnNlbGVjdG9yLCBzdGF0ZS5jdXJyZW50V3JhcHBlcikuY3NzKHtcbiAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJ3B4LCAnICsgdHJhbnNsYXRlWSArICdweCwgMCkgc2NhbGUoJyArIHNjYWxlICsgJykgcm90YXRlKCcgKyByb3RhdGUgKyAnZGVnKScsXG4gICAgICAgICAgJ29wYWNpdHknOiBvcGFjaXR5LnRvRml4ZWQoMilcbiAgICAgICAgfSlcblxuICAgICAgfVxuICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2FsY1Byb3BWYWx1ZShhbmltYXRpb24sIHByb3BlcnR5LCBzdGF0ZSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBhbmltYXRpb25bcHJvcGVydHldXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHZhbHVlID0gZWFzZUluT3V0UXVhZChzdGF0ZS5yZWxhdGl2ZVNjcm9sbFRvcCwgdmFsdWVbMF0sICh2YWx1ZVsxXSAtIHZhbHVlWzBdKSwgc3RhdGUua2V5ZnJhbWVzW3N0YXRlLmN1cnJlbnRLZXlmcmFtZV0uZHVyYXRpb24pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWUgPSBwYWdlVXRpbHMuZ2V0RGVmYXVsdFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG4gICAgICAgIH1cbiAgICAgICAgLy8gdmFsdWUgPSArdmFsdWUudG9GaXhlZCgyKVxuICAgICAgICAvLyBURU1QT1JBUklMWSBSRU1PVkVEIENBVVNFIFNDQUxFIERPRVNOJ1QgV09SSyBXSVRIQSBBR1JFU1NJVkUgUk9VTkRJTkcgTElLRSBUSElTXG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXREZWZhdWx0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkge1xuICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICAgY2FzZSAndHJhbnNsYXRlWCc6XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIGNhc2UgJ3RyYW5zbGF0ZVknOlxuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICBjYXNlICdzY2FsZSc6XG4gICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICAgIGNhc2UgJ3JvdGF0ZSc6XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICAgIGNhc2UgJ29wYWNpdHknOlxuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgLy9zaW51c29hZGlhbCBpbiBhbmQgb3V0XG4gICAgICAgIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYlxuICAgICAgfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyL2luZGV4LmpzXG4gKiovIiwiY29uc3QgJHdpbmRvdyA9ICQod2luZG93KVxuY29uc3QgJGJvZHkgPSAkKCdib2R5LGh0bWwnKVxuY29uc3QgJGV4cGVyaWVuY2VJbmRpY2F0b3IgPSAkKCcjZXhwZXJpZW5jZS1wcm9ncmVzcyAucHJvZ3Jlc3MnKVxuY29uc3QgJGV4cGVyaWVuY2VQcm9ncmVzcyA9ICQoXCIjZXhwZXJpZW5jZS1wcm9ncmVzc1wiKVxuXG5mdW5jdGlvbiByZW5kZXJTY3JvbGwoc2Nyb2xsKSB7XG4gIGNvbnNvbGUubG9nKFwiUkVOREVSXCIsIHNjcm9sbCwgTWF0aC5mbG9vcigkd2luZG93LnNjcm9sbFRvcCgpKSlcbiAgJGJvZHkuYW5pbWF0ZSh7XG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxcbiAgfSwgMTUwMCwgJ2xpbmVhcicpO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlU2Nyb2xsQmFyKCkge1xuICB2YXIgcGVyY2VudCA9IChzY3JvbGxUb3AgLyBib2R5SGVpZ2h0KS50b0ZpeGVkKDIpICogMTAwO1xuICAkZXhwZXJpZW5jZUluZGljYXRvci5jc3Moe1xuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoJHtwZXJjZW50fSUpYFxuICB9KVxufVxuXG5mdW5jdGlvbiBidWlsZFNjcm9sbEJhckNlbnRlcnMoKSB7XG4gIGZyYW1lRm9jdXNcbiAgICAubWFwKChjZW50ZXIpID0+IChjZW50ZXIgLyBib2R5SGVpZ2h0KS50b0ZpeGVkKDIpICogMTAwKVxuICAgIC5tYXAoKGNlbnRlclBlcmNlbnQpID0+IGNlbnRlclBlcmNlbnQgKyBcInZoXCIpXG4gICAgLm1hcCgoY2VudGVyVmgpID0+IHtcbiAgICAgICRleHBlcmllbmNlUHJvZ3Jlc3NcbiAgICAgICAgLmFwcGVuZCgnPGRpdiBjbGFzcz1cImNlbnRlci1tYXJrZXJcIiBzdHlsZT1cInRvcDonICsgY2VudGVyVmggKyAnXCI+PC9kaXY+Jyk7XG4gICAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZW5kZXIvc2Nyb2xsYmFyLmpzXG4gKiovIiwiY29uc3QgbG9vcGVyID0gcmVxdWlyZSgnLi9sb29wZXIuanMnKTtcblxubW9kdWxlLmV4cG9ydHMubmV4dCA9IG5leHQ7XG5cbm1vZHVsZS5leHBvcnRzLmNvbmZpZyA9IChjb25maWcpID0+IHtcbiAgbG9vcGVyLmNvbmZpZyhjb25maWcpXG59O1xuXG5tb2R1bGUuZXhwb3J0cy5wbGF5ID0gKCkgPT4ge1xuICBsb29wZXIucGxheSgpXG59O1xuXG5cbmZ1bmN0aW9uIG5leHQoaWQpIHtcbiAgbG9vcGVyLm5leHQoaWQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyL2F1ZGlvcGxheWVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgSG93bCA9IHJlcXVpcmUoJ2hvd2xlcicpLkhvd2w7XG5cbnZhciBsb29wcyA9IHt9O1xudmFyIGxvb3A7XG5cbm1vZHVsZS5leHBvcnRzLmNvbmZpZyA9IChjb25maWcpID0+IHtcbiAgbG9vcHMgPSBjb25maWcubWFwKGMgPT4ge1xuICAgIGxldCBhdWRpb0NvbmZpZyA9IHtcbiAgICAgIHNyYzogWydtZWRpYS8nKyBjLmF1ZGlvLnNyYyArJy5tcDMnXSxcbiAgICAgIGh0bWw1OiB0cnVlLFxuICAgICAgdm9sdW1lOiAwXG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAnaWQnOiBjLmlkLFxuICAgICAgJ3ZvbCc6IGMuYXVkaW8ubWF4LFxuICAgICAgJ3NvdW5kMSc6IG5ldyBIb3dsKGF1ZGlvQ29uZmlnKSxcbiAgICAgICdzb3VuZDInOiBuZXcgSG93bChhdWRpb0NvbmZpZylcbiAgICB9XG4gIH0pLnJlZHVjZSggKHByZXYsbmV4dCkgPT4gIHtwcmV2W25leHQuaWRdID0gbmV4dDsgcmV0dXJuIHByZXY7fSwge30pXG59XG5cbm1vZHVsZS5leHBvcnRzLm5leHQgPSAoaWQpID0+IHtcbiAgLy8gY29uc29sZS5sb2coJ25leHQnLCBpZClcbiAgbG9vcCA9IGxvb3BzW2lkXTtcbiAgLy8gY29uc29sZS5sb2cobG9vcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLnBhdXNlID0gKGNvbmZpZykgPT4ge1xuXG59XG5cbm1vZHVsZS5leHBvcnRzLnBsYXkgPSAoY29uZmlnKSA9PiB7XG4gIGxvb3BlcigpO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zdG9wID0gKGNvbmZpZykgPT4ge1xuXG59XG5cbmZ1bmN0aW9uIGxvb3BlcigpIHtcblxuICAndXNlIHN0cmljdCc7XG4gIC8vIGNvbnNvbGUubG9nKCdsb29wZXInLCBsb29wLnNvdW5kMSlcbiAgbGV0IGZhZGVQZXJjZW50ID0gKGxvb3Auc291bmQxLmR1cmF0aW9uKCkgPiA1KSAgPyAwLjAxIDogMC4wMTU7IC8vIDIlIG9yIDElIGRlcGVuZGluZyBvbiBpZiBzb3VuZCBpcyBvdmVyIDUgc2Vjb25kc1xuICBsZXQgZmFkZXJhdGUgPSAgMSAtIGZhZGVQZXJjZW50O1xuICBsZXQgZHVyYXRpb24gPSBsb29wLnNvdW5kMS5kdXJhdGlvbigpICogMTAwMCAqICgxIC0gZmFkZVBlcmNlbnQpO1xuICBsZXQgdm9sdW1lID0gbG9vcC52b2w7XG4gIC8vIGNvbnNvbGUubG9nKGZhZGVyYXRlLCBmYWRlUGVyY2VudCwgZHVyYXRpb24sIHZvbHVtZSk7XG5cbiAgbG9vcC5zb3VuZDEucGxheSgpO1xuICBsb29wLnNvdW5kMS5mYWRlKDAsdm9sdW1lLCBkdXJhdGlvbiAqIGZhZGVQZXJjZW50KTtcblxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb29wLnNvdW5kMS5mYWRlKHZvbHVtZSwwLCBkdXJhdGlvbiAqIGZhZGVQZXJjZW50KTtcbiAgfSwgZHVyYXRpb24gKiBmYWRlcmF0ZSApO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGxvb3Auc291bmQyLnBsYXkoKTtcbiAgICBsb29wLnNvdW5kMi5mYWRlKDAsdm9sdW1lLCBkdXJhdGlvbiAqIGZhZGVQZXJjZW50KTtcbiAgfSwgZHVyYXRpb24gKiBmYWRlcmF0ZSk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbG9vcC5zb3VuZDIuZmFkZSh2b2x1bWUsMCwgZHVyYXRpb24gKiBmYWRlUGVyY2VudCk7XG4gICAgbG9vcGVyKCk7XG4gIH0sIGR1cmF0aW9uICogMiAqIGZhZGVyYXRlKTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cy5sb29wID0gbG9vcGVyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyL2xvb3Blci5qc1xuICoqLyIsIi8qISBob3dsZXIuanMgdjIuMC4wLWJldGE3IHwgKGMpIDIwMTMtMjAxNiwgSmFtZXMgU2ltcHNvbiBvZiBHb2xkRmlyZSBTdHVkaW9zIHwgTUlUIExpY2Vuc2UgfCBob3dsZXJqcy5jb20gKi9cbiFmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoKXt0cnl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEF1ZGlvQ29udGV4dD9uPW5ldyBBdWRpb0NvbnRleHQ6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdlYmtpdEF1ZGlvQ29udGV4dD9uPW5ldyB3ZWJraXRBdWRpb0NvbnRleHQ6bz0hMX1jYXRjaChlKXtvPSExfWlmKCFvKWlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBBdWRpbyl0cnl7dmFyIGQ9bmV3IEF1ZGlvO1widW5kZWZpbmVkXCI9PXR5cGVvZiBkLm9uY2FucGxheXRocm91Z2gmJih1PVwiY2FucGxheVwiKX1jYXRjaChlKXt0PSEwfWVsc2UgdD0hMDt0cnl7dmFyIGQ9bmV3IEF1ZGlvO2QubXV0ZWQmJih0PSEwKX1jYXRjaChlKXt9dmFyIGE9L2lQKGhvbmV8b2R8YWQpLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSksaT1uYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8pLF89aT9wYXJzZUludChpWzFdLDEwKTpudWxsO2lmKGEmJl8mJjk+Xyl7dmFyIHM9L3NhZmFyaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTsod2luZG93Lm5hdmlnYXRvci5zdGFuZGFsb25lJiYhc3x8IXdpbmRvdy5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSYmIXMpJiYobz0hMSl9byYmKHI9XCJ1bmRlZmluZWRcIj09dHlwZW9mIG4uY3JlYXRlR2Fpbj9uLmNyZWF0ZUdhaW5Ob2RlKCk6bi5jcmVhdGVHYWluKCksci5nYWluLnZhbHVlPTEsci5jb25uZWN0KG4uZGVzdGluYXRpb24pKX12YXIgbj1udWxsLG89ITAsdD0hMSxyPW51bGwsdT1cImNhbnBsYXl0aHJvdWdoXCI7ZSgpO3ZhciBkPWZ1bmN0aW9uKCl7dGhpcy5pbml0KCl9O2QucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKCl7dmFyIGU9dGhpc3x8YTtyZXR1cm4gZS5fY29kZWNzPXt9LGUuX2hvd2xzPVtdLGUuX211dGVkPSExLGUuX3ZvbHVtZT0xLGUuc3RhdGU9bj9uLnN0YXRlfHxcInJ1bm5pbmdcIjpcInJ1bm5pbmdcIixlLmF1dG9TdXNwZW5kPSEwLGUuX2F1dG9TdXNwZW5kKCksZS5tb2JpbGVBdXRvRW5hYmxlPSEwLGUubm9BdWRpbz10LGUudXNpbmdXZWJBdWRpbz1vLGUuY3R4PW4sdHx8ZS5fc2V0dXBDb2RlY3MoKSxlfSx2b2x1bWU6ZnVuY3Rpb24oZSl7dmFyIG49dGhpc3x8YTtpZihlPXBhcnNlRmxvYXQoZSksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUmJmU+PTAmJjE+PWUpe24uX3ZvbHVtZT1lLG8mJihyLmdhaW4udmFsdWU9ZSk7Zm9yKHZhciB0PTA7dDxuLl9ob3dscy5sZW5ndGg7dCsrKWlmKCFuLl9ob3dsc1t0XS5fd2ViQXVkaW8pZm9yKHZhciB1PW4uX2hvd2xzW3RdLl9nZXRTb3VuZElkcygpLGQ9MDtkPHUubGVuZ3RoO2QrKyl7dmFyIGk9bi5faG93bHNbdF0uX3NvdW5kQnlJZCh1W2RdKTtpJiZpLl9ub2RlJiYoaS5fbm9kZS52b2x1bWU9aS5fdm9sdW1lKmUpfXJldHVybiBufXJldHVybiBuLl92b2x1bWV9LG11dGU6ZnVuY3Rpb24oZSl7dmFyIG49dGhpc3x8YTtuLl9tdXRlZD1lLG8mJihyLmdhaW4udmFsdWU9ZT8wOm4uX3ZvbHVtZSk7Zm9yKHZhciB0PTA7dDxuLl9ob3dscy5sZW5ndGg7dCsrKWlmKCFuLl9ob3dsc1t0XS5fd2ViQXVkaW8pZm9yKHZhciB1PW4uX2hvd2xzW3RdLl9nZXRTb3VuZElkcygpLGQ9MDtkPHUubGVuZ3RoO2QrKyl7dmFyIGk9bi5faG93bHNbdF0uX3NvdW5kQnlJZCh1W2RdKTtpJiZpLl9ub2RlJiYoaS5fbm9kZS5tdXRlZD1lPyEwOmkuX211dGVkKX1yZXR1cm4gbn0sdW5sb2FkOmZ1bmN0aW9uKCl7Zm9yKHZhciBvPXRoaXN8fGEsdD1vLl9ob3dscy5sZW5ndGgtMTt0Pj0wO3QtLSlvLl9ob3dsc1t0XS51bmxvYWQoKTtyZXR1cm4gby51c2luZ1dlYkF1ZGlvJiZcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jbG9zZSYmKG8uY3R4PW51bGwsbi5jbG9zZSgpLGUoKSxvLmN0eD1uKSxvfSxjb2RlY3M6ZnVuY3Rpb24oZSl7cmV0dXJuKHRoaXN8fGEpLl9jb2RlY3NbZV19LF9zZXR1cENvZGVjczpmdW5jdGlvbigpe3ZhciBlPXRoaXN8fGEsbj1uZXcgQXVkaW8sbz1uLmNhblBsYXlUeXBlKFwiYXVkaW8vbXBlZztcIikucmVwbGFjZSgvXm5vJC8sXCJcIiksdD0vT1BSXFwvLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO3JldHVybiBlLl9jb2RlY3M9e21wMzohKHR8fCFvJiYhbi5jYW5QbGF5VHlwZShcImF1ZGlvL21wMztcIikucmVwbGFjZSgvXm5vJC8sXCJcIikpLG1wZWc6ISFvLG9wdXM6ISFuLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cIm9wdXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLG9nZzohIW4uY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxvZ2E6ISFuLmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksd2F2OiEhbi5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxhYWM6ISFuLmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxtNGE6ISEobi5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbTRhO1wiKXx8bi5jYW5QbGF5VHlwZShcImF1ZGlvL200YTtcIil8fG4uY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxtcDQ6ISEobi5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbXA0O1wiKXx8bi5jYW5QbGF5VHlwZShcImF1ZGlvL21wNDtcIil8fG4uY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx3ZWJhOiEhbi5jYW5QbGF5VHlwZSgnYXVkaW8vd2VibTsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx3ZWJtOiEhbi5jYW5QbGF5VHlwZSgnYXVkaW8vd2VibTsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxkb2xieTohIW4uY2FuUGxheVR5cGUoJ2F1ZGlvL21wNDsgY29kZWNzPVwiZWMtM1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIil9LGV9LF9lbmFibGVNb2JpbGVBdWRpbzpmdW5jdGlvbigpe3ZhciBlPXRoaXN8fGEsbz0vaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkfEJsYWNrQmVycnl8QkIxMHxTaWxrL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSx0PSEhKFwib250b3VjaGVuZFwiaW4gd2luZG93fHxuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHM+MHx8bmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHM+MCk7aWYoIW58fCFlLl9tb2JpbGVFbmFibGVkJiZvJiZ0KXtlLl9tb2JpbGVFbmFibGVkPSExO3ZhciByPWZ1bmN0aW9uKCl7dmFyIG89bi5jcmVhdGVCdWZmZXIoMSwxLDIyMDUwKSx0PW4uY3JlYXRlQnVmZmVyU291cmNlKCk7dC5idWZmZXI9byx0LmNvbm5lY3Qobi5kZXN0aW5hdGlvbiksXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQuc3RhcnQ/dC5ub3RlT24oMCk6dC5zdGFydCgwKSx0Lm9uZW5kZWQ9ZnVuY3Rpb24oKXt0LmRpc2Nvbm5lY3QoMCksZS5fbW9iaWxlRW5hYmxlZD0hMCxlLm1vYmlsZUF1dG9FbmFibGU9ITEsZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsciwhMCl9fTtyZXR1cm4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsciwhMCksZX19LF9hdXRvU3VzcGVuZDpmdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYoZS5hdXRvU3VzcGVuZCYmbiYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uc3VzcGVuZCYmbyl7Zm9yKHZhciB0PTA7dDxlLl9ob3dscy5sZW5ndGg7dCsrKWlmKGUuX2hvd2xzW3RdLl93ZWJBdWRpbylmb3IodmFyIHI9MDtyPGUuX2hvd2xzW3RdLl9zb3VuZHMubGVuZ3RoO3IrKylpZighZS5faG93bHNbdF0uX3NvdW5kc1tyXS5fcGF1c2VkKXJldHVybiBlO3JldHVybiBlLl9zdXNwZW5kVGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe2UuYXV0b1N1c3BlbmQmJihlLl9zdXNwZW5kVGltZXI9bnVsbCxlLnN0YXRlPVwic3VzcGVuZGluZ1wiLG4uc3VzcGVuZCgpLnRoZW4oZnVuY3Rpb24oKXtlLnN0YXRlPVwic3VzcGVuZGVkXCIsZS5fcmVzdW1lQWZ0ZXJTdXNwZW5kJiYoZGVsZXRlIGUuX3Jlc3VtZUFmdGVyU3VzcGVuZCxlLl9hdXRvUmVzdW1lKCkpfSkpfSwzZTQpLGV9fSxfYXV0b1Jlc3VtZTpmdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYobiYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucmVzdW1lJiZvKXJldHVyblwicnVubmluZ1wiPT09ZS5zdGF0ZSYmZS5fc3VzcGVuZFRpbWVyPyhjbGVhclRpbWVvdXQoZS5fc3VzcGVuZFRpbWVyKSxlLl9zdXNwZW5kVGltZXI9bnVsbCk6XCJzdXNwZW5kZWRcIj09PWUuc3RhdGU/KGUuc3RhdGU9XCJyZXN1bWluZ1wiLG4ucmVzdW1lKCkudGhlbihmdW5jdGlvbigpe2Uuc3RhdGU9XCJydW5uaW5nXCJ9KSxlLl9zdXNwZW5kVGltZXImJihjbGVhclRpbWVvdXQoZS5fc3VzcGVuZFRpbWVyKSxlLl9zdXNwZW5kVGltZXI9bnVsbCkpOlwic3VzcGVuZGluZ1wiPT09ZS5zdGF0ZSYmKGUuX3Jlc3VtZUFmdGVyU3VzcGVuZD0hMCksZX19O3ZhciBhPW5ldyBkLGk9ZnVuY3Rpb24oZSl7dmFyIG49dGhpcztyZXR1cm4gZS5zcmMmJjAhPT1lLnNyYy5sZW5ndGg/dm9pZCBuLmluaXQoZSk6dm9pZCBjb25zb2xlLmVycm9yKFwiQW4gYXJyYXkgb2Ygc291cmNlIGZpbGVzIG11c3QgYmUgcGFzc2VkIHdpdGggYW55IG5ldyBIb3dsLlwiKX07aS5wcm90b3R5cGU9e2luaXQ6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztyZXR1cm4gdC5fYXV0b3BsYXk9ZS5hdXRvcGxheXx8ITEsdC5fZm9ybWF0PVwic3RyaW5nXCIhPXR5cGVvZiBlLmZvcm1hdD9lLmZvcm1hdDpbZS5mb3JtYXRdLHQuX2h0bWw1PWUuaHRtbDV8fCExLHQuX211dGVkPWUubXV0ZXx8ITEsdC5fbG9vcD1lLmxvb3B8fCExLHQuX3Bvb2w9ZS5wb29sfHw1LHQuX3ByZWxvYWQ9XCJib29sZWFuXCI9PXR5cGVvZiBlLnByZWxvYWQ/ZS5wcmVsb2FkOiEwLHQuX3JhdGU9ZS5yYXRlfHwxLHQuX3Nwcml0ZT1lLnNwcml0ZXx8e30sdC5fc3JjPVwic3RyaW5nXCIhPXR5cGVvZiBlLnNyYz9lLnNyYzpbZS5zcmNdLHQuX3ZvbHVtZT12b2lkIDAhPT1lLnZvbHVtZT9lLnZvbHVtZToxLHQuX2R1cmF0aW9uPTAsdC5fbG9hZGVkPSExLHQuX3NvdW5kcz1bXSx0Ll9lbmRUaW1lcnM9e30sdC5fcXVldWU9W10sdC5fb25lbmQ9ZS5vbmVuZD9be2ZuOmUub25lbmR9XTpbXSx0Ll9vbmZhZGU9ZS5vbmZhZGU/W3tmbjplLm9uZmFkZX1dOltdLHQuX29ubG9hZD1lLm9ubG9hZD9be2ZuOmUub25sb2FkfV06W10sdC5fb25sb2FkZXJyb3I9ZS5vbmxvYWRlcnJvcj9be2ZuOmUub25sb2FkZXJyb3J9XTpbXSx0Ll9vbnBhdXNlPWUub25wYXVzZT9be2ZuOmUub25wYXVzZX1dOltdLHQuX29ucGxheT1lLm9ucGxheT9be2ZuOmUub25wbGF5fV06W10sdC5fb25zdG9wPWUub25zdG9wP1t7Zm46ZS5vbnN0b3B9XTpbXSx0Ll9vbm11dGU9ZS5vbm11dGU/W3tmbjplLm9ubXV0ZX1dOltdLHQuX29udm9sdW1lPWUub252b2x1bWU/W3tmbjplLm9udm9sdW1lfV06W10sdC5fb25yYXRlPWUub25yYXRlP1t7Zm46ZS5vbnJhdGV9XTpbXSx0Ll9vbnNlZWs9ZS5vbnNlZWs/W3tmbjplLm9uc2Vla31dOltdLHQuX3dlYkF1ZGlvPW8mJiF0Ll9odG1sNSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbiYmbiYmYS5tb2JpbGVBdXRvRW5hYmxlJiZhLl9lbmFibGVNb2JpbGVBdWRpbygpLGEuX2hvd2xzLnB1c2godCksdC5fcHJlbG9hZCYmdC5sb2FkKCksdH0sbG9hZDpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj1udWxsO2lmKHQpcmV0dXJuIHZvaWQgZS5fZW1pdChcImxvYWRlcnJvclwiLG51bGwsXCJObyBhdWRpbyBzdXBwb3J0LlwiKTtcInN0cmluZ1wiPT10eXBlb2YgZS5fc3JjJiYoZS5fc3JjPVtlLl9zcmNdKTtmb3IodmFyIG89MDtvPGUuX3NyYy5sZW5ndGg7bysrKXt2YXIgcix1O2lmKGUuX2Zvcm1hdCYmZS5fZm9ybWF0W29dP3I9ZS5fZm9ybWF0W29dOih1PWUuX3NyY1tvXSxyPS9eZGF0YTphdWRpb1xcLyhbXjssXSspOy9pLmV4ZWModSkscnx8KHI9L1xcLihbXi5dKykkLy5leGVjKHUuc3BsaXQoXCI/XCIsMSlbMF0pKSxyJiYocj1yWzFdLnRvTG93ZXJDYXNlKCkpKSxhLmNvZGVjcyhyKSl7bj1lLl9zcmNbb107YnJlYWt9fXJldHVybiBuPyhlLl9zcmM9bixcImh0dHBzOlwiPT09d2luZG93LmxvY2F0aW9uLnByb3RvY29sJiZcImh0dHA6XCI9PT1uLnNsaWNlKDAsNSkmJihlLl9odG1sNT0hMCxlLl93ZWJBdWRpbz0hMSksbmV3IF8oZSksZS5fd2ViQXVkaW8mJmwoZSksZSk6dm9pZCBlLl9lbWl0KFwibG9hZGVycm9yXCIsbnVsbCxcIk5vIGNvZGVjIHN1cHBvcnQgZm9yIHNlbGVjdGVkIGF1ZGlvIHNvdXJjZXMuXCIpfSxwbGF5OmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXMsdD1hcmd1bWVudHMscj1udWxsO2lmKFwibnVtYmVyXCI9PXR5cGVvZiBlKXI9ZSxlPW51bGw7ZWxzZSBpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgZSl7ZT1cIl9fZGVmYXVsdFwiO2Zvcih2YXIgZD0wLGk9MDtpPG8uX3NvdW5kcy5sZW5ndGg7aSsrKW8uX3NvdW5kc1tpXS5fcGF1c2VkJiYhby5fc291bmRzW2ldLl9lbmRlZCYmKGQrKyxyPW8uX3NvdW5kc1tpXS5faWQpOzE9PT1kP2U9bnVsbDpyPW51bGx9dmFyIF89cj9vLl9zb3VuZEJ5SWQocik6by5faW5hY3RpdmVTb3VuZCgpO2lmKCFfKXJldHVybiBudWxsO2lmKHImJiFlJiYoZT1fLl9zcHJpdGV8fFwiX19kZWZhdWx0XCIpLCFvLl9sb2FkZWQmJiFvLl9zcHJpdGVbZV0pcmV0dXJuIG8uX3F1ZXVlLnB1c2goe2V2ZW50OlwicGxheVwiLGFjdGlvbjpmdW5jdGlvbigpe28ucGxheShvLl9zb3VuZEJ5SWQoXy5faWQpP18uX2lkOnZvaWQgMCl9fSksXy5faWQ7aWYociYmIV8uX3BhdXNlZClyZXR1cm4gXy5faWQ7by5fd2ViQXVkaW8mJmEuX2F1dG9SZXN1bWUoKTt2YXIgcz1fLl9zZWVrPjA/Xy5fc2VlazpvLl9zcHJpdGVbZV1bMF0vMWUzLGw9KG8uX3Nwcml0ZVtlXVswXStvLl9zcHJpdGVbZV1bMV0pLzFlMy1zLGY9MWUzKmwvTWF0aC5hYnMoXy5fcmF0ZSk7ZiE9PTEvMCYmKG8uX2VuZFRpbWVyc1tfLl9pZF09c2V0VGltZW91dChvLl9lbmRlZC5iaW5kKG8sXyksZikpLF8uX3BhdXNlZD0hMSxfLl9lbmRlZD0hMSxfLl9zcHJpdGU9ZSxfLl9zZWVrPXMsXy5fc3RhcnQ9by5fc3ByaXRlW2VdWzBdLzFlMyxfLl9zdG9wPShvLl9zcHJpdGVbZV1bMF0rby5fc3ByaXRlW2VdWzFdKS8xZTMsXy5fbG9vcD0hKCFfLl9sb29wJiYhby5fc3ByaXRlW2VdWzJdKTt2YXIgYz1fLl9ub2RlO2lmKG8uX3dlYkF1ZGlvKXt2YXIgcD1mdW5jdGlvbigpe28uX3JlZnJlc2hCdWZmZXIoXyk7dmFyIGU9Xy5fbXV0ZWR8fG8uX211dGVkPzA6Xy5fdm9sdW1lKmEudm9sdW1lKCk7Yy5nYWluLnNldFZhbHVlQXRUaW1lKGUsbi5jdXJyZW50VGltZSksXy5fcGxheVN0YXJ0PW4uY3VycmVudFRpbWUsXCJ1bmRlZmluZWRcIj09dHlwZW9mIGMuYnVmZmVyU291cmNlLnN0YXJ0P18uX2xvb3A/Yy5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCxzLDg2NDAwKTpjLmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLHMsbCk6Xy5fbG9vcD9jLmJ1ZmZlclNvdXJjZS5zdGFydCgwLHMsODY0MDApOmMuYnVmZmVyU291cmNlLnN0YXJ0KDAscyxsKSxvLl9lbmRUaW1lcnNbXy5faWRdfHxmPT09MS8wfHwoby5fZW5kVGltZXJzW18uX2lkXT1zZXRUaW1lb3V0KG8uX2VuZGVkLmJpbmQobyxfKSxmKSksdFsxXXx8c2V0VGltZW91dChmdW5jdGlvbigpe28uX2VtaXQoXCJwbGF5XCIsXy5faWQpfSwwKX07by5fbG9hZGVkP3AoKTooby5vbmNlKFwibG9hZFwiLHAsXy5faWQpLG8uX2NsZWFyVGltZXIoXy5faWQpKX1lbHNle3ZhciBtPWZ1bmN0aW9uKCl7Yy5jdXJyZW50VGltZT1zLGMubXV0ZWQ9Xy5fbXV0ZWR8fG8uX211dGVkfHxhLl9tdXRlZHx8Yy5tdXRlZCxjLnZvbHVtZT1fLl92b2x1bWUqYS52b2x1bWUoKSxjLnBsYXliYWNrUmF0ZT1fLl9yYXRlLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtjLnBsYXkoKSx0WzFdfHxvLl9lbWl0KFwicGxheVwiLF8uX2lkKX0sMCl9O2lmKDQ9PT1jLnJlYWR5U3RhdGV8fCFjLnJlYWR5U3RhdGUmJm5hdmlnYXRvci5pc0NvY29vbkpTKW0oKTtlbHNle3ZhciB2PWZ1bmN0aW9uKCl7ZiE9PTEvMCYmKG8uX2VuZFRpbWVyc1tfLl9pZF09c2V0VGltZW91dChvLl9lbmRlZC5iaW5kKG8sXyksZikpLG0oKSxjLnJlbW92ZUV2ZW50TGlzdGVuZXIodSx2LCExKX07Yy5hZGRFdmVudExpc3RlbmVyKHUsdiwhMSksby5fY2xlYXJUaW1lcihfLl9pZCl9fXJldHVybiBfLl9pZH0scGF1c2U6ZnVuY3Rpb24oZSl7dmFyIG49dGhpcztpZighbi5fbG9hZGVkKXJldHVybiBuLl9xdWV1ZS5wdXNoKHtldmVudDpcInBhdXNlXCIsYWN0aW9uOmZ1bmN0aW9uKCl7bi5wYXVzZShlKX19KSxuO2Zvcih2YXIgbz1uLl9nZXRTb3VuZElkcyhlKSx0PTA7dDxvLmxlbmd0aDt0Kyspe24uX2NsZWFyVGltZXIob1t0XSk7dmFyIHI9bi5fc291bmRCeUlkKG9bdF0pO2lmKHImJiFyLl9wYXVzZWQpe2lmKHIuX3NlZWs9bi5zZWVrKG9bdF0pLHIuX3BhdXNlZD0hMCxuLl9zdG9wRmFkZShvW3RdKSxyLl9ub2RlKWlmKG4uX3dlYkF1ZGlvKXtpZighci5fbm9kZS5idWZmZXJTb3VyY2UpcmV0dXJuIG47XCJ1bmRlZmluZWRcIj09dHlwZW9mIHIuX25vZGUuYnVmZmVyU291cmNlLnN0b3A/ci5fbm9kZS5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTpyLl9ub2RlLmJ1ZmZlclNvdXJjZS5zdG9wKDApLHIuX25vZGUuYnVmZmVyU291cmNlPW51bGx9ZWxzZSBpc05hTihyLl9ub2RlLmR1cmF0aW9uKSYmci5fbm9kZS5kdXJhdGlvbiE9PTEvMHx8ci5fbm9kZS5wYXVzZSgpO2FyZ3VtZW50c1sxXXx8bi5fZW1pdChcInBhdXNlXCIsci5faWQpfX1yZXR1cm4gbn0sc3RvcDpmdW5jdGlvbihlKXt2YXIgbj10aGlzO2lmKCFuLl9sb2FkZWQpcmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uX3NvdW5kc1swXS5fc3ByaXRlJiZuLl9xdWV1ZS5wdXNoKHtldmVudDpcInN0b3BcIixhY3Rpb246ZnVuY3Rpb24oKXtuLnN0b3AoZSl9fSksbjtmb3IodmFyIG89bi5fZ2V0U291bmRJZHMoZSksdD0wO3Q8by5sZW5ndGg7dCsrKXtuLl9jbGVhclRpbWVyKG9bdF0pO3ZhciByPW4uX3NvdW5kQnlJZChvW3RdKTtpZihyJiYhci5fcGF1c2VkKXtpZihyLl9zZWVrPXIuX3N0YXJ0fHwwLHIuX3BhdXNlZD0hMCxyLl9lbmRlZD0hMCxuLl9zdG9wRmFkZShvW3RdKSxyLl9ub2RlKWlmKG4uX3dlYkF1ZGlvKXtpZighci5fbm9kZS5idWZmZXJTb3VyY2UpcmV0dXJuIG47XCJ1bmRlZmluZWRcIj09dHlwZW9mIHIuX25vZGUuYnVmZmVyU291cmNlLnN0b3A/ci5fbm9kZS5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTpyLl9ub2RlLmJ1ZmZlclNvdXJjZS5zdG9wKDApLHIuX25vZGUuYnVmZmVyU291cmNlPW51bGx9ZWxzZSBpc05hTihyLl9ub2RlLmR1cmF0aW9uKSYmci5fbm9kZS5kdXJhdGlvbiE9PTEvMHx8KHIuX25vZGUucGF1c2UoKSxyLl9ub2RlLmN1cnJlbnRUaW1lPXIuX3N0YXJ0fHwwKTtuLl9lbWl0KFwic3RvcFwiLHIuX2lkKX19cmV0dXJuIG59LG11dGU6ZnVuY3Rpb24oZSxvKXt2YXIgdD10aGlzO2lmKCF0Ll9sb2FkZWQpcmV0dXJuIHQuX3F1ZXVlLnB1c2goe2V2ZW50OlwibXV0ZVwiLGFjdGlvbjpmdW5jdGlvbigpe3QubXV0ZShlLG8pfX0pLHQ7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIG8pe2lmKFwiYm9vbGVhblwiIT10eXBlb2YgZSlyZXR1cm4gdC5fbXV0ZWQ7dC5fbXV0ZWQ9ZX1mb3IodmFyIHI9dC5fZ2V0U291bmRJZHMobyksdT0wO3U8ci5sZW5ndGg7dSsrKXt2YXIgZD10Ll9zb3VuZEJ5SWQoclt1XSk7ZCYmKGQuX211dGVkPWUsdC5fd2ViQXVkaW8mJmQuX25vZGU/ZC5fbm9kZS5nYWluLnNldFZhbHVlQXRUaW1lKGU/MDpkLl92b2x1bWUqYS52b2x1bWUoKSxuLmN1cnJlbnRUaW1lKTpkLl9ub2RlJiYoZC5fbm9kZS5tdXRlZD1hLl9tdXRlZD8hMDplKSx0Ll9lbWl0KFwibXV0ZVwiLGQuX2lkKSl9cmV0dXJuIHR9LHZvbHVtZTpmdW5jdGlvbigpe3ZhciBlLG8sdD10aGlzLHI9YXJndW1lbnRzO2lmKDA9PT1yLmxlbmd0aClyZXR1cm4gdC5fdm9sdW1lO2lmKDE9PT1yLmxlbmd0aCl7dmFyIHU9dC5fZ2V0U291bmRJZHMoKSxkPXUuaW5kZXhPZihyWzBdKTtkPj0wP289cGFyc2VJbnQoclswXSwxMCk6ZT1wYXJzZUZsb2F0KHJbMF0pfWVsc2Ugci5sZW5ndGg+PTImJihlPXBhcnNlRmxvYXQoclswXSksbz1wYXJzZUludChyWzFdLDEwKSk7dmFyIGk7aWYoIShcInVuZGVmaW5lZFwiIT10eXBlb2YgZSYmZT49MCYmMT49ZSkpcmV0dXJuIGk9bz90Ll9zb3VuZEJ5SWQobyk6dC5fc291bmRzWzBdLGk/aS5fdm9sdW1lOjA7aWYoIXQuX2xvYWRlZClyZXR1cm4gdC5fcXVldWUucHVzaCh7ZXZlbnQ6XCJ2b2x1bWVcIixhY3Rpb246ZnVuY3Rpb24oKXt0LnZvbHVtZS5hcHBseSh0LHIpfX0pLHQ7XCJ1bmRlZmluZWRcIj09dHlwZW9mIG8mJih0Ll92b2x1bWU9ZSksbz10Ll9nZXRTb3VuZElkcyhvKTtmb3IodmFyIF89MDtfPG8ubGVuZ3RoO18rKylpPXQuX3NvdW5kQnlJZChvW19dKSxpJiYoaS5fdm9sdW1lPWUsclsyXXx8dC5fc3RvcEZhZGUob1tfXSksdC5fd2ViQXVkaW8mJmkuX25vZGUmJiFpLl9tdXRlZD9pLl9ub2RlLmdhaW4uc2V0VmFsdWVBdFRpbWUoZSphLnZvbHVtZSgpLG4uY3VycmVudFRpbWUpOmkuX25vZGUmJiFpLl9tdXRlZCYmKGkuX25vZGUudm9sdW1lPWUqYS52b2x1bWUoKSksdC5fZW1pdChcInZvbHVtZVwiLGkuX2lkKSk7cmV0dXJuIHR9LGZhZGU6ZnVuY3Rpb24oZSxvLHQscil7dmFyIHU9dGhpcztpZighdS5fbG9hZGVkKXJldHVybiB1Ll9xdWV1ZS5wdXNoKHtldmVudDpcImZhZGVcIixhY3Rpb246ZnVuY3Rpb24oKXt1LmZhZGUoZSxvLHQscil9fSksdTt1LnZvbHVtZShlLHIpO2Zvcih2YXIgZD11Ll9nZXRTb3VuZElkcyhyKSxhPTA7YTxkLmxlbmd0aDthKyspe3ZhciBpPXUuX3NvdW5kQnlJZChkW2FdKTtpZihpKWlmKHJ8fHUuX3N0b3BGYWRlKGRbYV0pLHUuX3dlYkF1ZGlvJiYhaS5fbXV0ZWQpe3ZhciBfPW4uY3VycmVudFRpbWUscz1fK3QvMWUzO2kuX3ZvbHVtZT1lLGkuX25vZGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZShlLF8pLGkuX25vZGUuZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZShvLHMpLGkuX3RpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbihlLHQpe2RlbGV0ZSB0Ll90aW1lb3V0LHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0Ll92b2x1bWU9byx1Ll9lbWl0KFwiZmFkZVwiLGUpfSxzLW4uY3VycmVudFRpbWU+MD9NYXRoLmNlaWwoMWUzKihzLW4uY3VycmVudFRpbWUpKTowKX0uYmluZCh1LGRbYV0saSksdCl9ZWxzZXt2YXIgbD1NYXRoLmFicyhlLW8pLGY9ZT5vP1wib3V0XCI6XCJpblwiLGM9bC8uMDEscD10L2M7IWZ1bmN0aW9uKCl7dmFyIG49ZTtpLl9pbnRlcnZhbD1zZXRJbnRlcnZhbChmdW5jdGlvbihlLHQpe24rPVwiaW5cIj09PWY/LjAxOi0uMDEsbj1NYXRoLm1heCgwLG4pLG49TWF0aC5taW4oMSxuKSxuPU1hdGgucm91bmQoMTAwKm4pLzEwMCx1LnZvbHVtZShuLGUsITApLG49PT1vJiYoY2xlYXJJbnRlcnZhbCh0Ll9pbnRlcnZhbCksZGVsZXRlIHQuX2ludGVydmFsLHUuX2VtaXQoXCJmYWRlXCIsZSkpfS5iaW5kKHUsZFthXSxpKSxwKX0oKX19cmV0dXJuIHV9LF9zdG9wRmFkZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzLHQ9by5fc291bmRCeUlkKGUpO3JldHVybiB0Ll9pbnRlcnZhbD8oY2xlYXJJbnRlcnZhbCh0Ll9pbnRlcnZhbCksZGVsZXRlIHQuX2ludGVydmFsLG8uX2VtaXQoXCJmYWRlXCIsZSkpOnQuX3RpbWVvdXQmJihjbGVhclRpbWVvdXQodC5fdGltZW91dCksZGVsZXRlIHQuX3RpbWVvdXQsdC5fbm9kZS5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyhuLmN1cnJlbnRUaW1lKSxvLl9lbWl0KFwiZmFkZVwiLGUpKSxvfSxsb29wOmZ1bmN0aW9uKCl7dmFyIGUsbixvLHQ9dGhpcyxyPWFyZ3VtZW50cztpZigwPT09ci5sZW5ndGgpcmV0dXJuIHQuX2xvb3A7aWYoMT09PXIubGVuZ3RoKXtpZihcImJvb2xlYW5cIiE9dHlwZW9mIHJbMF0pcmV0dXJuIG89dC5fc291bmRCeUlkKHBhcnNlSW50KHJbMF0sMTApKSxvP28uX2xvb3A6ITE7ZT1yWzBdLHQuX2xvb3A9ZX1lbHNlIDI9PT1yLmxlbmd0aCYmKGU9clswXSxuPXBhcnNlSW50KHJbMV0sMTApKTtmb3IodmFyIHU9dC5fZ2V0U291bmRJZHMobiksZD0wO2Q8dS5sZW5ndGg7ZCsrKW89dC5fc291bmRCeUlkKHVbZF0pLG8mJihvLl9sb29wPWUsdC5fd2ViQXVkaW8mJm8uX25vZGUmJm8uX25vZGUuYnVmZmVyU291cmNlJiYoby5fbm9kZS5idWZmZXJTb3VyY2UubG9vcD1lKSk7cmV0dXJuIHR9LHJhdGU6ZnVuY3Rpb24oKXt2YXIgZSxuLG89dGhpcyx0PWFyZ3VtZW50cztpZigwPT09dC5sZW5ndGgpbj1vLl9zb3VuZHNbMF0uX2lkO2Vsc2UgaWYoMT09PXQubGVuZ3RoKXt2YXIgcj1vLl9nZXRTb3VuZElkcygpLHU9ci5pbmRleE9mKHRbMF0pO3U+PTA/bj1wYXJzZUludCh0WzBdLDEwKTplPXBhcnNlRmxvYXQodFswXSl9ZWxzZSAyPT09dC5sZW5ndGgmJihlPXBhcnNlRmxvYXQodFswXSksbj1wYXJzZUludCh0WzFdLDEwKSk7dmFyIGQ7aWYoXCJudW1iZXJcIiE9dHlwZW9mIGUpcmV0dXJuIGQ9by5fc291bmRCeUlkKG4pLGQ/ZC5fcmF0ZTpvLl9yYXRlO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8uX3F1ZXVlLnB1c2goe2V2ZW50OlwicmF0ZVwiLGFjdGlvbjpmdW5jdGlvbigpe28ucmF0ZS5hcHBseShvLHQpfX0pLG87XCJ1bmRlZmluZWRcIj09dHlwZW9mIG4mJihvLl9yYXRlPWUpLG49by5fZ2V0U291bmRJZHMobik7Zm9yKHZhciBhPTA7YTxuLmxlbmd0aDthKyspaWYoZD1vLl9zb3VuZEJ5SWQoblthXSkpe2QuX3JhdGU9ZSxvLl93ZWJBdWRpbyYmZC5fbm9kZSYmZC5fbm9kZS5idWZmZXJTb3VyY2U/ZC5fbm9kZS5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlPWU6ZC5fbm9kZSYmKGQuX25vZGUucGxheWJhY2tSYXRlPWUpO3ZhciBpPW8uc2VlayhuW2FdKSxfPShvLl9zcHJpdGVbZC5fc3ByaXRlXVswXStvLl9zcHJpdGVbZC5fc3ByaXRlXVsxXSkvMWUzLWkscz0xZTMqXy9NYXRoLmFicyhkLl9yYXRlKTtvLl9jbGVhclRpbWVyKG5bYV0pLG8uX2VuZFRpbWVyc1tuW2FdXT1zZXRUaW1lb3V0KG8uX2VuZGVkLmJpbmQobyxkKSxzKSxvLl9lbWl0KFwicmF0ZVwiLGQuX2lkKX1yZXR1cm4gb30sc2VlazpmdW5jdGlvbigpe3ZhciBlLG8sdD10aGlzLHI9YXJndW1lbnRzO2lmKDA9PT1yLmxlbmd0aClvPXQuX3NvdW5kc1swXS5faWQ7ZWxzZSBpZigxPT09ci5sZW5ndGgpe3ZhciB1PXQuX2dldFNvdW5kSWRzKCksZD11LmluZGV4T2YoclswXSk7ZD49MD9vPXBhcnNlSW50KHJbMF0sMTApOihvPXQuX3NvdW5kc1swXS5faWQsZT1wYXJzZUZsb2F0KHJbMF0pKX1lbHNlIDI9PT1yLmxlbmd0aCYmKGU9cGFyc2VGbG9hdChyWzBdKSxvPXBhcnNlSW50KHJbMV0sMTApKTtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgbylyZXR1cm4gdDtpZighdC5fbG9hZGVkKXJldHVybiB0Ll9xdWV1ZS5wdXNoKHtldmVudDpcInNlZWtcIixhY3Rpb246ZnVuY3Rpb24oKXt0LnNlZWsuYXBwbHkodCxyKX19KSx0O3ZhciBhPXQuX3NvdW5kQnlJZChvKTtpZihhKXtpZighKGU+PTApKXJldHVybiB0Ll93ZWJBdWRpbz9hLl9zZWVrKyh0LnBsYXlpbmcobyk/bi5jdXJyZW50VGltZS1hLl9wbGF5U3RhcnQ6MCk6YS5fbm9kZS5jdXJyZW50VGltZTt2YXIgaT10LnBsYXlpbmcobyk7aSYmdC5wYXVzZShvLCEwKSxhLl9zZWVrPWUsdC5fY2xlYXJUaW1lcihvKSxpJiZ0LnBsYXkobywhMCksdC5fZW1pdChcInNlZWtcIixvKX1yZXR1cm4gdH0scGxheWluZzpmdW5jdGlvbihlKXt2YXIgbj10aGlzLG89bi5fc291bmRCeUlkKGUpfHxuLl9zb3VuZHNbMF07cmV0dXJuIG8/IW8uX3BhdXNlZDohMX0sZHVyYXRpb246ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZHVyYXRpb259LHVubG9hZDpmdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLG49ZS5fc291bmRzLG89MDtvPG4ubGVuZ3RoO28rKyl7bltvXS5fcGF1c2VkfHwoZS5zdG9wKG5bb10uX2lkKSxlLl9lbWl0KFwiZW5kXCIsbltvXS5faWQpKSxlLl93ZWJBdWRpb3x8KG5bb10uX25vZGUuc3JjPVwiXCIsbltvXS5fbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIixuW29dLl9lcnJvckZuLCExKSxuW29dLl9ub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIodSxuW29dLl9sb2FkRm4sITEpKSxkZWxldGUgbltvXS5fbm9kZSxlLl9jbGVhclRpbWVyKG5bb10uX2lkKTt2YXIgdD1hLl9ob3dscy5pbmRleE9mKGUpO3Q+PTAmJmEuX2hvd2xzLnNwbGljZSh0LDEpfXJldHVybiBzJiZkZWxldGUgc1tlLl9zcmNdLGUuX3NvdW5kcz1bXSxlPW51bGwsbnVsbH0sb246ZnVuY3Rpb24oZSxuLG8sdCl7dmFyIHI9dGhpcyx1PXJbXCJfb25cIitlXTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZ1LnB1c2godD97aWQ6byxmbjpuLG9uY2U6dH06e2lkOm8sZm46bn0pLHJ9LG9mZjpmdW5jdGlvbihlLG4sbyl7dmFyIHQ9dGhpcyxyPXRbXCJfb25cIitlXTtpZihuKXtmb3IodmFyIHU9MDt1PHIubGVuZ3RoO3UrKylpZihuPT09clt1XS5mbiYmbz09PXJbdV0uaWQpe3Iuc3BsaWNlKHUsMSk7YnJlYWt9fWVsc2UgaWYoZSl0W1wiX29uXCIrZV09W107ZWxzZSBmb3IodmFyIGQ9T2JqZWN0LmtleXModCksdT0wO3U8ZC5sZW5ndGg7dSsrKTA9PT1kW3VdLmluZGV4T2YoXCJfb25cIikmJkFycmF5LmlzQXJyYXkodFtkW3VdXSkmJih0W2RbdV1dPVtdKTtyZXR1cm4gdH0sb25jZTpmdW5jdGlvbihlLG4sbyl7dmFyIHQ9dGhpcztyZXR1cm4gdC5vbihlLG4sbywxKSx0fSxfZW1pdDpmdW5jdGlvbihlLG4sbyl7Zm9yKHZhciB0PXRoaXMscj10W1wiX29uXCIrZV0sdT1yLmxlbmd0aC0xO3U+PTA7dS0tKXJbdV0uaWQmJnJbdV0uaWQhPT1uJiZcImxvYWRcIiE9PWV8fChzZXRUaW1lb3V0KGZ1bmN0aW9uKGUpe2UuY2FsbCh0aGlzLG4sbyl9LmJpbmQodCxyW3VdLmZuKSwwKSxyW3VdLm9uY2UmJnQub2ZmKGUsclt1XS5mbixyW3VdLmlkKSk7cmV0dXJuIHR9LF9sb2FkUXVldWU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2lmKGUuX3F1ZXVlLmxlbmd0aD4wKXt2YXIgbj1lLl9xdWV1ZVswXTtlLm9uY2Uobi5ldmVudCxmdW5jdGlvbigpe2UuX3F1ZXVlLnNoaWZ0KCksZS5fbG9hZFF1ZXVlKCl9KSxuLmFjdGlvbigpfXJldHVybiBlfSxfZW5kZWQ6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcyx0PWUuX3Nwcml0ZSxyPSEoIWUuX2xvb3AmJiFvLl9zcHJpdGVbdF1bMl0pO2lmKG8uX2VtaXQoXCJlbmRcIixlLl9pZCksIW8uX3dlYkF1ZGlvJiZyJiZvLnN0b3AoZS5faWQpLnBsYXkoZS5faWQpLG8uX3dlYkF1ZGlvJiZyKXtvLl9lbWl0KFwicGxheVwiLGUuX2lkKSxlLl9zZWVrPWUuX3N0YXJ0fHwwLGUuX3BsYXlTdGFydD1uLmN1cnJlbnRUaW1lO3ZhciB1PTFlMyooZS5fc3RvcC1lLl9zdGFydCkvTWF0aC5hYnMoZS5fcmF0ZSk7by5fZW5kVGltZXJzW2UuX2lkXT1zZXRUaW1lb3V0KG8uX2VuZGVkLmJpbmQobyxlKSx1KX1yZXR1cm4gby5fd2ViQXVkaW8mJiFyJiYoZS5fcGF1c2VkPSEwLGUuX2VuZGVkPSEwLGUuX3NlZWs9ZS5fc3RhcnR8fDAsby5fY2xlYXJUaW1lcihlLl9pZCksZS5fbm9kZS5idWZmZXJTb3VyY2U9bnVsbCxhLl9hdXRvU3VzcGVuZCgpKSxvLl93ZWJBdWRpb3x8cnx8by5zdG9wKGUuX2lkKSxvfSxfY2xlYXJUaW1lcjpmdW5jdGlvbihlKXt2YXIgbj10aGlzO3JldHVybiBuLl9lbmRUaW1lcnNbZV0mJihjbGVhclRpbWVvdXQobi5fZW5kVGltZXJzW2VdKSxkZWxldGUgbi5fZW5kVGltZXJzW2VdKSxufSxfc291bmRCeUlkOmZ1bmN0aW9uKGUpe2Zvcih2YXIgbj10aGlzLG89MDtvPG4uX3NvdW5kcy5sZW5ndGg7bysrKWlmKGU9PT1uLl9zb3VuZHNbb10uX2lkKXJldHVybiBuLl9zb3VuZHNbb107cmV0dXJuIG51bGx9LF9pbmFjdGl2ZVNvdW5kOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztlLl9kcmFpbigpO2Zvcih2YXIgbj0wO248ZS5fc291bmRzLmxlbmd0aDtuKyspaWYoZS5fc291bmRzW25dLl9lbmRlZClyZXR1cm4gZS5fc291bmRzW25dLnJlc2V0KCk7cmV0dXJuIG5ldyBfKGUpfSxfZHJhaW46ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG49ZS5fcG9vbCxvPTAsdD0wO2lmKCEoZS5fc291bmRzLmxlbmd0aDxuKSl7Zm9yKHQ9MDt0PGUuX3NvdW5kcy5sZW5ndGg7dCsrKWUuX3NvdW5kc1t0XS5fZW5kZWQmJm8rKztmb3IodD1lLl9zb3VuZHMubGVuZ3RoLTE7dD49MDt0LS0pe2lmKG4+PW8pcmV0dXJuO2UuX3NvdW5kc1t0XS5fZW5kZWQmJihlLl93ZWJBdWRpbyYmZS5fc291bmRzW3RdLl9ub2RlJiZlLl9zb3VuZHNbdF0uX25vZGUuZGlzY29ubmVjdCgwKSxlLl9zb3VuZHMuc3BsaWNlKHQsMSksby0tKX19fSxfZ2V0U291bmRJZHM6ZnVuY3Rpb24oZSl7dmFyIG49dGhpcztpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgZSl7Zm9yKHZhciBvPVtdLHQ9MDt0PG4uX3NvdW5kcy5sZW5ndGg7dCsrKW8ucHVzaChuLl9zb3VuZHNbdF0uX2lkKTtyZXR1cm4gb31yZXR1cm5bZV19LF9yZWZyZXNoQnVmZmVyOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuIGUuX25vZGUuYnVmZmVyU291cmNlPW4uY3JlYXRlQnVmZmVyU291cmNlKCksZS5fbm9kZS5idWZmZXJTb3VyY2UuYnVmZmVyPXNbby5fc3JjXSxlLl9ub2RlLmJ1ZmZlclNvdXJjZS5jb25uZWN0KGUuX3Bhbm5lcj9lLl9wYW5uZXI6ZS5fbm9kZSksZS5fbm9kZS5idWZmZXJTb3VyY2UubG9vcD1lLl9sb29wLGUuX2xvb3AmJihlLl9ub2RlLmJ1ZmZlclNvdXJjZS5sb29wU3RhcnQ9ZS5fc3RhcnR8fDAsZS5fbm9kZS5idWZmZXJTb3VyY2UubG9vcEVuZD1lLl9zdG9wKSxlLl9ub2RlLmJ1ZmZlclNvdXJjZS5wbGF5YmFja1JhdGUudmFsdWU9by5fcmF0ZSxvfX07dmFyIF89ZnVuY3Rpb24oZSl7dGhpcy5fcGFyZW50PWUsdGhpcy5pbml0KCl9O2lmKF8ucHJvdG90eXBlPXtpbml0OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxuPWUuX3BhcmVudDtyZXR1cm4gZS5fbXV0ZWQ9bi5fbXV0ZWQsZS5fbG9vcD1uLl9sb29wLGUuX3ZvbHVtZT1uLl92b2x1bWUsZS5fbXV0ZWQ9bi5fbXV0ZWQsZS5fcmF0ZT1uLl9yYXRlLGUuX3NlZWs9MCxlLl9wYXVzZWQ9ITAsZS5fZW5kZWQ9ITAsZS5fc3ByaXRlPVwiX19kZWZhdWx0XCIsZS5faWQ9TWF0aC5yb3VuZChEYXRlLm5vdygpKk1hdGgucmFuZG9tKCkpLG4uX3NvdW5kcy5wdXNoKGUpLGUuY3JlYXRlKCksZX0sY3JlYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxvPWUuX3BhcmVudCx0PWEuX211dGVkfHxlLl9tdXRlZHx8ZS5fcGFyZW50Ll9tdXRlZD8wOmUuX3ZvbHVtZSphLnZvbHVtZSgpO3JldHVybiBvLl93ZWJBdWRpbz8oZS5fbm9kZT1cInVuZGVmaW5lZFwiPT10eXBlb2Ygbi5jcmVhdGVHYWluP24uY3JlYXRlR2Fpbk5vZGUoKTpuLmNyZWF0ZUdhaW4oKSxlLl9ub2RlLmdhaW4uc2V0VmFsdWVBdFRpbWUodCxuLmN1cnJlbnRUaW1lKSxlLl9ub2RlLnBhdXNlZD0hMCxlLl9ub2RlLmNvbm5lY3QocikpOihlLl9ub2RlPW5ldyBBdWRpbyxlLl9lcnJvckZuPWUuX2Vycm9yTGlzdGVuZXIuYmluZChlKSxlLl9ub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGUuX2Vycm9yRm4sITEpLGUuX2xvYWRGbj1lLl9sb2FkTGlzdGVuZXIuYmluZChlKSxlLl9ub2RlLmFkZEV2ZW50TGlzdGVuZXIodSxlLl9sb2FkRm4sITEpLGUuX25vZGUuc3JjPW8uX3NyYyxlLl9ub2RlLnByZWxvYWQ9XCJhdXRvXCIsZS5fbm9kZS52b2x1bWU9dCxlLl9ub2RlLmxvYWQoKSksZX0scmVzZXQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG49ZS5fcGFyZW50O3JldHVybiBlLl9tdXRlZD1uLl9tdXRlZCxlLl9sb29wPW4uX2xvb3AsZS5fdm9sdW1lPW4uX3ZvbHVtZSxlLl9tdXRlZD1uLl9tdXRlZCxlLl9yYXRlPW4uX3JhdGUsZS5fc2Vlaz0wLGUuX3BhdXNlZD0hMCxlLl9lbmRlZD0hMCxlLl9zcHJpdGU9XCJfX2RlZmF1bHRcIixlLl9pZD1NYXRoLnJvdW5kKERhdGUubm93KCkqTWF0aC5yYW5kb20oKSksZX0sX2Vycm9yTGlzdGVuZXI6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO2UuX25vZGUuZXJyb3ImJjQ9PT1lLl9ub2RlLmVycm9yLmNvZGUmJihhLm5vQXVkaW89ITApLGUuX3BhcmVudC5fZW1pdChcImxvYWRlcnJvclwiLGUuX2lkLGUuX25vZGUuZXJyb3I/ZS5fbm9kZS5lcnJvci5jb2RlOjApLGUuX25vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZS5fZXJyb3JMaXN0ZW5lciwhMSl9LF9sb2FkTGlzdGVuZXI6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG49ZS5fcGFyZW50O24uX2R1cmF0aW9uPU1hdGguY2VpbCgxMCplLl9ub2RlLmR1cmF0aW9uKS8xMCwwPT09T2JqZWN0LmtleXMobi5fc3ByaXRlKS5sZW5ndGgmJihuLl9zcHJpdGU9e19fZGVmYXVsdDpbMCwxZTMqbi5fZHVyYXRpb25dfSksbi5fbG9hZGVkfHwobi5fbG9hZGVkPSEwLG4uX2VtaXQoXCJsb2FkXCIpLG4uX2xvYWRRdWV1ZSgpKSxuLl9hdXRvcGxheSYmbi5wbGF5KCksZS5fbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHUsZS5fbG9hZEZuLCExKX19LG8pdmFyIHM9e30sbD1mdW5jdGlvbihlKXt2YXIgbj1lLl9zcmM7aWYoc1tuXSlyZXR1cm4gZS5fZHVyYXRpb249c1tuXS5kdXJhdGlvbix2b2lkIHAoZSk7aWYoL15kYXRhOlteO10rO2Jhc2U2NCwvLnRlc3Qobikpe3dpbmRvdy5hdG9iPXdpbmRvdy5hdG9ifHxmdW5jdGlvbihlKXtmb3IodmFyIG4sbyx0PVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIixyPVN0cmluZyhlKS5yZXBsYWNlKC89KyQvLFwiXCIpLHU9MCxkPTAsYT1cIlwiO289ci5jaGFyQXQoZCsrKTt+byYmKG49dSU0PzY0Km4rbzpvLHUrKyU0KT9hKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSZuPj4oLTIqdSY2KSk6MClvPXQuaW5kZXhPZihvKTtyZXR1cm4gYX07Zm9yKHZhciBvPWF0b2Iobi5zcGxpdChcIixcIilbMV0pLHQ9bmV3IFVpbnQ4QXJyYXkoby5sZW5ndGgpLHI9MDtyPG8ubGVuZ3RoOysrcil0W3JdPW8uY2hhckNvZGVBdChyKTtjKHQuYnVmZmVyLGUpfWVsc2V7dmFyIHU9bmV3IFhNTEh0dHBSZXF1ZXN0O3Uub3BlbihcIkdFVFwiLG4sITApLHUucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIix1Lm9ubG9hZD1mdW5jdGlvbigpe2ModS5yZXNwb25zZSxlKX0sdS5vbmVycm9yPWZ1bmN0aW9uKCl7ZS5fd2ViQXVkaW8mJihlLl9odG1sNT0hMCxlLl93ZWJBdWRpbz0hMSxlLl9zb3VuZHM9W10sZGVsZXRlIHNbbl0sZS5sb2FkKCkpfSxmKHUpfX0sZj1mdW5jdGlvbihlKXt0cnl7ZS5zZW5kKCl9Y2F0Y2gobil7ZS5vbmVycm9yKCl9fSxjPWZ1bmN0aW9uKGUsbyl7bi5kZWNvZGVBdWRpb0RhdGEoZSxmdW5jdGlvbihlKXtlJiZvLl9zb3VuZHMubGVuZ3RoPjAmJihzW28uX3NyY109ZSxwKG8sZSkpfSxmdW5jdGlvbigpe28uX2VtaXQoXCJsb2FkZXJyb3JcIixudWxsLFwiRGVjb2RpbmcgYXVkaW8gZGF0YSBmYWlsZWQuXCIpfSl9LHA9ZnVuY3Rpb24oZSxuKXtuJiYhZS5fZHVyYXRpb24mJihlLl9kdXJhdGlvbj1uLmR1cmF0aW9uKSwwPT09T2JqZWN0LmtleXMoZS5fc3ByaXRlKS5sZW5ndGgmJihlLl9zcHJpdGU9e19fZGVmYXVsdDpbMCwxZTMqZS5fZHVyYXRpb25dfSksZS5fbG9hZGVkfHwoZS5fbG9hZGVkPSEwLGUuX2VtaXQoXCJsb2FkXCIpLGUuX2xvYWRRdWV1ZSgpKSxlLl9hdXRvcGxheSYmZS5wbGF5KCl9O1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFtdLGZ1bmN0aW9uKCl7cmV0dXJue0hvd2xlcjphLEhvd2w6aX19KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyYmKGV4cG9ydHMuSG93bGVyPWEsZXhwb3J0cy5Ib3dsPWkpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/KHdpbmRvdy5Ib3dsZXJHbG9iYWw9ZCx3aW5kb3cuSG93bGVyPWEsd2luZG93Lkhvd2w9aSx3aW5kb3cuU291bmQ9Xyk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbCYmKGdsb2JhbC5Ib3dsZXJHbG9iYWw9ZCxnbG9iYWwuSG93bGVyPWEsZ2xvYmFsLkhvd2w9aSxnbG9iYWwuU291bmQ9Xyl9KCk7XG4vKiEgRWZmZWN0cyBQbHVnaW4gKi9cbiFmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO0hvd2xlckdsb2JhbC5wcm90b3R5cGUuX3Bvcz1bMCwwLDBdLEhvd2xlckdsb2JhbC5wcm90b3R5cGUuX29yaWVudGF0aW9uPVswLDAsLTEsMCwxLDBdLEhvd2xlckdsb2JhbC5wcm90b3R5cGUuX3ZlbG9jaXR5PVswLDAsMF0sSG93bGVyR2xvYmFsLnByb3RvdHlwZS5fbGlzdGVuZXJBdHRyPXtkb3BwbGVyRmFjdG9yOjEsc3BlZWRPZlNvdW5kOjM0My4zfSxIb3dsZXJHbG9iYWwucHJvdG90eXBlLnBvcz1mdW5jdGlvbihlLG4sdCl7dmFyIG89dGhpcztyZXR1cm4gby5jdHgmJm8uY3R4Lmxpc3RlbmVyPyhuPVwibnVtYmVyXCIhPXR5cGVvZiBuP28uX3Bvc1sxXTpuLHQ9XCJudW1iZXJcIiE9dHlwZW9mIHQ/by5fcG9zWzJdOnQsXCJudW1iZXJcIiE9dHlwZW9mIGU/by5fcG9zOihvLl9wb3M9W2Usbix0XSxvLmN0eC5saXN0ZW5lci5zZXRQb3NpdGlvbihvLl9wb3NbMF0sby5fcG9zWzFdLG8uX3Bvc1syXSksbykpOm99LEhvd2xlckdsb2JhbC5wcm90b3R5cGUub3JpZW50YXRpb249ZnVuY3Rpb24oZSxuLHQsbyxyLGkpe3ZhciBhPXRoaXM7aWYoIWEuY3R4fHwhYS5jdHgubGlzdGVuZXIpcmV0dXJuIGE7dmFyIHA9YS5fb3JpZW50YXRpb247cmV0dXJuIG49XCJudW1iZXJcIiE9dHlwZW9mIG4/cFsxXTpuLHQ9XCJudW1iZXJcIiE9dHlwZW9mIHQ/cFsyXTp0LG89XCJudW1iZXJcIiE9dHlwZW9mIG8/cFszXTpvLHI9XCJudW1iZXJcIiE9dHlwZW9mIHI/cFs0XTpyLGk9XCJudW1iZXJcIiE9dHlwZW9mIGk/cFs1XTppLFwibnVtYmVyXCIhPXR5cGVvZiBlP3A6KGEuX29yaWVudGF0aW9uPVtlLG4sdCxvLHIsaV0sYS5jdHgubGlzdGVuZXIuc2V0T3JpZW50YXRpb24oZSxuLHQsbyxyLGkpLGEpfSxIb3dsZXJHbG9iYWwucHJvdG90eXBlLnZlbG9jaXR5PWZ1bmN0aW9uKGUsbix0KXt2YXIgbz10aGlzO3JldHVybiBvLmN0eCYmby5jdHgubGlzdGVuZXI/KG49XCJudW1iZXJcIiE9dHlwZW9mIG4/by5fdmVsb2NpdHlbMV06bix0PVwibnVtYmVyXCIhPXR5cGVvZiB0P28uX3ZlbG9jaXR5WzJdOnQsXCJudW1iZXJcIiE9dHlwZW9mIGU/by5fdmVsb2NpdHk6KG8uX3ZlbG9jaXR5PVtlLG4sdF0sby5jdHgubGlzdGVuZXIuc2V0VmVsb2NpdHkoby5fdmVsb2NpdHlbMF0sby5fdmVsb2NpdHlbMV0sby5fdmVsb2NpdHlbMl0pLG8pKTpvfSxIb3dsZXJHbG9iYWwucHJvdG90eXBlLmxpc3RlbmVyQXR0cj1mdW5jdGlvbihlKXt2YXIgbj10aGlzO2lmKCFuLmN0eHx8IW4uY3R4Lmxpc3RlbmVyKXJldHVybiBuO3ZhciB0PW4uX2xpc3RlbmVyQXR0cjtyZXR1cm4gZT8obi5fbGlzdGVuZXJBdHRyPXtkb3BwbGVyRmFjdG9yOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBlLmRvcHBsZXJGYWN0b3I/ZS5kb3BwbGVyRmFjdG9yOnQuZG9wcGxlckZhY3RvcixzcGVlZE9mU291bmQ6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUuc3BlZWRPZlNvdW5kP2Uuc3BlZWRPZlNvdW5kOnQuc3BlZWRPZlNvdW5kfSxuLmN0eC5saXN0ZW5lci5kb3BwbGVyRmFjdG9yPXQuZG9wcGxlckZhY3RvcixuLmN0eC5saXN0ZW5lci5zcGVlZE9mU291bmQ9dC5zcGVlZE9mU291bmQsbik6dH0sSG93bC5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24obil7dmFyIHQ9dGhpcztyZXR1cm4gdC5fb3JpZW50YXRpb249bi5vcmllbnRhdGlvbnx8WzEsMCwwXSx0Ll9wb3M9bi5wb3N8fG51bGwsdC5fdmVsb2NpdHk9bi52ZWxvY2l0eXx8WzAsMCwwXSx0Ll9wYW5uZXJBdHRyPXtjb25lSW5uZXJBbmdsZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lSW5uZXJBbmdsZT9uLmNvbmVJbm5lckFuZ2xlOjM2MCxjb25lT3V0ZXJBbmdsZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lT3V0ZXJBbmdsZT9uLmNvbmVPdXRlckFuZ2xlOjM2MCxjb25lT3V0ZXJHYWluOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVPdXRlckdhaW4/bi5jb25lT3V0ZXJHYWluOjAsZGlzdGFuY2VNb2RlbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5kaXN0YW5jZU1vZGVsP24uZGlzdGFuY2VNb2RlbDpcImludmVyc2VcIixtYXhEaXN0YW5jZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5tYXhEaXN0YW5jZT9uLm1heERpc3RhbmNlOjFlNCxwYW5uaW5nTW9kZWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucGFubmluZ01vZGVsP24ucGFubmluZ01vZGVsOlwiSFJURlwiLHJlZkRpc3RhbmNlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnJlZkRpc3RhbmNlP24ucmVmRGlzdGFuY2U6MSxyb2xsb2ZmRmFjdG9yOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnJvbGxvZmZGYWN0b3I/bi5yb2xsb2ZmRmFjdG9yOjF9LGUuY2FsbCh0aGlzLG4pfX0oSG93bC5wcm90b3R5cGUuaW5pdCksSG93bC5wcm90b3R5cGUucG9zPWZ1bmN0aW9uKG4sdCxvLHIpe3ZhciBpPXRoaXM7aWYoIWkuX3dlYkF1ZGlvKXJldHVybiBpO2lmKCFpLl9sb2FkZWQpcmV0dXJuIGkub25jZShcInBsYXlcIixmdW5jdGlvbigpe2kucG9zKG4sdCxvLHIpfSksaTtpZih0PVwibnVtYmVyXCIhPXR5cGVvZiB0PzA6dCxvPVwibnVtYmVyXCIhPXR5cGVvZiBvPy0uNTpvLFwidW5kZWZpbmVkXCI9PXR5cGVvZiByKXtpZihcIm51bWJlclwiIT10eXBlb2YgbilyZXR1cm4gaS5fcG9zO2kuX3Bvcz1bbix0LG9dfWZvcih2YXIgYT1pLl9nZXRTb3VuZElkcyhyKSxwPTA7cDxhLmxlbmd0aDtwKyspe3ZhciBsPWkuX3NvdW5kQnlJZChhW3BdKTtpZihsKXtpZihcIm51bWJlclwiIT10eXBlb2YgbilyZXR1cm4gbC5fcG9zO2wuX3Bvcz1bbix0LG9dLGwuX25vZGUmJihsLl9wYW5uZXJ8fGUobCksbC5fcGFubmVyLnNldFBvc2l0aW9uKG4sdCxvKSl9fXJldHVybiBpfSxIb3dsLnByb3RvdHlwZS5vcmllbnRhdGlvbj1mdW5jdGlvbihuLHQsbyxyKXt2YXIgaT10aGlzO2lmKCFpLl93ZWJBdWRpbylyZXR1cm4gaTtpZighaS5fbG9hZGVkKXJldHVybiBpLm9uY2UoXCJwbGF5XCIsZnVuY3Rpb24oKXtpLm9yaWVudGF0aW9uKG4sdCxvLHIpfSksaTtpZih0PVwibnVtYmVyXCIhPXR5cGVvZiB0P2kuX29yaWVudGF0aW9uWzFdOnQsbz1cIm51bWJlclwiIT10eXBlb2Ygbz9pLl9vcmllbnRhdGlvblsyXTpvLFwidW5kZWZpbmVkXCI9PXR5cGVvZiByKXtpZihcIm51bWJlclwiIT10eXBlb2YgbilyZXR1cm4gaS5fb3JpZW50YXRpb247aS5fb3JpZW50YXRpb249W24sdCxvXX1mb3IodmFyIGE9aS5fZ2V0U291bmRJZHMocikscD0wO3A8YS5sZW5ndGg7cCsrKXt2YXIgbD1pLl9zb3VuZEJ5SWQoYVtwXSk7aWYobCl7aWYoXCJudW1iZXJcIiE9dHlwZW9mIG4pcmV0dXJuIGwuX29yaWVudGF0aW9uO2wuX29yaWVudGF0aW9uPVtuLHQsb10sbC5fbm9kZSYmKGwuX3Bhbm5lcnx8ZShsKSxsLl9wYW5uZXIuc2V0T3JpZW50YXRpb24obix0LG8pKX19cmV0dXJuIGl9LEhvd2wucHJvdG90eXBlLnZlbG9jaXR5PWZ1bmN0aW9uKG4sdCxvLHIpe3ZhciBpPXRoaXM7aWYoIWkuX3dlYkF1ZGlvKXJldHVybiBpO2lmKCFpLl9sb2FkZWQpcmV0dXJuIGkub25jZShcInBsYXlcIixmdW5jdGlvbigpe2kudmVsb2NpdHkobix0LG8scil9KSxpO2lmKHQ9XCJudW1iZXJcIiE9dHlwZW9mIHQ/aS5fdmVsb2NpdHlbMV06dCxvPVwibnVtYmVyXCIhPXR5cGVvZiBvP2kuX3ZlbG9jaXR5WzJdOm8sXCJ1bmRlZmluZWRcIj09dHlwZW9mIHIpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBuKXJldHVybiBpLl92ZWxvY2l0eTtpLl92ZWxvY2l0eT1bbix0LG9dfWZvcih2YXIgYT1pLl9nZXRTb3VuZElkcyhyKSxwPTA7cDxhLmxlbmd0aDtwKyspe3ZhciBsPWkuX3NvdW5kQnlJZChhW3BdKTtpZihsKXtpZihcIm51bWJlclwiIT10eXBlb2YgbilyZXR1cm4gbC5fdmVsb2NpdHk7bC5fdmVsb2NpdHk9W24sdCxvXSxsLl9ub2RlJiYobC5fcGFubmVyfHxlKGwpLGwuX3Bhbm5lci5zZXRWZWxvY2l0eShuLHQsbykpfX1yZXR1cm4gaX0sSG93bC5wcm90b3R5cGUucGFubmVyQXR0cj1mdW5jdGlvbigpe3ZhciBuLHQsbyxyPXRoaXMsaT1hcmd1bWVudHM7aWYoIXIuX3dlYkF1ZGlvKXJldHVybiByO2lmKDA9PT1pLmxlbmd0aClyZXR1cm4gci5fcGFubmVyQXR0cjtpZigxPT09aS5sZW5ndGgpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBpWzBdKXJldHVybiBvPXIuX3NvdW5kQnlJZChwYXJzZUludChpWzBdLDEwKSksbz9vLl9wYW5uZXJBdHRyOnIuX3Bhbm5lckF0dHI7bj1pWzBdLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0JiYoci5fcGFubmVyQXR0cj17Y29uZUlubmVyQW5nbGU6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZUlubmVyQW5nbGU/bi5jb25lSW5uZXJBbmdsZTpyLl9jb25lSW5uZXJBbmdsZSxjb25lT3V0ZXJBbmdsZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5jb25lT3V0ZXJBbmdsZT9uLmNvbmVPdXRlckFuZ2xlOnIuX2NvbmVPdXRlckFuZ2xlLGNvbmVPdXRlckdhaW46XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZU91dGVyR2Fpbj9uLmNvbmVPdXRlckdhaW46ci5fY29uZU91dGVyR2FpbixkaXN0YW5jZU1vZGVsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmRpc3RhbmNlTW9kZWw/bi5kaXN0YW5jZU1vZGVsOnIuX2Rpc3RhbmNlTW9kZWwsbWF4RGlzdGFuY2U6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ubWF4RGlzdGFuY2U/bi5tYXhEaXN0YW5jZTpyLl9tYXhEaXN0YW5jZSxwYW5uaW5nTW9kZWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucGFubmluZ01vZGVsP24ucGFubmluZ01vZGVsOnIuX3Bhbm5pbmdNb2RlbCxyZWZEaXN0YW5jZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5yZWZEaXN0YW5jZT9uLnJlZkRpc3RhbmNlOnIuX3JlZkRpc3RhbmNlLHJvbGxvZmZGYWN0b3I6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4ucm9sbG9mZkZhY3Rvcj9uLnJvbGxvZmZGYWN0b3I6ci5fcm9sbG9mZkZhY3Rvcn0pfWVsc2UgMj09PWkubGVuZ3RoJiYobj1pWzBdLHQ9cGFyc2VJbnQoaVsxXSwxMCkpO2Zvcih2YXIgYT1yLl9nZXRTb3VuZElkcyh0KSxwPTA7cDxhLmxlbmd0aDtwKyspaWYobz1yLl9zb3VuZEJ5SWQoYVtwXSkpe3ZhciBsPW8uX3Bhbm5lckF0dHI7bD17Y29uZUlubmVyQW5nbGU6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4uY29uZUlubmVyQW5nbGU/bi5jb25lSW5uZXJBbmdsZTpsLmNvbmVJbm5lckFuZ2xlLGNvbmVPdXRlckFuZ2xlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVPdXRlckFuZ2xlP24uY29uZU91dGVyQW5nbGU6bC5jb25lT3V0ZXJBbmdsZSxjb25lT3V0ZXJHYWluOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmNvbmVPdXRlckdhaW4/bi5jb25lT3V0ZXJHYWluOmwuY29uZU91dGVyR2FpbixkaXN0YW5jZU1vZGVsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLmRpc3RhbmNlTW9kZWw/bi5kaXN0YW5jZU1vZGVsOmwuZGlzdGFuY2VNb2RlbCxtYXhEaXN0YW5jZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5tYXhEaXN0YW5jZT9uLm1heERpc3RhbmNlOmwubWF4RGlzdGFuY2UscGFubmluZ01vZGVsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuLnBhbm5pbmdNb2RlbD9uLnBhbm5pbmdNb2RlbDpsLnBhbm5pbmdNb2RlbCxyZWZEaXN0YW5jZTpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5yZWZEaXN0YW5jZT9uLnJlZkRpc3RhbmNlOmwucmVmRGlzdGFuY2Uscm9sbG9mZkZhY3RvcjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygbi5yb2xsb2ZmRmFjdG9yP24ucm9sbG9mZkZhY3RvcjpsLnJvbGxvZmZGYWN0b3J9O3ZhciBjPW8uX3Bhbm5lcjtjPyhjLmNvbmVJbm5lckFuZ2xlPWwuY29uZUlubmVyQW5nbGUsYy5jb25lT3V0ZXJBbmdsZT1sLmNvbmVPdXRlckFuZ2xlLGMuY29uZU91dGVyR2Fpbj1sLmNvbmVPdXRlckdhaW4sYy5kaXN0YW5jZU1vZGVsPWwuZGlzdGFuY2VNb2RlbCxjLm1heERpc3RhbmNlPWwubWF4RGlzdGFuY2UsYy5wYW5uaW5nTW9kZWw9bC5wYW5uaW5nTW9kZWwsYy5yZWZEaXN0YW5jZT1sLnJlZkRpc3RhbmNlLGMucm9sbG9mZkZhY3Rvcj1sLnJvbGxvZmZGYWN0b3IpOihvLl9wb3N8fChvLl9wb3M9ci5fcG9zfHxbMCwwLC0uNV0pLGUobykpfXJldHVybiByfSxTb3VuZC5wcm90b3R5cGUuaW5pdD1mdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgbj10aGlzLHQ9bi5fcGFyZW50O24uX29yaWVudGF0aW9uPXQuX29yaWVudGF0aW9uLG4uX3Bvcz10Ll9wb3Msbi5fdmVsb2NpdHk9dC5fdmVsb2NpdHksbi5fcGFubmVyQXR0cj10Ll9wYW5uZXJBdHRyLGUuY2FsbCh0aGlzKSxuLl9wb3MmJnQucG9zKG4uX3Bvc1swXSxuLl9wb3NbMV0sbi5fcG9zWzJdLG4uX2lkKX19KFNvdW5kLnByb3RvdHlwZS5pbml0KSxTb3VuZC5wcm90b3R5cGUucmVzZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIG49dGhpcyx0PW4uX3BhcmVudDtyZXR1cm4gbi5fb3JpZW50YXRpb249dC5fb3JpZW50YXRpb24sbi5fcG9zPXQuX3BvcyxuLl92ZWxvY2l0eT10Ll92ZWxvY2l0eSxuLl9wYW5uZXJBdHRyPXQuX3Bhbm5lckF0dHIsZS5jYWxsKHRoaXMpfX0oU291bmQucHJvdG90eXBlLnJlc2V0KTt2YXIgZT1mdW5jdGlvbihlKXtlLl9wYW5uZXI9SG93bGVyLmN0eC5jcmVhdGVQYW5uZXIoKSxlLl9wYW5uZXIuY29uZUlubmVyQW5nbGU9ZS5fcGFubmVyQXR0ci5jb25lSW5uZXJBbmdsZSxlLl9wYW5uZXIuY29uZU91dGVyQW5nbGU9ZS5fcGFubmVyQXR0ci5jb25lT3V0ZXJBbmdsZSxlLl9wYW5uZXIuY29uZU91dGVyR2Fpbj1lLl9wYW5uZXJBdHRyLmNvbmVPdXRlckdhaW4sZS5fcGFubmVyLmRpc3RhbmNlTW9kZWw9ZS5fcGFubmVyQXR0ci5kaXN0YW5jZU1vZGVsLGUuX3Bhbm5lci5tYXhEaXN0YW5jZT1lLl9wYW5uZXJBdHRyLm1heERpc3RhbmNlLGUuX3Bhbm5lci5wYW5uaW5nTW9kZWw9ZS5fcGFubmVyQXR0ci5wYW5uaW5nTW9kZWwsZS5fcGFubmVyLnJlZkRpc3RhbmNlPWUuX3Bhbm5lckF0dHIucmVmRGlzdGFuY2UsZS5fcGFubmVyLnJvbGxvZmZGYWN0b3I9ZS5fcGFubmVyQXR0ci5yb2xsb2ZmRmFjdG9yLGUuX3Bhbm5lci5zZXRQb3NpdGlvbihlLl9wb3NbMF0sZS5fcG9zWzFdLGUuX3Bvc1syXSksZS5fcGFubmVyLnNldE9yaWVudGF0aW9uKGUuX29yaWVudGF0aW9uWzBdLGUuX29yaWVudGF0aW9uWzFdLGUuX29yaWVudGF0aW9uWzJdKSxlLl9wYW5uZXIuc2V0VmVsb2NpdHkoZS5fdmVsb2NpdHlbMF0sZS5fdmVsb2NpdHlbMV0sZS5fdmVsb2NpdHlbMl0pLGUuX3Bhbm5lci5jb25uZWN0KGUuX25vZGUpLGUuX3BhdXNlZHx8ZS5fcGFyZW50LnBhdXNlKGUuX2lkKS5wbGF5KGUuX2lkKX19KCk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ob3dsZXIvaG93bGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG52YXIgJHZpZGVvSW5kaWNhdG9yID0gJCgnI3ZpZGVvLXByb2dyZXNzIC5wcm9ncmVzcycpO1xudmFyIHZpZGVvUGxheWluZztcbnZhciAkZWw7XG5cbiR2aWRlb0luZGljYXRvci5oaWRlKCk7XG5tb2R1bGUuZXhwb3J0cy5zdGFydCA9IGZ1bmN0aW9uKCRuZXdWaWRlbykge1xuICAkZWwgPSAkbmV3VmlkZW9bMF07XG4gICR2aWRlb0luZGljYXRvci5zaG93KCk7XG4gIHZpZGVvUGxheWluZyA9IHRydWU7XG4gIGxvb3AoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgdmlkZW9QbGF5aW5nID0gZmFsc2U7XG4gICQoJyN2aWRlby1wcm9ncmVzcyAucHJvZ3Jlc3MnKS5oaWRlKCk7XG59O1xuXG5mdW5jdGlvbiBsb29wKCkge1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgIHZhciByYXRlID0gKCRlbC5jdXJyZW50VGltZSAvICRlbC5kdXJhdGlvbik7XG4gICAgdmFyIHBlcmNlbnQgPSAocmF0ZSAqIDEwMCkudG9GaXhlZCgyKTtcbiAgICAkdmlkZW9JbmRpY2F0b3IuY3NzKHsnd2lkdGgnOiBwZXJjZW50ICsgJ3Z3J30pO1xuICAgIGlmKHZpZGVvUGxheWluZykge1xuICAgICAgc2V0VGltZW91dCggKCkgPT4ge2xvb3AoKX0gLCA0MSApXG4gICAgfVxuICB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVuZGVyL3ZpZGVvcGxheWVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBgXG48c3R5bGU+XG4gICN2aWRlby1wcm9ncmVzcyB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDF2aDtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgICB6LWluZGV4OiA1O1xuICB9XG4gICN2aWRlby1wcm9ncmVzcyAucHJvZ3Jlc3Mge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LDAsMCwxKTtcbiAgICB3aWR0aDogMXZ3O1xuICAgIGhlaWdodDogMXZoO1xuICAgIC8qdHJhbnNpdGlvbjogYWxsIDAuMXMgZWFzZTsqL1xuICB9XG5cbiAgLmNlbnRlci1tYXJrZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB3aWR0aDogMC41dnc7XG4gICAgaGVpZ2h0OiAwLjV2dztcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuOCk7XG4gICAgei1pbmRleDogNjtcbiAgICByaWdodDogMXZ3O1xuICAgIGJvcmRlci1yYWRpdXM6IDN2dztcbiAgfVxuXG5cbiAgI2V4cGVyaWVuY2UtcHJvZ3Jlc3Mge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6IDF2bWluO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgYmFja2dyb3VuZDogYmxhY2s7XG4gICAgei1pbmRleDogNTtcbiAgfVxuICAjZXhwZXJpZW5jZS1wcm9ncmVzcyAucHJvZ3Jlc3Mge1xuICAgIGJhY2tncm91bmQ6IHJnYigyNTUsIDI1NSwgMjU1KTtcbiAgICBvcGFjaXR5OiAwLjc7XG4gICAgd2lkdGg6IDAuMnZ3O1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgbWFyZ2luLXRvcDogLTEwMHZoO1xuICAgIHJpZ2h0OiAxLjE1dnc7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm9yZGVyLXJhZGl1czogNXZ3O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLmNvbnRyb2wtcGxheSB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRvcDogM3ZtaW47XG4gICAgcmlnaHQ6IDN2bWluO1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB6LWluZGV4OiAxO1xuICB9XG5cbiAgLmZvY3VzLXRvZ2dsZXMgaSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbGluZS1oZWlnaHQ6IDV2bWluO1xuICB9XG4gICN0b2dnbGVQbGF5IHtcbiAgICBmb250LXNpemU6IDV2bWluO1xuICAgIG1hcmdpbi1yaWdodDogNXZtaW47XG4gIH1cblxuICAuY29udHJvbC1wbGF5IGkge1xuICAgIGZvbnQtc2l6ZTogOHZtaW47XG4gICAgdGV4dC1zaGFkb3c6IDAgMC41dm1pbiAxdm1pbiByZ2JhKDAsMCwwLDAuNSk7XG4gICAgbGluZS1oZWlnaHQ6IDEwMCU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG4gICN1bnN1cHBvcnRlZCB7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbjogNTBweDtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgLmxvYWRpbmcge1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIGJhY2tncm91bmQ6IGJsYWNrO1xuICAgIHotaW5kZXg6IDc7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nLXRvcDogMzB2aDtcbiAgfVxuICAubG9hZGluZyBoMyB7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxuXG5cbiAgLnBhY2Uge1xuICAgIC13ZWJraXQtcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG5cbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgICB6LWluZGV4OiAyMDAwO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICBtYXJnaW46IGF1dG87XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGhlaWdodDogNXZoO1xuICAgIHdpZHRoOiA1MHZ3O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTtcblxuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cblxuICAucGFjZSAucGFjZS1wcm9ncmVzcyB7XG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtbXMtYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAtby1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgLW1vei10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgIC1vLXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcblxuICAgIG1heC13aWR0aDogMjAwcHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDIwMDA7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICByaWdodDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogIzI5ZDtcbiAgfVxuXG4gIC5wYWNlLnBhY2UtaW5hY3RpdmUge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbjwvc3R5bGU+XG5cbjxkaXYgY2xhc3M9XCJsb2FkaW5nXCI+XG4gIDxoMz5FeHBlcmllbmNlIExvYWRpbmcuLi48L2gzPlxuPC9kaXY+XG48ZGl2IGlkPVwidmlkZW8tcHJvZ3Jlc3NcIj5cbiAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+PC9kaXY+XG48L2Rpdj5cbjxkaXYgaWQ9XCJleHBlcmllbmNlLXByb2dyZXNzXCI+XG4gIDxkaXYgY2xhc3M9XCJwcm9ncmVzc1wiPjwvZGl2PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwiY29udHJvbC1wbGF5XCI+XG4gIDxpIGNsYXNzPVwiZmEgZmEtcGxheVwiIGlkPVwidG9nZ2xlUGxheVwiPjwvaT5cbiAgPGRpdiBjbGFzcz0nZm9jdXMtdG9nZ2xlcyc+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS1jYXJldC11cFwiIGlkPVwidG9nZ2xlVXBcIj48L2k+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS1jYXJldC1kb3duXCIgaWQ9XCJ0b2dnbGVEb3duXCI+PC9pPlxuICA8L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWlubmVyXCI+PC9kaXY+XG48L2Rpdj5cblxuPGgzIGNsYXNzPVwiZXJyb3JcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiPldob29wcyEgUmlnaHQgbm93IHRoaXMgZGVtbyBkb2Vzbid0IGhhbmRsZSByZXNpemluZyBvciBicm93c2VycyBsZXNzIHRoYW4gMTAwMHB4IHdpZGUuIFJlbG9hZCB0aGlzIHBhZ2Ugb3IgZ2V0IG9uIGEgbGFwdG9wITwvaDM+XG48ZGl2IGlkPVwidW5zdXBwb3J0ZWRcIj5cbjxzcGFuIHN0eWxlPVwidGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZVwiPk1vYmlsZSBleHBlcmllbmNlIGNvbWluZyBzb29uPC9zcGFuPiAgPGJyPjxicj4gVGhpcyBpbnRlcmFjdGl2ZSBleHBlcmllbmNlIGlzIGN1cnJlbnRseSBvbmx5IGZvciBkZXNrdG9wcy5cbjwvZGl2PlxuYFxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdGVtcGxhdGUuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9