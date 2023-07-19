﻿import React, { useEffect, useState, useReducer } from 'react';
import moment from 'moment'
import { TimePicker } from 'antd';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const EditEvent = ({ selectedEvent, clearEdit, vacation }) => {
    const [eventName, setEventName] = useState(selectedEvent.eventName)
    const [location, setLocation] = useState(selectedEvent.location)
    const [time, setTime] = useState()
    const [startTime, setStartTime] = useState(selectedEvent.startTime)
    const [endTime, setEndTime] = useState(selectedEvent.endTime)
    const [description, setDescription] = useState(selectedEvent.description)
    const [selectedDate, setSelectedDate] = useState(selectedEvent.selectedDate)

    const [dates, setDates] = useState([])

    //Modal shows
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        initDates()
    }, [])

    useEffect(() => {
        if (time) {
            let start = new Date(startTime)
            start.setHours(time[0].$H)
            start.setMinutes(time[0].$m)
            setStartTime(start)

            let end = new Date(endTime)
            end.setHours(time[1].$H)
            end.setMinutes(time[1].$m)
            setEndTime(end)

            console.log(end,start)
        }
    }, [time])

    const onChange = (time) => {
        setTime(time);
    };

    const initDates = () => {
        let loop = true;
        let date = new Date(vacation.startDate);
        const end = new Date(vacation.endDate)
        let dateList = []

        while (loop) {
            if (date.toISOString().slice(0, 10) == end.toISOString().slice(0, 10)) {
                loop = false
            }
            dateList.push(date)
            date = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);

        }
        setDates(dateList)
    }
    const updateEvent = () => {
            const requestOptions = {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    EventName: eventName,
                    Location: location,
                    StartTime: startTime,
                    EndTime: endTime,
                    Description: description,
                    SelectedDate: selectedDate
                }),
                origin: "https://localhost:44455"
            };

            fetch(`https://localhost:7259/api/events/${selectedEvent.id}`, requestOptions)
                .then(window.location.reload())
                .catch(e => console.log(e))
    }
    const selectedNewDate = (date) => {
        setSelectedDate(date);
        console.log(selectedDate)
        setShow(false); 
    }

    return (
        <>
            <div className='container text-center mt-5'>
                <div className='d-flex justify-content-center w-100'>
                    <button className='btn btn-secondary col-1 me-auto my-auto' onClick={()=>clearEdit(false)}>
                        <i className="bi bi-arrow-90deg-left"></i>
                    </button>
                    <h1 className='col-12 text-center me-auto'>Editing Event</h1>
                    <div className='col-1'></div>
                </div>
                {/*<h3 className='text-warning'>{error}</h3>*/}
                <div className="form-group mb-5">
                    <label className="col-form-label col-form-label-lg mt-4" for="inputLarge">Event Title</label>
                    <input className="form-control form-control-lg" type="text" placeholder="Event Title" id="inputLarge" value={ eventName } onChange={(e) => setEventName(e.target.value)} />
                </div>
                <div className="card m-3 border-success p-5">
                    <Button className='btn btn-secondary w-50 mb-4 m-auto' variant="primary" onClick={handleShow}>
                        Change Date of event
                    </Button>
                    <fieldset>                        
                        <label className="form-label" for="location">Where is the event happening?</label>
                        <input className="form-control" id="location" type="text" placeholder="Location / Address" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <label className="form-label mt-4" for="description">Description of Event</label>
                        <textarea className="form-control" id="description" type="text" placeholder="(optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <div className='m-2'>
                            <label className="form-label mt-4">Times</label>
                            <div>
                                <TimePicker.RangePicker className='text-primary' muse12Hours hourStep={1} minuteStep={15} format="h:mm a" placeHolder='Select a Start Time' onChange={onChange} />
                            </div>
                        </div>
                    </fieldset>
                    <div>
                        <button className='btn btn-primary border-success mt-3' onClick={() => { updateEvent() }}>Update Event</button>
                    </div>
                </div>
            </div>  
           

            <Modal size="lg" show={show} centered onHide={handleClose}>
                <Modal.Header >
                    <h3 className='text-center mx-auto'>What new Date do you want to select</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center flex-wrap text-center'>
                        {
                            dates.map((date) => (
                                <span className='btn btn-secondary p-2 m-1' onClick={() => {selectedNewDate(date)} }>
                                    {moment(date).format('MMMM Do YYYY')}
                                </span>
                                ))
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex '>
                        <Button className='m-1' variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditEvent; 