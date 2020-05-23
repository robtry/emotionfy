import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// own
import Login from './pages/Login';
import Register from './pages/Register';

//import HomePage from './pages/Home';
import DefaultLayout from './containers/DefaultLayout';

// context
import UserContext from './context/userContext';

// styles
import './App.scss';

const App = () => {
	const [ isAuth, setIsAuth ] = useState(true);

	const authenticateUser = (username, password) => {
		//console.log('iniciando sesion: ', username, password);
		setIsAuth(true);
	};

	const endSessionUser = (token) => {
		console.log('terminando sesion', token);
		setIsAuth(false);
	};

	return (
		<UserContext.Provider
			value={{
				isAuth: isAuth,
				authUser: authenticateUser,
				logOut: endSessionUser
			}}
		>
			<Router>
				<Router>
					<Switch>
						<Route exact path="/login/" component={Login} />
						<Route exact path="/register" component={Register} />
						{isAuth && <Route path="/" component={DefaultLayout} />}
						{!isAuth && <Redirect from="/" to="/login" />}
					</Switch>
				</Router>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
