import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment'
import { useNavigate } from "react-router-dom";

const VacationList = () => {
    const [userVacations, setUserVacations] = useState(null)
    const [vacationList, setVacationList] = useState([])

    const navigate = useNavigate(); 

    useEffect(() => {
        fetch("https://localhost:7259/api/vacations")
            .then(resp => resp.json())
            .then(data => {
                setVacationList(data)
            })
            .catch(e => console.log(e))
    }, [])
    useEffect(() => {
        let tempArr = []
        console.log(vacationList)
        vacationList.forEach((vacation) => {
            vacation.planners.forEach((planner) => {
                if (planner.id === Cookies.get('UserId')) {
                    tempArr.push(vacation)
                }
            })
        })
        setUserVacations(tempArr)
    }, [vacationList])
    const editVacation = (vacation) => {
        navigate(`/EditVacation?v=${vacation.id}`)
    }

    if (userVacations == null) {
        return (
            <>
                <p>No Vacations Made</p>
            </>
        );
    }
    else {
        return (
            <>
                <div className='d-flex flex-row'>
                    {
                        userVacations.map((vacation) => (
                            <div key={vacation.id}>
                                <div className='card border-secondary text-center p-3 m-2' onClick={() => { editVacation(vacation) } }>
                                    <h3>{vacation.vacationTitle}</h3>
                                    <div>
                                        <p>{moment(vacation.startDate).format('MMMM Do YYYY')}</p>
                                        <p>{moment(vacation.endDate).format('MMMM Do YYYY')}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }
};

export default VacationList; 