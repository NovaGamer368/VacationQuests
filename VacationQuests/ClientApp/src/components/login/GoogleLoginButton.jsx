import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {
    const responseGoogle = (response) => {
        // Handle the login response here
        console.log(response);
    };

    return (       
        <GoogleLogin
            clientId={"120216709000-rcuk4c94lnuqgb0tivg9qa08tp2itloe.apps.googleusercontent.com"}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;