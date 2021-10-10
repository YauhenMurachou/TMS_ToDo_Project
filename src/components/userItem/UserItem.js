import React from 'react';
import { Link } from 'react-router-dom';

import './UserItem.scss';

const UserItem = ({ id, taskId, nickname, login }) => {

	return (
		<>
			<Link to={`/tasks/${id}`}>

				<li className='user-item'>
					<span className='user-id'>{`${taskId}.`}</span>
					<span className='user-name'>{nickname}</span>
					<span className='user-email'>{login}</span>
				</li>

			</Link>
		</>
	)
}

export default UserItem