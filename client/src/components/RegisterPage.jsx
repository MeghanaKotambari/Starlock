import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/starlock/auth/register", // update if different
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("✅ Registered:", res.data);
      if (res.data.success) {
        navigate("/login"); // redirect to login after signup
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      console.error("❌ Registration error:", err);
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
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 shadow-md shadow-gray-300">
              <span className="text-purple-600 text-2xl font-bold">★</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-purple-700">
            Create Your Account
          </h1>
          <p className="mt-2 text-gray-500">
            Join Starlock & start building your time capsule ✨
          </p>
        </div>

        {/* Register Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-left text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-600 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl shadow-lg shadow-gray-400 transition font-medium text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
