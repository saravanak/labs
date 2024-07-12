import { BlockNames, BLOCKLY_COLORS } from '../language/blockly-constants';
import { FieldGridDropdown } from '@blockly/field-grid-dropdown';

export default (Blockly: any, colors: string[]) => {
  Blockly.Blocks[BlockNames.MATH_NUMBER] = {
    init: function () {
      this.appendDummyInput().appendField(
        new FieldGridDropdown(
          Array(8)
            .fill(0)
            .map((_, i) => [(i + 1).toString(), (i + 1).toString()])
        ),
        'NUM'
      );
      this.setOutput(true, 'Number');
      this.setColour(BLOCKLY_COLORS.NUMBER);
    },
  };

  Blockly.Blocks[BlockNames.RETURN_COLOR] = {
    init: function () {
      const field = new Blockly.FieldColour(colors[0]);
      field.setColours(colors);
      field.setColumns(1);
      this.appendDummyInput().appendField(field, 'COLOUR');

      this.setPreviousStatement(true); // false implies no previous connector, the default
      this.setColour(BLOCKLY_COLORS.RETURN);
    },
  };

  Blockly.Blocks[BlockNames.ROW_COL] = {
    init: function () {
      this.appendDummyInput('Row').appendField(
        new Blockly.FieldDropdown([
          ['Row', 'Row'],
          ['Column', 'Col'],
        ]),
        'ROW_COLUMN'
      );
      this.setOutput(true, 'Number');
      this.setColour(BLOCKLY_COLORS.NUMBER);
    },
  };

  Blockly.Blocks[BlockNames.HELP] = {
    init: function () {
      this.appendDummyInput('Help');
      this.setColour(BLOCKLY_COLORS.NUMBER);
    },
  };

  Blockly.Blocks[BlockNames.ADD_SUB] = {
    init: function () {
      this.appendValueInput('LHS');
      this.appendDummyInput('Row').appendField(
        new Blockly.FieldDropdown([
          ['+', '+'],
          ['-', '-'],
        ]),
        'OPERATOR'
      );
      this.appendValueInput('RHS');
      this.setOutput(true, 'Number');
      this.setColour(BLOCKLY_COLORS.NUMBER);
    },
  };

  Blockly.Blocks[BlockNames.LGE_CONDITION] = {
    init: function () {
      this.appendValueInput('LHS').setCheck('Number');
      this.appendDummyInput('Equals').appendField(
        new Blockly.FieldDropdown([
          ['Is', 'Equal To'],
          ['Is Less Than', 'Lesser Than'],
          ['Is Greater Than', 'Greater Than'],
        ]),
        'CONDITION'
      );
      this.appendValueInput('RHS').setCheck('Number');
      this.setOutput(true, 'Boolean');
      this.setColour(BLOCKLY_COLORS.CONDITION);
    },
  };

  Blockly.Blocks[BlockNames.DIV_CONDITION] = {
    init: function () {
      this.appendValueInput('DIVIDEND').setCheck('Number');
      this.appendDummyInput('DividedBy').appendField('divided By');
      this.appendValueInput('DIVISOR').setCheck('Number');
      this.appendDummyInput('Equals').appendField(
        new Blockly.FieldDropdown([
          ['Gives Quotient', 'Gives Quotient'],
          ['Leaves Reminder', 'Leaves Reminder'],
        ]),
        'OPERATION'
      );

      this.appendValueInput('RHS').setCheck('Number');
      this.setOutput(true, 'Boolean');
      this.setColour(BLOCKLY_COLORS.CONDITION);
    },
  };

  Blockly.Blocks[BlockNames.AND_CONDITION] = {
    init: function () {
      this.appendValueInput('LHS').setCheck('Boolean');
      this.appendDummyInput('And').appendField('And');
      this.appendValueInput('RHS').setCheck('Boolean');
      this.setOutput(true, 'Boolean');
      this.setColour(BLOCKLY_COLORS.CONDITION);
    },
  };

  Blockly.Blocks[BlockNames.IF_BLOCK] = {
    init: function () {
      this.appendDummyInput().appendField('If');
      this.appendValueInput('CONDITION').setCheck('Boolean');
      this.appendStatementInput('RETURN').appendField('Set color to');
      this.setColour(BLOCKLY_COLORS.IF);
      this.setInputsInline(true);
    },
  };
};
