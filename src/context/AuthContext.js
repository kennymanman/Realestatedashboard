import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { updateDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../config/firebaseConfig";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const verify = (email, password) => {
    return sendEmailVerification(auth, email, password);
  };

  const updateprofile = (displayName, photoUrl) => {
    return updateProfile(auth, displayName, photoUrl);
  };

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

  const updateLastSeen = async (userId) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      lastSeen: serverTimestamp()
    });
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if the user is active
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      
      if (!userData.isActive) {
        // Sign out the user if their account is disabled
        await auth.signOut();
        throw new Error("Your account has been disabled. Please contact an administrator.");
      }
      
      // Update last seen
      await updateDoc(userDocRef, {
        lastSeen: serverTimestamp()
      });
      
      // Proceed with successful login
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, verify, updateprofile, updateLastSeen, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
