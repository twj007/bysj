
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var favicon = require('serve-favicon');
var path = require('path');
var app = express();
var template = require('express-art-template');
var glob = require('glob');
var cors = require('cors');
var config = require('./service/const/constModule');
// console.log(config);
var originUrl = 'http://' + config.vue.vueURL + ':' + config.vue.port;
var request = require('request');
var async = require('async');

// art-template设置
app.set('views', path.join(__dirname));
app.engine('html', template);
app.set('view options', {
	debug: process.env.NODE_ENV !== 'production'
});

//console.log('origin:' + originUrl);
// console.log(app);
// app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser('new'));
app.use(express.static(path.join(__dirname, 'public')));


//用来解决跨域问题(这边是跨端口的域)，接收来自vue的请求, credentials配置cookie共享---》默认false
app.use(cors({
	origin: [originUrl],
	preflightContinue: false,
	credentials: true
}));

//批量导入node的组件
var controllers = glob.sync('./service/common/*.js');
controllers.forEach(function (controller){
  require(controller)(app);
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("500");
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
