import React from 'react';

// Import components
import FullscreenToggler from '@/FullscreenToggler';
import SignOut from '@/SignOut';
import Logo from '@/Logo';
import UserIndicator from '@/UserIndicator';

// Import styles
import './header.scss';

const Header:React.FC = () => {
  return (
    <header className="header">
      <Logo />
      <FullscreenToggler />
      <UserIndicator />
      <SignOut />
    </header>
  );
};

export default Header;