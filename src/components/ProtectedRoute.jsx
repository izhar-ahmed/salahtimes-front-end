import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import menuManager from "@/layouts/menuManager";
import menuUser from "@/layouts/menuUser";

import PropTypes from "prop-types";
import { consts } from "@/util/APIEndpoints";
import { getLocalStorageItem } from "@/util/common";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const validateTokenOnServer = async (token) => {
        try {
            const response = await axios.post(consts.VALIDATE_API, {}, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } });
            if (response.status === 200) {
                return {
                    status: true,
                    message: 'Token is valid on the server'
                }
            } else {
                return {
                    status: false,
                    message: 'Token validation failed on the server'
                };
            }
        } catch (error) {
            return {
                status: false,
                message: "Error validating token on server:" + error
            }
        }
    };

    /**
     * Retrieves the role of the user from local storage.
     * @returns {string|null} - The role of the user ('Admin', 'Manager', 'User'), or null if not found.
     */
    const getUserRole = () => {
        let roles = getLocalStorageItem("roles") || []; // Retrieve user roles from local storage

        if (typeof roles === 'undefined') {
            roles = []; // Handle the case when roles are not defined
        }

        // Check if roles include 'Admin', 'Manager', or 'User' and return the appropriate role
        if (roles.includes('Admin')) {
            return 'Admin';
        } else if (roles.includes('Manager')) {
            return 'Manager';
        } else if (roles.includes('User')) {
            return 'User';
        } else {
            return null; // No valid role found
        }
    };

    /**
     * Determines whether the current route is allowed for the given role based on menu configuration.
     * @param {string} currentPath - The current path/route.
     * @param {string} role - The role of the user.
     * @returns {boolean} - Returns true if the route is allowed for the given role, false otherwise.
     */
    const isRouteAllowedForRole = (currentPath, role) => {
        // By default, consider menu items as menu for Manager role
        let menuItems = menuManager;

        // If the role is 'User' or not defined, switch menu items to those for User role
        if (role === 'User' || typeof role === 'undefined') {
            menuItems = menuUser;
        }

        // An array to store whether each menu item is allowed for the current route
        const allowed = Array(menuItems.length).fill(false);
        
        // Iterate through each menu item to check if the current route is allowed
        for (let i = 0; i < menuItems.length; i++) {
            const item = menuItems[i];
            
            // Iterate through each allowed link of the current menu item
            for (let allowedLink of item.allowedLinks) {
                if (currentPath === allowedLink) {
                    allowed[i] = true;
                    break; // Exit inner loop once a match is found
                } else if (allowedLink.includes('*')) {
                    // Check if the allowed link contains wildcard '*' for prefix matching
                    const prefix = allowedLink.split('/')[2];
                    const currentPathPrefix = currentPath.split('/')[2];
                    
                    if (prefix === currentPathPrefix) {
                        allowed[i] = true;
                        break; // Exit inner loop once a match is found
                    }
                }
            }
        }
        // Return true if any menu item is allowed for the current route, false otherwise
        return allowed.includes(true);
    };


    useEffect(() => {
        // const localStorageToken = getLocalStorageItem("token");
        const localStorageToken = getLocalStorageItem("token");
        const userRole = getUserRole()

        // Handle null condition
        if (userRole === null) {
            navigate("/m-admin/login");
        }

        if (userRole !== 'Admin') {
            const isAllowed = isRouteAllowedForRole(currentPath, userRole)
            if (!isAllowed) {
                navigate("/m-admin/404");
            }
        }

        const checkTokenValidity = async () => {
            if (!localStorageToken) {
                navigate("/m-admin/login");
            } else {
                const tokenIsValid = await validateTokenOnServer(localStorageToken);
                if (!tokenIsValid.status) {
                    navigate("/m-admin/login");
                }
            }
        };

        checkTokenValidity();
    }, [navigate, currentPath]);
    return <>{children}</>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.any
}

export default ProtectedRoute;
