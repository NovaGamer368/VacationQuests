import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import LocationFlag from './vacation/LocationFlag';


const VacationList = () => {
    const [userVacations, setUserVacations] = useState(null)
    const [vacationList, setVacationList] = useState(null)
    const [loading, setLoading] = useState(true)
    const userId = Cookies.get('UserId')

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:7259/api/vacations")
            .then(resp => resp.json())
            .then(data => {
                console.log('Data Came back from vacations')
                setVacationList(data)
            })
            .catch(e => console.log(e))
    }, [])
    useEffect(() => {
        if (vacationList != null) {
            let tempArr = []
            console.log(vacationList)
            vacationList.forEach((vacation) => {
                if (vacation.owner === userId) {
                    tempArr.push(vacation)
                }
            })
            setUserVacations(tempArr)
        }
    }, [vacationList])

    useEffect(() => {
        if (userVacations != null) {
            setLoading(false)
        }
    }, [userVacations])

    if (!loading) {
        if (userVacations.length === 0) {
            return (
                <>
                    <h3>No Vacations Made</h3>
                </>
            );
        }
        else {

            return (
                <div>
                    <div className='d-flex justify-content-center flex-row flex-wrap'>
                        {
                            userVacations.map((vacation) => (
                                <div key={vacation.id} className='card btn btn-primary border-0 m-2 col-3 '>
                                    <div className='text-center h-100' onClick={() => { navigate(`/EditVacation?v=${vacation.id}`) }}>
                                        <h3 className='card-header'>{vacation.vacationTitle}</h3>
                                        <div className='card-body d-flex flex-column'>
                                            <p><b>Starts on:</b> {moment(vacation.startDate).format('MMMM Do YYYY')}</p>
                                            <p><b>End on: </b>{moment(vacation.endDate).format('MMMM Do YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className='card-footer'>
                                        <LocationFlag vacation={vacation} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
    }
    else {
        return (
            <>
                <h3>LOADING</h3>
                <CircularProgress />
            </>
        )
    }

};

export default VacationList; 