import React, { useContext } from 'react';
import useBuyer from '../Hooks/useBuyer';
import { AuthContext } from '../Components/Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const BuyerRoute = ({ children }) => {

    const { user, loading, setLoading } = useContext(AuthContext)
    const [isBuyer, isLoading] = useBuyer()
    const location = useLocation()

    if (loading || isLoading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
    }

    if (user && isBuyer) {
        setLoading(false)
        return children
    }

    return <Navigate to={'/auth'} state={{ from: location }} replace />;
};

export default BuyerRoute;