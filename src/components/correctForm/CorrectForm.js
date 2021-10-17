import React from 'react';

// import './CorrectForm.scss';

function CorrectForm({ onChange, onClick, value, nameInput, nameButton, onSubmit, formName }) {

	return (
		<>
			<div className="edit__content">

				<form
					className="edit__wraper"
					onSubmit={onSubmit}
					name={formName}
				>

					<label className="edit__label" htmlFor="new-todo">
						Correct this task
					</label>

					<input
						className="edit__input"
						id="new-todo"
						value={value}
						onChange={onChange}
						name={nameInput}
					/>

					<div className="edit__buttons-wraper">

						<input
							className="edit__button"
							type="submit"
							name={nameButton}
							value="Correct"
						/>

						<button
							className="edit__close-button"
							title='Close editing'
							onClick={onClick}>							
						</button>

					</div>

				</form>

			</div>

			<div className='edit__back'></div>
		</>
	)
}

export default CorrectForm