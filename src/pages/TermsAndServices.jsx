import { useEffect } from 'react';
import Header2 from '../components/common/Header2';
import Header from '../components/TermsAndServices/Header'
import SubHeader from '../components/TermsAndServices/SubHeader'
import CustomCTASection from '../components/CustomCTASection';
import { Helmet } from 'react-helmet-async';
import PageContent from '../components/TermsAndServices/PageContent';
import CTAHeader from '../components/TermsAndServices/CTAHeader';
import CTASubHeader from '../components/TermsAndServices/CTASubHeader';

const TermsAndServices = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return (
    <>

      {/* SEO */}
      <Helmet>
        <title>Terms and Services | Salahtimes</title>
      </Helmet>

      {/* Hero Section */}
      <section id='termsandservices-hero-section'>
        <Header2
          heading=<Header />
          subHeading=<SubHeader />
        />
      </section>


      {/* PageContent */}
      <section id='termsandservices-content-section'>
        <PageContent />
      </section>


      {/* CTA Section */}
      <section id="termsandservices-cta-section">
        <CustomCTASection
          heading=<CTAHeader />
          subheading=<CTASubHeader />
          exploreLabel="Explore Mosques"
          directionsLabel="Get Directions"
        />
      </section>




    </>
  );
}

export default TermsAndServices;
