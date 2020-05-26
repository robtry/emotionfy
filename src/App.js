import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios'; //from axios for normas requests
// own
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';

//import HomePage from './pages/Home';
import DefaultLayout from './containers/DefaultLayout';

// context
import UserContext from './context/userContext';

// styles
import './App.scss';

const App = () => {
	const [ isAuth, setIsAuth ] = useState(false); //false
	const [ token, setToken ] = useState(''); //
	const [ refreshToken, setRefreshToken ] = useState(''); // ''
	const [ errorAuth, setErrorAuth ] = useState(false);
	const [ isLoading, setisLoading ] = useState(false);
	const [ isRefreshing, setIsRefreshing ] = useState(false);
	const [ totalProjects, setTotalProjects ] = useState(0);

	const createUser = (email, password) => {
		setisLoading(true);
		setErrorAuth(false);
		axios
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiUEuXMafgY-G4wMRlJC_bCZxK-CzbiKs',
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

				setisLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setErrorAuth(err.response.data.error.message);
				setisLoading(false);
			});
	};

	const logIn = (email, password) => {
		setisLoading(true);
		setErrorAuth(false);
		axios
			.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiUEuXMafgY-G4wMRlJC_bCZxK-CzbiKs',
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
	};

	const refreshSession = () => {
		console.log('refreshing');
		setIsRefreshing(true);
		axios
			.post(
				'https://securetoken.googleapis.com/v1/token?key=AIzaSyDiUEuXMafgY-G4wMRlJC_bCZxK-CzbiKs',
				{
					grant_type: 'refresh_token',
					refresh_token: refreshToken
				},
				{
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				}
			)
			.then((res) => {
				console.log('refreshSession', res);
				setIsAuth(true);
				setToken(res.data.idToken);
				setRefreshToken(res.data.refreshToken);
				//setIsRefreshing(false);
			})
			.catch((err) => {
				console.log(err);
				console.log(err.response.data.error);
				setErrorAuth(err.response.data.error.message);
				//setIsRefreshing(false);
			});
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
				refreshSession: refreshSession,
				isRefreshing: isRefreshing,
				totalProjects: totalProjects,
				setTotalProjects: setTotalProjects
			}}
		>
			<Router>
				<Router>
					<Switch>
						{isAuth && <Route path="/" component={DefaultLayout} />}
						<Route exact path="/" component={Landing} />
						<Route exact path="/login/" component={Login} />
						<Route exact path="/register" component={Register} />
						{!isAuth && <Redirect to="/" />}
					</Switch>
				</Router>
			</Router>
		</UserContext.Provider>
	);
};

export default App;
