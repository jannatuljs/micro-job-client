import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import logo from '../../../../assets/logo/logo.jpeg'
import stripelogo from '../../../../assets/logo/Stripe.png'
import Swal from 'sweetalert2';
import { motion } from 'motion/react';


const CheckoutForm = ({ price, coin, category }) => {

    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')


    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            toast.error(error.message)
        } else {

        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            
        } else {
            // console.log('payment intent-', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // saveing the payment details in database
                const payment = {
                    email: user?.email,
                    name: user?.displayName,
                    price: price,
                    coin: coin,
                    package: category,
                    transactionId: paymentIntent.id,
                    date: new Date(), //TODO: convert with moment js
                }

                const res = await axiosSecure.post('/payments', payment);

                if (res.data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Payment Successfull",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/buyerhome')
                }
            }
        }

    }

    return (
        <div className='border border-white bg-white bg-gradient-t-r from-[#deebfc] to-[#fde6ff] p-6 rounded-xl'>

            <div className=' flex justify-center gap-4 mx-auto py-2 pb-8 border-b '>
                <img className='w-10' src={logo} alt="" />
                <div className=" text-2xl md:text-3xl font-bold  bg-gradient-to-r from-[#7fb9ff] to-[#f8a9ff] text-transparent bg-clip-text">NanoTasks</div>
            </div>

            <div className='flex justify-between items-center bg-gradient-to-r from-[#b0d4ff] to-[#fbceff] rounded-lg lg:mx-34 my-6'>
                <div>
                    <img className='w-32 rounded-lg mx-4' src={stripelogo} alt="" />
                </div>
                <div className='text-2xl lg:text-3xl py-8 mx-4 font-medium'>
                    Pay Amount: {price/100} $
                </div>
            </div>

            <form className='lg:px-32 py-4' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.8 }}
                type="submit" disabled={!stripe || !clientSecret} className='px-10 py-2 text-xl rounded-md bg-gradient-to-br from-[#b0d4ff] to-[#fbceff] mt-10 border border-white'>
                    Pay
                </motion.button>
                {
                    transactionId &&
                    <div className='text-green-500'>Your transaction id is {transactionId}</div>
                }
            </form>

        </div>
    );
};

export default CheckoutForm;