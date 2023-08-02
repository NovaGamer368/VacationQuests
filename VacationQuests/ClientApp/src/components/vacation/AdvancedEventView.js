import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import EditEvent from './EditEvent';
import DeleteEvent from './DeleteEvent';
import CircularProgress from '@mui/material/CircularProgress';
import GoogleMaps from './GoogleMaps';

const AdvancedEventView = () => {    
    const queryParams = new URLSearchParams(window.location.search)
    const [selectedEvent, setSelectedEvent] = useState()
    const [placeObject, setPlaceObject] = useState()
    const [vacation, setVacation] = useState()
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
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

    }, [])

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
                    </div>
                    <div className='text-center col-6 h-100'>
                        <h1>MAP OF GOOGLE GOING TO LOCATION</h1>
                        <GoogleMaps />
                    </div>                    
                </div>
            );
        }
        else {
            return(
                <>
                    <EditEvent selectedEvent={selectedEvent} clearEdit={setEditMode} vacation={vacation} />                    
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