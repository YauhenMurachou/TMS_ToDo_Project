import React from "react";
import { Link } from "react-router-dom";
import { Routes } from '../../utils/routes';

import '../Registration/Registration.scss'

const Registration = () => {
	return (
		<div>
			<h1>
				Page of registration
			</h1>

			<form action="#" method="post">
				<div className="imgcontainer">
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxfDAMqK3mhyikTk6uhY8Bn3HdpjkMvuzLQ&usqp=CAU" alt="Avatar" class="avatar" />
				</div>

				<div className="container">
					<label for="uname"><b>Username</b></label>
					<input type="text" placeholder="Enter Username" name="uname" required />
					<label for="psw"><b>Password</b></label>
					<input type="password" placeholder="Enter Password" name="psw" required />

					<button type="submit" className='sub-btn'>Login</button>
					<label>
						<input type="checkbox" checked="checked" name="remember" /> Remember me
					</label>
				</div>

				<div className="container">
					<button type="button" className="cancelbtn">Cancel</button>
					<span className="psw">Forgot <a href="#">password?</a></span>
				</div>
			</form>




			<button>
				<Link to={Routes.SignInRoute} >
					<span>Назад</span>
				</Link>
			</button>
		</div>
	)
};

export default Registration;