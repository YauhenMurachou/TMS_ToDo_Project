import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Jwt from 'jsonwebtoken';
import '@fortawesome/fontawesome-free/css/all.min.css';

import '../SignIn/SignIn.scss';

import { AuthInput } from '../../components';
import { authApi } from '../../api/authApi';
import { Routes } from '../../utils/routes';
import { linkToRoute } from '../../utils/routes';
import { signIn } from '../../redux/actions/toDoAppActions';
import { setCookie } from '../../utils/getCookies';

const SignIn = () => {

	const history = useHistory()
	const dispatch = useDispatch()

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
		try {
			event.preventDefault()
			if (handleCheckEmptyForm()) {
				return
			}
			const user = {
				userName: userNameValue,
				password: pswValue
			}

			const res = await authApi.signInUser(user)
			const { token } = res.data

			setCookie('authorization', token)

			const decodedData = Jwt.decode(token)
			const { role, id: userId } = decodedData

			dispatch(signIn({ role, token, userId }))

			if (role === 'admin') {
				linkToRoute(history, Routes.UsersRoute)
			} else {
				linkToRoute(history, Routes.TasksRoute)
			}

		} catch (error) {
			console.log('why dont go', error)

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
		<>
			<div className='nav-top-line'>
				<i className="far fa-list-alt"></i>
				<div className='nav-top-line-text'>Don't forget to... Your ToDo List
				</div>
			</div>
			<section className='section'>

				<div className='section-container'>

					<form className='registr-form' onSubmit={handleSubmitForm}>
						<div className='registr-form-title'>
						Welcome to our community, anonymous
						</div>
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
							<button type='submit' className='signin-btn'>Sign In</button>
						</div>
						<div className='form-or'>
							Don't have an account yet?
						</div>
						<Link to={Routes.SignUpRoute} >
							<div className='registration-redirect'>
								<span>Go to registration</span>
							</div>
						</Link>
					</form>
				</div>
			</section>
		</>
	)
};

export default SignIn;