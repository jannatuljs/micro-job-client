import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import coin from '../../../assets/icons/coin.png'
import worker from '../../../assets/icons/employee.png'
import deadline from '../../../assets/icons/schedule.png'
import buyer from '../../../assets/icons/business-women.png'
import email from '../../../assets/icons/gmail.png'
import pin from '../../../assets/icons/pin.png'
import requirement from '../../../assets/logo/parchment.png'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useUser from '../../../Hooks/useUser';
import { motion } from 'motion/react';


const Details = () => {

    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const [dbuser] = useUser()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: task, isLoading, refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/task/${id}`)
            return res.data
        }
    })

    if (isLoading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
    }

    const onSubmit = async (data) => {

        Swal.fire({
            title: "Did you duble check your submission?",
            text: "You won't be able to change this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#8cbefa",

            confirmButtonText: "Yes, submit!"
        }).then((result) => {
            if (result.isConfirmed) {

                const submitinfo = {
                    task_id: task._id,
                    task_title: task?.task_title,
                    payable_amount: task?.payable_amount,
                    worker_name: dbuser.name,
                    worker_email: dbuser.email,
                    ...data,
                    buyer_name: task?.buyer_name,
                    buyer_email: task?.buyer_email,
                    current_date: new Date(),
                    status: 'pending'
                }
               

                axiosSecure.post('/submissions', submitinfo)
                    .then(res => {
                        refetch()
                    })

                Swal.fire({
                    title: "Submitted!",
                    text: "Your task has been submitted.",
                    icon: "success"
                });
                const notification = {
                    message: `Review ${task.task_title} submition by ${dbuser?.email}`,
                    ToEmail: task.buyer_email,
                    Time: new Date(),
                }
                axiosSecure.post('/notifications', notification)
                    .then(res => {  })
            }
        });
    }



    return (
        <div className='py-10 w-[92%]  max-w-screen-xl mx-auto'>
            <div className='p-4 border border-white rounded-lg grid gap-5 md:grid-cols-2 bg-gradient-to-br from-[#dce9fb] to-[#fbe4fc] '>
                <img className='rounded-md' src={task?.task_image_url} alt="" />
                <div>
                    <h2 className='text-2xl font-bold'>{task?.task_title}</h2>

                    <div className='flex gap-3 my-3'>
                        <img className='w-10 py-3' src={requirement} alt="" />
                        <p className='text-xl my-3'>{task?.task_detail}</p>
                    </div>


                    <div className='text-xl font-medium space-y-2'>

                        <li className='flex items-center gap-2'>
                          
                        Pay Amount: {task?.payable_amount}
                            <img className='w-7 h-7' src={coin} alt="" />
                           
                        </li>

                        <li className='flex items-center gap-2'>
                            
                            <img className='w-7 h-7' src={worker} alt="" />
                            Required Workers: {task?.required_workers}
                        </li>

                        <li className='flex items-center gap-2'>
                           
                            <img className='w-7 h-7' src={deadline} alt="" />
                            Deadline: {task?.completion_date}
                        </li>

                        <li className='flex items-center gap-2'>
                            
                            <img className='w-7 h-7' src={buyer} alt="" />
                            Buyer Name: {task?.buyer_name}
                        </li>

                        <li className='flex items-center gap-3'>
                           
                            <img className='w-6 h-6' src={email} alt="" />
                            Buyer Name: {task?.buyer_email}
                        </li>
                    </div>

                    <p className='text-xl my-4 flex gap-3 items-center'>
                        <img className='w-6 h-6' src={pin} alt="" />
                        <span className='font-semibold underline underline-offset-2'>What to submit</span> - {task?.submission_info}</p>
                </div>
            </div>

            {/* form */}
            <div className='bg-white my-12 p-6 lg:p-12 rounded-lg'>
                <h2 className='text-3xl font-semibold'>Submission form -</h2>
                {/* title */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text text-lg">Submission Details</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Enter submission details"
                            {...register("submission_Details")}
                            className="textarea textarea-bordered h-32" required />
                    </div>

                    <div className="form-control mt-4 md:col-span-2 flex items-end">
                        <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        className="btn w-48 bg-gradient-to-r from-[#97c4fa] to-[#f9c0fe]">Submit</motion.button>
                    </div>

                </form>
            </div>

        </div>
    );
};

export default Details;