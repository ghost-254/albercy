import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "./firebase"

export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log("[v0] Image uploaded successfully:", downloadURL)
    return downloadURL
  } catch (error) {
    console.error("[v0] Error uploading image:", error)
    throw error
  }
}

export async function deleteImage(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
    console.log("[v0] Image deleted successfully")
  } catch (error) {
    console.error("[v0] Error deleting image:", error)
    throw error
  }
}
