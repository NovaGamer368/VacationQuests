import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LocationSelector from './LocationSelector';
import { Form } from 'react-bootstrap';
import moment from 'moment'
import DateSelection from './DateSelection';

const EventsDisplay = ({ date, events }) => {

    const [eventsArr, setEventsArr] = useState(events)
    const [displayArr, setDisplayArr] = useState([]);

    useEffect(() => {
        let tempArray = new Array()
        if (eventsArr != null) {
            eventsArr.forEach((event) => {
                if (moment(date).format('MMMM Do YYYY') == moment(event.selectedDate).format('MMMM Do YYYY')) {
                    console.log('true')
                    tempArray.push(event)
                }
                else {
                    console.log('false', event)
                }
            })
        }
        setDisplayArr(tempArray)


    }, [])

    return (
        <>
            <div className='text-center'>
                {displayArr.map((event) => (
                    <div className='card border-light p-3 mb-3'>
                        <div>{event.eventName}</div>
                        <div><b>Location: </b>
                            {event.location }
                        </div>
                        <div><div><b>Starting time: </b>{moment(event.startTime).format('hh:mm a')}</div> <div><b>Ending at: </b>{moment(event.endTime).format('hh:mm a')}</div></div>
                     </div>
                ))}
            </div>
        </>
    )
};

export default EventsDisplay; 