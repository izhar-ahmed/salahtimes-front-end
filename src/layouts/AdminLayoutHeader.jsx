import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '@/img/mark-logo.png'
import { useEffect, useState } from "react";
import menuAdmin from "@/layouts/menuAdmin";
import menuManager from "@/layouts/menuManager";
import menuUser from "@/layouts/menuUser";
import { getLocalStorageItem } from "@/util/common";
import PropTypes from "prop-types";
import { consts } from "@/util/APIEndpoints";

const AdminNavigationElement = ({ roles }) => {
	if (typeof roles === 'undefined') {
		return null;
	}
  if (roles.includes('Admin')) {
		return menuAdmin.map((navItem, index) => {
      return navItem.display ? <NavLink key={index} className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to={navItem.to}>{navItem.name}</NavLink> : ''
    }) 
  } else if (roles.includes('Manager')) {
		return menuManager.map((navItem, index) => {
			return navItem.display && <NavLink key={index} className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to={navItem.to}>{navItem.name}</NavLink>
    }) 
  } else if (roles.includes('User')) {
    return menuUser.map((navItem, index) => {
      return navItem.display && <NavLink key={index} className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to={navItem.to}>{navItem.name}</NavLink>
    }) 
  } else {
    return null; // Handle the case when no valid role is provided
  }
}

AdminNavigationElement.propTypes = {
	roles: PropTypes.array
}



const AdminLayoutHeader = () => {
	const navigate = useNavigate();
	const [roles, setRoles] = useState([])
	const handleLogout = async () => {
		const token = getLocalStorageItem('token');
		try {
			await axios.post(consts.LOGOUT_API, {}, {
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			});

			// Remove token from local storage
			localStorage.removeItem('token');
			localStorage.removeItem('isAdmin')
      localStorage.removeItem('email')

			// Navigate to the login page
			navigate('/m-admin/login');
		} catch (error) {
			console.error('Logout Error:', error);
			// Handle error, e.g., show a message to the user 
			navigate('/m-admin/login');
		}
	}

	useEffect(() => {
		const localStorageRoles = getLocalStorageItem('roles')
		setRoles(localStorageRoles)
	}, [])

	return (
		<header className="text-gray body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<Link to='/m-admin' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
					<img src={logo} className="w-10 h-10" alt="" />
					<span className="ml-3 text-xl">SalahTimes</span>
				</Link>
				<nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
					<AdminNavigationElement roles={roles} />
				</nav>
				<button type="button" className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={handleLogout}>Logout
					<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
						<path d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				</button>
			</div>
		</header>
	);
};

export default AdminLayoutHeader;