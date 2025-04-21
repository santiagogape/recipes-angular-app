import { environment } from '../../environment';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const app = initializeApp(environment);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
let analytics;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics };
