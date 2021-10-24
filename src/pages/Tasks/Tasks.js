import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Tasks.scss';

import { tasksApi } from '../../api/tasksApi';
import { ToDoApp } from '../../components';
import SearchTaskForm from '../../components/SearchTaskForm/SearchTaskForm';
import TaskUser from '../../components/taskUser/TaskUser';
import AddTaskForm from '../../components/addTaskForm/AddTaskForm';
import CorrectForm from '../../components/correctForm/CorrectForm';
import { addTasksList } from '../../redux/actions/toDoAppActions';
import CorrectButton from '../../components/correctButton/CorrectButton';
import TimeOverWindow from '../../components/timeOverWindow/TimeOverWindow';

const Tasks = () => {

	const { user_Id } = useParams();
	const dispatch = useDispatch();

	const appState = useSelector(state => state.toDoAppReducer);
	const { token, role, tasksList } = appState;
	const [searchItems, setSearchItems] = useState(null);
	const [searchText, setSearchText] = useState('');
	let [items, setItems] = useState([]);
	let [correctId, setCorrectId] = useState('');
	const [isCorrect, setIsCorrect] = useState(false);
	const [timeOver, setTimeOver] = useState(false);
	const [errorMessage, setErrorMessage] = useState({
		text: '',
		correctText: ''
	});
	const [textForm, setTextForm] = useState({
		text: '',
		correctText: ''
	})
	const inputSearchEl = useRef(null);

	useEffect(() => {
		setTimeOver(false)

		if (role === 'admin') {
			getTasksForAdmin()
		} else {
			getTasks()
		}
	}, [])

	const getTasksForAdmin = () => {

		tasksApi.getTasksForAdmin(token, user_Id)
			.then(res => {
				dispatch(addTasksList(res.data))
			})
			.catch(error => {
				if (error.response.status === 401) {
					setTimeOver(true)
				}
				console.error(error.message)
			})
	}

	const getTasks = () => {

		tasksApi.getTasks(token)
			.then(res => {
				dispatch(addTasksList(res.data))
			})
			.catch(error => {
				if (error.response.status === 401) {
					setTimeOver(true)
				}
				console.error(error.message)
			})
	}

	const handleSubmitSearch = (e) => {

		e.preventDefault();
		if (searchText === '') {
			setSearchItems([])

		} else {
			let arrayCopy = [...tasksList];
			const searchItemsCopy = arrayCopy.filter(item => item.name.includes(searchText));
			setSearchItems(searchItemsCopy);					
		}
	}

	const handleChangeSearch = (e) => {
		setSearchText(e.target.value);
	}

	const checkInput = (e) => {
		let result = true;
		let arrayCopy = [...tasksList]
		let copyText = textForm[e.target.name];
		copyText = copyText.replace(/\s/g, '').toLowerCase();

		let index = arrayCopy.findIndex(item => item.name.replace(/\s/g, '').toLowerCase() === copyText);

		if (index === -1) {
			result = false
		}
		return result;
	}

	const handleChange = (e) => {
		const textFormCopy = { ...textForm }
		textFormCopy[e.target.name] = e.target.value
		setTextForm(textFormCopy)
		setErrorMessage({})
	}

	const handleTaskSubmit = e => {
		e.preventDefault();

		const errorMessageCopy = { ...errorMessage }

		if (textForm[e.target.name].trim().length < 5) {

			errorMessageCopy[e.target.name] = 'The task must contain at least 5 characters'
			setErrorMessage(errorMessageCopy)
			return;
		}

		if (checkInput(e)) {
			errorMessageCopy[e.target.name] = 'This task has already been created'
			setErrorMessage(errorMessageCopy)
			console.log('handleTaskSubmit---', errorMessage);
			return;
		}

		if (e.target.name === 'text') {
			createTaskByAdmin()
		} else {
			correctTask()
		}
	}

	const createTaskByAdmin = () => {

		const taskListCopy = [...tasksList];
		const user_Id_Copy = user_Id;
		const textFormCopy = { ...textForm };
		const copyText = textForm.text;

		tasksApi.createTaskForUser(copyText, user_Id_Copy, token)
			.then((response) => {

				if (response.statusText === 'Created') {
					dispatch(addTasksList(taskListCopy.concat(response.data)))
					textFormCopy.text = ''
					setTextForm(textFormCopy)
				}
			})
			.catch(error => {
				if (error.response.status === 401) {
					setTimeOver(true)
				}
				console.log(error)
			})
	}

	const handleCheckbox = (id) => {
		const taskListCopy = [...tasksList]
		const delId = taskListCopy.findIndex((n) => n._id === id);
		taskListCopy[delId].checked = !taskListCopy[delId].checked;
		setItems(taskListCopy);
		patchTasksOfUsers(id, taskListCopy, taskListCopy[delId].userId, 'checked', taskListCopy[delId].checked)

		if (isCorrect === true) {
			setIsCorrect(!isCorrect);
		}
	}

	const patchTasksOfUsers = (taskID, taskListCopy, userId, typeBody = '', IDchecked = '', taskName = '') => {
		let body = {}
		const accsesstoken = token;
		if (typeBody === 'checked') {
			body = {
				id: taskID,
				userId: userId,
				checked: IDchecked
			}
		} else {
			body = {
				id: taskID,
				userId: userId,
				name: taskName
			}
		}

		tasksApi.patchTasks(accsesstoken, body)
			.then((response) => {
				if (response.data === 'OK') {
					dispatch(addTasksList(taskListCopy))
				}
			})
			.catch(error => {
				if (error.response.status === 401) {
					setTimeOver(true)
				}
				console.log(error)
			})
	}

	const removeTask = (id) => {
		let taskListCopy = [...tasksList];
		const accsesstoken = token;
		let Id_Copy = user_Id;
		const delId = taskListCopy.findIndex((n) => n._id === id);
		taskListCopy.splice(delId, 1);

		tasksApi.deleteTask(id, Id_Copy, accsesstoken)
			.then((response) => {
				if (response.status === 204) {
					dispatch(addTasksList(taskListCopy))
				}
			})
			.catch(error => {
				console.log(error)
			})
	}


	const showCorrectForm = (id) => {
		const taskListCopy = [...tasksList];
		const textFormCopy = { ...textForm };
		setTextForm(textFormCopy);
		let correctItem = taskListCopy.find((item) => item._id === id);
		setCorrectId(id);
		textFormCopy.correctText = correctItem.name;

		if (isCorrect === false) {
			setIsCorrect(!isCorrect);
		}
	}

	const correctTask = () => {
		const taskListCopy = [...tasksList];
		const textFormCopy = { ...textForm };
		let correctItem = taskListCopy.find((item) => item._id === correctId);
		correctItem.name = textFormCopy.correctText;
		patchTasksOfUsers(correctId, taskListCopy, correctItem.userId, 'name', '', textFormCopy.correctText)

		if (isCorrect === true) {
			setIsCorrect(!isCorrect);
		}
	}


	const renderTasks = (arr) => {
		let result;

		result = arr.map((item, index) => {
			const { _id, name, checked } = item;

			return (
				<>
					{role === 'admin' && < TaskUser
						key={index}
						id={_id}
						taskName={name}
						taskNumber={arr.indexOf(item) + 1}
						onChange={() => handleCheckbox(_id)}
						onClick={() => removeTask(_id)}
						item={item}
						checked={checked}
						role={role}
					/>
					}

					{role === 'user' && < TaskUser
						key={index}
						id={_id}
						taskName={name}
						taskNumber={arr.indexOf(item) + 1}
						onChange={() => handleCheckbox(_id)}
						item={item}
						checked={checked}
						role={role}
					/>
					}

					{/* {item.checked && (
						<button className="correct-btn" onClick={() => showCorrectForm(_id)}>
							correct
						</button>
					)} */}

					{item.checked && <CorrectButton
						onClick={() => showCorrectForm(_id)}
					/>}
				</>
			)
		});
		return result;
	}

	return (
		<>
			<section className='tasks-section'>

				<div className='logo-tasks'>
					
				</div>

				{timeOver && <TimeOverWindow
					text='Your time is over! Go to signIn'
					onClick={() => setTimeOver(false)}
					link='SignInRoute'
				/>}


				{role === 'admin' && < AddTaskForm
					value={textForm.text}
					onChange={handleChange}
					onSubmit={handleTaskSubmit}
					nameInput='text'
					nameForm='text'
					errorMessage={errorMessage.text}
				/>}

				<SearchTaskForm
					onSubmit={handleSubmitSearch}
					onChange={handleChangeSearch}
					value={searchText}
					ref={inputSearchEl}
				/>
				{/* {changeTask()} */}

				{isCorrect &&
					<CorrectForm
						onChange={handleChange}
						onSubmit={handleTaskSubmit}
						value={textForm.correctText}
						formName='correctText'
						nameInput='correctText'
						nameButton='correctButton'
						errorMessage={errorMessage.correctText}
					/>}

				<div className='tasks-wrapper'>

					<ul className='tasks-list'>
						{tasksList && tasksList.length > 0 && !searchItems && renderTasks(tasksList)}
						{searchItems && renderTasks(searchItems)}
					</ul>
					{/* <ToDoApp /> */}
				</div>

			</section>
		</>
	)
}



export default Tasks;
