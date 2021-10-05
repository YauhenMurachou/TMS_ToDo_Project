export const Routes = {
	HomeRoute: '/',
	SignInRoute: '/signIn',
	SignUpRoute: '/signUp',
	TasksRoute: '/tasks',
	UsersRoute: '/users'
}

export const linkToRoute = (history, route) => {
	history.push(route)
}