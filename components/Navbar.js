import Link from "next/link"
import Image from "next/image"

import { supabase } from "../client";

const Navbar = ({ authenticatedState }) => {
    const scale = 2;
    return (
        <nav className=" py-4 w-full flex justify-between">
            <Link href="/" id="logo" ><a className="hover:opacity-30 cursor-pointer"><Image height={`${17.8 * scale}px`} width={`${19.3 * scale}px`} src="/images/a logo light.png" /></a></Link>
            <div id="nav-controls">
                {/* <Link href="/profile">
                <a className="text-gray-300 mr-4">Profile</a>
            </Link> */}
                {authenticatedState === "authenticated" &&
                    <><Link href="/performance">
                        <a className="text-gray-300 mr-4 hover:opacity-30">Performance</a>
                    </Link>
                        <Link href="/explore">
                            <a className="text-gray-300 mr-4 hover:opacity-30">Explore</a>
                        </Link>
                        <Link href="/sign-out">
                            <a className="text-gray-300 mr-4 hover:opacity-30">Log out</a>
                        </Link></>
                }
                {/* {
                    authenticatedState === 'not-authenticated' && (
                        <Link href="/sign-in">
                            <a className="text-gray-300 mr-4">Sign In</a>
                        </Link>
                    )
                } */}
            </div>
            {/* ADD SIGNOUT */}
            {/* <Link href="/protected">
            <a className="text-gray-300 mr-4">Protected</a>
          </Link> */}
        </nav>
    )
}

export default Navbar
