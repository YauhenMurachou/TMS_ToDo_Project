import React, { useState } from "react";
import { Link } from "react-router-dom";

import '../SignIn/SignIn.scss';

import { authApi } from "../../api/authApi";
import { Routes } from '../../utils/routes';

const SignIn = () => {

	const [loginForm, setLoginForm] = useState({ userNameValue: '', pswValue: '' });
	const [loginFormError, setLoginFormError] = useState({ userNameError: '', pswError: '' });

	const { userNameValue, pswValue } = loginForm;
	const { userNameError, pswError } = loginFormError;

	const handleChangeLoginForm = (event, inputName, errorName) => {
		const loginFormCopy = { ...loginForm };
		const loginFormErrorCopy = { ...loginFormError };

		const { value: inputValue } = event.target;
		loginFormErrorCopy[errorName] = '';
		setLoginFormError(loginFormErrorCopy);

		loginFormCopy[inputName] = inputValue;
		setLoginForm(loginFormCopy);
	}

	const handleCheckEmptyInput = (loginForm, loginFormError, inputName, errorName) => {
		if (loginForm[inputName] === '') {
			loginFormError[errorName] = 'empty'
			return true
		}
		return false
	}

	const handleCheckEmptyForm = (event = {}, inputName = '', errorName = '') => {
		const loginFormCopy = { ...loginForm };
		const loginFormErrorCopy = { ...loginFormError };

		let resultCheckEmpty = false;
		let resultCheckEmptyLogin = false;
		let resultCheckEmptyPsw = false;

		if (inputName !== '' && errorName !== '') {
			resultCheckEmpty = handleCheckEmptyInput(
				loginFormCopy,
				loginFormErrorCopy,
				inputName,
				errorName
			)

			setLoginFormError(loginFormErrorCopy)
	
		} else {

			resultCheckEmptyLogin = handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, 'userNameValue', 'userNameError')
			resultCheckEmptyPsw = handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, 'pswValue', 'pswError')
			resultCheckEmpty = resultCheckEmptyLogin || resultCheckEmptyPsw

			setLoginFormError(loginFormErrorCopy)
			}
		return resultCheckEmpty
	}


	const handleSubmitForm = async (event) => {
		event.preventDefault()

		if (handleCheckEmptyForm()) {
			return
		}
		const user = {
			userName: userNameValue,
			password: pswValue
		}
		try {
			const res = await authApi.signInUser(user)
		} catch (error) {
			console.log('error', error.response.data.message)

			const loginFormErrorCopy = { ...loginFormError };
			const errorMessage = error.response.data.message

			if (errorMessage === 'No user with such userName') {
				loginFormErrorCopy['userNameError'] = 'notExists'
			} else if (errorMessage === 'Passwords did not match') {
				loginFormErrorCopy['pswError'] = 'notValid'
			}
			setLoginFormError(loginFormErrorCopy)
		}
	}


	return (
		<div>
			<form className='registr-form' onSubmit={handleSubmitForm}>

				<div className='imgcontainer'>
					<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxfDAMqK3mhyikTk6uhY8Bn3HdpjkMvuzLQ&usqp=CAU' alt='Avatar' class='avatar' />
				</div>

				<div className='container'>
					<label for='login'><b>Username</b></label>
					<input type='text' placeholder='Enter username'
						name='login' className='login-input'
						value={userNameValue}
						onChange={event => handleChangeLoginForm(event, 'userNameValue', 'userNameError')}
						onBlur={event => handleCheckEmptyForm(event, 'userNameValue', 'userNameError')}
					/>

					{
						userNameError === 'empty' &&
						<div className='login-error'>Please, enter username </div>
					}

					{
						userNameError === 'notExists' &&
						<div className='login-error'>There is no user with this username</div>}

					<label for='psw'><b>Password</b></label>
					<input type='password' placeholder='Enter Password'
						name='psw' className='password-input'
						value={pswValue}
						onChange={event => handleChangeLoginForm(event, 'pswValue', 'pswError')}
						onBlur={event => handleCheckEmptyForm(event, 'pswValue', 'pswError')}
					/>

					{
						pswError === 'empty' &&
						<div className='psw-error'>Please, enter password </div>
					}

					{
						pswError === 'notValid' &&
						<div className='psw-error'>Wrong password</div>}

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