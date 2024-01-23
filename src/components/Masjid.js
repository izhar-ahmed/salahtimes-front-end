import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Masjid = () => {
  const { id } = useParams();
  const [masjids, setMasjids] = useState([]);
  useEffect(() => {
    const masjidById = `http://localhost:8080/api/masjid/${id}`;
    axios
      .get(masjidById)
      .then((response) => {
        setMasjids(response.data);
      })
      .catch((error) => {
        console.error("Error fetching masjid by id:", error);
      });
  }, []);

  return (
    <div className="container mx-auto">
        <div className="flex flex-wrap">
        <div className="lg:w-1/2"></div>
<div className="max-w-md lg:w-1/2 mt-8 p-4">
      {masjids.length === 0 ? (
        <div className="text-center">
      <h1 className="text-4xl font-bold">Add namaz time table for this masjid</h1>
    </div>
      ) : (
        masjids.map((masjid) => (
          <div key={masjid.id} className="mb-8">
            <h2 className="text-2xl text-center font-bold mb-4">{masjid.masjidName}</h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Prayer</th>
                  <th className="py-2 px-4 border-b">Azaan Time</th>
                  <th className="py-2 px-4 border-b">Jamaat Time</th>
                </tr>
              </thead>
              <tbody>
                {['Fajar', 'Zohar', 'Asar', 'Magrib', 'Isha', 'Juma'].map((prayer) => (
                  <tr key={prayer}>
                    <td className="py-2 px-4 border-b">{prayer}</td>
                    <td className="py-2 px-4 border-b">{masjid[`${prayer.toLowerCase()}Azaan`]} {prayer === "Fajar" ? "AM" : "PM"}</td>
                    <td className="py-2 px-4 border-b">{masjid[`${prayer.toLowerCase()}Jamaat`]} {prayer === "Fajar" ? "AM" : "PM"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
    </div>
    </div>
  );
};

export default Masjid;
