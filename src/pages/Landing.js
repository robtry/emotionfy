import React from 'react';
import '../scss/landingstyles.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/icons/emotions.jpg';

const Landing = () => {
	return (
		<div className="landingpage">
			<header
				style={{
					backgroundImage: `linear-gradient(to top, #30d0d088 0%, #33086796 100%), url(${logo})`,
					width: '100%',
					height: '650px',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundAttachment: 'fixed',
					position: 'relative',
					overflow: 'hidden'
				}}
			>
				<div className="text-emotionfy">
					<img src={require('../assets/img/brand/logo.svg')} alt="logo" />
					<p>
						You can upload images or videos to be analyzed by a machine learning model and obtain the levels
						of emotions that are in each moment.
					</p>
					<NavLink to="/login" className="button">
						Get Started
					</NavLink>
				</div>
				<div style={{ height: '150px', overflow: 'hidden' }}>
					<svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
						<path
							d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
							style={{ stroke: 'none', fill: '#fff' }}
						/>
					</svg>
				</div>
			</header>
			<section className="price-comparison">
				<div className="price-column">
					<div className="price-header">
						<div className="price">
							<div className="dollar-sign">$</div>
							10
							<div className="per-month">/mo</div>
						</div>
						<div className="plan-name">Basic</div>
					</div>
					<div className="divider" />
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature A
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature B
					</div>
					<div className="feature inactive">
						<img src={require('../assets/img/icons/x-square.svg')} alt="check" />
						Feature C
					</div>
					<div className="feature inactive">
						<img src={require('../assets/img/icons/x-square.svg')} alt="check" />
						Feature D
					</div>
					<div className="feature inactive">
						<img src={require('../assets/img/icons/x-square.svg')} alt="check" />
						Feature E
					</div>
					<div className="feature inactive">
						<img src={require('../assets/img/icons/x-square.svg')} alt="check" />
						Feature F
					</div>
					<button className="cta">Start Today</button>
				</div>
				<div className="price-column popular">
					<div className="most-popular">Most Popular</div>
					<div className="price-header">
						<div className="price">
							<div className="dollar-sign">$</div>
							20
							<div className="per-month">/mo</div>
						</div>
						<div className="plan-name">Professional</div>
					</div>
					<div className="divider" />
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature A
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature B
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature C
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature D
					</div>
					<div className="feature inactive">
						<img src={require('../assets/img/icons/x-square.svg')} alt="check" />
						Feature E
					</div>
					<div className="feature inactive">
						<img src={require('../assets/img/icons/x-square.svg')} alt="check" />
						Feature F
					</div>
					<button className="cta">Start Today</button>
				</div>
				<div className="price-column">
					<div className="price-header">
						<div className="price">
							<div className="dollar-sign">$</div>
							50
							<div className="per-month">/mo</div>
						</div>
						<div className="plan-name">Enterprise</div>
					</div>
					<div className="divider" />
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature A
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature B
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature C
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature D
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature E
					</div>
					<div className="feature">
						<img src={require('../assets/img/icons/check-circle.svg')} alt="check" />
						Feature F
					</div>
					<button className="cta">Start Today</button>
				</div>
			</section>
		</div>
	);
};

export default Landing;
