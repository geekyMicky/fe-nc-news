import '../assets/Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return ( 
        <header>
            <h1>NC News</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/articles">Articles</Link></li>
                </ul>
            </nav>
        </header>
     );
}
 
export default Header;