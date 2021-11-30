import { useState } from 'react'

import { supabase } from '../client'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    async function signIn() {
        const { error, data } = await supabase.auth.signIn({
            email
        })
        if (error) {
            console.log({ error })
        } else {
            setSubmitted(true)
        }
    }
    if (submitted) {
        return (
            <div className="">
                <h1>Please check your email to sign in</h1>
            </div>
        )
    }
    return (
        <div className="bg-gray-700 h-screen text-gray-100">
            <main className="mx-auto pt-20 max-w-3xl">
                <h1 className="text-5xl font-bold">
                    Sign In
                </h1>
                <input
                    onChange={e => setEmail(e.target.value)}
                    className="m-10 ml-0 px-4 py-2 rounded-lg text-gray-700"
                />
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold" onClick={() => signIn()}>Sign In</button>
            </main>
        </div>
    )
}