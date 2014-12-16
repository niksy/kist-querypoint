/*! kist-querypoint 0.1.1 - Simple media query breakpoints manager. | Author: Ivan Nikolić <niksy5@gmail.com> (http://ivannikolic.com/), 2014 | License: MIT */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.kist||(f.kist={})).querypoint=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Query = require(2);
var cache = {};

module.exports = {

	cache: cache,

	/**
	 * @param {String} name
	 * @param {String} query
	 *
	 * @return {Object}
	 */
	add: function ( name, query ) {
		if ( !cache[name] ) {
			cache[name] = new Query(query);
		}
		return cache[name];
	},

	/**
	 * @param  {String} name
	 *
	 * @return {Object}
	 */
	remove: function ( name ) {
		if ( cache[name] ) {
			cache[name] = null;
			delete cache[name];
		}
		return this;
	},

	/**
	 * @param  {String} name
	 *
	 * @return {Object}
	 */
	get: function ( name ) {
		if ( !cache[name] ) {
			throw new Error('Querypoint with name "' + name + '" not found.');
		}
		return cache[name];
	}

};

},{}],2:[function(require,module,exports){
(function (global){
/**
 * @param {String} query
 */
var Query = module.exports = function ( query ) {
	if ( !('matchMedia' in global) ) {
		throw new Error('window.matchMedia undefined.');
	}
	this.query = query;
	this.mq = global.matchMedia(query);
};

/**
 * @param  {Function} cb
 * @param  {Boolean} useNativeBehavior
 *
 * @return {Query}
 */
Query.prototype.listen = function ( cb, useNativeBehavior ) {
	if ( typeof(cb) === 'function' ) {
		if ( !Boolean(useNativeBehavior) ) {
			cb.call(global, this.mq);
		}
		this.mq.addListener(cb);
	}
	return this;
};

/**
 * @param  {Function} cb
 *
 * @return {Query}
 */
Query.prototype.ignore = function ( cb ) {
	if ( typeof(cb) === 'function' ) {
		this.mq.removeListener(cb);
	}
	return this;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});