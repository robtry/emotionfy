import axios from 'axios';

const instance = axios.create({
	baseURL: "/api",
	// baseURL: 'http://localhost:5000/'
	//baseURL: 'https://fd950198f253.ngrok.io/',
	//withCredentials: true,
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
