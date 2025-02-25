import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUser from './../../../Hooks/useUser';
import coin from '../../../assets/icons/coin.png'
import { format } from 'date-fns';

const Transaction = () => {

    const { user } = useContext(AuthContext)
    const [dbuser] = useUser()
    const axiosSecure = useAxiosSecure()

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${dbuser.email}`)
            return res.data || []
        }
    })

    return (
        <div className='min-h-[calc(100vh-370px)] py-10'>

            <div className='max-w-screen-xl w-[92%] mx-auto bg-white p-12 my-12 rounded'>

                {/* <div className='flex justify-between uppercase'>
                    <h2 className='text-xl md:text-2xl font-semibold'>Total Tasks: {mytasks.length}</h2>
                </div> */}

                <div className="overflow-x-auto rounded-xl my-8">
                    <table className="table table-zebra text-center ">
                        {/* head */}
                        <thead className='bg-gradient-to-r from-[#c3deff] to-[#fac8ff] text-lg uppercase font-medium '>
                            <tr className='h-16'>
                                <th></th>
                                <th>Transaction ID</th>
                                <th>Payment</th>
                                <th>Coins Recived</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>
                            {
                                payments?.map((pay, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>

                                        <td className='font-medium'>{pay?.transactionId || 'No transaction ID'}</td>

                                        <td> {pay.price/100} $</td>

                                        <td >
                                            <div className='flex gap-1 items-center justify-center'>
                                                {pay.coin}
                                                <img className='w-6 h-6' src={coin} alt="" />
                                            </div>
                                        </td>

                                        <td>{format(pay.date, 'dd-MM-yyyy')}</td>



                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default Transaction;