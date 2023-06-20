import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({children}: any) => {
    const isAdminAuthenticated  = useSelector((state: any) => state.eCommerceUser.isAdminAuthenticated);
    return (
        <>
            {
                isAdminAuthenticated ? 
                (
                    children
                )
                :
                (
                    <Navigate to="/" />
                )
            }
        </>
    );

}

export default PrivateAdminRoute;