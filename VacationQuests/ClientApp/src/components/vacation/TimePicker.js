import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import moment from 'moment'

export default function TimePicker({ time, setTime }) {
    const [value, setValue] = React.useState(moment(time));
    const theme = createTheme({ palette: { primary: { main: '#593196' } } });

    React.useEffect(() => {
        if (value) {
            setTime(value._d)
        }
    }, [value])

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <ThemeProvider theme={theme}>
                <StaticTimePicker
                    ampm
                    className=''
                    minutesStep='5'
                    orientation="portrait"
                    value={value}
                    slotProps={{
                        toolbar: {backgroundColor: '#593196'},
                        nextIconButton: { sx: { display: 'none' } },
                        previousIconButton: { sx: { display: 'none' } },
                        actionBar: { actions: [] },
                    }}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </ThemeProvider>
        </LocalizationProvider>
    );
}