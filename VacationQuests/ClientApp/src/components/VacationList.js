﻿import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import LocationFlag from './vacation/LocationFlag';
import Tooltip from '@mui/material/Tooltip';

const VacationList = ({ history }) => {
    const [userVacations, setUserVacations] = useState(null)
    const [vacationList, setVacationList] = useState(null)
    const [loading, setLoading] = useState(true)
    const [upcomingVacations, setUpcomingVacations] = useState([])
    const [shownNumber, setShownNumber] = useState(6)
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
            tempArr.sort((a, b) => moment(a.startDate)._d - moment(b.startDate)._d)
            setUserVacations(tempArr)
        }
    }, [vacationList])

    useEffect(() => {
        if (userVacations != null) {

            let currentArr = []
            let today = new Date
            userVacations.forEach((vacation) => {
                if (moment(vacation.endDate)._d > moment(today)._d) {
                    currentArr.push(vacation)
                }
            })
            console.log('current:', currentArr)
            setUpcomingVacations(currentArr)
            setLoading(false)
        }
    }, [userVacations])

    const showMore = () => {
        let number = shownNumber + 6
        setShownNumber(number)
    }

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
                    {
                        history ? 
                            <div className='d-flex justify-content-center flex-row flex-wrap'>
                                {
                                    userVacations.map((vacation, index) => (
                                        <>
                                            {
                                                index < shownNumber ?
                                                    <Tooltip title={"View " + vacation.vacationTitle}>
                                                        <div key={vacation.id
                                                        } className='card btn btn-secondary border-primary m-2 col-3' onClick={() => { navigate(`/EditVacation?v=${vacation.id}`) }}>

                                                            <div className='text-center h-100' >
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
                                                    </Tooltip>

                                                    :
                                                    <>
                                                        {
                                                            index === shownNumber ?
                                                                <Tooltip title="Show more vacations" postion='top'>
                                                                    <button className='col-12 btn btn-primary' onClick={showMore}>Show more</button>
                                                                </Tooltip>
                                                                :
                                                                <></>
                                                        }
                                                    </>
                                            }
                                        </>
                                    ))
                                }
                            </div>
                            :
                            <div className='d-flex justify-content-center flex-row flex-wrap'>
                                {
                                    <>
                                        {
                                            upcomingVacations.length !== 0 ?
                                                upcomingVacations.map((vacation, index) => (
                                                    <>
                                                        {
                                                            index < shownNumber ?
                                                                <Tooltip title={"View " + vacation.vacationTitle}>
                                                                    <div key={vacation.id
                                                                    } className='card btn btn-secondary border-primary m-2 col-3' onClick={() => { navigate(`/EditVacation?v=${vacation.id}`) }}>

                                                                        <div className='text-center h-100' >
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
                                                                </Tooltip>
                                                                :
                                                                <>
                                                                    {
                                                                        index === shownNumber ?
                                                                            <Tooltip title="Show more vacations" postion='top'>
                                                                                <button className='col-12 btn btn-primary' onClick={showMore}>Show more</button>
                                                                            </Tooltip>
                                                                            :
                                                                            <></>
                                                                    }
                                                                </>
                                                        }
                                                    </>
                                                ))
                                                :
                                                <><h2>No planned vacations coming up</h2></>
                                        }
                                    </>
                                }
                            </div>
                    }
                   
                </div >
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