import axios from 'axios';

export const tasksApi = {

	getTasks: async (accsesstoken) => {

		return axios.get('http://localhost:3001/tasks', {
			headers: {
				authorization: `Bearer ${accsesstoken}`
			}
		})
	},

	getTasksForAdmin: async (accsesstoken, id) => {
		return axios.get(`http://localhost:3001/tasks/${id}`, {
			headers: {
				authorization: `Bearer ${accsesstoken}`
			}
		})
	},

	createTaskForUser: async (name, user_Id, accsesstoken) => {
		console.log('createTaskForUser API', name, user_Id, accsesstoken)
		return axios.post('http://localhost:3001/tasks',
			{
				name: name,
				userId: user_Id
			},
			{
				headers: {
					authorization: `Bearer ${accsesstoken}`
				}
			})
	},

	patchTasks: async (accsesstoken, body) => {
		return axios.patch('http://localhost:3001/tasks', body,
			{
				headers: {
					authorization: `Bearer ${accsesstoken}`
				}
			})
	}
}

