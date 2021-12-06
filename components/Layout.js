import Navbar from "./Navbar"

import { useAppContext } from "../context/state"

const Layout = ({ children }) => {

    const { sharedState } = useAppContext();
    console.log(sharedState.authenticated);
    return (
        <div className="h-screen bg-a-dark text-a-light overflow-auto w-full">
            <div id="outer-container" className="p-10 max-w-5xl mx-auto">
                {(sharedState.authenticated !== "not-authenticated") &&
                    <Navbar authenticatedState={sharedState.authenticated} />
                    // <Navbar />
                }
                {children}
            </div>
        </div>
    )
}

export default Layout
