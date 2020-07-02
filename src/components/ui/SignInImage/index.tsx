import React from 'react';

// Import images
// @ts-ignore
import img from '@images/sign-in.png';

// Import styles
import './sign-in-image.scss';

const SignInImage:React.FC = () => {
  return (
    <div className="sign-in-image" style={{ backgroundImage: `url("${img}")` }} />
  );
};

export default SignInImage;