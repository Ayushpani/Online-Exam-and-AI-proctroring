import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin/admin";
import Home from "./admin/Home";
import Login from "./admin/Login";
import Signup from "./admin/Signup";
import NewTest from "./admin/new_test"
import ExistingTest from "./admin/existing_test"
import AddQuestions from "./admin/addQuestions"
import Header from './user/Header';
import Uhome from './user/Home';
import Details from './user/Details';
import Signin from './user/Signin';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Signup" element={<Signup />} />
				<Route path="/Home" element={<Home />} />
				<Route path = "/Home/newTest" element = {<NewTest/>} />
				<Route path = "/Home/existingTest" element = {<ExistingTest/>} />
				<Route path = "/Home/addQuestions" element = {<AddQuestions/>} />
				<Route path='/Uhome' element={<Uhome />} />
				<Route path='/Signin' element={<Signin />} />
				<Route path='/Details' element={<Details />} />
			</Routes>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
