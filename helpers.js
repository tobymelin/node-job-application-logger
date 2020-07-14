function validateStatus(status) {
    var valid_status = ['Pending', 'Applied', 'Declined', 'Interview']

    if (valid_status.indexOf(status) == -1) {
        return false;
    }
    return true;
}

function validateDate(date) {
    var pattern = /^[0-3]?[0-9]\/[0-1]?[0-9]\/[0-9]{4}$/;

    if (!date.match(pattern)) {
        return false;
    }

    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var dateSplit = date.split('/');
    var dd = dateSplit[0];
    var mm = dateSplit[1];
    var yy = dateSplit[2];

    if (mm > 12) {
        return false;
    }

    // Check for valid days, first for Feb (leap years),
    // then for all other months
    if (mm == 2) {
        var febDays = 29;

        if (yy % 4 != 0 || (yy % 100 == 0 && yy % 400 != 0)) {
            febDays = 28;
        }

        if (dd > febDays) {
            return false;
        }
    }
    else if (dd > days[mm - 1]) {
        return false;
    }

    return true;
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
