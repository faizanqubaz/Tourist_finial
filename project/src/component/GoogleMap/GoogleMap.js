
import CurrentLocation from './CurrentLocation';
import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow,Marker } from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    const { google, currentLocation } = this.props;
console.log('lll',currentLocation)
    return (
      <Map
        google={google}
        zoom={11}
        initialCenter={currentLocation}
        center={currentLocation}
      >
        <Marker  position={currentLocation} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xvlbMFrLYt9ExmJvyFnd5pawC_Al4rs'
})(MapContainer);