import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false);
            }
            setWaiting(false);
        })
    }, []);


    return {loggedIn, waiting};
}

export {useAuthStatus};