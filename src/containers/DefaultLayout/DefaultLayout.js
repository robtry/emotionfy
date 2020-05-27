import React, { Suspense, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container, Alert } from 'reactstrap';
import { AppAside, AppFooter, AppHeader /*AppBreadcrumb2 as AppBreadcrumb*/ } from '@coreui/react';
import Loader from '../../components/Loader';

// routes config
import Home from '../../pages/Home';
import Page404 from '../../pages/Page404';
import VideoDetails from '../../pages/VideoDetails';

import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

//
import userContext from '../../context/userContext';

const DefaultLayout = (props) => {
	//console.log('default layot props', props)
	const loading = () => <Loader />;

	const { isRefreshing, totalProjects, logOut } = useContext(userContext)

	return (
		<div className="app">
			<AppHeader fixed>
				<DefaultHeader onLogout={logOut} total={totalProjects} />
			</AppHeader>
			<div className="app-body">
				<main className="main">
					<Container fluid>
						{isRefreshing && (
							<Alert color="warning">
								<div style={{ marginTop: '30px' }} />
								Your session has expired, recovering session ...
								<div style={{ marginTop: '30px' }} />
							</Alert>
						)}
						<Suspense fallback={loading()}>
							<Switch>
								<Redirect from='/login' to='/' />
								<Redirect from='/register' to='/' />
								<Route exact path="/" component={Home} />
								<Route path="/success" component={Home} />
								<Route exact path="/media/:id" component={VideoDetails} />
								<Route component={Page404} />
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
