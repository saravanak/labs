'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { ViewUpdate, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import readOnlyRangesExtension from 'codemirror-readonly-ranges';

// Specify some output parameters
const settings: any = {
  // The [ width, height ] of the artwork in pixels
  dimensions: [120, 120],
};

const getReadOnlyRanges = (
  targetState: EditorState
): Array<{ from: number | undefined; to: number | undefined }> => {
  return [
    {
      from: targetState.doc.line(1).from,
      to: targetState.doc.line(3).to,
    },
    {
      from: targetState.doc.line(targetState.doc.lines - 2).from,
      to: targetState.doc.line(targetState.doc.lines).to,
    },
  ];
};

export default function ArtCanvas({ data }: any) {
  const canvasRef = useRef(null);
  const codeEditorRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [userCode, setUserCode] = useState(`
  export function logic(x,y) {
    //Add your logic here...
    return x == 3 ? "blue" : "black" ;
    //End your logic here...
  };
  `);

  const sketch = useCallback(
    (props: any) => {
      let expendedArray = [];

      let rle = data.stdout.rle;

      const regexp = new RegExp(/^([bB]\d+)/);

      let match = rle.match(regexp);

      while (match) {
        const [letter, ...count] = match[1].split('');

        expendedArray.push(...Array(Number(count.join(''))).fill(letter));
        rle = rle.slice(match[1].length);
        match = rle.match(regexp);
      }

      expendedArray = expendedArray.map((v) => (v == 'b' ? 'gray' : 'blue'));

      // Destructure what we need from props
      const { context, width, height } = props;

      // Fill the canvas with pink

      for (var i = 0; i < 100; i++) {
        context.fillStyle = expendedArray[i];
        context.fillRect(10 * (i % 10), 10 * Math.floor(i / 10), 10, 10);
      }
    },
    [data?.stdout?.rle]
  );

  useEffect(() => {
    if (codeEditorRef?.current) {
      console.log('instantiating codemirror');

      let startState = EditorState.create({
        doc: userCode,
        extensions: [
          keymap.of(defaultKeymap),
          EditorView.updateListener.of((update: ViewUpdate) => {
            setUserCode((update.state.doc as any).text.join('\n'));
          }),
          readOnlyRangesExtension(getReadOnlyRanges),
        ],
      });

      let view = new EditorView({
        state: startState,
        extensions: [basicSetup, javascript()],
        parent: codeEditorRef.current,
      });
    }
  }, [codeEditorRef, isClient]);

  useEffect(() => {
    setIsClient(true);

    if (canvasRef.current) {
      settings.canvas = canvasRef.current;
      canvasSketch(sketch, {
        ...settings,
        canvas: canvasRef.current,
      });
    }
  }, [canvasRef, isClient, sketch]);
  return (
    <>
      {isClient ? (
        <div>
          <div className='w-[500px] h-[500px]' ref={codeEditorRef} />
          <canvas ref={canvasRef} />
        </div>
      ) : null}
    </>
  );
}
