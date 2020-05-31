import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	 baseURL: 'http://localhost:5000/'
	// baseURL: 'http://6795602f1227.ngrok.io',
	//withCredentials: true,
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
