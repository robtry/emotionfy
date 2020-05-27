import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from './util/axios'; //from axios for normas requests
import firebase from './util/firebase';
// own
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Loader from './components/Loader';

//import HomePage from './pages/Home';
import DefaultLayout from './containers/DefaultLayout';

// context
import UserContext from './context/userContext';

// styles
import './App.scss';

const App = () => {

	const [ isAuth, setIsAuth ] = useState(false); //false
	const [ token, setToken ] = useState(); //
	const [ isCheckingAuth, setChekingAuth ] = useState(true);
	const [ refreshToken, setRefreshToken ] = useState(); //
	const [ errorAuth, setErrorAuth ] = useState(false);
	const [ isLoading, setisLoading ] = useState(false);
	const [ isRefreshing, setIsRefreshing ] = useState(false);
	const [ totalProjects, setTotalProjects ] = useState(0);

	const createUser = (email, password) => {
		setisLoading(true);
		setErrorAuth(false);
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((res) => {
				console.log('register',res);
				setIsAuth(true);
				setToken(res.data.idToken);
				setRefreshToken(res.data.refreshToken);
				setisLoading(false);
			})
			.catch((err) => {
				console.log(err);
				console.log(err.response.data && err.response.data.error.message)
				setErrorAuth(err.response.data.error.message);
				setisLoading(false);
			});
	};

	const logIn = (email, password) => {
		setisLoading(true);
		setErrorAuth(false);
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((res) => {
				console.log('login:', res);
				setIsAuth(true);
				setToken(res.user.xa);
				setRefreshToken(res.user.refreshToken);
				setisLoading(false);
			})
			.catch((err) => {
				console.log('login:',err);
				console.log(err.response.data && err.response.data.error.message)
				setErrorAuth(err.response.data.error.message);
				setisLoading(false);
			});
	};

	const endSessionUser = () => {
		firebase.auth().signOut()
	.then(() => {
			//setIsAuth(false);
			//setToken();
			//setRefreshToken();
			console.log('bye')

		}).catch(err => console.log(err))
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

	useEffect(() => {
		firebase.auth().onAuthStateChanged(setIsAuth);
	}, []);
	
	useEffect( () => {
		console.log('isAut now is',isAuth);
		if(isAuth && isAuth.xa){
			axios.defaults.headers.common['Authorization'] = `Bearer ${isAuth.xa}`;
		}
		if(isAuth && isAuth.xa || isAuth === null){
			setChekingAuth(false);
		}

	},[isAuth])

	return (
		<UserContext.Provider
			value={{
				isAuth: isAuth,
				//setAuth: setIsAuth,
				token: token,

				refreshToken: refreshToken,
				isRefreshing: isRefreshing,
				refreshSession: refreshSession,

				errorInAuth: errorAuth,
				clearError: setErrorAuth,

				isLoading: isLoading,

				totalProjects: totalProjects,
				setTotalProjects: setTotalProjects,

				logIn: logIn,
				singUp: createUser,
				logOut: endSessionUser
			}}
		>
			{isCheckingAuth ? 
			<div style={{marginTop: '25%'}}>
				<Loader/>
			</div>
			
			: <Router>
					<Switch>
						{!isAuth && <Route exact path="/" component={Landing} />}
						{isAuth && <Route path="/" component={DefaultLayout} />}
						{!isAuth && <Route exact path="/login/" component={Login} />}
						{!isAuth && <Route exact path="/register" component={Register} />}
						{!isAuth && <Redirect to="/login" />}
					</Switch>
			</Router>}
		</UserContext.Provider>
	);
};

export default App;
