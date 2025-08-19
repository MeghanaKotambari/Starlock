import React from "react";

const Navbar = () => {
  return (
    <div>
      {/* Header */}
      <header className="w-full bg-white shadow-md shadow-gray-300 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">Starlock ✨</h1>
        <a
          href="/profile"
          className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          Profile
        </a>
      </header>
    </div>
  );
};

export default Navbar;
