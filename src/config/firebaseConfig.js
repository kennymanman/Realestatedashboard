// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfla2NeX4Dg_7SktZEXmDFQ3rYYc4-JTo",
  authDomain: "augusttwo-ab42f.firebaseapp.com",
  projectId: "augusttwo-ab42f",
  storageBucket: "augusttwo-ab42f.appspot.com",
  messagingSenderId: "924554773265",
  appId: "1:924554773265:web:e175bc02549555267c82b0",
  measurementId: "G-QR78J6YPJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export {db};
export const imageDB = getStorage(app)

export const database = getAuth(app)


const provider = new GoogleAuthProvider();

export {provider}

export const signInWithGoogle = () =>  signInWithPopup(auth, provider)
 


// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const name = result.user.displayName;
//       const email = result.user.email;
//       const profilePic = result.user.photoURL;

//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);
//       localStorage.setItem("profilePic", profilePic);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };