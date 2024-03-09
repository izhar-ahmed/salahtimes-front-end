import MainFooter from "../components/MainFooter";
import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <>
        <MainNavigation />
        <Outlet />
        <MainFooter />
        </>
    );
}

export default RootLayout;