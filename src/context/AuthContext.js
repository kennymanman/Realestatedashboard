import { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
   
   
} from "firebase/auth"

import {auth} from "../config/firebaseConfig"






const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }

  const logout = () => {
      return signOut(auth)
  }


  const verify = (email, password) => {
    return sendEmailVerification(auth, email, password)
  }


  const updateprofile = (displayName, photoUrl) => {
    return updateProfile(auth, displayName, photoUrl)
  }


  // const provider = new GoogleAuthProvider();

  // const signInWithGoogle = () =>  signInWithPopup(auth, provider)





  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, verify, updateprofile}}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};


