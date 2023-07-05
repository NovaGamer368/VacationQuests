import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import UploadAvatar from '../login/UploadAvatar';

const Edit = ({ user, stopEdit }) => {
    const [email, setEmail] = useState('')
    const [icon, setIcon] = useState('')
    const [bio, setBio] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [newPFP, setNewPFP] = useState(false)
    const [enableNewPassword, setEnableNewPassword] = useState(false)


    useEffect(() => {
        setEmail(user.email)
        setIcon(user.icon)
        setBio(user.bio)
    }, [])

    const updateProfile = () => {
        if (enableNewPassword) {
            if (checkPassword()) {
                console.log('updating Profile')
                const requestOptions = {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: newPassword, icon: icon, bio: bio }),
                    origin: "https://localhost:44455"
                };

                fetch(`https://localhost:7259/api/users/${user.id}`, requestOptions)
                    .then(window.location.href = "/Profile")
                    .catch(e => console.log(e))
            }
        }
        else {
            const requestOptions = {
                mode: 'cors',
                method: 'PUT',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: user.password, icon: icon, bio: bio }),
                origin: "https://localhost:44455"
            };

            fetch(`https://localhost:7259/api/users/${user.id}`, requestOptions)
                .then(window.location.href = "/Profile")
                .catch(e => console.log(e))
        }
    }

    const checkPassword = () => {
        if (password === user.password) {
            console.log('Original Password passed')
            if (newPassword != '' && confirmPassword != '') {
                if (newPassword === confirmPassword) {
                    console.log('Password works!')
                    return true 
                }
                setErrorMessage('New Password doesn\'t Match')
                return false
            }
            setErrorMessage('Must enter a new Password')
            return false
        }
        setErrorMessage('Must enter current password first')
        return false
    }

    return (
        <>
            <div className='container mt-5'>
                {
                    newPFP ?
                        <UploadAvatar className="align-items-center" icon={setIcon} prefill={icon} />
                        :
                        <>
                            <div className='text-center mb-2'>
                                <div className='text-muted'> Click Icon to make new Profile Picture </div>
                                <img src={icon} onClick={() => setNewPFP(true)} />
                            </div>
                        </>
                }
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label for="floatingInput" className='text-dark'>Email address</label>
                </div>               
                <div className="form-group mt-4">
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingBio" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                        <label for="floatingBio" className='text-dark'>Bio</label>
                    </div>
                </div>
                <div className='mb-3'>
                    {
                        enableNewPassword ?
                            <>
                                <h3 className="text-center">New Password?</h3>
                                <h5 className='text-center text-danger'>{errorMessage}</h5>
                                <div class="form-floating">
                                    <input type="password" className="form-control" id="floatingCurrentPassword" placeholder="Password" onKeyUp={(e) => setPassword(e.target.value)} />
                                    <label for="floatingCurrentPassword" className='text-dark'>Current Password</label>
                                </div>
                                <div class="form-floating mt-1">
                                    <input type="password" className="form-control" id="floatingNewPassword" placeholder="Password" onKeyUp={(e) => setNewPassword(e.target.value)} />
                                    <label for="floatingNewPassword" className='text-dark'>New Password</label>
                                </div>
                                <div class="form-floating mt-1">
                                    <input type="password" className="form-control" id="floatingConfirmNewPassword" placeholder="Password" onKeyUp={(e) => setConfirmPassword(e.target.value)} />
                                    <label for="floatingConfirmNewPassword" className='text-dark'>Confirm New Password</label>
                                </div>
                            </>
                            :
                            <>
                                <div className='d-flex justify-content-center'>
                                    <button className='btn ' onClick={() => setEnableNewPassword(true)}>New Password</button>  
                                </div>
                            </>
                    }

                </div>
                <button className='btn btn-success' onClick={updateProfile}>Update Profile</button>
                <button className='btn btn-secondary mx-3' onClick={() => stopEdit(false)}> Cancel </button>
            </div>
        </>
    );
};

export default Edit; 