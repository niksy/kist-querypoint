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
