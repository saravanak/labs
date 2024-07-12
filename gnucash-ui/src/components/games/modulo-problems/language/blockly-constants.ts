export enum BlockNames {
  MATH_NUMBER = 'math_number',
  RETURN_COLOR = 'example_colour',
  ROW_COL = 'row_col',

  ADD_SUB = 'add_sub',
  LGE_CONDITION = 'lge_conditions',
  DIV_CONDITION = 'div_conditions',
  AND_CONDITION = 'and_condition',
  IF_BLOCK = 'if_block',
  HELP = 'help',
}

export enum BLOCKLY_COLORS {
  NUMBER = 18,
  RETURN = 120,
  IF = 60,
  CONDITION = 280,
}

export const ColorMap: Record<string, string> = {
  '#008000': 'Green',
  '#ffffff': 'White',
  '#0000ff': 'Blue',
};
