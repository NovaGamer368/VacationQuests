import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LocationSelector from './LocationSelector';
import { Form } from 'react-bootstrap';
import moment from 'moment'
import DateSelection from './DateSelection';

const EventsDisplay = ({ date, events, update }) => {

    const [eventsArr, setEventsArr] = useState(events)
    const [displayArr, setDisplayArr] = useState();
    const [noEvents, setNoEvents] = useState(true)
    
    useEffect(() => {
       getEvents()
    }, [])

    useEffect(() => {
        //console.log("display Array:", displayArr)
        if (displayArr) {
            setNoEvents(false)
            update()
        }
    }, [displayArr])

    async function getEvents (){
        let tempArray = []
        if (eventsArr != null) {
            eventsArr.forEach((event) => {
                fetch(`https://localhost:7259/api/events/${event}`)
                    .then(resp => resp.json())
                    .then(data => {
                        if (moment(date).format('MMMM Do YYYY') == moment(data.selectedDate).format('MMMM Do YYYY')) {
                            tempArray.push(data)
                            setDisplayArr(tempArray)
                        }
                    })
                    .catch(e => console.log(e))
            })
        }
    }

    if (noEvents !== true) {
        return (
            <>
                <div className='text-center'>
                    {
                        displayArr.map((event) => (
                        <div key={ event.id } className='card border-light p-3 mb-3'>
                            <div>{event.eventName}</div>
                            <div><b>Location: </b>
                                {event.location}
                            </div>
                            <div><div><b>Starting time: </b>{moment(event.startTime).format('hh:mm a')}</div>
                            <div><b>Ending at: </b>{moment(event.endTime).format('hh:mm a')}</div></div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
    else {
        return (
            <><p className='mb-3'>No Events found</p></>
            )
    }
};

export default EventsDisplay; 