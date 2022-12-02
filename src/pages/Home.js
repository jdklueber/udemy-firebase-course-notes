import {getAuth} from "firebase/auth";
import {useAuthStatus} from "../hooks/useAuthStatus";

function Home() {
    const {waiting} = useAuthStatus();
    let currentUser = "";
    if(!waiting) {
        const auth = getAuth();
         currentUser = auth.currentUser ? auth.currentUser.email : "Not signed in";
    }


    return (
        <div>Current user:  {currentUser}

        </div>
    );
}

export default Home;