var request = require('request'),
	fs = require('fs');

// Nodelist
// node1.metadisk.org
// node2.metadisk.org
// node3.metadisk.org

var NODES = [
	"http://node1.metadisk.org",
	"http://node2.metadisk.org",
	"http://node3.metadisk.org"
];

var accounts = {};
accounts.token = {};

var api = {};

exports.SECRET_KEY = "000";

// Token API
// Public
// POST /accounts/token/new
// Parameters: None
tries = 0;
accounts.token.new = function self(callback) {
	request.post({url:NODES[tries] + "/accounts/token/new", form: {}}, function(err, response, body){
		if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(callback);
			return;
		}

		switch (response.statusCode) {
			case 200:
				return callback(null, JSON.parse(body).token);
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});
}

// GET /accounts/token/prices
// Parameters: None
tries = 0;
accounts.token.prices = function self(callback) {
	request(NODES[tries] + "/accounts/token/prices", function (err, response, body) {
	  if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(callback);
			return;
		}

		switch (response.statusCode) {
			case 200:
				return callback(null, JSON.parse(body).prices);
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});
}

// GET /accounts/token/balance/<access_token>
// Parameters: None
tries = 0;
accounts.token.balance = function self(token, callback) {
	request(NODES[tries] + "/accounts/token/balance/" + token, function (err, response, body) {
	  if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(token, callback);
			return;
		}

		switch (response.statusCode) {
			case 200:
				return callback(null, JSON.parse(body).balance);
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});
}

// Private
// POST /accounts/token/deposit/<access_token>
// Parameters:
// - bytes
//
// Headers:
// - Authentication: <SECRET_KEY>
tries = 0;
accounts.token.deposit = function self(token, bytes, callback) {
	var options = {
    headers: {
        'SECRET_KEY': this.SECRET_KEY
    }
	};

	request.post({options: options, url:NODES[tries] + "/accounts/token/deposit" + token, form: {bytes: bytes}}, function(err, response, body){
		if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(token, bytes, callback);
			return;
		}

		switch (response.statusCode) {
			case 200:
				return callback(null, JSON.parse(body).status);
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});
}

// POST /accounts/token/withdraw/<access_token>
// Parameters:
// - bytes
//
// Headers:
// - Authentication: <SECRET_KEY>
tries = 0;
accounts.token.withdraw = function self(token, bytes, callback) {
	var options = {
    headers: {
        'SECRET_KEY': this.SECRET_KEY
    }
	};

	request.post({options: options, url:NODES[tries] + "/accounts/token/withdraw" + token, form: {bytes: bytes}}, function(err, response, body){
		if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(token, bytes, callback);
			return;
		}

		switch (response.statusCode) {
			case 200:
				return callback(null, JSON.parse(body).status);
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});
}
exports.accounts = accounts;

// Public API
// POST /api/upload
// Parameters:
// - file
tries = 0;
api.upload = function self(filepath, filename, callback) {
	var r = request.post({url:NODES[tries] + "/api/upload"}, function (err, response, body) {
	  if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(filepath, filename, callback);
			return;
		}

		switch (response.statusCode) {
			case 201:
				var parsed = JSON.parse(body);
				var content = {}
				content.filehash = parsed.filehash;
				content.key = parsed.key;
				content.url = NODES[tries] + "/api/download/" + parsed.filehash + "?key=" + parsed.key;

				return callback(null, content);
				break;
			case 400:
				console.log("Bad request. Probably provided data is not file");
				return callback(err, null);
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});

	var form = r.form();
	form.append('file', fs.createReadStream(filepath), {filename: filename});
}

// GET /api/download/<filehash>
// Parameters:
// - filehash
tries = 0;
api.download = function self(filehash, key, local, callback) {
	request(NODES[tries] + "/api/download/" + filehash + "?key=" + key, function (err, response, body) {
	  if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(filehash, key, local, callback);
			return;
		}

		switch (response.statusCode) {
			case 200:
				request(NODES[tries] + "/api/download/" + filehash + "?key=" + key).pipe(fs.createWriteStream(local))

				return callback(null, "File downloaded");
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});
}

// GET /api/find/<filehash>
// Parameters:
// - filehash
tries = 0;
api.find = function self(filehash, key, callback) {
	request(NODES[tries] + "/api/find/" + filehash + "?key=" + key, function (err, response, body) {
	  if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(filehash, key, callback);
			return;
		}

		switch (response.statusCode) {
			case 200:
				var body = JSON.parse(body);

				return callback(null, body);
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});
}

// GET /api/status
// Parameters: None
tries = 0;
api.status = function self(callback) {
	request(NODES[tries] + "/api/status", function (err, response, body) {
	  if (err && tries >= NODES.length) {
			return callback(err, null);
		}

		if (typeof response == 'undefined') {
			console.log("Node is offline. Retrying with another node");
			tries++
			self(callback);
			return;
		}

		switch (response.statusCode) {
			case 200:
				var body = JSON.parse(body);
				return callback(null, body);
				break;
			case 404:
				var body = JSON.parse(body);

				return callback(body.error, null);
				break;
		}
	});
}
exports.api = api;