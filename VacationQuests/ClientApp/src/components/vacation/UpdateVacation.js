import React, { useEffect, useState } from 'react';
import moment from 'moment'
import MaterialUIPickers from './MaterialUIPickers';


const UpdateVacation = ({ vacation, closeUpdate }) => {
    const [title, setTitle] = useState(vacation.vacationTitle)
    const [startDate, setStartDate] = useState(vacation.startDate)
    const [endDate, setEndDate] = useState(vacation.endDate)
    const [events, setEvents] = useState([])
    const [eventsId, setEventsId]= useState(vacation.events)
    const [errorMessage, setErrorMessage] = useState('')
    const [numberOfDays, setNumberOfDays] = useState()

    useEffect(() => {
        let tempArray = []
        if (eventsId) {
            eventsId.forEach((eventId) => {
                fetch(`https://localhost:7259/api/events/${eventId}`)
                    .then(resp => resp.json())
                    .then(data => {
                            tempArray.push(data)
                            setEvents(tempArray)
                    })
                    .catch(e => console.log(e))
            })
        }
    }, [])

    useEffect(() => {
        const a = moment(startDate)
        const b = moment(endDate);
        setNumberOfDays(b.diff(a, 'days'))
    }, [startDate]) 

    //const calculateNewDate = () => {
    //    const selectedDateObj = new Date(startDate);
    //    const newDateObj = new Date(selectedDateObj.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
    //    const newDateStr = newDateObj.toISOString().slice(0, 10);
    //    setEndDate(newDateStr);
    //};

    //UPDATE
    const updateVacation = () => {
        //Validation that fields are filled
        console.log('startDate check: ', moment(startDate)._i !== moment(vacation.startDate)._i)
        console.log('endDate check: ', moment(endDate).format('MMMM Do YYYY') !== moment(vacation.endDate).format('MMMM Do YYYY'))
        
        if (moment(startDate)._i !== moment(vacation.startDate)._i
            && moment(endDate).format('MMMM Do YYYY') !== moment(vacation.endDate).format('MMMM Do YYYY')) {
            console.log('Updating Vacation... ')
            setErrorMessage('')

            //Get the new number of days they want to plan the trip for
            const a = moment(startDate)
            const b = moment(vacation.startDate);
            console.log(a.diff(b, 'days'))
            if (events) {

                events.forEach((event) => {
                    event.selectedDate = moment(newDate(event.selectedDate, a.diff(b, 'days')))._i
                    event.startTime = moment(newDate(event.startTime, a.diff(b, 'days')))._d
                    event.endTime = moment(newDate(event.endTime, a.diff(b, 'days')))._d
                })
                console.log("events after changes:", events)

                events.forEach((event) => {
                    const requestOptions = {
                        mode: 'cors',
                        method: 'PUT',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            EventName: event.eventName,
                            Location: event.location,
                            description: event.description, 
                            selectedDate: event.selectedDate,
                            startTime: event.startTime,
                            endTime: event.endTime
                        }),
                        origin: "https://localhost:44455"
                    };
                    fetch(`https://localhost:7259/api/events/${event.id}`, requestOptions)
                    ////fetch(`https://localhost:7259/api/events/64b5c435e13549fada8286d9`, requestOptions)
                        .then(console.log('Updated: ', event.id))
                        .catch(e => console.log(e))                
                })
            }

            let requestOptions;
            if (eventsId) {
                 requestOptions = {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        VacationTitle: title,
                        Location: vacation.location,
                        events: eventsId,
                        owner: vacation.owner,
                        planners: vacation.planners,
                        startDate: startDate,
                        endDate: endDate
                    }),
                    origin: "https://localhost:44455"
                };
            }
            else {
                 requestOptions = {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        VacationTitle: title,
                        location: vacation.location,
                        events: [],
                        owner: vacation.owner,
                        planners: vacation.planners,
                        startDate: startDate,
                        endDate: endDate
                    }),
                    origin: "https://localhost:44455"
                };
            }
            //Update the vacation object
            fetch(`https://localhost:7259/api/vacations/${vacation.id}`, requestOptions)
                .then(window.location.reload())
                .catch(e => console.log(e))   
        }
        else {
            setErrorMessage('Please select a new date for the vacation to update!')
        }
    }
    const newDate = (date, days) => {
        const selectedDateObj = new Date(date);
        const newDateObj = new Date(selectedDateObj.getTime() + days * 24 * 60 * 60 * 1000);
        return newDateObj;
    }

    return (
        <div className='text-center'>
            <h4>Updating...</h4>
            <div className="form-group mb-5">
                <label className="col-form-label col-form-label-lg" htmlFor="inputLarge">Event Title</label>
                <input className="form-control form-control-lg" maxLength='40' type="text" value={ title } placeholder="Event Title" id="inputLarge" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="md-form md-outline input-with-post-icon datepicker d-flex justify-content-center col-10 flex-column mx-auto">
                <label htmlFor="startDate"><b>New Dates</b></label>
                <MaterialUIPickers startDate={setStartDate} endDate={setEndDate} startValue={startDate} endValue={ endDate } />
            </div>
            {endDate && <p className='text-center mb-3'>The dates of the vacation would be from <br/> { moment(startDate).format('MMMM Do YYYY') } till { moment(endDate).format('MMMM Do YYYY') }.</p>}
            <div className='text-danger text-center '>{errorMessage}</div>
            <div>
                <button className='btn btn-info m-2 col-5' onClick={() => { updateVacation() } }>Update</button>
                <button className="btn btn-secondary col-5 m-2" onClick={() => { closeUpdate(false) } }>Cancel</button>
            </div>
        </div>
    );
};

export default UpdateVacation; 