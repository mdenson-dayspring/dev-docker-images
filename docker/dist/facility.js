"use strict";
exports.__esModule = true;
var path = require("path");
var helpers_1 = require("./helpers");
// setup router for facility to serve facility app
exports.setupFacilityRouter = function (express) {
    var router = express.Router();
    var rootPath = path.join(__dirname, 'apps/facility');
    var config = {
        layout: false,
        gtm_key: process.env.GTM_KEY_FACILITY,
        gtm_auth: process.env.GTM_AUTH_FACILITY,
        gtm_preview: process.env.GTM_PREVIEW_FACILITY,
        production: process.env.PRODUCTION,
        auth0_clientID: process.env.AUTH0_FACILITY_CLIENTID,
        auth0_domain: process.env.AUTH0_DOMAIN,
        auth0_audience: process.env.AUTH0_AUDIENCE,
        heroku_base: process.env.HEROKU_BASE,
        resumeCredentialTemplateSfid: process.env.RESUMECREDENTIALTEMPLATESFID,
        helpers: {
            scriptTag: function (file) { return helpers_1.scriptTag(file, rootPath); },
            styleTag: function (file) { return helpers_1.styleTag(file, rootPath); }
        }
    };
    var staticCachingRule = helpers_1.getStaticCachingRule();
    router.use(express.static(rootPath, staticCachingRule));
    router.get('/*', function (req, res) {
        res.render('facility', config);
        res.set(helpers_1.getHandlebarCachingHeaders());
    });
    return router;
};
