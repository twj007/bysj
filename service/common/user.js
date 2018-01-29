var express = require('express');
var router = express.Router();
var commonRequest = require('../utils/commonRequest');
var config = require('../const/constModule');
var javaURL = "http://" + config.java.javaURL + ":" + config.java.port;
var aes = require('../../static/lib/aes-ctr.js');
var accessKey = config.accessKey;
router.get('/ajax', function(req, res){
  console.log(req);
  res.sendSatus(200);
});
router.post('/login', function(req, res){
  // commonRequest.commonRequest(javaURL+'/user/login', 'POST', 'POST', req, res, function(data){
  //   res.send(data);
  // });
  console.log(req.body);
  var params = req.body.login;
  if(params){
    var password = aes.decrypt(params.password, accessKey);
    console.log(password);
    //
    var data = {retCode: 400, message: "登陆失败"};
    res.send(data);
  }

});

router.post('/register', function(req, res){
  commonRequest.commonRequest(javaURL+'/user/register', 'POST', 'POST', req, res, function(data){
    res.send(data);
  });
});

router.post('/alterInfo', function(req, res){
  commonRequest.commonRequest(javaURL+'/user/alterInfo', 'POST', 'POST', req, res, function(data){
    res.send(data);
  });
});

router.post('findLost', function(req, res){
  commonRequest.commonRequest(javaURL+'/user/findLost', 'POST', 'POST', req, res, function(data){
    res.send(data);
  });
});

module.exports = function(app){
  app.use('/user', router);
};
