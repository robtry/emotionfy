import React, { useRef, useContext } from 'react';
import { Progress, Row } from 'reactstrap';
import {
	Player,
	LoadingSpinner,
	ControlBar,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton
} from 'video-react'; // https://video-react.js.org/components/player/
// own
import MainChart from '../components/Video/MainChart';
import Loader from '../components/Loader';
import DonutChart from '../components/Video/DonutChart';
import { useFetch } from '../util/useFetch';
import poster from '../assets/img/brand/sygnet.svg';

import userContext from '../context/userContext';
import LittleCharts from '../components/Video/LittleCharts';

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
							<span className="h1">{data.name}</span>
						</Row>

						{/* general charts */}
						<div style={{ marginTop: '30px' }} />
						<LittleCharts
							beards={data.beards}
							sunglasses={data.sunglasses}
							eyeglasses={data.eyeglasses}
							smiles={data.smiles}
						/>

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
								src={data.link}
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
								<span className="ml-auto font-weight-bold">{(data.females * 100).toFixed(0)}%</span>
							</div>
							<div className="progress-group-bars">
								<Progress
									className="progress-xs"
									color="dark"
									value={(data.females * 100).toFixed(0)}
								/>
							</div>
						</div>
						<div className="progress-group">
							<div className="progress-group-header">
								<i className="icon-user progress-group-icon" />
								<span className="title">Male</span>
								<span className="ml-auto font-weight-bold">{(data.males * 100).toFixed(0)}%</span>
							</div>
							<div className="progress-group-bars">
								<Progress className="progress-xs" color="dark" value={(data.males * 100).toFixed(0)} />
							</div>
						</div>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default VideoDetails;
