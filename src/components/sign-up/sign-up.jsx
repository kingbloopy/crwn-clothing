import { useState } from "react";
import { 
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth
} from "../../utils/firebase.utils";

import FormInput from "../form-input/form-input";
import './sign-up.scss';
import Button from "../button/button";
import { UserContext } from "../../contexts/user.context";

  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use.');
      } else if (error.code === 'auth/invalid-email'){
        alert('Invalid email, please try again.');
      } else if (error.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters.');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className="sign-up-container">
      <h2>New Here?</h2>
      <span>Create an account with your email and password.</span>
      <form onSubmit={handleSubmit}>

        <FormInput
        label="Display Name"
        type="text" 
        onChange={handleChange} 
        name="displayName" 
        value={displayName} 
        required
        />

        <FormInput
        label="Email"
        type="email" 
        onChange={handleChange} 
        name="email" 
        value={email} 
        required
        />

        <FormInput
        label="Password"
        type="password" 
        onChange={handleChange} 
        name="password" 
        value={password} 
        required
        />

        <FormInput
        label="Confirm Password"
        type="password" 
        onChange={handleChange} 
        name="confirmPassword" 
        value={confirmPassword} 
        required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;