// useMasjidBanner.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import { consts } from '../../util/APIEndpoints';

const useMasjidBanner = () => {
	const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(true);

	useEffect(()=> {
		const fetchData = async () => {
      try {
        const response = await axios.get(consts.GET_BANNER_API);
				const bannerIMG = consts.IMG_URL(response.data.bannerImage)
        setImageURL(bannerIMG);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
	},[])

	return { imageURL, loading };
};

export default useMasjidBanner;
