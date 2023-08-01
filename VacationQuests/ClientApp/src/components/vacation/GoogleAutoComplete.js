import { useState, useRef, useEffect } from "react";
import Rating from '@mui/material/Rating';
import GoogleMaps from "./GoogleMaps";
import StarIcon from '@mui/icons-material/Star';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const GoogleAutoComplete = ({ locationVar, setLocationVar }) => {
    const [place, setPlace] = useState()
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
            setPlace(await autoCompleteRef.current.getPlace())
        });
    }, []);

    useEffect(() => {
        if (place) {
            console.log({ place });
            setLocationVar(place)
        }
    }, [place])

    return (
        <div>
            <label className="form-label" htmlFor="location">Find Event location</label>
            <input className="form-control" id="location" type="text" placeholder="Location / Address" ref={inputRef} />
            {
                locationVar ?
                    <div className='p-3 mt-3 border rounded border-secondary'>
                        <h5 className='text-center'>Extra Details on {locationVar.name}</h5>
                        <hr></hr>
                        <div className='row d-flex justify-content-center align-items-center'>
                            <div className='row d-flex justify-content-center flex-row'>
                                <div className='col-6'>
                                    <b className='mx-auto'>Address:  </b>
                                    <span>{locationVar.formatted_address}</span>
                                    <br></br>
                                    <b className='mx-auto'>Phone:  </b>
                                    <span className='' >{locationVar.formatted_phone_number} </span>
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
                                                                <a className='text-info' href={locationVar.website}>
                                                                    Visit their Website HERE
                                                                </a>
                                                                :
                                                                <a className='text-info' href={locationVar.url}>
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
                                                                <a className='text-info' href={locationVar.website}>
                                                                    Visit their Website HERE
                                                                </a>
                                                                :
                                                                <a className='text-info' href={locationVar.url}>
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
                                                                    <h4>{review.author_name} rates:</h4>
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
                    : <></>
            }
        </div>
    );
};
export default GoogleAutoComplete;