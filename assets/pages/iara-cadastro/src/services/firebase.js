import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhRTKxg-fpPRqQJNAWWoPZw1VXd7-W6yI",
  authDomain: "iara-games-cadastro.firebaseapp.com",
  projectId: "iara-games-cadastro",
  storageBucket: "iara-games-cadastro.firebasestorage.app",
  messagingSenderId: "1057961218919",
  appId: "1:1057961218919:web:dd0ef32982586a982e95c2",
  measurementId: "G-946FD9T1RH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);