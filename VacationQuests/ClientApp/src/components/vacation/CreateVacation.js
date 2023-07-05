import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LocationSelector from './LocationSelector';

const CreateVacation = () => {
    const [location, setLocation] = useState('')
    const [locationFound, setLocationFound] = useState(false)

    useEffect(() => {
       
    }, [])

    if (locationFound)
    {
        return (
            <>
               <h1>Creating Vacation :)</h1> 
            </>
        );
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