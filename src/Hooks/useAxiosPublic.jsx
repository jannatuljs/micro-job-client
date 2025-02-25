import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: 'https://micro-job-server-93kovkwtf-jannat678s-projects.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;