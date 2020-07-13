const fs = require('fs');

// Test data
const testData = [
    {
        "date":"21/06/2020",
        "title":"Full-Stack Developer",
        "company":"Numbers Ltd.",
        "status":"Declined"
    },
    {
        "date":"04/07/2020",
        "title":"Software Engineer",
        "company":"ABC Inc.",
        "status":"Applied"
    },
    {
        "date":"07/07/2020",
        "title":"Test Position",
        "company":"Test Corp.",
        "status":"Pending"
    }
];


function setupTestEnv() {
    // Mock readFile/writeFile functions to avoid calls to the file system during
    // testing.
    fs.promises.writeFile = jest.fn();
    fs.promises.readFile = jest.fn().mockResolvedValue(JSON.stringify(testData));
}

function resetTestEnv() {
    // Restore all mocked functions to defaults to avoid unintended side-effects
    jest.restoreAllMocks();
}

module.exports = { testData, setupTestEnv, resetTestEnv };
