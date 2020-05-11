import React, { useState, useRef } from 'react';
import { FilePond } from 'react-filepond';
import { Row, Button, Col } from 'reactstrap';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

//https://pqina.nl/filepond/docs/patterns/frameworks/react/
import axios from '../util/axios';

const Home = () => {
	const [ files, setFiles ] = useState(
		[
			// {
			// 	source: 'index.html',
			// 	options: {
			// 		type: 'local'
			// 	}
			// }
		]
	);
	const [ imgResult, setImageResult ] = useState();
	const pond = useRef();
	const handleInit = () => {
		console.log('FilePond instance has initialised', pond);
	};

	//console.log('FilePond ', files[0]);
	// const upload = () => {
	// 	console.log({ image: files[0].name })
	// 	axios
	// 		.post('/imagen/clasificar', { image: files[0].name })
	// 		.then((res) => {
	// 			console.log(res);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	const processFile = (fieldName, file, metadata, load, error, progress, abort) => {
		// FormData is a Web API that creates a HTML <form> element.
		const formData = new FormData();
		/**
     * Add a key-value pair to the list.
     * 'file' is the name of the field whose data is contained.
     * The value is the file.
     * filename is reported to the server. Default filename is blob.
     */
		formData.append('image', file, file.name);

		// if filename does not match the required format.
		// if (!FILE_NAME_REGEX.test(file.name)) {
		// 	console.log('filename does not match!');
		// 	error('Please use filenames in the following format: NAME_FLOOR_ETC');
		// }

		// related to aborting the request
		// const CancelToken = axios.CancelToken;
		// const source = CancelToken.source();

		// the request itself
		axios({
			//headers: getCsrfHeader().headers,
			method: 'post',
			url: 'imagen/clasificar',
			data: formData,
			responseType: 'arraybuffer',
			onUploadProgress: (e) => {
				// updating progress indicator
				progress(e.lengthComputable, e.loaded, e.total);
			}
		})
			.then((response) => {
				// passing the file id to Filepond
				//load(response.data.data.id);
				console.log(response);
				const base64 = btoa(
					new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
				);
				setImageResult('data:;base64,' + base64);
			})
			.catch((err) => {
				console.log(err);
			});

		// Should expose an abort method so the request can be cancelled
		return {
			// this function is called if the user has tapped the cancel button.
			abort: () => {
				console.log('aborting');
				//source.cancel('Operation cancelled by the user.');
			}
		};
	};

	return (
		<div className="animated fadeIn">
			<div style={{ marginTop: '50px' }} />
			<Row className="justify-content-center">
				<span className="h3">Welcome to Emotionfy</span>
			</Row>
			<Row className="justify-content-center">
				<p>Start uploading some image with faces there</p>
			</Row>
			<div style={{ marginTop: '50px' }} />

			<FilePond
				ref={(ref) => (pond.current = ref)}
				files={files}
				allowMultiple={false}
				maxFiles={1}
				server={{
					process: (fieldName, file, metadata, load, error, progress, abort) => {
						processFile(fieldName, file, metadata, load, error, progress, abort);
					}
				}}
				oninit={() => handleInit}
				onupdatefiles={(fileItems) => {
					// Set currently active file objects to this.state
					setFiles(fileItems.map((fileItem) => fileItem.file));
				}}
			/>

			<Row>
				{imgResult && (
					<Col className="text-right">
					<Button
						color="success"
						onClick={() => {
							setImageResult();
							setFiles([]);
						}}
						>
						Clean
					</Button>
						</Col>
				)}
			</Row>
			<Row>{imgResult && <img src={imgResult} alt="result" />}</Row>
		</div>
	);
};

export default Home;
