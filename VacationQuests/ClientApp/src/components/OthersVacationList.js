import React, { useEffect, useState, useReducer } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';


const OthersVacationList = () => {
    const [user, setUser] = useState(null)
    const [userVacations, setUserVacations] = useState(null)
    const [vacationList, setVacationList] = useState(null)
    const [loading, setLoading] = useState(true)
    const userId = Cookies.get('UserId')

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://localhost:7259/api/vacations")
            .then(resp => resp.json())
            .then(data => {
                setVacationList(data)
            })
            .catch(e => console.log(e))
        fetch(`https://localhost:7259/api/users/${userId}`)
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
            })
            .catch(e => console.log(e))

    }, [])
    useEffect(() => {
        if (vacationList != null && user != null) {
            let tempArr = []
            console.log(vacationList)
            vacationList.forEach((vacation) => {
                //console.log(vacation.id, user.othersVacations.includes(vacation.id))
                if (user.othersVacations.includes(vacation.id)) {
                    tempArr.push(vacation)
                }
            })
            setUserVacations(tempArr)
        }
    }, [vacationList, user])

    useEffect(() => {
        if (userVacations != null) {
            setLoading(false)
        }
    }, [userVacations])

    if (!loading) {
        if (vacationList.length === 0) {
            return (
                <>
                    <h3>No vacations shared with you</h3>
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

export default OthersVacationList; 