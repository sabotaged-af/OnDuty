import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // MOCK AUTH: If no Supabase keys or placeholders, simulate a logged-in user for demo
        const isMock = !import.meta.env.VITE_SUPABASE_URL ||
            !import.meta.env.VITE_SUPABASE_KEY ||
            import.meta.env.VITE_SUPABASE_URL.includes('your_supabase_url') ||
            import.meta.env.VITE_SUPABASE_KEY.includes('your_supabase_anon_key');

        if (isMock) {
            console.warn('Supabase credentials missing or invalid. Using Mock Auth.');
            setUser({ email: 'demo@example.com', id: 'mock-user-id' });
            setLoading(false);
            return;
        }

        // Check active sessions and sets the user
        const getSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;
                setUser(session?.user ?? null);
            } catch (error) {
                console.error("Auth session error:", error);
                // Fallback to null user on error, don't crash
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getSession();

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const isMock = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your_supabase_url');

    const signUp = async (email, password) => {
        if (isMock) return { data: { user: { email } }, error: null };
        return supabase.auth.signUp({ email, password });
    };

    const signIn = async (email, password) => {
        if (isMock) {
            setUser({ email, id: 'mock-id' });
            return { data: { user: { email } }, error: null };
        }
        return supabase.auth.signInWithPassword({ email, password });
    };

    const signOut = async () => {
        if (isMock) {
            setUser(null);
            return { error: null };
        }
        return supabase.auth.signOut();
    };

    const value = {
        signUp,
        signIn,
        signOut,
        user,
        loading,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
