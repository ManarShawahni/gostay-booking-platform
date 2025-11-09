import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import HotelDetailPage from '../pages/HotelDetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import AdminPage from '../pages/AdminPage';
import NotFoundPage from '../pages/NotFoundPage';

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
        element: <HotelDetailPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
      {
        path: 'confirmation/:bookingId',
        element: <ConfirmationPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
    ],
  },
]);