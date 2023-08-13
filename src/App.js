import './App.css'
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
	return (
		<center>
			<div className="App">
				<div>
					<Link className = "link" to = "/Login">
						<input type = "button" className = "login_btn" value = "Admin login"/>
					</Link>
					<Link className = "link" to = "/Ulogin">
						<input type = "button" className = "login_btn" value = "User login"/>
					</Link>
				</div>
			</div>
		</center>
	);
}

export default App;
