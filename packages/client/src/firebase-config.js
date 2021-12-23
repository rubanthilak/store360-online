import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqL27yvfDoJiNlK0Z4DatftiyZ6HMNEdY",
  authDomain: "prototype2-daec0.firebaseapp.com",
  projectId: "prototype2-daec0",
  storageBucket: "prototype2-daec0.appspot.com",
  messagingSenderId: "486817589010",
  appId: "1:486817589010:web:c059044ddf2394b64275cb",
  measurementId: "G-MTB49SDDEM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);