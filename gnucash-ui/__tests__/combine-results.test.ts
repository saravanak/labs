import '@testing-library/jest-dom';
import { collapseNumbers } from '../src/app/utils/utils-2048';

describe('Collapse numbers', () => {
  it('collapses correctly', () => {
    expect(collapseNumbers([4, 4, 2, 2])).toEqual([8, 4, null, null]);
    expect(collapseNumbers([4, null, 2, 2])).toEqual([4, 4, null, null]);
    expect(collapseNumbers([4, null, null, 2])).toEqual([4, 2, null, null]);
    expect(collapseNumbers([null, 4, null, 2])).toEqual([4, 2, null, null]);
    expect(collapseNumbers([null, null, 4, 2])).toEqual([4, 2, null, null]);
    expect(collapseNumbers([4, 2, null, 2])).toEqual([4, 4, null, null]);
    expect(collapseNumbers([4, null, null, 4])).toEqual([8, null, null, null]);
  });
});
