var request = require('../index');

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
	.then(function(res) {
		console.log(res.headers); // the property of http.IncomingMessage
		return Promise.resolve('Bingo');
	}, function(err) {
		console.log(err);
		return Promise.reject('Oh no!');
	})
	.then(function(res) {
		console.log(res.data); // the json data from remote server
	}, function(err) {
		console.log(err);
	});