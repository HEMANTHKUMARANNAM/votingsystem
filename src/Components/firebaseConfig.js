// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQRdjZ5gbm_NBPU63poItjAsXaHtS4jOk",
  authDomain: "voting-system-aa18b.firebaseapp.com",
  databaseURL: "https://voting-system-aa18b-default-rtdb.firebaseio.com",
  projectId: "voting-system-aa18b",
  storageBucket: "voting-system-aa18b.appspot.com",
  messagingSenderId: "692641078371",
  appId: "1:692641078371:web:e71067c7fe5c02c21eec56",
  measurementId: "G-Y1MYECMNBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;