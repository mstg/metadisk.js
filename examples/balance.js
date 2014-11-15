var metadisk = require('../lib/index.js'),
	access_token;

metadisk.accounts.token.new(function(err, accesstoken) {
	if (err)
		return console.log(err);
	
	access_token = accesstoken;
});

metadisk.accounts.token.balance(access_token, function(err, balance) {
	if (err)
		return console.log(err);

	console.log(balance);
});