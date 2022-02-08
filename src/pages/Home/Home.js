import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { linkToRoute, Routes } from '../../utils/routes';

const Home = () => {
	const history = useHistory();

	console.log('Home', history)

	//хук useHistory позволяет нам получить доступ к объекту history.
	//  Затем мы можем вызывать такие методы объекта history, как goBack или push.
	//  Метод goBack позволяет перенаправить пользователя к предыдущему маршруту в стеке истории.
	// Например, если пользователь перейдет со страницы Home на страницу Shop,
	//а затем нажмет кнопку для возврата назад(“Go Back”), он снова будет перенаправлен на страницу Home.
	// С другой стороны, мы можем добавить новые записи в стек истории и заставить пользователя перейти на этот маршрут,
	//  используя метод push.

	const { token, role } = useSelector(state => state.toDoAppReducer)

	useEffect(() => {
		if (token) {
			linkToStartPage(role)
		} else {
			history.push(Routes.SignInRoute)
		}
	}, []);
	//useEffect представляет собой совокупность методов componentDidMount, componentDidUpdate, и componentWillUnmount
	// даёт вам возможность выполнять побочные эффекты в функциональном компоненте.
	//Используя этот хук, вы говорите React сделать что-то после каждого рендера. 
	// React запомнит функцию (то есть «эффект»), которую вы передали и вызовет её после того, как внесёт все изменения в DOM

	const linkToStartPage = (role) => {
		if (role === 'admin') {
			linkToRoute(history, Routes.UsersRoute)
		} else {
			linkToRoute(history, Routes.TasksRoute)
		}
	}

	// linkToStartPage определена в utils-->routes-->routes.js
};

export default Home;