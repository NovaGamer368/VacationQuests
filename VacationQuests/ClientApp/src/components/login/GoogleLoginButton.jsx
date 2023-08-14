import React from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function GoogleLoginButton({ email, googleLogin, login, create }) {
    const session = useSession(); //tokens
    const supabase = useSupabaseClient(); // talk to supabase

    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options:
            {
                scopes: 'https://www.googleapis.com/auth/calendar'
            }
        })
        if (error) {
            alert("error logging in")
            console.log(error)
        }
        //Setting variables
        email(session.user.email)
        googleLogin(true)

        if (login) {
            login() 
        }
        if (create) {
            create()
        }
    }

    return (
        <>
            <button onClick={() => googleSignIn()}>Google Login</button>
        </>
    );
}

export default GoogleLoginButton




































//import React from 'react';
//import { GoogleLogin } from 'react-google-login';

//const GoogleLoginButton = () => {
//    const responseGoogle = (response) => {
//        // Handle the login response here
//        console.log(response);
//    };

//    return (
//        <GoogleLogin
//            clientId={"120216709000-rcuk4c94lnuqgb0tivg9qa08tp2itloe.apps.googleusercontent.com"}
//            buttonText="Login with Google"
//            onSuccess={responseGoogle}
//            onFailure={responseGoogle}
//            cookiePolicy={'single_host_origin'}
//        />
//    );
//};

//export default GoogleLoginButton;

//import React, { useEffect } from 'react';

//const GoogleLoginButton = () => {
//    useEffect(() => {
//        // Initialize Google Sign-In
//        window.google.accounts.id.initialize({
//            client_id: '120216709000-rcuk4c94lnuqgb0tivg9qa08tp2itloe.apps.googleusercontent.com',
//            callback: handleLoginResponse,
//        });
//    }, []);

//    const handleLoginResponse = (response) => {
//        // Handle the login response here
//        console.log(response);
//    };

//    return (
//        <div className="g-id-button" data-type="standard"></div>
//    );
//};

//export default GoogleLoginButton;