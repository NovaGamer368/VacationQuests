import React, { useEffect, useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        //renderButton()
    })

    //// Google button setup
    //function onSuccess(googleUser) {
    //    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    //}
    //function onFailure(error) {
    //    console.log(error);
    //}

    //function renderButton() {
    //    gapi.signin2.render('my-signin2', {
    //        'scope': 'profile email',
    //        'width': 240,
    //        'height': 50,
    //        'longtitle': true,
    //        'theme': 'dark',
    //        'onsuccess': onSuccess,
    //        'onfailure': onFailure
    //    });
    //}

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
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">Password</label>
                        </div>
                    </div>
                    <button className="btn btn-primary w-100 mt-5" onClick={loginUser}>Login</button>
                </div>
                <div>New User?</div>
                <GoogleLoginButton />
            </div>
        </>
    );
};

export default Login; 