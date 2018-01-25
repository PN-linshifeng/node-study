//net构造客户链接
var net = require('net');
var client = net.connect({
	port: 8124
}, () => {
	console.log('建立客户端链接');
	client.write('client:建立客户端链接\r\n');
})
client.on('data', (data) => {
	console.log(data.toString());
	client.write('client:断开连接\r\n');
	client.end();
})
client.on('end', (data) => {

	console.log('结束客户端链接');
})