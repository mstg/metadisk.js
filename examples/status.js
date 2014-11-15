var metadisk = require('../lib/index.js');

metadisk.api.status(function(err, body) {
	if (err)
		return console.log(err);

	console.log(body);
});