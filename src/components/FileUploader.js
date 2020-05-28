import React, { useState, useRef, useEffect } from 'react';
import { FilePond } from 'react-filepond';
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Label,
	CustomInput,
	CardFooter,
	Button,
	Progress,
	Nav,
	NavItem,
	Badge,
	NavLink,
	TabContent
} from 'reactstrap';
//import { AppSwitch } from '@coreui/react';
//import PropTypes from 'prop-types';
import CheckoutForm from './Payment/CheckoutForm';

//own
import Loader from './Loader';
import axios from '../util/axios';
// Import FilePond styles
import 'filepond/dist/filepond.min.css'; //https://pqina.nl/filepond/docs/patterns/frameworks/react/

/**
 * Este es el drag and drop
*/

// const formatPrice = ({ amount, currency, quantity }) => {
// 	const numberFormat = new Intl.NumberFormat('en-US', {
// 		style: 'currency',
// 		currency,
// 		currencyDisplay: 'symbol'
// 	});
// 	const parts = numberFormat.formatToParts(amount);
// 	let zeroDecimalCurrency = true;
// 	for (let part of parts) {
// 		if (part.type === 'decimal') {
// 			zeroDecimalCurrency = false;
// 		}
// 	}
// 	amount = zeroDecimalCurrency ? amount : amount / 100;
// 	const total = quantity * amount;
// 	return numberFormat.format(total);
// };

const FileUploader = () => {
	const [ files, setFiles ] = useState([]);
	//const [ imgResult, setImageResult ] = useState();
	// for budget
	const [ duration, setDuration ] = useState(-1); //-1
	const [ seconds, setSeconds ] = useState(1);
	const [ budget, setBudget ] = useState('$0');
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
	const [ status, setStatus ] = useState(0); //0
	const [ idVideoTemp, setIdVideoTemp ] = useState('');

	useEffect(
		() => {
			setBudget((Math.floor(duration / seconds) * process.env.REACT_APP_BASE_PRICE).toFixed(2));
			// setBudget(
			// 	formatPrice({
			// 		amount: process.env.REACT_APP_BASE_PRICE,
			// 		currency: process.env.REACT_APP_CURRENCY,
			// 		quantity: Math.floor(duration / seconds)
			// 	})
			// );
		},
		[ seconds, duration ]
	);

	const pond = useRef();

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
			.post('/videos/' + idVideoTemp, { seconds: seconds })
			.then((res) => {
				console.log(res);
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

	const [ tab, setTab ] = useState(1);

	if (status === 0) {
		return (
			<React.Fragment>
				<Nav tabs>
					<NavItem>
						<NavLink
							active={tab === 1}
							onClick={() => {
								setTab(1);
							}}
						>
							<i className="icon-social-youtube" />
							<span className={tab === 1 ? '' : 'd-none'}> Video </span>
							{'\u00A0'}
							<Badge color="success">Premium</Badge>
						</NavLink>
					</NavItem>
					{/* <NavItem>
						<NavLink
							active={tab === 2}
							onClick={() => {
								setTab(2)
							}}
						>
							<i className="icon-picture" />
							<span className={tab === 2 ? '' : 'd-none'}> Image Premium</span>
							<Badge color="success">Premium</Badge>
						</NavLink>
					</NavItem> */}
					<NavItem>
						<NavLink
							active={tab === 3}
							onClick={() => {
								setTab(3);
							}}
						>
							<i className="icon-camrecorder" />
							<span className={tab === 3 ? '' : 'd-none'}> Video</span>
							{'\u00A0'}
							<Badge color="primary">Free</Badge>
						</NavLink>
					</NavItem>
					{/* <NavItem>
						<NavLink
							active={tab === 4}
							onClick={() => {
								setTab(4)
							}}
						>
							<i className="icon-picture" />
							<span className={tab === 4 ? '' : 'd-none'}> Image</span>
							<Badge color="primary">Free</Badge>
						</NavLink>
					</NavItem> */}
				</Nav>
				<TabContent activeTab={tab}>
					<br />
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
				</TabContent>
			</React.Fragment>
		);
	}

	if (duration > -1 && status === 1) {
		return (
			<Row>
				<Col xs="12">
					<Card>
						<CardHeader>
							<Row>
								<Col xs={4}>
									<span className="h6">Frames to analyze: {Math.floor(duration / seconds)} </span>
								</Col>
								<Col xs={4}>
									{tab === 1 || tab === 2 ? (
										<CheckoutForm
											price={budget}
											images={Math.floor(duration / seconds)}
											video={idVideoTemp}
										/>
									) : tab === 3 || tab === 4 ? (
										<Button block outline color="success" onClick={acceptVideo}>
											Analyze
										</Button>
									) : (
										<p> What are you doing? </p>
									)}
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
								max={Math.floor(duration / 4) - 1}
								value={Math.floor(duration / 4) - seconds}
								onChange={(e) => setSeconds(Math.floor(duration / 4) - +e.target.value)}
							/>
							{Math.floor(duration / seconds) <= 4 && (
								<b>Looking for less rate? You should try uploading images instead of videos</b>
							)}
						</CardBody>
						<CardFooter>
							Analize each <b>{seconds}</b> seconds
							<br />
							<span className="h5">Total: {budget} USD</span>
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
