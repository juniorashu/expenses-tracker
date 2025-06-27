// src/components/Auth.jsx
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import './Auth.css';
import { useNavigate } from "react-router-dom";
import google from "../../../assets/google.png"; // Import Google logo

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
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      let userCredential;

      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created in Firebase!");
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in with Firebase!");
      }

      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token); // ✅ Save token globally

      // Sync with your backend
      const response = await fetch("https://expenses-tracker-jn6x.onrender.com/api/users/sync", {
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

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to sync with database");
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
      localStorage.setItem("token", token); // ✅ Store it

      const response = await fetch("https://expenses-tracker-jn6x.onrender.com/api/users/sync", {
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

      alert("Google login success!");
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
              src={google}
              alt="Google logo"
              className="google-logo"
            />
            Login with Google
          </button>
        </div>

        <p style={{ marginTop: "1rem", cursor: "pointer" }} onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
}
