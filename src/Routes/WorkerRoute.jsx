import React, { useContext } from 'react';
import { AuthContext } from '../Components/Provider/AuthProvider';
import useWorker from '../Hooks/useWorker';
import { Navigate, useLocation } from 'react-router-dom';

const WorkerRoute = ({ children }) => {

    const { user, loading, setLoading } = useContext(AuthContext)
    const [isWorker, isLoading] = useWorker()
    const location = useLocation()

    if (loading || isLoading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
    }

    if (user && isWorker) {
        setLoading(false)
        return children
    }

    return <Navigate to={'/auth'} state={{ from: location }} replace />;
};

export default WorkerRoute;