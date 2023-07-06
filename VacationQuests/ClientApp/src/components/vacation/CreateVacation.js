import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LocationSelector from './LocationSelector';
import { Form } from 'react-bootstrap';

const CreateVacation = () => {
    const [location, setLocation] = useState('')
    const [locationFound, setLocationFound] = useState(false)

    const [numberOfDays, setNumberOfDays] = useState(0)
    const [daysSet, setDaysSet] = useState(false)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)


    useEffect(() => {
       
    }, [])

    const submitDays = () => {
        setDaysSet(true)
    }

    const setDates = (e) => {
        const inputDate = new Date(e);
        setStartDate(inputDate)

        const increasedDate = new Date(inputDate.setDate(inputDate.getDate() + numberOfDays));
        setEndDate(increasedDate.toISOString().split("T")[0]);

        //setEndDate(startDate.getDate() + numberOfDays)
        //console.log(endDate)
    }

    const calculateNewDate = () => {
        const selectedDateObj = new Date(startDate);
        const newDateObj = new Date(selectedDateObj.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
        const newDateStr = newDateObj.toISOString().slice(0, 10);
        setEndDate (newDateStr);
    };

    if (locationFound)
    {
        if (daysSet) {
            return (
                <>
                    <div className='d-flex justify-content-center flex-column'>
                        <h1>Collecting Start Date of Vacation</h1> 
                        <div className='d-flex flex-column my-5'>
                            <div className=" md-form md-outline input-with-post-icon datepicker">
                                <label  htmlFor="startDate">Select a date:</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => { setStartDate(e.target.value) } }
                                />
                            </div>
                            <button className='btn btn-primary m-5' onClick={calculateNewDate}>Get Date {numberOfDays} Days Later</button>
                            {endDate && <p className='text-center'>The dates of the vacation would be from {startDate} till {endDate}.</p>}
                        </div>
                    </div>
                </>
            )
        }
        else {

            return (
                <>
                    <div>
                        <button className='btn btn-secondary h-auto m-3' onClick={() => { setLocationFound(false) } }>
                            <i class="bi bi-arrow-90deg-left"></i> 
                        </button>
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <h1>Creating Vacation to {location}</h1> 
                            <div>
                                <div>How many days will you be visiting {location}</div>
                                <div class="input-group mb-3 w-75">
                                    <input type="text" class="form-control" placeholder="Number of days"
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => { setNumberOfDays(e.target.value); console.log(numberOfDays) }}      
                                    />
                                    <button class="btn btn-primary" onClick={() => { submitDays(); } }>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    else
    {
        return (
            <>                
                <div className='text-center'>
                    <h1>Creating Vacation</h1>
                    <LocationSelector location={setLocation} locationFound={setLocationFound} />
                </div>
            </>
        )
    }
};

export default CreateVacation; 