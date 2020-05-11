import React from 'react';

export default React.createContext({
	isAuth: false,
	authUser: (username, password) => {},
	logOut: token => {},
});