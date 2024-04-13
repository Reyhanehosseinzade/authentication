import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";


const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTHDOMAIN as string ,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.APP_ID as string,
});

const auth = getAuth(app);

export { auth };

