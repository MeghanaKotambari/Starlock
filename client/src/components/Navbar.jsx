import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      {user && (
        <>
          {" "}
          {/* Header */}
          <header className="w-full fixed bg-white shadow-md shadow-gray-300 border-b border-gray-200 px-6 py-4 flex justify-between z-20 items-center">
            <h1 className="text-2xl font-bold text-purple-700">Starlock ✨</h1>
            <a
              href="/profile"
              className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
            >
              Profile
            </a>
          </header>
        </>
      )}
    </div>
  );
};

export default Navbar;
