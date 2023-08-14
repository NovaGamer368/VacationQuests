import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import UploadAvatar from './UploadAvatar'

const UserInfo = () => {
    const [user, setUser] = useState(null);
    const [icon, setIcon] = useState("https://i.pinimg.com/736x/dd/f0/11/ddf0110aa19f445687b737679eec9cb2.jpg");
    const [bio, setBio] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://localhost:7259/api/users/${Cookies.get("UserId")}`)
            .then(resp => resp.json())
            .then(data => {
                setUser(data)
            })
            .catch(e => console.log(e))
    }, [])

    const updateBio = () => {
        const requestOptions = {
            mode: 'cors',
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email, password: user.password, icon: icon, bio: bio }),
            origin: "https://localhost:44455"
        };

        fetch(`https://localhost:7259/api/users/${Cookies.get('UserId')}`, requestOptions)
            .then(resp => resp.json())
            .then(window.location.href = '/')
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className="d-flex justify-content-center text-center mt-5 card p-5 w-50">
                <div className="form-group">
                    <h1 className="mt-4">Additional Information </h1>
                    <UploadAvatar className="align-items-center" icon={ setIcon } />
                    <div class="form-floating mb-3">
                        <textarea className="form-control" maxLength='63206' id="floatingBio" placeholder="Bio" onKeyUp={(e) => setBio(e.target.value)} />
                        <label for="floatingBio" className='text-dark'>Bio</label>
                    </div>
                </div>
                <div className="flex-row">
                    <button className="btn btn-secondary w-25 m-3">Skip</button>
                    <button className="btn btn-primary w-25 m-3" onClick={updateBio}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default UserInfo; 