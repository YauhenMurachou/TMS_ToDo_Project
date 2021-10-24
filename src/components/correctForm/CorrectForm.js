import React from 'react';

import './CorrectForm.scss';

function CorrectForm({ onChange, onClick, value, nameInput, nameButton, onSubmit, formName, errorMessage }) {

	return (
		<>
			<div className='correct-wrapper'>

				<form
					className='correct-wrapper-form'
					onSubmit={onSubmit}
					name={formName}
				>

					<label className='correct-label' htmlFor='new-todo'>
						Correct this task
					</label>

					<input
						className='correct-input'
						id='new-todo'
						value={value}
						onChange={onChange}
						name={nameInput}
					/>

					<div className='correct-btns'>

						<input
							className='correct-complete-btn'
							type='submit'
							name={nameButton}
							value='Correct'
						/>

						<button
							className='correct-close-button'							
							onClick={onClick}>
							Close					
						</button>

					</div>
					<div className='correct-error'> {errorMessage} </div>
				</form>
			</div>
			
		</>
	)
}

export default CorrectForm