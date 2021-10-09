import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Users.scss';

import { adminApi } from '../../api/adminApi'

import { usersApi } from '../../api/usersApi';
import { getCookie } from '../../utils/getCookies';

import {
	addUsersList,
	addUsersSearchList,
	addUserSearch
} from '../../redux/actions/toDoAppActions';

import UserItem from '../../components/userItem/UserItem';
import Search from '../../components/search/Search';
import axios from 'axios';


function Users() {

	const dispatch = useDispatch();
	const appState = useSelector(state => state.toDoAppReducer);

	const { token, role, usersList, usersSearchList, isUserSearch } = appState;

	const [users, setUsers] = useState([])
	// const [isRequest, setIsRequest] = useState(true)
	// const [sessionFault, setSessionFault] = useState(false)


	const [searchText, setSearchText] = useState('')
	const [searchError, setSearchError] = useState(false)
	const [searchErrorText, setSearchErrorText] = useState('')

		// изначальный вариант Никиты
		useEffect(() => {
			getUsers()
		}, [])

	// // 	// изначальный вариант Никиты
	// // 	// const getUsers = async () => {
	//  try{
	// // 	// 	let accsesstoken = getCookie('authorization')

	// // 	// axios.interceptors.request.use(
	// // 	// 	config => {
	// // 	// 		config.headers.authorization = `Bearer ${accsesstoken}`;
	// // 	// 		return config
	// // 	// 	}, error => {
	// // 	// 		return Promise.reject(error)
	// // 	// 	}
	// // 	// )
	// потом axios переносится в baseApi

		
	// // // 	const responce = await axios.get('http://localhost:3001/users')
	// // // } catch (error) {
	// // // 	console.error(error.message);
	// // // }



	const getUsers = () => {
		// let accsesstoken = getCookie('authorization') это никита удалил

		// usersApi.getUsers(accsesstoken) здесь поменял на токен

		usersApi.getUsers(token)
			.then(res => {
				console.log('res', res)
				const usersList = res.data
				setUsers(usersList)

			})
			.catch(error => {
				console.error(error.message)
			})
	}

	// 	let response = await axios.get('http://localhost:3001/users')
	// 	dispatch(addUsersList(response.data))
	// } catch (error) {
	// 	if (error.response.status === 401) {
	// 		setSessionFault(true)
	// 	}
	// }


	// const getUsers = () => {

	// 	const options = {
	// 		headers: {
	// 			authorization: `Bearer ${token}`
	// 		}
	// 	}

	// 	adminApi.getUsersForAdmin(options)
	// 		.then((response) => {

	// 			dispatch(addUsersList(response.data))
	// 			setIsRequest(false)
	// 		}, (error) => {
	// 			if (error.response.status === 401) {
	// 				setSessionFault(true)
	// 			}

	// 		})
	// }

	console.log('usersList', usersList)

	// useEffect(() => {
	// 	setSessionFault(false)
	// 	getUsers()
	// }, []);

	const handleChangeSearchText = (e) => {
		setSearchError(false)
		setSearchErrorText('')
		setSearchText(e.target.value);
	};

	const searchUser = () => {

		let copyItems = [...usersList]
		// console.log(copyItems)
		let copyText = searchText;
		let searchArray = [];

		copyText = copyText.replace(/\s/g, '').toUpperCase();
		searchArray = copyItems.filter(item => item.userName.replace(/\s/g, '').toUpperCase().includes(copyText) === true);

		dispatch(addUsersSearchList([...searchArray]));
		dispatch(addUserSearch(!isUserSearch));

		if (copyText === '') {
			dispatch(addUserSearch(false));
			dispatch(addUsersSearchList([]));
		}

	}

	const handleSearchSubmit = e => {
		e.preventDefault();
		searchUser();
	}

	const renderUsers = (arr) => {
		// console.log(arr)
		// if (!isRequest) {

			if (arr.length === 0) {
				return (
					<span className='list-empty' >No users available</span>
				)
			}

			let result;
			result = arr.map((item) => (
				< UserItem
					key={item._id}
					// key={index}
					idPath={item._id}
					nickname={item.userName}
					taskId={arr.indexOf(item) + 1}
					login={item.login}
				/>
			));
			return result;
		// }
		// return
	};


	return (
		<>
			<section className='users'>

				{/* {sessionFault && <PopUpLink
					text='The time of the session has expired. Log in again'
					buttonText='Sign in'
					link='SignInRoute'
				/>} */}

				<Search
					placeholder='Enter nickname'
					onChange={handleChangeSearchText}
					onSubmit={handleSearchSubmit}
					value={searchText}
					nameInput='searchUserForm'
				/>

				<div className="users-wraper">

					<ul className="users-list">
						{/* {isRequest && <img src={preloader_L} />} */}
						{/* {!isUserSearch ? renderUsers(usersList) : renderUsers(usersSearchList)} */}
						{/* {!isUserSearch ? renderUsers(usersList) : renderUsers(usersSearchList)} */}
						{users && users.length > 0 && renderUsers(users)}

					</ul>

				</div>

			</section>
		</>
	)
}


export default Users;