import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import RootLayout from "./pages/Root";
import MasjidDetails from "./pages/MasjidDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/AdminRoot";
import Masjid from "./pages/admin/Masjid";
import AddMasjid from "./pages/admin/AddMasjid";
import EditMasjid from "./pages/admin/EditMasjid";
import ViewMasjid from "./pages/admin/ViewMasjid";
import AddNamazTime from "./pages/admin/AddNamazTime";
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
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: "masjid",
        element: <Masjid />,
      },
      {
        path: 'masjid/add-masjid',
        element: <AddMasjid />,
      },
      {
        path: 'masjid/edit-masjid/:masjidId',
        element: <EditMasjid />,
      },
      {
        path: 'masjid/view-masjid/:masjidId',
        element: <ViewMasjid />,
      },
      {
        path: 'masjid/add-timetable/:masjidId',
        element: <AddNamazTime />,
      }
    ]
  }
]);

export default router;