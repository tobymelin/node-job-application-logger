const fs = require('fs');
const controllers = require('./controllers');
const { validateStatus, validateDate } = require('./helpers');
const helpers = require('./helpers');

exports.getall = async function (req, res, next) {
    var data;

    try {
        data = await controllers.getAllApplications();
        req.application_data = data;
        next()
    }
    catch (err) {
        next(err);
        return;
    }
}

// Catchall endpoint used for fetching and filtering
// application info.
exports.load = async function (req, res, next) {
    const application_id = parseInt(req.params.id);

    // Simple int parsing to allow for typos where user inputs number + characters.
    // May change to RegEx checking
    if (isNaN(application_id)) {
        var err = new Error('A valid job application ID must be provided.');
        err.status = 400;
        next(err);
        return;
    }

    try {
        // var data = await models.getApplicationById(application_id);
        var data = await controllers.getAllApplications();

        if (!data[application_id]) {
            var err = new Error("Job application ID not found.");
            err.status = 404;
            next(err);
            return;
        }

        req.application_id = application_id;
        req.application_data = data;
        next();
    }
    catch (err) {
        next(err);
        return;
    }
}


// GET requests to /applications
exports.list = async function (req, res, next) {
    res.send(req.application_data);
}

// GET requests to /applications/:id
// Job application IDs are currently based on array numbering for simplicity
exports.view = function (req, res, next) {
    res.send(req.application_data[req.application_id]);
}

// PATCH requests to /applications/:id
exports.edit = function (req, res, next) {
    if (!req.body || Object.keys(req.body).length == 0) {
        var err = new Error('Invalid data');
        err.status = 400;
        next(err);
        return;
    }

    var data = req.application_data;

    for (key in req.body) {
        if (key === 'status' && !helpers.validateStatus(req.body[key])) {
            var err = new Error("Property 'status' does not contain a valid value.")
            err.status = 400;
            next(err);
            return;
        }
        else if (key === 'date' && !helpers.validateDate(req.body[key])) {
            var err = new Error("Property 'date' does not contain a valid value.")
            err.status = 400;
            next(err);
            return;
        }

        if (data[req.application_id].hasOwnProperty(key)) {
            data[req.application_id][key] = req.body[key];
        }
        else {
            var err = new Error("Property '" + key + "' does not exist.")
            err.status = 400;
            next(err);
            return;
        }
    }

    controllers.updateApplications(data, next);
    res.send(data[req.application_id]);
}

// DELETE requests to /applications/:id
exports.delete = function (req, res, next) {
    var data = req.application_data;

    data.splice(req.application_id, 1);
    
    controllers.updateApplications(data, next);
    res.send(data);
}

// POST requests to /applications
exports.add = function (req, res, next) {
    var keys = ['date', 'title', 'company', 'status']
    var input_keys = Object.keys(req.body);
    var input_object = {};

    // Check that all required information was included in POST
    // Transpose data from req.body into input_object to get rid of
    // any additional, unwanted, info.
    for (var i = 0; i < keys.length; i++) {
        if (input_keys.indexOf(keys[i]) == -1) {
            var err = new Error("Missing value for '" + keys[i] + "' in job application JSON");
            err.status = 400;
            next(err);
            return;
        }

        input_object[keys[i]] = req.body[keys[i]];
    }

    if (!validateStatus(input_object['status'])) {
        var err = new Error("Invalid value of 'status' in job application JSON");
        err.status = 400;
        next(err);
        return;
    }
    if (!validateDate(input_object['date'])) {
        var err = new Error("Invalid value of 'date' in job application JSON");
        err.status = 400;
        next(err);
        return;
    }

    try {
        var data = req.application_data;
        data.push(input_object);

        controllers.updateApplications(data);

        res.status(201);
        res.send(data);
    }
    catch (err) {
        next(err);
        return;
    }
}
