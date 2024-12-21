import { useContext, useState } from 'react';
import { userContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setUser, setIsLoggedIn, validUsers } = useContext(userContext);
    const [selectedUser, setSelectedUser] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (selectedUser) {
            setUser(selectedUser);
            setIsLoggedIn(true);
            navigate('/articles');
        } else {
            setError('Please select a user');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <select 
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="user-select"
                >
                    <option value="">Select a user</option>
                    {validUsers.map(username => (
                        <option key={username} value={username}>
                            {username}
                        </option>
                    ))}
                </select>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;