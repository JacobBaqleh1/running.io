import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const MapComponent = () => {
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [initialLocationObtained, setInitialLocationObtained] = useState(false);

  useEffect(() => {
    if (!initialLocationObtained) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const initialPos = { lat: latitude, lng: longitude };
          setPathCoordinates([initialPos]);
          setInitialLocationObtained(true);
        },
        (error) => {
          console.error("Error obtaining location", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos = { lat: latitude, lng: longitude };
        setPathCoordinates((prev) => [...prev, newPos]);
        console.log("New Coordinates:", latitude, longitude);
      },
      (error) => {
        console.error("Error obtaining location", error);
      },
      {
        enableHighAccuracy: true,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [initialLocationObtained]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBXlJPM1yT0CiBbrK0KgHe3AIAJ36Ii8eI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={pathCoordinates[0]}
        zoom={10}
      >
        {pathCoordinates.length > 0 && (
          <Polyline
            path={pathCoordinates}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
