import { useEffect, useState } from "react";
import axios from "axios";
const MasjidBanner = () => {
	const [image, setImage] = useState(null);
	const imgUrl = "http://localhost:8080/uploads/";
	useEffect(()=> {
		const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/banner');
        setImage(response.data.banerImage);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
	},[])
  return (
    <div className="bg-gray-200 my-5 container mx-auto">
      <img src={imgUrl+image} alt="Banner" className="object-cover w-full h-[300px]" />
    </div>
  );
};

export default MasjidBanner;