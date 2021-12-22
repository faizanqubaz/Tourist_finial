
import CurrentLocation from './CurrentLocation';
import React, { Component } from 'react';
import { Map, GoogleApiWrapper,InfoWindow,Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };

      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };
  render() {
    return (


        
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 37.0902,
            lng: 95.7129
          }
        }
      >

<CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >

<Marker
          onClick={this.onMarkerClick} name={'Current Location'}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </CurrentLocation>
          </Map>


    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xvlbMFrLYt9ExmJvyFnd5pawC_Al4rs'
})(MapContainer);