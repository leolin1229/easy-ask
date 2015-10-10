var http = require('http'),
	qs = require('querystring');

function Request(options, body) {
	options = options || {};

	options.host = options.host || options.hostname || 'localhost';
	options.path = options.path || '/';
	options.port = options.port || 80;
	options.timeout = options.timeout || 15000;
	options.method = options.method ? options.method.toUpperCase() : 'GET';

	return new Promise(function(resolve, reject) {
		request(resolve, reject, options, body);
	});
}

function request(resolve, reject, options, body) {
	var data = null;

	options.headers = options.headers || {};
	options.expect && (options.headers['Expect'] = '100-Continue');
	options.query && (options.path += '?' + qs.stringify(options.query));

	if (body) {
		if (typeof body == 'object') {
			try {
				data = JSON.stringify(body);
				data = Buffer(data, null, 2);

				options.headers['Content-Type'] = 'application/json';
				(!options.headers['Accept']) && (options.headers['Accept'] = 'application/json,text/plain');
			} catch(e) {
				console.error(e);
				return ;
			}
		} else {
			data = Buffer(data + '');
			options.headers['Content-Type'] = 'text/plain';
		}

		options.headers['Content-Length'] = data.length;
	}

	var req = http.request(options);

	if (options.timeout && options.timeout > 0) {
		req.on('socket', function(socket) {
			socket.setTimeout(options.timeout);
			socket.on('timeout', function() {
				req.abort();
				reject('Error: timeout');
			});
		});
	}

	req.on('error', function(err) {
		reject(err);
	});

	req.on('abort', function() {
		reject('Error: The request was aborted!');
	});

	req.on('response', function(res) {
		res.setEncoding('utf8');

		res.data = '';
		res.on('data', function(d) {
			res.data += d.toString('utf8');
		});

		res.on('end', function() {
			try {
				res.body = JSON.parse(res.data);
			} catch(e) {
				console.error(e);
				return ;
			};
			resolve(res.data);
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
};

module.exports = Request;