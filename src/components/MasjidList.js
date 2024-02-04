import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMosqueGallery from './useMosqueGallery';

const MasjidList = () => {
  const { mosques, loading } = useMosqueGallery();
  const imgUrl = 'http://localhost:8080/uploads/';
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of items per page

  const filteredMosques = mosques.filter(mosque =>
    mosque.masjidArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMosques.length / pageSize);
  const paginatedMosques = filteredMosques.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container w-[80%] mx-auto">
      <h2 className="text-center text-2xl font-bold mb-4">Masjid List</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search By Area"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full border rounded"
        />
      </div>

      {/* Masjid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {paginatedMosques.map((mosque) => (
          <div key={mosque.masjidId} className="relative overflow-hidden">
            {/* ... (your existing code for displaying mosque details) */}
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

      {/* Pagination */}
      <div className="flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`mx-2 py-2 px-4 ${
                page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MasjidList;
