"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import type { AdminUser } from "@/types"

interface AuthContextType {
  user: User | null
  adminData: AdminUser | null
  isAdmin: boolean
  loading: boolean
  signUp: (email: string, password: string, username: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  adminData: null,
  isAdmin: false,
  loading: true,
  signUp: async () => {},
  login: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [adminData, setAdminData] = useState<AdminUser | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [firebaseReady, setFirebaseReady] = useState(false)

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { auth, db } = await import("@/lib/firebase")

        if (!auth) {
          console.error("Firebase auth not initialized")
          setLoading(false)
          return
        }

        setFirebaseReady(true)

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser)

          if (currentUser && db) {
            try {
              // Check if user is admin
              const adminDoc = await getDoc(doc(db, "admins", currentUser.uid))
              if (adminDoc.exists()) {
                setAdminData(adminDoc.data() as AdminUser)
                setIsAdmin(true)
              } else {
                setAdminData(null)
                setIsAdmin(false)
              }
            } catch (error) {
              console.error("Error fetching admin data:", error)
              setAdminData(null)
              setIsAdmin(false)
            }
          } else {
            setAdminData(null)
            setIsAdmin(false)
          }

          setLoading(false)
        })

        return () => unsubscribe()
      } catch (error) {
        console.error("Firebase initialization error:", error)
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const signUp = async (email: string, password: string, username: string) => {
    const { auth, db } = await import("@/lib/firebase")
    if (!auth || !db) throw new Error("Firebase not initialized")

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const adminUser: AdminUser = {
      uid: userCredential.user.uid,
      email,
      username,
      role: "admin",
      createdAt: new Date(),
    }

    // Store admin data in Firestore
    await setDoc(doc(db, "admins", userCredential.user.uid), adminUser)
    setAdminData(adminUser)
    setIsAdmin(true)
  }

  const login = async (email: string, password: string) => {
    const { auth } = await import("@/lib/firebase")
    if (!auth) throw new Error("Firebase not initialized")

    await signInWithEmailAndPassword(auth, email, password)
    setIsAdmin(true) 
  }

  const logout = async () => {
    const { auth } = await import("@/lib/firebase")
    if (!auth) throw new Error("Firebase not initialized")

    await signOut(auth)
    setAdminData(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, adminData, isAdmin, loading, signUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
