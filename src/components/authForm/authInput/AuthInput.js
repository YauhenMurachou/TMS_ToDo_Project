import React from "react";

import './AuthInput.scss';


export const AuthInput = ({
	inputTitle,
	inputType,
	disabled,
	inputPlaceholder,
	inputError,
	inputErrorName,
	inputValue,
	inputValueName,
	inputName,
	emptyValidationText,
	invalidValidationText,
	existsValidationText,
	matchValidationText,
	handleChangeForm,
	handleCheckValidForm }) => {
		
	return (
		<div>
			<label for='inputName'><b>{inputTitle}</b></label>
			<input type={inputType} placeholder={inputPlaceholder}
				name={inputName} className='registration-input'
				value={inputValue}
				onChange={event => handleChangeForm(event, inputValueName, inputErrorName)}
				onBlur={event => handleCheckValidForm(event, inputValueName, inputErrorName)}
				disabled={disabled}
			/>
			{
				inputError === 'empty' &&
				<div className='login-error'>{emptyValidationText} </div>
			}
			{
				inputError === 'notValid' &&
				<div className='login-error'> {invalidValidationText} </div>
			}
			{
				inputError === 'alreadyExist' &&
				<div className='login-error'> {existsValidationText} </div>
			}

			{
				inputError === 'notMatch' &&
				<div className='psw-error'>{matchValidationText}</div>
			}
		</div>
	)
}

export default AuthInput