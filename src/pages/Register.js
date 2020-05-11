import React, { useContext } from 'react';
import { /*NavLink,*/ useHistory } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	//CardFooter,
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

const Register = () => {
	const login = useContext(userContext).authUser;
	const history = useHistory();
	return (
		<div className="app flex-row align-items-center">
			<Container>
				<Row className="justify-content-center">
					<img src={logo} alt="emotionfy" />
				</Row>
				<Row className="justify-content-center">
					<Col md="9" lg="7" xl="6">
						<Card className="mx-4">
							<CardBody className="p-4">
								<Form>
									<h1>Register</h1>
									<p className="text-muted">Create your account</p>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="icon-user" />
											</InputGroupText>
										</InputGroupAddon>
										<Input type="text" placeholder="Username" autoComplete="username" />
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>@</InputGroupText>
										</InputGroupAddon>
										<Input type="text" placeholder="Email" autoComplete="email" />
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="icon-lock" />
											</InputGroupText>
										</InputGroupAddon>
										<Input type="password" placeholder="Password" autoComplete="new-password" />
									</InputGroup>
									<InputGroup className="mb-4">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="icon-lock" />
											</InputGroupText>
										</InputGroupAddon>
										<Input
											type="password"
											placeholder="Repeat password"
											autoComplete="new-password"
										/>
									</InputGroup>

									{/* <NavLink to="/" exact className="btn btn-success btn-block">
										Create Account
									</NavLink> */}
									<Button
										color="success"
										block
										onClick={() => {
											login('a', 'b');
											history.replace('/');
										}}
									>
										Create Account
									</Button>
								</Form>
							</CardBody>
							{/* <CardFooter className="p-4">
								<Row>
									<Col xs="12" sm="6">
										<Button className="btn-facebook mb-1" block>
											<span>facebook</span>
										</Button>
									</Col>
									<Col xs="12" sm="6">
										<Button className="btn-twitter mb-1" block>
											<span>twitter</span>
										</Button>
									</Col>
								</Row>
							</CardFooter> */}
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Register;
