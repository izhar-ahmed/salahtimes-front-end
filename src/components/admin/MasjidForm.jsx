import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { consts } from '@/util/APIEndpoints';
import { getLocalStorageItem } from '@/util/common';

const MasjidForm = () => {
  const [masjidName, setMasjidName] = useState('');
  const [masjidArea, setMasjidArea] = useState('');
  const [masjidAddress, setMasjidAddress] = useState('');
  const [masjidImage, setMasjidImage] = useState('');
  const [masjidMapLink, setMasjidMapLink] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // Handle image file change
    const file = e.target.files[0];
    setMasjidImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getLocalStorageItem('token');
    console.log(token);
    // Validate the input (you can add more complex validation if needed)

    // Create a new FormData object to handle file upload
    const formData = new FormData();
    formData.append('masjidName', masjidName);
    formData.append('masjidArea', masjidArea);
    formData.append('masjidAddress', masjidAddress);
    formData.append('masjidPhoto', masjidImage);
    formData.append('masjidGoogleMapLink', masjidMapLink);

    // Pass the FormData object to the parent component
    try {
      const response = await axios.post(consts.CREATE_MASJID_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Masjid form submitted successfully");
        navigate('/m-admin/masjid');
      } else {
        console.log("Error while submitting masjid form");
      }

      // Clear the form fields after submission
      setMasjidName('');
      setMasjidArea('');
      setMasjidAddress('');
      setMasjidImage(null); // Reset the file input
      setMasjidMapLink('');
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="flex flex-col">
      <div style={{fontWeight: "400"}} className='evaFvq'>Add Masjid</div>
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Masjid Name:</label>
            <input
              type="text"
              name='masjidName'
              className="mt-1 p-2 w-full border rounded"
              value={masjidName}
              onChange={(e) => setMasjidName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Masjid Area:</label>
            <input
              type="text"
              name='masjidArea'
              className="mt-1 p-2 w-full border rounded"
              value={masjidArea}
              onChange={(e) => setMasjidArea(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Masjid Address:</label>
            <input
              type="text"
              name='masjidAddress'
              className="mt-1 p-2 w-full border rounded"
              value={masjidAddress}
              onChange={(e) => setMasjidAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Masjid Image:</label>
            <input
              type="file"
              name='masjidPhoto'
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Masjid Google Map Link:</label>
            <input
              type="text"
              name='masjidGoogleMapLink'
              className="mt-1 p-2 w-full border rounded"
              value={masjidMapLink}
              onChange={(e) => setMasjidMapLink(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Masjid
          </button>
        </form>
      </div>
    </div>
  );
};

export default MasjidForm;