import React from "react";
import { Route } from "react-router-dom";
import { SignIn } from '../../../pages';
import { Navigation } from '../../index';

const NotAuthorizedRoute = ({ component: Component, path }) => {

	// const { component: Component, path } = props;
	return (
		// <Route>
		// 	render={(props) => authed === true
		// 		? <Component {...props} />
		// 		: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
		// </Route>

		<>
		<Route exact path={path}>
		<Navigation />
			<Component />
		</Route>
		</>


	)
}

export default NotAuthorizedRoute;