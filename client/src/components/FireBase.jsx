import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey:"AIzaSyBGFMyR0bFxInC98g5uxoVc770NsyM6y6M",
  authDomain: "mern-e-commerce-405107.firebaseapp.com",
  projectId: "mern-e-commerce-405107",
  storageBucket: "mern-e-commerce-405107.appspot.com",
  messagingSenderId: "194262783075",
  appId: "1:194262783075:web:fb7be365218a21164c5456",
  measurementId: "G-FZ863WLRHC"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);