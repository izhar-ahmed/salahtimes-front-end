import axios from "axios";
import { useEffect, useState } from "react";

const MasjidInfo = ({ masjidId }) => {
  const [masjid, setMasjid] = useState({});
  const [namazTime, setNamazTime] = useState([]);
  const imgUrl = "http://localhost:8080/uploads/";

  // Function to check if azaanTime is upcoming
  const isUpcomingAzaan = (azaanTime) => {
    const today = new Date();
    const formattedDate = `${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${today
      .getDate()
      .toString()
      .padStart(2, "0")}/${today.getFullYear()}`;
    const azaanDateTime = new Date(`${formattedDate} ${azaanTime}`);
    return azaanDateTime > new Date();
  };

  useEffect(() => {
    const masjidApi = `http://localhost:8080/api/masjid/${masjidId}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(masjidApi);
        let masjidData = response.data.masjid;

        // Update NamazTimes with selected property using for loop
        const updatedNamazTimes = [];
        let stopChecking = false;
        for (const namazTime of masjidData.NamazTimes) {
          if (!stopChecking) {
            const isUpcoming = isUpcomingAzaan(namazTime.azaanTime);
            updatedNamazTimes.push({
              ...namazTime,
              selected: isUpcoming,
            });

            // Break the loop when isUpcoming is true
            if (isUpcoming) {
              stopChecking = true;
            }
          } else {
            updatedNamazTimes.push({
              ...namazTime,
              selected: false,
            });
          }
        }
        setMasjid(response.data.masjid);
        setNamazTime(updatedNamazTimes);
      } catch (error) {
        console.log("error while getting masjid", error);
      }
    };

    fetchData();
  }, [masjidId]);

  return (
    <>
      <div className="container mx-auto">
        <div className="flex">
          <div className="w-1/4">
            <img
              src={imgUrl + masjid.masjidPhoto}
              alt={masjid.masjidName}
              className="mb-4 w-full h-40 object-cover rounded-md"
            />
          </div>
          <div className="w-1/8 ml-3">
            <h2 className="text-gray-600 mb-1">
              <strong>Name:</strong> {masjid.masjidName}
            </h2>
            <p className="text-gray-600 mb-1">
              <strong>Area:</strong> {masjid.masjidArea}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Address:</strong> {masjid.masjidAddress}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Google Embed Link:</strong>{" "}
              <div className="break-all">{masjid.masjidGoogleMapLink}</div>
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        {namazTime.length === 0 ? (
          <h1 className="text-center text-3xl">
            Add Namaz Time Table For This Masjid
          </h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {namazTime.map((nt) => (
              <div
                key={nt.id}
                className={
                  nt.selected
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 p-4 rounded-md shadow-md border border-white-300 text-white selected"
                    : "bg-white p-4 rounded-md shadow-md border border-gray-300"
                }
              >
                {nt.selected ? <p>Upcoming Prayer</p> : ""}
                <h3 className="text-lg font-semibold mb-2">{nt.namazName}</h3>
                <p>Azaan: {nt.azaanTime}</p>
                <p>Jamaat: {nt.jamaatTime}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MasjidInfo;
