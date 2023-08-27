import React from 'react';
import './footer.css';
import logo2 from'../../assets/logo2.png';
const Footer = () => {
  return (
    <div className="quiz__footer section__padding">
    <div className="quiz__footer-heading">
      <h1 className="gradient__text">Want To Contact Us ? </h1>
    </div>
      <div className="quiz__footer-btn">
        <p>Learn About terms and Condition </p>
      </div>
      <div className="quiz__footer-links">
      <div className="quiz__footer-links_logo">
        <img src={logo2} height={100} alt="logo" />
      </div>
      <div className="quiz__footer-links_div">
      <div />
        <h4> LINKS </h4>
        <a href='www.instagram.com'>Instagram</a>
        <a href='www.linkedin.com'>Linked in</a>
        <a href='www.twitter'>Twitter</a>
        <a href='www.Facebook.com'>Facebook</a>
      </div>
      <div className="quiz__footer-links_div">
      <div />
        <h4> Company</h4>
        <a href='team'>Know The Team</a>
        <a href='contact us'>Contact us</a>
      </div>
      </div>
      <div className="quiz__footer-copyright">
        <p> 2023 QuizWizard. All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
