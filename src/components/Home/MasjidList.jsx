import { useState } from "react";
import { Link } from "react-router-dom";
import useMosqueGallery from "../../hooks/Home/useMosqueGallery";
import "./../../pages/Common.css";
import { imgUrl } from "./../../util/util";

const MasjidList = () => {
  const { mosques, loading } = useMosqueGallery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page

  const filteredMosques = mosques.filter((mosque) =>
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
    return (
      <div className="container mx-auto mb-20">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto mb-20">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 lg:mb-8 uppercase">
        Explore Local Masjids
      </h2>

      {/* Search Bar */}
      <div className="mb-4 lg:w-[30%]">
        <form>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only light:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 light:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white"
              placeholder="Search By Area"
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
            className="card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 relative"
          >
            <img
              src={imgUrl + mosque.masjidPhoto}
              alt={mosque.masjidName}
              className="w-full h-48 object-cover"
            />
            <div className="px-4 pt-4 h-[160px]">
              <Link
                to={`masjid/${mosque.masjidId}`}
                className="text-xl font-semibold text-gray-800 item-link inline-block mb-2"
              >
                {mosque.masjidName}
              </Link>

              <p className="text-gray-600 mb-4 text-sm">
                {mosque.masjidAddress}
              </p>
              <div className="card-footer w-full">
                <Link
                  to={`masjid/${mosque.slug}`}
                  className="group btn bg-primary-light-950 rounded-md px-4 py-1.5 text-sm text-white block w-[120px] text-center absolute bottom-4 left-4"
                >
                  View Details
                </Link>
                <span className="px-3 py-1 bg-neutral-600 text-white text-xs rounded-3xl inline-block text-center absolute top-4 right-4">
                  {mosque.masjidArea}
                </span>
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
              className={`mx-2 py-2 px-4 rounded-full ${
                page === currentPage
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
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
