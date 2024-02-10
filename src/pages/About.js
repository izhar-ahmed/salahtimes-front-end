import React from "react";
import "./Common.css";
import masjidImage from "../img/mosque_1280.jpg";
import CustomCTASection from "../components/CustomCTASection";
import Header2 from "../components/Header2";
const About = () => {
  return (
    <section className="">
      <Header2
        heading={
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2">
            Our <span className="font-light">Mission</span>
          </h2>
        }
        subHeading="Discover our commitment to empowering communities with accurate Namaz time schedules."
      />
      <div className="container mx-auto px-4 mb-10">
        <div className="flex gap-10">
          <div className="md:w-3/4 lg:w-1/2">
            <section className="mb-2">
              <h2 className="text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
                <span className="font-light">Our</span> Mission
              </h2>
              <p className="text-lg leading-relaxed">
                At Salahtimes, our mission is to empower communities with
                accurate and reliable Namaz time schedules. We believe that
                access to precise prayer timings is essential for individuals to
                observe their religious practices effectively.
              </p>
            </section>
            <section className="mb-2">
              <h2 className="text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
                <span className="font-light">Our</span> Vision
              </h2>
              <p className="text-lg leading-relaxed">
                Our vision is to create a seamless experience for users seeking
                to stay connected to their spiritual practice. By providing
                timely updates and convenient access to prayer schedules, we aim
                to facilitate a deeper connection to faith and community.
              </p>
            </section>
            <section className="mb-2">
              <h2 className="text-3xl max-w-7xl mb-2 text-neutral-950 dark:text-neutral-dark-950">
                <span className="font-light">Our</span> Commitment
              </h2>
              <p className="text-lg leading-relaxed">
                We are committed to delivering excellence in service and
                reliability. Our team is dedicated to maintaining the Salahtimes
                app with the highest standards of accuracy and efficiency,
                ensuring that users can rely on us for their daily prayer needs.
              </p>
            </section>
          </div>
          <div className="md:w-3/4 lg:w-1/2">
            <img src={masjidImage} alt="" />
          </div>
        </div>
      </div>
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
    </section>
  );
};

export default About;
