import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const GoogleMaps = ({latVar, lngVar }) => {
    //const { isLoaded } = useLoadScript({
    //    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    //});
    const center = useMemo(() => ({ lat: latVar, lng: lngVar }), []);

    return (
        <div className='map'>
            {/*{!isLoaded ? (*/}
            {/*    <h1>Loading...</h1>*/}
            {/*) :*/}
                
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={16}
                />
            
        </div>
    );
};

export default GoogleMaps;