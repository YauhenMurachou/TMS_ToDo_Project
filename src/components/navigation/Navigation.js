import React from "react";
import { Link, useHistory } from "react-router-dom";

import '../navigation/Navigation.scss'

import { Routes } from '../../utils/routes'

const Navigation = () => {

	const history = useHistory();

	return <div className='nav-container'>

		<div className='nav-top-line'>
			<i className="far fa-list-alt"></i>
			<div className='nav-top-line-text'>Don't forget to... Your ToDo List
			</div>
		</div>

		<div className='nav-right'>
			<Link to={Routes.SignInRoute}>
				<div className='nav-item-high'>
					<div className='nav-item'>
						Login
					</div>
				</div>
			</Link>
			<Link to={Routes.SignUpRoute}>
				<div className='nav-item-high'>
					<div className='nav-item'>
						Registration
					</div>
				</div>
			</Link>
			<Link to={Routes.UsersRoute}>
				<div className='nav-item-high'>
					<div className='nav-item users-item' >
						Users
						<br />
					</div>
				</div>
			</Link>
		</div>
	</div>
}

export default Navigation;