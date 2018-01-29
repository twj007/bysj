
var debug = require('debug')('app');
var cluster = require('express-cluster');

const port = 3000;

// app.listen(port || 3000, function(){
// 	console.log('node server running at port 3000');
// });
// 在生产和开发阶段皆有用（可以分模块）
process.env.NODE_ENV = 'all'
//分线程执行
cluster(function() {
	var app = require('../app');
	app.set('port', port || 3000);

	var server = app.listen(port || 3000, function(){
		console.log('node server is running at port:' + port || 3000);
	})
});
