import React, { useEffect, useState } from 'react';
import moment from 'moment'

const EventsDisplay = ({ date, events, update, vacation }) => {

    const [eventsArr, setEventsArr] = useState(events)
    const [displayArr, setDisplayArr] = useState();
    const [places, setPlaces] = useState()
    const [count, setCount] = useState()
    const [noEvents, setNoEvents] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getEvents()
        update()
    }, [])
    useEffect(() => {
        //console.log("display Array:", displayArr)
        if (displayArr) {
            let sortArray = [...displayArr]
            //sortArray.sort((a, b) => moment(a.startTime)._d.getTime - moment(b.startTime)._d.getTime())
            setNoEvents(false)
            console.log('Sorted: ', sortArray)
            update()
        }
    }, [displayArr])

    useEffect(() => {
        if (count) {
            let sortArray = [...displayArr]
            //sortArray.sort((a, b) => moment(a.startTime)._d.getTime - moment(b.startTime)._d.getTime())
            setDisplayArr(sortArray)
        }
    }, [count])

    //useEffect(() => {
    //    if (displayArr) {
    //        let sortArray = [...displayArr]; // Create a copy to avoid mutating state directly
    //        sortArray.sort((a, b) => moment(a.startTime)._d.getTime() - moment(b.startTime)._d.getTime());
    //        console.log('Sorted: ', sortArray);
    //        setDisplayArr(sortArray);
    //        

    //    }
    //}, [displayArr]);



    async function getEvents() {
        let tempArray = []
        let placeArr = []
        if (eventsArr != null) {
            for (const event of eventsArr) {
                try {
                    const resp = await fetch(`https://localhost:7259/api/events/${event}`);
                    const data = await resp.json();


                    if (moment(date).format('MMMM Do YYYY') == moment(data.selectedDate).format('MMMM Do YYYY')) {
                        setCount(count + 1)
                        tempArray.push(data)                 
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            tempArray.sort((a, b) => moment(a.startTime)._d.getTime() - moment(b.startTime)._d.getTime())

            tempArray.forEach((event) => {
                placeArr.push(JSON.parse(event.location))
            })
            setPlaces(placeArr)
            setDisplayArr(tempArray)
            update()
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
                                <div key={event.id} className='card btn border-primary p-3 mb-3' onClick={() => window.location.href = `/EventView?e=${event.id}&v=${vacation.id}`}>
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