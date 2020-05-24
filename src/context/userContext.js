import React from 'react';

export default React.createContext({
	isAuth: false,
	token: '',
	refreshToken: '',
	user_id: '',
	errorInAuth: false,
	clearError: () => {},
	isLoading: false,
	logIn: (email, password) => {},
	singUp: (email, password) => {},
	logOut: token => {},
});