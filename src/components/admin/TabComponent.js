import React, { useState } from 'react';

const TabComponent = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex mb-4">
        {React.Children.map(children, (child, index) => (
          <button
            className={`${
              activeTab === index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
            } py-2 px-4 mr-2 rounded`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div>{React.Children.toArray(children)[activeTab]}</div>
    </div>
  );
};

export default TabComponent;
