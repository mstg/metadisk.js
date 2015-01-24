metadisk.js
===========

Metadisk node wrapper

[![ReviewNinja](http://app.review.ninja/assets/images/wereviewninja-32.png)](http://app.review.ninja/mstg/metadisk.js)

### Installation
#### NPM
```
npm install metadisk
```

#### Git
```
git clone https://github.com/switchpwn/metadisk.js
npm install
```

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

How to authenticate with your secret key
```
	var metadisk = require('metadisk')

	metadisk.SECRET_KEY = 'secret_key'
```

For more examples, check [Examples](https://github.com/switchpwn/metadisk.js/tree/master/examples).
