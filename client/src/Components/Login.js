import "./AuthModal.css";
import { useNavigate } from "react-router-dom";

export default function Login({ close }) {
  const navigate = useNavigate();


  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <span className="close-btn" onClick={close}>✖</span>

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue tracking your expenses</p>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="btn filled full" onClick={() => navigate('/dashboard')}>Login</button>
      </div>
    </div>
  );
};
