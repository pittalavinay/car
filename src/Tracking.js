import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const OpenCageApiKey = 'd6f969fd9024ac8afde957f0c86a5ba'; // Replace with your OpenCage API key

const Tracking = () => {
  const [phoneNumber, setPhoneNumber] = useState('+919014633625'); // Default phone number
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Fetch the location data using the OpenCage API
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${phoneNumber}&key=${OpenCageApiKey}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry;
          setLocation({ lat, lng });
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, [phoneNumber]);

  return (
    <div>
      <h1>Phone Number Location Tracking</h1>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <MapContainer
        center={location}
        zoom={9}
        style={{ height: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location}>
          <Popup>{phoneNumber}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Tracking;
