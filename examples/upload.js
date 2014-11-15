var metadisk = require('../lib/index.js');

metadisk.api.upload("./files/testfile", "testfile", function(err, body) {
	if (err)
		return console.log(err);

	console.log(body.url);
});