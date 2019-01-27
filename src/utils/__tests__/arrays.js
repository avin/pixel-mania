import { mostCommonArrayElement } from '../arrays';

describe('mostCommonArrayElement', () => {
    test('isOk!', () => {
        expect(mostCommonArrayElement([11, 11, 22])).toEqual(11);
        expect(mostCommonArrayElement([[1, 2], [1, 2], [4, 4]])).toEqual([1, 2]);
    });
});
