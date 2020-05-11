import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
	Badge,
	UncontrolledDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	NavItem,
	InputGroupAddon,
	InputGroupText,
	Input
} from 'reactstrap';
import { AppAsideToggler, AppNavbarBrand } from '@coreui/react';

// own
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import defaultPicProfile from '../../assets/img/avatar/default.png';

/** Top Navbar */

class DefaultHeader extends Component {
	render() {
		return (
			<React.Fragment>
				<AppNavbarBrand
					full={{ src: logo, width: 150, height: 80, alt: 'Emotionfy Logo' }}
					minimized={{ src: sygnet, width: 30, height: 30, alt: 'Emotionfy Logo' }}
				/>

				<Nav className="d-md-down-none" navbar>
					<NavItem className="px-3">
						<NavLink to="/" className="nav-link">
							Home
						</NavLink>
					</NavItem>
					{/* <NavItem className="px-3">
						<Link to="/users" className="nav-link">
						Users
						</Link>
					</NavItem> */}
					{/* <i className="fa fa-usd" /> Payments<Badge color="secondary">42</Badge> */}
					
					<NavItem />
					<i className="fa fa-file" />&nbsp;&nbsp;Projects&nbsp;<Badge color="primary">42</Badge>
				</Nav>
				<Nav className="ml-auto" navbar>
					<InputGroupAddon addonType="prepend">
						<InputGroupText>
							<i className="icon-magnifier" />
						</InputGroupText>
						<Input type="text" placeholder={'Search...'} />
					</InputGroupAddon>
					<NavItem />

					<UncontrolledDropdown nav direction="down">
						<DropdownToggle nav>
							<img src={defaultPicProfile} className="img-avatar" alt="profile-pic" />
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem header tag="div" className="text-center">
								<strong>Settings</strong>
							</DropdownItem>
							<DropdownItem>
								<i className="fa fa-user" /> Profile
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								<i className="fa fa-shield" /> Lock Account
							</DropdownItem>
							<DropdownItem onClick={(e) => this.props.onLogout(e)}>
								<i className="fa fa-lock" /> Logout
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				</Nav>

				<Badge pill color="danger">
					5
				</Badge>

				<AppAsideToggler className="d-md-down-none" />
			</React.Fragment>
		);
	}
}

export default DefaultHeader;
