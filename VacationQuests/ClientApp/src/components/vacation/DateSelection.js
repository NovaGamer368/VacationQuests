import React, { useEffect, useState } from 'react';

const DateSelection = ({ location, clearLocationFound, createVacation }) => {
    const [numberOfDays, setNumberOfDays] = useState(0)
    const [daysSet, setDaysSet] = useState(false)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        calculateNewDate()
    }, [startDate])

    const submitDays = () => {
        setDaysSet(true)
    }

    const calculateNewDate = () => {
        const selectedDateObj = new Date(startDate);
        const newDateObj = new Date(selectedDateObj.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
        const newDateStr = newDateObj.toISOString().slice(0, 10);
        setEndDate(newDateStr);
    };

    const validateFilled = () => {
        if (startDate != null && endDate != null) {
            createVacation(startDate, endDate)
        }
        else { setErrorMsg('Please select a start date') }
    }

    if (daysSet) {
        return (
            <>
                <div>
                    <button className='btn btn-secondary h-auto m-3' onClick={() => { setDaysSet(false) }}>
                        <i class="bi bi-arrow-90deg-left"></i>
                    </button>
                    <div className='d-flex justify-content-center flex-column'>
                        <h1>Collecting Start Date of Vacation</h1>
                        <div className='d-flex flex-column my-5'>
                            <div className=" md-form md-outline input-with-post-icon datepicker">
                                <label htmlFor="startDate">Select a date:</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => { setStartDate(e.target.value) }}
                                />
                            </div>
                            {endDate && <p className='text-center'>The dates of the vacation would be from {startDate} till {endDate}.</p>}
                            <div className='text-danger text-center'>{errorMsg}</div>
                            <button className='btn btn-primary m-5' onClick={validateFilled}>Confirm dates</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {

        return (
            <>
                <div>
                    <button className='btn btn-secondary h-auto m-3' onClick={() => { clearLocationFound(false) }}>
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
                                    onChange={(e) => { setNumberOfDays(e.target.value)}}
                                />
                                <button class="btn btn-primary" onClick={() => { submitDays(); }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default DateSelection; 