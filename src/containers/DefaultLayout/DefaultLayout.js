import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { AppAside, AppFooter, AppHeader, AppBreadcrumb2 as AppBreadcrumb } from '@coreui/react';


// routes config
import routes from '../../routes';

import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

const DefaultLayout = (props) => {
	const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

	const signOut = (e) => {
		e.preventDefault();
		props.history.push('/login');
	};

	return (
		<div className="app">
			<AppHeader fixed>
				<DefaultHeader onLogout={(e) => signOut(e)} />
			</AppHeader>
			<div className="app-body">
				<main className="main">
					<AppBreadcrumb appRoutes={routes} router={router} />
					<Container fluid>
						<Suspense fallback={loading()}>
							<Switch>
								{routes.map((route, idx) => {
									return route.component ? (
										<Route
											key={idx}
											path={route.path}
											exact={route.exact}
											name={route.name}
											render={(props) => <route.component {...props} />}
										/>
									) : null;
								})}
								{/* <Redirect from="/" to="/dashboard" /> */}
							</Switch>
						</Suspense>
					</Container>
				</main>
				<AppAside fixed>
					<DefaultAside />
				</AppAside>
			</div>
			<AppFooter>
				<DefaultFooter />
			</AppFooter>
		</div>
	);
};

export default DefaultLayout;
