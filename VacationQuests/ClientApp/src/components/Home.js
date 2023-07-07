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
    },[])

    const getSessionFromSupaBase = async () => {
        const { error } = await supabase.auth.getSession()
        console.log(session)
    }

    return (
        <>
            <div className='d-flex flex-column mt-5'>
                <div className='container mb-5 card border-primary p-5'>
                    <h1> Your Vacations </h1>
                    <VacationList />
                </div>
                <div className='container mt-5 card border-secondary p-5'>
                    <h3>Our Purpose</h3>
                    <Link className='btn btn-info' to="/Create">Create your vacation now!</Link>
                </div>
            </div>
        </>
    );
};

export default Home; 