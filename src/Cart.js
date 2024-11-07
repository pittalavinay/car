import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css'; 
import VibrationPieChart from './VibrationPieChart';
import Seatbelt from './Seatbelt';
import VibrationBarGraph from './VibrationBarGraph';

import SmokeSensor from './SmokeSensor';
 // Import the CSS file for the spinner

function Cart() {
  const [distanceData, setDistanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const startDate = '2023-01-01T00:00:00Z';
  const currentDate = new Date().toISOString();
  const endDate = currentDate;

  const carImages = [
    'https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/37138/model-3-exterior-left-front-three-quarter.jpeg?isig=0&q=80',
    'https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/News/20201230120133_tesla-model-3.jpg&c=0',
    'https://www.financialexpress.com/wp-content/uploads/2020/06/Tesla-Model_S-2017-660.jpg?w=660',
    'https://www.investing.com/academy/wp-content/uploads/2022/08/tesla-statistics.jpg',
    'https://etimg.etb2bimg.com/photo/80603647.cms',
  ];

  const fetchData = async () => {
    try {
      const distanceResponse = await fetch(`https://api.thingspeak.com/channels/2302709/fields/1.json?start=${startDate}&end=${endDate}`);
      if (!distanceResponse.ok) {
        throw new Error('Distance data network response was not ok');
      }
      const distanceData = await distanceResponse.json();
      setDistanceData(distanceData.feeds.map((entry) => entry.field1));
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching data: ', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <h1>Car Animation</h1>
          <Slider {...settings}>
            {distanceData.map((distance, index) => (
              <div key={index} className="car-container">
                <img src={carImages[index % carImages.length]} alt="Car" className="car-image" />
                <p className="car-distance-highlight">{distance} cm</p>
              </div>
            ))}
          </Slider>
          <VibrationBarGraph />
          <VibrationPieChart />
          <Seatbelt />
          <SmokeSensor/>
          
        </>
      )}
    </div>
  );
}

export default Cart;
