import React, { useRef, useState } from 'react';
import useUser from '../../../Hooks/useUser';
import coin from '../../../assets/icons/coin.png'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { motion } from 'motion/react';


const Withdrawals = () => {

    const [dbuser] = useUser()
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const withdrawCoin = watch("withdrawal_coin") || 0
    const amount = (withdrawCoin * 0.05).toFixed(2)

    const onSubmit = async (data) => {


        if (data.payment_system === 'default') {
            return toast.warning('Select a payment system')
        }

        if (data.account_number.length !== 11) {
            return toast.warning(`Enter a valid ${data.payment_system} account number.`)
        }

        const withdrawalReq = {
            ...data,
            worker_email: dbuser?.email,
            worker_name: dbuser?.name,
            withdrawal_coin: parseInt(data.withdrawal_coin),
            withdrawal_amount: parseInt(amount),
            withdraw_date: new Date(),
            status: 'pending'
        }


        const res = await axiosSecure.post('/withdraws', withdrawalReq)
      
        if (res.data.acknowledged) {
            toast.success('Withdrawal request sent to admin')
            const notification = {
                message: `${dbuser.email} has requested to withdraw ${data.withdrawal_coin} coins. `,
                ToEmail: 'fariya@gmail.com',
                Time: new Date(),
            }
            axiosSecure.post('/notifications', notification)
                .then(res => { })
            reset()
        }

    }

    return (
        <div className='min-h-[calc(100vh-370px)] py-10 w-[92%]  max-w-screen-xl mx-auto '>
            <div className='p-8 md:p-14 border border-white rounded-lg bg-gradient-to-br from-[#dce9fb] to-[#fbe4fc] text-center'>
                <h3 className='text-4xl font-semibold'>Your Earning</h3>
                <div className='md:flex justify-evenly my-10 font-semibold text-2xl'>

                    <div className='flex gap-1 my-4 items-center'>
                        <p>Current Coin : {dbuser.coin}</p>
                        <img className='w-7 h-7' src={coin} alt="" />
                    </div>
                    <div className='my-4'>
                        <p>withdrawal amount : {dbuser.coin * (0.05)} $</p>
                    </div>

                </div>

            </div>

            <div className='p-5 md:p-10 my-10 rounded-lg bg-white'>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body grid gap-3 md:grid-cols-2">

                    {/* coin */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Withdrawal Coin</span>
                        </label>

                        <input
                            type="number"
                            placeholder="Enter coins"
                            {...register("withdrawal_coin")}
                            className="input input-bordered" required />
                    </div>


                    {/* amount */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Withdrawal Amount</span>
                        </label>

                        <input
                            disabled
                            value={`${amount} $`}
                            {...register("withdrawal_amount")}
                            className="input input-bordered" required />
                    </div>


                    {/* account number */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Account number</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Enter account number"
                            {...register("account_number")}
                            className="input input-bordered" required />
                    </div>


                    {/* system select */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Payment System</span>
                        </label>

                        <select
                            type="number"
                            defaultValue={'default'}
                            {...register("payment_system")}
                            className="input input-bordered" required >
                            <option disabled value="default">Select Payment System</option>
                            <option value='bkash'>Bkash</option>
                            <option value='rocket'>Rocket</option>
                            <option value='nagad'>Nagad</option>

                        </select>
                    </div>

                    {
                        dbuser?.coin < 200 || withdrawCoin > dbuser?.coin ?
                            <p className='text-xl md:col-span-2 mx-auto py-4 text-red-600'>Insufficient coin</p>
                            :
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.8 }}
                                className="btn md:col-span-2 mx-12 mt-6 bg-gradient-to-r from-[#97c4fa] to-[#f9c0fe]">
                                Withdraw
                            </motion.button>
                    }

                </form>
            </div>

        </div>
    );
};

export default Withdrawals;