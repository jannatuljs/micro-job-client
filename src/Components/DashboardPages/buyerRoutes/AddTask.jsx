import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/AuthProvider';
import useImageHosting from '../../../Hooks/useImageHosting';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUser from '../../../Hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const AddTask = () => {

  const { user } = useContext(AuthContext)
  const [dbuser] = useUser()
  const image_hosting_api = useImageHosting()
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {


    const totalPay = data.required_workers * data.payable_amount
    if(totalPay > dbuser?.coin){
      navigate('/dashboard/purchase')
      return toast.warning("Not enoung coins for this task. Purchase Coin")
    }


    const imageFile = { image: data.task_image_url[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (res.data.success) {
      const task = {
        ...data,
        task_image_url: res.data.data.display_url,
        buyer_email: user?.email,
        buyer_name: user?.displayName
      }

      const TaskRes = await axiosSecure.post('/tasks', task)
      if (TaskRes.data.insertedId) {
        toast.success('New task added')
        reset()
      }

    } else {
      toast.error("Couldn't upload image")
    }


  };

  return (
    <div className='md:p-10'>

      <div className='max-w-screen-xl w-[92%] mx-auto border-2 border-white bg-white lg:p-12 my-12 rounded-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body grid gap-3 md:grid-cols-2">

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              type="text"
              placeholder="Enter title"
              {...register("task_title")}
              className="input input-bordered" required />

          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Task Details</span>
            </label>

            <input
              type="text"
              placeholder="Enter details"
              {...register("task_detail")}
              className="textarea textarea-bordered pb-9 h-20" required />

          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Required Workers</span>
            </label>

            <input
              type="number"
              placeholder="Enter worker count"
              {...register("required_workers")}
              className="input input-bordered" required />

          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Payable Amount</span>
            </label>

            <input
              type="number"
              placeholder="Enter payable amount"
              {...register("payable_amount")}
              className="input input-bordered" required />

          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Deadline</span>
            </label>

            <input
              type="date"
              placeholder="Enter deadline"
              {...register("completion_date")}
              className="input input-bordered" required />

          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter Image</span>
            </label>

            <input
              type="file"
              {...register("task_image_url")}
              className='file-input file-input-ghost file-input-bordered w-full bg-white mx-auto' required />

          </div>

          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Submission information</span>
            </label>

            <input
              type="text"
              placeholder="Enter submission requirements"
              {...register("task_detail")}
              className="textarea textarea-bordered pb-9 h-20" required />

          </div>

          <div className="form-control mt-6 md:col-span-2">
            <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className="btn bg-gradient-to-r from-[#97c4fa] to-[#f9c0fe]">Submit</motion.button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default AddTask;