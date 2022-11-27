import doorPic from "./images/maria-ziegler-jJnZg7vBfMs-unsplash.jpg";
import {useState} from "react";
import StyledInput from "../components/ui/StyledInput";
import {Link} from "react-router-dom";
import Button from "../components/ui/Button";
import {auth, db} from "../firebase";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {serverTimestamp, setDoc, doc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {
    const [formData, setFormData] = useState({email: "", password: "", full_name:""});
    const navigate = useNavigate();

    const updateEmail = (newEmail) => {
        const newFormData = {...formData, email:newEmail}
        setFormData(newFormData);
    }

    const updatePassword = (newPassword) => {
        const newFormData = {...formData, password:newPassword}
        setFormData(newFormData);
    }

    const updateName = (newName) => {
        const newFormData = {...formData, full_name:newName}
        setFormData(newFormData);
    }

    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            updateProfile(auth.currentUser, {displayName: formData.full_name});
            const dbProfileData = {...formData};
            delete dbProfileData.password;
            dbProfileData.timestamp = serverTimestamp();
            await setDoc(doc(db, "users", auth.currentUser.uid), dbProfileData);
            navigate("/");
            toast.success("Account created!");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <section>
            <h1 className={"text-3xl text-center"}>Register</h1>
            <div className={"flex flex-wrap justify-center px-6 py-12 gap-2 items-center"}>
                <div className={"md:w-2/3 lg:w-1/2 mb-12 md:mb-6"}>
                    <img className={"w-full rounded-2xl"}
                         alt="picture with key and door lock" src={doorPic}/>
                </div>
                <div className={"w-full md:w-1/3 lg:w-1/3"}>
                    <StyledInput type="text" placeholder={"Full name"} value={formData.full_name} onChange={(e) => {updateName(e.currentTarget.value)}}/>
                    <StyledInput type="email" placeholder={"Email Address"} value={formData.email} onChange={(e) => {updateEmail(e.currentTarget.value)}}/>
                    <StyledInput type="password" placeholder={"Password"}  value={formData.password} onChange={(e) => {updatePassword(e.currentTarget.value)}}/>
                    <div className={"flex flex-row justify-between whitespace-nowrap text-sm sm:text-lg my-3"}>
                        <p>Don't have an account?  <Link to={"/sign-up"}
                                                         className={"ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out"}>
                            Register</Link></p>
                        <p><Link to={"/forgot-password"}
                                 className={"ml-1 text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out"}>Forgot password?</Link> </p>
                    </div>
                    <Button text={"sign up"} color={"blue"} text_color={"white"} onClick={signUp}/>
                    <div className={"my-4 flex " +
                        "before:border-t before:flex-1 items-center before:border-gray-300 " +
                        "after:border-t after:flex-1 items-center after:border-gray-300"
                    }>
                        <p className={"text-center font-semibold uppercase mx-4"}>Or</p>
                    </div>
                    <OAuth/>
                </div>
            </div>
        </section>
    );
}

export default SignUp;