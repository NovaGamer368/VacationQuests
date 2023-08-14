import React, { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import MaterialUIPickers from './MaterialUIPickers';

const DateSelection = ({ location, clearLocationFound, createVacation }) => {
    const [numberOfDays, setNumberOfDays] = useState(0)
    const [daysSet, setDaysSet] = useState(false)

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [errorMsg, setErrorMsg] = useState('')
    const [value, setValue] = React.useState([null, null]);

    useEffect(() => {
        calculateNewDate()
    }, [startDate])

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

    return (
        <>
            <div className='container mt-5'>
                {/*<div className='d-flex justify-content-center text-center'>*/}
                {/*    <button className='btn btn-secondary h-auto m-3 col-1' onClick={() => { setDaysSet(false) }}>*/}
                {/*        <i class="bi bi-arrow-90deg-left"></i>*/}
                {/*    </button>*/}
                {/*    <h1 className='col-12'>Collecting Start Date of Vacation</h1>*/}
                {/*    <div className='col-1'></div>*/}
                {/*</div>*/}
                {/*<div className='d-flex justify-content-center flex-column'>*/}
                {/*    <div className='d-flex flex-column my-5 col-12'>*/}
                {/*        <div className="md-form md-outline input-with-post-icon datepicker d-flex justify-content-center col-10 flex-column mx-auto">*/}
                {/*            <label htmlFor="startDate"><b>Select a date:</b></label>*/}
                {/*            <input*/}
                {/*                className="form-control"*/}
                {/*                type="date"*/}
                {/*                id="startDate"*/}
                {/*                value={startDate}*/}
                {/*                onChange={(e) => { setStartDate(e.target.value) }}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*        {endDate && <p className='text-center'>The dates of the vacation would be from {startDate} till {endDate}.</p>}*/}
                {/*        <div className='text-danger text-center'>{errorMsg}</div>*/}
                {/*        <button className='btn btn-primary m-5 col-8 mx-auto' onClick={validateFilled}>Confirm dates</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className='d-flex flex-column justify-content-center text-center'>
                    <h1>Select the dates of your vacation!</h1>
                    <MaterialUIPickers startDate={setStartDate} endDate={setEndDate} />
                    <button className='btn btn-primary m-5 w-100 mx-auto' onClick={validateFilled}>Confirm dates</button>
                </div>

            </div>
        </>
    )
};

export default DateSelection; 