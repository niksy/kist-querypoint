/*! kist-querypoint 0.1.0 - Simple media query breakpoints manager. | Author: Ivan Nikolić <niksy5@gmail.com> (http://ivannikolic.com/), 2014 | License: MIT */
var Query = require('./query');
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
