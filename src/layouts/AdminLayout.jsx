import Breadcrumbs from "@/layouts/Breadcrumbs";
import AdminLayoutHeader from "@/layouts/AdminLayoutHeader"
import AdminLayoutFooter from "@/layouts/AdminLayoutFooter"
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
	return (
		<>
			{/* Header */}
			<header>
				<AdminLayoutHeader />
			</header>

			<section id="breadcrumb-section">
				<div className="container px-4 mx-auto">
					<Breadcrumbs />
				</div>
			</section>

			{/* children */}
			<main className="container px-4 mx-auto" style={{minHeight: 'calc(100vh - 144px)'}}>
				<Outlet />
			</main>

			{/* Footer */}
			<footer>
				<AdminLayoutFooter />
			</footer>
		</>
	)
}

export default AdminLayout;