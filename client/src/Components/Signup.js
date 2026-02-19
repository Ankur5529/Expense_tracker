import "./AuthModal.css";
import { useNavigate } from "react-router-dom";

export default function Signup({ close }) {
  const navigate = useNavigate();
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <span className="close-btn" onClick={close}>✖</span>

        <h2>Create Account 🚀</h2>
        <p className="subtitle">Sign up to start tracking your expenses</p>

        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="btn filled full" onClick={() => navigate('/dashboard')}>Create Account</button>
      </div>
    </div>
  );
};
