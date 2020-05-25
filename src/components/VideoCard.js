import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
//own
import Widget from './UI/Widget03';

const socialChartOpts = {
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

const VideoCard = (props) => {
	console.log('[VideoCard.js]', props);

	const data = {
		labels: Array.from({ length: props.item.gestures.length }, (_, i) => (_ = i)),
		datasets: [
			{
				backgroundColor: 'rgba(255,255,255,.1)',
				borderColor: 'rgba(255,255,255,.55)',
				pointHoverBackgroundColor: '#fff',
				borderWidth: 2,
				data: props.item.gestures,
				label: 'Gestures in this frame'
			}
		]
	};

	return (
		<Widget duration={`${(props.item.general.duration / 60).toFixed(0)} : ${props.item.general.duration % 60}`} faces={props.item.general.gestures} color={props.item.general.emotion}>
			<div className="chart-wrapper">
				<Line data={data} options={socialChartOpts} height={90} />
			</div>
		</Widget>
	);
};

VideoCard.propTypes = {
	item: PropTypes.object.isRequired
};

export default VideoCard;
