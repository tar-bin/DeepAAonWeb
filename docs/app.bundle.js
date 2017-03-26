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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(5);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.2.5
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var warn = noop;
var tip = noop;
var formatComponentName;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === "<Anonymous>") {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Error in " + info + ":"), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (process.env.NODE_ENV !== 'production') {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // reset scheduler before updated hook called
  var oldQueue = queue.slice();
  resetSchedulerState();

  // call updated hooks
  index = oldQueue.length;
  while (index--) {
    watcher = oldQueue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    if (!vnode.componentInstance._isMounted) {
      vnode.componentInstance._isMounted = true;
      callHook(vnode.componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      activateChildComponent(vnode.componentInstance, true /* direct */);
    }
  },

  destroy: function destroy (vnode) {
    if (!vnode.componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        vnode.componentInstance.$destroy();
      } else {
        deactivateChildComponent(vnode.componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractProps(data, Ctor, tag);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && attrs.hasOwnProperty(keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the delared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && process.env.NODE_ENV !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var inject = vm.$options.inject;
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    var loop = function ( i ) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          /* istanbul ignore else */
          if (process.env.NODE_ENV !== 'production') {
            defineReactive$$1(vm, key, source._provided[provideKey], function () {
              warn(
                "Avoid mutating an injected value directly since the changes will be " +
                "overwritten whenever the provided component re-renders. " +
                "injection being mutated: \"" + key + "\"",
                vm
              );
            });
          } else {
            defineReactive$$1(vm, key, source._provided[provideKey]);
          }
          break
        }
        source = source.$parent;
      }
    };

    for (var i = 0; i < keys.length; i++) loop( i );
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    for (var i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (pattern instanceof RegExp) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.2.5';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important
) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + value + "=$$c}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (!fn) { return false }
  var invokerFns = fn.fns;
  if (invokerFns) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
      config.productionTip !== false &&
      inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
            (i > pos || !tagName) &&
            options.warn) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      process.env.NODE_ENV !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (process.env.NODE_ENV !== 'production' && map[attrs[i].name] && !isIE) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    process.env.NODE_ENV !== 'production' &&
    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}]"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var keywordMatch = exp.replace(stripStringRE, '').match(unaryOperatorsRE);
  if (keywordMatch) {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (process.env.NODE_ENV !== 'production') {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0), __webpack_require__(2)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.KerasJS=e():t.KerasJS=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=625)}([function(t,e,n){var r=n(5),o=n(31),i=n(15),a=n(16),s=n(32),u="prototype",l=function(t,e,n){var c,f,p,h,d=t&l.F,v=t&l.G,m=t&l.S,_=t&l.P,g=t&l.B,y=v?r:m?r[e]||(r[e]={}):(r[e]||{})[u],b=v?o:o[e]||(o[e]={}),w=b[u]||(b[u]={});v&&(n=e);for(c in n)f=!d&&y&&void 0!==y[c],p=(f?y:n)[c],h=g&&f?s(p,r):_&&"function"==typeof p?s(Function.call,p):p,y&&a(y,c,p,t&l.U),b[c]!=p&&i(b,c,h),_&&w[c]!=p&&(w[c]=p)};r.core=o,l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,t.exports=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(2),u=r(s),l=n(3),c=r(l),f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t),this.layerClass="Layer",this.name=e.name,this.params=[],this.weights={},this.gpu=e.gpu,this.pipeline=e.pipeline,this._useWeblas=!1,this._pipelineEnabled=!1}return a(t,[{key:"setWeights",value:function(t){var e=this;this.params.forEach(function(n,r){e.weights[n]=t[r]})}},{key:"toggleGpu",value:function(t){var e="undefined"==typeof t?!this._useWeblas:t;e&&weblas?this._useWeblas=!0:this._useWeblas=!1}},{key:"call",value:function(t){return t}},{key:"transferFromPipeline",value:function(t){if(!t.weblasTensor)throw new Error("Variable passed in does not contain weblas tensor.");if(!t._fromPipeline)throw new Error("Variable passed in does not contain _fromPipeline.");if(!t._actualShape)throw new Error("Variable passed in does not contain _actualShape.");var e=t.weblasTensor.shape[1],n=t._actualShape.slice(0,-1).reduce(function(t,e){return t*e},1),r=new u.default([],t.weblasTensor.shape);r.tensor.data=t.weblasTensor.transfer();for(var i=new u.default([],t._actualShape),a=new u.default([],[n]),s=new u.default([],t._actualShape.slice(0,-1)),l=0;l<e;l++){var f;c.default.assign(a.tensor,r.tensor.pick(null,l)),s.replaceTensorData(a.tensor.data);var p=Array(t._actualShape.length-1).fill(null);c.default.assign((f=i.tensor).pick.apply(f,o(p).concat([l])),s.tensor)}return i._fromPipeline=!1,i._actualShape&&delete i._actualShape,i}}]),t}();e.default=f},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(91),u=r(s),l=n(191),c=(r(l),n(197)),f=function(t,e){if(t.length&&e.length&&t.length!==e.reduce(function(t,e){return t*e},1))throw new Error("Specified shape incompatible with data.")},p=function(){function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};o(this,t),this._type=r.type||Float32Array,e&&e.length&&(e instanceof this._type||e instanceof Array)?(f(e,n),this.tensor=(0,u.default)(e,n),this.tensor=(0,u.default)(new this._type(e),n)):!e.length&&n.length?this.tensor=(0,u.default)(new this._type(n.reduce(function(t,e){return t*e},1)),n):this.tensor=(0,u.default)(new this._type([]),[])}return a(t,[{key:"replaceTensorData",value:function(t){if(t&&t.length&&t instanceof this._type)this.tensor.data=t;else{if(!(t&&t.length&&t instanceof Array))throw new Error("[Tensor] invalid input for replaceTensorData method.");this.tensor.data=new this._type(t)}}},{key:"createWeblasTensor",value:function(){if(this.weblasTensor&&this.weblasTensor.delete(),1===this.tensor.shape.length){var t=this.tensor.shape[0];if(t>c.MAX_TEXTURE_SIZE)this._gpuMaxSizeExceeded=!0;else{var e=[1,t];this.weblasTensor=new weblas.pipeline.Tensor(e,this.tensor.data)}}else{if(2!==this.tensor.shape.length)throw new Error("[Tensor] can only create weblas Tensor for 1-D or 2-D only");if(this.tensor.shape.some(function(t){return t>c.MAX_TEXTURE_SIZE}))this._gpuMaxSizeExceeded=!0;else{var n=this.tensor.shape;this.weblasTensor=new weblas.pipeline.Tensor(n,this.tensor.data)}}}},{key:"deleteWeblasTensor",value:function(){this.weblasTensor&&(this.weblasTensor.delete(),delete this.weblasTensor)}},{key:"copyFromWeblasTensor",value:function(t){var e=weblas.gpu.gl,r=e.context,o=e.createProgram(n(618));this.weblasTensor=new weblas.pipeline.Tensor(t.shape,null),e.selectProgram(o),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,t.texture);var a=r.getUniformLocation(o,"source");r.uniform1i(a,0);var s=i(this.weblasTensor.shape,2),u=s[0],l=s[1],c=e.getPad(l);e.bindOutputTexture(u,(l+c)/4,this.weblasTensor.texture),r.drawElements(r.TRIANGLES,6,r.UNSIGNED_SHORT,0),e.unbindInputTexture(r.TEXTURE0)}}]),t}();e.default=p},function(t,e,n){"use strict";function r(t){if(!t)return s;for(var e=0;e<t.args.length;++e){var n=t.args[e];0===e?t.args[e]={name:n,lvalue:!0,rvalue:!!t.rvalue,count:t.count||1}:t.args[e]={name:n,lvalue:!1,rvalue:!0,count:1}}return t.thisVars||(t.thisVars=[]),t.localVars||(t.localVars=[]),t}function o(t){return a({args:t.args,pre:r(t.pre),body:r(t.body),post:r(t.proc),funcName:t.funcName})}function i(t){for(var e=[],n=0;n<t.args.length;++n)e.push("a"+n);var r=new Function("P",["return function ",t.funcName,"_ndarrayops(",e.join(","),") {P(",e.join(","),");return a0}"].join(""));return r(o(t))}var a=n(166),s={body:"",args:[],thisVars:[],localVars:[]},u={add:"+",sub:"-",mul:"*",div:"/",mod:"%",band:"&",bor:"|",bxor:"^",lshift:"<<",rshift:">>",rrshift:">>>"};!function(){for(var t in u){var n=u[t];e[t]=i({args:["array","array","array"],body:{args:["a","b","c"],body:"a=b"+n+"c"},funcName:t}),e[t+"eq"]=i({args:["array","array"],body:{args:["a","b"],body:"a"+n+"=b"},rvalue:!0,funcName:t+"eq"}),e[t+"s"]=i({args:["array","array","scalar"],body:{args:["a","b","s"],body:"a=b"+n+"s"},funcName:t+"s"}),e[t+"seq"]=i({args:["array","scalar"],body:{args:["a","s"],body:"a"+n+"=s"},rvalue:!0,funcName:t+"seq"})}}();var l={not:"!",bnot:"~",neg:"-",recip:"1.0/"};!function(){for(var t in l){var n=l[t];e[t]=i({args:["array","array"],body:{args:["a","b"],body:"a="+n+"b"},funcName:t}),e[t+"eq"]=i({args:["array"],body:{args:["a"],body:"a="+n+"a"},rvalue:!0,count:2,funcName:t+"eq"})}}();var c={and:"&&",or:"||",eq:"===",neq:"!==",lt:"<",gt:">",leq:"<=",geq:">="};!function(){for(var t in c){var n=c[t];e[t]=i({args:["array","array","array"],body:{args:["a","b","c"],body:"a=b"+n+"c"},funcName:t}),e[t+"s"]=i({args:["array","array","scalar"],body:{args:["a","b","s"],body:"a=b"+n+"s"},funcName:t+"s"}),e[t+"eq"]=i({args:["array","array"],body:{args:["a","b"],body:"a=a"+n+"b"},rvalue:!0,count:2,funcName:t+"eq"}),e[t+"seq"]=i({args:["array","scalar"],body:{args:["a","s"],body:"a=a"+n+"s"},rvalue:!0,count:2,funcName:t+"seq"})}}();var f=["abs","acos","asin","atan","ceil","cos","exp","floor","log","round","sin","sqrt","tan"];!function(){for(var t=0;t<f.length;++t){var n=f[t];e[n]=i({args:["array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b)",thisVars:["this_f"]},funcName:n}),e[n+"eq"]=i({args:["array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a"],body:"a=this_f(a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"eq"})}}();var p=["max","min","atan2","pow"];!function(){for(var t=0;t<p.length;++t){var n=p[t];e[n]=i({args:["array","array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(b,c)",thisVars:["this_f"]},funcName:n}),e[n+"s"]=i({args:["array","array","scalar"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(b,c)",thisVars:["this_f"]},funcName:n+"s"}),e[n+"eq"]=i({args:["array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(a,b)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"eq"}),e[n+"seq"]=i({args:["array","scalar"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(a,b)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"seq"})}}();var h=["atan2","pow"];!function(){for(var t=0;t<h.length;++t){var n=h[t];e[n+"op"]=i({args:["array","array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(c,b)",thisVars:["this_f"]},funcName:n+"op"}),e[n+"ops"]=i({args:["array","array","scalar"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b","c"],body:"a=this_f(c,b)",thisVars:["this_f"]},funcName:n+"ops"}),e[n+"opeq"]=i({args:["array","array"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b,a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"opeq"}),e[n+"opseq"]=i({args:["array","scalar"],pre:{args:[],body:"this_f=Math."+n,thisVars:["this_f"]},body:{args:["a","b"],body:"a=this_f(b,a)",thisVars:["this_f"]},rvalue:!0,count:2,funcName:n+"opseq"})}}(),e.any=a({args:["array"],pre:s,body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"if(a){return true}",localVars:[],thisVars:[]},post:{args:[],localVars:[],thisVars:[],body:"return false"},funcName:"any"}),e.all=a({args:["array"],pre:s,body:{args:[{name:"x",lvalue:!1,rvalue:!0,count:1}],body:"if(!x){return false}",localVars:[],thisVars:[]},post:{args:[],localVars:[],thisVars:[],body:"return true"},funcName:"all"}),e.sum=a({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"this_s+=a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"sum"}),e.prod=a({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=1"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:1}],body:"this_s*=a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"prod"}),e.norm2squared=a({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:2}],body:"this_s+=a*a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norm2squared"}),e.norm2=a({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:2}],body:"this_s+=a*a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return Math.sqrt(this_s)"},funcName:"norm2"}),e.norminf=a({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:4}],body:"if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norminf"}),e.norm1=a({args:["array"],pre:{args:[],localVars:[],thisVars:["this_s"],body:"this_s=0"},body:{args:[{name:"a",lvalue:!1,rvalue:!0,count:3}],body:"this_s+=a<0?-a:a",localVars:[],thisVars:["this_s"]},post:{args:[],localVars:[],thisVars:["this_s"],body:"return this_s"},funcName:"norm1"}),e.sup=a({args:["array"],pre:{body:"this_h=-Infinity",args:[],thisVars:["this_h"],localVars:[]},body:{body:"if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_h"],localVars:[]},post:{body:"return this_h",args:[],thisVars:["this_h"],localVars:[]}}),e.inf=a({args:["array"],pre:{body:"this_h=Infinity",args:[],thisVars:["this_h"],localVars:[]},body:{body:"if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_h"],localVars:[]},post:{body:"return this_h",args:[],thisVars:["this_h"],localVars:[]}}),e.argmin=a({args:["index","array","shape"],pre:{body:"{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",args:[{name:"_inline_0_arg0_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg1_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg2_",lvalue:!1,rvalue:!0,count:1}],thisVars:["this_i","this_v"],localVars:[]},body:{body:"{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2},{name:"_inline_1_arg1_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_i","this_v"],localVars:["_inline_1_k"]},post:{body:"{return this_i}",args:[],thisVars:["this_i"],localVars:[]}}),e.argmax=a({args:["index","array","shape"],pre:{body:"{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",args:[{name:"_inline_0_arg0_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg1_",lvalue:!1,rvalue:!1,count:0},{name:"_inline_0_arg2_",lvalue:!1,rvalue:!0,count:1}],thisVars:["this_i","this_v"],localVars:[]},body:{body:"{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",args:[{name:"_inline_1_arg0_",lvalue:!1,rvalue:!0,count:2},{name:"_inline_1_arg1_",lvalue:!1,rvalue:!0,count:2}],thisVars:["this_i","this_v"],localVars:["_inline_1_k"]},post:{body:"{return this_i}",args:[],thisVars:["this_i"],localVars:[]}}),e.random=i({args:["array"],pre:{args:[],body:"this_f=Math.random",thisVars:["this_f"]},body:{args:["a"],body:"a=this_f()",thisVars:["this_f"]},funcName:"random"}),e.assign=i({args:["array","array"],body:{args:["a","b"],body:"a=b"},funcName:"assign"}),e.assigns=i({args:["array","scalar"],body:{args:["a","b"],body:"a=b"},funcName:"assigns"}),e.equals=a({args:["array","array"],pre:s,body:{args:[{name:"x",lvalue:!1,rvalue:!0,count:1},{name:"y",lvalue:!1,rvalue:!0,count:1}],body:"if(x!==y){return false}",localVars:[],thisVars:[]},post:{args:[],localVars:[],thisVars:[],body:"return true"},funcName:"equals"})},function(t,e,n){var r=n(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(78)("wks"),o=n(47),i=n(5).Symbol,a="function"==typeof i,s=t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))};s.store=r},function(t,e,n){t.exports=!n(6)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(4),o=n(146),i=n(28),a=Object.defineProperty;e.f=n(9)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(37),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(23);t.exports=function(t){return Object(r(t))}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(10),o=n(36);t.exports=n(9)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(5),o=n(15),i=n(13),a=n(47)("src"),s="toString",u=Function[s],l=(""+u).split(s);n(31).inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,s){var u="function"==typeof n;u&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(u&&(i(n,a)||o(n,a,t[e]?""+t[e]:l.join(String(e)))),t===r?t[e]=n:s?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,s,function(){return"function"==typeof this&&this[a]||u.call(this)})},function(t,e,n){var r=n(0),o=n(6),i=n(23),a=/"/g,s=function(t,e,n,r){var o=String(i(t)),s="<"+e;return""!==n&&(s+=" "+n+'="'+String(r).replace(a,"&quot;")+'"'),s+">"+o+"</"+e+">"};t.exports=function(t,e){var n={};n[t]=e(s),r(r.P+r.F*o(function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}),"String",n)}},function(t,e,n){var r=n(59),o=n(23);t.exports=function(t){return r(o(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(1===t.tensor.shape.length){var e=h.default.sup(t.tensor);h.default.subseq(t.tensor,e),h.default.expeq(t.tensor);var n=h.default.sum(t.tensor);h.default.divseq(t.tensor,n)}else{if(2!==t.tensor.shape.length)throw new Error("[activations.softmax] tensor shape "+t.tensor.shape+" not supported.");for(var r=0;r<t.tensor.shape[0];r++){var o=h.default.sup(t.tensor.pick(r,null));h.default.subseq(t.tensor.pick(r,null),o),h.default.expeq(t.tensor.pick(r,null));var i=h.default.sum(t.tensor.pick(r,null));h.default.divseq(t.tensor.pick(r,null),i)}}return this}function i(t){return g(t.tensor),this}function a(t){return y(t.tensor),this}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.alpha,r=void 0===n?0:n,o=e.maxValue,i=void 0===o?null:o,a=void 0;return 0!==r&&(a=new _.default([],t.tensor.shape),h.default.mins(a.tensor,t.tensor,0),h.default.mulseq(a.tensor,r)),h.default.maxseq(t.tensor,0),i&&h.default.minseq(t.tensor,i),a&&h.default.addeq(t.tensor,a.tensor),this}function u(t){return b(t.tensor),this}function l(t){return w(t.tensor),this}function c(t){return x(t.tensor),this}function f(t){return this}Object.defineProperty(e,"__esModule",{value:!0}),e.softmax=o,e.softplus=i,e.softsign=a,e.relu=s,e.tanh=u,e.sigmoid=l,e.hardSigmoid=c,e.linear=f;var p=n(3),h=r(p),d=n(25),v=r(d),m=n(2),_=r(m),g=(0,v.default)({args:["array"],body:function(t){t=Math.log(Math.exp(t)+1)}}),y=(0,v.default)({args:["array"],body:function(t){t/=1+Math.abs(t)}}),b=(0,v.default)({args:["array"],body:function(t){t=Math.tanh(t)}}),w=(0,v.default)({args:["array"],body:function(t){t=1/(1+Math.exp(-t))}}),x=(0,v.default)({args:["array"],body:function(t){t=.2*t+.5,t<=0?t=0:t>=1&&(t=1)}})},function(t,e,n){var r=n(60),o=n(36),i=n(18),a=n(28),s=n(13),u=n(146),l=Object.getOwnPropertyDescriptor;e.f=n(9)?l:function(t,e){if(t=i(t),e=a(e,!0),u)try{return l(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(13),o=n(12),i=n(108)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(6);t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},function(t,e,n){"use strict";function r(t){for(var e in t)a.indexOf(e)<0&&s.indexOf(e)<0&&console.warn("cwise: Unknown argument '"+e+"' passed to expression compiler");for(var n=0;n<a.length;++n)if(!t[a[n]])throw new Error("cwise: Missing argument: "+a[n]);return i({args:t.args,pre:o(t.pre||function(){}),body:o(t.body),post:o(t.post||function(){}),debug:!!t.printCode,funcName:t.funcName||t.body.name||"cwise",blockSize:t.blockSize||64})}var o=n(450),i=n(166),a=["args","body"],s=["pre","post","printCode","funcName","blockSize"];t.exports=r},function(t,e,n){var r=n(32),o=n(59),i=n(12),a=n(11),s=n(269);t.exports=function(t,e){var n=1==t,u=2==t,l=3==t,c=4==t,f=6==t,p=5==t||f,h=e||s;return function(e,s,d){for(var v,m,_=i(e),g=o(_),y=r(s,d,3),b=a(g.length),w=0,x=n?h(e,b):u?h(e,0):void 0;b>w;w++)if((p||w in g)&&(v=g[w],m=y(v,w,_),t))if(n)x[w]=m;else if(m)switch(t){case 3:return!0;case 5:return v;case 6:return w;case 2:x.push(v)}else if(c)return!1;return f?-1:l||c?c:x}}},function(t,e,n){var r=n(0),o=n(31),i=n(6);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(t,e,n){var r=n(7);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(175),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();t.exports=i},function(t,e){var n=Array.isArray;t.exports=n},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(14);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(162),o=n(0),i=n(78)("metadata"),a=i.store||(i.store=new(n(165))),s=function(t,e,n){var o=a.get(t);if(!o){if(!n)return;a.set(t,o=new r)}var i=o.get(e);if(!i){if(!n)return;o.set(e,i=new r)}return i},u=function(t,e,n){var r=s(e,n,!1);return void 0!==r&&r.has(t)},l=function(t,e,n){var r=s(e,n,!1);return void 0===r?void 0:r.get(t)},c=function(t,e,n,r){s(n,r,!0).set(t,e)},f=function(t,e){var n=s(t,e,!1),r=[];return n&&n.forEach(function(t,e){r.push(e)}),r},p=function(t){return void 0===t||"symbol"==typeof t?t:String(t)},h=function(t){o(o.S,"Reflect",t)};t.exports={store:a,map:s,has:u,get:l,set:c,keys:f,key:p,exp:h}},function(t,e,n){"use strict";if(n(9)){var r=n(40),o=n(5),i=n(6),a=n(0),s=n(79),u=n(115),l=n(32),c=n(39),f=n(36),p=n(15),h=n(44),d=n(37),v=n(11),m=n(46),_=n(28),g=n(13),y=n(159),b=n(58),w=n(7),x=n(12),E=n(100),T=n(41),O=n(21),S=n(42).f,P=n(117),M=n(47),j=n(8),A=n(26),C=n(69),k=n(109),R=n(118),I=n(52),N=n(75),U=n(45),F=n(93),L=n(139),D=n(10),B=n(20),V=D.f,W=B.f,X=o.RangeError,z=o.TypeError,G=o.Uint8Array,q="ArrayBuffer",H="Shared"+q,Y="BYTES_PER_ELEMENT",K="prototype",$=Array[K],Z=u.ArrayBuffer,Q=u.DataView,J=A(0),tt=A(2),et=A(3),nt=A(4),rt=A(5),ot=A(6),it=C(!0),at=C(!1),st=R.values,ut=R.keys,lt=R.entries,ct=$.lastIndexOf,ft=$.reduce,pt=$.reduceRight,ht=$.join,dt=$.sort,vt=$.slice,mt=$.toString,_t=$.toLocaleString,gt=j("iterator"),yt=j("toStringTag"),bt=M("typed_constructor"),wt=M("def_constructor"),xt=s.CONSTR,Et=s.TYPED,Tt=s.VIEW,Ot="Wrong length!",St=A(1,function(t,e){return kt(k(t,t[wt]),e)}),Pt=i(function(){return 1===new G(new Uint16Array([1]).buffer)[0]}),Mt=!!G&&!!G[K].set&&i(function(){new G(1).set({})}),jt=function(t,e){if(void 0===t)throw z(Ot);var n=+t,r=v(t);if(e&&!y(n,r))throw X(Ot);return r},At=function(t,e){var n=d(t);if(n<0||n%e)throw X("Wrong offset!");return n},Ct=function(t){if(w(t)&&Et in t)return t;throw z(t+" is not a typed array!")},kt=function(t,e){if(!(w(t)&&bt in t))throw z("It is not a typed array constructor!");return new t(e)},Rt=function(t,e){return It(k(t,t[wt]),e)},It=function(t,e){for(var n=0,r=e.length,o=kt(t,r);r>n;)o[n]=e[n++];return o},Nt=function(t,e,n){V(t,e,{get:function(){return this._d[n]}})},Ut=function(t){var e,n,r,o,i,a,s=x(t),u=arguments.length,c=u>1?arguments[1]:void 0,f=void 0!==c,p=P(s);if(void 0!=p&&!E(p)){for(a=p.call(s),r=[],e=0;!(i=a.next()).done;e++)r.push(i.value);s=r}for(f&&u>2&&(c=l(c,arguments[2],2)),e=0,n=v(s.length),o=kt(this,n);n>e;e++)o[e]=f?c(s[e],e):s[e];return o},Ft=function(){for(var t=0,e=arguments.length,n=kt(this,e);e>t;)n[t]=arguments[t++];return n},Lt=!!G&&i(function(){_t.call(new G(1))}),Dt=function(){return _t.apply(Lt?vt.call(Ct(this)):Ct(this),arguments)},Bt={copyWithin:function(t,e){return L.call(Ct(this),t,e,arguments.length>2?arguments[2]:void 0)},every:function(t){return nt(Ct(this),t,arguments.length>1?arguments[1]:void 0)},fill:function(t){return F.apply(Ct(this),arguments)},filter:function(t){return Rt(this,tt(Ct(this),t,arguments.length>1?arguments[1]:void 0))},find:function(t){return rt(Ct(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function(t){return ot(Ct(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function(t){J(Ct(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function(t){return at(Ct(this),t,arguments.length>1?arguments[1]:void 0)},includes:function(t){return it(Ct(this),t,arguments.length>1?arguments[1]:void 0)},join:function(t){return ht.apply(Ct(this),arguments)},lastIndexOf:function(t){return ct.apply(Ct(this),arguments)},map:function(t){return St(Ct(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function(t){return ft.apply(Ct(this),arguments)},reduceRight:function(t){return pt.apply(Ct(this),arguments)},reverse:function(){for(var t,e=this,n=Ct(e).length,r=Math.floor(n/2),o=0;o<r;)t=e[o],e[o++]=e[--n],e[n]=t;return e},some:function(t){return et(Ct(this),t,arguments.length>1?arguments[1]:void 0)},sort:function(t){return dt.call(Ct(this),t)},subarray:function(t,e){var n=Ct(this),r=n.length,o=m(t,r);return new(k(n,n[wt]))(n.buffer,n.byteOffset+o*n.BYTES_PER_ELEMENT,v((void 0===e?r:m(e,r))-o))}},Vt=function(t,e){return Rt(this,vt.call(Ct(this),t,e))},Wt=function(t){Ct(this);var e=At(arguments[1],1),n=this.length,r=x(t),o=v(r.length),i=0;if(o+e>n)throw X(Ot);for(;i<o;)this[e+i]=r[i++]},Xt={entries:function(){return lt.call(Ct(this))},keys:function(){return ut.call(Ct(this))},values:function(){return st.call(Ct(this))}},zt=function(t,e){return w(t)&&t[Et]&&"symbol"!=typeof e&&e in t&&String(+e)==String(e)},Gt=function(t,e){return zt(t,e=_(e,!0))?f(2,t[e]):W(t,e)},qt=function(t,e,n){return!(zt(t,e=_(e,!0))&&w(n)&&g(n,"value"))||g(n,"get")||g(n,"set")||n.configurable||g(n,"writable")&&!n.writable||g(n,"enumerable")&&!n.enumerable?V(t,e,n):(t[e]=n.value,t)};xt||(B.f=Gt,D.f=qt),a(a.S+a.F*!xt,"Object",{getOwnPropertyDescriptor:Gt,defineProperty:qt}),i(function(){mt.call({})})&&(mt=_t=function(){return ht.call(this)});var Ht=h({},Bt);h(Ht,Xt),p(Ht,gt,Xt.values),h(Ht,{slice:Vt,set:Wt,constructor:function(){},toString:mt,toLocaleString:Dt}),Nt(Ht,"buffer","b"),Nt(Ht,"byteOffset","o"),Nt(Ht,"byteLength","l"),Nt(Ht,"length","e"),V(Ht,yt,{get:function(){return this[Et]}}),t.exports=function(t,e,n,u){u=!!u;var l=t+(u?"Clamped":"")+"Array",f="Uint8Array"!=l,h="get"+t,d="set"+t,m=o[l],_=m||{},g=m&&O(m),y=!m||!s.ABV,x={},E=m&&m[K],P=function(t,n){var r=t._d;return r.v[h](n*e+r.o,Pt)},M=function(t,n,r){var o=t._d;u&&(r=(r=Math.round(r))<0?0:r>255?255:255&r),o.v[d](n*e+o.o,r,Pt)},j=function(t,e){V(t,e,{get:function(){return P(this,e)},set:function(t){return M(this,e,t)},enumerable:!0})};y?(m=n(function(t,n,r,o){c(t,m,l,"_d");var i,a,s,u,f=0,h=0;if(w(n)){if(!(n instanceof Z||(u=b(n))==q||u==H))return Et in n?It(m,n):Ut.call(m,n);i=n,h=At(r,e);var d=n.byteLength;if(void 0===o){if(d%e)throw X(Ot);if(a=d-h,a<0)throw X(Ot)}else if(a=v(o)*e,a+h>d)throw X(Ot);s=a/e}else s=jt(n,!0),a=s*e,i=new Z(a);for(p(t,"_d",{b:i,o:h,l:a,e:s,v:new Q(i)});f<s;)j(t,f++)}),E=m[K]=T(Ht),p(E,"constructor",m)):N(function(t){new m(null),new m(t)},!0)||(m=n(function(t,n,r,o){c(t,m,l);var i;return w(n)?n instanceof Z||(i=b(n))==q||i==H?void 0!==o?new _(n,At(r,e),o):void 0!==r?new _(n,At(r,e)):new _(n):Et in n?It(m,n):Ut.call(m,n):new _(jt(n,f))}),J(g!==Function.prototype?S(_).concat(S(g)):S(_),function(t){t in m||p(m,t,_[t])}),m[K]=E,r||(E.constructor=m));var A=E[gt],C=!!A&&("values"==A.name||void 0==A.name),k=Xt.values;p(m,bt,!0),p(E,Et,l),p(E,Tt,!0),p(E,wt,m),(u?new m(1)[yt]==l:yt in E)||V(E,yt,{get:function(){return l}}),x[l]=m,a(a.G+a.W+a.F*(m!=_),x),a(a.S,l,{BYTES_PER_ELEMENT:e,from:Ut,of:Ft}),Y in E||p(E,Y,e),a(a.P,l,Bt),U(l),a(a.P+a.F*Mt,l,{set:Wt}),a(a.P+a.F*!C,l,Xt),a(a.P+a.F*(E.toString!=mt),l,{toString:mt}),a(a.P+a.F*i(function(){new m(1).slice()}),l,{slice:Vt}),a(a.P+a.F*(i(function(){return[1,2].toLocaleString()!=new m([1,2]).toLocaleString()})||!i(function(){E.toLocaleString.call([1,2])})),l,{toLocaleString:Dt}),I[l]=C?A:k,r||C||p(E,gt,k)}}else t.exports=function(){}},function(t,e,n){var r=n(47)("meta"),o=n(7),i=n(13),a=n(10).f,s=0,u=Object.isExtensible||function(){return!0},l=!n(6)(function(){return u(Object.preventExtensions({}))}),c=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},f=function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";c(t)}return t[r].i},p=function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;c(t)}return t[r].w},h=function(t){return l&&d.NEED&&u(t)&&!i(t,r)&&c(t),t},d=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:p,onFreeze:h}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e){t.exports=!1},function(t,e,n){var r=n(4),o=n(152),i=n(96),a=n(108)("IE_PROTO"),s=function(){},u="prototype",l=function(){var t,e=n(95)("iframe"),r=i.length,o="<",a=">";for(e.style.display="none",n(98).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(o+"script"+a+"document.F=Object"+o+"/script"+a),t.close(),l=t.F;r--;)delete l[u][i[r]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[u]=r(t),n=new s,s[u]=null,n[a]=t):n=l(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(154),o=n(96).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(154),o=n(96);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(16);t.exports=function(t,e,n){for(var o in e)r(t,o,e[o],n);return t}},function(t,e,n){"use strict";var r=n(5),o=n(10),i=n(9),a=n(8)("species");t.exports=function(t){var e=r[t];i&&e&&!e[a]&&o.f(e,a,{configurable:!0,get:function(){return this}})}},function(t,e,n){var r=n(37),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){function r(t,e){var n=i(t,e);return o(n)?n:void 0}var o=n(480),i=n(518);t.exports=r},function(t,e,n){function r(t){return a(t)?o(t):i(t)}var o=n(465),i=n(482),a=n(88);t.exports=r},function(t,e,n){var r=n(8)("unscopables"),o=Array.prototype;void 0==o[r]&&n(15)(o,r,{}),t.exports=function(t){
o[r][t]=!0}},function(t,e,n){var r=n(32),o=n(148),i=n(100),a=n(4),s=n(11),u=n(117),l={},c={},e=t.exports=function(t,e,n,f,p){var h,d,v,m,_=p?function(){return t}:u(t),g=r(n,f,e?2:1),y=0;if("function"!=typeof _)throw TypeError(t+" is not iterable!");if(i(_)){for(h=s(t.length);h>y;y++)if(m=e?g(a(d=t[y])[0],d[1]):g(t[y]),m===l||m===c)return m}else for(v=_.call(t);!(d=v.next()).done;)if(m=o(v,g,d.value,e),m===l||m===c)return m};e.BREAK=l,e.RETURN=c},function(t,e){t.exports={}},function(t,e,n){var r=n(10).f,o=n(13),i=n(8)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(0),o=n(23),i=n(6),a=n(113),s="["+a+"]",u="​",l=RegExp("^"+s+s+"*"),c=RegExp(s+s+"*$"),f=function(t,e,n){var o={},s=i(function(){return!!a[t]()||u[t]()!=u}),l=o[t]=s?e(p):a[t];n&&(o[n]=l),r(r.P+r.F*s,"String",o)},p=f.trim=function(t,e){return t=String(o(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(c,"")),t};t.exports=f},function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},function(t,e,n){"use strict";t.exports.gemv=n(594),t.exports.gbmv=n(593),t.exports.symv=n(600),t.exports.sbmv=n(596),t.exports.spmv=n(597),t.exports.trmv=n(606),t.exports.tbmv=n(603),t.exports.trsv=n(607),t.exports.tbsv=n(604),t.exports.tpsv=n(605),t.exports.ger=n(595),t.exports.syr=n(601),t.exports.spr=n(598),t.exports.syr2=n(602),t.exports.spr2=n(599),t.exports.trmv_lower=function(e,n){return console.warn("trmv_lower is deprecated. Please use the 'isLower' flag with trmv."),t.exports.trmv(e,n,!0)},t.exports.trsv_lower=function(e,n){return console.warn("trsv_lower is deprecated. Please use the 'isLower' flag with trsv."),t.exports.trsv(e,n,!0)}},function(t,e,n){"use strict";function r(t,e){switch(t){case"Convolution2D":return["linear","relu"].indexOf(e.activation)>-1;case"BatchNormalization":return 0===e.mode;case"MaxPooling2D":case"AveragePooling2D":return!0;case"Merge":return["concat","sum","mul","ave","max"].indexOf(e.mode)>-1;default:return!1}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){var r=n(22),o=n(8)("toStringTag"),i="Arguments"==r(function(){return arguments}()),a=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=a(e=Object(t),o))?n:i?r(e):"Object"==(s=r(e))&&"function"==typeof e.callee?"Arguments":s}},function(t,e,n){var r=n(22);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(29),o=r.Symbol;t.exports=o},function(t,e,n){function r(t){return null==t?void 0===t?u:s:l&&l in Object(t)?i(t):a(t)}var o=n(61),i=n(516),a=n(543),s="[object Null]",u="[object Undefined]",l=o?o.toStringTag:void 0;t.exports=r},function(t,e,n){function r(t){if("string"==typeof t||o(t))return t;var e=t+"";return"0"==e&&1/t==-i?"-0":e}var o=n(89),i=1/0;t.exports=r},function(t,e){function n(t){return null!=t&&"object"==typeof t}t.exports=n},function(t,e,n){function r(t){return null==t?"":o(t)}var o=n(497);t.exports=r},function(t,e,n){"use strict";function r(t){return Array.isArray(t)?[t.length,t[0].length]:t.shape}function o(t,e,n){var o=r(t),i=r(e),a=r(n);if(o[0]!==i[0]||o[1]!==a[1]||i[1]!==a[0])throw new Error("Mismatched array shapes for matrix product")}function i(t){if(Array.isArray(t)){if(Array.isArray(t))return["r","native"]}else if(t.shape&&2===t.shape.length)return t.order[0]?["r",t.dtype]:["c",t.dtype];throw new Error("Unrecognized data type")}function a(t,e,n,r,a){void 0===r&&(r=1),void 0===a&&(a=0);var l=1!==r,c=0!==a,f=i(t),p=i(e),h=i(n);o(t,e,n);var d=[f,p,h,l,c].join(":"),v=u[d];return v||(v=u[d]=s(f,p,h,l,c)),v(t,e,n,r,a)}t.exports=a;var s=n(609),u={}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(){r(this,t),this.MAX_NUM_TEXTURES=8,this.webgl=weblas.gpu.gl,this.numTextures=8}return o(t,[{key:"_bindInputTexture",value:function(t,e,n,r){var o=this.webgl.context;o.activeTexture(n),o.bindTexture(o.TEXTURE_2D,e);var i=o.getUniformLocation(t,r);o.uniform1i(i,n-o.TEXTURE0)}},{key:"_compute",value:function(){var t=this.webgl.context;t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0)}},{key:"_unbindInputTextures",value:function(){for(var t=this.webgl.context,e=0;e<this.numTextures;e++)this.webgl.unbindInputTexture(t.TEXTURE0+e)}}]),t}();e.default=i},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},f=n(19),p=o(f),h=n(2),d=r(h),v=n(1),m=r(v),_=n(3),g=r(_),y=n(66),b=r(y),w=n(57),x=r(w),E=n(198),T=r(E),O=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Convolution2D";var r=t.nbFilter,o=void 0===r?1:r,s=t.nbRow,u=void 0===s?3:s,l=t.nbCol,c=void 0===l?3:l,f=t.activation,h=void 0===f?"linear":f,d=t.borderMode,v=void 0===d?"valid":d,m=t.subsample,_=void 0===m?[1,1]:m,g=t.dimOrdering,y=void 0===g?"tf":g,b=t.bias,w=void 0===b||b;if(n.kernelShape=[o,u,c],n.activation=h,n.activationFunc=p[h],"valid"!==v&&"same"!==v)throw new Error(n.name+" [Convolution2D layer] Invalid borderMode.");if(n.borderMode=v,n.subsample=_,"tf"!==y&&"th"!==y)throw new Error(n.name+" [Convolution2D layer] Only tf and th dim ordering are allowed.");if(n.dimOrdering=y,n.bias=w,n.params=n.bias?["W","b"]:["W"],n.gpu&&weblas&&(n._useWeblas=!0,n.pipeline)){var E=(0,x.default)(n.layerClass,t);E?(n._pipelineEnabled=!0,n.webglConv2D=new T.default):n._pipelineEnabled=!1}return n}return s(e,t),l(e,[{key:"setWeights",value:function(t){"th"===this.dimOrdering&&(t[0].tensor=t[0].tensor.transpose(2,3,1,0)),c(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setWeights",this).call(this,t),this._w2row(),this._useWeblas&&(this._wRowsMat.createWeblasTensor(),this._wRowsMat._gpuMaxSizeExceeded||(this._wRowsMat.weblasTensor=this._wRowsMat.weblasTensor.transpose()),this.bias?this.weights.b.createWeblasTensor():(this._zerosVec=new d.default([],[this.weights.W.tensor.shape[3]]),this._zerosVec.createWeblasTensor()))}},{key:"_calcOutputShape",value:function(t){var e=t[0],n=t[1],r=u(this.kernelShape,3),o=r[0],i=r[1],a=r[2],s="same"===this.borderMode?Math.floor((e+this.subsample[0]-1)/this.subsample[0]):Math.floor((e-i+this.subsample[0])/this.subsample[0]),l="same"===this.borderMode?Math.floor((n+this.subsample[1]-1)/this.subsample[1]):Math.floor((n-a+this.subsample[1])/this.subsample[1]),c=o,f="same"===this.borderMode?Math.max(0,Math.floor((s-1)*this.subsample[0]+i-e)):0,p="same"===this.borderMode?Math.max(0,Math.floor((l-1)*this.subsample[1]+a-n)):0,h=Math.floor(f/2),d=f-h,v=Math.floor(p/2),m=p-v;this.outputShape=[s,l,c],this.inputPadding=[h,d,v,m]}},{key:"_padInput",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if("same"===this.borderMode){var n=u(t.tensor.shape,3),r=n[0],o=n[1],i=n[2],a=u(this.inputPadding,4),s=a[0],l=a[1],c=a[2],f=a[3],p=r+s+l,h=o+c+f,v=new d.default([],[p,h,i]);0!==e&&g.default.assigns(v.tensor,e),g.default.assign(v.tensor.hi(r+s,o+c,i).lo(s,c,0),t.tensor),t.tensor=v.tensor}return t}},{key:"_im2col",value:function(t){var e=u(t.tensor.shape,3),n=e[0],r=e[1],o=e[2],i=this.kernelShape[1],a=this.kernelShape[2],s=this.outputShape[0],l=this.outputShape[1],c=s*l,f=i*a*o;if(this._imColsMat||(this._imColsMat=new d.default([],[c,f])),1===i&&1===a&&1===this.subsample[0]&&1===this.subsample[1])return this._imColsMat.replaceTensorData(t.tensor.data),this._useWeblas&&this._imColsMat.createWeblasTensor(),this._imColsMat;for(var p=new d.default([],[i,a,o]),h=0,v=0,m=n-i;v<=m;v+=this.subsample[0])for(var _=0,y=r-a;_<=y;_+=this.subsample[1])g.default.assign(p.tensor,t.tensor.hi(v+i,_+a,o).lo(v,_,0)),this._imColsMat.tensor.data.set(p.tensor.data,h),h+=f;return this._useWeblas&&this._imColsMat.createWeblasTensor(),this._imColsMat}},{key:"_w2row",value:function(){var t=this.weights.W.tensor.shape[2],e=u(this.kernelShape,3),n=e[0],r=e[1],o=e[2],i=r*o*t;this._wRowsMat=new d.default([],[i,n]);for(var a=new d.default([],[r,o,t]),s=new d.default([],[i]),l=0;l<n;l++)g.default.assign(a.tensor,this.weights.W.tensor.pick(null,null,null,l)),s.replaceTensorData(a.tensor.data),g.default.assign(this._wRowsMat.tensor.pick(null,l),s.tensor);return this._wRowsMat}},{key:"_tiledIndexMapping",value:function(t){if(!this._tiledIndexMappingRow||!this._tiledIndexMappingCol){for(var e=u(t,3),n=e[0],r=e[1],o=e[2],i=new d.default([],t),a=new d.default([],t),s=0;s<n;s++)for(var l=0;l<r;l++)g.default.assigns(i.tensor.pick(s,l,null),s*r+l);for(var c=0;c<o;c++)g.default.assigns(a.tensor.pick(null,null,c),c);if("same"===this.borderMode){var f=u(this.inputPadding,4),p=f[0],h=f[1],v=f[2],m=f[3];n=n+p+h,r=r+v+m;var _=-1;this._padInput(i,_),this._padInput(a,_)}var y=this.kernelShape[1],b=this.kernelShape[2],w=this.outputShape[0],x=this.outputShape[1],E=w*x,T=y*b*o;this._tiledIndexMappingRow=new d.default([],[E,T]),this._tiledIndexMappingCol=new d.default([],[E,T]);for(var O=new d.default([],[y,b,o]),S=new d.default([],[y,b,o]),P=0,M=0,j=n-y;M<=j;M+=this.subsample[0])for(var A=0,C=r-b;A<=C;A+=this.subsample[1])g.default.assign(O.tensor,i.tensor.hi(M+y,A+b,o).lo(M,A,0)),g.default.assign(S.tensor,a.tensor.hi(M+y,A+b,o).lo(M,A,0)),this._tiledIndexMappingRow.tensor.data.set(O.tensor.data,P),this._tiledIndexMappingCol.tensor.data.set(S.tensor.data,P),P+=T;this._tiledIndexMappingRow.createWeblasTensor(),this._tiledIndexMappingCol.createWeblasTensor()}}},{key:"_callPipelineMode",value:function(t){if(!t.weblasTensor)throw new Error("Variable passed in does not contain weblas tensor.");this._tiledIndexMapping(this.inputShape);var e=this.bias?this.weights.b.weblasTensor:this._zerosVec.weblasTensor;return t.weblasTensor=this.webglConv2D.call(t.weblasTensor,this._wRowsMat.weblasTensor,e,this.activation,t._fromPipeline?this._tiledIndexMappingRow.weblasTensor:null,t._fromPipeline?this._tiledIndexMappingCol.weblasTensor:null),t._fromPipeline=!0,t._actualShape=this.outputShape,t}},{key:"_callRegularMode",value:function(t){if(!t.tensor)throw new Error("Variable passed in does not contain tensor.");"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,0));var e=this.kernelShape[0],n=this.outputShape[0],r=this.outputShape[1],o=n*r,i=new d.default([],[o,e]);if(!this._useWeblas||this._imColsMat._gpuMaxSizeExceeded||this._wRowsMat._gpuMaxSizeExceeded){if(this.bias)for(var a=0;a<e;a++)g.default.assigns(i.tensor.pick(null,a),this.weights.b.tensor.get(a));(0,b.default)(i.tensor,this._imColsMat.tensor,this._wRowsMat.tensor,1,1)}else{var s=this.bias?this.weights.b.weblasTensor:this._zerosVec.weblasTensor;i.tensor.data=weblas.pipeline.sgemm(1,this._imColsMat.weblasTensor,this._wRowsMat.weblasTensor,1,s).transfer()}for(var u=new d.default([],this.outputShape),l=new d.default([],[n*r]),c=new d.default([],[n,r]),f=0;f<e;f++)g.default.assign(l.tensor,i.tensor.pick(null,f)),c.replaceTensorData(l.tensor.data),g.default.assign(u.tensor.pick(null,null,f),c.tensor);return t.tensor=u.tensor,this.activationFunc(t),"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(2,0,1)),t}},{key:"call",value:function(t){if(t._fromPipeline?this.inputShape=t._actualShape:this.inputShape=t.tensor.shape,this._calcOutputShape(this.inputShape),this._pipelineEnabled){if(!t._fromPipeline){if(this._padInput(t),this._im2col(t),this._imColsMat._gpuMaxSizeExceeded)return this._callRegularMode(t);t.weblasTensor=this._imColsMat.weblasTensor}return this._callPipelineMode(t)}return this._padInput(t),this._im2col(t),this._callRegularMode(t)}}]),e}(m.default);e.default=O},function(t,e,n){var r=n(18),o=n(11),i=n(46);t.exports=function(t){return function(e,n,a){var s,u=r(e),l=o(u.length),c=i(a,l);if(t&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((t||c in u)&&u[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){"use strict";var r=n(5),o=n(0),i=n(16),a=n(44),s=n(35),u=n(51),l=n(39),c=n(7),f=n(6),p=n(75),h=n(53),d=n(99);t.exports=function(t,e,n,v,m,_){var g=r[t],y=g,b=m?"set":"add",w=y&&y.prototype,x={},E=function(t){var e=w[t];i(w,t,"delete"==t?function(t){return!(_&&!c(t))&&e.call(this,0===t?0:t)}:"has"==t?function(t){return!(_&&!c(t))&&e.call(this,0===t?0:t)}:"get"==t?function(t){return _&&!c(t)?void 0:e.call(this,0===t?0:t)}:"add"==t?function(t){return e.call(this,0===t?0:t),this}:function(t,n){return e.call(this,0===t?0:t,n),this})};if("function"==typeof y&&(_||w.forEach&&!f(function(){(new y).entries().next()}))){var T=new y,O=T[b](_?{}:-0,1)!=T,S=f(function(){T.has(1)}),P=p(function(t){new y(t)}),M=!_&&f(function(){for(var t=new y,e=5;e--;)t[b](e,e);return!t.has(-0)});P||(y=e(function(e,n){l(e,y,t);var r=d(new g,e,y);return void 0!=n&&u(n,m,r[b],r),r}),y.prototype=w,w.constructor=y),(S||M)&&(E("delete"),E("has"),m&&E("get")),(M||O)&&E(b),_&&w.clear&&delete w.clear}else y=v.getConstructor(e,t,m,b),a(y.prototype,n),s.NEED=!0;return h(y,t),x[t]=y,o(o.G+o.W+o.F*(y!=g),x),_||v.setStrong(y,t,m),y}},function(t,e,n){"use strict";var r=n(15),o=n(16),i=n(6),a=n(23),s=n(8);t.exports=function(t,e,n){var u=s(t),l=n(a,u,""[t]),c=l[0],f=l[1];i(function(){var e={};return e[u]=function(){return 7},7!=""[t](e)})&&(o(String.prototype,t,c),r(RegExp.prototype,u,2==e?function(t,e){return f.call(t,this,e)}:function(t){return f.call(t,this)}))}},function(t,e,n){"use strict";var r=n(4);t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var r=n(7),o=n(22),i=n(8)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},function(t,e,n){var r=n(8)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],a=i[r]();a.next=function(){return{done:n=!0}},i[r]=function(){return a},t(i)}catch(t){}return n}},function(t,e,n){t.exports=n(40)||!n(6)(function(){var t=Math.random();__defineSetter__.call(null,t,function(){}),delete n(5)[t]})},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(5),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e,n){for(var r,o=n(5),i=n(15),a=n(47),s=a("typed_array"),u=a("view"),l=!(!o.ArrayBuffer||!o.DataView),c=l,f=0,p=9,h="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");f<p;)(r=o[h[f++]])?(i(r.prototype,s,!0),i(r.prototype,u,!0)):c=!1;t.exports={ABV:l,CONSTR:c,TYPED:s,VIEW:u}},function(t,e,n){function r(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}var o=n(530),i=n(531),a=n(532),s=n(533),u=n(534);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=s,r.prototype.set=u,t.exports=r},function(t,e,n){function r(t,e){for(var n=t.length;n--;)if(o(t[n][0],e))return n;return-1}var o=n(87);t.exports=r},function(t,e,n){function r(t){return"function"==typeof t?t:null==t?a:"object"==typeof t?s(t)?i(t[0],t[1]):o(t):u(t)}var o=n(483),i=n(484),a=n(125),s=n(30),u=n(574);t.exports=r},function(t,e,n){function r(t,e){return o(t)?t:i(t,e)?[t]:a(s(t))}var o=n(30),i=n(124),a=n(558),s=n(65);t.exports=r},function(t,e,n){function r(t,e){var n=t.__data__;return o(e)?n["string"==typeof e?"string":"hash"]:n.map}var o=n(527);t.exports=r},function(t,e){function n(t,e){return e=null==e?r:e,!!e&&("number"==typeof t||o.test(t))&&t>-1&&t%1==0&&t<e}var r=9007199254740991,o=/^(?:0|[1-9]\d*)$/;t.exports=n},function(t,e,n){var r=n(48),o=r(Object,"create");t.exports=o},function(t,e){function n(t,e){return t===e||t!==t&&e!==e}t.exports=n},function(t,e,n){function r(t){return null!=t&&i(t.length)&&!o(t)}var o=n(186),i=n(128);t.exports=r},function(t,e,n){function r(t){return"symbol"==typeof t||i(t)&&o(t)==a}var o=n(62),i=n(64),a="[object Symbol]";t.exports=r},function(t,e,n){"use strict";t.exports.swap=n(592),t.exports.scal=n(591),t.exports.copy=n(585),t.exports.axpy=n(584),t.exports.dot=n(587),t.exports.cpsc=n(586),t.exports.nrm2=n(589),t.exports.asum=n(583),t.exports.iamax=n(588),t.exports.rotg=n(590)},function(t,e,n){function r(t,e){return t[0]-e[0]}function o(){var t,e=this.stride,n=new Array(e.length);for(t=0;t<n.length;++t)n[t]=[Math.abs(e[t]),t];n.sort(r);var o=new Array(n.length);for(t=0;t<o.length;++t)o[t]=n[t][1];return o}function i(t,e){var n=["View",e,"d",t].join("");e<0&&(n="View_Nil"+t);var r="generic"===t;if(e===-1){var i="function "+n+"(a){this.data=a;};var proto="+n+".prototype;proto.dtype='"+t+"';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new "+n+"(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_"+n+"(a){return new "+n+"(a);}",a=new Function(i);return a()}if(0===e){var i="function "+n+"(a,d) {this.data = a;this.offset = d};var proto="+n+".prototype;proto.dtype='"+t+"';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function "+n+"_copy() {return new "+n+"(this.data,this.offset)};proto.pick=function "+n+"_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function "+n+"_get(){return "+(r?"this.data.get(this.offset)":"this.data[this.offset]")+"};proto.set=function "+n+"_set(v){return "+(r?"this.data.set(this.offset,v)":"this.data[this.offset]=v")+"};return function construct_"+n+"(a,b,c,d){return new "+n+"(a,d)}",a=new Function("TrivialArray",i);return a(f[t][0])}var i=["'use strict'"],s=u(e),l=s.map(function(t){return"i"+t}),c="this.offset+"+s.map(function(t){return"this.stride["+t+"]*i"+t}).join("+"),p=s.map(function(t){return"b"+t}).join(","),h=s.map(function(t){return"c"+t}).join(",");i.push("function "+n+"(a,"+p+","+h+",d){this.data=a","this.shape=["+p+"]","this.stride=["+h+"]","this.offset=d|0}","var proto="+n+".prototype","proto.dtype='"+t+"'","proto.dimension="+e),i.push("Object.defineProperty(proto,'size',{get:function "+n+"_size(){return "+s.map(function(t){return"this.shape["+t+"]"}).join("*"),"}})"),1===e?i.push("proto.order=[0]"):(i.push("Object.defineProperty(proto,'order',{get:"),e<4?(i.push("function "+n+"_order(){"),2===e?i.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})"):3===e&&i.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")):i.push("ORDER})")),i.push("proto.set=function "+n+"_set("+l.join(",")+",v){"),r?i.push("return this.data.set("+c+",v)}"):i.push("return this.data["+c+"]=v}"),i.push("proto.get=function "+n+"_get("+l.join(",")+"){"),r?i.push("return this.data.get("+c+")}"):i.push("return this.data["+c+"]}"),i.push("proto.index=function "+n+"_index(",l.join(),"){return "+c+"}"),i.push("proto.hi=function "+n+"_hi("+l.join(",")+"){return new "+n+"(this.data,"+s.map(function(t){return["(typeof i",t,"!=='number'||i",t,"<0)?this.shape[",t,"]:i",t,"|0"].join("")}).join(",")+","+s.map(function(t){return"this.stride["+t+"]"}).join(",")+",this.offset)}");var d=s.map(function(t){return"a"+t+"=this.shape["+t+"]"}),v=s.map(function(t){return"c"+t+"=this.stride["+t+"]"});i.push("proto.lo=function "+n+"_lo("+l.join(",")+"){var b=this.offset,d=0,"+d.join(",")+","+v.join(","));for(var m=0;m<e;++m)i.push("if(typeof i"+m+"==='number'&&i"+m+">=0){d=i"+m+"|0;b+=c"+m+"*d;a"+m+"-=d}");i.push("return new "+n+"(this.data,"+s.map(function(t){return"a"+t}).join(",")+","+s.map(function(t){return"c"+t}).join(",")+",b)}"),i.push("proto.step=function "+n+"_step("+l.join(",")+"){var "+s.map(function(t){return"a"+t+"=this.shape["+t+"]"}).join(",")+","+s.map(function(t){return"b"+t+"=this.stride["+t+"]"}).join(",")+",c=this.offset,d=0,ceil=Math.ceil");for(var m=0;m<e;++m)i.push("if(typeof i"+m+"==='number'){d=i"+m+"|0;if(d<0){c+=b"+m+"*(a"+m+"-1);a"+m+"=ceil(-a"+m+"/d)}else{a"+m+"=ceil(a"+m+"/d)}b"+m+"*=d}");i.push("return new "+n+"(this.data,"+s.map(function(t){return"a"+t}).join(",")+","+s.map(function(t){return"b"+t}).join(",")+",c)}");for(var _=new Array(e),g=new Array(e),m=0;m<e;++m)_[m]="a[i"+m+"]",g[m]="b[i"+m+"]";i.push("proto.transpose=function "+n+"_transpose("+l+"){"+l.map(function(t,e){return t+"=("+t+"===undefined?"+e+":"+t+"|0)"}).join(";"),"var a=this.shape,b=this.stride;return new "+n+"(this.data,"+_.join(",")+","+g.join(",")+",this.offset)}"),i.push("proto.pick=function "+n+"_pick("+l+"){var a=[],b=[],c=this.offset");for(var m=0;m<e;++m)i.push("if(typeof i"+m+"==='number'&&i"+m+">=0){c=(c+this.stride["+m+"]*i"+m+")|0}else{a.push(this.shape["+m+"]);b.push(this.stride["+m+"])}");i.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"),i.push("return function construct_"+n+"(data,shape,stride,offset){return new "+n+"(data,"+s.map(function(t){return"shape["+t+"]"}).join(",")+","+s.map(function(t){return"stride["+t+"]"}).join(",")+",offset)}");var a=new Function("CTOR_LIST","ORDER",i.join("\n"));return a(f[t],o)}function a(t){if(l(t))return"buffer";if(c)switch(Object.prototype.toString.call(t)){case"[object Float64Array]":return"float64";case"[object Float32Array]":return"float32";case"[object Int8Array]":return"int8";case"[object Int16Array]":return"int16";case"[object Int32Array]":return"int32";case"[object Uint8Array]":return"uint8";case"[object Uint16Array]":return"uint16";case"[object Uint32Array]":return"uint32";case"[object Uint8ClampedArray]":return"uint8_clamped"}return Array.isArray(t)?"array":"generic"}function s(t,e,n,r){if(void 0===t){var o=f.array[0];return o([])}"number"==typeof t&&(t=[t]),void 0===e&&(e=[t.length]);var s=e.length;if(void 0===n){n=new Array(s);for(var u=s-1,l=1;u>=0;--u)n[u]=l,l*=e[u]}if(void 0===r){r=0;for(var u=0;u<s;++u)n[u]<0&&(r-=(e[u]-1)*n[u])}for(var c=a(t),p=f[c];p.length<=s+1;)p.push(i(c,p.length-1));var o=p[s+1];return o(t,e,n,r)}var u=n(453),l=n(454),c="undefined"!=typeof Float64Array,f={float32:[],float64:[],int8:[],int16:[],int32:[],uint8:[],uint16:[],uint32:[],array:[],uint8_clamped:[],buffer:[],generic:[]};t.exports=s},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,configurable:!1,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,configurable:!1,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){"use strict";var r=n(12),o=n(46),i=n(11);t.exports=function(t){for(var e=r(this),n=i(e.length),a=arguments.length,s=o(a>1?arguments[1]:void 0,n),u=a>2?arguments[2]:void 0,l=void 0===u?n:o(u,n);l>s;)e[s++]=t;return e}},function(t,e,n){"use strict";var r=n(10),o=n(36);t.exports=function(t,e,n){e in t?r.f(t,e,o(0,n)):t[e]=n}},function(t,e,n){var r=n(7),o=n(5).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(8)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,!"/./"[t](e)}catch(t){}}return!0}},function(t,e,n){t.exports=n(5).document&&document.documentElement},function(t,e,n){var r=n(7),o=n(107).set;t.exports=function(t,e,n){var i,a=e.constructor;return a!==n&&"function"==typeof a&&(i=a.prototype)!==n.prototype&&r(i)&&o&&o(t,i),t}},function(t,e,n){var r=n(52),o=n(8)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){var r=n(22);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){"use strict";var r=n(41),o=n(36),i=n(53),a={};n(15)(a,n(8)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){"use strict";var r=n(40),o=n(0),i=n(16),a=n(15),s=n(13),u=n(52),l=n(102),c=n(53),f=n(21),p=n(8)("iterator"),h=!([].keys&&"next"in[].keys()),d="@@iterator",v="keys",m="values",_=function(){return this};t.exports=function(t,e,n,g,y,b,w){l(n,e,g);var x,E,T,O=function(t){if(!h&&t in j)return j[t];switch(t){case v:return function(){return new n(this,t)};case m:return function(){return new n(this,t)}}return function(){return new n(this,t)}},S=e+" Iterator",P=y==m,M=!1,j=t.prototype,A=j[p]||j[d]||y&&j[y],C=A||O(y),k=y?P?O("entries"):C:void 0,R="Array"==e?j.entries||A:A;if(R&&(T=f(R.call(new t)),T!==Object.prototype&&(c(T,S,!0),r||s(T,p)||a(T,p,_))),P&&A&&A.name!==m&&(M=!0,C=function(){return A.call(this)}),r&&!w||!h&&!M&&j[p]||a(j,p,C),u[e]=C,u[S]=_,y)if(x={values:P?C:O(m),keys:b?C:O(v),entries:k},w)for(E in x)E in j||i(j,E,x[E]);else o(o.P+o.F*(h||M),e,x);return x}},function(t,e){var n=Math.expm1;t.exports=!n||n(10)>22025.465794806718||n(10)<22025.465794806718||n(-2e-17)!=-2e-17?function(t){return 0==(t=+t)?t:t>-1e-6&&t<1e-6?t+t*t/2:Math.exp(t)-1}:n},function(t,e){t.exports=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},function(t,e,n){var r=n(5),o=n(114).set,i=r.MutationObserver||r.WebKitMutationObserver,a=r.process,s=r.Promise,u="process"==n(22)(a);t.exports=function(){var t,e,n,l=function(){var r,o;for(u&&(r=a.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(r){throw t?n():e=void 0,r}}e=void 0,r&&r.enter()};if(u)n=function(){a.nextTick(l)};else if(i){var c=!0,f=document.createTextNode("");new i(l).observe(f,{characterData:!0}),n=function(){f.data=c=!c}}else if(s&&s.resolve){var p=s.resolve();n=function(){p.then(l)}}else n=function(){o.call(r,l)};return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},function(t,e,n){var r=n(7),o=n(4),i=function(t,e){if(o(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{r=n(32)(Function.call,n(20).f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:r(t,n),t}}({},!1):void 0),check:i}},function(t,e,n){var r=n(78)("keys"),o=n(47);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(4),o=n(14),i=n(8)("species");t.exports=function(t,e){var n,a=r(t).constructor;return void 0===a||void 0==(n=r(a)[i])?e:o(n)}},function(t,e,n){var r=n(37),o=n(23);t.exports=function(t){return function(e,n){var i,a,s=String(o(e)),u=r(n),l=s.length;return u<0||u>=l?t?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===l||(a=s.charCodeAt(u+1))<56320||a>57343?t?s.charAt(u):i:t?s.slice(u,u+2):(i-55296<<10)+(a-56320)+65536)}}},function(t,e,n){var r=n(74),o=n(23);t.exports=function(t,e,n){if(r(e))throw TypeError("String#"+n+" doesn't accept regex!");return String(o(t))}},function(t,e,n){"use strict";var r=n(37),o=n(23);t.exports=function(t){var e=String(o(this)),n="",i=r(t);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(e+=e))1&i&&(n+=e);return n}},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){var r,o,i,a=n(32),s=n(73),u=n(98),l=n(95),c=n(5),f=c.process,p=c.setImmediate,h=c.clearImmediate,d=c.MessageChannel,v=0,m={},_="onreadystatechange",g=function(){var t=+this;if(m.hasOwnProperty(t)){var e=m[t];delete m[t],e()}},y=function(t){g.call(t.data)};p&&h||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return m[++v]=function(){s("function"==typeof t?t:Function(t),e)},r(v),v},h=function(t){delete m[t]},"process"==n(22)(f)?r=function(t){f.nextTick(a(g,t,1))}:d?(o=new d,i=o.port2,o.port1.onmessage=y,r=a(i.postMessage,i,1)):c.addEventListener&&"function"==typeof postMessage&&!c.importScripts?(r=function(t){c.postMessage(t+"","*")},c.addEventListener("message",y,!1)):r=_ in l("script")?function(t){u.appendChild(l("script"))[_]=function(){u.removeChild(this),g.call(t)}}:function(t){setTimeout(a(g,t,1),0)}),t.exports={set:p,clear:h}},function(t,e,n){"use strict";var r=n(5),o=n(9),i=n(40),a=n(79),s=n(15),u=n(44),l=n(6),c=n(39),f=n(37),p=n(11),h=n(42).f,d=n(10).f,v=n(93),m=n(53),_="ArrayBuffer",g="DataView",y="prototype",b="Wrong length!",w="Wrong index!",x=r[_],E=r[g],T=r.Math,O=r.RangeError,S=r.Infinity,P=x,M=T.abs,j=T.pow,A=T.floor,C=T.log,k=T.LN2,R="buffer",I="byteLength",N="byteOffset",U=o?"_b":R,F=o?"_l":I,L=o?"_o":N,D=function(t,e,n){var r,o,i,a=Array(n),s=8*n-e-1,u=(1<<s)-1,l=u>>1,c=23===e?j(2,-24)-j(2,-77):0,f=0,p=t<0||0===t&&1/t<0?1:0;for(t=M(t),t!=t||t===S?(o=t!=t?1:0,r=u):(r=A(C(t)/k),t*(i=j(2,-r))<1&&(r--,i*=2),t+=r+l>=1?c/i:c*j(2,1-l),t*i>=2&&(r++,i/=2),r+l>=u?(o=0,r=u):r+l>=1?(o=(t*i-1)*j(2,e),r+=l):(o=t*j(2,l-1)*j(2,e),r=0));e>=8;a[f++]=255&o,o/=256,e-=8);for(r=r<<e|o,s+=e;s>0;a[f++]=255&r,r/=256,s-=8);return a[--f]|=128*p,a},B=function(t,e,n){var r,o=8*n-e-1,i=(1<<o)-1,a=i>>1,s=o-7,u=n-1,l=t[u--],c=127&l;for(l>>=7;s>0;c=256*c+t[u],u--,s-=8);for(r=c&(1<<-s)-1,c>>=-s,s+=e;s>0;r=256*r+t[u],u--,s-=8);if(0===c)c=1-a;else{if(c===i)return r?NaN:l?-S:S;r+=j(2,e),c-=a}return(l?-1:1)*r*j(2,c-e)},V=function(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]},W=function(t){return[255&t]},X=function(t){return[255&t,t>>8&255]},z=function(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]},G=function(t){return D(t,52,8)},q=function(t){return D(t,23,4)},H=function(t,e,n){d(t[y],e,{get:function(){return this[n]}})},Y=function(t,e,n,r){var o=+n,i=f(o);if(o!=i||i<0||i+e>t[F])throw O(w);
var a=t[U]._b,s=i+t[L],u=a.slice(s,s+e);return r?u:u.reverse()},K=function(t,e,n,r,o,i){var a=+n,s=f(a);if(a!=s||s<0||s+e>t[F])throw O(w);for(var u=t[U]._b,l=s+t[L],c=r(+o),p=0;p<e;p++)u[l+p]=c[i?p:e-p-1]},$=function(t,e){c(t,x,_);var n=+e,r=p(n);if(n!=r)throw O(b);return r};if(a.ABV){if(!l(function(){new x})||!l(function(){new x(.5)})){x=function(t){return new P($(this,t))};for(var Z,Q=x[y]=P[y],J=h(P),tt=0;J.length>tt;)(Z=J[tt++])in x||s(x,Z,P[Z]);i||(Q.constructor=x)}var et=new E(new x(2)),nt=E[y].setInt8;et.setInt8(0,2147483648),et.setInt8(1,2147483649),!et.getInt8(0)&&et.getInt8(1)||u(E[y],{setInt8:function(t,e){nt.call(this,t,e<<24>>24)},setUint8:function(t,e){nt.call(this,t,e<<24>>24)}},!0)}else x=function(t){var e=$(this,t);this._b=v.call(Array(e),0),this[F]=e},E=function(t,e,n){c(this,E,g),c(t,x,g);var r=t[F],o=f(e);if(o<0||o>r)throw O("Wrong offset!");if(n=void 0===n?r-o:p(n),o+n>r)throw O(b);this[U]=t,this[L]=o,this[F]=n},o&&(H(x,I,"_l"),H(E,R,"_b"),H(E,I,"_l"),H(E,N,"_o")),u(E[y],{getInt8:function(t){return Y(this,1,t)[0]<<24>>24},getUint8:function(t){return Y(this,1,t)[0]},getInt16:function(t){var e=Y(this,2,t,arguments[1]);return(e[1]<<8|e[0])<<16>>16},getUint16:function(t){var e=Y(this,2,t,arguments[1]);return e[1]<<8|e[0]},getInt32:function(t){return V(Y(this,4,t,arguments[1]))},getUint32:function(t){return V(Y(this,4,t,arguments[1]))>>>0},getFloat32:function(t){return B(Y(this,4,t,arguments[1]),23,4)},getFloat64:function(t){return B(Y(this,8,t,arguments[1]),52,8)},setInt8:function(t,e){K(this,1,t,W,e)},setUint8:function(t,e){K(this,1,t,W,e)},setInt16:function(t,e){K(this,2,t,X,e,arguments[2])},setUint16:function(t,e){K(this,2,t,X,e,arguments[2])},setInt32:function(t,e){K(this,4,t,z,e,arguments[2])},setUint32:function(t,e){K(this,4,t,z,e,arguments[2])},setFloat32:function(t,e){K(this,4,t,q,e,arguments[2])},setFloat64:function(t,e){K(this,8,t,G,e,arguments[2])}});m(x,_),m(E,g),s(E[y],a.VIEW,!0),e[_]=x,e[g]=E},function(t,e,n){var r=n(5),o=n(31),i=n(40),a=n(161),s=n(10).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){var r=n(58),o=n(8)("iterator"),i=n(52);t.exports=n(31).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){"use strict";var r=n(50),o=n(149),i=n(52),a=n(18);t.exports=n(103)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e,n){var r=n(48),o=n(29),i=r(o,"Map");t.exports=i},function(t,e,n){function r(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}var o=n(535),i=n(536),a=n(537),s=n(538),u=n(539);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=s,r.prototype.set=u,t.exports=r},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}t.exports=n},function(t,e,n){function r(t,e){e=o(e,t);for(var n=0,r=e.length;null!=t&&n<r;)t=t[i(e[n++])];return n&&n==r?t:void 0}var o=n(83),i=n(63);t.exports=r},function(t,e,n){function r(t,e,n,a,s){return t===e||(null==t||null==e||!i(t)&&!i(e)?t!==t&&e!==e:o(t,e,n,a,r,s))}var o=n(478),i=n(64);t.exports=r},function(t,e,n){function r(t,e){if(o(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!i(t))||(s.test(t)||!a.test(t)||null!=e&&t in Object(e))}var o=n(30),i=n(89),a=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,s=/^\w*$/;t.exports=r},function(t,e){function n(t){return t}t.exports=n},function(t,e,n){var r=n(477),o=n(64),i=Object.prototype,a=i.hasOwnProperty,s=i.propertyIsEnumerable,u=r(function(){return arguments}())?r:function(t){return o(t)&&a.call(t,"callee")&&!s.call(t,"callee")};t.exports=u},function(t,e,n){function r(t,e){return o(t,e)}var o=n(123);t.exports=r},function(t,e){function n(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=r}var r=9007199254740991;t.exports=n},function(t,e,n){function r(t){return t&&t.length?o(t,i):0}var o=n(494),i=n(125);t.exports=r},function(t,e,n){"use strict";function r(t,e){var n,r;if(void 0!==e&&(!Number.isFinite(e)||e%1!==e))throw new Error("axis of dimension to unsqueeze must be an integer");return e=void 0===e?t.shape.length:e,n=t.shape.slice(0),r=t.stride.slice(0),n.splice(e||0,0,1),r.splice(e||0,0,(r[e]||1)*(n[e+1]||1)),o(t.data,n,r,t.offset)}var o=n(91);t.exports=r},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(t){if(c===setTimeout)return setTimeout(t,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(t,0);try{return c(t,0)}catch(e){try{return c.call(null,t,0)}catch(e){return c.call(this,t,0)}}}function i(t){if(f===clearTimeout)return clearTimeout(t);if((f===r||!f)&&clearTimeout)return f=clearTimeout,clearTimeout(t);try{return f(t)}catch(e){try{return f.call(null,t)}catch(e){return f.call(this,t)}}}function a(){v&&h&&(v=!1,h.length?d=h.concat(d):m=-1,d.length&&s())}function s(){if(!v){var t=o(a);v=!0;for(var e=d.length;e;){for(h=d,d=[];++m<e;)h&&h[m].run();m=-1,e=d.length}h=null,v=!1,i(t)}}function u(t,e){this.fun=t,this.array=e}function l(){}var c,f,p=t.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(t){c=n}try{f="function"==typeof clearTimeout?clearTimeout:r}catch(t){f=r}}();var h,d=[],v=!1,m=-1;p.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];d.push(new u(t,e)),1!==d.length||v||o(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},p.title="browser",p.browser=!0,p.env={},p.argv=[],p.version="",p.versions={},p.on=l,p.addListener=l,p.once=l,p.off=l,p.removeListener=l,p.removeAllListeners=l,p.emit=l,p.binding=function(t){throw new Error("process.binding is not supported")},p.cwd=function(){return"/"},p.chdir=function(t){throw new Error("process.chdir is not supported")},p.umask=function(){return 0}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(67),l=r(u),c=function(t){function e(t){o(this,e);var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));if("max"===t)r.program=r.webgl.createProgram(n(617));else{if("average"!==t)throw new Error("[WebGLPooling2D] pooling function must be max or average.");r.program=r.webgl.createProgram(n(616))}return r}return a(e,t),s(e,[{key:"_bindInputTextures",value:function(t,n){var r=this.webgl.context;this.numTextures=2,this._bindInputTexture(this.program,t.texture,r.TEXTURE0,e.INPUT_TEXTURE_NAME),this._bindInputTexture(this.program,n.texture,r.TEXTURE1,e.POOL_IMAP_TEXTURE_NAME)}},{key:"_bindUniforms",value:function(t,n){var r=this.webgl.context,o=t.shape[0],i=t.shape[1],a=this.webgl.getPad(i),s=n.shape[1],u=this.webgl.getPad(s);r.uniform1i(r.getUniformLocation(this.program,e.INPUT_ROWS_UNIFORM_NAME),o),r.uniform1i(r.getUniformLocation(this.program,e.CHANNELS_UNIFORM_NAME),i),r.uniform1i(r.getUniformLocation(this.program,e.CHANNELS_PAD_UNIFORM_NAME),a),r.uniform1i(r.getUniformLocation(this.program,e.POOL_ELEMENTS_UNIFORM_NAME),s),r.uniform1i(r.getUniformLocation(this.program,e.POOL_ELEMENTS_PAD_UNIFORM_NAME),u)}},{key:"_bindOutputTexture",value:function(t,e,n){var r=e.shape[0],o=t.shape[1],i=this.webgl.getPad(o);this.webgl.bindOutputTexture(r,(o+i)/4,n.texture)}},{key:"call",value:function(t,e){this.webgl.selectProgram(this.program);var n=e.shape[0],r=t.shape[1],o=new weblas.pipeline.Tensor([n,r],null);return this._bindInputTextures(t,e),this._bindUniforms(t,e),this._bindOutputTexture(t,e,o),this._compute(),this._unbindInputTextures(),o}}]),e}(l.default);c.INPUT_TEXTURE_NAME="X",c.POOL_IMAP_TEXTURE_NAME="poolIndexMapping",c.INPUT_ROWS_UNIFORM_NAME="inputRows",c.CHANNELS_UNIFORM_NAME="channels",c.CHANNELS_PAD_UNIFORM_NAME="channelsPad",c.POOL_ELEMENTS_UNIFORM_NAME="poolElements",c.POOL_ELEMENTS_PAD_UNIFORM_NAME="poolElementsPad",e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.InputLayer=void 0;var o=n(208);Object.keys(o).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}})});var i=n(236);Object.keys(i).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return i[t]}})});var a=n(223);Object.keys(a).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return a[t]}})});var s=n(254);Object.keys(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return s[t]}})});var u=n(243);Object.keys(u).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return u[t]}})});var l=n(238);Object.keys(l).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return l[t]}})});var c=n(241);Object.keys(c).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return c[t]}})});var f=n(137);Object.keys(f).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return f[t]}})});var p=n(260);Object.keys(p).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return p[t]}})});var h=n(201),d=r(h);e.InputLayer=d.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="_Pooling1D";var r=t.poolLength,a=void 0===r?2:r,s=t.stride,u=void 0===s?null:s,l=t.borderMode,c=void 0===l?"valid":l;return n.poolLength=a,n.stride=null===u?a:u,n.borderMode=c,n.poolingFunc="max",n}return a(e,t),s(e,[{key:"call",value:function(t){if("max"!==this.poolingFunc&&"average"!==this.poolingFunc)throw new Error("[pooling._Pooling1D] pooling function must be max or average.");for(var e="valid"===this.borderMode?Math.floor((t.tensor.shape[0]-this.poolLength+this.stride)/this.stride):Math.floor((t.tensor.shape[0]+this.stride-1)/this.stride),n=new f.default([],[e,t.tensor.shape[1]]),r=new f.default([],[t.tensor.shape[1]]),o="valid"===this.borderMode?0:Math.min(0,Math.ceil((t.tensor.shape[0]-(e-1)*this.stride-this.poolLength)/2)),i=0;i<e;i++){var a=Math.max(0,o),s=this.poolLength+Math.min(0,o);h.default.assign(r.tensor,t.tensor.pick(a,null));for(var u=1,l=1;l<s&&!(a+l>t.tensor.shape[0]-1);l++)"max"===this.poolingFunc?h.default.maxeq(r.tensor,t.tensor.pick(a+l,null)):"average"===this.poolingFunc&&h.default.addeq(r.tensor,t.tensor.pick(a+l,null)),u+=1;"average"===this.poolingFunc&&h.default.divseq(r.tensor,u),h.default.assign(n.tensor.pick(i,null),r.tensor),o+=this.stride}return t.tensor=n.tensor,t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),c=r(l),f=n(2),p=r(f),h=n(3),d=r(h),v=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="_Pooling2D";var r=t.poolSize,a=void 0===r?[2,2]:r,s=t.strides,u=void 0===s?null:s,l=t.borderMode,c=void 0===l?"valid":l,f=t.dimOrdering,p=void 0===f?"tf":f;return n.poolSize=a,n.strides=null===u?a:u,n.borderMode=c,n.dimOrdering=p,n.poolingFunc="max",n}return a(e,t),u(e,[{key:"_calcOutputShape",value:function(t){var e=s(t,3),n=e[0],r=e[1],o=e[2],i=s(this.poolSize,2),a=i[0],u=i[1],l="same"===this.borderMode?Math.floor((n+this.strides[0]-1)/this.strides[0]):Math.floor((n-a+this.strides[0])/this.strides[0]),c="same"===this.borderMode?Math.floor((r+this.strides[1]-1)/this.strides[1]):Math.floor((r-u+this.strides[1])/this.strides[1]),f="same"===this.borderMode?Math.max(0,Math.floor((l-1)*this.strides[0]+a-n)):0,p="same"===this.borderMode?Math.max(0,Math.floor((c-1)*this.strides[1]+u-r)):0,h=Math.floor(f/2),d=f-h,v=Math.floor(p/2),m=p-v;this.outputShape=[l,c,o],this.inputPadding=[h,d,v,m]}},{key:"_padInput",value:function(t){if("same"===this.borderMode){var e=s(t.tensor.shape,3),n=e[0],r=e[1],o=e[2],i=s(this.inputPadding,4),a=i[0],u=i[1],l=i[2],c=i[3],f=n+a+u,h=r+l+c,v=new p.default([],[f,h,o]);"max"===this.poolingFunc&&d.default.assigns(v.tensor,Number.NEGATIVE_INFINITY),d.default.assign(v.tensor.hi(n+a,r+l,o).lo(a,l,0),t.tensor),t.tensor=v.tensor}return t}},{key:"_poolIndexMapping",value:function(t){if(!this._poolIndicesPerChannel){for(var e=t[0],n=t[1],r=new p.default([],[e,n]),o=0,i=0;i<e;i++)for(var a=0;a<n;a++)r.tensor.set(i,a,o),o+=1;if("same"===this.borderMode){var u=s(this.inputPadding,4),l=u[0],c=u[1],f=u[2],h=u[3];e=e+l+c,n=n+f+h;var v=new p.default([],[e,n]);d.default.assigns(v.tensor,-1),d.default.assign(v.tensor.hi(t[0]+l,t[1]+f).lo(l,f),r.tensor),r.tensor=v.tensor}var m=s(this.poolSize,2),_=m[0],g=m[1],y=this.outputShape[0],b=this.outputShape[1];this._poolIndicesPerChannel=new p.default([],[y*b,_*g]);for(var w=new p.default([],[_,g]),x=0,E=0,T=e-_;E<=T;E+=this.strides[0])for(var O=0,S=n-g;O<=S;O+=this.strides[1])d.default.assign(w.tensor,r.tensor.hi(E+_,O+g).lo(E,O)),this._poolIndicesPerChannel.tensor.data.set(w.tensor.data,x),x+=_*g;this._poolIndicesPerChannel.createWeblasTensor()}}},{key:"_callPipelineMode",value:function(t){if(!t.weblasTensor)throw new Error("Variable passed in does not contain weblas tensor.");return this._calcOutputShape(t._actualShape),this._poolIndexMapping(t._actualShape),t.weblasTensor=this.webglPooling2D.call(t.weblasTensor,this._poolIndicesPerChannel.weblasTensor),t._fromPipeline=!0,t._actualShape=this.outputShape,t}},{key:"_callRegularMode",value:function(t){if(!t.tensor)throw new Error("Variable passed in does not contain tensor.");"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,0)),this._calcOutputShape(t.tensor.shape),this._padInput(t);for(var e=s(t.tensor.shape,3),n=e[0],r=e[1],o=e[2],i=s(this.poolSize,2),a=i[0],u=i[1],l=new p.default([],this.outputShape),c=new p.default([],[a,u,o]),f=s(this.inputPadding,4),h=f[0],v=f[1],m=f[2],_=f[3],g=0,y=0;g<=n-a;g+=this.strides[0],y++){var b=0;g<h?b=h-g:g+a>n-v&&(b=g+a-(n-v));for(var w=0,x=0;w<=r-u;w+=this.strides[1],x++){var E=0;w<m?E=m-w:w+u>r-_&&(E=w+u-(r-_)),d.default.assign(c.tensor,t.tensor.hi(g+a,w+u,o).lo(g,w,0));for(var T=0;T<o;T++)if("max"===this.poolingFunc)l.tensor.set(y,x,T,d.default.sup(c.tensor.pick(null,null,T)));else if("average"===this.poolingFunc){var O=(a-b)*(u-E);l.tensor.set(y,x,T,d.default.sum(c.tensor.pick(null,null,T))/O)}}}return t.tensor=l.tensor,"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(2,0,1)),t}},{key:"call",value:function(t){return this._pipelineEnabled&&t._fromPipeline?this._callPipelineMode(t):this._callRegularMode(t)}}]),e}(c.default);e.default=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),c=r(l),f=n(2),p=r(f),h=n(3),d=r(h),v=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="_Pooling3D";var r=t.poolSize,a=void 0===r?[2,2,2]:r,s=t.strides,u=void 0===s?null:s,l=t.borderMode,c=void 0===l?"valid":l,f=t.dimOrdering,p=void 0===f?"tf":f;return n.poolSize=a,n.strides=null===u?a:u,n.borderMode=c,n.dimOrdering=p,n.poolingFunc="max",n}return a(e,t),u(e,[{key:"_calcOutputShape",value:function(t){var e=s(t.tensor.shape,4),n=e[0],r=e[1],o=e[2],i=e[3],a=s(this.poolSize,3),u=a[0],l=a[1],c=a[2],f="same"===this.borderMode?Math.floor((n+this.strides[0]-1)/this.strides[0]):Math.floor((n-u+this.strides[0])/this.strides[0]),p="same"===this.borderMode?Math.floor((r+this.strides[1]-1)/this.strides[1]):Math.floor((r-l+this.strides[1])/this.strides[1]),h="same"===this.borderMode?Math.floor((o+this.strides[2]-1)/this.strides[2]):Math.floor((o-c+this.strides[2])/this.strides[2]),d="same"===this.borderMode?Math.max(0,Math.floor((f-1)*this.strides[0]+u-n)):0,v="same"===this.borderMode?Math.max(0,Math.floor((p-1)*this.strides[1]+l-r)):0,m="same"===this.borderMode?Math.max(0,Math.floor((h-1)*this.strides[2]+c-o)):0,_=Math.floor(d/2),g=d-_,y=Math.floor(v/2),b=v-y,w=Math.floor(m/2),x=m-w;this.outputShape=[f,p,h,i],this.inputPadding=[_,g,y,b,w,x]}},{key:"_padInput",value:function(t){if("same"===this.borderMode){var e=s(t.tensor.shape,4),n=e[0],r=e[1],o=e[2],i=e[3],a=s(this.inputPadding,6),u=a[0],l=a[1],c=a[2],f=a[3],h=a[4],v=a[5],m=n+u+l,_=r+c+f,g=o+h+v,y=new p.default([],[m,_,g,i]);"max"===this.poolingFunc&&d.default.assigns(y.tensor,Number.NEGATIVE_INFINITY),d.default.assign(y.tensor.hi(n+u,r+c,o+h,i).lo(u,c,h,0),t.tensor),t.tensor=y.tensor}return t}},{key:"call",value:function(t){if("max"!==this.poolingFunc&&"average"!==this.poolingFunc)throw new Error("[pooling._Pooling3D] pooling function must be max or average.");"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,3,0)),this._calcOutputShape(t),this._padInput(t);for(var e=s(t.tensor.shape,4),n=e[0],r=e[1],o=e[2],i=e[3],a=s(this.poolSize,3),u=a[0],l=a[1],c=a[2],f=new p.default([],this.outputShape),h=new p.default([],[u,l,c,i]),v=s(this.inputPadding,6),m=v[0],_=v[1],g=v[2],y=v[3],b=v[4],w=v[5],x=0,E=0;x<=n-u;x+=this.strides[0],E++){var T=0;x<m?T=m-x:x+u>n-_&&(T=x+u-(n-_));for(var O=0,S=0;O<=r-l;O+=this.strides[1],S++){var P=0;O<g?P=g-O:O+l>r-y&&(P=O+l-(r-y));for(var M=0,j=0;M<=o-c;M+=this.strides[2],j++){var A=0;M<b?A=b-M:M+c>o-w&&(A=M+c-(o-w)),d.default.assign(h.tensor,t.tensor.hi(x+u,O+l,M+c,i).lo(x,O,M,0));for(var C=0;C<i;C++)if("max"===this.poolingFunc)f.tensor.set(E,S,j,C,d.default.sup(h.tensor.pick(null,null,null,C)));else if("average"===this.poolingFunc){var k=(u-T)*(l-P)*(c-A);f.tensor.set(E,S,j,C,d.default.sum(h.tensor.pick(null,null,null,C))/k)}}}}return t.tensor=f.tensor,"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(3,0,1,2)),t}}]),e}(c.default);e.default=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.GRU=e.LSTM=e.SimpleRNN=void 0;var o=n(257),i=r(o),a=n(256),s=r(a),u=n(255),l=r(u);e.SimpleRNN=i.default,e.LSTM=s.default,e.GRU=l.default},function(t,e,n){var r=n(22);t.exports=function(t,e){if("number"!=typeof t&&"Number"!=r(t))throw TypeError(e);return+t}},function(t,e,n){"use strict";var r=n(12),o=n(46),i=n(11);t.exports=[].copyWithin||function(t,e){var n=r(this),a=i(n.length),s=o(t,a),u=o(e,a),l=arguments.length>2?arguments[2]:void 0,c=Math.min((void 0===l?a:o(l,a))-u,a-s),f=1;for(u<s&&s<u+c&&(f=-1,u+=c-1,s+=c-1);c-- >0;)u in n?n[s]=n[u]:delete n[s],s+=f,u+=f;return n}},function(t,e,n){var r=n(51);t.exports=function(t,e){var n=[];return r(t,!1,n.push,n,e),n}},function(t,e,n){var r=n(14),o=n(12),i=n(59),a=n(11);t.exports=function(t,e,n,s,u){r(e);var l=o(t),c=i(l),f=a(l.length),p=u?f-1:0,h=u?-1:1;if(n<2)for(;;){if(p in c){s=c[p],p+=h;break}if(p+=h,u?p<0:f<=p)throw TypeError("Reduce of empty array with no initial value")}for(;u?p>=0:f>p;p+=h)p in c&&(s=e(s,c[p],p,l));return s}},function(t,e,n){"use strict";var r=n(14),o=n(7),i=n(73),a=[].slice,s={},u=function(t,e,n){if(!(e in s)){for(var r=[],o=0;o<e;o++)r[o]="a["+o+"]";s[e]=Function("F,a","return new F("+r.join(",")+")")}return s[e](t,n)};t.exports=Function.bind||function(t){var e=r(this),n=a.call(arguments,1),s=function(){var r=n.concat(a.call(arguments));return this instanceof s?u(e,r.length,r):i(e,r,t)};return o(e.prototype)&&(s.prototype=e.prototype),s}},function(t,e,n){"use strict";var r=n(10).f,o=n(41),i=n(44),a=n(32),s=n(39),u=n(23),l=n(51),c=n(103),f=n(149),p=n(45),h=n(9),d=n(35).fastKey,v=h?"_s":"size",m=function(t,e){var n,r=d(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,c){var f=t(function(t,r){s(t,f,e,"_i"),t._i=o(null),t._f=void 0,t._l=void 0,t[v]=0,void 0!=r&&l(r,n,t[c],t)});return i(f.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[v]=0},delete:function(t){var e=this,n=m(e,t);if(n){var r=n.n,o=n.p;delete e._i[n.i],n.r=!0,o&&(o.n=r),r&&(r.p=o),e._f==n&&(e._f=r),e._l==n&&(e._l=o),e[v]--}return!!n},forEach:function(t){s(this,f,"forEach");for(var e,n=a(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!m(this,t)}}),h&&r(f.prototype,"size",{get:function(){return u(this[v])}}),f},def:function(t,e,n){var r,o,i=m(t,e);return i?i.v=n:(t._l=i={i:o=d(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[v]++,"F"!==o&&(t._i[o]=i)),t},getEntry:m,setStrong:function(t,e,n){c(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?"keys"==e?f(0,n.k):"values"==e?f(0,n.v):f(0,[n.k,n.v]):(t._t=void 0,f(1))},n?"entries":"values",!n,!0),p(e)}}},function(t,e,n){var r=n(58),o=n(140);t.exports=function(t){return function(){if(r(this)!=t)throw TypeError(t+"#toJSON isn't generic");return o(this)}}},function(t,e,n){"use strict";var r=n(44),o=n(35).getWeak,i=n(4),a=n(7),s=n(39),u=n(51),l=n(26),c=n(13),f=l(5),p=l(6),h=0,d=function(t){return t._l||(t._l=new v)},v=function(){this.a=[]},m=function(t,e){return f(t.a,function(t){return t[0]===e})};v.prototype={get:function(t){var e=m(this,t);if(e)return e[1]},has:function(t){return!!m(this,t)},set:function(t,e){var n=m(this,t);n?n[1]=e:this.a.push([t,e])},delete:function(t){var e=p(this.a,function(e){return e[0]===t});return~e&&this.a.splice(e,1),!!~e}},t.exports={getConstructor:function(t,e,n,i){var l=t(function(t,r){s(t,l,e,"_i"),t._i=h++,t._l=void 0,void 0!=r&&u(r,n,t[i],t)});return r(l.prototype,{delete:function(t){if(!a(t))return!1;var e=o(t);return e===!0?d(this).delete(t):e&&c(e,this._i)&&delete e[this._i]},has:function(t){if(!a(t))return!1;var e=o(t);return e===!0?d(this).has(t):e&&c(e,this._i)}}),l},def:function(t,e,n){var r=o(i(e),!0);return r===!0?d(t).set(e,n):r[t._i]=n,t},ufstore:d}},function(t,e,n){t.exports=!n(9)&&!n(6)(function(){return 7!=Object.defineProperty(n(95)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(7),o=Math.floor;t.exports=function(t){return!r(t)&&isFinite(t)&&o(t)===t}},function(t,e,n){var r=n(4);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e){t.exports=Math.log1p||function(t){return(t=+t)>-1e-8&&t<1e-8?t-t*t/2:Math.log(1+t)}},function(t,e,n){"use strict";var r=n(43),o=n(77),i=n(60),a=n(12),s=n(59),u=Object.assign;t.exports=!u||n(6)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=u({},t)[n]||Object.keys(u({},e)).join("")!=r})?function(t,e){for(var n=a(t),u=arguments.length,l=1,c=o.f,f=i.f;u>l;)for(var p,h=s(arguments[l++]),d=c?r(h).concat(c(h)):r(h),v=d.length,m=0;v>m;)f.call(h,p=d[m++])&&(n[p]=h[p]);return n}:u},function(t,e,n){var r=n(10),o=n(4),i=n(43);t.exports=n(9)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(18),o=n(42).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(t){return a.slice()}};t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?s(t):o(r(t))}},function(t,e,n){var r=n(13),o=n(18),i=n(69)(!1),a=n(108)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),u=0,l=[];for(n in s)n!=a&&r(s,n)&&l.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){var r=n(43),o=n(18),i=n(60).f;t.exports=function(t){return function(e){for(var n,a=o(e),s=r(a),u=s.length,l=0,c=[];u>l;)i.call(a,n=s[l++])&&c.push(t?[n,a[n]]:a[n]);return c}}},function(t,e,n){var r=n(42),o=n(77),i=n(4),a=n(5).Reflect;t.exports=a&&a.ownKeys||function(t){var e=r.f(i(t)),n=o.f;return n?e.concat(n(t)):e}},function(t,e,n){var r=n(5).parseFloat,o=n(54).trim;t.exports=1/r(n(113)+"-0")!==-(1/0)?function(t){var e=o(String(t),3),n=r(e);return 0===n&&"-"==e.charAt(0)?-0:n}:r},function(t,e,n){var r=n(5).parseInt,o=n(54).trim,i=n(113),a=/^[\-+]?0[xX]/;t.exports=8!==r(i+"08")||22!==r(i+"0x16")?function(t,e){var n=o(String(t),3);return r(n,e>>>0||(a.test(n)?16:10))}:r},function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},function(t,e,n){var r=n(11),o=n(112),i=n(23);t.exports=function(t,e,n,a){var s=String(i(t)),u=s.length,l=void 0===n?" ":String(n),c=r(e);if(c<=u||""==l)return s;var f=c-u,p=o.call(l,Math.ceil(f/l.length));return p.length>f&&(p=p.slice(0,f)),a?p+s:s+p}},function(t,e,n){e.f=n(8)},function(t,e,n){"use strict";var r=n(143);t.exports=n(70)("Map",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var e=r.getEntry(this,t);return e&&e.v},set:function(t,e){return r.def(this,0===t?0:t,e)}},r,!0)},function(t,e,n){n(9)&&"g"!=/./g.flags&&n(10).f(RegExp.prototype,"flags",{configurable:!0,get:n(72)})},function(t,e,n){"use strict";var r=n(143);t.exports=n(70)("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(this,t=0===t?0:t,t)}},r)},function(t,e,n){"use strict";var r,o=n(26)(0),i=n(16),a=n(35),s=n(151),u=n(145),l=n(7),c=a.getWeak,f=Object.isExtensible,p=u.ufstore,h={},d=function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},v={get:function(t){if(l(t)){var e=c(t);return e===!0?p(this).get(t):e?e[this._i]:void 0}},set:function(t,e){return u.def(this,t,e)}},m=t.exports=n(70)("WeakMap",d,v,u,!0,!0);7!=(new m).set((Object.freeze||Object)(h),7).get(h)&&(r=u.getConstructor(d),s(r.prototype,v),a.NEED=!0,o(["delete","has","get","set"],function(t){var e=m.prototype,n=e[t];i(e,t,function(e,o){if(l(e)&&!f(e)){this._f||(this._f=new r);var i=this._f[t](e,o);return"set"==t?this:i}return n.call(this,e,o)})}))},function(t,e,n){"use strict";function r(){this.argTypes=[],this.shimArgs=[],this.arrayArgs=[],this.arrayBlockIndices=[],this.scalarArgs=[],this.offsetArgs=[],this.offsetArgIndex=[],this.indexArgs=[],this.shapeArgs=[],this.funcName="",this.pre=null,this.body=null,this.post=null,this.debug=!1}function o(t){var e=new r;e.pre=t.pre,e.body=t.body,e.post=t.post;var n=t.args.slice(0);e.argTypes=n;for(var o=0;o<n.length;++o){var a=n[o];if("array"===a||"object"==typeof a&&a.blockIndices){if(e.argTypes[o]="array",e.arrayArgs.push(o),e.arrayBlockIndices.push(a.blockIndices?a.blockIndices:0),e.shimArgs.push("array"+o),o<e.pre.args.length&&e.pre.args[o].count>0)throw new Error("cwise: pre() block may not reference array args");if(o<e.post.args.length&&e.post.args[o].count>0)throw new Error("cwise: post() block may not reference array args")}else if("scalar"===a)e.scalarArgs.push(o),e.shimArgs.push("scalar"+o);else if("index"===a){if(e.indexArgs.push(o),o<e.pre.args.length&&e.pre.args[o].count>0)throw new Error("cwise: pre() block may not reference array index");if(o<e.body.args.length&&e.body.args[o].lvalue)throw new Error("cwise: body() block may not write to array index");if(o<e.post.args.length&&e.post.args[o].count>0)throw new Error("cwise: post() block may not reference array index");
}else if("shape"===a){if(e.shapeArgs.push(o),o<e.pre.args.length&&e.pre.args[o].lvalue)throw new Error("cwise: pre() block may not write to array shape");if(o<e.body.args.length&&e.body.args[o].lvalue)throw new Error("cwise: body() block may not write to array shape");if(o<e.post.args.length&&e.post.args[o].lvalue)throw new Error("cwise: post() block may not write to array shape")}else{if("object"!=typeof a||!a.offset)throw new Error("cwise: Unknown argument type "+n[o]);e.argTypes[o]="offset",e.offsetArgs.push({array:a.array,offset:a.offset}),e.offsetArgIndex.push(o)}}if(e.arrayArgs.length<=0)throw new Error("cwise: No array arguments specified");if(e.pre.args.length>n.length)throw new Error("cwise: Too many arguments in pre() block");if(e.body.args.length>n.length)throw new Error("cwise: Too many arguments in body() block");if(e.post.args.length>n.length)throw new Error("cwise: Too many arguments in post() block");return e.debug=!!t.printCode||!!t.debug,e.funcName=t.funcName||"cwise",e.blockSize=t.blockSize||64,i(e)}var i=n(449);t.exports=o},function(t,e,n){"use strict";function r(t,e,n){var o=0|t[n];if(o<=0)return[];var i,a=new Array(o);if(n===t.length-1)for(i=0;i<o;++i)a[i]=e;else for(i=0;i<o;++i)a[i]=r(t,e,n+1);return a}function o(t,e){var n,r;for(n=new Array(t),r=0;r<t;++r)n[r]=e;return n}function i(t,e){switch("undefined"==typeof e&&(e=0),typeof t){case"number":if(t>0)return o(0|t,e);break;case"object":if("number"==typeof t.length)return r(t,e,0)}return[]}t.exports=i},function(t,e,n){function r(t){var e=this.__data__=new o(t);this.size=e.size}var o=n(80),i=n(552),a=n(553),s=n(554),u=n(555),l=n(556);r.prototype.clear=i,r.prototype.delete=a,r.prototype.get=s,r.prototype.has=u,r.prototype.set=l,t.exports=r},function(t,e){function n(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}t.exports=n},function(t,e,n){function r(t,e,n){"__proto__"==e&&o?o(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}var o=n(173);t.exports=r},function(t,e,n){function r(t,e,n,a,s){var u=-1,l=t.length;for(n||(n=i),s||(s=[]);++u<l;){var c=t[u];e>0&&n(c)?e>1?r(c,e-1,n,a,s):o(s,c):a||(s[s.length]=c)}return s}var o=n(169),i=n(526);t.exports=r},function(t,e,n){function r(t,e){return t&&o(t,e,i)}var o=n(474),i=n(49);t.exports=r},function(t,e,n){var r=n(48),o=function(){try{var t=r(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=o},function(t,e,n){function r(t,e,n,r,l,c){var f=n&s,p=t.length,h=e.length;if(p!=h&&!(f&&h>p))return!1;var d=c.get(t);if(d&&c.get(e))return d==e;var v=-1,m=!0,_=n&u?new o:void 0;for(c.set(t,e),c.set(e,t);++v<p;){var g=t[v],y=e[v];if(r)var b=f?r(y,g,v,e,t,c):r(g,y,v,t,e,c);if(void 0!==b){if(b)continue;m=!1;break}if(_){if(!i(e,function(t,e){if(!a(_,e)&&(g===t||l(g,t,n,r,c)))return _.push(e)})){m=!1;break}}else if(g!==y&&!l(g,y,n,r,c)){m=!1;break}}return c.delete(t),c.delete(e),m}var o=n(459),i=n(467),a=n(500),s=1,u=2;t.exports=r},function(t,e,n){(function(e){var n="object"==typeof e&&e&&e.Object===Object&&e;t.exports=n}).call(e,n(38))},function(t,e,n){var r=n(455),o=n(119),i=n(457),a=n(458),s=n(461),u=n(62),l=n(182),c="[object Map]",f="[object Object]",p="[object Promise]",h="[object Set]",d="[object WeakMap]",v="[object DataView]",m=l(r),_=l(o),g=l(i),y=l(a),b=l(s),w=u;(r&&w(new r(new ArrayBuffer(1)))!=v||o&&w(new o)!=c||i&&w(i.resolve())!=p||a&&w(new a)!=h||s&&w(new s)!=d)&&(w=function(t){var e=u(t),n=e==f?t.constructor:void 0,r=n?l(n):"";if(r)switch(r){case m:return v;case _:return c;case g:return p;case y:return h;case b:return d}return e}),t.exports=w},function(t,e){function n(t){return c.test(t)}var r="\\ud800-\\udfff",o="\\u0300-\\u036f",i="\\ufe20-\\ufe2f",a="\\u20d0-\\u20ff",s=o+i+a,u="\\ufe0e\\ufe0f",l="\\u200d",c=RegExp("["+l+r+s+u+"]");t.exports=n},function(t,e,n){function r(t,e,n){if(!s(n))return!1;var r=typeof e;return!!("number"==r?i(n)&&a(e,n.length):"string"==r&&e in n)&&o(n[e],t)}var o=n(87),i=n(88),a=n(85),s=n(55);t.exports=r},function(t,e,n){function r(t){return t===t&&!o(t)}var o=n(55);t.exports=r},function(t,e){function n(t){var e=-1,n=Array(t.size);return t.forEach(function(t,r){n[++e]=[r,t]}),n}t.exports=n},function(t,e){function n(t,e){return function(n){return null!=n&&(n[t]===e&&(void 0!==e||t in Object(n)))}}t.exports=n},function(t,e){function n(t){if(null!=t){try{return o.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var r=Function.prototype,o=r.toString;t.exports=n},function(t,e,n){function r(t){var e=null==t?0:t.length;return e?o(t,i):[]}var o=n(171),i=1/0;t.exports=r},function(t,e,n){function r(t,e){return null!=t&&i(t,e,o)}var o=n(476),i=n(519);t.exports=r},function(t,e,n){(function(t){var r=n(29),o=n(576),i="object"==typeof e&&e&&!e.nodeType&&e,a=i&&"object"==typeof t&&t&&!t.nodeType&&t,s=a&&a.exports===i,u=s?r.Buffer:void 0,l=u?u.isBuffer:void 0,c=l||o;t.exports=c}).call(e,n(92)(t))},function(t,e,n){function r(t){if(!i(t))return!1;var e=o(t);return e==s||e==u||e==a||e==l}var o=n(62),i=n(55),a="[object AsyncFunction]",s="[object Function]",u="[object GeneratorFunction]",l="[object Proxy]";t.exports=r},function(t,e,n){var r=n(481),o=n(498),i=n(542),a=i&&i.isTypedArray,s=a?o(a):r;t.exports=s},function(t,e,n){var r=n(508),o=r();t.exports=o},function(t,e,n){function r(t){if(!t)return 0===t?t:0;if(t=o(t),t===i||t===-i){var e=t<0?-1:1;return e*a}return t===t?t:0}var o=n(578),i=1/0,a=1.7976931348623157e308;t.exports=r},function(t,e,n){"use strict";function r(t){var e=t.dtype;"generic"!==e&&"array"!==e||(e="double");var n=f.malloc(t.size,e),r=l(n,t.shape);return c.assign(r,t),r}function o(t,e){e||(e="double");for(var n=1,r=new Array(t.length),o=t.length-1;o>=0;--o)r[o]=n,n*=t[o];return l(f.malloc(n,e),t,r,0)}function i(t){"generic"!==t.dtype&&"array"!==t.dtype&&f.free(t.data)}function a(t,e){e||(e="double");for(var n=1,r=new Array(t.length),o=t.length-1;o>=0;--o)r[o]=n,n*=t[o];for(var i=f.malloc(n,e),o=0;o<n;++o)i[o]=0;return l(i,t,r,0)}function s(t,e){e||(e="double");for(var n=1,r=new Array(t.length),o=t.length-1;o>=0;--o)r[o]=n,n*=t[o];for(var i=f.malloc(n,e),o=0;o<n;++o)i[o]=1;return l(i,t,r,0)}function u(t,e){var n,r;e||(e="double");var o=1,i=new Array(t.length);for(n=t.length-1;n>=0;--n)i[n]=o,o*=t[n];var a=f.malloc(o,e);for(n=0;n<o;++n)a[n]=0;var s=1/0,u=0;for(n=t.length-1;n>=0;n--)u+=i[n],s=Math.min(s,t[n]);for(n=0,r=0;n<s;n++,r+=u)a[r]=1;return l(a,t,i,0)}var l=n(91),c=n(3),f=n(622);e.clone=r,e.malloc=o,e.free=i,e.zeros=a,e.ones=s,e.eye=u},function(t,e,n){"use strict";function r(t,e){var n,r=[],i=[];if(void 0!==e&&!Array.isArray(e))throw new Error("axes must be an Array list of dimensions to squeeze");for(n=0;n<t.shape.length;n++)(1!==t.shape[n]||void 0!==e&&e.indexOf(n)===-1)&&(r.push(t.shape[n]),i.push(t.stride[n]));return o(t.data,r,i,t.offset)}var o=n(91);t.exports=r},function(t,e,n){"use strict";var r=n(167),o=n(25),i=o({args:["array","scalar","index"],body:function(t,e,n){var r,o=e;for(r=0;r<n.length-1;++r)o=o[n[r]];o[n[n.length-1]]=t}});t.exports=function(t){var e=r(t.shape);return i(t,e),e}},function(t,e,n){"use strict";function r(t,e){for(var n=1,r=t.length,o=t[0],i=t[0],a=1;a<r;++a)if(i=o,o=t[a],e(o,i)){if(a===n){n++;continue}t[n++]=o}return t.length=n,t}function o(t){for(var e=1,n=t.length,r=t[0],o=t[0],i=1;i<n;++i,o=r)if(o=r,r=t[i],r!==o){if(i===e){e++;continue}t[e++]=r}return t.length=e,t}function i(t,e,n){return 0===t.length?t:e?(n||t.sort(e),r(t,e)):(n||t.sort(),o(t))}t.exports=i},function(t,e,n){"use strict";function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.testUtils=e.layers=e.activations=e.Tensor=e.Model=void 0;var i=n(624),a=o(i),s=n(196),u=o(s),l=n(2),c=o(l),f=n(19),p=r(f),h=n(133),d=r(h),v=n(261),m=r(v);window.weblas=a.default,e.Model=u.default,e.Tensor=c.default,e.activations=p,e.layers=d,e.testUtils=m},function(t,e,n){"use strict";(function(t){function e(t,e,n){t[e]||Object[r](t,e,{writable:!0,configurable:!0,value:n})}if(n(447),n(619),n(267),t._babelPolyfill)throw new Error("only one instance of babel-polyfill is allowed");t._babelPolyfill=!0;var r="defineProperty";e(String.prototype,"padLeft","".padStart),e(String.prototype,"padRight","".padEnd),"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(t){[][t]&&e(Array,t,Function.call.bind([][t]))})}).call(e,n(38))},function(t,e,n){"use strict";function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function o(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=n(264),s=o(a),u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),c=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(579),p=o(f),h=n(571),d=o(h),v=n(561),m=o(v),_=n(566),g=o(_),y=n(49),b=o(y),w=n(581),x=o(w),E=n(129),T=o(E),O=n(127),S=o(O),P=n(565),M=o(P),j=n(133),A=r(j),C=n(2),k=o(C),R=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,t);var n=e.filepaths,r=void 0===n?{}:n,o=e.headers,a=void 0===o?{}:o,s=e.gpu,u=void 0!==s&&s,l=e.pipeline,c=void 0!==l&&l,f=e.layerCallPauses,p=void 0!==f&&f;if(!r.model||!r.weights||!r.metadata)throw new Error("File paths must be declared for model, weights, and metadata.");this.filepaths=r,this.filetypes={model:"json",weights:"arraybuffer",metadata:"json"},this.headers=a,this.gpu=u,this.pipeline=c,this.layerCallPauses=p,this.data={model:{},weights:null,metadata:[]},this.xhrs={model:null,weights:null,metadata:null},this.xhrProgress={model:0,weights:0,metadata:0},this.modelLayersMap=new Map,this.layersWithResults=[],this.modelDAG={},this.inputTensors={},this._ready=this._initialize(),this.isRunning=!1}return c(t,[{key:"ready",value:function(){return this._ready}},{key:"_interrupt",value:function(){var t=this,e=["model","weights","metdata"];e.forEach(function(e){t.xhrs[e]&&(t.xhrs[e].abort(),t.xhrs[e]=null)})}},{key:"_initialize",value:function(){var t=this,e=["model","weights","metadata"];return s.default.all(e.map(function(e){return t._dataRequest(e,t.headers)})).then(function(){return t._createLayers(),s.default.resolve()}).catch(function(e){console.log(e),t._interrupt()})}},{key:"_dataRequest",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return new s.default(function(r,o){var i=new XMLHttpRequest;i.open("GET",e.filepaths[t],!0),i.responseType=e.filetypes[t];var a=!0,s=!1,u=void 0;try{for(var c,f=(0,p.default)(n)[Symbol.iterator]();!(a=(c=f.next()).done);a=!0){var h=l(c.value,2),d=h[0],v=h[1];i.setRequestHeader(d,v)}}catch(t){s=!0,u=t}finally{try{!a&&f.return&&f.return()}finally{if(s)throw u}}i.onload=function(n){e.data[t]=i.response,e.xhrs[t]=null,e.xhrProgress[t]=100,r()},i.onprogress=function(n){if(n.lengthComputable){var r=Math.round(100*n.loaded/n.total);e.xhrProgress[t]=r}},i.onerror=function(t){return o(t)},i.send(null),e.xhrs[t]=i})}},{key:"getLoadingProgress",value:function(){var t=(0,x.default)(this.xhrProgress);return Math.round((0,T.default)(t)/t.length)}},{key:"toggleGpu",value:function(t){"undefined"==typeof t?this.gpu=!this.gpu:this.gpu=t;var e=!0,n=!1,r=void 0;try{for(var o,i=this.modelLayersMap.values()[Symbol.iterator]();!(e=(o=i.next()).done);e=!0){var a=o.value;a.toggleGpu(this.gpu)}}catch(t){n=!0,r=t}finally{try{!e&&i.return&&i.return()}finally{if(n)throw r}}}},{key:"_createLayers",value:function(){var t=this,e=this.data.model.class_name,n=[];"Sequential"===e?n=this.data.model.config:"Model"===e&&(n=this.data.model.config.layers),n.forEach(function(r,o){var i=r.class_name,a=r.config;if(!(i in A))throw new Error("Layer "+i+" specified in model configuration is not implemented!");if("Sequential"===e&&0===o){var s="input",u=a.batch_input_shape.slice(1),l=new A.InputLayer({name:s,shape:u});t.modelLayersMap.set(s,l),t.modelDAG[s]={layerClass:"InputLayer",name:s,inbound:[],outbound:[]},t.inputTensors[s]=new k.default([],u)}else if("Model"===e&&"InputLayer"===i){var c=a.batch_input_shape.slice(1);t.inputTensors[a.name]=new k.default([],c)}var f=void 0;if("Bidirectional"===i||"TimeDistributed"===i){var p=(0,d.default)(a,function(t,e){return(0,m.default)(e)}),h=a.layer.config,v=a.layer.class_name,_=(0,d.default)(h,function(t,e){return(0,m.default)(e)});"activation"in _&&(_.activation=(0,m.default)(_.activation)),"innerActivation"in _&&(_.innerActivation=(0,m.default)(_.innerActivation)),_.gpu=t.gpu,f=new A[i](Object.assign(p,{layer:new A[v](_)}))}else{var y=(0,d.default)(a,function(t,e){return(0,m.default)(e)});"activation"in y&&(y.activation=(0,m.default)(y.activation)),"innerActivation"in y&&(y.innerActivation=(0,m.default)(y.innerActivation)),y.gpu=t.gpu,y.pipeline=t.pipeline,f=new A[i](y)}var b=[];if("Bidirectional"===i?!function(){var t=a.layer.config.name,e=t.replace(/forward/,"backward"),n=f.forwardLayer.params.map(function(e){return t+"_"+e}),r=f.backwardLayer.params.map(function(t){return e+"_"+t});b=n.concat(r)}():b="TimeDistributed"===i?f.layer.params.map(function(t){return a.layer.config.name+"_"+t}):f.params.map(function(t){return a.name+"_"+t}),b&&b.length){var w=b.map(function(e){var n=(0,g.default)(t.data.metadata,function(t){var n=new RegExp("^"+e);return t.layer_name===a.name&&n.test(t.weight_name)});if(!n)throw new Error("[Model] error loading weights.");var r=n.offset,o=n.length,i=n.shape;return new k.default(new Float32Array(t.data.weights,r,o),i)});f.setWeights(w)}if(t.modelLayersMap.set(a.name,f),t.modelDAG[a.name]={layerClass:i,name:a.name,inbound:[],outbound:[]},"Sequential"===e)if(0===o){var x="input";t.modelDAG[x].outbound.push(a.name),t.modelDAG[a.name].inbound.push(x)}else{var E=n[o-1].config;t.modelDAG[a.name].inbound.push(E.name),t.modelDAG[E.name].outbound.push(a.name)}else"Model"===e&&r.inbound_nodes&&r.inbound_nodes.length&&r.inbound_nodes[0].forEach(function(e){var n=e[0];t.modelDAG[a.name].inbound.push(n),t.modelDAG[n].outbound.push(a.name)})})}},{key:"_mergeLayerCall",value:function(t,e,n){var r=e.map(function(t){return t.result}),o=r.every(function(t){return t._fromPipeline});return o&&t._pipelineEnabled?n&&(r=r.map(function(t){var e=new k.default([],t.tensor.shape);return e.copyFromWeblasTensor(t.weblasTensor),e._fromPipeline=!0,e._actualShape=t._actualShape.slice(),e})):r=r.map(function(t,r){return t._fromPipeline?e[r].transferFromPipeline(t):n?new k.default(t.tensor.data,t.tensor.shape):t}),t.call(r)}},{key:"_regularLayerCall",value:function(t,e,n){var r=e.result;if(r._fromPipeline&&t._pipelineEnabled){if(n){var o=new k.default([],r.tensor.shape);o.copyFromWeblasTensor(r.weblasTensor),o._fromPipeline=!0,o._actualShape=r._actualShape.slice(),r=o}}else r._fromPipeline?r=e.transferFromPipeline(r):n&&(r=new k.default(r.tensor.data,r.tensor.shape));return t.call(r)}},{key:"_traverseDAG",value:function(){function t(t){return e.apply(this,arguments)}var e=(0,a.coroutine)(regeneratorRuntime.mark(function t(e){var n,r,o,i,a,u,l,c,f,p=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(0!==e.length){t.next=4;break}return t.abrupt("return",!0);case 4:if(1!==e.length){t.next=30;break}if(n=e[0],r=this.modelDAG[n],o=r.layerClass,i=r.inbound,a=r.outbound,"InputLayer"===o){t.next=26;break}if(u=this.modelLayersMap.get(n),!u.visited){t.next=14;break}return t.abrupt("return",!1);case 14:if(l=i.map(function(t){return p.modelLayersMap.get(t)}),(0,M.default)(l.map(function(t){return t.hasResult}))){t.next=17;break}return t.abrupt("return",!1);case 17:if(c=i.map(function(t){return p.modelDAG[t].outbound}).reduce(function(t,e){return t+e.length},0),f=c>=1,u.result="Merge"===o?this._mergeLayerCall(u,l,f):this._regularLayerCall(u,l[0],f),u.hasResult=!0,u.visited=!0,this.layersWithResults.push(u.name),!this.layerCallPauses){t.next=26;break}return t.next=26,s.default.delay(0);case 26:return t.next=28,this._traverseDAG(a);case 28:t.next=32;break;case 30:return t.next=32,s.default.all(e.map(function(t){return p._traverseDAG([t])}));case 32:case"end":return t.stop()}},t,this)}));return t}()},{key:"predict",value:function(){function t(t){return e.apply(this,arguments)}var e=(0,a.coroutine)(regeneratorRuntime.mark(function t(e){var n,r,o,i,a,s,l,c,f,p,h,d,v,m=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.isRunning=!0,n=(0,b.default)(this.inputTensors).sort(),(0,S.default)((0,b.default)(e).sort(),n)){t.next=5;break}throw this.isRunning=!1,new Error("predict() must take an object where the keys are the named inputs of the model: "+n+".");case 5:if((0,M.default)(n,function(t){return e[t]instanceof Float32Array})){t.next=8;break}throw this.isRunning=!1,new Error("predict() must take an object where the values are the flattened data as Float32Array.");case 8:for(this.layersWithResults=[],r=!0,o=!1,i=void 0,t.prev=12,a=this.modelLayersMap.values()[Symbol.iterator]();!(r=(s=a.next()).done);r=!0)l=s.value,l.hasResult=!1,l.visited=!1;t.next=20;break;case 16:t.prev=16,t.t0=t.catch(12),o=!0,i=t.t0;case 20:t.prev=20,t.prev=21,!r&&a.return&&a.return();case 23:if(t.prev=23,!o){t.next=26;break}throw i;case 26:return t.finish(23);case 27:return t.finish(20);case 28:return n.forEach(function(t){var n=m.modelLayersMap.get(t);m.inputTensors[t].replaceTensorData(e[t]),n.result=n.call(m.inputTensors[t]),n.hasResult=!0,n.visited=!0}),t.next=31,this._traverseDAG(n);case 31:if(c=this.data.model.class_name,"Sequential"!==c){t.next=41;break}return f=(0,g.default)((0,x.default)(this.modelDAG),function(t){return!t.outbound.length}),p=this.modelLayersMap.get(f.name),h=p.result,d={output:h.tensor.data},this.isRunning=!1,t.abrupt("return",d);case 41:if("Model"!==c){t.next=45;break}if(v=function(){var t=(0,x.default)(m.modelDAG).filter(function(t){return!t.outbound.length}),e={};return t.forEach(function(t){var n=m.modelLayersMap.get(t.name),r=n.result;e[t.name]=r.tensor.data}),m.isRunning=!1,{v:e}}(),"object"!==("undefined"==typeof v?"undefined":u(v))){t.next=45;break}return t.abrupt("return",v.v);case 45:case"end":return t.stop()}},t,this,[[12,16,20,28],[21,,23,27]])}));return t}()}]),t}();e.default=R},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=document.createElement("canvas"),o=r.getContext("webgl")||r.getContext("experimental-webgl"),i=16384;o?e.MAX_TEXTURE_SIZE=i=o.getParameter(o.MAX_TEXTURE_SIZE):console.log("Unable to initialize WebGL. Your browser may not support it."),e.MAX_TEXTURE_SIZE=i},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(67),l=r(u),c=function(t){function e(){o(this,e);var t=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.inputTransformProgram=t.webgl.createProgram(n(612)),t.mainProgram=t.webgl.createProgram(n(611)),t}return a(e,t),s(e,[{key:"_bindInputTexturesInputTransform",value:function(t,n,r){var o=this.webgl.context;this.numTextures=3,this._bindInputTexture(this.inputTransformProgram,t.texture,o.TEXTURE0,e.INPUT_TEXTURE_NAME),this._bindInputTexture(this.inputTransformProgram,n.texture,o.TEXTURE1,e.IMAP_ROW_TEXTURE_NAME),this._bindInputTexture(this.inputTransformProgram,r.texture,o.TEXTURE2,e.IMAP_COL_TEXTURE_NAME)}},{key:"_bindInputTexturesMain",value:function(t,n,r){var o=this.webgl.context;this.numTextures=3,this._bindInputTexture(this.mainProgram,t.texture,o.TEXTURE0,e.INPUT_TEXTURE_NAME),this._bindInputTexture(this.mainProgram,n.texture,o.TEXTURE1,e.WEIGHTS_TEXTURE_NAME),this._bindInputTexture(this.mainProgram,r.texture,o.TEXTURE2,e.BIAS_TEXTURE_NAME)}},{key:"_bindUniformsInputTransform",value:function(t,n){var r=this.webgl.context,o=t.shape[0],i=t.shape[1],a=n.shape[1],s=this.webgl.getPad(i),u=this.webgl.getPad(a);r.uniform1i(r.getUniformLocation(this.inputTransformProgram,e.INPUT_ROWS_UNIFORM_NAME),o),r.uniform1i(r.getUniformLocation(this.inputTransformProgram,e.INPUT_COLS_UNIFORM_NAME),i),r.uniform1i(r.getUniformLocation(this.inputTransformProgram,e.OUTPUT_COLS_UNIFORM_NAME),a),r.uniform1i(r.getUniformLocation(this.inputTransformProgram,e.INPUT_COL_PAD_UNIFORM_NAME),s),r.uniform1i(r.getUniformLocation(this.inputTransformProgram,e.OUTPUT_COL_PAD_UNIFORM_NAME),u)}},{key:"_bindUniformsMain",value:function(t,n,r){var o=this.webgl.context,i=n.shape[0],a=t.shape[1],s=this.webgl.getPad(a),u=this.webgl.getPad(i);o.uniform1i(o.getUniformLocation(this.mainProgram,e.INPUT_COLS_UNIFORM_NAME),a),o.uniform1i(o.getUniformLocation(this.mainProgram,e.OUTPUT_COLS_UNIFORM_NAME),i),o.uniform1i(o.getUniformLocation(this.mainProgram,e.INPUT_COL_PAD_UNIFORM_NAME),s),o.uniform1i(o.getUniformLocation(this.mainProgram,e.OUTPUT_COL_PAD_UNIFORM_NAME),u),"relu"===r&&o.uniform1i(o.getUniformLocation(this.mainProgram,e.RELU_ACTIVATION_UNIFORM_NAME),1)}},{key:"_bindOutputTextureInputTransform",value:function(t,e){var n=t.shape[1],r=this.webgl.getPad(n);this.webgl.bindOutputTexture(t.shape[0],(n+r)/4,e.texture)}},{key:"_bindOutputTextureMain",value:function(t,e,n){var r=t.shape[0],o=e.shape[0],i=this.webgl.getPad(o);this.webgl.bindOutputTexture(r,(o+i)/4,n.texture)}},{key:"transformInput",value:function(t,e,n){if(e.shape[0]!==n.shape[0]||e.shape[1]!==n.shape[1])throw new Error("Invalid indexMappingRow or indexMappingCol weblas tensor shapes.");this.webgl.selectProgram(this.inputTransformProgram);var r=new weblas.pipeline.Tensor(e.shape,null);return this._bindInputTexturesInputTransform(t,e,n),this._bindUniformsInputTransform(t,e),this._bindOutputTextureInputTransform(e,r),this._compute(),this._unbindInputTextures(),r}},{key:"call",value:function(t,e,n,r,o,i){if(o&&i&&(t=this.transformInput(t,o,i)),t.shape[1]!==e.shape[1])throw new Error("Invalid input or weights weblas tensor shapes.");this.webgl.selectProgram(this.mainProgram);var a=t.shape[0],s=e.shape[0],u=new weblas.pipeline.Tensor([a,s],null);return this._bindInputTexturesMain(t,e,n),this._bindUniformsMain(t,e,r),this._bindOutputTextureMain(t,e,u),this._compute(),this._unbindInputTextures(),u}}]),e}(l.default);c.INPUT_TEXTURE_NAME="X",c.WEIGHTS_TEXTURE_NAME="W",c.BIAS_TEXTURE_NAME="b",c.INPUT_ROWS_UNIFORM_NAME="inputRows",c.INPUT_COLS_UNIFORM_NAME="inputCols",c.OUTPUT_COLS_UNIFORM_NAME="outputCols",c.INPUT_COL_PAD_UNIFORM_NAME="inputColPad",c.OUTPUT_COL_PAD_UNIFORM_NAME="outputColPad",c.RELU_ACTIVATION_UNIFORM_NAME="relu",c.IMAP_ROW_TEXTURE_NAME="indexMappingRow",c.IMAP_COL_TEXTURE_NAME="indexMappingCol",e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(67),l=r(u),c=n(188),f=r(c),p=n(129),h=r(p),d={sum:0,mul:1,concat:2,ave:3,max:4},v=function(t){function e(t){o(this,e);var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));if("concat"===t)r.program=r.webgl.createProgram(n(614));else{if(!(["sum","mul","ave","max"].indexOf(t)>-1))throw new Error(t+" mode currently not supported in WebGLMerge layer.");r.program=r.webgl.createProgram(n(613))}return r.mode=t,r.modeCode=d[t],r}return a(e,t),s(e,[{key:"_bindInputTexturesArray",value:function(t){if(t.length>this.MAX_NUM_TEXTURES)throw new Error("Max number of inputs to WebGLMerge exceeded.");var n=this.webgl.context;this.numTextures=t.length;for(var r=0;r<t.length;r++)n.activeTexture(n.TEXTURE0+r),n.bindTexture(n.TEXTURE_2D,t[r].texture);var o=n.getUniformLocation(this.program,e.INPUT_TEXTURES_ARRAY_NAME+"[0]");n.uniform1iv(o,(0,f.default)(this.numTextures))}},{key:"_bindUniforms",value:function(t){var n=this.webgl.context,r=t[0].shape[1],o=this.webgl.getPad(r);if(n.uniform1i(n.getUniformLocation(this.program,e.NUM_INPUTS_UNIFORM_NAME),t.length),n.uniform1i(n.getUniformLocation(this.program,e.OUTPUT_COLS_UNIFORM_NAME),r),n.uniform1i(n.getUniformLocation(this.program,e.OUTPUT_COL_PAD_UNIFORM_NAME),o),"concat"===this.mode){var i=t.map(function(t){return t.shape[0]}).reduce(function(t,e){return t.length>1&&(e+=t[t.length-1]),t.push(e),t},[0]).slice(0,-1),a=(0,h.default)(t.map(function(t){return t.shape[0]}));n.uniform1i(n.getUniformLocation(this.program,e.OUTPUT_ROWS_UNIFORM_NAME),a),n.uniform1iv(n.getUniformLocation(this.program,e.INPUT_CHANNEL_START_INDICES_UNIFORM_NAME),i)}else n.uniform1i(n.getUniformLocation(this.program,e.MODE_CODE_UNIFORM_NAME),this.modeCode)}},{key:"_bindOutputTexture",value:function(t,e){var n=t[0].shape[0];"concat"===this.mode&&(n=(0,h.default)(t.map(function(t){return t.shape[0]})));var r=t[0].shape[1],o=this.webgl.getPad(r);this.webgl.bindOutputTexture(n,(r+o)/4,e.texture)}},{key:"call",value:function(t){this.webgl.selectProgram(this.program);var e=void 0;if("concat"===this.mode){if(!t.every(function(e){return e.shape[0]===t[0].shape[0]}))throw new Error("Non-concat axis dimension of inputs to WebGLMerge must all be the same.");var n=t.map(function(t){return t.transpose()}),r=[(0,h.default)(n.map(function(t){return t.shape[0]})),n[0].shape[1]];e=new weblas.pipeline.Tensor(r,null),this.webgl.selectProgram(this.program),this._bindInputTexturesArray(n),this._bindUniforms(n),this._bindOutputTexture(n,e)}else e=new weblas.pipeline.Tensor(t[0].shape,null),this._bindInputTexturesArray(t),this._bindUniforms(t),this._bindOutputTexture(t,e);return this._compute(),this._unbindInputTextures(),"concat"===this.mode&&(e=e.transpose()),e}}]),e}(l.default);v.INPUT_TEXTURES_ARRAY_NAME="inputs",v.INPUT_CHANNEL_START_INDICES_UNIFORM_NAME="inputChannelStartIndices",v.NUM_INPUTS_UNIFORM_NAME="numInputs",v.MODE_CODE_UNIFORM_NAME="modeCode",v.OUTPUT_ROWS_UNIFORM_NAME="outputRows",v.OUTPUT_COLS_UNIFORM_NAME="outputCols",v.OUTPUT_COL_PAD_UNIFORM_NAME="outputColPad",e.default=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(67),l=r(u),c=function(t){function e(){o(this,e);var t=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.program=t.webgl.createProgram(n(615)),t}return a(e,t),s(e,[{key:"_bindInputTextures",value:function(t,n,r,o,i){var a=this.webgl.context;this.numTextures=5,this._bindInputTexture(this.program,t.texture,a.TEXTURE0,e.INPUT_TEXTURE_NAME),this._bindInputTexture(this.program,o.texture,a.TEXTURE1,e.MEAN_TEXTURE_NAME),this._bindInputTexture(this.program,i.texture,a.TEXTURE2,e.STD_TEXTURE_NAME),this._bindInputTexture(this.program,n.texture,a.TEXTURE3,e.GAMMA_TEXTURE_NAME),this._bindInputTexture(this.program,r.texture,a.TEXTURE4,e.BETA_TEXTURE_NAME)}},{key:"_bindUniforms",value:function(t,n){var r=this.webgl.context,o=this.webgl.getPad(t.shape[1]);r.uniform1f(r.getUniformLocation(this.program,e.EPSILON_UNIFORM_NAME),n),r.uniform1i(r.getUniformLocation(this.program,e.OUTPUT_COLS_UNIFORM_NAME),t.shape[1]),r.uniform1i(r.getUniformLocation(this.program,e.OUTPUT_COL_PAD_UNIFORM_NAME),o)}},{key:"_bindOutputTexture",value:function(t,e){var n=this.webgl.getPad(t.shape[1]);this.webgl.bindOutputTexture(t.shape[0],(t.shape[1]+n)/4,e.texture)}},{key:"call",value:function(t,e,n,r,o,i){this.webgl.selectProgram(this.program);var a=new weblas.pipeline.Tensor(t.shape,null);return this._bindInputTextures(t,n,r,o,i),this._bindUniforms(t,e),this._bindOutputTexture(t,a),this._compute(),this._unbindInputTextures(),a}}]),e}(l.default);c.INPUT_TEXTURE_NAME="X",c.MEAN_TEXTURE_NAME="mean",c.STD_TEXTURE_NAME="std",c.GAMMA_TEXTURE_NAME="gamma",c.BETA_TEXTURE_NAME="beta",c.EPSILON_UNIFORM_NAME="epsilon",c.OUTPUT_COLS_UNIFORM_NAME="outputCols",c.OUTPUT_COL_PAD_UNIFORM_NAME="outputColPad",e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(127),f=r(c),p=function(t){
function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="InputLayer";var r=t.shape,a=void 0===r?[]:r;return n.shape=t.batchInputShape&&t.batchInputShape.length?t.batchInputShape.slice(1):a,n}return a(e,t),s(e,[{key:"call",value:function(t){if(!(0,f.default)(t.tensor.shape,this.shape))throw new Error("[InputLayer] input tensor shape "+t.tensor.shape+" does not match specified shape "+this.shape+".");return t}}]),e}(l.default);e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(25),f=r(c),p=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));h.call(n),n.layerClass="ELU";var r=t.alpha,a=void 0===r?1:r;return n.alpha=a,n}return a(e,t),s(e,[{key:"call",value:function(t){return this._compute(t.tensor,this.alpha),t}}]),e}(l.default),h=function(){this._compute=(0,f.default)({args:["array","scalar"],body:function(t,e){t=Math.max(t,0)+e*(Math.exp(Math.min(t,0))-1)}})};e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(19),f=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="LeakyReLU";var r=t.alpha,a=void 0===r?.3:r;return n.alpha=a,n}return a(e,t),s(e,[{key:"call",value:function(t){return(0,c.relu)(t,{alpha:this.alpha}),t}}]),e}(l.default);e.default=f},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(25),f=r(c),p=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n._compute=(0,f.default)({args:["array","array"],body:function(t,e){t=Math.max(t,0)+e*Math.min(t,0)}}),n.layerClass="PReLU",n.params=["alphas"],n}return a(e,t),s(e,[{key:"call",value:function(t){return this._compute(t.tensor,this.weights.alphas.tensor),t}}]),e}(l.default);e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(25),f=r(c),p=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n._compute=(0,f.default)({args:["array","array","array"],body:function(t,e,n){t=e*Math.log(1+Math.exp(n*t))}}),n.layerClass="ParametricSoftplus",n.params=["alphas","betas"],n}return a(e,t),s(e,[{key:"call",value:function(t){return this._compute(t.tensor,this.weights.alphas.tensor,this.weights.betas.tensor),t}}]),e}(l.default);e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(25),f=r(c),p=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n._compute=(0,f.default)({args:["array","array","array","array","array"],body:function(t,e,n,r,o){t=e+Math.min(Math.max(t-e,0),Math.abs(r))+n*Math.min(t-e,0)+Math.max(t-(e+Math.abs(r)),0)*o}}),n.layerClass="SReLU",n.params=["t_left","a_left","t_right","a_right"],n}return a(e,t),s(e,[{key:"call",value:function(t){return this._compute(t.tensor,this.weights.t_left.tensor,this.weights.a_left.tensor,this.weights.t_right.tensor,this.weights.a_right.tensor),t}}]),e}(l.default);e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(25),f=r(c),p=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));h.call(n),n.layerClass="ThresholdedReLU";var r=t.theta,a=void 0===r?1:r;return n.theta=a,n}return a(e,t),s(e,[{key:"call",value:function(t){return this._compute(t.tensor,this.theta),t}}]),e}(l.default),h=function(){this._compute=(0,f.default)({args:["array","scalar"],body:function(t,e){t*=Number(t>e)}})};e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.SReLU=e.ThresholdedReLU=e.ParametricSoftplus=e.ELU=e.PReLU=e.LeakyReLU=void 0;var o=n(203),i=r(o),a=n(204),s=r(a),u=n(202),l=r(u),c=n(205),f=r(c),p=n(207),h=r(p),d=n(206),v=r(d);e.LeakyReLU=i.default,e.PReLU=s.default,e.ELU=l.default,e.ParametricSoftplus=f.default,e.ThresholdedReLU=h.default,e.SReLU=v.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(2),c=r(l),f=n(68),p=r(f),h=n(3),d=r(h),v=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="AtrousConvolution2D";var r=t.atrousRate,a=void 0===r?[1,1]:r;return n.atrousRate=a,n}return a(e,t),u(e,[{key:"_calcOutputShape",value:function(t){var e=t[0],n=t[1],r=s(this.kernelShape,3),o=r[0],i=r[1],a=r[2],u=i+(i-1)*(this.atrousRate[0]-1),l=a+(a-1)*(this.atrousRate[1]-1),c="same"===this.borderMode?Math.floor((e+this.subsample[0]-1)/this.subsample[0]):Math.floor((e-u+this.subsample[0])/this.subsample[0]),f="same"===this.borderMode?Math.floor((n+this.subsample[1]-1)/this.subsample[1]):Math.floor((n-l+this.subsample[1])/this.subsample[1]),p=o,h="same"===this.borderMode?Math.max(0,Math.floor((c-1)*this.subsample[0]+u-e)):0,d="same"===this.borderMode?Math.max(0,Math.floor((f-1)*this.subsample[1]+l-n)):0,v=Math.floor(h/2),m=h-v,_=Math.floor(d/2),g=d-_;this.outputShape=[c,f,p],this.inputPadding=[v,m,_,g]}},{key:"_im2col",value:function(t){var e=s(t.tensor.shape,3),n=e[0],r=e[1],o=e[2],i=this.kernelShape[1],a=this.kernelShape[2],u=this.outputShape[0],l=this.outputShape[1],f=u*l,p=i*a*o,h=i+(i-1)*(this.atrousRate[0]-1),v=a+(a-1)*(this.atrousRate[1]-1);this._imColsMat||(this._imColsMat=new c.default([],[f,p]));for(var m=new c.default([],[i,a,o]),_=0,g=0,y=n-h;g<=y;g+=this.subsample[0])for(var b=0,w=r-v;b<=w;b+=this.subsample[1])d.default.assign(m.tensor,t.tensor.hi(g+h,b+v,o).lo(g,b,0).step(this.atrousRate[0],this.atrousRate[1],1)),this._imColsMat.tensor.data.set(m.tensor.data,_),_+=p;return this._useWeblas&&this._imColsMat.createWeblasTensor(),this._imColsMat}}]),e}(p.default);e.default=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(68),f=r(c),p=n(191),h=r(p),d=n(130),v=r(d),m=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Convolution1D";var r=t.nbFilter,a=void 0===r?1:r,s=t.filterLength,u=void 0===s?1:s,l=t.activation,c=void 0===l?"linear":l,p=t.borderMode,h=void 0===p?"valid":p,d=t.subsampleLength,v=void 0===d?1:d,m=t.bias,_=void 0===m||m;if("valid"!==h&&"same"!==h)throw new Error(n.name+" [Convolution1D layer] Invalid borderMode.");n.bias=_,n.params=n.bias?["W","b"]:["W"];var g={nbFilter:a,nbRow:u,nbCol:1,activation:c,borderMode:h,subsample:[v,1],dimOrdering:"th",bias:_};return n._conv2dAttrs=g,n._conv2d=new f.default(Object.assign(g,{gpu:t.gpu})),n}return a(e,t),s(e,[{key:"setWeights",value:function(t){var e=this._conv2dAttrs,n=e.nbFilter,r=e.nbRow,o=e.nbCol,i=t[0].tensor.shape;if(i[0]!==r||i[1]!==o||i[3]!==n){if(console.warn("Using legacy shape of weights"),!(i[0]===n&(i[2]===r&i[3]===o)))throw new Error("Unsupported shape of weights")}else t[0].tensor=t[0].tensor.transpose(3,2,0,1);this._conv2d.setWeights(t)}},{key:"call",value:function(t){t.tensor=(0,v.default)(t.tensor).transpose(0,2,1);var e=this._conv2d.call(t);return t.tensor=(0,h.default)(e.tensor).transpose(1,0,2),t}}]),e}(l.default);e.default=m},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},f=n(19),p=o(f),h=n(2),d=r(h),v=n(1),m=r(v),_=n(3),g=r(_),y=n(66),b=r(y),w=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Convolution3D";var r=t.nbFilter,o=void 0===r?1:r,s=t.kernelDim1,u=void 0===s?1:s,l=t.kernelDim2,c=void 0===l?1:l,f=t.kernelDim3,h=void 0===f?1:f,d=t.activation,v=void 0===d?"linear":d,m=t.borderMode,_=void 0===m?"valid":m,g=t.subsample,y=void 0===g?[1,1,1]:g,b=t.dimOrdering,w=void 0===b?"tf":b,x=t.bias,E=void 0===x||x;if(n.kernelShape=[o,u,c,h],n.activation=v,n.activationFunc=p[v],"valid"!==_&&"same"!==_)throw new Error(n.name+" [Convolution3D layer] Invalid borderMode.");if(n.borderMode=_,n.subsample=y,"tf"!==w&&"th"!==w)throw new Error(n.name+" [Convolution3D layer] Only tf and th dim ordering are allowed.");return n.dimOrdering=w,n.bias=E,n.params=n.bias?["W","b"]:["W"],n.gpu&&weblas&&(n._useWeblas=!0,n._pipelineEnabled=!1),n}return s(e,t),l(e,[{key:"setWeights",value:function(t){"th"===this.dimOrdering&&(t[0].tensor=t[0].tensor.transpose(2,3,4,1,0)),c(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setWeights",this).call(this,t),this._wRowsMat=this._w2row(),this._useWeblas&&(this._wRowsMat.createWeblasTensor(),this._wRowsMat._gpuMaxSizeExceeded||(this._wRowsMat.weblasTensor=this._wRowsMat.weblasTensor.transpose()),this.bias?this.weights.b.createWeblasTensor():(this._zerosVec=new d.default([],[this.weights.W.tensor.shape[4]]),this._zerosVec.createWeblasTensor()))}},{key:"_calcOutputShape",value:function(t){var e=t.tensor.shape[0],n=t.tensor.shape[1],r=t.tensor.shape[2],o=u(this.kernelShape,4),i=o[0],a=o[1],s=o[2],l=o[3],c="same"===this.borderMode?Math.floor((e+this.subsample[0]-1)/this.subsample[0]):Math.floor((e-a+this.subsample[0])/this.subsample[0]),f="same"===this.borderMode?Math.floor((n+this.subsample[1]-1)/this.subsample[1]):Math.floor((n-s+this.subsample[1])/this.subsample[1]),p="same"===this.borderMode?Math.floor((r+this.subsample[2]-1)/this.subsample[2]):Math.floor((r-l+this.subsample[2])/this.subsample[2]),h=i,d="same"===this.borderMode?Math.max(0,Math.floor((c-1)*this.subsample[0]+a-e)):0,v="same"===this.borderMode?Math.max(0,Math.floor((f-1)*this.subsample[1]+s-n)):0,m="same"===this.borderMode?Math.max(0,Math.floor((p-1)*this.subsample[2]+l-r)):0,_=Math.floor(d/2),g=d-_,y=Math.floor(v/2),b=v-y,w=Math.floor(m/2),x=m-w;this.outputShape=[c,f,p,h],this.inputPadding=[_,g,y,b,w,x]}},{key:"_padInput",value:function(t){if("same"===this.borderMode){var e=u(t.tensor.shape,4),n=e[0],r=e[1],o=e[2],i=e[3],a=u(this.inputPadding,6),s=a[0],l=a[1],c=a[2],f=a[3],p=a[4],h=a[5],v=n+s+l,m=r+c+f,_=o+p+h,y=new d.default([],[v,m,_,i]);g.default.assign(y.tensor.hi(n+s,r+c,o+p,i).lo(s,c,p,0),t.tensor),t.tensor=y.tensor}return t}},{key:"_vol2col",value:function(t){var e=u(t.tensor.shape,4),n=e[0],r=e[1],o=e[2],i=e[3],a=this.kernelShape[1],s=this.kernelShape[2],l=this.kernelShape[3],c=this.outputShape[0],f=this.outputShape[1],p=this.outputShape[2],h=c*f*p,v=a*s*l*i;if(this._volColsMat||(this._volColsMat=new d.default([],[h,v])),1===a&&1===s&&1===l&&1===this.subsample[0]&&1===this.subsample[1]&&1===this.subsample[2])return this._volColsMat.replaceTensorData(t.tensor.data),this._useWeblas&&this._volColsMat.createWeblasTensor(),this._volColsMat;for(var m=new d.default([],[a,s,l,i]),_=0,y=0,b=n-a;y<=b;y+=this.subsample[0])for(var w=0,x=r-s;w<=x;w+=this.subsample[1])for(var E=0,T=o-l;E<=T;E+=this.subsample[2])g.default.assign(m.tensor,t.tensor.hi(y+a,w+s,E+l,i).lo(y,w,E,0)),this._volColsMat.tensor.data.set(m.tensor.data,_),_+=v;return this._useWeblas&&this._volColsMat.createWeblasTensor(),this._volColsMat}},{key:"_w2row",value:function(){for(var t=this.weights.W.tensor.shape[3],e=u(this.kernelShape,4),n=e[0],r=e[1],o=e[2],i=e[3],a=r*o*i*t,s=new d.default([],[a,n]),l=new d.default([],[r,o,i,t]),c=new d.default([],[a]),f=0;f<n;f++)g.default.assign(l.tensor,this.weights.W.tensor.pick(null,null,null,null,f)),c.replaceTensorData(l.tensor.data),g.default.assign(s.tensor.pick(null,f),c.tensor);return s}},{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,3,0)),this._calcOutputShape(t),this._padInput(t),this._vol2col(t);var e=this.kernelShape[0],n=this.outputShape[0],r=this.outputShape[1],o=this.outputShape[2],i=n*r*o,a=new d.default([],[i,e]);if(!this._useWeblas||this._volColsMat._gpuMaxSizeExceeded||this._wRowsMat._gpuMaxSizeExceeded){if(this.bias)for(var s=0;s<e;s++)g.default.assigns(a.tensor.pick(null,s),this.weights.b.tensor.get(s));(0,b.default)(a.tensor,this._volColsMat.tensor,this._wRowsMat.tensor,1,1)}else{var u=this.bias?this.weights.b.weblasTensor:this._zerosVec.weblasTensor;a.tensor.data=weblas.pipeline.sgemm(1,this._volColsMat.weblasTensor,this._wRowsMat.weblasTensor,1,u).transfer()}for(var l=new d.default([],this.outputShape),c=new d.default([],[n*r*o]),f=new d.default([],[n,r,o]),p=0;p<e;p++)g.default.assign(c.tensor,a.tensor.pick(null,p)),f.replaceTensorData(c.tensor.data),g.default.assign(l.tensor.pick(null,null,null,p),f.tensor);return t.tensor=l.tensor,this.activationFunc(t),"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(3,0,1,2)),t}}]),e}(m.default);e.default=w},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Cropping1D";var r=t.cropping,a=void 0===r?[0,0]:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.cropping=a,n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){var e=t.tensor.shape,n=[e[0]-this.cropping[0]-this.cropping[1],e[1]],r=new f.default([],n);return h.default.assign(r.tensor,t.tensor.hi(e[0]-this.cropping[1],e[2]).lo(this.cropping[0],0)),t.tensor=r.tensor,t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Cropping2D";var r=t.cropping,a=void 0===r?[[0,0],[0,0]]:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.cropping=a,n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,0));var e=t.tensor.shape,n=[e[0]-this.cropping[0][0]-this.cropping[0][1],e[1]-this.cropping[1][0]-this.cropping[1][1],e[2]],r=new f.default([],n);return h.default.assign(r.tensor,t.tensor.hi(e[0]-this.cropping[0][1],e[1]-this.cropping[1][1],e[2]).lo(this.cropping[0][0],this.cropping[1][0],0)),t.tensor=r.tensor,"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(2,0,1)),t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Cropping3D";var r=t.cropping,a=void 0===r?[[0,0],[0,0],[0,0]]:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.cropping=a,n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,3,0));var e=t.tensor.shape,n=[e[0]-this.cropping[0][0]-this.cropping[0][1],e[1]-this.cropping[1][0]-this.cropping[1][1],e[2]-this.cropping[2][0]-this.cropping[2][1],e[3]],r=new f.default([],n);return h.default.assign(r.tensor,t.tensor.hi(e[0]-this.cropping[0][1],e[1]-this.cropping[1][1],e[2]-this.cropping[2][1],e[3]).lo(this.cropping[0][0],this.cropping[1][0],this.cropping[2][0],0)),t.tensor=r.tensor,"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(3,0,1,2)),t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},f=n(19),p=o(f),h=n(2),d=r(h),v=n(1),m=r(v),_=n(3),g=r(_),y=n(66),b=r(y),w=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Deconvolution2D";var r=t.nbFilter,o=void 0===r?1:r,s=t.nbRow,u=void 0===s?1:s,l=t.nbCol,c=void 0===l?1:l,f=t.outputShape,h=void 0===f?[]:f,d=t.activation,v=void 0===d?"linear":d,m=t.borderMode,_=void 0===m?"valid":m,g=t.subsample,y=void 0===g?[1,1]:g,b=t.dimOrdering,w=void 0===b?"tf":b,x=t.bias,E=void 0===x||x;if(n.kernelShape=[o,u,c],null==h[0]?n.outputShape=h.slice(1):n.outputShape=h,n.activation=v,n.activationFunc=p[v],"valid"!==_&&"same"!==_)throw new Error(n.name+" [Deconvolution2D layer] Invalid borderMode.");if(n.borderMode=_,n.subsample=y,"tf"!==w&&"th"!==w)throw new Error(n.name+" [Deconvolution2D layer] Only tf and th dim ordering are allowed.");return n.dimOrdering=w,n.bias=E,n.params=n.bias?["W","b"]:["W"],n.gpu&&weblas&&(n._useWeblas=!0,n._pipelineEnabled=!1),n}return s(e,t),l(e,[{key:"setWeights",value:function(t){"th"===this.dimOrdering&&(t[0].tensor=t[0].tensor.transpose(2,3,1,0)),c(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setWeights",this).call(this,t),this._wRowsMat=this._w2row(),this._useWeblas&&(this._wRowsMat.createWeblasTensor(),this._wRowsMat._gpuMaxSizeExceeded||(this._wRowsMat.weblasTensor=this._wRowsMat.weblasTensor.transpose()))}},{key:"_calcOutputPadding",value:function(t){var e=t.tensor.shape[0],n=t.tensor.shape[1],r=this.kernelShape[1],o=this.kernelShape[2],i=this.outputShape[0],a=this.outputShape[1],s="same"===this.borderMode?Math.max(0,Math.floor((e-1)*this.subsample[0]+r-i)):0,u="same"===this.borderMode?Math.max(0,Math.floor((n-1)*this.subsample[1]+o-a)):0,l=Math.floor(s/2),c=s-l,f=Math.floor(u/2),p=u-f;this.outputPadding=[l,c,f,p]}},{key:"_im2col",value:function(t){for(var e=u(t.tensor.shape,3),n=e[0],r=e[1],o=e[2],i=new d.default([],[n*r,o]),a=new d.default([],[n*r]),s=new d.default([],[n,r]),l=0;l<o;l++)g.default.assign(s.tensor,t.tensor.pick(null,null,l)),a.replaceTensorData(s.tensor.data),g.default.assign(i.tensor.pick(null,l),a.tensor);return i}},{key:"_w2row",value:function(){for(var t=u(this.weights.W.tensor.shape,4),e=t[0],n=t[1],r=t[2],o=t[3],i=new d.default([],[r,e*n*o]),a=new d.default([],[e*n*o]),s=new d.default([],[e,n,o]),l=0;l<r;l++)g.default.assign(s.tensor,this.weights.W.tensor.pick(null,null,l,null)),a.replaceTensorData(s.tensor.data),g.default.assign(i.tensor.pick(l,null),a.tensor);return i}},{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,0));
var e=this._im2col(t);this._useWeblas&&e.createWeblasTensor();var n=t.tensor.shape[0],r=t.tensor.shape[1],o=u(this.kernelShape,3),i=o[0],a=o[1],s=o[2],l=new d.default([],[n*r,a*s*i]);if(!this._useWeblas||e._gpuMaxSizeExceeded||this._wRowsMat._gpuMaxSizeExceeded)(0,b.default)(l.tensor,e.tensor,this._wRowsMat.tensor,1,1);else{var c=new d.default([],[this.weights.W.tensor.shape[3]]);c.createWeblasTensor(),l.tensor.data=weblas.pipeline.sgemm(1,e.weblasTensor,this._wRowsMat.weblasTensor,0,c).transfer(),e.weblasTensor.delete(),delete e.weblasTensor}this._calcOutputPadding(t);var f=u(this.outputPadding,4),p=f[0],h=f[1],v=f[2],m=f[3],_=new d.default([],this.outputShape),y=new d.default([],[this.outputShape[0]+p+h,this.outputShape[1]+v+m,this.outputShape[2]]);if(this.bias)for(var w=0;w<i;w++)g.default.assigns(y.tensor.pick(null,null,w),this.weights.b.tensor.get(w));for(var x=[a,s,i],E=new d.default([],x),T=new d.default([],[a*s*i]),O=0,S=0;S<n;S++)for(var P=0;P<r;P++){g.default.assign(T.tensor,l.tensor.pick(O,null)),E.replaceTensorData(T.tensor.data);var M=S*this.subsample[0],j=P*this.subsample[1];g.default.addeq(y.tensor.hi(M+a,j+s,this.outputShape[2]).lo(M,j,0),E.tensor),O+=1}return g.default.assign(_.tensor,y.tensor.hi(this.outputShape[0]+p,this.outputShape[1]+v,this.outputShape[2]).lo(p,v,0)),t.tensor=_.tensor,this.activationFunc(t),"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(2,0,1)),t}}]),e}(m.default);e.default=w},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(19),f=o(c),p=n(2),h=r(p),d=n(1),v=r(d),m=n(68),_=r(m),g=n(3),y=r(g),b=n(66),w=r(b),x=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i(this,e),a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return s(e,t),l(e,[{key:"_im2col",value:function(t){var e=u(t.tensor.shape,3),n=e[0],r=e[1],o=e[2],i=this.kernelShape[1],a=this.kernelShape[2],s=this.outputShape[0],l=this.outputShape[1],c=s*l,f=i*a;this._imColsMat||(this._imColsMat=new h.default([],[c*o,f]));for(var p=new h.default([],[i,a,1]),d=0,v=0;v<o;v++)for(var m=0,_=n-i;m<=_;m+=this.subsample[0])for(var g=0,b=r-a;g<=b;g+=this.subsample[1])y.default.assign(p.tensor,t.tensor.hi(m+i,g+a,v+1).lo(m,g,v)),this._imColsMat.tensor.data.set(p.tensor.data,d),d+=f;return this._useWeblas&&this._imColsMat.createWeblasTensor(),this._imColsMat}},{key:"_w2row",value:function(){var t=this.weights.W.tensor.shape[2],e=u(this.kernelShape,3),n=e[0],r=e[1],o=e[2],i=r*o;this._wRowsMat=new h.default([],[i,n*t]);for(var a=new h.default([],[r,o]),s=new h.default([],[i]),l=0,c=0;c<t;c++)for(var f=0;f<n;f++)y.default.assign(a.tensor,this.weights.W.tensor.pick(null,null,c,f)),s.replaceTensorData(a.tensor.data),y.default.assign(this._wRowsMat.tensor.pick(null,l),s.tensor),l+=1;return this._wRowsMat}},{key:"call",value:function(t){this._calcOutputShape(t.tensor.shape),this._padInput(t),this._im2col(t);var e=this.kernelShape[0],n=this.outputShape[0],r=this.outputShape[1],o=n*r,i=new h.default([],[o*t.tensor.shape[2],e*t.tensor.shape[2]]);!this._useWeblas||this._imColsMat._gpuMaxSizeExceeded||this._wRowsMat._gpuMaxSizeExceeded?(0,w.default)(i.tensor,this._imColsMat.tensor,this._wRowsMat.tensor,1,1):i.tensor.data=weblas.pipeline.sgemm(1,this._imColsMat.weblasTensor,this._wRowsMat.weblasTensor,1,this._zerosVec.weblasTensor).transfer();for(var a=new h.default([],[n,r,t.tensor.shape[2]*e]),s=n*r*t.tensor.shape[2]*e,u=new Float32Array(s),l=0;l<t.tensor.shape[2];l++)for(var c=0,f=l*s+l*e,p=(l+1)*s;f<p;c++,f+=e*t.tensor.shape[2])for(var d=0;d<e;d++)u[f+d-l*s]=i.tensor.data[f+d];return a.replaceTensorData(u),t.tensor=a.tensor,t}}]),e}(_.default),E=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="SeparableConvolution2D";var r=t.nbFilter,o=void 0===r?1:r,s=t.nbRow,u=void 0===s?1:s,l=t.nbCol,c=void 0===l?1:l,p=t.activation,h=void 0===p?"linear":p,d=t.borderMode,v=void 0===d?"valid":d,m=t.subsample,_=void 0===m?[1,1]:m,g=t.depthMultiplier,y=void 0===g?1:g,b=t.dimOrdering,w=void 0===b?"tf":b,x=t.bias,E=void 0===x||x;if(n.activation=h,n.activationFunc=f[h],"valid"!==v&&"same"!==v)throw new Error(n.name+" [SeparableConvolution2D layer] Invalid borderMode.");if(n.borderMode=v,n.subsample=_,n.depthMultiplier=y,"tf"!==w&&"th"!==w)throw new Error(n.name+" [SeparableConvolution2D layer] Only tf and th dim ordering are allowed.");return n.dimOrdering=w,n.bias=E,n.params=n.bias?["depthwise_kernel","pointwise_kernel","b"]:["depthwise_kernel","pointwise_kernel"],n.depthwiseConvAttrs={nbFilter:n.depthMultiplier,nbRow:u,nbCol:c,activation:"linear",borderMode:v,subsample:_,dimOrdering:w,bias:!1,gpu:t.gpu},n.pointwiseConvAttrs={nbFilter:o,nbRow:1,nbCol:1,activation:"linear",borderMode:v,subsample:[1,1],dimOrdering:w,bias:n.bias,gpu:t.gpu},n}return s(e,t),l(e,[{key:"setWeights",value:function(t){this._depthwiseConv=new x(this.depthwiseConvAttrs),this._depthwiseConv.setWeights(t.slice(0,1)),this._pointwiseConv=new _.default(this.pointwiseConvAttrs),this._pointwiseConv.setWeights(t.slice(1,3))}},{key:"call",value:function(t){var e=this._depthwiseConv.call(t),n=this._pointwiseConv.call(e);return t.tensor=n.tensor,this.activationFunc(t),t}}]),e}(v.default);e.default=E},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="UpSampling1D";var r=t.length,a=void 0===r?2:r;return n.length=a,n}return a(e,t),s(e,[{key:"call",value:function(t){for(var e=t.tensor.shape,n=[e[0]*this.length,e[1]],r=new f.default([],n),o=0;o<this.length;o++)h.default.assign(r.tensor.lo(o,0).step(this.length,1),t.tensor);return t.tensor=r.tensor,t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="UpSampling2D";var r=t.size,a=void 0===r?[2,2]:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.size=a,n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,0));for(var e=t.tensor.shape,n=[e[0]*this.size[0],e[1]*this.size[1],e[2]],r=new f.default([],n),o=0;o<this.size[0];o++)for(var i=0;i<this.size[1];i++)h.default.assign(r.tensor.lo(o,i,0).step(this.size[0],this.size[1],1),t.tensor);return t.tensor=r.tensor,"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(2,0,1)),t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="UpSampling3D";var r=t.size,a=void 0===r?[2,2,2]:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.size=a,n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,3,0));for(var e=t.tensor.shape,n=[e[0]*this.size[0],e[1]*this.size[1],e[2]*this.size[2],e[3]],r=new f.default([],n),o=0;o<this.size[0];o++)for(var i=0;i<this.size[1];i++)for(var a=0;a<this.size[2];a++)h.default.assign(r.tensor.lo(o,i,a,0).step(this.size[0],this.size[1],this.size[2],1),t.tensor);return t.tensor=r.tensor,"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(3,0,1,2)),t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="ZeroPadding1D";var r=t.padding,a=void 0===r?1:r;return n.padding=a,n}return a(e,t),s(e,[{key:"call",value:function(t){var e=t.tensor.shape,n=[e[0]+2*this.padding,e[1]],r=new f.default([],n);return h.default.assign(r.tensor.hi(e[0]+this.padding,e[1]).lo(this.padding,0),t.tensor),t.tensor=r.tensor,t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="ZeroPadding2D";var r=t.padding,a=void 0===r?[1,1]:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.padding=a,n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,0));var e=t.tensor.shape,n=[e[0]+2*this.padding[0],e[1]+2*this.padding[1],e[2]],r=new f.default([],n);return h.default.assign(r.tensor.hi(e[0]+this.padding[0],e[1]+this.padding[1],e[2]).lo(this.padding[0],this.padding[1],0),t.tensor),t.tensor=r.tensor,"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(2,0,1)),t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="ZeroPadding3D";var r=t.padding,a=void 0===r?[1,1,1]:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.padding=a,n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,3,0));var e=t.tensor.shape,n=[e[0]+2*this.padding[0],e[1]+2*this.padding[1],e[2]+2*this.padding[2],e[3]],r=new f.default([],n);return h.default.assign(r.tensor.hi(e[0]+this.padding[0],e[1]+this.padding[1],e[2]+this.padding[2],e[3]).lo(this.padding[0],this.padding[1],this.padding[2],0),t.tensor),t.tensor=r.tensor,"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(3,0,1,2)),t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Cropping3D=e.Cropping2D=e.Cropping1D=e.ZeroPadding3D=e.ZeroPadding2D=e.ZeroPadding1D=e.UpSampling3D=e.UpSampling2D=e.UpSampling1D=e.Convolution3D=e.Deconvolution2D=e.SeparableConvolution2D=e.AtrousConvolution2D=e.Convolution2D=e.Convolution1D=void 0;var o=n(210),i=r(o),a=n(68),s=r(a),u=n(209),l=r(u),c=n(216),f=r(c),p=n(215),h=r(p),d=n(211),v=r(d),m=n(217),_=r(m),g=n(218),y=r(g),b=n(219),w=r(b),x=n(220),E=r(x),T=n(221),O=r(T),S=n(222),P=r(S),M=n(212),j=r(M),A=n(213),C=r(A),k=n(214),R=r(k);e.Convolution1D=i.default,e.Convolution2D=s.default,e.AtrousConvolution2D=l.default,e.SeparableConvolution2D=f.default,e.Deconvolution2D=h.default,e.Convolution3D=v.default,e.UpSampling1D=_.default,e.UpSampling2D=y.default,e.UpSampling3D=w.default,e.ZeroPadding1D=E.default,e.ZeroPadding2D=O.default,e.ZeroPadding3D=P.default,e.Cropping1D=j.default,e.Cropping2D=C.default,e.Cropping3D=R.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(19),c=o(l),f=n(1),p=r(f),h=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Activation";var r=t.activation,o=void 0===r?"linear":r;return n.activation=o,n.activationFunc=c[o],n}return s(e,t),u(e,[{key:"call",value:function(t){return this.activationFunc(t),t}}]),e}(p.default);e.default=h},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},c=n(19),f=o(c),p=n(2),h=r(p),d=n(1),v=r(d),m=n(56),_=n(3),g=r(_),y=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Dense";var r=t.outputDim,o=void 0===r?1:r,s=t.activation,u=void 0===s?"linear":s,l=t.inputDim,c=void 0===l?null:l,p=t.bias,h=void 0===p||p;return n.activation=u,n.activationFunc=f[u],n.outputDim=o,n.inputDim=c,n.bias=h,n.params=n.bias?["W","b"]:["W"],n.inputDim&&(n.inputShape=[n.inputDim]),n.gpu&&weblas&&(n._useWeblas=!0,n._pipelineEnabled=!1),n}return s(e,t),u(e,[{key:"setWeights",value:function(t){l(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setWeights",this).call(this,t),this._useWeblas&&(this.weights.W.createWeblasTensor(),this.weights.W._gpuMaxSizeExceeded||(this.weights.W.weblasTensor=this.weights.W.weblasTensor.transpose()),this.bias?this.weights.b.createWeblasTensor():(this._zerosVec=new h.default([],[this.weights.W.tensor.shape[1]]),this._zerosVec.createWeblasTensor()))}},{key:"call",value:function(t){var e=new h.default([],[this.outputDim]);if(this._useWeblas&&t.createWeblasTensor(),!this._useWeblas||t._gpuMaxSizeExceeded||this.weights.W._gpuMaxSizeExceeded)this.bias&&g.default.assign(e.tensor,this.weights.b.tensor),(0,m.gemv)(1,this.weights.W.tensor.transpose(1,0),t.tensor,1,e.tensor);else{var n=this.bias?this.weights.b.weblasTensor:this._zerosVec.weblasTensor;e.tensor.data=weblas.pipeline.sgemm(1,t.weblasTensor,this.weights.W.weblasTensor,1,n).transfer()}return t.tensor=e.tensor,this.activationFunc(t),t}}]),e}(v.default);e.default=y},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Dropout";var r=t.p,a=void 0===r?.5:r;return n.p=Math.min(Math.max(0,a),1),n}return a(e,t),s(e,[{key:"call",value:function(t){return t}}]),e}(l.default);e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(2),l=r(u),c=n(1),f=r(c),p=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.layerClass="Flatten",n}return a(e,t),s(e,[{key:"call",value:function(t){if(t.tensor.shape.length>1){var e=new l.default([],[t.tensor.shape.reduce(function(t,e){return t*e},1)]);e.replaceTensorData(t.tensor.data),t.tensor=e.tensor}return t}}]),e}(f.default);e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(19),c=o(l),f=n(2),p=r(f),h=n(1),d=r(h),v=n(56),m=n(3),_=r(m),g=n(25),y=r(g),b=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n._computeOutput=(0,y.default)({args:["array","array","array"],body:function(t,e,n){t=e*n+(1-n)*t}}),n.layerClass="Highway";var r=t.transformBias,o=void 0===r?-2:r,s=t.activation,u=void 0===s?"linear":s,l=t.bias,f=void 0===l||l;return n.transformBias=o,n.activation=u,n.activationFunc=c[u],n.bias=f,n.params=n.bias?["W","b","W_carry","b_carry"]:["W","W_carry"],n}return s(e,t),u(e,[{key:"call",value:function(t){var e=new p.default([],[this.weights.W.tensor.shape[1]]);this.bias&&_.default.assign(e.tensor,this.weights.b.tensor),(0,v.gemv)(1,this.weights.W.tensor.transpose(1,0),t.tensor,1,e.tensor),this.activationFunc(e);var n=new p.default([],[this.weights.W_carry.tensor.shape[1]]);return this.bias&&_.default.assign(n.tensor,this.weights.b_carry.tensor),(0,v.gemv)(1,this.weights.W_carry.tensor.transpose(1,0),t.tensor,1,n.tensor),c.sigmoid(n),this._computeOutput(t.tensor,e.tensor,n.tensor),t}}]),e}(d.default);e.default=b},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(2),l=r(u),c=n(1),f=r(c),p=n(56),h=n(3),d=r(h),v=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="MaxoutDense";var r=t.outputDim,a=void 0===r?1:r,s=t.inputDim,u=void 0===s?null:s,l=t.bias,c=void 0===l||l;return n.outputDim=a,n.inputDim=u,n.bias=c,n.params=n.bias?["W","b"]:["W"],n}return a(e,t),s(e,[{key:"call",value:function(t){for(var e=this.weights.W.tensor.shape[0],n=new l.default([],[this.outputDim]),r=0;r<e;r++){var o=new l.default([],[this.outputDim]);this.bias&&d.default.assign(o.tensor,this.weights.b.tensor.pick(r,null)),(0,p.gemv)(1,this.weights.W.tensor.pick(r,null,null).transpose(1,0),t.tensor,1,o.tensor),d.default.maxeq(n.tensor,o.tensor)}return t.tensor=n.tensor,t}}]),e}(f.default);e.default=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(2),c=r(l),f=n(1),p=r(f),h=n(66),d=r(h),v=n(3),m=r(v),_=n(130),g=r(_),y=n(608),b=r(y),w=n(127),x=r(w),E=n(188),T=r(E),O=n(129),S=r(O),P=n(57),M=r(P),j=n(199),A=r(j),C=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Merge";var r=t.mode,o=void 0===r?"sum":r,s=t.concatAxis,u=void 0===s?-1:s,l=t.dotAxes,c=void 0===l?-1:l,f=t.outputShape,p=void 0===f?null:f,h=t.outputMask,d=void 0===h?null:h,v=["sum","mul","concat","ave","cos","dot","max"];if(!(v.indexOf(o)>-1))throw new Error(n.name+" [Merge layer] "+o+" not available.");if(n.mode=o,n.concatAxis=u<=0?u:u-1,Array.isArray(c)?n.dotAxes=[c[0]<=0?c[0]:c[0]-1,c[1]<=0?c[1]:c[1]-1]:n.dotAxes=[c<=0?c:c-1,c<=0?c:c-1],n.outputShape=p,n.outputMask=d,n.gpu&&weblas&&(n._useWeblas=!0,n.pipeline)){var m=(0,M.default)(n.layerClass,t);m?(n._pipelineEnabled=!0,n.webglMerge=new A.default(n.mode)):n._pipelineEnabled=!1}return n}return s(e,t),u(e,[{key:"_validateInputs",value:function(t){var e=this,n=t.map(function(t){return t.tensor.shape.slice()});if(["sum","mul","ave","cos","max"].indexOf(this.mode)>-1&&!n.every(function(t){return(0,x.default)(t,n[0])}))throw new Error(this.name+" [Merge layer] All input shapes must be the same for mode "+this.mode+".");if(["cos","dot"].indexOf(this.mode)>-1){if(2!==t.length)throw new Error(this.name+" [Merge layer] Exactly 2 inputs required for mode "+this.mode+".");if(this.dotAxes[0]<0&&(this.dotAxes[0]=n[0].length+this.dotAxes[0]),this.dotAxes[1]<0&&(this.dotAxes[1]=n[1].length+this.dotAxes[1]),n[0][this.dotAxes[0]]!==n[1][this.dotAxes[1]])throw new Error(this.name+" [Merge layer] Dimensions incompatibility using dot mode.");
}else"concat"===this.mode&&!function(){var t=n.slice(),r=e.concatAxis<0?t[0].length+e.concatAxis:e.concatAxis;if(0===e.concatAxis&&(r=0),(0,T.default)(t.length).forEach(function(e){t[e].splice(r,1)}),!t.every(function(e){return(0,x.default)(e,t[0])}))throw new Error(e.name+" [Merge layer] In concat mode, all shapes must be the same except along the concat axis.")}();return!0}},{key:"_callPipelineMode",value:function(t){if(!t.every(function(t){return t._fromPipeline}))return this._callRegularMode(t);var e=new c.default([],t[0].weblasTensor.shape);return e.weblasTensor=this.webglMerge.call(t.map(function(t){return t.weblasTensor})),e._fromPipeline=!0,e._actualShape=t[0]._actualShape,"concat"===this.mode&&(e._actualShape=[].concat(o(t[0]._actualShape.slice(0,-1)),[(0,S.default)(t.map(function(t){return t._actualShape.slice(-1)[0]}))])),e}},{key:"_callRegularMode",value:function(t){var e=this,n=this._validateInputs(t);if(!n)throw new Error(this.name+" [Merge layer] Invalid inputs to call method.");var r=void 0,o=void 0;if(["sum","mul","ave","max"].indexOf(this.mode)>-1)o=t[0].tensor.shape.slice(),r=new c.default([],o);else if("concat"===this.mode)!function(){o=t[0].tensor.shape.slice();var n=e.concatAxis<0?o.length+e.concatAxis:e.concatAxis;0===e.concatAxis&&(n=0),t.slice(1,t.length).forEach(function(t){var e=t.tensor.shape.slice()[n];o[n]+=e}),r=new c.default([],o)}();else if(["cos","dot"].indexOf(this.mode)>-1){var i=t[0].tensor.shape.slice(),a=t[1].tensor.shape.slice();i.splice(this.dotAxes[0],1),a.splice(this.dotAxes[1],1),o=i.concat(a),1===o.length&&o.push(1),r=new c.default([],o)}if("sum"===this.mode)for(var s=0;s<t.length;s++)m.default.addeq(r.tensor,t[s].tensor);else if("mul"===this.mode){m.default.assigns(r.tensor,1);for(var u=0;u<t.length;u++)m.default.muleq(r.tensor,t[u].tensor)}else if("ave"===this.mode){for(var l=0;l<t.length;l++)m.default.addeq(r.tensor,t[l].tensor);m.default.divseq(r.tensor,t.length)}else if("max"===this.mode){m.default.assign(r.tensor,t[0].tensor);for(var f=1;f<t.length;f++)m.default.maxeq(r.tensor,t[f].tensor)}else if("concat"===this.mode){var p=this.concatAxis<0?t[0].tensor.shape.length+this.concatAxis:this.concatAxis;0===this.concatAxis&&(p=0),0===p?(0,b.default)(r.tensor,t.map(function(t){return t.tensor})):!function(){for(var e,n=[p],o=0;o<t[0].tensor.shape.length;o++)o!==p&&n.push(o);(0,b.default)((e=r.tensor).transpose.apply(e,n),t.map(function(t){var e;return(e=t.tensor).transpose.apply(e,n)}))}()}else if("dot"===this.mode){if(2!==t[0].tensor.shape.length||2!==t[1].tensor.shape.length)throw new Error(this.name+" [Merge layer] dot mode for 3+ dim tensors not yet implemented.");0===this.dotAxes[0]&&0===this.dotAxes[1]?(0,d.default)(r.tensor,t[0].tensor.transpose(1,0),t[1].tensor):1===this.dotAxes[0]&&1===this.dotAxes[1]&&(0,d.default)(r.tensor,t[0].tensor,t[1].tensor.transpose(1,0))}else if("cos"===this.mode){if(2!==t[0].tensor.shape.length||2!==t[1].tensor.shape.length)throw new Error(this.name+" [Merge layer] cos mode for 3+ dim tensors not yet implemented.");var h=new c.default([],r.tensor.shape),v=new c.default([],r.tensor.shape);0===this.dotAxes[0]&&0===this.dotAxes[1]?((0,d.default)(h.tensor,t[0].tensor.transpose(1,0),t[0].tensor),(0,d.default)(v.tensor,t[1].tensor.transpose(1,0),t[1].tensor),(0,d.default)(r.tensor,t[0].tensor.transpose(1,0),t[1].tensor)):1===this.dotAxes[0]&&1===this.dotAxes[1]&&((0,d.default)(h.tensor,t[0].tensor,t[0].tensor.transpose(1,0)),(0,d.default)(v.tensor,t[1].tensor,t[1].tensor.transpose(1,0)),(0,d.default)(r.tensor,t[0].tensor,t[1].tensor.transpose(1,0))),m.default.muleq(h.tensor,v.tensor),m.default.sqrteq(h.tensor),m.default.diveq(r.tensor,h.tensor),r.tensor=(0,g.default)(r.tensor,0)}return r}},{key:"call",value:function(t){return this._pipelineEnabled?this._callPipelineMode(t):this._callRegularMode(t)}}]),e}(p.default);e.default=C},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),c=r(l),f=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Permute";var r=t.dims,o=void 0===r?[]:r;return n.dims=o.map(function(t){return t-1}),n}return s(e,t),u(e,[{key:"call",value:function(t){var e;if(this.dims.length!==t.tensor.shape.length)throw new Error(this.name+" [Permute layer] The specified dims permutation must match the number of dimensions.");return t.tensor=(e=t.tensor).transpose.apply(e,o(this.dims)),t}}]),e}(c.default);e.default=f},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(130),f=r(c),p=n(610),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="RepeatVector";var r=t.n,a=void 0===r?1:r;return n.n=a,n}return a(e,t),s(e,[{key:"call",value:function(t){if(1!==t.tensor.shape.length)throw new Error(this.name+" [RepeatVector layer] Only 1D tensor inputs allowed.");return t.tensor=(0,h.default)((0,f.default)(t.tensor,0),[this.n,1]),t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(2),l=r(u),c=n(1),f=r(c),p=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Reshape";var r=t.targetShape,a=void 0===r?[]:r;return n.targetShape=a,n}return a(e,t),s(e,[{key:"call",value:function(t){if(this.targetShape.reduce(function(t,e){return t*e},1)!==t.tensor.size)throw new Error(this.name+" [Reshape layer] The total size of new array must be unchanged in reshape layer.");var e=new l.default([],this.targetShape);return e.replaceTensorData(t.tensor.data),t.tensor=e.tensor,t}}]),e}(f.default);e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="SpatialDropout2D";var r=t.p,a=void 0===r?.5:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.p=Math.min(Math.max(0,a),1),n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){return t}}]),e}(l.default);e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="SpatialDropout3D";var r=t.p,a=void 0===r?.5:r,s=t.dimOrdering,u=void 0===s?"tf":s;return n.p=Math.min(Math.max(0,a),1),n.dimOrdering=u,n}return a(e,t),s(e,[{key:"call",value:function(t){return t}}]),e}(l.default);e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.MaxoutDense=e.Highway=e.Merge=e.RepeatVector=e.Permute=e.Reshape=e.Flatten=e.SpatialDropout3D=e.SpatialDropout2D=e.Dropout=e.Activation=e.Dense=void 0;var o=n(225),i=r(o),a=n(224),s=r(a),u=n(226),l=r(u),c=n(234),f=r(c),p=n(235),h=r(p),d=n(227),v=r(d),m=n(233),_=r(m),g=n(231),y=r(g),b=n(232),w=r(b),x=n(230),E=r(x),T=n(228),O=r(T),S=n(229),P=r(S);e.Dense=i.default,e.Activation=s.default,e.Dropout=l.default,e.SpatialDropout2D=f.default,e.SpatialDropout3D=h.default,e.Flatten=v.default,e.Reshape=_.default,e.Permute=y.default,e.RepeatVector=w.default,e.Merge=E.default,e.Highway=O.default,e.MaxoutDense=P.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Embedding";var r=t.inputDim,a=void 0===r?1:r,s=t.outputDim,u=void 0===s?1:s,l=t.inputLength,c=void 0===l?0:l,f=t.maskZero,p=void 0!==f&&f,h=t.dropout,d=void 0===h?0:h;return n.inputDim=a,n.outputDim=u,n.inputLength=c,n.maskZero=p,n.dropout=d,n.params=["W"],n}return a(e,t),s(e,[{key:"call",value:function(t){for(var e=new f.default([],[t.tensor.shape[0],this.weights.W.tensor.shape[1]]),n=0,r=t.tensor.shape[0];n<r;n++)h.default.assign(e.tensor.pick(n,null),this.weights.W.tensor.pick(t.tensor.get(n),null));return t.tensor=e.tensor,t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Embedding=void 0;var o=n(237),i=r(o);e.Embedding=i.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="GaussianDropout";var r=t.p,a=void 0===r?.5:r;return n.p=Math.min(Math.max(0,a),1),n}return a(e,t),s(e,[{key:"call",value:function(t){return t}}]),e}(l.default);e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="GaussianNoise";t.sigma;return n}return a(e,t),s(e,[{key:"call",value:function(t){return t}}]),e}(l.default);e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.GaussianNoise=e.GaussianDropout=void 0;var o=n(239),i=r(o),a=n(240),s=r(a);e.GaussianDropout=i.default,e.GaussianNoise=s.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},l=n(1),c=r(l),f=n(2),p=r(f),h=n(3),d=r(h),v=n(192),m=r(v),_=n(183),g=r(_),y=n(57),b=r(y),w=n(200),x=r(w),E=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="BatchNormalization";var r=t.epsilon,a=void 0===r?.001:r,s=t.mode,u=void 0===s?0:s,l=t.axis,c=void 0===l?-1:l;if(n.epsilon=a,n.mode=u,n.axis=c,n.axisNormalized=!1,n.params=0===n.mode?["gamma","beta","running_mean","running_std"]:["gamma","beta"],n.gpu&&weblas&&(n._useWeblas=!0,n.pipeline)){var f=(0,b.default)(n.layerClass,t);f?(n._pipelineEnabled=!0,n.webglBatchNorm=new x.default):n._pipelineEnabled=!1}return n}return a(e,t),s(e,[{key:"setWeights",value:function(t){var n=this;u(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setWeights",this).call(this,t),this._useWeblas&&this.params.forEach(function(t){n.weights[t].createWeblasTensor()})}},{key:"_callPipelineMode",value:function(t){return t._fromPipeline?(t.weblasTensor=this.webglBatchNorm.call(t.weblasTensor,this.epsilon,this.weights.gamma.weblasTensor,this.weights.beta.weblasTensor,this.weights.running_mean.weblasTensor,this.weights.running_std.weblasTensor),t):this._callRegularMode(t)}},{key:"_callRegularMode",value:function(t){var e=this;this.axisNormalized||(this.axis=this.axis<0?t.tensor.shape.length+this.axis:this.axis-1,this.axisNormalized=!0);for(var n=[],r=0;r<t.tensor.shape.length;r++)r===this.axis?n.push(1):n.push(null);for(var o=new p.default([],t.tensor.shape),i=new p.default([],t.tensor.shape),a=0;a<t.tensor.shape[this.axis];a++){var s,u;n[this.axis]=a,d.default.assigns((s=o.tensor).pick.apply(s,n),this.weights.gamma.tensor.get(a)),d.default.assigns((u=i.tensor).pick.apply(u,n),this.weights.beta.tensor.get(a))}var l=new p.default([],t.tensor.shape),c=new p.default([],t.tensor.shape);if(0===this.mode){for(var f=0;f<t.tensor.shape[this.axis];f++){var h,v;n[this.axis]=f,d.default.assigns((h=l.tensor).pick.apply(h,n),this.weights.running_mean.tensor.get(f)),d.default.assigns((v=c.tensor).pick.apply(v,n),this.weights.running_std.tensor.get(f)+this.epsilon)}d.default.sqrteq(c.tensor)}else if(1===this.mode){var _=t.tensor.shape.slice();_.splice(this.axis,1);for(var y=new p.default([],_),b=0;b<t.tensor.shape[this.axis];b++){var w;n[this.axis]=b,d.default.addeq(y.tensor,(w=t.tensor).pick.apply(w,n))}d.default.divseq(y.tensor,t.tensor.shape[this.axis]);for(var x=new p.default([],_),E=new p.default([],_),T=0;T<t.tensor.shape[this.axis];T++){var O;n[this.axis]=T,d.default.sub(E.tensor,(O=t.tensor).pick.apply(O,n),y.tensor),d.default.powseq(E.tensor,2),d.default.addeq(x.tensor,E.tensor)}d.default.divseq(x.tensor,t.tensor.shape[this.axis]),d.default.addseq(x.tensor,this.epsilon),d.default.sqrteq(x.tensor),d.default.addseq(x.tensor,this.epsilon);for(var S=0;S<t.tensor.shape[this.axis];S++){var P,M;n[this.axis]=S,d.default.assign((P=l.tensor).pick.apply(P,n),y.tensor),d.default.assign((M=c.tensor).pick.apply(M,n),x.tensor)}}else{if(2!==this.mode)throw new Error("[normalization.BatchNormalization] Invalid mode "+this.mode+".");for(var j=function(r){var o,i,a;n[e.axis]=r;var s=(0,g.default)((0,m.default)((o=t.tensor).pick.apply(o,n))),u=s.reduce(function(t,e){return t+e},0)/s.length,f=s.map(function(t){return(t-u)*(t-u)}).reduce(function(t,e){return t+e},0)/s.length;d.default.assigns((i=l.tensor).pick.apply(i,n),u),d.default.assigns((a=c.tensor).pick.apply(a,n),f+e.epsilon)},A=0;A<t.tensor.shape[this.axis];A++)j(A);d.default.sqrteq(c.tensor)}return d.default.subeq(t.tensor,l.tensor),d.default.diveq(t.tensor,c.tensor),d.default.muleq(t.tensor,o.tensor),d.default.addeq(t.tensor,i.tensor),t}},{key:"call",value:function(t){return this._pipelineEnabled?this._callPipelineMode(t):this._callRegularMode(t)}}]),e}(c.default);e.default=E},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.BatchNormalization=void 0;var o=n(242),i=r(o);e.BatchNormalization=i.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(134),u=r(s),l=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.layerClass="AveragePooling1D",n.poolingFunc="average",n}return a(e,t),e}(u.default);e.default=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(135),u=r(s),l=n(57),c=r(l),f=n(132),p=r(f),h=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));if(n.layerClass="AveragePooling2D",n.poolingFunc="average",n.gpu&&weblas&&(n._useWeblas=!0,n.pipeline)){var r=(0,c.default)(n.layerClass,t);r?(n._pipelineEnabled=!0,n.webglPooling2D=new p.default(n.poolingFunc)):n._pipelineEnabled=!1}return n}return a(e,t),e}(u.default);e.default=h},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(136),u=r(s),l=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.layerClass="AveragePooling3D",n.poolingFunc="average",n}return a(e,t),e}(u.default);e.default=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),c=r(l),f=n(2),p=r(f),h=n(3),d=r(h),v=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.layerClass="GlobalAveragePooling1D",n}return a(e,t),u(e,[{key:"call",value:function(t){for(var e=s(t.tensor.shape,2),n=e[0],r=e[1],o=new p.default([],[r]),i=0,a=r;i<a;i++)o.tensor.set(i,d.default.sum(t.tensor.pick(null,i))/n);return t.tensor=o.tensor,t}}]),e}(c.default);e.default=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),c=r(l),f=n(2),p=r(f),h=n(3),d=r(h),v=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="GlobalAveragePooling2D";var r=t.dimOrdering,a=void 0===r?"tf":r;return n.dimOrdering=a,n}return a(e,t),u(e,[{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,0));for(var e=s(t.tensor.shape,3),n=e[0],r=e[1],o=e[2],i=new p.default([],[o]),a=0,u=o;a<u;a++)i.tensor.set(a,d.default.sum(t.tensor.pick(null,null,a))/(n*r));return t.tensor=i.tensor,t}}]),e}(c.default);e.default=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.layerClass="GlobalMaxPooling1D",n}return a(e,t),s(e,[{key:"call",value:function(t){for(var e=t.tensor.shape[1],n=new f.default([],[e]),r=0,o=e;r<o;r++)n.tensor.set(r,h.default.sup(t.tensor.pick(null,r)));return t.tensor=n.tensor,t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(1),l=r(u),c=n(2),f=r(c),p=n(3),h=r(p),d=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="GlobalMaxPooling2D";var r=t.dimOrdering,a=void 0===r?"tf":r;return n.dimOrdering=a,n}return a(e,t),s(e,[{key:"call",value:function(t){"th"===this.dimOrdering&&(t.tensor=t.tensor.transpose(1,2,0));
for(var e=t.tensor.shape[2],n=new f.default([],[e]),r=0,o=e;r<o;r++)n.tensor.set(r,h.default.sup(t.tensor.pick(null,null,r)));return t.tensor=n.tensor,t}}]),e}(l.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(134),u=r(s),l=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.layerClass="MaxPooling1D",n.poolingFunc="max",n}return a(e,t),e}(u.default);e.default=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(135),u=r(s),l=n(57),c=r(l),f=n(132),p=r(f),h=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));if(n.layerClass="MaxPooling2D",n.poolingFunc="max",n.gpu&&weblas&&(n._useWeblas=!0,n.pipeline)){var r=(0,c.default)(n.layerClass,t);r?(n._pipelineEnabled=!0,n.webglPooling2D=new p.default(n.poolingFunc)):n._pipelineEnabled=!1}return n}return a(e,t),e}(u.default);e.default=h},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(136),u=r(s),l=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e);var n=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.layerClass="MaxPooling3D",n.poolingFunc="max",n}return a(e,t),e}(u.default);e.default=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.GlobalAveragePooling2D=e.GlobalMaxPooling2D=e.GlobalAveragePooling1D=e.GlobalMaxPooling1D=e.AveragePooling3D=e.AveragePooling2D=e.AveragePooling1D=e.MaxPooling3D=e.MaxPooling2D=e.MaxPooling1D=void 0;var o=n(251),i=r(o),a=n(252),s=r(a),u=n(253),l=r(u),c=n(244),f=r(c),p=n(245),h=r(p),d=n(246),v=r(d),m=n(249),_=r(m),g=n(247),y=r(g),b=n(250),w=r(b),x=n(248),E=r(x);e.MaxPooling1D=i.default,e.MaxPooling2D=s.default,e.MaxPooling3D=l.default,e.AveragePooling1D=f.default,e.AveragePooling2D=h.default,e.AveragePooling3D=v.default,e.GlobalMaxPooling1D=_.default,e.GlobalAveragePooling1D=y.default,e.GlobalMaxPooling2D=w.default,e.GlobalAveragePooling2D=E.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(19),c=o(l),f=n(2),p=r(f),h=n(1),d=r(h),v=n(56),m=n(3),_=r(m),g=n(25),y=r(g),b=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n._combine=(0,y.default)({args:["array","array","array","array"],body:function(t,e,n,r){t=e+n+r}}),n._update=(0,y.default)({args:["array","array","array"],body:function(t,e,n){t=t*(1-n)+e*n}}),n.layerClass="GRU";var r=t.outputDim,o=void 0===r?1:r,s=t.activation,u=void 0===s?"tanh":s,l=t.innerActivation,f=void 0===l?"hardSigmoid":l,p=t.returnSequences,h=void 0!==p&&p,d=t.goBackwards,v=void 0!==d&&d,m=t.stateful,_=void 0!==m&&m;return n.outputDim=o,n.activation=u,n.innerActivation=f,n.activationFunc=c[u],n.innerActivationFunc=c[f],n.returnSequences=h,n.goBackwards=v,n.stateful=_,n.params=["W_z","U_z","b_z","W_r","U_r","b_r","W_h","U_h","b_h"],n}return s(e,t),u(e,[{key:"call",value:function(t){var e=this,n=new p.default([],[t.tensor.shape[1]]),r=this.weights.b_z.tensor.shape[0],o=this.weights.b_r.tensor.shape[0],i=this.weights.b_h.tensor.shape[0],a=new p.default([],[r]),s=new p.default([],[r]),u=new p.default([],[r]),l=new p.default([],[o]),c=new p.default([],[o]),f=new p.default([],[o]),h=this.stateful&&this.currentHiddenState?this.currentHiddenState:new p.default([],[i]),d=new p.default([],[i]),m=new p.default([],[i]),g=new p.default([],[i]);this.hiddenStateSequence=new p.default([],[t.tensor.shape[0],i]);for(var y=function(){var t=[s,u,c,f,d,m];t.forEach(function(t){return _.default.assigns(t.tensor,0)})},b=function(){_.default.assign(g.tensor,h.tensor),(0,v.gemv)(1,e.weights.W_z.tensor.transpose(1,0),n.tensor,1,s.tensor),(0,v.gemv)(1,e.weights.U_z.tensor.transpose(1,0),g.tensor,1,u.tensor),e._combine(a.tensor,s.tensor,u.tensor,e.weights.b_z.tensor),e.innerActivationFunc(a),(0,v.gemv)(1,e.weights.W_r.tensor.transpose(1,0),n.tensor,1,c.tensor),(0,v.gemv)(1,e.weights.U_r.tensor.transpose(1,0),g.tensor,1,f.tensor),e._combine(l.tensor,c.tensor,f.tensor,e.weights.b_r.tensor),e.innerActivationFunc(l),_.default.muleq(l.tensor,g.tensor),(0,v.gemv)(1,e.weights.W_h.tensor.transpose(1,0),n.tensor,1,d.tensor),(0,v.gemv)(1,e.weights.U_h.tensor.transpose(1,0),l.tensor,1,m.tensor),e._combine(h.tensor,d.tensor,m.tensor,e.weights.b_h.tensor),e.activationFunc(h),e._update(h.tensor,g.tensor,a.tensor)},w=0,x=t.tensor.shape[0];w<x;w++){var E=this.goBackwards?x-w-1:w;_.default.assign(n.tensor,t.tensor.pick(E,null)),y(),b(),this.returnSequences&&_.default.assign(this.hiddenStateSequence.tensor.pick(w,null),h.tensor)}return this.returnSequences?t.tensor=this.hiddenStateSequence.tensor:t.tensor=h.tensor,this.stateful&&(this.currentHiddenState=h),t}}]),e}(d.default);e.default=b},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(19),c=o(l),f=n(2),p=r(f),h=n(1),d=r(h),v=n(56),m=n(3),_=r(m),g=n(25),y=r(g),b=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n._combine=(0,y.default)({args:["array","array","array","array"],body:function(t,e,n,r){t=e+n+r}}),n._update=(0,y.default)({args:["array","array","array","array"],body:function(t,e,n,r){t=t*n+e*r}}),n.layerClass="LSTM";var r=t.outputDim,o=void 0===r?1:r,s=t.activation,u=void 0===s?"tanh":s,l=t.innerActivation,f=void 0===l?"hardSigmoid":l,p=t.returnSequences,h=void 0!==p&&p,d=t.goBackwards,v=void 0!==d&&d,m=t.stateful,_=void 0!==m&&m;return n.outputDim=o,n.activation=u,n.innerActivation=f,n.activationFunc=c[u],n.innerActivationFunc=c[f],n.returnSequences=h,n.goBackwards=v,n.stateful=_,n.params=["W_i","U_i","b_i","W_c","U_c","b_c","W_f","U_f","b_f","W_o","U_o","b_o"],n}return s(e,t),u(e,[{key:"call",value:function(t){var e=this,n=new p.default([],[t.tensor.shape[1]]),r=this.weights.b_i.tensor.shape[0],o=this.weights.b_c.tensor.shape[0],i=this.weights.b_f.tensor.shape[0],a=this.weights.b_o.tensor.shape[0],s=new p.default([],[r]),u=new p.default([],[r]),l=new p.default([],[r]),c=new p.default([],[i]),f=new p.default([],[i]),h=new p.default([],[i]),d=new p.default([],[a]),m=new p.default([],[a]),g=new p.default([],[a]),y=new p.default([],[o]),b=new p.default([],[o]),w=new p.default([],[o]),x=this.stateful&&this.previousCandidate?this.previousCandidate:new p.default([],[o]),E=this.stateful&&this.currentHiddenState?this.currentHiddenState:new p.default([],[o]),T=new p.default([],[o]);this.hiddenStateSequence=new p.default([],[t.tensor.shape[0],o]);for(var O=function(){var t=[u,l,f,h,m,g,b,w];t.forEach(function(t){return _.default.assigns(t.tensor,0)})},S=function(){_.default.assign(T.tensor,E.tensor),(0,v.gemv)(1,e.weights.W_i.tensor.transpose(1,0),n.tensor,1,u.tensor),(0,v.gemv)(1,e.weights.U_i.tensor.transpose(1,0),T.tensor,1,l.tensor),e._combine(s.tensor,u.tensor,l.tensor,e.weights.b_i.tensor),e.innerActivationFunc(s),(0,v.gemv)(1,e.weights.W_f.tensor.transpose(1,0),n.tensor,1,f.tensor),(0,v.gemv)(1,e.weights.U_f.tensor.transpose(1,0),T.tensor,1,h.tensor),e._combine(c.tensor,f.tensor,h.tensor,e.weights.b_f.tensor),e.innerActivationFunc(c),(0,v.gemv)(1,e.weights.W_o.tensor.transpose(1,0),n.tensor,1,m.tensor),(0,v.gemv)(1,e.weights.U_o.tensor.transpose(1,0),T.tensor,1,g.tensor),e._combine(d.tensor,m.tensor,g.tensor,e.weights.b_o.tensor),e.innerActivationFunc(d),(0,v.gemv)(1,e.weights.W_c.tensor.transpose(1,0),n.tensor,1,b.tensor),(0,v.gemv)(1,e.weights.U_c.tensor.transpose(1,0),T.tensor,1,w.tensor),e._combine(y.tensor,b.tensor,w.tensor,e.weights.b_c.tensor),e.activationFunc(y),e._update(y.tensor,x.tensor,s.tensor,c.tensor),_.default.assign(x.tensor,y.tensor),e.activationFunc(y),_.default.mul(E.tensor,d.tensor,y.tensor)},P=0,M=t.tensor.shape[0];P<M;P++){var j=this.goBackwards?M-P-1:P;_.default.assign(n.tensor,t.tensor.pick(j,null)),O(),S(),_.default.assign(this.hiddenStateSequence.tensor.pick(P,null),E.tensor)}return this.returnSequences?t.tensor=this.hiddenStateSequence.tensor:t.tensor=E.tensor,this.stateful&&(this.previousCandidate=x,this.currentHiddenState=E),t}}]),e}(d.default);e.default=b},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(19),c=o(l),f=n(2),p=r(f),h=n(1),d=r(h),v=n(56),m=n(3),_=r(m),g=n(25),y=r(g),b=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n._combine=(0,y.default)({args:["array","array","array","array"],body:function(t,e,n,r){t=e+n+r}}),n.layerClass="SimpleRNN";var r=t.outputDim,o=void 0===r?1:r,s=t.activation,u=void 0===s?"tanh":s,l=t.returnSequences,f=void 0!==l&&l,p=t.goBackwards,h=void 0!==p&&p,d=t.stateful,v=void 0!==d&&d;return n.outputDim=o,n.activation=u,n.activationFunc=c[u],n.returnSequences=f,n.goBackwards=h,n.stateful=v,n.params=["W","U","b"],n}return s(e,t),u(e,[{key:"call",value:function(t){var e=this,n=new p.default([],[t.tensor.shape[1]]),r=this.weights.b.tensor.shape[0],o=this.stateful&&this.currentHiddenState?this.currentHiddenState:new p.default([],[r]),i=new p.default([],[r]),a=new p.default([],[r]),s=new p.default([],[r]);this.hiddenStateSequence=new p.default([],[t.tensor.shape[0],r]);for(var u=function(){var t=[i,a];t.forEach(function(t){return _.default.assigns(t.tensor,0)})},l=function(){_.default.assign(s.tensor,o.tensor),(0,v.gemv)(1,e.weights.W.tensor.transpose(1,0),n.tensor,1,i.tensor),(0,v.gemv)(1,e.weights.U.tensor.transpose(1,0),s.tensor,1,a.tensor),e._combine(o.tensor,i.tensor,a.tensor,e.weights.b.tensor),e.activationFunc(o)},c=0,f=t.tensor.shape[0];c<f;c++){var h=this.goBackwards?f-c-1:c;_.default.assign(n.tensor,t.tensor.pick(h,null)),u(),l(),this.returnSequences&&_.default.assign(this.hiddenStateSequence.tensor.pick(c,null),o.tensor)}return this.returnSequences?t.tensor=this.hiddenStateSequence.tensor:t.tensor=o.tensor,this.stateful&&(this.currentHiddenState=o),t}}]),e}(d.default);e.default=b},function(t,e,n){"use strict";function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function o(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),c=o(l),f=n(2),p=o(f),h=n(3),d=o(h),v=n(573),m=o(v),_=n(137),g=r(_),y=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="Bidirectional";var r=t.layer,o=t.mergeMode,s=void 0===o?"concat":o;if(!r)throw new Error("[Bidirectional] wrapped layer is undefined.");n.forwardLayer=r;var u=(0,m.default)(r,["outputDim","activation","innerActivation","returnSequences","goBackwards","stateful"]);return u.goBackwards=!u.goBackwards,n.backwardLayer=new g[r.layerClass](u),n.mergeMode=s,n}return s(e,t),u(e,[{key:"setWeights",value:function(t){this.forwardLayer.setWeights(t.slice(0,t.length/2)),this.backwardLayer.setWeights(t.slice(t.length/2))}},{key:"call",value:function(t){var e=new p.default(t.tensor.data,t.tensor.shape),n=new p.default(t.tensor.data,t.tensor.shape),r=this.forwardLayer.call(e),o=this.backwardLayer.call(n);if("concat"===this.mergeMode){var i=r.tensor.shape.slice();i[i.length-1]+=o.tensor.shape[i.length-1];var a=new p.default([],i);this.forwardLayer.returnSequences?(d.default.assign(a.tensor.hi(i[0],r.tensor.shape[1]).lo(0,0),r.tensor),d.default.assign(a.tensor.hi(i[0],i[1]).lo(0,r.tensor.shape[1]),o.tensor.step(-1))):(d.default.assign(a.tensor.hi(r.tensor.shape[0]).lo(0),r.tensor),d.default.assign(a.tensor.hi(i[0]).lo(r.tensor.shape[0]),o.tensor)),t.tensor=a.tensor}else if("sum"===this.mergeMode){var s=r.tensor.shape.slice(),u=new p.default([],s);d.default.addeq(u.tensor,r.tensor),d.default.addeq(u.tensor,o.tensor),t.tensor=u.tensor}else if("mul"===this.mergeMode){var l=r.tensor.shape.slice(),c=new p.default([],l);d.default.assigns(c.tensor,1),d.default.muleq(c.tensor,r.tensor),d.default.muleq(c.tensor,o.tensor),t.tensor=c.tensor}else if("ave"===this.mergeMode){var f=r.tensor.shape.slice(),h=new p.default([],f);d.default.addeq(h.tensor,r.tensor),d.default.addeq(h.tensor,o.tensor),d.default.divseq(h.tensor,2),t.tensor=h.tensor}return t}}]),e}(c.default);e.default=y},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),l=n(1),c=r(l),f=n(2),p=r(f),h=n(3),d=r(h),v=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=a(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.layerClass="TimeDistributed";var r=t.layer;if(!r)throw new Error("[TimeDistributed] wrapped layer is undefined.");return n.layer=r,n}return s(e,t),u(e,[{key:"setWeights",value:function(t){this.layer.setWeights(t)}},{key:"call",value:function(t){var e,n,r=[].concat(o(t.tensor.shape.slice(1))),i=new p.default([],r);d.default.assign(i.tensor,(e=t.tensor).pick.apply(e,[0].concat(o(r.map(function(t){return null})))));var a=this.layer.call(i),s=a.tensor.shape.slice(),u=new p.default([],[t.tensor.shape[0]].concat(o(s)));d.default.assign((n=u.tensor).pick.apply(n,[0].concat(o(s.map(function(t){return null})))),a.tensor);for(var l=1,c=t.tensor.shape[0];l<c;l++){var f,h,v=new p.default([],r);d.default.assign(v.tensor,(f=t.tensor).pick.apply(f,[l].concat(o(r.map(function(t){return null}))))),a=this.layer.call(v),d.default.assign((h=u.tensor).pick.apply(h,[l].concat(o(s.map(function(t){return null})))),a.tensor)}return t.tensor=u.tensor,t}}]),e}(c.default);e.default=v},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.Bidirectional=e.TimeDistributed=void 0;var o=n(259),i=r(o),a=n(258),s=r(a);e.TimeDistributed=i.default,e.Bidirectional=s.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e-4,r=(0,u.default)((0,a.default)(t)),o=e;if(r.length!==o.length)return!1;for(var i=0;i<r.length;i++){if(!(0,c.default)(r[i]))return!1;if(r[i]<o[i]-n||r[i]>o[i]+n)return!1}return!0}Object.defineProperty(e,"__esModule",{value:!0}),e.approxEquals=o;var i=n(192),a=r(i),s=n(183),u=r(s),l=n(570),c=r(l)},function(t,e,n){"use strict";function r(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===t[e-2]?2:"="===t[e-1]?1:0}function o(t){return 3*t.length/4-r(t)}function i(t){var e,n,o,i,a,s,u=t.length;a=r(t),s=new f(3*u/4-a),o=a>0?u-4:u;var l=0;for(e=0,n=0;e<o;e+=4,n+=3)i=c[t.charCodeAt(e)]<<18|c[t.charCodeAt(e+1)]<<12|c[t.charCodeAt(e+2)]<<6|c[t.charCodeAt(e+3)],s[l++]=i>>16&255,s[l++]=i>>8&255,s[l++]=255&i;return 2===a?(i=c[t.charCodeAt(e)]<<2|c[t.charCodeAt(e+1)]>>4,s[l++]=255&i):1===a&&(i=c[t.charCodeAt(e)]<<10|c[t.charCodeAt(e+1)]<<4|c[t.charCodeAt(e+2)]>>2,s[l++]=i>>8&255,s[l++]=255&i),s}function a(t){return l[t>>18&63]+l[t>>12&63]+l[t>>6&63]+l[63&t]}function s(t,e,n){for(var r,o=[],i=e;i<n;i+=3)r=(t[i]<<16)+(t[i+1]<<8)+t[i+2],o.push(a(r));return o.join("")}function u(t){for(var e,n=t.length,r=n%3,o="",i=[],a=16383,u=0,c=n-r;u<c;u+=a)i.push(s(t,u,u+a>c?c:u+a));return 1===r?(e=t[n-1],o+=l[e>>2],o+=l[e<<4&63],o+="=="):2===r&&(e=(t[n-2]<<8)+t[n-1],o+=l[e>>10],o+=l[e>>4&63],o+=l[e<<2&63],o+="="),i.push(o),i.join("")}e.byteLength=o,e.toByteArray=i,e.fromByteArray=u;for(var l=[],c=[],f="undefined"!=typeof Uint8Array?Uint8Array:Array,p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h=0,d=p.length;h<d;++h)l[h]=p[h],c[p.charCodeAt(h)]=h;c["-".charCodeAt(0)]=62,c["_".charCodeAt(0)]=63},function(t,e,n){"use strict";"use restrict";function r(t){var e=32;return t&=-t,t&&e--,65535&t&&(e-=16),16711935&t&&(e-=8),252645135&t&&(e-=4),858993459&t&&(e-=2),1431655765&t&&(e-=1),e}var o=32;e.INT_BITS=o,e.INT_MAX=2147483647,e.INT_MIN=-1<<o-1,e.sign=function(t){return(t>0)-(t<0)},e.abs=function(t){var e=t>>o-1;return(t^e)-e},e.min=function(t,e){return e^(t^e)&-(t<e)},e.max=function(t,e){return t^(t^e)&-(t<e)},e.isPow2=function(t){return!(t&t-1||!t)},e.log2=function(t){var e,n;return e=(t>65535)<<4,t>>>=e,n=(t>255)<<3,t>>>=n,e|=n,n=(t>15)<<2,t>>>=n,e|=n,n=(t>3)<<1,t>>>=n,e|=n,e|t>>1},e.log10=function(t){return t>=1e9?9:t>=1e8?8:t>=1e7?7:t>=1e6?6:t>=1e5?5:t>=1e4?4:t>=1e3?3:t>=100?2:t>=10?1:0},e.popCount=function(t){return t-=t>>>1&1431655765,t=(858993459&t)+(t>>>2&858993459),16843009*(t+(t>>>4)&252645135)>>>24},e.countTrailingZeros=r,e.nextPow2=function(t){return t+=0===t,--t,t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,t|=t>>>16,t+1},e.prevPow2=function(t){return t|=t>>>1,t|=t>>>2,t|=t>>>4,t|=t>>>8,t|=t>>>16,t-(t>>>1)},e.parity=function(t){return t^=t>>>16,t^=t>>>8,t^=t>>>4,t&=15,27030>>>t&1};var i=new Array(256);!function(t){for(var e=0;e<256;++e){var n=e,r=e,o=7;for(n>>>=1;n;n>>>=1)r<<=1,r|=1&n,--o;t[e]=r<<o&255}}(i),e.reverse=function(t){return i[255&t]<<24|i[t>>>8&255]<<16|i[t>>>16&255]<<8|i[t>>>24&255]},e.interleave2=function(t,e){return t&=65535,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e&=65535,e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t|e<<1},e.deinterleave2=function(t,e){return t=t>>>e&1431655765,t=858993459&(t|t>>>1),t=252645135&(t|t>>>2),t=16711935&(t|t>>>4),t=65535&(t|t>>>16),t<<16>>16},e.interleave3=function(t,e,n){return t&=1023,t=4278190335&(t|t<<16),t=251719695&(t|t<<8),t=3272356035&(t|t<<4),t=1227133513&(t|t<<2),e&=1023,e=4278190335&(e|e<<16),e=251719695&(e|e<<8),e=3272356035&(e|e<<4),e=1227133513&(e|e<<2),t|=e<<1,n&=1023,n=4278190335&(n|n<<16),n=251719695&(n|n<<8),n=3272356035&(n|n<<4),n=1227133513&(n|n<<2),t|n<<2},e.deinterleave3=function(t,e){return t=t>>>e&1227133513,t=3272356035&(t|t>>>2),t=251719695&(t|t>>>4),t=4278190335&(t|t>>>8),t=1023&(t|t>>>16),t<<22>>22},e.nextCombination=function(t){var e=t|t-1;return e+1|(~e&-~e)-1>>>r(t)+1}},function(t,e,n){(function(e,n,r){!function(e){t.exports=e()}(function(){var t,o,i;return function t(e,n,r){function o(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof _dereq_&&_dereq_;if(!s&&u)return u(a,!0);if(i)return i(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return o(n?n:t)},c,c.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof _dereq_&&_dereq_,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){"use strict";e.exports=function(t){function e(t){var e=new n(t),r=e.promise();return e.setHowMany(1),e.setUnwrap(),e.init(),r}var n=t._SomePromiseArray;t.any=function(t){return e(t)},t.prototype.any=function(){return e(this)}}},{}],2:[function(t,n,r){"use strict";function o(){this._customScheduler=!1,this._isTickUsed=!1,this._lateQueue=new c(16),this._normalQueue=new c(16),this._haveDrainedQueues=!1,this._trampolineEnabled=!0;var t=this;this.drainQueues=function(){t._drainQueues()},this._schedule=l}function i(t,e,n){this._lateQueue.push(t,e,n),this._queueTick()}function a(t,e,n){this._normalQueue.push(t,e,n),this._queueTick()}function s(t){this._normalQueue._pushOne(t),this._queueTick()}var u;try{throw new Error}catch(t){u=t}var l=t("./schedule"),c=t("./queue"),f=t("./util");o.prototype.setScheduler=function(t){var e=this._schedule;return this._schedule=t,this._customScheduler=!0,e},o.prototype.hasCustomScheduler=function(){return this._customScheduler},o.prototype.enableTrampoline=function(){this._trampolineEnabled=!0},o.prototype.disableTrampolineIfNecessary=function(){f.hasDevTools&&(this._trampolineEnabled=!1)},o.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues},o.prototype.fatalError=function(t,n){n?(e.stderr.write("Fatal "+(t instanceof Error?t.stack:t)+"\n"),e.exit(2)):this.throwLater(t)},o.prototype.throwLater=function(t,e){if(1===arguments.length&&(e=t,t=function(){throw e}),"undefined"!=typeof setTimeout)setTimeout(function(){t(e)},0);else try{this._schedule(function(){t(e)})}catch(t){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")}},f.hasDevTools?(o.prototype.invokeLater=function(t,e,n){this._trampolineEnabled?i.call(this,t,e,n):this._schedule(function(){setTimeout(function(){t.call(e,n)},100)})},o.prototype.invoke=function(t,e,n){this._trampolineEnabled?a.call(this,t,e,n):this._schedule(function(){t.call(e,n)})},o.prototype.settlePromises=function(t){this._trampolineEnabled?s.call(this,t):this._schedule(function(){t._settlePromises()})}):(o.prototype.invokeLater=i,o.prototype.invoke=a,o.prototype.settlePromises=s),o.prototype._drainQueue=function(t){for(;t.length()>0;){var e=t.shift();if("function"==typeof e){var n=t.shift(),r=t.shift();e.call(n,r)}else e._settlePromises()}},o.prototype._drainQueues=function(){this._drainQueue(this._normalQueue),this._reset(),this._haveDrainedQueues=!0,this._drainQueue(this._lateQueue)},o.prototype._queueTick=function(){this._isTickUsed||(this._isTickUsed=!0,this._schedule(this.drainQueues))},o.prototype._reset=function(){this._isTickUsed=!1},n.exports=o,n.exports.firstLineError=u},{"./queue":26,"./schedule":29,"./util":36}],3:[function(t,e,n){"use strict";e.exports=function(t,e,n,r){var o=!1,i=function(t,e){this._reject(e)},a=function(t,e){e.promiseRejectionQueued=!0,e.bindingPromise._then(i,i,null,this,t)},s=function(t,e){0===(50397184&this._bitField)&&this._resolveCallback(e.target)},u=function(t,e){e.promiseRejectionQueued||this._reject(t)};t.prototype.bind=function(i){o||(o=!0,t.prototype._propagateFrom=r.propagateFromFunction(),t.prototype._boundValue=r.boundValueFunction());var l=n(i),c=new t(e);c._propagateFrom(this,1);var f=this._target();if(c._setBoundTo(l),l instanceof t){var p={promiseRejectionQueued:!1,promise:c,target:f,bindingPromise:l};f._then(e,a,void 0,c,p),l._then(s,u,void 0,c,p),c._setOnCancel(l)}else c._resolveCallback(f);return c},t.prototype._setBoundTo=function(t){void 0!==t?(this._bitField=2097152|this._bitField,this._boundTo=t):this._bitField=this._bitField&-2097153},t.prototype._isBound=function(){return 2097152===(2097152&this._bitField)},t.bind=function(e,n){return t.resolve(n).bind(e)}}},{}],4:[function(t,e,n){"use strict";function r(){try{Promise===i&&(Promise=o)}catch(t){}return i}var o;"undefined"!=typeof Promise&&(o=Promise);var i=t("./promise")();i.noConflict=r,e.exports=i},{"./promise":22}],5:[function(t,e,n){"use strict";var r=Object.create;if(r){var o=r(null),i=r(null);o[" size"]=i[" size"]=0}e.exports=function(e){function n(t,n){var r;if(null!=t&&(r=t[n]),"function"!=typeof r){var o="Object "+s.classString(t)+" has no method '"+s.toString(n)+"'";throw new e.TypeError(o)}return r}function r(t){var e=this.pop(),r=n(t,e);return r.apply(t,this)}function o(t){return t[this]}function i(t){var e=+this;return e<0&&(e=Math.max(0,e+t.length)),t[e]}var a,s=t("./util"),u=s.canEvaluate;s.isIdentifier;e.prototype.call=function(t){var e=[].slice.call(arguments,1);return e.push(t),this._then(r,void 0,void 0,e,void 0)},e.prototype.get=function(t){var e,n="number"==typeof t;if(n)e=i;else if(u){var r=a(t);e=null!==r?r:o}else e=o;return this._then(e,void 0,void 0,t,void 0)}}},{"./util":36}],6:[function(t,e,n){"use strict";e.exports=function(e,n,r,o){var i=t("./util"),a=i.tryCatch,s=i.errorObj,u=e._async;e.prototype.break=e.prototype.cancel=function(){if(!o.cancellation())return this._warn("cancellation is disabled");for(var t=this,e=t;t._isCancellable();){if(!t._cancelBy(e)){e._isFollowing()?e._followee().cancel():e._cancelBranched();break}var n=t._cancellationParent;if(null==n||!n._isCancellable()){t._isFollowing()?t._followee().cancel():t._cancelBranched();break}t._isFollowing()&&t._followee().cancel(),t._setWillBeCancelled(),e=t,t=n}},e.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--},e.prototype._enoughBranchesHaveCancelled=function(){return void 0===this._branchesRemainingToCancel||this._branchesRemainingToCancel<=0},e.prototype._cancelBy=function(t){return t===this?(this._branchesRemainingToCancel=0,this._invokeOnCancel(),!0):(this._branchHasCancelled(),!!this._enoughBranchesHaveCancelled()&&(this._invokeOnCancel(),!0))},e.prototype._cancelBranched=function(){this._enoughBranchesHaveCancelled()&&this._cancel()},e.prototype._cancel=function(){this._isCancellable()&&(this._setCancelled(),u.invoke(this._cancelPromises,this,void 0))},e.prototype._cancelPromises=function(){this._length()>0&&this._settlePromises()},e.prototype._unsetOnCancel=function(){this._onCancelField=void 0},e.prototype._isCancellable=function(){return this.isPending()&&!this._isCancelled()},e.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled()},e.prototype._doInvokeOnCancel=function(t,e){if(i.isArray(t))for(var n=0;n<t.length;++n)this._doInvokeOnCancel(t[n],e);else if(void 0!==t)if("function"==typeof t){if(!e){var r=a(t).call(this._boundValue());r===s&&(this._attachExtraTrace(r.e),
u.throwLater(r.e))}}else t._resultCancelled(this)},e.prototype._invokeOnCancel=function(){var t=this._onCancel();this._unsetOnCancel(),u.invoke(this._doInvokeOnCancel,this,t)},e.prototype._invokeInternalOnCancel=function(){this._isCancellable()&&(this._doInvokeOnCancel(this._onCancel(),!0),this._unsetOnCancel())},e.prototype._resultCancelled=function(){this.cancel()}}},{"./util":36}],7:[function(t,e,n){"use strict";e.exports=function(e){function n(t,n,s){return function(u){var l=s._boundValue();t:for(var c=0;c<t.length;++c){var f=t[c];if(f===Error||null!=f&&f.prototype instanceof Error){if(u instanceof f)return i(n).call(l,u)}else if("function"==typeof f){var p=i(f).call(l,u);if(p===a)return p;if(p)return i(n).call(l,u)}else if(r.isObject(u)){for(var h=o(f),d=0;d<h.length;++d){var v=h[d];if(f[v]!=u[v])continue t}return i(n).call(l,u)}}return e}}var r=t("./util"),o=t("./es5").keys,i=r.tryCatch,a=r.errorObj;return n}},{"./es5":13,"./util":36}],8:[function(t,e,n){"use strict";e.exports=function(t){function e(){this._trace=new e.CapturedTrace(r())}function n(){if(o)return new e}function r(){var t=i.length-1;if(t>=0)return i[t]}var o=!1,i=[];return t.prototype._promiseCreated=function(){},t.prototype._pushContext=function(){},t.prototype._popContext=function(){return null},t._peekContext=t.prototype._peekContext=function(){},e.prototype._pushContext=function(){void 0!==this._trace&&(this._trace._promiseCreated=null,i.push(this._trace))},e.prototype._popContext=function(){if(void 0!==this._trace){var t=i.pop(),e=t._promiseCreated;return t._promiseCreated=null,e}return null},e.CapturedTrace=null,e.create=n,e.deactivateLongStackTraces=function(){},e.activateLongStackTraces=function(){var n=t.prototype._pushContext,i=t.prototype._popContext,a=t._peekContext,s=t.prototype._peekContext,u=t.prototype._promiseCreated;e.deactivateLongStackTraces=function(){t.prototype._pushContext=n,t.prototype._popContext=i,t._peekContext=a,t.prototype._peekContext=s,t.prototype._promiseCreated=u,o=!1},o=!0,t.prototype._pushContext=e.prototype._pushContext,t.prototype._popContext=e.prototype._popContext,t._peekContext=t.prototype._peekContext=r,t.prototype._promiseCreated=function(){var t=this._peekContext();t&&null==t._promiseCreated&&(t._promiseCreated=this)}},e}},{}],9:[function(t,n,r){"use strict";n.exports=function(n,r){function o(t,e){return{promise:e}}function i(){return!1}function a(t,e,n){var r=this;try{t(e,n,function(t){if("function"!=typeof t)throw new TypeError("onCancel must be a function, got: "+D.toString(t));r._attachCancellationCallback(t)})}catch(t){return t}}function s(t){if(!this._isCancellable())return this;var e=this._onCancel();void 0!==e?D.isArray(e)?e.push(t):this._setOnCancel([e,t]):this._setOnCancel(t)}function u(){return this._onCancelField}function l(t){this._onCancelField=t}function c(){this._cancellationParent=void 0,this._onCancelField=void 0}function f(t,e){if(0!==(1&e)){this._cancellationParent=t;var n=t._branchesRemainingToCancel;void 0===n&&(n=0),t._branchesRemainingToCancel=n+1}0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function p(t,e){0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function h(){var t=this._boundTo;return void 0!==t&&t instanceof n?t.isFulfilled()?t.value():void 0:t}function d(){this._trace=new k(this._peekContext())}function v(t,e){if(B(t)){var n=this._trace;if(void 0!==n&&e&&(n=n._parent),void 0!==n)n.attachExtraTrace(t);else if(!t.__stackCleaned__){var r=T(t);D.notEnumerableProp(t,"stack",r.message+"\n"+r.stack.join("\n")),D.notEnumerableProp(t,"__stackCleaned__",!0)}}}function m(t,e,n,r,o){if(void 0===t&&null!==e&&$){if(void 0!==o&&o._returnedNonUndefined())return;if(0===(65535&r._bitField))return;n&&(n+=" ");var i="",a="";if(e._trace){for(var s=e._trace.stack.split("\n"),u=x(s),l=u.length-1;l>=0;--l){var c=u[l];if(!W.test(c)){var f=c.match(X);f&&(i="at "+f[1]+":"+f[2]+":"+f[3]+" ");break}}if(u.length>0)for(var p=u[0],l=0;l<s.length;++l)if(s[l]===p){l>0&&(a="\n"+s[l-1]);break}}var h="a promise was created in a "+n+"handler "+i+"but was not returned from it, see http://goo.gl/rRqMUw"+a;r._warn(h,!0,e)}}function _(t,e){var n=t+" is deprecated and will be removed in a future version.";return e&&(n+=" Use "+e+" instead."),g(n)}function g(t,e,r){if(at.warnings){var o,i=new L(t);if(e)r._attachExtraTrace(i);else if(at.longStackTraces&&(o=n._peekContext()))o.attachExtraTrace(i);else{var a=T(i);i.stack=a.message+"\n"+a.stack.join("\n")}et("warning",i)||O(i,"",!0)}}function y(t,e){for(var n=0;n<e.length-1;++n)e[n].push("From previous event:"),e[n]=e[n].join("\n");return n<e.length&&(e[n]=e[n].join("\n")),t+"\n"+e.join("\n")}function b(t){for(var e=0;e<t.length;++e)(0===t[e].length||e+1<t.length&&t[e][0]===t[e+1][0])&&(t.splice(e,1),e--)}function w(t){for(var e=t[0],n=1;n<t.length;++n){for(var r=t[n],o=e.length-1,i=e[o],a=-1,s=r.length-1;s>=0;--s)if(r[s]===i){a=s;break}for(var s=a;s>=0;--s){var u=r[s];if(e[o]!==u)break;e.pop(),o--}e=r}}function x(t){for(var e=[],n=0;n<t.length;++n){var r=t[n],o="    (No stack trace)"===r||z.test(r),i=o&&rt(r);o&&!i&&(q&&" "!==r.charAt(0)&&(r="    "+r),e.push(r))}return e}function E(t){for(var e=t.stack.replace(/\s+$/g,"").split("\n"),n=0;n<e.length;++n){var r=e[n];if("    (No stack trace)"===r||z.test(r))break}return n>0&&"SyntaxError"!=t.name&&(e=e.slice(n)),e}function T(t){var e=t.stack,n=t.toString();return e="string"==typeof e&&e.length>0?E(t):["    (No stack trace)"],{message:n,stack:"SyntaxError"==t.name?e:x(e)}}function O(t,e,n){if("undefined"!=typeof console){var r;if(D.isObject(t)){var o=t.stack;r=e+G(o,t)}else r=e+String(t);"function"==typeof N?N(r,n):"function"!=typeof console.log&&"object"!=typeof console.log||console.log(r)}}function S(t,e,n,r){var o=!1;try{"function"==typeof e&&(o=!0,"rejectionHandled"===t?e(r):e(n,r))}catch(t){F.throwLater(t)}"unhandledRejection"===t?et(t,n,r)||o||O(n,"Unhandled rejection "):et(t,r)}function P(t){var e;if("function"==typeof t)e="[function "+(t.name||"anonymous")+"]";else{e=t&&"function"==typeof t.toString?t.toString():D.toString(t);var n=/\[object [a-zA-Z0-9$_]+\]/;if(n.test(e))try{var r=JSON.stringify(t);e=r}catch(t){}0===e.length&&(e="(empty array)")}return"(<"+M(e)+">, no stack trace)"}function M(t){var e=41;return t.length<e?t:t.substr(0,e-3)+"..."}function j(){return"function"==typeof it}function A(t){var e=t.match(ot);if(e)return{fileName:e[1],line:parseInt(e[2],10)}}function C(t,e){if(j()){for(var n,r,o=t.stack.split("\n"),i=e.stack.split("\n"),a=-1,s=-1,u=0;u<o.length;++u){var l=A(o[u]);if(l){n=l.fileName,a=l.line;break}}for(var u=0;u<i.length;++u){var l=A(i[u]);if(l){r=l.fileName,s=l.line;break}}a<0||s<0||!n||!r||n!==r||a>=s||(rt=function(t){if(V.test(t))return!0;var e=A(t);return!!(e&&e.fileName===n&&a<=e.line&&e.line<=s)})}}function k(t){this._parent=t,this._promisesCreated=0;var e=this._length=1+(void 0===t?0:t._length);it(this,k),e>32&&this.uncycle()}var R,I,N,U=n._getDomain,F=n._async,L=t("./errors").Warning,D=t("./util"),B=D.canAttachTrace,V=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,W=/\((?:timers\.js):\d+:\d+\)/,X=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,z=null,G=null,q=!1,H=!(0==D.env("BLUEBIRD_DEBUG")),Y=!(0==D.env("BLUEBIRD_WARNINGS")||!H&&!D.env("BLUEBIRD_WARNINGS")),K=!(0==D.env("BLUEBIRD_LONG_STACK_TRACES")||!H&&!D.env("BLUEBIRD_LONG_STACK_TRACES")),$=0!=D.env("BLUEBIRD_W_FORGOTTEN_RETURN")&&(Y||!!D.env("BLUEBIRD_W_FORGOTTEN_RETURN"));n.prototype.suppressUnhandledRejections=function(){var t=this._target();t._bitField=t._bitField&-1048577|524288},n.prototype._ensurePossibleRejectionHandled=function(){0===(524288&this._bitField)&&(this._setRejectionIsUnhandled(),F.invokeLater(this._notifyUnhandledRejection,this,void 0))},n.prototype._notifyUnhandledRejectionIsHandled=function(){S("rejectionHandled",R,void 0,this)},n.prototype._setReturnedNonUndefined=function(){this._bitField=268435456|this._bitField},n.prototype._returnedNonUndefined=function(){return 0!==(268435456&this._bitField)},n.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var t=this._settledValue();this._setUnhandledRejectionIsNotified(),S("unhandledRejection",I,t,this)}},n.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=262144|this._bitField},n.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=this._bitField&-262145},n.prototype._isUnhandledRejectionNotified=function(){return(262144&this._bitField)>0},n.prototype._setRejectionIsUnhandled=function(){this._bitField=1048576|this._bitField},n.prototype._unsetRejectionIsUnhandled=function(){this._bitField=this._bitField&-1048577,this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())},n.prototype._isRejectionUnhandled=function(){return(1048576&this._bitField)>0},n.prototype._warn=function(t,e,n){return g(t,e,n||this)},n.onPossiblyUnhandledRejection=function(t){var e=U();I="function"==typeof t?null===e?t:D.domainBind(e,t):void 0},n.onUnhandledRejectionHandled=function(t){var e=U();R="function"==typeof t?null===e?t:D.domainBind(e,t):void 0};var Z=function(){};n.longStackTraces=function(){if(F.haveItemsQueued()&&!at.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if(!at.longStackTraces&&j()){var t=n.prototype._captureStackTrace,e=n.prototype._attachExtraTrace;at.longStackTraces=!0,Z=function(){if(F.haveItemsQueued()&&!at.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");n.prototype._captureStackTrace=t,n.prototype._attachExtraTrace=e,r.deactivateLongStackTraces(),F.enableTrampoline(),at.longStackTraces=!1},n.prototype._captureStackTrace=d,n.prototype._attachExtraTrace=v,r.activateLongStackTraces(),F.disableTrampolineIfNecessary()}},n.hasLongStackTraces=function(){return at.longStackTraces&&j()};var Q=function(){try{if("function"==typeof CustomEvent){var t=new CustomEvent("CustomEvent");return D.global.dispatchEvent(t),function(t,e){var n=new CustomEvent(t.toLowerCase(),{detail:e,cancelable:!0});return!D.global.dispatchEvent(n)}}if("function"==typeof Event){var t=new Event("CustomEvent");return D.global.dispatchEvent(t),function(t,e){var n=new Event(t.toLowerCase(),{cancelable:!0});return n.detail=e,!D.global.dispatchEvent(n)}}var t=document.createEvent("CustomEvent");return t.initCustomEvent("testingtheevent",!1,!0,{}),D.global.dispatchEvent(t),function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t.toLowerCase(),!1,!0,e),!D.global.dispatchEvent(n)}}catch(t){}return function(){return!1}}(),J=function(){return D.isNode?function(){return e.emit.apply(e,arguments)}:D.global?function(t){var e="on"+t.toLowerCase(),n=D.global[e];return!!n&&(n.apply(D.global,[].slice.call(arguments,1)),!0)}:function(){return!1}}(),tt={promiseCreated:o,promiseFulfilled:o,promiseRejected:o,promiseResolved:o,promiseCancelled:o,promiseChained:function(t,e,n){return{promise:e,child:n}},warning:function(t,e){return{warning:e}},unhandledRejection:function(t,e,n){return{reason:e,promise:n}},rejectionHandled:o},et=function(t){var e=!1;try{e=J.apply(null,arguments)}catch(t){F.throwLater(t),e=!0}var n=!1;try{n=Q(t,tt[t].apply(null,arguments))}catch(t){F.throwLater(t),n=!0}return n||e};n.config=function(t){if(t=Object(t),"longStackTraces"in t&&(t.longStackTraces?n.longStackTraces():!t.longStackTraces&&n.hasLongStackTraces()&&Z()),"warnings"in t){var e=t.warnings;at.warnings=!!e,$=at.warnings,D.isObject(e)&&"wForgottenReturn"in e&&($=!!e.wForgottenReturn)}if("cancellation"in t&&t.cancellation&&!at.cancellation){if(F.haveItemsQueued())throw new Error("cannot enable cancellation after promises are in use");n.prototype._clearCancellationData=c,n.prototype._propagateFrom=f,n.prototype._onCancel=u,n.prototype._setOnCancel=l,n.prototype._attachCancellationCallback=s,n.prototype._execute=a,nt=f,at.cancellation=!0}return"monitoring"in t&&(t.monitoring&&!at.monitoring?(at.monitoring=!0,n.prototype._fireEvent=et):!t.monitoring&&at.monitoring&&(at.monitoring=!1,n.prototype._fireEvent=i)),n},n.prototype._fireEvent=i,n.prototype._execute=function(t,e,n){try{t(e,n)}catch(t){return t}},n.prototype._onCancel=function(){},n.prototype._setOnCancel=function(t){},n.prototype._attachCancellationCallback=function(t){},n.prototype._captureStackTrace=function(){},n.prototype._attachExtraTrace=function(){},n.prototype._clearCancellationData=function(){},n.prototype._propagateFrom=function(t,e){};var nt=p,rt=function(){return!1},ot=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;D.inherits(k,Error),r.CapturedTrace=k,k.prototype.uncycle=function(){var t=this._length;if(!(t<2)){for(var e=[],n={},r=0,o=this;void 0!==o;++r)e.push(o),o=o._parent;t=this._length=r;for(var r=t-1;r>=0;--r){var i=e[r].stack;void 0===n[i]&&(n[i]=r)}for(var r=0;r<t;++r){var a=e[r].stack,s=n[a];if(void 0!==s&&s!==r){s>0&&(e[s-1]._parent=void 0,e[s-1]._length=1),e[r]._parent=void 0,e[r]._length=1;var u=r>0?e[r-1]:this;s<t-1?(u._parent=e[s+1],u._parent.uncycle(),u._length=u._parent._length+1):(u._parent=void 0,u._length=1);for(var l=u._length+1,c=r-2;c>=0;--c)e[c]._length=l,l++;return}}}},k.prototype.attachExtraTrace=function(t){if(!t.__stackCleaned__){this.uncycle();for(var e=T(t),n=e.message,r=[e.stack],o=this;void 0!==o;)r.push(x(o.stack.split("\n"))),o=o._parent;w(r),b(r),D.notEnumerableProp(t,"stack",y(n,r)),D.notEnumerableProp(t,"__stackCleaned__",!0)}};var it=function(){var t=/^\s*at\s*/,e=function(t,e){return"string"==typeof t?t:void 0!==e.name&&void 0!==e.message?e.toString():P(e)};if("number"==typeof Error.stackTraceLimit&&"function"==typeof Error.captureStackTrace){Error.stackTraceLimit+=6,z=t,G=e;var n=Error.captureStackTrace;return rt=function(t){return V.test(t)},function(t,e){Error.stackTraceLimit+=6,n(t,e),Error.stackTraceLimit-=6}}var r=new Error;if("string"==typeof r.stack&&r.stack.split("\n")[0].indexOf("stackDetection@")>=0)return z=/@/,G=e,q=!0,function(t){t.stack=(new Error).stack};var o;try{throw new Error}catch(t){o="stack"in t}return"stack"in r||!o||"number"!=typeof Error.stackTraceLimit?(G=function(t,e){return"string"==typeof t?t:"object"!=typeof e&&"function"!=typeof e||void 0===e.name||void 0===e.message?P(e):e.toString()},null):(z=t,G=e,function(t){Error.stackTraceLimit+=6;try{throw new Error}catch(e){t.stack=e.stack}Error.stackTraceLimit-=6})}([]);"undefined"!=typeof console&&"undefined"!=typeof console.warn&&(N=function(t){console.warn(t)},D.isNode&&e.stderr.isTTY?N=function(t,e){var n=e?"[33m":"[31m";console.warn(n+t+"[0m\n")}:D.isNode||"string"!=typeof(new Error).stack||(N=function(t,e){console.warn("%c"+t,e?"color: darkorange":"color: red")}));var at={warnings:Y,longStackTraces:!1,cancellation:!1,monitoring:!1};return K&&n.longStackTraces(),{longStackTraces:function(){return at.longStackTraces},warnings:function(){return at.warnings},cancellation:function(){return at.cancellation},monitoring:function(){return at.monitoring},propagateFromFunction:function(){return nt},boundValueFunction:function(){return h},checkForgottenReturns:m,setBounds:C,warn:g,deprecated:_,CapturedTrace:k,fireDomEvent:Q,fireGlobalEvent:J}}},{"./errors":12,"./util":36}],10:[function(t,e,n){"use strict";e.exports=function(t){function e(){return this.value}function n(){throw this.reason}t.prototype.return=t.prototype.thenReturn=function(n){return n instanceof t&&n.suppressUnhandledRejections(),this._then(e,void 0,void 0,{value:n},void 0)},t.prototype.throw=t.prototype.thenThrow=function(t){return this._then(n,void 0,void 0,{reason:t},void 0)},t.prototype.catchThrow=function(t){if(arguments.length<=1)return this._then(void 0,n,void 0,{reason:t},void 0);var e=arguments[1],r=function(){throw e};return this.caught(t,r)},t.prototype.catchReturn=function(n){if(arguments.length<=1)return n instanceof t&&n.suppressUnhandledRejections(),this._then(void 0,e,void 0,{value:n},void 0);var r=arguments[1];r instanceof t&&r.suppressUnhandledRejections();var o=function(){return r};return this.caught(n,o)}}},{}],11:[function(t,e,n){"use strict";e.exports=function(t,e){function n(){return i(this)}function r(t,n){return o(t,n,e,e)}var o=t.reduce,i=t.all;t.prototype.each=function(t){return o(this,t,e,0)._then(n,void 0,void 0,this,void 0)},t.prototype.mapSeries=function(t){return o(this,t,e,e)},t.each=function(t,r){return o(t,r,e,0)._then(n,void 0,void 0,t,void 0)},t.mapSeries=r}},{}],12:[function(t,e,n){"use strict";function r(t,e){function n(r){return this instanceof n?(f(this,"message","string"==typeof r?r:e),f(this,"name",t),void(Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):Error.call(this))):new n(r)}return c(n,Error),n}function o(t){return this instanceof o?(f(this,"name","OperationalError"),f(this,"message",t),this.cause=t,this.isOperational=!0,void(t instanceof Error?(f(this,"message",t.message),f(this,"stack",t.stack)):Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor))):new o(t)}var i,a,s=t("./es5"),u=s.freeze,l=t("./util"),c=l.inherits,f=l.notEnumerableProp,p=r("Warning","warning"),h=r("CancellationError","cancellation error"),d=r("TimeoutError","timeout error"),v=r("AggregateError","aggregate error");try{i=TypeError,a=RangeError}catch(t){i=r("TypeError","type error"),a=r("RangeError","range error")}for(var m="join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "),_=0;_<m.length;++_)"function"==typeof Array.prototype[m[_]]&&(v.prototype[m[_]]=Array.prototype[m[_]]);s.defineProperty(v.prototype,"length",{value:0,configurable:!1,writable:!0,enumerable:!0}),v.prototype.isOperational=!0;var g=0;v.prototype.toString=function(){var t=Array(4*g+1).join(" "),e="\n"+t+"AggregateError of:\n";g++,t=Array(4*g+1).join(" ");for(var n=0;n<this.length;++n){for(var r=this[n]===this?"[Circular AggregateError]":this[n]+"",o=r.split("\n"),i=0;i<o.length;++i)o[i]=t+o[i];r=o.join("\n"),e+=r+"\n"}return g--,e},c(o,Error);var y=Error.__BluebirdErrorTypes__;y||(y=u({CancellationError:h,TimeoutError:d,OperationalError:o,RejectionError:o,AggregateError:v}),s.defineProperty(Error,"__BluebirdErrorTypes__",{value:y,writable:!1,enumerable:!1,configurable:!1})),e.exports={Error:Error,TypeError:i,RangeError:a,CancellationError:y.CancellationError,OperationalError:y.OperationalError,TimeoutError:y.TimeoutError,AggregateError:y.AggregateError,Warning:p}},{"./es5":13,"./util":36}],13:[function(t,e,n){var r=function(){"use strict";return void 0===this}();if(r)e.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:r,propertyIsWritable:function(t,e){var n=Object.getOwnPropertyDescriptor(t,e);return!(n&&!n.writable&&!n.set)}};else{var o={}.hasOwnProperty,i={}.toString,a={}.constructor.prototype,s=function(t){var e=[];for(var n in t)o.call(t,n)&&e.push(n);return e},u=function(t,e){return{value:t[e]}},l=function(t,e,n){return t[e]=n.value,t},c=function(t){return t},f=function(t){try{return Object(t).constructor.prototype}catch(t){return a}},p=function(t){try{return"[object Array]"===i.call(t)}catch(t){return!1}};e.exports={isArray:p,keys:s,names:s,defineProperty:l,getDescriptor:u,freeze:c,getPrototypeOf:f,isES5:r,propertyIsWritable:function(){return!0}}}},{}],14:[function(t,e,n){"use strict";e.exports=function(t,e){var n=t.map;t.prototype.filter=function(t,r){return n(this,t,r,e)},t.filter=function(t,r,o){return n(t,r,o,e)}}},{}],15:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,e,n){this.promise=t,this.type=e,this.handler=n,this.called=!1,this.cancelPromise=null}function o(t){this.finallyHandler=t}function i(t,e){return null!=t.cancelPromise&&(arguments.length>1?t.cancelPromise._reject(e):t.cancelPromise._cancel(),t.cancelPromise=null,!0)}function a(){return u.call(this,this.promise._target()._settledValue())}function s(t){if(!i(this,t))return f.e=t,f}function u(t){var r=this.promise,u=this.handler;if(!this.called){this.called=!0;var l=this.isFinallyHandler()?u.call(r._boundValue()):u.call(r._boundValue(),t);if(void 0!==l){r._setReturnedNonUndefined();var p=n(l,r);if(p instanceof e){if(null!=this.cancelPromise){if(p._isCancelled()){var h=new c("late cancellation observer");return r._attachExtraTrace(h),f.e=h,f}p.isPending()&&p._attachCancellationCallback(new o(this))}return p._then(a,s,void 0,this,void 0)}}}return r.isRejected()?(i(this),f.e=t,f):(i(this),t)}var l=t("./util"),c=e.CancellationError,f=l.errorObj;return r.prototype.isFinallyHandler=function(){return 0===this.type},o.prototype._resultCancelled=function(){i(this.finallyHandler)},e.prototype._passThrough=function(t,e,n,o){return"function"!=typeof t?this.then():this._then(n,o,void 0,new r(this,e,t),void 0)},e.prototype.lastly=e.prototype.finally=function(t){return this._passThrough(t,0,u,u)},e.prototype.tap=function(t){return this._passThrough(t,1,u)},r}},{"./util":36}],16:[function(t,e,n){"use strict";e.exports=function(e,n,r,o,i,a){function s(t,n,r){for(var i=0;i<n.length;++i){r._pushContext();var a=h(n[i])(t);if(r._popContext(),a===p){r._pushContext();var s=e.reject(p.e);return r._popContext(),s}var u=o(a,r);if(u instanceof e)return u}return null}function u(t,n,o,i){if(a.cancellation()){var s=new e(r),u=this._finallyPromise=new e(r);this._promise=s.lastly(function(){return u}),s._captureStackTrace(),s._setOnCancel(this)}else{var l=this._promise=new e(r);l._captureStackTrace()}this._stack=i,this._generatorFunction=t,this._receiver=n,this._generator=void 0,this._yieldHandlers="function"==typeof o?[o].concat(d):d,this._yieldedPromise=null,this._cancellationPhase=!1}var l=t("./errors"),c=l.TypeError,f=t("./util"),p=f.errorObj,h=f.tryCatch,d=[];f.inherits(u,i),u.prototype._isResolved=function(){return null===this._promise},u.prototype._cleanup=function(){this._promise=this._generator=null,a.cancellation()&&null!==this._finallyPromise&&(this._finallyPromise._fulfill(),this._finallyPromise=null)},u.prototype._promiseCancelled=function(){if(!this._isResolved()){var t,n="undefined"!=typeof this._generator.return;if(n)this._promise._pushContext(),t=h(this._generator.return).call(this._generator,void 0),this._promise._popContext();else{var r=new e.CancellationError("generator .return() sentinel");e.coroutine.returnSentinel=r,this._promise._attachExtraTrace(r),this._promise._pushContext(),t=h(this._generator.throw).call(this._generator,r),this._promise._popContext()}this._cancellationPhase=!0,this._yieldedPromise=null,this._continue(t)}},u.prototype._promiseFulfilled=function(t){this._yieldedPromise=null,this._promise._pushContext();var e=h(this._generator.next).call(this._generator,t);this._promise._popContext(),this._continue(e)},u.prototype._promiseRejected=function(t){this._yieldedPromise=null,this._promise._attachExtraTrace(t),this._promise._pushContext();var e=h(this._generator.throw).call(this._generator,t);this._promise._popContext(),this._continue(e)},u.prototype._resultCancelled=function(){if(this._yieldedPromise instanceof e){var t=this._yieldedPromise;this._yieldedPromise=null,t.cancel()}},u.prototype.promise=function(){return this._promise},u.prototype._run=function(){this._generator=this._generatorFunction.call(this._receiver),this._receiver=this._generatorFunction=void 0,this._promiseFulfilled(void 0)},u.prototype._continue=function(t){var n=this._promise;if(t===p)return this._cleanup(),this._cancellationPhase?n.cancel():n._rejectCallback(t.e,!1);var r=t.value;if(t.done===!0)return this._cleanup(),this._cancellationPhase?n.cancel():n._resolveCallback(r);var i=o(r,this._promise);if(!(i instanceof e)&&(i=s(i,this._yieldHandlers,this._promise),null===i))return void this._promiseRejected(new c("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s",r)+"From coroutine:\n"+this._stack.split("\n").slice(1,-7).join("\n")));i=i._target();var a=i._bitField;0===(50397184&a)?(this._yieldedPromise=i,i._proxy(this,null)):0!==(33554432&a)?e._async.invoke(this._promiseFulfilled,this,i._value()):0!==(16777216&a)?e._async.invoke(this._promiseRejected,this,i._reason()):this._promiseCancelled()},e.coroutine=function(t,e){if("function"!=typeof t)throw new c("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var n=Object(e).yieldHandler,r=u,o=(new Error).stack;return function(){var e=t.apply(this,arguments),i=new r(void 0,void 0,n,o),a=i.promise();return i._generator=e,i._promiseFulfilled(void 0),a}},e.coroutine.addYieldHandler=function(t){if("function"!=typeof t)throw new c("expecting a function but got "+f.classString(t));d.push(t)},e.spawn=function(t){if(a.deprecated("Promise.spawn()","Promise.coroutine()"),"function"!=typeof t)return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");var r=new u(t,this),o=r.promise();return r._run(e.spawn),o}}},{"./errors":12,"./util":36}],17:[function(t,e,n){"use strict";e.exports=function(e,n,r,o,i,a){var s=t("./util");s.canEvaluate,s.tryCatch,s.errorObj;e.join=function(){var t,e=arguments.length-1;if(e>0&&"function"==typeof arguments[e]){t=arguments[e];var r}var o=[].slice.call(arguments);t&&o.pop();var r=new n(o).promise();return void 0!==t?r.spread(t):r}}},{"./util":36}],18:[function(t,e,n){"use strict";e.exports=function(e,n,r,o,i,a){function s(t,e,n,r){this.constructor$(t),this._promise._captureStackTrace();var o=l();this._callback=null===o?e:c.domainBind(o,e),this._preservedValues=r===i?new Array(this.length()):null,this._limit=n,this._inFlight=0,this._queue=[],h.invoke(this._asyncInit,this,void 0)}function u(t,n,o,i){if("function"!=typeof n)return r("expecting a function but got "+c.classString(n));var a=0;if(void 0!==o){if("object"!=typeof o||null===o)return e.reject(new TypeError("options argument must be an object but it is "+c.classString(o)));if("number"!=typeof o.concurrency)return e.reject(new TypeError("'concurrency' must be a number but it is "+c.classString(o.concurrency)));a=o.concurrency}return a="number"==typeof a&&isFinite(a)&&a>=1?a:0,new s(t,n,a,i).promise()}var l=e._getDomain,c=t("./util"),f=c.tryCatch,p=c.errorObj,h=e._async;c.inherits(s,n),s.prototype._asyncInit=function(){this._init$(void 0,-2)},s.prototype._init=function(){},s.prototype._promiseFulfilled=function(t,n){var r=this._values,i=this.length(),s=this._preservedValues,u=this._limit;if(n<0){if(n=n*-1-1,r[n]=t,u>=1&&(this._inFlight--,this._drainQueue(),this._isResolved()))return!0}else{if(u>=1&&this._inFlight>=u)return r[n]=t,this._queue.push(n),!1;null!==s&&(s[n]=t);var l=this._promise,c=this._callback,h=l._boundValue();l._pushContext();var d=f(c).call(h,t,n,i),v=l._popContext();if(a.checkForgottenReturns(d,v,null!==s?"Promise.filter":"Promise.map",l),d===p)return this._reject(d.e),!0;var m=o(d,this._promise);if(m instanceof e){m=m._target();var _=m._bitField;if(0===(50397184&_))return u>=1&&this._inFlight++,r[n]=m,m._proxy(this,(n+1)*-1),!1;if(0===(33554432&_))return 0!==(16777216&_)?(this._reject(m._reason()),!0):(this._cancel(),!0);d=m._value()}r[n]=d}var g=++this._totalResolved;return g>=i&&(null!==s?this._filter(r,s):this._resolve(r),!0)},s.prototype._drainQueue=function(){for(var t=this._queue,e=this._limit,n=this._values;t.length>0&&this._inFlight<e;){if(this._isResolved())return;var r=t.pop();this._promiseFulfilled(n[r],r)}},s.prototype._filter=function(t,e){for(var n=e.length,r=new Array(n),o=0,i=0;i<n;++i)t[i]&&(r[o++]=e[i]);r.length=o,this._resolve(r)},s.prototype.preservedValues=function(){return this._preservedValues},e.prototype.map=function(t,e){return u(this,t,e,null)},e.map=function(t,e,n,r){return u(t,e,n,r)}}},{"./util":36}],19:[function(t,e,n){"use strict";e.exports=function(e,n,r,o,i){var a=t("./util"),s=a.tryCatch;e.method=function(t){if("function"!=typeof t)throw new e.TypeError("expecting a function but got "+a.classString(t));return function(){var r=new e(n);r._captureStackTrace(),r._pushContext();var o=s(t).apply(this,arguments),a=r._popContext();return i.checkForgottenReturns(o,a,"Promise.method",r),r._resolveFromSyncValue(o),r}},e.attempt=e.try=function(t){if("function"!=typeof t)return o("expecting a function but got "+a.classString(t));var r=new e(n);r._captureStackTrace(),r._pushContext();var u;if(arguments.length>1){i.deprecated("calling Promise.try with more than 1 argument");var l=arguments[1],c=arguments[2];u=a.isArray(l)?s(t).apply(c,l):s(t).call(c,l)}else u=s(t)();var f=r._popContext();return i.checkForgottenReturns(u,f,"Promise.try",r),r._resolveFromSyncValue(u),r},e.prototype._resolveFromSyncValue=function(t){t===a.errorObj?this._rejectCallback(t.e,!1):this._resolveCallback(t,!0)}}},{"./util":36}],20:[function(t,e,n){"use strict";function r(t){return t instanceof Error&&c.getPrototypeOf(t)===Error.prototype}function o(t){var e;if(r(t)){e=new l(t),e.name=t.name,e.message=t.message,e.stack=t.stack;for(var n=c.keys(t),o=0;o<n.length;++o){var i=n[o];f.test(i)||(e[i]=t[i])}return e}return a.markAsOriginatingFromRejection(t),t}function i(t,e){return function(n,r){if(null!==t){if(n){var i=o(s(n));t._attachExtraTrace(i),t._reject(i)}else if(e){var a=[].slice.call(arguments,1);t._fulfill(a)}else t._fulfill(r);t=null}}}var a=t("./util"),s=a.maybeWrapAsError,u=t("./errors"),l=u.OperationalError,c=t("./es5"),f=/^(?:name|message|stack|cause)$/;e.exports=i},{"./errors":12,"./es5":13,"./util":36}],21:[function(t,e,n){"use strict";e.exports=function(e){function n(t,e){var n=this;if(!i.isArray(t))return r.call(n,t,e);var o=s(e).apply(n._boundValue(),[null].concat(t));o===u&&a.throwLater(o.e)}function r(t,e){var n=this,r=n._boundValue(),o=void 0===t?s(e).call(r,null):s(e).call(r,null,t);o===u&&a.throwLater(o.e)}function o(t,e){var n=this;if(!t){var r=new Error(t+"");r.cause=t,t=r}var o=s(e).call(n._boundValue(),t);o===u&&a.throwLater(o.e)}var i=t("./util"),a=e._async,s=i.tryCatch,u=i.errorObj;e.prototype.asCallback=e.prototype.nodeify=function(t,e){if("function"==typeof t){var i=r;void 0!==e&&Object(e).spread&&(i=n),this._then(i,o,void 0,this,t)}return this}}},{"./util":36}],22:[function(t,n,r){"use strict";n.exports=function(){function r(){}function o(t,e){if("function"!=typeof e)throw new y("expecting a function but got "+d.classString(e));if(t.constructor!==i)throw new y("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n")}function i(t){this._bitField=0,this._fulfillmentHandler0=void 0,this._rejectionHandler0=void 0,this._promise0=void 0,this._receiver0=void 0,t!==w&&(o(this,t),this._resolveFromExecutor(t)),this._promiseCreated(),this._fireEvent("promiseCreated",this)}function a(t){this.promise._resolveCallback(t)}function s(t){this.promise._rejectCallback(t,!1)}function u(t){var e=new i(w);e._fulfillmentHandler0=t,e._rejectionHandler0=t,e._promise0=t,e._receiver0=t}var l,c=function(){return new y("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")},f=function(){return new i.PromiseInspection(this._target())},p=function(t){return i.reject(new y(t))},h={},d=t("./util");l=d.isNode?function(){var t=e.domain;return void 0===t&&(t=null),t}:function(){return null},d.notEnumerableProp(i,"_getDomain",l);var v=t("./es5"),m=t("./async"),_=new m;v.defineProperty(i,"_async",{value:_});var g=t("./errors"),y=i.TypeError=g.TypeError;i.RangeError=g.RangeError;var b=i.CancellationError=g.CancellationError;i.TimeoutError=g.TimeoutError,i.OperationalError=g.OperationalError,i.RejectionError=g.OperationalError,i.AggregateError=g.AggregateError;var w=function(){},x={},E={},T=t("./thenables")(i,w),O=t("./promise_array")(i,w,T,p,r),S=t("./context")(i),P=S.create,M=t("./debuggability")(i,S),j=(M.CapturedTrace,t("./finally")(i,T)),A=t("./catch_filter")(E),C=t("./nodeback"),k=d.errorObj,R=d.tryCatch;return i.prototype.toString=function(){return"[object Promise]"},i.prototype.caught=i.prototype.catch=function(t){var e=arguments.length;
if(e>1){var n,r=new Array(e-1),o=0;for(n=0;n<e-1;++n){var i=arguments[n];if(!d.isObject(i))return p("expecting an object but got A catch statement predicate "+d.classString(i));r[o++]=i}return r.length=o,t=arguments[n],this.then(void 0,A(r,t,this))}return this.then(void 0,t)},i.prototype.reflect=function(){return this._then(f,f,void 0,this,void 0)},i.prototype.then=function(t,e){if(M.warnings()&&arguments.length>0&&"function"!=typeof t&&"function"!=typeof e){var n=".then() only accepts functions but was passed: "+d.classString(t);arguments.length>1&&(n+=", "+d.classString(e)),this._warn(n)}return this._then(t,e,void 0,void 0,void 0)},i.prototype.done=function(t,e){var n=this._then(t,e,void 0,void 0,void 0);n._setIsFinal()},i.prototype.spread=function(t){return"function"!=typeof t?p("expecting a function but got "+d.classString(t)):this.all()._then(t,void 0,void 0,x,void 0)},i.prototype.toJSON=function(){var t={isFulfilled:!1,isRejected:!1,fulfillmentValue:void 0,rejectionReason:void 0};return this.isFulfilled()?(t.fulfillmentValue=this.value(),t.isFulfilled=!0):this.isRejected()&&(t.rejectionReason=this.reason(),t.isRejected=!0),t},i.prototype.all=function(){return arguments.length>0&&this._warn(".all() was passed arguments but it does not take any"),new O(this).promise()},i.prototype.error=function(t){return this.caught(d.originatesFromRejection,t)},i.getNewLibraryCopy=n.exports,i.is=function(t){return t instanceof i},i.fromNode=i.fromCallback=function(t){var e=new i(w);e._captureStackTrace();var n=arguments.length>1&&!!Object(arguments[1]).multiArgs,r=R(t)(C(e,n));return r===k&&e._rejectCallback(r.e,!0),e._isFateSealed()||e._setAsyncGuaranteed(),e},i.all=function(t){return new O(t).promise()},i.cast=function(t){var e=T(t);return e instanceof i||(e=new i(w),e._captureStackTrace(),e._setFulfilled(),e._rejectionHandler0=t),e},i.resolve=i.fulfilled=i.cast,i.reject=i.rejected=function(t){var e=new i(w);return e._captureStackTrace(),e._rejectCallback(t,!0),e},i.setScheduler=function(t){if("function"!=typeof t)throw new y("expecting a function but got "+d.classString(t));return _.setScheduler(t)},i.prototype._then=function(t,e,n,r,o){var a=void 0!==o,s=a?o:new i(w),u=this._target(),c=u._bitField;a||(s._propagateFrom(this,3),s._captureStackTrace(),void 0===r&&0!==(2097152&this._bitField)&&(r=0!==(50397184&c)?this._boundValue():u===this?void 0:this._boundTo),this._fireEvent("promiseChained",this,s));var f=l();if(0!==(50397184&c)){var p,h,v=u._settlePromiseCtx;0!==(33554432&c)?(h=u._rejectionHandler0,p=t):0!==(16777216&c)?(h=u._fulfillmentHandler0,p=e,u._unsetRejectionIsUnhandled()):(v=u._settlePromiseLateCancellationObserver,h=new b("late cancellation observer"),u._attachExtraTrace(h),p=e),_.invoke(v,u,{handler:null===f?p:"function"==typeof p&&d.domainBind(f,p),promise:s,receiver:r,value:h})}else u._addCallbacks(t,e,s,r,f);return s},i.prototype._length=function(){return 65535&this._bitField},i.prototype._isFateSealed=function(){return 0!==(117506048&this._bitField)},i.prototype._isFollowing=function(){return 67108864===(67108864&this._bitField)},i.prototype._setLength=function(t){this._bitField=this._bitField&-65536|65535&t},i.prototype._setFulfilled=function(){this._bitField=33554432|this._bitField,this._fireEvent("promiseFulfilled",this)},i.prototype._setRejected=function(){this._bitField=16777216|this._bitField,this._fireEvent("promiseRejected",this)},i.prototype._setFollowing=function(){this._bitField=67108864|this._bitField,this._fireEvent("promiseResolved",this)},i.prototype._setIsFinal=function(){this._bitField=4194304|this._bitField},i.prototype._isFinal=function(){return(4194304&this._bitField)>0},i.prototype._unsetCancelled=function(){this._bitField=this._bitField&-65537},i.prototype._setCancelled=function(){this._bitField=65536|this._bitField,this._fireEvent("promiseCancelled",this)},i.prototype._setWillBeCancelled=function(){this._bitField=8388608|this._bitField},i.prototype._setAsyncGuaranteed=function(){_.hasCustomScheduler()||(this._bitField=134217728|this._bitField)},i.prototype._receiverAt=function(t){var e=0===t?this._receiver0:this[4*t-4+3];if(e!==h)return void 0===e&&this._isBound()?this._boundValue():e},i.prototype._promiseAt=function(t){return this[4*t-4+2]},i.prototype._fulfillmentHandlerAt=function(t){return this[4*t-4+0]},i.prototype._rejectionHandlerAt=function(t){return this[4*t-4+1]},i.prototype._boundValue=function(){},i.prototype._migrateCallback0=function(t){var e=(t._bitField,t._fulfillmentHandler0),n=t._rejectionHandler0,r=t._promise0,o=t._receiverAt(0);void 0===o&&(o=h),this._addCallbacks(e,n,r,o,null)},i.prototype._migrateCallbackAt=function(t,e){var n=t._fulfillmentHandlerAt(e),r=t._rejectionHandlerAt(e),o=t._promiseAt(e),i=t._receiverAt(e);void 0===i&&(i=h),this._addCallbacks(n,r,o,i,null)},i.prototype._addCallbacks=function(t,e,n,r,o){var i=this._length();if(i>=65531&&(i=0,this._setLength(0)),0===i)this._promise0=n,this._receiver0=r,"function"==typeof t&&(this._fulfillmentHandler0=null===o?t:d.domainBind(o,t)),"function"==typeof e&&(this._rejectionHandler0=null===o?e:d.domainBind(o,e));else{var a=4*i-4;this[a+2]=n,this[a+3]=r,"function"==typeof t&&(this[a+0]=null===o?t:d.domainBind(o,t)),"function"==typeof e&&(this[a+1]=null===o?e:d.domainBind(o,e))}return this._setLength(i+1),i},i.prototype._proxy=function(t,e){this._addCallbacks(void 0,void 0,e,t,null)},i.prototype._resolveCallback=function(t,e){if(0===(117506048&this._bitField)){if(t===this)return this._rejectCallback(c(),!1);var n=T(t,this);if(!(n instanceof i))return this._fulfill(t);e&&this._propagateFrom(n,2);var r=n._target();if(r===this)return void this._reject(c());var o=r._bitField;if(0===(50397184&o)){var a=this._length();a>0&&r._migrateCallback0(this);for(var s=1;s<a;++s)r._migrateCallbackAt(this,s);this._setFollowing(),this._setLength(0),this._setFollowee(r)}else if(0!==(33554432&o))this._fulfill(r._value());else if(0!==(16777216&o))this._reject(r._reason());else{var u=new b("late cancellation observer");r._attachExtraTrace(u),this._reject(u)}}},i.prototype._rejectCallback=function(t,e,n){var r=d.ensureErrorObject(t),o=r===t;if(!o&&!n&&M.warnings()){var i="a promise was rejected with a non-error: "+d.classString(t);this._warn(i,!0)}this._attachExtraTrace(r,!!e&&o),this._reject(t)},i.prototype._resolveFromExecutor=function(t){var e=this;this._captureStackTrace(),this._pushContext();var n=!0,r=this._execute(t,function(t){e._resolveCallback(t)},function(t){e._rejectCallback(t,n)});n=!1,this._popContext(),void 0!==r&&e._rejectCallback(r,!0)},i.prototype._settlePromiseFromHandler=function(t,e,n,r){var o=r._bitField;if(0===(65536&o)){r._pushContext();var i;e===x?n&&"number"==typeof n.length?i=R(t).apply(this._boundValue(),n):(i=k,i.e=new y("cannot .spread() a non-array: "+d.classString(n))):i=R(t).call(e,n);var a=r._popContext();o=r._bitField,0===(65536&o)&&(i===E?r._reject(n):i===k?r._rejectCallback(i.e,!1):(M.checkForgottenReturns(i,a,"",r,this),r._resolveCallback(i)))}},i.prototype._target=function(){for(var t=this;t._isFollowing();)t=t._followee();return t},i.prototype._followee=function(){return this._rejectionHandler0},i.prototype._setFollowee=function(t){this._rejectionHandler0=t},i.prototype._settlePromise=function(t,e,n,o){var a=t instanceof i,s=this._bitField,u=0!==(134217728&s);0!==(65536&s)?(a&&t._invokeInternalOnCancel(),n instanceof j&&n.isFinallyHandler()?(n.cancelPromise=t,R(e).call(n,o)===k&&t._reject(k.e)):e===f?t._fulfill(f.call(n)):n instanceof r?n._promiseCancelled(t):a||t instanceof O?t._cancel():n.cancel()):"function"==typeof e?a?(u&&t._setAsyncGuaranteed(),this._settlePromiseFromHandler(e,n,o,t)):e.call(n,o,t):n instanceof r?n._isResolved()||(0!==(33554432&s)?n._promiseFulfilled(o,t):n._promiseRejected(o,t)):a&&(u&&t._setAsyncGuaranteed(),0!==(33554432&s)?t._fulfill(o):t._reject(o))},i.prototype._settlePromiseLateCancellationObserver=function(t){var e=t.handler,n=t.promise,r=t.receiver,o=t.value;"function"==typeof e?n instanceof i?this._settlePromiseFromHandler(e,r,o,n):e.call(r,o,n):n instanceof i&&n._reject(o)},i.prototype._settlePromiseCtx=function(t){this._settlePromise(t.promise,t.handler,t.receiver,t.value)},i.prototype._settlePromise0=function(t,e,n){var r=this._promise0,o=this._receiverAt(0);this._promise0=void 0,this._receiver0=void 0,this._settlePromise(r,t,o,e)},i.prototype._clearCallbackDataAtIndex=function(t){var e=4*t-4;this[e+2]=this[e+3]=this[e+0]=this[e+1]=void 0},i.prototype._fulfill=function(t){var e=this._bitField;if(!((117506048&e)>>>16)){if(t===this){var n=c();return this._attachExtraTrace(n),this._reject(n)}this._setFulfilled(),this._rejectionHandler0=t,(65535&e)>0&&(0!==(134217728&e)?this._settlePromises():_.settlePromises(this))}},i.prototype._reject=function(t){var e=this._bitField;if(!((117506048&e)>>>16))return this._setRejected(),this._fulfillmentHandler0=t,this._isFinal()?_.fatalError(t,d.isNode):void((65535&e)>0?_.settlePromises(this):this._ensurePossibleRejectionHandled())},i.prototype._fulfillPromises=function(t,e){for(var n=1;n<t;n++){var r=this._fulfillmentHandlerAt(n),o=this._promiseAt(n),i=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(o,r,i,e)}},i.prototype._rejectPromises=function(t,e){for(var n=1;n<t;n++){var r=this._rejectionHandlerAt(n),o=this._promiseAt(n),i=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(o,r,i,e)}},i.prototype._settlePromises=function(){var t=this._bitField,e=65535&t;if(e>0){if(0!==(16842752&t)){var n=this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0,n,t),this._rejectPromises(e,n)}else{var r=this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0,r,t),this._fulfillPromises(e,r)}this._setLength(0)}this._clearCancellationData()},i.prototype._settledValue=function(){var t=this._bitField;return 0!==(33554432&t)?this._rejectionHandler0:0!==(16777216&t)?this._fulfillmentHandler0:void 0},i.defer=i.pending=function(){M.deprecated("Promise.defer","new Promise");var t=new i(w);return{promise:t,resolve:a,reject:s}},d.notEnumerableProp(i,"_makeSelfResolutionError",c),t("./method")(i,w,T,p,M),t("./bind")(i,w,T,M),t("./cancel")(i,O,p,M),t("./direct_resolve")(i),t("./synchronous_inspection")(i),t("./join")(i,O,T,w,_,l),i.Promise=i,i.version="3.4.7",t("./map.js")(i,O,p,T,w,M),t("./call_get.js")(i),t("./using.js")(i,p,T,P,w,M),t("./timers.js")(i,w,M),t("./generators.js")(i,p,w,T,r,M),t("./nodeify.js")(i),t("./promisify.js")(i,w),t("./props.js")(i,O,T,p),t("./race.js")(i,w,T,p),t("./reduce.js")(i,O,p,T,w,M),t("./settle.js")(i,O,M),t("./some.js")(i,O,p),t("./filter.js")(i,w),t("./each.js")(i,w),t("./any.js")(i),d.toFastProperties(i),d.toFastProperties(i.prototype),u({a:1}),u({b:2}),u({c:3}),u(1),u(function(){}),u(void 0),u(!1),u(new i(w)),M.setBounds(m.firstLineError,d.lastLineError),i}},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(t,e,n){"use strict";e.exports=function(e,n,r,o,i){function a(t){switch(t){case-2:return[];case-3:return{}}}function s(t){var r=this._promise=new e(n);t instanceof e&&r._propagateFrom(t,3),r._setOnCancel(this),this._values=t,this._length=0,this._totalResolved=0,this._init(void 0,-2)}var u=t("./util");u.isArray;return u.inherits(s,i),s.prototype.length=function(){return this._length},s.prototype.promise=function(){return this._promise},s.prototype._init=function t(n,i){var s=r(this._values,this._promise);if(s instanceof e){s=s._target();var l=s._bitField;if(this._values=s,0===(50397184&l))return this._promise._setAsyncGuaranteed(),s._then(t,this._reject,void 0,this,i);if(0===(33554432&l))return 0!==(16777216&l)?this._reject(s._reason()):this._cancel();s=s._value()}if(s=u.asArray(s),null===s){var c=o("expecting an array or an iterable object but got "+u.classString(s)).reason();return void this._promise._rejectCallback(c,!1)}return 0===s.length?void(i===-5?this._resolveEmptyArray():this._resolve(a(i))):void this._iterate(s)},s.prototype._iterate=function(t){var n=this.getActualLength(t.length);this._length=n,this._values=this.shouldCopyValues()?new Array(n):this._values;for(var o=this._promise,i=!1,a=null,s=0;s<n;++s){var u=r(t[s],o);u instanceof e?(u=u._target(),a=u._bitField):a=null,i?null!==a&&u.suppressUnhandledRejections():null!==a?0===(50397184&a)?(u._proxy(this,s),this._values[s]=u):i=0!==(33554432&a)?this._promiseFulfilled(u._value(),s):0!==(16777216&a)?this._promiseRejected(u._reason(),s):this._promiseCancelled(s):i=this._promiseFulfilled(u,s)}i||o._setAsyncGuaranteed()},s.prototype._isResolved=function(){return null===this._values},s.prototype._resolve=function(t){this._values=null,this._promise._fulfill(t)},s.prototype._cancel=function(){!this._isResolved()&&this._promise._isCancellable()&&(this._values=null,this._promise._cancel())},s.prototype._reject=function(t){this._values=null,this._promise._rejectCallback(t,!1)},s.prototype._promiseFulfilled=function(t,e){this._values[e]=t;var n=++this._totalResolved;return n>=this._length&&(this._resolve(this._values),!0)},s.prototype._promiseCancelled=function(){return this._cancel(),!0},s.prototype._promiseRejected=function(t){return this._totalResolved++,this._reject(t),!0},s.prototype._resultCancelled=function(){if(!this._isResolved()){var t=this._values;if(this._cancel(),t instanceof e)t.cancel();else for(var n=0;n<t.length;++n)t[n]instanceof e&&t[n].cancel()}},s.prototype.shouldCopyValues=function(){return!0},s.prototype.getActualLength=function(t){return t},s}},{"./util":36}],24:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t){return!x.test(t)}function o(t){try{return t.__isPromisified__===!0}catch(t){return!1}}function i(t,e,n){var r=h.getDataPropertyOrDefault(t,e+n,b);return!!r&&o(r)}function a(t,e,n){for(var r=0;r<t.length;r+=2){var o=t[r];if(n.test(o))for(var i=o.replace(n,""),a=0;a<t.length;a+=2)if(t[a]===i)throw new g("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s",e))}}function s(t,e,n,r){for(var s=h.inheritedDataKeys(t),u=[],l=0;l<s.length;++l){var c=s[l],f=t[c],p=r===E||E(c,f,t);"function"!=typeof f||o(f)||i(t,c,e)||!r(c,f,t,p)||u.push(c,f)}return a(u,e,n),u}function u(t,r,o,i,a,s){function u(){var o=r;r===p&&(o=this);var i=new e(n);i._captureStackTrace();var a="string"==typeof c&&this!==l?this[c]:t,u=d(i,s);try{a.apply(o,v(arguments,u))}catch(t){i._rejectCallback(m(t),!0,!0)}return i._isFateSealed()||i._setAsyncGuaranteed(),i}var l=function(){return this}(),c=t;return"string"==typeof c&&(t=i),h.notEnumerableProp(u,"__isPromisified__",!0),u}function l(t,e,n,r,o){for(var i=new RegExp(T(e)+"$"),a=s(t,e,i,n),u=0,l=a.length;u<l;u+=2){var c=a[u],f=a[u+1],d=c+e;if(r===O)t[d]=O(c,p,c,f,e,o);else{var v=r(f,function(){return O(c,p,c,f,e,o)});h.notEnumerableProp(v,"__isPromisified__",!0),t[d]=v}}return h.toFastProperties(t),t}function c(t,e,n){return O(t,e,void 0,t,null,n)}var f,p={},h=t("./util"),d=t("./nodeback"),v=h.withAppended,m=h.maybeWrapAsError,_=h.canEvaluate,g=t("./errors").TypeError,y="Async",b={__isPromisified__:!0},w=["arity","length","name","arguments","caller","callee","prototype","__isPromisified__"],x=new RegExp("^(?:"+w.join("|")+")$"),E=function(t){return h.isIdentifier(t)&&"_"!==t.charAt(0)&&"constructor"!==t},T=function(t){return t.replace(/([$])/,"\\$")},O=_?f:u;e.promisify=function(t,e){if("function"!=typeof t)throw new g("expecting a function but got "+h.classString(t));if(o(t))return t;e=Object(e);var n=void 0===e.context?p:e.context,i=!!e.multiArgs,a=c(t,n,i);return h.copyDescriptors(t,a,r),a},e.promisifyAll=function(t,e){if("function"!=typeof t&&"object"!=typeof t)throw new g("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");e=Object(e);var n=!!e.multiArgs,r=e.suffix;"string"!=typeof r&&(r=y);var o=e.filter;"function"!=typeof o&&(o=E);var i=e.promisifier;if("function"!=typeof i&&(i=O),!h.isIdentifier(r))throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");for(var a=h.inheritedDataKeys(t),s=0;s<a.length;++s){var u=t[a[s]];"constructor"!==a[s]&&h.isClass(u)&&(l(u.prototype,r,o,i,n),l(u,r,o,i,n))}return l(t,r,o,i,n)}}},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(t,e,n){"use strict";e.exports=function(e,n,r,o){function i(t){var e,n=!1;if(void 0!==s&&t instanceof s)e=f(t),n=!0;else{var r=c.keys(t),o=r.length;e=new Array(2*o);for(var i=0;i<o;++i){var a=r[i];e[i]=t[a],e[i+o]=a}}this.constructor$(e),this._isMap=n,this._init$(void 0,-3)}function a(t){var n,a=r(t);return l(a)?(n=a instanceof e?a._then(e.props,void 0,void 0,void 0,void 0):new i(a).promise(),a instanceof e&&n._propagateFrom(a,2),n):o("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n")}var s,u=t("./util"),l=u.isObject,c=t("./es5");"function"==typeof Map&&(s=Map);var f=function(){function t(t,r){this[e]=t,this[e+n]=r,e++}var e=0,n=0;return function(r){n=r.size,e=0;var o=new Array(2*r.size);return r.forEach(t,o),o}}(),p=function(t){for(var e=new s,n=t.length/2|0,r=0;r<n;++r){var o=t[n+r],i=t[r];e.set(o,i)}return e};u.inherits(i,n),i.prototype._init=function(){},i.prototype._promiseFulfilled=function(t,e){this._values[e]=t;var n=++this._totalResolved;if(n>=this._length){var r;if(this._isMap)r=p(this._values);else{r={};for(var o=this.length(),i=0,a=this.length();i<a;++i)r[this._values[i+o]]=this._values[i]}return this._resolve(r),!0}return!1},i.prototype.shouldCopyValues=function(){return!1},i.prototype.getActualLength=function(t){return t>>1},e.prototype.props=function(){return a(this)},e.props=function(t){return a(t)}}},{"./es5":13,"./util":36}],26:[function(t,e,n){"use strict";function r(t,e,n,r,o){for(var i=0;i<o;++i)n[i+r]=t[i+e],t[i+e]=void 0}function o(t){this._capacity=t,this._length=0,this._front=0}o.prototype._willBeOverCapacity=function(t){return this._capacity<t},o.prototype._pushOne=function(t){var e=this.length();this._checkCapacity(e+1);var n=this._front+e&this._capacity-1;this[n]=t,this._length=e+1},o.prototype.push=function(t,e,n){var r=this.length()+3;if(this._willBeOverCapacity(r))return this._pushOne(t),this._pushOne(e),void this._pushOne(n);var o=this._front+r-3;this._checkCapacity(r);var i=this._capacity-1;this[o+0&i]=t,this[o+1&i]=e,this[o+2&i]=n,this._length=r},o.prototype.shift=function(){var t=this._front,e=this[t];return this[t]=void 0,this._front=t+1&this._capacity-1,this._length--,e},o.prototype.length=function(){return this._length},o.prototype._checkCapacity=function(t){this._capacity<t&&this._resizeTo(this._capacity<<1)},o.prototype._resizeTo=function(t){var e=this._capacity;this._capacity=t;var n=this._front,o=this._length,i=n+o&e-1;r(this,0,this,e,i)},e.exports=o},{}],27:[function(t,e,n){"use strict";e.exports=function(e,n,r,o){function i(t,i){var u=r(t);if(u instanceof e)return s(u);if(t=a.asArray(t),null===t)return o("expecting an array or an iterable object but got "+a.classString(t));var l=new e(n);void 0!==i&&l._propagateFrom(i,3);for(var c=l._fulfill,f=l._reject,p=0,h=t.length;p<h;++p){var d=t[p];(void 0!==d||p in t)&&e.cast(d)._then(c,f,void 0,l,null)}return l}var a=t("./util"),s=function(t){return t.then(function(e){return i(e,t)})};e.race=function(t){return i(t,void 0)},e.prototype.race=function(){return i(this,void 0)}}},{"./util":36}],28:[function(t,e,n){"use strict";e.exports=function(e,n,r,o,i,a){function s(t,n,r,o){this.constructor$(t);var a=p();this._fn=null===a?n:h.domainBind(a,n),void 0!==r&&(r=e.resolve(r),r._attachCancellationCallback(this)),this._initialValue=r,this._currentCancellable=null,o===i?this._eachValues=Array(this._length):0===o?this._eachValues=null:this._eachValues=void 0,this._promise._captureStackTrace(),this._init$(void 0,-5)}function u(t,e){this.isFulfilled()?e._resolve(t):e._reject(t)}function l(t,e,n,o){if("function"!=typeof e)return r("expecting a function but got "+h.classString(e));var i=new s(t,e,n,o);return i.promise()}function c(t){this.accum=t,this.array._gotAccum(t);var n=o(this.value,this.array._promise);return n instanceof e?(this.array._currentCancellable=n,n._then(f,void 0,void 0,this,void 0)):f.call(this,n)}function f(t){var n=this.array,r=n._promise,o=d(n._fn);r._pushContext();var i;i=void 0!==n._eachValues?o.call(r._boundValue(),t,this.index,this.length):o.call(r._boundValue(),this.accum,t,this.index,this.length),i instanceof e&&(n._currentCancellable=i);var s=r._popContext();return a.checkForgottenReturns(i,s,void 0!==n._eachValues?"Promise.each":"Promise.reduce",r),i}var p=e._getDomain,h=t("./util"),d=h.tryCatch;h.inherits(s,n),s.prototype._gotAccum=function(t){void 0!==this._eachValues&&null!==this._eachValues&&t!==i&&this._eachValues.push(t)},s.prototype._eachComplete=function(t){return null!==this._eachValues&&this._eachValues.push(t),this._eachValues},s.prototype._init=function(){},s.prototype._resolveEmptyArray=function(){this._resolve(void 0!==this._eachValues?this._eachValues:this._initialValue)},s.prototype.shouldCopyValues=function(){return!1},s.prototype._resolve=function(t){this._promise._resolveCallback(t),this._values=null},s.prototype._resultCancelled=function(t){return t===this._initialValue?this._cancel():void(this._isResolved()||(this._resultCancelled$(),this._currentCancellable instanceof e&&this._currentCancellable.cancel(),this._initialValue instanceof e&&this._initialValue.cancel()))},s.prototype._iterate=function(t){this._values=t;var n,r,o=t.length;if(void 0!==this._initialValue?(n=this._initialValue,r=0):(n=e.resolve(t[0]),r=1),this._currentCancellable=n,!n.isRejected())for(;r<o;++r){var i={accum:null,value:t[r],index:r,length:o,array:this};n=n._then(c,void 0,void 0,i,void 0)}void 0!==this._eachValues&&(n=n._then(this._eachComplete,void 0,void 0,this,void 0)),n._then(u,u,void 0,n,this)},e.prototype.reduce=function(t,e){return l(this,t,e,null)},e.reduce=function(t,e,n,r){return l(t,e,n,r)}}},{"./util":36}],29:[function(t,o,i){"use strict";var a,s=t("./util"),u=function(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")},l=s.getNativePromise();if(s.isNode&&"undefined"==typeof MutationObserver){var c=n.setImmediate,f=e.nextTick;a=s.isRecentNode?function(t){c.call(n,t)}:function(t){f.call(e,t)}}else if("function"==typeof l&&"function"==typeof l.resolve){var p=l.resolve();a=function(t){p.then(t)}}else a="undefined"==typeof MutationObserver||"undefined"!=typeof window&&window.navigator&&(window.navigator.standalone||window.cordova)?"undefined"!=typeof r?function(t){r(t)}:"undefined"!=typeof setTimeout?function(t){setTimeout(t,0)}:u:function(){var t=document.createElement("div"),e={attributes:!0},n=!1,r=document.createElement("div"),o=new MutationObserver(function(){t.classList.toggle("foo"),n=!1});o.observe(r,e);var i=function(){n||(n=!0,r.classList.toggle("foo"))};return function(n){var r=new MutationObserver(function(){r.disconnect(),n()});r.observe(t,e),i()}}();o.exports=a},{"./util":36}],30:[function(t,e,n){"use strict";e.exports=function(e,n,r){function o(t){this.constructor$(t)}var i=e.PromiseInspection,a=t("./util");a.inherits(o,n),o.prototype._promiseResolved=function(t,e){this._values[t]=e;var n=++this._totalResolved;return n>=this._length&&(this._resolve(this._values),!0)},o.prototype._promiseFulfilled=function(t,e){var n=new i;return n._bitField=33554432,n._settledValueField=t,this._promiseResolved(e,n)},o.prototype._promiseRejected=function(t,e){var n=new i;return n._bitField=16777216,n._settledValueField=t,this._promiseResolved(e,n)},e.settle=function(t){return r.deprecated(".settle()",".reflect()"),new o(t).promise()},e.prototype.settle=function(){return e.settle(this)}}},{"./util":36}],31:[function(t,e,n){"use strict";e.exports=function(e,n,r){function o(t){this.constructor$(t),this._howMany=0,this._unwrap=!1,this._initialized=!1}function i(t,e){if((0|e)!==e||e<0)return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");var n=new o(t),i=n.promise();return n.setHowMany(e),n.init(),i}var a=t("./util"),s=t("./errors").RangeError,u=t("./errors").AggregateError,l=a.isArray,c={};a.inherits(o,n),o.prototype._init=function(){if(this._initialized){if(0===this._howMany)return void this._resolve([]);this._init$(void 0,-5);var t=l(this._values);!this._isResolved()&&t&&this._howMany>this._canPossiblyFulfill()&&this._reject(this._getRangeError(this.length()))}},o.prototype.init=function(){this._initialized=!0,this._init()},o.prototype.setUnwrap=function(){this._unwrap=!0},o.prototype.howMany=function(){return this._howMany},o.prototype.setHowMany=function(t){this._howMany=t},o.prototype._promiseFulfilled=function(t){return this._addFulfilled(t),this._fulfilled()===this.howMany()&&(this._values.length=this.howMany(),1===this.howMany()&&this._unwrap?this._resolve(this._values[0]):this._resolve(this._values),!0)},o.prototype._promiseRejected=function(t){return this._addRejected(t),this._checkOutcome()},o.prototype._promiseCancelled=function(){return this._values instanceof e||null==this._values?this._cancel():(this._addRejected(c),this._checkOutcome())},o.prototype._checkOutcome=function(){if(this.howMany()>this._canPossiblyFulfill()){for(var t=new u,e=this.length();e<this._values.length;++e)this._values[e]!==c&&t.push(this._values[e]);return t.length>0?this._reject(t):this._cancel(),!0}return!1},o.prototype._fulfilled=function(){return this._totalResolved},o.prototype._rejected=function(){return this._values.length-this.length()},o.prototype._addRejected=function(t){this._values.push(t)},o.prototype._addFulfilled=function(t){this._values[this._totalResolved++]=t},o.prototype._canPossiblyFulfill=function(){return this.length()-this._rejected()},o.prototype._getRangeError=function(t){var e="Input array must contain at least "+this._howMany+" items but contains only "+t+" items";return new s(e)},o.prototype._resolveEmptyArray=function(){this._reject(this._getRangeError(0))},e.some=function(t,e){return i(t,e)},e.prototype.some=function(t){return i(this,t)},e._SomePromiseArray=o}},{"./errors":12,"./util":36}],32:[function(t,e,n){"use strict";e.exports=function(t){function e(t){void 0!==t?(t=t._target(),this._bitField=t._bitField,this._settledValueField=t._isFateSealed()?t._settledValue():void 0):(this._bitField=0,this._settledValueField=void 0)}e.prototype._settledValue=function(){return this._settledValueField};var n=e.prototype.value=function(){if(!this.isFulfilled())throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},r=e.prototype.error=e.prototype.reason=function(){if(!this.isRejected())throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},o=e.prototype.isFulfilled=function(){return 0!==(33554432&this._bitField)},i=e.prototype.isRejected=function(){return 0!==(16777216&this._bitField)},a=e.prototype.isPending=function(){return 0===(50397184&this._bitField)},s=e.prototype.isResolved=function(){return 0!==(50331648&this._bitField)};e.prototype.isCancelled=function(){return 0!==(8454144&this._bitField)},t.prototype.__isCancelled=function(){return 65536===(65536&this._bitField)},t.prototype._isCancelled=function(){return this._target().__isCancelled()},t.prototype.isCancelled=function(){return 0!==(8454144&this._target()._bitField)},t.prototype.isPending=function(){return a.call(this._target())},t.prototype.isRejected=function(){return i.call(this._target())},t.prototype.isFulfilled=function(){return o.call(this._target())},t.prototype.isResolved=function(){return s.call(this._target())},t.prototype.value=function(){return n.call(this._target())},t.prototype.reason=function(){var t=this._target();return t._unsetRejectionIsUnhandled(),r.call(t)},t.prototype._value=function(){return this._settledValue()},t.prototype._reason=function(){return this._unsetRejectionIsUnhandled(),this._settledValue()},t.PromiseInspection=e}},{}],33:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,r){if(c(t)){if(t instanceof e)return t;var o=i(t);if(o===l){r&&r._pushContext();var u=e.reject(o.e);return r&&r._popContext(),u}if("function"==typeof o){if(a(t)){var u=new e(n);return t._then(u._fulfill,u._reject,void 0,u,null),u}return s(t,o,r)}}return t}function o(t){return t.then}function i(t){try{return o(t)}catch(t){return l.e=t,l}}function a(t){try{return f.call(t,"_promise0")}catch(t){return!1}}function s(t,r,o){function i(t){s&&(s._resolveCallback(t),s=null)}function a(t){s&&(s._rejectCallback(t,f,!0),s=null)}var s=new e(n),c=s;o&&o._pushContext(),s._captureStackTrace(),o&&o._popContext();var f=!0,p=u.tryCatch(r).call(t,i,a);return f=!1,s&&p===l&&(s._rejectCallback(p.e,!0,!0),s=null),c}var u=t("./util"),l=u.errorObj,c=u.isObject,f={}.hasOwnProperty;return r}},{"./util":36}],34:[function(t,e,n){"use strict";e.exports=function(e,n,r){function o(t){this.handle=t}function i(t){return clearTimeout(this.handle),t}function a(t){throw clearTimeout(this.handle),t}var s=t("./util"),u=e.TimeoutError;o.prototype._resultCancelled=function(){clearTimeout(this.handle)};var l=function(t){return c(+this).thenReturn(t)},c=e.delay=function(t,i){var a,s;return void 0!==i?(a=e.resolve(i)._then(l,null,null,t,void 0),r.cancellation()&&i instanceof e&&a._setOnCancel(i)):(a=new e(n),s=setTimeout(function(){a._fulfill()},+t),r.cancellation()&&a._setOnCancel(new o(s)),a._captureStackTrace()),a._setAsyncGuaranteed(),a};e.prototype.delay=function(t){return c(t,this)};var f=function(t,e,n){var r;r="string"!=typeof e?e instanceof Error?e:new u("operation timed out"):new u(e),s.markAsOriginatingFromRejection(r),t._attachExtraTrace(r),t._reject(r),null!=n&&n.cancel()};e.prototype.timeout=function(t,e){t=+t;var n,s,u=new o(setTimeout(function(){n.isPending()&&f(n,e,s)},t));return r.cancellation()?(s=this.then(),n=s._then(i,a,void 0,u,void 0),n._setOnCancel(u)):n=this._then(i,a,void 0,u,void 0),n}}},{"./util":36}],35:[function(t,e,n){"use strict";e.exports=function(e,n,r,o,i,a){function s(t){setTimeout(function(){throw t},0)}function u(t){var e=r(t);return e!==t&&"function"==typeof t._isDisposable&&"function"==typeof t._getDisposer&&t._isDisposable()&&e._setDisposable(t._getDisposer()),e}function l(t,n){function o(){if(a>=l)return c._fulfill();var i=u(t[a++]);if(i instanceof e&&i._isDisposable()){try{i=r(i._getDisposer().tryDispose(n),t.promise)}catch(t){return s(t)}if(i instanceof e)return i._then(o,s,null,null,null)}o()}var a=0,l=t.length,c=new e(i);return o(),c}function c(t,e,n){this._data=t,this._promise=e,this._context=n}function f(t,e,n){this.constructor$(t,e,n)}function p(t){return c.isDisposer(t)?(this.resources[this.index]._setDisposable(t),t.promise()):t}function h(t){this.length=t,this.promise=null,this[t-1]=null}var d=t("./util"),v=t("./errors").TypeError,m=t("./util").inherits,_=d.errorObj,g=d.tryCatch,y={};c.prototype.data=function(){return this._data},c.prototype.promise=function(){return this._promise},c.prototype.resource=function(){return this.promise().isFulfilled()?this.promise().value():y},c.prototype.tryDispose=function(t){var e=this.resource(),n=this._context;void 0!==n&&n._pushContext();var r=e!==y?this.doDispose(e,t):null;return void 0!==n&&n._popContext(),this._promise._unsetDisposable(),this._data=null,r},c.isDisposer=function(t){return null!=t&&"function"==typeof t.resource&&"function"==typeof t.tryDispose},m(f,c),f.prototype.doDispose=function(t,e){var n=this.data();return n.call(t,t,e)},h.prototype._resultCancelled=function(){for(var t=this.length,n=0;n<t;++n){var r=this[n];r instanceof e&&r.cancel();
}},e.using=function(){var t=arguments.length;if(t<2)return n("you must pass at least 2 arguments to Promise.using");var o=arguments[t-1];if("function"!=typeof o)return n("expecting a function but got "+d.classString(o));var i,s=!0;2===t&&Array.isArray(arguments[0])?(i=arguments[0],t=i.length,s=!1):(i=arguments,t--);for(var u=new h(t),f=0;f<t;++f){var v=i[f];if(c.isDisposer(v)){var m=v;v=v.promise(),v._setDisposable(m)}else{var y=r(v);y instanceof e&&(v=y._then(p,null,null,{resources:u,index:f},void 0))}u[f]=v}for(var b=new Array(u.length),f=0;f<b.length;++f)b[f]=e.resolve(u[f]).reflect();var w=e.all(b).then(function(t){for(var e=0;e<t.length;++e){var n=t[e];if(n.isRejected())return _.e=n.error(),_;if(!n.isFulfilled())return void w.cancel();t[e]=n.value()}x._pushContext(),o=g(o);var r=s?o.apply(void 0,t):o(t),i=x._popContext();return a.checkForgottenReturns(r,i,"Promise.using",x),r}),x=w.lastly(function(){var t=new e.PromiseInspection(w);return l(u,t)});return u.promise=x,x._setOnCancel(u),x},e.prototype._setDisposable=function(t){this._bitField=131072|this._bitField,this._disposer=t},e.prototype._isDisposable=function(){return(131072&this._bitField)>0},e.prototype._getDisposer=function(){return this._disposer},e.prototype._unsetDisposable=function(){this._bitField=this._bitField&-131073,this._disposer=void 0},e.prototype.disposer=function(t){if("function"==typeof t)return new f(t,this,o());throw new v}}},{"./errors":12,"./util":36}],36:[function(t,r,o){"use strict";function i(){try{var t=C;return C=null,t.apply(this,arguments)}catch(t){return A.e=t,A}}function a(t){return C=t,i}function s(t){return null==t||t===!0||t===!1||"string"==typeof t||"number"==typeof t}function u(t){return"function"==typeof t||"object"==typeof t&&null!==t}function l(t){return s(t)?new Error(g(t)):t}function c(t,e){var n,r=t.length,o=new Array(r+1);for(n=0;n<r;++n)o[n]=t[n];return o[n]=e,o}function f(t,e,n){if(!M.isES5)return{}.hasOwnProperty.call(t,e)?t[e]:void 0;var r=Object.getOwnPropertyDescriptor(t,e);return null!=r?null==r.get&&null==r.set?r.value:n:void 0}function p(t,e,n){if(s(t))return t;var r={value:n,configurable:!0,enumerable:!1,writable:!0};return M.defineProperty(t,e,r),t}function h(t){throw t}function d(t){try{if("function"==typeof t){var e=M.names(t.prototype),n=M.isES5&&e.length>1,r=e.length>0&&!(1===e.length&&"constructor"===e[0]),o=N.test(t+"")&&M.names(t).length>0;if(n||r||o)return!0}return!1}catch(t){return!1}}function v(t){function e(){}e.prototype=t;for(var n=8;n--;)new e;return t}function m(t){return U.test(t)}function _(t,e,n){for(var r=new Array(t),o=0;o<t;++o)r[o]=e+o+n;return r}function g(t){try{return t+""}catch(t){return"[no string representation]"}}function y(t){return null!==t&&"object"==typeof t&&"string"==typeof t.message&&"string"==typeof t.name}function b(t){try{p(t,"isOperational",!0)}catch(t){}}function w(t){return null!=t&&(t instanceof Error.__BluebirdErrorTypes__.OperationalError||t.isOperational===!0)}function x(t){return y(t)&&M.propertyIsWritable(t,"stack")}function E(t){return{}.toString.call(t)}function T(t,e,n){for(var r=M.names(t),o=0;o<r.length;++o){var i=r[o];if(n(i))try{M.defineProperty(e,i,M.getDescriptor(t,i))}catch(t){}}}function O(t){return V?{NODE_ENV:"production"}[t]:void 0}function S(){if("function"==typeof Promise)try{var t=new Promise(function(){});if("[object Promise]"==={}.toString.call(t))return Promise}catch(t){}}function P(t,e){return t.bind(e)}var M=t("./es5"),j="undefined"==typeof navigator,A={e:{}},C,k="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof n?n:void 0!==this?this:null,R=function(t,e){function n(){this.constructor=t,this.constructor$=e;for(var n in e.prototype)r.call(e.prototype,n)&&"$"!==n.charAt(n.length-1)&&(this[n+"$"]=e.prototype[n])}var r={}.hasOwnProperty;return n.prototype=e.prototype,t.prototype=new n,t.prototype},I=function(){var t=[Array.prototype,Object.prototype,Function.prototype],e=function(e){for(var n=0;n<t.length;++n)if(t[n]===e)return!0;return!1};if(M.isES5){var n=Object.getOwnPropertyNames;return function(t){for(var r=[],o=Object.create(null);null!=t&&!e(t);){var i;try{i=n(t)}catch(t){return r}for(var a=0;a<i.length;++a){var s=i[a];if(!o[s]){o[s]=!0;var u=Object.getOwnPropertyDescriptor(t,s);null!=u&&null==u.get&&null==u.set&&r.push(s)}}t=M.getPrototypeOf(t)}return r}}var r={}.hasOwnProperty;return function(n){if(e(n))return[];var o=[];t:for(var i in n)if(r.call(n,i))o.push(i);else{for(var a=0;a<t.length;++a)if(r.call(t[a],i))continue t;o.push(i)}return o}}(),N=/this\s*\.\s*\S+\s*=/,U=/^[a-z$_][a-z$_0-9]*$/i,F=function(){return"stack"in new Error?function(t){return x(t)?t:new Error(g(t))}:function(t){if(x(t))return t;try{throw new Error(g(t))}catch(t){return t}}}(),L=function(t){return M.isArray(t)?t:null};if("undefined"!=typeof Symbol&&Symbol.iterator){var D="function"==typeof Array.from?function(t){return Array.from(t)}:function(t){for(var e,n=[],r=t[Symbol.iterator]();!(e=r.next()).done;)n.push(e.value);return n};L=function(t){return M.isArray(t)?t:null!=t&&"function"==typeof t[Symbol.iterator]?D(t):null}}var B="undefined"!=typeof e&&"[object process]"===E(e).toLowerCase(),V="undefined"!=typeof e&&!0,W={isClass:d,isIdentifier:m,inheritedDataKeys:I,getDataPropertyOrDefault:f,thrower:h,isArray:M.isArray,asArray:L,notEnumerableProp:p,isPrimitive:s,isObject:u,isError:y,canEvaluate:j,errorObj:A,tryCatch:a,inherits:R,withAppended:c,maybeWrapAsError:l,toFastProperties:v,filledRange:_,toString:g,canAttachTrace:x,ensureErrorObject:F,originatesFromRejection:w,markAsOriginatingFromRejection:b,classString:E,copyDescriptors:T,hasDevTools:"undefined"!=typeof chrome&&chrome&&"function"==typeof chrome.loadTimes,isNode:B,hasEnvVariables:V,env:O,global:k,getNativePromise:S,domainBind:P};W.isRecentNode=W.isNode&&function(){var t=e.versions.node.split(".").map(Number);return 0===t[0]&&t[1]>10||t[0]>0}(),W.isNode&&W.toFastProperties(e);try{throw new Error}catch(t){W.lastLineError=t}r.exports=W},{"./es5":13}]},{},[4])(4)}),"undefined"!=typeof window&&null!==window?window.P=window.Promise:"undefined"!=typeof self&&null!==self&&(self.P=self.Promise)}).call(e,n(131),n(38),n(621).setImmediate)},function(t,e,n){"use strict";(function(t){function r(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}function o(){return a.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function i(t,e){if(o()<e)throw new RangeError("Invalid typed array length");return a.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=a.prototype):(null===t&&(t=new a(e)),t.length=e),t}function a(t,e,n){if(!(a.TYPED_ARRAY_SUPPORT||this instanceof a))return new a(t,e,n);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return c(this,t)}return s(this,t,e,n)}function s(t,e,n,r){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?h(t,e,n,r):"string"==typeof e?f(t,e,n):d(t,e)}function u(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function l(t,e,n,r){return u(e),e<=0?i(t,e):void 0!==n?"string"==typeof r?i(t,e).fill(n,r):i(t,e).fill(n):i(t,e)}function c(t,e){if(u(e),t=i(t,e<0?0:0|v(e)),!a.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)t[n]=0;return t}function f(t,e,n){if("string"==typeof n&&""!==n||(n="utf8"),!a.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|_(e,n);t=i(t,r);var o=t.write(e,n);return o!==r&&(t=t.slice(0,o)),t}function p(t,e){var n=e.length<0?0:0|v(e.length);t=i(t,n);for(var r=0;r<n;r+=1)t[r]=255&e[r];return t}function h(t,e,n,r){if(e.byteLength,n<0||e.byteLength<n)throw new RangeError("'offset' is out of bounds");if(e.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");return e=void 0===n&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,n):new Uint8Array(e,n,r),a.TYPED_ARRAY_SUPPORT?(t=e,t.__proto__=a.prototype):t=p(t,e),t}function d(t,e){if(a.isBuffer(e)){var n=0|v(e.length);return t=i(t,n),0===t.length?t:(e.copy(t,0,0,n),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||$(e.length)?i(t,0):p(t,e);if("Buffer"===e.type&&J(e.data))return p(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function v(t){if(t>=o())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o().toString(16)+" bytes");return 0|t}function m(t){return+t!=t&&(t=0),a.alloc(+t)}function _(t,e){if(a.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var r=!1;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return G(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return Y(t).length;default:if(r)return G(t).length;e=(""+e).toLowerCase(),r=!0}}function g(t,e,n){var r=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if(n>>>=0,e>>>=0,n<=e)return"";for(t||(t="utf8");;)switch(t){case"hex":return R(this,e,n);case"utf8":case"utf-8":return j(this,e,n);case"ascii":return C(this,e,n);case"latin1":case"binary":return k(this,e,n);case"base64":return M(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}function y(t,e,n){var r=t[e];t[e]=t[n],t[n]=r}function b(t,e,n,r,o){if(0===t.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=o?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(o)return-1;n=t.length-1}else if(n<0){if(!o)return-1;n=0}if("string"==typeof e&&(e=a.from(e,r)),a.isBuffer(e))return 0===e.length?-1:w(t,e,n,r,o);if("number"==typeof e)return e&=255,a.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):w(t,[e],n,r,o);throw new TypeError("val must be string, number or Buffer")}function w(t,e,n,r,o){function i(t,e){return 1===a?t[e]:t.readUInt16BE(e*a)}var a=1,s=t.length,u=e.length;if(void 0!==r&&(r=String(r).toLowerCase(),"ucs2"===r||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||e.length<2)return-1;a=2,s/=2,u/=2,n/=2}var l;if(o){var c=-1;for(l=n;l<s;l++)if(i(t,l)===i(e,c===-1?0:l-c)){if(c===-1&&(c=l),l-c+1===u)return c*a}else c!==-1&&(l-=l-c),c=-1}else for(n+u>s&&(n=s-u),l=n;l>=0;l--){for(var f=!0,p=0;p<u;p++)if(i(t,l+p)!==i(e,p)){f=!1;break}if(f)return l}return-1}function x(t,e,n,r){n=Number(n)||0;var o=t.length-n;r?(r=Number(r),r>o&&(r=o)):r=o;var i=e.length;if(i%2!==0)throw new TypeError("Invalid hex string");r>i/2&&(r=i/2);for(var a=0;a<r;++a){var s=parseInt(e.substr(2*a,2),16);if(isNaN(s))return a;t[n+a]=s}return a}function E(t,e,n,r){return K(G(e,t.length-n),t,n,r)}function T(t,e,n,r){return K(q(e),t,n,r)}function O(t,e,n,r){return T(t,e,n,r)}function S(t,e,n,r){return K(Y(e),t,n,r)}function P(t,e,n,r){return K(H(e,t.length-n),t,n,r)}function M(t,e,n){return 0===e&&n===t.length?Z.fromByteArray(t):Z.fromByteArray(t.slice(e,n))}function j(t,e,n){n=Math.min(t.length,n);for(var r=[],o=e;o<n;){var i=t[o],a=null,s=i>239?4:i>223?3:i>191?2:1;if(o+s<=n){var u,l,c,f;switch(s){case 1:i<128&&(a=i);break;case 2:u=t[o+1],128===(192&u)&&(f=(31&i)<<6|63&u,f>127&&(a=f));break;case 3:u=t[o+1],l=t[o+2],128===(192&u)&&128===(192&l)&&(f=(15&i)<<12|(63&u)<<6|63&l,f>2047&&(f<55296||f>57343)&&(a=f));break;case 4:u=t[o+1],l=t[o+2],c=t[o+3],128===(192&u)&&128===(192&l)&&128===(192&c)&&(f=(15&i)<<18|(63&u)<<12|(63&l)<<6|63&c,f>65535&&f<1114112&&(a=f))}}null===a?(a=65533,s=1):a>65535&&(a-=65536,r.push(a>>>10&1023|55296),a=56320|1023&a),r.push(a),o+=s}return A(r)}function A(t){var e=t.length;if(e<=tt)return String.fromCharCode.apply(String,t);for(var n="",r=0;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=tt));return n}function C(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(127&t[o]);return r}function k(t,e,n){var r="";n=Math.min(t.length,n);for(var o=e;o<n;++o)r+=String.fromCharCode(t[o]);return r}function R(t,e,n){var r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);for(var o="",i=e;i<n;++i)o+=z(t[i]);return o}function I(t,e,n){for(var r=t.slice(e,n),o="",i=0;i<r.length;i+=2)o+=String.fromCharCode(r[i]+256*r[i+1]);return o}function N(t,e,n){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function U(t,e,n,r,o,i){if(!a.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>o||e<i)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}function F(t,e,n,r){e<0&&(e=65535+e+1);for(var o=0,i=Math.min(t.length-n,2);o<i;++o)t[n+o]=(e&255<<8*(r?o:1-o))>>>8*(r?o:1-o)}function L(t,e,n,r){e<0&&(e=4294967295+e+1);for(var o=0,i=Math.min(t.length-n,4);o<i;++o)t[n+o]=e>>>8*(r?o:3-o)&255}function D(t,e,n,r,o,i){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function B(t,e,n,r,o){return o||D(t,e,n,4,3.4028234663852886e38,-3.4028234663852886e38),Q.write(t,e,n,r,23,4),n+4}function V(t,e,n,r,o){return o||D(t,e,n,8,1.7976931348623157e308,-1.7976931348623157e308),Q.write(t,e,n,r,52,8),n+8}function W(t){if(t=X(t).replace(et,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function X(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function z(t){return t<16?"0"+t.toString(16):t.toString(16)}function G(t,e){e=e||1/0;for(var n,r=t.length,o=null,i=[],a=0;a<r;++a){if(n=t.charCodeAt(a),n>55295&&n<57344){if(!o){if(n>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(a+1===r){(e-=3)>-1&&i.push(239,191,189);continue}o=n;continue}if(n<56320){(e-=3)>-1&&i.push(239,191,189),o=n;continue}n=(o-55296<<10|n-56320)+65536}else o&&(e-=3)>-1&&i.push(239,191,189);if(o=null,n<128){if((e-=1)<0)break;i.push(n)}else if(n<2048){if((e-=2)<0)break;i.push(n>>6|192,63&n|128)}else if(n<65536){if((e-=3)<0)break;i.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return i}function q(t){for(var e=[],n=0;n<t.length;++n)e.push(255&t.charCodeAt(n));return e}function H(t,e){for(var n,r,o,i=[],a=0;a<t.length&&!((e-=2)<0);++a)n=t.charCodeAt(a),r=n>>8,o=n%256,i.push(o),i.push(r);return i}function Y(t){return Z.toByteArray(W(t))}function K(t,e,n,r){for(var o=0;o<r&&!(o+n>=e.length||o>=t.length);++o)e[o+n]=t[o];return o}function $(t){return t!==t}var Z=n(262),Q=n(452),J=n(266);e.Buffer=a,e.SlowBuffer=m,e.INSPECT_MAX_BYTES=50,a.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:r(),e.kMaxLength=o(),a.poolSize=8192,a._augment=function(t){return t.__proto__=a.prototype,t},a.from=function(t,e,n){return s(null,t,e,n)},a.TYPED_ARRAY_SUPPORT&&(a.prototype.__proto__=Uint8Array.prototype,a.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&a[Symbol.species]===a&&Object.defineProperty(a,Symbol.species,{value:null,configurable:!0})),a.alloc=function(t,e,n){return l(null,t,e,n)},a.allocUnsafe=function(t){return c(null,t)},a.allocUnsafeSlow=function(t){return c(null,t)},a.isBuffer=function(t){return!(null==t||!t._isBuffer)},a.compare=function(t,e){if(!a.isBuffer(t)||!a.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var n=t.length,r=e.length,o=0,i=Math.min(n,r);o<i;++o)if(t[o]!==e[o]){n=t[o],r=e[o];break}return n<r?-1:r<n?1:0},a.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},a.concat=function(t,e){if(!J(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return a.alloc(0);var n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;var r=a.allocUnsafe(e),o=0;for(n=0;n<t.length;++n){var i=t[n];if(!a.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(r,o),o+=i.length}return r},a.byteLength=_,a.prototype._isBuffer=!0,a.prototype.swap16=function(){var t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)y(this,e,e+1);return this},a.prototype.swap32=function(){var t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},a.prototype.swap64=function(){var t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},a.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?j(this,0,t):g.apply(this,arguments)},a.prototype.equals=function(t){if(!a.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===a.compare(this,t)},a.prototype.inspect=function(){var t="",n=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,n).match(/.{2}/g).join(" "),this.length>n&&(t+=" ... ")),"<Buffer "+t+">"},a.prototype.compare=function(t,e,n,r,o){if(!a.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===r&&(r=0),void 0===o&&(o=this.length),e<0||n>t.length||r<0||o>this.length)throw new RangeError("out of range index");if(r>=o&&e>=n)return 0;if(r>=o)return-1;if(e>=n)return 1;if(e>>>=0,n>>>=0,r>>>=0,o>>>=0,this===t)return 0;for(var i=o-r,s=n-e,u=Math.min(i,s),l=this.slice(r,o),c=t.slice(e,n),f=0;f<u;++f)if(l[f]!==c[f]){i=l[f],s=c[f];break}return i<s?-1:s<i?1:0},a.prototype.includes=function(t,e,n){return this.indexOf(t,e,n)!==-1},a.prototype.indexOf=function(t,e,n){return b(this,t,e,n,!0)},a.prototype.lastIndexOf=function(t,e,n){return b(this,t,e,n,!1)},a.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var o=this.length-e;if((void 0===n||n>o)&&(n=o),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var i=!1;;)switch(r){case"hex":return x(this,t,e,n);case"utf8":case"utf-8":return E(this,t,e,n);case"ascii":return T(this,t,e,n);case"latin1":case"binary":return O(this,t,e,n);case"base64":return S(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return P(this,t,e,n);default:if(i)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),i=!0}},a.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var tt=4096;a.prototype.slice=function(t,e){var n=this.length;t=~~t,e=void 0===e?n:~~e,t<0?(t+=n,t<0&&(t=0)):t>n&&(t=n),e<0?(e+=n,e<0&&(e=0)):e>n&&(e=n),e<t&&(e=t);var r;if(a.TYPED_ARRAY_SUPPORT)r=this.subarray(t,e),r.__proto__=a.prototype;else{var o=e-t;r=new a(o,void 0);for(var i=0;i<o;++i)r[i]=this[i+t]}return r},a.prototype.readUIntLE=function(t,e,n){t|=0,e|=0,n||N(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return r},a.prototype.readUIntBE=function(t,e,n){t|=0,e|=0,n||N(t,e,this.length);for(var r=this[t+--e],o=1;e>0&&(o*=256);)r+=this[t+--e]*o;return r},a.prototype.readUInt8=function(t,e){return e||N(t,1,this.length),this[t]},a.prototype.readUInt16LE=function(t,e){return e||N(t,2,this.length),this[t]|this[t+1]<<8},a.prototype.readUInt16BE=function(t,e){return e||N(t,2,this.length),this[t]<<8|this[t+1]},a.prototype.readUInt32LE=function(t,e){return e||N(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},a.prototype.readUInt32BE=function(t,e){return e||N(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},a.prototype.readIntLE=function(t,e,n){t|=0,e|=0,n||N(t,e,this.length);for(var r=this[t],o=1,i=0;++i<e&&(o*=256);)r+=this[t+i]*o;return o*=128,r>=o&&(r-=Math.pow(2,8*e)),r},a.prototype.readIntBE=function(t,e,n){t|=0,e|=0,n||N(t,e,this.length);for(var r=e,o=1,i=this[t+--r];r>0&&(o*=256);)i+=this[t+--r]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*e)),i},a.prototype.readInt8=function(t,e){return e||N(t,1,this.length),128&this[t]?(255-this[t]+1)*-1:this[t]},a.prototype.readInt16LE=function(t,e){e||N(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},a.prototype.readInt16BE=function(t,e){e||N(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},a.prototype.readInt32LE=function(t,e){return e||N(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},a.prototype.readInt32BE=function(t,e){return e||N(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},a.prototype.readFloatLE=function(t,e){return e||N(t,4,this.length),Q.read(this,t,!0,23,4)},a.prototype.readFloatBE=function(t,e){return e||N(t,4,this.length),Q.read(this,t,!1,23,4)},a.prototype.readDoubleLE=function(t,e){return e||N(t,8,this.length),Q.read(this,t,!0,52,8)},a.prototype.readDoubleBE=function(t,e){return e||N(t,8,this.length),Q.read(this,t,!1,52,8)},a.prototype.writeUIntLE=function(t,e,n,r){if(t=+t,e|=0,n|=0,!r){var o=Math.pow(2,8*n)-1;U(this,t,e,n,o,0)}var i=1,a=0;for(this[e]=255&t;++a<n&&(i*=256);)this[e+a]=t/i&255;return e+n},a.prototype.writeUIntBE=function(t,e,n,r){if(t=+t,e|=0,n|=0,!r){var o=Math.pow(2,8*n)-1;U(this,t,e,n,o,0)}var i=n-1,a=1;for(this[e+i]=255&t;--i>=0&&(a*=256);)this[e+i]=t/a&255;return e+n},a.prototype.writeUInt8=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,1,255,0),a.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},a.prototype.writeUInt16LE=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):F(this,t,e,!0),e+2},a.prototype.writeUInt16BE=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,2,65535,0),a.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):F(this,t,e,!1),e+2},a.prototype.writeUInt32LE=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):L(this,t,e,!0),e+4},a.prototype.writeUInt32BE=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,4,4294967295,0),a.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):L(this,t,e,!1),e+4},a.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e|=0,!r){var o=Math.pow(2,8*n-1);U(this,t,e,n,o-1,-o)}var i=0,a=1,s=0;for(this[e]=255&t;++i<n&&(a*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/a>>0)-s&255;return e+n},a.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e|=0,!r){var o=Math.pow(2,8*n-1);U(this,t,e,n,o-1,-o)}var i=n-1,a=1,s=0;for(this[e+i]=255&t;--i>=0&&(a*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/a>>0)-s&255;return e+n},a.prototype.writeInt8=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,1,127,-128),a.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},a.prototype.writeInt16LE=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):F(this,t,e,!0),e+2},a.prototype.writeInt16BE=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,2,32767,-32768),a.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):F(this,t,e,!1),e+2},a.prototype.writeInt32LE=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,4,2147483647,-2147483648),a.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):L(this,t,e,!0),e+4},a.prototype.writeInt32BE=function(t,e,n){return t=+t,e|=0,n||U(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),a.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):L(this,t,e,!1),e+4},a.prototype.writeFloatLE=function(t,e,n){return B(this,t,e,!0,n)},a.prototype.writeFloatBE=function(t,e,n){return B(this,t,e,!1,n)},a.prototype.writeDoubleLE=function(t,e,n){return V(this,t,e,!0,n)},a.prototype.writeDoubleBE=function(t,e,n){return V(this,t,e,!1,n)},a.prototype.copy=function(t,e,n,r){if(n||(n=0),r||0===r||(r=this.length),e>=t.length&&(e=t.length),e||(e=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);var o,i=r-n;if(this===t&&n<e&&e<r)for(o=i-1;o>=0;--o)t[o+e]=this[o+n];else if(i<1e3||!a.TYPED_ARRAY_SUPPORT)for(o=0;o<i;++o)t[o+e]=this[o+n];else Uint8Array.prototype.set.call(t,this.subarray(n,n+i),e);return i},a.prototype.fill=function(t,e,n,r){if("string"==typeof t){if("string"==typeof e?(r=e,e=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===t.length){var o=t.charCodeAt(0);o<256&&(t=o)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!a.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0);var i;if("number"==typeof t)for(i=e;i<n;++i)this[i]=t;else{var s=a.isBuffer(t)?t:G(new a(t,r).toString()),u=s.length;for(i=0;i<n-e;++i)this[i+e]=s[i%u]}return this};var et=/[^+\/0-9A-Za-z-_]/g}).call(e,n(38))},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e,n){n(276),t.exports=n(31).RegExp.escape},function(t,e,n){var r=n(7),o=n(101),i=n(8)("species");t.exports=function(t){var e;return o(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!o(e.prototype)||(e=void 0),r(e)&&(e=e[i],null===e&&(e=void 0))),void 0===e?Array:e}},function(t,e,n){var r=n(268);t.exports=function(t,e){return new(r(t))(e)}},function(t,e,n){"use strict";var r=n(4),o=n(28),i="number";t.exports=function(t){if("string"!==t&&t!==i&&"default"!==t)throw TypeError("Incorrect hint");return o(r(this),t!=i)}},function(t,e,n){var r=n(43),o=n(77),i=n(60);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,s=n(t),u=i.f,l=0;s.length>l;)u.call(t,a=s[l++])&&e.push(a);return e}},function(t,e,n){var r=n(43),o=n(18);t.exports=function(t,e){for(var n,i=o(t),a=r(i),s=a.length,u=0;s>u;)if(i[n=a[u++]]===e)return n}},function(t,e,n){"use strict";var r=n(274),o=n(73),i=n(14);t.exports=function(){for(var t=i(this),e=arguments.length,n=Array(e),a=0,s=r._,u=!1;e>a;)(n[a]=arguments[a++])===s&&(u=!0);return function(){var r,i=this,a=arguments.length,l=0,c=0;if(!u&&!a)return o(t,n,i);if(r=n.slice(),u)for(;e>l;l++)r[l]===s&&(r[l]=arguments[c++]);for(;a>c;)r.push(arguments[c++]);return o(t,r,i)}}},function(t,e,n){t.exports=n(5)},function(t,e){t.exports=function(t,e){var n=e===Object(e)?function(t){return e[t]}:e;return function(e){return String(e).replace(t,n)}}},function(t,e,n){var r=n(0),o=n(275)(/[\\^$*+?.()|[\]{}]/g,"\\$&");r(r.S,"RegExp",{escape:function(t){return o(t)}})},function(t,e,n){var r=n(0);r(r.P,"Array",{copyWithin:n(139)}),n(50)("copyWithin")},function(t,e,n){"use strict";var r=n(0),o=n(26)(4);r(r.P+r.F*!n(24)([].every,!0),"Array",{every:function(t){return o(this,t,arguments[1])}})},function(t,e,n){var r=n(0);r(r.P,"Array",{fill:n(93)}),n(50)("fill")},function(t,e,n){"use strict";var r=n(0),o=n(26)(2);r(r.P+r.F*!n(24)([].filter,!0),"Array",{filter:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(0),o=n(26)(6),i="findIndex",a=!0;i in[]&&Array(1)[i](function(){a=!1}),r(r.P+r.F*a,"Array",{findIndex:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(50)(i)},function(t,e,n){"use strict";var r=n(0),o=n(26)(5),i="find",a=!0;i in[]&&Array(1)[i](function(){a=!1}),r(r.P+r.F*a,"Array",{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(50)(i)},function(t,e,n){"use strict";var r=n(0),o=n(26)(0),i=n(24)([].forEach,!0);r(r.P+r.F*!i,"Array",{forEach:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(32),o=n(0),i=n(12),a=n(148),s=n(100),u=n(11),l=n(94),c=n(117);o(o.S+o.F*!n(75)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,o,f,p=i(t),h="function"==typeof this?this:Array,d=arguments.length,v=d>1?arguments[1]:void 0,m=void 0!==v,_=0,g=c(p);if(m&&(v=r(v,d>2?arguments[2]:void 0,2)),void 0==g||h==Array&&s(g))for(e=u(p.length),n=new h(e);e>_;_++)l(n,_,m?v(p[_],_):p[_]);else for(f=g.call(p),n=new h;!(o=f.next()).done;_++)l(n,_,m?a(f,v,[o.value,_],!0):o.value);return n.length=_,n}})},function(t,e,n){"use strict";var r=n(0),o=n(69)(!1),i=[].indexOf,a=!!i&&1/[1].indexOf(1,-0)<0;r(r.P+r.F*(a||!n(24)(i)),"Array",{indexOf:function(t){return a?i.apply(this,arguments)||0:o(this,t,arguments[1])}})},function(t,e,n){var r=n(0);r(r.S,"Array",{isArray:n(101)})},function(t,e,n){"use strict";var r=n(0),o=n(18),i=[].join;r(r.P+r.F*(n(59)!=Object||!n(24)(i)),"Array",{join:function(t){return i.call(o(this),void 0===t?",":t)}})},function(t,e,n){"use strict";var r=n(0),o=n(18),i=n(37),a=n(11),s=[].lastIndexOf,u=!!s&&1/[1].lastIndexOf(1,-0)<0;r(r.P+r.F*(u||!n(24)(s)),"Array",{lastIndexOf:function(t){if(u)return s.apply(this,arguments)||0;var e=o(this),n=a(e.length),r=n-1;for(arguments.length>1&&(r=Math.min(r,i(arguments[1]))),r<0&&(r=n+r);r>=0;r--)if(r in e&&e[r]===t)return r||0;return-1}})},function(t,e,n){"use strict";var r=n(0),o=n(26)(1);r(r.P+r.F*!n(24)([].map,!0),"Array",{map:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(0),o=n(94);r(r.S+r.F*n(6)(function(){function t(){}return!(Array.of.call(t)instanceof t)}),"Array",{of:function(){for(var t=0,e=arguments.length,n=new("function"==typeof this?this:Array)(e);e>t;)o(n,t,arguments[t++]);return n.length=e,n}})},function(t,e,n){"use strict";var r=n(0),o=n(141);r(r.P+r.F*!n(24)([].reduceRight,!0),"Array",{reduceRight:function(t){return o(this,t,arguments.length,arguments[1],!0)}})},function(t,e,n){"use strict";var r=n(0),o=n(141);r(r.P+r.F*!n(24)([].reduce,!0),"Array",{reduce:function(t){return o(this,t,arguments.length,arguments[1],!1)}})},function(t,e,n){"use strict";var r=n(0),o=n(98),i=n(22),a=n(46),s=n(11),u=[].slice;r(r.P+r.F*n(6)(function(){o&&u.call(o)}),"Array",{slice:function(t,e){var n=s(this.length),r=i(this);if(e=void 0===e?n:e,"Array"==r)return u.call(this,t,e);for(var o=a(t,n),l=a(e,n),c=s(l-o),f=Array(c),p=0;p<c;p++)f[p]="String"==r?this.charAt(o+p):this[o+p];return f}})},function(t,e,n){"use strict";var r=n(0),o=n(26)(3);r(r.P+r.F*!n(24)([].some,!0),"Array",{some:function(t){return o(this,t,arguments[1])}})},function(t,e,n){"use strict";var r=n(0),o=n(14),i=n(12),a=n(6),s=[].sort,u=[1,2,3];r(r.P+r.F*(a(function(){u.sort(void 0)})||!a(function(){u.sort(null)})||!n(24)(s)),"Array",{sort:function(t){return void 0===t?s.call(i(this)):s.call(i(this),o(t))}})},function(t,e,n){n(45)("Array")},function(t,e,n){var r=n(0);r(r.S,"Date",{now:function(){return(new Date).getTime()}})},function(t,e,n){"use strict";var r=n(0),o=n(6),i=Date.prototype.getTime,a=function(t){return t>9?t:"0"+t};r(r.P+r.F*(o(function(){return"0385-07-25T07:06:39.999Z"!=new Date(-5e13-1).toISOString()})||!o(function(){new Date(NaN).toISOString()})),"Date",{toISOString:function(){if(!isFinite(i.call(this)))throw RangeError("Invalid time value");
var t=this,e=t.getUTCFullYear(),n=t.getUTCMilliseconds(),r=e<0?"-":e>9999?"+":"";return r+("00000"+Math.abs(e)).slice(r?-6:-4)+"-"+a(t.getUTCMonth()+1)+"-"+a(t.getUTCDate())+"T"+a(t.getUTCHours())+":"+a(t.getUTCMinutes())+":"+a(t.getUTCSeconds())+"."+(n>99?n:"0"+a(n))+"Z"}})},function(t,e,n){"use strict";var r=n(0),o=n(12),i=n(28);r(r.P+r.F*n(6)(function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})}),"Date",{toJSON:function(t){var e=o(this),n=i(e);return"number"!=typeof n||isFinite(n)?e.toISOString():null}})},function(t,e,n){var r=n(8)("toPrimitive"),o=Date.prototype;r in o||n(15)(o,r,n(270))},function(t,e,n){var r=Date.prototype,o="Invalid Date",i="toString",a=r[i],s=r.getTime;new Date(NaN)+""!=o&&n(16)(r,i,function(){var t=s.call(this);return t===t?a.call(this):o})},function(t,e,n){var r=n(0);r(r.P,"Function",{bind:n(142)})},function(t,e,n){"use strict";var r=n(7),o=n(21),i=n(8)("hasInstance"),a=Function.prototype;i in a||n(10).f(a,i,{value:function(t){if("function"!=typeof this||!r(t))return!1;if(!r(this.prototype))return t instanceof this;for(;t=o(t);)if(this.prototype===t)return!0;return!1}})},function(t,e,n){var r=n(10).f,o=n(36),i=n(13),a=Function.prototype,s=/^\s*function ([^ (]*)/,u="name",l=Object.isExtensible||function(){return!0};u in a||n(9)&&r(a,u,{configurable:!0,get:function(){try{var t=this,e=(""+t).match(s)[1];return i(t,u)||!l(t)||r(t,u,o(5,e)),e}catch(t){return""}}})},function(t,e,n){var r=n(0),o=n(150),i=Math.sqrt,a=Math.acosh;r(r.S+r.F*!(a&&710==Math.floor(a(Number.MAX_VALUE))&&a(1/0)==1/0),"Math",{acosh:function(t){return(t=+t)<1?NaN:t>94906265.62425156?Math.log(t)+Math.LN2:o(t-1+i(t-1)*i(t+1))}})},function(t,e,n){function r(t){return isFinite(t=+t)&&0!=t?t<0?-r(-t):Math.log(t+Math.sqrt(t*t+1)):t}var o=n(0),i=Math.asinh;o(o.S+o.F*!(i&&1/i(0)>0),"Math",{asinh:r})},function(t,e,n){var r=n(0),o=Math.atanh;r(r.S+r.F*!(o&&1/o(-0)<0),"Math",{atanh:function(t){return 0==(t=+t)?t:Math.log((1+t)/(1-t))/2}})},function(t,e,n){var r=n(0),o=n(105);r(r.S,"Math",{cbrt:function(t){return o(t=+t)*Math.pow(Math.abs(t),1/3)}})},function(t,e,n){var r=n(0);r(r.S,"Math",{clz32:function(t){return(t>>>=0)?31-Math.floor(Math.log(t+.5)*Math.LOG2E):32}})},function(t,e,n){var r=n(0),o=Math.exp;r(r.S,"Math",{cosh:function(t){return(o(t=+t)+o(-t))/2}})},function(t,e,n){var r=n(0),o=n(104);r(r.S+r.F*(o!=Math.expm1),"Math",{expm1:o})},function(t,e,n){var r=n(0),o=n(105),i=Math.pow,a=i(2,-52),s=i(2,-23),u=i(2,127)*(2-s),l=i(2,-126),c=function(t){return t+1/a-1/a};r(r.S,"Math",{fround:function(t){var e,n,r=Math.abs(t),i=o(t);return r<l?i*c(r/l/s)*l*s:(e=(1+s/a)*r,n=e-(e-r),n>u||n!=n?i*(1/0):i*n)}})},function(t,e,n){var r=n(0),o=Math.abs;r(r.S,"Math",{hypot:function(t,e){for(var n,r,i=0,a=0,s=arguments.length,u=0;a<s;)n=o(arguments[a++]),u<n?(r=u/n,i=i*r*r+1,u=n):n>0?(r=n/u,i+=r*r):i+=n;return u===1/0?1/0:u*Math.sqrt(i)}})},function(t,e,n){var r=n(0),o=Math.imul;r(r.S+r.F*n(6)(function(){return o(4294967295,5)!=-5||2!=o.length}),"Math",{imul:function(t,e){var n=65535,r=+t,o=+e,i=n&r,a=n&o;return 0|i*a+((n&r>>>16)*a+i*(n&o>>>16)<<16>>>0)}})},function(t,e,n){var r=n(0);r(r.S,"Math",{log10:function(t){return Math.log(t)/Math.LN10}})},function(t,e,n){var r=n(0);r(r.S,"Math",{log1p:n(150)})},function(t,e,n){var r=n(0);r(r.S,"Math",{log2:function(t){return Math.log(t)/Math.LN2}})},function(t,e,n){var r=n(0);r(r.S,"Math",{sign:n(105)})},function(t,e,n){var r=n(0),o=n(104),i=Math.exp;r(r.S+r.F*n(6)(function(){return!Math.sinh(-2e-17)!=-2e-17}),"Math",{sinh:function(t){return Math.abs(t=+t)<1?(o(t)-o(-t))/2:(i(t-1)-i(-t-1))*(Math.E/2)}})},function(t,e,n){var r=n(0),o=n(104),i=Math.exp;r(r.S,"Math",{tanh:function(t){var e=o(t=+t),n=o(-t);return e==1/0?1:n==1/0?-1:(e-n)/(i(t)+i(-t))}})},function(t,e,n){var r=n(0);r(r.S,"Math",{trunc:function(t){return(t>0?Math.floor:Math.ceil)(t)}})},function(t,e,n){"use strict";var r=n(5),o=n(13),i=n(22),a=n(99),s=n(28),u=n(6),l=n(42).f,c=n(20).f,f=n(10).f,p=n(54).trim,h="Number",d=r[h],v=d,m=d.prototype,_=i(n(41)(m))==h,g="trim"in String.prototype,y=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=g?e.trim():p(e,3);var n,r,o,i=e.charCodeAt(0);if(43===i||45===i){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===i){switch(e.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+e}for(var a,u=e.slice(2),l=0,c=u.length;l<c;l++)if(a=u.charCodeAt(l),a<48||a>o)return NaN;return parseInt(u,r)}}return+e};if(!d(" 0o1")||!d("0b1")||d("+0x1")){d=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof d&&(_?u(function(){m.valueOf.call(n)}):i(n)!=h)?a(new v(y(e)),n,d):y(e)};for(var b,w=n(9)?l(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;w.length>x;x++)o(v,b=w[x])&&!o(d,b)&&f(d,b,c(v,b));d.prototype=m,m.constructor=d,n(16)(r,h,d)}},function(t,e,n){var r=n(0);r(r.S,"Number",{EPSILON:Math.pow(2,-52)})},function(t,e,n){var r=n(0),o=n(5).isFinite;r(r.S,"Number",{isFinite:function(t){return"number"==typeof t&&o(t)}})},function(t,e,n){var r=n(0);r(r.S,"Number",{isInteger:n(147)})},function(t,e,n){var r=n(0);r(r.S,"Number",{isNaN:function(t){return t!=t}})},function(t,e,n){var r=n(0),o=n(147),i=Math.abs;r(r.S,"Number",{isSafeInteger:function(t){return o(t)&&i(t)<=9007199254740991}})},function(t,e,n){var r=n(0);r(r.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},function(t,e,n){var r=n(0);r(r.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},function(t,e,n){var r=n(0),o=n(157);r(r.S+r.F*(Number.parseFloat!=o),"Number",{parseFloat:o})},function(t,e,n){var r=n(0),o=n(158);r(r.S+r.F*(Number.parseInt!=o),"Number",{parseInt:o})},function(t,e,n){"use strict";var r=n(0),o=n(37),i=n(138),a=n(112),s=1..toFixed,u=Math.floor,l=[0,0,0,0,0,0],c="Number.toFixed: incorrect invocation!",f="0",p=function(t,e){for(var n=-1,r=e;++n<6;)r+=t*l[n],l[n]=r%1e7,r=u(r/1e7)},h=function(t){for(var e=6,n=0;--e>=0;)n+=l[e],l[e]=u(n/t),n=n%t*1e7},d=function(){for(var t=6,e="";--t>=0;)if(""!==e||0===t||0!==l[t]){var n=String(l[t]);e=""===e?n:e+a.call(f,7-n.length)+n}return e},v=function(t,e,n){return 0===e?n:e%2===1?v(t,e-1,n*t):v(t*t,e/2,n)},m=function(t){for(var e=0,n=t;n>=4096;)e+=12,n/=4096;for(;n>=2;)e+=1,n/=2;return e};r(r.P+r.F*(!!s&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!n(6)(function(){s.call({})})),"Number",{toFixed:function(t){var e,n,r,s,u=i(this,c),l=o(t),_="",g=f;if(l<0||l>20)throw RangeError(c);if(u!=u)return"NaN";if(u<=-1e21||u>=1e21)return String(u);if(u<0&&(_="-",u=-u),u>1e-21)if(e=m(u*v(2,69,1))-69,n=e<0?u*v(2,-e,1):u/v(2,e,1),n*=4503599627370496,e=52-e,e>0){for(p(0,n),r=l;r>=7;)p(1e7,0),r-=7;for(p(v(10,r,1),0),r=e-1;r>=23;)h(1<<23),r-=23;h(1<<r),p(1,1),h(2),g=d()}else p(0,n),p(1<<-e,0),g=d()+a.call(f,l);return l>0?(s=g.length,g=_+(s<=l?"0."+a.call(f,l-s)+g:g.slice(0,s-l)+"."+g.slice(s-l))):g=_+g,g}})},function(t,e,n){"use strict";var r=n(0),o=n(6),i=n(138),a=1..toPrecision;r(r.P+r.F*(o(function(){return"1"!==a.call(1,void 0)})||!o(function(){a.call({})})),"Number",{toPrecision:function(t){var e=i(this,"Number#toPrecision: incorrect invocation!");return void 0===t?a.call(e):a.call(e,t)}})},function(t,e,n){var r=n(0);r(r.S+r.F,"Object",{assign:n(151)})},function(t,e,n){var r=n(0);r(r.S,"Object",{create:n(41)})},function(t,e,n){var r=n(0);r(r.S+r.F*!n(9),"Object",{defineProperties:n(152)})},function(t,e,n){var r=n(0);r(r.S+r.F*!n(9),"Object",{defineProperty:n(10).f})},function(t,e,n){var r=n(7),o=n(35).onFreeze;n(27)("freeze",function(t){return function(e){return t&&r(e)?t(o(e)):e}})},function(t,e,n){var r=n(18),o=n(20).f;n(27)("getOwnPropertyDescriptor",function(){return function(t,e){return o(r(t),e)}})},function(t,e,n){n(27)("getOwnPropertyNames",function(){return n(153).f})},function(t,e,n){var r=n(12),o=n(21);n(27)("getPrototypeOf",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(7);n(27)("isExtensible",function(t){return function(e){return!!r(e)&&(!t||t(e))}})},function(t,e,n){var r=n(7);n(27)("isFrozen",function(t){return function(e){return!r(e)||!!t&&t(e)}})},function(t,e,n){var r=n(7);n(27)("isSealed",function(t){return function(e){return!r(e)||!!t&&t(e)}})},function(t,e,n){var r=n(0);r(r.S,"Object",{is:n(159)})},function(t,e,n){var r=n(12),o=n(43);n(27)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(7),o=n(35).onFreeze;n(27)("preventExtensions",function(t){return function(e){return t&&r(e)?t(o(e)):e}})},function(t,e,n){var r=n(7),o=n(35).onFreeze;n(27)("seal",function(t){return function(e){return t&&r(e)?t(o(e)):e}})},function(t,e,n){var r=n(0);r(r.S,"Object",{setPrototypeOf:n(107).set})},function(t,e,n){"use strict";var r=n(58),o={};o[n(8)("toStringTag")]="z",o+""!="[object z]"&&n(16)(Object.prototype,"toString",function(){return"[object "+r(this)+"]"},!0)},function(t,e,n){var r=n(0),o=n(157);r(r.G+r.F*(parseFloat!=o),{parseFloat:o})},function(t,e,n){var r=n(0),o=n(158);r(r.G+r.F*(parseInt!=o),{parseInt:o})},function(t,e,n){"use strict";var r,o,i,a=n(40),s=n(5),u=n(32),l=n(58),c=n(0),f=n(7),p=n(14),h=n(39),d=n(51),v=n(109),m=n(114).set,_=n(106)(),g="Promise",y=s.TypeError,b=s.process,w=s[g],b=s.process,x="process"==l(b),E=function(){},T=!!function(){try{var t=w.resolve(1),e=(t.constructor={})[n(8)("species")]=function(t){t(E,E)};return(x||"function"==typeof PromiseRejectionEvent)&&t.then(E)instanceof e}catch(t){}}(),O=function(t,e){return t===e||t===w&&e===i},S=function(t){var e;return!(!f(t)||"function"!=typeof(e=t.then))&&e},P=function(t){return O(w,t)?new M(t):new o(t)},M=o=function(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw y("Bad Promise constructor");e=t,n=r}),this.resolve=p(e),this.reject=p(n)},j=function(t){try{t()}catch(t){return{error:t}}},A=function(t,e){if(!t._n){t._n=!0;var n=t._c;_(function(){for(var r=t._v,o=1==t._s,i=0,a=function(e){var n,i,a=o?e.ok:e.fail,s=e.resolve,u=e.reject,l=e.domain;try{a?(o||(2==t._h&&R(t),t._h=1),a===!0?n=r:(l&&l.enter(),n=a(r),l&&l.exit()),n===e.promise?u(y("Promise-chain cycle")):(i=S(n))?i.call(n,s,u):s(n)):u(r)}catch(t){u(t)}};n.length>i;)a(n[i++]);t._c=[],t._n=!1,e&&!t._h&&C(t)})}},C=function(t){m.call(s,function(){var e,n,r,o=t._v;if(k(t)&&(e=j(function(){x?b.emit("unhandledRejection",o,t):(n=s.onunhandledrejection)?n({promise:t,reason:o}):(r=s.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=x||k(t)?2:1),t._a=void 0,e)throw e.error})},k=function(t){if(1==t._h)return!1;for(var e,n=t._a||t._c,r=0;n.length>r;)if(e=n[r++],e.fail||!k(e.promise))return!1;return!0},R=function(t){m.call(s,function(){var e;x?b.emit("rejectionHandled",t):(e=s.onrejectionhandled)&&e({promise:t,reason:t._v})})},I=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),A(e,!0))},N=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw y("Promise can't be resolved itself");(e=S(t))?_(function(){var r={_w:n,_d:!1};try{e.call(t,u(N,r,1),u(I,r,1))}catch(t){I.call(r,t)}}):(n._v=t,n._s=1,A(n,!1))}catch(t){I.call({_w:n,_d:!1},t)}}};T||(w=function(t){h(this,w,g,"_h"),p(t),r.call(this);try{t(u(N,this,1),u(I,this,1))}catch(t){I.call(this,t)}},r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},r.prototype=n(44)(w.prototype,{then:function(t,e){var n=P(v(this,w));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=x?b.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&A(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),M=function(){var t=new r;this.promise=t,this.resolve=u(N,t,1),this.reject=u(I,t,1)}),c(c.G+c.W+c.F*!T,{Promise:w}),n(53)(w,g),n(45)(g),i=n(31)[g],c(c.S+c.F*!T,g,{reject:function(t){var e=P(this),n=e.reject;return n(t),e.promise}}),c(c.S+c.F*(a||!T),g,{resolve:function(t){if(t instanceof w&&O(t.constructor,this))return t;var e=P(this),n=e.resolve;return n(t),e.promise}}),c(c.S+c.F*!(T&&n(75)(function(t){w.all(t).catch(E)})),g,{all:function(t){var e=this,n=P(e),r=n.resolve,o=n.reject,i=j(function(){var n=[],i=0,a=1;d(t,!1,function(t){var s=i++,u=!1;n.push(void 0),a++,e.resolve(t).then(function(t){u||(u=!0,n[s]=t,--a||r(n))},o)}),--a||r(n)});return i&&o(i.error),n.promise},race:function(t){var e=this,n=P(e),r=n.reject,o=j(function(){d(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o&&r(o.error),n.promise}})},function(t,e,n){var r=n(0),o=n(14),i=n(4),a=(n(5).Reflect||{}).apply,s=Function.apply;r(r.S+r.F*!n(6)(function(){a(function(){})}),"Reflect",{apply:function(t,e,n){var r=o(t),u=i(n);return a?a(r,e,u):s.call(r,e,u)}})},function(t,e,n){var r=n(0),o=n(41),i=n(14),a=n(4),s=n(7),u=n(6),l=n(142),c=(n(5).Reflect||{}).construct,f=u(function(){function t(){}return!(c(function(){},[],t)instanceof t)}),p=!u(function(){c(function(){})});r(r.S+r.F*(f||p),"Reflect",{construct:function(t,e){i(t),a(e);var n=arguments.length<3?t:i(arguments[2]);if(p&&!f)return c(t,e,n);if(t==n){switch(e.length){case 0:return new t;case 1:return new t(e[0]);case 2:return new t(e[0],e[1]);case 3:return new t(e[0],e[1],e[2]);case 4:return new t(e[0],e[1],e[2],e[3])}var r=[null];return r.push.apply(r,e),new(l.apply(t,r))}var u=n.prototype,h=o(s(u)?u:Object.prototype),d=Function.apply.call(t,h,e);return s(d)?d:h}})},function(t,e,n){var r=n(10),o=n(0),i=n(4),a=n(28);o(o.S+o.F*n(6)(function(){Reflect.defineProperty(r.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function(t,e,n){i(t),e=a(e,!0),i(n);try{return r.f(t,e,n),!0}catch(t){return!1}}})},function(t,e,n){var r=n(0),o=n(20).f,i=n(4);r(r.S,"Reflect",{deleteProperty:function(t,e){var n=o(i(t),e);return!(n&&!n.configurable)&&delete t[e]}})},function(t,e,n){"use strict";var r=n(0),o=n(4),i=function(t){this._t=o(t),this._i=0;var e,n=this._k=[];for(e in t)n.push(e)};n(102)(i,"Object",function(){var t,e=this,n=e._k;do if(e._i>=n.length)return{value:void 0,done:!0};while(!((t=n[e._i++])in e._t));return{value:t,done:!1}}),r(r.S,"Reflect",{enumerate:function(t){return new i(t)}})},function(t,e,n){var r=n(20),o=n(0),i=n(4);o(o.S,"Reflect",{getOwnPropertyDescriptor:function(t,e){return r.f(i(t),e)}})},function(t,e,n){var r=n(0),o=n(21),i=n(4);r(r.S,"Reflect",{getPrototypeOf:function(t){return o(i(t))}})},function(t,e,n){function r(t,e){var n,s,c=arguments.length<3?t:arguments[2];return l(t)===c?t[e]:(n=o.f(t,e))?a(n,"value")?n.value:void 0!==n.get?n.get.call(c):void 0:u(s=i(t))?r(s,e,c):void 0}var o=n(20),i=n(21),a=n(13),s=n(0),u=n(7),l=n(4);s(s.S,"Reflect",{get:r})},function(t,e,n){var r=n(0);r(r.S,"Reflect",{has:function(t,e){return e in t}})},function(t,e,n){var r=n(0),o=n(4),i=Object.isExtensible;r(r.S,"Reflect",{isExtensible:function(t){return o(t),!i||i(t)}})},function(t,e,n){var r=n(0);r(r.S,"Reflect",{ownKeys:n(156)})},function(t,e,n){var r=n(0),o=n(4),i=Object.preventExtensions;r(r.S,"Reflect",{preventExtensions:function(t){o(t);try{return i&&i(t),!0}catch(t){return!1}}})},function(t,e,n){var r=n(0),o=n(107);o&&r(r.S,"Reflect",{setPrototypeOf:function(t,e){o.check(t,e);try{return o.set(t,e),!0}catch(t){return!1}}})},function(t,e,n){function r(t,e,n){var u,p,h=arguments.length<4?t:arguments[3],d=i.f(c(t),e);if(!d){if(f(p=a(t)))return r(p,e,n,h);d=l(0)}return s(d,"value")?!(d.writable===!1||!f(h))&&(u=i.f(h,e)||l(0),u.value=n,o.f(h,e,u),!0):void 0!==d.set&&(d.set.call(h,n),!0)}var o=n(10),i=n(20),a=n(21),s=n(13),u=n(0),l=n(36),c=n(4),f=n(7);u(u.S,"Reflect",{set:r})},function(t,e,n){var r=n(5),o=n(99),i=n(10).f,a=n(42).f,s=n(74),u=n(72),l=r.RegExp,c=l,f=l.prototype,p=/a/g,h=/a/g,d=new l(p)!==p;if(n(9)&&(!d||n(6)(function(){return h[n(8)("match")]=!1,l(p)!=p||l(h)==h||"/a/i"!=l(p,"i")}))){l=function(t,e){var n=this instanceof l,r=s(t),i=void 0===e;return!n&&r&&t.constructor===l&&i?t:o(d?new c(r&&!i?t.source:t,e):c((r=t instanceof l)?t.source:t,r&&i?u.call(t):e),n?this:f,l)};for(var v=(function(t){t in l||i(l,t,{configurable:!0,get:function(){return c[t]},set:function(e){c[t]=e}})}),m=a(c),_=0;m.length>_;)v(m[_++]);f.constructor=l,l.prototype=f,n(16)(r,"RegExp",l)}n(45)("RegExp")},function(t,e,n){n(71)("match",1,function(t,e,n){return[function(n){"use strict";var r=t(this),o=void 0==n?void 0:n[e];return void 0!==o?o.call(n,r):new RegExp(n)[e](String(r))},n]})},function(t,e,n){n(71)("replace",2,function(t,e,n){return[function(r,o){"use strict";var i=t(this),a=void 0==r?void 0:r[e];return void 0!==a?a.call(r,i,o):n.call(String(i),r,o)},n]})},function(t,e,n){n(71)("search",1,function(t,e,n){return[function(n){"use strict";var r=t(this),o=void 0==n?void 0:n[e];return void 0!==o?o.call(n,r):new RegExp(n)[e](String(r))},n]})},function(t,e,n){n(71)("split",2,function(t,e,r){"use strict";var o=n(74),i=r,a=[].push,s="split",u="length",l="lastIndex";if("c"=="abbc"[s](/(b)*/)[1]||4!="test"[s](/(?:)/,-1)[u]||2!="ab"[s](/(?:ab)*/)[u]||4!="."[s](/(.?)(.?)/)[u]||"."[s](/()()/)[u]>1||""[s](/.?/)[u]){var c=void 0===/()??/.exec("")[1];r=function(t,e){var n=String(this);if(void 0===t&&0===e)return[];if(!o(t))return i.call(n,t,e);var r,s,f,p,h,d=[],v=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),m=0,_=void 0===e?4294967295:e>>>0,g=new RegExp(t.source,v+"g");for(c||(r=new RegExp("^"+g.source+"$(?!\\s)",v));(s=g.exec(n))&&(f=s.index+s[0][u],!(f>m&&(d.push(n.slice(m,s.index)),!c&&s[u]>1&&s[0].replace(r,function(){for(h=1;h<arguments[u]-2;h++)void 0===arguments[h]&&(s[h]=void 0)}),s[u]>1&&s.index<n[u]&&a.apply(d,s.slice(1)),p=s[0][u],m=f,d[u]>=_)));)g[l]===s.index&&g[l]++;return m===n[u]?!p&&g.test("")||d.push(""):d.push(n.slice(m)),d[u]>_?d.slice(0,_):d}}else"0"[s](void 0,0)[u]&&(r=function(t,e){return void 0===t&&0===e?[]:i.call(this,t,e)});return[function(n,o){var i=t(this),a=void 0==n?void 0:n[e];return void 0!==a?a.call(n,i,o):r.call(String(i),n,o)},r]})},function(t,e,n){"use strict";n(163);var r=n(4),o=n(72),i=n(9),a="toString",s=/./[a],u=function(t){n(16)(RegExp.prototype,a,t,!0)};n(6)(function(){return"/a/b"!=s.call({source:"a",flags:"b"})})?u(function(){var t=r(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?o.call(t):void 0)}):s.name!=a&&u(function(){return s.call(this)})},function(t,e,n){"use strict";n(17)("anchor",function(t){return function(e){return t(this,"a","name",e)}})},function(t,e,n){"use strict";n(17)("big",function(t){return function(){return t(this,"big","","")}})},function(t,e,n){"use strict";n(17)("blink",function(t){return function(){return t(this,"blink","","")}})},function(t,e,n){"use strict";n(17)("bold",function(t){return function(){return t(this,"b","","")}})},function(t,e,n){"use strict";var r=n(0),o=n(110)(!1);r(r.P,"String",{codePointAt:function(t){return o(this,t)}})},function(t,e,n){"use strict";var r=n(0),o=n(11),i=n(111),a="endsWith",s=""[a];r(r.P+r.F*n(97)(a),"String",{endsWith:function(t){var e=i(this,t,a),n=arguments.length>1?arguments[1]:void 0,r=o(e.length),u=void 0===n?r:Math.min(o(n),r),l=String(t);return s?s.call(e,l,u):e.slice(u-l.length,u)===l}})},function(t,e,n){"use strict";n(17)("fixed",function(t){return function(){return t(this,"tt","","")}})},function(t,e,n){"use strict";n(17)("fontcolor",function(t){return function(e){return t(this,"font","color",e)}})},function(t,e,n){"use strict";n(17)("fontsize",function(t){return function(e){return t(this,"font","size",e)}})},function(t,e,n){var r=n(0),o=n(46),i=String.fromCharCode,a=String.fromCodePoint;r(r.S+r.F*(!!a&&1!=a.length),"String",{fromCodePoint:function(t){for(var e,n=[],r=arguments.length,a=0;r>a;){if(e=+arguments[a++],o(e,1114111)!==e)throw RangeError(e+" is not a valid code point");n.push(e<65536?i(e):i(((e-=65536)>>10)+55296,e%1024+56320))}return n.join("")}})},function(t,e,n){"use strict";var r=n(0),o=n(111),i="includes";r(r.P+r.F*n(97)(i),"String",{includes:function(t){return!!~o(this,t,i).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},function(t,e,n){"use strict";n(17)("italics",function(t){return function(){return t(this,"i","","")}})},function(t,e,n){"use strict";var r=n(110)(!0);n(103)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";n(17)("link",function(t){return function(e){return t(this,"a","href",e)}})},function(t,e,n){var r=n(0),o=n(18),i=n(11);r(r.S,"String",{raw:function(t){for(var e=o(t.raw),n=i(e.length),r=arguments.length,a=[],s=0;n>s;)a.push(String(e[s++])),s<r&&a.push(String(arguments[s]));return a.join("")}})},function(t,e,n){var r=n(0);r(r.P,"String",{repeat:n(112)})},function(t,e,n){"use strict";n(17)("small",function(t){return function(){return t(this,"small","","")}})},function(t,e,n){"use strict";var r=n(0),o=n(11),i=n(111),a="startsWith",s=""[a];r(r.P+r.F*n(97)(a),"String",{startsWith:function(t){var e=i(this,t,a),n=o(Math.min(arguments.length>1?arguments[1]:void 0,e.length)),r=String(t);return s?s.call(e,r,n):e.slice(n,n+r.length)===r}})},function(t,e,n){"use strict";n(17)("strike",function(t){return function(){return t(this,"strike","","")}})},function(t,e,n){"use strict";n(17)("sub",function(t){return function(){return t(this,"sub","","")}})},function(t,e,n){"use strict";n(17)("sup",function(t){return function(){return t(this,"sup","","")}})},function(t,e,n){"use strict";n(54)("trim",function(t){return function(){return t(this,3)}})},function(t,e,n){"use strict";var r=n(5),o=n(13),i=n(9),a=n(0),s=n(16),u=n(35).KEY,l=n(6),c=n(78),f=n(53),p=n(47),h=n(8),d=n(161),v=n(116),m=n(272),_=n(271),g=n(101),y=n(4),b=n(18),w=n(28),x=n(36),E=n(41),T=n(153),O=n(20),S=n(10),P=n(43),M=O.f,j=S.f,A=T.f,C=r.Symbol,k=r.JSON,R=k&&k.stringify,I="prototype",N=h("_hidden"),U=h("toPrimitive"),F={}.propertyIsEnumerable,L=c("symbol-registry"),D=c("symbols"),B=c("op-symbols"),V=Object[I],W="function"==typeof C,X=r.QObject,z=!X||!X[I]||!X[I].findChild,G=i&&l(function(){return 7!=E(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=M(V,e);r&&delete V[e],j(t,e,n),r&&t!==V&&j(V,e,r)}:j,q=function(t){var e=D[t]=E(C[I]);return e._k=t,e},H=W&&"symbol"==typeof C.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof C},Y=function(t,e,n){return t===V&&Y(B,e,n),y(t),e=w(e,!0),y(n),o(D,e)?(n.enumerable?(o(t,N)&&t[N][e]&&(t[N][e]=!1),n=E(n,{enumerable:x(0,!1)})):(o(t,N)||j(t,N,x(1,{})),t[N][e]=!0),G(t,e,n)):j(t,e,n)},K=function(t,e){y(t);for(var n,r=_(e=b(e)),o=0,i=r.length;i>o;)Y(t,n=r[o++],e[n]);return t},$=function(t,e){return void 0===e?E(t):K(E(t),e)},Z=function(t){var e=F.call(this,t=w(t,!0));return!(this===V&&o(D,t)&&!o(B,t))&&(!(e||!o(this,t)||!o(D,t)||o(this,N)&&this[N][t])||e)},Q=function(t,e){if(t=b(t),e=w(e,!0),t!==V||!o(D,e)||o(B,e)){var n=M(t,e);return!n||!o(D,e)||o(t,N)&&t[N][e]||(n.enumerable=!0),n}},J=function(t){for(var e,n=A(b(t)),r=[],i=0;n.length>i;)o(D,e=n[i++])||e==N||e==u||r.push(e);return r},tt=function(t){for(var e,n=t===V,r=A(n?B:b(t)),i=[],a=0;r.length>a;)!o(D,e=r[a++])||n&&!o(V,e)||i.push(D[e]);return i};W||(C=function(){if(this instanceof C)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===V&&e.call(B,n),o(this,N)&&o(this[N],t)&&(this[N][t]=!1),G(this,t,x(1,n))};return i&&z&&G(V,t,{configurable:!0,set:e}),q(t)},s(C[I],"toString",function(){return this._k}),O.f=Q,S.f=Y,n(42).f=T.f=J,n(60).f=Z,n(77).f=tt,i&&!n(40)&&s(V,"propertyIsEnumerable",Z,!0),d.f=function(t){return q(h(t))}),a(a.G+a.W+a.F*!W,{Symbol:C});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)h(et[nt++]);for(var et=P(h.store),nt=0;et.length>nt;)v(et[nt++]);a(a.S+a.F*!W,"Symbol",{for:function(t){return o(L,t+="")?L[t]:L[t]=C(t)},keyFor:function(t){if(H(t))return m(L,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){z=!0},useSimple:function(){z=!1}}),a(a.S+a.F*!W,"Object",{create:$,defineProperty:Y,defineProperties:K,getOwnPropertyDescriptor:Q,getOwnPropertyNames:J,getOwnPropertySymbols:tt}),k&&a(a.S+a.F*(!W||l(function(){var t=C();return"[null]"!=R([t])||"{}"!=R({a:t})||"{}"!=R(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!H(t)){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!H(e))return e}),r[1]=e,R.apply(k,r)}}}),C[I][U]||n(15)(C[I],U,C[I].valueOf),f(C,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){"use strict";var r=n(0),o=n(79),i=n(115),a=n(4),s=n(46),u=n(11),l=n(7),c=n(5).ArrayBuffer,f=n(109),p=i.ArrayBuffer,h=i.DataView,d=o.ABV&&c.isView,v=p.prototype.slice,m=o.VIEW,_="ArrayBuffer";r(r.G+r.W+r.F*(c!==p),{ArrayBuffer:p}),r(r.S+r.F*!o.CONSTR,_,{isView:function(t){return d&&d(t)||l(t)&&m in t}}),r(r.P+r.U+r.F*n(6)(function(){return!new p(2).slice(1,void 0).byteLength}),_,{slice:function(t,e){if(void 0!==v&&void 0===e)return v.call(a(this),t);for(var n=a(this).byteLength,r=s(t,n),o=s(void 0===e?n:e,n),i=new(f(this,p))(u(o-r)),l=new h(this),c=new h(i),d=0;r<o;)c.setUint8(d++,l.getUint8(r++));return i}}),n(45)(_)},function(t,e,n){var r=n(0);r(r.G+r.W+r.F*!n(79).ABV,{DataView:n(115).DataView})},function(t,e,n){n(34)("Float32",4,function(t){return function(e,n,r){return t(this,e,n,r)}})},function(t,e,n){n(34)("Float64",8,function(t){return function(e,n,r){return t(this,e,n,r)}})},function(t,e,n){n(34)("Int16",2,function(t){return function(e,n,r){return t(this,e,n,r)}})},function(t,e,n){n(34)("Int32",4,function(t){return function(e,n,r){return t(this,e,n,r)}})},function(t,e,n){n(34)("Int8",1,function(t){return function(e,n,r){return t(this,e,n,r)}})},function(t,e,n){n(34)("Uint16",2,function(t){return function(e,n,r){return t(this,e,n,r)}})},function(t,e,n){n(34)("Uint32",4,function(t){return function(e,n,r){return t(this,e,n,r)}})},function(t,e,n){n(34)("Uint8",1,function(t){return function(e,n,r){return t(this,e,n,r)}})},function(t,e,n){n(34)("Uint8",1,function(t){return function(e,n,r){return t(this,e,n,r)}},!0)},function(t,e,n){"use strict";var r=n(145);n(70)("WeakSet",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(this,t,!0)}},r,!1,!0)},function(t,e,n){"use strict";var r=n(0),o=n(69)(!0);r(r.P,"Array",{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n(50)("includes")},function(t,e,n){var r=n(0),o=n(106)(),i=n(5).process,a="process"==n(22)(i);r(r.G,{asap:function(t){var e=a&&i.domain;o(e?e.bind(t):t)}})},function(t,e,n){var r=n(0),o=n(22);r(r.S,"Error",{isError:function(t){return"Error"===o(t)}})},function(t,e,n){var r=n(0);r(r.P+r.R,"Map",{toJSON:n(144)("Map")})},function(t,e,n){var r=n(0);r(r.S,"Math",{iaddh:function(t,e,n,r){var o=t>>>0,i=e>>>0,a=n>>>0;return i+(r>>>0)+((o&a|(o|a)&~(o+a>>>0))>>>31)|0}})},function(t,e,n){var r=n(0);r(r.S,"Math",{imulh:function(t,e){var n=65535,r=+t,o=+e,i=r&n,a=o&n,s=r>>16,u=o>>16,l=(s*a>>>0)+(i*a>>>16);return s*u+(l>>16)+((i*u>>>0)+(l&n)>>16)}})},function(t,e,n){var r=n(0);r(r.S,"Math",{isubh:function(t,e,n,r){var o=t>>>0,i=e>>>0,a=n>>>0;return i-(r>>>0)-((~o&a|~(o^a)&o-a>>>0)>>>31)|0}})},function(t,e,n){var r=n(0);r(r.S,"Math",{umulh:function(t,e){var n=65535,r=+t,o=+e,i=r&n,a=o&n,s=r>>>16,u=o>>>16,l=(s*a>>>0)+(i*a>>>16);return s*u+(l>>>16)+((i*u>>>0)+(l&n)>>>16)}})},function(t,e,n){"use strict";var r=n(0),o=n(12),i=n(14),a=n(10);n(9)&&r(r.P+n(76),"Object",{__defineGetter__:function(t,e){a.f(o(this),t,{get:i(e),enumerable:!0,configurable:!0})}})},function(t,e,n){"use strict";var r=n(0),o=n(12),i=n(14),a=n(10);n(9)&&r(r.P+n(76),"Object",{__defineSetter__:function(t,e){a.f(o(this),t,{set:i(e),enumerable:!0,configurable:!0})}})},function(t,e,n){var r=n(0),o=n(155)(!0);r(r.S,"Object",{entries:function(t){return o(t)}})},function(t,e,n){var r=n(0),o=n(156),i=n(18),a=n(20),s=n(94);r(r.S,"Object",{getOwnPropertyDescriptors:function(t){for(var e,n=i(t),r=a.f,u=o(n),l={},c=0;u.length>c;)s(l,e=u[c++],r(n,e));return l}})},function(t,e,n){"use strict";var r=n(0),o=n(12),i=n(28),a=n(21),s=n(20).f;n(9)&&r(r.P+n(76),"Object",{__lookupGetter__:function(t){var e,n=o(this),r=i(t,!0);do if(e=s(n,r))return e.get;while(n=a(n))}})},function(t,e,n){"use strict";var r=n(0),o=n(12),i=n(28),a=n(21),s=n(20).f;n(9)&&r(r.P+n(76),"Object",{__lookupSetter__:function(t){var e,n=o(this),r=i(t,!0);do if(e=s(n,r))return e.set;while(n=a(n))}})},function(t,e,n){var r=n(0),o=n(155)(!1);r(r.S,"Object",{values:function(t){return o(t)}})},function(t,e,n){"use strict";var r=n(0),o=n(5),i=n(31),a=n(106)(),s=n(8)("observable"),u=n(14),l=n(4),c=n(39),f=n(44),p=n(15),h=n(51),d=h.RETURN,v=function(t){return null==t?void 0:u(t)},m=function(t){var e=t._c;e&&(t._c=void 0,e())},_=function(t){return void 0===t._o},g=function(t){_(t)||(t._o=void 0,m(t))},y=function(t,e){l(t),this._c=void 0,this._o=t,t=new b(this);try{var n=e(t),r=n;null!=n&&("function"==typeof n.unsubscribe?n=function(){r.unsubscribe()}:u(n),this._c=n)}catch(e){return void t.error(e)}_(this)&&m(this)};y.prototype=f({},{unsubscribe:function(){g(this)}});var b=function(t){this._s=t};b.prototype=f({},{next:function(t){var e=this._s;if(!_(e)){var n=e._o;try{var r=v(n.next);if(r)return r.call(n,t)}catch(t){try{g(e)}finally{throw t}}}},error:function(t){var e=this._s;if(_(e))throw t;var n=e._o;e._o=void 0;try{var r=v(n.error);if(!r)throw t;t=r.call(n,t)}catch(t){try{m(e)}finally{throw t}}return m(e),t},complete:function(t){var e=this._s;if(!_(e)){var n=e._o;e._o=void 0;try{var r=v(n.complete);t=r?r.call(n,t):void 0}catch(t){try{m(e)}finally{throw t}}return m(e),t}}});var w=function(t){c(this,w,"Observable","_f")._f=u(t)};f(w.prototype,{subscribe:function(t){return new y(t,this._f)},forEach:function(t){var e=this;return new(i.Promise||o.Promise)(function(n,r){u(t);var o=e.subscribe({next:function(e){try{return t(e)}catch(t){r(t),o.unsubscribe()}},error:r,complete:n})})}}),f(w,{from:function(t){var e="function"==typeof this?this:w,n=v(l(t)[s]);if(n){var r=l(n.call(t));return r.constructor===e?r:new e(function(t){return r.subscribe(t)})}return new e(function(e){var n=!1;return a(function(){if(!n){try{if(h(t,!1,function(t){if(e.next(t),n)return d})===d)return}catch(t){if(n)throw t;return void e.error(t)}e.complete()}}),function(){n=!0}})},of:function(){for(var t=0,e=arguments.length,n=Array(e);t<e;)n[t]=arguments[t++];return new("function"==typeof this?this:w)(function(t){var e=!1;return a(function(){if(!e){for(var r=0;r<n.length;++r)if(t.next(n[r]),e)return;t.complete()}}),function(){e=!0}})}}),p(w.prototype,s,function(){return this}),r(r.G,{Observable:w}),n(45)("Observable")},function(t,e,n){var r=n(33),o=n(4),i=r.key,a=r.set;r.exp({defineMetadata:function(t,e,n,r){a(t,e,o(n),i(r))}})},function(t,e,n){var r=n(33),o=n(4),i=r.key,a=r.map,s=r.store;r.exp({deleteMetadata:function(t,e){var n=arguments.length<3?void 0:i(arguments[2]),r=a(o(e),n,!1);if(void 0===r||!r.delete(t))return!1;if(r.size)return!0;var u=s.get(e);return u.delete(n),!!u.size||s.delete(e)}})},function(t,e,n){var r=n(164),o=n(140),i=n(33),a=n(4),s=n(21),u=i.keys,l=i.key,c=function(t,e){var n=u(t,e),i=s(t);if(null===i)return n;var a=c(i,e);return a.length?n.length?o(new r(n.concat(a))):a:n};i.exp({getMetadataKeys:function(t){return c(a(t),arguments.length<2?void 0:l(arguments[1]))}})},function(t,e,n){var r=n(33),o=n(4),i=n(21),a=r.has,s=r.get,u=r.key,l=function(t,e,n){var r=a(t,e,n);if(r)return s(t,e,n);var o=i(e);return null!==o?l(t,o,n):void 0};r.exp({getMetadata:function(t,e){return l(t,o(e),arguments.length<3?void 0:u(arguments[2]))}})},function(t,e,n){var r=n(33),o=n(4),i=r.keys,a=r.key;r.exp({getOwnMetadataKeys:function(t){return i(o(t),arguments.length<2?void 0:a(arguments[1]))}})},function(t,e,n){var r=n(33),o=n(4),i=r.get,a=r.key;
r.exp({getOwnMetadata:function(t,e){return i(t,o(e),arguments.length<3?void 0:a(arguments[2]))}})},function(t,e,n){var r=n(33),o=n(4),i=n(21),a=r.has,s=r.key,u=function(t,e,n){var r=a(t,e,n);if(r)return!0;var o=i(e);return null!==o&&u(t,o,n)};r.exp({hasMetadata:function(t,e){return u(t,o(e),arguments.length<3?void 0:s(arguments[2]))}})},function(t,e,n){var r=n(33),o=n(4),i=r.has,a=r.key;r.exp({hasOwnMetadata:function(t,e){return i(t,o(e),arguments.length<3?void 0:a(arguments[2]))}})},function(t,e,n){var r=n(33),o=n(4),i=n(14),a=r.key,s=r.set;r.exp({metadata:function(t,e){return function(n,r){s(t,e,(void 0!==r?o:i)(n),a(r))}}})},function(t,e,n){var r=n(0);r(r.P+r.R,"Set",{toJSON:n(144)("Set")})},function(t,e,n){"use strict";var r=n(0),o=n(110)(!0);r(r.P,"String",{at:function(t){return o(this,t)}})},function(t,e,n){"use strict";var r=n(0),o=n(23),i=n(11),a=n(74),s=n(72),u=RegExp.prototype,l=function(t,e){this._r=t,this._s=e};n(102)(l,"RegExp String",function(){var t=this._r.exec(this._s);return{value:t,done:null===t}}),r(r.P,"String",{matchAll:function(t){if(o(this),!a(t))throw TypeError(t+" is not a regexp!");var e=String(this),n="flags"in u?String(t.flags):s.call(t),r=new RegExp(t.source,~n.indexOf("g")?n:"g"+n);return r.lastIndex=i(t.lastIndex),new l(r,e)}})},function(t,e,n){"use strict";var r=n(0),o=n(160);r(r.P,"String",{padEnd:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0,!1)}})},function(t,e,n){"use strict";var r=n(0),o=n(160);r(r.P,"String",{padStart:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},function(t,e,n){"use strict";n(54)("trimLeft",function(t){return function(){return t(this,1)}},"trimStart")},function(t,e,n){"use strict";n(54)("trimRight",function(t){return function(){return t(this,2)}},"trimEnd")},function(t,e,n){n(116)("asyncIterator")},function(t,e,n){n(116)("observable")},function(t,e,n){var r=n(0);r(r.S,"System",{global:n(5)})},function(t,e,n){for(var r=n(118),o=n(16),i=n(5),a=n(15),s=n(52),u=n(8),l=u("iterator"),c=u("toStringTag"),f=s.Array,p=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],h=0;h<5;h++){var d,v=p[h],m=i[v],_=m&&m.prototype;if(_){_[l]||a(_,l,f),_[c]||a(_,c,v),s[v]=f;for(d in r)_[d]||o(_,d,r[d],!0)}}},function(t,e,n){var r=n(0),o=n(114);r(r.G+r.B,{setImmediate:o.set,clearImmediate:o.clear})},function(t,e,n){var r=n(5),o=n(0),i=n(73),a=n(273),s=r.navigator,u=!!s&&/MSIE .\./.test(s.userAgent),l=function(t){return u?function(e,n){return t(i(a,[].slice.call(arguments,2),"function"==typeof e?e:Function(e)),n)}:t};o(o.G+o.B+o.F*u,{setTimeout:l(r.setTimeout),setInterval:l(r.setInterval)})},function(t,e,n){n(396),n(335),n(337),n(336),n(339),n(341),n(346),n(340),n(338),n(348),n(347),n(343),n(344),n(342),n(334),n(345),n(349),n(350),n(302),n(304),n(303),n(352),n(351),n(322),n(332),n(333),n(323),n(324),n(325),n(326),n(327),n(328),n(329),n(330),n(331),n(305),n(306),n(307),n(308),n(309),n(310),n(311),n(312),n(313),n(314),n(315),n(316),n(317),n(318),n(319),n(320),n(321),n(383),n(388),n(395),n(386),n(378),n(379),n(384),n(389),n(391),n(374),n(375),n(376),n(377),n(380),n(381),n(382),n(385),n(387),n(390),n(392),n(393),n(394),n(297),n(299),n(298),n(301),n(300),n(286),n(284),n(290),n(287),n(293),n(295),n(283),n(289),n(280),n(294),n(278),n(292),n(291),n(285),n(288),n(277),n(279),n(282),n(281),n(296),n(118),n(368),n(373),n(163),n(369),n(370),n(371),n(372),n(353),n(162),n(164),n(165),n(408),n(397),n(398),n(403),n(406),n(407),n(401),n(404),n(402),n(405),n(399),n(400),n(354),n(355),n(356),n(357),n(358),n(361),n(359),n(360),n(362),n(363),n(364),n(365),n(367),n(366),n(409),n(435),n(438),n(437),n(439),n(440),n(436),n(441),n(442),n(420),n(423),n(419),n(417),n(418),n(421),n(422),n(412),n(434),n(443),n(411),n(413),n(415),n(414),n(416),n(425),n(426),n(428),n(427),n(430),n(429),n(431),n(432),n(433),n(410),n(424),n(446),n(445),n(444),t.exports=n(31)},function(t,e,n){"use strict";function r(t,e,n){var r,o,i=t.length,a=e.arrayArgs.length,s=e.indexArgs.length>0,u=[],l=[],c=0,f=0;for(r=0;r<i;++r)l.push(["i",r,"=0"].join(""));for(o=0;o<a;++o)for(r=0;r<i;++r)f=c,c=t[r],0===r?l.push(["d",o,"s",r,"=t",o,"p",c].join("")):l.push(["d",o,"s",r,"=(t",o,"p",c,"-s",f,"*t",o,"p",f,")"].join(""));for(u.push("var "+l.join(",")),r=i-1;r>=0;--r)c=t[r],u.push(["for(i",r,"=0;i",r,"<s",c,";++i",r,"){"].join(""));for(u.push(n),r=0;r<i;++r){for(f=c,c=t[r],o=0;o<a;++o)u.push(["p",o,"+=d",o,"s",r].join(""));s&&(r>0&&u.push(["index[",f,"]-=s",f].join("")),u.push(["++index[",c,"]"].join(""))),u.push("}")}return u.join("\n")}function o(t,e,n,o){for(var i=e.length,a=n.arrayArgs.length,s=n.blockSize,u=n.indexArgs.length>0,l=[],c=0;c<a;++c)l.push(["var offset",c,"=p",c].join(""));for(var c=t;c<i;++c)l.push(["for(var j"+c+"=SS[",e[c],"]|0;j",c,">0;){"].join("")),l.push(["if(j",c,"<",s,"){"].join("")),l.push(["s",e[c],"=j",c].join("")),l.push(["j",c,"=0"].join("")),l.push(["}else{s",e[c],"=",s].join("")),l.push(["j",c,"-=",s,"}"].join("")),u&&l.push(["index[",e[c],"]=j",c].join(""));for(var c=0;c<a;++c){for(var f=["offset"+c],p=t;p<i;++p)f.push(["j",p,"*t",c,"p",e[p]].join(""));l.push(["p",c,"=(",f.join("+"),")"].join(""))}l.push(r(e,n,o));for(var c=t;c<i;++c)l.push("}");return l.join("\n")}function i(t){for(var e=0,n=t[0].length;e<n;){for(var r=1;r<t.length;++r)if(t[r][e]!==t[0][e])return e;++e}return e}function a(t,e,n){for(var r=t.body,o=[],i=[],a=0;a<t.args.length;++a){var s=t.args[a];if(!(s.count<=0)){var u=new RegExp(s.name,"g"),l="",c=e.arrayArgs.indexOf(a);switch(e.argTypes[a]){case"offset":var f=e.offsetArgIndex.indexOf(a),p=e.offsetArgs[f];c=p.array,l="+q"+f;case"array":l="p"+c+l;var h="l"+a,d="a"+c;if(0===e.arrayBlockIndices[c])1===s.count?"generic"===n[c]?s.lvalue?(o.push(["var ",h,"=",d,".get(",l,")"].join("")),r=r.replace(u,h),i.push([d,".set(",l,",",h,")"].join(""))):r=r.replace(u,[d,".get(",l,")"].join("")):r=r.replace(u,[d,"[",l,"]"].join("")):"generic"===n[c]?(o.push(["var ",h,"=",d,".get(",l,")"].join("")),r=r.replace(u,h),s.lvalue&&i.push([d,".set(",l,",",h,")"].join(""))):(o.push(["var ",h,"=",d,"[",l,"]"].join("")),r=r.replace(u,h),s.lvalue&&i.push([d,"[",l,"]=",h].join("")));else{for(var v=[s.name],m=[l],_=0;_<Math.abs(e.arrayBlockIndices[c]);_++)v.push("\\s*\\[([^\\]]+)\\]"),m.push("$"+(_+1)+"*t"+c+"b"+_);if(u=new RegExp(v.join(""),"g"),l=m.join("+"),"generic"===n[c])throw new Error("cwise: Generic arrays not supported in combination with blocks!");r=r.replace(u,[d,"[",l,"]"].join(""))}break;case"scalar":r=r.replace(u,"Y"+e.scalarArgs.indexOf(a));break;case"index":r=r.replace(u,"index");break;case"shape":r=r.replace(u,"shape")}}}return[o.join("\n"),r,i.join("\n")].join("\n").trim()}function s(t){for(var e=new Array(t.length),n=!0,r=0;r<t.length;++r){var o=t[r],i=o.match(/\d+/);i=i?i[0]:"",0===o.charAt(0)?e[r]="u"+o.charAt(1)+i:e[r]=o.charAt(0)+i,r>0&&(n=n&&e[r]===e[r-1])}return n?e[0]:e.join("")}function u(t,e){for(var n=e[1].length-Math.abs(t.arrayBlockIndices[0])|0,u=new Array(t.arrayArgs.length),c=new Array(t.arrayArgs.length),f=0;f<t.arrayArgs.length;++f)c[f]=e[2*f],u[f]=e[2*f+1];for(var p=[],h=[],d=[],v=[],m=[],f=0;f<t.arrayArgs.length;++f){t.arrayBlockIndices[f]<0?(d.push(0),v.push(n),p.push(n),h.push(n+t.arrayBlockIndices[f])):(d.push(t.arrayBlockIndices[f]),v.push(t.arrayBlockIndices[f]+n),p.push(0),h.push(t.arrayBlockIndices[f]));for(var _=[],g=0;g<u[f].length;g++)d[f]<=u[f][g]&&u[f][g]<v[f]&&_.push(u[f][g]-d[f]);m.push(_)}for(var y=["SS"],b=["'use strict'"],w=[],g=0;g<n;++g)w.push(["s",g,"=SS[",g,"]"].join(""));for(var f=0;f<t.arrayArgs.length;++f){y.push("a"+f),y.push("t"+f),y.push("p"+f);for(var g=0;g<n;++g)w.push(["t",f,"p",g,"=t",f,"[",d[f]+g,"]"].join(""));for(var g=0;g<Math.abs(t.arrayBlockIndices[f]);++g)w.push(["t",f,"b",g,"=t",f,"[",p[f]+g,"]"].join(""))}for(var f=0;f<t.scalarArgs.length;++f)y.push("Y"+f);if(t.shapeArgs.length>0&&w.push("shape=SS.slice(0)"),t.indexArgs.length>0){for(var x=new Array(n),f=0;f<n;++f)x[f]="0";w.push(["index=[",x.join(","),"]"].join(""))}for(var f=0;f<t.offsetArgs.length;++f){for(var E=t.offsetArgs[f],T=[],g=0;g<E.offset.length;++g)0!==E.offset[g]&&(1===E.offset[g]?T.push(["t",E.array,"p",g].join("")):T.push([E.offset[g],"*t",E.array,"p",g].join("")));0===T.length?w.push("q"+f+"=0"):w.push(["q",f,"=",T.join("+")].join(""))}var O=l([].concat(t.pre.thisVars).concat(t.body.thisVars).concat(t.post.thisVars));w=w.concat(O),b.push("var "+w.join(","));for(var f=0;f<t.arrayArgs.length;++f)b.push("p"+f+"|=0");t.pre.body.length>3&&b.push(a(t.pre,t,c));var S=a(t.body,t,c),P=i(m);P<n?b.push(o(P,m[0],t,S)):b.push(r(m[0],t,S)),t.post.body.length>3&&b.push(a(t.post,t,c)),t.debug&&console.log("-----Generated cwise routine for ",e,":\n"+b.join("\n")+"\n----------");var M=[t.funcName||"unnamed","_cwise_loop_",u[0].join("s"),"m",P,s(c)].join(""),j=new Function(["function ",M,"(",y.join(","),"){",b.join("\n"),"} return ",M].join(""));return j()}var l=n(193);t.exports=u},function(t,e,n){"use strict";function r(t){var e=["'use strict'","var CACHED={}"],n=[],r=t.funcName+"_cwise_thunk";e.push(["return function ",r,"(",t.shimArgs.join(","),"){"].join(""));for(var i=[],a=[],s=[["array",t.arrayArgs[0],".shape.slice(",Math.max(0,t.arrayBlockIndices[0]),t.arrayBlockIndices[0]<0?","+t.arrayBlockIndices[0]+")":")"].join("")],u=[],l=[],c=0;c<t.arrayArgs.length;++c){var f=t.arrayArgs[c];n.push(["t",f,"=array",f,".dtype,","r",f,"=array",f,".order"].join("")),i.push("t"+f),i.push("r"+f),a.push("t"+f),a.push("r"+f+".join()"),s.push("array"+f+".data"),s.push("array"+f+".stride"),s.push("array"+f+".offset|0"),c>0&&(u.push("array"+t.arrayArgs[0]+".shape.length===array"+f+".shape.length+"+(Math.abs(t.arrayBlockIndices[0])-Math.abs(t.arrayBlockIndices[c]))),l.push("array"+t.arrayArgs[0]+".shape[shapeIndex+"+Math.max(0,t.arrayBlockIndices[0])+"]===array"+f+".shape[shapeIndex+"+Math.max(0,t.arrayBlockIndices[c])+"]"))}t.arrayArgs.length>1&&(e.push("if (!("+u.join(" && ")+")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"),e.push("for(var shapeIndex=array"+t.arrayArgs[0]+".shape.length-"+Math.abs(t.arrayBlockIndices[0])+"; shapeIndex-->0;) {"),e.push("if (!("+l.join(" && ")+")) throw new Error('cwise: Arrays do not all have the same shape!')"),e.push("}"));for(var c=0;c<t.scalarArgs.length;++c)s.push("scalar"+t.scalarArgs[c]);n.push(["type=[",a.join(","),"].join()"].join("")),n.push("proc=CACHED[type]"),e.push("var "+n.join(",")),e.push(["if(!proc){","CACHED[type]=proc=compile([",i.join(","),"])}","return proc(",s.join(","),")}"].join("")),t.debug&&console.log("-----Generated thunk:\n"+e.join("\n")+"\n----------");var p=new Function("compile",e.join("\n"));return p(o.bind(void 0,t))}var o=n(448);t.exports=r},function(t,e,n){"use strict";(function(e){function r(t,e,n){this.name=t,this.lvalue=e,this.rvalue=n,this.count=0}function o(t,e,n,r){this.body=t,this.args=e,this.thisVars=n,this.localVars=r}function i(t){if("eval"===t)throw new Error("cwise-parser: eval() not allowed");return"undefined"!=typeof window?t in window:"undefined"!=typeof e?t in e:"undefined"!=typeof self&&t in self}function a(t){for(var e=t.body[0].expression.callee.params,n=new Array(e.length),r=0;r<e.length;++r)n[r]=e[r].name;return n}function s(t){function e(t){var e=m+t.replace(/\_/g,"__");return x.push(e),e}function n(t){var e="this_"+t.replace(/\_/g,"__");return E.push(e),e}function s(t,e){for(var n=t.range[0],r=t.range[1],o=n+1;o<r;++o)b[o]="";b[n]=e}function f(t){return"'"+t.replace(/\_/g,"\\_").replace(/\'/g,"'")+"'"}function p(t){return b.slice(t.range[0],t.range[1]).join("")}function h(t){return"AssignmentExpression"===t.parent.type&&t.parent.left===t?"="===t.parent.operator?T:T|O:"UpdateExpression"===t.parent.type?T|O:O}for(var d=["(",t,")()"].join(""),v=u.parse(d,{range:!0}),m="_inline_"+c++ +"_",_=a(v),g=new Array(_.length),y=0;y<_.length;++y)g[y]=new r([m,"arg",y,"_"].join(""),!1,!1);for(var b=new Array(d.length),y=0,w=d.length;y<w;++y)b[y]=d.charAt(y);var x=[],E=[],T=1,O=2;!function t(r,o){if(r.parent=o,"MemberExpression"===r.type)r.computed?(t(r.object,r),t(r.property,r)):"ThisExpression"===r.object.type?s(r,n(r.property.name)):t(r.object,r);else{if("ThisExpression"===r.type)throw new Error("cwise-parser: Computed this is not allowed");if("Identifier"===r.type){var a=r.name,u=_.indexOf(a);if(u>=0){var l=g[u],c=h(r);c&T&&(l.lvalue=!0),c&O&&(l.rvalue=!0),++l.count,s(r,l.name)}else i(a)||s(r,e(a))}else if("Literal"===r.type)"string"==typeof r.value&&s(r,f(r.value));else{if("WithStatement"===r.type)throw new Error("cwise-parser: with() statements not allowed");for(var p=Object.keys(r),d=0,v=p.length;d<v;++d)if("parent"!==p[d]){var m=r[p[d]];if(m)if(m instanceof Array)for(var y=0;y<m.length;++y)m[y]&&"string"==typeof m[y].type&&t(m[y],r);else"string"==typeof m.type&&t(m,r)}}}}(v.body[0].expression.callee.body,void 0),l(x),l(E);var S=new o(p(v.body[0].expression.callee.body),g,E,x);return S}var u=n(451),l=n(193),c=0;t.exports=s}).call(e,n(38))},function(t,e,n){var r,o,i;!function(n,a){"use strict";o=[e],r=a,i="function"==typeof r?r.apply(e,o):r,!(void 0!==i&&(t.exports=i))}(this,function(t){"use strict";function e(t,e){if(!t)throw new Error("ASSERT: "+e)}function n(t){return t>=48&&t<=57}function r(t){return"0123456789abcdefABCDEF".indexOf(t)>=0}function o(t){return"01234567".indexOf(t)>=0}function i(t){return 32===t||9===t||11===t||12===t||160===t||t>=5760&&[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279].indexOf(t)>=0}function a(t){return 10===t||13===t||8232===t||8233===t}function s(t){return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||92===t||t>=128&&ie.NonAsciiIdentifierStart.test(String.fromCharCode(t))}function u(t){return 36===t||95===t||t>=65&&t<=90||t>=97&&t<=122||t>=48&&t<=57||92===t||t>=128&&ie.NonAsciiIdentifierPart.test(String.fromCharCode(t))}function l(t){switch(t){case"class":case"enum":case"export":case"extends":case"import":case"super":return!0;default:return!1}}function c(t){switch(t){case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"yield":case"let":return!0;default:return!1}}function f(t){return"eval"===t||"arguments"===t}function p(t){if(ue&&c(t))return!0;switch(t.length){case 2:return"if"===t||"in"===t||"do"===t;case 3:return"var"===t||"for"===t||"new"===t||"try"===t||"let"===t;case 4:return"this"===t||"else"===t||"case"===t||"void"===t||"with"===t||"enum"===t;case 5:return"while"===t||"break"===t||"catch"===t||"throw"===t||"const"===t||"yield"===t||"class"===t||"super"===t;case 6:return"return"===t||"typeof"===t||"delete"===t||"switch"===t||"export"===t||"import"===t;case 7:return"default"===t||"finally"===t||"extends"===t;case 8:return"function"===t||"continue"===t||"debugger"===t;case 10:return"instanceof"===t;default:return!1}}function h(t,n,r,o,i){var a;e("number"==typeof r,"Comment must have valid position"),ve.lastCommentStart>=r||(ve.lastCommentStart=r,a={type:t,value:n},me.range&&(a.range=[r,o]),me.loc&&(a.loc=i),me.comments.push(a),me.attachComment&&(me.leadingComments.push(a),me.trailingComments.push(a)))}function d(t){var e,n,r,o;for(e=le-t,n={start:{line:ce,column:le-fe-t}};le<pe;)if(r=se.charCodeAt(le),++le,a(r))return me.comments&&(o=se.slice(e+t,le-1),n.end={line:ce,column:le-fe-1},h("Line",o,e,le-1,n)),13===r&&10===se.charCodeAt(le)&&++le,++ce,void(fe=le);me.comments&&(o=se.slice(e+t,le),n.end={line:ce,column:le-fe},h("Line",o,e,le,n))}function v(){var t,e,n,r;for(me.comments&&(t=le-2,e={start:{line:ce,column:le-fe-2}});le<pe;)if(n=se.charCodeAt(le),a(n))13===n&&10===se.charCodeAt(le+1)&&++le,++ce,++le,fe=le,le>=pe&&V({},oe.UnexpectedToken,"ILLEGAL");else if(42===n){if(47===se.charCodeAt(le+1))return++le,++le,void(me.comments&&(r=se.slice(t+2,le-2),e.end={line:ce,column:le-fe},h("Block",r,t,le,e)));++le}else++le;V({},oe.UnexpectedToken,"ILLEGAL")}function m(){var t,e;for(e=0===le;le<pe;)if(t=se.charCodeAt(le),i(t))++le;else if(a(t))++le,13===t&&10===se.charCodeAt(le)&&++le,++ce,fe=le,e=!0;else if(47===t)if(t=se.charCodeAt(le+1),47===t)++le,++le,d(2),e=!0;else{if(42!==t)break;++le,++le,v()}else if(e&&45===t){if(45!==se.charCodeAt(le+1)||62!==se.charCodeAt(le+2))break;le+=3,d(3)}else{if(60!==t)break;if("!--"!==se.slice(le+1,le+4))break;++le,++le,++le,++le,d(4)}}function _(t){var e,n,o,i=0;for(n="u"===t?4:2,e=0;e<n;++e){if(!(le<pe&&r(se[le])))return"";o=se[le++],i=16*i+"0123456789abcdef".indexOf(o.toLowerCase())}return String.fromCharCode(i)}function g(){var t,e;for(t=se.charCodeAt(le++),e=String.fromCharCode(t),92===t&&(117!==se.charCodeAt(le)&&V({},oe.UnexpectedToken,"ILLEGAL"),++le,t=_("u"),t&&"\\"!==t&&s(t.charCodeAt(0))||V({},oe.UnexpectedToken,"ILLEGAL"),e=t);le<pe&&(t=se.charCodeAt(le),u(t));)++le,e+=String.fromCharCode(t),92===t&&(e=e.substr(0,e.length-1),117!==se.charCodeAt(le)&&V({},oe.UnexpectedToken,"ILLEGAL"),++le,t=_("u"),t&&"\\"!==t&&u(t.charCodeAt(0))||V({},oe.UnexpectedToken,"ILLEGAL"),e+=t);return e}function y(){var t,e;for(t=le++;le<pe;){if(e=se.charCodeAt(le),92===e)return le=t,g();if(!u(e))break;++le}return se.slice(t,le)}function b(){var t,e,n;return t=le,e=92===se.charCodeAt(le)?g():y(),n=1===e.length?Jt.Identifier:p(e)?Jt.Keyword:"null"===e?Jt.NullLiteral:"true"===e||"false"===e?Jt.BooleanLiteral:Jt.Identifier,{type:n,value:e,lineNumber:ce,lineStart:fe,start:t,end:le}}function w(){var t,e,n,r,o=le,i=se.charCodeAt(le),a=se[le];switch(i){case 46:case 40:case 41:case 59:case 44:case 123:case 125:case 91:case 93:case 58:case 63:case 126:return++le,me.tokenize&&(40===i?me.openParenToken=me.tokens.length:123===i&&(me.openCurlyToken=me.tokens.length)),{type:Jt.Punctuator,value:String.fromCharCode(i),lineNumber:ce,lineStart:fe,start:o,end:le};default:if(t=se.charCodeAt(le+1),61===t)switch(i){case 43:case 45:case 47:case 60:case 62:case 94:case 124:case 37:case 38:case 42:return le+=2,{type:Jt.Punctuator,value:String.fromCharCode(i)+String.fromCharCode(t),lineNumber:ce,lineStart:fe,start:o,end:le};case 33:case 61:return le+=2,61===se.charCodeAt(le)&&++le,{type:Jt.Punctuator,value:se.slice(o,le),lineNumber:ce,lineStart:fe,start:o,end:le}}}return r=se.substr(le,4),">>>="===r?(le+=4,{type:Jt.Punctuator,value:r,lineNumber:ce,lineStart:fe,start:o,end:le}):(n=r.substr(0,3),">>>"===n||"<<="===n||">>="===n?(le+=3,{type:Jt.Punctuator,value:n,lineNumber:ce,lineStart:fe,start:o,end:le}):(e=n.substr(0,2),a===e[1]&&"+-<>&|".indexOf(a)>=0||"=>"===e?(le+=2,{type:Jt.Punctuator,value:e,lineNumber:ce,lineStart:fe,start:o,end:le}):"<>=!+-*%&|^/".indexOf(a)>=0?(++le,{type:Jt.Punctuator,value:a,lineNumber:ce,lineStart:fe,start:o,end:le}):void V({},oe.UnexpectedToken,"ILLEGAL")))}function x(t){for(var e="";le<pe&&r(se[le]);)e+=se[le++];return 0===e.length&&V({},oe.UnexpectedToken,"ILLEGAL"),s(se.charCodeAt(le))&&V({},oe.UnexpectedToken,"ILLEGAL"),{type:Jt.NumericLiteral,value:parseInt("0x"+e,16),lineNumber:ce,lineStart:fe,start:t,end:le}}function E(t){for(var e="0"+se[le++];le<pe&&o(se[le]);)e+=se[le++];return(s(se.charCodeAt(le))||n(se.charCodeAt(le)))&&V({},oe.UnexpectedToken,"ILLEGAL"),{type:Jt.NumericLiteral,value:parseInt(e,8),octal:!0,lineNumber:ce,lineStart:fe,start:t,end:le}}function T(){var t,e;for(t=le+1;t<pe;++t){if(e=se[t],"8"===e||"9"===e)return!1;if(!o(e))return!0}return!0}function O(){var t,r,i;if(i=se[le],e(n(i.charCodeAt(0))||"."===i,"Numeric literal must start with a decimal digit or a decimal point"),r=le,t="","."!==i){if(t=se[le++],i=se[le],"0"===t){if("x"===i||"X"===i)return++le,x(r);if(o(i)&&T())return E(r)}for(;n(se.charCodeAt(le));)t+=se[le++];i=se[le]}if("."===i){for(t+=se[le++];n(se.charCodeAt(le));)t+=se[le++];i=se[le]}if("e"===i||"E"===i)if(t+=se[le++],i=se[le],"+"!==i&&"-"!==i||(t+=se[le++]),n(se.charCodeAt(le)))for(;n(se.charCodeAt(le));)t+=se[le++];else V({},oe.UnexpectedToken,"ILLEGAL");return s(se.charCodeAt(le))&&V({},oe.UnexpectedToken,"ILLEGAL"),{type:Jt.NumericLiteral,value:parseFloat(t),lineNumber:ce,lineStart:fe,start:r,end:le}}function S(){var t,n,r,i,s,u,l,c,f="",p=!1;for(l=ce,c=fe,t=se[le],e("'"===t||'"'===t,"String literal must starts with a quote"),n=le,++le;le<pe;){if(r=se[le++],r===t){t="";break}if("\\"===r)if(r=se[le++],r&&a(r.charCodeAt(0)))++ce,"\r"===r&&"\n"===se[le]&&++le,fe=le;else switch(r){case"u":case"x":u=le,s=_(r),s?f+=s:(le=u,f+=r);break;case"n":f+="\n";break;case"r":f+="\r";break;case"t":f+="\t";break;case"b":f+="\b";break;case"f":f+="\f";break;case"v":f+="\v";break;default:o(r)?(i="01234567".indexOf(r),0!==i&&(p=!0),le<pe&&o(se[le])&&(p=!0,i=8*i+"01234567".indexOf(se[le++]),"0123".indexOf(r)>=0&&le<pe&&o(se[le])&&(i=8*i+"01234567".indexOf(se[le++]))),f+=String.fromCharCode(i)):f+=r}else{if(a(r.charCodeAt(0)))break;f+=r}}return""!==t&&V({},oe.UnexpectedToken,"ILLEGAL"),{type:Jt.StringLiteral,value:f,octal:p,startLineNumber:l,startLineStart:c,lineNumber:ce,lineStart:fe,start:n,end:le}}function P(t,e){var n;try{n=new RegExp(t,e)}catch(t){V({},oe.InvalidRegExp)}return n}function M(){var t,n,r,o,i;for(t=se[le],e("/"===t,"Regular expression literal must start with a slash"),n=se[le++],r=!1,o=!1;le<pe;)if(t=se[le++],n+=t,"\\"===t)t=se[le++],a(t.charCodeAt(0))&&V({},oe.UnterminatedRegExp),n+=t;else if(a(t.charCodeAt(0)))V({},oe.UnterminatedRegExp);else if(r)"]"===t&&(r=!1);else{if("/"===t){o=!0;break}"["===t&&(r=!0)}return o||V({},oe.UnterminatedRegExp),i=n.substr(1,n.length-2),{value:i,literal:n}}function j(){var t,e,n,r;for(e="",n="";le<pe&&(t=se[le],u(t.charCodeAt(0)));)if(++le,"\\"===t&&le<pe)if(t=se[le],"u"===t){if(++le,r=le,t=_("u"))for(n+=t,e+="\\u";r<le;++r)e+=se[r];else le=r,n+="u",e+="\\u";W({},oe.UnexpectedToken,"ILLEGAL")}else e+="\\",W({},oe.UnexpectedToken,"ILLEGAL");else n+=t,e+=t;return{value:n,literal:e}}function A(){var t,e,n,r;return de=null,m(),t=le,e=M(),n=j(),r=P(e.value,n.value),me.tokenize?{type:Jt.RegularExpression,value:r,lineNumber:ce,lineStart:fe,start:t,end:le}:{literal:e.literal+n.literal,value:r,start:t,end:le}}function C(){var t,e,n,r;return m(),t=le,e={start:{line:ce,column:le-fe}},n=A(),e.end={line:ce,column:le-fe},me.tokenize||(me.tokens.length>0&&(r=me.tokens[me.tokens.length-1],r.range[0]===t&&"Punctuator"===r.type&&("/"!==r.value&&"/="!==r.value||me.tokens.pop())),me.tokens.push({type:"RegularExpression",value:n.literal,range:[t,le],loc:e})),n}function k(t){return t.type===Jt.Identifier||t.type===Jt.Keyword||t.type===Jt.BooleanLiteral||t.type===Jt.NullLiteral}function R(){var t,e;if(t=me.tokens[me.tokens.length-1],!t)return C();if("Punctuator"===t.type){if("]"===t.value)return w();if(")"===t.value)return e=me.tokens[me.openParenToken-1],!e||"Keyword"!==e.type||"if"!==e.value&&"while"!==e.value&&"for"!==e.value&&"with"!==e.value?w():C();if("}"===t.value){if(me.tokens[me.openCurlyToken-3]&&"Keyword"===me.tokens[me.openCurlyToken-3].type){if(e=me.tokens[me.openCurlyToken-4],!e)return w()}else{if(!me.tokens[me.openCurlyToken-4]||"Keyword"!==me.tokens[me.openCurlyToken-4].type)return w();if(e=me.tokens[me.openCurlyToken-5],!e)return C()}return ee.indexOf(e.value)>=0?w():C()}return C()}return"Keyword"===t.type&&"this"!==t.value?C():w()}function I(){var t;return m(),le>=pe?{type:Jt.EOF,lineNumber:ce,lineStart:fe,start:le,end:le}:(t=se.charCodeAt(le),s(t)?b():40===t||41===t||59===t?w():39===t||34===t?S():46===t?n(se.charCodeAt(le+1))?O():w():n(t)?O():me.tokenize&&47===t?R():w())}function N(){var t,e,n;return m(),t={start:{line:ce,column:le-fe}},e=I(),t.end={line:ce,column:le-fe},e.type!==Jt.EOF&&(n=se.slice(e.start,e.end),me.tokens.push({type:te[e.type],value:n,range:[e.start,e.end],loc:t})),e}function U(){var t;return t=de,le=t.end,ce=t.lineNumber,fe=t.lineStart,de="undefined"!=typeof me.tokens?N():I(),le=t.end,ce=t.lineNumber,fe=t.lineStart,t}function F(){var t,e,n;t=le,e=ce,n=fe,de="undefined"!=typeof me.tokens?N():I(),le=t,ce=e,fe=n}function L(t,e){this.line=t,this.column=e}function D(t,e,n,r){this.start=new L(t,e),this.end=new L(n,r)}function B(){var t,e,n,r;return t=le,e=ce,n=fe,m(),r=ce!==e,le=t,ce=e,fe=n,r}function V(t,n){var r,o=Array.prototype.slice.call(arguments,2),i=n.replace(/%(\d)/g,function(t,n){return e(n<o.length,"Message reference must be in range"),o[n]});throw"number"==typeof t.lineNumber?(r=new Error("Line "+t.lineNumber+": "+i),r.index=t.start,r.lineNumber=t.lineNumber,r.column=t.start-fe+1):(r=new Error("Line "+ce+": "+i),r.index=le,r.lineNumber=ce,r.column=le-fe+1),r.description=i,r}function W(){try{V.apply(null,arguments)}catch(t){if(!me.errors)throw t;me.errors.push(t)}}function X(t){if(t.type===Jt.EOF&&V(t,oe.UnexpectedEOS),t.type===Jt.NumericLiteral&&V(t,oe.UnexpectedNumber),t.type===Jt.StringLiteral&&V(t,oe.UnexpectedString),t.type===Jt.Identifier&&V(t,oe.UnexpectedIdentifier),t.type===Jt.Keyword){if(l(t.value))V(t,oe.UnexpectedReserved);else if(ue&&c(t.value))return void W(t,oe.StrictReservedWord);V(t,oe.UnexpectedToken,t.value)}V(t,oe.UnexpectedToken,t.value)}function z(t){var e=U();e.type===Jt.Punctuator&&e.value===t||X(e)}function G(t){var e=U();e.type===Jt.Keyword&&e.value===t||X(e)}function q(t){return de.type===Jt.Punctuator&&de.value===t}function H(t){return de.type===Jt.Keyword&&de.value===t}function Y(){var t;return de.type===Jt.Punctuator&&(t=de.value,"="===t||"*="===t||"/="===t||"%="===t||"+="===t||"-="===t||"<<="===t||">>="===t||">>>="===t||"&="===t||"^="===t||"|="===t)}function K(){var t,e=le,n=ce,r=fe,o=de;return 59===se.charCodeAt(le)||q(";")?void U():(t=ce,m(),ce!==t?(le=e,ce=n,fe=r,void(de=o)):void(de.type===Jt.EOF||q("}")||X(de)))}function $(t){return t.type===ne.Identifier||t.type===ne.MemberExpression}function Z(){var t,e=[];for(t=de,z("[");!q("]");)q(",")?(U(),e.push(null)):(e.push(mt()),q("]")||z(","));return U(),he.markEnd(he.createArrayExpression(e),t)}function Q(t,e){var n,r,o;return n=ue,o=de,r=Xt(),e&&ue&&f(t[0].name)&&W(e,oe.StrictParamName),ue=n,he.markEnd(he.createFunctionExpression(null,t,[],r),o)}function J(){var t,e;return e=de,t=U(),t.type===Jt.StringLiteral||t.type===Jt.NumericLiteral?(ue&&t.octal&&W(t,oe.StrictOctalLiteral),he.markEnd(he.createLiteral(t),e)):he.markEnd(he.createIdentifier(t.value),e)}function tt(){var t,e,n,r,o,i;return t=de,i=de,t.type===Jt.Identifier?(n=J(),"get"!==t.value||q(":")?"set"!==t.value||q(":")?(z(":"),r=mt(),he.markEnd(he.createProperty("init",n,r),i)):(e=J(),z("("),t=de,t.type!==Jt.Identifier?(z(")"),W(t,oe.UnexpectedToken,t.value),r=Q([])):(o=[bt()],z(")"),r=Q(o,t)),he.markEnd(he.createProperty("set",e,r),i)):(e=J(),z("("),z(")"),r=Q([]),he.markEnd(he.createProperty("get",e,r),i))):t.type!==Jt.EOF&&t.type!==Jt.Punctuator?(e=J(),z(":"),r=mt(),he.markEnd(he.createProperty("init",e,r),i)):void X(t)}function et(){var t,e,n,r,o,i=[],a={},s=String;for(o=de,z("{");!q("}");)t=tt(),e=t.key.type===ne.Identifier?t.key.name:s(t.key.value),r="init"===t.kind?re.Data:"get"===t.kind?re.Get:re.Set,n="$"+e,Object.prototype.hasOwnProperty.call(a,n)?(a[n]===re.Data?ue&&r===re.Data?W({},oe.StrictDuplicateProperty):r!==re.Data&&W({},oe.AccessorDataProperty):r===re.Data?W({},oe.AccessorDataProperty):a[n]&r&&W({},oe.AccessorGetSet),a[n]|=r):a[n]=r,i.push(t),q("}")||z(",");return z("}"),he.markEnd(he.createObjectExpression(i),o)}function nt(){var t;return z("("),t=_t(),z(")"),t}function rt(){var t,e,n,r;if(q("("))return nt();if(q("["))return Z();if(q("{"))return et();if(t=de.type,r=de,t===Jt.Identifier)n=he.createIdentifier(U().value);else if(t===Jt.StringLiteral||t===Jt.NumericLiteral)ue&&de.octal&&W(de,oe.StrictOctalLiteral),n=he.createLiteral(U());else if(t===Jt.Keyword){if(H("function"))return qt();H("this")?(U(),n=he.createThisExpression()):X(U())}else t===Jt.BooleanLiteral?(e=U(),e.value="true"===e.value,n=he.createLiteral(e)):t===Jt.NullLiteral?(e=U(),e.value=null,n=he.createLiteral(e)):q("/")||q("/=")?(n="undefined"!=typeof me.tokens?he.createLiteral(C()):he.createLiteral(A()),F()):X(U());return he.markEnd(n,r)}function ot(){var t=[];if(z("("),!q(")"))for(;le<pe&&(t.push(mt()),!q(")"));)z(",");return z(")"),t}function it(){var t,e;return e=de,t=U(),k(t)||X(t),he.markEnd(he.createIdentifier(t.value),e)}function at(){return z("."),it()}function st(){var t;return z("["),t=_t(),z("]"),t}function ut(){var t,e,n;return n=de,G("new"),t=ct(),e=q("(")?ot():[],he.markEnd(he.createNewExpression(t,e),n)}function lt(){var t,e,n,r,o=ve.allowIn;for(r=de,ve.allowIn=!0,t=H("new")?ut():rt();;){if(q("."))n=at(),t=he.createMemberExpression(".",t,n);else if(q("("))e=ot(),t=he.createCallExpression(t,e);else{if(!q("["))break;n=st(),t=he.createMemberExpression("[",t,n)}he.markEnd(t,r)}return ve.allowIn=o,t}function ct(){var t,n,r;for(e(ve.allowIn,"callee of new expression always allow in keyword."),r=de,t=H("new")?ut():rt();q(".")||q("[");)q("[")?(n=st(),t=he.createMemberExpression("[",t,n)):(n=at(),t=he.createMemberExpression(".",t,n)),he.markEnd(t,r);return t}function ft(){var t,e,n=de;return t=lt(),de.type===Jt.Punctuator&&(!q("++")&&!q("--")||B()||(ue&&t.type===ne.Identifier&&f(t.name)&&W({},oe.StrictLHSPostfix),$(t)||W({},oe.InvalidLHSInAssignment),e=U(),t=he.markEnd(he.createPostfixExpression(e.value,t),n))),t}function pt(){var t,e,n;return de.type!==Jt.Punctuator&&de.type!==Jt.Keyword?e=ft():q("++")||q("--")?(n=de,t=U(),e=pt(),ue&&e.type===ne.Identifier&&f(e.name)&&W({},oe.StrictLHSPrefix),$(e)||W({},oe.InvalidLHSInAssignment),e=he.createUnaryExpression(t.value,e),e=he.markEnd(e,n)):q("+")||q("-")||q("~")||q("!")?(n=de,t=U(),e=pt(),e=he.createUnaryExpression(t.value,e),e=he.markEnd(e,n)):H("delete")||H("void")||H("typeof")?(n=de,t=U(),e=pt(),e=he.createUnaryExpression(t.value,e),e=he.markEnd(e,n),ue&&"delete"===e.operator&&e.argument.type===ne.Identifier&&W({},oe.StrictDelete)):e=ft(),e}function ht(t,e){var n=0;if(t.type!==Jt.Punctuator&&t.type!==Jt.Keyword)return 0;switch(t.value){case"||":n=1;break;case"&&":n=2;break;case"|":n=3;break;case"^":n=4;break;case"&":n=5;break;case"==":case"!=":case"===":case"!==":n=6;break;case"<":case">":case"<=":case">=":case"instanceof":n=7;break;case"in":n=e?7:0;break;case"<<":case">>":case">>>":n=8;break;case"+":case"-":n=9;break;case"*":case"/":case"%":n=11}return n}function dt(){var t,e,n,r,o,i,a,s,u,l;if(t=de,u=pt(),r=de,o=ht(r,ve.allowIn),0===o)return u;for(r.prec=o,U(),e=[t,de],a=pt(),i=[u,r,a];(o=ht(de,ve.allowIn))>0;){for(;i.length>2&&o<=i[i.length-2].prec;)a=i.pop(),s=i.pop().value,u=i.pop(),n=he.createBinaryExpression(s,u,a),e.pop(),t=e[e.length-1],he.markEnd(n,t),i.push(n);r=U(),r.prec=o,i.push(r),e.push(de),n=pt(),i.push(n)}for(l=i.length-1,n=i[l],e.pop();l>1;)n=he.createBinaryExpression(i[l-1].value,i[l-2],n),l-=2,t=e.pop(),he.markEnd(n,t);return n}function vt(){var t,e,n,r,o;return o=de,t=dt(),q("?")&&(U(),e=ve.allowIn,ve.allowIn=!0,n=mt(),ve.allowIn=e,z(":"),r=mt(),t=he.createConditionalExpression(t,n,r),he.markEnd(t,o)),t}function mt(){var t,e,n,r,o;return t=de,o=de,r=e=vt(),Y()&&($(e)||W({},oe.InvalidLHSInAssignment),ue&&e.type===ne.Identifier&&f(e.name)&&W(t,oe.StrictLHSAssignment),t=U(),n=mt(),r=he.markEnd(he.createAssignmentExpression(t.value,e,n),o)),r}function _t(){var t,e=de;if(t=mt(),q(",")){for(t=he.createSequenceExpression([t]);le<pe&&q(",");)U(),t.expressions.push(mt());he.markEnd(t,e)}return t}function gt(){for(var t,e=[];le<pe&&!q("}")&&(t=Ht(),"undefined"!=typeof t);)e.push(t);return e}function yt(){var t,e;return e=de,z("{"),t=gt(),z("}"),he.markEnd(he.createBlockStatement(t),e)}function bt(){var t,e;return e=de,t=U(),t.type!==Jt.Identifier&&X(t),he.markEnd(he.createIdentifier(t.value),e)}function wt(t){var e,n,r=null;return n=de,e=bt(),ue&&f(e.name)&&W({},oe.StrictVarName),"const"===t?(z("="),r=mt()):q("=")&&(U(),r=mt()),he.markEnd(he.createVariableDeclarator(e,r),n)}function xt(t){var e=[];do{if(e.push(wt(t)),!q(","))break;U()}while(le<pe);return e}function Et(){var t;return G("var"),t=xt(),K(),he.createVariableDeclaration(t,"var")}function Tt(t){var e,n;return n=de,G(t),e=xt(t),K(),he.markEnd(he.createVariableDeclaration(e,t),n)}function Ot(){return z(";"),he.createEmptyStatement()}function St(){var t=_t();return K(),he.createExpressionStatement(t)}function Pt(){var t,e,n;
return G("if"),z("("),t=_t(),z(")"),e=Wt(),H("else")?(U(),n=Wt()):n=null,he.createIfStatement(t,e,n)}function Mt(){var t,e,n;return G("do"),n=ve.inIteration,ve.inIteration=!0,t=Wt(),ve.inIteration=n,G("while"),z("("),e=_t(),z(")"),q(";")&&U(),he.createDoWhileStatement(t,e)}function jt(){var t,e,n;return G("while"),z("("),t=_t(),z(")"),n=ve.inIteration,ve.inIteration=!0,e=Wt(),ve.inIteration=n,he.createWhileStatement(t,e)}function At(){var t,e,n;return n=de,t=U(),e=xt(),he.markEnd(he.createVariableDeclaration(e,t.value),n)}function Ct(){var t,e,n,r,o,i,a,s=ve.allowIn;return t=e=n=null,G("for"),z("("),q(";")?U():(H("var")||H("let")?(ve.allowIn=!1,t=At(),ve.allowIn=s,1===t.declarations.length&&H("in")&&(U(),r=t,o=_t(),t=null)):(ve.allowIn=!1,t=_t(),ve.allowIn=s,H("in")&&($(t)||W({},oe.InvalidLHSInForIn),U(),r=t,o=_t(),t=null)),"undefined"==typeof r&&z(";")),"undefined"==typeof r&&(q(";")||(e=_t()),z(";"),q(")")||(n=_t())),z(")"),a=ve.inIteration,ve.inIteration=!0,i=Wt(),ve.inIteration=a,"undefined"==typeof r?he.createForStatement(t,e,n,i):he.createForInStatement(r,o,i)}function kt(){var t,e=null;return G("continue"),59===se.charCodeAt(le)?(U(),ve.inIteration||V({},oe.IllegalContinue),he.createContinueStatement(null)):B()?(ve.inIteration||V({},oe.IllegalContinue),he.createContinueStatement(null)):(de.type===Jt.Identifier&&(e=bt(),t="$"+e.name,Object.prototype.hasOwnProperty.call(ve.labelSet,t)||V({},oe.UnknownLabel,e.name)),K(),null!==e||ve.inIteration||V({},oe.IllegalContinue),he.createContinueStatement(e))}function Rt(){var t,e=null;return G("break"),59===se.charCodeAt(le)?(U(),ve.inIteration||ve.inSwitch||V({},oe.IllegalBreak),he.createBreakStatement(null)):B()?(ve.inIteration||ve.inSwitch||V({},oe.IllegalBreak),he.createBreakStatement(null)):(de.type===Jt.Identifier&&(e=bt(),t="$"+e.name,Object.prototype.hasOwnProperty.call(ve.labelSet,t)||V({},oe.UnknownLabel,e.name)),K(),null!==e||ve.inIteration||ve.inSwitch||V({},oe.IllegalBreak),he.createBreakStatement(e))}function It(){var t=null;return G("return"),ve.inFunctionBody||W({},oe.IllegalReturn),32===se.charCodeAt(le)&&s(se.charCodeAt(le+1))?(t=_t(),K(),he.createReturnStatement(t)):B()?he.createReturnStatement(null):(q(";")||q("}")||de.type===Jt.EOF||(t=_t()),K(),he.createReturnStatement(t))}function Nt(){var t,e;return ue&&(m(),W({},oe.StrictModeWith)),G("with"),z("("),t=_t(),z(")"),e=Wt(),he.createWithStatement(t,e)}function Ut(){var t,e,n,r=[];for(n=de,H("default")?(U(),t=null):(G("case"),t=_t()),z(":");le<pe&&!(q("}")||H("default")||H("case"));)e=Wt(),r.push(e);return he.markEnd(he.createSwitchCase(t,r),n)}function Ft(){var t,e,n,r,o;if(G("switch"),z("("),t=_t(),z(")"),z("{"),e=[],q("}"))return U(),he.createSwitchStatement(t,e);for(r=ve.inSwitch,ve.inSwitch=!0,o=!1;le<pe&&!q("}");)n=Ut(),null===n.test&&(o&&V({},oe.MultipleDefaultsInSwitch),o=!0),e.push(n);return ve.inSwitch=r,z("}"),he.createSwitchStatement(t,e)}function Lt(){var t;return G("throw"),B()&&V({},oe.NewlineAfterThrow),t=_t(),K(),he.createThrowStatement(t)}function Dt(){var t,e,n;return n=de,G("catch"),z("("),q(")")&&X(de),t=bt(),ue&&f(t.name)&&W({},oe.StrictCatchVariable),z(")"),e=yt(),he.markEnd(he.createCatchClause(t,e),n)}function Bt(){var t,e=[],n=null;return G("try"),t=yt(),H("catch")&&e.push(Dt()),H("finally")&&(U(),n=yt()),0!==e.length||n||V({},oe.NoCatchOrFinally),he.createTryStatement(t,[],e,n)}function Vt(){return G("debugger"),K(),he.createDebuggerStatement()}function Wt(){var t,e,n,r,o=de.type;if(o===Jt.EOF&&X(de),o===Jt.Punctuator&&"{"===de.value)return yt();if(r=de,o===Jt.Punctuator)switch(de.value){case";":return he.markEnd(Ot(),r);case"(":return he.markEnd(St(),r)}if(o===Jt.Keyword)switch(de.value){case"break":return he.markEnd(Rt(),r);case"continue":return he.markEnd(kt(),r);case"debugger":return he.markEnd(Vt(),r);case"do":return he.markEnd(Mt(),r);case"for":return he.markEnd(Ct(),r);case"function":return he.markEnd(Gt(),r);case"if":return he.markEnd(Pt(),r);case"return":return he.markEnd(It(),r);case"switch":return he.markEnd(Ft(),r);case"throw":return he.markEnd(Lt(),r);case"try":return he.markEnd(Bt(),r);case"var":return he.markEnd(Et(),r);case"while":return he.markEnd(jt(),r);case"with":return he.markEnd(Nt(),r)}return t=_t(),t.type===ne.Identifier&&q(":")?(U(),n="$"+t.name,Object.prototype.hasOwnProperty.call(ve.labelSet,n)&&V({},oe.Redeclaration,"Label",t.name),ve.labelSet[n]=!0,e=Wt(),delete ve.labelSet[n],he.markEnd(he.createLabeledStatement(t,e),r)):(K(),he.markEnd(he.createExpressionStatement(t),r))}function Xt(){var t,e,n,r,o,i,a,s,u,l=[];for(u=de,z("{");le<pe&&de.type===Jt.StringLiteral&&(e=de,t=Ht(),l.push(t),t.expression.type===ne.Literal);)n=se.slice(e.start+1,e.end-1),"use strict"===n?(ue=!0,r&&W(r,oe.StrictOctalLiteral)):!r&&e.octal&&(r=e);for(o=ve.labelSet,i=ve.inIteration,a=ve.inSwitch,s=ve.inFunctionBody,ve.labelSet={},ve.inIteration=!1,ve.inSwitch=!1,ve.inFunctionBody=!0;le<pe&&!q("}")&&(t=Ht(),"undefined"!=typeof t);)l.push(t);return z("}"),ve.labelSet=o,ve.inIteration=i,ve.inSwitch=a,ve.inFunctionBody=s,he.markEnd(he.createBlockStatement(l),u)}function zt(t){var e,n,r,o,i,a,s=[];if(z("("),!q(")"))for(o={};le<pe&&(n=de,e=bt(),i="$"+n.value,ue?(f(n.value)&&(r=n,a=oe.StrictParamName),Object.prototype.hasOwnProperty.call(o,i)&&(r=n,a=oe.StrictParamDupe)):t||(f(n.value)?(t=n,a=oe.StrictParamName):c(n.value)?(t=n,a=oe.StrictReservedWord):Object.prototype.hasOwnProperty.call(o,i)&&(t=n,a=oe.StrictParamDupe)),s.push(e),o[i]=!0,!q(")"));)z(",");return z(")"),{params:s,stricted:r,firstRestricted:t,message:a}}function Gt(){var t,e,n,r,o,i,a,s,u,l=[];return u=de,G("function"),n=de,t=bt(),ue?f(n.value)&&W(n,oe.StrictFunctionName):f(n.value)?(i=n,a=oe.StrictFunctionName):c(n.value)&&(i=n,a=oe.StrictReservedWord),o=zt(i),l=o.params,r=o.stricted,i=o.firstRestricted,o.message&&(a=o.message),s=ue,e=Xt(),ue&&i&&V(i,a),ue&&r&&W(r,a),ue=s,he.markEnd(he.createFunctionDeclaration(t,l,[],e),u)}function qt(){var t,e,n,r,o,i,a,s,u=null,l=[];return s=de,G("function"),q("(")||(t=de,u=bt(),ue?f(t.value)&&W(t,oe.StrictFunctionName):f(t.value)?(n=t,r=oe.StrictFunctionName):c(t.value)&&(n=t,r=oe.StrictReservedWord)),o=zt(n),l=o.params,e=o.stricted,n=o.firstRestricted,o.message&&(r=o.message),a=ue,i=Xt(),ue&&n&&V(n,r),ue&&e&&W(e,r),ue=a,he.markEnd(he.createFunctionExpression(u,l,[],i),s)}function Ht(){if(de.type===Jt.Keyword)switch(de.value){case"const":case"let":return Tt(de.value);case"function":return Gt();default:return Wt()}if(de.type!==Jt.EOF)return Wt()}function Yt(){for(var t,e,n,r,o=[];le<pe&&(e=de,e.type===Jt.StringLiteral)&&(t=Ht(),o.push(t),t.expression.type===ne.Literal);)n=se.slice(e.start+1,e.end-1),"use strict"===n?(ue=!0,r&&W(r,oe.StrictOctalLiteral)):!r&&e.octal&&(r=e);for(;le<pe&&(t=Ht(),"undefined"!=typeof t);)o.push(t);return o}function Kt(){var t,e;return m(),F(),e=de,ue=!1,t=Yt(),he.markEnd(he.createProgram(t),e)}function $t(){var t,e,n,r=[];for(t=0;t<me.tokens.length;++t)e=me.tokens[t],n={type:e.type,value:e.value},me.range&&(n.range=e.range),me.loc&&(n.loc=e.loc),r.push(n);me.tokens=r}function Zt(t,e){var n,r,o;n=String,"string"==typeof t||t instanceof String||(t=n(t)),he=ae,se=t,le=0,ce=se.length>0?1:0,fe=0,pe=se.length,de=null,ve={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},me={},e=e||{},e.tokens=!0,me.tokens=[],me.tokenize=!0,me.openParenToken=-1,me.openCurlyToken=-1,me.range="boolean"==typeof e.range&&e.range,me.loc="boolean"==typeof e.loc&&e.loc,"boolean"==typeof e.comment&&e.comment&&(me.comments=[]),"boolean"==typeof e.tolerant&&e.tolerant&&(me.errors=[]);try{if(F(),de.type===Jt.EOF)return me.tokens;for(r=U();de.type!==Jt.EOF;)try{r=U()}catch(t){if(r=de,me.errors){me.errors.push(t);break}throw t}$t(),o=me.tokens,"undefined"!=typeof me.comments&&(o.comments=me.comments),"undefined"!=typeof me.errors&&(o.errors=me.errors)}catch(t){throw t}finally{me={}}return o}function Qt(t,e){var n,r;r=String,"string"==typeof t||t instanceof String||(t=r(t)),he=ae,se=t,le=0,ce=se.length>0?1:0,fe=0,pe=se.length,de=null,ve={allowIn:!0,labelSet:{},inFunctionBody:!1,inIteration:!1,inSwitch:!1,lastCommentStart:-1},me={},"undefined"!=typeof e&&(me.range="boolean"==typeof e.range&&e.range,me.loc="boolean"==typeof e.loc&&e.loc,me.attachComment="boolean"==typeof e.attachComment&&e.attachComment,me.loc&&null!==e.source&&void 0!==e.source&&(me.source=r(e.source)),"boolean"==typeof e.tokens&&e.tokens&&(me.tokens=[]),"boolean"==typeof e.comment&&e.comment&&(me.comments=[]),"boolean"==typeof e.tolerant&&e.tolerant&&(me.errors=[]),me.attachComment&&(me.range=!0,me.comments=[],me.bottomRightStack=[],me.trailingComments=[],me.leadingComments=[]));try{n=Kt(),"undefined"!=typeof me.comments&&(n.comments=me.comments),"undefined"!=typeof me.tokens&&($t(),n.tokens=me.tokens),"undefined"!=typeof me.errors&&(n.errors=me.errors)}catch(t){throw t}finally{me={}}return n}var Jt,te,ee,ne,re,oe,ie,ae,se,ue,le,ce,fe,pe,he,de,ve,me;Jt={BooleanLiteral:1,EOF:2,Identifier:3,Keyword:4,NullLiteral:5,NumericLiteral:6,Punctuator:7,StringLiteral:8,RegularExpression:9},te={},te[Jt.BooleanLiteral]="Boolean",te[Jt.EOF]="<end>",te[Jt.Identifier]="Identifier",te[Jt.Keyword]="Keyword",te[Jt.NullLiteral]="Null",te[Jt.NumericLiteral]="Numeric",te[Jt.Punctuator]="Punctuator",te[Jt.StringLiteral]="String",te[Jt.RegularExpression]="RegularExpression",ee=["(","{","[","in","typeof","instanceof","new","return","case","delete","throw","void","=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","&=","|=","^=",",","+","-","*","/","%","++","--","<<",">>",">>>","&","|","^","!","~","&&","||","?",":","===","==",">=","<=","<",">","!=","!=="],ne={AssignmentExpression:"AssignmentExpression",ArrayExpression:"ArrayExpression",BlockStatement:"BlockStatement",BinaryExpression:"BinaryExpression",BreakStatement:"BreakStatement",CallExpression:"CallExpression",CatchClause:"CatchClause",ConditionalExpression:"ConditionalExpression",ContinueStatement:"ContinueStatement",DoWhileStatement:"DoWhileStatement",DebuggerStatement:"DebuggerStatement",EmptyStatement:"EmptyStatement",ExpressionStatement:"ExpressionStatement",ForStatement:"ForStatement",ForInStatement:"ForInStatement",FunctionDeclaration:"FunctionDeclaration",FunctionExpression:"FunctionExpression",Identifier:"Identifier",IfStatement:"IfStatement",Literal:"Literal",LabeledStatement:"LabeledStatement",LogicalExpression:"LogicalExpression",MemberExpression:"MemberExpression",NewExpression:"NewExpression",ObjectExpression:"ObjectExpression",Program:"Program",Property:"Property",ReturnStatement:"ReturnStatement",SequenceExpression:"SequenceExpression",SwitchStatement:"SwitchStatement",SwitchCase:"SwitchCase",ThisExpression:"ThisExpression",ThrowStatement:"ThrowStatement",TryStatement:"TryStatement",UnaryExpression:"UnaryExpression",UpdateExpression:"UpdateExpression",VariableDeclaration:"VariableDeclaration",VariableDeclarator:"VariableDeclarator",WhileStatement:"WhileStatement",WithStatement:"WithStatement"},re={Data:1,Get:2,Set:4},oe={UnexpectedToken:"Unexpected token %0",UnexpectedNumber:"Unexpected number",UnexpectedString:"Unexpected string",UnexpectedIdentifier:"Unexpected identifier",UnexpectedReserved:"Unexpected reserved word",UnexpectedEOS:"Unexpected end of input",NewlineAfterThrow:"Illegal newline after throw",InvalidRegExp:"Invalid regular expression",UnterminatedRegExp:"Invalid regular expression: missing /",InvalidLHSInAssignment:"Invalid left-hand side in assignment",InvalidLHSInForIn:"Invalid left-hand side in for-in",MultipleDefaultsInSwitch:"More than one default clause in switch statement",NoCatchOrFinally:"Missing catch or finally after try",UnknownLabel:"Undefined label '%0'",Redeclaration:"%0 '%1' has already been declared",IllegalContinue:"Illegal continue statement",IllegalBreak:"Illegal break statement",IllegalReturn:"Illegal return statement",StrictModeWith:"Strict mode code may not include a with statement",StrictCatchVariable:"Catch variable may not be eval or arguments in strict mode",StrictVarName:"Variable name may not be eval or arguments in strict mode",StrictParamName:"Parameter name eval or arguments is not allowed in strict mode",StrictParamDupe:"Strict mode function may not have duplicate parameter names",StrictFunctionName:"Function name may not be eval or arguments in strict mode",StrictOctalLiteral:"Octal literals are not allowed in strict mode.",StrictDelete:"Delete of an unqualified identifier in strict mode.",StrictDuplicateProperty:"Duplicate data property in object literal not allowed in strict mode",AccessorDataProperty:"Object literal may not have data and accessor property with the same name",AccessorGetSet:"Object literal may not have multiple get/set accessors with the same name",StrictLHSAssignment:"Assignment to eval or arguments is not allowed in strict mode",StrictLHSPostfix:"Postfix increment/decrement may not have eval or arguments operand in strict mode",StrictLHSPrefix:"Prefix increment/decrement may not have eval or arguments operand in strict mode",StrictReservedWord:"Use of future reserved word in strict mode"},ie={NonAsciiIdentifierStart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),NonAsciiIdentifierPart:new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")},ae={name:"SyntaxTree",processComment:function(t){var e,n;if(!(t.type===ne.Program&&t.body.length>0)){for(me.trailingComments.length>0?me.trailingComments[0].range[0]>=t.range[1]?(n=me.trailingComments,me.trailingComments=[]):me.trailingComments.length=0:me.bottomRightStack.length>0&&me.bottomRightStack[me.bottomRightStack.length-1].trailingComments&&me.bottomRightStack[me.bottomRightStack.length-1].trailingComments[0].range[0]>=t.range[1]&&(n=me.bottomRightStack[me.bottomRightStack.length-1].trailingComments,delete me.bottomRightStack[me.bottomRightStack.length-1].trailingComments);me.bottomRightStack.length>0&&me.bottomRightStack[me.bottomRightStack.length-1].range[0]>=t.range[0];)e=me.bottomRightStack.pop();e?e.leadingComments&&e.leadingComments[e.leadingComments.length-1].range[1]<=t.range[0]&&(t.leadingComments=e.leadingComments,delete e.leadingComments):me.leadingComments.length>0&&me.leadingComments[me.leadingComments.length-1].range[1]<=t.range[0]&&(t.leadingComments=me.leadingComments,me.leadingComments=[]),n&&(t.trailingComments=n),me.bottomRightStack.push(t)}},markEnd:function(t,e){return me.range&&(t.range=[e.start,le]),me.loc&&(t.loc=new D(void 0===e.startLineNumber?e.lineNumber:e.startLineNumber,e.start-(void 0===e.startLineStart?e.lineStart:e.startLineStart),ce,le-fe),this.postProcess(t)),me.attachComment&&this.processComment(t),t},postProcess:function(t){return me.source&&(t.loc.source=me.source),t},createArrayExpression:function(t){return{type:ne.ArrayExpression,elements:t}},createAssignmentExpression:function(t,e,n){return{type:ne.AssignmentExpression,operator:t,left:e,right:n}},createBinaryExpression:function(t,e,n){var r="||"===t||"&&"===t?ne.LogicalExpression:ne.BinaryExpression;return{type:r,operator:t,left:e,right:n}},createBlockStatement:function(t){return{type:ne.BlockStatement,body:t}},createBreakStatement:function(t){return{type:ne.BreakStatement,label:t}},createCallExpression:function(t,e){return{type:ne.CallExpression,callee:t,arguments:e}},createCatchClause:function(t,e){return{type:ne.CatchClause,param:t,body:e}},createConditionalExpression:function(t,e,n){return{type:ne.ConditionalExpression,test:t,consequent:e,alternate:n}},createContinueStatement:function(t){return{type:ne.ContinueStatement,label:t}},createDebuggerStatement:function(){return{type:ne.DebuggerStatement}},createDoWhileStatement:function(t,e){return{type:ne.DoWhileStatement,body:t,test:e}},createEmptyStatement:function(){return{type:ne.EmptyStatement}},createExpressionStatement:function(t){return{type:ne.ExpressionStatement,expression:t}},createForStatement:function(t,e,n,r){return{type:ne.ForStatement,init:t,test:e,update:n,body:r}},createForInStatement:function(t,e,n){return{type:ne.ForInStatement,left:t,right:e,body:n,each:!1}},createFunctionDeclaration:function(t,e,n,r){return{type:ne.FunctionDeclaration,id:t,params:e,defaults:n,body:r,rest:null,generator:!1,expression:!1}},createFunctionExpression:function(t,e,n,r){return{type:ne.FunctionExpression,id:t,params:e,defaults:n,body:r,rest:null,generator:!1,expression:!1}},createIdentifier:function(t){return{type:ne.Identifier,name:t}},createIfStatement:function(t,e,n){return{type:ne.IfStatement,test:t,consequent:e,alternate:n}},createLabeledStatement:function(t,e){return{type:ne.LabeledStatement,label:t,body:e}},createLiteral:function(t){return{type:ne.Literal,value:t.value,raw:se.slice(t.start,t.end)}},createMemberExpression:function(t,e,n){return{type:ne.MemberExpression,computed:"["===t,object:e,property:n}},createNewExpression:function(t,e){return{type:ne.NewExpression,callee:t,arguments:e}},createObjectExpression:function(t){return{type:ne.ObjectExpression,properties:t}},createPostfixExpression:function(t,e){return{type:ne.UpdateExpression,operator:t,argument:e,prefix:!1}},createProgram:function(t){return{type:ne.Program,body:t}},createProperty:function(t,e,n){return{type:ne.Property,key:e,value:n,kind:t}},createReturnStatement:function(t){return{type:ne.ReturnStatement,argument:t}},createSequenceExpression:function(t){return{type:ne.SequenceExpression,expressions:t}},createSwitchCase:function(t,e){return{type:ne.SwitchCase,test:t,consequent:e}},createSwitchStatement:function(t,e){return{type:ne.SwitchStatement,discriminant:t,cases:e}},createThisExpression:function(){return{type:ne.ThisExpression}},createThrowStatement:function(t){return{type:ne.ThrowStatement,argument:t}},createTryStatement:function(t,e,n,r){return{type:ne.TryStatement,block:t,guardedHandlers:e,handlers:n,finalizer:r}},createUnaryExpression:function(t,e){return"++"===t||"--"===t?{type:ne.UpdateExpression,operator:t,argument:e,prefix:!0}:{type:ne.UnaryExpression,operator:t,argument:e,prefix:!0}},createVariableDeclaration:function(t,e){return{type:ne.VariableDeclaration,declarations:t,kind:e}},createVariableDeclarator:function(t,e){return{type:ne.VariableDeclarator,id:t,init:e}},createWhileStatement:function(t,e){return{type:ne.WhileStatement,test:t,body:e}},createWithStatement:function(t,e){return{type:ne.WithStatement,object:t,body:e}}},t.version="1.2.5",t.tokenize=Zt,t.parse=Qt,t.Syntax=function(){var t,e={};"function"==typeof Object.create&&(e=Object.create(null));for(t in ne)ne.hasOwnProperty(t)&&(e[t]=ne[t]);return"function"==typeof Object.freeze&&Object.freeze(e),e}()})},function(t,e){e.read=function(t,e,n,r,o){var i,a,s=8*o-r-1,u=(1<<s)-1,l=u>>1,c=-7,f=n?o-1:0,p=n?-1:1,h=t[e+f];for(f+=p,i=h&(1<<-c)-1,h>>=-c,c+=s;c>0;i=256*i+t[e+f],f+=p,c-=8);for(a=i&(1<<-c)-1,i>>=-c,c+=r;c>0;a=256*a+t[e+f],f+=p,c-=8);if(0===i)i=1-l;else{if(i===u)return a?NaN:(h?-1:1)*(1/0);a+=Math.pow(2,r),i-=l}return(h?-1:1)*a*Math.pow(2,i-r)},e.write=function(t,e,n,r,o,i){var a,s,u,l=8*i-o-1,c=(1<<l)-1,f=c>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:i-1,d=r?1:-1,v=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,a=c):(a=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-a))<1&&(a--,u*=2),e+=a+f>=1?p/u:p*Math.pow(2,1-f),e*u>=2&&(a++,u/=2),a+f>=c?(s=0,a=c):a+f>=1?(s=(e*u-1)*Math.pow(2,o),a+=f):(s=e*Math.pow(2,f-1)*Math.pow(2,o),a=0));o>=8;t[n+h]=255&s,h+=d,s/=256,o-=8);for(a=a<<o|s,l+=o;l>0;t[n+h]=255&a,h+=d,a/=256,l-=8);t[n+h-d]|=128*v}},function(t,e,n){"use strict";function r(t){for(var e=new Array(t),n=0;n<t;++n)e[n]=n;return e}t.exports=r},function(t,e){function n(t){return!!t.constructor&&"function"==typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function r(t){return"function"==typeof t.readFloatLE&&"function"==typeof t.slice&&n(t.slice(0,0))}t.exports=function(t){return null!=t&&(n(t)||r(t)||!!t._isBuffer)}},function(t,e,n){var r=n(48),o=n(29),i=r(o,"DataView");t.exports=i},function(t,e,n){function r(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}var o=n(521),i=n(522),a=n(523),s=n(524),u=n(525);r.prototype.clear=o,r.prototype.delete=i,r.prototype.get=a,r.prototype.has=s,r.prototype.set=u,t.exports=r},function(t,e,n){var r=n(48),o=n(29),i=r(o,"Promise");t.exports=i},function(t,e,n){var r=n(48),o=n(29),i=r(o,"Set");t.exports=i},function(t,e,n){function r(t){var e=-1,n=null==t?0:t.length;for(this.__data__=new o;++e<n;)this.add(t[e])}var o=n(120),i=n(546),a=n(547);r.prototype.add=r.prototype.push=i,r.prototype.has=a,t.exports=r},function(t,e,n){var r=n(29),o=r.Uint8Array;t.exports=o},function(t,e,n){var r=n(48),o=n(29),i=r(o,"WeakMap");t.exports=i},function(t,e){function n(t,e,n){switch(n.length){case 0:return t.call(e);case 1:return t.call(e,n[0]);case 2:return t.call(e,n[0],n[1]);case 3:return t.call(e,n[0],n[1],n[2])}return t.apply(e,n)}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length;++n<r;)if(!e(t[n],n,t))return!1;return!0}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length,o=0,i=[];++n<r;){var a=t[n];e(a,n,t)&&(i[o++]=a)}return i}t.exports=n},function(t,e,n){function r(t,e){var n=a(t),r=!n&&i(t),c=!n&&!r&&s(t),p=!n&&!r&&!c&&l(t),h=n||r||c||p,d=h?o(t.length,String):[],v=d.length;for(var m in t)!e&&!f.call(t,m)||h&&("length"==m||c&&("offset"==m||"parent"==m)||p&&("buffer"==m||"byteLength"==m||"byteOffset"==m)||u(m,v))||d.push(m);return d}var o=n(495),i=n(126),a=n(30),s=n(185),u=n(85),l=n(187),c=Object.prototype,f=c.hasOwnProperty;t.exports=r},function(t,e){function n(t,e,n,r){var o=-1,i=null==t?0:t.length;for(r&&i&&(n=t[++o]);++o<i;)n=e(n,t[o],o,t);return n}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=null==t?0:t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}t.exports=n},function(t,e){function n(t){return t.split("")}t.exports=n},function(t,e){function n(t){return t.match(r)||[]}var r=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;t.exports=n},function(t,e,n){function r(t,e,n){var r=t[e];s.call(t,e)&&i(r,n)&&(void 0!==n||e in t)||o(t,e,n)}var o=n(170),i=n(87),a=Object.prototype,s=a.hasOwnProperty;t.exports=r},function(t,e,n){var r=n(172),o=n(503),i=o(r);t.exports=i},function(t,e,n){function r(t,e){var n=!0;return o(t,function(t,r,o){return n=!!e(t,r,o)}),n}var o=n(471);t.exports=r},function(t,e){function n(t,e,n,r){for(var o=t.length,i=n+(r?1:-1);r?i--:++i<o;)if(e(t[i],i,t))return i;return-1}t.exports=n},function(t,e,n){var r=n(504),o=r();t.exports=o},function(t,e,n){function r(t,e,n){var r=e(t);return i(t)?r:o(r,n(t))}var o=n(169),i=n(30);t.exports=r},function(t,e){function n(t,e){return null!=t&&e in Object(t)}t.exports=n},function(t,e,n){function r(t){return i(t)&&o(t)==a}var o=n(62),i=n(64),a="[object Arguments]";t.exports=r},function(t,e,n){function r(t,e,n,r,m,g){var y=l(t),b=l(e),w=y?d:u(t),x=b?d:u(e);w=w==h?v:w,x=x==h?v:x;var E=w==v,T=x==v,O=w==x;if(O&&c(t)){if(!c(e))return!1;y=!0,E=!1}if(O&&!E)return g||(g=new o),y||f(t)?i(t,e,n,r,m,g):a(t,e,w,n,r,m,g);if(!(n&p)){var S=E&&_.call(t,"__wrapped__"),P=T&&_.call(e,"__wrapped__");if(S||P){var M=S?t.value():t,j=P?e.value():e;return g||(g=new o),m(M,j,n,r,g)}}return!!O&&(g||(g=new o),s(t,e,n,r,m,g))}var o=n(168),i=n(174),a=n(511),s=n(512),u=n(176),l=n(30),c=n(185),f=n(187),p=1,h="[object Arguments]",d="[object Array]",v="[object Object]",m=Object.prototype,_=m.hasOwnProperty;t.exports=r},function(t,e,n){function r(t,e,n,r){var u=n.length,l=u,c=!r;if(null==t)return!l;for(t=Object(t);u--;){var f=n[u];if(c&&f[2]?f[1]!==t[f[0]]:!(f[0]in t))return!1}for(;++u<l;){f=n[u];var p=f[0],h=t[p],d=f[1];if(c&&f[2]){if(void 0===h&&!(p in t))return!1}else{var v=new o;if(r)var m=r(h,d,p,t,e,v);if(!(void 0===m?i(d,h,a|s,r,v):m))return!1}}return!0}var o=n(168),i=n(123),a=1,s=2;t.exports=r},function(t,e,n){function r(t){if(!a(t)||i(t))return!1;var e=o(t)?d:l;return e.test(s(t))}var o=n(186),i=n(528),a=n(55),s=n(182),u=/[\\^$.*+?()[\]{}|]/g,l=/^\[object .+?Constructor\]$/,c=Function.prototype,f=Object.prototype,p=c.toString,h=f.hasOwnProperty,d=RegExp("^"+p.call(h).replace(u,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=r},function(t,e,n){function r(t){return a(t)&&i(t.length)&&!!C[o(t)]}var o=n(62),i=n(128),a=n(64),s="[object Arguments]",u="[object Array]",l="[object Boolean]",c="[object Date]",f="[object Error]",p="[object Function]",h="[object Map]",d="[object Number]",v="[object Object]",m="[object RegExp]",_="[object Set]",g="[object String]",y="[object WeakMap]",b="[object ArrayBuffer]",w="[object DataView]",x="[object Float32Array]",E="[object Float64Array]",T="[object Int8Array]",O="[object Int16Array]",S="[object Int32Array]",P="[object Uint8Array]",M="[object Uint8ClampedArray]",j="[object Uint16Array]",A="[object Uint32Array]",C={};C[x]=C[E]=C[T]=C[O]=C[S]=C[P]=C[M]=C[j]=C[A]=!0,C[s]=C[u]=C[b]=C[l]=C[w]=C[c]=C[f]=C[p]=C[h]=C[d]=C[v]=C[m]=C[_]=C[g]=C[y]=!1,t.exports=r},function(t,e,n){function r(t){if(!o(t))return i(t);var e=[];for(var n in Object(t))s.call(t,n)&&"constructor"!=n&&e.push(n);return e}var o=n(529),i=n(541),a=Object.prototype,s=a.hasOwnProperty;t.exports=r},function(t,e,n){function r(t){var e=i(t);return 1==e.length&&e[0][2]?a(e[0][0],e[0][1]):function(n){return n===t||o(n,t,e)}}var o=n(479),i=n(515),a=n(181);t.exports=r},function(t,e,n){function r(t,e){return s(t)&&u(e)?l(c(t),e):function(n){var r=i(n,t);return void 0===r&&r===e?a(n,t):o(e,r,f|p)}}var o=n(123),i=n(569),a=n(184),s=n(124),u=n(179),l=n(181),c=n(63),f=1,p=2;t.exports=r},function(t,e,n){function r(t,e){return o(t,e,function(e,n){return i(t,n)})}var o=n(486),i=n(184);t.exports=r},function(t,e,n){function r(t,e,n){for(var r=-1,s=e.length,u={};++r<s;){var l=e[r],c=o(t,l);n(c,l)&&i(u,a(l,t),c)}return u}var o=n(122),i=n(491),a=n(83);t.exports=r},function(t,e){function n(t){return function(e){return null==e?void 0:e[t]}}t.exports=n},function(t,e,n){function r(t){return function(e){return o(e,t)}}var o=n(122);t.exports=r},function(t,e){function n(t){return function(e){return null==t?void 0:t[e]}}t.exports=n},function(t,e){function n(t,e,n,i){for(var a=-1,s=o(r((e-t)/(n||1)),0),u=Array(s);s--;)u[i?s:++a]=t,t+=n;return u}var r=Math.ceil,o=Math.max;t.exports=n},function(t,e,n){function r(t,e,n,r){if(!s(t))return t;e=i(e,t);for(var l=-1,c=e.length,f=c-1,p=t;null!=p&&++l<c;){var h=u(e[l]),d=n;if(l!=f){var v=p[h];d=r?r(v,h,p):void 0,void 0===d&&(d=s(v)?v:a(e[l+1])?[]:{})}o(p,h,d),p=p[h]}return t}var o=n(470),i=n(83),a=n(85),s=n(55),u=n(63);t.exports=r},function(t,e,n){var r=n(563),o=n(173),i=n(125),a=o?function(t,e){return o(t,"toString",{configurable:!0,enumerable:!1,value:r(e),writable:!0})}:i;t.exports=a},function(t,e){function n(t,e,n){var r=-1,o=t.length;e<0&&(e=-e>o?0:o+e),n=n>o?o:n,n<0&&(n+=o),o=e>n?0:n-e>>>0,e>>>=0;for(var i=Array(o);++r<o;)i[r]=t[r+e];return i}t.exports=n},function(t,e){function n(t,e){for(var n,r=-1,o=t.length;++r<o;){var i=e(t[r]);void 0!==i&&(n=void 0===n?i:n+i)}return n}t.exports=n},function(t,e){function n(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}t.exports=n},function(t,e,n){function r(t,e){return o(e,function(e){return[e,t[e]]})}var o=n(121);t.exports=r},function(t,e,n){function r(t){if("string"==typeof t)return t;if(a(t))return i(t,r)+"";if(s(t))return c?c.call(t):"";var e=t+"";return"0"==e&&1/t==-u?"-0":e}var o=n(61),i=n(121),a=n(30),s=n(89),u=1/0,l=o?o.prototype:void 0,c=l?l.toString:void 0;t.exports=r},function(t,e){function n(t){return function(e){return t(e)}}t.exports=n},function(t,e,n){function r(t,e){return o(e,function(e){return t[e]})}var o=n(121);t.exports=r},function(t,e){function n(t,e){return t.has(e)}t.exports=n},function(t,e,n){function r(t,e,n){var r=t.length;return n=void 0===n?r:n,!e&&n>=r?t:o(t,e,n)}var o=n(493);t.exports=r},function(t,e,n){var r=n(29),o=r["__core-js_shared__"];t.exports=o},function(t,e,n){function r(t,e){return function(n,r){if(null==n)return n;if(!o(n))return t(n,r);for(var i=n.length,a=e?i:-1,s=Object(n);(e?a--:++a<i)&&r(s[a],a,s)!==!1;);return n}}var o=n(88);t.exports=r},function(t,e){function n(t){return function(e,n,r){for(var o=-1,i=Object(e),a=r(e),s=a.length;s--;){var u=a[t?s:++o];if(n(i[u],u,i)===!1)break}return e}}t.exports=n},function(t,e,n){function r(t){return function(e){e=s(e);var n=i(e)?a(e):void 0,r=n?n[0]:e.charAt(0),u=n?o(n,1).join(""):e.slice(1);return r[t]()+u}}var o=n(501),i=n(177),a=n(557),s=n(65);t.exports=r},function(t,e,n){function r(t){return function(e){return o(a(i(e).replace(u,"")),t,"")}}var o=n(466),i=n(564),a=n(582),s="['’]",u=RegExp(s,"g");t.exports=r},function(t,e,n){function r(t){return function(e,n,r){var s=Object(e);if(!i(e)){var u=o(n,3);e=a(e),n=function(t){return u(s[t],t,s)}}var l=t(e,n,r);return l>-1?s[u?e[l]:l]:void 0}}var o=n(82),i=n(88),a=n(49);t.exports=r},function(t,e,n){function r(t){return function(e,n,r){return r&&"number"!=typeof r&&i(e,n,r)&&(n=r=void 0),e=a(e),void 0===n?(n=e,e=0):n=a(n),r=void 0===r?e<n?1:-1:a(r),o(e,n,r,t)}}var o=n(490),i=n(178),a=n(189);t.exports=r},function(t,e,n){function r(t){return function(e){var n=i(e);return n==u?a(e):n==l?s(e):o(e,t(e))}}var o=n(496),i=n(176),a=n(180),s=n(549),u="[object Map]",l="[object Set]";t.exports=r},function(t,e,n){var r=n(489),o={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i",
"ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"},i=r(o);t.exports=i},function(t,e,n){function r(t,e,n,r,o,E,O){switch(n){case x:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case w:return!(t.byteLength!=e.byteLength||!E(new i(t),new i(e)));case p:case h:case m:return a(+t,+e);case d:return t.name==e.name&&t.message==e.message;case _:case y:return t==e+"";case v:var S=u;case g:var P=r&c;if(S||(S=l),t.size!=e.size&&!P)return!1;var M=O.get(t);if(M)return M==e;r|=f,O.set(t,e);var j=s(S(t),S(e),r,o,E,O);return O.delete(t),j;case b:if(T)return T.call(t)==T.call(e)}return!1}var o=n(61),i=n(460),a=n(87),s=n(174),u=n(180),l=n(548),c=1,f=2,p="[object Boolean]",h="[object Date]",d="[object Error]",v="[object Map]",m="[object Number]",_="[object RegExp]",g="[object Set]",y="[object String]",b="[object Symbol]",w="[object ArrayBuffer]",x="[object DataView]",E=o?o.prototype:void 0,T=E?E.valueOf:void 0;t.exports=r},function(t,e,n){function r(t,e,n,r,a,u){var l=n&i,c=o(t),f=c.length,p=o(e),h=p.length;if(f!=h&&!l)return!1;for(var d=f;d--;){var v=c[d];if(!(l?v in e:s.call(e,v)))return!1}var m=u.get(t);if(m&&u.get(e))return m==e;var _=!0;u.set(t,e),u.set(e,t);for(var g=l;++d<f;){v=c[d];var y=t[v],b=e[v];if(r)var w=l?r(b,y,v,e,t,u):r(y,b,v,t,e,u);if(!(void 0===w?y===b||a(y,b,n,r,u):w)){_=!1;break}g||(g="constructor"==v)}if(_&&!g){var x=t.constructor,E=e.constructor;x!=E&&"constructor"in t&&"constructor"in e&&!("function"==typeof x&&x instanceof x&&"function"==typeof E&&E instanceof E)&&(_=!1)}return u.delete(t),u.delete(e),_}var o=n(514),i=1,a=Object.prototype,s=a.hasOwnProperty;t.exports=r},function(t,e,n){function r(t){return a(i(t,void 0,o),t+"")}var o=n(568),i=n(545),a=n(550);t.exports=r},function(t,e,n){function r(t){return o(t,a,i)}var o=n(475),i=n(517),a=n(49);t.exports=r},function(t,e,n){function r(t){for(var e=i(t),n=e.length;n--;){var r=e[n],a=t[r];e[n]=[r,a,o(a)]}return e}var o=n(179),i=n(49);t.exports=r},function(t,e,n){function r(t){var e=a.call(t,u),n=t[u];try{t[u]=void 0;var r=!0}catch(t){}var o=s.call(t);return r&&(e?t[u]=n:delete t[u]),o}var o=n(61),i=Object.prototype,a=i.hasOwnProperty,s=i.toString,u=o?o.toStringTag:void 0;t.exports=r},function(t,e,n){var r=n(464),o=n(575),i=Object.prototype,a=i.propertyIsEnumerable,s=Object.getOwnPropertySymbols,u=s?function(t){return null==t?[]:(t=Object(t),r(s(t),function(e){return a.call(t,e)}))}:o;t.exports=u},function(t,e){function n(t,e){return null==t?void 0:t[e]}t.exports=n},function(t,e,n){function r(t,e,n){e=o(e,t);for(var r=-1,c=e.length,f=!1;++r<c;){var p=l(e[r]);if(!(f=null!=t&&n(t,p)))break;t=t[p]}return f||++r!=c?f:(c=null==t?0:t.length,!!c&&u(c)&&s(p,c)&&(a(t)||i(t)))}var o=n(83),i=n(126),a=n(30),s=n(85),u=n(128),l=n(63);t.exports=r},function(t,e){function n(t){return r.test(t)}var r=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;t.exports=n},function(t,e,n){function r(){this.__data__=o?o(null):{},this.size=0}var o=n(86);t.exports=r},function(t,e){function n(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}t.exports=n},function(t,e,n){function r(t){var e=this.__data__;if(o){var n=e[t];return n===i?void 0:n}return s.call(e,t)?e[t]:void 0}var o=n(86),i="__lodash_hash_undefined__",a=Object.prototype,s=a.hasOwnProperty;t.exports=r},function(t,e,n){function r(t){var e=this.__data__;return o?void 0!==e[t]:a.call(e,t)}var o=n(86),i=Object.prototype,a=i.hasOwnProperty;t.exports=r},function(t,e,n){function r(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=o&&void 0===e?i:e,this}var o=n(86),i="__lodash_hash_undefined__";t.exports=r},function(t,e,n){function r(t){return a(t)||i(t)||!!(s&&t&&t[s])}var o=n(61),i=n(126),a=n(30),s=o?o.isConcatSpreadable:void 0;t.exports=r},function(t,e){function n(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}t.exports=n},function(t,e,n){function r(t){return!!i&&i in t}var o=n(502),i=function(){var t=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();t.exports=r},function(t,e){function n(t){var e=t&&t.constructor,n="function"==typeof e&&e.prototype||r;return t===n}var r=Object.prototype;t.exports=n},function(t,e){function n(){this.__data__=[],this.size=0}t.exports=n},function(t,e,n){function r(t){var e=this.__data__,n=o(e,t);if(n<0)return!1;var r=e.length-1;return n==r?e.pop():a.call(e,n,1),--this.size,!0}var o=n(81),i=Array.prototype,a=i.splice;t.exports=r},function(t,e,n){function r(t){var e=this.__data__,n=o(e,t);return n<0?void 0:e[n][1]}var o=n(81);t.exports=r},function(t,e,n){function r(t){return o(this.__data__,t)>-1}var o=n(81);t.exports=r},function(t,e,n){function r(t,e){var n=this.__data__,r=o(n,t);return r<0?(++this.size,n.push([t,e])):n[r][1]=e,this}var o=n(81);t.exports=r},function(t,e,n){function r(){this.size=0,this.__data__={hash:new o,map:new(a||i),string:new o}}var o=n(456),i=n(80),a=n(119);t.exports=r},function(t,e,n){function r(t){var e=o(this,t).delete(t);return this.size-=e?1:0,e}var o=n(84);t.exports=r},function(t,e,n){function r(t){return o(this,t).get(t)}var o=n(84);t.exports=r},function(t,e,n){function r(t){return o(this,t).has(t)}var o=n(84);t.exports=r},function(t,e,n){function r(t,e){var n=o(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this}var o=n(84);t.exports=r},function(t,e,n){function r(t){var e=o(t,function(t){return n.size===i&&n.clear(),t}),n=e.cache;return e}var o=n(572),i=500;t.exports=r},function(t,e,n){var r=n(544),o=r(Object.keys,Object);t.exports=o},function(t,e,n){(function(t){var r=n(175),o="object"==typeof e&&e&&!e.nodeType&&e,i=o&&"object"==typeof t&&t&&!t.nodeType&&t,a=i&&i.exports===o,s=a&&r.process,u=function(){try{return s&&s.binding&&s.binding("util")}catch(t){}}();t.exports=u}).call(e,n(92)(t))},function(t,e){function n(t){return o.call(t)}var r=Object.prototype,o=r.toString;t.exports=n},function(t,e){function n(t,e){return function(n){return t(e(n))}}t.exports=n},function(t,e,n){function r(t,e,n){return e=i(void 0===e?t.length-1:e,0),function(){for(var r=arguments,a=-1,s=i(r.length-e,0),u=Array(s);++a<s;)u[a]=r[e+a];a=-1;for(var l=Array(e+1);++a<e;)l[a]=r[a];return l[e]=n(u),o(t,this,l)}}var o=n(462),i=Math.max;t.exports=r},function(t,e){function n(t){return this.__data__.set(t,r),this}var r="__lodash_hash_undefined__";t.exports=n},function(t,e){function n(t){return this.__data__.has(t)}t.exports=n},function(t,e){function n(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}t.exports=n},function(t,e){function n(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=[t,t]}),n}t.exports=n},function(t,e,n){var r=n(492),o=n(551),i=o(r);t.exports=i},function(t,e){function n(t){var e=0,n=0;return function(){var a=i(),s=o-(a-n);if(n=a,s>0){if(++e>=r)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var r=800,o=16,i=Date.now;t.exports=n},function(t,e,n){function r(){this.__data__=new o,this.size=0}var o=n(80);t.exports=r},function(t,e){function n(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n}t.exports=n},function(t,e){function n(t){return this.__data__.get(t)}t.exports=n},function(t,e){function n(t){return this.__data__.has(t)}t.exports=n},function(t,e,n){function r(t,e){var n=this.__data__;if(n instanceof o){var r=n.__data__;if(!i||r.length<s-1)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new a(r)}return n.set(t,e),this.size=n.size,this}var o=n(80),i=n(119),a=n(120),s=200;t.exports=r},function(t,e,n){function r(t){return i(t)?a(t):o(t)}var o=n(468),i=n(177),a=n(559);t.exports=r},function(t,e,n){var r=n(540),o=/^\./,i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,a=/\\(\\)?/g,s=r(function(t){var e=[];return o.test(t)&&e.push(""),t.replace(i,function(t,n,r,o){e.push(r?o.replace(a,"$1"):n||t)}),e});t.exports=s},function(t,e){function n(t){return t.match(x)||[]}var r="\\ud800-\\udfff",o="\\u0300-\\u036f",i="\\ufe20-\\ufe2f",a="\\u20d0-\\u20ff",s=o+i+a,u="\\ufe0e\\ufe0f",l="["+r+"]",c="["+s+"]",f="\\ud83c[\\udffb-\\udfff]",p="(?:"+c+"|"+f+")",h="[^"+r+"]",d="(?:\\ud83c[\\udde6-\\uddff]){2}",v="[\\ud800-\\udbff][\\udc00-\\udfff]",m="\\u200d",_=p+"?",g="["+u+"]?",y="(?:"+m+"(?:"+[h,d,v].join("|")+")"+g+_+")*",b=g+_+y,w="(?:"+[h+c+"?",c,d,v,l].join("|")+")",x=RegExp(f+"(?="+f+")|"+w+b,"g");t.exports=n},function(t,e){function n(t){return t.match(W)||[]}var r="\\ud800-\\udfff",o="\\u0300-\\u036f",i="\\ufe20-\\ufe2f",a="\\u20d0-\\u20ff",s=o+i+a,u="\\u2700-\\u27bf",l="a-z\\xdf-\\xf6\\xf8-\\xff",c="\\xac\\xb1\\xd7\\xf7",f="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",p="\\u2000-\\u206f",h=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",d="A-Z\\xc0-\\xd6\\xd8-\\xde",v="\\ufe0e\\ufe0f",m=c+f+p+h,_="['’]",g="["+m+"]",y="["+s+"]",b="\\d+",w="["+u+"]",x="["+l+"]",E="[^"+r+m+b+u+l+d+"]",T="\\ud83c[\\udffb-\\udfff]",O="(?:"+y+"|"+T+")",S="[^"+r+"]",P="(?:\\ud83c[\\udde6-\\uddff]){2}",M="[\\ud800-\\udbff][\\udc00-\\udfff]",j="["+d+"]",A="\\u200d",C="(?:"+x+"|"+E+")",k="(?:"+j+"|"+E+")",R="(?:"+_+"(?:d|ll|m|re|s|t|ve))?",I="(?:"+_+"(?:D|LL|M|RE|S|T|VE))?",N=O+"?",U="["+v+"]?",F="(?:"+A+"(?:"+[S,P,M].join("|")+")"+U+N+")*",L="\\d*(?:(?:1st|2nd|3rd|(?![123])\\dth)\\b)",D="\\d*(?:(?:1ST|2ND|3RD|(?![123])\\dTH)\\b)",B=U+N+F,V="(?:"+[w,P,M].join("|")+")"+B,W=RegExp([j+"?"+x+"+"+R+"(?="+[g,j,"$"].join("|")+")",k+"+"+I+"(?="+[g,j+C,"$"].join("|")+")",j+"?"+C+"+"+R,j+"+"+I,D,L,b,V].join("|"),"g");t.exports=n},function(t,e,n){var r=n(562),o=n(506),i=o(function(t,e,n){return e=e.toLowerCase(),t+(n?r(e):e)});t.exports=i},function(t,e,n){function r(t){return i(o(t).toLowerCase())}var o=n(65),i=n(580);t.exports=r},function(t,e){function n(t){return function(){return t}}t.exports=n},function(t,e,n){function r(t){return t=i(t),t&&t.replace(a,o).replace(p,"")}var o=n(510),i=n(65),a=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,s="\\u0300-\\u036f",u="\\ufe20-\\ufe2f",l="\\u20d0-\\u20ff",c=s+u+l,f="["+c+"]",p=RegExp(f,"g");t.exports=r},function(t,e,n){function r(t,e,n){var r=s(t)?o:i;return n&&u(t,e,n)&&(e=void 0),r(t,a(e,3))}var o=n(463),i=n(472),a=n(82),s=n(30),u=n(178);t.exports=r},function(t,e,n){var r=n(507),o=n(567),i=r(o);t.exports=i},function(t,e,n){function r(t,e,n){var r=null==t?0:t.length;if(!r)return-1;var u=null==n?0:a(n);return u<0&&(u=s(r+u,0)),o(t,i(e,3),u)}var o=n(473),i=n(82),a=n(577),s=Math.max;t.exports=r},function(t,e,n){function r(t){var e=null==t?0:t.length;return e?o(t,1):[]}var o=n(171);t.exports=r},function(t,e,n){function r(t,e,n){var r=null==t?void 0:o(t,e);return void 0===r?n:r}var o=n(122);t.exports=r},function(t,e,n){function r(t){return"number"==typeof t&&i(t)}var o=n(29),i=o.isFinite;t.exports=r},function(t,e,n){function r(t,e){var n={};return e=a(e,3),i(t,function(t,r,i){o(n,e(t,r,i),t)}),n}var o=n(170),i=n(172),a=n(82);t.exports=r},function(t,e,n){function r(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError(i);var n=function(){var r=arguments,o=e?e.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var a=t.apply(this,r);return n.cache=i.set(o,a)||i,a};return n.cache=new(r.Cache||o),n}var o=n(120),i="Expected a function";r.Cache=o,t.exports=r},function(t,e,n){var r=n(485),o=n(513),i=o(function(t,e){return null==t?{}:r(t,e)});t.exports=i},function(t,e,n){function r(t){return a(t)?o(s(t)):i(t)}var o=n(487),i=n(488),a=n(124),s=n(63);t.exports=r},function(t,e){function n(){return[]}t.exports=n},function(t,e){function n(){return!1}t.exports=n},function(t,e,n){function r(t){var e=o(t),n=e%1;return e===e?n?e-n:e:0}var o=n(189);t.exports=r},function(t,e,n){function r(t){if("number"==typeof t)return t;if(i(t))return a;if(o(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=o(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(s,"");var n=l.test(t);return n||c.test(t)?f(t.slice(2),n?2:8):u.test(t)?a:+t}var o=n(55),i=n(89),a=NaN,s=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,c=/^0o[0-7]+$/i,f=parseInt;t.exports=r},function(t,e,n){var r=n(509),o=n(49),i=r(o);t.exports=i},function(t,e,n){var r=n(505),o=r("toUpperCase");t.exports=o},function(t,e,n){function r(t){return null==t?[]:o(t,i(t))}var o=n(499),i=n(49);t.exports=r},function(t,e,n){function r(t,e,n){return t=a(t),e=n?void 0:e,void 0===e?i(t)?s(t):o(t):t.match(e)||[]}var o=n(469),i=n(520),a=n(65),s=n(560);t.exports=r},function(t,e,n){"use strict";t.exports=function(t){var e,n=t.data,r=t.stride[0],o=t.offset,i=0;for(e=t.shape[0]-1;e>=0;e--,o+=r)i+=Math.abs(n[o]);return i}},function(t,e,n){"use strict";t.exports=function(t,e,n){var r,o=e.data,i=n.data,a=e.stride[0],s=n.stride[0],u=e.offset,l=n.offset;for(r=e.shape[0]-1;r>=0;r--,u+=a,l+=s)i[l]+=t*o[u]}},function(t,e,n){"use strict";t.exports=function(t,e){var n,r=t.data,o=e.data,i=t.stride[0],a=e.stride[0],s=t.offset,u=e.offset;for(n=t.shape[0]-1;n>=0;n--,s+=i,u+=a)o[u]=r[s]}},function(t,e,n){"use strict";t.exports=function(t,e,n){var r,o=e.data,i=n.data,a=e.stride[0],s=n.stride[0],u=e.offset,l=n.offset;for(r=e.shape[0]-1;r>=0;r--,u+=a,l+=s)i[l]=t*o[u]}},function(t,e,n){"use strict";t.exports=function(t,e){var n,r,o=t.data,i=t.stride[0],a=t.offset,s=0;if(t===e)for(n=t.shape[0]-1;n>=0;n--,a+=i)r=o[a],s+=r*r;else{var u=e.data,l=e.stride[0],c=e.offset;for(n=t.shape[0]-1;n>=0;n--,a+=i,c+=l)s+=u[c]*o[a]}return s}},function(t,e,n){"use strict";t.exports=function(t){var e,n,r,o=-(1/0),i=t.data,a=t.stride[0],s=t.offset,u=t.shape[0];for(e=0;e<u;e++,s+=a)n=Math.abs(i[s]),n>o&&(o=n,r=e);return r}},function(t,e,n){"use strict";var r=function(t,e){if(0===t&&0===e)return 0;var n=Math.abs(t),r=Math.abs(e),o=Math.min(n,r),i=Math.max(n,r);return o/=i,i*Math.sqrt(1+o*o)};t.exports=function(t){var e,n,o=t.data,i=t.stride[0],a=t.offset,s=0;for(e=t.shape[0]-1;e>=0;e--,a+=i)n=o[a],s=r(s,n);return s}},function(t,e,n){"use strict";Math.sign=Math.sign||function(t){return t=+t,0===t||isNaN(t)?t:t>0?1:-1},t.exports=function(t,e,n){var r=0,o=0,i=0,a=0,s=0;return 0===e?(r=Math.sign(t),o=0,i=Math.abs(t)):0===t?(r=0,o=Math.sign(e),i=Math.abs(e)):Math.abs(t)>Math.abs(e)?(a=e/t,s=Math.sign(t)*Math.sqrt(1+a*a),r=1/s,o=a*r,i=t*s):(a=t/e,s=Math.sign(t)*Math.sqrt(1+a*a),o=1/s,r=a*o,i=e*s),void 0!==n&&n.length>2?(n[0]=r,n[1]=o,n[2]=i,void 0):[r,o,i]}},function(t,e,n){"use strict";t.exports=function(t,e){var n,r=e.data,o=e.stride[0],i=e.offset;for(n=e.shape[0]-1;n>=0;n--,i+=o)r[i]*=t}},function(t,e,n){"use strict";t.exports=function(t,e){var n,r,o=t.data,i=e.data,a=t.stride[0],s=e.stride[0],u=t.offset,l=e.offset;for(n=t.shape[0]-1;n>=0;n--,u+=a,l+=s)r=o[u],o[u]=i[l],i[l]=r}},function(t,e,n){"use strict";function r(t,e,n,r,o,i,a){for(var s=0,u=0,l=0,c=0,f=0,p=t.shape[0],h=t.shape[1],d=Math.min(e,p-1),v=Math.min(n,h-1),m=void 0===i?1:i,_=void 0===a?0:a;s<=d;){c=0;var g=Math.min(s+v,h-1);for(l=0;l<=g;l++)c+=t.get(s,l)*r.get(l);o.set(s,c*m+_*o.get(s)),s++}if(s<p)for(u=0;s+v<h;){for(c=0,l=0;l<=d+v;l++)f=u+l+1,c+=t.get(s,f)*r.get(f);if(o.set(s,c*m+_*o.get(s)),s++,u++,s===p)break}if(s<p)for(u++;s-d<h;){for(c=0,l=u;l<h;l++)c+=t.get(s,l)*r.get(l);if(o.set(s,c*m+_*o.get(s)),s++,u++,s===p)break}return!0}t.exports=r},function(t,e,n){"use strict";function r(t,e,n,r,i){for(var a=o.dot,s=e.shape[0]-1;s>=0;s--)i.set(s,i.get(s)*r+t*a(e.pick(s,null),n));return!0}var o=n(90);t.exports=r},function(t,e,n){"use strict";function r(){console.error("GER (rank 1 operation A := alpha*x*y' + A) not yet implemented")}t.exports=r},function(t,e,n){"use strict";function r(){console.error("SBMV (symmetric banded matrix vector multiply) not yet implemented")}t.exports=r},function(t,e,n){"use strict";(function(t){function e(){console.error("SPMV (symmetric packed matrix vector multiply) not yet implemented")}t.exporst=e}).call(e,n(92)(t))},function(t,e,n){"use strict";function r(){console.error("SPR (symmetric packed rank 1 operation A := alpha*x*y' + A) not yet implemented")}t.exports=r},function(t,e,n){"use strict";function r(){console.error("SPR (symmetric packed rank 2 operation A := alpha*x*y' + alpha*y*x' + A) not yet implemented")}t.exports=r},function(t,e,n){"use strict";function r(t,e,n,r,i,a){var s=t.shape[0],u=r||!0,l=void 0===i?1:i,c=void 0===a?0:a,f=0,p=0,h=0,d=0;if(0===c)for(f=0;f<n.shape[0];++f)n.set(f,0);else 1!==c&&o.scal(c,n);if(0===l)return!0;if(1===l)if(u)for(p=0;p<s;++p){for(h=e.get(p),d=0,n.set(p,n.get(p)+h*t.get(p,p)),f=p+1;f<s;++f)n.set(f,n.get(f)+h*t.get(f,p)),d+=t.get(f,p)*e.get(f);n.set(p,n.get(p)+d)}else for(p=0;p<s;++p){for(h=e.get(p),d=0,f=0;f<=p-1;++f)n.set(f,n.get(f)+h*t.get(f,p)),d+=t.get(f,p)*e.get(f);n.set(p,n.get(p)+h*t.get(p,p)+d)}else if(u)for(p=0;p<s;++p){for(h=l*e.get(p),d=0,n.set(p,n.get(p)+h*t.get(p,p)),f=p+1;f<s;++f)n.set(f,n.get(f)+h*t.get(f,p)),d+=t.get(f,p)*e.get(f);n.set(p,n.get(p)+l*d)}else for(p=0;p<s;++p){for(h=l*e.get(p),d=0,f=0;f<=p-1;++f)n.set(f,n.get(f)+h*t.get(f,p)),d+=t.get(f,p)*e.get(f);n.set(p,n.get(p)+h*t.get(p,p)+l*d)}return!0}var o=n(90);t.exports=r},function(t,e,n){"use strict";function r(){console.error("SYR (symmetric rank 1 operation A := alpha*x*y' + A) not yet implemented")}t.exports=r},function(t,e,n){"use strict";function r(){console.error("SYR (symmetric rank 2 operation A := alpha*x*y' + alpha*y*x' + A) not yet implemented")}t.exports=r},function(t,e,n){"use strict";function r(){console.error("TBMV (triangular banded matrix vector multiply) not yet implemented")}t.exports=r},function(t,e,n){"use strict";(function(t){function e(){console.error("TBSV (triangular banded matrix solver) not yet implemented")}t.exporst=e}).call(e,n(92)(t))},function(t,e,n){"use strict";function r(){console.error("TPSV (triangular packed matrix solver) not yet implemented")}t.exports=r},function(t,e,n){"use strict";function r(t,e,n){var r=o.dot,i=t.shape[1],a=0;if(n)for(a=i-1;a>=0;a--)e.set(a,r(t.pick(a,null).hi(a+1),e.hi(a+1)));else for(a=0;a<i;a++)e.set(a,r(t.pick(a,null).lo(a),e.lo(a)));return!0}var o=n(90);t.exports=r},function(t,e,n){"use strict";function r(t,e,n){var r=o.dot,i=t.shape[1],a=0;if(n)for(e.set(0,e.get(0)/t.get(0,0)),a=1;a<i;a++)e.set(a,(e.get(a)-r(t.pick(a,null).hi(a),e.hi(a)))/t.get(a,a));else for(e.set(i-1,e.get(i-1)/t.get(i-1,i-1)),a=i-2;a>=0;a--)e.set(a,(e.get(a)-r(t.pick(a,null).lo(a+1),e.lo(a+1)))/t.get(a,a));return!0}var o=n(90);t.exports=r},function(t,e,n){"use strict";function r(){var t,e,n,r,u,l,c,f,p,h;if(r=o({},s),0===arguments.length)throw new Error("Array of ndarrays to concatenate must not be empty");if(Array.isArray(arguments[0])?(n=arguments[0],o(r,arguments[1]||{})):2===arguments.length&&(n=arguments[1],t=arguments[0],o(r,arguments[2]||{})),0===n.length)throw new Error("Array of ndarrays to concatenate must not be empty");for(u=0;u<n.length;u++)if(c){if(n[u].dimension!==c.length)throw new Error("all arrays must have the same dimensionality");for(l=1;l<n[u].shape.length;l++)if(n[u].shape[l]!==c[l])throw new Error("last n-1 dimensions of concatenated rows must have the same size");c[0]+=n[u].shape[0]}else c=n[u].shape.slice(0);if(t){if(c[0]!==t.shape[0])throw new Error("first dimension of output array must match the total number of concatenated rows")}else t=a.zeros(c,r.dtype);for(l=0,f=0;l<n.length;l++)e=n[l],p=e.shape[0],h=t.lo(f).hi(p),i.assign(h,e),f+=p;return t}t.exports=r;var o=n(623),i=n(3),a=n(190),s={dtype:"double"}},function(t,e,n){"use strict";function r(t,e){return"native"===e[1]?[t,"d0=",t,".length,",t,"d1=",t,"[0].length,"].join(""):[t,"d0=",t,".shape[0],",t,"d1=",t,".shape[1],",t,"s0=",t,".stride[0],",t,"s1=",t,".stride[1],",t,"o=",t,".offset,",t,"d=",t,".data,"].join("")}function o(t,e,n,r,o,i){var a=[];return"native"===n[1]?t[0]&&(r?a.push("var ",e,"p=",e,"[",r,"];"):a.push("var ",e,"p=",e,"[0];")):r&&o?i?a.push("var ",e,"t0=",e,"s",t[0],",",e,"t1=",e,"s",t[1],"-",e,"s",t[0],"*",i,",",e,"p=",e,"o+",r,"*",e,"s0+",o,"*",e,"s1;"):a.push("var ",e,"t0=",e,"s",t[0],",",e,"p=",e,"o+",r,"*",e,"s0+",o,"*",e,"s1;"):r?a.push("var ",e,"t0=",e,"s",t[0],",",e,"p=",e,"o+",r,"*",e,"s0;"):o?a.push("var ",e,"t0=",e,"s",t[0],",",e,"p=",e,"o+",o,"*",e,"s1;"):a.push("var ",e,"t0=",e,"s",t[0],",",e,"t1=",e,"s",t[1],"-",e,"s",t[0],"*",e,"d",t[0],",",e,"p=",e,"o;"),a}function i(t,e,n,r,o){var i=[];return"native"===n[1]?t[0]&&1===r&&i.push(e,"p=",e,"[",o,"+1]"):i.push(e,"p+=",e,"t",r,";"),i}function a(t,e,n,r,o,i){var a=[];return"native"===n[1]?t[0]?a.push(e,"p[",o,"]=",i,";"):a.push(e,"[",r,"][",o,"]=",i,";"):"generic"===n[1]?a.push(e,"d.set(",e,"p,",i,");"):a.push(e,"d[",e,"p]=",i,";"),a}function s(t,e,n,r,o){var i=[];return"native"===n[1]?t[0]?i.push(e,"p[",o,"]"):i.push(e,"[",r,"][",o,"]"):"generic"===n[1]?i.push(e,"d.get(",e,"p)"):i.push(e,"d[",e,"p]"),i.join("")}function u(t,e,n,r,u){var l=[],c="r"===t[0]?[1,0]:[0,1],f=[1,0],p=[0,1],h=["i","j"];return l.push.apply(l,o(c,"o",t)),c[1]?(l.push("for(j=0;j<od1;++j){"),l.push("for(i=0;i<od0;++i){")):(l.push("for(i=0;i<od0;++i){"),l.push("for(j=0;j<od1;++j){")),l.push.apply(l,o(f,"a",e,"i")),l.push.apply(l,o(p,"b",n,void 0,"j")),l.push("var r=0.0;","for(k=0;k<ad1;++k){","r+=",s(f,"a",e,"i","k"),"*",s(p,"b",n,"k","j"),";"),l.push.apply(l,i(f,"a",e,0,"k")),l.push.apply(l,i(p,"b",n,0,"k")),l.push("}"),r&&l.push("r*=A;"),u&&l.push("r+=B*",s(c,"o",t,"i","j"),";"),l.push.apply(l,a(c,"o",t,"i","j","r")),l.push.apply(l,i(c,"o",t,0,h[1])),l.push("}"),l.push.apply(l,i(c,"o",t,1,h[0])),l.push("}"),l}function l(t,e){var n,r=[],u="r"===t[0]?[1,0]:[0,1];return e&&r.push("if(B!==1.0){"),r.push.apply(r,o(u,"o",t)),u[0]?(r.push("for(i=0;i<od0;++i){for(j=0;j<od1;++j){"),n=["i","j"]):(r.push("for(j=0;j<od1;++j){for(i=0;i<od0;++i){"),n=["j","i"]),e?r.push.apply(r,a(u,"o",t,"i","j","B*"+s(u,"o",t,"i","j"))):r.push.apply(r,a(u,"o",t,"i","j","0")),r.push.apply(r,i(u,"o",t,0,n[1])),r.push("}"),r.push.apply(r,i(u,"o",t,1,n[0])),r.push("}"),e&&r.push("}"),r}function c(t,e,n,r,u){var c=[],f=["od0","od1","ad1"],h=[1,0],d=[1,0],v=[0,1];c.push.apply(c,l(t,u));for(var m=0;m<3;++m)c.push("for(var i",m,"=",f[m],";i",m,">0;){","var w",m,"=",p,";","if(i",m,"<",p,"){","w",m,"=i",m,";","i",m,"=0;","}else{","i",m,"-=",p,";","}");c.push.apply(c,o(h,"o",t,"i0","i1","w1")),c.push("for(i=0;i<w0;++i){for(j=0;j<w1;++j){var r=0.0;"),c.push.apply(c,o(d,"a",e,"(i0+i)","i2")),c.push.apply(c,o(v,"b",n,"i2","(i1+j)")),c.push("for(k=0;k<w2;++k){"),c.push("r+=",s(d,"a",e,"(i0+i)","(i2+k)"),"*",s(v,"b",n,"(i2+k)","(i1+j)"),";"),c.push.apply(c,i(d,"a",e,0,"(i2+k)")),c.push.apply(c,i(v,"b",n,0,"(i2+k)")),c.push("}");var _="r";return r&&(_="A*r"),c.push.apply(c,a(h,"o",t,"(i0+i)","(i1+j)",_+"+"+s(h,"o",t,"(i0+i)","(i1+j)"))),c.push.apply(c,i(h,"o",t,0,"(i1+j)")),c.push("}"),c.push.apply(c,i(h,"o",t,1,"(i0+i)")),c.push("}}}}"),c}function f(t,e,n,o,i){var a=["gemm",t[0],t[1],"a",e[0],e[1],"b",n[0],n[1],o?"alpha":"",i?"beta":""].join(""),s=["function ",a,"(o,a,b,A,B){","var ",r("o",t),r("a",e),r("b",n),"i,j,k;"];"r"===e[0]&&"c"===n[0]?s.push.apply(s,u(t,e,n,o,i)):s.push.apply(s,c(t,e,n,o,i)),s.push("}return ",a);var l=new Function(s.join(""));return l()}t.exports=f;var p=32},function(t,e,n){"use strict";function r(){var t,e,n,r;if(2===arguments.length?(e=arguments[0],r=arguments[1]):3===arguments.length&&(n=arguments[0],e=arguments[1],r=arguments[2]),!Array.isArray(r))throw new Error("second argument of tile must be an array of repetition counts for each dimension");var a=e.shape.slice(0),s=a.slice(0),u=Math.max(s.length,r.length);for(t=0;t<u;t++)if(a[t]=void 0===a[t]?1:a[t],r[t]=void 0===r[t]?1:r[t],s[t]=(void 0===s[t]?1:s[t])*r[t],0===s[t])throw new Error("Number of tiles must be greater than zero");n||(n=o.zeros(s,e.dtype));var l=1;for(t=0;t<r.length;t++)l*=r[t];var c=new Array(r.length);for(t=0;t<r.length;t++)c[t]=0;var f=s.slice(0);for(h=0;h<s.length;h++)f[h]=h<e.dimension?null:0;for(t=0;t<l;t++){for(h=e.dimension;h<s.length;h++)f[h]=c[h];var p=n.pick.apply(n,f);if(p=p.lo.apply(p,c),p=p.hi.apply(p,e.shape),i.assign(p,e),t===l-1)break;for(var h=u-1;h>=0&&(c[h]+=a[h],c[h]===s[h]);)c[h]=0,h--}return n}var o=n(190),i=n(3);t.exports=r},function(t,e){t.exports='// 2D convolution fragment shader - based on im2col + gemm implementation\n// The input texture, X, is already configured as column matrix, after\n// input_transform.glsl is run on it if necessary. The output texture is in column\n// matrix configuration, and will need to be reshaped or transformed prior to the\n// next layer.\n\n// The following code is adapted from weblas, specifically the sgemm parts.\n// https://github.com/waylonflinn/weblas\n//\n// The MIT License (MIT)\n//\n// Copyright (c) 2015 Waylon Flinn\n// Modified by Leon Chen, 2017\n//\n// Permission is hereby granted, free of charge, to any person obtaining a copy\n// of this software and associated documentation files (the "Software"), to deal\n// in the Software without restriction, including without limitation the rights\n// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n// copies of the Software, and to permit persons to whom the Software is\n// furnished to do so, subject to the following conditions:\n//\n// The above copyright notice and this permission notice shall be included in all\n// copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n// SOFTWARE.\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 outTex;\nuniform sampler2D X;\nuniform sampler2D W;\nuniform sampler2D b;\nuniform int inputCols;\nuniform int outputCols;\nuniform int inputColPad;\nuniform int outputColPad;\nuniform int relu;\n\n// sum of products between elements in row i (from X) x col j (from B)\n//\n// Calculate the dot product between the row (from X) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol (float y, float x, sampler2D X, sampler2D W, int K) {\n  float delta_t = 1. / float(K); // space (on texture) between elements\n  float sum = 0.; // sum for this row/column pair\n  float z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n  for (int l = 0; l < 4096; ++l) {\n    if (l >= K / 4) break; // stop when we finish the row/column\n    // l is in pixel space, so we divide by four\n\n    // retrieve next four elements from each texture\n    vec4 a_ik = texture2D(X, vec2(z, y));\n    vec4 b_kj = texture2D(W, vec2(z, x));\n\n    // use `dot` to process four elements at a time\n    sum += dot(a_ik, b_kj);\n    z += (4.0 * delta_t); // (z + 0.5)*delta\n  }\n  return sum;\n}\n\nvoid main(void) {\n\n  // get the implied row and column from .y and .x of passed (output)\n  // texture coordinate. These map directly to input texture space when\n  // the relevant dimensions are the same.\n  float row_t = outTex.y;\n  float col_t = outTex.x;\n  vec4 b_v = texture2D(b, vec2(col_t, 0.5));\n\n  vec4 sum_v = vec4(0.0, 0.0, 0.0, 0.0);\n  float col = (col_t * float(outputCols + outputColPad) - 2.0); // index of first element in pixel (matrix space)\n  sum_v.r = dot_rowcol(row_t, (col + 0.5) / float(outputCols), X, W, inputCols + inputColPad);\n  // in the padding region?\n  if (outputColPad > 0 && (col + 4.0) > float(outputCols)) {\n    // pad\n    if (outputColPad < 3) {\n      sum_v.g = dot_rowcol(row_t, (col + 1.5) / float(outputCols), X, W, inputCols + inputColPad);\n    }\n    if (outputColPad < 2) {\n      sum_v.b = dot_rowcol(row_t, (col + 2.5) / float(outputCols), X, W, inputCols + inputColPad);\n    }\n  } else {\n    sum_v.g = dot_rowcol(row_t, (col + 1.5) / float(outputCols), X, W, inputCols + inputColPad);\n    sum_v.b = dot_rowcol(row_t, (col + 2.5) / float(outputCols), X, W, inputCols + inputColPad);\n    sum_v.a = dot_rowcol(row_t, (col + 3.5) / float(outputCols), X, W, inputCols + inputColPad);\n  }\n\n  if (relu == 1) {\n    gl_FragColor = max(sum_v + b_v, 0.0);\n  } else {\n    gl_FragColor = sum_v + b_v;\n  }\n}\n'},function(t,e){t.exports="// Transform input matrix X based on index mappings, indexMappingRow and indexMappingCol.\n// This is an extension of weblas.\n// https://github.com/waylonflinn/weblas\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 outTex;\nuniform sampler2D X;\nuniform sampler2D indexMappingRow;\nuniform sampler2D indexMappingCol;\nuniform int inputRows;\nuniform int inputCols;\nuniform int outputCols;\nuniform int inputColPad;\nuniform int outputColPad;\n\nfloat select_index(vec4 v, int index) {\n  float val = 0.0;\n  if (index == 0) {\n    val = v.r;\n  } else if (index == 1) {\n    val = v.g;\n  } else if (index == 2) {\n    val = v.b;\n  } else if (index == 3) {\n    val = v.a;\n  }\n  return val;\n}\n\nvoid fix_pad(inout vec4 v, int pad) {\n  v.a = 0.0;\n  if (pad == 2) {\n    v.b = 0.0;\n  } else if (pad == 3) {\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n  // index of first element in pixel (matrix space)\n  float col = floor(outTex.x * float(outputCols + outputColPad) - 1.5);\n\n  vec4 rowIndices = texture2D(indexMappingRow, vec2(outTex.x, outTex.y));\n  vec4 colIndices = texture2D(indexMappingCol, vec2(outTex.x, outTex.y));\n\n  float rowIndex;\n  float colIndex;\n  float inputCoordX;\n  float inputCoordY;\n  vec2 inputCoords;\n  int inputChannel;\n  vec4 mappedValues = vec4(0.0, 0.0, 0.0, 0.0);\n  for (int i = 0; i < 4; i++) {\n    rowIndex = select_index(rowIndices, i);\n    colIndex = select_index(colIndices, i);\n\n    if (rowIndex != -1.0 && colIndex != -1.0) {\n      inputCoordX = (float(colIndex) + 0.5) / float(inputCols + inputColPad);\n      inputCoordY = (float(rowIndex) + 0.5) / float(inputRows);\n      inputCoords = vec2(inputCoordX, inputCoordY);\n      inputChannel = int(mod(colIndex, 4.0));\n      if (i == 0) {\n        mappedValues.r = select_index(texture2D(X, inputCoords), inputChannel);\n      } else if (i == 1) {\n        mappedValues.g = select_index(texture2D(X, inputCoords), inputChannel);\n      } else if (i == 2) {\n        mappedValues.b = select_index(texture2D(X, inputCoords), inputChannel);\n      } else if (i == 3) {\n        mappedValues.a = select_index(texture2D(X, inputCoords), inputChannel);\n      }\n    }\n\n    // set pad values to 0.0, if in padded region of output texture\n    if (outputColPad > 0 && col + 4.0 > float(outputCols)) {\n      fix_pad(mappedValues, outputColPad);\n    }\n  }\n\n  gl_FragColor = mappedValues;\n}\n"},function(t,e){t.exports="// Merge op.\n// Modes: 'sum', 'mul', 'ave', 'max'\n// This is an extension of weblas.\n// https://github.com/waylonflinn/weblas\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 outTex;\nuniform sampler2D inputs[8]; // array length must be fixed\nuniform int numInputs;\nuniform int modeCode;\nuniform int outputCols;\nuniform int outputColPad;\n\nvoid fix_pad(inout vec4 v, int pad) {\n  v.a = 0.0;\n  if (pad == 2) {\n    v.b = 0.0;\n  } else if (pad == 3) {\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n  // index of first element in pixel (matrix space)\n  float col = floor(outTex.x * float(outputCols + outputColPad) - 1.5);\n\n  vec4 mergeValues = vec4(0.0, 0.0, 0.0, 0.0);\n  if (modeCode == 1) {\n    // mul\n    mergeValues = vec4(1.0, 1.0, 1.0, 1.0);\n  } else if (modeCode == 4) {\n    // max\n    const float min = -1.0e+08;\n    mergeValues = vec4(min, min, min, min);\n  }\n\n  for (int i = 0; i < 8; i += 1) {\n    if (i >= numInputs) {\n      break;\n    }\n\n    if (modeCode == 0 || modeCode == 3) {\n      // sum\n      // ave\n      mergeValues = mergeValues + texture2D(inputs[i], vec2(outTex.x, outTex.y));\n    } else if (modeCode == 1) {\n      // mul\n      mergeValues = mergeValues * texture2D(inputs[i], vec2(outTex.x, outTex.y));\n    } else if (modeCode == 4) {\n      // max\n      mergeValues = max(mergeValues, texture2D(inputs[i], vec2(outTex.x, outTex.y)));\n    }\n  }\n\n  if (modeCode == 3) {\n    // ave\n    mergeValues = mergeValues / float(numInputs);\n  }\n\n  // set pad values to 0.0, if in padded region of output texture\n  if (outputColPad > 0 && col + 4.0 > float(outputCols)) {\n    fix_pad(mergeValues, outputColPad);\n  }\n\n  gl_FragColor = mergeValues;\n}\n";
},function(t,e){t.exports="// Merge op.\n// Modes: 'concat'\n// This is an extension of weblas.\n// https://github.com/waylonflinn/weblas\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 outTex;\nuniform sampler2D inputs[8]; // array length must be fixed\nuniform int numInputs;\nuniform int inputChannelStartIndices[8];\nuniform int outputRows;\nuniform int outputCols;\nuniform int outputColPad;\n\nvoid fix_pad(inout vec4 v, int pad) {\n  v.a = 0.0;\n  if (pad == 2) {\n    v.b = 0.0;\n  } else if (pad == 3) {\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n  // index of first element in pixel (matrix space)\n  float col = floor(outTex.x * float(outputCols + outputColPad) - 0.5);\n\n  vec4 outValues = vec4(0.0, 0.0, 0.0, 0.0);\n  int row = int(floor(outTex.y * float(outputRows)));\n  float inputCoordY;\n  for (int i = 0; i < 8; i += 1) {\n    if (i >= numInputs) {\n      break;\n    }\n\n    if (i == numInputs - 1) {\n      inputCoordY = (0.5 + floor(outTex.y * float(outputRows)) - float(inputChannelStartIndices[i])) / float(outputRows - inputChannelStartIndices[i]);\n      outValues = texture2D(inputs[i], vec2(outTex.x, inputCoordY));\n      break;\n    } else if (row >= inputChannelStartIndices[i] && row < inputChannelStartIndices[i + 1]) {\n      inputCoordY = (0.5 + floor(outTex.y * float(outputRows)) - float(inputChannelStartIndices[i])) / float(inputChannelStartIndices[i + 1] - inputChannelStartIndices[i]);\n      outValues = texture2D(inputs[i], vec2(outTex.x, inputCoordY));\n      break;\n    }\n  }\n\n  // set pad values to 0.0, if in padded region of output texture\n  if (outputColPad > 0 && col + 4.0 > float(outputCols)) {\n    fix_pad(outValues, outputColPad);\n  }\n\n  gl_FragColor = outValues;\n}\n"},function(t,e){t.exports="// Batch normalization op.\n// This is an extension of weblas.\n// https://github.com/waylonflinn/weblas\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 outTex;\nuniform sampler2D X;\nuniform sampler2D gamma;\nuniform sampler2D beta;\nuniform sampler2D mean;\nuniform sampler2D std;\nuniform float epsilon;\nuniform int outputCols;\nuniform int outputColPad;\n\nvoid fix_pad(inout vec4 v, int pad) {\n  v.a = 0.0;\n  if (pad == 2) {\n    v.b = 0.0;\n  } else if (pad == 3) {\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n  // index of first element in pixel (matrix space)\n  float col = floor(outTex.x * float(outputCols + outputColPad) - 1.5);\n\n  vec4 _x = texture2D(X, vec2(outTex.x, outTex.y));\n  vec4 _mean = texture2D(mean, vec2(outTex.x, 0.5));\n  vec4 _std = texture2D(std, vec2(outTex.x, 0.5));\n  vec4 _gamma = texture2D(gamma, vec2(outTex.x, 0.5));\n  vec4 _beta = texture2D(beta, vec2(outTex.x, 0.5));\n  vec4 sumValues = _beta + _gamma * (_x - _mean) / sqrt(_std + epsilon);\n\n  // set pad values to 0.0, if in padded region of output texture\n  if (outputColPad > 0 && col + 4.0 > float(outputCols)) {\n    fix_pad(sumValues, outputColPad);\n  }\n\n  gl_FragColor = sumValues;\n}\n"},function(t,e){t.exports="// 2D Average Pooling op.\n// This is an extension of weblas.\n// https://github.com/waylonflinn/weblas\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 outTex;\nuniform sampler2D X;\nuniform sampler2D poolIndexMapping;\nuniform int inputRows;\nuniform int channels;\nuniform int channelsPad;\nuniform int poolElements;\nuniform int poolElementsPad;\n\nfloat select_index(vec4 v, int index) {\n  float val = 0.0;\n  if (index == 0) {\n    val = v.r;\n  } else if (index == 1) {\n    val = v.g;\n  } else if (index == 2) {\n    val = v.b;\n  } else if (index == 3) {\n    val = v.a;\n  }\n  return val;\n}\n\nvoid fix_pad(inout vec4 v, int pad) {\n  v.a = 0.0;\n  if (pad == 2) {\n    v.b = 0.0;\n  } else if (pad == 3) {\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n  // index of first element in pixel (matrix space)\n  float col = floor(outTex.x * float(channels + channelsPad) - 1.5);\n\n  float poolIndexCoordX;\n  vec4 poolIndices;\n  int poolIndexRGBA;\n  float poolIndex;\n  vec4 mappedValues;\n  float inputCoordY;\n  vec4 currentSum = vec4(0.0, 0.0, 0.0, 0.0);\n  int poolElementsEffective = poolElements;\n  for (int i = 0; i < 100; i += 1) {\n    if (i >= poolElements) {\n      break;\n    }\n\n    poolIndexCoordX = (float(i) + 0.5) / float(poolElements + poolElementsPad);\n    poolIndices = texture2D(poolIndexMapping, vec2(poolIndexCoordX, outTex.y));\n    poolIndexRGBA = int(mod(float(i), 4.0));\n    poolIndex = select_index(poolIndices, poolIndexRGBA);\n\n    if (poolIndex != -1.0) {\n      inputCoordY = (poolIndex + 0.5) / float(inputRows);\n      mappedValues = texture2D(X, vec2(outTex.x, inputCoordY));\n      currentSum = currentSum + mappedValues;\n    } else {\n      poolElementsEffective = poolElementsEffective - 1;\n    }\n  }\n\n  currentSum = currentSum / float(poolElementsEffective);\n\n  // set pad values to 0.0, if in padded region of output texture\n  if (channelsPad > 0 && col + 4.0 > float(channels)) {\n    fix_pad(mappedValues, channelsPad);\n  }\n\n  gl_FragColor = currentSum;\n}\n"},function(t,e){t.exports="// 2D Max Pooling op.\n// This is an extension of weblas.\n// https://github.com/waylonflinn/weblas\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 outTex;\nuniform sampler2D X;\nuniform sampler2D poolIndexMapping;\nuniform int inputRows;\nuniform int channels;\nuniform int channelsPad;\nuniform int poolElements;\nuniform int poolElementsPad;\n\nfloat select_index(vec4 v, int index) {\n  float val = 0.0;\n  if (index == 0) {\n    val = v.r;\n  } else if (index == 1) {\n    val = v.g;\n  } else if (index == 2) {\n    val = v.b;\n  } else if (index == 3) {\n    val = v.a;\n  }\n  return val;\n}\n\nvoid fix_pad(inout vec4 v, int pad) {\n  v.a = 0.0;\n  if (pad == 2) {\n    v.b = 0.0;\n  } else if (pad == 3) {\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n  // index of first element in pixel (matrix space)\n  float col = floor(outTex.x * float(channels + channelsPad) - 1.5);\n\n  float poolIndexCoordX;\n  vec4 poolIndices;\n  int poolIndexRGBA;\n  float poolIndex;\n  vec4 mappedValues;\n  float inputCoordY;\n  const float min = -1.0e+08;\n  vec4 currentMax = vec4(min, min, min, min);\n  for (int i = 0; i < 100; i += 1) {\n    if (i >= poolElements) {\n      break;\n    }\n\n    poolIndexCoordX = (float(i) + 0.5) / float(poolElements + poolElementsPad);\n    poolIndices = texture2D(poolIndexMapping, vec2(poolIndexCoordX, outTex.y));\n    poolIndexRGBA = int(mod(float(i), 4.0));\n    poolIndex = select_index(poolIndices, poolIndexRGBA);\n\n    if (poolIndex != -1.0) {\n      inputCoordY = (poolIndex + 0.5) / float(inputRows);\n      mappedValues = texture2D(X, vec2(outTex.x, inputCoordY));\n    }\n\n    currentMax = max(currentMax, mappedValues);\n  }\n\n  // set pad values to 0.0, if in padded region of output texture\n  if (channelsPad > 0 && col + 4.0 > float(channels)) {\n    fix_pad(mappedValues, channelsPad);\n  }\n\n  gl_FragColor = currentMax;\n}\n"},function(t,e){t.exports="// Copy texture\n// This is an extension of weblas.\n// https://github.com/waylonflinn/weblas\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2 outTex;\nuniform sampler2D source;\n\nvoid main(void) {\n  gl_FragColor = texture2D(source, vec2(outTex.x, outTex.y));\n}\n"},function(t,e,n){(function(e,n){!function(e){"use strict";function r(t,e,n,r){var o=e&&e.prototype instanceof i?e:i,a=Object.create(o.prototype),s=new h(r||[]);return a._invoke=c(t,n,s),a}function o(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}function i(){}function a(){}function s(){}function u(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function l(t){function e(n,r,i,a){var s=o(t[n],t,r);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"==typeof l&&g.call(l,"__await")?Promise.resolve(l.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(l).then(function(t){u.value=t,i(u)},a)}a(s.arg)}function r(t,n){function r(){return new Promise(function(r,o){e(t,n,r,o)})}return i=i?i.then(r,r):r()}"object"==typeof n&&n.domain&&(e=n.domain.bind(e));var i;this._invoke=r}function c(t,e,n){var r=T;return function(i,a){if(r===S)throw new Error("Generator is already running");if(r===P){if("throw"===i)throw a;return v()}for(;;){var s=n.delegate;if(s){if("return"===i||"throw"===i&&s.iterator[i]===m){n.delegate=null;var u=s.iterator.return;if(u){var l=o(u,s.iterator,a);if("throw"===l.type){i="throw",a=l.arg;continue}}if("return"===i)continue}var l=o(s.iterator[i],s.iterator,a);if("throw"===l.type){n.delegate=null,i="throw",a=l.arg;continue}i="next",a=m;var c=l.arg;if(!c.done)return r=O,c;n[s.resultName]=c.value,n.next=s.nextLoc,n.delegate=null}if("next"===i)n.sent=n._sent=a;else if("throw"===i){if(r===T)throw r=P,a;n.dispatchException(a)&&(i="next",a=m)}else"return"===i&&n.abrupt("return",a);r=S;var l=o(t,e,n);if("normal"===l.type){r=n.done?P:O;var c={value:l.arg,done:n.done};if(l.arg!==M)return c;n.delegate&&"next"===i&&(a=m)}else"throw"===l.type&&(r=P,i="throw",a=l.arg)}}}function f(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function p(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function h(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(f,this),this.reset(!0)}function d(t){if(t){var e=t[b];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,r=function e(){for(;++n<t.length;)if(g.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=m,e.done=!0,e};return r.next=r}}return{next:v}}function v(){return{value:m,done:!0}}var m,_=Object.prototype,g=_.hasOwnProperty,y="function"==typeof Symbol?Symbol:{},b=y.iterator||"@@iterator",w=y.toStringTag||"@@toStringTag",x="object"==typeof t,E=e.regeneratorRuntime;if(E)return void(x&&(t.exports=E));E=e.regeneratorRuntime=x?t.exports:{},E.wrap=r;var T="suspendedStart",O="suspendedYield",S="executing",P="completed",M={},j={};j[b]=function(){return this};var A=Object.getPrototypeOf,C=A&&A(A(d([])));C&&C!==_&&g.call(C,b)&&(j=C);var k=s.prototype=i.prototype=Object.create(j);a.prototype=k.constructor=s,s.constructor=a,s[w]=a.displayName="GeneratorFunction",E.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===a||"GeneratorFunction"===(e.displayName||e.name))},E.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,s):(t.__proto__=s,w in t||(t[w]="GeneratorFunction")),t.prototype=Object.create(k),t},E.awrap=function(t){return{__await:t}},u(l.prototype),E.AsyncIterator=l,E.async=function(t,e,n,o){var i=new l(r(t,e,n,o));return E.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},u(k),k[w]="Generator",k.toString=function(){return"[object Generator]"},E.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},E.values=d,h.prototype={constructor:h,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=m,this.done=!1,this.delegate=null,this.tryEntries.forEach(p),!t)for(var e in this)"t"===e.charAt(0)&&g.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=m)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){function e(e,r){return i.type="throw",i.arg=t,n.next=e,!!r}if(this.done)throw t;for(var n=this,r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],i=o.completion;if("root"===o.tryLoc)return e("end");if(o.tryLoc<=this.prev){var a=g.call(o,"catchLoc"),s=g.call(o,"finallyLoc");if(a&&s){if(this.prev<o.catchLoc)return e(o.catchLoc,!0);if(this.prev<o.finallyLoc)return e(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return e(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return e(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&g.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?this.next=o.finallyLoc:this.complete(i),M},complete:function(t,e){if("throw"===t.type)throw t.arg;"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=t.arg,this.next="end"):"normal"===t.type&&e&&(this.next=e)},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),p(n),M}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;p(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:d(t),resultName:e,nextLoc:n},M}}}("object"==typeof e?e:"object"==typeof window?window:"object"==typeof self?self:this)}).call(e,n(38),n(131))},function(t,e,n){(function(t,e){!function(t,n){"use strict";function r(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var r={callback:t,args:e};return v[d]=r,h(d),d++}function o(t){delete v[t]}function i(t){var e=t.callback,r=t.args;switch(r.length){case 0:e();break;case 1:e(r[0]);break;case 2:e(r[0],r[1]);break;case 3:e(r[0],r[1],r[2]);break;default:e.apply(n,r)}}function a(t){if(m)setTimeout(a,0,t);else{var e=v[t];if(e){m=!0;try{i(e)}finally{o(t),m=!1}}}}function s(){h=function(t){e.nextTick(function(){a(t)})}}function u(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}function l(){var e="setImmediate$"+Math.random()+"$",n=function(n){n.source===t&&"string"==typeof n.data&&0===n.data.indexOf(e)&&a(+n.data.slice(e.length))};t.addEventListener?t.addEventListener("message",n,!1):t.attachEvent("onmessage",n),h=function(n){t.postMessage(e+n,"*")}}function c(){var t=new MessageChannel;t.port1.onmessage=function(t){var e=t.data;a(e)},h=function(e){t.port2.postMessage(e)}}function f(){var t=_.documentElement;h=function(e){var n=_.createElement("script");n.onreadystatechange=function(){a(e),n.onreadystatechange=null,t.removeChild(n),n=null},t.appendChild(n)}}function p(){h=function(t){setTimeout(a,0,t)}}if(!t.setImmediate){var h,d=1,v={},m=!1,_=t.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(t);g=g&&g.setTimeout?g:t,"[object process]"==={}.toString.call(t.process)?s():u()?l():t.MessageChannel?c():_&&"onreadystatechange"in _.createElement("script")?f():p(),g.setImmediate=r,g.clearImmediate=o}}("undefined"==typeof self?"undefined"==typeof t?this:t:self)}).call(e,n(38),n(131))},function(t,e,n){function r(t,e){this._id=t,this._clearFn=e}var o=Function.prototype.apply;e.setTimeout=function(){return new r(o.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new r(o.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(620),e.setImmediate=setImmediate,e.clearImmediate=clearImmediate},function(t,e,n){"use strict";(function(t,r){function o(t){if(t){var e=t.length||t.byteLength,n=g.log2(e);x[n].push(t)}}function i(t){o(t.buffer)}function a(t){var t=g.nextPow2(t),e=g.log2(t),n=x[e];return n.length>0?n.pop():new ArrayBuffer(t)}function s(t){return new Uint8Array(a(t),0,t)}function u(t){return new Uint16Array(a(2*t),0,t)}function l(t){return new Uint32Array(a(4*t),0,t)}function c(t){return new Int8Array(a(t),0,t)}function f(t){return new Int16Array(a(2*t),0,t)}function p(t){return new Int32Array(a(4*t),0,t)}function h(t){return new Float32Array(a(4*t),0,t)}function d(t){return new Float64Array(a(8*t),0,t)}function v(t){return b?new Uint8ClampedArray(a(t),0,t):s(t)}function m(t){return new DataView(a(t),0,t)}function _(t){t=g.nextPow2(t);var e=g.log2(t),n=E[e];return n.length>0?n.pop():new r(t)}var g=n(263),y=n(167);t.__TYPEDARRAY_POOL||(t.__TYPEDARRAY_POOL={UINT8:y([32,0]),UINT16:y([32,0]),UINT32:y([32,0]),INT8:y([32,0]),INT16:y([32,0]),INT32:y([32,0]),FLOAT:y([32,0]),DOUBLE:y([32,0]),DATA:y([32,0]),UINT8C:y([32,0]),BUFFER:y([32,0])});var b="undefined"!=typeof Uint8ClampedArray,w=t.__TYPEDARRAY_POOL;w.UINT8C||(w.UINT8C=y([32,0])),w.BUFFER||(w.BUFFER=y([32,0]));var x=w.DATA,E=w.BUFFER;e.free=function(t){if(r.isBuffer(t))E[g.log2(t.length)].push(t);else{if("[object ArrayBuffer]"!==Object.prototype.toString.call(t)&&(t=t.buffer),!t)return;var e=t.length||t.byteLength,n=0|g.log2(e);x[n].push(t)}},e.freeUint8=e.freeUint16=e.freeUint32=e.freeInt8=e.freeInt16=e.freeInt32=e.freeFloat32=e.freeFloat=e.freeFloat64=e.freeDouble=e.freeUint8Clamped=e.freeDataView=i,e.freeArrayBuffer=o,e.freeBuffer=function(t){E[g.log2(t.length)].push(t)},e.malloc=function(t,e){if(void 0===e||"arraybuffer"===e)return a(t);switch(e){case"uint8":return s(t);case"uint16":return u(t);case"uint32":return l(t);case"int8":return c(t);case"int16":return f(t);case"int32":return p(t);case"float":case"float32":return h(t);case"double":case"float64":return d(t);case"uint8_clamped":return v(t);case"buffer":return _(t);case"data":case"dataview":return m(t);default:return null}return null},e.mallocArrayBuffer=a,e.mallocUint8=s,e.mallocUint16=u,e.mallocUint32=l,e.mallocInt8=c,e.mallocInt16=f,e.mallocInt32=p,e.mallocFloat32=e.mallocFloat=h,e.mallocFloat64=e.mallocDouble=d,e.mallocUint8Clamped=v,e.mallocDataView=m,e.mallocBuffer=_,e.clearCache=function(){for(var t=0;t<32;++t)w.UINT8[t].length=0,w.UINT16[t].length=0,w.UINT32[t].length=0,w.INT8[t].length=0,w.INT16[t].length=0,w.INT32[t].length=0,w.FLOAT[t].length=0,w.DOUBLE[t].length=0,w.UINT8C[t].length=0,x[t].length=0,E[t].length=0}}).call(e,n(38),n(265).Buffer)},function(t,e){function n(t,e){if(!e||"object"!=typeof e)return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t}t.exports=n},function(t,e,n){var r,r;!function(e){t.exports=e()}(function(){return function t(e,n,o){function i(s,u){if(!n[s]){if(!e[s]){var l="function"==typeof r&&r;if(!u&&l)return r(s,!0);if(a)return a(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(t){var n=e[s][1][t];return i(n?n:t)},f,f.exports,t,e,n,o)}return n[s].exports}for(var a="function"==typeof r&&r,s=0;s<o.length;s++)i(o[s]);return i}({1:[function(t,e,n){function r(t){function e(e,n,r,o,i,a,s,u){if(null!=u&&u.length!=n)throw new Error("Only vector C with length matching rows in A is currently supported.");var l,c=i,f=u;l=v(r,n,a);var p=t.createDataTexture(e,r,c),h=t.createDataTexture(n,r,l),d=null;null!=f&&(d=t.createDataTexture(1,n,f));var _=t.createOutputTexture(e,n);return m.calculate(e,n,r,o,p,h,s,d,_),rawBuffer=t.readData(e,n),t.context.deleteTexture(p),t.context.deleteTexture(h),null!=d&&t.context.deleteTexture(d),t.context.deleteTexture(_),new Float32Array(rawBuffer)}function n(e,n,o,i){var a,s,u=o;r(i)?s=i:(s=new Float32Array(e),s.fill(i));var l=t.createDataTexture(1,e,u),c=t.createDataTexture(1,e,s),f=t.createOutputTexture(1,e);return _.calculate(e,n,l,c,f),a=t.readData(1,e),t.context.deleteTexture(l),t.context.deleteTexture(c),t.context.deleteTexture(f),new Float32Array(a)}function r(t){return"[object Float32Array]"===Object.prototype.toString.call(t)}function o(e,n,r,o,i){var a,s=i,u=t.createDataTexture(e,n,s),l=t.createOutputTexture(e,n);return g.calculate(e,n,r,o,u,l),a=t.readData(e,n),t.context.deleteTexture(u),t.context.deleteTexture(l),new Float32Array(a)}function f(e,n,r,o,i){var a,s=i,u=t.createDataTexture(e,n,s),l=t.createOutputTexture(e,n);return g.calculate(e,n,1/o,-1*r/o,u,l),a=t.readData(e,n),t.context.deleteTexture(u),t.context.deleteTexture(l),new Float32Array(a)}function p(e,n,r,o,i,a){var s=t.createDataTexture(e,n*r,a),u=Math.floor((n-o)/i)+1,l=Math.floor((e-o)/i)+1,c=t.createOutputTexture(l,u*r);return y.calculate(e,n,r,o,i,s,c),rawBuffer=t.readData(l,u*r),t.context.deleteTexture(s),t.context.deleteTexture(c),new Float32Array(rawBuffer)}function h(e,n,r,o,i){r=null!=r?r:Number.MIN_VALUE,o=null!=o?o:Number.MAX_VALUE;var a,s=i,u=t.createDataTexture(e,n,s),l=t.createOutputTexture(e,n);return b.calculate(e,n,r,o,u,l),a=t.readData(e,n),t.context.deleteTexture(u),t.context.deleteTexture(l),new Float32Array(a)}function d(t,e,n){var r,o,i=[];n?(i[1]=t.length,i[0]=t[0].length):(i[0]=t.length,i[1]=t[0].length),o=i[1],e=e||Float32Array,r=new e(i[0]*i[1]);for(var a=0;a<i[0];++a)for(var s=0;s<i[1];++s)n?r[a*o+s]=t[s][a]:r[a*o+s]=t[a][s];return r}function v(t,e,n){for(var r=new n.constructor(t*e),o=0;t>o;o++)for(var i=0;e>i;i++)r[i*t+o]=n[o*e+i];return r}var m=new a(t),_=new s(t),g=new u(t),y=new l(t),b=new c(t);return{saxpy:n,sscal:o,sgemm:e,sstd:f,sdwns:p,sclmp:h,pipeline:i,gpu:{gl:t,sgemm:i.sgemmcalculator.calculate.bind(i.sgemmcalculator),sscal:i.sscalcalculator.calculate.bind(i.sscalcalculator),sclmp:i.sclmpcalculator.calculate.bind(i.sclmpcalculator),sdwns:i.sdwnscalculator.calculate.bind(i.sdwnscalculator),encode:t.encode.bind(t)},util:{fromArray:d,transpose:v}}}var o=t("./lib/globals"),i=t("./lib/pipeline"),a=t("./lib/sgemmcalculator"),s=t("./lib/saxpycalculator"),u=t("./lib/sscalcalculator"),l=t("./lib/sdwnscalculator"),c=t("./lib/sclmpcalculator");o.gl?e.exports=r(o.gl):e.exports=null},{"./lib/globals":2,"./lib/pipeline":3,"./lib/saxpycalculator":4,"./lib/sclmpcalculator":5,"./lib/sdwnscalculator":6,"./lib/sgemmcalculator":7,"./lib/sscalcalculator":9}],2:[function(t,e,n){var r,o=t("./webgl");try{r=new o}catch(t){r=null,console.log("No support for WebGL!")}e.exports={gl:r}},{"./webgl":11}],3:[function(t,e,n){function r(t){function e(t,e,n){var r=n.shape[0],o=n.shape[1],i=new f([r,o],null);return v.calculate(r,o,t,e,n.texture,i.texture),i}function n(t,e,n,r,o){if(n.shape[1]!==e.shape[1])throw new Error("Second dimension must be of same size for input Tensors (second Tensor is transposed).");var i,a=e.shape[0],s=n.shape[0],u=e.shape[1];i=o?o.texture:null;var l=new f([a,s],null);return h.calculate(a,s,u,t,e.texture,n.texture,r,i,l.texture),l}function r(t,e,n,r){if(r.shape[1]%t!==0)throw new Error("Second dimension of tensor must be a multiple of channels");var o=r.shape[0],i=r.shape[1]/t,a=Math.floor((o-e)/n)+1,s=Math.floor((i-e)/n)+1,u=new f([a,s*t],null);return m.calculate(o,i,t,e,n,r.texture,u.texture),u}function o(t,e,n){t=null!=t?t:Number.MIN_VALUE,e=null!=e?e:Number.MAX_VALUE;var r=n.shape[0],o=n.shape[1],i=new f([r,o],null);return _.calculate(r,o,t,e,n.texture,i.texture),i}function p(t,e,n,r,o){if(o.shape[1]%t!==0)throw new Error("Second dimension of tensor must be a multiple of channels");var i,a,s=o.shape[0],u=o.shape[1]/t;r?(i=Math.ceil((u+2*r-e)/n)+1,a=Math.ceil((s+2*r-e)/n)+1):(r=0,i=Math.ceil((u-e)/n)+1,a=Math.ceil((s-e)/n)+1);var l=e*e*t,c=a*i,p=l,h=new f([c,p],null);return g.calculate(s,u,t,c,p,i,e,n,r,o.texture,h.texture),h}var h=new i(t,!1),d=new a(t,!1),v=new s(t,!1),m=new u(t,!1),_=new l(t,!1),g=new c(t,!1);return{Tensor:f,sscal:e,sgemm:n,sdwns:r,sclmp:o,slokn:p,sgemmcalculator:h,saxpycalculator:d,sscalcalculator:v,sdwnscalculator:m,sclmpcalculator:_,slokncalculator:g}}var o=t("./globals"),i=t("./sgemmcalculator"),a=t("./saxpycalculator"),s=t("./sscalcalculator"),u=t("./sdwnscalculator"),l=t("./sclmpcalculator"),c=t("./slokncalculator"),f=t("./tensor");o.gl?e.exports=r(o.gl):e.exports=null},{"./globals":2,"./saxpycalculator":4,"./sclmpcalculator":5,"./sdwnscalculator":6,"./sgemmcalculator":7,"./slokncalculator":8,"./sscalcalculator":9,"./tensor":10}],4:[function(t,e,n){function r(t,e){this.webgl=t,this.standalone=e||!0;var n="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D X;\t\t// texture with data from padded A\nuniform sampler2D Y;\t\t// texture with data from padded transpose of B\nuniform int       N;\nuniform float     a; \t\t// coefficient to multiplication\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1540259130(float val) {\n\n\t// TODO: correctly handle denormal numbers\n\t// http://www.2ality.com/2012/04/number-encoding.html\n\tfloat a = abs(val);                           // encode absolute value + sign\n\tfloat exp = floor(log2(a));                 // number of powers of 2\n\tfloat mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n\tfloat mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n\tfloat mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n\tfloat mant3 = mod(mant,256.);               // third 8 bits\n\n\thighp float sign = 128.-128.*(a/val);\t\t\t// sign bit is 256 or 0\n\thighp float e = (sign+exp+127.)/510.;\t\t// exponent and sign\n\thighp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n\thighp float m2 = (mant2)/255.;\t\t\t\t// middle part\n\thighp float m3 = (mant3+.5)/255.;\t\t\t// scale to 0 - 255\n\n\treturn vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1604150559(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n \tfloat row = outTex.y;\n\tfloat col = outTex.x;\n\n\t// direct usage of col requires output be padded exactly like input\n\tvec4 x = texture2D( X, vec2(col, row));\n\tvec4 y = texture2D( Y, vec2(col, row));\n\tvec4 sum_v = (a * x) + y;\n\tint channel = int(mod(col * float(N), 4.0 ));\n\tfloat sum = select_index_1604150559(sum_v, channel);\n\n\tif (sum == 0.) {\n\t\tgl_FragColor = vec4(0.,0.,0.,0.);\n\t\treturn;\n\t}\n\n \t// output vec4 with bytes for an IEEE754 32-bit floating point number\n\tgl_FragColor = encode_float_1540259130(sum);\n}\n";this.standalone?this.program=this.webgl.createProgram(n):this.program=this.webgl.createProgram(p)}t("./webgl");e.exports=r,r.TEXTURE_UNIFORM_NAME_0="X",r.TEXTURE_UNIFORM_NAME_1="Y",r.LENGTH_UNIFORM_NAME="N",r.COEFFICIENT_UNIFORM_NAME="a",r.prototype.calculate=function(t,e,n,o,i){var a=this.webgl.context;this.webgl.selectProgram(this.program),this.bindInputTexture(n,a.TEXTURE0,r.TEXTURE_UNIFORM_NAME_0),this.bindInputTexture(o,a.TEXTURE1,r.TEXTURE_UNIFORM_NAME_1);var s=this.webgl.getPad(t);this.bindUniforms(t+s,e),this.webgl.bindOutputTexture(1,t+s,i),a.drawElements(a.TRIANGLES,6,a.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(a.TEXTURE0),this.webgl.unbindInputTexture(a.TEXTURE1)},r.prototype.bindInputTexture=function(t,e,n){var r=this.webgl.context,o=this.program;r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,t);var i=r.getUniformLocation(o,n);r.uniform1i(i,e-r.TEXTURE0)},r.prototype.bindUniforms=function(t,e){var n=this.webgl.context,o=n.getUniformLocation(this.program,r.LENGTH_UNIFORM_NAME),i=n.getUniformLocation(this.program,r.COEFFICIENT_UNIFORM_NAME);n.uniform1i(o,t),n.uniform1f(i,e)}},{"./webgl":11}],5:[function(t,e,n){function r(t,e){this.webgl=t,this.standalone=null==e||e;var n="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D X;\t\t// texture with data from padded A\nuniform int       N;\t\t// number of columns\nuniform int       pad;\t\t// additional columns to nearest multiple of four\nuniform float     a; \t\t// lower bound\nuniform float     b; \t\t// upper bound\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1604150559(float val) {\n\n\t// TODO: correctly handle denormal numbers\n\t// http://www.2ality.com/2012/04/number-encoding.html\n\tfloat a = abs(val);                           // encode absolute value + sign\n\tfloat exp = floor(log2(a));                 // number of powers of 2\n\tfloat mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n\tfloat mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n\tfloat mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n\tfloat mant3 = mod(mant,256.);               // third 8 bits\n\n\thighp float sign = 128.-128.*(a/val);\t\t\t// sign bit is 256 or 0\n\thighp float e = (sign+exp+127.)/510.;\t\t// exponent and sign\n\thighp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n\thighp float m2 = (mant2)/255.;\t\t\t\t// middle part\n\thighp float m3 = (mant3+.5)/255.;\t\t\t// scale to 0 - 255\n\n\treturn vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row = outTex.y;\n\tfloat col = outTex.x;\n\n\t// return 0.0 if in padded region of output texture\n\tif(col * float(N + pad) > float(N) ) {\n\t\tgl_FragColor = vec4(0.,0.,0.,0.);\n\t\treturn;\n\t}\n\n\t// direct usage of col requires output be padded exactly like input\n\tvec4 x = texture2D( X, vec2(col, row));\n\tvec4 val = clamp(x, a, b);\n\n\t// select and output channel (standalone version only)\n\tint channel = int(mod(col * float(N + pad), 4.0));\n\tfloat sum = select_index_1540259130(val, channel);\n\n\tif (sum == 0.) {\n\t\tgl_FragColor = vec4(0.,0.,0.,0.);\n\t\treturn;\n\t}\n\n\t// output vec4 with bytes for an IEEE754 32-bit floating point number\n\tgl_FragColor = encode_float_1604150559(sum);\n}\n",r="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D X;\t\t// texture with data from padded A\nuniform int       N;\t\t// number of columns\nuniform int       pad;\t\t// additional columns to nearest multiple of four\nuniform float     a; \t\t// lower bound\nuniform float     b; \t\t// upper bound\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1540259130(inout vec4 v, int pad){\n\tv.a = 0.0;\n\tif(pad == 2){\n\t\tv.b = 0.0;\n\t} else if(pad == 3){\n\t\tv.b = 0.0;\n\t\tv.g = 0.0;\n\t}\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\tfloat col = (col_t * float(N + pad) - 2.0); // index of first element in pixel (matrix space)\n\n\t// direct usage of col requires output be padded exactly like input\n\tvec4 x = texture2D( X, vec2(col_t, row_t));\n\tvec4 val_v = clamp(x, a, b);\n\n\t// is last element in pixel past row length?\n\tif(pad > 0 && (col + 4.0) > float(N) ) {\n\t\t// fix elements in padded region\n\t\tfix_pad_1540259130(val_v, pad);\n\t}\n\n\tgl_FragColor = val_v;\n}\n";
this.standalone?this.program=this.webgl.createProgram(n):this.program=this.webgl.createProgram(r)}t("./webgl");e.exports=r,r.TEXTURE_UNIFORM_NAME_0="X",r.LENGTH_UNIFORM_NAME="N",r.LOWER_UNIFORM_NAME="a",r.UPPER_UNIFORM_NAME="b",r.prototype.calculate=function(t,e,n,o,i,a){n=null!=n?n:Number.MIN_VALUE,o=null!=o?o:Number.MAX_VALUE;var s=this.webgl.context;this.webgl.selectProgram(this.program),this.bindInputTexture(i,s.TEXTURE0,r.TEXTURE_UNIFORM_NAME_0);var u=this.webgl.getPad(e);this.bindUniforms(e,u,n,o),this.standalone?this.webgl.bindOutputTexture(t,e+u,a):this.webgl.bindOutputTexture(t,(e+u)/4,a),s.drawElements(s.TRIANGLES,6,s.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(s.TEXTURE0)},r.prototype.bindInputTexture=function(t,e,n){var r=this.webgl.context,o=this.program;r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,t);var i=r.getUniformLocation(o,n);r.uniform1i(i,e-r.TEXTURE0)},r.prototype.bindUniforms=function(t,e,n,o){var i=this.webgl.context,a=i.getUniformLocation(this.program,r.LENGTH_UNIFORM_NAME),s=i.getUniformLocation(this.program,r.UPPER_UNIFORM_NAME),u=i.getUniformLocation(this.program,r.LOWER_UNIFORM_NAME),l=i.getUniformLocation(this.program,"pad");i.uniform1i(a,t),i.uniform1i(l,e),i.uniform1f(u,n),i.uniform1f(s,o)}},{"./webgl":11}],6:[function(t,e,n){function r(t,e){this.webgl=t,this.standalone=null==e||e;var n="// TODO: unroll loop for stride == factor and small values (2, 3)\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;       // texture with data from padded A\nuniform int       factor;  // width of image patch\nuniform float     stride;  // width between image patches\nuniform float     C;       // number of channels\nuniform float     M;\nuniform float     N;\nuniform float     N_out;\nuniform float     M_out;\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1540259130(float val) {\n\n\t// TODO: correctly handle denormal numbers\n\t// http://www.2ality.com/2012/04/number-encoding.html\n\tfloat a = abs(val);                           // encode absolute value + sign\n\tfloat exp = floor(log2(a));                 // number of powers of 2\n\tfloat mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n\tfloat mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n\tfloat mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n\tfloat mant3 = mod(mant,256.);               // third 8 bits\n\n\thighp float sign = 128.-128.*(a/val);\t\t\t// sign bit is 256 or 0\n\thighp float e = (sign+exp+127.)/510.;\t\t// exponent and sign\n\thighp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n\thighp float m2 = (mant2)/255.;\t\t\t\t// middle part\n\thighp float m3 = (mant3+.5)/255.;\t\t\t// scale to 0 - 255\n\n\treturn vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1604150559(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate and translate to output pixel space.\n\tfloat row = floor(outTex.y * M_out);   // row on output texture (matrix space)\n\tfloat col = floor(outTex.x * N_out); // column on output texture (matrix space)\n\tfloat vcol = floor(col / C);   // virtual column on output texture (matrix space)\n\tfloat vchannel = floor(mod(col, C)); // virtual channel on output texture\n\n\tconst float min = -1.0e+08;\n\tvec4 currentMax = vec4(min, min, min, min);\n\n\tfloat deltaY = 1.0/M;\n\tfloat deltaX = 1.0/N;\n\tfloat y = ((row * stride) + 0.5)*deltaY; // texture position of input row\n\tfloat x;\n\tfloat z = vchannel * deltaX;\n\tfor (int i = 0; i < 100; i += 1) {\n\t\tif (i >= factor) {\n\t\t\tbreak;\n\t\t}\n\t\tx = ((vcol * stride * C) + 0.5) * deltaX; // texture position of input column\n\n\t\tfor (int j = 0; j < 100; j += 1) {\n\t\t\tif (j >= factor) {\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tvec2 coords = vec2(x + z, y);\n\t\t\tvec4 x_v = texture2D(X, coords);\n\t\t\tcurrentMax = max(currentMax, x_v);\n\n\t\t\tx += (deltaX * C);\n\t\t}\n\t\ty += deltaY;\n\t}\n\tint chan = int(mod(outTex.x * N_out, 4.0 ));\n\tfloat val = select_index_1604150559(currentMax, int(chan));\n\tif (val == 0.) {\n\t\tgl_FragColor = vec4(0.,0.,0.,0.);\n\t\treturn;\n\t}\n\n\tgl_FragColor = encode_float_1540259130(val);\n}\n";p="// TODO: unroll loop for stride == factor and small values (2, 3)\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;       // texture with data from padded A\nuniform int       factor;  // width of image patch\nuniform float     stride;  // width between image patches\nuniform float     C;       // number of channels\nuniform float     M;\nuniform float     N;\nuniform float     N_out;\nuniform float     M_out;\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate and translate to output pixel space.\n\tfloat row = floor(outTex.y * M_out);   // row on output texture (pixel space)\n\tfloat col = floor(outTex.x * N_out); // column on output texture (matrix space)\n\tfloat vcol = floor(col / C);   // virtual column on output texture (matrix space)\n\tfloat vchannel = floor(mod(col, C)); // virtual channel on output texture\n\n\tconst float min = -1.0e+08;\n\tvec4 currentMax = vec4(min, min, min, min);\n\n\tfloat deltaY = 1.0/M;\n\tfloat deltaX = 1.0/N;\n\tfloat y = ((row * stride) + 0.5)*deltaY; // texture position of input row\n\tfloat x;\n\tfloat z = vchannel * deltaX;\n\tfor (int i = 0; i < 100; i += 1) {\n\t\tif (i >= factor) {\n\t\t\tbreak;\n\t\t}\n\t\tx = ((vcol * stride * C) + 0.5) * deltaX; // texture position of input column\n\n\t\tfor (int j = 0; j < 100; j += 1) {\n\t\t\tif (j >= factor) {\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tvec2 coords = vec2(x + z, y);\n\t\t\tvec4 x_v = texture2D(X, coords);\n\t\t\tcurrentMax = max(currentMax, x_v);\n\n\t\t\tx += (deltaX * C);\n\t\t}\n\t\ty += deltaY;\n\t}\n\n\tgl_FragColor = currentMax;\n}\n",this.standalone?this.program=this.webgl.createProgram(n):this.program=this.webgl.createProgram(p)}var o=t("./webgl");e.exports=r,r.TEXTURE_UNIFORM_NAME_0="X",r.INPUT_ROW_COUNT_UNIFORM_NAME="M",r.INPUT_COLUMN_COUNT_UNIFORM_NAME="N",r.OUTPUT_ROW_COUNT_UNIFORM_NAME="M_out",r.OUTPUT_COLUMN_COUNT_UNIFORM_NAME="N_out",r.FACTOR_UNIFORM_NAME="factor",r.STRIDE_UNIFORM_NAME="stride",r.CHANNEL_COUNT_UNIFORM_NAME="C",r.prototype.calculate=function(t,e,n,i,a,s,u){if(n%o.COMPONENTS_PER_TEXEL!=0)throw new Error("Channel count must be a multiple of "+o.COMPONENTS_PER_TEXEL);var l=this.webgl.context,c=(Math.floor((e-i)/a)+1)*n,f=Math.floor((t-i)/a)+1;this.webgl.selectProgram(this.program),this.bindInputTexture(s,l.TEXTURE0,r.TEXTURE_UNIFORM_NAME_0),this.bindUniforms(t,e*n,f,c,i,a,n),this.standalone?this.webgl.bindOutputTexture(f,c,u):this.webgl.bindOutputTexture(f,c/o.COMPONENTS_PER_TEXEL,u),l.drawElements(l.TRIANGLES,6,l.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(l.TEXTURE0)},r.prototype.bindInputTexture=function(t,e,n){var r=this.webgl.context,o=this.program;r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,t);var i=r.getUniformLocation(o,n);r.uniform1i(i,e-r.TEXTURE0)},r.prototype.bindUniforms=function(t,e,n,o,i,a,s){var u=this.webgl.context,l=u.getUniformLocation(this.program,r.INPUT_ROW_COUNT_UNIFORM_NAME),c=u.getUniformLocation(this.program,r.INPUT_COLUMN_COUNT_UNIFORM_NAME),f=u.getUniformLocation(this.program,r.OUTPUT_ROW_COUNT_UNIFORM_NAME),p=u.getUniformLocation(this.program,r.OUTPUT_COLUMN_COUNT_UNIFORM_NAME),h=u.getUniformLocation(this.program,r.FACTOR_UNIFORM_NAME),d=u.getUniformLocation(this.program,r.STRIDE_UNIFORM_NAME),v=u.getUniformLocation(this.program,r.CHANNEL_COUNT_UNIFORM_NAME);u.uniform1f(l,t),u.uniform1f(c,e),u.uniform1f(f,n),u.uniform1f(p,o),u.uniform1i(h,i),u.uniform1f(d,a),u.uniform1f(v,s)}},{"./webgl":11}],7:[function(t,e,n){function r(t,e){this.webgl=t,this.standalone=null==e||e;var n="// fragment shader that calculates the matrix product and renders each\n// element to the bytes representing a 32-bit IEEE754 floating point in\n// the output RGBA canvas.\n// readPixel is used to read the bytes.\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform sampler2D B_t;\t\t// texture with data from padded transpose of B\nuniform int       K;\t\t// number of elements in shared dimension\nuniform int       N;\t\t// number of columns in output\nuniform int       pad;\t\t//\nuniform float     alpha; \t// coefficient to multiplication\n\n// sum of products between elements in row i (from A) x col j (from B)\n\n// Calculate the dot product between the row (from A) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol_1540259130(float y, float x, sampler2D A, sampler2D B_t, int K) {\n\tfloat delta_t = 1./float(K);// space (on texture) between elements\n\tfloat sum = 0.;\t\t\t// sum for this row/column pair\n\tfloat z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n\tfor (int l=0 ; l<4096 ; ++l) {\n\t\tif(l >= K / 4) break;    // stop when we finish the row/column\n\t\t// l is in pixel space, so we divide by four\n\n\t\t// retrieve next four elements from each texture\n\t\tvec4 a_ik = texture2D(  A, vec2(z, y));\n\t\tvec4 b_kj = texture2D(B_t, vec2(z, x));\n\n\t// use `dot` to process four elements at a time\n\t\tsum +=  dot(a_ik, b_kj);\n\t\tz += (4.0 * delta_t);      // (z + 0.5)*delta\n\t}\n\treturn sum;\n}\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1604150559(float val) {\n\n\t// TODO: correctly handle denormal numbers\n\t// http://www.2ality.com/2012/04/number-encoding.html\n\tfloat a = abs(val);                           // encode absolute value + sign\n\tfloat exp = floor(log2(a));                 // number of powers of 2\n\tfloat mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n\tfloat mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n\tfloat mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n\tfloat mant3 = mod(mant,256.);               // third 8 bits\n\n\thighp float sign = 128.-128.*(a/val);\t\t\t// sign bit is 256 or 0\n\thighp float e = (sign+exp+127.)/510.;\t\t// exponent and sign\n\thighp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n\thighp float m2 = (mant2)/255.;\t\t\t\t// middle part\n\thighp float m3 = (mant3+.5)/255.;\t\t\t// scale to 0 - 255\n\n\treturn vec4(m3,m2,m1,e);\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\n\t// sum row x col for the passed pixel\n\tfloat sum = alpha * dot_rowcol_1540259130(row_t, col_t * float(N + pad)/float(N), A, B_t, K);\n\n\tif (sum == 0.) {\n\t\tgl_FragColor = vec4(0.,0.,0.,0.);\n\t\treturn;\n\t}\n\n\t// output vec4 with bytes for an IEEE754 32-bit floating point number\n\tgl_FragColor = encode_float_1604150559(sum);\n}\n",r="// fragment shader that calculates the matrix product (with additive 'C' term)\n// and renders each element to the bytes representing a 32-bit IEEE754 floating\n// point in the output RGBA canvas.\n// readPixel is used to read the bytes.\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform sampler2D B_t;\t\t// texture with data from padded transpose of B\nuniform sampler2D C;\t\t// texture with data from C\nuniform int       K;\t\t// number of elements in shared dimension\nuniform int       N;\t\t// number of columns in output\nuniform int       pad;\t\t//\nuniform float     alpha; \t// coefficient to multiplication\nuniform float     beta; \t// coefficient to additive term\n\n// sum of products between elements in row i (from A) x col j (from B)\n\n// Calculate the dot product between the row (from A) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol_1540259130(float y, float x, sampler2D A, sampler2D B_t, int K) {\n\tfloat delta_t = 1./float(K);// space (on texture) between elements\n\tfloat sum = 0.;\t\t\t// sum for this row/column pair\n\tfloat z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n\tfor (int l=0 ; l<4096 ; ++l) {\n\t\tif(l >= K / 4) break;    // stop when we finish the row/column\n\t\t// l is in pixel space, so we divide by four\n\n\t\t// retrieve next four elements from each texture\n\t\tvec4 a_ik = texture2D(  A, vec2(z, y));\n\t\tvec4 b_kj = texture2D(B_t, vec2(z, x));\n\n\t// use `dot` to process four elements at a time\n\t\tsum +=  dot(a_ik, b_kj);\n\t\tz += (4.0 * delta_t);      // (z + 0.5)*delta\n\t}\n\treturn sum;\n}\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1117569599(float val) {\n\n\t// TODO: correctly handle denormal numbers\n\t// http://www.2ality.com/2012/04/number-encoding.html\n\tfloat a = abs(val);                           // encode absolute value + sign\n\tfloat exp = floor(log2(a));                 // number of powers of 2\n\tfloat mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n\tfloat mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n\tfloat mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n\tfloat mant3 = mod(mant,256.);               // third 8 bits\n\n\thighp float sign = 128.-128.*(a/val);\t\t\t// sign bit is 256 or 0\n\thighp float e = (sign+exp+127.)/510.;\t\t// exponent and sign\n\thighp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n\thighp float m2 = (mant2)/255.;\t\t\t\t// middle part\n\thighp float m3 = (mant3+.5)/255.;\t\t\t// scale to 0 - 255\n\n\treturn vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1604150559(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\tvec4 c_vec = texture2D(C, vec2(col_t, 0.5));\n\n\t// should be -0.5, but that subtly breaks at zero\n\tfloat col = col_t * float(N + pad); // index of first element in pixel (matrix space)\n\tint channel = int(mod(col, 4.0 ));\n\tfloat c = select_index_1604150559(c_vec, channel);\n\n\t// sum row x col for the passed pixel\n\tfloat sum = alpha * dot_rowcol_1540259130(row_t, col_t * float(N + pad)/float(N), A, B_t, K);\n\tsum += beta * c;\n\n\tif (sum == 0.) {\n\t\tgl_FragColor = vec4(0.,0.,0.,0.);\n\t\treturn;\n\t}\n\n\t// output vec4 with bytes for an IEEE754 32-bit floating point number\n\tgl_FragColor = encode_float_1117569599(sum);\n}\n",o="// fragment shader that calculates the matrix product and writes each\n// element to a pixel component in a floating point texture.\n// the output RGBA canvas.\n// readPixel is used to read the bytes.\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform sampler2D B_t;\t\t// texture with data from padded transpose of B\nuniform int       K;\t\t// number of elements in shared dimension\nuniform int       N;\t\t// number of columns in output\nuniform int       pad;\t\t//\nuniform float     alpha; \t// coefficient to multiplication\n\n// sum of products between elements in row i (from A) x col j (from B)\n\n// Calculate the dot product between the row (from A) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol_1540259130(float y, float x, sampler2D A, sampler2D B_t, int K) {\n\tfloat delta_t = 1./float(K);// space (on texture) between elements\n\tfloat sum = 0.;\t\t\t// sum for this row/column pair\n\tfloat z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n\tfor (int l=0 ; l<4096 ; ++l) {\n\t\tif(l >= K / 4) break;    // stop when we finish the row/column\n\t\t// l is in pixel space, so we divide by four\n\n\t\t// retrieve next four elements from each texture\n\t\tvec4 a_ik = texture2D(  A, vec2(z, y));\n\t\tvec4 b_kj = texture2D(B_t, vec2(z, x));\n\n\t// use `dot` to process four elements at a time\n\t\tsum +=  dot(a_ik, b_kj);\n\t\tz += (4.0 * delta_t);      // (z + 0.5)*delta\n\t}\n\treturn sum;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\n\tvec4 sum_v = vec4(0.0, 0.0, 0.0, 0.0);\n\tfloat col = (col_t * float(N + pad) - 2.0); // index of first element in pixel (matrix space)\n\tsum_v.r = alpha * dot_rowcol_1540259130(row_t, (col + 0.5)/float(N), A, B_t, K);\n\t// is last element in pixel past row length?\n\tif(pad > 0 && (col + 4.0) > float(N) ) {\n\t\t// compute elements in padded region\n\t\tif(pad < 3){\n\t\t\tsum_v.g = alpha * dot_rowcol_1540259130(row_t, (col + 1.5)/float(N), A, B_t, K);\n\t\t}\n\t\tif(pad < 2){\n\t\t\tsum_v.b = alpha * dot_rowcol_1540259130(row_t, (col + 2.5)/float(N), A, B_t, K);\n\t\t}\n\t} else {\n\t\tsum_v.g = alpha * dot_rowcol_1540259130(row_t, (col + 1.5)/float(N), A, B_t, K);\n\t\tsum_v.b = alpha * dot_rowcol_1540259130(row_t, (col + 2.5)/float(N), A, B_t, K);\n\t\tsum_v.a = alpha * dot_rowcol_1540259130(row_t, (col + 3.5)/float(N), A, B_t, K);\n\t}\n\n\tgl_FragColor = sum_v;\n}\n",i="// fragment shader that calculates the matrix product and writes each\n// element to a pixel component in a floating point texture.\n// the output RGBA canvas.\n// readPixel is used to read the bytes.\n\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform sampler2D B_t;\t\t// texture with data from padded transpose of B\nuniform sampler2D C;\t\t// texture with data from C\nuniform int       K;\t\t// number of elements in shared dimension\nuniform int       N;\t\t// number of columns in output\nuniform int       pad;\t\t//\nuniform float     alpha; \t// coefficient to multiplication\nuniform float     beta; \t// coefficient to addition\n\n// sum of products between elements in row i (from A) x col j (from B)\n\n// Calculate the dot product between the row (from A) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol_1540259130(float y, float x, sampler2D A, sampler2D B_t, int K) {\n\tfloat delta_t = 1./float(K);// space (on texture) between elements\n\tfloat sum = 0.;\t\t\t// sum for this row/column pair\n\tfloat z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n\tfor (int l=0 ; l<4096 ; ++l) {\n\t\tif(l >= K / 4) break;    // stop when we finish the row/column\n\t\t// l is in pixel space, so we divide by four\n\n\t\t// retrieve next four elements from each texture\n\t\tvec4 a_ik = texture2D(  A, vec2(z, y));\n\t\tvec4 b_kj = texture2D(B_t, vec2(z, x));\n\n\t// use `dot` to process four elements at a time\n\t\tsum +=  dot(a_ik, b_kj);\n\t\tz += (4.0 * delta_t);      // (z + 0.5)*delta\n\t}\n\treturn sum;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\tvec4 c_v = texture2D(C, vec2(col_t, 0.5));\n\n\tvec4 sum_v = vec4(0.0, 0.0, 0.0, 0.0);\n\tfloat col = (col_t * float(N + pad) - 2.0); // index of first element in pixel (matrix space)\n\tsum_v.r = alpha * dot_rowcol_1540259130(row_t, (col + 0.5)/float(N), A, B_t, K);\n\t// in the padding region?\n\tif(pad > 0 && (col + 4.0) > float(N) ) {\n\t\t// pad\n\t\tif(pad < 3){\n\t\t\tsum_v.g = alpha * dot_rowcol_1540259130(row_t, (col + 1.5)/float(N), A, B_t, K);\n\t\t}\n\t\tif(pad < 2){\n\t\t\tsum_v.b = alpha * dot_rowcol_1540259130(row_t, (col + 2.5)/float(N), A, B_t, K);\n\t\t}\n\t} else {\n\t\tsum_v.g = alpha * dot_rowcol_1540259130(row_t, (col + 1.5)/float(N), A, B_t, K);\n\t\tsum_v.b = alpha * dot_rowcol_1540259130(row_t, (col + 2.5)/float(N), A, B_t, K);\n\t\tsum_v.a = alpha * dot_rowcol_1540259130(row_t, (col + 3.5)/float(N), A, B_t, K);\n\t}\n\n\tgl_FragColor = sum_v + beta*c_v;\n}\n";this.standalone?(this.program_=this.webgl.createProgram(n),this.program_c=this.webgl.createProgram(r)):(this.program_=this.webgl.createProgram(o),this.program_c=this.webgl.createProgram(i))}t("./webgl");e.exports=r,r.TEXTURE_UNIFORM_NAME_0="A",r.TEXTURE_UNIFORM_NAME_1="B_t",r.TEXTURE_UNIFORM_NAME_2="C",r.SHARED_LENGTH_UNIFORM_NAME="K",r.COLUMN_COUNT_UNIFORM_NAME="N",r.PAD_UNIFORM_NAME="pad",r.ALPHA_UNIFORM_NAME="alpha",r.BETA_UNIFORM_NAME="beta",r.prototype.calculate=function(t,e,n,o,i,a,s,u,l){var c=this.webgl.context;null!=u?this.program=this.program_c:(s=null,this.program=this.program_),this.webgl.selectProgram(this.program),this.bindInputTexture(i,c.TEXTURE0,r.TEXTURE_UNIFORM_NAME_0),this.bindInputTexture(a,c.TEXTURE1,r.TEXTURE_UNIFORM_NAME_1),null!=u&&this.bindInputTexture(u,c.TEXTURE2,r.TEXTURE_UNIFORM_NAME_2);var f=this.webgl.getPad(n),p=this.webgl.getPad(e);this.bindUniforms(e,n+f,p,o,s),this.standalone?this.webgl.bindOutputTexture(t,e+p,l):this.webgl.bindOutputTexture(t,(e+p)/4,l),c.drawElements(c.TRIANGLES,6,c.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(c.TEXTURE0),this.webgl.unbindInputTexture(c.TEXTURE1),this.webgl.unbindInputTexture(c.TEXTURE2)},r.prototype.bindInputTexture=function(t,e,n){var r=this.webgl.context,o=this.program;r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,t);var i=r.getUniformLocation(o,n);r.uniform1i(i,e-r.TEXTURE0)},r.prototype.bindUniforms=function(t,e,n,o,i){var a=this.webgl.context,s=a.getUniformLocation(this.program,r.SHARED_LENGTH_UNIFORM_NAME),u=a.getUniformLocation(this.program,r.ALPHA_UNIFORM_NAME),l=a.getUniformLocation(this.program,r.BETA_UNIFORM_NAME),c=a.getUniformLocation(this.program,r.COLUMN_COUNT_UNIFORM_NAME),f=f=a.getUniformLocation(this.program,r.PAD_UNIFORM_NAME);a.uniform1f(l,i),a.uniform1i(c,t),a.uniform1i(f,n),a.uniform1i(s,e),a.uniform1f(u,o)}},{"./webgl":11}],8:[function(t,e,n){function r(t,e){this.webgl=t,this.standalone=null==e||e;var n="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;       // texture with data from padded A\nuniform float     factor;  // width of image patch\nuniform float     stride;  // width between image patches\nuniform float     margin;\nuniform float     N_p;     // patches across\nuniform float     M;\nuniform float     N;\nuniform float     pad;\nuniform float     M_in;\nuniform float     N_in;\nuniform float     C;       // number of channels in input\nuniform float     pad_in;\n\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\n// translate a linear index into x, y coordinates for a matrix\nvec2 linear_index_coords_1604150559(float linear_index, float row_length){\n\tvec2 coords;\n\n\tcoords.x = floor(mod(linear_index + 0.5, row_length)); // column\n\tcoords.y = floor((linear_index + 0.5) / row_length); // row\n\n\treturn coords;\n}\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1117569599(inout vec4 v, int pad){\n\tv.a = 0.0;\n\tif(pad == 2){\n\t\tv.b = 0.0;\n\t} else if(pad == 3){\n\t\tv.b = 0.0;\n\t\tv.g = 0.0;\n\t}\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\n\t// row corresponds to patch\n\tfloat row = floor(row_t * M) + 0.5;\n\t// column corresponds to placement in patch\n\tfloat col_0 = floor(col_t * (N + pad) - 1.5); // index of first element in output pixel (matrix space)\n\n\t// N_p = patches across\n\tfloat col_patch = floor(mod(row, N_p)); // column index in grid of patches\n\tfloat row_patch = floor(row / N_p); // row index in grid of patches\n\tfloat col_in_0 = (col_patch * stride - margin) * C; // input column index of left element in patch\n\tfloat row_in_0 = row_patch * stride - margin; // input row index of top element in patch\n\n\tvec4 pixel_in;\n\tvec4 result = vec4(0.0, 0.0, 0.0, 0.0);\n\tvec2 coords = linear_index_coords_1604150559(col_0, factor * C); // coords inside patch\n\tvec2 ncoords;\n\tint channel_in = int(mod(col_in_0 + coords.x, 4.0));\n\tvec2 scale_in = vec2(1.0/(N_in + pad_in), 1.0/M_in); // scale from matrix to input texture coords\n\tvec2 offset_in = vec2(col_in_0 + 2.0 - float(channel_in), row_in_0 + 0.5); // offset into patch (and pixel)\n\n\tconst vec2 pixel_scale = vec2(1.0/4.0, 1.0); // scale from matrix to pixel coords\n\n\tpixel_in = texture2D(X, (coords + offset_in) * scale_in);\n\n\t// go through channels for current output pixel\n\tfor(int channel = 0; channel < 4; channel++){\n\n\t\t// are we on a new input pixel?\n\t\tncoords = linear_index_coords_1604150559(col_0 + float(channel), factor * C);\n\n\t\t// are we in the margin or outside the input texture?\n\t\tif((col_in_0 + ncoords.x + 0.5 < 0.0) || (row_in_0 + ncoords.y + 0.5 < 0.0) ||\n\t\t   (col_in_0 + ncoords.x + 0.5) > (N_in) || row_in_0 + ncoords.y + 0.5 > M_in){\n\t\t\t// yes, create a virtual pixel\n\t\t\tpixel_in = vec4(0.0, 0.0, 0.0, 0.0);\n\t\t} else if(floor(ncoords * pixel_scale) != floor(coords * pixel_scale)){\n\t\t\t// no, get the get the next real pixel\n\t\t\tcoords = ncoords;\n\t\t\toffset_in.x += float(channel_in);\n\t\t\tchannel_in = 0;\n\t\t\tpixel_in = texture2D(X, (coords + offset_in) * scale_in);\n\t\t}\n\n\t\tif(channel == 0){\n\t\t\tresult.r = select_index_1540259130(pixel_in, channel_in);\n\t\t} else if(channel == 1){\n\t\t\tresult.g = select_index_1540259130(pixel_in, channel_in);\n\t\t} else if(channel == 2){\n\t\t\tresult.b = select_index_1540259130(pixel_in, channel_in);\n\t\t} else {\n\t\t\tresult.a = select_index_1540259130(pixel_in, channel_in);\n\t\t}\n\n\t\tchannel_in++;\n\t\toffset_in.x -= 1.0;\n\t}\n\n\t// fix padded region\n\tif(pad > 0.0 && col_0 + 4.0 > N ) {\n\t\tfix_pad_1117569599(result, int(pad));\n\t}\n\n\t//gl_FragColor = vec4(row_in_0, col_in_0, channel_in, N_p);\n\tgl_FragColor = result;\n}\n";this.standalone?this.program=this.webgl.createProgram(s):this.program=this.webgl.createProgram(n)}t("./webgl");e.exports=r,r.TEXTURE_UNIFORM_NAME_0="X",r.STRIDE_UNIFORM_NAME="stride",r.KERNEL_WIDTH_UNIFORM_NAME="factor",r.prototype.calculate=function(t,e,n,o,i,a,s,u,l,c,f){var p=this.webgl.context,h=this.webgl.getPad(e*n),d=this.webgl.getPad(i);this.webgl.selectProgram(this.program),this.bindInputTexture(c,p.TEXTURE0,r.TEXTURE_UNIFORM_NAME_0),this.bindUniforms(o,i,d,t,e*n,n,h,a,s,u,l),this.standalone?this.webgl.bindOutputTexture(o,i+d,f):this.webgl.bindOutputTexture(o,(i+d)/4,f),p.drawElements(p.TRIANGLES,6,p.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(p.TEXTURE0)},r.prototype.bindInputTexture=function(t,e,n){var r=this.webgl.context,o=this.program;r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,t);var i=r.getUniformLocation(o,n);r.uniform1i(i,e-r.TEXTURE0)},r.prototype.bindUniforms=function(t,e,n,o,i,a,s,u,l,c,f){var p=this.webgl.context,h=p.getUniformLocation(this.program,"M"),d=p.getUniformLocation(this.program,"N"),v=p.getUniformLocation(this.program,"C"),m=p.getUniformLocation(this.program,"M_in"),_=p.getUniformLocation(this.program,"N_in"),g=p.getUniformLocation(this.program,r.STRIDE_UNIFORM_NAME),y=p.getUniformLocation(this.program,r.KERNEL_WIDTH_UNIFORM_NAME),b=p.getUniformLocation(this.program,"pad"),w=p.getUniformLocation(this.program,"pad_in"),x=p.getUniformLocation(this.program,"N_p");margin_gl=p.getUniformLocation(this.program,"margin"),p.uniform1f(h,t),p.uniform1f(d,e),p.uniform1f(b,n),p.uniform1f(m,o),p.uniform1f(_,i),p.uniform1f(v,a),p.uniform1f(w,s),p.uniform1f(x,u),p.uniform1f(y,l),p.uniform1f(g,c),p.uniform1f(margin_gl,f)}},{"./webgl":11}],9:[function(t,e,n){function r(t,e){this.webgl=t,this.standalone=null==e||e;var n="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D X;\t\t// texture with data from padded X\nuniform int       N;\t\t// number of columns\nuniform int       pad;\t\t// additional columns to nearest multiple of four\nuniform float     b; \t\t// additive term\nuniform float     a; \t\t// multiplicative term\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1540259130(float val) {\n\n\t// TODO: correctly handle denormal numbers\n\t// http://www.2ality.com/2012/04/number-encoding.html\n\tfloat a = abs(val);                           // encode absolute value + sign\n\tfloat exp = floor(log2(a));                 // number of powers of 2\n\tfloat mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n\tfloat mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n\tfloat mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n\tfloat mant3 = mod(mant,256.);               // third 8 bits\n\n\thighp float sign = 128.-128.*(a/val);\t\t\t// sign bit is 256 or 0\n\thighp float e = (sign+exp+127.)/510.;\t\t// exponent and sign\n\thighp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n\thighp float m2 = (mant2)/255.;\t\t\t\t// middle part\n\thighp float m3 = (mant3+.5)/255.;\t\t\t// scale to 0 - 255\n\n\treturn vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1604150559(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n \tfloat row = outTex.y;\n\tfloat col = outTex.x;\n\n\t// direct usage of col requires output be padded exactly like input\n\tvec4 x = texture2D( X, vec2(col, row));\n\tvec4 sum_v = (a * x) + b;\n\tint channel = int(mod(col * float(N + pad), 4.0 ));\n\tfloat sum = select_index_1604150559(sum_v, channel);\n\n\tif (sum == 0.) {\n\t\tgl_FragColor = vec4(0.,0.,0.,0.);\n\t\treturn;\n\t}\n\n \t// output vec4 with bytes for an IEEE754 32-bit floating point number\n\tgl_FragColor = encode_float_1540259130(sum);\n}\n",r="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D X;\t\t// texture with data from padded X\nuniform int       N;\t\t// number of columns\nuniform int       pad;\t\t// additional columns to nearest multiple of four\nuniform float     b; \t\t// additive term\nuniform float     a; \t\t// multiplicative term\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1540259130(inout vec4 v, int pad){\n\tv.a = 0.0;\n\tif(pad == 2){\n\t\tv.b = 0.0;\n\t} else if(pad == 3){\n\t\tv.b = 0.0;\n\t\tv.g = 0.0;\n\t}\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\tfloat col = (col_t * float(N + pad) - 2.0); // index of first element in pixel (matrix space)\n\n\t// direct usage of col requires output be padded exactly like input\n\tvec4 x = texture2D( X, vec2(col_t, row_t));\n\tvec4 sum_v = (a * x) + b;\n\n\t// fix padded region\n\tif(pad > 0 && col + 4.0 > float(N) ) {\n\t\tfix_pad_1540259130(sum_v, pad);\n\t}\n\n\tgl_FragColor = sum_v;\n}\n";
this.standalone?this.program=this.webgl.createProgram(n):this.program=this.webgl.createProgram(r)}t("./webgl");e.exports=r,r.TEXTURE_UNIFORM_NAME_0="X",r.LENGTH_UNIFORM_NAME="N",r.ADD_UNIFORM_NAME="b",r.MUL_UNIFORM_NAME="a",r.prototype.calculate=function(t,e,n,o,i,a){var s=this.webgl.context,u=this.webgl.getPad(e);this.webgl.selectProgram(this.program),this.bindInputTexture(i,s.TEXTURE0,r.TEXTURE_UNIFORM_NAME_0),this.bindUniforms(e,u,n,o),this.standalone?this.webgl.bindOutputTexture(t,e+u,a):this.webgl.bindOutputTexture(t,(e+u)/4,a),s.drawElements(s.TRIANGLES,6,s.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(s.TEXTURE0)},r.prototype.bindInputTexture=function(t,e,n){var r=this.webgl.context,o=this.program;r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,t);var i=r.getUniformLocation(o,n);r.uniform1i(i,e-r.TEXTURE0)},r.prototype.bindUniforms=function(t,e,n,o){var i=this.webgl.context,a=i.getUniformLocation(this.program,r.LENGTH_UNIFORM_NAME),s=i.getUniformLocation(this.program,r.ADD_UNIFORM_NAME),u=i.getUniformLocation(this.program,r.MUL_UNIFORM_NAME),l=i.getUniformLocation(this.program,"pad");i.uniform1i(a,t),i.uniform1i(l,e),i.uniform1f(u,n),i.uniform1f(s,o)}},{"./webgl":11}],10:[function(t,e,n){function r(t,e){if(2!=t.length)throw new Error("Only Tensor of order two (matrix) is supported right now.");var n=t[0],r=t[1];this.texture=i.createDataTexture(n,r,e),this.shape=[n,r],this[Symbol.toStringTag]="Tensor"}var o=t("./globals"),i=o.gl;e.exports=r,r.prototype.delete=function(){i.context.deleteTexture(this.texture),this.texture=null,this.shape=null},r.prototype.transfer=function(t){var e,n,r=this.shape[0],o=this.shape[1];return e=i.createOutputTexture(r,o),i.encode(r,o,this.texture,e),n=new Float32Array(i.readData(r,o)),i.context.deleteTexture(e),t||this.delete(),n},r.prototype.reshape=function(t,e){var n=this.shape[0],o=this.shape[1],a=t[0],s=t[1],u=new r(t,null);return i.reshape(n,o,a,s,this.texture,u.texture),e||this.delete(),u},r.prototype.transpose=function(t){var e=this.shape[0],n=this.shape[1],o=new r([n,e],null);return i.transpose(e,n,this.texture,o.texture),t||this.delete(),o},r.prototype.split=function(t,e){var n=this.shape[0],o=this.shape[1];if(o%2!==0)throw new Error("row count must be multiple of two.");var a=new r([n,o/2],null),s=new r([n,o/2],null);return i.submatrix(o,n,o/2,t,0,this.texture,a.texture),i.submatrix(o,n,o/2,t,1,this.texture,s.texture),e||this.delete(),[a,s]},r.combine=function(t,e,n,o){var a=t.shape[0],s=t.shape[1];if(t.shape[1]!==e.shape[1]||t.shape[0]!==e.shape[0])throw new Error("row and column counts must be equal.");if(n%4!==0)throw new Error("stride must be a multiple of four");var u=new r([a,2*s],null);return i.combine(a,s,n,t.texture,e.texture,u.texture),o||(t.delete(),e.delete()),u}},{"./globals":2}],11:[function(t,e,n){function r(t){var e,n;if(t=t||{},"undefined"==typeof t.canvas?this.canvas=document.createElement("canvas"):this.canvas=t.canvas,e={premultipliedAlpha:!1,preserveDrawingBuffer:!1},this.context=this.canvas.getContext("experimental-webgl",e),null==this.context)throw new Error("No support for Webgl.");try{n=this.context.getExtension("OES_texture_float")}catch(t){}null==n?(console.log("No support for OES_texture_float extension!"),this.hasFloat=!1):this.hasFloat=!0;var r=this.context.getShaderPrecisionFormat(this.context.FRAGMENT_SHADER,this.context.HIGH_FLOAT);this.hasHighPrecision=0!=r.precision,this.hasHighPrecision&&(this.highp=r);var o="// vertex shader for a single quad\n// work is performed in the operation specific texture shader\n\nprecision highp float;\n#define GLSLIFY 1\n\nattribute vec3 pos;\nattribute vec2 tex;\nvarying vec2   outTex;\nvoid main(void)\n{\n\t// just pass the position and texture coords\n\tgl_Position = vec4(pos, 1.0);\n\toutTex = tex;\n}\n";this.vertexShader=this.context.createShader(this.context.VERTEX_SHADER),this.context.shaderSource(this.vertexShader,o),this.context.compileShader(this.vertexShader);var i="\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform int       N;\t\t// number of columns in output\nuniform int       pad;\t\t//\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1540259130(float val) {\n\n\t// TODO: correctly handle denormal numbers\n\t// http://www.2ality.com/2012/04/number-encoding.html\n\tfloat a = abs(val);                           // encode absolute value + sign\n\tfloat exp = floor(log2(a));                 // number of powers of 2\n\tfloat mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n\tfloat mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n\tfloat mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n\tfloat mant3 = mod(mant,256.);               // third 8 bits\n\n\thighp float sign = 128.-128.*(a/val);\t\t\t// sign bit is 256 or 0\n\thighp float e = (sign+exp+127.)/510.;\t\t// exponent and sign\n\thighp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n\thighp float m2 = (mant2)/255.;\t\t\t\t// middle part\n\thighp float m3 = (mant3+.5)/255.;\t\t\t// scale to 0 - 255\n\n\treturn vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1604150559(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\n\tvec4 val_v = texture2D(A, vec2(col_t * float(N)/float(N + pad), row_t));\n\tint channel = int(mod(col_t * float(N), 4.0 ));\n\tfloat val = select_index_1604150559(val_v, channel);\n\n\tif (val == 0.) {\n\t\tgl_FragColor = vec4(0.,0.,0.,0.);\n\t\treturn;\n\t}\n\n \t// output vec4 with bytes for an IEEE754 32-bit floating point number\n\tgl_FragColor = encode_float_1540259130(val);\n}\n",a="\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform int       M;\t\t// number of rows in output\nuniform int       N;\t\t// number of columns in output\nuniform int       mpad;\t\t//\nuniform int       npad;\t\t//\n\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\tfloat col = (col_t * float(N + npad) - 2.0); // index of first element in pixel (matrix space)\n\n\t// get rows in the input, each containing one element in the output\n\tvec4 row_1 = texture2D(A, vec2((row_t * float(M))/float(M + mpad), (col + 0.5)/float(N)));\n\tvec4 row_2 = texture2D(A, vec2((row_t * float(M))/float(M + mpad), (col + 1.5)/float(N)));\n\tvec4 row_3 = texture2D(A, vec2((row_t * float(M))/float(M + mpad), (col + 2.5)/float(N)));\n\tvec4 row_4 = texture2D(A, vec2((row_t * float(M))/float(M + mpad), (col + 3.5)/float(N)));\n\n\t// package into output vector\n\tint channel = int(mod(row_t * float(M), 4.0 ));\n\n\tvec4 col_v = vec4(0.0, 0.0, 0.0, 0.0); // vec4 representing four elements in a column in the input\n\n\t// extract relevent element from each input row\n\tcol_v.r = select_index_1540259130(row_1, channel);\n\tif(npad > 0 && (col + 4.0) > float(N) ) {\n\t\t// compute elements in padded region\n\t\tif(npad < 3){\n\t\t\tcol_v.g = select_index_1540259130(row_2, channel);\n\t\t}\n\t\tif(npad < 2){\n\t\t\tcol_v.b = select_index_1540259130(row_3, channel);\n\t\t}\n\t} else {\n\t\tcol_v.g = select_index_1540259130(row_2, channel);\n\t\tcol_v.b = select_index_1540259130(row_3, channel);\n\t\tcol_v.a = select_index_1540259130(row_4, channel);\n\t}\n\n\tgl_FragColor = col_v;\n}\n",s="\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform float     M;\t\t// number of rows in output\nuniform float     N;\t\t// number of columns in output\nuniform float     pad;\t\t// column padding in output\nuniform float     M_in;\t\t// number of rows in input\nuniform float     N_in;\t\t// number of columns in input\nuniform float     pad_in;\t// column padding in input\n\n/* number of input pixels\n   origin index (channel) for each\n   termination index (channel) for each\n   destination origin index (channel) for each\n */\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n\tfloat val;\n\tif (index == 0) {\n\t\tval = v.r;\n\t} else if(index == 1) {\n\t\tval = v.g;\n\t} else if(index == 2) {\n\t\tval = v.b;\n\t} else if(index == 3){\n\t\tval = v.a;\n\t} else {\n\t\t// should never be here\n\t\tval = 0.0;\n\t}\n\n\treturn val;\n}\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1604150559(inout vec4 v, int pad){\n\tv.a = 0.0;\n\tif(pad == 2){\n\t\tv.b = 0.0;\n\t} else if(pad == 3){\n\t\tv.b = 0.0;\n\t\tv.g = 0.0;\n\t}\n}\n\n// translate a linear index into x, y coordinates for a matrix\nvec2 linear_index_coords_1117569599(float linear_index, float row_length){\n\tvec2 coords;\n\n\tcoords.x = floor(mod(linear_index + 0.5, row_length)); // column\n\tcoords.y = floor((linear_index + 0.5) / row_length); // row\n\n\treturn coords;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\n\tfloat row = floor(row_t * M);\n\tfloat col_0 = (col_t * (N + pad) - 2.0); // index of first element in pixel (matrix space)\n\t//float col_0 = floor(col_t * (N + pad)/4.0)*4.0; // index of first element in pixel (matrix space)\n\tfloat lin_index_0 = row * N + col_0; // linearized index of first element in pixel in output\n\n\tvec4 pixel_in = vec4(0.0, 0.0, 0.0, 0.0);\n\tvec4 result = vec4(0.0, 0.0, 0.0, 0.0);\n\tvec2 coords = linear_index_coords_1117569599(lin_index_0, N_in);\n\tvec2 ncoords;\n\tint channel_in = int(mod(coords.x, 4.0));\n\n\tvec2 scale_in = vec2(1.0/(N_in + pad_in), 1.0/M_in); // scale from matrix to input texture coords\n\tvec2 offset_in = vec2(0.5, 0.5); // move away from edge of pixel\n\tconst vec2 pixel_scale = vec2(1.0/4.0, 1.0); // scale from matrix to pixel coords\n\n\tpixel_in = texture2D(A, (coords + offset_in) * scale_in);\n\n\t// go through channels for current output pixel\n\tfor(int channel = 0; channel < 4; channel++){\n\n\t\t// are we on a new input pixel?\n\t\tncoords = linear_index_coords_1117569599(lin_index_0 + float(channel), N_in);\n\t\tif(floor(ncoords * pixel_scale) != floor(coords * pixel_scale)){\n\t\t\tcoords = ncoords;\n\t\t\tpixel_in = texture2D(A, (coords + offset_in) * scale_in);\n\t\t\tchannel_in = 0;\n\t\t}\n\n\t\tif(channel == 0){\n\t\t\tresult.r = select_index_1540259130(pixel_in, channel_in);\n\t\t} else if(channel == 1){\n\t\t\tresult.g = select_index_1540259130(pixel_in, channel_in);\n\t\t} else if(channel == 2){\n\t\t\tresult.b = select_index_1540259130(pixel_in, channel_in);\n\t\t} else {\n\t\t\tresult.a = select_index_1540259130(pixel_in, channel_in);\n\t\t}\n\n\t\tchannel_in++;\n\t}\n\n\t// are we in the padded (output) region?\n\tif(pad > 0.0 && col_0 + 3.5 > N ) {\n\t\tfix_pad_1604150559(result, int(pad));\n\t}\n\n\tgl_FragColor = result;\n}\n",u="\nprecision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform float     M;\t\t// number of rows in output\nuniform float     N;\t\t// number of columns in output\nuniform float     M_in;\t\t// number of rows in input\nuniform float     N_in;\t\t// number of columns in input\n\n// translate a linear index into x, y coordinates for a matrix\nvec2 linear_index_coords_1540259130(float linear_index, float row_length){\n\tvec2 coords;\n\n\tcoords.x = floor(mod(linear_index + 0.5, row_length)); // column\n\tcoords.y = floor((linear_index + 0.5) / row_length); // row\n\n\treturn coords;\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\n\tfloat row = floor(row_t * M);\n\tfloat col_0 = floor(col_t * N - 1.5); // index of first element in pixel (matrix space)\n\tfloat lin_index_0 = row * N + col_0; // linearized index of first element in pixel in output\n\n\tvec4 result;\n\tvec2 coords = linear_index_coords_1540259130(lin_index_0, N_in);\n\n\tvec2 scale_in = vec2(1.0/N_in, 1.0/M_in); // scale from matrix to input texture coords\n\tvec2 offset_in = vec2(0.5, 0.5); // move away from edge of pixel\n\n\tresult = texture2D(A, (coords + offset_in) * scale_in);\n\n\tgl_FragColor = result;\n}\n",l="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D X;\t\t// texture with data from padded X\nuniform float     N;\t\t// number of columns\nuniform float     pad;\t\t// additional columns to nearest multiple of four\nuniform float     N_in;\t\t// number of columns (input)\nuniform float     pad_in;\t// additional columns to nearest multiple of four (input)\nuniform float     stride;\nuniform float     offset;   // zero or one\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1540259130(inout vec4 v, int pad){\n\tv.a = 0.0;\n\tif(pad == 2){\n\t\tv.b = 0.0;\n\t} else if(pad == 3){\n\t\tv.b = 0.0;\n\t\tv.g = 0.0;\n\t}\n}\n\n/* join parts of two pixels into one, selecting four continguous elements\n  starting at channel.\n*/\nvoid join_pixels_1604150559(inout vec4 x, vec4 x0, vec4 x1, float channel){\n\tif(channel == 1.0){\n\t\tx.rgb = x0.gba;\n\t\tx.a = x1.r;\n\t} else if(channel == 2.0){\n\t\tx.rg = x0.ba;\n\t\tx.ba = x1.rg;\n\t} else if(channel == 3.0){\n\t\tx.r = x0.a;\n\t\tx.gba = x1.rgb;\n\t}\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\tfloat col = floor(col_t * (N + pad) - 1.5); // index of first element in pixel (output matrix space)\n\n\tfloat stripe = floor(col / stride);\n\tfloat sub_col = floor(mod(col, stride));\n\n\tfloat col_in = (offset + (2.0 * stripe)) * stride + sub_col;\n\n\tvec4 x;\n\tfloat channel = mod(col_in, 4.0); // channel in the input of first element in output\n\n\t// are we at the beggining of an input pixel?\n\tif(channel == 0.0){\n\t\t// yes, select the whole thing\n\t\tx = texture2D( X, vec2((col_in + 2.0 - channel) / (N_in + pad_in) , row_t));\n\t} else {\n\t\t// no, select parts from two pixels\n\t\tvec4 x0, x1;\n\t\tx0 = texture2D( X, vec2((col_in + 2.0 - channel) / (N_in + pad_in) , row_t));\n\t\tx1 = texture2D( X, vec2((col_in + 6.0 - channel) / (N_in + pad_in) , row_t));\n\n\t\tjoin_pixels_1604150559(x, x0, x1, channel);\n\n\t}\n\n\t// fix padded region\n\tif(pad > 0.0 && col + 4.0 > N ) {\n\t\tfix_pad_1540259130(x, int(pad));\n\t}\n\n\tgl_FragColor = x;\n}\n",c="precision highp float;\n#define GLSLIFY 1\n\nvarying vec2      outTex;\t// texture coords of row/column to calculate\nuniform sampler2D A;\t\t// texture with data from padded A\nuniform sampler2D B;\t\t// texture with data from padded B\nuniform float     N_in;\t\t// number of columns\nuniform float     pad_in;\t// additional columns to nearest multiple of four\nuniform float     stride;\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1540259130(inout vec4 v, int pad){\n\tv.a = 0.0;\n\tif(pad == 2){\n\t\tv.b = 0.0;\n\t} else if(pad == 3){\n\t\tv.b = 0.0;\n\t\tv.g = 0.0;\n\t}\n}\n\nvoid main(void) {\n\n\t// get the implied row and column from .y and .x of passed (output)\n\t// texture coordinate. These map directly to input texture space when\n\t// the relevant dimensions are the same.\n\tfloat row_t = outTex.y;\n\tfloat col_t = outTex.x;\n\tfloat N = N_in * 2.0;\n\tfloat pad = mod(N, 4.0);\n\tfloat col = floor(col_t * (N + pad) - 1.5); // index of first element in pixel (output matrix space)\n\n\tfloat stripe = floor(col / stride);\n\tfloat sub_col = floor(mod(col, stride));\n\n\tfloat tex_select = mod(stripe, 2.0);\n\tfloat col_in = floor(stripe / 2.0) * stride + sub_col;\n\n\tvec4 x;\n\tfloat channel = mod(col_in, 4.0); // channel in the input of first element in output\n\n\t// which input texture are we getting this pixel from?\n\tif(tex_select == 0.0){\n\t\tx = texture2D( A, vec2((col_in + 2.0) / (N_in + pad_in) , row_t));\n\t} else {\n\t\tx = texture2D( B, vec2((col_in + 2.0) / (N_in + pad_in) , row_t));\n\t}\n\n\t// fix padded region\n\tif(pad > 0.0 && col + 4.0 > N ) {\n\t\tfix_pad_1540259130(x, int(pad));\n\t}\n\n\tgl_FragColor = x;\n}\n";this.encode_program=this.createProgram(i),this.transpose_program=this.createProgram(a),this.reshape_program=this.createProgram(s),this.reshape_simple_program=this.createProgram(u),this.submatrix_program=this.createProgram(l),this.combine_program=this.createProgram(c)}e.exports=r,r.COMPONENTS_PER_TEXEL=4,r.POSITION_UNIFORM_NAME="pos",r.TEXTURE_UNIFORM_NAME="tex",r.prototype.encode=function(t,e,n,r){this.program=this.encode_program,this.selectProgram(this.program);var o=this.getPad(e),i=this.context.getUniformLocation(this.program,"N"),a=this.context.getUniformLocation(this.program,"pad");this.context.uniform1i(i,e),this.context.uniform1i(a,o),this.bindInputTexture(n,this.context.TEXTURE0,"A"),this.bindOutputTexture(t,e,r),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},r.prototype.transpose=function(t,e,n,r){this.program=this.transpose_program,this.selectProgram(this.program);var o=this.getPad(e),i=this.getPad(t),a=this.context.getUniformLocation(this.program,"N"),s=this.context.getUniformLocation(this.program,"npad"),u=this.context.getUniformLocation(this.program,"M"),l=this.context.getUniformLocation(this.program,"mpad");this.context.uniform1i(a,t),this.context.uniform1i(s,i),this.context.uniform1i(u,e),this.context.uniform1i(l,o),this.bindInputTexture(n,this.context.TEXTURE0,"A"),this.bindOutputTexture(e,(t+i)/4,r),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},r.prototype.reshape=function(t,e,n,r,o,i){var a=this.getPad(e),s=this.getPad(r);0==a&&0==s?this.program=this.reshape_simple_program:(this.program=this.reshape_program,console.log("# WARNING: using slow reshape shader.")),this.selectProgram(this.program);var u=this.context.getUniformLocation(this.program,"M"),l=this.context.getUniformLocation(this.program,"N"),c=this.context.getUniformLocation(this.program,"pad"),f=this.context.getUniformLocation(this.program,"M_in"),p=this.context.getUniformLocation(this.program,"N_in"),h=this.context.getUniformLocation(this.program,"pad_in");this.context.uniform1f(u,n),this.context.uniform1f(l,r),this.context.uniform1f(c,s),this.context.uniform1f(f,t),this.context.uniform1f(p,e),this.context.uniform1f(h,a),this.bindInputTexture(o,this.context.TEXTURE0,"A"),this.bindOutputTexture(n,(r+s)/4,i),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},r.prototype.submatrix=function(t,e,n,r,o,i,a){this.program=this.submatrix_program,this.selectProgram(this.program);var s=this.getPad(t),u=this.getPad(n),l=this.context.getUniformLocation(this.program,"N"),c=this.context.getUniformLocation(this.program,"pad"),f=this.context.getUniformLocation(this.program,"N_in"),p=this.context.getUniformLocation(this.program,"pad_in"),h=this.context.getUniformLocation(this.program,"offset");stride_gl=this.context.getUniformLocation(this.program,"stride"),this.context.uniform1f(l,n),this.context.uniform1f(c,u),this.context.uniform1f(f,t),this.context.uniform1f(p,s),this.context.uniform1f(stride_gl,r),this.context.uniform1f(h,o),this.bindInputTexture(i,this.context.TEXTURE0,"X"),this.bindOutputTexture(e,(n+u)/4,a),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},r.prototype.combine=function(t,e,n,r,o,i){this.program=this.combine_program,this.selectProgram(this.program);var a=2*e,s=this.getPad(e),u=this.getPad(a),l=this.context.getUniformLocation(this.program,"N_in"),c=this.context.getUniformLocation(this.program,"pad_in"),f=this.context.getUniformLocation(this.program,"stride");this.context.uniform1f(l,e),this.context.uniform1f(c,s),this.context.uniform1f(f,n),this.bindInputTexture(r,this.context.TEXTURE0,"A"),this.bindInputTexture(o,this.context.TEXTURE1,"B"),this.bindOutputTexture(t,(a+u)/4,i),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},r.prototype.bindInputTexture=function(t,e,n){var r=this.context,o=this.program;r.activeTexture(e),r.bindTexture(r.TEXTURE_2D,t);var i=r.getUniformLocation(o,n);r.uniform1i(i,e-r.TEXTURE0)},r.prototype.createProgram=function(t){var e,n=this.context;if(e=n.createShader(n.FRAGMENT_SHADER),n.shaderSource(e,t),n.compileShader(e),0==n.getShaderParameter(e,n.COMPILE_STATUS))throw new Error(n.getShaderInfoLog(e));var r=n.createProgram();return n.attachShader(r,this.vertexShader),n.attachShader(r,e),n.linkProgram(r),r},r.prototype.selectProgram=function(t){var e=this.context;e.useProgram(t),this.bindVertices(t)},r.prototype.bindVertices=function(t){var e=this.context,n=t,o=e.getAttribLocation(n,r.POSITION_UNIFORM_NAME),i=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,i);var a=[-1,-1,0,1,-1,0,1,1,0,-1,1,0];e.bufferData(e.ARRAY_BUFFER,new Float32Array(a),e.STATIC_DRAW),e.vertexAttribPointer(o,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(o);var s=e.getAttribLocation(n,r.TEXTURE_UNIFORM_NAME),u=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,u);var l=[0,0,1,0,1,1,0,1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(l),e.STATIC_DRAW),e.vertexAttribPointer(s,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(s);var c=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,c);var f=[0,1,2,0,2,3];e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),e.STATIC_DRAW)},r.prototype.createDataTexture=function(t,e,n){var o=this.context,i=[0,0,0,0],a=e%r.COMPONENTS_PER_TEXEL,s=0==a?0:r.COMPONENTS_PER_TEXEL-a,u=o.createTexture();if(o.bindTexture(o.TEXTURE_2D,u),0==s||null==n||"undefined"==typeof n)o.texImage2D(o.TEXTURE_2D,0,o.RGBA,(e+s)/r.COMPONENTS_PER_TEXEL,t,0,o.RGBA,o.FLOAT,n);else{o.texImage2D(o.TEXTURE_2D,0,o.RGBA,(e+s)/r.COMPONENTS_PER_TEXEL,t,0,o.RGBA,o.FLOAT,null);for(var l,c,f=e-a,p=f/r.COMPONENTS_PER_TEXEL,h=0,d=new Float32Array(i),v=0;t>v;v++)h=v*e,full_texel_row_end=h+f,l=new Float32Array(n.buffer,h*n.BYTES_PER_ELEMENT,f),f>0&&o.texSubImage2D(o.TEXTURE_2D,0,0,v,p,1,o.RGBA,o.FLOAT,l),c=new Float32Array(n.buffer,full_texel_row_end*n.BYTES_PER_ELEMENT,a),d.set(c),o.texSubImage2D(o.TEXTURE_2D,0,p,v,1,1,o.RGBA,o.FLOAT,d)}return o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.bindTexture(o.TEXTURE_2D,null),u},r.prototype.createOutputTexture=function(t,e){var n=this.context,r=this.getPad(e),o=n.createTexture();return n.bindTexture(n.TEXTURE_2D,o),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e+r,t,0,n.RGBA,n.UNSIGNED_BYTE,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.bindTexture(n.TEXTURE_2D,null),o},r.prototype.bindOutputTexture=function(t,e,n){var r=this.context;if(this.canvas.height=t,this.canvas.width=e,r.viewport(0,0,e,t),this.framebuffer=this.framebuffer||r.createFramebuffer(),r.bindFramebuffer(r.FRAMEBUFFER,this.framebuffer),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,n,0),r.checkFramebufferStatus(r.FRAMEBUFFER)!=r.FRAMEBUFFER_COMPLETE)throw new Error("Bound framebuffer is not complete.");return this.framebuffer},r.prototype.unbindInputTexture=function(t){var e=this.context;e.activeTexture(t),e.bindTexture(e.TEXTURE_2D,null)},r.prototype.readData=function(t,e){var n=this.context;return rawbuffer=new ArrayBuffer(t*e*Float32Array.BYTES_PER_ELEMENT),prod=new Uint8Array(rawbuffer),n.readPixels(0,0,e,t,n.RGBA,n.UNSIGNED_BYTE,prod),rawbuffer},r.prototype.getPad=function(t){var e=t%r.COMPONENTS_PER_TEXEL,n=0==e?0:r.COMPONENTS_PER_TEXEL-e;return n}},{}]},{},[1])(1)})},function(t,e,n){n(195),t.exports=n(194)}])});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1).setImmediate, __webpack_require__(1).clearImmediate))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
const KerasJS = __webpack_require__(4)


var app = new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
    el: '#app',
    data: {
        message: 'hello world',
        model: new KerasJS.Model({
            filepaths: {
                model: 'assets/model/model.json',
                weights: 'assets/model/model_weights.buf',
                metadata: 'assets/model/model_metadata.json',
            },
            gpu: true
        })
    }
})

/***/ })
/******/ ]);