import React from 'react';

const CustomCTASection = ({ heading, subheading, exploreLabel, directionsLabel }) => {
  return (
    <div className="py-16" style={{backgroundColor: '#4f46e5'}}>
      <div className="container mx-auto text-left">
        <h2 className="text-4xl font-bold text-white mb-4">{heading}</h2>
        <p className="text-lg text-white mb-8">{subheading}</p>
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-semibold transition duration-300">
            {exploreLabel}
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-6 rounded-full font-semibold transition duration-300">
            {directionsLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomCTASection;
