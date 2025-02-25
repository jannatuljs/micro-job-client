import { useContext } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({ children }) => {

    const { user, loading, setLoading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
    }

    if (user) {
        setLoading(false)
        return children
    }

    return <Navigate to={'/auth'} state={{from: location}} replace />;
};

export default PrivateRoute;