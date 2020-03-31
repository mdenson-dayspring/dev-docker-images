"use strict";
exports.__esModule = true;
var path = require("path");
var helpers_1 = require("./helpers");
// setup router for admin to serve admin app
exports.setupAdminRouter = function (express) {
    var router = express.Router();
    var rootPath = path.join(__dirname, 'apps/admin');
    var config = {
        layout: false,
        google_places_api_key: process.env.GOOGLE_PLACES_API_KEY,
        production: process.env.PRODUCTION,
        auth0_clientID: process.env.AUTH0_ADMIN_CLIENTID,
        auth0_domain: process.env.AUTH0_DOMAIN,
        auth0_audience: process.env.AUTH0_AUDIENCE,
        heroku_base: process.env.HEROKU_BASE,
        helpers: {
            scriptTag: function (file) { return helpers_1.scriptTag(file, rootPath); },
            styleTag: function (file) { return helpers_1.styleTag(file, rootPath); }
        }
    };
    var staticCachingRule = helpers_1.getStaticCachingRule();
    router.use(express.static(rootPath, staticCachingRule));
    router.get('/*', function (req, res) {
        res.render('admin', config);
        res.set(helpers_1.getHandlebarCachingHeaders());
    });
    return router;
};
