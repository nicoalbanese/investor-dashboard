import Navbar from "./Navbar"

const Layout = ({ children, authenticatedState }) => {
    return (
        <div className="h-screen bg-a-dark text-a-light overflow-auto w-full">
            <div id="outer-container" className="p-10 max-w-5xl mx-auto">
                {authenticatedState !== "not_authenticated" &&
                    <Navbar authenticatedState={authenticatedState} />}
                {children}
            </div>
        </div>
    )
}

export default Layout
