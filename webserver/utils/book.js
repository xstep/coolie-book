/*!
 * book
 * @author ydr.me
 * @create 2015-09-02 17:30
 */


'use strict';

var fse = require('fs-extra');
var path = require('ydr-utils').path;
var cache = require('ydr-utils').cache;
var dato = require('ydr-utils').dato;
var xss = require('ydr-utils').xss;
var marked = require('marked');
var REG_TEXT_LINK = /^\[([^\]]*)]\((.*?)\)?$/;
var REG_MD = /\/(index|readme)\.md$/i;
var REG_EXTEND = /\.md$/i;


/**
 * 获取文件
 * @param bookroot
 * @returns {Object}
 */
var getFiles = function (bookroot) {
    var configs = cache.get('app.configs');
    var summaryCode = fse.readFileSync(path.join(bookroot, 'summary.md'), 'utf8');
    var summaryTokens = marked.lexer(summaryCode);
    var summaryFiles = [];

    summaryTokens.forEach(function (token) {
        if (token.type === 'text') {
            var matches = token.text.match(REG_TEXT_LINK);

            if (!matches) {
                return;
            }

            var file = matches[2];

            file = path.join(bookroot, file);
            summaryFiles.push(file);
        }
    });

    return {
        files: summaryFiles,
        code: summaryCode
    };
};


var REG_HREF = /<a([^>]*?)\shref="(.*?)">/g;
/**
 * 修正 a href
 * @param content
 * @returns {string|void|XML}
 */
var fixHref = function (content) {
    return content.replace(REG_HREF, function (source, prev, href) {
        return '<a' + prev + ' href="' +
            href
                .replace(REG_MD, '/')
                .replace(REG_EXTEND, '') +
            '">';
    });
};


/**
 * 构建路由
 * @param app
 * @param controller
 * @param bookroot
 */
exports.buildRouters = function (app, controller, bookroot) {
    var ret = getFiles(bookroot);
    var summaryFiles = ret.files;
    var summaryCode = ret.code;
    var data = fse.readJsonSync(path.join(bookroot, './data.json'));
    var indexFile = path.join(bookroot, './readme.md');
    var indexCode = fse.readFileSync(indexFile, 'utf8');
    var indexContent = xss.mdRender(indexCode, {
        headingLink: true
    }).html;

    indexContent = fixHref(indexContent);
    var summaryContent = xss.mdRender(summaryCode, {
        at: false,
        favicon: false,
        headingLink: false
    }).html;
    summaryContent = fixHref(summaryContent);
    app.get('/', controller('/', dato.extend({
        sidebar: summaryContent,
        content: indexContent
    }, data)));
    summaryFiles.forEach(function (file) {
        var uri = path.relative(bookroot, file);
        var content = fse.readFileSync(file, 'utf8');

        uri = path.join('/', uri);
        uri = path.toURI(uri);
        uri = uri
            .replace(REG_MD, '/')
            .replace(REG_EXTEND, '');
        content = xss.mdRender(content).html;
        content = fixHref(content);

        console.log(uri);
        app.get(uri, controller(uri, dato.extend({
            sidebar: summaryContent,
            content: content
        }, data)));
    });
};


