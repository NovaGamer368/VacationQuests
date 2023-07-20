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


export default function MaterialUIPickers() {
    //const [value, setValue] = React.useState()
    const [value, setValue] = React.useState([moment(), moment()]);

    React.useEffect(() => {
        value.forEach((date) => {
            console.log(moment(date)._d)
        })
    }, [value])

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <div  className='bg-light p-5'        >
                
                {/*<DemoItem label="Static variant" component="StaticDateRangePicker">*/}
                {/*    <StaticDateRangePicker*/}
                {/*        defaultValue={[moment('2022-04-17'), moment('2022-04-21')]}*/}
                {/*        sx={{*/}
                {/*            [`.${pickersLayoutClasses.contentWrapper}`]: {*/}
                {/*                alignItems: 'center',*/}
                {/*            },*/}
                {/*        }}*/}
                {/*        onChange={(e) => handleChange }*/}
                {/*    />*/}
                {/*</DemoItem>*/}


                {/*<DatePicker*/}
                {/*    label="Controlled picker"*/}
                {/*    value={value}*/}
                {/*    onChange={(newValue) => handleChange(newValue)}*/}
                {/*/>*/}

                {/*<DesktopDateRangePicker*/}
                {/*    startText="Desktop start"*/}
                {/*    value={value}*/}
                {/*    onChange={(newValue) => {*/}
                {/*        setValue(newValue);*/}
                {/*    }}*/}
                {/*    renderInput={(startProps, endProps) => (*/}
                {/*        <React.Fragment>*/}
                {/*            <TextField {...startProps} />*/}
                {/*            <Box sx={{ mx: 2 }}> to </Box>*/}
                {/*            <TextField {...endProps} />*/}
                {/*        </React.Fragment>*/}
                {/*    )}*/}
                {/*/>*/}

                <DateRangePicker
                    value={value}
                    onChange={(newValue) => handleChange(newValue)}
                />

            </div>
        </LocalizationProvider>
    );
}
