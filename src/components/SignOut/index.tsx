import React from 'react';
import HeaderButton from '@/ui/HeaderButton';
import { LogOut } from 'react-feather';

// Import Redux
import { useDispatch } from 'react-redux';
import ActionTypes from '@actionTypes';

// Import styles
import HeaderItem from '@/HeaderItem';

const SignOut:React.FC = () => {
  const dispatch = useDispatch();
  return (
    <HeaderItem>
      <HeaderButton onClick={() => dispatch({ type: ActionTypes.SIGN_OUT })}>
        {<LogOut size={20} />}
      </HeaderButton>
      <p>Выход</p>
    </HeaderItem>
  );
};

export default SignOut;