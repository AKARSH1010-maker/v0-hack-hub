import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, db, googleProvider } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

export async function loginUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  const userDoc = await getDoc(doc(db, "users", user.uid))

  if (!userDoc.exists()) {
    throw new Error("User role not found")
  }

  return {
    uid: user.uid,
    email: user.email,
    ...userDoc.data(),
  }
}

export async function signInWithGoogle(role: "admin" | "student") {
  const result = await signInWithPopup(auth, googleProvider)
  const user = result.user

  const userRef = doc(db, "users", user.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      role,
      photoURL: user.photoURL || "",
      createdAt: new Date().toISOString(),
    })
  }

  const finalSnap = await getDoc(userRef)

  return {
    uid: user.uid,
    email: user.email,
    ...finalSnap.data(),
  }
}