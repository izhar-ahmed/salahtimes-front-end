import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import RootLayout from "./pages/Root";
import MasjidDetails from "./pages/MasjidDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/masjid/:id',
        element: <MasjidDetails />
      }
    ]
  },
  {
    path: '/m-admin',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  }
]);

export default router;