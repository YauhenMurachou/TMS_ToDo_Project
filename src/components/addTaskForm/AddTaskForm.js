import React from 'react';

import './AddTaskForm.scss';

const AddTaskForm = ({onSubmit,	onChange,	value	}) => {

	return (
		<div>
			<div>
				<div>
					<input type="checkbox"/>

					<label>
						Add new task
					</label>

					<div>
						
						<form
							onSubmit={onSubmit}
						>

							<label>
								Create task:
							</label>

							<input
								value={value}
								onChange={onChange}
							/>

							<input
								type="submit"
								value="create"
							/>

						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddTaskForm