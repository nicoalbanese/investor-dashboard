import { useRouter } from "next/dist/client/router";
import { supabase } from "../client"
import { useEffect } from "react"

const SignOut = () => {
    const router = useRouter();
    useEffect(async () => {
        const { error } = await supabase.auth.signOut()
        router.push('/sign-in')
    }, [])
    return (
        <div>
            <h1>You have been succesfully logged out</h1>
        </div>
    )
}

export default SignOut
