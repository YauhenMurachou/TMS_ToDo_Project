import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from '../../utils/routes';

import '../SignIn/SignIn.scss'

const SignIn = () => {

	const [loginForm, setLoginForm] = useState({ loginValue: '', pswValue: '' });
	const [loginFormError, setLoginFormError] = useState({ loginError: '', pswError: '' });
	// types of errors. '' - no errors, 'empty', 'notValid', 'notExists' - no answer from server

	const { loginValue, pswValue } = loginForm;
	const { loginError, pswError } = loginFormError;

	const handleCheckEmptyInput = (loginForm, loginFormError, inputName, errorName) => {
		if (loginForm[inputName] === '') {
			loginFormError[errorName] = 'empty'
			return true
			// если пустая строка, то код ошибки соответствующий  и возвр тру
		}
		return false
	}

	const handleCheckEmptyForm = (event = {}, inputName = '', errorName = '') => {
		const loginFormCopy = { ...loginForm };
		const loginFormErrorCopy = { ...loginFormError };
		let resultCheckEmpty = false;
		let resultCheckEmptyLogin = false;
		let resultCheckEmptyPsw = false;

		// если передаются аргументы в конкретном инпуте, не равные пустой строке, то вызывается handleCheckEmptyInput,
		//  который устанавливает код ошибки empty, если строка пустая, и возвр тру. И затем переписываются ошибки
		if (inputName !== '' && errorName !== '') {
			handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, inputName, errorName)
			setLoginFormError(loginFormErrorCopy)
			return true

		} else {
			// check all inputs
			resultCheckEmptyLogin = handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, 'loginValue', 'loginError')
			resultCheckEmptyPsw = handleCheckEmptyInput(loginFormCopy, loginFormErrorCopy, 'pswValue', 'pswError')
			// если хотя бы один вернёт тру, то общий результат тру.  иначе фолс
			resultCheckEmpty = resultCheckEmptyLogin || resultCheckEmptyPsw

			setLoginFormError(loginFormErrorCopy)
			return true
		}
		return resultCheckEmpty
	}



	const handleChangeLoginForm = (event, inputName, errorName) => {
		// копии стэйтов
		const loginFormCopy = { ...loginForm };
		const loginFormErrorCopy = { ...loginFormError };
		const { value: inputValue } = event.target;
		// деструктуризация, inputValue=введённое значение
		loginFormErrorCopy[errorName] = '';
		// сброс надписи про пустой инпут
		setLoginFormError(loginFormErrorCopy);

		// строчкой ниже значение поля inputName объекта loginFormCopy равно введённому значению
		loginFormCopy[inputName] = inputValue;
		// in useState loginValue. in input value={loginValue}. in input handleChangeLoginForm we call with 'loginValue'
		// Its reason why inputName = 'loginValue'
		setLoginForm(loginFormCopy);
		// перезаписываем стэйт
	};

	const handleSubmitForm = (event) => {
		event.preventDefault()
		// if form is empty return from this function
		if (handleCheckEmptyForm()) {
			return
		}
	}


	return (
		<div>
			<form className='registr-form' onSubmit={handleSubmitForm}>

				<div className='imgcontainer'>
					<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxfDAMqK3mhyikTk6uhY8Bn3HdpjkMvuzLQ&usqp=CAU' alt='Avatar' class='avatar' />
				</div>

				<div className='container'>
					<label for='loginValue'><b>Username</b></label>
					<input type='text' placeholder='Enter username'
						name='loginValue' className='login-input'
						value={loginValue}
						onChange={event => handleChangeLoginForm(event, 'loginValue', 'loginError')}
						// at start was written field name
						onBlur={event => handleCheckEmptyForm(event, 'loginValue', 'loginError')}
					/>

					{
						loginError === 'empty' &&
						<div className='login-error'>Please, enter username </div>
					}

					<label for='pswValue'><b>Password</b></label>
					<input type='password' placeholder='Enter Password'
						name='pswValue' className='password-input'
						value={pswValue}
						onChange={event => handleChangeLoginForm(event, 'pswValue', 'pswError')}
						onBlur={event => handleCheckEmptyForm(event, 'pswValue', 'pswError')}
					/>

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