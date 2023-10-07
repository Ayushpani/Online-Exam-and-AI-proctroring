import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './css/Signin.css'

function Signin() {

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPasswd] = useState('');

    async function authenticate(e) {

        e.preventDefault();

        if (!email || !password) {
            alert("Enter the email id and password");
            return false;
        }

        if (email && password) {
            if (!/.+@gmail\.com/.test(email)) {
                alert("Enter valid email id");
                return (false);
            }
        }

        try {
            axios.post("http://localhost:8000/user/Signin", {
                email, password
            })
                .then(res => {
                    if (res.data == "exists") {
                        history("/Uhome", { state: { id: email } });
                    }
                    else if (res.data == "incorrect password") {
                        alert("Please enter the correct password");
                    }
                    else {
                        alert("You need to signup first")
                    }
                })
                .catch(e => {
                    alert("There was error fetching data");
                    console.log(e);
                })
        }
        catch (e) {
            alert("There is some error")
            console.log(e);
        }
    }

    return (
        <div className="userSignin">
            <form className="uSignin_form">
                <div className='container2'>
                    <h1 className="heading_signin">STUDENT LOGIN</h1>
                    <div className="email_id_field">
                        <label>Enter your email ID: </label><br />
                        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email ID" />
                    </div>
                    <div className="passwd">
                        <label>Enter your password: </label><br />
                        <input type="password" onChange={(e) => setPasswd(e.target.value)} placeholder="Enter your password" />
                    </div>
                    <div className='footer_btn'>
                        <input className="signin_btn" type="submit" value="Log in" onClick={authenticate} />
                        <p>OR</p>
                        <Link to="/Signup">Click to SIGN UP</Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Signin
