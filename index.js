var http = require('http'),
	qs = require('querystring');

function Oh(options) {
	options = options || {};

	this.protocol = options.protocol || http;
	this.host = options.host || 'localhost';
	this.port = options.port || 80;
}

/*
* $.getEx(host,path,params,callback,timeout)
* $.postEx = function(host,path,params,callback,timeout)
*/

Oh.prototype.request = function(options, body, callback) {
	var data = null;

	options.host = options.hostname || options.host || this.host;
	options.port = options.port || this.port;
	options.headers = options.headers || {};
	options.expect && options.headers['Expect'] = '100-Continue';
	options.path = options.path || '/';
	options.query && (options.path += '?' + qs.stringify(options.query));

	if (body) {
		if (typeof body == 'object') {
			try {
				data = JSON.stringify(body);
				data = Buffer(data);

				options.headers['Content-Type'] = 'application/json';
				!options.headers['Accept'] && options.headers['Accept'] = 'application/json';
			} catch(e) {
				callback(e);
				return ;
			};
		} else {
			data = Buffer(data + '');
			options.headers['Content-Type'] = 'text/plain';
		}

		options.headers['Content-Length'] = data.length;
	}

	var req = this.protocol.request(options);

	req.on('error', function(err) {
		callback(err);
	});

	req.on('response', function(res) {
		res.setEncoding('utf8');

		res.data = '';
		res.on('data', function(d) {
			res.data += d.toString('utf8');
		});

		res.on('end', function() {
			if (res.headers && res.headers['content-type'] 
							&& res.headers['content-type'].split(/;/g)[0] == 'application/json') {
				try {
					res.body = JSON.parse(res.data);
				} catch(e) {
					callback(e);
					return ;
				};
			}

			callback(null, res);
		});
	});

	if (data) {
		options.expect && req.on('continue', function() {
			req.write(data);
			req.end();
		});

		!options.expect && (function() {
			req.write(data);
			req.end();
		})();
	} else {
		req.end();
	}
};

Oh.prototype.get = function(path, options, callback) {
	if (typeof options == 'function') {
		callback = options;
		options = {};
	}

	options.path = path;
	options.method = 'GET';
	this.request(options, null, callback);
};

Oh.prototype.post = function(path, body, options, callback) {
	if (typeof options == 'function') {
		callback = options;
		options = {};
	}

	options.path = path;
	options.method = 'POST';
	this.request(options, body, callback);
};

module.exports = Oh;