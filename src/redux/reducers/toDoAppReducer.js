import Jwt from 'jsonwebtoken';

import { getCookie } from '../../utils/getCookies';

const token = getCookie('authorization')
const decodedData = Jwt.decode(token) || { role: '', id: '' }
const { role, id: userId } = decodedData

const initialState = {
	token: token,
	role: role,
	userId: userId,
	usersList: [],
	usersSearchList: [],
	tasksList: [],
	tasksSearchList: [],
	userTasksList: [],
	isUserSearch: false,
	isTaskSearch: false
};

export const toDoAppReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SIGN_IN':
			return { ...state, ...payload }

		case 'ADD_USERS_LIST':
			return { ...state, usersList: payload }

		case 'ADD_USERS_SEARCH_LIST':
			return { ...state, usersSearchList: payload }

		case 'ADD_TASKS_LIST':
			return { ...state, tasksList: payload }

		case 'ADD_TASKS_SEARCH_LIST':
			return { ...state, tasksSearchList: payload }

		case 'ADD_USER_TASKS_LIST':
			return { ...state, userTasksList: payload }

		case 'ADD_USER_SEARCH':
			return { ...state, isUserSearch: payload }

		case 'ADD_TASK_SEARCH':
			return { ...state, isTaskSearch: payload }

		default:
			return { ...state };

	}
}


