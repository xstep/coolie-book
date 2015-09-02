/*!
 * book
 * @author ydr.me
 * @create 2015-09-02 17:30
 */


'use strict';

var fse = require('fs-extra');
var path = require('ydr-utils').path;
var cache = require('ydr-utils').cache;
var marked = require('marked');
var REG_LINK = /]\((.*?)\)\s*?$/;
var markedRender = new marked.Renderer();
marked.setOptions({renderer: markedRender});


/**
 * 获取文件
 * @param bookroot
 * @returns {Array}
 */
exports.getFiles = function (bookroot) {
    var configs = cache.get('app.configs');
    var summaryCode = fse.readFileSync(path.join(bookroot, 'summary.md'), 'utf8');
    var summaryTokens = marked.lexer(summaryCode);
    var summaryFiles = [];

    summaryTokens.forEach(function (token) {
        if (token.type === 'text') {
            var file = token.text.match(REG_LINK)[1];

            file = path.join(bookroot, file);
            summaryFiles.push(file);
        }
    });

    return summaryFiles;
};


/**
 * 构建路由
 * @param app
 * @param controller
 * @param bookroot
 */
exports.buildRouters = function (app, controller, bookroot) {
    var files = exports.getFiles(bookroot);

    files.forEach(function (file) {
        var uri = path.relative(bookroot, file);
        var content = fse.readFileSync(file, 'utf8');

        uri = path.join('/', uri);
        uri = path.toURI(uri);
        content = marked(content);
        app.get(uri, controller(uri, content));
    });
};


