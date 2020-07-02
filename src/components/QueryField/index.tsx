import React from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

// Import Redux
import { useSelector } from 'react-redux';
import { getSelectedValue } from '@selectors';

// Import Components
import CodeEditor from '@/CodeEditor';

const QueryField = React.forwardRef((_, editorRef: React.MutableRefObject<editor.IStandaloneCodeEditor>) => {
  const selectedRecord = useSelector(getSelectedValue);
  return (
    <section>
      <CodeEditor ref={editorRef} value={selectedRecord.value} id={selectedRecord.id} />
    </section>
  );
});

export default QueryField;