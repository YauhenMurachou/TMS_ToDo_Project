import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../Registration/Registration.scss';

import { AuthInput, AuthSelect } from '../../components';
import { Routes } from '../../utils/routes';
import { authApi } from '../../api/authApi';
import { usersApi } from '../../api/usersApi';
import TimeOverWindow from '../../components/timeOverWindow/TimeOverWindow';

const Registration = () => {

	const [signUpForm, setSignUpForm] = useState({
		userNameValue: '',
		loginValue: '',
		pswValue: '',
		repeatPswValue: '',
		selectRoleValue: '',
		selectAdminValue: ''
	});

	const [signUpFormError, setSignUpFormError] = useState({
		userNameError: '',
		loginError: '',
		pswError: '',
		repeatPswError: '',
		selectRoleError: '',
		selectAdminError: ''
	});

	const [admins, setAdmins] = useState([]);
	const [isRegistr, setIsRegistr] = useState(false);
	const [popUpContent, setPopUpContent] = useState('')

	useEffect(() => {
		getAdminsList()
	}, [])

	const getAdminsList = () => {
		usersApi.getAdmins()
			.then(res => {
				const adminsList = res.data
				setAdmins(adminsList)
			})
	}

	const { userNameValue, loginValue, pswValue, repeatPswValue, selectRoleValue, selectAdminValue } = signUpForm;
	const { userNameError, loginError, pswError, repeatPswError, selectRoleError, selectAdminError } = signUpFormError;

	// если поле пустое, присваиваем название пусто соответствующей ошибке и возвр тру
	const handleCheckEmptyInput = (signUpForm, signUpFormError, inputName, errorName) => {
		if (signUpForm[inputName] === '') {
			signUpFormError[errorName] = 'empty'
			return true
		}
		return false
	};

	const handleCheckUserExists = async (fieldName, fieldValue) => {
		const body = {};
		body[fieldName] = fieldValue;

		return usersApi.checkUsersExist(body)
	}

	const handleCheckValidUserName = async (signUpFormErrorCopy) => {

		const minLetters = /(?=(?:.*[a-zA-z]){5,})/
		if (userNameValue !== '') {
			if (!minLetters.test(userNameValue) && !(userNameValue.length >= 5)) {
				signUpFormErrorCopy['userNameError'] = 'notValid'
			} else {
				const response = await handleCheckUserExists('userName', userNameValue)
				const { data } = response
				if (data.exists) {
					signUpFormErrorCopy.userNameError = 'alreadyExist'
				}
			}
		}
	}

	const handleCheckValidEmail = async (signUpFormErrorCopy) => {
		const mailRegex = /^\w+([\.-]?w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/

		if (!mailRegex.test(loginValue) && loginValue !== '') {
			signUpFormErrorCopy['loginError'] = 'notValid'
		} else {

			const response = await handleCheckUserExists('login', loginValue)
			const { data } = response
			if (data.exists) {
				signUpFormErrorCopy.loginError = 'alreadyExist'
			}
		}
	}

	const handleCheckValidPsw = (signUpFormErrorCopy) => {
		const pswRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/

		if (!pswRegex.test(pswValue) && pswValue !== '') {
			signUpFormErrorCopy['pswError'] = 'notValid'
		}
	}

	const handleCheckPswMatch = (signUpFormErrorCopy) => {
		if ((repeatPswValue !== pswValue) && (repeatPswValue !== '')) {
			signUpFormErrorCopy['repeatPswError'] = 'notMatch'
		}
	}

	const handleCheckValidInput = async (inputName, signUpFormErrorCopy) => {

		if (inputName !== '') {
			switch (inputName) {
				case 'userNameValue':
					await handleCheckValidUserName(signUpFormErrorCopy)
					break

				case 'loginValue':
					await handleCheckValidEmail(signUpFormErrorCopy)
					break

				case 'pswValue':
					handleCheckValidPsw(signUpFormErrorCopy)
					break

				case 'repeatPswValue':
					handleCheckPswMatch(signUpFormErrorCopy)
					break
			}
		}
	}

	const handleCheckEmptyFormSignUp = async (event = {}, inputName = '', errorName = '') => {
		const signUpFormCopy = { ...signUpForm };
		const signUpFormErrorCopy = { ...signUpFormError };

		let resultCheckEmpty = false;

		await handleCheckValidInput(inputName, signUpFormErrorCopy);

		if (inputName !== '' && errorName !== '') {
			handleCheckEmptyInput(signUpFormCopy, signUpFormErrorCopy, inputName, errorName)
			setSignUpFormError(signUpFormErrorCopy)

		} else {

			const valuesNameForm = Object.keys(signUpFormCopy);
			const errorsNameForm = Object.keys(signUpFormErrorCopy);

			if (selectRoleValue === 'admin') {
				valuesNameForm.pop()
				errorsNameForm.pop()
			}

			const checkEmptyArray = Array(valuesNameForm.length).fill(false);

			for (let i = 0; i < valuesNameForm.length; i++) {
				checkEmptyArray[i] = handleCheckEmptyInput(
					signUpFormCopy,
					signUpFormErrorCopy,
					valuesNameForm[i],
					errorsNameForm[i]
				)
			}
			resultCheckEmpty = checkEmptyArray.some(check => check === true)

			setSignUpFormError(signUpFormErrorCopy)
		}
		return resultCheckEmpty
	}

	const handleChangeRole = (event, inputName, errorName) => {
		const { value } = event.target
		const signUpFormErrorCopy = { ...signUpFormError }
		const signUpFormCopy = { ...signUpForm }
		if (value === 'admin') {
			signUpFormErrorCopy['selectAdminError'] = ''
			signUpFormCopy['selectAdminValue'] = ''
		}

		handleChangeSignUpForm(event, inputName, errorName, signUpFormCopy, signUpFormErrorCopy)
	}

	const handleChangeSignUpForm = (event, inputName, errorName, signUpFormCopyArg = undefined, signUpFormErrorCopyArg = undefined) => {

		const signUpFormCopy = signUpFormCopyArg || { ...signUpForm };
		const signUpFormErrorCopy = signUpFormErrorCopyArg || { ...signUpFormError };
		const { value: inputValue } = event.target;
		signUpFormErrorCopy[errorName] = '';
		setSignUpFormError(signUpFormErrorCopy);
		signUpFormCopy[inputName] = inputValue;
		setSignUpForm(signUpFormCopy);
	};

	const handleSubmitForm = async (event) => {

		event.preventDefault()
		const isFormValid = await handleCheckEmptyFormSignUp()
		if (isFormValid) {
			return
		}

		let newUser = {
			userName: userNameValue,
			login: loginValue,
			password: pswValue,
			role: selectRoleValue
		}
		if (selectRoleValue === 'user') {
			newUser.adminId = selectAdminValue
		}

		const response2 = await authApi.signUpUser(newUser)

		const newUserName = newUser.userName

		if (response2.statusText === 'Created') {
			setIsRegistr(true)
			setPopUpContent(` ${newUserName} is successfully registered. Go to data entry `)
		}


	}

	const roleSelectOption = () => {
		return (
			<>
				<option value="user">User</option>
				<option value="admin">Admin</option>
			</>
		)
	}

	const adminSelectOption = (admins) => {
		return (
			<>{
				admins.map(admin => {
					const { _id, userName, login } = admin
					return <option value={_id}>`${userName}, ${login}`</option>
				})
			}</>
		)
	}

	return (
		<div>

			<div className='signin-top-line'>
				<i className="far fa-list-alt"></i>
				<div className='signin-top-line-text'>Don't forget to... Your ToDo List
				</div>
			</div>

			{isRegistr && <TimeOverWindow
				text={popUpContent}
				onClick={() => setIsRegistr(false)}
				link='SignInRoute'
			/>}

			<form className='registr-form' onSubmit={handleSubmitForm}>

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
						invalidValidationText=' Username format is not correct'
						existsValidationText='This username already exists'
						matchValidationText=''
						handleChangeForm={handleChangeSignUpForm}
						handleCheckValidForm={handleCheckEmptyFormSignUp}
					/>

					<AuthInput
						inputTitle='Login:'
						inputType='text'
						disabled={false}
						inputPlaceholder='Enter login'
						inputError={loginError}
						inputErrorName='loginError'
						inputValue={loginValue}
						inputValueName='loginValue'
						inputName='loginValue'
						emptyValidationText='Please, enter login'
						invalidValidationText=' Login format is not correct'
						existsValidationText='This login already exists'
						matchValidationText=''
						handleChangeForm={handleChangeSignUpForm}
						handleCheckValidForm={handleCheckEmptyFormSignUp}
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
						invalidValidationText='Password must contain at least 5 characters, including 1 number and 1 letter'
						existsValidationText=''
						matchValidationText=''
						handleChangeForm={handleChangeSignUpForm}
						handleCheckValidForm={handleCheckEmptyFormSignUp}
					/>

					<AuthInput
						inputTitle='Repeat password:'
						inputType='password'
						disabled={pswValue === '' ? true : pswError === 'notValid' ? true : false}
						inputPlaceholder='Repeat password'
						inputError={repeatPswError}
						inputErrorName='repeatPswError'
						inputValue={repeatPswValue}
						inputValueName='repeatPswValue'
						inputName='repeatPswValue'
						emptyValidationText='Please, repeat password'
						invalidValidationText=''
						existsValidationText=''
						matchValidationText='Password mismatch'
						handleChangeForm={handleChangeSignUpForm}
						handleCheckValidForm={handleCheckEmptyFormSignUp}
					/>

					<AuthSelect
						inputTitle='Select your role:'
						inputError={selectRoleError}
						inputErrorName='selectRoleError'
						inputValue={selectRoleValue}
						inputValueName='selectRoleValue'
						// defaultValueText=''
						childOptions={roleSelectOption()}
						emptyValidationText='Please, select your role'
						handleChangeForm={handleChangeRole}
						handleCheckValidForm={handleCheckEmptyFormSignUp}
					/>

					{
						selectRoleValue === 'user' && (

							<AuthSelect
								inputTitle='Select administrator:'
								inputError={selectAdminError}
								inputErrorName='selectAdminError'
								inputValue={selectAdminValue}
								inputValueName='selectAdminValue'
								defaultValueText='Please, select administrator'
								childOptions={adminSelectOption(admins)}
								emptyValidationText='Please, select your admin'
								handleChangeForm={handleChangeSignUpForm}
								handleCheckValidForm={handleCheckEmptyFormSignUp}
							/>
						)
					}

					<input type='submit' value='Sign Up' className='sub-btn' />
				</div>

				<div className='form-or'>
					Already have an account?
				</div>

				<Link to={Routes.SignInRoute} >
					<div className='registration-btn'>
						<span>Sign In</span>
					</div>
				</Link>

			</form >
		</div >
	)
}

export default Registration;