import React, { useState, useEffect } from "react"
import axios from "axios"
import "./css/signup.css"
import { useNavigate, Link } from "react-router-dom"

function Login() {

    const history = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:8000/Signup",{
                name,email,password
            })
            .then(res => {
                if(res.data == "exist"){
                    alert("User already exists")
                }
                else if(res.data == "not exist"){
                    history("/Home", {state: {id: name}})
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
                    <h1>Admin signup</h1>
                    <input type="name" onChange={(e) => { setName(e.target.value) }} placeholder="Name" name="" id="" />
                    <br/>
                    <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="" id="" />
                    <br/>
                    <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="" id="" />
                    <br/>
                    <input type="submit" onClick = {submit} id = "submit"/>
                    <p>OR</p>
                    <br/>
                    <Link to="/Login">Login Page</Link>
                </form>
            </div>
        </center>
    )
}

export default Login