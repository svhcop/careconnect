import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "./firebase";

const storage = getStorage();

export async function uploadProfilePicture(file: File): Promise<string> {
  if (!auth.currentUser) {
    throw new Error("User must be authenticated to upload profile picture");
  }

  try {
    // Create a reference to the user's profile picture
    const storageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error: any) {
    console.error("Error uploading profile picture:", error);
    throw new Error("Failed to upload profile picture: " + error.message);
  }
}