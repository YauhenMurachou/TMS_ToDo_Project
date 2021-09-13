import React from "react";
import { Link, useHistory } from "react-router-dom";

import '../navigation/Navigation.scss'

import { Routes } from '../../utils/routes'

const Navigation = () => {

	const history = useHistory();

	return <div className='nav-container'>

		<Link to={Routes.HomeRoute}>
			<div className='nav-item'>
				Home
			</div>
		</Link>
		<Link to={Routes.SignInRoute}>
			<div className='nav-item'>
				Login
			</div>
		</Link>
		<Link to={Routes.SignUpRoute}>
			<div className='nav-item'>
				Registration
			</div>
		</Link>
		<Link to={Routes.TasksRoute}>
			<div className='nav-item'>
				Tasks
			</div>
		</Link>
		<Link to={Routes.UsersRoute}>
			<div className='nav-item'>
				Users
			</div>
		</Link>
	</div>
}

export default Navigation;