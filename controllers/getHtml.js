'use strict';

const fs = require('fs');
const express = require('express');
const app = express();

app.get('/', (req, res, nest) => {
	var data;
	var readStream = fs.ReadStream('./public/index.html');
	
	readStream
	.on('readable', () => {
		let buf = readStream.read();
		if (buf) {
			data = buf;
		}
	})
	.on('end', () => {
		res.send(data.toString());
	})
	.on('error', (err) => {
		console.log(err);
		res.send('Error!');
	});
});


module.exports = app;