import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from './features/counter/userSlice';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();


    const loginToApp = (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          // ...
          const user = userCredential.user;
          dispatch(login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL
          }))
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    const register = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('signed in: ',user);

            updateProfile(auth.currentUser, {
                displayName: name, 
                photoURL: profilePic
              }).then(() => {
                // Profile updated!
                // ...
                dispatch(login({
                    email: user.email,
                    uid: user.uid,
                    displayName: name,
                    photoUrl: profilePic,
                }))
              }).catch((error) => {
                // An error occurred
                // ...
                alert(error.message);
              });
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

  return (
    <div className="login">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png" alt="" />

        <form action="">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Full name...' type="text" />
            <input value={profilePic} onChange={(e) => setProfilePic(e.target.value)} placeholder='Profile Pic Url' type="text" />
            <input value={email} onChange={ (e) => setEmail(e.target.value)} placeholder='Email' type="email" />
            <input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' type="password" />
            <button type='submit' onClick={loginToApp}>Sign In</button>
        </form>

        <p>Not a member? <span className='login__register' onClick={register}>Register Now</span></p>
    </div>
  )
}

export default Login