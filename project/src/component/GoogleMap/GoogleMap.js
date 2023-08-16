
// import CurrentLocation from './CurrentLocation';
// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper,InfoWindow,Marker } from 'google-maps-react';

// export class MapContainer extends Component {
//   render() {
//     const { google, currentLocation } = this.props;
// console.log('lll',currentLocation)
//     return (
//       <Map
//         google={google}
//         zoom={11}
//         initialCenter={currentLocation}
//         center={currentLocation}
//       >
//         <Marker  position={currentLocation} />
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyC6xvlbMFrLYt9ExmJvyFnd5pawC_Al4rs'
// })(MapContainer);

import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker,Polyline } from 'google-maps-react';
import DistanceButton from './distanceButton';

class HotelMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPosition: null,
      hotelLocation: { lat: 36.92388507655352, lng: 75.3565647949157 },
      distance: null, // Add a distance state variable
      drivingTime: null,
  walkingTime: null,
    };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.setState({
            currentPosition: { lat: latitude, lng: longitude },
          });
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
  calculateDistance = () => {
    console.log('hiii')
    const { currentPosition, hotelLocation } = this.state;

    if (currentPosition && hotelLocation) {
      const radianConversion = Math.PI / 180;
      const lat1 = currentPosition.lat;
      const lon1 = currentPosition.lng;
      const lat2 = hotelLocation.lat;
      const lon2 = hotelLocation.lng;
  
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * radianConversion;
      const dLon = (lon2 - lon1) * radianConversion;
  
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * radianConversion) * Math.cos(lat2 * radianConversion) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Distance in meters
      this.setState({
        distance: distance, // Update the distance state with calculated value
      });
      console.log(`Distance to hotel: ${distance} meters`);
    }
    const distanceService = new window.google.maps.DistanceMatrixService();
  distanceService.getDistanceMatrix(
    {
      origins: [currentPosition],
      destinations: [hotelLocation],
      travelMode: 'DRIVING', // You can also use 'WALKING'
      unitSystem: window.google.maps.UnitSystem.METRIC,
    },
    (response, status) => {
      if (status === 'OK') {
        const drivingTime = response.rows[0].elements[0].duration.text;
        this.setState({
          drivingTime: drivingTime,
        });
        console.log(`Driving time: ${drivingTime}`);
      } else {
        console.error('Error calculating driving time:', status);
      }
    }
  );
  };
  render() {
    const { currentPosition, hotelLocation, distance,drivingTime, walkingTime  } = this.state;
console.log('dis',walkingTime)
    // Create a polyline path using current and hotel positions
    const polylinePath = [currentPosition, hotelLocation];
    return (
      <div style={{ position: 'relative', height: '600px', width: '1400px' }}>
      <Map
        google={this.props.google}
        initialCenter={this.state.hotelLocation}
        zoom={8}
      >
        {currentPosition && (
          <Marker
            position={currentPosition}
            label="You are here"
          />
        )}
        <Marker
          position={hotelLocation}
          label="Khunjerab Top"
        />
        <Polyline
            path={polylinePath}
            geodesic={true}
            options={{
              strokeColor: "#FF0000", // Red line color
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
          {distance && (
            <div style={{
              position: 'absolute',
              top: '300px',
              left: '500px',
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
              ,
            }}>
              Distance to Khunjerab Top: {distance.toFixed(2)/1000} km
            </div>
            
          )}

{drivingTime && (
    <div>
      Driving time: {drivingTime}
    </div>
  )}
  {walkingTime && (
    <div>
      Walking time: {walkingTime}
    </div>
  )}
        </Map>
        <DistanceButton onClick={this.calculateDistance} />
        </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xvlbMFrLYt9ExmJvyFnd5pawC_Al4rs',
})(HotelMap);