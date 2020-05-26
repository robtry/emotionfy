import React from 'react';

export default React.createContext({
	isAuth: false,
	token: '',
	refreshToken: '',
	errorInAuth: false,
	isLoading: false, //when authing
	isRefreshing: false,
	refreshSession: () => {},
	clearError: () => {},
	totalProjects: 0,
	setTotalProjects: () => {},
	logIn: (email, password) => {},
	singUp: (email, password) => {},
	logOut: (token) => {}
});
