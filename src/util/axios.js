import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	//baseURL: 'http://localhost:5000/'
	baseURL: 'https://7677302b4cd0.ngrok.io/',
	//withCredentials: true,
});

export default instance;
