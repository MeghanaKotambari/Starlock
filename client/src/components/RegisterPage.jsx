import React from "react"

const RegisterPage = () => {
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
          <h1 className="text-3xl font-bold text-purple-700">Create Your Account</h1>
          <p className="mt-2 text-gray-500">Join Starlock & start building your time capsule ✨</p>
        </div>

        {/* Register Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-left text-gray-600 font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-left text-gray-600 font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-left text-gray-600 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl shadow-lg shadow-gray-400 hover:bg-purple-700 transition font-medium"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
