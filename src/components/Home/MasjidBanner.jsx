import useMasjidBanner from "../../hooks/Home/useMasjidBanner";

const MasjidBanner = () => {
	const { bannerIMG, loading } = useMasjidBanner()
	
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
        <img src={bannerIMG} alt="Masjid Banner IMG" className="object-cover w-full h-[300px]" />
      </div>
    </div>
  );
};

export default MasjidBanner;