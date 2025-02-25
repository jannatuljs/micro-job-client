import React, { useContext } from 'react';
import { AuthContext } from '../Components/Provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {

    const {user, loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    // tanstack
    const {data: isAdmin, isLoading, refetch} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async() =>{
            const res = await axiosSecure.get(`/user/admin/${user.email}`)
        //   console.log(res.data)
            return res.data?.admin;
        }
    })
    return [isAdmin, isLoading, refetch]
};

export default useAdmin;