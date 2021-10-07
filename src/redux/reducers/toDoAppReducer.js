import { getCookie } from "../../utils/getCookies";

	const token = getCookie('authorization')
	const decodedData = jwt.decode(token)
	const { role, id: userId } = decodedData

const initialState = { token,	role, userId }

export const toDoAppReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case 'SIGN_IN':
			return { ...state, ...payload }
			break;
		
		default:
			return { ...state };

	}
}


