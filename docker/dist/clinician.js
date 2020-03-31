"use strict";
exports.__esModule = true;
var path = require("path");
var helpers_1 = require("./helpers");
// setup router for clinician to serve clinician app
exports.setupClinicianRouter = function (express) {
    var router = express.Router();
    var rootPath = path.join(__dirname, 'apps/clinician');
    var config = {
        layout: false,
        gtm_key: process.env.GTM_KEY_CLINICIAN,
        gtm_auth: process.env.GTM_AUTH_CLINICIAN,
        gtm_preview: process.env.GTM_PREVIEW_CLINICIAN,
        google_places_api_key: process.env.GOOGLE_PLACES_API_KEY,
        production: process.env.PRODUCTION,
        auth0_clientID: process.env.AUTH0_CLINICIAN_CLIENTID,
        auth0_domain: process.env.AUTH0_DOMAIN,
        auth0_audience: process.env.AUTH0_AUDIENCE,
        heroku_base: process.env.HEROKU_BASE,
        resumeCredentialTemplateSfid: process.env.RESUMECREDENTIALTEMPLATESFID,
        refer_friend_url: process.env.REFERFRIEND_URL,
        refer_friend_email_tf: process.env.REFERFRIEND_EMAIL_TF,
        helpers: {
            scriptTag: function (file) { return helpers_1.scriptTag(file, rootPath); },
            styleTag: function (file) { return helpers_1.styleTag(file, rootPath); }
        }
    };
    var staticCachingRule = helpers_1.getStaticCachingRule();
    router.use(express.static(rootPath, staticCachingRule));
    router.get('/*', function (req, res) {
        res.render('clinician', config);
        res.set(helpers_1.getHandlebarCachingHeaders());
    });
    return router;
};
