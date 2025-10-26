import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo.png';

const Nav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
      // Optionally redirect to login page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <div className="mainside">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src={logo}
                alt="Logo"
                width="40"
                height="40"
                className="d-inline-block align-text-top"
              />
              AIthinkr
            </a>

            {user ? (
              <button
                className="btn btn-danger"
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>
            ) : (
              <a className="btn btn-primary" role="button" href="/login">
                Login
              </a>
            )}
          </div>
        </nav>
        <br />
      </div>
    </div>
  );
};

export default Nav;
