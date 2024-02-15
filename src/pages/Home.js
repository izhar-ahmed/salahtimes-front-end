import CustomCTASection from "../components/CustomCTASection";
import MasjidList from "../components/MasjidList";
import MasjidBanner from "../components/admin/MasjidBanner";

const Home = () => {
    return (
        <>
            <MasjidBanner />
            <MasjidList />
            <CustomCTASection
                heading={
                    <h2 className="text-4xl leading-tight md:text-4xl lg:text-4xl font-bold text-white mb-0">
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