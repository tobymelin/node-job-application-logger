const fs = require('fs').promises;
const config = require('./config');

async function getApplicationById(application_id) {
    const data = await getAllApplications();

    if (application_id === NaN || !data[application_id]) {
        var err = new Error("Job application ID not found.");
        err.status = 404;
        throw err;
    }

    return data[application_id];
}

// Helper function for fetching data from a json file.
// Will be replaced with a db interface later on.
async function getAllApplications() {
    try {
        const data = JSON.parse(await fs.readFile(config.jsonFile));
        return data;
    }
    catch (err) {
        throw err;
    }
}

async function updateApplications(data) {
    try {
        await fs.writeFile(config.jsonFile, JSON.stringify(data));
        return true;
    }
    catch (err) {
        throw err;
    }
}

module.exports = { getApplicationById, getAllApplications, updateApplications }
