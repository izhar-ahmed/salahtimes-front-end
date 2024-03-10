import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import MasjidDetails from "./pages/MasjidDetails";
import Login from "./pages/admin/Login";
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
import NotFound2 from "./pages/NotFound2";
import ForgotPassword from "./pages/admin/ForgotPassword.";
import ResetPassword from "./pages/admin/ResetPassword";
import UserProfilePage from "./pages/admin/Profile";
import TermsAndServices from "./pages/TermsAndServices";
import Contacts from "./pages/admin/Contacts";
import Banner from "./pages/admin/Banner";
import ContactDetails from "./pages/admin/ContactDetails";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
        path: '/terms-and-services',
        element: <TermsAndServices />
      },
      {
        path: '/masjid/:masjidSlug',
        element: <MasjidDetails />
      }
    ]
  },
  {
    path: '/m-admin/login',
    element: <Login />
  },
  {
    path: '/m-admin/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/m-admin/reset-password/:code',
    element: <ResetPassword />
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
        path: 'contacts',
        element: <Contacts />
      },
      {
        path: 'contacts/view-contact/:contactId',
        element: <ContactDetails />
      },
      {
        path: 'banner',
        element: <Banner />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'user-profile',
        element: <UserProfilePage />
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
      {
        path: '*',
        element: <NotFound2 />,
      }
      
    ]
  }
]);

export default router;