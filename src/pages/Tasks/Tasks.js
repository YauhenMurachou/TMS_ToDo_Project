import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Tasks.scss';

import { tasksApi } from '../../api/tasksApi';
// import { ToDoApp } from '../../components';
import Search from '../../components/search/Search';
import TaskUser from '../../components/taskUser/TaskUser';
import AddTaskForm from '../../components/addTaskForm/AddTaskForm';

const Tasks = () => {

	const { user_Id } = useParams();

	const appState = useSelector(state => state.toDoAppReducer)
	const { token, role } = appState;
	const [tasks, setTasks] = useState([])
	const [searchText, setSearchText] = useState('')
	const [text, setText] = useState('')

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
				const tasksList = res.data
				setTasks(tasksList)
			})
			.catch(error => {
				console.error(error.message)
			})
	}

	const getTasks = () => {

		tasksApi.getTasks(token)
			.then(res => {
				const tasksList = res.data
				setTasks(tasksList)
			})
			.catch(error => {
				console.error(error.message)
			})
	}

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
					value={text}
				/>}

				<Search
					placeholder='enter task name'
					value={searchText}
					/>
				{/* <ToDoApp/> */}

				<div className='tasks-wrapper'>

					<ul className='tasks-list'>
					{tasks && tasks.length > 0 && renderTasks(tasks)}
					</ul>
				</div>

			</section>
		</>
	)
}

export default Tasks;
