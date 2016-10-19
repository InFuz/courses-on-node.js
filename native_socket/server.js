'use strict';

var net = require('net');
var stream = require('stream');

var id = 0;

class myStream extends stream.Transform {
	constructor (options) {
		super(options);
	}

	_transform(buf, encoding, cb) {
		buf = JSON.stringify([id++, 'question', buf.toString()]);

		cb(null, buf);
	}
}

var server = net.createServer((conn) => {
	console.log('### Connect');
	var lastChunk = '';

	conn.on('data', (chunk) => {
		console.log('');
		console.log('### Data');
		if (!chunk.length) return;
		
		console.log(chunk.toString());
	});

	var o = new myStream({});

	process.stdin.pipe(o).pipe(conn);
});

server.listen(8088, () => {
	console.log('### Start');
});