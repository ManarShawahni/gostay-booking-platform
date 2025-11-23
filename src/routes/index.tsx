import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import HotelDetailPage from '../pages/HotelDetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';

import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

/*-----------------------------------------*/

const RoleProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'search',
        element: <SearchResultsPage />,
      },
      {
        path: 'hotel/:hotelId',
        element: (
          <ProtectedRoute>
            <HotelDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'confirmation/:bookingId',
        element: (
          <ProtectedRoute>
            <ConfirmationPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AdminPage />
          </RoleProtectedRoute>
        ),
      },

    ],
  },
]);