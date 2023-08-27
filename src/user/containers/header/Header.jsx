import React from 'react';
import './header.css';
import exam from '../../assets/exam.png';
const Header = () => {
  return (
    <div className =" quiz__header section__padding" id="home">
      <div className="quiz__header-content">
        <h1 className = "gradient_text">Let's increase your Probability of Selection in your drean Institute</h1>
        </div>
        <div className='quiz__header-imag'>
          <img src={exam}/>
        </div>
      </div>
    
  );
}

export default Header;
