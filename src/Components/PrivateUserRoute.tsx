import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateUserRoute = ({children}: any) => {
    const isAuthenticated  = useSelector((state: any) => state.eCommerceUser.isAuthenticated);
    return (
        <>
            {
                isAuthenticated ? 
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

export default PrivateUserRoute;