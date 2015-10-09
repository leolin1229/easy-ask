var http = require('http'),
	qs = require('querystring');

function Request(options) {
	options = options || {};

	this.protocol = options.protocol || http;
	this.host = options.host || 'localhost';
	this.port = options.port || 80;
	this.timeout = options.timeout || 15000;
}

Request.prototype.request = function(options, body, callback) {
	var data = null;

	options.host = options.host || this.host;
	options.port = options.port || this.port;
	options.timeout = options.timeout || this.timeout;
	options.headers = options.headers || {};
	options.expect && (options.headers['Expect'] = '100-Continue');
	options.path = options.path || '/';
	options.query && (options.path += '?' + qs.stringify(options.query));

	if (body) {
		if (typeof body == 'object') {
			try {
				data = JSON.stringify(body);
				data = Buffer(data);

				options.headers['Content-Type'] = 'application/json';
				(!options.headers['Accept']) && (options.headers['Accept'] = 'application/json');
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

	if (options.timeout) {
		var id = setTimeout(function() {
			clearTimeout(id);
			callback('timeout error!');
		}, options.timeout);
	}

	var req = this.protocol.request(options);

	req.on('error', function(err) {
		clearTimeout(id);

		callback(err);
	});

	req.on('response', function(res) {
		clearTimeout(id);
		
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

		(!options.expect) && (function() {
			req.write(data);
			req.end();
		})();
	} else {
		req.end();
	}

	return this;
};

Request.prototype.get = function(host, path, options, callback) {
	if (typeof options == 'function') {
		callback = options;
		options = {};
	}

	options.host = host;
	options.path = path;
	options.method = 'GET';
	this.request(options, null, callback);

	return this;
};

Request.prototype.post = function(host, path, body, options, callback) {
	if (typeof options == 'function') {
		callback = options;
		options = {};
	}

	options.host = host;
	options.path = path;
	options.method = 'POST';
	this.request(options, body, callback);

	return this;
};

module.exports = Request;