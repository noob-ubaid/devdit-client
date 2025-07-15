import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const google = () => {
    return signInWithPopup(auth, provider);
  };
  const updateUser = (updatedUserProfile) => {
    return updateProfile(auth.currentUser, updatedUserProfile);
  };
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
        if (currentUser?.email) {
        const userData = { email: currentUser?.email };
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, userData, {
            withCredentials: true,
          })
          .then((res) => console.log(res.data))
          .catch((error) => console.log(error));
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const data = {
    login,
    updateUser,
    user,
    loading,
    register,
    google,
    logOut,
  };
  return <AuthContext value={data}>{children}</AuthContext>;
};

export default AuthProvider;
