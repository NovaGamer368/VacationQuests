import Cookies from 'js-cookie';
import React, { useEffect, useState, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import Edit from './Edit';

const Profile = () => {
    const [email, setEmail] = useState('')
    const [icon, setIcon] = useState('')
    const [bio, setBio] = useState('')
    const [vacations, setVacations] = useState()
    const [friends, setFriends] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [user, setUser] = useState(null)
    const [, forceUpdate] = useReducer(x => x + 1, 0);


    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:7259/api/users/${Cookies.get("UserId")}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setEmail(data.email)
                setIcon(data.icon)
                setBio(data.bio)
                setFriends(data.friends)
                setUser(data)
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        let tempArr = []
        if (user !== null) {
            console.log("user.vacations to check :", user.vacations)
            if (user.vacations !== null) {
                user.vacations.forEach((vacationId) => {                    
                    fetch(`https://localhost:7259/api/vacations/${vacationId}`)
                        .then(resp => resp.json())
                        .then(data => {
                            tempArr.push(data)
                            setVacations(tempArr)
                            console.log(vacations)
                            forceUpdate()
                        })
                        .catch(e => console.log(e))
                })
            }
        }

    }, [user])

    const logout = () => {
        Cookies.remove('UserId')
        window.location.href = '/'
    }

    if (!editMode) {
        return (
            <>
                <div className='d-flex w-100 flex-column'>

                    <div className="container mt-5 text-center">
                        <div className='d-flex float-lg-end mx-5'>
                            <button className='btn btn-secondary float-right' onClick={() => setEditMode(true)} ><i class="bi bi-pencil fs-1"></i></button>
                        </div>
                    </div>
                    <div className="container mt-5 text-center">

                        <div>
                            <div>
                                <img src={icon} />
                                <div className="my-1">
                                    <b>Email: </b>{email}
                                </div>
                            </div>
                        </div>
                        <div className="card border-secondary mb-3 p-5">
                            <u><b>Bio</b></u>
                            {bio}
                        </div>
                        <div className='d-flex flex-column flex-wrap'>
                            <div>
                                <h3>Vacation History</h3>
                                {
                                    vacations ?
                                        <div className='d-flex justify-content-center flex-row flex-wrap'>
                                            {
                                                vacations.map((vacation) => (
                                                    <div key={vacation.id} className='card btn m-2 col-3 '>
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
                                        :
                                        <>No Vacations Found</>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <Edit user={user} stopEdit={setEditMode} />
            </>
        );
    }
};

export default Profile; 