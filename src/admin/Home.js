import React from 'react'
import SimpleImageSlider from "react-simple-image-slider"
import logo from "../images/website_logo.jpeg"
import photo1 from "../images/slider_photo1.jpeg"
import photo2 from "../images/slider_photo2.jpeg"
import photo3 from "../images/slider_photo3.jpeg"
import "./css/home.css"
import { useNavigate, useLocation, Link } from "react-router-dom"

function Home() {
    const location = useLocation()
    const history = useNavigate();
    if (!location.state) {
        history("/Login");
        alert("Please login");
    }
    const handleLogout = () => {
        history(location.pathname, { replace: true });
        history("/Login")
    }
    const home = () => {
        history("/Home", { state: { id: location.state.id } });
    }
    const new_test = () => {
        history("/Home/newTest", { state: { id: location.state.id } });
    }
    const existing_test = () => {
        history("/Home/existingTest", { state: { id: location.state.id } });
    }
    const sliderImages = [photo1, photo2, photo3]
    return (
        <div className="homepage">
            <div id="nav">
                <div id="nav_logo">
                    <img id="logo" src={logo} alt="website_logo" />
                    <figcaption id="logo_caption">Quizwizard</figcaption>
                </div>
                <input type="button" onClick={home} className="nav_btn" value="Home" />
                <input type="button" onClick={handleLogout} className="nav_btn" value="Log out" />
            </div>
            <div id="after_nav">
                <br />
                <div className="slider">
                    <br/>
                    <div id = "image_slider">
                        <SimpleImageSlider autoPlay={true} showBullets={true} width={650} height={470} images={sliderImages} showNavs={true} />
                    </div>
                    <br />
                </div>
                <div className="welcome">
                    <div className="welcomeContainer">
                    <h1 className='hello'>Hello {location.state.id} and Welcome to the Teacher homepage</h1>
                    <div className = "content">
                        <h2>What would you like to do:</h2>
                        <input type="button" onClick={new_test} className="test_button" id="new_test" value="Click to create a new test" />
                        &nbsp;&nbsp;&nbsp;
                        <input type="button" onClick={existing_test} className="test_button" id="contribute" value="Click to contribute to a test" />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home