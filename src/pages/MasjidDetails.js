// MasjidDetails.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasjidData from "../components/MasjidData";
import Header from "../components/Header";
import CustomCTASection from "../components/CustomCTASection";

const MasjidDetails = () => {
    const { masjidId } = useParams();
    const [masjid, setMasjid] = useState({});
    const [namazTime, setNamazTime] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cancelToken, setCancelToken] = useState(null);
    // console.log("masjidId: "+ masjidId)

    // Function to check if azaanTime is upcoming
    const isUpcomingAzaan = (azaanTime) => {
        const today = new Date();
        const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}/${today.getFullYear()}`;
        const azaanDateTime = new Date(`${formattedDate} ${azaanTime}`);
        return azaanDateTime > new Date();
    };

    useEffect(() => {
        const MASJID_API_URL = `http://localhost:8080/api/masjid/${masjidId}`;

        if (cancelToken) {
            cancelToken.cancel('Operation canceled by the user.');
        }
        const newCancelToken = axios.CancelToken.source();
        setCancelToken(newCancelToken);

        // Define an asynchronous function to fetch data
        const fetchData = async () => {
            try {
                // Set loading to true while fetching
                setLoading(true);

                // Make an asynchronous request
                const response = await axios.get(MASJID_API_URL, {
                    cancelToken: newCancelToken.token
                });

                let masjidData = response.data.masjid
                // Update NamazTimes with selected property using for loop
                const updatedNamazTimes = [];
                let stopChecking = false;
                for (const namazTime of masjidData.NamazTimes) {
                    if (!stopChecking) {
                        // Select Friday JUMA namaz
                        const today = new Date();
                        const dayOfWeek = today.getDay();
                        if (dayOfWeek === 5) {
                            const isUpcoming = isUpcomingAzaan(namazTime.azaanTime);
                            if (namazTime.namazName === 'ZOHAR' && isUpcoming) {
                                const jumaNamazTime = masjidData.NamazTimes.find((namazTime) => namazTime.namazName === "JUMA");
                                updatedNamazTimes.push({
                                    ...jumaNamazTime,
                                    selected: true,
                                });
                            }

                            // Break the loop when isUpcoming is true
                            if (isUpcoming) {
                                stopChecking = true;
                            }
                        } else {
                            // Select Other Namaz
                            const isUpcoming = isUpcomingAzaan(namazTime.azaanTime);
                            updatedNamazTimes.push({
                                ...namazTime,
                                selected: isUpcoming,
                            });

                            // Break the loop when isUpcoming is true
                            if (isUpcoming) {
                                stopChecking = true;
                            }
                        }

                    } else {
                        updatedNamazTimes.push({
                            ...namazTime,
                            selected: false
                        })
                    }
                }

                setMasjid(response.data.masjid);
                setNamazTime(updatedNamazTimes);
            } catch (error) {
                // Handle errors
                setError(error.message);
            } finally {
                // Set loading to false regardless of success or failure
                setLoading(false);
            }
        };

        // Call the async function
        fetchData();

        return () => {
            if (newCancelToken) {
                newCancelToken.cancel('Component unmounted.');
            }
        };
    }, [masjidId]);

    return (
        <>
            <Header
                heading={`Explore ${masjid.masjidName} Details`}
                subHeading={`ADDRESS: ${masjid.masjidAddress}`}
            />

            <MasjidData
                masjid={masjid}
                namazTime={namazTime}
                loading={loading}
                error={error}
            />

            <CustomCTASection
                heading={`Explore Mosque Locations`}
                subheading={`Find the Right Direction for Prayer`}
                exploreLabel="Explore Mosques"
                directionsLabel="Get Directions"
            />
            <iframe
                src={masjid.masjidGoogleMapLink}
                width="600"
                height="450"
                style={{ border: 0, width: "100%", marginBottom: '30px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </>
    );
}

export default MasjidDetails;