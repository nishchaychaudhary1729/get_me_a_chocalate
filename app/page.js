import React from "react";
import Button from "@/components/button";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <Navbar/>
      {/* Hero Section */}
      <section className="text-center px-4 py-20 md:py-32">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 max-w-3xl mx-auto">
          Support My Coding Journey ☕
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          I'm building open-source projects, sharing dev tutorials, and learning new tech every day. Buy me a coffee and help fuel the journey.
        </p>
        <div className="mt-8">
          <Button text="Buy Me a Coffee" />
        </div>
      </section>

      {/* About/Goal Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-gray-800">Why Support?</h3>
          <p className="mt-4 text-gray-600">
            Your support helps me pay for tools, hosting, and time spent building and sharing free resources. Every coffee powers more commits, more code, and more content.
          </p>
        </div>
      </section>

    </div>
  );
}
