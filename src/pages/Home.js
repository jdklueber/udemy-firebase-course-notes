import {getAuth} from "firebase/auth";

function Home() {
    const auth = getAuth();
    const currentUser = auth.currentUser ? auth.currentUser.email : "Not signed in";
    return (
        <div>Current user:  {currentUser}

        </div>
    );
}

export default Home;