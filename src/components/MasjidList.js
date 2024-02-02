import React from "react";
import { Link } from "react-router-dom";
import useMosqueGallery from './useMosqueGallery';

const MasjidList = () => {
  const { mosques, loading } = useMosqueGallery();
  const imgUrl = 'http://localhost:8080/uploads/';
 if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container w-[80%] mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4">Masjid List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
      {mosques.map((mosque) => (
        <div key={mosque.id} className="relative overflow-hidden">
          <img
            src={imgUrl + mosque.masjidPhoto}
            alt={mosque.masjidName}
            className="object-cover w-full h-48 sm:h-64 cursor-pointer"
          />
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition duration-300"></div>
          <Link to={`masjid/${mosque.masjidId}`} className="absolute inset-0 flex items-center justify-center flex-col">
            <p className="text-white font-bold text-3xl">{mosque.masjidName}</p>
            <p className="text-white text-xl">{mosque.masjidArea}</p>
          </Link>
        </div>
      ))}
    </div>

    </div>
  )


};

export default MasjidList;
