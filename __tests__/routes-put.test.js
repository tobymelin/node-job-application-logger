const app = require('../index');
const request = require('supertest');
const testEnv = require('../test-helpers/setup-test-env');

beforeAll(() => {
    testEnv.setupTestEnv();
});

afterAll(() => {
    testEnv.resetTestEnv();
});


test('PUT /applications (valid input, #1)', async () => {
    const postData = {title: 'Altered Application', company: 'NewApp Inc.', date: '13/07/2020', status: 'Interview'};

    const res = await request(app).put('/applications/1').send(postData);

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body[1]).toStrictEqual(postData);
});

test('PUT /applications (valid input, #2)', async () => {
    const postData = {title: 'Edited Application', company: 'Other Company Inc.', date: '13/09/2020', status: 'Applied'};

    const res = await request(app).put('/applications/1').send(postData);

    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body[1]).toStrictEqual(postData);
});

test('PUT /applications (invalid fields)', async () => {
    const postData = {name: 'New Application', company: 'NewApp Inc.', date: '13/07/2020', state: 'Pending'};

    const res = await request(app).put('/applications/1').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PUT /applications (invalid status content)', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.', date: '13/07/2020', status: 'Non-existent'};

    const res = await request(app).put('/applications/1').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PUT /applications (invalid date, 123/07/2020)', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.', date: '123/07/2020', status: 'Pending'};

    const res = await request(app).put('/applications/1').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PUT /applications (invalid date, 13/22/2020)', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.', date: '13/22/2020', status: 'Pending'};

    const res = await request(app).put('/applications/1').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PUT /applications (missing fields)', async () => {
    const postData = {title: 'New Application', company: 'NewApp Inc.'};

    const res = await request(app).put('/applications/1').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});

test('PUT /applications (empty request body)', async () => {
    const postData = {};

    const res = await request(app).put('/applications/1').send(postData);

    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
});
