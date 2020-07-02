import React from 'react';
import { PlayCircle } from 'react-feather';

// Import Redux
import { useSelector } from 'react-redux';
import { getResponseLoadingStatus } from '@selectors';

// Import components
import GithubLink from '@/GithubLink';
import FormatButton from '@/ui/FormatButton';
import Spinner from '@/ui/Spinner';
import Button from '@/ui/Button';

// Import styles
import './editor-actions.scss';

interface IEditorActionsProps {
  error: string;
  formatEditorsData: () => void;
  sendQuery: () => void;
}

const EditorActions:React.FC<IEditorActionsProps> = ({ error, formatEditorsData, sendQuery }) => {
  const loading = useSelector(getResponseLoadingStatus);
  return (
    <footer className="editor-actions">
      <Button onClick={sendQuery}>
        Выполнить
        {!loading && <PlayCircle size={20} />}
        {loading && <Spinner size={20} />}
        {error && <span className="editor-actions--error">{error}</span>}
      </Button>
      <GithubLink />
      <FormatButton onClick={formatEditorsData} />
    </footer>
  );
};

export default EditorActions;