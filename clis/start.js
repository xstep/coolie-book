/**
 * 启动文件
 * @author ydr.me
 * @create 2014-12-02 22:59
 */


'use strict';


var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');

var pkg = require('../package.json');
var configs = require('../configs.js');

var NPM_REGISTRY = 'http://registry.npm.taobao.org';
var ROOT = path.join(__dirname, '../');
var PM2_JSON = path.join(ROOT, 'pm2.json');


/**
 * 执行系统命令
 * @param cmds {Array|String} 命令数组
 * @param [callback] {Function} 执行完毕回调
 */
var exec = function (cmds, callback) {
    cmds = typeof(cmds) === 'string' ? [cmds] : cmds;

    var point = 1;
    process.stdout.write('.');
    var interval = setInterval(function () {
        process.stdout.cursorTo(point);
        process.stdout.write('.');
        point++;
    }, 1000);

    childProcess.exec(cmds.join('&&'), function (err, stdout, stderr) {
        clearInterval(interval);
        process.stdout.clearLine();
        process.stdout.write('\n');

        if (err) {
            console.log(err.message);
            return process.exit(1);
        }

        console.log(stdout);
        console.log(stderr);

        if (typeof callback === 'function') {
            callback();
        }
    });
};


/**
 * 输出当前时间字符串
 * @returns {string}
 */
var now = function () {
    var d = new Date();
    var fix = function (n) {
        return (n < 10 ? '0' : '') + n;
    };

    return ''.concat(
        '[',
        fix(d.getFullYear()),
        '-',
        fix(d.getMonth() + 1),
        '-',
        fix(d.getDate()),
        ' ',
        fix(d.getHours()),
        ':',
        fix(d.getMinutes()),
        ':',
        fix(d.getSeconds()),
        '.',
        fix(d.getMilliseconds()),
        ']'
    );
};


// 本地启动
var startLocal = function (callback) {
    var supervisor = require('supervisor');
    var args = [];

    args.push(__filename);
    args.push('-w');
    args.push('./webserver/,./bookroot/');
    args.push('-e');
    args.push('js,md');
    args.push('app.js');

    supervisor.run(args);
    callback();
};


// pm2 启动
var startPM2 = function (callback) {
    exec([
        'pm2 start ' + PM2_JSON,
        'pm2 show ' + pkg.name
    ], callback);
};


// 更新代码
var gitPull = function (callback) {
    exec('git pull', function () {
        console.log('\x1b[32m', now(), 'git pull success', '\x1b[0m');
        callback();
    });
};


// 更新代码
var installNodeModules = function (callback) {
    exec('npm install --registry=' + NPM_REGISTRY, function () {
        console.log('\x1b[32m', now(), 'install node modules success', '\x1b[0m');
        callback();
    });
};


// 启动
var start = function () {
    var done = function () {
        console.log('\x1b[32m', now(), 'start success', '\x1b[0m');
    };

    if (configs.env === 'local') {
        startLocal(done);
    } else {
        startPM2(done);
    }
};


console.log('');
console.log('');
console.log('=========================================================================');
console.log('nodejs environment:', configs.env);
console.log('nodejs project:', pkg.name + '@' + pkg.version);
console.log('project home:', ROOT);
console.log('=========================================================================');
console.log('');
console.log('');

// 更新代码安装模块并启动
gitPull(function () {
    installNodeModules(function () {
        start();
    });
});
