import Link from "next/link"

const Navbar = ({ authenticatedState }) => {
    return (
        <nav className=" py-4 w-full">
            <Link href="/">
                <a className="text-gray-300 mr-4">Home</a>
            </Link>
            {/* <Link href="/profile">
                <a className="text-gray-300 mr-4">Profile</a>
            </Link> */}
            <Link href="/performance">
                <a className="text-gray-300 mr-4">Performance</a>
            </Link>
            <Link href="/explore">
                <a className="text-gray-300 mr-4">Explore</a>
            </Link>
            {
                authenticatedState === 'not-authenticated' && (
                    <Link href="/sign-in">
                        <a className="text-gray-300 mr-4">Sign In</a>
                    </Link>
                )
            }
            {/* ADD SIGNOUT */}
            {/* <Link href="/protected">
            <a className="text-gray-300 mr-4">Protected</a>
          </Link> */}
        </nav>
    )
}

export default Navbar
