import {useEffect, useState} from "react";
import StyledInput from "../components/ui/StyledInput";
import {getAuth} from "firebase/auth";

function Profile() {
    const auth = getAuth();
    const [profileData, setProfileData] = useState({name: "", email:""});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(() => {
            let newName = "";
            let newEmail = "";
            if (auth.currentUser) {
                newEmail = auth.currentUser.email;
                newName = auth.currentUser.displayName;
            }

            setProfileData({
                name: newName,
                email: newEmail
            })
        })
    }, [auth])


    return (
        <>
            <section className={"mx-auto max-w-6xl flex justify-center items-center flex-col"}>
                <h1 className={"text-3xl text-center font-bold"}>My Profile</h1>
                <div className={"w-full md:w-1/2 mt-6 px-3"}>
                    <StyledInput placeholder={""} disabled={editMode} value={profileData.name} type={"text"}/>
                    <StyledInput placeholder={""} disabled={editMode} value={profileData.email} type={"text"}/>
                </div>
                <div className={"whitespace-nowrap text-sm md:text-lg mb-6"}>
                    <p>
                        Do you want to change your name?
                        <span className={"text-red-600 hover:text-red-900" +
                                         " transition ease-in-out duration-200 ml-1 cursor-pointer"}>
                            Edit
                        </span>
                    </p>
                </div>
            </section>
        </>
    );
}

export default Profile;