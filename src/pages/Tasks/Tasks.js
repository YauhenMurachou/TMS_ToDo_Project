import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'

import './Tasks.scss';

import {
	addTasksList,
	addUserTasksList,
	addTasksSearchList,
	addTaskSearch
} from '../../redux/actions/toDoAppActions';

// import { usersApi } from '../../api/usersApi';
import { adminApi } from '../../api/adminApi';
import { tasksApi } from '../../api/tasksApi';
import { ToDoApp } from '../../components';

import Search from '../../components/search/Search';
import TaskUser from '../../components/taskUser/TaskUser';
import AddTaskForm from '../../components/addTaskForm/AddTaskForm';

function Tasks() {

	const { user_Id } = useParams();

	const dispatch = useDispatch();

	const appState = useSelector(state => state.toDoAppReducer)
	const { token, role, tasksList, tasksSearchList, isTaskSearch } = appState;

	const [tasks, setTasks] = useState([])
	const [searchText, setSearchText] = useState('')
	const [text, setText] = useState('')
	const [helpText, setHelpText] = useState('')
	const [isRequest, setIsRequest] = useState(true)
	const [sessionFault, setSessionFault] = useState(false)
	const [userId, setUserId] = useState('')

	useEffect(() => {
		getTasks()
	}, [])


	const getTasks = () => {

		tasksApi.getTasks(token)
		.then(res => {
			
			const tasksList = res.data
			setTasks(tasksList)
			console.log('tasks', tasks)

		})
		.catch(error => {
			console.error(error.message)
		})

	}



	// const getLists = () => {

	// 	const options = {
	// 		headers: {
	// 			authorization: `Bearer ${token}`
	// 		}
	// 	}

	// 	const url = `http://localhost:3001/tasks/${user_Id}`

	// 	if (role === 'user') {
	// 		tasksApi.getTasks(options)
	// 			.then((response) => {
	// 				dispatch(addTasksList(response.data))
	// 				setIsRequest(false)
	// 			}, (error) => {
	// 				if (error.response.status === 401) {
	// 					setSessionFault(true)
	// 				}
	// 				console.log(error)
	// 			})
	// 	} else {
	// 		adminApi.GetTasksUserForAdmin(url, options)
	// 			.then((response) => {
	// 				dispatch(addTasksList(response.data))
	// 				setIsRequest(false)
	// 			}, (error) => {
	// 				if (error.response.status === 401) {
	// 					setSessionFault(true)
	// 				}
	// 				console.log(error)
	// 			})
	// 	}

	// }

	// const patchTask = (taskID, IDchecked, taskListCopy, userId) => {

	// 	const options = {
	// 		headers: {
	// 			authorization: `Bearer ${token}`
	// 		}
	// 	}

	// 	const body =
	// 	{
	// 		id: taskID,
	// 		userId: userId,
	// 		checked: IDchecked
	// 	}

	// 	// usersApi.PatchTasksForUser(body, options)
	// 	tasksApi.PatchTasksForUser(body, options)
	// 		.then((response) => {
	// 			console.log('Ответ - на патч', response)
	// 			if (response.data === 'OK') {
	// 				dispatch(addTasksList(taskListCopy))
	// 			}
	// 			setIsRequest(false)
	// 		}, (error) => {
	// 			if (error.response.status === 401) {
	// 				setSessionFault(true)
	// 			}
	// 			console.log(error)
	// 		})
	// }

	// useEffect(() => {
	// 	setSessionFault(false)
	// 	getTasks()
	// }, []);

	const handleChange = (e) => {

		if (e.target.name === 'addTaskForm') {
			setText(e.target.value);
			// setHelpText('')
			// console.log('handleChange - text', text);
		}

		if (e.target.name === 'searchTaskForm') {
			setSearchText(e.target.value);
			// console.log('handleChange - searchText', searchText);
		}
	}

	// const searchTask = () => {

	// 	let taskListCopy = [...tasksList]
	// 	let copyText = searchText;
	// 	let searchArray = [];

	// 	copyText = copyText.replace(/\s/g, '').toUpperCase();
	// 	searchArray = taskListCopy.filter(item => item.name.replace(/\s/g, '').toUpperCase().includes(copyText) === true);

	// 	dispatch(addTasksSearchList([...searchArray]));
	// 	dispatch(addTaskSearch(!isTaskSearch));

	// 	if (copyText === '') {
	// 		dispatch(addTaskSearch(false));
	// 		dispatch(addTasksSearchList([]));
	// 	}

	// }

	const handleSearchSubmit = e => {
		e.preventDefault();
		// console.log('handleSearchSubmit')
		// searchTask()
	}

	// const checkInput = () => {
	// 	let result = true;
	// 	let arrayCopy = [...tasksList]
	// 	let copyText = text;
	// 	console.log('checkInput-arrayCoppy', arrayCopy, 'and textCopy - ', copyText)
	// 	copyText = copyText.replace(/\s/g, '');
	// 	console.log('and textCopy - ', copyText.replace(/\s/g, ''))
	// 	let index = arrayCopy.findIndex(item => item.name.replace(/\s/g, '') === copyText);
	// 	console.log('checkInput-index', index)
	// 	if (index === -1) {
	// 		result = false
	// 	}

	// 	return result;
	// }

	const handleTaskSubmit = e => {
		e.preventDefault();
		console.log('handleTaskSubmit', e.target.name)
		// if (checkInput()) {
		// 	console.log('handleTaskSubmit - error text print')
		// 	setHelpText('task is already exist')
		// 	return;
		// }
		// if (text.trim().length < 4) {
		// 	setHelpText('the minimum length of the task is 4 characters')
		// 	return;
		// }
		// console.log('handleTaskSubmit - sumitform')
	}

	// const handleChangecheckBox = id => {
	// 	const taskListCopy = [...tasksList];
	// 	const changeObj = taskListCopy.find((item) => item._id === id);
	// 	// console.log('handleChangecheckBox - id: ', id, 'arrayCopy - ',taskListCopy, 'changeObj - ',changeObj)
	// 	changeObj.checked
	// 		? (changeObj.checked = false)
	// 		: (changeObj.checked = true);
	// 	patchTask(id, changeObj.checked, taskListCopy, changeObj.userId)
	// }

	const renderTasks = (arr) => {
		// if (!isRequest) {
			let result;

			// if (arr.length === 0) {
			// 	return (
			// 		<span className='list-empty' >The task list is empty</span>
			// 	)
			// }

			result = arr.map((item, index) => {
				const { _id, name, checked } = item;
				return (
				< TaskUser
					key={index}
					id={_id}
					taskName={name}
					taskNumber={arr.indexOf(item) + 1}
					checked={checked}
					// onChange={() => handleChangecheckBox(item._id)}
				/>
			)});
			return result;
		// }
		// return
	}

	return (
		<>
			<section className='tasks__section'>

				{/* {sessionFault && <
				text='The time of the session has expired. Log in again'
					buttonText='Sign in'
					link='SignInRoute'
				/>} */}

				{role === 'admin' && < AddTaskForm
					onSubmit={handleTaskSubmit}
					onChange={handleChange}
					nameInput='addTaskForm'
					helpText={helpText}
					value={text}
				/>}

				<Search
					placeholder='Find Task'
					onChange={handleChange}
					onSubmit={handleSearchSubmit}
					value={searchText}
					nameInput='searchTaskForm'
				/>
				{/* <ToDoApp/> */}

				<div className='tasks__wraper'>

					<ul className='tasks-list'>
						{/* {isRequest && <img src={preloader_L} />} */}
						{/* {!isTaskSearch ? renderTasks(tasksList) : renderTasks(tasksSearchList)} */}
						{tasks && tasks.length > 0 && renderTasks(tasks)}

					</ul>
				</div>

			</section>
		</>
	)
}

export default Tasks;
