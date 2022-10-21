import React, { createContext, useEffect, useState } from 'react'
import {getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged} from 'firebase/auth'
import app from '../firebase/firebase.config'


export const AuthContext = createContext();

const auth = getAuth(app)

const UserContext = ({children}) => {

    const [user, setUser] =useState({});
    const [loading, setLoading] = useState(true);

    const createUser=(email, password)=>{
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn=(email, password)=>{
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    }

    const logout=()=>{
      setLoading(true);
      return signOut(auth);
    }

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, currentUser=>{
        console.log(currentUser);
        setUser(currentUser);
        setLoading(false);
      })
      return ()=>{
        unsubscribe();
      }
    },[])

    const authInfo = {user, loading, createUser, logIn, logout};

  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default UserContext