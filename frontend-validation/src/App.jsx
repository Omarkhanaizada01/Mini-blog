import React from "react";
import Router from "./components/Router";
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Router />
    </div>
  );
}

