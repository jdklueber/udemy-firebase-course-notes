import {useLocation, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();

    const routeStyling = (route) => {
        return route === location.pathname ? "text-black border-b-red-500" : "";
    }
    const linkBaseStyles = "cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]";
    const signOutHandler = () => {
        signOut(auth);
    }

    const signInOut = auth.currentUser ?
        <li className={`${linkBaseStyles}`}
            onClick={() => signOutHandler()}>Sign Out</li>
        :
        <li className={`${linkBaseStyles} ${routeStyling("/sign-in")}`}
                                             onClick={() => navigate("/sign-in")}>Sign In</li>

    return (
        <header className={"flex justify-between items-center px-3 border-b z-50 sticky bg-white"}>
            <div>
                <img className={"h-5 cursor-pointer"}
                     onClick={() => navigate("/")}
                     src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"/>
            </div>
            <div>
                <ul className={"flex flex-row space-x-10"}>
                    <li className={`${linkBaseStyles} ${routeStyling("/")}` }
                    onClick={() => navigate("/")}>Home</li>
                    <li className={`${linkBaseStyles} ${routeStyling("/offers")}`}
                        onClick={() => navigate("/offers")}>Offers</li>
                    {signInOut}

                </ul>
            </div>
        </header>
    );
}

export default Header;