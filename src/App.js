import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Login from './Login';

function App() {

  const userState = useSelector(selectUser);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL,
        }))
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(logout());
      }
    });
  },[])

  return (
    <div className="app">
    <Header/>
      {userState.user===null? (
        <Login/>
      ):(
        <div className="app__body">   
        <Sidebar/>
        <Feed/>
        </div>
      )}
   
    </div>
  );
}

export default App;
