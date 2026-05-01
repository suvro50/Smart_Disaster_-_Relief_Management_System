import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      login(data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl">🚨</span>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mt-3">
            Welcome Back
          </h2>
          <p className="text-white/40 text-sm mt-1">Sign in to the Disaster Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg text-sm">{error}</div>
          )}
          <div>
            <label className="block text-white/60 text-sm mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@disaster.com" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <div className="relative">
            <label className="block text-white/60 text-sm mb-1">Password</label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <p className="text-white/30 text-xs">Don't have an account? <Link to="/register" className="text-red-400 hover:text-red-300">Register</Link></p>
        </div>

        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/public-map" className="text-white/40 text-xs hover:text-white/60 transition-colors">🗺️ Live Map</Link>
          <Link to="/victim/request-help" className="text-white/40 text-xs hover:text-white/60 transition-colors">🆘 Request Help</Link>
          <Link to="/report-disaster" className="text-white/40 text-xs hover:text-white/60 transition-colors">📢 Report Disaster</Link>
        </div>
      </div>
    </main>
  );
}
