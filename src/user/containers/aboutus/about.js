import React, { useState, useEffect } from 'react';
import Krithik from'./images/krithik.png';
import Ayush from './images/ayush.png';
import Unnati from './images/unnati.png';
import Smolya from './images/smolya.png';
import './about.css';

function About() {
    return (
        <div className="aboutbody">
            <h1 class="aboutheading">ABOUT THE TEAM</h1>


            <div class="column1">
                <div class="card">
                    <img src={Unnati} className = "people_images" alt="unn"/>
                        <div class="details">
                            <h2>Unnati Pohankar</h2>
                            <p class="title">Web developer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>spunnati3012@gmail.com</p>

                        </div>
                </div>


                <div class="column2">
                    <div class="card">
                        <img src={Krithik} className = "people_images" alt="kri"/>
                            <div class="details">
                                <h2>Krihtik Patil</h2>
                                <p class="title">Backend and python developer</p>
                                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                                <p>patilkrithik@gmail.com</p>

                            </div>
                    </div>


                    <div class="column3">
                        <div class="card">
                            <img src={Ayush} className = "people_images" alt="ayu"/>
                                <div class="details">
                                    <h2>Ayush Panigrahi</h2>
                                    <p class="title">AI developer</p>
                                    <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                                    <p>ayushpanigrahi@gmail.com</p>

                                </div>
                        </div>


                        <div class="column4">
                            <div class="card">
                                <img src={Smolya} className = "people_images" alt="smol"/>
                                    <div class="details">
                                        <h2>Soham Narsinge</h2>
                                        <p class="title">Front End developer</p>
                                        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                                        <p>narsingesoham@gmail.com</p>

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;