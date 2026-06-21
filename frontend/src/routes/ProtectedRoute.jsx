import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContextProvider";

const ProtectedRoute = (props) => {
    const { user } = useAuth();
    return user ? props.children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;