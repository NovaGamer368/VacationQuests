import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'


import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import DateAdapter from '@mui/lab/AdapterMoment';


//import AdapterMoment from '@mui/lab/AdapterMoment';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


export default function MaterialUIPickers({ startDate, endDate, startValue, endValue }) {
    //const [value, setValue] = React.useState()
    const [value, setValue] = React.useState([moment(), moment()]);
    React.useEffect(() => {
        if (startValue && endValue) {
            setValue([moment(startValue), moment(endValue)]);
        }
    }, [])


    React.useEffect(() => {
        value.forEach((date, index) => {
            if (index === 0) {
                startDate(date)
                console.log("days" + index + " :", moment(date)._d)
            }
            else {
                endDate(date)
                console.log("days" + index + " :", moment(date)._d)

            }
        })
    }, [value])

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className='bg-secondary text-light rounded p-5'>
                <DateRangePicker
                    value={value}
                    onChange={(newValue) => handleChange(newValue)}
                />
            </div>
        </LocalizationProvider>
    );
}
