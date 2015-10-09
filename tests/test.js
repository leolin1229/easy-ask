var ask = require('../index');

ask.get('busi.vip.kankan.com', '/userinfo/getUserInfo', {
	query: {
		respType: 'json'
	},
	headers: {
		'Cookie': {
			userid: '123455'
		}
	}
}, function(err, res) {
	// console.log(err + '!!');
	console.log(res.data);
});