import doorPic from "./images/maria-ziegler-jJnZg7vBfMs-unsplash.jpg";
import {useState} from "react";
import StyledInput from "../components/ui/StyledInput";
import {Link} from "react-router-dom";
import Button from "../components/ui/Button";
function SignIn() {
    const [formData, setFormData] = useState({email: "", password: ""});
    const updateEmail = (newEmail) => {
        const newFormData = {...formData, email:newEmail}
        setFormData(newFormData);
    }

    const updatePassword = (newPassword) => {
        const newFormData = {...formData, password:newPassword}
        setFormData(newFormData);
    }

    return (
        <section>
            <h1 className={"text-3xl text-center"}>Sign In</h1>
            <div className={"flex flex-wrap justify-center px-6 py-12 gap-2 items-center"}>
                <div className={"md:w-2/3 lg:w-1/2 mb-12 md:mb-6"}>
                    <img className={"w-full rounded-2xl"}
                        alt="picture with key and door lock" src={doorPic}/>
                </div>
                <div className={"w-full md:w-1/3 lg:w-1/3"}>
                    <StyledInput type="email" placeholder={"Email Address"} value={formData.email} onChange={(e) => {updateEmail(e.currentTarget.value)}}/>
                    <StyledInput type="password" placeholder={"Password"}  value={formData.password} onChange={(e) => {updatePassword(e.currentTarget.value)}}/>
                    <div className={"flex flex-row justify-between whitespace-nowrap text-sm sm:text-lg my-3"}>
                        <p>Don't have an account?  <Link to={"/sign-up"}
                                                         className={"ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out"}>
                                                         Register</Link></p>
                        <p><Link to={"/forgot-password"}
                                 className={"ml-1 text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out"}>Forgot password?</Link> </p>
                    </div>
                    <Button text={"sign in"} color={"blue"} text_color={"white"}/>
                    <div className={"my-4 flex " +
                                    "before:border-t before:flex-1 items-center before:border-gray-300 " +
                                    "after:border-t after:flex-1 items-center after:border-gray-300"
                    }>
                        <p className={"text-center font-semibold uppercase mx-4"}>Or</p>
                    </div>
                    <Button text={"Continue with google"} color={"red"} text_color={"white"}/>
                </div>
            </div>
        </section>
    );
}

export default SignIn;