import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleMaps from './GoogleMaps';

const AdvancedEventView = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const [selectedEvent, setSelectedEvent] = useState()
    const [placeObject, setPlaceObject] = useState()
    const [vacation, setVacation] = useState()
    const [locationVar, setLocationVar] = useState()
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadFilter, setLoadFilter] = useState(false)
    const [loadmap, setLoadmap] = useState(false)
    const navigate = useNavigate();


    useEffect(() => {
        for (const [key, value] of queryParams) {
            if (key == 'e') {
                fetch(`https://localhost:7259/api/events/${value}`)
                    .then(resp => resp.json())
                    .then(data => {
                        setSelectedEvent(data)
                        setPlaceObject(JSON.parse(data.location))
                        setLoading(false)
                    })
                    .catch(e => console.log(e))
            }
            if (key == 'v') {
                fetch(`https://localhost:7259/api/vacations/${value}`)
                    .then(resp => resp.json())
                    .then(data => {
                        setVacation(data)
                    })
                    .catch(e => console.log(e))
            }
        }
        //console.log(placeObject.geometry.location.lat)


    }, [])

    useEffect(() => {
        if (placeObject) {
                setLoadmap(true)
        }
    }, [placeObject])

    //useEffect(() => {
    //    if (locationVar) {
    //        if (placeObject) {
    //            setLoadmap(true)
    //        }
    //    }
    //}, [locationVar])

    useEffect(() => {
        if (vacation) {
            //Getting location
            let api_url = `https://restcountries.com/v3.1/name/${vacation.location}?fullText=true`

            fetch(api_url)
                .then(resp => resp.json())
                .then(data => {
                    //SORT DATA RETURNED
                    console.log('data: ', data)
                    setLocationVar(data)
                    setLoadFilter(true)
                })
                .catch(e => console.log(e))
        }
    }, [vacation])

    if (!loading) {
        if (!editMode) {
            return (
                <div className='row w-100 p-4'>
                    <div className='row'>
                        <button className='btn btn-secondary col-1 m-auto' onClick={() => { navigate(-1) }}>
                            <i className="bi bi-arrow-90deg-left"></i>
                        </button>
                        <h1 className='col-9 text-center'>Event Details</h1>
                        <DeleteEvent selectedEvent={selectedEvent} vacation={vacation} />
                    </div>
                    <hr></hr>
                    <div className='col-6 '>
                        <div className='row'>
                            <h2 className='col-10  d-flex flex-wrap text-center'>{selectedEvent.eventName}</h2>
                            <button className='btn btn-secondary col-2' onClick={() => { setEditMode(true) }}><i className="bi bi-pencil"></i></button>
                        </div>
                        <div className='col-10'>
                            <p><b>Description: </b>{selectedEvent.description}</p>
                            <p><b>Location: </b>{placeObject.name}</p>
                            <p><b>Date of the event: </b>{moment(selectedEvent.selectedDate).format('MMMM Do YYYY')}</p>
                            <p><b>Starts at: </b>{moment(selectedEvent.startTime).format('hh:mm a')}</p>
                            <p><b>Ends at: </b>{moment(selectedEvent.endTime).format('hh:mm a')}</p>                          
                        </div>
                        {
                            placeObject.business_status === "OPERATIONAL" ?
                                <div className='p-3 mt-3 border rounded border-secondary '>
                                    <h5 className='text-center'>Extra Details on {placeObject.name}</h5>
                                    <hr></hr>
                                    <div className='row d-flex justify-content-center align-items-center'>
                                        <div className='row d-flex justify-content-center flex-row'>
                                            <div className='col-6'>
                                                <b className='mx-auto'>Address:  </b>
                                                <span>{placeObject.formatted_address}</span>
                                                <br></br>
                                                {
                                                    placeObject.formatted_phone_number ?
                                                        <>
                                                            <b className='mx-auto'>Phone:  </b>
                                                            <span className='' >{placeObject.formatted_phone_number} </span>
                                                        </> : <></>
                                                }
                                                {
                                                    placeObject.current_opening_hours ?
                                                        <>
                                                            <div className='d-flex justify-content-center flex-column text-center mt-3'>
                                                                <div className='mt-5'>
                                                                    {
                                                                        placeObject.current_opening_hours.open_now ?
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
                                                                        placeObject.opening_hours.weekday_text.map((day) => (
                                                                            <div>
                                                                                {day}
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className='mt-5'>
                                                                    {
                                                                        placeObject.website ?
                                                                            <a className='text-info' href={placeObject.website} target="_blank" rel="noreferrer">
                                                                                Visit their Website HERE
                                                                            </a>
                                                                            :
                                                                            <a className='text-info' href={placeObject.url} target="_blank"
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
                                                                        placeObject.website ?
                                                                            <a className='text-info'
                                                                                href={placeObject.website}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                            >
                                                                                Visit their Website HERE
                                                                            </a>
                                                                            :
                                                                            <a className='text-info' href={placeObject.url} target="_blank"
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
                                                    placeObject.reviews ?
                                                        <div className='mt-2'>
                                                            <h5>Reviews</h5>
                                                            {
                                                                placeObject.reviews.map((review) => (
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
                    </div>
                    <div className='text-center col-6 h-100'>
                        <h1>MAP OF GOOGLE GOING TO LOCATION</h1>
                        {
                            loadmap === true ?
                                <GoogleMaps latVar={placeObject.geometry.location.lat} lngVar={placeObject.geometry.location.lng} />
                                :
                                <h2>Loading</h2>
                        }
                    </div>
                </div>
            );
        }
        else {
            
            return (
                <>
                    {
                        loadFilter === true ?
                            <EditEvent selectedEvent={selectedEvent} clearEdit={setEditMode} vacation={vacation} filter={locationVar[0].cca2} />
                            :
                            <h2>Loading</h2>
                    }       
                </>
            )
        }
    }
    else {
        return (
            <div>
                <h1>LOADING EVENT</h1>
                <CircularProgress />
            </div>

        )
    }
};

export default AdvancedEventView 