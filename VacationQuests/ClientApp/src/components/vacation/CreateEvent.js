import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
//import { TimePicker } from 'antd';
import TimePicker from './TimePicker';
import GoogleAutoComplete from './GoogleAutoComplete';
import ChatGPTList from './ChatGPTList';
import Chatbot from './ChatBot';



const CreateEvent = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const [vacation, setVacation] = useState()
    const [selectedDate, setSelectedDate] = useState()

    const [eventName, setEventName] = useState()
    const [location, setLocation] = useState()
    const [locationFilter, setLocationFilter] = useState()
    const [loadFilter, setLoadFilter] = useState(false)
    //const [time, setTime] = useState()
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [description, setDescription] = useState('')

    const [error, setError] = useState('');
    const navigate = useNavigate();

    //Start
    useEffect(() => {
        init()
    }, [])
    //Time Change
    //useEffect(() => {
    //    if (time) {
    //        let start = new Date(startTime)
    //        start.setHours(time[0].$H)
    //        start.setMinutes(time[0].$m)
    //        setStartTime(start)

    //        let end = new Date(endTime)
    //        end.setHours(time[1].$H)
    //        end.setMinutes(time[1].$m)
    //        setEndTime(end)
    //    }
    //}, [time])
    //Selected Date Change
    useEffect(() => {
        setStartTime(selectedDate)
        setEndTime(selectedDate)
    }, [selectedDate])

    useEffect(() => {
        if (vacation) {
            let api_url = `https://restcountries.com/v3.1/name/${vacation.location}?fullText=true`

            fetch(api_url)
                .then(resp => resp.json())
                .then(data => {
                    //SORT DATA RETURNED
                    //console.log('data: ', data)
                    setLocationFilter(data)
                    setLoadFilter(true)
                })
                .catch(e => console.log(e))
        }
    },[vacation])
    useEffect(() => {
        if (location) {
            //console.log(location)
        }
    }, [location])

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
    //const onChange = (time) => {
    //    setTime(time);
    //};

    const createEvent = () => {
        if (eventName && location != undefined && startTime != selectedDate && endTime != selectedDate) {
            setError('Success')

            const requestOptions = {
                mode: 'cors',
                method: 'POST',
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
            console.log(startTime.toISOString())

            fetch(`https://localhost:7259/api/events`, requestOptions)
                .then(resp => resp.json())
                .then(data => {
                    console.log('Inputting data to vacation: ', data)
                    updateVacation(data.id)
                })
                .catch(e => console.log(e))
        }
        else {
            setError('Required Fields need to be filled')
        }            
    }
    const updateVacation = (data) => {
        let tempArr = new Array()
        if (vacation.events != null) {
            tempArr = vacation.events   
        }
        tempArr.push(data)
        console.log(tempArr)
        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                VacationTitle: vacation.vacationTitle,
                StartDate: vacation.startDate,
                Location: vacation.location,
                EndDate: vacation.endDate,
                owner: vacation.owner,
                planners: vacation.planners,
                events: tempArr
            }),
            origin: "https://localhost:44455"
        };

        

        fetch(`https://localhost:7259/api/vacations/${vacation.id}`, requestOptions)
            //.then(resp => resp.json())
            //.then(resp => console.log(resp))
            .then(navigate(`/EditVacation?v=${vacation.id}`))
            .catch(e => console.log(e))
    }

    if (vacation && selectedDate && loadFilter) {
        return (
            <div className='container text-center mt-5'>
                <div className='d-flex justify-content-center w-100'>
                    <button className='btn btn-secondary col-1 me-auto my-auto' onClick={() => { navigate(-1) }}>
                        <i className="bi bi-arrow-90deg-left"></i>
                    </button>
                    <h1 className='col-12 text-center me-auto'>Creating Event on {moment(selectedDate).format('MMMM Do YYYY')}</h1>
                    <div className='col-1'></div>
                </div>
                <h3 className='text-warning'>{error}</h3>
                <div className="form-group mb-5">
                    <label className="col-form-label col-form-label-lg mt-4" htmlFor="inputLarge">Event Title</label>
                    <input className="form-control form-control-lg" maxLength='40' type="text" placeholder="Event Title" id="inputLarge" onChange={(e) => setEventName(e.target.value)} />
                </div>
                <div className="card m-3 border-danger p-5">
                    <fieldset>
                        <GoogleAutoComplete locationVar={location} setLocationVar={setLocation} filter={locationFilter[0].cca2} />
                    </fieldset>
                    <fieldset>
                        <label className="form-label mt-4" htmlFor="description">Description of Event</label>
                        <textarea className="form-control" id="description" maxLength='240' type="text" placeholder="(optional)" onChange={(e) => setDescription(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <div className='m-2'>
                            <label className="form-label mt-4">Times</label>
                            <div className='row'>
                                {/*<TimePicker.RangePicker className='text-primary' muse12Hours hourStep={1} minuteStep={15} format="h:mm a" placeHolder='Select a Start Time' onChange={onChange} />*/}
                                <div className='col-6'>
                                    <h3>Start Time</h3>
                                    <TimePicker time={startTime} setTime={setStartTime} />
                                </div>
                                <div className='col-6'>
                                    <h3>End Time</h3>
                                    <TimePicker time={endTime} setTime={setEndTime} />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div>
                        <button className='btn btn-primary border-danger mt-3' onClick={() => { createEvent() } }>Create Event</button>
                    </div>
                </div>
                <ChatGPTList vacation={vacation} />
                {/*<Chatbot />*/}
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