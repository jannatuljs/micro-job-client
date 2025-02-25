import { useContext } from "react";
import { AuthContext } from "../Components/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const AdminRoute = ({ children }) => {

    const { user, loading, setLoading } =  useContext(AuthContext);
    const [isAdmin, isLoading] = useAdmin();
    const location = useLocation();

    if (loading || isLoading) {
        return <div className='min-h-screen flex justify-center items-center'><span className="loading loading-ring loading-lg"></span></div>
    }

    if (user && isAdmin) {
        setLoading(false)
        return children
    }

    return <Navigate to={'/auth'} state={{from: location}} replace />;
};

export default AdminRoute;