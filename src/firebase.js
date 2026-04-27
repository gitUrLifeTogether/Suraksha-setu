import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // optional – comment out if not needed

const firebaseConfig = {
  apiKey: "AIzaSyBXphf27q2I7IZKaGqfeO5BNp1ZgTEQnOo",
  authDomain: "hotel-crisis.firebaseapp.com",
  projectId: "hotel-crisis",
  storageBucket: "hotel-crisis.firebasestorage.app",
  messagingSenderId: "495388364581",
  appId: "1:495388364581:web:1ce951c7a240461b6594cc",
  measurementId: "G-3NR71CZQCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // uncomment if you want analytics
const db = getFirestore(app);

export { db };