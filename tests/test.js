var ask = require('../index');

ask.get('busi.vip.kankan.com', '/userinfo/getUserInfo', {
	query: {
		respType: 'json'
	},
	headers: {
		'Cookie': {
			userid: '111333196',
			sessionid: 'DE05DAFDC5468BF8525CDCAB63B6626DB82E8ABC26EA84C0A4CA0D44E59F26C26FCAB7788A3BFF51899DE02A0FFAA8903579C7C78B96D271708A27F15F8C5A88'
		}
	}
}, function(err, res) {
	console.log(err);
	console.log(res);
});