import React, { useEffect, useState } from 'react';
import moment from 'moment'

const EventsDisplay = ({ date, events, update, vacation }) => {

    const [eventsArr, setEventsArr] = useState(events)
    const [displayArr, setDisplayArr] = useState();
    const [places, setPlaces] = useState()
    const [noEvents, setNoEvents] = useState(true)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getEvents()
        update()        
    }, [])

    useEffect(() => {
        //console.log("display Array:", displayArr)
        if (displayArr) {
            setNoEvents(false)
        }
    }, [displayArr])

    async function getEvents (){
        let tempArray = []
        let placeArr = []
        if (eventsArr != null) {
            eventsArr.forEach((event) => {
                fetch(`https://localhost:7259/api/events/${event}`)
                    .then(resp => resp.json())
                    .then(data => {
                        if (moment(date).format('MMMM Do YYYY') == moment(data.selectedDate).format('MMMM Do YYYY')) {
                            tempArray.push(data)
                            placeArr.push(JSON.parse(data.location))
                            setDisplayArr(tempArray)
                            setPlaces(placeArr)
                            console.log("place object:", placeArr)
                            update()
                        }
                    })
                    .catch(e => console.log(e))
            })
            setLoading(false)
        }
    }

    if (noEvents !== true) {
        if (!loading && places) {
            return (
                <>                    
                    <div className='text-center'>
                        {
                            displayArr.map((event, index) => (
                                <div key={event.id} className='card border-light p-3 mb-3' onClick={() => window.location.href = `/EventView?e=${event.id}&v=${vacation.id}`}>
                                    {/*<img className='banner' src={ places[index].photos[0].getUrl()} loading='lazy' />*/}
                                    <div>{event.eventName}</div>
                                    <div><b>Location: </b>
                                        {places[index].name}
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