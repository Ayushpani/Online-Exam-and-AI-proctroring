import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation, Link } from "react-router-dom"
import './css/new_test.css'
import logo from "../images/website_logo.jpeg"

function New_test(){

    const [test_name, setTestname] = useState('');
    const [test_author, setAuthor] = useState('');
    const [no_of_questions, setNumber] = useState('');

    const history = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
        localStorage.clear('token');
        history("/Login")
    }
    const home = () => {
        history("/Home", { state: { id: location.state.id }});
    }
    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8000/Home/newTest", {
                test_name, test_author, no_of_questions
            })
            .then(res => {
                if(res.data == "exist"){
                    alert("Test already exists")
                }
                else if(res.data == "Wrong username"){
                    alert("Wrong username")
                }
                else{
                    history("/Home/addQuestions", { state: { id: test_name}})
                }
            })
        }
        catch(e){
            console.log(e);
        }
    }

    return(
        <div className = 'new_test'>
            <div id = "nav">
                <div id = "nav_logo">
                    <img id="logo" src={logo} alt="website_logo" />
                    <figcaption id="logo_caption">Quizwizard</figcaption>
                </div>
                <input type = "button" onClick = {home} className = "nav_btn" value = "Home"/>
                <input type = "button" onClick = {handleLogout} className = "nav_btn" value = "Log out"/>
            </div>
            <br/>
            <form action = "POST">
                <table border = "1" cellSpacing = "0" width = "50%">
                    <tr>
                        <td>Enter the name of the test:</td>
                        <td>
                            <input type = "text" onChange = {(e) => { setTestname(e.target.value) } } placeholder = "Test Name"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Enter your name:</td>
                        <td>
                            <input type = "text" onChange = {(e) => { setAuthor(e.target.value) } } placeholder = "Author Name"/>
                        </td>
                    </tr>
                    <tr>
                        <td>What is the maximum number of questions:</td>
                        <td>
                            <input type = "number" onChange = {(e) => { setNumber(e.target.value) } } placeholder = "No. of questions"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Click to start adding questions:</td>
                        <td>
                            <input id = "sub_btn" type = "submit" onClick = {submit}/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}

export default New_test