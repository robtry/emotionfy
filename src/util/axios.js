import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	//baseURL: 'http://localhost:5000/'
	baseURL: 'https://7158229b.ngrok.io/'
	//withCredentials: false,
});

export default instance;
