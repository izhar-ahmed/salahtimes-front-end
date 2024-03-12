import CustomCTASection from "../components/CustomCTASection";
import Header2 from "../components/common/Header2";
import { Helmet } from "react-helmet-async";
import Header from "../components/About/Header";
import SubHeader from "../components/About/SubHeader";
import "./Common.css";
import PageContent from "../components/About/PageContent";
import CTAHeading from "../components/Home/CTAHeading";
import CTASubHeading from "../components/Home/CTASubHeading";

const About = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>About Us | Salahtimes</title>
      </Helmet>

      {/* Hero Section */}
      <section id="about-hero-section" className="mb-6">
        <Header2
          heading=<Header />
          subHeading=<SubHeader />
        />
      </section>

        {/* Content */}
        <section id="about-content-section" className="mb-6">
          <PageContent />
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

export default About;
