import React, { useEffect, useState } from 'react';
import moment from 'moment'

const EventsDisplay = ({ date, events, update, vacation }) => {

    const [eventsArr, setEventsArr] = useState(events)
    const [displayArr, setDisplayArr] = useState();
    const [noEvents, setNoEvents] = useState(true)
    const [loading, setLoading] = useState(true)
    
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
            setLoading(false)
        }
    }

    if (noEvents !== true) {
        if (!loading) {
            return (
                <>
                    <div className='text-center'>
                        {
                            displayArr.map((event) => (
                                <div key={event.id} className='card border-light p-3 mb-3' onClick={ () => window.location.href = `/EventView?e=${event.id}&v=${vacation.id}` }>
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
                <><p className='mb-3'>LOADING</p></>
            )
        }
    }
    else {
        return (
            <><p className='mb-3'>No Events found</p></>
        )
    }
};

export default EventsDisplay; 