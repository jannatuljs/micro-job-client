import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from './../../Provider/AuthProvider';
import worker from '../../../assets/icons/employee.png'
import coin from '../../../assets/icons/coin.png'
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import useUser from '../../../Hooks/useUser';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const MyTasks = () => {

    const { user } = useContext(AuthContext)
    const [, , refetchUser] = useUser()
    const axiosSecure = useAxiosSecure()

    const { data: mytasks = [], isLoading, refetch } = useQuery({
        queryKey: ['mytask'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/${user?.email}`)
            return res.data
        }
    })

    const deleteAlert = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8cbefa",

            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/task/${id}`)
                    .then(res => {
          
                        if (res.data.acknowledged) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "This task has been deleted.",
                                icon: "success"
                            });
                            refetch()
                            refetchUser()
                        }
                    })
            }
        });
    }

    return (
        <div className='py-10'>

            <div className='max-w-screen-xl w-[92%] mx-auto bg-white p-12 my-12 rounded'>

                <div className='flex justify-between uppercase'>
                    <h2 className='text-xl md:text-2xl font-semibold'>Total Tasks: {mytasks.length}</h2>
                </div>

                <div className="overflow-x-auto rounded-xl my-8">
                    <table className="table table-zebra text-center ">
                        {/* head */}
                        <thead className='bg-gradient-to-r from-[#c3deff] to-[#fac8ff] text-lg uppercase font-medium '>
                            <tr className='h-16'>
                                <th></th>
                                <th>Task</th>
                                <th>Worker Count</th>
                                <th>Total Pay</th>
                                <th>Deadline</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>
                            {
                                mytasks?.map((task, index) =>
                                    <tr key={index}>
                                        <th>{index + 1}</th>

                                        <td className='w-[24%] text-start font-medium'>{task.task_title}</td>

                                        <td>
                                            <div className='flex gap-1 items-center justify-center'>
                                                {task.required_workers}
                                                <img className='w-6 h-6' src={worker} alt="" />
                                            </div>
                                        </td>

                                        <td >
                                            <div className='flex gap-1 items-center justify-center'>
                                                {task.payable_amount * task.required_workers}
                                                <img className='w-6 h-6' src={coin} alt="" />
                                            </div>
                                        </td>

                                        <td>{task.completion_date}</td>

                                        <td className='flex items-center justify-center'>
                                            <Link to={`/dashboard/update/${task._id}`} className='my-1 text-2xl'><CiEdit className=' hover:text-[#8cbefa]' /></Link>
                                            </td>

                                        <td><motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.8 }} 
                                        className='p-1 w-10 text-2xl' onClick={() => deleteAlert(task._id)}><AiOutlineDelete className=' hover:text-[#8cbefa]' /></motion.button></td>

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

export default MyTasks;