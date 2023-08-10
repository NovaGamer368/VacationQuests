import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

const GoogleMaps = ({ latVar, lngVar, markers }) => {
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
            >
                {
                    markers ?
                        <>
                            {
                                markers.map((event) => (
                                    <Marker position={{
                                        lat: event.lat,
                                        lng: event.lng
                                    }} />
                                    ))
                            }
                        </>
                        :
                        <Marker position={{
                            lat: latVar,
                            lng: lngVar
                        }}
                        />
                }
                
            </GoogleMap>

        </div>
    );
};

export default GoogleMaps;