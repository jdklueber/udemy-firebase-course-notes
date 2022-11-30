import {useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/20/solid";


function StyledInput({type, className, value, onChange, placeholder, disabled=false}) {
    const [showPassword, setShowPassword] = useState(false);
    let calculatedType = type;
    if (type === "password" && showPassword) {
        calculatedType = "text";
    }
    const iconClasses = "absolute h-5 top-3 right-3 cursor-pointer";

    return (
        <div className={"relative mt-5"}>
            <input type={calculatedType} className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300
                                           rounded transition ease-in ease-out 
                                           ${className}`}
                   value={value} onChange={onChange}
                   placeholder={placeholder}
                   disabled={disabled}
            />
            {type === "password" ? showPassword ?
                <EyeSlashIcon className={iconClasses} onClick={()=>setShowPassword(false)}/>
                : <EyeIcon className={iconClasses} onClick={()=>setShowPassword(true)}/>
                : ""}
        </div>
    );
}

export default StyledInput;