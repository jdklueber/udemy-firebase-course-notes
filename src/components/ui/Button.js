function Button({text, onClick, color, text_color}) {
    let bg = "bg-blue-600";
    let txtColor = "text-white";

    if (color === "red") {
        bg = "bg-red-600";
    }
    return (
        <button className={`w-full my-3 ${bg} ${txtColor} px-7 py-3 text-sm font-medium ` +
                           `uppercase rounded-xl shadow-md hover:bg-${color}-700 transition duration-200 ` +
                           `ease-in-out hover:shadow-lg active:bg-${color}-800`}
                onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;