import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import EventsDisplay from './EventsDisplay';

const EditVacation = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const [vacation, setVacation] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [dates, setDates] = useState([]);

    const navigate = useNavigate();

    //On start
    useEffect(() => {
        getVacation();
    }, [])

    //Vacation Changes
    useEffect(() => {
        console.log('vacation ', vacation)
        if (vacation) {
            initDates()
            if (vacation.events) {
                getEvents();
            }
        }
    }, [vacation])

    //Gets vacation through ID passed in param
    const getVacation = async () => {
        for (const [key, value] of queryParams) {
            if (key == 'v') {
                await fetch(`https://localhost:7259/api/vacations/${value}`)
                    .then(resp => resp.json())
                    .then(data => {
                        setVacation(data)
                        setStartDate(data.startDate)
                        setEndDate(data.endDate)
                    })
                    .catch(e => console.log(e))
            }
        }       
    }
    //Matching events for this vacation
    const getEvents = () => {
        
    }

    //Sets the dates according to how many days the vacation has been planned for
    const initDates = () => {
        let loop = true;
        let date = new Date(startDate);
        const end = new Date(endDate)
        let dateList = []

        while (loop) {
            if (date.toISOString().slice(0, 10) == end.toISOString().slice(0, 10)) {
                loop = false
            }
            dateList.push(date)
            date = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
            
        }
        console.log('date list data: ', dateList)
        setDates(dateList)
    }

    //Object rendering on the fron end
    if (vacation) {
            return (
                <div className='text-center' >
                    <h1>Dates of Vacation</h1>
                    <br /><hr />
                    <div className='d-flex justify-content-center flex-wrap'>
                        {
                            dates.map((date) => (
                                <div className='card border-secondary m-3 p-2'>
                                    <h2>{moment(date).format('MMMM Do YYYY')}</h2>
                                    <hr />
                                    <h4>Events</h4>
                                    {/*Iterate through all events that happen on this day*/}
                                    <EventsDisplay date={date} events={ vacation.events } />
                                    <hr />
                                    <p>Add a new Event?</p>
                                    <button className="btn btn-secondary mx-1 mb-2" onClick={() => navigate(`/CreateEvent?v=${vacation.id}&d=${moment(date)}`)}><i className="bi bi-plus-lg"></i></button>
                                </div>
                            ))

                        }
                    </div>
                </div>
            );
    }
    else {
        return (<div>Loading Vacation</div>)
    }
};

export default EditVacation; 