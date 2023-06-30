import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userId, setUserId] = useState(null)
    const [email, setEmail] = useState('')
    const [icon, setIcon] = useState('')
    const [bio, setBio] = useState('')
    const [vacations, setVacations] = useState(null)
    const [friends, setFriends] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:7259/api/users/${Cookies.get("UserId")}`)
            .then(resp => resp.json())
            .then(data => {
                setUserId(data.id)
                setEmail(data.email)
                setIcon(data.icon)
                setBio(data.bio)
                setVacations(data.vacations)
                setFriends(data.friends)
            })
            .catch(e => console.log(e))
    }, [])

    const logout = () => {
        Cookies.remove('UserId')
        window.location.href = '/Login'
    }

    return (
        <>
            <div className="d-flex flex-column">
                <div>
                    {userId}
                </div>
                <div>
                    {email}
                </div>
                <img src={icon } />
                <div>
                    {bio}
                </div>
                <div>
                    {vacations}
                </div>
                <div>
                    {friends}
                </div>
            </div>
            <button className="btn btn-primary m-3" onClick={logout}>Log Out</button>

        </>
    );
};

export default Profile; 