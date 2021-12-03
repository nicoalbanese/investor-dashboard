import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../client';

const AppContext = createContext();

export function AppWrapper({ children }) {
    let [sharedState, setSharedState] = useState({ supabaseData: {}, airtableData: {}, loading: true });

    const setInvestments = (investmentData) => {
        setSharedState(prev => { return { ...prev, airtableData: investmentData } })
    }
    const setProfile = (profileData) => {
        setSharedState(prev => { return { ...prev, supabaseData: profileData } })
    }
    const setLoading = (loadingState) => {
        setSharedState(prev => { return { ...prev, loading: loadingState } });
    }

    useEffect(() => {
        console.log("it has run")
        fetchProfile();
    }, [])

    const router = useRouter()

    async function fetchProfile() {
        const profileData = await supabase.auth.user()
        if (!profileData) {
            router.push('/sign-in')
        } else {
            const investmentData = await fetchInvestorInfo(profileData.email);
            setProfile(profileData)
            setInvestments(investmentData)
            setLoading(false);
        }
    }

    const fetchInvestorInfo = async (email) => {
        const res = await fetch(`/api/investor/${email}`)
        // const res = await fetch(`/api/investor/carlotta.riganti@gmail.com`)
        // const res = await fetch(`/api/investor/rakesh@ascensionventures.com`)
        // const res = await fetch(`/api/investor/jean@ascensionventures.com`)
        const data = await res.json();
        // console.log(data)
        return data;
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