// NotFound.js
import React from 'react';
import Error404 from '../components/Error404';
import CustomCTASection from '../components/CustomCTASection';
import MainFooter from '../components/MainFooter';
import MainNavigation from '../components/MainNavigation';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <MainNavigation />
      <Error404 heading={<p className="text-lg text-neutral-700 dark:text-neutral-dark-700 font-bold mb-12">
        Sorry, the page you are looking for doesn’t exits or has been moved.
        <br></br>
        <Link className="text-neutral-950 dark:text-neutral-dark-950 item-link" to="/">
          Back to Home
        </Link>
      </p>} />
      <CustomCTASection
        heading={<h2 className="text-5xl leading-tight md:text-6xl lg:text-6xl font-bold text-white dark:text-neutral-dark-950 mb-0"><span className="font-light">Let's</span> Explore The Mosque Locations <span class="font-light">together!</span></h2>}
        subheading={<p className="text-lg font-medium text-white">Find the Right Direction for Prayer.</p>}
        exploreLabel="Explore Mosques"
        directionsLabel="Get Directions"
      />
      <MainFooter />
    </>
  );
}

export default NotFound;
