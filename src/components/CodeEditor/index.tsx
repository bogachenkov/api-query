import React, { useRef, useEffect } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';
//@ts-ignore
import * as debounce from 'lodash.debounce';

// Import styles
import './code-editor.scss';

const queryEditorTheme:editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'string.key.json', foreground: '#7baeb6', fontStyle: "normal" },
    { token: 'string.value.json', foreground: '#ff564550' },
    { token: 'keyword.json', foreground: '#FF9940' },
    { token: 'number.json', foreground: '#FF9940' },
    { token: 'comment.line.json', foreground: "#ABB0B6", fontStyle: "italic" }
  ],
  colors: {
    'editor.background': '#ffffff00',
    'editor.lineHighlightBackground': '#e4ebee80',
  }
}
editor.defineTheme('query', queryEditorTheme);

const responseEditorTheme:editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'string.key.json', foreground: '#7baeb6', fontStyle: "normal" },
    { token: 'string.value.json', foreground: '#ff564550' },
    { token: 'keyword.json', foreground: '#FF9940' },
    { token: 'number.json', foreground: '#FF9940' },
    { token: 'comment.line.json', foreground: "#ABB0B6", fontStyle: "italic" }
  ],
  colors: {
    'editor.background': '#e4ebee00',
    'editor.lineHighlightBackground': '#e4ebee70',
  }
}
editor.defineTheme('response', responseEditorTheme);

interface ICodeEditorProps {
  value: string;
  id?: string;
  isResponseEditor?: boolean;
}

const CodeEditor = React.forwardRef(({ value, id, isResponseEditor }: ICodeEditorProps, editorInstance: React.MutableRefObject<editor.IStandaloneCodeEditor>) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //@ts-ignore
    const resizeObserver = new ResizeObserver(debounce(
      () => {  editorInstance.current?.layout() },
      15
    ));

    resizeObserver.observe(editorRef.current);
    return () => resizeObserver.unobserve(editorRef.current);
  })

  useEffect(() => {
    editorInstance.current = editor.create(editorRef.current!, {
      language: 'json',
      scrollBeyondLastLine: false,
      hideCursorInOverviewRuler: true,
      overviewRulerBorder: false,
      overviewRulerLanes: 0,
      scrollbar: {
        useShadows: false,
        verticalHasArrows: false,
        verticalScrollbarSize: 10
      },
      minimap: {
        enabled: false
      },
      contextmenu: false,
      value,
      readOnly: isResponseEditor,
      lineNumbers: isResponseEditor ? "off" : "on",
      theme: isResponseEditor ? 'response' : 'query'
    });

    return () => {
      editorInstance.current?.dispose();
    }
  }, []);

  useEffect(() => {
    editorInstance.current.setValue(value)
  }, [value, id])

  return (
    <div ref={editorRef} className={`code-editor ${isResponseEditor ? 'code-editor-readonly' : ''}`} />
  );
});

export default React.memo(CodeEditor);