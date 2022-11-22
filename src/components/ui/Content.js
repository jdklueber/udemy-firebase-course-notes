function Content({children}) {
    return (
        <div>
            <div className={"max-w-7xl mx-auto pt-6"}>
                {children}
            </div>
        </div>
    );
}

export default Content;