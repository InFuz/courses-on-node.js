'use strict';

const fs = require('fs');
const express = require('express');
const app = express();

app.get('/', (req, res, nest) => {
	var data;
	var readStream = fs.ReadStream('./public/index.html');
	readStream.pipe(res);
});


module.exports = app;