import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

type Props = {
  defaultLocation: {
    lat: number;
    lng: number;
  };
  handlePositionChanging: (lat: number, lng: number) => void;
};
const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const PinLocation = ({ defaultLocation, handlePositionChanging }: Props) => {
  const [center, setCenter] = useState(defaultLocation);
  const { isLoaded } = useJsApiLoader({
    // id: 'google-map-script',
    googleMapsApiKey: "",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  useEffect(() => {
    setCenter(defaultLocation); // Update marker when address changes
  }, [defaultLocation]);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        draggable
        position={center}
        onDragEnd={(e) => {
          setCenter({
            lat: e.latLng?.lat() || 0,
            lng: e.latLng?.lng() || 0,
          });
          handlePositionChanging(e.latLng?.lat() || 0, e.latLng?.lng() || 0);
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default PinLocation;
