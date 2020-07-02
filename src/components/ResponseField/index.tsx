import React from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

// Import Redux
import { useSelector } from 'react-redux';
import { getResponseValue } from '@selectors';

// Import components
import CodeEditor from '@/CodeEditor';
import NoResponse from '@/NoResponse';

const ResponseField = React.forwardRef((_, editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor>) => {
  const value = useSelector(getResponseValue);
  return (
    <section>
      { value && <CodeEditor ref={editorRef} value={value} isResponseEditor /> }
      { !value && <NoResponse /> }
    </section>
  );
});

export default React.memo(ResponseField);