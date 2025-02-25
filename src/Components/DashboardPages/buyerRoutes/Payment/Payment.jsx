import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PAYMENT_PK)

const Payment = () => {

    const data = useLoaderData()
    
    const price = Math.round(data?.pay_amount * 100)
    const coin = data?.coins
    const category = data?.category


    return (
        <div className='min-h-[calc(100vh-370px)] p-16 py-48 '>
            <Elements className='my-auto bg-red-700' stripe={stripePromise}>
                <CheckoutForm  price={price} coin={coin} category={category}/>
            </Elements>
        </div>
    );
};

export default Payment;