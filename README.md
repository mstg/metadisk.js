metadisk.js
===========

Metadisk node wrapper

### Examples
Check status
```
	var metadisk = require('metadisk');

	metadisk.api.status(function(err, body) {
		if (err)
			return console.log(err);

		console.log(body);
	});
```

Create new access token
```
	var metadisk = require('metadisk')

	metadisk.accounts.token.new(function(err, token) {
		if (err)
			return console.log(err);

		console.log(token);
	});
```

For more examples, check [Examples](https://github.com/switchpwn/metadisk.js/tree/master/examples).