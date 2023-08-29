import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {

    const history = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPasswd] = useState('');

    async function createUser(e){
        try{
            axios.post("http://localhost:8000/user/Signup", {
                name, email, dob, password
            })
            .then(res => {
                if(res.data == "exists"){
                    alert("User already exists");
                }
                else{
                    history("/Uhome");
                }
            })
            .catch(e => {
                alert("There was error inserting data");
                console.log(e);
            })
        }
        catch(e){
            alert("There is some error")
            console.log(e);
        }
    }
    
    return (
        <div className="userSignup">
            <div className="user_signup_form">
                <form className="uSignup_form">
                    <h2>Create a new account on Quizwizard</h2>
                    <div className="name_field">
                        <label>Enter your name: </label>
                        <input type="text" onChange = {(e) => setName(e.target.value)} placeholder="Enter your name" />
                    </div>
                    <div className="email_id_field">
                        <label>Enter your email ID: </label>
                        <input type="text" onChange = {(e) => setEmail(e.target.value)} placeholder="Enter your email ID" />
                    </div>
                    <div className="DOB">
                        <label>Please choose your date of birth:</label>
                        <input type="date" onChange = {(e) => setDob(e.target.value)}/>
                    </div>
                    <div className="passwd">
                        <label>Create a password for your account: </label>
                        <input type="password" onChange = {(e) => setPasswd(e.target.value)} placeholder="Enter your password" />
                    </div>
                    <input className="create_btn" type="button" value="Create account" onClick={createUser} />
                    <p>OR</p>
                    <div className = "signin_link">
                        <Link to = "/Signin">Click to signin</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
