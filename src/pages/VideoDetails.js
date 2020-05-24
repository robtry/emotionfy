import React, { useRef, useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Card, CardBody, CardFooter, Col, Progress, Row } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {
	Player,
	LoadingSpinner,
	ControlBar,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton
} from 'video-react'; // https://video-react.js.org/components/player/
// own
import WidgetChart from '../components/Video/WidgetChart';
import ProgressTag from '../components/Video/ProgressTag';
import { AppSwitch } from '@coreui/react';
import poster from '../assets/img/brand/sygnet.svg';

const emotionColors = [
	'rgba(241, 196, 15, 0.9)', //amarillo | happy
	'rgba(243, 156, 18,1.0)', // naranja | suprised
	'rgba(192, 57, 43,1.0)', //rojo | angry
	'rgba(46, 204, 113,1.0)', //verde claro | confused
	'rgba(127, 140, 141,1.0)', //gris | calm
	'rgba(52, 152, 219,1.0)', //azul | sad
	'rgba(155, 89, 182,1.0)', //morado | fear
	'rgba(22, 160, 133,1.0)' //verde | disguted
];
// Card Chart 1
const cardChartData1 = {
	labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,255,255,.2)',
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
			backgroundColor: 'rgba(255,255,255,.2)',
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

const emotionsChart = {
	labels: [ 'HAPPY', 'SURPRISED', 'ANGRY', 'CONFUSED', 'CALM', 'SAD', 'FEAR', 'DISGUSTED' ],
	datasets: [
		{
			backgroundColor: emotionColors,
			borderColor: 'rgba(255,255,255,.2)',
			data: [ 20, 20, 20, 20, 20, 20, 20, 28 ]
		}
	]
};

//Random Numbers
function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const elements = 27;
const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];
const data5 = [];
const data6 = [];
const data7 = [];
const data8 = [];

for (var i = 0; i <= elements; i++) {
	data1.push(random(50, 100));
	data2.push(random(1, 90));
	data3.push(random(65, 69));
	data4.push(random(1, 10));
	data5.push(random(0, 5));
	data6.push(random(1, 100));
	data7.push(random(4, 20));
	data8.push(random(70, 80));
}

const mainChartOutside = {
	labels: [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18',
		'19',
		'20',
		'21',
		'22',
		'23',
		'24',
		'25',
		'26',
		'27'
	],
	datasets: [
		{
			label: 'Happy',
			backgroundColor: emotionColors[0], //hexToRgba(brandInfo, 10),
			borderColor: emotionColors[0],
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data1
		},
		{
			label: 'Surprised',
			backgroundColor: 'transparent',
			borderColor: emotionColors[1],
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data2
		},
		{
			label: 'Angry',
			backgroundColor: 'transparent',
			borderColor: emotionColors[2],
			pointHoverBackgroundColor: '#fff',
			borderWidth: 1,
			borderDash: [ 8, 5 ],
			data: data3
		},
		{
			label: 'Confused',
			backgroundColor: 'transparent',
			borderColor: emotionColors[3],
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data4
		},
		{
			label: 'Calm',
			backgroundColor: 'transparent',
			borderColor: emotionColors[4],
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data5
		},
		{
			label: 'Sad',
			backgroundColor: 'transparent',
			borderColor: emotionColors[5],
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data6
		},
		{
			label: 'Fear',
			backgroundColor: 'transparent',
			borderColor: emotionColors[6],
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data7
		},
		{
			label: 'Disgusted',
			backgroundColor: 'transparent',
			borderColor: emotionColors[7],
			pointHoverBackgroundColor: '#fff',
			borderWidth: 2,
			data: data8
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
					stepSize: Math.ceil(100 / 5)
					//max: 100
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
	const [ mainChart, setMainChart ] = useState(mainChartOutside);

	const player = useRef();
	//player.current.actions.seek(20)

	const [ showHappy, setShowHappy ] = useState(true);
	const [ showSurprised, setShowSurprised ] = useState(true);
	const [ showAngry, setShowAngry ] = useState(true);
	const [ showConfused, setShowConfused ] = useState(true);
	const [ showCalm, setShowCalm ] = useState(true);
	const [ showSad, setShowSad ] = useState(true);
	const [ showFear, setShowFear ] = useState(true);
	const [ showDisgusted, setShowDisgusted ] = useState(true);

	useEffect(
		() => {
			if (!showHappy) {
				console.log('bye a happy');
				setMainChart({
					labels: [
						'0',
						'1',
						'2',
						'3',
						'4',
						'5',
						'6',
						'7',
						'8',
						'9',
						'10',
						'11',
						'12',
						'13',
						'14',
						'15',
						'16',
						'17',
						'18',
						'19',
						'20',
						'21',
						'22',
						'23',
						'24',
						'25',
						'26',
						'27'
					],
					datasets: [
						{
							label: 'Surprised',
							backgroundColor: 'transparent',
							borderColor: emotionColors[1],
							pointHoverBackgroundColor: '#fff',
							borderWidth: 2,
							data: data2
						},
						{
							label: 'Angry',
							backgroundColor: 'transparent',
							borderColor: emotionColors[2],
							pointHoverBackgroundColor: '#fff',
							borderWidth: 1,
							borderDash: [ 8, 5 ],
							data: data3
						},
						{
							label: 'Confused',
							backgroundColor: 'transparent',
							borderColor: emotionColors[3],
							pointHoverBackgroundColor: '#fff',
							borderWidth: 2,
							data: data4
						},
						{
							label: 'Calm',
							backgroundColor: 'transparent',
							borderColor: emotionColors[4],
							pointHoverBackgroundColor: '#fff',
							borderWidth: 2,
							data: data5
						},
						{
							label: 'Sad',
							backgroundColor: 'transparent',
							borderColor: emotionColors[5],
							pointHoverBackgroundColor: '#fff',
							borderWidth: 2,
							data: data6
						},
						{
							label: 'Fear',
							backgroundColor: 'transparent',
							borderColor: emotionColors[6],
							pointHoverBackgroundColor: '#fff',
							borderWidth: 2,
							data: data7
						},
						{
							label: 'Disgusted',
							backgroundColor: 'transparent',
							borderColor: emotionColors[7],
							pointHoverBackgroundColor: '#fff',
							borderWidth: 2,
							data: data8
						}
					]
				});
			} else {
				console.log('dam again happy');
				setMainChart(mainChartOutside);
			}
		},
		[ showHappy ]
	);

	return (
		<div className="animated fadeIn">
			<div style={{ marginTop: '40px' }} />
			<Row className="justify-content-center">
				<span className="h1">Your video analisys</span>
			</Row>

			{/* general charts */}
			<div style={{ marginTop: '30px' }} />
			<Row>
				<Col xs="12" sm="6" lg="3">
					<WidgetChart type="dotted-curve" data={cardChartData1} title="Sunglasses" />
				</Col>
				<Col xs="12" sm="6" lg="3">
					<WidgetChart type="dotted" data={cardChartData2} title="Eyeglasses" />
				</Col>
				<Col xs="12" sm="6" lg="3">
					<WidgetChart type="continue" data={cardChartData3} title="Smile" />
				</Col>

				<Col xs="12" sm="6" lg="3">
					<WidgetChart type="bars" data={cardChartData4} title="Beard" />
				</Col>
			</Row>

			{/* ages */}
			<div className="progress-group mb-5">
				<div className="progress-group-header">
					<i className="icon-arrow-down progress-group-icon" />
					<span className="title">Min Age</span>
					<span className="ml-auto font-weight-bold">12</span>
				</div>
				<div className="progress-group-bars">
					<Progress className="progress-xs" color="dark" value="12" />
				</div>
			</div>
			<div className="progress-group">
				<div className="progress-group-header">
					<i className="icon-arrow-up progress-group-icon" />
					<span className="title">Max Age</span>
					<span className="ml-auto font-weight-bold">43</span>
				</div>
				<div className="progress-group-bars">
					<Progress className="progress-xs" color="dark" value="43" />
				</div>
			</div>

			{/* video player */}
			<div style={{ marginTop: '40px' }} />
			<Row className="justify-content-center">
				<Player
					ref={(ref) => (player.current = ref)}
					height={400}
					fluid={false} //to disable full height
					muted
					playsInline
					poster={poster}
					src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
				>
					<LoadingSpinner />
					<ControlBar>
						<CurrentTimeDisplay order={4.1} />
						<TimeDivider order={4.2} />
						<PlaybackRateMenuButton rates={[ 2, 1, 0.5, 0.1 ]} order={7.1} />
					</ControlBar>
				</Player>
			</Row>

			{/* main chart */}
			<div style={{ marginTop: '40px' }} />
			<Row>
				<Col>
					<Card>
						<CardBody>
							<div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
								<Line
									redraw
									data={mainChart}
									options={mainChartOpts}
									height={300}
									getElementAtEvent={(e) => {
										//console.log(e[0]._index); // index
										if (e[0] && e[0]._index) {
											player.current.actions.seek(e[0]._index);
											player.current.actions.pause();
										}
									}}
								/>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>

			{/* controls for main chart */}
			<CardFooter>
				<Row className="text-center">
					<Col sm={12} md className="mb-sm-2 mb-0">
						<AppSwitch
							className={'mx-1'}
							variant={'pill'}
							color={'dark'}
							outline={'alt'}
							label
							checked={showHappy}
							onChange={() => setShowHappy((prev) => !prev)}
						/>
						<br />
						<ProgressTag title="Happy" background={emotionColors[0]} value={100} />
					</Col>
					<Col sm={12} md className="mb-sm-2 mb-0">
						<AppSwitch
							className={'mx-1'}
							variant={'pill'}
							color={'dark'}
							outline={'alt'}
							label
							checked={showSurprised}
							onChange={() => setShowSurprised((prev) => !prev)}
						/>
						<br />
						<ProgressTag title="Surprised" background={emotionColors[1]} value={100} />
					</Col>
					<Col sm={12} md className="mb-sm-2 mb-0">
						<AppSwitch
							className={'mx-1'}
							variant={'pill'}
							color={'dark'}
							outline={'alt'}
							label
							checked={showAngry}
							onChange={() => setShowAngry((prev) => !prev)}
						/>
						<br />
						<ProgressTag title="Angry" background={emotionColors[2]} value={100} />
					</Col>
					<Col sm={12} md className="mb-sm-2 mb-0">
						<AppSwitch
							className={'mx-1'}
							variant={'pill'}
							color={'dark'}
							outline={'alt'}
							label
							checked={showConfused}
							onChange={() => setShowConfused((prev) => !prev)}
						/>
						<br />
						<ProgressTag title="Confused" background={emotionColors[3]} value={100} />
					</Col>
					<Col sm={12} md className="mb-sm-2 mb-0">
						<AppSwitch
							className={'mx-1'}
							variant={'pill'}
							color={'dark'}
							outline={'alt'}
							label
							checked={showCalm}
							onChange={() => setShowCalm((prev) => !prev)}
						/>
						<br />
						<ProgressTag title="Calm" background={emotionColors[4]} value={100} />
					</Col>
					<Col sm={12} md className="mb-sm-2 mb-0">
						<AppSwitch
							className={'mx-1'}
							variant={'pill'}
							color={'dark'}
							outline={'alt'}
							label
							checked={showSad}
							onChange={() => setShowSad((prev) => !prev)}
						/>
						<br />
						<ProgressTag title="Sad" background={emotionColors[5]} value={100} />
					</Col>
					<Col sm={12} md className="mb-sm-2 mb-0">
						<AppSwitch
							className={'mx-1'}
							variant={'pill'}
							color={'dark'}
							outline={'alt'}
							label
							checked={showFear}
							onChange={() => setShowFear((prev) => !prev)}
						/>
						<br />
						<ProgressTag title="Fear" background={emotionColors[6]} value={100} />
					</Col>
					<Col sm={12} md className="mb-sm-2 mb-0">
						<AppSwitch
							className={'mx-1'}
							variant={'pill'}
							color={'dark'}
							outline={'alt'}
							label
							checked={showDisgusted}
							onChange={() => setShowDisgusted((prev) => !prev)}
						/>
						<br />
						<ProgressTag title="Disgusted" background={emotionColors[7]} value={100} />
					</Col>
				</Row>
			</CardFooter>

			{/* pie chart */}
			<div style={{ marginTop: '20px' }} />
			<Doughnut data={emotionsChart} legend={{ display: false }} />

			{/* genders */}
			<div className="progress-group mb-5">
				<div className="progress-group-header">
					<i className="icon-user-female progress-group-icon" />
					<span className="title">Female</span>
					<span className="ml-auto font-weight-bold">37%</span>
				</div>
				<div className="progress-group-bars">
					<Progress className="progress-xs" color="dark" value="37" />
				</div>
			</div>
			<div className="progress-group">
				<div className="progress-group-header">
					<i className="icon-user progress-group-icon" />
					<span className="title">Male</span>
					<span className="ml-auto font-weight-bold">43%</span>
				</div>
				<div className="progress-group-bars">
					<Progress className="progress-xs" color="dark" value="43" />
				</div>
			</div>
		</div>
	);
};

export default VideoDetails;
