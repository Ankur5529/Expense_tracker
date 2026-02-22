import { useState } from "react";
import "./Landing.css";
import Login from "./Login";
import Signup from "./Signup";

export default function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {showLogin && <Login close={() => setShowLogin(false)} />}
      {showSignup && <Signup close={() => setShowSignup(false)} />}
      <div className={`landing-container ${showLogin || showSignup ? 'blurred' : ''}`}>

        {/* Navbar */}
        <nav className="navbar">
          <h1 className="logo">ExpenseMate</h1>
          <div className="nav-buttons">
            <button className="btn outline" onClick={() => setShowLogin(true)}>Login</button>
            <button className="btn filled" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <h2>Track Your Expenses Easily 💸</h2>
            <p>
              Manage your daily spending, analyze expenses, and control your money
              in one place.
            </p>

            <div className="hero-buttons">
              <button className="btn filled" onClick={() => setShowSignup(true)}>Get Started</button>
              <button className="btn outline" onClick={() => setShowLogin(true)}>Login</button>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="finance"
            />
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <h3>Why ExpenseMate?</h3>

          <div className="feature-cards">
            <div className="card">
              <h4>📊 Smart Analytics</h4>
              <p>Visualize your expenses clearly.</p>
            </div>

            <div className="card">
              <h4>🔒 Secure Login</h4>
              <p>Your data stays private and secure.</p>
            </div>

            <div className="card">
              <h4>⚡ Easy CRUD</h4>
              <p>Add, edit, and delete expenses easily.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          © 2026 ExpenseMate. All rights reserved.
        </footer>

      </div>

    </>
  );
};
