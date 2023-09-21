import React, { useState} from 'react';
import './navbar.css';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo2.png'
import { useNavigate } from 'react-router-dom';
// BEM -> block element modifier

const Menu = ({email}) => {

  const history = useNavigate();

  const test = async() => {
    history("/test", { state: { id: email }});
  }
  return(
    <><p><a href="#home">Home</a></p>
          <p><a href="#home">What is QuizWizard ?</a></p>
          <p onClick = {test}>Tests</p>
          </>
  )
}

const Navbar = ({email}) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const history = useNavigate();
  function adminLogin(){
    history("/Login")
  }
  return (
    <div className = "quiz__navbar">
      <div className="quiz__navbar-links">
        <div className = "quiz__navbar-links_logo">
          <img src={logo} height={100}  alt="logo" />
        </div>
        <div className="quiz__navbar-links_container">
          <Menu email = {email}/>
        </div>
      </div>
      <div className="quiz__navbar-sign">
        <p>Sign in</p>
        <button type="button" onClick = {adminLogin}><span>Sign up</span></button>
      </div>
      <div className="quiz__navbar-menu">
      {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="quiz__navbar-menu_container scale-up-center">
          <div className="quiz__navbar-menu_container-links">
         <Menu email = {email}/>
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
