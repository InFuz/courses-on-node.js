console.log('123');

process.on('message', (message) => {
	console.log(message);
	process.send('hello');
});