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

	const { userNameValue, loginValue, pswValue, repeatPswValue } = signUpForm;
	const { userNameError, loginError, pswError, repeatPswError } = signUpFormError;

	// если поле пустое, присваиваем название пусто соответствующей ошибке и возвр тру
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
		let resultCheckEmptyUserName = false;
		let resultCheckEmptyLogin = false;
		let resultCheckEmptyPsw = false;
		let resultCheckEmptyRepeatPsw = false;

		if (inputName !== '' && errorName !== '') {
			handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, inputName, errorName)
			setSignUpFormError(signUpFormErrorCopy)
			return true

		} else {

			resultCheckEmptyUserName = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'userNameValue', 'userNameError');
			resultCheckEmptyLogin = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'loginValue', 'loginError');
			resultCheckEmptyPsw = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'pswValue', 'pswError');
			resultCheckEmptyRepeatPsw = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'repeatPswValue', 'repeatPswError');
			resultCheckEmpty = resultCheckEmptyLogin || resultCheckEmptyPsw || resultCheckEmptyUserName || resultCheckEmptyRepeatPsw;

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


	return (
		<div>
			<form className='registr-form' onSubmit={handleSubmitForm}>

				<div className='container'>
					<label for='userNameValue'><b>Username</b></label>
					<input type='text' placeholder='Enter username'
						name='userNameValue' className='username-input'
						value={userNameValue}
						onChange={event => handleChangeSignUpForm(event, 'userNameValue', 'userNameError')}
						onBlur={event => handleCheckEmptyForm(event, 'userNameValue', 'userNameError')}
					/>

					{
						userNameError === 'empty' &&
						<div className='login-error'>Please, enter username </div>
					}

					<label for='loginValue'><b>Login</b></label>
					<input type='text' placeholder='Enter login'
						name='loginValue' className='login-input'
						value={loginValue}
						onChange={event => handleChangeSignUpForm(event, 'loginValue', 'loginError')}
						onBlur={event => handleCheckEmptyForm(event, 'loginValue', 'loginError')}
					/>

					{
						loginError === 'empty' &&
						<div className='login-error'>Please, enter login </div>
					}


					<label for='pswValue'><b>Password</b></label>
					<input type='password' placeholder='Enter Password'
						name='pswValue' className='password-input'
						value={pswValue}
						onChange={event => handleChangeSignUpForm(event, 'pswValue', 'pswError')}
						onBlur={event => handleCheckEmptyForm(event, 'pswValue', 'pswError')}
					/>

					{
						pswError === 'empty' &&
						<div className='psw-error'>Please, enter password </div>
					}

					<label for='psw-repeat'><b>Repeat password</b></label>
					<input type='password' placeholder='Repeat Password'
						name='repeatPswValue' className='password-input'
						value={repeatPswValue}
						onChange={event => handleChangeSignUpForm(event, 'repeatPswValue', 'repeatPswError')}
						onBlur={event => handleCheckEmptyForm(event, 'repeatPswValue', 'repeatPswError')}
					/>

					{
						repeatPswError === 'empty' &&
						<div className='psw-error'>Please, repeat password </div>
					}


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

			<Link to={Routes.SignInRoute} >
				<button className='registration-btn'>
					<span>Back to login</span>
				</button>
			</Link>
		</div>
	)
};

export default Registration;