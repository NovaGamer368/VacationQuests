import { useState, useReducer, useRef, useEffect } from "react";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GoogleAutoComplete = ({ setLocationVar }) => {
    const [place, setPlace] = useState()
    const [locationVar, setThisLocationVar] = useState()
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: {},
        types: ["establishment"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            var place = await autoCompleteRef.current.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                return;
            }
            else {
                setPlace(await autoCompleteRef.current.getPlace())
            }
        });
        forceUpdate()
    }, []);

    useEffect(() => {
        if (place) {
            if (place.geometry) {
                setLocationVar(JSON.stringify(place))
                console.log("string version of place: ", JSON.stringify(place));
                setThisLocationVar(place)
            }
        }
    }, [place])

    useEffect(() => {
        if (locationVar) {
            console.log("locationVar is :", locationVar);
        }
    }, [locationVar])


    return (
        <div>
            <label className="form-label" htmlFor="location">Find Event location</label>
            <input className="form-control" id="location" type="text" placeholder="Location / Address" ref={inputRef} />
            {
                locationVar ?
                    <>
                        {
                            locationVar.business_status === "OPERATIONAL" ?
                                <div className='p-3 mt-3 border rounded border-secondary'>
                                    <h5 className='text-center'>Extra Details on {locationVar.name}</h5>
                                    <hr></hr>
                                    <div className='row d-flex justify-content-center align-items-center'>
                                        <div className='row d-flex justify-content-center flex-row'>
                                            <div className='col-6'>
                                                <b className='mx-auto'>Address:  </b>
                                                <span>{locationVar.formatted_address}</span>
                                                <br></br>
                                                {
                                                    locationVar.formatted_phone_number ?
                                                        <>
                                                            <b className='mx-auto'>Phone:  </b>
                                                            <span className='' >{locationVar.formatted_phone_number} </span>
                                                        </> : <></>
                                                }                                               
                                                {
                                                    locationVar.current_opening_hours ?
                                                        <>
                                                            <div className='d-flex justify-content-center flex-column text-center mt-3'>
                                                                <div className='mt-5'>
                                                                    {
                                                                        locationVar.current_opening_hours.open_now ?
                                                                            <div className='text-success'>
                                                                                OPENED NOW!
                                                                            </div>
                                                                            :
                                                                            <div className='text-danger'>
                                                                                CLOSED
                                                                            </div>
                                                                    }
                                                                </div>
                                                                <div>
                                                                    {
                                                                        locationVar.opening_hours.weekday_text.map((day) => (
                                                                            <div>
                                                                                {day}
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className='mt-5'>
                                                                    {
                                                                        locationVar.website ?
                                                                            <a className='text-info' href={locationVar.website} target="_blank" rel="noreferrer">
                                                                                Visit their Website HERE
                                                                            </a>
                                                                            :
                                                                            <a className='text-info' href={locationVar.url} target="_blank"
                                                                                rel="noreferrer">
                                                                                View on Google Maps
                                                                            </a>
                                                                    }
                                                                </div>

                                                            </div>

                                                        </>
                                                        :
                                                        <>
                                                            <div className='row d-flex justify-content-center flex-row text-center mt-3'>
                                                                <div className='col-6'>
                                                                    {
                                                                        locationVar.website ?
                                                                            <a className='text-info'                                                                                
                                                                                href={locationVar.website}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                                >
                                                                                Visit their Website HERE
                                                                            </a>
                                                                            :
                                                                            <a className='text-info' href={locationVar.url} target="_blank"
                                                                                rel="noreferrer">
                                                                                View on Google Maps
                                                                            </a>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                }
                                            </div>
                                            <div className='col-6'>
                                                {
                                                    locationVar.reviews ?
                                                        <div className='mt-2'>
                                                            <h5>Reviews</h5>
                                                            {
                                                                locationVar.reviews.map((review) => (
                                                                    <>
                                                                        <Accordion className='card mb-3'>
                                                                            <AccordionSummary
                                                                                expandIcon={<ExpandMoreIcon />}
                                                                                aria-controls="panel1a-content"
                                                                                id="panel1a-header"
                                                                            >
                                                                                <h4>{review.author_name} rates: </h4>
                                                                                <Rating
                                                                                    className='ms-auto'
                                                                                    name="text-feedback"
                                                                                    value={review.rating}
                                                                                    readOnly
                                                                                    precision={0.5}
                                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                                />
                                                                            </AccordionSummary>
                                                                            <AccordionDetails>
                                                                                <div className='card-body'>{review.text}</div>
                                                                            </AccordionDetails>
                                                                        </Accordion>

                                                                    </>
                                                                ))
                                                            }
                                                        </div>
                                                        :
                                                        <>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className='p-3 mt-3 border rounded border-secondary'>
                                        <h4 className='text-danger'>LOCATION IS CLOSED (OUT OF BUSINESS)</h4>
                                        </div>
                                </>
                        }

                    </>
                    : <></>
            }
        </div>
    );
};
export default GoogleAutoComplete;