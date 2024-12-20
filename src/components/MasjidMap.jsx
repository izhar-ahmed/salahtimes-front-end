import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PropTypes from "prop-types";

const GoogleMapComponent = ({ lat, lng }) => {
  // Google Maps API Key
  const apiKey = 'AIzaSyDZ_YQUDSWfdq-QdcVoXqTU7hMGY6SR5wk';

  const coordinates = { lat, lng };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={coordinates}
        zoom={20}
      >
        <Marker 
        position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
};

GoogleMapComponent.propTypes = {
  lat: PropTypes.any,
  lng: PropTypes.any
}

export default GoogleMapComponent;


// api key = AIzaSyDZ_YQUDSWfdq-QdcVoXqTU7hMGY6SR5wk