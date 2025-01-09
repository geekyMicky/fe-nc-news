import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../contexts/userContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(userContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;