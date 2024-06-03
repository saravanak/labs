// @ts-nocheck

import Blockly from "blockly";
import { BlockNames, ColorMap } from "~/language/blockly-constants";
import StringUtils from "~/services/string"

const sampleGenerator: Blockly.CodeGenerator = new Blockly.Generator("Modulo");

sampleGenerator[BlockNames.MATH_NUMBER] = function (block) {
  const code = String(block.getFieldValue("NUM"));
  return [code, 0];
};

sampleGenerator[BlockNames.ROW_COL] = function (block) {
  const code = String(block.getFieldValue("ROW_COLUMN"));
  return [code, 0];
};

sampleGenerator[BlockNames.RETURN_COLOR] = function (block) {
  const code = ColorMap[String(block.getFieldValue("COLOUR"))];
  return code.toUpperCase();
};

sampleGenerator[BlockNames.ADD_SUB] = function (block) {
  const code = sampleGenerator.valueToCode(block, "LHS", 0);
  return `${code} ${String(
    block.getFieldValue("OPERATOR")
  )} ${sampleGenerator.valueToCode(block, "RHS", 0)}`;
};

sampleGenerator[BlockNames.LGE_CONDITION] = function (block) {
  const code = sampleGenerator.valueToCode(block, "LHS", 0);
  return `${code} ${String(
    block.getFieldValue("CONDITION")
  )} ${sampleGenerator.valueToCode(block, "RHS", 0)}`;
};
sampleGenerator[BlockNames.DIV_CONDITION] = function (block) {
  const dividendBlockType = block.getInputTargetBlock("DIVIDEND").type;
  const code =
    dividendBlockType == BlockNames.ADD_SUB
      ? sampleGenerator.statementToCode(block, "DIVIDEND", 0)
      : sampleGenerator.valueToCode(block, "DIVIDEND", 0);

  return `${code} When Divided By ${sampleGenerator.valueToCode(
    block,
    "DIVISOR",
    0
  )} ${String(block.getFieldValue("OPERATION"))} ${sampleGenerator.valueToCode(
    block,
    "RHS",
    0
  )}`;
};

sampleGenerator[BlockNames.AND_CONDITION] = function (block) {
  const code = sampleGenerator.statementToCode(block, "LHS");
  return `${code} And ${sampleGenerator.statementToCode(block, "RHS")}`;
};

sampleGenerator[BlockNames.IF_BLOCK] = function (block) {
  const code = sampleGenerator.statementToCode(block, "CONDITION");
  const statementCode = `IF ${code} RETURN ${sampleGenerator.statementToCode(
    block,
    "RETURN"
  )}`;
  return StringUtils.stripExtraWhiteSpaces(statementCode);
};
sampleGenerator[BlockNames.HELP] = function (block) {
  return ``;
};

export default sampleGenerator;
