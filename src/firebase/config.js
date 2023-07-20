// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//variables de entorno
//console.log(import.meta.env)


const {
  VITE_APIKEY ,
  VITE_AUTHDOMAIN , 
  VITE_PROJECTID ,
  VITE_STORAGEBUCKET ,
  VITE_MESSAGINGSENDERID ,
  VITE_APPID ,

} = getEnvironments();
//console.log(env);
// Your web app's Firebase configuration
//produccion
/*const firebaseConfig {
  apiKey: "AIzaSyCunApJJQwVDie2bvKbauJc4pzJZdxRHK0",
  authDomain: "reactjournal-app.firebaseapp.com",
  projectId: "reactjournal-app",
  storageBucket: "reactjournal-app.appspot.com",
  messagingSenderId: "403323994787",
  appId: "1:403323994787:web:f4df8ec961edb5a83d3516"
};*/

//testing
/*const firebaseConfig {
  apiKey: "AIzaSyD6YBZe8gxExLc5YE-9SCaVoGf1w7f9yjY",
  authDomain: "react-test-af150.firebaseapp.com",
  projectId: "react-test-af150",
  storageBucket: "react-test-af150.appspot.com",
  messagingSenderId: "1074629572555",
  appId: "1:1074629572555:web:641e12c6ba25c9e969e84e",
  measurementId: "G-4ZRDN457KJ"
};*/


const firebaseConfig = {
  apiKey:VITE_APIKEY,
  authDomain:VITE_AUTHDOMAIN,
  projectId:VITE_PROJECTID,
  storageBucket:VITE_STORAGEBUCKET,
  messagingSenderId:VITE_MESSAGINGSENDERID,
  appId:VITE_APPID,
};
//console.log(firebaseConfig)

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);