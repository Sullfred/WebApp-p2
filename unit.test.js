const { expect } = require('@jest/globals');
const { testfunction } = require('./unit');

test('Test of testfunction', () => {
    text = testfunction("test1")
    expect(text).toBe('this test will retrun the parameter name: test1')
});