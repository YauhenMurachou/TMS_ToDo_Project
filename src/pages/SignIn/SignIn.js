import React from "react";
import { Link } from "react-router-dom";
import { Routes } from '../../utils/routes';

import '../SignIn/SignIn.scss'

const SignIn = () => {
	return (
		<div>
			<form action='#' method='post' className='registr-form'>

				<div className='imgcontainer'>
					<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxfDAMqK3mhyikTk6uhY8Bn3HdpjkMvuzLQ&usqp=CAU' alt='Avatar' class='avatar' />
				</div>

				<div className='container'>					
					<label for='uname'><b>Username</b></label>
					<input type='email' placeholder='Enter Login' name='uname' className='login-input' required />
					<label for='psw'><b>Password</b></label>
					<input type='password' placeholder='Enter Password' name='psw' className='password-input' required />

					<button type='submit' className='sub-btn'>Sign In</button>
				</div>
				<div className='form-or'>
					or
				</div>
			</form>



			<button className='registration-btn'>
				<Link to={Routes.SignUpRoute} >
					<span>Go to registration</span>
				</Link>
			</button>
		</div>
	)
};

export default SignIn;