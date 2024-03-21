import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";

const Map = ({ lat, lng }) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: lat,
    lng: lng,
  };

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const scriptId = "google-maps-script";

    // Check if the script has already been loaded
    if (document.getElementById(scriptId)) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZ_YQUDSWfdq-QdcVoXqTU7hMGY6SR5wk&libraries=places`;
    script.async = true;
    script.defer = true;

    const handleScriptLoad = () => {
      setScriptLoaded(true);
    };

    script.addEventListener("load", handleScriptLoad);

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script and event listener when the component unmounts
      script.removeEventListener("load", handleScriptLoad);
      document.head.removeChild(script);
    };
  }, []);

  return scriptLoaded ? (
    <LoadScript googleMapsApiKey="AIzaSyDZ_YQUDSWfdq-QdcVoXqTU7hMGY6SR5wk">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  ) : (
    <div>Loading map...</div>
  );
};

Map.propTypes = {
	lat: PropTypes.any,
	lng: PropTypes.any
}

export default Map;
