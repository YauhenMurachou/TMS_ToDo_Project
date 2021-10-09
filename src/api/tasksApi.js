import axios from 'axios';

import { setAuthRequest } from './baseApi';

export const tasksApi = {

	getTasks: async (accsesstoken) => {
		setAuthRequest(accsesstoken)
		return axios.get('http://localhost:3001/tasks')
	}
}