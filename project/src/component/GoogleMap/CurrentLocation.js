import React from 'react';
import ReactDOM from 'react-dom';
import MapContainer from './GoogleMap'

export class CurrentLocation extends React.Component {
  state = {
    currentLocation: {}
  };
    

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
          console.log('ccc',this.state.currentLocation)
        },
        (error) => {
          console.error('Error getting the current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  render() {
    const { currentLocation } = this.state;
    const { hotelInfo } = this.props;

    return (
      <div>
        {Object.keys(currentLocation).length !== 0 ? (
          <MapContainer currentLocation={currentLocation} hotelInfo={hotelInfo} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default CurrentLocation;
