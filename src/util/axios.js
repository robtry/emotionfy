import axios from 'axios';

const instance = axios.create({
	baseURL: "/api",
	//baseURL: 'http://localhost:5000/'
	//baseURL: 'https://58f428dfe1a6.ngrok.io',
	//withCredentials: true,
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
