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
                <div className='container'>
                    <div className='d-flex justify-content-center text-center'>
                        <button className='btn btn-secondary h-auto m-3 col-1' onClick={() => { setDaysSet(false) }}>
                            <i class="bi bi-arrow-90deg-left"></i>
                        </button>
                        <h1 className='col-12'>Collecting Start Date of Vacation</h1>
                        <div className='col-1'></div>
                    </div>
                    <div className='d-flex justify-content-center flex-column'>
                        <div className='d-flex flex-column my-5 col-12'>
                            <div className="md-form md-outline input-with-post-icon datepicker d-flex justify-content-center col-10 flex-column mx-auto">
                                <label htmlFor="startDate"><b>Select a date:</b></label>
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
                            <button className='btn btn-primary m-5 col-8 mx-auto' onClick={validateFilled}>Confirm dates</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {

        return (
            <>
                <div className='container'>
                    <div className='d-flex justify-content-center text-center'>
                        <button className='btn btn-secondary h-auto m-3 col-1' onClick={() => { clearLocationFound(false) }}>
                            <i class="bi bi-arrow-90deg-left"></i>
                        </button>
                        <h1 className='col-12'>Creating Vacation to {location}</h1>
                        <div className='col-1'></div>
                    </div>
                    <div className='d-flex-align justify-content-center text-center flex-column'>
                        <div className='mb-1'>How many days will you be visiting {location}</div>
                        <div class="input-group align-items-center d-flex  mt-3 w-50">
                            <input type="text" class="form-control col-8" placeholder="Number of days"
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                onChange={(e) => { setNumberOfDays(e.target.value) }}
                            />
                            <button class="btn btn-primary col-2" onClick={() => { submitDays(); }}>Submit</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default DateSelection; 