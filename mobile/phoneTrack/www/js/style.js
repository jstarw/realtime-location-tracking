var socket = io('http://blistering-rottweiler-26-196898.use1-2.nitrousbox.com/');
	socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', { my: 'data' });
});