// MasjidDetails.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasjidData from "../components/MasjidData";
// import MasjidMap from "../components/MasjidMap";
import Map from "../components/Map";

const MasjidDetails = () => {
    const { masjidId } = useParams();
    const [masjid, setMasjid] = useState({});
    const [namazTime, setNamazTime] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cancelToken, setCancelToken] = useState(null);

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

                // Update state with the fetched data
                setMasjid(response.data.masjid);
                setNamazTime(response.data.masjid.NamazTimes);
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
            <MasjidData masjid={masjid} namazTime={namazTime} loading={loading} error={error} />
                <iframe
                    src={masjid.masjidGoogleMapLink}
                    width="600"
                    height="450"
                    style={{ border: 0, width: "100%" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
        </>
    );
}

export default MasjidDetails;