import { Link } from 'react-router-dom';
import './Nav.css';

export const Navigration = () => {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/games">Games</Link>
      <Link to="/books">Books</Link>
    </nav>
  );
};
