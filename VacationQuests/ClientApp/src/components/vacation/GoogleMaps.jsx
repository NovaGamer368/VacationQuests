import { GoogleMap, useLoadScript, InfoWindow, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";

const GoogleMaps = ({ latVar, lngVar, markers, largeMap }) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [showInfoWindow, setInfoWindowFlag] = useState(true);

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
                                        }}
                                            title={event.lat}
                                            key={index}
                                            onClick={(props, marker) => {
                                                setSelectedElement(event);
                                                setActiveMarker(marker);
                                            }}
                                        >
                                            {selectedElement && selectedElement.lat === event.lat && selectedElement.lng === event.lng && (
                                                <InfoWindow
                                                    visible={true}  // Always show the InfoWindow when the selected marker matches
                                                    marker={activeMarker}
                                                    onCloseClick={() => {
                                                        setSelectedElement(null);
                                                    }}
                                                >
                                                    <div>
                                                        <h1>{selectedElement.lng}</h1>
                                                    </div>
                                                </InfoWindow>
                                            )}
                                        </Marker>
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