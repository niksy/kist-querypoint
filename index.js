'use strict';

const extend = require('xtend/mutable');

function Breakpoint ( mq ) {
	this.mq = typeof mq === 'string' ? window.matchMedia(mq) : mq;
	this.callbacks = [];
}
extend(Breakpoint.prototype, {

	addListener: function ( cb ) {
		const index = this.callbacks.indexOf(cb);
		if ( index === -1 ) {
			this.callbacks.push(cb);
			cb(this.mq);
			this.mq.addListener(cb);
		}
	},

	removeListener: function ( cb ) {
		const index = this.callbacks.indexOf(cb);
		if ( index !== -1 ) {
			this.callbacks.splice(index, 1);
			this.mq.removeListener(cb);
		}
	},

	removeAllListeners: function () {
		this.callbacks.forEach(( cb ) => {
			this.mq.removeListener(cb);
		});
		this.callbacks = [];
	}

});

function BreakpointManager () {
	this.breakpoints = {};
}
extend(BreakpointManager.prototype, {

	add: function ( breakpointName, mq ) {
		if ( !this.breakpoints[breakpointName] ) {
			this.breakpoints[breakpointName] = new Breakpoint(mq);
		}
		return this.get(breakpointName);
	},

	remove: function ( breakpointName ) {
		try {
			const breakpoint = this.get(breakpointName);
			if ( breakpoint ) {
				breakpoint.removeAllListeners();
				this.breakpoints[breakpointName] = null;
				delete this.breakpoints[breakpointName];
			}
		} catch ( e ) {
			// Handled
		}
		return this;
	},

	get: function ( breakpointName ) {
		if ( !this.breakpoints[breakpointName] ) {
			throw new Error(`Breakpoint with name "${breakpointName}" is undefined.`);
		}
		return this.breakpoints[breakpointName];
	}

});

module.exports = () => {
	return new BreakpointManager();
};
