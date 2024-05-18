// VibrationBarGraph.js
import React, { useState, useEffect } from 'react';
import './App.css';

const VibrationBarGraph = () => {
  const [vibrationData, setVibrationData] = useState([]);
  const maxBarHeight = 50; // Maximum bar height

  const fetchVibrationData = async () => {
    try {
      const currentDate = new Date().toISOString();
      const startDate = '2023-01-01T00:00:00Z';

      // Replace this API URL with your actual data source
      const response = await fetch(
        `https://api.thingspeak.com/channels/2302709/fields/2.json?start=${startDate}&end=${currentDate}`
      );

      if (!response.ok) {
        throw new Error('Vibration data network response was not ok');
      }

      const data = await response.json();
      setVibrationData(data.feeds.map((entry) => entry.field2));
      console.log(vibrationData);
    } catch (error) {
      console.error('Error fetching vibration data: ', error);
    }
  };

  useEffect(() => {
    fetchVibrationData();
  }, []);

  // Count the number of "1"s and "0"s
  const countDanger = vibrationData.filter((vibration) => vibration == 1).length;
  const countSafe = vibrationData.filter((vibration) => vibration == 0).length;

  return (
    <div className="vibration-bar-graph">
     <div className='imga'> <img src='https://media.istockphoto.com/id/466327320/photo/car-crash-in-urban-street-with-black-car.jpg?s=612x612&w=0&k=20&c=nkxs_ZzV1kgMWudGicBXZQdxMSFek3vZoAtjZw4J29A=' width="400px" ></img></div>
     <div className='vib'> {vibrationData.map((vibration, index) => (
        <div
          key={index}
          className={`vibration-bar ${vibration === 1 ? 'danger-active' : 'safe-active'}`}
          style={{backgroundColor: countDanger > countSafe ? 'red' : 'green'}}
        ></div>
      ))}
      </div>
      <br></br>
      <div className='dang'>
      <p className={`safety-message ${countDanger > countSafe ? 'danger-active' : 'safe-active'}`}>
        {countDanger > countSafe ? 'Danger Zone' : 'Safe Zone'}
      </p>
      </div>
    </div>
  );
};

export default VibrationBarGraph;
