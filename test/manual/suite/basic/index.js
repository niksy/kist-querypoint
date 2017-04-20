'use strict';

require('matchmedia-polyfill');
require('matchmedia-polyfill/matchMedia.addListener');

const querypoint = require('../../../../index');
const qp = querypoint();

function cb1 ( mq ) {
	if ( mq.matches ) {
		console.log('Callback 1', mq);
	} else {
		console.log('Callback 1', `${mq.media} - UNMATCHED`);
	}
}

function cb2 ( mq ) {
	if ( mq.matches ) {
		console.log('Callback 2', mq);
	} else {
		console.log('Callback 2', `${mq.media} - UNMATCHED`);
	}
}

qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
qp.add('bp-alpha-m', 'screen and (min-width: 800px)');

document.querySelector('.Breakpoint-01 .Action--addListener').addEventListener('click', () => {
	qp.get('bp-alpha-s').addListener(cb1);
	qp.get('bp-alpha-s').addListener(cb2);
});
document.querySelector('.Breakpoint-01 .Action--removeListener').addEventListener('click', () => {
	qp.get('bp-alpha-s').removeListener(cb1);
	qp.get('bp-alpha-s').removeListener(cb2);
});
document.querySelector('.Breakpoint-02 .Action--addListener').addEventListener('click', () => {
	qp.get('bp-alpha-s').addListener(cb1);
	qp.get('bp-alpha-s').addListener(cb1);
	qp.get('bp-alpha-s').addListener(cb2);
	qp.get('bp-alpha-s').addListener(cb2);
});
document.querySelector('.Breakpoint-02 .Action--removeListener').addEventListener('click', () => {
	qp.get('bp-alpha-s').removeListener(cb1);
	qp.get('bp-alpha-s').removeListener(cb1);
	qp.get('bp-alpha-s').removeListener(cb2);
	qp.get('bp-alpha-s').removeListener(cb2);
});

// ---

document.querySelector('.Breakpoint-03 .Action--addListener').addEventListener('click', () => {
	qp.get('bp-alpha-s').addListener(cb1);
	qp.get('bp-alpha-m').addListener(cb1);
	qp.get('bp-alpha-s').addListener(cb2);
	qp.get('bp-alpha-m').addListener(cb2);
});
document.querySelector('.Breakpoint-03 .Action--removeListener').addEventListener('click', () => {
	qp.get('bp-alpha-s').removeListener(cb1);
	qp.get('bp-alpha-m').removeListener(cb1);
	qp.get('bp-alpha-s').removeListener(cb2);
	qp.get('bp-alpha-m').removeListener(cb2);
});
document.querySelector('.Breakpoint-04 .Action--addListener').addEventListener('click', () => {
	qp.get('bp-alpha-s').addListener(cb1);
	qp.get('bp-alpha-s').addListener(cb1);
	qp.get('bp-alpha-m').addListener(cb1);
	qp.get('bp-alpha-m').addListener(cb1);
	qp.get('bp-alpha-s').addListener(cb2);
	qp.get('bp-alpha-s').addListener(cb2);
	qp.get('bp-alpha-m').addListener(cb2);
	qp.get('bp-alpha-m').addListener(cb2);
});
document.querySelector('.Breakpoint-04 .Action--removeListener').addEventListener('click', () => {
	qp.get('bp-alpha-s').removeListener(cb1);
	qp.get('bp-alpha-s').removeListener(cb1);
	qp.get('bp-alpha-m').removeListener(cb1);
	qp.get('bp-alpha-m').removeListener(cb1);
	qp.get('bp-alpha-s').removeListener(cb2);
	qp.get('bp-alpha-s').removeListener(cb2);
	qp.get('bp-alpha-m').removeListener(cb2);
	qp.get('bp-alpha-m').removeListener(cb2);
});

// ---

document.querySelector('.Manager .Action--addNamedBreakpoint').addEventListener('click', () => {
	qp.add('bp-alpha-l', 'screen and (min-width: 900px)');
	qp.get('bp-alpha-l').addListener(cb1);
});
document.querySelector('.Manager .Action--removeNamedBreakpoint').addEventListener('click', () => {
	qp.remove('bp-alpha-l');
});
