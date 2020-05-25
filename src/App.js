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
	const [ token, setToken ] = useState(
		"eyJhbGciOiJSUzI1NiIsImtpZCI6IjgyMmM1NDk4YTcwYjc0MjQ5NzI2ZDhmYjYxODlkZWI3NGMzNWM4MGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZW1vdGlvbmZ5LW1lZGlhLTI3NzUxOSIsImF1ZCI6ImVtb3Rpb25meS1tZWRpYS0yNzc1MTkiLCJhdXRoX3RpbWUiOjE1OTAzOTg2MTAsInVzZXJfaWQiOiI5VWMxcWpkUDNpZzZLcjJFVDlUN1pYNTVXQzEyIiwic3ViIjoiOVVjMXFqZFAzaWc2S3IyRVQ5VDdaWDU1V0MxMiIsImlhdCI6MTU5MDM5ODYxMCwiZXhwIjoxNTkwNDAyMjEwLCJlbWFpbCI6InJnZy5jb3JyZW9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJnZy5jb3JyZW9AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.OwbmKgR0zOcsDMYEl0xTi4awEwnoCwZiFAAyekE7BY_-VI8XSz-Q2DhmH50pSaY91NDi9GVyxLm5h7psKvFZGAxyUMAKdIbB_Aj77nBmQj-BOwa54rdz3oDTYyRGiUd-Hr3kv79Unkbss23L3mPrfle_UvRXqZGyTd0cWk5jWpo5Yd85bEPfrmgHs9tVAX8FyFt9YT_y66xKrnJqzkM19vVnreOWepcTptCetd9zGPi9UvLCRxUNYHoLj6mwh54v99lWRzMZjuWi7t5L-v8nYkg-8QGKM_vMHma8ulY8cka9KtUN6RGnE18Biy0UW7uzodb8nFIZlcJB3jnYzhdn6g"
	); //
	const [ refreshToken, setRefreshToken ] = useState(''	); // ''
	const [ errorAuth, setErrorAuth ] = useState(false);
	const [ isLoading, setisLoading ] = useState(false);
	const [ isRefreshing, setIsRefreshing ] = useState(false);

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
				isRefreshing: isRefreshing
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
