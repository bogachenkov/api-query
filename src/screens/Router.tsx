import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLoader from '@/ui/AppLoader';

const Main = lazy(() => import('./Main'));
const SignIn = lazy(() => import('./SignIn'));

const Router: React.FC = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/*" element={<Main />} />
      </Routes>
    </Suspense>
  );
};

export default Router;