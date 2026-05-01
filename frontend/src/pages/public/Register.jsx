import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    district: "",
    role: "public",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      const result = await authService.register(payload);
      
      if (result.verificationRequired) {
        navigate("/verify-email", { state: { userId: result.userId } });
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const districts = [
    "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna",
    "Barisal", "Rangpur", "Mymensingh", "Comilla", "Gazipur",
    "Narayanganj", "Cox's Bazar",
  ];

  return (
    <main className="page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Join the disaster relief community
          </p>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/60 text-sm mb-1">Full Name</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <label className="block text-white/60 text-sm mb-1">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50"
                placeholder="Min 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-white/50 hover:text-white transition-colors"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="relative">
              <label className="block text-white/60 text-sm mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-white/50 hover:text-white transition-colors"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 text-sm mb-1">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50"
                  placeholder="+880..."
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm mb-1">District</label>
                <select
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50"
                >
                  <option value="">Select</option>
                  {districts.map((d) => (
                    <option key={d} value={d} className="bg-gray-900">{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-sm mb-1">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50"
              >
                <option value="public" className="bg-gray-900">Public</option>
                <option value="volunteer" className="bg-gray-900">Volunteer</option>
                <option value="rescue_team" className="bg-gray-900">Rescue Team</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-white/40 text-sm mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-red-400 hover:text-red-300">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
