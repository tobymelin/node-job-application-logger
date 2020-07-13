function validateStatus(status) {
    var valid_status = ['Pending', 'Applied', 'Declined', 'Interview']

    if (valid_status.indexOf(status) == -1) {
        return false;
    }
    return true;
}

function validateDate(date) {
    // REALLY simple date pattern matcher for now
    var pattern = /^[0-3]?[0-9]\/[0-1]?[0-9]\/[0-9]{4}/;

    if (date.match(pattern)) {
        return true;
    }

    return false;
}

function validateRequestBody(body) {
    var keys = ['date', 'title', 'company', 'status']
    var input_keys = Object.keys(body);
    var input_object = {};

    // Check that all required information was included in POST
    // Transpose data from body into input_object to get rid of
    // any additional, unwanted, info.
    for (var i = 0; i < keys.length; i++) {
        if (input_keys.indexOf(keys[i]) == -1) {
            var err = new Error("Missing value for '" + keys[i] + "' in job application JSON");
            err.status = 400;
            throw err;
        }

        input_object[keys[i]] = body[keys[i]];
    }

    if (!validateStatus(input_object['status'])) {
        var err = new Error("Invalid value of 'status' in job application JSON");
        err.status = 400;
        throw err;
    }
    if (!validateDate(input_object['date'])) {
        var err = new Error("Invalid value of 'date' in job application JSON");
        err.status = 400;
        throw err;
    }

    return input_object;
}

module.exports = { validateStatus, validateDate, validateRequestBody };
