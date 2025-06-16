// src/components/Auth.jsx

import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged
 
} from "firebase/auth";
import { useState } from "react";
import './Auth.css';
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        // 1. Create Firebase user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        // 2. Sync with MongoDB
        const response = await fetch("/api/users/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          }),
        });

        if (!response.ok) throw new Error("Failed to sync with database");

        alert("Account created in both Firebase and MongoDB!");
      } else {
        // Log in existing user
        await signInWithEmailAndPassword(auth, email, password);
        const token = await auth.currentUser.getIdToken();

        localStorage.setItem("token", token);

        await fetch("/api/users/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
          }),
        });

        alert("Successfully logged in!");
      }

      navigate("/dashboard");
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const response = await fetch("/api/users/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
        }),
      });

      if (!response.ok) throw new Error("Failed to sync with database");

      alert("Successfully signed in with Google and synced!");
      navigate("/dashboard");
    } catch (error) {
      alert("Google sign-in error: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isSignUp ? "Sign Up" : "Log In"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength="6"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading
              ? isSignUp ? "Signing Up..." : "Logging In..."
              : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="google-auth">
          <p className="divider">or continue with</p>

          <button onClick={handleGoogleLogin} className="google-button">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google logo"
              className="google-logo"
            />
            Login with Google
          </button>
        </div>

        <p
          style={{ marginTop: "1rem", cursor: "pointer" }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account? Signs Up"}
        </p>
      </div>
    </div>
  );
}


// src/components/Auth.jsx
// code for auth that handle both logout and signout
export const checkAuth = () => {
  return new Promise((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
};

export const handleProtectedNavigation = async (navigate, path) => {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    // Store the intended path for redirect after login
    localStorage.setItem('redirectPath', path);
    navigate('/login');
    return false;
  }
  return true;
};
