import React from 'react';

import './AddTaskForm.scss';

const AddTaskForm = ({ onSubmit, onChange, value, nameInput, nameForm, errorMessage }) => {

	return (
		<div>
			<div>
				<form onSubmit={onSubmit}
					name={nameForm}>
					<div className='create-task-form'>

						<label htmlFor="new-task">
							Create task:
						</label>

						<input
							value={value}
							id="new-task"
							// type="text"
							onChange={onChange}
							name={nameInput}
						/>

						<input
							type="submit"
							value="create"
						/>

						<div className='login-error'> {errorMessage} </div>

					</div>
				</form>

			</div>
		</div >
	)
}

export default AddTaskForm