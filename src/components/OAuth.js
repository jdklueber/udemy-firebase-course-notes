import Button from "./ui/Button";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import {db} from "../firebase";
import {doc, serverTimestamp, getDoc, setDoc} from "firebase/firestore";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function OAuth() {
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                const dbProfileData = {
                    email: user.email,
                    displayName: auth.currentUser.displayName
                };
                dbProfileData.timestamp = serverTimestamp();
                await setDoc(docRef, dbProfileData);
                toast.success("Account created!");
            }

            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div>
            <Button text={"Continue with google"} color={"red"} text_color={"white"}
                    onClick={signUp}
            />
        </div>
    );
}

export default OAuth;