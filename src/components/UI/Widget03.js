import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import emotionColors from '../../util/emotionColors';

/**
 * Este es parte del videocard
*/

const Widget03 = (props) => {
	const { children, duration, faces } = props;

	let backColor;
	switch (props.color) {
		case 'HAPPY':
			backColor = emotionColors[0];
			break;
		case 'SURPRISED':
			backColor = emotionColors[1];
			break;
		case 'ANGRY':
			backColor = emotionColors[2];
			break;
		case 'CONFUSED':
			backColor = emotionColors[3];
			break;
		case 'CALM':
			backColor = emotionColors[4];
			break;
		case 'SAD':
			backColor = emotionColors[5];
			break;
		case 'FEAR':
			backColor = emotionColors[6];
			break;
		case 'DISGUSTED':
			backColor = emotionColors[7];
			break;
		default:
			backColor = emotionColors[0];
	}

	return (
		<div className="brand-card">
			<div className="brand-card-header" style={{backgroundColor: backColor}}>
				<i className={duration ? 'fa fa-film' : 'fa fa-image'} />
				{children}
			</div>
			<div className="brand-card-body">
				<div>
					<div className="text-value">{faces}</div>
					<div className="text-uppercase text-muted small">Gestures Analyzed</div>
				</div>
				{duration && (
					<div>
						<div className="text-value">{duration}</div>
						<div className="text-uppercase text-muted small">Duration</div>
					</div>
				)}
			</div>
			<div className="text-muted card-footer">
				<NavLink to="media/5" exact>
					Go to video
				</NavLink>
			</div>
		</div>
	);
};

Widget03.propTypes = {
	children: PropTypes.node,
	faces: PropTypes.number.isRequired,
	//if this it is a video
	duration: PropTypes.string,
	color: PropTypes.string.isRequired
};

export default Widget03;
