import { computeDivisionSteps } from '@/components/math-art/division-steps';
import '@testing-library/jest-dom';
import { last } from 'lodash';

describe('Division steps ', () => {
  [
    // { dividend: 8, divisor: 2 },
    // { dividend: 10, divisor: 2 },
    // { dividend: 100, divisor: 2 },
    // { dividend: 101, divisor: 2 },
    { dividend: 1001, divisor: 2 },
  ].forEach(({ dividend, divisor }) => {
    it(`computes correctly ${dividend}/${divisor}`, () => {
      let computedSteps = computeDivisionSteps({ dividend, divisor });
      expect(computedSteps).toMatchSnapshot();
      expect(computedSteps.remainder).toEqual(
        last(computedSteps.divisionModel)?.remainder
      );
    });
  });
});
