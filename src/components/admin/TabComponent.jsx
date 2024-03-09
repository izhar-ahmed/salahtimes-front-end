import React, { useState } from "react";

const TabComponent = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      <div className="flex mb-4">
        {React.Children.map(children, (child, index) => (
          <button
            className={`${
              activeTab === index
                ? "bg-indigo-600 text-white"
                : "bg-gray-300 text-gray-700"
            } mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded`}
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
