'use strict';

var net = require('net');

var conn = net.createConnection(8088, () => {
	console.log('### Connect');

	process.stdin.pipe(conn);
	conn.pipe(process.stdout);
});