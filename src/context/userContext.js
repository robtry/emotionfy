import React from 'react';

export default React.createContext({
	isAuth: false,
	setAuth: () => {},
	token: '',

	refreshToken: '',
	isRefreshing: false,
	refreshSession: () => {},

	errorInAuth: false, // already exists, no exists, wrong pass
	clearError: () => {},

	isLoading: false, // when authing

	totalProjects: 0,
	setTotalProjects: () => {},

	logIn: (email, password) => {},
	singUp: (email, password) => {},
	logOut: () => {}
});
