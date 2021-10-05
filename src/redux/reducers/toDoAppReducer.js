import { getCookie } from "../../utils/getCookies";

const initialState = {
	token: getCookie('authorization'),
	role: getCookie('role')
};

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



// case 'DELETE_EL':
// 			return { ...state, items: payload }
// 			break;
// 		case 'DOWNLOAD_NEW_EL':
// 			return { ...state, items: payload }
// 			break;
// 		case 'CHECK_EL':
// 			return { ...state, items: payload }
// 			break;
// 		case 'CHANGE_TEXT_VALUE':
// 			return { ...state, text: payload }
// 			break;
// 		case 'CHANGE_SEARCH_TEXT_VALUE':
// 			return { ...state, searchText: payload }
// 			break
// 		case 'SWITCH_SEARCH_ACTIVE':
// 			return { ...state, searchActive: payload }
// 			break;
// 		case 'CHANGE_FOUND_ITEMS':
// 			return { ...state, foundItems: payload }
// 			break;

