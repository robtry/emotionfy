import axios from 'axios';

const instance = axios.create({
	//baseURL: "/api",
	baseURL: 'https://8eb7a34f.ngrok.io/'
	//withCredentials: false,
});

export default instance;
