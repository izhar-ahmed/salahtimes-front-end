import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import masjidImage from '../img/masjid5.jpg'

const MasjidList = () => {
  const [masjids, setMasjids] = useState([]);

  useEffect(() => {
    const getAllMasjid = "http://localhost:8080/api/masjid";

    axios
      .get(getAllMasjid)
      .then((response) => {
        setMasjids(response.data);
      })
      .catch((error) => {
        console.error("Error fetching masjids:", error);
      });
  }, []);

  return (
    <div className="container w-[80%] mx-auto">
    <h2 className="text-center text-2xl font-bold mb-4">Masjid List</h2>
    <ul className="list-none grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {masjids.map((masjid) => (
          <li key={masjid.masjidId} className="mb-2">
            <Link
              to={`masjid/${masjid.masjidId}`}
            >
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg" src={masjidImage} alt="" />
              {masjid.masjidName}
              <div className="p-5">
        
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{masjid.masjidName}</h5>
        
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{masjid.masjidAddress}</p>
        <Link  to={`masjid/${masjid.masjidId}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Go to time table
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Link>
      </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
   
  
};

export default MasjidList;
