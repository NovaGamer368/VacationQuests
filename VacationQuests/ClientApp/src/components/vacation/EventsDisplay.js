import React, { useEffect, useState } from 'react';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Tooltip from '@mui/material/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment'

const EventsDisplay = ({ date, events, update, vacation }) => {

    const [eventsArr, setEventsArr] = useState(events)
    const [displayArr, setDisplayArr] = useState();
    const [places, setPlaces] = useState()
    const [count, setCount] = useState()
    const [images, setImages] = useState([])
    const [dailyView, setDailyView] = useState(false)
    const [noEvents, setNoEvents] = useState(true)
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(false)

    const shutterApiKey = process.env.REACT_APP_SHUTTER_TOKEN;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getEvents()
        update()
    }, [])
    useEffect(() => {
        //console.log("display Array:", displayArr)
        if (displayArr) {
            //sortArray.sort((a, b) => moment(a.startTime)._d.getTime - moment(b.startTime)._d.getTime())
            setNoEvents(false)
            console.log('places: ', places)
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

    const fetchImages = async (name) => {
        const encodedQuery = encodeURIComponent(name);
        console.log("name of image:", encodedQuery)
        fetch(`https://api.shutterstock.com/v2/images/search?query=${encodedQuery}`, {
            headers: {
                "User-Agent": "application/javascript",
                'Authorization': `Bearer ${shutterApiKey}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setImages(data.data[0]);
                console.log("image:", data.data[0])
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    };

    const moreEvents = () => {
        handleShow()
        places.forEach((place) => {
            //fetchImages(place.name)
        })
    }

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
                                <>
                                    {
                                        index < 3 ?
                                            <Tooltip title={"More info on " + event.eventName + " event"} placement="top">
                                                <div key={event.id} className='card btn btn-secondary border-primary p-3 mb-3' onClick={() => window.location.href = `/EventView?e=${event.id}&v=${vacation.id}`}>
                                                    {/*<img className='banner' src={ places[index].photos[0].getUrl()} loading='lazy' />*/}
                                                    <div>{event.eventName}</div>
                                                    <div><b>Location: </b>
                                                        {places[index].name}
                                                    </div>
                                                    <div><div><b>Starting time: </b>{moment(event.startTime).format('hh:mm a')}</div>
                                                        <div><b>Ending at: </b>{moment(event.endTime).format('hh:mm a')}</div></div>
                                                </div>
                                            </Tooltip>
                                            :
                                            <>
                                                {
                                                    index == 3 ?
                                                        <>
                                                            <Tooltip title='View all Events' placement="top">
                                                                <button className='btn btn-primary w-100' onClick={moreEvents}><MoreHorizOutlinedIcon /></button>
                                                            </Tooltip>
                                                        </>
                                                        :
                                                        <></>
                                                }
                                            </>
                                    }
                                </>

                            ))}
                        {
                            show ?
                                <>
                                    <Modal size='lg'                                        
                                        centered show={show} onHide={handleClose}>
                                        <Modal.Header className='justify-content-center'>
                                            <h3 className='text-center'>Events for <b>{moment(displayArr[0].selectedDate).format('MMMM Do YYYY')}</b></h3>
                                        </Modal.Header>
                                        <Modal.Body >
                                            <div className='d-flex flex-row flex-wrap justify-content-center'>
                                                {
                                                    displayArr.map((event, index) => (
                                                        <>
                                                            <Tooltip title={"More info on " + event.eventName + " event"} placement="top">
                                                                <div key={event.id} className='card btn btn-secondary col-3 border-primary p-3 mb-3 h-auto' onClick={() => window.location.href = `/EventView?e=${event.id}&v=${vacation.id}`}>
                                                                    {/*<img className='banner' src={ places[index].photos[0].getUrl()} loading='lazy' />*/}
                                                                    <div>{event.eventName}</div>
                                                                    <div><b>Location: </b>
                                                                        {places[index].name}
                                                                    </div>
                                                                    <div><div><b>Starting time: </b>{moment(event.startTime).format('hh:mm a')}</div>
                                                                        <div><b>Ending at: </b>{moment(event.endTime).format('hh:mm a')}</div></div>

                                                                </div>
                                                            </Tooltip>
                                                        </>
                                                    ))}
                                            </div>
                                            
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <div className='d-flex w-100'>
                                                <Button className='m-1 w-100' variant="secondary" onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                                : <></>
                        }
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