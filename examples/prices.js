var metadisk = require('../lib/index.js');

metadisk.accounts.token.prices(function(err, prices) {
	if (err)
		return console.log(err);

	console.log(prices);
});