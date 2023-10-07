import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation, Link } from "react-router-dom"
import './css/new_test.css'
import logo from "../images/website_logo.jpeg"

function New_test() {

    const [test_name, setTestname] = useState('');
    const [test_author, setAuthor] = useState('');
    const [author_email, setEmail] = useState('');

    const history = useNavigate();
    const location = useLocation();
    const email = location.state.id;
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
    async function submit(e) {
        e.preventDefault();

        if (!test_author || !test_name || !author_email) {
            alert("Enter all the required details");
            return false;
        }

        if (test_author && test_name && author_email) {
            if (!/.+@gmail\.com/.test(author_email) || email != author_email) {
                alert("Enter valid email id");
                return (false);
            }
        }

        try {
            await axios.post("http://localhost:8000/Home/newTest", {
                test_name, test_author, author_email
            })
                .then(res => {
                    if (res.data == "exist") {
                        alert("Test already exists")
                    }
                    else if (res.data == "Wrong username") {
                        alert("Wrong username")
                    }
                    else {
                        history("/Home/addQuestions", { state: { id: test_name, email_id: email } })
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='new_test'>
            <div id="nav">
                <div id="nav_logo">
                    <img id="logo" src={logo} alt="website_logo" />
                    <figcaption id="logo_caption">Quizwizard</figcaption>
                </div>
                <input type="button" onClick={home} className="nav_btn" value="Home" />
                <input type="button" onClick={handleLogout} className="nav_btn" value="Log out" />
            </div>
            <div id="after_nav">
                <form action="POST">
                    <br/>
                    <table border="1" cellSpacing="0" width="50%" className = "test_information">
                        <tr>
                            <td>Enter the name of the test:</td>
                            <td>
                                <input className="text_box" type="text" onChange={(e) => { setTestname(e.target.value) }} placeholder="Test Name" />
                            </td>
                        </tr>
                        <tr>
                            <td>Enter your name:</td>
                            <td>
                                <input className="text_box" type="text" onChange={(e) => { setAuthor(e.target.value) }} placeholder="Author Name" />
                            </td>
                        </tr>
                        <tr>
                            <td>Author email id:</td>
                            <td>
                                <input className="text_box" type="text" onChange={(e) => { setEmail(e.target.value) }} placeholder="Author email id" />
                            </td>
                        </tr>
                        <tr>
                            <td>Click to start adding questions:</td>
                            <td>
                                <input id="sub_btn" type="submit" onClick={submit} />
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default New_test