import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin/admin";
import AdminLogin from "./admin/admin_login";
import Home from "./admin/Home";
import Login from "./admin/Login";
import NewTest from "./admin/new_test"
import ExistingTest from "./admin/existing_test"
import AddQuestions from "./admin/addQuestions"
import Signup from './user/Signup';
import Signin from './user/Signin';
import UserApp from './user/App';
import About from './user/containers/aboutus/about'
import Test from './user/userTest/Attempt';
import Terms from './user/userTest/TermsAndConditions'
import Check from './user/userTest/check'
import StartTest from './user/userTest/Test'
import Result from './user/userTest/result'
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/adminLogin" element={<AdminLogin />} />
				<Route path="/admin" element={<Admin />} />
				<Route path="/Login" element={<Login />} />
				<Route path="/Home" element={<Home />} />
				<Route path = "/Home/newTest" element = {<NewTest/>} />
				<Route path = "/Home/existingTest" element = {<ExistingTest/>} />
				<Route path = "/Home/addQuestions" element = {<AddQuestions/>} />
				<Route path='/Uhome' element={<UserApp />} />
				<Route path='/aboutus' element={<About />} />
				<Route path='/Signin' element={<Signin />} />
				<Route path='/Signup' element={<Signup />} />
				<Route path='/test' element={<Test />} />
				<Route path='/test/terms' element={<Terms />} />
				<Route path='/test/check' element={<Check />} />
				<Route path='/test/startTest' element={<StartTest />} />
				<Route path='/test/result' element={<Result />} />
			</Routes>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
