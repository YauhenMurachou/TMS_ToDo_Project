import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from '../../utils/routes';

import '../SignIn/SignIn.scss'

const SignIn = () => {

	const [loginForm, setLoginForm] = useState({ loginValue: '', pswValue: '' });
	const [loginFormError, setLoginFormError] = useState({ loginError: '', pswError: '' });

	const handleCheckEmptyForm = (event, inputName, errorName) => {
		const loginFormCopy = { ...loginForm };
		const loginFormErrorCopy = { ...loginFormError };

		if (loginFormCopy[inputName] === '') {
			loginFormErrorCopy[errorName] = 'empty'
			setLoginFormError(loginFormErrorCopy)
		}

	}

	const handleChangeLoginForm = (event, inputName, errorName) => {
		const loginFormCopy = { ...loginForm };
		const loginFormErrorCopy = { ...loginFormError };
		const { value: inputValue } = event.target;
		loginFormErrorCopy[errorName] = '';
		setLoginFormError(loginFormErrorCopy);
		loginFormCopy[inputName] = inputValue;
		setLoginForm(loginFormCopy);
	};

	const { loginValue, pswValue } = loginForm;
	const { loginError, pswError } = loginFormError;



	return (
		<div>
			<form action='#' method='post' className='registr-form'>

				<div className='imgcontainer'>
					<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxfDAMqK3mhyikTk6uhY8Bn3HdpjkMvuzLQ&usqp=CAU' alt='Avatar' class='avatar' />
				</div>

				<div className='container'>
					<label for='login'><b>Username</b></label>
					<input type='email' placeholder='Enter Login'
						name='login' className='login-input'
						value={loginValue}
						onChange={event => handleChangeLoginForm(event, 'loginValue', 'loginError')}
						onBlur={event => handleCheckEmptyForm(event, 'loginValue', 'loginError')}
						required />

					{
						loginError === 'empty' &&
						<div className='login-error'>Please, enter login </div>
					}

					<label for='psw'><b>Password</b></label>
					<input type='password' placeholder='Enter Password'
						name='psw' className='password-input'
						value={pswValue}
						onChange={event => handleChangeLoginForm(event, 'pswValue', 'pswError')}
						onBlur={event => handleCheckEmptyForm(event, 'pswValue', 'pswError')}
						required />

					{
						pswError === 'empty' &&
						<div className='psw-error'>Please, enter password </div>
					}

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