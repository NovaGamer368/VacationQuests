import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

const GoogleMaps = ({ latVar, lngVar, markers, largeMap }) => {
    //const { isLoaded } = useLoadScript({
    //    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    //});
    //const center = useMemo(() => ({ lat: latVar, lng: lngVar }), []);
    if (largeMap) {
        return (
            <div className='largeMap'>
                {/*{!isLoaded ? (*/}
                {/*    <h1>Loading...</h1>*/}
                {/*) :*/}

                <GoogleMap
                    mapContainerClassName="map-container"
                    center={{ lat: latVar, lng: lngVar }}
                    zoom={10}
                >
                    {
                        markers ?
                            <>
                                {
                                    markers.map((event, index) => (
                                        <Marker position={{
                                            lat: event.lat,
                                            lng: event.lng
                                        }} key={index} />
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
    }
    else {
        return (
            <div className='map'>
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={{ lat: latVar, lng: lngVar }}
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
    }
    
};

export default GoogleMaps;