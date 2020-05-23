import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardFooter, CardTitle, Col, Progress, Row } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import {
	Player,
	LoadingSpinner,
	ControlBar,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	videoActions
} from 'video-react'; // https://video-react.js.org/components/player/
// own
import WidgetChart from '../components/Video/WidgetChart';

const brandPrimary = getStyle('--primary');
const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandWarning = getStyle('--warning');
const brandDanger = getStyle('--danger');

// Card Chart 1
const cardChartData1 = {
	labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: brandPrimary,
			borderColor: 'rgba(255,255,255,.55)',
			data: [ 65, 59, 84, 84, 51, 55, 40 ]
		}
	]
};

// Card Chart 2
const cardChartData2 = {
	labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: brandInfo,
			borderColor: 'rgba(255,255,255,.55)',
			data: [ 1, 18, 9, 17, 34, 22, 11 ]
		}
	]
};

// Card Chart 3
const cardChartData3 = {
	labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,255,255,.2)',
			borderColor: 'rgba(255,255,255,.55)',
			data: [ 78, 81, 80, 45, 34, 12, 40 ]
		}
	]
};

// Card Chart 4
const cardChartData4 = {
	labels: [ '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '' ],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,255,255,.3)',
			borderColor: 'transparent',
			data: [ 78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98 ]
		}
	]
};

// Social Box Chart
const socialBoxData = [
	{ data: [ 65, 59, 84, 84, 51, 55, 40 ], label: 'facebook' },
	{ data: [ 1, 13, 9, 17, 34, 41, 38 ], label: 'twitter' },
	{ data: [ 78, 81, 80, 45, 34, 12, 40 ], label: 'linkedin' },
	{ data: [ 35, 23, 56, 22, 97, 23, 64 ], label: 'google' }
];

const socialChartOpts = {
	tooltips: {
		enabled: false,
		custom: CustomTooltips
	},
	responsive: true,
	maintainAspectRatio: false,
	legend: {
		display: false
	},
	scales: {
		xAxes: [
			{
				display: false
			}
		],
		yAxes: [
			{
				display: false
			}
		]
	},
	elements: {
		point: {
			radius: 0,
			hitRadius: 10,
			hoverRadius: 4,
			hoverBorderWidth: 3
		}
	}
};

// sparkline charts
const sparkLineChartData = [
	{
		data: [ 35, 23, 56, 22, 97, 23, 64 ],
		label: 'New Clients'
	},
	{
		data: [ 65, 59, 84, 84, 51, 55, 40 ],
		label: 'Recurring Clients'
	},
	{
		data: [ 35, 23, 56, 22, 97, 23, 64 ],
		label: 'Pageviews'
	},
	{
		data: [ 65, 59, 84, 84, 51, 55, 40 ],
		label: 'Organic'
	},
	{
		data: [ 78, 81, 80, 45, 34, 12, 40 ],
		label: 'CTR'
	},
	{
		data: [ 1, 13, 9, 17, 34, 41, 38 ],
		label: 'Bounce Rate'
	}
];

const makeSparkLineData = (dataSetNo, variant) => {
	const dataset = sparkLineChartData[dataSetNo];
	const data = {
		labels: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
		datasets: [
			{
				backgroundColor: 'transparent',
				borderColor: variant ? variant : '#c2cfd6',
				data: dataset.data,
				label: dataset.label
			}
		]
	};
	return () => data;
};

const sparklineChartOpts = {
	tooltips: {
		enabled: false,
		custom: CustomTooltips
	},
	responsive: true,
	maintainAspectRatio: true,
	scales: {
		xAxes: [
			{
				display: false
			}
		],
		yAxes: [
			{
				display: false
			}
		]
	},
	elements: {
		line: {
			borderWidth: 2
		},
		point: {
			radius: 0,
			hitRadius: 10,
			hoverRadius: 4,
			hoverBorderWidth: 3
		}
	},
	legend: {
		display: false
	}
};

// Main Chart

//Random Numbers
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
	data1.push(random(50, 200));
	data2.push(random(80, 100));
	data3.push(65);
}

const mainChart = {
	labels: [
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa',
		'Su',
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa',
		'Su',
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa',
		'Su',
		'Mo',
		'Tu',
		'We',
		'Th',
		'Fr',
		'Sa',
		'Su'
	],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(0,0,0,0.1)', //hexToRgba(brandInfo, 10),
			borderColor: brandInfo,
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data1
		},
		{
			label: 'My Second dataset',
			backgroundColor: 'transparent',
			borderColor: brandSuccess,
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data2
		},
		{
			label: 'My Third dataset',
			backgroundColor: 'transparent',
			borderColor: brandDanger,
			pointHoverBackgroundColor: '#fff',
			borderWidth: 1,
			borderDash: [ 8, 5 ],
			data: data3
		}
	]
};

const mainChartOpts = {
	tooltips: {
		enabled: false,
		custom: CustomTooltips,
		intersect: true,
		mode: 'index',
		position: 'nearest',
		callbacks: {
			labelColor: function(tooltipItem, chart) {
				return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
			}
		}
	},
	maintainAspectRatio: false,
	legend: {
		display: false
	},
	scales: {
		xAxes: [
			{
				gridLines: {
					drawOnChartArea: false
				}
			}
		],
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
					maxTicksLimit: 5,
					stepSize: Math.ceil(250 / 5),
					max: 250
				}
			}
		]
	},
	elements: {
		point: {
			radius: 0,
			hitRadius: 10,
			hoverRadius: 4,
			hoverBorderWidth: 3
		}
	}
};

const VideoDetails = () => {
	const player = useRef();
	//player.current.actions.seek(20)

	return (
		<div className="animated fadeIn">
			<div style={{ marginTop: '40px' }} />
			<Row className="justify-content-center">
				<span className="h1">Your video analisys</span>
			</Row>

			<div style={{ marginTop: '30px' }} />
			<Row>
				<Col xs="12" sm="6" lg="3">
					<WidgetChart type="dotted" data={cardChartData2} title="Eyeglasses" />
				</Col>

				<Col xs="12" sm="6" lg="3">
					<WidgetChart type="dotted-curve" data={cardChartData1} title="Sunglasses" />
				</Col>

				<Col xs="12" sm="6" lg="3">
					<WidgetChart type="continue" data={cardChartData3} title="Smile" />
				</Col>

				<Col xs="12" sm="6" lg="3">
					<WidgetChart type="bars" data={cardChartData4} title="Beard" />
				</Col>
			</Row>

			<Row>
				<Player
					ref={(ref) => (player.current = ref)}
					fluid
					muted
					playsInline
					//poster="/assets/poster.png"
					src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
				>
					<LoadingSpinner />
					<ControlBar>
						<CurrentTimeDisplay order={4.1} />
						<TimeDivider order={4.2} />
						<PlaybackRateMenuButton rates={[ , 2, 1, 0.5, 0.1 ]} order={7.1} />
					</ControlBar>
				</Player>
			</Row>

			<div style={{ marginTop: '40px' }} />
			<Row>
				<Col>
					<Card>
						<CardBody>
							<Row>
								<Col sm="5">
									<CardTitle className="mb-0">Traffic</CardTitle>
									<div className="small text-muted">November 2015</div>
								</Col>
								<Col sm="7" className="d-none d-sm-inline-block">
									{/* <Button color="primary" className="float-right">
										<i className="icon-cloud-download" />
									</Button> */}
									{/* <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
										<ButtonGroup className="mr-3" aria-label="First group">
											<Button
												color="outline-secondary"
												onClick={() => this.onRadioBtnClick(1)}
												active={this.state.radioSelected === 1}
											>
												Day
											</Button>
											<Button
												color="outline-secondary"
												onClick={() => this.onRadioBtnClick(2)}
												active={this.state.radioSelected === 2}
											>
												Month
											</Button>
											<Button
												color="outline-secondary"
												onClick={() => this.onRadioBtnClick(3)}
												active={this.state.radioSelected === 3}
											>
												Year
											</Button>
										</ButtonGroup>
									</ButtonToolbar> */}
								</Col>
							</Row>
							<div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
								<Line data={mainChart} options={mainChartOpts} height={300} />
							</div>
						</CardBody>
						<CardFooter>
							<Row className="text-center">
								<Col sm={12} md className="mb-sm-2 mb-0">
									<div className="text-muted">Visits</div>
									<strong>29.703 Users (40%)</strong>
									<Progress className="progress-xs mt-2" color="success" value="40" />
								</Col>
								<Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
									<div className="text-muted">Unique</div>
									<strong>24.093 Users (20%)</strong>
									<Progress className="progress-xs mt-2" color="info" value="20" />
								</Col>
								<Col sm={12} md className="mb-sm-2 mb-0">
									<div className="text-muted">Pageviews</div>
									<strong>78.706 Views (60%)</strong>
									<Progress className="progress-xs mt-2" color="warning" value="60" />
								</Col>
								<Col sm={12} md className="mb-sm-2 mb-0">
									<div className="text-muted">New Users</div>
									<strong>22.123 Users (80%)</strong>
									<Progress className="progress-xs mt-2" color="danger" value="80" />
								</Col>
								<Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
									<div className="text-muted">Bounce Rate</div>
									<strong>Average Rate (40.15%)</strong>
									<Progress className="progress-xs mt-2" color="primary" value="40" />
								</Col>
							</Row>
						</CardFooter>
					</Card>
				</Col>
			</Row>

			{/* genders */}
			<div className="progress-group">
				<div className="progress-group-header">
					<i className="icon-user progress-group-icon" />
					<span className="title">Male</span>
					<span className="ml-auto font-weight-bold">43%</span>
				</div>
				<div className="progress-group-bars">
					<Progress className="progress-xs" color="warning" value="43" />
				</div>
			</div>
			<div className="progress-group mb-5">
				<div className="progress-group-header">
					<i className="icon-user-female progress-group-icon" />
					<span className="title">Female</span>
					<span className="ml-auto font-weight-bold">37%</span>
				</div>
				<div className="progress-group-bars">
					<Progress className="progress-xs" color="warning" value="37" />
				</div>
			</div>
		</div>
	);
};

export default VideoDetails;
