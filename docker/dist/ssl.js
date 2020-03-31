"use strict";
exports.__esModule = true;
// If an incoming request uses a protocol other than HTTPS, redirect that request to the same url but with HTTPS
exports.forceSSL = function () {
    return function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        next();
    };
};
