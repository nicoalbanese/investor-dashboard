import 'tailwindcss/tailwind.css'
import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { AppWrapper } from "../context/state.js"


function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')

  // useEffect(() => {
  //   /* fires when a user signs in or out */
  //   const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
  //     handleAuthChange(event, session)
  //     if (event === 'SIGNED_IN') {
  //       setAuthenticatedState('authenticated')
  //       router.push('/')
  //     }
  //     if (event === 'SIGNED_OUT') {
  //       setAuthenticatedState('not-authenticated')
  //     }
  //   })
  //   checkUser()
  //   return () => {
  //     authListener.unsubscribe()
  //   }
  // }, [])
  // async function checkUser() {
  //   /* when the component loads, checks user to show or hide Sign In link */
  //   const user = await supabase.auth.user();
  //   if (user) {
  //     setAuthenticatedState('authenticated');
  //     console.log('authenticated')
  //   }
  // }
  // async function handleAuthChange(event, session) {
  //   /* sets and removes the Supabase cookie */
  //   await fetch('/api/auth', {
  //     method: 'POST',
  //     headers: new Headers({ 'Content-Type': 'application/json' }),
  //     credentials: 'same-origin',
  //     body: JSON.stringify({ event, session }),
  //   })
  // }
  return (
    <AppWrapper>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    </AppWrapper>
  )
}


export default MyApp