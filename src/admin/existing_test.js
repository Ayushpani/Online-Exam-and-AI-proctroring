import logo from "../images/website_logo.jpeg"
import './css/existing_test.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Existing_test() {
    const location = useLocation();
    const email = location.state.id;
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:8000/Home/existingTest', {
            email
        })
            .then(res => {
                setData(res.data);
            })
            .catch(e => {
                alert("Data couldn't be fetched");
            });
    }, []);
    const history = useNavigate();
    if (!location.state) {
        alert("Please login");
        history("/Login");
    }
    const handleLogout = () => {
        history(location.pathname, { replace: true });
        history("/Login")
    }
    const home = () => {
        history("/Home", { state: { id: location.state.id } });
    }
    const addQuestions = (test_name) => () => {
        history("/Home/addQuestions", { state: { id: test_name, email_id: email } });
    }
    let box = document.querySelector('.container');
    const btnpressprev = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
        console.log(width)
    }
    const btnpressnext = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width;
        console.log(width)
    }
    return (
        <div className="existing_test">
            <div id="nav">
                <div id="nav_logo">
                    <img id="logo" src={logo} alt="website_logo" />
                    <figcaption id="logo_caption">Quizwizard</figcaption>
                </div>
                <input type="button" onClick={home} className="nav_btn" value="Home" />
                <input type="button" onClick={handleLogout} className="nav_btn" value="Log out" />
            </div>
            <br />
            <button className="pre-btn" onClick={btnpressprev}><p>&lt;</p></button>
            <button className="nxt-btn" onClick={btnpressnext}><p>&gt;</p></button>
            <div className="container">
                {data.map(i => {
                    return (
                        <div>
                            <div className="tests" onClick={addQuestions(i.test_name)}>
                                <div id="test_name">{i.test_name}</div>
                                <div id="test_author">Test author: {i.test_author}</div>
                                <div id="no_of_questions">No. of Questions: {i.no_of_questions}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Existing_test