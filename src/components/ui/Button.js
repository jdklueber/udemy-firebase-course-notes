function Button({text, onClick, color, text_color}) {
    return (
        <button className={`w-full my-3 bg-${color}-600 text-${text_color} px-7 py-3 text-sm font-medium ` +
                           `uppercase rounded-xl shadow-md hover:bg-${color}-700 transition duration-200 ` +
                           `ease-in-out hover:shadow-lg active:bg-${color}-800`}
                onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;