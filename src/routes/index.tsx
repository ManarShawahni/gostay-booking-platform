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

import { ProtectedRoute, RoleProtectedRoute } from "./ProtectedRoutes";

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