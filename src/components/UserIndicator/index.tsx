import React from 'react';
import { User } from 'react-feather';

// Import Redux
import { useSelector } from 'react-redux';
import { getLoginSelector } from '@selectors';

// Import components
import HeaderItem from '@/HeaderItem';

// Import styles
import './user-indicator.scss';

const UserIndicator:React.FC = () => {
  const login = useSelector(getLoginSelector);
  return (
    <HeaderItem>
      <div className="user-indicator">
        <User size={18} />
      </div>
      <p>{ login }</p>
    </HeaderItem>
  );
};

export default UserIndicator;