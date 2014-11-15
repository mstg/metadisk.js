var metadisk = require('../lib/index.js'),
	filehash = "439b1e6962c1bd50fe63502c18c788ea4ff4b70f1de8fb4e2f34554a8b1b2618",
	key = "0f4197a527cf3cf3b1de410968273a13122ac4ebadf79b4dec3547d942f42c90";

metadisk.api.find(filehash, key, function(err, body) {
	if (err)
		return console.log(err);

	console.log(body);
});