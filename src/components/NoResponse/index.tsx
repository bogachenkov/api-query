import React from 'react';

// Import images
// @ts-ignore
import img from '@images/no-response.png';

// Import styles
import './no-response.scss';

const NoResponse:React.FC = () => {
  return (
    <section className="no-response">
      <img src={img} alt="No response" />
      <p className="no-response--msg">Нет результата выполнения запроса</p>
    </section>
  );
};

export default NoResponse;