import './App.css'
import { Link } from "react-router-dom";

function App() {
	return (
		<center>
			<div className="App">
				<div>
					<Link className = "link" to = "/Login">
						<input type = "button" className = "login_btn" value = "Teacher login"/>
					</Link>
					&nbsp;&nbsp;
					<Link className = "link" to = "/Signin">
						<input type = "button" className = "login_btn" value = "User login"/>
					</Link>
				</div>
			</div>
		</center>
	);
}

export default App;
