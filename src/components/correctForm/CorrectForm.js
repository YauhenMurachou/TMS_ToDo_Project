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
						Correct task:
					</label>

					<input
						className='correct-input'
						id='new-todo'
						value={value}
						onChange={onChange}
						name={nameInput}
					/>

					<input
						className='correct-complete-btn'
						type='submit'
						name={nameButton}
						value='correct'
					/>				

					<div className='correct-btns'>


					<button
						className='correct-close-button'
						onClick={onClick}>
						cancel
					</button>


					</div>
					<div className='correct-error'> {errorMessage} </div>
				</form>
			</div>

		</>
	)
}

export default CorrectForm