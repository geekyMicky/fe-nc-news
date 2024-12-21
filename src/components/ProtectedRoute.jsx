import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../contexts/User';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(userContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;