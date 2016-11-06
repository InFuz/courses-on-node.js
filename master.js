var cluster = require('cluster');

cluster.setupMaster({
	exec: './child.js'
})

if (cluster.isMaster) {

	var childs = [];

	for (var i = 0; i < 5; i++) {
		childs.push(cluster.fork());

		childs[i].on('online', () => {

		});

		childs[i].on('disconnect', () => {

		});

		childs[i].on('message', (data) => {
			console.log(data);
		});

		childs[i].send('message', () => {
		});
	}

} else {
	console.log(process.pid);
}