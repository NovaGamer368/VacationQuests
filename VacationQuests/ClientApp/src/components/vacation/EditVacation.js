import React, { useEffect, useState, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import EventsDisplay from './EventsDisplay';
import Accordion from 'react-bootstrap/Accordion';
import VacationChangeOptions from './VacationChangeOptions';
import CircularProgress from '@mui/material/CircularProgress';



const EditVacation = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const [vacation, setVacation] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [dates, setDates] = useState([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const navigate = useNavigate();

    //On start
    useEffect(() => {
        getVacation();
    }, [])

    //Vacation Changes
    useEffect(() => {
        if (vacation) {
            initDates()
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
                        forceUpdate()
                    })
                    .catch(e => console.log(e))
            }
        }
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
        setDates(dateList)
    }

    //Object rendering on the fron end
    if (vacation) {
        return (
            <div className='card-primary w-100'>
                <div className='container text-center mt-5' >
                    <div className='d-flex-align justify-content-center'>
                        <button className='btn btn-secondary col-1 me-auto' onClick={() => { navigate(-1) }}>
                            <i className="bi bi-arrow-90deg-left"></i>
                        </button>
                        <h1 className='text-center col-12 me-auto'>{vacation.vacationTitle} Plans</h1>
                        <div className='col-1 me-auto'>
                            <VacationChangeOptions vacation= {vacation}/>
                        </div>
                    </div>
                    <hr />
                </div>
                <div>
                    <div className='d-flex justify-content-center flex-wrap mt-3 col-12'>
                        {
                            dates.map((date) => (
                                <div className='card col-md-2 me-1 mb-1 text-center'>
                                    <h2 className='card-header'>{moment(date).format('MMMM Do YYYY')}</h2>
                                    <div className='card-body d-flex flex-column border-secondary '>
                                        <Accordion className='mb-3' defaultActiveKey="0">
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Events</Accordion.Header>
                                                <Accordion.Body>
                                                    <EventsDisplay date={date} events={vacation.events} update={forceUpdate} vacation={ vacation } />
                                                    <div className='card p-1 border border-light mt-auto'>
                                                        <p>Add a new Event?</p>
                                                        <button type='button' className='align-self-end  btn btn-lg btn-secondary w-100' onClick={() => navigate(`/CreateEvent?v=${vacation.id}&d=${moment(date)}`)}><i className="bi bi-plus-lg"></i></button>
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <>
                <div>Loading Vacation</div>
                <CircularProgress />
            </>
        )
    }
};

export default EditVacation; 