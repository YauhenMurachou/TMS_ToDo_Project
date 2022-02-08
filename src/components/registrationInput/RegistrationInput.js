import React from 'react';

import './RegistrationInput.scss';

const RegistrationInput = ({
	inputType,
	disabled,
	inputValue
}) => {

	return (
		<>
			<input
				disabled={disabled}
				type={inputType} 
				value={inputValue} 
				className={
					disabled === true
						? "sub-btn-nonactive"
						: "sub-btn"
				} />
		</>
	)
}

export default RegistrationInput