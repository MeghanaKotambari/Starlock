import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/starlock/profile/getCapsulesDetails`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setSuccess(res.data.success);
      }
    };
    fetchDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // Adjust URL to your backend login endpoint
      const response = await axios.post(
        "http://localhost:3000/api/starlock/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        if (success) {
          navigate("/home");
        } else {
          navigate("/settime");
        }
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-purple-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-300 p-8 border border-gray-300">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-purple-700">
          Welcome Back ✨
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Login to your Starlock account
        </p>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              required
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl shadow-lg shadow-gray-400 transition ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
