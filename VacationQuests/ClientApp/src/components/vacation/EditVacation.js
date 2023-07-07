﻿import React, { useEffect, useState } from 'react';
import GoogleCalendar from '../GoogleCalendar.js'

const EditVacation = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const [vacation, setVacation] = useState(null)

    useEffect(() => {
        for (const [key, value] of queryParams) {
            if (key == 'v')
            {
                fetch(`https://localhost:7259/api/vacations/${value}`)
                    .then(resp => resp.json())
                    .then(data => {
                        setVacation(data)
                    })
                    .catch(e => console.log(e))
            }
        }

    }, [])

    return (
        <>
            <GoogleCalendar />
        </>
    );
};

export default EditVacation; 