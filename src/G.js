import React from "react";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const G = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 37.7749, lng: -122.4194 }} // Set initial map center
  >
    {props.locations.map((location, index) => (
      <Marker
        key={index}
        position={{ lat: location.latitude, lng: location.longitude }}
      >
        <InfoWindow>
          <div>
            <h3>Location</h3>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        </InfoWindow>
      </Marker>
    ))}
  </GoogleMap>
));

export default G;
