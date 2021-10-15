import Jwt from 'jsonwebtoken';

import { getCookie } from '../../utils/getCookies';

const token = getCookie('authorization')
const decodedData = Jwt.decode(token) || { role: '', id: '' }
const { role, id: userId } = decodedData

const initialState = {
	token: token,
	role: role,
	tasksList: [],
	userId: userId,
	usersList: []	
};


export const toDoAppReducer = (state = initialState, action) => {
	// console.log('Reducer -initialState',state)
	const { type, payload } = action;
	switch (type) {
		case 'SIGN_IN':
			return { ...state, ...payload }

		case 'ADD_USERS_LIST':
			return { ...state, usersList: payload }

		case 'ADD_TASKS_LIST':
			// console.log('ADD_TASKS_LIST', action.payload)
			return { ...state, tasksList: payload }

		default:
			return { ...state };

	}
}


