import React from "react";

import { AuthInput } from "../authInput/AuthInput";

export const AuthSelect = ({
	inputTitle,
	inputError,
	inputErrorName,
	inputValue,
	inputValueName,
	defaultValueText,
	childOptions,
	emptyValidationText,
	handleChangeForm,
	handleCheckValidForm
}) => {

	return (
		<>
			<div className='input-wrapper'>
				<label for='select-admin'><b>{inputTitle}</b></label>

				<select name={inputValueName} className='registration-input'
					value={inputValue}
					onChange={event => handleChangeForm(event, inputValueName, inputErrorName)}
					onBlur={event => handleCheckValidForm(event, inputValueName, inputErrorName)}
				>
					<option value='' disabled className='registration-input-disabled'>{defaultValueText}</option>

					{/* {
						optionsList.map(optionItem => {
							const { _id, userName, login } = optionItem
							return <option value={_id}>`${userName}, ${login}`</option>
						})
					} */}

					{childOptions}

				</select>
				{
					inputError === 'empty' &&
					<div className='selectRoleError'> {emptyValidationText} </div>
				}
			</div>
		</>
	)
}



export default AuthSelect;