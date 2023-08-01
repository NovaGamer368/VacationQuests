import { useRef, useEffect } from "react";

const GoogleAutoComplete = (locationVar) => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: {  },
        types: ["establishment"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            console.log({ place });
            locationVar(place.name)
        });
    }, []);
    return (
        <div>
            <label className="form-label" htmlFor="location">Find Event location</label>
            <input className="form-control" id="location" type="text" placeholder="Location / Address" ref={inputRef} />
        </div>
    );
};
export default GoogleAutoComplete;