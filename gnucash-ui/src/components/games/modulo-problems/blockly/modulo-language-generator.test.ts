import { describe, expect, test } from '@jest/globals';
import Blockly, { Workspace } from 'blockly';
import { BlockNames } from '../language/blockly-constants';
import configureBlocks from '../blockly/blocks';
import ModuloCodeGenerator from '../blockly/modulo-language-generator';
import { WorkspaceUtils } from './workspace-utils';

describe('modulo language', () => {
  test.only('generates correct language', () => {
    const colors = ['blue', 'white'];
    configureBlocks(Blockly, colors);
    const workspace = new Workspace();
    const workspaceUtils = new WorkspaceUtils(workspace);
    const configJson = {
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
              COLOUR: 'BLUE',
            },
          },
        },
      },
    };
    workspaceUtils.processBlockDefintion(configJson);
    const code = ModuloCodeGenerator.workspaceToCode(workspace);
    expect(code).toEqual('IF Row Equal To 5 RETURN BLUE');
  });
});
