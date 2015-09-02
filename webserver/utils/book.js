/*!
 * book
 * @author ydr.me
 * @create 2015-09-02 17:30
 */


'use strict';

var fs = require('fs-extra');
var path = require('ydr-utils').path;
var cache = require('ydr-utils').cache;
var marked = require('marked');
var REG_LINK = /]\((.*?)\)\s*?$/;

module.exports = function (bookroot) {
    var configs = cache.get('app.configs');
    var summaryCode = fs.readFileSync(path.join(bookroot, 'summary.md'), 'utf8');
    var summaryTokens = marked.lexer(summaryCode);
    var summaryFiles = [];
    var summaryLevel = [];

    summaryTokens.forEach(function (token) {
        if(token.type ==='text'){
            var file = token.text.match(REG_LINK)[1];

            file = path.join(bookroot, file);
            summaryFiles.push(file);
        }
    });
};


