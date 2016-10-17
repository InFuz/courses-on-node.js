'use strict';

const fs = require('fs');
const express = require('express');
const app = express();

app.get('/', (req, res, nest) => {
	var data;
	var readStream = fs.ReadStream('./frontend/dist/index.html');
	readStream.pipe(res);
});


module.exports = app;