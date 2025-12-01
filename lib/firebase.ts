// firebase.ts
import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize a single app instance (safe to call on server or client)
function getOrInitApp(): FirebaseApp {
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
}

/** Non-nullable helpers (call these from your code) */
export function getAppInstance(): FirebaseApp {
  return getOrInitApp()
}

export function getAuthInstance(): Auth {
  return getAuth(getOrInitApp())
}

export function getDbInstance(): Firestore {
  return getFirestore(getOrInitApp())
}

/**
 * getStorageInstance
 * - Firebase Storage is a browser API (depends on window). Calling this on the server (SSR)
 *   will throw a helpful error — this forces callers to only use storage on the client.
 */
export function getStorageInstance(): FirebaseStorage {
  if (typeof window === "undefined") {
    throw new Error("Firebase Storage is only available on the client (window is undefined).")
  }
  return getStorage(getOrInitApp())
}

// Keep a default export if you prefer importing default app
export default getOrInitApp()
