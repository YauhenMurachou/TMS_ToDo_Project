import React from "react";
import { Route, Redirect } from "react-router-dom";

import { Navigation } from '../../index';
import { Routes } from "../../../utils/routes";

const AuthorizedRoute = (props) => {

	const { component: Component, path, isAutorized } = props
	return (
		< Route exact path={path} >
			{isAutorized ?
				<>
					<Navigation />
					<Component />
				</> :
				<Redirect to={Routes.SignInRoute} />
			}
		</Route>
	)
};

export default AuthorizedRoute;