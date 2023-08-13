import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./admin/Home";
import Login from "./admin/Login";
import Signup from "./admin/Signup";
import Uhome from "./user/home";
import Ulogin from "./user/login";
import Usignup from "./user/signup";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Signup" element={<Signup />} />
				<Route path="/Home" element={<Home />} />
				<Route path="/Ulogin" element={<Ulogin />} />
				<Route path="/Usignup" element={<Usignup />} />
				<Route path="/Uhome" element={<Uhome />} />
			</Routes>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
