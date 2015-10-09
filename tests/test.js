var ask = require('../index');

ask('busi.vip.kankan.com', '/userinfo/getUserInfo', {
		method: 'GET',
		query: {
			respType: 'json'
		},
		headers: {
			'Cookie': {
				userid: '123455'
			}
		},
		timeout: 1000
	})
	.then(function(data) {
		console.log(data);
		return ask('svr.act.vip.kankan.com', '/giftService/saveUserAddress', {
			method: 'POST',
			query: {
				respType: 'json'
			},
			timeout: 1000
		}, {
			address: 'fafasfaa'
		});
	})
	.then(function(data) {
		console.log(data);
		return Promise.resolve('Bingo');
	})
	.then(function(data) {
		console.log(data);
	});
// var p = new Promise(function(resolve, reject) {
// 	ask.get('busi.vip.kankan.com', '/userinfo/getUserInfo', {
// 		query: {
// 			respType: 'json'
// 		},
// 		headers: {
// 			'Cookie': {
// 				userid: '123455'
// 			}
// 		},
// 		timeout: 1000
// 	}, function(err, res) {
// 		err && console.log(err);
// 		res && res.data && (res.data = JSON.parse(res.data));
// 		res && resolve(res.data);
// 	});
// });

// p.then(function(val){
// 	// console.log(val);
// 	ask.post('svr.act.vip.kankan.com', '/giftService/saveUserAddress', {
// 		query: {
// 			respType: 'json'
// 		},
// 		timeout: 1000
// 	},{
// 		address: 'fasdfadsfa'
// 	}, function(err, res) {
// 		err && console.log(err);
// 		res && res.data && (res.data = JSON.parse(res.data));
// 		res && console.log(res.data);
// 		return res.data;
// 	});
// }, function() {})
// .then(function(val) {
// 	console.log(val);
// }, function() {});