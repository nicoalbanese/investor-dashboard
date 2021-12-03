import { useState } from 'react'

import { supabase } from '../client'

// import Image from "next/image"

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    async function signIn() {
        const { error, data } = await supabase.auth.signIn({
            email
        })
        if (error) {
            console.log({ error, message: "Here" })
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
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src="images/headline_logo_light.png" alt="Ascension Logo" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
                        Investor Portal
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); signIn(); }}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" onChange={e => setEmail(e.target.value)} type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-a-blue hover:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 bg-a-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
