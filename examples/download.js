var metadisk = require('../lib/index.js'),
	filehash = "1ae3448236d5d803f8d9332a6422001d821a82c7555df6c5aaaac58626c8b2f5",
	key = "6e0ced7ee29f5bf4cec792f3aff17b19596332b4da017575400a2808f4a55382";

metadisk.api.download(filehash, key, "./files/testfile2", function(err, body) {
	if (err)
		return console.log(err);

	console.log(body);
});