import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CustomCTASection = ({ heading, subheading, exploreLabel, directionsLabel }) => {
  return (
    <section className="bg-indigo-600">
      <div className='container mx-auto'>
        <div className="bg-indigo-600 mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-center max-w-[1070px] px-8 py-12 md:px-12 md:py-16 overflow-hidden relative">
          <div>
            {heading}
          </div>
          <div className="flex flex-col gap-8">
            {subheading}
            <div className="flex flex-col md:flex-row gap-4">
              <Link className="group btn bg-primary-light-950 border border-white dark:bg-primary-dark-950 rounded-full px-8 py-4 text-xl text-white dark:text-white flex gap-2 items-center" to="/">
                <span>{exploreLabel}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-white dark:fill-white group-hover:translate-x-1 transition-all duration-300">
                  <g clipPath="url(#clip0_253_4238)">
                    <path d="M23.6164 11.0663L14.9491 2.39884C14.7017 2.15143 14.372 2.01562 14.0204 2.01562C13.6684 2.01562 13.3388 2.15162 13.0914 2.39884L12.3045 3.18596C12.0573 3.43298 11.9211 3.76293 11.9211 4.11473C11.9211 4.46634 12.0573 4.80741 12.3045 5.05443L17.3608 10.1219H1.29657C0.572288 10.1219 0 10.6889 0 11.4134V12.5262C0 13.2507 0.572288 13.8748 1.29657 13.8748H17.4182L12.3047 18.9706C12.0575 19.218 11.9213 19.539 11.9213 19.8908C11.9213 20.2422 12.0575 20.5679 12.3047 20.8151L13.0916 21.5997C13.339 21.8471 13.6686 21.9819 14.0206 21.9819C14.3722 21.9819 14.7019 21.8453 14.9493 21.5979L23.6166 12.9307C23.8646 12.6825 24.001 12.3512 24 11.999C24.0008 11.6456 23.8646 11.3141 23.6164 11.0663Z"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_253_4238">
                      <rect width="24" height="24"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </Link>
              <Link className="btn border border-white rounded-full px-8 py-4 text-xl text-white items-center" to="/contact">{directionsLabel}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CustomCTASection.propTypes = {
  heading: PropTypes.element.isRequired,
  subheading: PropTypes.element.isRequired,
  exploreLabel: PropTypes.string,
  directionsLabel: PropTypes.string
}

export default CustomCTASection;
