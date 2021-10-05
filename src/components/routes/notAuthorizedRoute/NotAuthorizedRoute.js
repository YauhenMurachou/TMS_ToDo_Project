import React from "react";
import { Route } from "react-router-dom";
import { SignIn } from '../../../pages';
import { Navigation } from '../../index';

const NotAuthorizedRoute = ({ component: Component, path }) => {

	// const { component: Component, path } = props;
		// <Route>
		// 	render={(props) => authed === true
		// 		? <Component {...props} />
		// 		: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
		// </Route>
	return (
		<>
		<Route exact path={path}>
			{/* Если убрать Navigation отсюда, то не будет верхней полосы на странице */}
		<Navigation />
			<Component />
		</Route>
		</>


	)
}

export default NotAuthorizedRoute;