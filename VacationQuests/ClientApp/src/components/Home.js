import React, { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import VacationList from './VacationList'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import OthersVacationList from './OthersVacationList';
import Switch from '@mui/material/Switch';



const Home = () => {
    const session = useSession(); //tokens
    const supabase = useSupabaseClient(); // talk to supabase
    const [history, setHistory] = useState(false)
    const [otherHistory, setOtherHistory] = useState(false)
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    useEffect(() => {
        getSessionFromSupaBase()
    }, [])

    const getSessionFromSupaBase = async () => {
        const { error } = await supabase.auth.getSession()
        console.log(session)
    }
    const handleChange = () => {
        setHistory(!history)
    }
    const handleOtherChange = () => {
        setOtherHistory(!otherHistory)
    }
    if (Cookies.get("UserId")) {
        return (
            <>
                <div className='d-flex flex-column w-100 mt-5'>
                    <div className='container mb-5 card border-primary p-5 text-center'>
                        <div className='card-header bg-primary text-light col-12 d-flex flex-row justify-content-center align-items-center'>
                            <h1 className='col-11'>&ensp; &ensp; &ensp;  Your Vacations</h1>
                            <div>
                                <div>Show history</div>
                                <Switch {...label} className='' onChange={handleChange} color="default"/>
                            </div>
                        </div>
                        <div className='card-body'>
                            <VacationList history={history} />
                        </div>
                    </div>
                    <div className='container p-5 border-primary card text-center'>
                        <div className='card-header bg-primary text-light col-12 d-flex flex-row justify-content-center align-items-center'>
                            <h1 className='col-11'>&ensp; &ensp; &ensp;  Shared Vacations</h1>
                            <div>
                                <div>Show history</div>
                                <Switch {...label} className='' onChange={handleOtherChange} color="default" />
                            </div>
                        </div>
                        <div className='card-body'>
                            <OthersVacationList history={otherHistory} />
                        </div>
                    </div>
                    <div className='container mt-5 border-primary card p-5'>
                        <h3>Our Purpose</h3>
                        <Link className='btn btn-primary' to="/Create">Create your vacation now!</Link>
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