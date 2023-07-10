import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment'

import { TimePicker } from 'antd';


const CreateEvent = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const [vacation, setVacation] = useState()
    const [selectedDate, setSelectedDate] = useState()

    const [eventName, setEventName] = useState()
    const [location, setLocation] = useState()
    const [time, setTime] = useState()
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [description, setDescription] = useState()

    //Start
    useEffect(() => {
        init()
    }, [])
    //Time Change
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
        }
    }, [time])
    //Selected Date Change
    useEffect(() => {
        setStartTime(selectedDate)
        setEndTime(selectedDate)
    }, [selectedDate])

    const init = async () => {
        //Getting params
        for (const [key, value] of queryParams) {
            if (key == 'v') {
                await fetch(`https://localhost:7259/api/vacations/${value}`)
                    .then(resp => resp.json())
                    .then(data => {
                        setVacation(data)
                    })
                    .catch(e => console.log(e))
            }
            if (key == 'd') {
                setSelectedDate(new Date(value))
                
            }
        }

    }
    const onChange = (time) => {
        setTime(time);
    };

    if (vacation && selectedDate) {
        return (
            <div className='text-center'>
                <h1>Creating Event on {moment(selectedDate).format('MMMM Do YYYY')}</h1>
                <div class="form-group mb-5">
                    <label class="col-form-label col-form-label-lg mt-4" for="inputLarge">Event Title</label>
                    <input class="form-control form-control-lg" type="text" placeholder="Event Title" id="inputLarge" onChange={(e) => setEventName(e.target.value)} />
                </div>
                <div class="card m-3 border-warning p-5">
                    <fieldset>
                        <label class="form-label" for="location">Where is the event happening?</label>
                        <input class="form-control" id="location" type="text" placeholder="Location / Address" onChange={(e) => setLocation(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <label class="form-label mt-4" for="description">Description of Event</label>
                        <input class="form-control" id="description" type="text" placeholder="(optional)" onChange={(e) => setDescription(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <div className='m-2'>
                            <label class="form-label mt-4">Times</label>
                            <div>
                                <TimePicker.RangePicker className='text-primary' muse12Hours hourStep={1} minuteStep={15} format="h:mm a" placeHolder='Select a Start Time' onChange={onChange} />
                            </div>
                        </div>
                    </fieldset>
                    <div>
                    </div>
                </div>
                <p>{eventName}</p>
                <p>{location}</p>
                <p>{description} </p>
                

            </div>
        );
    }
    else {
        return (
            <>
                <h1>Creating Event</h1>
            </>
        );
    }
};

export default CreateEvent; 