import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";

import './App.css';

import { Home, SignIn, Registration, Tasks, Users } from '../pages'
import { Navigation, ToDoApp, ToDoList } from '../components';
import { Routes } from '../utils/routes';
import { AuthorizedRoute, NotAuthorizedRoute } from '../components/routes';


const App = () => {

	const history = useHistory();

	useEffect(() => {

	}, []);

	return (
		<Router>
			<Route exact path={Routes.HomeRoute}>
				<Home />
			</Route>

			<NotAuthorizedRoute exact path={Routes.SignInRoute} component={SignIn} />

			<NotAuthorizedRoute exact path={Routes.SignUpRoute} component={Registration} />

			<AuthorizedRoute exact path={Routes.TasksRoute} component={Tasks} />

			<AuthorizedRoute exact path={Routes.UsersRoute} component={Users} />
		</Router>
	)
}


export default App;
