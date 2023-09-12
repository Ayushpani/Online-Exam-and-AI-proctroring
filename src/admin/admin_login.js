import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "./css/admin_login.css";

function AdminLogin(){

    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPasswd] = useState('');

    async function login(e){
        e.preventDefault();

        if(!email || !password){
            alert("Enter the email id and password");
            return false;
        }

        if (email && password){
            if (!/.+@gmail\.com/.test(email)) {
                alert("Enter valid email id");
                return(false);
            }
        }

        await axios.post("http://localhost:8000/adminLogin", {
            email, password
        })
        .then(res => {
            if (res.data == "admin valid") {
                history("/admin", { state: { id: email }});
            }
            else if(res.data == "wrong password") {
                alert("Please enter the correct password");
            }
            else if(res.data == "no admin") {
                alert("There is no admin");
            }
        })
        .catch(e => {
            console.log(e);
        })
    }

    return(
        <div className = "admin_login">
            <form>
                <h2 id = "heading_admin_login">Admin Login</h2>
                <div>
                    <label className = "email_label">Enter your email id:</label>
                    <input className = "email_input" type = "email" pattern = ".+@gmail\.com" placeholder = "Enter your email id" onChange = { (e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label className = "passwd_label">Enter your password:</label>
                    <input className = "passwd_input" type = "password" placeholder = "Enter your password" onChange = { (e) => setPasswd(e.target.value)} required/>
                </div>
                <div id = "btn">
                    <input className = "btn" type = "submit" onClick = {login}/>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin