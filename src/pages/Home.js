import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import ModalPlayer from '../components/ModalPlayer';
//owns
import VideoCard from '../components/VideoCard';
import FileUploader from '../components/FileUploader';
//import ImageCard from '../components/UI/Widget03';
import Loader from '../components/Loader';
import { useFetch } from '../util/useFetch';
//context
import userContext from '../context/userContext';

/**
 * Cuando el usuario ya inicio sesión
*/

const Home = () => {
	//const userToken = useContext(userContext).token;
	const setProject = useContext(userContext).setTotalProjects;
	const { data, isLoading /*loadData, searchByName, isSearching*/ } = useFetch('/videos/');

	useEffect(
		() => {
			setProject(data.length);
		},
		[ data, setProject ]
	);

	return (
		<div className="animated fadeIn">
			<div style={{ marginTop: '50px' }} />
			<Row className="justify-content-center">
				<span className="h1">Welcome to Emotionfy</span>
			</Row>
			<Row className="justify-content-center">
				<div>
					<ModalPlayer url={'props.url'} text='Need help?'/>
				</div>
			</Row>

			<div style={{ marginTop: '50px' }} />
			<FileUploader />

			<div style={{ marginTop: '80px' }} />
			<Row className="justify-content-center">
				<span className="h1">Your Projects</span>
			</Row>
			<div style={{ marginTop: '20px' }} />
			{isLoading ? (
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
									<VideoCard item={item} />
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
											<VideoCard item={item} isFree />
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
