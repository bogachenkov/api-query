import React, { useCallback, useRef, useState } from 'react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js';

// Import redux
import { useSelector, useDispatch } from 'react-redux';
import Actions from '@actions';
import { getEditorWidth, getSelectedID } from '@selectors';

// Import components
import SplitPane from '@/ui/SplitPane';
import QueryField from '@/QueryField';
import ResponseField from '@/ResponseField';
import EditorActions from '@/Panels/EditorActions';

const Editor:React.FC = () => {
  const [validationError, setValidationError] = useState<string>(null);
  const queryEditor = useRef<editor.IStandaloneCodeEditor | null>(null);
  const responseEditor = useRef<editor.IStandaloneCodeEditor | null>(null);

  const id = useSelector(getSelectedID);
  const editorWidth = useSelector(getEditorWidth);
  const dispatch = useDispatch();

  const formatEditorsData = useCallback(async () => {
    await queryEditor.current?.getAction('editor.action.formatDocument').run();
  }, []);

  const removeComments = useCallback((str: string) => str.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1').trim(), []);

  const validateJSON = useCallback((str: string) => {
    try {
      JSON.parse(str)
      return true;
    } catch (error) {
      return false;
    }
  }, [])

  const sendQuery = useCallback(() => {
    const value = queryEditor.current?.getValue();
    const clearedValue = removeComments(value);
    if (!validateJSON(clearedValue)) {
      setValidationError('Ошибка: Невалидный JSON!');
      return;
    };
    setValidationError(null);
    dispatch(Actions.requestQuery({ value, id }));
  }, [id]);

  const onResize = useCallback((width: number) => {
    dispatch(Actions.setWidthOnResize(width));
  }, [])
  
  return (
    <>
      <SplitPane initialWidth={editorWidth} callback={onResize} minWidth={315}>
        <QueryField ref={queryEditor} />
        <ResponseField ref={responseEditor} />
      </SplitPane>
      <EditorActions error={validationError} formatEditorsData={formatEditorsData} sendQuery={sendQuery} />
    </>
  );
};

export default React.memo(Editor);