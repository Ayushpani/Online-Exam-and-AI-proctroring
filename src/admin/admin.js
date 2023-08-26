import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./css/admin.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Admin() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:8000/admin")
            .then(res => {
                setData(res.data)
            })
            .catch(e => {
                console.log(e);
                alert("unable to fetch data");
            })
    }, []);

    async function del(email) {
        try {
            await axios.post("http://localhost:8000/admin/delete", {
                email
            })
            .then(res => {
                if(res.data == "deleted successfully"){
                    alert("User has been deleted");
                }
            })
            .catch(e => {
                console.log(e);
                alert("There was a error while deleting");
            })
        }
        catch(e){
            console.log(e);
        }
    }

    const [name, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function add(){
        axios.post("http://localhost:8000/admin/add", {
            name, email, password
        })
        .then(res => {
            if(res.data == "exist"){
                alert("User already exists")
            }
        })
        .catch(e => {
            alert("Wrong details");
            console.log(e);
        })
    }

    return (
            <div className="admin_page">
                <div className = "nav">
                    <h1>Welcome to the Admin page</h1>
                    <hr/>
                </div>
                <table border="1" width="50%" cellspacing="0">
                    <tr>
                        <th>Username</th>
                        <th>Email ID</th>
                        <th>Password</th>
                        <th>Delete user?</th>
                    </tr>
                    {data.map(i => {
                        return (
                            <tr>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.password}</td>
                                <td><button onClick={() => del(i.email)}>Delete user</button></td>
                            </tr>
                        )
                    })}
                </table>
                <Popup trigger = 
                    {<p id = "add_symbol">&#43; Add new users</p>} modal nested>
                        <form>
                            <h1>Create a new user</h1>
                            <div className = "username">
                                <label>Enter the username: </label>
                                <input className = "text_box_user" type = "text" placeholder = "Enter the username" onChange = {(e) => setUsername(e.target.value)}/>
                            </div>
                            <div className = "email">
                                <label>Enter the Email ID: </label>
                                <input className = "text_box_user" type = "text" placeholder = "Enter the Email ID" onChange = {(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className = "password">
                                <label>Create a password for the user: </label>
                                <input className = "text_box_user" type = "password" placeholder = "Create a password" onChange = {(e) => setPassword(e.target.value)}/>
                            </div>
                            <div className = "submit_div">
                                <input className = "submit" type = "button" onClick = {add} value = "Add user"/>
                            </div>
                        </form>
                </Popup>
            </div>
        )
    }

    export default Admin