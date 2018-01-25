var studyNode = new Buffer('node.js你太难学习了');
console.log(studyNode.length);
var len = new Buffer(50)
console.log('定义buffer长度：' + len.length);
console.log('输出为初始化的buffer元素，该为初始化的元素值0-225的随机数：1随机数' + len[5] + "，2随机数:" + len[5]);

//Buffer 转换有6种编码类型,默认UFT-8
var bufWrite = new Buffer(100)
console.log('write写入,返回写入的长度:' + bufWrite.write('美丽的node', 'UTF-8'))
console.log(bufWrite.length)

//buffer转字符串 默认UTF-8
var transform = new Buffer('buffer转字符串')
console.log(transform.toString());

//buffer拼接 正常拼接
var fs = require('fs');
var rs = fs.createReadStream('./text.txt', {
	// highWaterMark: 11
});
var data = "";
rs.on("data", (chunk) => {
	data += chunk;
})
rs.on("end", () => {
	console.log(data)
})

//限制读取buffer长度
var fs2 = fs.createReadStream("./text.txt", {
	highWaterMark: 11
});
fs2.setEncoding('UTF-8')
var data2 = ""
fs2.on("data", (chunk) => {
	data2 += chunk;
});
fs2.on("end", () => {
	console.log('限制读取buffer长度:', data2, '\r\n')
})
if (Buffer.concat) {
	console.log(982)
}

//iconv-lite 转码拼接
var iconv = require('iconv-lite');
var chunks = [];
var size = 0;
var fs3 = fs.createReadStream("./text.txt", {
	highWaterMark: 11
});
fs3.on('data', (chunk) => {
	chunks.push(chunk)
	size += chunk.length;
});
fs3.on("end", () => {
	var buf = Buffer.concat(chunks)
	var str = iconv.decode(buf, 'UTF-8');
	console.log("iconv:", str)
})