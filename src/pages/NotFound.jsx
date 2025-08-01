import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-9xl font-bold text-green-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button as={Link} to="/" variant="primary">
        Return Home
      </Button>
    </div>
  );
};

export default NotFound;