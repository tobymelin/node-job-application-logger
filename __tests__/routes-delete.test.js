const app = require('../index');
const request = require('supertest');
const testEnv = require('../test-helpers/setup-test-env');

beforeAll(() => {
    testEnv.setupTestEnv();
});

afterAll(() => {
    testEnv.resetTestEnv();
});


test('DELETE /applications/1', async () => {
    var expectedResult = testEnv.testData;
    expectedResult.splice(1, 1);

    const res = await request(app).delete('/applications/1');

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.length).toBe(expectedResult.length);
    expect(res.body).toStrictEqual(expectedResult);
});

test('DELETE /applications/9', async () => {
    const res = await request(app).delete('/applications/9');

    expect(res.status).toBe(404);
    expect(res.type).toBe('application/json');
});
