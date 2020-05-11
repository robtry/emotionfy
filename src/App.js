import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// own
import Login from './pages/Login';
import Register from './pages/Register';
import Page404 from './pages/Page404';
//import HomePage from './pages/Home';
import DefaultLayout from './containers/DefaultLayout';

// context
import UserContext from './context/userContext';

// styles
import './App.scss';

const App = () => {
	const [ isAuth, setIsAuth ] = useState(false);

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
				<Switch>
					 <Route exact path="/login/" component={Login} />
					 <Route exact path="/register" component={Register} />
					{isAuth && <Route path="/" render={(props) => <DefaultLayout {...props} />} />}
					{!isAuth && <Redirect from="/" to="/login" />}
					<Route component={Page404} />

					{/* <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} /> */}
				</Switch>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
