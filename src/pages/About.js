import React from "react";
import "./Common.css";
import masjidImage from "../img/mosque_1280.jpg";
import CustomCTASection from "../components/CustomCTASection";
import Header2 from "../components/Header2";
import { Helmet } from "react-helmet-async";
const About = () => {
  return (
    <>
      <Helmet>
        <title>Salahtimes About | Empowering Communities with Accurate Namaz Timings</title>
        <meta
          name="description"
          content="Discover Salahtimes, your trusted source for accurate and reliable Namaz time schedules. Empowering communities to observe their religious practices effectively."
        />
      </Helmet>
      <section className="">
        <Header2
          heading={
            <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-6xl font-semibold text-gray-700 mb-2">
              Our <span className="font-light">Mission</span>
            </h2>
          }
          subHeading={<p className="mt-6 text-lg font-bold text-neutral-700">Discover our commitment to empowering communities with accurate Namaz time schedulez</p>}
        />
        <div className="container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
              <section className="mb-2">
                <h2 className="text-xl lg:text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
                  <span className="font-light">Our</span> Mission
                </h2>
                <p className="lg:text-lg leading-relaxed">
                  At Salahtimes, our mission is to empower communities with
                  accurate and reliable Namaz time schedules. We believe that
                  access to precise prayer timings is essential for individuals to
                  observe their religious practices effectively.
                </p>
              </section>
              <section className="mb-2">
                <h2 className="text-xl lg:text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
                  <span className="font-light">Our</span> Vision
                </h2>
                <p className="lg:text-lg leading-relaxed">
                  Our vision is to create a seamless experience for users seeking
                  to stay connected to their spiritual practice. By providing
                  timely updates and convenient access to prayer schedules, we aim
                  to facilitate a deeper connection to faith and community.
                </p>
              </section>
              <section className="mb-2">
                <h2 className="text-xl lg:text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
                  <span className="font-light">Our</span> Commitment
                </h2>
                <p className="lg:text-lg leading-relaxed">
                  We are committed to delivering excellence in service and
                  reliability. Our team is dedicated to maintaining the Salahtimes
                  app with the highest standards of accuracy and efficiency,
                  ensuring that users can rely on us for their daily prayer needs.
                </p>
              </section>
              </div>
            <div>
              <img src={masjidImage} alt="" />
            </div>
          </div>
        </div>
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
      </section>
    </>
  );
};

export default About;
