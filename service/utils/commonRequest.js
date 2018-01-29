/**
 * 通用request
 */
var express = require('express');
var request = require('request');
var async = require('async');

//单个request请求Java后台
var commonRequest = function (url, nodeReqType, javaReqType, req, res, fn) {
  var headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params = req.body;

  if (token) {
    headers.access_token = token;
  }

  if (nodeReqType == 'GET') {
    params = req.query;
  }

  async.parallel({
    data: function (done) {
      var options = {
        method: javaReqType,
        url: url,
        headers: headers,
        form: params
      };
      request(options, function (err, response, body) {
        if (!err) {
          done(null, body);
        } else {
          done(err, null);
        }
      });
    }
  }, function (error, result) {
    if (!error) {
      fn(JSON.parse(result.data));
    } else {
      res.send(error.message);
    }
  });
};


exports.commonRequest = commonRequest;
