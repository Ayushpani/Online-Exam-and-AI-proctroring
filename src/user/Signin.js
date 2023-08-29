import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Signin() {

    const history = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPasswd] = useState('');

    async function authenticate(e){
        try{
            axios.post("http://localhost:8000/user/Signin", {
                name, email, password
            })
            .then(res => {
                if(res.data == "exists"){
                    history("/Uhome");
                }
                else if(res.data == "incorrect password"){
                    alert("Please enter the correct password");
                }
                else{
                    alert("You need to signup first")
                }
            })
            .catch(e => {
                alert("There was error fetching data");
                console.log(e);
            })
        }
        catch(e){
            alert("There is some error")
            console.log(e);
        }
    }
    
    return (
        <div className="userSignin">
            <div className="user_signin_form">
                <form className="uSignin_form">
                    <h2>Create a new account on Quizwizard</h2>
                    <div className="name_field">
                        <label>Enter your name: </label>
                        <input type="text" onChange = {(e) => setName(e.target.value)} placeholder="Enter your name" />
                    </div>
                    <div className="email_id_field">
                        <label>Enter your email ID: </label>
                        <input type="text" onChange = {(e) => setEmail(e.target.value)} placeholder="Enter your email ID" />
                    </div>
                    <div className="passwd">
                        <label>Create a password for your account: </label>
                        <input type="password" onChange = {(e) => setPasswd(e.target.value)} placeholder="Enter your password" />
                    </div>
                    <input className="signin_btn" type="button" value="Log in" onClick={authenticate} />
                    <p>OR</p>
                    <Link to = "/Signup">Click to signup</Link>
                </form>
            </div>
        </div>
    )
}

export default Signin