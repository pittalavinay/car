import React, { useState, useEffect } from 'react';

const Seatbelt = () => {
  const [seatbeltData, setSeatbeltData] = useState([]);
  const [alertBorderColor, setAlertBorderColor] = useState('red'); 

  
  const fetchSeatbeltData = async () => {
    try {
      const currentDate = new Date().toISOString();
      const startDate = '2023-01-01T00:00:00Z';
      const channelID = '2302709';  

      // Fetch seatbelt data from ThingSpeak Field3
      const response = await fetch(
        `https://api.thingspeak.com/channels/${channelID}/fields/3.json?start=${startDate}&end=${currentDate}`
      );

      if (!response.ok) {
        throw new Error('Seatbelt data network response was not ok');
      }

      const data = await response.json();
      setSeatbeltData(data.feeds.map((entry) => entry.field3)); // Set the fetched data in the state

      // Calculate the sum of the data values
      const dataSum = seatbeltData.reduce((sum, value) => sum + parseInt(value), 0);

      // Change the alert border color based on the data sum
      if (dataSum > 1) {
        setAlertBorderColor('red');
      } else {
        setAlertBorderColor('green');
      }
    } catch (error) {
      console.error('Error fetching seatbelt data: ', error);
    }
  };

  // Use useEffect to fetch data and periodically update the border color
  useEffect(() => {
    fetchSeatbeltData(); // Fetch data when the component mounts

    // Periodically fetch data and update the border color (adjust the interval as needed)
    const interval = setInterval(() => {
      fetchSeatbeltData();
    }, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='seat'>
      <h1>Seatbelt Data</h1>
      <div className="alert" style={{ borderColor: alertBorderColor }}>
        <img
          src="https://media.gettyimages.com/id/171149844/photo/commercial-airliner-seat-belt.jpg?s=612x612&w=gi&k=20&c=BRgJnWfPn06ldorX6SQSyRNVNMhxjcIb7fNA0skWTGU="
          alt="Seatbelt"
        />
      </div>
    </div>
  );
};

export default Seatbelt;
