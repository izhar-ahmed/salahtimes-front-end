// useMasjidBanner.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { consts } from '@/util/APIEndpoints';

const useMasjidBanner = () => {
	const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(true);

	useEffect(()=> {
		const fetchData = async () => {
      try {
        const response = await axios.get(consts.GET_BANNER_API);
        setImageURL(consts.IMG_URL(response.data.bannerImage));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    
    fetchData();
	},[imageURL])

	return { imageURL, loading };
};

export default useMasjidBanner;
