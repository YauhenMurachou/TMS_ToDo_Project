import React from 'react';

import './TaskUser.scss';

const TaskUser = (props) => {

	const { taskNumber, taskName, checked, onChange, item, onClick, role } = props;

	return (

		<li className={
			item.checked
				? 'task-item-checked'
				: 'task-item'
		}>
			<span className='item-id'>{`${taskNumber}.`}</span>
			<label className='item-name' htmlFor={taskNumber}>
				{` ${taskName}`}
			</label>
			<input
				type='checkbox'
				id={taskNumber}
				name={taskNumber}
				checked={checked}
				onChange={() => onChange()}
			/>
			{role === 'admin' && item.checked && (
				<button className='cancel-btn-task' onClick={() => onClick()}>
					Delete task
				</button>
			)}
		</li>

	)
}

export default TaskUser;