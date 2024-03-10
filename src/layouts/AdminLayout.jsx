import {MainLayoutHeader, MainLayoutFooter } from "../components"
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
	return (
		<>
			{/* Header */}
			<header>
				<MainLayoutHeader />
			</header>

			{/* children */}
			<main>
				<Outlet />
			</main>

			{/* Footer */}
			<footer>
				<MainLayoutFooter />
			</footer>
		</>
	)
}

export default AdminLayout;