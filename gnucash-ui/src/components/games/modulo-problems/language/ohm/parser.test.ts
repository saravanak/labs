import { describe, expect, test } from '@jest/globals';
import ModuloParser from './parser';

describe('modulo language', () => {
  const colors = ['Black', 'White'];
  test.each([
    'IF Row Greater Than 4 RETURN WHITE',
    'IF Col Lesser Than 4 RETURN BLACK',
    'IF Col Equal To 4 RETURN WHITE',
    'IF Col When Divided By 4 Leaves Reminder 1 RETURN WHITE',
    'IF Col When Divided By 4 Gives Quotient 0 RETURN WHITE',
    'IF Col + Row When Divided By 4 Gives Quotient 0 RETURN WHITE',
    'IF Col - Row When Divided By 4 Gives Quotient 0 RETURN WHITE',
  ])('checks syntax: %s', (t) => {
    const parser = new ModuloParser(colors);

    const matchResult = parser.parse(t);
    if (matchResult.failed()) {
      console.log(matchResult.message);
    }
    expect(matchResult.succeeded()).toBeTruthy();
  });

  test('evals: >', () => {
    const parser = new ModuloParser(colors);

    const t =
      'IF Row Greater Than 4 RETURN WHITE \n' +
      'IF Row Greater Than 5 RETURN WHITE';
    let matchResult = parser.eval(t, { row: 6, col: 3 });
    expect(matchResult).toBeTruthy();
    matchResult = parser.eval(t, { row: 3, col: 3 });
    expect(matchResult).toBeFalsy();
  });

  test('evals: div', () => {
    const parser = new ModuloParser(colors);

    const t =
      'IF Col When Divided By 4 Leaves Reminder 0 RETURN WHITE\n' +
      'IF Col When Divided By 3 Leaves Reminder 2 RETURN BLACK';
    const matchResult = parser.eval(t, { row: 6, col: 5 });
    expect(matchResult).toEqual('black');
  });

  test('evals: row + col', () => {
    const parser = new ModuloParser(colors);

    const t = 'IF Col + Row When Divided By 3 Leaves Reminder 2 RETURN WHITE\n';

    const matchResult = parser.eval(t, { row: 6, col: 5 });
    expect(matchResult).toEqual('white');
  });
  test('evals: AND conditon', () => {
    const parser = new ModuloParser(colors);

    const t =
      'IF Row Equal To Col And Col + Row When Divided By 3 Leaves Reminder 0 RETURN WHITE\n';

    const matchResult = parser.eval(t, { row: 6, col: 6 });
    expect(matchResult).toEqual('white');
  });
});
