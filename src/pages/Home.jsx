import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import CustomCTASection from "../components/CustomCTASection";
import MasjidList from "../components/Home/MasjidList";
import MasjidBanner from "../components/Home/MasjidBanner";
import CTAHeading from "./../components/Home/CTAHeading";
import CTASubHeading from "./../components/Home/CTASubHeading";
import HeroSection from "../components/Home/HeroSection";


const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <>
            {/* SEO Section */}
            <Helmet>
                <title>Home | Salahtimes</title>
            </Helmet>

            {/* Hero Section */}
            <section id="home-hero-section" className="mb-6">
                <HeroSection />
            </section>

            {/* Banner */}
            <section id="home-banner-section" className="mb-6">
                <MasjidBanner />
            </section>

            {/* Mosque List */}
            <section id="home-mosque-list-section" className="mb-6">
                <MasjidList />
            </section>

            {/* CTA Section */}
            <section id="home-cta-section">
                <CustomCTASection
                    heading=<CTAHeading />
                    subheading=<CTASubHeading />
                    exploreLabel="Explore Mosques"
                    directionsLabel="Get Directions"
                />
            </section>
        </>
    );
};

export default Home;