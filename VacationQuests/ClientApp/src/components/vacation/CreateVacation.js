import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LocationSelector from './LocationSelector';
import DateSelection from './DateSelection';

const CreateVacation = () => {
    const [location, setLocation] = useState('')
    const [locationFound, setLocationFound] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        fetch(`https://localhost:7259/api/users/${Cookies.get("UserId")}`)
            .then(resp => resp.json())
            .then(data => {
                setCurrentUser(data)
            })
            .catch(e => console.log(e))
    }, [])

    const createVacation = (startDate, endDate) => {
        //Check if someone is actually logged in
        if (currentUser !== null) {
            console.log('is logged in')
            // Check if location, startDate, and endate variables are there
            if (location != '') {
                console.log("Creating Vacation")
                //Create the vacation
                const requestOptions = {
                    mode: 'cors',
                    method: 'Post',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        VacationTitle: location + ' Vacation',
                        Owner: currentUser.id,
                        StartDate: startDate,
                        EndDate: endDate,
                        planners: [currentUser.id]
                    }),
                    origin: "https://localhost:44455"
                };

                fetch("https://localhost:7259/api/vacations", requestOptions)
                    .then(resp => resp.json())
                    .then(data => {
                        updateUser(data)
                    })
                    .catch(e => console.log(e))
            }
        }
        else {
            console.log('Failed')
        }
    }
    const updateUser = (data) => {
        let tempArr = new Array()
        if (currentUser.vacations != null) {
            tempArr = currentUser.vacations
        }
        tempArr.push(data.id)
        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: currentUser.email,
                password: currentUser.password,
                icon: currentUser.icon,
                bio: currentUser.bio,
                Vacations: tempArr,
                othersVacations: currentUser.othersVacations,
                friends: currentUser.friends
            }),
            origin: "https://localhost:44455"
        };
        fetch(`https://localhost:7259/api/users/${Cookies.get('UserId')}`, requestOptions)
            .then(resp => resp.json())
            .then(window.location.href = '/')
            .catch(e => console.log(e))
    }


    if (locationFound) {
        return (
            <>
                <DateSelection location={location} clearLocationFound={setLocationFound} createVacation={createVacation} />
            </>
        )
    }
    else {
        return (
            <>
                <div className='container text-center'>
                    <h1>Creating Vacation</h1>
                    <LocationSelector location={setLocation} locationFound={setLocationFound} />
                </div>
            </>
        )
    }
};

export default CreateVacation; 