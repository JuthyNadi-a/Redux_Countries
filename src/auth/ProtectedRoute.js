import { Outlet, Navigate } from "react-router-dom";

const ProctedtedRoute = ({user, children}) => {
    if(!user) {
        return <Navigate to="/login" replace/>
    } 
    return <Outlet />
}
export { ProctedtedRoute };