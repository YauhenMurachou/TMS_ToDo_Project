import axios from 'axios'

export const setAuthRequest = (accsesstoken) => {

	axios.interceptors.request.use(
		config => {
			config.headers.authorization = `Bearer ${accsesstoken}`;
			return config;
		},
		error => {
			return Promise.reject(error)
		}
	)
}
