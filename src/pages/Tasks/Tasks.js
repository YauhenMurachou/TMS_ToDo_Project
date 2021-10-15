import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Tasks.scss';

import { tasksApi } from '../../api/tasksApi';
import { ToDoApp } from '../../components';
import Search from '../../components/search/Search';
import TaskUser from '../../components/taskUser/TaskUser';
import AddTaskForm from '../../components/addTaskForm/AddTaskForm';
import { addTasksList } from '../../redux/actions/toDoAppActions';

const Tasks = () => {

	const { user_Id } = useParams();
	const dispatch = useDispatch();

	const appState = useSelector(state => state.toDoAppReducer);
	const { token, role, tasksList } = appState;
	// const [tasks, setTasks] = useState([])
	const [textForm, setTextForm] = useState({
		text: ''
	})

	let [items, setItems] = useState([]);


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
				// const tasksList = res.data
				// setTasks(tasksList)
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
		// console.log('handleChange', e.target.value)
		const textFormCopy = { ...textForm }
		// console.log('textFormCopy', textFormCopy)
		textFormCopy[e.target.name] = e.target.value
		setTextForm(textFormCopy)
	}

	const handleTaskSubmit = e => {
		e.preventDefault();
		// console.log('handleTaskSubmit', e.target.name)
		if (role === 'admin') {
			createTaskByAdmin()
		}
	}


	const createTaskByAdmin = () => {

		const taskListCopy = [...tasksList]

		// console.log('fucking role', role)
		const user_Id_Copy = user_Id;
		const textFormCopy = { ...textForm }
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
	}

	const removeTask = (id) => {
		
		let taskListCopy = [...tasksList]
		const delId = taskListCopy.findIndex((n) => n._id === id);
		taskListCopy.splice(delId, 1);
		dispatch(addTasksList(taskListCopy))
		console.log(taskListCopy)
	}


	// {
	// 	id: '', // Идентификатор задачи
	// 	userId: '', //Идентификатор пользователя, который редактирует сам задачу или которому админ редактирует задачу
	// 	checked: '', // Если меняется статус задачи, то передавать либо true/false
	// 	name: '' // Если переименовываем задачу, передаем в значении новое название
	// },

	const renderTasks = (arr) => {
		let result;

		result = arr.map((item, index) => {
			const { _id, name, checked } = item;
			return (
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

				<Search
					placeholder='enter task name'
				/>
				

				<div className='tasks-wrapper'>

					<ul className='tasks-list'>
						{/* {renderTasks(tasksList)} */}
						{tasksList && tasksList.length > 0 && renderTasks(tasksList)}
					</ul>
					<ToDoApp/>
				</div>

			</section>
		</>
	)
}



export default Tasks;
