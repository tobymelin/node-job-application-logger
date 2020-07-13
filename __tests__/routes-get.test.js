const app = require('../index');
const request = require('supertest');
const testEnv = require('../test-helpers/setup-test-env');

beforeAll(() => {
    testEnv.setupTestEnv();
});

afterAll(() => {
    testEnv.resetTestEnv();
});

test('GET /applications', async () => {
    const res = await request(app).get('/applications');

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.length).toBe(testEnv.testData.length);
    expect(res.body).toStrictEqual(testEnv.testData);
});

test('GET /applications/1', async () => {
    const res = await request(app).get('/applications/1');

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body).toEqual(testEnv.testData[1]);
});

test('GET /applications/7 (404 error)', async () => {
    const res = await request(app).get('/applications/7');
    
    expect(res.status).toBe(404);
    expect(res.type).toBe('application/json');
});

test('GET /applications/invalid (400 error)', async () => {
    const res = await request(app).get('/applications/invalid');
    
    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});
