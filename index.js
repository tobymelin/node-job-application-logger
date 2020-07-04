'use strict';

var express = require('express');
var app = express();
var port = 3000;
var applications = require('./job-applications.js');

module.exports = app;

app.use(express.json());

// Endpoints - Job Applications
app.route('/applications')
    .get(applications.list)
    .post(applications.add);
app.all('/applications/:id/:op?', applications.load);
app.route('/applications/:id')
    .get(applications.view)
    .put(applications.edit)
    .delete(applications.delete);
app.get('/applications/:id/view', applications.view);

// Error handler
// On catching an error, will output the error code
// and message as a JSON response.
app.use(function (err, req, res, next) {
    if (res.headerSent) {
        return next(err);
    }
    if (err.status)
        res.status(err.status);
    else
        res.status(500);

    res.send({ status: err.status, message: err.message });
});

// Start server
if (!module.parent) {
    app.listen(port);
    console.log('Server started on port ' + port);
}
