import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { getStorageInstance } from "./firebase"

export async function uploadImage(file: File, path: string): Promise<string> {
  const storage = getStorageInstance() 
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

export async function deleteImage(path: string): Promise<void> {
  const storage = getStorageInstance()
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}
