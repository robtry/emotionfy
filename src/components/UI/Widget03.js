import React from 'react';
import PropTypes from 'prop-types';

/**
 * Este es parte del videocard
*/

const Widget03 = (props) => {
	const { children, duration, faces } = props;

	return (
		<div className="brand-card">
			<div className="brand-card-header bg-red">
				<i className={duration ? 'fa fa-film' : 'fa fa-image'} />
				{children}
			</div>
			<div className="brand-card-body">
				<div>
					<div className="text-value">{faces}</div>
					<div className="text-uppercase text-muted small">Faces</div>
				</div>
				{duration && (
					<div>
						<div className="text-value">{duration}</div>
						<div className="text-uppercase text-muted small">Duration</div>
					</div>
				)}
			</div>
			<div className="text-muted card-footer">Título del file</div>
		</div>
	);
};

Widget03.propTypes = {
	children: PropTypes.node,
	faces: PropTypes.number.isRequired,
	//if this it is a video
	duration: PropTypes.string
};

export default Widget03;
