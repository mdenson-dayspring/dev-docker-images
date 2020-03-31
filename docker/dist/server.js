"use strict";
exports.__esModule = true;
var helpers_1 = require("./helpers");
var facility_1 = require("./facility");
var clinician_1 = require("./clinician");
var admin_1 = require("./admin");
// server.js
var express = require("express");
var subdomain = require("express-subdomain");
var exphbs = require("express-handlebars");
var app = express();
var hbs = exphbs.create([]);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.set('etag', function (body, encoding) {
    return 'W/"' + new Date(Date.now()).toISOString().slice(0, 16) + '"';
});
// Instruct the app to use the forceSSL middleware
if (process.env.NODE_ENV !== 'dev') {
    app.use(helpers_1.forceSSL());
}
console.log('Starting express server on port ' +
    (process.env.PORT || 8080) +
    ' in ' +
    process.env.NODE_ENV +
    ' mode.');
    
var facilityRouter = facility_1.setupFacilityRouter(express);
app.use(subdomain('facility-dev.*', facilityRouter));
app.use(subdomain('facility-dev', facilityRouter));
app.use(subdomain('facility-stage', facilityRouter));
app.use(subdomain('facility', facilityRouter));
var adminRouter = admin_1.setupAdminRouter(express);
app.use(subdomain('admin-dev.*', adminRouter));
app.use(subdomain('admin-dev', adminRouter));
app.use(subdomain('admin-stage', adminRouter));
app.use(subdomain('admin', adminRouter));
var clinicianRouter = clinician_1.setupClinicianRouter(express);
app.use(subdomain('clinician-dev.*', clinicianRouter));
app.use(subdomain('clinician-dev', clinicianRouter));
app.use(subdomain('clinician-stage', clinicianRouter));
app.use(subdomain('clinician', clinicianRouter));
app.use(clinicianRouter);
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
