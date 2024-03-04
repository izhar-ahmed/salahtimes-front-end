import { useEffect } from "react";
import CustomCTASection from "../components/CustomCTASection";
import MasjidList from "../components/MasjidList";
import MasjidBanner from "../components/MasjidBanner";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    return (
        <>
            <Helmet>
                <title>Mosque List | Salahtimes</title>
                <meta
                    name="description"
                    content="Explore a comprehensive list of mosques with Salahtimes. Discover accurate and reliable Namaz time schedules and information about our Salahtimes app, empowering communities to observe their religious practices effectively."
                />
            </Helmet>
            <MasjidBanner />
            <MasjidList />
            <CustomCTASection
                heading={
                    <h2 className="text-2xl leading-tight md:text-4xl lg:text-4xl font-bold text-white mb-0">
                        <span className="font-light">Let's</span> Explore The Mosque
                        Locations <span className="font-light">together!</span>
                    </h2>
                }
                subheading={
                    <p className="text-lg font-medium text-white">
                        Find the Right Direction for Prayer.
                    </p>
                }
                exploreLabel="Explore Mosques"
                directionsLabel="Get Directions"
            />
        </>
    );
};

export default Home;