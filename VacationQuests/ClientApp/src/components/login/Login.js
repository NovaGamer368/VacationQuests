import React, { useEffect, useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import SnackBar from '../SnackBar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState();
    const [googleLogin, setGoogleLogin] = useState(false);

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
        fetch(`https://localhost:7259/api/users`)
            .then(resp => resp.json())
            .then(data => {
                setUsers(data)
            })
            .catch(e => console.log(e))
    }, [])


    const loginUser = () => {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email.toLowerCase() === email.toLowerCase()) {
                setMessage('')
                if (!googleLogin) {

                    if (password === users[i].password) {
                        setMessage('')
                        Cookies.set('UserId', users[i].id, { expires: 7 })
                        window.location.href = '/'
                    }
                    else {
                        setMessage('Invalid Password')
                        handleSnack()
                    }
                }
                else {
                    console.log('working')
                    setMessage('')
                    Cookies.set('UserId', users[i].id, { expires: 7 })
                    window.location.href = '/'
                }
                break
            }
            setMessage('Invalid Email')
            handleSnack()
        }
        
    }

    return (
        <>
            <div className="d-flex justify-content-center text-center mt-5 card p-5 w-50">
                <div >
                    <div className="form-group">
                        <h1 className="mt-4">Login</h1>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                            <label for="floatingInput" className='text-dark'>Email address</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onKeyUp={(e) => setPassword(e.target.value)} />
                            <label for="floatingPassword" className='text-dark'>Password</label>
                        </div>
                    </div>
                    <div className="text-danger">{message}</div>
                    <button className="btn btn-primary w-100 mt-3" onClick={loginUser}>Login</button>
                </div>
                <SnackBar open={open} close={handleClose} severity={"error"} message={message} />

                <NavLink tag={Link} className="text-info my-3" to="/Register"><u>New User?</u></NavLink>

                {/*DOES'T WORK YET!!!*/}
                <GoogleLoginButton className="mt-3" email={setEmail} googleLogin={setGoogleLogin} login={loginUser} />
            </div>
        </>
    );
};

export default Login; 