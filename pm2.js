/**
 * 运维更新启动
 * @author ydr.me
 * @create 2015-08-12 13:31:43
 * @update 2015年12月08日18:19:34
 * @update 2015-12-14 11:30:14
 */

'use strict';

var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');

var pkg = require('./package.json');
var configs = require('./configs.js');

var NODE_MODULES = 'node_modules';
var INSTALL_MODULES = 'npm install --registry=http://registry.npm.taobao.org';
var CWD = path.join(__dirname, './');
var PM2_LOG = 'pm2.log';
var pm2PackageDir = path.join(__dirname, NODE_MODULES, 'pm2');
var appConfig = {
    name: pkg.name,
    cwd: CWD,
    script: path.join(CWD, './app.js'),
    log_date_format: '',
    log_file: path.join(CWD, 'logs', PM2_LOG),
    error_file: path.join(CWD, 'logs', 'error.log'),
    out_file: path.join(CWD, 'logs', PM2_LOG),
    pid_file: path.join(CWD, 'logs', 'pm2.pid'),
    merge_logs: true,
    instances: 1,
    max_restarts: 2,
    max_memory_restart: '200M',
    exec_mode: 'fork',
    env: {
        ENVIRONMENT: configs.env,
        NODE_ENV: configs.env
    }
};

/**
 * 检查目录是否为目录
 * @param dir
 * @returns {boolean}
 */
var isDirectory = function (dir) {
    var stat;

    try {
        stat = fs.statSync(dir);
    } catch (err) {
        return false;
    }

    return stat.isDirectory();
};


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



// npm install
var npmInstall = function (callback) {
    var cmds = [];

    cmds.push('cd ' + CWD);
    cmds.push(INSTALL_MODULES);

    exec(cmds, callback);
};


var start = function () {
    var pm2 = require('pm2');
    var howdo = require('howdo');
    var dato = require('ydr-utils').dato;
    var date = require('ydr-utils').date;
    var debug = require('ydr-utils').debug;

    var isRestart = false;
    var pm2Id = -1;


    // git pull
    var gitPull = function (callback) {
        var cmds = [];

        cmds.push('cd ' + CWD);
        cmds.push('git branch');
        cmds.push('git pull');

        exec(cmds, callback);
    };


    // pm2 list && pm2 reload
    var pm2Reload = function (callback) {
        pm2.list(function (err, list) {
            if (err) {
                return callback(err);
            }

            dato.each(list, function (index, item) {
                if (item.name === pkg.name) {
                    pm2Id = item.pm_id;
                    return false;
                }
            });

            isRestart = pm2Id > -1;

            if (pm2Id > -1) {
                pm2.reload(pkg.name, function () {
                    callback();
                });
            } else {
                pm2.start(appConfig , function () {
                    callback();
                });
            }
        });
    };


    howdo
    // 更新代码
        .task(function (next) {
            console.log('');
            console.log('');
            console.log('================================================');
            console.log('nodejs environment:', configs.env);
            console.log('nodejs project:', pkg.name + '@' + pkg.version);
            console.log('project home:', CWD);
            console.log('================================================');
            console.log('');
            console.log('');

            debug.primary('1/3', 'update project');
            gitPull(function () {
                console.log('\x1b[32m', date.format('YYYY-MM-DD HH:mm:ss'), 'update project success', '\x1b[0m');
                next();
            });
        })
        .task(function (next) {
            debug.primary('2/3', 'update modules');
            npmInstall(function () {
                console.log('\x1b[32m', date.format('YYYY-MM-DD HH:mm:ss'), 'update modules success\n\n', '\x1b[0m');
                next();
            });
        })
        // 连接 pm2
        .task(pm2.connect)
        .task(function (next) {
            debug.primary('3/3', 'reload/start project');
            next();
        })
        // 实际操作
        .task(pm2Reload)
        // 断开 pm2
        .task(pm2.disconnect)
        // 异步串行
        .follow()
        .try(function () {
            console.log('\x1b[32m', date.format('YYYY-MM-DD HH:mm:ss'), isRestart ? 'reload' : 'start', 'success  \n', '\x1b[0m');
            setTimeout(function () {
                exec('pm2 desc ' + pkg.name);
            }, 1000);
        })
        .catch(function (err) {
            console.log('\x1b[31m', date.format('YYYY-MM-DD HH:mm:ss'), isRestart ? 'reload' : 'start', 'error  \n', '\x1b[0m');
            console.log(err.message);
            process.exit(1);
        });
};


// 已经存在目录
if (isDirectory(pm2PackageDir)) {
    start();
}
// 不存在
else {
    console.log('ready to install node modules...');
    console.log(JSON.stringify(pkg.dependencies, null, 4));
    npmInstall(start);
}




