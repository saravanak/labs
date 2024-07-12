import { Block, BlockSvg, inputTypes, Workspace } from 'blockly';

/*
 var parentBlock = workspace.newBlock(BlockNames.IF_BLOCK);
    var lgeBlock = workspace.newBlock(BlockNames.LGE_CONDITION);
    var rowBlock = workspace.newBlock(BlockNames.ROW_COL);
    var numberBlock = workspace.newBlock(BlockNames.MATH_NUMBER);
    var colorBlock = workspace.newBlock(BlockNames.RETURN_COLOR);
    var helpBlock = workspace.newBlock(BlockNames.HELP);

    [
      parentBlock,
      lgeBlock,
      rowBlock,
      numberBlock,
      colorBlock,
      helpBlock,
    ].forEach((b) => {
      b.initSvg();
      b.render();
      b.setDeletable(false);
      b.setEditable(false);
      b.setMovable(false);
      b.setColour("#898585");
      b.removeSelect();
    });

    numberBlock.setEditable(true);
    numberBlock.setColour("#F98282");

    parentBlock
      .getInput("CONDITION")
      ?.connection?.connect(lgeBlock.outputConnection);

    parentBlock
      .getInput("RETURN")
      ?.connection?.connect(colorBlock.previousConnection);

    lgeBlock.getInput("LHS")?.connection?.connect(rowBlock.outputConnection);
    lgeBlock.getInput("RHS")?.connection?.connect(numberBlock.outputConnection);

    parentBlock.moveBy(200, 200);
    helpBlock.moveBy(150, 50);

    numberBlock.getField("NUM")?.setValue("5");

    helpBlock.setCommentText(
      "The instruction says: 'IF Row Equal To 5 RETURN BLUE'. \n  Tip: Choose another number to highlight the first row."
    );

    const commentIcon = helpBlock.getCommentIcon();
    commentIcon.setVisible(true);
    helpBlock.setEditable(false);
    commentIcon.updateEditable();

    const workspaceComment = new WorkspaceCommentSvg(
      workspace,
      "test",
      300,
      500
    );
    console.log(workspace.getTopComments());

    workspaceComment.moveBy(100, 400);
*/

/*
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
    };
*/

export class WorkspaceUtils {
  workspace;
  constructor(workspace: Workspace) {
    this.workspace = workspace;
  }
  processBlockDefintion(json: any) {
    this.createAndConnectBlock(json, null, null);
  }

  private createAndConnectBlock(
    json: any,
    parentBlock: Block | null,
    inputName: string | null
  ) {
    const { inputs, type, fields } = json;
    const currentBlock = this.workspace.newBlock(type) as BlockSvg;

    if (currentBlock.initSvg) {
      currentBlock.initSvg();
    }
    if (currentBlock.render) {
      currentBlock.render();
    }

    if (parentBlock && inputName) {
      this.makeConnections(parentBlock, currentBlock, inputName);
    }

    if (fields) {
      for (let [k, v] of Object.entries(fields)) {
        currentBlock.getField(k)?.setValue(v);
      }
    }

    if (inputs) {
      const inputKeys = Object.keys(inputs);
      inputKeys.forEach((k) => {
        this.createAndConnectBlock(inputs[k].block, currentBlock, k);
      });
    }
  }
  private makeConnections(
    parentBlock: Block,
    currentBlock: Block,
    inputName: string
  ) {
    const input = parentBlock.getInput(inputName);

    if (!input) {
      return;
    }

    switch (input.type) {
      case inputTypes.DUMMY:
        return 0;
      case inputTypes.VALUE:
        input.connection?.connect(currentBlock.outputConnection as any);
        break;
      case inputTypes.STATEMENT:
        input.connection?.connect(currentBlock.previousConnection as any);
        break;
    }
  }
}
