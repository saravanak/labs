/**
 * BiColor[0]: Highlight Color,
 * BiColor[1]: Default Color,
 */
export type BiColor = [string, string];

export const Predicates = {
  TwoColors_01: (colors: BiColor) => {
    return (row: number, col: number) => {
      return row == 0 ? colors[0] : colors[1];
    };
  },
};
