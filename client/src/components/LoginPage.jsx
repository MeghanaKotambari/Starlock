import React from "react"

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-purple-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-300 p-8 border border-gray-300">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-purple-700">Welcome Back ✨</h1>
        <p className="mt-2 text-center text-gray-600">Login to your Starlock account</p>

        {/* Form */}
        <form className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner bg-gray-50 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl shadow-lg shadow-gray-400 hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-purple-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
