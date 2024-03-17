
import { consts } from "@/util/APIEndpoints";
import axios from "axios";
import { useEffect, useState } from "react";

const MasjidBanner = () => {
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
	
  if (loading) {
    return (
      <div className="container px-4 mx-auto">
        <p>Loading...</p>
      </div>  
    )
  }

  return (
    <div className="container px-4 mx-auto">
      <div className="bg-gray-200">
        <img src={imageURL} alt="Masjid Banner IMG" className="object-cover w-full h-[300px]" />
      </div>
    </div>
  );
};

export default MasjidBanner;