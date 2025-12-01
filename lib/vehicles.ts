import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Vehicle, VehicleStatus } from "@/types"

const COLLECTION_NAME = "vehicles"

export async function addVehicle(vehicleData: Omit<Vehicle, "id" | "createdAt" | "updatedAt">): Promise<string> {
  try {
    console.log("[v0] Adding vehicle:", vehicleData)
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...vehicleData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    console.log("[v0] Vehicle added successfully with ID:", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("[v0] Error adding vehicle:", error)
    throw error
  }
}

export async function updateVehicle(id: string, vehicleData: Partial<Vehicle>): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, {
    ...vehicleData,
    updatedAt: Timestamp.now(),
  })
}

export async function updateVehicleStatus(id: string, status: VehicleStatus): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id)
  await updateDoc(docRef, {
    status,
    updatedAt: Timestamp.now(),
  })
}

export async function deleteVehicle(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(docRef)
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const docRef = doc(db, COLLECTION_NAME, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Vehicle
  }

  return null
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Vehicle
  })
}

export async function getAvailableVehicles(): Promise<Vehicle[]> {
  const vehicles = await getAllVehicles()
  return vehicles.filter((v) => v.status !== "sold")
}
