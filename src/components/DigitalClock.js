import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Format the time as HH:MM:SS
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className="digital-clock">
      <h1>{formattedTime}</h1>
    </div>
  );
};

export default DigitalClock;
