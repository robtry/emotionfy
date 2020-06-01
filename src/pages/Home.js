import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import socketClient from 'socket.io-client';
//owns
import ModalPlayer from '../components/ModalPlayer';
import VideoCard from '../components/VideoCard';
import FileUploader from '../components/FileUploader';
import StatusBar from '../components/Video/StatusBar';
//import ImageCard from '../components/UI/Widget03';
import Loader from '../components/Loader';
import { useFetch } from '../util/useFetch';
//context
import userContext from '../context/userContext';

const SOCKETPORT = process.env.REACT_APP_SOCKET_PORT;

/**
 * Cuando el usuario ya inicio sesión
*/

const Home = () => {
	//const userToken = useContext(userContext).token;
	const { setTotalProjects, uid } = useContext(userContext);
	const { data, isLoading, loadData, isError, simpleDelete /*searchByName, isSearching*/ } = useFetch('/videos/');

	useEffect(
		() => {
			if (data.payed && data.free) {
				setTotalProjects(data.payed.length + data.free.length);
			}
		},
		[ data, setTotalProjects ]
	);

	const [ processingVideo, setProcessingVideos ] = useState([]);
	useEffect(
		() => {
			console.log('creating soket');
			const socket = socketClient(SOCKETPORT);
			socket.on('connect', _ => {
				socket.emit('join', uid);
			});
			socket.on('status', (data) => {
				const userInfo = JSON.parse(data);
				if (userInfo.user === uid) {
					console.log('for me', userInfo);
					if (userInfo.status === 'complete') {
						setProcessingVideos([]);
						loadData();
					} else {
						setProcessingVideos([ userInfo ]);
					}
				}
			});
		},
		[ setProcessingVideos, uid, loadData ]
	);

	return (
		<div className="animated fadeIn">
			<div style={{ marginTop: '50px' }} />
			<Row className="justify-content-center">
				<span className="h1">Welcome to Emotionfy</span>
			</Row>
			<Row className="justify-content-center">
				<div>
					<ModalPlayer url={'props.url'} text="Need help?" />
				</div>
			</Row>

			<div style={{ marginTop: '50px' }} />

			{processingVideo.length > 0 ? (
				processingVideo.map((item, index) => <StatusBar refresh={loadData} queue={item} key={index} />)
			) : (
				!isLoading && (
					<FileUploader
						//refresh={loadData}
						pending={data.pending && data.pending.length >= 1 ? data.pending[0] : {}}
					/>
				)
			)}

			<div style={{ marginTop: '80px' }} />
			{!isError && (
				<Row className="justify-content-center">
					<span className="h1">Your Projects</span>
				</Row>
			)}
			<div style={{ marginTop: '20px' }} />
			{isError ? (
				<Row className="justify-content-center">
					<p>Something went wrong while getting your projects, please try again</p>
				</Row>
			) : isLoading ? (
				<Loader />
			) : data.payed && data.payed.length === 0 && (data.free && data.free.length === 0) ? (
				<Row className="justify-content-center">
					<p>Looks like you don't have any project yet. Start uploading some video with faces there.</p>
				</Row>
			) : (
				<React.Fragment>
					<Row>
						{data.payed &&
							data.payed.map((item) => (
								<Col xs={12} sm={6} md={3} key={item._id}>
									<VideoCard item={item} refresh={loadData} simpleDelete={simpleDelete} />
								</Col>
							))}
					</Row>
					{data.free &&
					data.free.length > 0 && (
						<React.Fragment>
							<Row className="justify-content-center">
								<span className="h3">Your Free Projects</span>
							</Row>
							<div style={{ marginTop: '20px' }} />
							<Row>
								{data.free &&
									data.free.map((item) => (
										<Col xs={12} sm={6} md={3} key={item._id}>
											<VideoCard
												item={item}
												isFree
												refresh={loadData}
												simpleDelete={simpleDelete}
											/>
										</Col>
									))}
							</Row>
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default Home;
