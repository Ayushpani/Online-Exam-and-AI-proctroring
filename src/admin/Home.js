import React from 'react'
import SimpleImageSlider from "react-simple-image-slider"
import logo from "../images/website_logo.jpeg"
import photo1 from "../images/slider_photo1.jpeg"
import photo2 from "../images/slider_photo2.jpeg"
import photo3 from "../images/slider_photo3.jpeg"
import "./css/home.css"
import { useNavigate, useLocation, Link } from "react-router-dom"

function Home() {
    const history = useNavigate();
    const handleLogout = () => {
        localStorage.clear('token');
        history("/Login")
    }
    const home = () => {
        history("/Home", { state: { id: location.state.id }});
    }
    const new_test = () => {
        history("/Home/newTest", { state: { id: location.state.id }});
    }
    const existing_test = () => {
        history("/Home/existingTest", { state: { id: location.state.id }});
    }
    const sliderImages = [photo1, photo2, photo3]
    const location = useLocation()
    return (
        <div className="homepage">
            <div id = "nav">
                <div id = "nav_logo">
                    <img id="logo" src={logo} alt="website_logo" />
                    <figcaption id="logo_caption">Quizwizard</figcaption>
                </div>
                <input type = "button" onClick = {home} className = "nav_btn" value = "Home"/>
                <input type = "button" onClick = {handleLogout} className = "nav_btn" value = "Log out"/>
            </div>
            <br />
            <center>
                <div>
                    <SimpleImageSlider autoPlay={true} showBullets={true} width={700} height={470} images={sliderImages} showNavs={true} />
                </div>
                <hr />

                <h1>Hello {location.state.id} and Welcome to the Teacher homepage</h1>
                <div>
                    <h2>What would you like to do:</h2>
                    <input type="button" onClick = {new_test} className="test_button" id="new_test" value="Click to create a new test" />
                    &nbsp;&nbsp;&nbsp;
                    <input type="button" onClick = {existing_test} className="test_button" id="contribute" value="Click to contribute to a test" />
                </div>
            </center>
        </div>
    )
}

export default Home