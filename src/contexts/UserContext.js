import React, { createContext, useEffect, useState } from 'react'
import {getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged} from 'firebase/auth'
import app from '../firebase/firebase.config'


export const AuthContext = createContext();

const auth = getAuth(app)

const UserContext = ({children}) => {

    const [user, setUser] =useState({});

    const createUser=(email, password)=>{
      return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn=(email, password)=>{
      return signInWithEmailAndPassword(auth, email, password);
    }

    const logout=()=>{
      return signOut(auth);
    }

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, currentUser=>{
        console.log(currentUser);
        setUser(currentUser);

      })
      return ()=>{
        unsubscribe();
      }
    },[])

    const authInfo = {user, createUser, logIn, logout};

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default UserContext