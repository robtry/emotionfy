import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios'; //from axios for normas requests
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
	const [ isAuth, setIsAuth ] = useState(true); //false
	const [ token, setToken ] = useState('');
	const [ refreshToken, setRefreshToken ] = useState('');
	const [ errorAuth, setErrorAuth ] = useState(false);
	const [ isLoading, setisLoading ] = useState(false);
	const [ userId, setUserId ] = useState('');

	const createUser = (email, password) => {
		setisLoading(true);
		setErrorAuth(false);
		axios
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCycopMyPyrTbB5aSLOD_A1Jf_tZwH1ZJc',
				{
					email,
					password,
					returnSecureToken: true
				},
				{
					headers: { 'Content-Type': 'application/json' }
				}
			)
			.then((res) => {
				//console.log('register',res);
				setIsAuth(true);
				setToken(res.data.idToken);
				setRefreshToken(res.data.refreshToken);
				setUserId(res.data.localId);
				setisLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setErrorAuth(err.response.data.error.message);
				setisLoading(false);
			});
	};

	const logIn = (email, password) => {
		//console.log('logingin')
		setisLoading(true);
		setErrorAuth(false);
		axios
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCycopMyPyrTbB5aSLOD_A1Jf_tZwH1ZJc',
				{
					email,
					password,
					returnSecureToken: true
				},
				{
					headers: { 'Content-Type': 'application/json' }
				}
			)
			.then((res) => {
				console.log('login', res);
				setIsAuth(true);
				setToken(res.data.idToken);
				setRefreshToken(res.data.refreshToken);
				setisLoading(false);
				setUserId(res.data.localId);
			})
			.catch((err) => {
				console.log(err);
				//console.log('login',);
				setErrorAuth(err.response.data.error.message);
				setisLoading(false);
			});
	};

	const endSessionUser = (token) => {
		console.log('terminando sesion', token);
		setIsAuth(false);
		setToken('');
		setRefreshToken('');
		setUserId('');
	};

	return (
		<UserContext.Provider
			value={{
				isAuth: isAuth,
				logIn: logIn,
				singUp: createUser,
				logOut: endSessionUser,
				token: token,
				refreshToken: refreshToken,
				errorInAuth: errorAuth,
				clearError: setErrorAuth,
				isLoading: isLoading,
				user_id: userId
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
