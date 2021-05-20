const { expect, test } = require('@jest/globals');
const { testfunction } = require('./unit');
const {leveling} = require('./Web2/public/javascripts/leveling')

test('Test of testfunction', () => {
    text = testfunction("test1")
    expect(text).toBe('this test will retrun the parameter name: test1')
});

test('Test if level up function is working', () => {
    numberArray1 = leveling(0,1,15,15);
    expect(numberArray).toEqual(1,0,18)
})