/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_getLocation_js__ = __webpack_require__(5);
const path = __webpack_require__(1);
const express = __webpack_require__(2);
const app = express();
const compression = __webpack_require__(3);
__webpack_require__(4).config();


const PUBLIC = path.resolve(__dirname);

/*
we can exclude a route from compression using the filter attribute
this only saves about 20 bytes, so probably not worth it
{
    // exclude the /whatsmyinfo route from compression
    filter: (req, res) => {
        return req.path !== "/whatsmyinfo";
    }
}
*/
if (process.env.NODE_ENV === "production") {
    app.use(compression());
    app.set('trust proxy', true);
    // support static retrieval on well-known endpoint for tls
    app.use('/.well-known', express.static('/home/.well-known'))
}

app.use('/static', express.static(path.join(PUBLIC, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'index.html'));
});

app.get('/blank.gif', (req, res) => {
    res.sendFile(path.join(PUBLIC, 'static/img/blank.gif'));
});

app.post('/whatsmyinfo', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let payload = {
        ip: req.ip,
        loc: null
    };

    Object(__WEBPACK_IMPORTED_MODULE_0__js_getLocation_js__["a" /* default */])(req.ip).then((location) => {
        payload.loc = location;
    }).catch(() => {
        payload.loc = null;
    }).then(() => {
        res.send(JSON.stringify(payload));
    });
});

app.listen(8000, () => console.log('IMIW3 Express app listening on port 8000!'));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Performs a GET request to /whatsmyip with a timeout of 2000 ms.
// Returns a Promise with reply. Errors or non-200 status codes reject.
const rp = __webpack_require__(6);

/* harmony default export */ __webpack_exports__["a"] = ((ip) => {
    const options = {
        uri: `http://127.0.0.1:8080/json/${ip}`,
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options);
});


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ })
/******/ ]);