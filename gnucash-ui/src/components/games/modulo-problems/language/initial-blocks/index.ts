import { BlockNames } from '../blockly-constants';

export default {
  IfRowEqualsFive: {
    kind: 'block',
    type: BlockNames.IF_BLOCK,
    inputs: {
      CONDITION: {
        block: {
          type: BlockNames.LGE_CONDITION,
          inputs: {
            LHS: {
              block: {
                type: BlockNames.ROW_COL,
                fields: {
                  ROW_COLUMN: 'Row',
                },
              },
            },
            RHS: {
              block: {
                type: BlockNames.MATH_NUMBER,
                fields: {
                  NUM: '5',
                },
              },
            },
          },
        },
      },
      RETURN: {
        block: {
          type: BlockNames.RETURN_COLOR,
          fields: {
            COLOUR: 'blue',
          },
        },
      },
    },
  },
};
