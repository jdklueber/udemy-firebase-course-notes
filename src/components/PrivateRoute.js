import {Outlet, Navigate} from "react-router-dom";
import {useAuthStatus} from "../hooks/useAuthStatus";

function PrivateRoute() {
    const {loggedIn, waiting} = useAuthStatus();

    if (waiting) {
        <h3>Loading...</h3>
    } else {
        return loggedIn ? <Outlet/> : <Navigate to={"/sign-in"}/>
    }
}

export default PrivateRoute;