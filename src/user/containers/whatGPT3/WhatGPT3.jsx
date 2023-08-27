import React from 'react';
import './whatGPT.css';
import { Feature } from '../../components';
const WhatGPT3 = () => {
  return (
    <div className="quiz__whatproctor" id="proctor">
    <div className="quiz__whatproctor-feature">
      <Feature title="What is new ??"/>
    </div>
      <div className="quiz__whatproctor-heading">
        <h1 className="gradient__text"> Experience the Real Environment of Exam</h1>
      </div>
      <div className="quiz__whatproctor-container">
        <Feature title="Proctoring" text="You will be monitored using the camera in your laptop, which will keep a look on your face and eye movement and warn you whenever sees an unwanted movement"/>

        <Feature title="Analysis" text="You will get to know your weak and strong points through our website, which you can use to increase your performance in your next test" />

        <Feature title="Be Exam Ready"
          text="We provide the tests and paper that have questions that will most probably will be asked in your exam, so by increasig your chance of selection in your dream company"
        />
      </div>
    </div>
  );
}

export default WhatGPT3;
