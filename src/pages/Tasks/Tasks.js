import React, { useState, useEffect } from 'react';
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

const Tasks = () => {

	const { user_Id } = useParams();
	const dispatch = useDispatch();

	const appState = useSelector(state => state.toDoAppReducer);
	const { token, role, tasksList } = appState;
	const [textForm, setTextForm] = useState({
		text: '',
		correctText: ''
	})

	let [items, setItems] = useState([]);
	let [correctId, setCorrectId] = useState('');
	const [isCorrect, setIsCorrect] = useState(false)

	useEffect(() => {
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
				console.error(error.message)
			})
	}

	const getTasks = () => {

		tasksApi.getTasks(token)
			.then(res => {
				dispatch(addTasksList(res.data))
			})
			.catch(error => {
				console.error(error.message)
			})
	}

	const handleChange = (e) => {
		const textFormCopy = { ...textForm }
		textFormCopy[e.target.name] = e.target.value
		setTextForm(textFormCopy)
	}

	const handleTaskSubmit = e => {
		e.preventDefault();
		// console.log('handleTaskSubmit---', e.target.name)

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

		console.log('handleCheckbox---', isCorrect)
	}

	const removeTask = (id) => {
		let taskListCopy = [...tasksList]
		const delId = taskListCopy.findIndex((n) => n._id === id);
		taskListCopy.splice(delId, 1);
		dispatch(addTasksList(taskListCopy))
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
				console.log('Ответ - на патч', response)
				if (response.data === 'OK') {
					dispatch(addTasksList(taskListCopy))
				}
			})
			.catch(error => {
				// if (error.response.status === 401) {
				// 	// setSessionFault(true)
				// }
				console.log(error)
			})
	}


	const showCorrectForm = (id) => {
		const taskListCopy = [...tasksList];
		const textFormCopy = { ...textForm };
		setTextForm(textFormCopy);
		let correctItem = taskListCopy.find((item) => item._id === id);
		// console.log('showCorrectForm---', correctItem)
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
		console.log('correctTask---', correctItem);
		correctItem.name = textFormCopy.correctText;

		// console.log('correctTask---', correctId, taskListCopy, correctItem.userId, 'name', '', textFormCopy.correctText)
		patchTasksOfUsers(correctId, taskListCopy, correctItem.userId, 'name', '', textFormCopy.correctText)

		if (isCorrect === true) {
			setIsCorrect(!isCorrect);
		}

		console.log('correctTask---', isCorrect)

	}


	const renderTasks = (arr) => {
		let result;

		result = arr.map((item, index) => {
			const { _id, name, checked } = item;
			return (
				<>
					< TaskUser
						key={index}
						id={_id}
						taskName={name}
						taskNumber={arr.indexOf(item) + 1}
						onChange={() => handleCheckbox(_id)}
						onClick={() => removeTask(_id)}
						item={item}
						checked={checked}
					/>
					{item.checked && (
						<button className="correct-btn" onClick={() => showCorrectForm(_id)}>
							correct
						</button>
					)}
				</>
			)
		});
		return result;
	}

	return (
		<>
			<section className='tasks-section'>

				{role === 'admin' && < AddTaskForm
					value={textForm.text}
					onChange={handleChange}
					onSubmit={handleTaskSubmit}
					nameInput='text'
					nameForm='text'
				/>}

				{isCorrect && role === 'admin' &&
					<CorrectForm
						onChange={handleChange}
						onSubmit={handleTaskSubmit}
						value={textForm.correctText}
						formName='correctText'
						nameInput='correctText'
						nameButton='editTaskButton'
					//  helpEditText={helpFieldText.editTask}

					/>}

				<SearchTaskForm	
				/>

				<div className='tasks-wrapper'>

					<ul className='tasks-list'>
						{tasksList && tasksList.length > 0 && renderTasks(tasksList)}
					</ul>
					<ToDoApp />
				</div>

			</section>
		</>
	)
}



export default Tasks;
