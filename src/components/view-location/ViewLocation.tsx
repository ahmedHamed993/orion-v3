'use client'
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

type Props = {
    lat:number;
    lng:number;
};

const containerStyle = {
    width: "100%",
    height: "300px",
    borderRadius:"8px",
};


const ViewLocation = ({lat,lng}: Props) => {
    const { isLoaded } = useJsApiLoader({
        // id: 'google-map-script',
        googleMapsApiKey: "",
    });
    
    const [map, setMap] = useState(null);
    
    const onLoad = useCallback(function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds({lat,lng});
        map.fitBounds(bounds);
    
        setMap(map);
    }, []);
    
    
  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{lat,lng}}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker
        position={{lat,lng}}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default ViewLocation