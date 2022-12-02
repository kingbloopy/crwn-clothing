import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbtq0ZR9AFMitHC5T42gEtr33eCSmuEt4",
  authDomain: "crwn-clothing-db-4c878.firebaseapp.com",
  projectId: "crwn-clothing-db-4c878",
  storageBucket: "crwn-clothing-db-4c878.appspot.com",
  messagingSenderId: "1020543981002",
  appId: "1:1020543981002:web:a34a8758bfd3253e8e2b33"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error){
      console.log('error creating the user', error.message);
    }
  } return userDocRef;
}