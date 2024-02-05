import { Outlet } from "react-router-dom";
import AdminNavigation from "../components/admin/AdminNavigation";
import Breadcrumbs from "../components/Breadcrumbs";
import AdminFooter from "../components/admin/AdminFooter";

const AdminLayout = () => {
    return (
        <>
        <AdminNavigation />
        <div className="container mx-auto" style={{minHeight: 'calc(100vh - 144px)'}}>
            <Breadcrumbs />
            <Outlet />
        </div>
        <AdminFooter />
        </>
    );
}

export default AdminLayout;