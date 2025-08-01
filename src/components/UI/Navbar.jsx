import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="bg-dark-green text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Hawai Academy</Link>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;