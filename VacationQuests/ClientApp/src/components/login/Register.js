﻿import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import GoogleLoginButton from './GoogleLoginButton';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [googleLogin, setGoogleLogin] = useState(false);

    const [message, setMessage] = useState('')

    const navigate = useNavigate();

    const createUser = () => {
        if (emailCheck) {
            console.log('Email passed!')
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
            console.log('Failed')
        }
    }

    const emailCheck = () => {
        if (email !== '') {
            fetch(`https://localhost:7259/api/users`)
                .then(resp => resp.json())
                .then(data => {
                    for (var i = 0; i < data.length; i++) {
                        console.log(email.toLowerCase())
                        console.log(data[i].email.toLowerCase())
                        if (email.toLowerCase() === data[i].email.toLowerCase()) {
                            setMessage("Email Already exists")
                            return false
                        }
                    }
                    return true
                })
                .catch(e => console.log(e))
                      
        }
        else {
            setMessage('Please fill in email address')
            return false
        }
    }

    const passwordCheck = () => {
        if (password !== '') {
            if (confirmPassword === password) {
                return true
            }
            else {
                setMessage("Password doesn't match")
                return false
            }
        }
        else {
            setMessage('Must have a password')
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
                    <button className="btn btn-primary w-100 my-3" onClick={createUser}>Create User</button>
                    <NavLink tag={Link} className="text-info mb-3" to="/Login"><u>Already got an account?</u></NavLink>
                </div>
                <GoogleLoginButton className='mt-3' email={setEmail} googleLogin={setGoogleLogin} create={createUser} />
            </div>
        </>
    );
};

export default Register; 