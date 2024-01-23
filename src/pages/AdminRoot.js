import { Outlet } from "react-router-dom";
import AdminNavigation from "../components/AdminNavigation";

const AdminLayout = () => {
    return (
        <>
        <AdminNavigation />
        <Outlet />
        </>
    );
}

export default AdminLayout;