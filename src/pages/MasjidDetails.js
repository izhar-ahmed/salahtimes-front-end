import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasjidData from "../components/MasjidData";
import Header from "../components/Header";
import CustomCTASection from "../components/CustomCTASection";
import { Helmet } from "react-helmet-async";

const MasjidDetails = () => {
    const { masjidSlug } = useParams();
    const [masjid, setMasjid] = useState({});
    const [namazTime, setNamazTime] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cancelToken, setCancelToken] = useState(null);

    const isUpcomingAzaan = (azaanTime) => {
        const today = new Date();
        const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        const azaanDateTime = new Date(`${formattedDate} ${azaanTime}`);
        return azaanDateTime > new Date();
    };

    const GetUpdatedNamazTime = (namazTimeData) => {
        const updatedNamazTimes = [];
        let stopChecking = false;

        const today = new Date();
        const dayOfWeek = today.getDay();

        for (const namazTime of namazTimeData) {
            if (!stopChecking) {
                const isUpcoming = isUpcomingAzaan(namazTime.azaanTime);
                updatedNamazTimes.push({
                    ...namazTime,
                    selected: isUpcoming,
                });

                if (isUpcoming) {
                    stopChecking = true;
                }
            } else {
                updatedNamazTimes.push({
                    ...namazTime,
                    selected: false
                })
            }
        }

        if (dayOfWeek === 5) {
            const updatedNamazTimesWithSelection = updatedNamazTimes.map(namaz => {
                if (namaz.namazName === 'JUMA') {
                    return { ...namaz, selected: true };
                } else if (namaz.namazName === 'ZOHAR') {
                    return { ...namaz, selected: false };
                } else {
                    return namaz;
                }
            });
            return updatedNamazTimesWithSelection
        } else {
            return updatedNamazTimes
        }
    }
    
    const fetchData = async (masjidSlug, token) => {
        const MASJID_API_URL = `http://localhost:8080/api/public/masjid/masjid-by-slug/${masjidSlug}`;
        try {
            setLoading(true);
            const response = await axios.get(MASJID_API_URL, {
                cancelToken: token
            });
            const masjidData = response.data.masjid;
            const updatedNamazTimes = GetUpdatedNamazTime(masjidData.NamazTimes);
            setMasjid(response.data.masjid);
            setNamazTime(updatedNamazTimes);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (cancelToken) {
            cancelToken.cancel('Operation canceled by the user.');
        }
        const newCancelToken = axios.CancelToken.source();
        setCancelToken(newCancelToken);

        fetchData(masjidSlug, newCancelToken.token);

        return () => {
            if (newCancelToken) {
                newCancelToken.cancel('Component unmounted.');
            }
        };
    }, [masjidSlug]);

    return (
        <>
            <Helmet>
                <title>{masjid.masjidName ? `${masjid.masjidName} | Salahtimes` : 'Salahtimes'}</title>
                <meta
                    name="description"
                    content={masjid.masjidName ? `Explore detailed information about ${masjid.masjidName} including its address, prayer timings, and facilities. Discover accurate and reliable Namaz time schedules and directions to the mosque. Salahtimes empowers communities to observe their religious practices effectively.` : `Explore detailed information about masjid including its address, prayer timings, and facilities. Discover accurate and reliable Namaz time schedules and directions to the mosque. Salahtimes empowers communities to observe their religious practices effectively.`}
                />
            </Helmet>

            <Header
                heading={<h1 className="text-4xl leading-tight md:text-4xl lg:text-5xl font-bold text-grey mb-0"><span className="font-light">Explore</span> <span className='uppercase'>{masjid.masjidName}</span> <span className="font-light">Details</span></h1>}
                subHeading={`ADDRESS: ${masjid.masjidAddress}`}
            />

            <MasjidData
                masjid={masjid}
                namazTime={namazTime}
                loading={loading}
                error={error}
            />

            <CustomCTASection
                heading={<h2 className="text-4xl leading-tight md:text-4xl lg:text-4xl font-bold text-white mb-0"><span className="font-light">Let's Explore</span> The Mosque Locations <span className="font-light">together!</span></h2>}
                subheading={<p className="text-lg font-medium text-white">Find the Right Direction for Prayer.</p>}
                exploreLabel="Explore Mosques"
                directionsLabel="Get Directions"
            />
            {masjid.masjidGoogleMapLink && (
                <iframe
                    src={masjid.masjidGoogleMapLink}
                    width="600"
                    height="450"
                    title={`${masjid.masjidName} Map`}
                    style={{ border: 0, width: "100%", height: "450px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            )}
        </>
    );
}

export default MasjidDetails;
