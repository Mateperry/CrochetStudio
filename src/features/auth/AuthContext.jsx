import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './authContextValue';
import { supabase } from '../../lib/supabase';


/**
 * AuthProvider — Global authentication state manager.
 * Responsibilities:
 *   - Listen to Supabase auth state changes.
 *   - Fetch user profile (role) from user_profiles table.
 *   - Expose auth actions: signIn, signUp, signInWithGoogle, signOut.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Fetches user profile (including role) from user_profiles table.
   * Uses multiple strategies to handle RLS restrictions:
   *   1. Direct query (works if RLS policies are correct)
   *   2. RPC call to get_current_user_role (bypasses RLS via SECURITY DEFINER)
   *   3. Fallback to basic profile from auth metadata
   */
  const fetchUserProfile = useCallback(async (userId, authUser) => {
    // Strategy 1: Direct query
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data && !error) {
        console.log('Profile loaded via direct query:', data.role);
        return data;
      }

      if (error) {
        console.warn('Direct profile query failed:', error.message);
      }
    } catch (err) {
      console.warn('Direct profile query exception:', err);
    }

    // Strategy 2: RPC call to get role and build profile manually
    try {
      const { data: role, error: rpcError } = await supabase
        .rpc('get_current_user_role');

      if (role && !rpcError) {
        console.log('Profile role loaded via RPC:', role);
        return {
          id: userId,
          email: authUser?.email || '',
          display_name: authUser?.user_metadata?.full_name || authUser?.email || '',
          avatar_url: authUser?.user_metadata?.avatar_url || null,
          role: role,
        };
      }

      if (rpcError) {
        console.warn('RPC get_current_user_role failed:', rpcError.message);
      }
    } catch (err) {
      console.warn('RPC call exception:', err);
    }

    // Strategy 3: Fallback — assume customer role
    console.warn('All profile fetch strategies failed. Using fallback profile.');
    return {
      id: userId,
      email: authUser?.email || '',
      display_name: authUser?.user_metadata?.full_name || authUser?.email || '',
      avatar_url: authUser?.user_metadata?.avatar_url || null,
      role: 'customer',
    };
  }, []);

  /**
   * Handles session changes: sets user and fetches profile.
   */
  const handleSession = useCallback(async (session) => {
    if (session?.user) {
      setUser(session.user);
      const profile = await fetchUserProfile(session.user.id, session.user);
      setUserProfile(profile);
    } else {
      setUser(null);
      setUserProfile(null);
    }
    setIsLoading(false);
  }, [fetchUserProfile]);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await handleSession(session);
      } catch (err) {
        console.error('Error initializing auth:', err);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await handleSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [handleSession]);

  /**
   * Sign in with email and password.
   */
  const signIn = async (email, password) => {
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setAuthError(translateAuthError(error.message));
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch {
      const message = 'Error inesperado al iniciar sesión.';
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  /**
   * Sign up with email and password.
   */
  const signUp = async (email, password, displayName = '') => {
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName || email,
          },
        },
      });

      if (error) {
        setAuthError(translateAuthError(error.message));
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch {
      const message = 'Error inesperado al registrarse.';
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  /**
   * Sign in with Google OAuth.
   */
  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setAuthError(translateAuthError(error.message));
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch {
      const message = 'Error inesperado al iniciar con Google.';
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  /**
   * Sign out the current user.
   */
  const signOut = async () => {
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
      }

      setUser(null);
      setUserProfile(null);
    } catch (err) {
      console.error('Unexpected error signing out:', err);
    }
  };

  /**
   * Clears any stored auth error.
   */
  const clearError = () => setAuthError(null);

  const isAdmin = userProfile?.role === 'admin';

  const value = {
    user,
    userProfile,
    isAdmin,
    isLoading,
    authError,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Translates common Supabase auth error messages to Spanish for UI display.
 */
function translateAuthError(message) {
  const translations = {
    'Invalid login credentials': 'Correo o contraseña incorrectos.',
    'Email not confirmed': 'Tu correo aún no ha sido confirmado. Revisa tu bandeja de entrada.',
    'User already registered': 'Este correo ya está registrado.',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
    'Unable to validate email address: invalid format': 'El formato del correo electrónico no es válido.',
    'Email rate limit exceeded': 'Demasiados intentos. Por favor espera unos minutos.',
    'Signup requires a valid password': 'Se requiere una contraseña válida.',
    'For security purposes, you can only request this after': 'Demasiados intentos. Espera unos segundos antes de intentar de nuevo.',
    'over_email_send_rate_limit': 'Se ha superado el límite de envíos de correo. Espera unos minutos.',
    'Anonymous sign-ins are disabled': 'El inicio de sesión anónimo no está disponible.',
  };

  // Exact match
  if (translations[message]) {
    return translations[message];
  }

  // Partial match for variable error messages
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('rate limit') || lowerMessage.includes('too many requests')) {
    return 'Demasiados intentos. Por favor espera unos minutos antes de intentar de nuevo.';
  }

  if (lowerMessage.includes('already registered') || lowerMessage.includes('already been registered')) {
    return 'Este correo ya está registrado. Intenta iniciar sesión.';
  }

  if (lowerMessage.includes('not confirmed')) {
    return 'Tu correo aún no ha sido confirmado. Revisa tu bandeja de entrada.';
  }

  if (lowerMessage.includes('invalid') && lowerMessage.includes('credentials')) {
    return 'Correo o contraseña incorrectos.';
  }

  return 'Ha ocurrido un error. Inténtalo de nuevo.';
}
