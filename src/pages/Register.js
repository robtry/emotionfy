import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	Button,
	Card,
	CardBody,
	//CardFooter,
	Col,
	Container,
	Form,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row,
	Alert
} from 'reactstrap';

import Loader from '../components/Loader';
import userContext from '../context/userContext';
import logo from '../assets/img/brand/logo.svg';

const Register = () => {
	const singup = useContext(userContext).singUp;
	const error = useContext(userContext).errorInAuth;
	const isLoading = useContext(userContext).isLoading;
	const token = useContext(userContext).token;
	const clearError = useContext(userContext).clearError;
	const history = useHistory();
	const { handleSubmit, register, errors, watch } = useForm();

	const onSubmitHandler = (data) => {
		//console.log(data);
		singup(data.email, data.password1);
	};

	useEffect(
		() => {
			if (!error && token.length > 0) {
				history.replace('/');
			}
		},
		[ error, history, token ]
	);

	useEffect(() => {
		clearError(false);
	}, [clearError]);

	//console.log(error);

	return (
		<div className="app flex-row align-items-center">
			<Container>
				<Row className="justify-content-center">
					<img src={logo} alt="emotionfy" />
				</Row>
				{error && (
					<Row className="justify-content-center">
						<Alert color="danger">
							{error === 'EMAIL_EXISTS' && (
								<p>
									The email address is already in use by another account. Please&nbsp;
									<NavLink className="alert-link" to="/login" exact>
										Log in
									</NavLink>
								</p>
							)}
							{error === 'TOO_MANY_ATTEMPTS_TRY_LATER' && (
								<p>
									We have blocked all requests from this device due to unusual activity. Try again
									later.
								</p>
							)}
						</Alert>
					</Row>
				)}
				{isLoading ? (
					<Loader />
				) : (
					<Row className="justify-content-center">
						<Col md="9" lg="7" xl="6">
							<Card className="mx-4">
								<CardBody className="p-4">
									<Form /*autoComplete="off"*/ onSubmit={handleSubmit(onSubmitHandler)}>
										<h1>Register</h1>
										<p className="text-muted">Create your account</p>
										{/* <InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="icon-user" />
											</InputGroupText>
										</InputGroupAddon>
										<Input type="text" placeholder="Username" autoComplete="username" />
									</InputGroup> */}
										<InputGroup className="mb-3">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>@</InputGroupText>
											</InputGroupAddon>
											<input
												className={errors.email ? 'is-invalid form-control' : 'form-control'}
												type="text"
												placeholder="Email"
												autoComplete="email"
												name="email"
												ref={register({
													required: 'Write your mail',
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
														message: 'Invalid email address'
													}
												})}
											/>
											{errors.email && (
												<div className="invalid-feedback">{errors.email.message}</div>
											)}
										</InputGroup>
										<InputGroup className="mb-3">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="icon-lock" />
												</InputGroupText>
											</InputGroupAddon>
											<input
												type="password"
												placeholder="Password"
												name="password1"
												autoComplete="new-password"
												className={
													errors.password1 ? 'is-invalid form-control' : 'form-control'
												}
												ref={register({
													required: 'Type a secure password',
													minLength: {
														value: 6,
														message: 'Password must be at least 6 characters long'
													}
												})}
											/>
											{errors.password1 && (
												<div className="invalid-feedback">{errors.password1.message}</div>
											)}
										</InputGroup>
										<InputGroup className="mb-4">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="icon-lock" />
												</InputGroupText>
											</InputGroupAddon>
											<input
												type="password"
												placeholder="Repeat password"
												autoComplete="new-password"
												name="password2"
												className={
													errors.password2 ? 'is-invalid form-control' : 'form-control'
												}
												ref={register({
													required: 'Type a secure password',
													minLength: {
														value: 6,
														message: 'Password must be at least 6 characters long'
													},
													validate: (value) =>
														value === watch('password1') || "Password doesn't match"
												})}
											/>
											{errors.password2 && (
												<div className="invalid-feedback">{errors.password2.message}</div>
											)}
										</InputGroup>

										{/* <NavLink to="/" exact className="btn btn-success btn-block">
										Create Account
									</NavLink> */}
										<Button color="info" block type="submit">
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
				)}
			</Container>
		</div>
	);
};

export default Register;
