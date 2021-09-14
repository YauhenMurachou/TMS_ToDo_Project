import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/routes';

import '../Registration/Registration.scss'

const Registration = () => {
	return (
		<div>
			<h1>
				Page of registration
			</h1>


		
			<button>
				<Link to={Routes.SignInRoute} >
					<span>Назад</span>
				</Link>
			</button>
		</div>
	)
};

export default Registration;