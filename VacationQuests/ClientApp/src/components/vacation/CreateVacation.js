import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LocationSelector from './LocationSelector';
import { Form } from 'react-bootstrap';

const CreateVacation = () => {
    const [location, setLocation] = useState('')
    const [locationFound, setLocationFound] = useState(false)

    const [numberOfDays, setNumberOfDays] = useState(0)
    const [daysSet, setDaysSet] = useState(false)

    useEffect(() => {
       
    }, [])

    const submitDays = () => {
        setDaysSet(true)
    }

    if (locationFound)
    {
        if (daysSet) {
            return (
                <>
                    <div>
                        <h1>Collecting Start Date of Vacation</h1>                   
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