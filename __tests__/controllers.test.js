const { getApplicationById } = require('../controllers');
const testEnv = require('../test-helpers/setup-test-env');

beforeAll(() => {
    testEnv.setupTestEnv();
});

// Restore all mocked functions to defaults to avoid unintended side-effects
afterAll(() => {
    testEnv.resetTestEnv();
});


test('Fetch specific job application', () => {
    return getApplicationById(1).then(data => {
        expect(data).toStrictEqual(testEnv.testData[1]);
    });
});

test('Fetch an application that does not exist', () => {
    return getApplicationById(8).catch(e => {
        expect(e.status).toBe(404);
        expect(e.name).toBe("Error");
    });
});
