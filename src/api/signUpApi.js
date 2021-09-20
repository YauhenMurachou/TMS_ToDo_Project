import axios from 'axios';

export const signUpApi = {
	signUpUser: async (body) => {
		return axios.post('', body)
	}
}