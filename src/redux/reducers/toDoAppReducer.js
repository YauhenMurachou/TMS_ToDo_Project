import Jwt from 'jsonwebtoken';

import { getCookie } from '../../utils/getCookies';

const token = getCookie('authorization')

//функция getCookie получает куки
const decodedData = Jwt.decode(token) || { role: '', id: '' }

// decodedData расшифровывает токен в объект с полями
const { role, id: userId } = decodedData
// деструктуризируем decodedData в две переменные

const initialState = {
	token: token,
	role: role,
	tasksList: [],
	userId: userId,
	usersList: []
};


export const toDoAppReducer = (state = initialState, action) => {

	const { type, payload } = action;
	switch (type) {
		case 'SIGN_IN':
			return { ...state, ...payload }

		case 'ADD_USERS_LIST':
			return { ...state, usersList: payload }

		case 'ADD_TASKS_LIST':
			return { ...state, tasksList: payload }

		default:
			return { ...state };

	}
}


