import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import moment from 'moment'

export default function TimePicker({time, setTime}) {
    const [value, setValue] = React.useState(moment(time));

    React.useEffect(() => {
        if (value) {
            setTime(value._d)
        }
    }, [value])

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticTimePicker
                ampm
                orientation="landscape"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                componentsProps={{ actionBar: { actions: [] } }}
            />
        </LocalizationProvider>
    );
}