import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';

import { Home, SignIn, Registration, Tasks, Users } from '../pages';

import { Routes } from '../utils/routes';
import { AuthorizedRoute, NotAuthorizedRoute } from '../components/routes';
import { restoreAuth } from '../redux/actions/toDoAppActions';
import { getCookie } from '../utils/getCookies';

const App = () => {

		const { token, role } = useSelector(state => state.toDoAppReducer)
	
	return (
		<Router>

			<NotAuthorizedRoute exact path={Routes.HomeRoute}
				component={Home} />

			<NotAuthorizedRoute exact path={Routes.SignInRoute}
				component={SignIn} />

			<NotAuthorizedRoute exact path={Routes.SignUpRoute}
				component={Registration} />

			<AuthorizedRoute exact path={Routes.TasksRoute}
				isAuthorized={Boolean(token)}
				hasPermission={role === 'user'}
				component={Tasks} />

			<AuthorizedRoute exact path={Routes.UsersRoute}
				isAuthorized={Boolean(token)}
				hasPermission={role === 'admin'}
				component={Users} />

		</Router>
	)
};

export default App;
