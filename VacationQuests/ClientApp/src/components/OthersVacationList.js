import React, { useEffect, useState, useReducer } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import LocationFlag from './vacation/LocationFlag';
import Tooltip from '@mui/material/Tooltip';


const OthersVacationList = ({history}) => {
    const [user, setUser] = useState(null)
    const [userVacations, setUserVacations] = useState(null)
    const [vacationList, setVacationList] = useState(null)
    const [upcomingVacations, setUpcomingVacations] = useState([])
    const [loading, setLoading] = useState(true)
    const [shownNumber, setShownNumber] = useState(6)
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
                if (user.othersVacations) {
                    //console.log(vacation.id, user.othersVacations.includes(vacation.id))
                    if (user.othersVacations.includes(vacation.id)) {
                        tempArr.push(vacation)
                    }
                }                
            })
            tempArr.sort((a, b) => moment(a.startDate)._d - moment(b.startDate)._d)
            setUserVacations(tempArr)
        }
    }, [vacationList, user])

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
        if (userVacations.length === 0 || userVacations === null) {
            return (
                <>
                    <h3>No vacations shared with you</h3>
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
                                                        } className='card btn btn-secondary border-primary m-2 col-3' >

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
                                                    </Tooltip>

                                                    :
                                                    <>
                                                        {
                                                            index === shownNumber + 1 ?
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
                                <>
                                    {
                                        upcomingVacations.length !== 0 ? 
                                            <>
                                                {
                                                    upcomingVacations.map((vacation, index) => (
                                                        <>
                                                            {
                                                                index < shownNumber ?
                                                                    <Tooltip title={"View " + vacation.vacationTitle}>
                                                                        <div key={vacation.id
                                                                        } className='card btn btn-secondary border-primary m-2 col-3' >

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
                                                                    </Tooltip>

                                                                    :
                                                                    <>
                                                                        {
                                                                            index === shownNumber + 1 ?
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
                                            </>
                                            :
                                            <> <h2>No upcoming shared vacations</h2></>
                                    }
                                </>
                                
                            </div>
                    }
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