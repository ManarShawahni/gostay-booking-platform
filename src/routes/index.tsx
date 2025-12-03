import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import {HomePage} from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import SearchResultsPage from '../pages/SearchResults/SearchResultsPage';
import HotelDetailPage from '../pages/HotelDetailPage/HotelDetailPage';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import ConfirmationPage from '../pages/ConfirmationPage/ConfirmationPage';
import NotFoundPage from '../pages/NotFoundPage';

import { ProtectedRoute, RoleProtectedRoute } from "./ProtectedRoutes";
import CartPage from '../pages/Cart/CartPage';

import {AdminLayout} from "../components/features/admin/layout/AdminLayout/AdminLayout";
import {AdminDashboard} from "../pages/Admin/AdminDashboard/AdminDashboard";
import CitiesPage from "../pages/Admin/CitiesPage";
import HotelsPage from "../pages/Admin/HotelsPage";
import RoomsPage from "../pages/Admin/RoomsPage";


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
        path: 'hotel/:id',
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
        path: 'confirmation',
        element: (
          <ProtectedRoute>
            <ConfirmationPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
      {
        path: '/admin',
        element: (
          <RoleProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout />
          </RoleProtectedRoute>
        ),
        children: [
          { index: true, element: <AdminDashboard/> }, 
          { path: "cities", element: <CitiesPage /> },
          { path: "hotels", element: <HotelsPage /> },
          { path: "rooms", element: <RoomsPage /> },
        ],
      },
]);