import 'tailwindcss/tailwind.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../client'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/profile')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
      authListener.unsubscribe()
    }
  }, [])
  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    const user = await supabase.auth.user()
    if (user) {
      setAuthenticatedState('authenticated')
    }
  }
  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }
  return (
    <div className="h-screen bg-gray-700 text-gray-100">
      <div id="outer-container" className="p-10 max-w-4xl mx-auto">
        <nav className=" py-4 w-full">
          <Link href="/">
            <a className="text-gray-300 mr-4">Home</a>
          </Link>
          <Link href="/profile">
            <a className="text-gray-300 mr-4">Profile</a>
          </Link>
          {
            authenticatedState === 'not-authenticated' && (
              <Link href="/sign-in">
                <a className="text-gray-300 mr-4">Sign In</a>
              </Link>
            )
          }
          <Link href="/protected">
            <a className="text-gray-300 mr-4">Protected</a>
          </Link>
        </nav>
        <Component {...pageProps} />
      </div>
    </div>
  )
}


export default MyApp