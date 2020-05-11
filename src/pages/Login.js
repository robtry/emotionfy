import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardGroup,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row
} from 'reactstrap';

import userContext from '../context/userContext';
import logo from '../assets/img/brand/logo.svg';

const Login = () => {
	const login = useContext(userContext).authUser;
	const history = useHistory();
	return (
		<div className="app flex-row align-items-center">
			<Container>
				<Row className="justify-content-center">
					<img src={logo} alt="emotionfy" />
				</Row>
				<Row className="justify-content-center">
					<Col md="8">
						<CardGroup>
							<Card className="p-4">
								<CardBody>
									<Form>
										<h1>Login</h1>
										<p className="text-muted">Sign In to your account</p>
										<InputGroup className="mb-3">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="icon-user" />
												</InputGroupText>
											</InputGroupAddon>
											<Input type="text" placeholder="Username" autoComplete="username" />
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="icon-lock" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												type="password"
												placeholder="Password"
												autoComplete="current-password"
											/>
										</InputGroup>
										<Row>
											{/* <Col xs="6">
												<NavLink to="/" exact className="px-4 btn btn-primary">
													Login
												</NavLink>
											</Col> */}
											<Col xs="6">
												<Button
													color="primary"
													className="px-4"
													onClick={() => {
														login('a', 'b');
														history.replace('/');
													}}
												>
													Login
												</Button>
											</Col>
											{/* <Col xs="6" className="text-right">
												<Button color="link" className="px-0">
													Forgot password?
												</Button>
											</Col> */}
										</Row>
									</Form>
								</CardBody>
							</Card>
							<Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
								<CardBody className="text-center">
									<div>
										<h2>Sign up</h2>
										<p>
											If you want to use Emotionfy, first sing up
											<br />
											<i className="icon-arrow-down-circle" />
										</p>
										<NavLink to="/register" exact>
											<Button color="primary" className="mt-3" active tabIndex={-1}>
												Register Now!
											</Button>
										</NavLink>
									</div>
								</CardBody>
							</Card>
						</CardGroup>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Login;
