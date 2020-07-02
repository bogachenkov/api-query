import React from 'react';

// Import components
import AppGrid from '@/ui/AppGrid';
import History from '@/Panels/History';
import Header from '@/Panels/Header';
import useAuthCheck from '@hooks/useAuthCheck';
import Editor from '@/Panels/Editor';

const Main:React.FC = () => {
  useAuthCheck();
  return (
    <AppGrid>
      <Header />
      <History />
      <Editor />
    </AppGrid>
  );
};

export default Main;