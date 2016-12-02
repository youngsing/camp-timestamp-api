var express = require("express");
var sugar = require('sugar-date');
var app = express();

app.get('/:timestamp', function (req, res) {
	
	var input = req.params.timestamp;
	var result = {};
	var time = undefined;
	
	if (/^\d*$/.test(input)) {
		time = new sugar.Date(input * 1000).medium().raw;
	} else if (/^[a-zA-Z]+\s(?:[1-9]|[12]\d|3[0-1])\,\s\d{4}$/.test(input)) {
	    time = input;
		input = sugar.Date.format(new sugar.Date.create(input), '{X}');
		if (input === undefined) {
		    time = undefined;
		}
	}
	
	if (time === undefined) {
		result = {
			'unix': null,
			'natural': null
		};
	} else {
		result = {
			'unix': input,
			'natural': time
		};
	}
	
	if (Object.keys(result).length === 0) {
			res.send(404);
	} else {
			res.json(result);
	}
	
	
});

app.listen(8080, function () {
	console.log('Example app listening on port 8080!');
});