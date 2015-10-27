/**
 * TieredRate.js v0.0.1
 */
var TieredRate =
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

	function TieredRate (tiers) {
		this.tiers = tiers;
	
		tiers.forEach(function (tier, index) {
			if (index === 0 && tier.from) {
				throw new Error('You should not specify from on the first range');
			} else if (index === tiers.length - 1 && tier.to) {
				throw new Error('You should not specify to on the last range');
			}
		});
	}
	TieredRate.prototype.getOriginalPrice = function (tieredPrice) {
		for (var i = this.tiers.length - 1; i >= 0; i--) {
			var tier = this.tiers[i],
				rate = tier.rate + 1;
	
			if (!tier.from) {
				return tieredPrice / rate;
			} else if (tier.to && this.getTieredPrice(tier.from) <= tieredPrice && this.getTieredPrice(tier.to) >= tieredPrice) {
				return ((tieredPrice - this.getTieredPrice(tier.from)) / rate) + (tier.from ? tier.from : 0);
			} else if (this.getTieredPrice(tier.from) <= tieredPrice) {
				return ((tieredPrice - this.getTieredPrice(tier.from)) / rate) + tier.from;
			}
		}
	};
	TieredRate.prototype.getTieredPrice = function (original) {
		var tieredPrice = 0;
	
		this.tiers.forEach(function (tier) {
			var rate = tier.rate + 1;
	
			if (tier.to && !tier.from) {
				if (original >= tier.to) {
					tieredPrice += tier.to * rate;
				} else {
					tieredPrice += original * rate;
				}
			} else if (tier.from && tier.to) {
				if (original >= tier.to) {
					tieredPrice += (tier.to - tier.from) * rate;
				} else if (original > tier.from) {
					tieredPrice += (original - tier.from) * rate;
				}
			} else if (tier.from && !tier.to) {
				if (original > tier.from) {
					tieredPrice += (original - tier.from) * rate;
				}
			} else if (!tier.from && !tier.to) {
				tieredPrice += original * rate;
			} else {
				throw new Error('Range issue');
			}
		});
	
		return tieredPrice;
	};
	
	module.exports = TieredRate;

/***/ }
/******/ ])
//# sourceMappingURL=TieredRate.js.map