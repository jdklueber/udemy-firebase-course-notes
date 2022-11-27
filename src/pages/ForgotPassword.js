import doorPic from "./images/maria-ziegler-jJnZg7vBfMs-unsplash.jpg";
import {useState} from "react";
import StyledInput from "../components/ui/StyledInput";
import Button from "../components/ui/Button";
import {toast} from "react-toastify";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {useNavigate} from "react-router-dom";
function ForgotPassword() {
    const [formData, setFormData] = useState({email: ""});
    const updateEmail = (newEmail) => {
        const newFormData = {...formData, email:newEmail}
        setFormData(newFormData);
    }
    const navigate = useNavigate();

    const submit =async () => {
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, formData.email);
            toast.success("Reset email sent")
            navigate("/sign-in")
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <section>
            <h1 className={"text-3xl text-center"}>Forgot Password</h1>
            <div className={"flex flex-wrap justify-center px-6 py-12 gap-2 items-center"}>
                <div className={"md:w-2/3 lg:w-1/2 mb-12 md:mb-6"}>
                    <img className={"w-full rounded-2xl"}
                         alt="picture with key and door lock" src={doorPic}/>
                </div>
                <div className={"w-full md:w-1/3 lg:w-1/3"}>
                    <StyledInput type="email" placeholder={"Email Address"} value={formData.email} onChange={(e) => {updateEmail(e.currentTarget.value)}}/>
                    <div className={"flex flex-row justify-between whitespace-nowrap text-sm sm:text-lg my-3"}>
                    </div>
                    <Button text={"Reset Password"} color={"blue"} text_color={"white"} onClick={submit}/>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;