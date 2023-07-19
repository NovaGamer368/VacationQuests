import React, { useEffect, useState, useReducer } from 'react';
import moment from 'moment'
import { TimePicker } from 'antd';


const EditEvent = ({ selectedEvent, clearEdit }) => {
    const [eventName, setEventName] = useState(selectedEvent.eventName)
    const [location, setLocation] = useState(selectedEvent.location)
    const [time, setTime] = useState()
    const [startTime, setStartTime] = useState(selectedEvent.startTime)
    const [endTime, setEndTime] = useState(selectedEvent.endTime)
    const [description, setDescription] = useState(selectedEvent.description)

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
                    SelectedDate: selectedEvent.selectedDate
                }),
                origin: "https://localhost:44455"
            };

            fetch(`https://localhost:7259/api/events/${selectedEvent.id}`, requestOptions)
                .then(window.location.reload())
                .catch(e => console.log(e))
    }

    return (
        <>
            <div className='container text-center mt-5'>
                <div className='d-flex justify-content-center w-100'>
                    <button className='btn btn-secondary col-1 me-auto my-auto' onClick={()=>clearEdit(false)}>
                        <i class="bi bi-arrow-90deg-left"></i>
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
        </>
    );
};

export default EditEvent; 