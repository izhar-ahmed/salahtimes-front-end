// NotFound.js
import Error404 from '../components/NotFound/Error404';
import CustomCTASection from '../components/CustomCTASection';
import { Link } from 'react-router-dom';
import CTAHeading from '../components/NotFound/CTAHeading';
import CTASubHeading from '../components/NotFound/CTASubHeading';

const NotFoundPageContent = () => {
  return (
    <>
      <p className="text-lg text-neutral-700 dark:text-neutral-dark-700 font-bold mb-12">
        <span className='block mb-2'>
          Sorry, the page you are looking for doesn&apos;t exits or has been moved.
        </span>
        <Link className="text-neutral-950 dark:text-neutral-dark-950 item-link" to="/">
          Back to Home
        </Link>
      </p>
    </>
  )
}

const NotFound = () => {
  return (
    <>
      <section id='notfound-page-content'>
        <Error404 heading=<NotFoundPageContent /> />
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
}

export default NotFound;
