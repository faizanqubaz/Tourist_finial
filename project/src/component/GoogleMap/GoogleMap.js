import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react';
import DistanceButton from './distanceButton';

class HotelMap extends Component {
  constructor(props) {
    super(props);
    let latitude, longitude,hotelname;
    try {
      const storedHotelInfo = JSON.parse(localStorage.getItem('hotelInfo'));
      console.log('stored',storedHotelInfo)
      latitude = storedHotelInfo && storedHotelInfo ? storedHotelInfo.latitude : undefined;
      longitude = storedHotelInfo && storedHotelInfo ? storedHotelInfo.longitude : undefined;
      hotelname = storedHotelInfo && storedHotelInfo ? storedHotelInfo.name : undefined;
    } catch (error) {
      console.error('Error parsing stored hotel information:', error);
      // Handle the error gracefully, such as setting default values or showing a message
      latitude = undefined;
      longitude = undefined;
    }

    this.state = {
      currentPosition: null,
      hotelLocation: latitude !== undefined && longitude !== undefined
        ? {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        }
        : { lat: 0, lng: 0 },
      distance: null,
      drivingTime: null,
      walkingTime: null,
      hotelname:hotelname
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
    const { hotelInfo } = this.props;
  const { currentPosition, hotelLocation, distance, drivingTime, walkingTime,hotelname } = this.state;



  const polylinePath = [currentPosition, hotelLocation];
  return (
    <div style={{ position: 'relative', height: '600px', width: '1400px' }}>
     <Map
  google={this.props.google}
  initialCenter={currentPosition || { lat: 35.9202, lng: 74.3080 }} // Use a default location if currentPosition is null
  zoom={8}
>
        {currentPosition && (
          <Marker
            position={currentPosition}
            label ="You are here"
          />
        )}
    {hotelLocation && hotelLocation.lat !== 0 && hotelLocation.lng !== 0 && (
  <Marker position={hotelLocation} label="Hotel" />
)}
        {currentPosition && hotelLocation.lat !== 0 && hotelLocation.lng !== 0 && (
          <Polyline
          path={polylinePath}
            geodesic={true}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        )}
        {distance && (
          <div style={{
            position: 'absolute',
            top: '300px',
            left: '500px',
            backgroundColor: 'white',
            padding: '5px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          }}>
            Distance to {hotelname} Hotel is: {distance.toFixed(2)/1000} km
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