import React from 'react';
import { Outlet } from 'react-router-dom';
import bg from '../assets/auth/background image.webp'
import { Helmet } from 'react-helmet-async';

const Auth = () => {
    return (
        <div className='min-h-screen flex justify-center items-center' style={{ background: `url("${bg}")`, backgroundSize: 'cover' }}>
            <Helmet>
                <title>Earning Platform | Auth</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <Outlet />
        </div>
    );
};

export default Auth;