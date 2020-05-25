import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardFooter, Col, Row } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { AppSwitch } from '@coreui/react';
//own
import ProgressTag from './ProgressTag';
import emotionColors from '../../util/emotionColors';

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



const MainChart = (props) => {
	//console.log('Mainchart.js', props.main);
	const happy = {
		label: 'Happy',
		//backgroundColor: emotionColors[0],
		backgroundColor: 'transparent',
		borderColor: emotionColors[0],
		pointHoverBackgroundColor: '#fff',
		borderWidth: 3,
		data: []
	};
	const surprised = {
		label: 'Surprised',
		backgroundColor: 'transparent',
		borderColor: emotionColors[1],
		pointHoverBackgroundColor: '#fff',
		borderWidth: 3,
		data: []
	};
	const angry = {
		label: 'Angry',
		backgroundColor: 'transparent',
		borderColor: emotionColors[2],
		pointHoverBackgroundColor: '#fff',
		borderWidth: 3,
		//borderDash: [ 8, 5 ],
		data: []
	};
	const confused = {
		label: 'Confused',
		backgroundColor: 'transparent',
		borderColor: emotionColors[3],
		pointHoverBackgroundColor: '#fff',
		borderWidth: 3,
		data: []
	};
	const calm = {
		label: 'Calm',
		backgroundColor: 'transparent',
		borderColor: emotionColors[4],
		pointHoverBackgroundColor: '#fff',
		borderWidth: 3,
		data: []
	};
	const sad = {
		label: 'Sad',
		backgroundColor: 'transparent',
		borderColor: emotionColors[5],
		pointHoverBackgroundColor: '#fff',
		borderWidth: 3,
		data: []
	};
	const fear = {
		label: 'Fear',
		backgroundColor: 'transparent',
		borderColor: emotionColors[6],
		pointHoverBackgroundColor: '#fff',
		borderWidth: 3,
		data: []
	};
	const disgusted = {
		label: 'Disgusted',
		backgroundColor: 'transparent',
		borderColor: emotionColors[7],
		pointHoverBackgroundColor: '#fff',
		borderWidth: 3,
		data: []
	};

	useEffect(
		() => {
			console.log('llenadnolos')
			let i;
			for (i = 0; i < props.main.length; i++) {
				happy.data.push(props.main[i].happy);
				surprised.data.push(props.main[i].surprised);
				angry.data.push(props.main[i].angry);
				confused.data.push(props.main[i].confused);
				calm.data.push(props.main[i].calm);
				sad.data.push(props.main[i].sad);
				fear.data.push(props.main[i].fear);
				disgusted.data.push(props.main[i].disgusted);
			}
		},
		[ props.main ]
	);

	//console.log(happy, surprised, angry, confused, calm, sad, fear, disgusted)

	const [ mainChart, setMainChart ] = useState({
		labels: Array.from({ length: props.main.length }, (_, i) => (_ = i)),
		datasets: [ happy, surprised, angry, confused, calm, sad, fear, disgusted ]
	});

	//controls
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
				setMainChart(prev => {
					const copy = prev.datasets.filter(ds => ds.label !== 'Happy')
					console.log('the copy', copy)
					return {
						...prev,
						datasets: copy
					}
				})
			} else {
				console.log('dam again happy');
				///setMainChart(mainChartOutside);
			}
		},
		[ showHappy ]
	);

	console.log(mainChart)

	return (
		<React.Fragment>
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
											props.player.current.actions.seek(e[0]._index);
											props.player.current.actions.pause();
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
		</React.Fragment>
	);
};

MainChart.propTypes = {
	player: PropTypes.any.isRequired,
	main: PropTypes.array.isRequired
};

export default MainChart;
