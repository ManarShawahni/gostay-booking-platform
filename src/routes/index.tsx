import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import {HomePage} from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import SearchResultsPage from '../pages/SearchResults/SearchResultsPage';
import HotelDetailPage from '../pages/HotelDetailPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage/UnauthorizedPage';

import { ProtectedRoute, RoleProtectedRoute } from "./ProtectedRoutes";
import CartPage from '../pages/Cart/CartPage';

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
        path: "cart",
        element: <CartPage />,
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

       {
        path: 'unauthorized',
        element: <UnauthorizedPage />,
      },
    ],
  },
]);