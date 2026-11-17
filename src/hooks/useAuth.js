import { useContext } from 'react';
import { AuthContext } from '../context/authContextValue';

/**
 * useAuth — Custom hook to consume AuthContext.
 * Provides: user, userProfile, isAdmin, isLoading, authError,
 *           signIn, signUp, signInWithGoogle, signOut, clearError.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider. ' +
      'Make sure AuthProvider wraps your component tree.'
    );
  }

  return context;
}
