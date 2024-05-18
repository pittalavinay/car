import React, { useState, useEffect } from 'react';

const SmokeSensor = () => {
  const [smokeValue, setSmokeValue] = useState([]);
  const [alertBorderColor, setAlertBorderColor] = useState('green');

  const fetchSmokeValue = async () => {
    try {
      const channelID = '2302709'; // Replace 'YOUR_CHANNEL_ID' with your ThingSpeak channel ID
      const field = 'field4'; // Field for smoke sensor data
      
      // Calculate start date (30 days ago)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      const startDateString = startDate.toISOString().slice(0, 19) + 'Z';

      const response = await fetch(`https://api.thingspeak.com/channels/${channelID}/fields/${field}.json?start=${startDateString}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const smokeValues = data.feeds.map(feed => parseInt(feed[field])); // Extract smoke values from each entry
      const totalSmokeValue = smokeValues.reduce((acc, value) => acc + value, 0); // Calculate total smoke value

      setSmokeValue(smokeValues);

      // Check if today's smoke value is above 600
      const todayValue = smokeValues.length > 0 ? smokeValues[smokeValues.length - 1] : 0;
      if (todayValue > 600) {
        setAlertBorderColor('red');
      } else {
        setAlertBorderColor('green');
      }
    } catch (error) {
      console.error('Error fetching smoke sensor data: ', error);
    }
  };

  useEffect(() => {
    fetchSmokeValue();

    const interval = setInterval(() => {
      fetchSmokeValue();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='smoke-sensor'>
      <h1>Smoke Sensor Data</h1>
      <div className="alert" style={{ borderColor: alertBorderColor }}>
        <img
          src="https://static.toiimg.com/thumb/msid-105825347,width-1280,height-720,resizemode-4/105825347.jpg"
          alt="Smoke Sensor Image"
          style={{ width: '800px', height: '600px' }}
        />
        <p>Total Smoke Value: {smokeValue.reduce((acc, value) => acc + value, 0)}</p>
      </div>
    </div>
  );
};

export default SmokeSensor;
