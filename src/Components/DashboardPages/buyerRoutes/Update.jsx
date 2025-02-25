import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAxiosSecure from './../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';

const Update = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    if (!id) {
        return <div>No ID provided for task update.</div>;
    }

    const { data: task, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/task/${id}`);
            return res.data;
        },
        enabled: Boolean(id),
    });

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {


        const updateDoc = {
            task_title: data.task_title,
            task_detail: data.task_detail,
            submission_info: data.submission_info
        }
        const updateRes = await axiosSecure.patch(`/task/${id}`, updateDoc)

        if (updateRes.data.modifiedCount) {
            toast.success('Task informations updated')
        }
        if (updateRes.data.modifiedCount == 0) {
            toast.warning('No information updated or changed')
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="md:p-10">
            <div className="max-w-screen-xl w-[92%] mx-auto border-2 border-white bg-white lg:p-12 my-12 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body grid gap-3 md:grid-cols-2">
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter title"
                            defaultValue={task?.task_title || ''}
                            {...register("task_title")}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Task Details</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter details"
                            defaultValue={task?.task_detail || ''}
                            {...register("task_detail")}
                            className="textarea textarea-bordered pb-9 h-20"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Required Workers</span>
                        </label>
                        <input
                            type="number"
                            disabled
                            defaultValue={task?.required_workers || ''}
                            {...register("required_workers")}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Payable Amount</span>
                        </label>
                        <input
                            type="number"
                            disabled
                            placeholder="Enter payable amount"
                            defaultValue={task?.payable_amount || ''}
                            {...register("payable_amount")}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input
                            type="date"
                            disabled
                            defaultValue={task?.completion_date?.split('T')[0] || ''}
                            {...register("completion_date")}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enter Image</span>
                        </label>
                        <input
                            type="file"
                            disabled
                            {...register("task_image_url")}
                            className="file-input file-input-ghost file-input-bordered w-full bg-white mx-auto"
                            required
                        />
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text">Submission Information</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter submission requirements"
                            defaultValue={task?.submission_info || ''}
                            {...register("submission_info")}
                            className="textarea textarea-bordered pb-9 h-20"
                            required
                        />
                    </div>

                    <div className="form-control mt-6 md:col-span-2">
                        <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        className="btn bg-gradient-to-r from-[#97c4fa] to-[#f9c0fe]">
                            Update Task
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Update;
