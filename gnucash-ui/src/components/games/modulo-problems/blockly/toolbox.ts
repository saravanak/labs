import { BlockNames } from "../language/blockly-constants";
const toolboxConfig: any = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "math_number",
    },
    {
      kind: "block",
      type: BlockNames.ROW_COL,
    },
    {
      kind: "block",
      type: BlockNames.ADD_SUB,
      inputs: {
        LHS: {
          block: {
            type: BlockNames.ROW_COL,
            fields: {
              ROW_COLUMN: "Row",
            },
          },
        },
        RHS: {
          block: {
            type: BlockNames.ROW_COL,
            fields: {
              ROW_COLUMN: "Col",
            },
          },
        },
      },
    },
    {
      kind: "block",
      type: BlockNames.RETURN_COLOR,
    },

    {
      kind: "block",
      type: BlockNames.LGE_CONDITION,
      inputs: {
        LHS: {
          block: {
            type: BlockNames.ROW_COL,
            fields: {
              ROW_COLUMN: "Row",
            },
          },
        },
        RHS: {
          block: {
            type: "math_number",
            fields: {
              NUM: "5",
            },
          },
        },
      },
    },

    {
      kind: "block",
      type: BlockNames.DIV_CONDITION,
      inputs: {
        DIVIDEND: {
          block: {
            type: BlockNames.ROW_COL,
            fields: {
              ROW_COLUMN: "Row",
            },
          },
        },
        DIVISOR: {
          block: {
            type: "math_number",
            fields: {
              NUM: "2",
            },
          },
        },
        RHS: {
          block: {
            type: "math_number",
            fields: {
              NUM: "1",
            },
          },
        },
      },
    },
    {
      kind: "block",
      type: BlockNames.AND_CONDITION,
    },
    {
      kind: "block",
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
                    ROW_COLUMN: "Row",
                  },
                },
              },
              RHS: {
                block: {
                  type: "math_number",
                  fields: {
                    NUM: "5",
                  },
                },
              },
            },
          },
        },
        RETURN: {
          block: {
            type: BlockNames.RETURN_COLOR,
          },
        },
      },
    },
  ],
};
export { toolboxConfig  };
