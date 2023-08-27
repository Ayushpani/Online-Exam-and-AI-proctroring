import React from 'react';
import './feature.css';

const Feature = ({title,text}) => {
  return (
    <div className="quiz__features-container__feature">
        <div className="quiz__features-container__feature-title">
        <div />
          <h1>{title}</h1>
          
        </div>   
        <div className="quiz__features-container__feature-text">
          <p>{text}</p>
        </div> 
    </div>
  );
}

export default Feature;
