import React, { useEffect, useState } from 'react';
import moment from 'moment'


const UpdateVacation = ({ vacation }) => {
    const [title, setTitle] = useState(vacation.vacationTitle)
    const [startDate, setStartDate] = useState(vacation.startDate)
    const [endDate, setEndDate] = useState(vacation.endDate)
    const [errorMessage, setErrorMessage] = useState('')
    const [numberOfDays, setNumberOfDays] = useState()

    useEffect(() => {
        const a = moment(startDate)
        const b = moment(endDate);
        setNumberOfDays( b.diff(a, 'days'))
    }, [])

    useEffect(() => {
        if (numberOfDays) {
            calculateNewDate()
        }
    }, [startDate])

    const calculateNewDate = () => {
        const selectedDateObj = new Date(startDate);
        const newDateObj = new Date(selectedDateObj.getTime() + numberOfDays * 24 * 60 * 60 * 1000);
        const newDateStr = newDateObj.toISOString().slice(0, 10);
        setEndDate(newDateStr);
    };

    return (
        <div className='text-center'>
            <h4>Updating...</h4>
            <div className="form-group mb-5">
                <label className="col-form-label col-form-label-lg" for="inputLarge">Event Title</label>
                <input className="form-control form-control-lg" type="text" placeholder="Event Title" id="inputLarge" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="md-form md-outline input-with-post-icon datepicker d-flex justify-content-center col-10 flex-column mx-auto">
                <label htmlFor="startDate"><b>New Dates</b></label>
                <input
                    className="form-control"
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value) }}
                />
            </div>
            {endDate && <p className='text-center'>The dates of the vacation would be from <br/> { moment(startDate).format('MMMM Do YYYY') } till { moment(endDate).format('MMMM Do YYYY') }.</p>}
            <div className='text-danger text-center'>{errorMessage}</div>
        </div>
    );
};

export default UpdateVacation; 