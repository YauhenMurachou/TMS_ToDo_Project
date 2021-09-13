import React from "react";
import { Link } from "react-router-dom";
import { Routes } from '../../utils/routes';

const SignIn = () => {
	return (
		<div>
			<h1>
				Page of login
			</h1>
			<button>
				<Link to={Routes.SignUpRoute} >
					<span>Зарегистрироваться</span>
				</Link>
			</button>
		</div>
	)
};

export default SignIn;