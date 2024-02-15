import React, { useState } from 'react';
import axios from 'axios';

const UploadBannerForm = () => {
	const [image, setImage] = useState(null);
	const [message, setMessage] = useState('');
	const token = localStorage.getItem("token");

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('banerImage', image);

		try {
			await axios.post('http://localhost:8080/api/banner/add', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': `Bearer ${token}`,
				}
			});
			setMessage('Banner uploaded successfully');
		} catch (error) {
			console.error('Error uploading banner:', error);
			setMessage('Error uploading banner');
		}
	};

	return (
		<div className="max-w-md p-6 bg-gray-100 rounded-lg shadow-lg">
			<h2 className="text-xl font-bold mb-4">Upload Banner</h2>
			{message && <p className="mb-4 text-green-600">{message}</p>}
			<form onSubmit={handleSubmit} encType='multipart/form-data'>
				<div className="mb-4">
					<label htmlFor="banner" className="block text-gray-700">Choose Banner Image:</label>
					<input
						type="file"
						name='banerImage'
						id="banner"
						className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
						accept="image/*"
						onChange={handleImageChange}
					/>
				</div>
				<button
					type="submit"
					className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Upload
				</button>
			</form>
		</div>
	);
};

export default UploadBannerForm;
