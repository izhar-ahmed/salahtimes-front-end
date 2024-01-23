import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    const validateTokenOnServer = async (token) => {
        try {
            const response = await axios.post("http://localhost:8080/api/validate-token", {}, { headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } });
            if (response.status === 200) {
                // console.log("Token is valid on the server");
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
    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        console.log('localStorageToken', localStorageToken)

        const checkTokenValidity = async () => {
            if (!localStorageToken) {
                navigate("/m-admin");
            } else {
                const tokenIsValid = await validateTokenOnServer(localStorageToken);
                if (!tokenIsValid.status) {
                    navigate("/m-admin");
                }
            }
        };

        checkTokenValidity();
    }, [navigate]);
    return <>{children}</>;
};

export default ProtectedRoute;
