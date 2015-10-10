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

