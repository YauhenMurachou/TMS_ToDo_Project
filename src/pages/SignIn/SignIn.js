import React, { useState } from "react";
import { Link } from "react-router-dom";

import '../SignIn/SignIn.scss';

import { AuthInput } from '../../components';
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

					<AuthInput
						inputTitle='Username:'
						inputType='text'
						disabled={false}
						inputPlaceholder='Enter username'
						inputError={userNameError}
						inputErrorName='userNameError'
						inputValue={userNameValue}
						inputValueName='userNameValue'
						inputName='userNameValue'
						emptyValidationText='Please, enter username'
						invalidValidationText=''
						existsValidationText=''
						notExistsValidationText='There is no user with this username'
						matchValidationText=''
						handleChangeForm={handleChangeLoginForm}
						handleCheckValidForm={handleCheckEmptyForm}
					/>

					<AuthInput
						inputTitle='Password:'
						inputType='password'
						disabled={false}
						inputPlaceholder='Enter password'
						inputError={pswError}
						inputErrorName='pswError'
						inputValue={pswValue}
						inputValueName='pswValue'
						inputName='pswValue'
						emptyValidationText='Please, enter password'
						invalidValidationText='Wrong password'
						existsValidationText=''
						notExistsValidationText=''
						matchValidationText=''
						handleChangeForm={handleChangeLoginForm}
						handleCheckValidForm={handleCheckEmptyForm}
					/>

					{/* <Link to={Routes.TasksRoute} > */}
						<button type='submit' className='sub-btn'>Sign In</button>
					{/* </Link> */}
				</div>

				<div className='form-or'>
					Don't have an account?
				</div>

				<Link to={Routes.SignUpRoute} >
					<button className='registration-btn'>
						<span>Go to registration</span>
					</button>
				</Link>
			</form>
		</div>
	)
};

export default SignIn;