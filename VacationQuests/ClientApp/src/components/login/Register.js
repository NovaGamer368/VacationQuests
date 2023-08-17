import React, { useState, useReducer } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import GoogleLoginButton from './GoogleLoginButton';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import SnackBar from '../SnackBar';
import { useEffect } from 'react';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checks, setChecks] = useState(0);
    const [returnedData, setReturnedData] = useState()
    const [googleLogin, setGoogleLogin] = useState(false);
    const [exists, setExists] = useState(false)
    //const [click, setClick] = useState(0)
    const [click, forceUpdate] = useReducer(x => x + 1, 0);


    const [trueFound, setTrueFound] = useState(false)

    const [message, setMessage] = useState('')
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

    const navigate = useNavigate();

    useEffect(() => {
        console.log(checks)
        if (returnedData) {
            console.log(returnedData)
            if (checks !== 0) {
                setTrueFound(false)
                if (!exists) {
                    if (checks === returnedData.length) {
                        console.log("TRUE")
                        setTrueFound(true)
                    }
                }                
            }
        }
    }, [checks])

    useEffect(() => {
        console.log(trueFound)
        if (click > 0) {
            if (trueFound) {
                console.log('Email passed!', email.length)
                if (!googleLogin) {

                    if (passwordCheck()) {
                        console.log("Creating New User")

                        const requestOptions = {
                            mode: 'cors',
                            method: 'Post',
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ email: email, password: password }),
                            origin: "https://localhost:44455"
                        };

                        fetch("https://localhost:7259/api/users", requestOptions)
                            .then(resp => resp.json())
                            .then(data => {
                                console.log("Data from fetch:  ", data.id)
                                Cookies.set('UserId', data.id, { expires: 7 });
                                navigate(`/Register/User-Info`)
                            })
                            .catch(e => console.log(e))
                    }
                }
                else {
                    console.log('creating user through google')
                    const requestOptions = {
                        mode: 'cors',
                        method: 'Post',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: email }),
                        origin: "https://localhost:44455"
                    };

                    fetch("https://localhost:7259/api/users", requestOptions)
                        .then(resp => resp.json())
                        .then(data => {
                            console.log("Data from fetch:  ", data.id)
                            Cookies.set('UserId', data.id, { expires: 7 });
                            navigate(`/Register/User-Info`)
                        })
                        .catch(e => console.log(e))
                }
            }
            else {
                setMessage("Please input an email address");
                handleSnack()
                console.log('Failed')
            }
        }
    }, [trueFound, click])

    //useEffect(() => {
    //    console.log('click', click)
    //    setTrueFound(trueFound) 
    //}, [click])

    const createUser = () => {
        forceUpdate()
        emailCheck()
        //if (trueFound) {
        //    console.log('Email passed!', email.length)
        //    if (!googleLogin) {

        //        if (passwordCheck()) {
        //            console.log("Creating New User")

        //            const requestOptions = {
        //                mode: 'cors',
        //                method: 'Post',
        //                headers: {
        //                    'Access-Control-Allow-Origin': '*',
        //                    'Content-Type': 'application/json'
        //                },
        //                body: JSON.stringify({ email: email, password: password }),
        //                origin: "https://localhost:44455"
        //            };

        //            fetch("https://localhost:7259/api/users", requestOptions)
        //                .then(resp => resp.json())
        //                .then(data => {
        //                    console.log("Data from fetch:  ", data.id)
        //                    Cookies.set('UserId', data.id, { expires: 7 });
        //                    navigate(`/Register/User-Info`)
        //                })
        //                .catch(e => console.log(e))
        //        }
        //    }
        //    else {
        //        console.log('creating user through google')
        //        const requestOptions = {
        //            mode: 'cors',
        //            method: 'Post',
        //            headers: {
        //                'Access-Control-Allow-Origin': '*',
        //                'Content-Type': 'application/json'
        //            },
        //            body: JSON.stringify({ email: email }),
        //            origin: "https://localhost:44455"
        //        };

        //        fetch("https://localhost:7259/api/users", requestOptions)
        //            .then(resp => resp.json())
        //            .then(data => {
        //                console.log("Data from fetch:  ", data.id)
        //                Cookies.set('UserId', data.id, { expires: 7 });
        //                navigate(`/Register/User-Info`)
        //            })
        //            .catch(e => console.log(e))
        //    }
        //}
        //else {
        //    console.log('Failed')
        //}
    }

    const emailCheck = () => {
        setChecks(0)
        console.log("checking")
        if (email.length !== 0) {
            setExists(false)
            fetch(`https://localhost:7259/api/users`)
                .then(resp => resp.json())
                .then(data => {
                    setReturnedData(data)
                    for (var i = 0; i < data.length; i++) {
                        if (email.toLowerCase() === data[i].email.toLowerCase()) {
                            setMessage("Email Already exists")
                            handleSnack()
                            setExists(true)
                            setTrueFound(false)
                            return false
                        }
                        setChecks(i + 1)
                    }
                })
                .catch(e => console.log(e))

        }

    }

    const passwordCheck = () => {
        if (password !== '') {
            if (confirmPassword === password) {
                return true
            }
            else {
                setMessage("Password doesn't match")
                handleSnack()
                return false
            }
        }
        else {
            setMessage('Must have a password')
            handleSnack()
            return false
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center text-center mt-5 card p-5 w-50">
                <div >
                    <div className="form-group">
                        <h1 className="mt-4">Register New User </h1>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" maxLength='320' id="floatingInput" placeholder="name@example.com" onKeyUp={(e) => setEmail(e.target.value)} />
                            <label for="floatingInput" className='text-dark'>Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onKeyUp={(e) => setPassword(e.target.value)} />
                            <label for="floatingPassword" className='text-dark'>Password</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" className="form-control" id="floatingPasswordCheck" placeholder="Confirm Password" onKeyUp={(e) => setConfirmPassword(e.target.value)} />
                            <label for="floatingPassword" className='text-dark'>Confirm Password</label>
                        </div>
                    </div>

                    <div className="text-danger">{message}</div>
                    <SnackBar open={open} close={handleClose} severity={"error"} message={message} />

                    <button className="btn btn-primary w-100 my-3" onClick={createUser}>Create User</button>
                    <NavLink tag={Link} className="text-info mb-3" to="/Login"><u>Already got an account?</u></NavLink>
                </div>
                {/*<GoogleLoginButton className='mt-3' email={setEmail} googleLogin={setGoogleLogin} create={createUser} />*/}
            </div>
        </>
    );
};

export default Register; 