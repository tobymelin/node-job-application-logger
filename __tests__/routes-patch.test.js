const app = require('../index');
const request = require('supertest');
const testEnv = require('../test-helpers/setup-test-env');

beforeAll(() => {
    testEnv.setupTestEnv();
});

afterAll(() => {
    testEnv.resetTestEnv();
});


test('PATCH /applications/1', async () => {
    const putData = { title: 'New title', status: 'Interview' };

    const res = await request(app).patch('/applications/1').send(putData);

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body.title).toBe(putData.title);
    expect(res.body.status).toBe(putData.status);
});

test('PATCH /applications/1 (empty body)', async () => {
    const putData = {};

    const res = await request(app).patch('/applications/1').send(putData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PATCH /applications/1 (invalid fields)', async () => {
    const putData = { name: 'New title', state: 'Interview' };

    const res = await request(app).patch('/applications/1').send(putData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PATCH /applications/1 (invalid status)', async () => {
    const putData = { status: 'Invalid info' };

    const res = await request(app).patch('/applications/1').send(putData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PATCH /applications/1 (invalid date)', async () => {
    const putData = { date: '99/123/2020' };

    const res = await request(app).patch('/applications/1').send(putData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PATCH /applications/12 (404 error)', async () => {
    const putData = { status: 'Invalid info' };
    
    const res = await request(app).patch('/applications/12').send(putData);

    expect(res.status).toBe(404);
    expect(res.type).toBe('application/json');
});
