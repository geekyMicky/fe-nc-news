import '../../styling/Header.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../contexts/userContext';

const Header = () => {
    const { user, isLoggedIn, setIsLoggedIn, setUser } = useContext(userContext);

    const handleLogout = () => {
        setUser(null);
        setIsLoggedIn(false);
    };

    return ( 
        <header>
            <h1>NC News</h1>
            <nav>
                {isLoggedIn ? (
                    <div className="user-info">
                        <span>Welcome, {user}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </header>
     );
}
 
export default Header;