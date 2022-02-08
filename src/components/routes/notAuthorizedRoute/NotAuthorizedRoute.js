import React from 'react';
import { Route } from 'react-router-dom';

const NotAuthorizedRoute = ({ component: Component, path }) => {
	// path={Routes.HomeRoute}/SignInRoute/SignUpRoute прописан в app.js. Переменная Routes в utils --> routes.js
	// component={Home}/SignIn/Registration прописан в app.js. На каждый путь своя страница

	return (
		<>
			<Route exact path={path}>
				<Component />
			</Route>
		</>
	)
}

export default NotAuthorizedRoute;