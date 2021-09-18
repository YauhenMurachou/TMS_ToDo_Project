import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/routes';

import '../Registration/Registration.scss'

const Registration = () => {

	const [signUpForm, setSignUpForm] = useState({
		userNameValue: '',
		loginValue: '',
		pswValue: '',
		repeatPswValue: ''
	});

	const [signUpFormError, setSignUpFormError] = useState({
		userNameError: '',
		loginError: '',
		pswError: '',
		repeatPswError: ''
	});


	const handleCheckEmptyInput = (signUpForm, signUpFormError, inputName, errorName) => {
		if (signUpForm[inputName] === '') {
			signUpFormError[errorName] = 'empty'
			return true
		}
		return false
	};

	// const handleCheckValidPsw = (signUpFormError) => {
	// 	const pswRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/

	// 	if (pswRegex.test(pswValue) && pswValue !== '') {
	// 		signUpFormError['pswError'] = 'notValid'
	// 	}
	// }

	// const handleCheckPswMatch = (signUpFormError) => {
	// 	if ((repeatPswValue !== pswValue) && (repeatPswValue !== '')) {
	// 		signUpFormError['repeatPswError'] = 'notMatch'
	// 	}
	// }





	const handleCheckEmptyForm = (event = {}, inputName = '', errorName = '') => {
		const signUpFormCopy = { ...signUpForm };
		const signUpFormErrorCopy = { ...signUpFormError };
		let resultCheckEmpty = false;
		let resultCheckEmptyLogin = false;
		let resultCheckEmptyPsw = false;

		if (inputName !== '' && errorName !== '') {
			handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, inputName, errorName)
			setSignUpFormError(signUpFormErrorCopy)
			return true

		} else {

			resultCheckEmptyLogin = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'loginValue', 'usernameError', 'loginError')
			resultCheckEmptyPsw = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'pswValue', 'pswError')
			resultCheckEmpty = resultCheckEmptyLogin || resultCheckEmptyPsw

			setSignUpFormError(signUpFormErrorCopy)
			return true
		}
		return resultCheckEmpty
	}



	const handleChangeSignUpForm = (event, inputName, errorName) => {
		const signUpFormCopy = { ...signUpForm };
		const signUpFormErrorCopy = { ...signUpFormError };
		const { value: inputValue } = event.target;
		signUpFormErrorCopy[errorName] = '';
		setSignUpFormError(signUpFormErrorCopy);
		signUpFormCopy[inputName] = inputValue;
		setSignUpForm(signUpFormCopy);
	};

	const handleSubmitForm = (event) => {
		event.preventDefault()
		if (handleCheckEmptyForm()) {
			return
		}
	}


	const { loginValue, pswValue } = signUpForm;
	const { loginError, usernameError, pswError } = signUpFormError;


	return (
		<div>
			<form className='registr-form' onSubmit={handleSubmitForm}>

				<div className='container'>
					<label for='Username'><b>Username</b></label>
					<input type='text' placeholder='Enter username'
						name='Username' className='username-input'
						value={loginValue}
						onChange={event => handleChangeSignUpForm(event, 'loginValue', 'usernameError')}
						onBlur={event => handleCheckEmptyForm(event, 'loginValue', 'usernameError')}
					/>

					{
						usernameError === 'empty' &&
						<div className='login-error'>Please, enter username </div>
					}

					<label for='login'><b>Login</b></label>
					<input type='text' placeholder='Enter login'
						name='login' className='login-input'
						value={loginValue}
						onChange={event => handleChangeSignUpForm(event, 'loginValue', 'loginError')}
						onBlur={event => handleCheckEmptyForm(event, 'loginValue', 'loginError')}
					/>

					{
						loginError === 'empty' &&
						<div className='login-error'>Please, enter login </div>
					}


					<label for='psw'><b>Password</b></label>
					<input type='password' placeholder='Enter Password'
						name='psw' className='password-input'
						value={pswValue}
						onChange={event => handleChangeSignUpForm(event, 'pswValue', 'pswError')}
						onBlur={event => handleCheckEmptyForm(event, 'pswValue', 'pswError')}
					/>

					{
						pswError === 'empty' &&
						<div className='psw-error'>Please, enter password </div>
					}

					<label for='psw-repeat'><b>Repeat password</b></label>
					<input type='password' placeholder='Enter Password'
						name='psw-repeat' className='password-input'
						value={pswValue}
						onChange={event => handleChangeSignUpForm(event, 'pswValue', 'pswError')}
						onBlur={event => handleCheckEmptyForm(event, 'pswValue', 'pswError')}
					/>


					<label for='select'><b>Select role</b></label>
					<select name='select' className='password-input'>
						<option></option>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>


					<button type='submit' className='sub-btn'>Sign Up</button>
				</div>
				<div className='form-or'>
					or
				</div>
			</form>

			<button className='registration-btn'>
				<Link to={Routes.SignInRoute} >
					<span>Back to login</span>
				</Link>
			</button>
		</div>
	)
};

export default Registration;