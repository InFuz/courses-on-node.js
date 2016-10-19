'use strict';

var net = require('net');
var stream = require('stream');
var curData;

class myStream extends stream.Transform {
	constructor (options) {
		super(options);
	}

	_transform(buf, encoding, cb) {
		if (curData) {
			var data = JSON.parse(curData.toString());
			var def = [data[0], 'answer', buf.toString()];

			cb(null, JSON.stringify(def));
			curData = null;
		} else {
			cb(null, null);
		}
	}
}

var conn = net.createConnection(8088, () => {
	console.log('### Connect');

	conn.on('data', func);

	function func (data) {
		if (!curData) {
			curData = data;
			question();
		} else {
			setTimeout(() => func(data), 100);
		}
	}

	function question() {
		var data = JSON.parse(curData.toString());
		console.log('');
		console.log(data[2]);
	}

	var c = new myStream({});
	process.stdin.pipe(c).pipe(conn);
});
