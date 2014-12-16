# kist-querypoint

Simple media query breakpoints manager.

## Installation

```sh
npm install kist-querypoint --save

bower install kist-querypoint --save
```

## API

### `.add(name, query)`

Returns: `Query`

#### name

Type: `String`

Breakpoint name.

#### query

Type: `String`

Valid `matchMedia` query for resolving.

### `.remove(name)`

Returns: `Object` (querypoint)

#### name

Type: `String`

Name of breakpoint to remove.

### `.get(name)`

Returns: `Query`

#### name

Type: `String`

Name of breakpoint to get.

### `.listen(cb, useNativeBehavior)`

Returns: `Query`

#### cb

Type: `Function`

Callback to call when media query enters/exits.

| Argument | Type | Description |
| --- | --- | --- |
| `mq` | `MediaQueryList` | Current media query object. |

#### useNativeBehavior

Type: `Boolean`

Should you use default media query listener behavior or not (default behavior is to not fire callback on page load).

### `.ignore(cb)`

Returns: `Query`

#### cb

Type: `Function`

Callback to remove from listening.

## Examples

```js
var querypoint = require('kist-querypoint');

// Add querypoint
querypoint.add('bp-alpha-s','screen and (min-width:600px)');
querypoint.add('bp-alpha-m','screen and (min-width:800px)');
querypoint.add('bp-alpha-l','screen and (min-width:1000px)');

// Remove querypoint
querypoint.remove('bp-alpha-s');

// Get querypoint
querypoint.get('bp-alpha-s');

// Listen, even at page load
querypoint
	.get('bp-alpha-s')
	.listen(function ( mq ) {
		if ( mq.matches ) {
			// Do something, even at page load
		}
	});

// Listen, but only with native behavior
querypoint
	.get('bp-alpha-s')
	.listen(function ( mq ) {
		if ( mq.matches ) {
			// Do something, but not on page load
		}
	}, true);

// Ignore
querypoint
	.get('bp-alpha-s')
	.ignore(cb);
```

### AMD and global

```js
define(['kist-querypoint'], cb);

window.kist.querypoint;
```

## Browser support

Tested in IE8+ and all modern browsers.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)
