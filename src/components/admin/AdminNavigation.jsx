import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from './../../img/mark-logo.png'

const AdminNavigation = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        // console.log("Token: "+token);
        try {
            await axios.post('http://localhost:8080/api/logout', {}, {
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            });

            // Remove token from local storage
            localStorage.removeItem('token');

            // Navigate to the login page
            navigate('/m-admin/login');
        } catch (error) {
            console.error('Logout Error:', error);
            // Handle error, e.g., show a message to the user 
            navigate('/m-admin/login');
        }
    }

    return (
        <header className="text-gray body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link to='/m-admin' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src={logo} className="w-10 h-10" alt="" />
                    <span className="ml-3 text-xl">Dashboard</span>
                </Link>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                    <NavLink className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to="masjid" >Masjid</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to="users">User</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to="logs">Logs</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to="contacts">Contacts</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to="banner">Banner</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "bg-indigo-600 text-white mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded" : "mr-2 hover:bg-indigo-500 hover:text-white py-2 px-4 border-0 rounded"} to="user-profile">Profile</NavLink>
                </nav>
                <button className="inline-flex items-center bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={handleLogout}>Logout
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default AdminNavigation;