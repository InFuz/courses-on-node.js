'use strict';

var net = require('net');
var stream = require('stream');

class myStream extends stream.Duplex {
	constructor (options) {
		super(options);
		this.buffer = new Buffer();
	}

	_read(size) {
		var buf = this.buffer.slice(0, size);
		this.buffer = this.buffer.slice(size);

		if (buf.length) {
			this.push(buf);
		}
	}

	_write(buf, encoding, cb) {
		this.buffer = Buffer.concat([this.buffer, buf]);
		this._read(buf.length);
		cb();
	}

	
}

var server = net.createServer((conn) => {
	console.log('### Connect');
	var lastChunk = '';

	conn.on('data', (chunk) => {
		console.log('### Data');
		chunk = chunk.toString();
		chunk = lastChunk + chunk;
		chunk = chunk.split('\n');
		lastChunk = chunk.pop();

		if (!chunk.length) return;
	});

	conn.on('disconnect', () => {
		console.log('### Disconnect');
	});

	conn.pipe(process.stdout);
	process.stdin.pipe(conn);
});

server.listen(8088, () => {
	console.log('### Start');
});