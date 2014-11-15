var metadisk = require('../lib/index.js')

metadisk.accounts.token.new(function(err, token) {
	if (err)
		return console.log(err);

	console.log(token);
});

// For another example, check balance.js file