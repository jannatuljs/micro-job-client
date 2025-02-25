import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Components/Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'https://micro-job-server-93kovkwtf-jannat678s-projects.vercel.app'
})

const useAxiosSecure = () => {

    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {

        axiosSecure.interceptors.request.use(function (config) {
    
            const token = localStorage.getItem('access-token')
              
            if (token) {
                config.headers.authorization = `Bearer ${token}`
            }
            return config
        },
            function (error) {
                return Promise.reject(error)
            })
    
        // intercepts 401 & 403
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
    
            async (error) => {

                if (!error.response) {
                    console.error("Network/Server error:", error);
                    return Promise.reject(error);
                }
    
                const status = error.response.status
                // console.log('status error in interceptor', status, error);
                if (status === 401 || status === 403) {
                    await logOut()
                    navigate('/auth')
                }
                return Promise.reject(error)
            })
        return () => {
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };

    }, [logOut, navigate])

    return axiosSecure
};

export default useAxiosSecure;