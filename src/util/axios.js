import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	baseURL: 'https://28d7ede5.ngrok.io/'
	//withCredentials: false,
});

export default instance;
