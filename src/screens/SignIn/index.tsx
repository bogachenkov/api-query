import React from 'react';

// Import components
import SignInForm from '@/SignInForm';
import SignInGrid from '@/ui/SignInGrid';
import SignInImage from '@/ui/SignInImage';
import useAuthCheck from '@hooks/useAuthCheck';

const SignIn:React.FC = () => {
  useAuthCheck(true);
  return (
    <SignInGrid>
      <SignInImage />
      <SignInForm />
    </SignInGrid>
  );
};

export default React.memo(SignIn);