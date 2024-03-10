import { Outlet } from "react-router-dom";
import MainLayoutHeader from "./MainLayoutHeader";
import MainLayoutFooter from "./MainLayoutFooter";
import './MainLayout.css';

const MainLayout = () => {
	return (
		<>
			{/* Header */}
			<header>
				<MainLayoutHeader />
			</header>

			{/* children */}
			<main style={{minHeight: '60vh'}}>
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="border-t-2 pt-4">
				<MainLayoutFooter />
			</footer>
		</>
	)
}

export default MainLayout