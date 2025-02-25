import React, { useContext } from 'react';
 
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Components/Provider/AuthProvider';

const useWorker = () => {

    const {user, loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    // tanstack
    const {data: isWorker, isLoading, refetch} = useQuery({
        queryKey: [user?.email, 'isWorker'],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/user/worker/${user.email}`)

            return res.data?.worker;
        }
    })
    return [isWorker, isLoading, refetch]
};

export default useWorker;