import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './Users.scss';

import { usersApi } from '../../api/usersApi';
import UserItem from '../../components/userItem/UserItem';
import Search from '../../components/search/Search';

const Users = () => {

	const appState = useSelector(state => state.toDoAppReducer);
	const { token } = appState;
	const [users, setUsers] = useState([])
	const [searchText] = useState('')

	useEffect(() => {
		getUsers()
	}, [])

	const getUsers = () => {
		usersApi.getUsers(token)
			.then(res => {
				const usersList = res.data
				setUsers(usersList)

			})
			.catch(error => {
				console.error(error.message)
			})
	}

	const renderUsers = (arr) => {
		if (arr.length === 0) {
			return (
				<span className='no-users' >No users available</span>
			)
		}

		let result;
		result = arr.map((item) => (
			< UserItem
				id={item._id}
				nickname={item.userName}
				taskId={arr.indexOf(item) + 1}
				login={item.login}
			/>
		));
		return result;
	};

	return (
		<>
			<section className='users'>

				<Search
					placeholder='Enter name of user'
					value={searchText}
				/>

				<div className='users-wrapper'>
					<ul className='users-list'>
						{users && users.length > 0 && renderUsers(users)}
					</ul>
				</div>

			</section>
		</>
	)
}

export default Users;