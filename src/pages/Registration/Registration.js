import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../Registration/Registration.scss';

import { Routes } from '../../utils/routes';

const Registration = () => {

	const [signUpForm, setSignUpForm] = useState({
		userNameValue: '',
		loginValue: '',
		pswValue: '',
		repeatPswValue: '',
		selectValue: ''
	});

	const [signUpFormError, setSignUpFormError] = useState({
		userNameError: '',
		loginError: '',
		pswError: '',
		repeatPswError: '',
		selectError: ''
	});

	const { userNameValue, loginValue, pswValue, repeatPswValue, selectValue } = signUpForm;
	const { userNameError, loginError, pswError, repeatPswError, selectError } = signUpFormError;

	// если поле пустое, присваиваем название пусто соответствующей ошибке и возвр тру
	const handleCheckEmptyInput = (signUpForm, signUpFormError, inputName, errorName) => {
		if (signUpForm[inputName] === '') {
			signUpFormError[errorName] = 'empty'
			return true
		}
		return false
	};

	const handleCheckValidUserName = (signUpFormError) => {
		const minLetters = /(?=(?:.*[a-zA-z]){3,})/

		if (!minLetters.test(userNameValue) && userNameValue !== '') {
			signUpFormError['userNameError'] = 'notValid'
		}
	}

	const handleCheckValidEmail = (signUpFormError) => {
		const mailRegex = /^\w+([\.-]?w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/

		if (!mailRegex.test(loginValue) && loginValue !== '') {
			signUpFormError['loginError'] = 'notValid'
		}
	}

	const handleCheckValidPsw = (signUpFormError) => {
		const pswRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
	
		if (!pswRegex.test(pswValue) && pswValue !== '') {
			signUpFormError['pswError'] = 'notValid'
		}
	}

	const handleCheckPswMatch = (signUpFormError) => {
		if ((repeatPswValue !== pswValue) && (repeatPswValue !== '')) {
			signUpFormError['repeatPswError'] = 'notMatch'
		}
	}


	const handleCheckEmptyFormSignUp = (event = {}, inputName = '', errorName = '') => {
		const signUpFormCopy = { ...signUpForm };
		const signUpFormErrorCopy = { ...signUpFormError };

		let resultCheckEmpty = false;
		let resultCheckEmptyUserName = false;
		let resultCheckEmptyLogin = false;
		let resultCheckEmptyPsw = false;
		let resultCheckEmptyRepeatPsw = false;
		let resultCheckEmptySelect = false;

		handleCheckValidUserName(signUpFormErrorCopy);
		handleCheckValidEmail(signUpFormErrorCopy);
		handleCheckValidPsw(signUpFormErrorCopy);
		handleCheckPswMatch(signUpFormErrorCopy);

		if (inputName !== '' && errorName !== '') {
			handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, inputName, errorName)
			setSignUpFormError(signUpFormErrorCopy)
			return true

		} else {

			resultCheckEmptyUserName = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'userNameValue', 'userNameError');
			resultCheckEmptyLogin = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'loginValue', 'loginError');
			resultCheckEmptyPsw = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'pswValue', 'pswError');
			resultCheckEmptyRepeatPsw = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'repeatPswValue', 'repeatPswError');
			resultCheckEmptySelect = handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, 'selectValue', 'selectError');

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
		if (handleCheckEmptyFormSignUp()) {
			return
		}
	}


	return (
		<div>
			<form className='registr-form' onSubmit={handleSubmitForm}>

				<div className='container'>
					<label for='userNameValue'><b>Username</b></label>
					<input type='text' placeholder='Enter username'
						name='userNameValue' className='registration-input'
						value={userNameValue}
						onChange={event => handleChangeSignUpForm(event, 'userNameValue', 'userNameError')}
						onBlur={event => handleCheckEmptyFormSignUp(event, 'userNameValue', 'userNameError')}
					/>

					{
						userNameError === 'empty' &&
						<div className='login-error'>Please, enter username </div>
					}

					{
						userNameError === 'notValid' &&
						<div className='login-error'>Username format is not correct </div>
					}

					{
						userNameError === 'alreadyExist' &&
						<div className='login-error'>This username already taken </div>
					}

					<label for='loginValue'><b>Login</b></label>
					<input type='text' placeholder='Enter login'
						name='loginValue' className='registration-input'
						value={loginValue}
						onChange={event => handleChangeSignUpForm(event, 'loginValue', 'loginError')}
						onBlur={event => handleCheckEmptyFormSignUp(event, 'loginValue', 'loginError')}
					/>

					{
						loginError === 'empty' &&
						<div className='login-error'>Please, enter login </div>
					}
					{
						loginError === 'notValid' &&
						<div className='login-error'>Login format is not correct </div>
					}

					{
						loginError === 'alreadyExist' &&
						<div className='login-error'>This login already taken </div>
					}


					<label for='pswValue'><b>Password</b></label>
					<input type='password' placeholder='Enter Password'
						name='pswValue' className='registration-input'
						value={pswValue}
						onChange={event => handleChangeSignUpForm(event, 'pswValue', 'pswError')}
						onBlur={event => handleCheckEmptyFormSignUp(event, 'pswValue', 'pswError')}
					/>

					{
						pswError === 'empty' &&
						<div className='psw-error'>Please, enter password </div>
					}

					{
						pswError === 'notValid' &&
						<div className='psw-error'>Password must contain at least 5 characters, including 1 number and 1 letter</div>
					}

					<label for='psw-repeat'><b>Repeat password</b></label>
					<input type='password' placeholder='Repeat Password'
						name='repeatPswValue' className={(pswValue === '' || pswError === 'notValid') ? 'registration-input disabled' : 'registration-input'}
						value={repeatPswValue}
						onChange={event => handleChangeSignUpForm(event, 'repeatPswValue', 'repeatPswError')}
						onBlur={event => handleCheckEmptyFormSignUp(event, 'repeatPswValue', 'repeatPswError')}
						disabled={pswValue === '' ? true : pswError === 'notValid' ? true : false}
					/>

					{
						repeatPswError === 'empty' &&
						<div className='psw-error'>Please, repeat password </div>
					}

					{
						repeatPswError === 'notMatch' &&
						<div className='psw-error'>Password mismatch</div>
					}


					<label for='select'><b>Select role</b></label>
					<select name='select' className='registration-input'
						value={selectValue}
						onChange={event => handleChangeSignUpForm(event, 'selectValue', 'selectError')}
						onBlur={event => handleCheckEmptyFormSignUp(event, 'selectValue', 'selectError')}
					>

						<option></option>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>

					{
						selectError === 'empty' &&
						<div className='psw-error'> Please, select your role </div>
					}

					{selectValue === 'user' && (
						<div>
							<label for='select-admin'><b>Select administrator:</b></label>
							<select
								name='select-admin'
								className='registration-input'
							>
								<option value='administrator' disabled>
									Please, select administrator
								</option>
							</select>
						</div>
					)}

					<button type='submit' className='sub-btn'>Sign Up</button>
				</div>
				<div className='form-or'>
					or
				</div>
			</form >

			<Link to={Routes.SignInRoute} >
				<button className='registration-btn'>
					<span>Back to login</span>
				</button>
			</Link>
		</div >
	)
};

export default Registration;