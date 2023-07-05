import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Edit from './Edit';

const Profile = () => {
    const [email, setEmail] = useState('')
    const [icon, setIcon] = useState('')
    const [bio, setBio] = useState('')
    const [vacations, setVacations] = useState(null)
    const [friends, setFriends] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:7259/api/users/${Cookies.get("UserId")}`)
            .then(resp => resp.json())
            .then(data => {
                setEmail(data.email)
                setIcon(data.icon)
                setBio(data.bio)
                setVacations(data.vacations)
                setFriends(data.friends)
                setUser(data)
            })
            .catch(e => console.log(e))
    }, [])

    const logout = () => {
        Cookies.remove('UserId')
        window.location.href = '/'
    }

    if (!editMode) {
        return (
            <>
                <div className='d-flex flex-column'>

                    <div className="container mt-5 text-center">
                        <div className='d-flex float-lg-end mx-5'>
                            <button className='btn btn-secondary float-right' onClick={() => setEditMode(true)} ><i class="bi bi-pen"></i></button>
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
                        <div>
                            {vacations}
                        </div>
                        <div>
                            {friends}
                        </div>
                        <button className="btn btn-warning m-3" onClick={logout}>Log Out</button>
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