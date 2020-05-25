import React, { useRef, useContext } from 'react';
import { Col, Progress, Row } from 'reactstrap';
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
import MainChart from '../components/Video/MainChart';
import Loader from '../components/Loader';
import DonutChart from '../components/Video/DonutChart';
import { useFetch } from '../util/useFetch';
import poster from '../assets/img/brand/sygnet.svg';

import userContext from '../context/userContext';
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

const VideoDetails = (props) => {
	//console.log('[VideoDetails.js]', props)

	const userToken = useContext(userContext).token;
	const { data, isLoading /*loadData, searchByName, isSearching*/ } = useFetch(
		`/videos/${userToken}/${props.match.params.id}`
	);

	const player = useRef();
	//player.current.actions.seek(20)

	return (
		<React.Fragment>
			{isLoading ? (
				<React.Fragment>
					<div style={{ marginTop: '80px' }} />
					<Loader />
				</React.Fragment>
			) : (
				data._id && (
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
								src="https://storage.googleapis.com/staging.emotionfy-media-277519.appspot.com/WhatsAppVideo2020-05-24at10.04.44PM.mp4"
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
						<MainChart player={player} main={data.main} />

						{/* pie chart */}
						<div style={{ marginTop: '20px' }} />
						<DonutChart data={data.counts} />

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
				)
			)}
		</React.Fragment>
	);
};

export default VideoDetails;
