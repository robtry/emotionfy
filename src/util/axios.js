import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	baseURL: 'http://localhost:5000/'
	//baseURL: 'https://c8fbf2bdff89.ngrok.io/',
	//withCredentials: true,
});

export default instance;
