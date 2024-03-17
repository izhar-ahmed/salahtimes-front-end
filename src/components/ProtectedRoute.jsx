import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import menuOthers from "@/layouts/menuOthers";

import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const validateTokenOnServer = async (token) => {
        try {
            const response = await axios.post("http://localhost:8080/api/validate-token", {}, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } });
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

    const isAdminBool = () => {
        const isAdminBool = localStorage.getItem("isAdmin");
        return isAdminBool == 'true' ? true : false;
    }

    const isRouteAllowed = (currentPath) => {
        const allowed = Array(menuOthers.length).fill(false);
    
        for (let i = 0; i < menuOthers.length; i++) {
            const item = menuOthers[i];
            
            for (let allowedLink of item.allowedLinks) {
                if (currentPath === allowedLink) {
                    allowed[i] = true;
                    break; // Exit inner loop once match is found
                } else if (allowedLink.includes('*')) {
                    const prefix = allowedLink.split('/')[2];
                    const currentPathPrefix = currentPath.split('/')[2];
                    
                    if (prefix === currentPathPrefix) {
                        allowed[i] = true;
                        break; // Exit inner loop once match is found
                    }
                }
            }
        }
        
        return allowed.includes(true);
    }    

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        const isAdmin = isAdminBool()
        if (!isAdmin) {
            const isAllowed = isRouteAllowed(currentPath)
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
