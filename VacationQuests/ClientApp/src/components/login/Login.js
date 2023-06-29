import React, { useEffect, useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        //renderButton()
    })

    const loginUser = () => {
        console.log("Logging in user")

    }

    return (
        <>
            <div className="d-flex justify-content-center text-center mt-5 card p-5 w-50">
                <div >
                    <div className="form-group">
                        <h1 className="mt-4">Login</h1>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onKeyUp={(e) => setEmail(e.target.value) } />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onKeyUp={(e) => setPassword(e.target.value)} />
                            <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100 mt-3" onClick={loginUser}>Login</button>
                </div>

                <NavLink tag={Link} className="text-info my-3" to="/Register"><u>New User?</u></NavLink>

                {/*DOES'T WORK YET!!!*/}
                <GoogleLoginButton className="mt-3" />
            </div>
        </>
    );
};

export default Login; 