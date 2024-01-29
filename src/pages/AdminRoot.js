import { Outlet } from "react-router-dom";
import AdminNavigation from "../components/admin/AdminNavigation";

const AdminLayout = () => {
    return (
        <>
        <AdminNavigation />
        <div className="container mx-auto">
            <Outlet />
        </div>
        </>
    );
}

export default AdminLayout;