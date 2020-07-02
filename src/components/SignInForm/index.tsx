import React, { useState, useCallback } from 'react';
import { User, Lock } from 'react-feather';

// Import Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAuthLoadingStatus } from '@selectors';
import Actions from '@actions';

// Import components
import FormField from '@/ui/FormField';
import Button from '@/ui/Button';
import Spinner from '@/ui/Spinner';

// Import imagse
import logo from '@images/logo.svg';

// Import styles
import './sign-in-form.scss';

const SignInForm = () => {
  const [ login, setLogin ] = useState('SomeUsername');
  const [ password, setPassword ] = useState('qwerty');

  const dispatch = useDispatch();
  const loading = useSelector(getAuthLoadingStatus);

  const validateInputs = useCallback(() => {
    if (login.length < 5 || password.length < 6) return false;
    return true;
  }, [ login, password ]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInputs) return;
    dispatch(Actions.signInAction({ login, password }));
  }, [login, password]);

  return (
    <form onSubmit={handleSubmit} className="sign-in-form">
      <img className="sign-in-form--logo" src={logo} />
      <h1 className="sign-in-form--title">API.Query</h1>
      <FormField name="login"
                value={login}
                onChange={e => setLogin(e.target.value)}
                type="text"
                label="Логин*"
                Icon={User}
      />
      <FormField name="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                type="password"
                label="Пароль*"
                Icon={Lock}
      />
      <Button type="submit" disabled={!validateInputs()}>
        {!loading && 'Вход'}
        {loading && <Spinner size={18} />}
      </Button>
    </form>
  );
};

export default SignInForm;