import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  sendPasswordResetEmail,
  AuthError
} from "firebase/auth";

// Validate environment variables
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
] as const;

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Initialize Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdePiUEhJDdqRoX8a1mejgXs_mW8FWMHI",
  authDomain: "care-mobile-6b2c5.firebaseapp.com",
  projectId: "care-mobile-6b2c5",
  storageBucket: "care-mobile-6b2c5.firebasestorage.app",
  messagingSenderId: "172926597888",
  appId: "1:172926597888:web:0ca9953536e3daf20b51e5"
};

console.log("Firebase configuration validated");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add additional scopes if needed
googleProvider.addScope('email');
googleProvider.addScope('profile');

export const signInWithGoogle = async () => {
  try {
    console.log("Attempting Google sign in...");
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google sign in successful");
    return result;
  } catch (error) {
    console.error("Google sign in error:", error);
    const authError = error as AuthError;
    // Check for specific error codes
    switch (authError.code) {
      case 'auth/popup-blocked':
        throw new Error('Please allow popups for this website to sign in with Google');
      case 'auth/cancelled-popup-request':
        throw new Error('Sign in was cancelled');
      case 'auth/unauthorized-domain':
        throw new Error(`This domain is not authorized for Google sign in. Please make sure ${window.location.hostname} is added to Firebase authorized domains.`);
      case 'auth/internal-error':
        throw new Error('An internal error occurred. Please try again.');
      default:
        throw new Error(authError.message || 'Failed to sign in with Google');
    }
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Email sign in error:", error);
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to sign in with email');
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    console.error("Email sign up error:", error);
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to sign up with email');
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Password reset error:", error);
    const authError = error as AuthError;
    throw new Error(authError.message || 'Failed to send password reset email');
  }
};

export default app;