"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState, Compartment } from "@codemirror/state";
import { HighlightStyle } from "@codemirror/language";
import { ViewUpdate, keymap } from "@codemirror/view";
import { EditorView, basicSetup } from "codemirror";
import { syntaxHighlighting } from "@codemirror/language";
import readOnlyRangesExtension from "codemirror-readonly-ranges";
import { tags } from "@lezer/highlight";
import {cobalt} from 'thememirror';
import {indentWithTab} from "@codemirror/commands"


const myHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#fc6" },
  { tag: tags.comment, color: "#f5d", fontStyle: "italic" },
]);

const customTheme = EditorView.theme({
  '&': {
      font:"'JetBrains Mono', monospace",
      fontSize: "1.2em"
  }
})



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

export default function IterationLambdaEditor({ setUserCode, userCode, codeError }: any) {
  const codeEditorRef = useRef(null);
  const [edtiorView, setEditorView] = useState<any>(null);

  console.log({codeError});
  

  useEffect(() => {
    console.log("wtf");

    let language = new Compartment(),
      tabSize = new Compartment();

    if (codeEditorRef?.current) {
      let startState = EditorState.create({
        doc: userCode,
        extensions: [
          keymap.of(defaultKeymap),
          keymap.of([indentWithTab]),
          EditorView.updateListener.of((update: ViewUpdate) => {
            setUserCode((update.state.doc as any).text.join("\n"));
          }),
          basicSetup,
          cobalt,
          customTheme,
          javascript(),
          syntaxHighlighting(myHighlightStyle),
          readOnlyRangesExtension(getReadOnlyRanges),
        ],
      });


      const editorView = new EditorView({
        state: startState,
        parent: codeEditorRef.current,
      });
      setEditorView(editorView);
    }

    return () => {
      codeEditorRef.current = null;
    };
  }, [codeEditorRef, edtiorView]);

  return (
    <>
      {codeError ? <div className="text-red-400 font-bold"> {codeError.message}</div> : null}
      <div className="w-full h-[500px]" ref={codeEditorRef} />
    </>
  );
}

