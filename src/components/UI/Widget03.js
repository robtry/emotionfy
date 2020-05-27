import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import emotionColors from '../../util/emotionColors';
import ModalPlayer from '../ModalPlayer';
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
			backColor = 'rgba(34, 32, 0, 1.0)';
	}

	return (
		<div className="brand-card">
			<div className="brand-card-header" style={{ backgroundColor: backColor }}>
				<i className={duration ? 'fa fa-film' : 'fa fa-image'} />
				{children}
			</div>
			<div className="brand-card-body">
				{!props.isFree && (
					<div>
						<div className="text-value">{faces}</div>
						<div className="text-uppercase text-muted small">Gestures Analyzed</div>
					</div>
				)}
				{duration && (
					<div>
						<div className="text-value">{duration}</div>
						<div className="text-uppercase text-muted small">Duration</div>
					</div>
				)}
			</div>
			<Row className="justify-content-center">
				<p>{props.name}</p>
			</Row>
			<div className="text-muted card-footer">
				<div className="brand-card-body">
					<div>
						<NavLink to={`/media/${props.id}`} exact>
							Analysis
						</NavLink>
					</div>
					<div>
						<ModalPlayer url={props.url} />
					</div>
				</div>
			</div>
		</div>
	);
};

Widget03.propTypes = {
	children: PropTypes.node,
	faces: PropTypes.number.isRequired,

	//if this it is a video
	duration: PropTypes.string,

	color: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	isFree: PropTypes.bool
};

export default Widget03;
