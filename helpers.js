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

module.exports = { validateStatus, validateDate };
