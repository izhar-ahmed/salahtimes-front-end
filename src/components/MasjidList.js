import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    // <div className="max-w-md mx-auto mt-8 p-4">
    //   <h2 className="text-center text-2xl font-bold mb-4">Masjid List</h2>
    //   <ul className="list-none">
    //     {masjids.map((masjid) => (
    //       <li key={masjid.masjidId} className="mb-2">
    //         <Link
    //           to={`masjid/${masjid.masjidId}`}
    //           className="block p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
    //         >
    //           {masjid.masjidName}
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="container w-[80%] mx-auto">
    <h2 className="text-center text-2xl font-bold mb-4">Masjid List</h2>
    <ul className="list-none grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {masjids.map((masjid) => (
          <li key={masjid.masjidId} className="mb-2">
            <Link
              to={`masjid/${masjid.masjidId}`}
              className="block p-4 bg-green-700 text-white rounded-md transition duration-300"
            >
              {masjid.masjidName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MasjidList;
