import React from 'react';

import './TaskUser.scss';

function TaskUser(props) {

	const { taskNumber, taskName, checked, onChange, item, onClick } = props;

	return (
		<ul>
			<li className='task-item'>
				<span className='item-id'>{`${taskNumber}.`}</span>
				<label className='item-name' htmlFor={taskNumber}>
					{taskName}
				</label>
				<input
					type='checkbox'
					id={taskNumber}
					name={taskNumber}
					checked={checked}
					onChange={() => onChange()}
				/>
				{item.checked && (
					<button className="cancel-btn" onClick={() => onClick()}>
						cancel
					</button>
				)}
			</li>
		</ul>
	)
}

export default TaskUser;