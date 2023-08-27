import React, { useState} from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo2.png'
// BEM -> block element modifier

const Menu = () => (
  <><p><a href="#home">Home</a></p>
          <p><a href="#home">What is QuizWizard ?</a></p>
          <p><a href="/test">Tests</a></p>
          </>
          
)
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <div className = "quiz__navbar">
      <div className="quiz__navbar-links">
        <div className = "quiz__navbar-links_logo">
          <img src={logo} height={100}  alt="logo" />
        </div>
        <div className="quiz__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="quiz__navbar-sign">
        <p>Sign in</p>
        <button type="button" ><span>Sign up</span></button>
      </div>
      <div className="quiz__navbar-menu">
      {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="quiz__navbar-menu_container scale-up-center">
          <div className="quiz__navbar-menu_container-links">
         <Menu />
          </div>
          <div className="quiz__navbar-menu_container-links-sign">
            <p>Sign in</p>
            <button type="button">Sign up</button>
          </div>
        </div>
        )}
        
      </div>
    </div>
  );
}


export default Navbar;
