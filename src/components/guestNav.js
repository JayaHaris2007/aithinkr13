import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo.png';

const Nav = () => {
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
            <a className="btn btn-primary" role="button" href="/login">
                Login
            </a>
          </div>
        </nav>
        <br />
      </div>
    </div>
  );
};

export default Nav;
