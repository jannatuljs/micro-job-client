import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../Components/Provider/AuthProvider';
import useAxiosPublic from './useAxiosPublic';

const useUser = () => {

    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext)
// console.log(user)
    const { data: dbuser, isLoading, refetch: refetchUser } = useQuery({
        queryKey: [user?.email, 'user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user?.email}`)
            return res.data
        }
    })

    return [dbuser, isLoading, refetchUser];
};

export default useUser;