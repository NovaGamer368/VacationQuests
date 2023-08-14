import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import UploadAvatar from '../login/UploadAvatar';
import SnackBar from '../SnackBar';

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

    //Snackbar variables
    const [open, setOpen] = useState(false);

    const handleSnack = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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
                    body: JSON.stringify({ email: email, password: newPassword, icon: icon, bio: bio, vacations: user.vacations, othersvacations: user.othersvacations, friends: user.friends }),
                    origin: "https://localhost:44455"
                };

                console.log(user)

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
                body: JSON.stringify({ email: email, password: user.password, icon: icon, bio: bio, vacations: user.vacations, othersvacations: user.othersvacations,  friends: user.friends }),
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
                handleSnack()
                return false
            }
            setErrorMessage('Must enter a new Password')
            handleSnack()
            return false
        }
        setErrorMessage('Must enter current password first')
        handleSnack()
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
                                {
                                    icon === "https://i.pinimg.com/736x/dd/f0/11/ddf0110aa19f445687b737679eec9cb2.jpg" ?
                                        <img className='max-icon' src={icon} onClick={() => setNewPFP(true)} />
                                        :
                                        <img src={icon} onClick={() => setNewPFP(true)} />
                                }
                            </div>
                        </>
                }
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" maxLength='320' id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label for="floatingInput" className='text-dark'>Email address</label>
                </div>               
                <div className="form-group mt-4">
                    <div class="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingBio" maxLength='63206' placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
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
                                <SnackBar open={open} close={handleClose} severity={"error"} message={errorMessage} />
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