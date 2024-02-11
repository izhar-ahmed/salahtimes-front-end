// useMosqueGallery.js
import axios from 'axios';
import { useState, useEffect } from 'react';

const useMosqueGallery = () => {
	const [mosques, setMosques] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulating fetching data from an API
		// Replace this with your actual API call
		const fetchMosques = async () => {
			try {
				// For now, let's use sample data
				const response = await axios.get("http://localhost:8080/api/public/masjid")
				setMosques(response.data.masjidWithNamazIds)
				setLoading(false);
			} catch (error) {
				console.error('Error fetching mosque data:', error);
				setLoading(false);
			}
		};

		fetchMosques();
	}, []);

	return { mosques, loading };
};

export default useMosqueGallery;
