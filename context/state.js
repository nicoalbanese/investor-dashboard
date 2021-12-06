import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../client';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const router = useRouter()
    let [sharedState, setSharedState] = useState({ supabaseData: {}, airtableData: {}, loading: true, authenticated: 'not-authenticated' });

    const setInvestments = (investmentData) => {
        setSharedState(prev => { return { ...prev, airtableData: investmentData } })
    }
    const setProfile = (profileData) => {
        setSharedState(prev => { return { ...prev, supabaseData: profileData } })
    }
    const setLoading = (loadingState) => {
        setSharedState(prev => { return { ...prev, loading: loadingState } });
    }

    const setAuthenticatedState = (authenticatedState) => {
        setSharedState(prev => { return { ...prev, authenticated: authenticatedState } });
    }

    useEffect(() => {
        fetchProfile();
        console.log("it has run")
    }, [])


    async function fetchProfile() {
        const profileData = await supabase.auth.user()
        if (!profileData) {
            router.push('/sign-in')
        } else {
            setAuthenticatedState("authenticated");
            const investmentData = await fetchInvestorInfo(profileData.email);
            setProfile(profileData)
            setInvestments(investmentData)
            setLoading(false);
            // return {
            //     profileData, investmentData, loading: false
            // }
        }
    }

    const fetchInvestorInfo = async (email) => {
        const res = await fetch(`/api/investor/${email}`)
        console.log("fetching..")
        // const res = await fetch(`/api/investor/carlotta.riganti@gmail.com`)
        // const res = await fetch(`/api/investor/rakesh@ascensionventures.com`)
        // const res = await fetch(`/api/investor/jean@ascensionventures.com`)
        const data = await res.json();
        // console.log(data)
        return data;
    }


    // const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')

    useEffect(() => {
        /* fires when a user signs in or out */
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            checkUser();
            console.log("auth state changed")
            handleAuthChange(event, session)
            if (event === 'SIGNED_IN') {
                setAuthenticatedState('authenticated')
                router.push('/')
            }
            if (event === 'SIGNED_OUT') {
                setAuthenticatedState('not-authenticated')
            }
        })
        // checkUser();
        return () => {
            authListener.unsubscribe()
        }
    }, [])
    async function checkUser() {
        /* when the component loads, checks user to show or hide Sign In link */
        const user = await supabase.auth.user();
        if (user) {
            setAuthenticatedState('authenticated');
            console.log('authenticated')
            fetchProfile();
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
        <AppContext.Provider value={{ sharedState, setInvestments, setProfile }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}