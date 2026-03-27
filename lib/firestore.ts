import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  QueryConstraint,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

// ── Generic helpers ──────────────────────────────────────────────
export function colRef(path: string) {
  return collection(db, path)
}
export function docRef(path: string, id: string) {
  return doc(db, path, id)
}

export async function getAll(path: string, ...constraints: QueryConstraint[]) {
  const q = constraints.length ? query(colRef(path), ...constraints) : colRef(path)
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getOne(path: string, id: string) {
  const snap = await getDoc(docRef(path, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function create(path: string, data: Record<string, any>) {
  const ref = await addDoc(colRef(path), {
    ...data,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function update(path: string, id: string, data: Record<string, any>) {
  await updateDoc(docRef(path, id), { ...data, updatedAt: serverTimestamp() })
}

export async function remove(path: string, id: string) {
  await deleteDoc(docRef(path, id))
}

export function subscribe(
  path: string,
  callback: (docs: any[]) => void,
  ...constraints: QueryConstraint[]
) {
  const q = constraints.length ? query(colRef(path), ...constraints) : colRef(path)
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

export function subscribeDoc(
  path: string,
  id: string,
  callback: (doc: any) => void
) {
  return onSnapshot(docRef(path, id), (snap) => {
    callback(snap.exists() ? { id: snap.id, ...snap.data() } : null)
  })
}

// ── Collection paths ─────────────────────────────────────────────
export const COLLECTIONS = {
  USERS: "users",
  ANNOUNCEMENTS: "announcements",
  SCHEDULE: "schedule",
  ROOMS: "rooms",
  ISSUES: "issues",
  BUDGET_CATEGORIES: "budget_categories",
  TRANSACTIONS: "transactions",
  VOLUNTEERS: "volunteers",
  TEAMS: "teams",
  QUERIES: "queries",
  MESSAGES: "messages",
  CHANNELS: "channels",
  WALKIE_CHANNELS: "walkie_channels",
  WALKIE_TRANSMISSIONS: "walkie_transmissions",
  EVENT_SETTINGS: "event_settings",
} as const

// ── Timestamp helper ─────────────────────────────────────────────
export function formatTimestamp(ts: any): string {
  if (!ts) return ""
  const date = ts instanceof Timestamp ? ts.toDate() : new Date(ts)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? "s" : ""} ago`
}

export { orderBy, where, serverTimestamp, Timestamp }
