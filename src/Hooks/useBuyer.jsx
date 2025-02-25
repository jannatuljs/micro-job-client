import React, { useContext } from 'react';
import { AuthContext } from '../Components/Provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useBuyer = () => {

    const {user, loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    // tanstack
    const {data: isBuyer, isLoading, refetch} = useQuery({
        queryKey: [user?.email, 'isBuyer'],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/user/buyer/${user.email}`)

            return res.data?.buyer;
        }
    })
    return [isBuyer, isLoading, refetch]
};

export default useBuyer;