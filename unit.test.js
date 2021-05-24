const { expect, test } = require('@jest/globals');

const {leveling} = require('./Web2/public/javascripts/leveling');
test('Test if level up function is working', () => {
    numberArray1 = leveling(0,0,15,15);
    expect(numberArray1).toEqual([1,0,18])
    if (numberArray1 === [1,0,18])
        return true

    numberArray2 = leveling(0,0,10,15);
    expect(numberArray2).toEqual([0,10,15])
    numberArray3 = leveling(0,0,40,15);
    expect(numberArray3).toEqual(undefined)    
})

const {CalculateXp} = require('./Web2/public/javascripts/randomMath');
test('Test if CalculateXp is working', () => {
    answer = CalculateXp(2,1)
    expect(answer).toEqual(5)
    answer = CalculateXp(3,52)
    expect(answer).toEqual(8)
    answer = CalculateXp(3,150)
    expect(answer).toEqual(11)
    answer = CalculateXp(3,NaN)
    expect(answer).toEqual(5)
})

const {Addition} = require('./Web2/public/javascripts/randomMath');
test('Test if Addition is working', () => {
    expect(Addition[0]).toEqual(Addition[1])
    array = Addition()
    expect(array).not.toContain(NaN)
    array = Addition()
    expect(array).not.toContain(undefined)
    array = Addition()
    expect(array).not.toContain(null)
})

const {Subtraction} = require('./Web2/public/javascripts/randomMath');
test('Test if Subtraction is working', () => {
    expect(Subtraction[0]).toEqual(Subtraction[1])
    array = Subtraction()
    expect(array).not.toContain(NaN)
    array = Subtraction()
    expect(array).not.toContain(undefined)
    array = Subtraction()
    expect(array).not.toContain(null)
})

const {Multiplication} = require('./Web2/public/javascripts/randomMath');
test('Test if Multiplication is working', () => {
    expect(Multiplication[0]).toEqual(Multiplication[1])
    array = Multiplication()
    expect(array).not.toContain(NaN)
    array = Multiplication()
    expect(array).not.toContain(undefined)
    array = Multiplication()
    expect(array).not.toContain(null)
})

const {Division} = require('./Web2/public/javascripts/randomMath');
test('Test if Division is working', () => {
    expect(Division[0]).toEqual(Division[1])
    array = Division()
    expect(array).not.toContain(NaN)
    array = Division()
    expect(array).not.toContain(undefined)
    array = Division()
    expect(array).not.toContain(null)
})

/*
const {Diff} = require('./Web2/public/javascripts/randomMath');
test('Test if difficulty is working', () => {
    array = Diff()
    expect(array).not.toContain(0)
    array = Diff()
    expect(array).not.toContain(NaN)
    array = Diff()
    expect(array).not.toContain(undefined)
    array = Diff()
    expect(array).not.toContain(null)
})
*/
