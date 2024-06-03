import Blockly from "blockly";
import { useEffect } from "react";
import configureBlocks from "./blockly/blocks";
import { WorkspaceUtils } from "./blockly/workspace-utils";
import ModuloCodeGenerator from "./blockly/modulo-language-generator";

let workspace: any;

type Props = {
  colors: string[];
  setModuloProgram: (a: string) => void;
  isPuzzleSolved: boolean;
  initialBlocks: Record<any, any>;
};

export default function BlocklyComponent({
  colors,
  setModuloProgram,
  initialBlocks,
}: Props) {
  console.log(initialBlocks);

  configureBlocks(Blockly, colors);
useEffect(() => {
    workspace = Blockly.inject("blocklyDiv", {
      comments: true,
      collapse: false,
    });
    const blocklyArea: any = document.getElementById("blocklyArea");
    const blocklyDiv: any = document.getElementById("blocklyDiv");

    const onresize = function () {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      let element: any = blocklyArea;
      let x = 0;
      let y = 0;
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
      } while (element);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + "px";
      blocklyDiv.style.top = y + "px";
      blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
      blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
      Blockly.svgResize(workspace);
      workspace.zoomToFit();
    };
    window.addEventListener("resize", onresize, false);
    onresize();

    if (initialBlocks) {
      const workspaceUtils = new WorkspaceUtils(workspace);
      workspaceUtils.processBlockDefintion(initialBlocks);
    }

    function generateCode(event: any) {
      console.log(event.type);

      let code = ModuloCodeGenerator.workspaceToCode(workspace);
      console.log("Got code", code);
      if (code.length) {
        code = code.replace(/\s+/g, " ");
        setModuloProgram(code);
      }
    }
    workspace.addChangeListener(generateCode);

    return () => {
      workspace.clear();
    };
  }, [setModuloProgram]);

  return (
    <div id="blocklyArea" style={{ width: "100%", height: "100vh" }}>
      <div id="blocklyDiv" style={{ position: "absolute" }}></div>
    </div>
  );
}

