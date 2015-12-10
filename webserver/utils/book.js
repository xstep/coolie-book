/**
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
var REG_HASH = /^#/;


/**
 * 获取文件
 * @param bookroot
 * @returns {Object}
 */
var getFiles = function (bookroot) {
    var configs = cache.get('app.configs');
    var indexCode = fse.readFileSync(path.join(bookroot, 'index.md'), 'utf8');
    var indexTokens = marked.lexer(indexCode);
    var indexFiles = [];

    indexTokens.forEach(function (token) {
        if (token.type === 'text') {
            var matches = token.text.match(REG_TEXT_LINK);

            if (!matches) {
                return;
            }

            var name = matches[1];
            var file = matches[2];

            if (REG_HASH.test(file)) {
                return;
            }

            file = path.join(bookroot, file);
            indexFiles.push({
                name: name,
                file: file
            });
        }
    });

    return {
        files: indexFiles,
        code: indexCode
    };
};


var REG_HREF = /<a([^>]*?)\shref="(.*?)">/g;
var REG_HTTP = /^(https?:)?\/\//;
var REG_ABSOLUTE = /^\//;
/**
 * 修正 a href
 * @param content
 * @param [srcFile]
 * @returns {string|void|XML}
 */
var fixHref = function (content, srcFile) {
    var configs = cache.get('app.configs');

    return content.replace(REG_HREF, function (source, prev, href) {
        var attr = '';

        if (srcFile && !REG_HTTP.test(href) && !REG_HASH.test(href)) {
            if (!REG_ABSOLUTE.test(href)) {
                var hrefFile = path.join(path.dirname(srcFile), href);
                var hrefRelative = path.relative(configs.bookroot, hrefFile);

                href = '/' + hrefRelative;
            }

            attr = ' class="j-pjax" ';
        }

        return '<a' + prev + attr + ' href="' +
            href
                .replace(REG_MD, '/')
                .replace(REG_EXTEND, '/') +
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
    var summaryContent = xss.mdRender(summaryCode, {
        at: false,
        favicon: false,
        headingLink: false
    }).html;
    var data = fse.readJsonSync(path.join(bookroot, './data.json'));
    var indexFile = path.join(bookroot, './readme.md');
    var indexCode = fse.readFileSync(indexFile, 'utf8');
    var indexContent = xss.mdRender(indexCode, {
        headingLink: true
    }).html;

    summaryContent = fixHref(summaryContent);
    indexContent = fixHref(indexContent);

    app.get('/', controller('', '/', dato.extend({
        sidebar: summaryContent,
        content: indexContent
    }, data)));
    summaryFiles.forEach(function (item) {
        var name = item.name;
        var file = item.file;

        var uri = path.relative(bookroot, file);
        var content = fse.readFileSync(file, 'utf8');

        uri = path.join('/', uri);
        uri = path.toURI(uri);
        uri = uri
            .replace(REG_MD, '/')
            .replace(REG_EXTEND, '/');
        var toc = xss.mdTOC(content);

        toc = '<div class="toc"><p class="toc-title">TOC</p>' + xss.mdRender(toc, {
                favicon: false,
                at: false,
                headingLink: false
            }).html + '</div>';
        content = xss.mdRender(content, {
            headingLink: true
        }).html;
        content = fixHref(content, file);

        app.get(uri, controller(name, uri, dato.extend({
            sidebar: summaryContent,
            content: toc + content
        }, data)));
    });
};


