import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	//baseURL: 'http://localhost:5000/'
	baseURL: 'https://1cafc6ff885f.ngrok.io/',
	//withCredentials: true,
});

export default instance;
