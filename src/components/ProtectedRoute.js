// src/components/ProtectedRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) return null; // or a loading spinner

  return allowed ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;