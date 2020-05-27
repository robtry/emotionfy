import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	//baseURL: 'http://localhost:5000/'
	baseURL: 'https://eac7cfe5.ngrok.io/',
	//withCredentials: true,
});

export default instance;
