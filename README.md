# querypoint

[![Build Status][ci-img]][ci] [![BrowserStack Status][browserstack-img]][browserstack]

Media query breakpoints manager.

Features:

* Named breakpoints for easier organization
* Initial call when adding listener instead of native behavior (called on first media query event)

## Install

```sh
npm install querypoint --save
```

## Usage

```js
const querypoint = require('querypoint');
const qp = querypoint();

const listener = ( mq ) => {
	if ( mq.matches ) {
		// Matched!
	}
};

qp.add('bp-alpha-s', 'screen and (min-width: 600px)');
qp.add('bp-alpha-m', window.matchMedia('screen and (min-width: 800px)'));

qp.get('bp-alpha-s').addListener(listener);
// Subsequent same listener will be registered only once
qp.get('bp-alpha-s').addListener(listener);

// Remove single listener…
qp.get('bp-alpha-s').removeListener(listener);
// …or all registered listeners
qp.get('bp-alpha-s').removeAllListeners();

// Remove named breakpoint and all registered listeners
qp.remove('bp-alpha-s');
```

## API

### querypoint()

Returns: `BreakpointManager`

Returns instance of breakpoint manager.

### qp.add(breakpointName, mq)

Returns: `Breakpoint`

Add breakpoint to breakpoint manager instance.

#### breakpointName

Type: `String`

####  mq

Type: `String|MediaQueryList`

Valid [media query string][media-query-string] or instance of [`window.matchMedia`][match-media].

### qp.remove(breakpointName)

Returns: `BreakpointManager`

Remove breakpoint from breakpoint manager instance.

#### breakpointName

Type: `String`

### qp.get(breakpointName)

Returns: `Breakpoint`

Returns [registered breakpoint](#registered-breakpoint) in breakpoint manager instance.

#### breakpointName

Type: `String`

<a name="registered-breakpoint"></a>

### breakpoint.addListener(cb)

Add listener to breakpoint.

#### cb

Type: `Function`

### breakpoint.removeListener(cb)

Remove listener from breakpoint.

#### cb

Type: `Function`

### breakpoint.removeAllListeners()

Remove all registered listeners from breakpoint.

## Test

For local automated tests, run `npm run test:automated:local`.

For manual tests, run `npm run test:manual:local` and open <http://localhost:9000/> in your browser.

## Browser support

Tested in IE9+ and all modern browsers. For proper `window.matchMedia` support in IE9 you should use [polyfill](https://github.com/paulirish/matchMedia.js/).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/querypoint
[ci-img]: https://travis-ci.org/niksy/querypoint.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=MHRpV0FMc0g5OEVEQXhDak1DRllDeFZxYnZOZitlR29ick5KaGRheEFXUT0tLWRkaXhrd21ZdGZHOElqMzExR1JObFE9PQ==--8d812569887b861e3e899a08c7bddca522ebe54f
[media-query-string]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
[match-media]: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
