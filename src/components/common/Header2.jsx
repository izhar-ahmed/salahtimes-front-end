import PropTypes from 'prop-types';

const Header2 = ({ heading, subHeading }) => {
  return (
    <div className="hero-section relative isolate px-6 lg:px-8 overflow-hidden mb-20">
      <div className="absolute inset-x-0 top-0 bottom-0 -z-10 transform-gpu blur-3xl sm:top-0 sm:bottom-0" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      <div className="mx-auto max-w-2xl sm:py-16 lg:py-16">
        <div className="text-center">
          <div className='hero-heading'>{heading}</div>
          <div className='hero-sub-heading'>{subHeading}</div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-0 sm:bottom-0" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
};

Header2.propTypes = {
  heading: PropTypes.element.isRequired,
  subHeading: PropTypes.element.isRequired
}

export default Header2;
