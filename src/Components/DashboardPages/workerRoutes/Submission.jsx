import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUser from '../../../Hooks/useUser';
import coin from '../../../assets/icons/coin.png'
import buyer from '../../../assets/icons/business-women.png'

const Submission = () => {

    const axiosSecure = useAxiosSecure()
    const [dbuser] = useUser()

    const { data: mysubmissions = [], isLoading, refetch } = useQuery({
        queryKey: ['submission'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/${dbuser?.email}`)
            return res.data || []
        }
    })

    if (isLoading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
    }

    return (
        <div className='py-10'>

            <div className='max-w-screen-xl w-[92%] mx-auto bg-white p-12 my-12 rounded'>

                <div className='flex justify-between uppercase'>
                    <h2 className='text-xl md:text-2xl font-semibold'>Total Tasks: {mysubmissions.length}</h2>
                </div>

                <div className="overflow-x-auto rounded-xl my-8">
                    <table className="table table-zebra text-center ">

                        <thead className='bg-gradient-to-r from-[#c3deff] to-[#fac8ff] text-lg uppercase font-medium '>
                            <tr className='h-16'>
                                <th></th>
                                <th>Task</th>
                                <th>Buyer</th>
                                <th>Pay Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>
                            {
                                Array.isArray(mysubmissions)? 
                                mysubmissions?.map((submission, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>

                                        <td className='w-[30%] text-start font-medium'>{submission.task_title}</td>

                                        <td>
                                            <div className='flex gap-1 items-center justify-center'>
                                                {submission.buyer_name}
                                                <img className='w-6 h-6' src={buyer} alt="" />
                                            </div>
                                        </td>

                                        <td >
                                            <div className='flex gap-1 items-center justify-center'>
                                                {submission.payable_amount}
                                                <img className='w-6 h-6' src={coin} alt="" />
                                            </div>
                                        </td>



                                        <td>{submission.status}</td>
                                    </tr>
                                )
                                :
                                []
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default Submission;