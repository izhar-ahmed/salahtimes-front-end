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
import EditNamazTime from "./pages/admin/EditNamazTime";
import Users from "./pages/admin/Users";
import Logs from "./pages/admin/Logs";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/masjid/:masjidId',
        element: <MasjidDetails />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/m-admin',
    element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <Dashboard />
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
      },
      {
        path: 'masjid/edit-timetable/:masjidId',
        element: <EditNamazTime />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'users/add-user',
        element: <AddUser />
      },
      {
        path: 'users/edit-user/:userId',
        element: <EditUser />
      },
      {
        path: 'logs',
        element: <Logs />
      },
      
    ]
  }
]);

export default router;