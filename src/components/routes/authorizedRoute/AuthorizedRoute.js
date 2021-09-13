import React from "react";
import { Route } from "react-router-dom";
import { Users } from '../../../pages';
import { Navigation } from '../../index';

const AuthorizedRoute = (props) => {

	const { component: Component, path } = props;
	return (
		<>

			<Route exact path={path}>
				<Navigation />
				<Component />
			</Route>
		</>
	)
};

export default AuthorizedRoute;