import { Outlet } from "react-router-dom";
import AdminNavigation from "../components/admin/AdminNavigation";
import Breadcrumbs from "../components/Breadcrumbs";

const AdminLayout = () => {
    return (
        <>
        <AdminNavigation />
        <div className="container mx-auto">
            <Breadcrumbs />
            <Outlet />
        </div>
        </>
    );
}

export default AdminLayout;