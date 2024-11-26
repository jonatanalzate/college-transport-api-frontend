import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const AuthGuard = () => {
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AuthGuard; 