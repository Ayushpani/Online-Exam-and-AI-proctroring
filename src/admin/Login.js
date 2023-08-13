import React, { useState, useEffect } from "react"
import axios from "axios"
import "./css/login.css"
import { useNavigate, Link } from "react-router-dom"

function Login() {

    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8000/",{
                email,password
            })
            .then(res => {
                if(res.data == "exists"){
                    history("/Home", {state: {id: email}})
                }
                else if(res.data == "not exist"){
                    alert("User has not signed up")
                }
            })
            .catch(e => {
                alert("Wrong details");
                console.log(e);
            })
        }
        catch(e){
            console.log(e);
        }

    }

    return (
        <center>
            <div className="Login">

                <form action="POST">
                    <h1>Admin login</h1>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="" id="email" />
                    <br/>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="" id="password" />
                    <br/>
                    <input type="submit" onClick = {submit} id = "submit"/>
                    <p>OR</p>
                    <br />
                    <Link to="/Signup">Sign up page</Link>
                </form>
            </div>
        </center>
    )
}

export default Login