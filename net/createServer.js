var net = require("net");
var iconv = require('iconv-lite');
var colors = require('colors');

var server = net.createServer((socket) => {
		// socket.on('data', (data) => {
		// 	console.log('新的链接');
		// 	// socket.write(iconv.encode('新的链接!', 'GBK'))
		// })
		socket.on('end', (data) => {
			console.log('断开链接');
			// socket.write(iconv.encode('server 断开链接', 'GBK'))
		})
		socket.write('欢迎进去TCP222链接!');
		var address = socket.address();
		console.log(("【socket.addres:】" + JSON.stringify(address)).green);
	})
	//listen 异常报错
server.on('error', (err) => {
	console.log(JSON.stringify(err).red)
});
//设置最大连接数
server.maxConnections = 2;
//监听链接数
server.on('connection', (socket) => {
		server.getConnections((err, count) => {
			console.log("当前链接数：", count)
		});
	})
	//close() 当关闭服务器触发，在调用close后，服务器停止接受新的连接，但是会保存当前存在的连接，等所有的连接断开后，会触发该事件
server.on('connection', (socket) => {
	server.close(function() {
		console.log('服务器已经关闭'.red);
	})
})

//socktet对象
var file = require("fs").createWriteStream("./msg.txt");
server.on("connection", (socket) => {
	socket.setEncoding('utf-8')
		//socket.data
	socket.on("data", function(data) {
		console.log(data.toString(), "发送字节：" + socket.bytesRead)
	});

	socket.pipe(file)
})


server.listen(8124, () => {
	console.log('监听8124');
	const address = server.address(); //address方法有在listening事件触发后才能使用
	console.log("监听的服务器：", address)
})

//listen(handle[,backlog<number>,callback<function>]) 句柄对象可以是服务器、套接字（任何具有底层 _handle 成员的东西），也可以是具有 fd 成员的对象，该成员是一个有效的文件描述符。注意：在Windows上不支持在文件描述符上进行监听。

//listen(options[,ballback]) 如果指定了 port 参数，该方法的行为跟 server.listen([port][, hostname][, backlog][, callback]) 一样。否则，如果指定了 path 参数，该方法的行为与 server.listen(path[, backlog][, callback]) 一致。如果没有 port 或者 path 参数，则会跑出一个错误。如果 exclusive 是 false（默认），则集群的所有进程将使用相同的底层句柄，允许共享连接处理任务。如果 exclusive 是 true，则句柄不会被共享，如果尝试端口共享将导致错误。监听独立端口的例子如下。

//listen(path[,backlog<number>,ballback<function>])  启动一个IPC服务器监听给path连接

//listen(port[,host<string>,backlog<number>,callback<function>]) //启动一个IPC服务器监听输入的port和host。如果port为0，系统会随机分配一个在‘listening’事件触发后能被server.address().port检索的无用端口，