import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const mapStyles = {
  width: '100%',
  height: '600px'
}

var centerPoint = { lat: 51.447105, lng: -0.876939 }

export class MapContainer extends Component {
  state = {
    location: this.props.initialMarker
  }

  addMarker = (location, map) => {
    const newLatLng = {
      lat: location.lat(),
      lng: location.lng()
    }
    this.setState(
      {
        location: newLatLng
      },
      () => this.props.setLatlng(newLatLng)
    )
    // map.panTo(location);
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        onClick={(t, map, c) => {
          this.addMarker(c.latLng, map)
        }}
        initialCenter={this.state.location}
      >
        <Marker position={this.state.location} />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY
})(MapContainer)
