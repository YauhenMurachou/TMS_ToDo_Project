import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./reducers";

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware()
	
	));

	// in index.js (inside reducers) мы опеределяем rootReducer

export default store;