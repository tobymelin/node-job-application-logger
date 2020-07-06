const fs = require('fs');
const { validateStatus } = require('./helpers');

exports.list = function (req, res, next) {
    getApplicationsJSON(NaN, function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.send(data);
    });
}

// Catchall endpoint used for fetching and filtering
// application info.
//
// TODO: Change once SQL is implemented.
exports.load = function (req, res, next) {
    const application_id = parseInt(req.params.id);

    // Simple int parsing to allow for typos where user inputs number + characters.
    // May change to RegEx checking
    if (application_id === NaN) {
        var err = new Error('A valid job application ID must be provided.');
        err.status = 400;
        next(err);
        return;
    }

    getApplicationsJSON(NaN, function (err, data) {
        if (err) {
            next(err);
            return;
        }

        req.application_data = data;
        req.application_id = application_id;
        next();
    });
}

// GET requests to /applications/:id
// Job application IDs are currently based on array numbering for simplicity
exports.view = function (req, res, next) {
    res.send(req.application_data);
}

// PUT requests to /applications/:id
exports.edit = function (req, res, next) {
    if (!req.body) {
        var err = new Error('Invalid data');
        err.status = 400;
        next(err);
        return;
    }

    var data = req.application_data;

    for (key in req.body) {
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

    updateWallsJSON(data, next);
    res.send(data);
}

// DELETE requests to /applications/:id
exports.delete = function (req, res, next) {
    var data = req.application_data;

    data.splice(req.application_id, 1);
    
    updateWallsJSON(data, next);
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

    getApplicationsJSON(NaN, function (err, data) {
        if (err) {
            next(err);
            return;
        }
        
        data.push(input_object);
    
        updateWallsJSON(data, next);
        res.status(201);
        res.send(data);
    });
}

// Helper function for fetching data from a json file.
// Will be replaced with a db interface later on.
function getApplicationsJSON(application_id = NaN, next) {
    fs.readFile('content/job-applications.json', function (err, data) {
        if (err) {
            next(err);
            return;
        }

        var data = JSON.parse(data);

        if (application_id !== NaN && !data[application_id]) {
            var err = new Error("Job application ID not found.");
            err.status = 404;
            next(err);
            return;
        }
        else if (application_id !== NaN && data[application_id]) {
            data = data[application_id];
        }

        next(null, data);
    });
}

function updateWallsJSON(data, next) {
    fs.writeFile('content/job-applications.json', JSON.stringify(data), function (err) {
        if (err) {
            next(err);
            return;
        }
    });
}