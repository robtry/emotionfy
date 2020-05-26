import React, { useState, useRef, useEffect, useContext } from 'react';
import { FilePond } from 'react-filepond';
import { Card, CardBody, CardHeader, Col, Row, Label, CustomInput, CardFooter, Button, Progress } from 'reactstrap';
//import { AppSwitch } from '@coreui/react';
//import PropTypes from 'prop-types';
import CheckoutForm from './Payment/CheckoutForm';

//own
import Loader from './Loader';
import axios from '../util/axios';
// Import FilePond styles
import 'filepond/dist/filepond.min.css'; //https://pqina.nl/filepond/docs/patterns/frameworks/react/

//context
import userContext from '../context/userContext';

/**
 * Este es el drag and drop
*/

const price = 0.002;

const FileUploader = () => {
	const [ files, setFiles ] = useState([]);
	//const [ imgResult, setImageResult ] = useState();
	// for budget
	const [ duration, setDuration ] = useState(300); //-1
	const [ seconds, setSeconds ] = useState(1);
	const [ budget, setBudget ] = useState(0);
	/**
	 * Todas las etapas de subir un video
	 * clean | 0
	 * uploaded, //retuns duration | 1
	 * extract, | 2
	 * store, | 3 
	 * process,| 4
	 * save, | 5
	 * complete | 6
	*/
	const [ status, setStatus ] = useState(1); //0
	const [ idVideoTemp, setIdVideoTemp ] = useState('');

	useEffect(
		() => {
			setBudget((Math.floor(duration / seconds) * price).toFixed(4));
		},
		[ seconds, duration ]
	);

	const pond = useRef();

	const userToken = useContext(userContext).token;

	const processFile = (fieldName, file, metadata, load, error, progress, abort) => {
		// FormData is a Web API that creates a HTML <form> element.
		const formData = new FormData();
		/**
     * Add a key-value pair to the list.
     * 'file' is the name of the field whose data is contained.
     * The value is the file.
     * filename is reported to the server. Default filename is blob.
     */
		formData.append('video', file, file.name.replace(/\s/g, ''));
		formData.append('token', userToken);
		//console.log('fd',formData);
		//return;

		//console.log('[FileUploader.js]',file);

		// if filename does not match the required format.
		// if (!FILE_NAME_REGEX.test(file.name)) {
		// 	console.log('filename does not match!');
		// 	error('Please use filenames in the following format: NAME_FLOOR_ETC');
		// }

		// related to aborting the request
		// const CancelToken = axios.CancelToken;
		// const source = CancelToken.source();

		// the request itself
		//return;
		axios({
			//headers: getCsrfHeader().headers,
			method: 'post',
			url: '/videos',
			data: formData,
			//responseType: 'arraybuffer',
			onUploadProgress: (e) => {
				// updating progress indicator
				progress(e.lengthComputable, e.loaded, e.total);
			}
		})
			.then((response) => {
				// passing the file id to Filepond
				console.log(response);
				setIdVideoTemp(response.data.video_id);
				setDuration(response.data.duration);
				setStatus(1);
			})
			.catch((err) => {
				console.log('Error uploading', err);
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

	const acceptVideo = () => {
		console.log('Accept');
		axios
			.post('/videos/' + idVideoTemp, { token: userToken, seconds: seconds })
			.then((res) => {
				//console.log(res);
				setStatus(2);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const cancelVideo = () => {
		setDuration(-1);
		setStatus(0);
		setFiles([]);
	};

	if (status === 0) {
		return (
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
				onupdatefiles={(fileItems) => {
					// Set currently active file objects to this.state
					setFiles(fileItems.map((fileItem) => fileItem.file));
				}}
			/>
		);
	}

	if (duration > -1 && status === 1) {
		return (
			<Row>
				<Col xs="12">
					<Card>
						<CardHeader>
							<Row>
								<CheckoutForm />
							</Row>
							<Row>
								<Col xs={4}>
									Analize each <b>{seconds}</b> seconds
								</Col>
								<Col xs={4}>
									<Button block outline color="success" onClick={acceptVideo}>
										Analyze
									</Button>
								</Col>
								<Col xs={4}>
									<Button block outline color="danger" onClick={cancelVideo}>
										Cancel
									</Button>
								</Col>
							</Row>
						</CardHeader>
						<CardBody>
							<Label for="exampleCustomRange">
								Please select the rate we will use to analize your video:
							</Label>
							<CustomInput
								type="range"
								id="exampleCustomRange"
								name="customRange"
								min={1}
								max={Math.floor(duration / 3)}
								value={seconds}
								onChange={(e) => setSeconds(e.target.value)}
							/>
							{Math.floor(duration / seconds) <= 3 && (
								<b>Looking for less rate? You should try uploading images instead of videos</b>
							)}
						</CardBody>
						<CardFooter>
							<span className="h6">Frames to analyze: {Math.floor(duration / seconds)} </span>
							<br />
							<span className="h5">Total: ${budget} USD</span>
						</CardFooter>
					</Card>
				</Col>
			</Row>
		);
	}

	if (status === 1) {
		return <Loader />;
	}

	if (status >= 2) {
		return (
			<Progress multi>
				{status >= 2 && (
					<Progress
						bar
						animated={status === 2}
						striped={status > 2}
						color={status > 2 ? 'success' : 'info'}
						value="25"
					>
						{status === 2 && 'Extracting'}
					</Progress>
				)}

				{status >= 3 && (
					<Progress
						bar
						animated={status === 3}
						striped={status > 3}
						color={status > 3 ? 'success' : 'info'}
						value="25"
					>
						{status === 3 && 'Storing'}
					</Progress>
				)}

				{status >= 4 && (
					<Progress
						bar
						animated={status === 4}
						striped={status > 4}
						color={status > 4 ? 'success' : 'info'}
						value="25"
					>
						{status === 4 && 'Processing'}
					</Progress>
				)}
				{status >= 5 && (
					<Progress
						bar
						animated={status === 5}
						striped={status > 5}
						color={status > 5 ? 'success' : 'info'}
						value="25"
					>
						{status === 5 && 'Saving'}
					</Progress>
				)}
			</Progress>
		);
	}
};

/* <Row>
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
<Row>{imgResult && <img src={imgResult} alt="result" />}</Row> */

export default FileUploader;
