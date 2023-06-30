import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const NavIcon = () => {
    const [icon, setIcon] = useState('https://i.pinimg.com/736x/dd/f0/11/ddf0110aa19f445687b737679eec9cb2.jpg');

    useEffect(() => {
        fetch(`https://localhost:7259/api/users/${ Cookies.get("UserId") }`)
            .then(resp => resp.json())
            .then(data => {
                if (data.icon != null)
                {
                    setIcon(data.icon)
                }
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <img className='avatar' src={ icon } />
        </>
    );
};

export default NavIcon; 