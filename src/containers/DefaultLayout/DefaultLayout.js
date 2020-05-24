import React, { Suspense, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
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
	const loading = () => <Loader/>;

	const signOut = useContext(userContext).logOut;


	return (
		<div className="app">
			<AppHeader fixed>
				<DefaultHeader onLogout={() => signOut()} />
			</AppHeader>
			<div className="app-body">
				<main className="main">
					<Container fluid>
						<Suspense fallback={loading()}>
							<Switch>
								<Route exact path="/" component={Home} />
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
