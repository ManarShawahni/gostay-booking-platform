import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page not found</p>
      <Link 
        to="/" 
        className="text-primary hover:text-blue-700 underline text-lg"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;