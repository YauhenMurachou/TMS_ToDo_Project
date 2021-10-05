import React from "react";
import { Route, Redirect } from "react-router-dom";

import { Navigation } from '../../../components';
import { Routes } from "../../../utils/routes";
// import getCookie from "../../../utils/getCookies";

const AuthorizedRoute = (props) => {

	const { component: Component, path, isAuthorized, hasPermission } = props
	// const userRole = getCookie('role')
	// const hasPermission = 'admin' === expectedRole

	return (
		< Route exact path={path} >
			{(isAuthorized && hasPermission)?
				<>
					<Navigation />
					<Component />
				</> :
				<Redirect to={Routes.SignInRoute} />
			}
		</Route>
	)
};


// const AuthorizedRoute = (props) => {

// 	const { component: Component, path, isAutorized } = props
// 	return (
// 		< Route exact path={path} >
		
// 				<>
// 					<Navigation />
// 					<Component />
// 				</> 
// 		</Route>
// 	)
// };


export default AuthorizedRoute;