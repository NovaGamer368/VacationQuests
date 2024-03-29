//import "./css/bootstrap.css"
import './css/custom.css'
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import DateAdapter from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'




const App = () => {

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, requireAuth, ...rest } = route;
                        return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
                    })}
                </Routes>
            </Layout>
        </LocalizationProvider>
    );
};

export default App; 