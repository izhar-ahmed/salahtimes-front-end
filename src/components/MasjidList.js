import React, { useState } from "react";
import { Link } from "react-router-dom";
import useMosqueGallery from './useMosqueGallery';
import '../pages/Common.css'

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
      <h2 className="text-3xl font-bold text-gray-800 mb-8 uppercase">Explore Local Masjids</h2>

      {/* Search Bar */}
      <div className="mb-4 w-[30%]">
        {/* <label className="block text-lg mb-1" htmlFor="search">Search By Area</label>
        <input
          type="text"
          placeholder="Search By Area"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-[30%] border rounded"
          id="search"
        /> */}

        <form>
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only light:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 light:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white" placeholder="Search By Area"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>


      {/* Masjid List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
        {paginatedMosques.map((mosque) => (
          <div
            key={mosque.masjidId}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={imgUrl + mosque.masjidPhoto}
              alt={mosque.masjidName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 relative h-[150px]">
              <Link to={`masjid/${mosque.masjidId}`} className="text-xl font-semibold text-gray-800 item-link">{mosque.masjidName}</Link>
                <span className="px-3 py-1 bg-neutral-200 text-xs rounded-3xl ml-2">{mosque.masjidArea}</span>
              <p className="text-gray-600 mb-4 text-sm">{mosque.masjidAddress}</p>
              <div className="w-full">
                <Link to={`masjid/${mosque.masjidId}`} className="group btn bg-primary-light-950 dark:bg-primary-dark-950 rounded-full px-4 py-1.5 text-sm text-white dark:text-white inline">
                  View Details
                </Link>

                {/* <div className="px-3 py-1 bg-neutral-200 dark:bg-neutral-dark-200 rounded-3xl border border-neutral-200 dark:border-neutral-dark-300 inline"> */}
                  {/* <span className="text-neutral-900 dark:text-neutral-dark-950 text-xs font-medium leading-none"></span> */}
                {/* </div> */}
              </div>
            </div>
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
              className={`mx-2 py-2 px-4 ${page === currentPage ? 'bg-indigo-600 text-white' : 'bg-gray-200'
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
