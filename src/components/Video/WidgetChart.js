import React from 'react';
import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';

const WidgetChart = (props) => {
	return (
		<Card className="text-white bg-info">
			<CardBody className="pb-0">
			<div className="text-value">Members online</div>
			</CardBody>
			<div className="chart-wrapper mx-3" style={{ height: '70px' }}>
				<Line data={cardChartData2} options={cardChartOpts2} height={70} />
			</div>
		</Card>
	);
};

WidgetChart.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.any.isRequired,
	type: PropTypes.oneOf(['dotted', 'continue', 'bars']).isRequired
}

export default WidgetChart;
