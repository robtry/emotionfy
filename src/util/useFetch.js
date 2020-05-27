import { useEffect, useState, useRef, useCallback, /*useContext*/ } from 'react';
//import { useLocation /*useHistory*/ } from 'react-router-dom';
import axios from './axios';
//import userContext from '../context/userContext';

export const useFetch = (path) => {


	//con useRef si el value cambia no causa un re-render
	const isCurrent = useRef(true);

	//data
	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ isSearching, setIsSearching ] = useState(false);
	//const [ totalPages, setTotalPages ] = useState(0);

	//location for pags
	// const location = useLocation();
	// const currentPage = new URLSearchParams(location.search).get('pag');

	const loadData = useCallback(
		() => {
			setIsLoading(true);
			setIsSearching(false);
			axios
				//.get(currentUrl + extra + (currentPage == null ? '1' : currentPage) + '/')
				.get(path)
				.then((res) => {
					console.log('axios load data: ', res.data);
					if (isCurrent.current) {
						setData(res.data);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.log('error getting', err, err.response);
					//setAuth(false)
					// if (err.response && err.response.data.message === 'auth/id-token-expired') {
					// 	setIsValidToken(false);
					// }
				});
		},
		[ path ]
	);

	const searchByName = useCallback((pathname, payload = {}) => {
		//console.log('posting: ', pathname);
		setIsSearching(true);
		setIsLoading(true);
		axios
			.post(pathname, payload)
			.then((res) => {
				//console.log(res.data);
				if (isCurrent.current) {
					setData(res.data);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				console.log('searchByName:', err);
				// if (err.response.data.error.message === 'Token expired') {
				// 	setIsValidToken(false);
				// }
			});
	}, []);

	// const getTotalPages = useCallback(
	// 	() => {
	// 		//console.log('pages: ', currentUrl.replace('s/', ''))
	// 		axios
	// 			.get(currentUrl.replace('s/', ''))
	// 			.then((res) => {
	// 				//console.log('totals', res.data[0].total);
	// 				setTotalPages(Math.ceil(res.data[0].total / 30));
	// 			})
	// 			.catch((err) => console.log(err));
	// 	},
	// 	[ currentUrl ]
	// );

	// // initial Load
	// useEffect(
	// 	() => {
	// 		if (loadOnMount) {
	// 			loadData();
	// 			if(!extra){ //hotfix
	// 				getTotalPages();
	// 			}
	// 		}
	// 	},
	// 	[ loadData, loadOnMount, getTotalPages ]
	// );

	useEffect(
		() => {
			loadData();
		},
		[ loadData ]
	);

	// to avoid set state when it is gone
	useEffect(() => {
		return () => {
			//cuando se va lo cambia
			isCurrent.current = false; //se accede con .current
		};
	}, []);

	return { data, isLoading, loadData, searchByName, isSearching /*totalPages*/ };
};
