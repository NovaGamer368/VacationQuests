import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import VacationList from './VacationList'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'



const Home = () => {
    const session = useSession(); //tokens
    const supabase = useSupabaseClient(); // talk to supabase


    useEffect(() => {
        getSessionFromSupaBase()
    }, [])

    const getSessionFromSupaBase = async () => {
        const { error } = await supabase.auth.getSession()
        console.log(session)
    }
    if (Cookies.get("UserId")) {
        return (
            <>
                <div className='d-flex flex-column w-100 mt-5'>
                    <div className='container  mb-5 card border-primary p-5 text-center'>
                        <h1 className='card-header text-light'> Your Vacations </h1>
                        <hr />
                        <div className='card-body'>
                            <VacationList />
                        </div>
                    </div>
                    <div className='container mt-5 card border-secondary p-5'>
                        <h3>Our Purpose</h3>
                        <Link className='btn btn-info' to="/Create">Create your vacation now!</Link>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <div className='container'>
                <div className='d-flex h-100 justify-content-center align-selft-center text-center'>
                    <h1>WELCOME TO VACATION QUESTS! Start making your vacations today!</h1>
                </div>
            </div>

        )
    }
};

export default Home; 