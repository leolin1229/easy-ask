oh-request
==============
A _simple_ and _lightweight_ module for native HTTP clients.

This module supports the `Promise` feature of ES6.

## Usage
The usage is really simple.
First, you must use npm to install the module.

```
npm install --save oh-request
```
Then, in your code:

```js
var request = require('oh-request');
```

### Params
`request(options, body)`

#### options
The `options` parameter must be an object.
* `host`[string] A target for the client.(option, defalut value is `localhost`)
* `path`[string] A target for the client.(option, defalut value is `/`)
* `port`[number] A port for the target.(option, defalut value is `80`)
* `timeout`[number] Set timeout for the request.(option, defalut value is `15000` ms)
* `method`[string] The request method, support `GET` and `POST`.(case insensitive)
* `headers`[object] The request headers, such as `Content-Type`, `Accept` and so on.(option)
* `expect`[boolean] Set the `Expect: 100-Continue` header, and don't send pay-load until the 100 head is received.(option)
* `query`[object] Set the `GET` params in URL.(option)

#### body
Must be an object that can be consumed by `JSON.stringify` or casted to a string, or `null`.

#### sample

```js
var request = require('oh-request');

request({
		host: 'google.com',
		method: 'GET',
		path: '/search',
		query: {
			q: 'nodejs'
		},
		headers: {
			'x-foo-bar' : "Hello World"
		},
		timeout: 3000
	})
	.then(function(data) {
		console.log(data);
		return Promise.resolve('Bingo');
	}, function(err) {
		console.log(err);
		return Promise.reject('Oh no!');
	})
	.then(function(data) {
		console.log(data);
	}, function(err) {
		console.log(err);
	});
```
## Contact
oh-request is available on [github](https://github.com/leolin1229/oh-request) here under [MIT license](https://github.com/leolin1229/oh-request/blob/master/LICENSE.txt). If you hit bugs, fill issues on github. Feel free to fork, modify and have fun with it :)