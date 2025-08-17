import React from "react";
import { Sparkles, Lock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white shadow-md rounded-b-3xl">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to <span className="text-purple-600">Starlock</span>
        </h1>
        <p className="mt-4 text-lg max-w-2xl text-gray-600">
          “Lock your memories today, unlock them tomorrow ✨”
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg shadow-md transition"
        >
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 md:px-20 py-16">
        {[
          {
            title: "Secure Vault",
            desc: "Lock your memories with digital security.",
            icon: <Lock className="h-10 w-10 text-purple-600" />,
          },
          {
            title: "Creative Capsule",
            desc: "Add letters, games, or audio for your future self.",
            icon: <Sparkles className="h-10 w-10 text-purple-600" />,
          },
          {
            title: "Cosmic Touch",
            desc: "Designed to feel futuristic and magical.",
            icon: <Star className="h-10 w-10 text-purple-600" />,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center text-center"
          >
            {item.icon}
            <h3 className="mt-4 font-semibold text-xl">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="bg-white shadow-inner text-center py-16 px-10 md:px-20 rounded-t-3xl">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Lock Your Memories?
        </h2>
        <p className="mt-3 text-gray-600">Create your digital capsule today.</p>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 bg-gray-50 shadow-inner">
        © {new Date().getFullYear()} Starlock. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
