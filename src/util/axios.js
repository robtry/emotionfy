import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	//baseURL: 'http://localhost:5000/'
	baseURL: 'https://8eb8c995.ngrok.io/'
	//withCredentials: false,
});

export default instance;
