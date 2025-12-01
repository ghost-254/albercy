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

// --- INTERNAL: ENSURES SINGLE APP INSTANCE ---
function getOrInitApp(): FirebaseApp {
  return getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0]
}

// --- PUBLIC NON-NULLABLE GETTERS ---
// These are safe to import from anywhere in your project.

export function getAppInstance(): FirebaseApp {
  return getOrInitApp()
}

export function getAuthInstance(): Auth {
  return getAuth(getOrInitApp())
}

export function getDbInstance(): Firestore {
  return getFirestore(getOrInitApp())
}

export function getStorageInstance(): FirebaseStorage {
  if (typeof window === "undefined") {
    throw new Error("Firebase Storage is only available on the client side.")
  }
  return getStorage(getOrInitApp())
}

// --- OPTIONAL NAMED EXPORTS FOR CONVENIENCE ---
// These lazily resolve using the getters above.
// They are NOT null and will not cause TS errors.

export const app = getAppInstance()
export const auth = getAuthInstance()
export const db = getDbInstance()

// ❗ Storage must stay in a function because Next.js renders on SSR first.
// We export the getter instead of the value.
export { getStorageInstance as storage }

export default app
