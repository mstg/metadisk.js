var metadisk = require('../lib/index.js');

// You can use metadisk.accounts.token.new too
// .create is alias for .new
metadisk.accounts.token.create(function(err, token) {
	if (err)
		return console.log(err);

	console.log(token);
});

// For another example, check balance.js file