import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-hero">
        <div className="login-hero-overlay">
          <div className="login-hero-eyebrow mono">
            FORM 27-B · ISSUE &amp; RETURN
          </div>
          <h1 className="login-hero-headline display">
            Every item accounted for.
          </h1>
          <p className="login-hero-copy">
            Balls, bats, bibs and boots — signed out, signed back in. The ledger
            doesn't forget, even when the wing does.
          </p>
        </div>
      </div>

      <div className="login-spine">
        <span className="mono">KIT · LEDGER</span>
      </div>

      <div className="login-panel">
        <div className="login-card">
          <div className="login-mark">KL</div>
          <h2 className="login-title display">Kit Ledger</h2>
          <div className="login-subtitle mono">
            Sports Equipment · Cadet Wing Supply
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="mono">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="committee1"
                required
              />
            </div>
            <div className="field">
              <label className="mono">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="login-error mono">{error}</div>}

            <button
              type="submit"
              className="login-submit display"
              disabled={loading}
            >
              {loading ? "Signing In…" : "Sign In"}
            </button>
          </form>

          <div className="login-footnote mono">
            Access Logged · Quartermaster Use Only
          </div>
        </div>

        <div className="login-version mono">
          Kit Ledger v1.0 · Supply Room Terminal 02
        </div>
      </div>
    </div>
  );
}
