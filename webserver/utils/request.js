/*!
 * request
 * @author ydr.me
 * @create 2015-04-29 18:36
 */


'use strict';

var request = require('ydr-utils').request;
var dato = require('ydr-utils').dato;
var httpStatus = require('ydr-utils').httpStatus;
var configs = require('../../configs.js');
var defaults = {
    api: 'dangkrServer',
    method: 'post',
    parse: false,
    headers: {
        'content-type': 'application/json; charset=UTF-8'
    }
};
var REG_HTTP = /^https?:\/\//;
var doRequest = function (options, callback) {
    options = dato.extend({}, defaults, options);

    if (!REG_HTTP.test(options.url)) {
        options.url = configs.api[options.api] + options.url;
    }

    request[options.method.toLowerCase()](options, function (err, body, res) {
        console.log('\n\n\n===================================');
        console.log(this.options.method, this.options.url);
        console.log('[request headers]\n', this.options.headers);
        console.log('[request query]\n', options.query);
        console.log('[request body]\n', options.body);

        if (err) {
            return callback(err);
        }

        console.log('[response headers]\n', res.headers);
        console.log('[response body]\n', body);

        if (res.statusCode !== 200) {
            return callback(new Error('接口：' + httpStatus.get(res.statusCode)));
        }

        // 1MB
        if (res.headers['content-length'] > configs.maxLength) {
            return callback(new Error('返回数据长度超过了 ' + configs.maxLength + ' 字节'));
        }

        if (options.parse === true) {
            return exports.parseRet([err, body], callback);
        }

        callback(err, body, res);
    });
};


exports.post = function (options, callback) {
    options.method = 'post';
    doRequest(options, callback);
};


exports.get = function (options, callback) {
    options.method = 'get';
    doRequest(options, callback);
};


/**
 * 解析响应数据
 * @param args
 * @param callback
 * @returns {*}
 */
exports.parseRet = function (args, callback) {
    var err = args[0];
    var ret = args[1];

    if (err) {
        return callback(err);
    }

    var json;

    try {
        json = JSON.parse(ret);
    } catch (ex) {
        err = new Error('数据解析失败');
    }

    if (err) {
        return callback(err);
    }

    if (json.code !== 200) {
        err = new Error(json.message || '未知错误');
        return callback(err);
    }

    return callback(err, json.result);
};
