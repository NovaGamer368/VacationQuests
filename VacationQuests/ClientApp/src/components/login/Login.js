import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('')

    return (
        <>
            <div className="d-flex justify-content-center text-center mt-5 card p-5 w-50">
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
                <button className="btn btn-primary w-100 mt-5">Login</button>
            </div>

        </>
    );
};

export default Login;