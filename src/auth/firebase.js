// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, getFirestore, collection } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJRKdUyPNScVXhgS-5DEh3BvLiOKFsOug",
  authDomain: "countries-app-react.firebaseapp.com",
  projectId: "countries-app-react",
  storageBucket: "countries-app-react.appspot.com",
  messagingSenderId: "433550832944",
  appId: "1:433550832944:web:0aa68297ff4e6b5ef4c4f5",
  measurementId: "G-E1D29CTSZZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

// set up access to database
const db = getFirestore(app)

// user login logic
const loginWithEmailAndPassword = async(email,password) => {
    try{
        await signInWithEmailAndPassword(auth, email,password)
    }
    catch(err){
        console.log(err);
        alert(err.message)
    }
}
// resister user
const registerWithEmailAndPassword = async (name, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }
    catch(err) {
        console.log(err);
        alert(err.message)
    }
}
// log out
const logout = () => {
    signOut(auth);
}

export { auth, db, loginWithEmailAndPassword, registerWithEmailAndPassword, logout}
