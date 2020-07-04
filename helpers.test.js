const { validateStatus, validateDate } = require('./helpers');

// ===================================
// Application status validation tests
//
test('valid status values', () => {
    expect(validateStatus('Interview')).toBeTruthy();
});

test('invalid status value', () => {
    expect(validateStatus('This will fail')).toBeFalsy();
    expect(validateStatus('Pend')).toBeFalsy();
});


// =====================
// Date validation tests
//
test('valid date value (24/12/2020)', () => {
    expect(validateDate('24/12/2020')).toBeTruthy();
});
test('valid date value (24/02/2020)', () => {
    expect(validateDate('24/12/2020')).toBeTruthy();
});
test('valid date value (2/3/2020)', () => {
    expect(validateDate('24/12/2020')).toBeTruthy();
});

test('invalid date value (42/12/2020)', () => {
    expect(validateDate('42/12/2020')).toBeFalsy();
});
test('invalid date value (10/22/2020)', () => {
    expect(validateDate('10/22/2020')).toBeFalsy();
});
