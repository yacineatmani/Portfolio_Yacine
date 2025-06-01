import React from "react";

export default function AnimatedGradientBackground() {
  return (
    <div
className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-pink-500 via-blue-500 to-purple-400 opacity-60"      style={{
        backgroundSize: "200% 200%",
        animation: "gradientMove 10s ease-in-out infinite",
      }}
    />
  );
}