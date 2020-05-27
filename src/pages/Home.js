import React, { useContext, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
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

			<div style={{ marginTop: '50px' }} />
			<FileUploader />

			<div style={{ marginTop: '80px' }} />
			<Row className="justify-content-center">
				<span className="h1">Your Projects</span>
			</Row>
			<div style={{ marginTop: '20px' }} />
			{isLoading ? (
				<Loader />
			) : data.length === 0 ? (
				<Row className="justify-content-center">
					<p>Looks like you don't have any project yet. Start uploading some video with faces there.</p>
				</Row>
			) : (
				<Row>
					{data.map((item) => (
						<Col xs={12} sm={6} md={3} key={item._id}>
							<VideoCard item={item} />
						</Col>
					))}
				</Row>
			)}
		</div>
	);
};

export default Home;
