import React from 'react';
import { Line } from 'react-chartjs-2';
//own
import Widget from './UI/Widget03';

const VideoCard = () => {
	const data = {
		labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
		datasets: [
			{
				backgroundColor: 'rgba(255,255,255,.1)',
				borderColor: 'rgba(255,255,255,.55)',
				pointHoverBackgroundColor: '#fff',
				borderWidth: 2,

				data: [ 65, 59, 84, 84, 51, 55, 40 ],
				label: 'minute'
			}
		]
	};

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

	return (
		<Widget duration={'3:14'} faces={150}>
			<div className="chart-wrapper">
				<Line data={data} options={socialChartOpts} height={90} />
			</div>
		</Widget>
	);
};

export default VideoCard;
