import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import logo from '../assets/logo.png';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      navigate('/main');
    } catch (err) {
      console.error('Google Sign-In error:', err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim()) {
      setError('Email is required.');
      setLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setError('Please verify your email before logging in.');
          setLoading(false);
          await signOut(auth);
          return;
        }
        navigate('/main');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await signOut(auth); // Sign out after signup
        alert('Account created. Please verify your email before logging in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Authentication error:', err.code, err.message);
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/email-already-in-use':
          setError('Email is already registered.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        default:
          setError(err.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-box" style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2 className="text-center mb-4">
        <img src={logo} alt="Logo" width="45" height="45" className="image" /> AIThinkr
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
            disabled={loading}
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </div>
      </form>

      <div className="mt-3 text-center">
        <div className="mb-3">
          <div className="divider d-flex align-items-center">
            <span className="divider-line flex-grow-1"></span>
            <span className="divider-text px-3">OR</span>
            <span className="divider-line flex-grow-1"></span>
          </div>
        </div>

        <button
          className="btn btn-outline-dark w-100 mb-3"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            style={{ width: '20px', marginRight: '10px' }}
          />
          Continue with Google
        </button>

        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button
              className="btn btn-link p-0"
              onClick={() => {
                setError('');
                setIsLogin(false);
              }}
              type="button"
              disabled={loading}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              className="btn btn-link p-0"
              onClick={() => {
                setError('');
                setIsLogin(true);
              }}
              type="button"
              disabled={loading}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
