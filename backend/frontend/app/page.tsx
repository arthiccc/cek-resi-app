// frontend/app/page.tsx

// THIS LINE IS REQUIRED FOR THE APP ROUTER
"use client";

import { useState } from "react";
import ResiTracker from "../components/ResiTracker";
import OngkirChecker from "../components/OngkirChecker";

export default function Home() {
  const [activeTab, setActiveTab] = useState("resi");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Aplikasi Paket Indonesia
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 border-b">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "resi"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("resi")}
          >
            Cek Resi
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === "ongkir"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("ongkir")}
          >
            Cek Ongkir
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "resi" && <ResiTracker />}
        {activeTab === "ongkir" && <OngkirChecker />}
      </div>
    </div>
  );
}
