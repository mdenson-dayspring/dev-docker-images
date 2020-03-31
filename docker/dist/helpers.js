"use strict";
exports.__esModule = true;
var path = require("path");
var glob = require("glob");
// If an incoming request uses a protocol other than HTTPS, redirect that request to the same url but with HTTPS
exports.forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        next();
    };
};
// helpers to make get the correct name of styles and scripts based by
//  by getting a directory of the file name to find the actual name with
//  cache busting hash in the name
var filenamePaths = function (fileglob) {
    try {
        var files = glob.sync(fileglob);
        if (files && files.length > 0) {
            return files.map(function (file) { return path.basename(file); });
        }
        else {
            return undefined;
        }
    }
    catch (err) {
        return undefined;
    }
};
exports.scriptTag = function (file, rootPath) {
    var filenames = filenamePaths(rootPath + '/' + file + '*.js');
    if (filenames && filenames.length > 0) {
        return filenames.reduce(function (acc, filename) {
            var es5RegExp = new RegExp('\\-es5\\.');
            var moduleOrNoModule = es5RegExp.test(filename)
                ? 'nomodule'
                : 'type="module"';
            return (acc +
                '<script type="text/javascript" src="' +
                filename +
                '" ' +
                moduleOrNoModule +
                '></script>');
        }, '');
    }
    else {
        return '';
    }
};
exports.styleTag = function (file, rootPath) {
    var filenames = filenamePaths(rootPath + '/' + file + '*.css');
    if (filenames && filenames.length > 0) {
        return filenames.reduce(function (acc, filename) {
            return acc + '<link rel="stylesheet" href="' + filename + '">';
        }, '');
    }
    else {
        return '';
    }
};
exports.getStaticCachingRule = function () {
    if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'herokudev') {
        return {};
    }
    else {
        return { maxAge: '30 days' };
    }
};
exports.getHandlebarCachingHeaders = function () {
    if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'herokudev') {
        return {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: 0
        };
    }
    else {
        return {
            'Cache-Control': 'max-age=60',
            Expires: new Date(Date.now() + 60).toUTCString()
        };
    }
};
