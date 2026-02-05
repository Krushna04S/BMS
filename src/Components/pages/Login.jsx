import { useContext, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { AuthContext } from "../../Context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { admin, setIsAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const isAdmin = admin?.find(
      (a) => a.email === email && a.password === password,
    );

    if (isAdmin) {
      setIsAuth(true);
      navigate("/", { replace: true });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#020617] via-[#0f172a] to-black px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/15 text-blue-400 text-3xl mb-4">
            <i className="ri-shield-user-fill"></i>
          </div>
          <h1 className="text-2xl font-semibold text-white">BMS Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to manage your business
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email address
            </label>
            <div className="relative">
              <i className="ri-mail-fill absolute left-4 top-3.5 text-gray-500"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/60"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <div className="relative">
              <i className="ri-lock-password-fill absolute left-4 top-3.5 text-gray-500"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/60"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          © {new Date().getFullYear()} BMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
