import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 

    const navigate = useNavigate();

    const createUser = () => {
        console.log("Creating New User")
        navigate('/Register/User-Info')
    }

    return (
        <>
            <div className="d-flex justify-content-center text-center mt-5 card p-5 w-50">
                <div >
                    <div className="form-group">
                        <h1 className="mt-4">Register New User </h1>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onKeyUp={(e) => setEmail(e.target.value)} />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onKeyUp={(e) => setPassword(e.target.value)} />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" className="form-control" id="floatingPasswordCheck" placeholder="Confirm Password" onKeyUp={(e) => setConfirmPassword(e.target.value)} />
                            <label for="floatingPassword">Confirm Password</label>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100 mt-3" onClick={createUser}>Create User</button>
                </div>
            </div>
        </>
    );
};

export default Register; 