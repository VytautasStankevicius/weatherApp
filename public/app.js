/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

var startingPlaces = ['Vilnius', 'Kaunas', 'Klaipeda', 'Siauliai'];
var preloadCity = localStorage.getItem('miestuPavadinimai');
if (preloadCity) {
  startingPlaces = JSON.parse(preloadCity);
}
function placesList() {
  fetch('https://api.meteo.lt/v1/places/').then(function (response) {
    return response.json();
  }).then(function (places) {
    places.forEach(function (place) {
      var code = place.code;
      var name = place.name;
      var option = document.createElement('option');
      option.setAttribute('value', code);
      option.innerText = name;
      document.getElementById('datalistOptions').appendChild(option);
    });
  });
}
placesList();
var locationData = function locationData(miestas) {
  fetch("https://api.meteo.lt/v1/places/".concat(miestas, "/forecasts/long-term")).then(function (response) {
    return response.json();
  }).then(function (response) {
    addForecast(response);
  });
};
startingPlaces.forEach(function (miestas) {
  locationData(miestas);
});
var addForecast = function addForecast(forecast) {
  var initForecast = document.getElementById('initForecast');
  var initForecastBox = document.createElement('div');
  initForecastBox.className = 'day-forecast';
  var city = document.createElement('p');
  city.className = 'city';
  city.innerText = forecast.place.name;
  initForecastBox.appendChild(city);
  var currentHour = new Date().getHours();
  var currentHourForecast = forecast.forecastTimestamps.find(function (f) {
    //find veikia iki pirmo kuri randa ir sustoja
    return new Date(f.forecastTimeUtc).getHours() === currentHour;
  });
  var date = new Date(currentHourForecast.forecastTimeUtc);
  var time = document.createElement('p');
  time.className = 'time';
  time.innerText = "".concat(date.getHours(), ":00");
  initForecastBox.appendChild(time);
  var temperature = document.createElement('p');
  temperature.className = 'temperature';
  temperature.innerText = currentHourForecast.airTemperature + '℃';
  initForecastBox.appendChild(temperature);
  var weatherState = document.createElement('p');
  weatherState.innerText = currentHourForecast.conditionCode.replaceAll('-', ' ');
  weatherState.className = 'weather-state';
  initForecastBox.appendChild(weatherState);
  initForecast.appendChild(initForecastBox);
};
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  var miestas = document.getElementById('cityInput').value;
  startingPlaces.unshift(miestas);
  startingPlaces.pop();
  localStorage.setItem('miestuPavadinimai', JSON.stringify(startingPlaces));
  fetch("https://api.meteo.lt/v1/places/".concat(miestas, "/forecasts/long-term")).then(function (response) {
    return response.json();
  }).then(function (response) {
    createWeekly(response);
  });
});
var createWeekly = function createWeekly(forecast) {
  var initData = document.getElementById('initForecast');
  initData.remove();
  var forecasts = forecast.forecastTimestamps.filter(function (f) {
    return new Date(f.forecastTimeUtc).getHours() === 15;
  }).forEach(function (f) {
    addDayForecast(f);
  });
};
var addDayForecast = function addDayForecast(forecast) {
  console.log(forecast);
  var initForecast = document.getElementById('searchForecast');
  var initForecastBox = document.createElement('div');
  initForecastBox.className = 'day-forecast';
  var date = new Date(forecast.forecastTimeUtc);
  var time = document.createElement('p');
  time.className = 'time';
  time.innerText = date.toDateString();
  initForecastBox.appendChild(time);
  var temperature = document.createElement('p');
  temperature.className = 'temperature';
  temperature.innerText = forecast.airTemperature + '℃';
  initForecastBox.appendChild(temperature);
  var weatherState = document.createElement('p');
  weatherState.innerText = forecast.conditionCode.replaceAll('-', ' ');
  weatherState.className = 'weather-state';
  initForecastBox.appendChild(weatherState);
  initForecast.appendChild(initForecastBox);
};

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/app": 0,
/******/ 			"css/style": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./src/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/style"], () => (__webpack_require__("./src/scss/style.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;