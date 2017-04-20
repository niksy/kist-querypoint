'use strict';

require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');

const assert = require('assert');
const sinon = require('sinon');
const fn = require('../../index');

describe('Manager', function () {

	it('should add named breakpoint', function () {
		const qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.add('bp-alpha-m', window.matchMedia('screen and (min-width: 800px)'));
		assert.ok(qp.breakpoints['bp-alpha-s']);
		assert.ok(qp.breakpoints['bp-alpha-m']);
		assert.ok(/600/.test(qp.breakpoints['bp-alpha-s'].mq.media));
		assert.ok(/800/.test(qp.breakpoints['bp-alpha-m'].mq.media));
	});

	it('should use existing named breakpoint if added multiple times', function () {
		const qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		const bp1 = qp.breakpoints['bp-alpha-s'];
		qp.add('bp-alpha-s', 'screen and (min-width: 700px)');
		const bp2 = qp.breakpoints['bp-alpha-s'];
		assert.deepEqual(bp1, bp2);
	});

	it('should get existing named breakpoint', function () {
		const qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		assert.ok(qp.get('bp-alpha-s'));
	});

	it('should throw if getting undefined named breakpoint', function () {
		const qp = fn();
		assert.throws(() => {
			qp.get('jackie');
		}, 'Breakpoint with name "jackie" is undefined.');
	});

	it('should remove named breakpoint', function () {
		const qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.remove('bp-alpha-s');
		assert.ok(!qp.breakpoints['bp-alpha-s']);
		assert.throws(() => {
			qp.get('bp-alpha-s');
		});
	});

	it('should handle removing of undefined named breakpoint', function () {
		const qp = fn();
		qp.remove('bp-alpha-s');
		assert.ok(!qp.breakpoints['bp-alpha-s']);
	});

});

describe('Listeners', function () {

	let qp;

	afterEach(function () {
		qp.remove('bp-alpha-s');
	});

	it('should add listener', function () {
		const spy = sinon.spy();
		qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.get('bp-alpha-s').addListener(spy);
		assert.equal(qp.get('bp-alpha-s').callbacks.length, 1);
	});

	it('should add same listener once', function () {
		const spy = sinon.spy();
		qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.get('bp-alpha-s').addListener(spy);
		qp.get('bp-alpha-s').addListener(spy);
		assert.equal(qp.get('bp-alpha-s').callbacks.length, 1);
	});

	it('should add multiple different listeners', function () {
		const spy1 = sinon.spy();
		const spy2 = sinon.spy();
		qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.get('bp-alpha-s').addListener(spy1);
		qp.get('bp-alpha-s').addListener(spy2);
		assert.equal(qp.get('bp-alpha-s').callbacks.length, 2);
	});

	it('should call listener at start', function () {
		const spy = sinon.spy();
		qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.get('bp-alpha-s').addListener(spy);
		assert.ok(spy.called);
	});

	it('should call listener once if added multiple times', function () {
		const spy = sinon.spy();
		qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.get('bp-alpha-s').addListener(spy);
		qp.get('bp-alpha-s').addListener(spy);
		assert.ok(spy.calledOnce);
	});

	it('should remove listener', function () {
		const spy = sinon.spy();
		qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.get('bp-alpha-s').addListener(spy);
		qp.get('bp-alpha-s').removeListener(spy);
		assert.equal(qp.get('bp-alpha-s').callbacks.length, 0);
	});

	it('should remove all registered listeners', function () {
		const spy = sinon.spy();
		qp = fn();
		qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
		qp.get('bp-alpha-s').addListener(spy);
		qp.get('bp-alpha-s').removeAllListeners();
		assert.equal(qp.get('bp-alpha-s').callbacks.length, 0);
	});

});
