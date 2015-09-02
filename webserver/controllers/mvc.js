/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-09-02 17:30
 */


'use strict';

var fs = require('fs-extra');
var path = require('ydr-utils').path;
var cache = require('ydr-utils').cache;
var marked = require('marked');

module.exports = function () {
    var configs = cache.get('app.configs');
    var book = configs.bookPath;
    var summary = fs.readFileSync(path.join(book, 'summary.md'));
    var tokens = marked.lexer(summary);

    tokens.forEach(function (token) {
        if(token.type !== 'heading'){
            return;
        }

        console.log(token);
    });
};


