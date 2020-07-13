const app = require('../index');
const request = require('supertest');
const testEnv = require('../test-helpers/setup-test-env');

beforeAll(() => {
    testEnv.setupTestEnv();
});

afterAll(() => {
    testEnv.resetTestEnv();
});


test('POST /applications', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.', date: '13/07/2020', status: 'Pending'};

    const res = await request(app).post('/applications').send(postData);

    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json');
    expect(res.body.length).toBe(testEnv.testData.length + 1);
});

test('POST /applications (invalid fields)', async () => {
    const postData = {name: 'New Application', company: 'NewApp Inc.', date: '13/07/2020', state: 'Pending'};

    const res = await request(app).post('/applications').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('POST /applications (invalid status content)', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.', date: '13/07/2020', status: 'Non-existent'};

    const res = await request(app).post('/applications').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('POST /applications (invalid date, 123/07/2020)', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.', date: '123/07/2020', status: 'Pending'};

    const res = await request(app).post('/applications').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('POST /applications (invalid date, 13/22/2020)', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.', date: '13/22/2020', status: 'Pending'};

    const res = await request(app).post('/applications').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('POST /applications (missing fields)', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.'};

    const res = await request(app).post('/applications').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('POST /applications (empty request body)', async () => {
    const postData = {};

    const res = await request(app).post('/applications').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});
