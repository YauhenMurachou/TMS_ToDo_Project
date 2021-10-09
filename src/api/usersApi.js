import axios from 'axios';

import { setAuthRequest } from './baseApi';

export const usersApi = {

	getUsers: async (accsesstoken) => {		
		setAuthRequest(accsesstoken) 		
		return axios.get('http://localhost:3001/users')
	},

	getAdmins: async () => {
		return axios.get('http://localhost:3001/admins')
	},

	checkUsersExist: async (body) => {
		return axios.post('http://localhost:3001/user/exists', body)
	}
}