'use strict';

const fs = require('fs');
const app = require('express')();

app.get('/', (req, res, nest) => {
	var data;
	var readStream = fs.ReadStream('./frontend/dist/index.html');
	readStream.pipe(res);
});

module.exports = app;