import { 
  auth,
  signInWithGooglePopup, 
  createUserDocFromAuth, 
  signInWithGoogleRedirect 
} from "../../utils/firebase.utils"; 

import { useEffect } from "react";
import { getRedirectResult } from 'firebase/auth';

import SignUpForm from "../../components/sign-up/sign-up";

const SignIn = () => {

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
      <SignUpForm/>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </div>
  );
}

export default SignIn;